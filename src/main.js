import { 
  fetchVaultData, 
  saveVaultData, 
  getGitHubConfig, 
  saveGitHubConfig, 
  testGitHubConnection,
  clearAllLocalData
} from './github.js';
import { 
  initSpeech, 
  speakText, 
  speakMultipleTimes, 
  speakSlowSyllables, 
  setSelectedVoice, 
  getSelectedVoice,
  getBritishVoices
} from './speech.js';
import { 
  startQuiz, 
  getCurrentQuestion, 
  getQuizProgress, 
  gradeQuestion, 
  nextQuestion, 
  getQuizSummary,
  getQuizChoices
} from './quiz.js';
import { renderStatsUI } from './stats.js';
import { getGeminiApiKey, saveGeminiApiKey, askGeminiTutor } from './ai.js';

// Global State
let vaultData = { items: [], stats: {} };
let currentView = 'words'; // words, slangs, phrases, idioms, quiz, stats, settings
let isSyncing = false;
let syncQueue = false;

// Voice Selection Cache
let brVoices = [];

// DOM Elements
const views = {
  cards: document.getElementById('view-cards-container'),
  quiz: document.getElementById('view-quiz'),
  stats: document.getElementById('view-stats'),
  settings: document.getElementById('view-settings'),
  ai: document.getElementById('view-ai')
};

// ==========================================================================
// APP INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', async () => {
  showLoader();

  // 1. Initialize Text-to-Speech voices
  try {
    brVoices = await initSpeech();
    populateVoiceSelector();
  } catch (err) {
    console.error("Speech Init failed", err);
  }

  // 2. Fetch data (GitHub or Local Storage Cache)
  await loadDatabase();

  // 3. Set up Routing and UI Event listeners
  initRouter();
  initEventListeners();
  updateView();
  updateGitHubStatusBadge();

  // Register PWA Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      console.log('Service Worker registered successfully');
    }).catch(err => {
      console.warn('Service Worker registration failed:', err);
    });
  }
});

// ==========================================================================
// ROUTER & NAVIGATION
// ==========================================================================
function initRouter() {
  const handleNavClick = (e) => {
    e.preventDefault();
    const target = e.currentTarget.getAttribute('data-view');
    navigateTo(target);
  };

  // Bind Sidebar items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', handleNavClick);
  });

  // Bind Mobile Bottom Navbar items
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.addEventListener('click', handleNavClick);
  });

  // Handle URL hash changes for direct linking
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    const validViews = ['words', 'slangs', 'phrases', 'idioms', 'quiz', 'stats', 'settings', 'ai'];
    if (validViews.includes(hash)) {
      currentView = hash;
      updateView();
    }
  });

  // Initial routing check from hash
  const initialHash = window.location.hash.substring(1);
  if (initialHash) {
    currentView = initialHash;
  }
}

function navigateTo(viewName) {
  window.location.hash = viewName;
  currentView = viewName;
  updateView();
}

function updateView() {
  // Update Active Navigation Item states
  document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(item => {
    if (item.getAttribute('data-view') === currentView) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Hide all views first
  Object.values(views).forEach(v => v.classList.remove('active'));

  // Update Header title and visible content view
  const titleMap = {
    words: 'Words',
    slangs: 'Slangs',
    phrases: 'Phrases',
    idioms: 'Idioms',
    quiz: 'Practice & Quiz',
    stats: 'Statistics',
    settings: 'App Settings',
    ai: 'AI Assistant'
  };
  
  document.getElementById('current-view-title').innerText = titleMap[currentView] || 'Vault';

  // Toggle Action Buttons based on page
  const addBtn = document.getElementById('add-item-btn');
  if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
    addBtn.style.display = 'inline-flex';
    views.cards.classList.add('active');
    renderCardsGrid();
  } else {
    addBtn.style.display = 'none';
    if (currentView === 'quiz') {
      views.quiz.classList.add('active');
      setupQuizUI();
    } else if (currentView === 'stats') {
      views.stats.classList.add('active');
      renderStatsUI(vaultData);
    } else if (currentView === 'settings') {
      views.settings.classList.add('active');
      loadSettingsUI();
    } else if (currentView === 'ai') {
      views.ai.classList.add('active');
      loadAIUI();
    }
  }
}

// ==========================================================================
// DATABASE / SYNC OPERATIONS
// ==========================================================================
async function loadDatabase() {
  vaultData = await fetchVaultData(updateSyncStateUI);
  renderStatsUI(vaultData);
  if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
    renderCardsGrid();
  }
}

async function saveDatabase() {
  if (isSyncing) {
    syncQueue = true;
    return false;
  }
  isSyncing = true;
  updateSyncStateUI('syncing');
  try {
    const success = await saveVaultData(vaultData, updateSyncStateUI);
    return success;
  } finally {
    isSyncing = false;
    if (syncQueue) {
      syncQueue = false;
      setTimeout(saveDatabase, 150);
    }
  }
}

function updateSyncStateUI(state, errMsg = '') {
  const badge = document.getElementById('github-status-badge');
  const syncIndicator = document.getElementById('github-sync-indicator');
  const badgeDot = badge.querySelector('.dot');
  const badgeText = badge.querySelector('.status-text');

  if (state === 'local') {
    badge.className = 'status-indicator local-mode';
    badgeText.innerText = 'Local Mode';
    syncIndicator.style.display = 'none';
  } else if (state === 'syncing') {
    syncIndicator.style.display = 'inline-flex';
    syncIndicator.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin"></i> Committing...';
  } else if (state === 'synced') {
    badge.className = 'status-indicator github-mode';
    badgeText.innerText = 'Cloud Sync';
    syncIndicator.style.display = 'inline-flex';
    syncIndicator.innerHTML = '<i class="fa-solid fa-cloud-check" style="color: var(--success);"></i> Saved';
    setTimeout(() => {
      if (!isSyncing) syncIndicator.style.display = 'none';
    }, 2500);
  } else if (state === 'sync-failed') {
    syncIndicator.style.display = 'inline-flex';
    syncIndicator.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="color: var(--danger);"></i> Sync Failed';
    if (errMsg) {
      showBannerAlert(`Sync failed details: ${errMsg}`, "error");
    }
  } else if (state === 'local-out-of-sync') {
    badge.className = 'status-indicator local-mode';
    badgeText.innerText = 'Not Synced';
    syncIndicator.style.display = 'none';
  }
}

function updateGitHubStatusBadge() {
  const config = getGitHubConfig();
  updateSyncStateUI(config ? 'synced' : 'local');
}

// ==========================================================================
// RENDER CARDS VIEW
// ==========================================================================
function renderCardsGrid() {
  const grid = document.getElementById('cards-grid');
  grid.innerHTML = '';

  const searchQuery = document.getElementById('search-input').value.toLowerCase().trim();
  const showFavsOnly = document.getElementById('filter-fav-btn').classList.contains('active');
  const sortBy = document.getElementById('sort-select').value;

  // Filter items
  let filteredItems = (vaultData.items || []).filter(item => {
    // Match Category
    if (item.category !== currentView) return false;
    
    // Match Search Query
    const matchesSearch = 
      item.term.toLowerCase().includes(searchQuery) ||
      item.meaning.toLowerCase().includes(searchQuery) ||
      item.example.toLowerCase().includes(searchQuery);

    if (!matchesSearch) return false;

    // Match Favorites
    if (showFavsOnly && !item.favorite) return false;

    return true;
  });

  // Sort items
  filteredItems.sort((a, b) => {
    if (sortBy === 'az') {
      return a.term.localeCompare(b.term);
    } else if (sortBy === 'za') {
      return b.term.localeCompare(a.term);
    } else if (sortBy === 'newest') {
      return new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0);
    } else if (sortBy === 'oldest') {
      return new Date(a.dateAdded || 0) - new Date(b.dateAdded || 0);
    }
    return 0;
  });

  if (filteredItems.length === 0) {
    grid.innerHTML = `
      <div class="card text-center" style="grid-column: 1 / -1; min-height: 200px; justify-content: center; opacity: 0.85;">
        <i class="fa-solid fa-folder-open" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
        <h4 style="margin-bottom: 0.25rem;">No Vault Entries Found</h4>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Add a new ${currentView.slice(0, -1)} to get started, or clear filter settings.</p>
      </div>
    `;
    return;
  }

  // Draw cards
  filteredItems.forEach(item => {
    const card = document.createElement('div');
    card.className = `card vocab-card ${item.favorite ? 'favorite' : ''}`;
    card.setAttribute('data-id', item.id);

    // Hebrew text direction detection helper
    const containsHebrew = /[\u0590-\u05FF]/.test(item.meaning);
    const meaningDirectionClass = containsHebrew ? '' : 'ltr';

    card.innerHTML = `
      <div class="card-header">
        <div class="card-title-group">
          <span class="category-pill">${item.category}</span>
          <h3 class="card-title">${item.term}</h3>
        </div>
        <div class="card-actions">
          <button class="action-icon-btn fav-btn ${item.favorite ? 'active' : ''}" title="Favorite">
            <i class="fa-${item.favorite ? 'solid' : 'regular'} fa-star"></i>
          </button>
          <div class="word-speech-controls">
            <select class="word-rate" title="Pronunciation Speed">
              <option value="1">1.0x</option>
              <option value="0.75">0.75x</option>
              <option value="0.5">0.5x</option>
              <option value="0.35">0.35x</option>
            </select>
            <button class="speech-btn speak-word-btn" title="Listen (Long press for slow)">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div class="card-body">
        <!-- Show Answer Trigger -->
        <button class="btn btn-secondary btn-block reveal-answer-btn">
          <i class="fa-solid fa-eye"></i> Show Answer
        </button>

        <!-- Hidden Answer Content -->
        <div class="answer-panel" style="display: none;">
          <div class="answer-section">
            <h4>Meaning</h4>
            <p class="answer-meaning ${meaningDirectionClass}">${item.meaning}</p>
          </div>
          <div class="answer-section">
            <h4>Example Sentence</h4>
            <p class="answer-example">${item.example}</p>
            
            <div class="sentence-speech-toolbar">
              <button class="mini-speak-btn speak-sentence-btn" title="Speak sentence">
                <i class="fa-solid fa-circle-play"></i>
              </button>
              <select class="sentence-rate" title="Speed">
                <option value="1">1.0x</option>
                <option value="0.75">0.75x</option>
                <option value="0.5">0.5x</option>
              </select>
              <span class="badge-repeat" title="Repeat count">
                <select class="sentence-repeat">
                  <option value="1">1x</option>
                  <option value="2">2x</option>
                  <option value="3">3x</option>
                </select>
              </span>
            </div>
          </div>
          
          <div class="card-footer-controls">
            <button class="action-icon-btn edit-item-btn" title="Edit">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="action-icon-btn delete-item-btn" style="color: var(--danger);" title="Delete">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // 1. Reveal Answer Button Handler
    const revealBtn = card.querySelector('.reveal-answer-btn');
    const answerPanel = card.querySelector('.answer-panel');
    revealBtn.addEventListener('click', () => {
      revealBtn.style.display = 'none';
      answerPanel.style.display = 'block';
    });

    // 2. Favorite toggle handler
    const favBtn = card.querySelector('.fav-btn');
    favBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      item.favorite = !item.favorite;
      await saveDatabase();
      renderCardsGrid();
    });

    // 3. Edit Handler
    card.querySelector('.edit-item-btn').addEventListener('click', () => {
      openItemModal(item);
    });

    // 4. Delete Handler
    card.querySelector('.delete-item-btn').addEventListener('click', async () => {
      if (confirm(`Are you sure you want to delete "${item.term}"?`)) {
        vaultData.items = vaultData.items.filter(i => i.id !== item.id);
        await saveDatabase();
        renderCardsGrid();
      }
    });

    // 5. Speak Word Button Long-press / Click implementation
    const speakWordBtn = card.querySelector('.speak-word-btn');
    bindLongPressSpeak(speakWordBtn, item.term);

    // 6. Speak Sentence controls handler
    const speakSentenceBtn = card.querySelector('.speak-sentence-btn');
    const rateSelect = card.querySelector('.sentence-rate');
    const repeatSelect = card.querySelector('.sentence-repeat');
    
    speakSentenceBtn.addEventListener('click', async () => {
      const rate = parseFloat(rateSelect.value);
      const repeats = parseInt(repeatSelect.value);
      speakSentenceBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
      try {
        await speakMultipleTimes(item.example, rate, repeats);
      } finally {
        speakSentenceBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
      }
    });

    grid.appendChild(card);
  });
}

// ==========================================================================
// TEXT TO SPEECH LONG PRESS SPEECH BINDING
// ==========================================================================
function bindLongPressSpeak(element, text) {
  let pressTimer = null;
  let isLongPress = false;
  let hasStarted = false;

  const startPress = (e) => {
    // Avoid double trigger on mobile tap
    if (e.type === 'touchstart') {
      hasStarted = true;
    } else if (e.type === 'mousedown' && hasStarted) {
      hasStarted = false;
      return;
    }
    
    isLongPress = false;
    pressTimer = setTimeout(async () => {
      isLongPress = true;
      element.classList.add('speaking');
      
      // Long press slow syllable speech
      await speakSlowSyllables(text, (state) => {
        if (state.status === 'done' || state.status === 'error') {
          element.classList.remove('speaking');
        }
      });
    }, 600);
  };

  const endPress = async (e) => {
    clearTimeout(pressTimer);
    if (e.type === 'touchend') {
      hasStarted = false;
    }

    if (!isLongPress) {
      // Regular click speech
      element.classList.add('speaking');
      try {
        // Read speed selector if present in card header controls
        const rateSelect = element.parentNode.querySelector('.word-rate, #quiz-word-rate');
        const rate = rateSelect ? parseFloat(rateSelect.value) : 1.0;
        await speakText(text, { rate });
      } catch (err) {
        console.error(err);
      } finally {
        element.classList.remove('speaking');
      }
    }
  };

  const cancelPress = () => {
    clearTimeout(pressTimer);
  };

  element.addEventListener('mousedown', startPress);
  element.addEventListener('mouseup', endPress);
  element.addEventListener('mouseleave', cancelPress);

  element.addEventListener('touchstart', startPress);
  element.addEventListener('touchend', endPress);
  element.addEventListener('touchcancel', cancelPress);
}

// ==========================================================================
// ADD & EDIT MODAL HANDLERS
// ==========================================================================
const itemModal = document.getElementById('item-modal');
const itemForm = document.getElementById('item-form');
const modalTitle = document.getElementById('modal-title');

function openItemModal(item = null) {
  itemForm.reset();
  
  if (item) {
    // Editing existing item
    modalTitle.innerText = 'Edit Vault Entry';
    document.getElementById('item-id').value = item.id;
    document.getElementById('item-category').value = item.category;
    document.getElementById('item-term').value = item.term;
    document.getElementById('item-meaning').value = item.meaning;
    document.getElementById('item-example').value = item.example;
  } else {
    // Creating new item
    modalTitle.innerText = 'Add New Entry';
    document.getElementById('item-id').value = '';
    document.getElementById('item-category').value = ['words', 'slangs', 'phrases', 'idioms'].includes(currentView) ? currentView : 'words';
  }
  
  itemModal.style.display = 'flex';
}

function closeItemModal() {
  itemModal.style.display = 'none';
}

itemForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('item-id').value;
  const category = document.getElementById('item-category').value;
  const term = document.getElementById('item-term').value.trim();
  const meaning = document.getElementById('item-meaning').value.trim();
  const example = document.getElementById('item-example').value.trim();

  if (!term || !meaning || !example) return;

  if (id) {
    // Edit existing entry
    const index = vaultData.items.findIndex(i => i.id === id);
    if (index !== -1) {
      vaultData.items[index] = {
        ...vaultData.items[index],
        category,
        term,
        meaning,
        example
      };
    }
  } else {
    // Add new entry
    const newEntry = {
      id: `${category}-${Date.now()}`,
      category,
      term,
      meaning,
      example,
      favorite: false,
      dateAdded: new Date().toISOString(),
      mistakeCount: 0
    };
    vaultData.items.push(newEntry);
  }

  closeItemModal();
  showLoader();
  
  const saved = await saveDatabase();
  hideLoader();

  // If saved successfully and we are in a cards view, reload lists
  if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
    // Automatically switch categories if added to a different view
    if (category !== currentView) {
      navigateTo(category);
    } else {
      renderCardsGrid();
    }
  }
});

document.getElementById('modal-close-btn').addEventListener('click', closeItemModal);
document.getElementById('modal-cancel-btn').addEventListener('click', closeItemModal);
document.getElementById('add-item-btn').addEventListener('click', () => openItemModal());

// Close modal when clicking outside content area
itemModal.addEventListener('click', (e) => {
  if (e.target === itemModal) {
    closeItemModal();
  }
});

// ==========================================================================
// QUIZ SECTION VIEW LOGIC
// ==========================================================================
const quizSetupPanel = document.getElementById('quiz-setup');
const quizActivePanel = document.getElementById('quiz-active');
const quizResultsPanel = document.getElementById('quiz-results');

function setupQuizUI() {
  quizSetupPanel.style.display = 'block';
  quizActivePanel.style.display = 'none';
  quizResultsPanel.style.display = 'none';

  // Toggle active styling on custom quiz category radio cards
  const radioCards = quizSetupPanel.querySelectorAll('.cat-radio-card');
  radioCards.forEach(card => {
    const input = card.querySelector('input[type="radio"]');
    
    card.addEventListener('click', () => {
      radioCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      input.checked = true;
    });

    if (input.checked) {
      card.classList.add('active');
    }
  });
}

document.getElementById('start-quiz-btn').addEventListener('click', () => {
  const selectedCat = quizSetupPanel.querySelector('input[name="quiz-cat"]:checked').value;
  
  const success = startQuiz(selectedCat, vaultData.items || []);
  if (!success) {
    alert("Insufficient vocabulary in this category. Please add items to this category before starting the quiz.");
    return;
  }

  showQuizQuestion();
});

function showQuizQuestion() {
  quizSetupPanel.style.display = 'none';
  quizActivePanel.style.display = 'block';
  quizResultsPanel.style.display = 'none';

  const item = getCurrentQuestion();
  const progress = getQuizProgress();

  // Reset display states and next question buttons
  document.getElementById('quiz-answer-block').style.display = 'none';
  document.getElementById('quiz-next-btn').style.display = 'none';

  // Set card data
  document.getElementById('quiz-progress-text').innerText = `Question ${progress.current} of ${progress.total}`;
  document.getElementById('quiz-progress-fill').style.width = `${progress.percentage}%`;
  
  const categoryPill = document.getElementById('quiz-card-category');
  categoryPill.innerText = item.category;
  
  document.getElementById('quiz-card-word').innerText = item.term;
  
  const containsHebrew = /[\u0590-\u05FF]/.test(item.meaning);
  const meaningEl = document.getElementById('quiz-card-meaning');
  meaningEl.innerText = item.meaning;
  meaningEl.className = containsHebrew ? '' : 'ltr';

  document.getElementById('quiz-card-example').innerText = item.example;

  // Bind Speak Word handlers in Quiz Card
  const speakBtn = document.getElementById('quiz-speak-btn');
  const newSpeakBtn = speakBtn.cloneNode(true);
  speakBtn.parentNode.replaceChild(newSpeakBtn, speakBtn);
  bindLongPressSpeak(newSpeakBtn, item.term);

  // Setup Sentence Toolbar in Quiz Card
  const sentenceToolbar = document.getElementById('quiz-sentence-toolbar');
  sentenceToolbar.innerHTML = `
    <button class="mini-speak-btn speak-quiz-sentence-btn" title="Speak sentence">
      <i class="fa-solid fa-circle-play"></i>
    </button>
    <select class="quiz-sentence-rate" title="Speed">
      <option value="1">1.0x</option>
      <option value="0.75">0.75x</option>
      <option value="0.5">0.5x</option>
    </select>
    <span class="badge-repeat" title="Repeat count">
      <select class="quiz-sentence-repeat">
        <option value="1">1x</option>
        <option value="2">2x</option>
        <option value="3">3x</option>
      </select>
    </span>
  `;

  const speakQuizSentenceBtn = sentenceToolbar.querySelector('.speak-quiz-sentence-btn');
  const rateSelect = sentenceToolbar.querySelector('.quiz-sentence-rate');
  const repeatSelect = sentenceToolbar.querySelector('.quiz-sentence-repeat');
  
  speakQuizSentenceBtn.addEventListener('click', async () => {
    const rate = parseFloat(rateSelect.value);
    const repeats = parseInt(repeatSelect.value);
    speakQuizSentenceBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    try {
      await speakMultipleTimes(item.example, rate, repeats);
    } finally {
      speakQuizSentenceBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    }
  });

  // Render Multiple Choice Option Buttons
  const optionsContainer = document.getElementById('quiz-options');
  optionsContainer.innerHTML = '';

  const choices = getQuizChoices(item, vaultData.items || []);
  
  choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    
    // Check direction (RTL for Hebrew, LTR for English)
    const optionContainsHebrew = /[\u0590-\u05FF]/.test(choice.text);
    if (optionContainsHebrew) {
      btn.style.direction = 'rtl';
      btn.style.textAlign = 'right';
    } else {
      btn.style.direction = 'ltr';
      btn.style.textAlign = 'left';
    }

    btn.innerText = choice.text;

    btn.addEventListener('click', () => {
      handleQuizChoiceSelected(choice, btn, choices);
    });

    optionsContainer.appendChild(btn);
  });
}

async function handleQuizChoiceSelected(choice, selectedBtn, choices) {
  // 1. Disable all option buttons to prevent multiple clicks
  const optionButtons = document.querySelectorAll('.quiz-option-btn');
  optionButtons.forEach(btn => {
    btn.disabled = true;
    btn.classList.add('disabled');
  });

  const isCorrect = choice.isCorrect;
  const currentItem = getCurrentQuestion();

  // 2. Add visual success/danger feedback
  const feedbackBanner = document.getElementById('quiz-feedback-banner');
  if (isCorrect) {
    selectedBtn.classList.remove('disabled');
    selectedBtn.classList.add('correct');
    selectedBtn.innerHTML += ' <i class="fa-solid fa-circle-check"></i>';
    
    feedbackBanner.className = 'quiz-feedback-banner correct';
    feedbackBanner.innerText = 'Splendid! Correct.';
  } else {
    selectedBtn.classList.remove('disabled');
    selectedBtn.classList.add('incorrect');
    selectedBtn.innerHTML += ' <i class="fa-solid fa-circle-xmark"></i>';

    // Find and highlight correct answer
    optionButtons.forEach(btn => {
      const match = choices.find(c => c.text === btn.innerText && c.isCorrect);
      if (match) {
        btn.classList.remove('disabled');
        btn.classList.add('correct');
        btn.innerHTML += ' <i class="fa-solid fa-circle-check"></i>';
      }
    });

    feedbackBanner.className = 'quiz-feedback-banner incorrect';
    feedbackBanner.innerText = 'Incorrect. Let\'s review this word.';
  }

  // 3. Grade question internally
  gradeQuestion(isCorrect);

  // 4. Update mistake count in database if incorrect
  if (!isCorrect) {
    const index = vaultData.items.findIndex(i => i.id === currentItem.id);
    if (index !== -1) {
      vaultData.items[index].mistakeCount = (vaultData.items[index].mistakeCount || 0) + 1;
    }
  }

  // 5. Reveal explanation and Next button
  document.getElementById('quiz-answer-block').style.display = 'block';
  document.getElementById('quiz-next-btn').style.display = 'block';
}

// Quiz Next Button Click handler
document.getElementById('quiz-next-btn').addEventListener('click', async () => {
  if (nextQuestion()) {
    showQuizQuestion();
  } else {
    await completeQuiz();
  }
});

async function completeQuiz() {
  const summary = getQuizSummary();

  // 1. Update Global Statistics
  if (!vaultData.stats) {
    vaultData.stats = { quizzesCompleted: 0, correctAnswers: 0, incorrectAnswers: 0, history: [] };
  }
  
  vaultData.stats.quizzesCompleted = (vaultData.stats.quizzesCompleted || 0) + 1;
  vaultData.stats.correctAnswers = (vaultData.stats.correctAnswers || 0) + summary.correct;
  vaultData.stats.incorrectAnswers = (vaultData.stats.incorrectAnswers || 0) + summary.incorrect;
  
  if (!vaultData.stats.history) {
    vaultData.stats.history = [];
  }

  const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  vaultData.stats.history.push({
    date: timestamp,
    correct: summary.correct,
    total: summary.total,
    percentage: summary.percentage
  });

  // Keep last 30 items in history to avoid huge files
  if (vaultData.stats.history.length > 30) {
    vaultData.stats.history.shift();
  }

  // Save changes
  showLoader();
  await saveDatabase();
  hideLoader();

  // 2. Render Scoreboard Screen
  quizSetupPanel.style.display = 'none';
  quizActivePanel.style.display = 'none';
  quizResultsPanel.style.display = 'block';

  document.getElementById('quiz-res-total').innerText = summary.total;
  document.getElementById('quiz-res-correct').innerText = summary.correct;
  document.getElementById('quiz-res-incorrect').innerText = summary.incorrect;
  document.getElementById('quiz-res-pct').innerText = `${summary.percentage}%`;

  // Set visual circular ring offset
  const circle = document.getElementById('quiz-score-ring');
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (summary.percentage / 100) * circumference;
  
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = offset;

  // Personal congrats note based on score
  const summaryMsg = document.getElementById('quiz-results-summary-text');
  if (summary.percentage === 100) {
    summaryMsg.innerText = "Bloody brilliant! Perfect score!";
  } else if (summary.percentage >= 80) {
    summaryMsg.innerText = "Splendid job! Almost perfect!";
  } else if (summary.percentage >= 50) {
    summaryMsg.innerText = "Not half bad! Keep practicing!";
  } else {
    summaryMsg.innerText = "Keep going! Practice makes perfect!";
  }
}

// Exit practice buttons
document.getElementById('quiz-cancel-btn').addEventListener('click', () => {
  if (confirm("Are you sure you want to exit the quiz? Progress in this session will not be saved.")) {
    setupQuizUI();
  }
});

document.getElementById('quiz-retry-btn').addEventListener('click', setupQuizUI);
document.getElementById('quiz-home-btn').addEventListener('click', () => navigateTo('words'));

// ==========================================================================
// SETTINGS VIEWS AND EVENT LISTENERS
// ==========================================================================
const gitForm = document.getElementById('settings-github-form');
const voiceSelect = document.getElementById('voice-selector');

function loadSettingsUI() {
  const config = getGitHubConfig();
  
  if (config) {
    document.getElementById('github-pat').value = config.pat || '';
    document.getElementById('github-owner').value = config.owner || 'yairstein2002-afk';
    document.getElementById('github-repo').value = config.repo || 'british-english-vault';
    document.getElementById('github-branch').value = config.branch || 'main';
    document.getElementById('github-filepath').value = config.path || 'data/vault.json';
  } else {
    document.getElementById('github-pat').value = '';
    document.getElementById('github-owner').value = 'yairstein2002-afk';
    document.getElementById('github-repo').value = 'british-english-vault';
    document.getElementById('github-branch').value = 'main';
    document.getElementById('github-filepath').value = 'data/vault.json';
  }

  const geminiKeyInput = document.getElementById('gemini-key');
  if (geminiKeyInput) {
    geminiKeyInput.value = getGeminiApiKey();
  }

  populateVoiceSelector();
}

function populateVoiceSelector() {
  const voicesList = getBritishVoices();
  voiceSelect.innerHTML = '';

  if (voicesList.length === 0) {
    voiceSelect.innerHTML = '<option value="">No British voice profiles found in browser.</option>';
    return;
  }

  const selected = getSelectedVoice();
  voicesList.forEach(voice => {
    const opt = document.createElement('option');
    opt.value = voice.voiceURI;
    opt.innerText = `${voice.name} (${voice.lang})`;
    if (selected && selected.voiceURI === voice.voiceURI) {
      opt.selected = true;
    }
    voiceSelect.appendChild(opt);
  });
}

voiceSelect.addEventListener('change', () => {
  setSelectedVoice(voiceSelect.value);
});

// Gemini AI key settings form listener
const geminiForm = document.getElementById('settings-gemini-form');
if (geminiForm) {
  geminiForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const key = document.getElementById('gemini-key').value.trim();
    saveGeminiApiKey(key);
    showBannerAlert("Gemini API Key saved successfully!", "success");
  });
}

// Test Connection Button click
document.getElementById('btn-test-connection').addEventListener('click', async () => {
  const pat = document.getElementById('github-pat').value.trim();
  const owner = document.getElementById('github-owner').value.trim();
  const repo = document.getElementById('github-repo').value.trim();
  const branch = document.getElementById('github-branch').value.trim();
  const path = document.getElementById('github-filepath').value.trim();

  if (!pat || !owner || !repo) {
    showBannerAlert("Please enter Token, Owner, and Repo before testing connection.", "error");
    return;
  }

  showBannerAlert("<i class='fa-solid fa-spinner fa-spin'></i> Testing connection to GitHub...", "info");

  const testConfig = { pat, owner, repo, branch, path };
  const res = await testGitHubConnection(testConfig);

  if (res.success) {
    if (res.exists) {
      showBannerAlert("Connection successful! Vault data exists in repository and is ready to load.", "success");
    } else {
      showBannerAlert("Connection successful! Repo validated (Vault data file does not exist yet and will be created on first sync).", "success");
    }
  } else {
    showBannerAlert(`Connection failed: ${res.error}`, "error");
  }
});

// Save settings form handler
gitForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const pat = document.getElementById('github-pat').value.trim();
  const owner = document.getElementById('github-owner').value.trim();
  const repo = document.getElementById('github-repo').value.trim();
  const branch = document.getElementById('github-branch').value.trim();
  const path = document.getElementById('github-filepath').value.trim();

  if (!pat || !owner || !repo) {
    showBannerAlert("Token, Owner, and Repo are required to connect to GitHub.", "error");
    return;
  }

  const newConfig = { pat, owner, repo, branch, path };
  saveGitHubConfig(newConfig);
  updateGitHubStatusBadge();

  showBannerAlert("Settings saved successfully. Syncing database...", "info");
  
  showLoader();
  await loadDatabase();
  hideLoader();

  showBannerAlert("Vault database synced successfully with GitHub!", "success");
});

// Test speech audio button
document.getElementById('btn-test-speech').addEventListener('click', async () => {
  const btn = document.getElementById('btn-test-speech');
  btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Speaking...';
  try {
    await speakText("Welcome to the British English Vault. Cheers!");
  } finally {
    btn.innerHTML = '<i class="fa-solid fa-circle-play"></i> Test selected voice';
  }
});

// Export database backup
document.getElementById('btn-export-data').addEventListener('click', () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(vaultData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "british_english_vault_backup.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
});

// Reset application data cached
document.getElementById('btn-reset-data').addEventListener('click', () => {
  if (confirm("WARNING: This will delete local settings and clear your browser cache. GitHub files will remain untouched unless you write to them. Proceed?")) {
    clearAllLocalData();
    window.location.reload();
  }
});

// ==========================================================================
// CONTROLS AND SEARCH EVENT LISTENERS
// ==========================================================================
function initEventListeners() {
  // Search box dynamic typing
  document.getElementById('search-input').addEventListener('input', () => {
    if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
      renderCardsGrid();
    }
  });

  // Sort dropdown change
  document.getElementById('sort-select').addEventListener('change', () => {
    if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
      renderCardsGrid();
    }
  });

  // Favorites filter click
  const favFilter = document.getElementById('filter-fav-btn');
  favFilter.addEventListener('click', () => {
    favFilter.classList.toggle('active');
    renderCardsGrid();
  });

  // Theme Toggler
  const themeToggle = document.getElementById('theme-toggle-btn');
  
  // Set initial theme
  const savedTheme = localStorage.getItem('bev_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButtonUI(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('bev_theme', newTheme);
    updateThemeButtonUI(newTheme);
  });

  // Init AI Assistant controllers
  initAIHandlers();
}

function updateThemeButtonUI(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (theme === 'dark') {
    btn.innerHTML = '<i class="fa-solid fa-sun"></i> <span>Light Mode</span>';
  } else {
    btn.innerHTML = '<i class="fa-solid fa-moon"></i> <span>Dark Mode</span>';
  }
}

// ==========================================================================
// GLOBAL UI NOTIFICATION HELPER BANNERS
// ==========================================================================
function showBannerAlert(msg, type = "info") {
  const banner = document.getElementById('alert-banner');
  banner.className = `alert-banner ${type}`;
  banner.innerHTML = `<span>${msg}</span><button style="background:transparent; border:none; color:inherit; font-size:1.2rem; cursor:pointer;" onclick="this.parentElement.style.display='none'">&times;</button>`;
  banner.style.display = 'flex';
  
  // Autoclose info or success messages after 4 seconds
  if (type === 'info' || type === 'success') {
    setTimeout(() => {
      banner.style.display = 'none';
    }, 4500);
  }
}

// Global Loader controls
function showLoader() {
  const grid = document.getElementById('cards-grid');
  if (grid) {
    grid.innerHTML = `
      <div class="loader-container" style="grid-column:1/-1; text-align:center; padding: 4rem 0; font-size: 1.5rem; color:var(--text-muted);">
        <i class="fa-solid fa-circle-notch fa-spin" style="margin-right: 0.5rem;"></i> Syncing Vault...
      </div>
    `;
  }
}

function hideLoader() {
  // Handled by rendering cards
}

// ==========================================================================
// AI ASSISTANT VIEW CONTROLLER
// ==========================================================================
function loadAIUI() {
  document.getElementById('ai-input').value = '';
  document.getElementById('ai-loading').style.display = 'none';
  document.getElementById('ai-response').style.display = 'none';
  document.getElementById('ai-response').innerHTML = '';
}

function initAIHandlers() {
  const actions = [
    { btnId: 'btn-ai-explore', mode: 'explore' },
    { btnId: 'btn-ai-grammar', mode: 'grammar' },
    { btnId: 'btn-ai-tutor', mode: 'tutor' },
    { btnId: 'btn-ai-translate', mode: 'translate' }
  ];

  actions.forEach(({ btnId, mode }) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    btn.addEventListener('click', async () => {
      const textInput = document.getElementById('ai-input').value.trim();
      if (!textInput) {
        showBannerAlert("Please type some text first.", "error");
        return;
      }

      const apiKey = getGeminiApiKey();
      if (!apiKey) {
        showBannerAlert("Please configure your Gemini API Key in Settings first.", "error");
        navigateTo('settings');
        return;
      }

      // Show loading panel, hide response
      const loadingPanel = document.getElementById('ai-loading');
      const responsePanel = document.getElementById('ai-response');
      loadingPanel.style.display = 'block';
      responsePanel.style.display = 'none';
      responsePanel.innerHTML = '';

      // Cache original button content and add spinner
      const originalBtnHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Loading...';

      // Disable all action buttons during request
      const actionButtons = document.querySelectorAll('.ai-actions-grid button');
      actionButtons.forEach(b => b.disabled = true);

      try {
        const data = await askGeminiTutor(mode, textInput);
        renderAIResponse(mode, data);
        responsePanel.style.display = 'block';
      } catch (err) {
        console.error(err);
        let userFriendlyMsg = err.message;
        const lowerErr = err.message.toLowerCase();
        if (lowerErr.includes("quota") || lowerErr.includes("exhausted") || lowerErr.includes("429") || lowerErr.includes("rate limit")) {
          userFriendlyMsg = "⚠️ שרת ה-AI של גוגל עמוס זמנית בגלל מגבלת השימוש החינמית (Rate Limit). אנא המתן כ-30 שניות ברצף מבלי ללחוץ על כלום ונסה שוב.";
        } else if (lowerErr.includes("key") || lowerErr.includes("invalid") || lowerErr.includes("400") || lowerErr.includes("credential")) {
          userFriendlyMsg = "⚠️ מפתח ה-API שהזנת אינו תקין. אנא ודא שהעתקת אותו במלואו מ-Google AI Studio ללא רווחים מיותרים תחת הגדרות.";
        }
        responsePanel.innerHTML = `
          <div style="border: 2px solid var(--danger); padding: 1.5rem; border-radius: 12px; background-color: var(--danger-light); color: var(--danger);">
            <h4><i class="fa-solid fa-circle-exclamation"></i> AI Request Failed</h4>
            <p style="margin-top: 0.5rem; font-size: 0.95rem; line-height: 1.5;">${userFriendlyMsg}</p>
            <textarea style="width: 100%; margin-top: 1rem; height: 120px; font-family: monospace; font-size: 0.85rem; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 6px; background-color: var(--card-bg); color: var(--text-color);" readonly>${err.message}</textarea>
          </div>
        `;
        responsePanel.style.display = 'block';
      } finally {
        loadingPanel.style.display = 'none';
        actionButtons.forEach(b => b.disabled = false);
        btn.innerHTML = originalBtnHTML;
      }
    });
  });
}

function renderAIResponse(mode, data) {
  const container = document.getElementById('ai-response');
  container.innerHTML = '';

  if (mode === 'explore') {
    container.innerHTML = `
      <div class="ai-section">
        <h4>Meaning</h4>
        <p>${data.meaning}</p>
      </div>
      <hr style="border: none; border-top: 1px solid var(--border-color); margin: 1.5rem 0;">
      <div class="ai-section">
        <h4>Example Sentence</h4>
        <div class="ai-example-box">
          <div class="example-text">"${data.example}"</div>
          <div class="sentence-speech-toolbar" style="margin-top: 0.75rem;">
            <button class="mini-speak-btn ai-speak-btn" data-text="${data.example.replace(/"/g, '&quot;')}" title="Speak sentence">
              <i class="fa-solid fa-circle-play"></i>
            </button>
            <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">Listen (UK Accent)</span>
          </div>
        </div>
      </div>
    `;
  } else if (mode === 'grammar') {
    const isCorrect = data.status && data.status.toLowerCase().trim() === 'correct';
    const badgeClass = isCorrect ? 'correct' : 'incorrect';
    const badgeText = isCorrect ? 'Correct ✓' : 'Incorrect ✗';
    const badgeIcon = isCorrect ? 'fa-circle-check' : 'fa-circle-xmark';

    container.innerHTML = `
      <div class="ai-badge ${badgeClass}">
        <i class="fa-solid ${badgeIcon}"></i> ${badgeText}
      </div>

      <div class="ai-section">
        <h4>Corrected Sentence</h4>
        <div class="ai-correction-text">"${data.correction}"</div>
        <div class="sentence-speech-toolbar" style="margin-top: 0.75rem;">
          <button class="mini-speak-btn ai-speak-btn" data-text="${data.correction.replace(/"/g, '&quot;')}" title="Speak sentence">
            <i class="fa-solid fa-circle-play"></i>
          </button>
          <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">Listen (UK Accent)</span>
        </div>
      </div>

      <hr style="border: none; border-top: 1px solid var(--border-color); margin: 1.5rem 0;">

      <div class="ai-section">
        <h4>Grammar Explanation</h4>
        <p>${data.explanation}</p>
      </div>

      <div class="ai-section">
        <h4>Sentence Meaning</h4>
        <p>${data.meaning}</p>
      </div>

      <div class="ai-section">
        <h4>Another Example</h4>
        <div class="ai-example-box">
          <div class="example-text">"${data.example}"</div>
          <div class="sentence-speech-toolbar" style="margin-top: 0.75rem;">
            <button class="mini-speak-btn ai-speak-btn" data-text="${data.example.replace(/"/g, '&quot;')}" title="Speak sentence">
              <i class="fa-solid fa-circle-play"></i>
            </button>
            <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">Listen (UK Accent)</span>
          </div>
        </div>
      </div>
    `;
  } else if (mode === 'tutor') {
    // Format response simple markdown rules
    let formattedResponse = data.response
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');

    let examplesHTML = '';
    if (data.examples && data.examples.length > 0) {
      examplesHTML = `
        <hr style="border: none; border-top: 1px solid var(--border-color); margin: 1.5rem 0;">
        <div class="ai-section">
          <h4>Usage Examples</h4>
          ${data.examples.map(ex => `
            <div class="ai-example-box" style="margin-bottom: 1rem;">
              <div class="example-text">"${ex.text}"</div>
              <div class="example-context">${ex.context}</div>
              <div class="sentence-speech-toolbar" style="margin-top: 0.75rem;">
                <button class="mini-speak-btn ai-speak-btn" data-text="${ex.text.replace(/"/g, '&quot;')}" title="Speak sentence">
                  <i class="fa-solid fa-circle-play"></i>
                </button>
                <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">Listen (UK Accent)</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    container.innerHTML = `
      <div class="ai-section">
        <h4>AI Tutor Response</h4>
        <div class="ai-tutor-response">${formattedResponse}</div>
      </div>
      ${examplesHTML}
    `;
  } else if (mode === 'translate') {
    container.innerHTML = `
      <div class="ai-section">
        <h4>British English Translation</h4>
        <div class="ai-correction-text">"${data.translation}"</div>
        <div class="sentence-speech-toolbar" style="margin-top: 0.75rem;">
          <button class="mini-speak-btn ai-speak-btn" data-text="${data.translation.replace(/"/g, '&quot;')}" title="Speak sentence">
            <i class="fa-solid fa-circle-play"></i>
          </button>
          <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">Listen (UK Accent)</span>
        </div>
      </div>

      <hr style="border: none; border-top: 1px solid var(--border-color); margin: 1.5rem 0;">

      <div class="ai-section">
        <h4>Meaning / Context</h4>
        <p>${data.meaning}</p>
      </div>

      <div class="ai-section">
        <h4>Example Usage</h4>
        <div class="ai-example-box">
          <div class="example-text">"${data.example}"</div>
          <div class="sentence-speech-toolbar" style="margin-top: 0.75rem;">
            <button class="mini-speak-btn ai-speak-btn" data-text="${data.example.replace(/"/g, '&quot;')}" title="Speak sentence">
              <i class="fa-solid fa-circle-play"></i>
            </button>
            <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">Listen (UK Accent)</span>
          </div>
        </div>
      </div>
    `;
  }

  // Bind speak click event listeners to speech buttons
  const speakButtons = container.querySelectorAll('.ai-speak-btn');
  speakButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToSpeak = btn.getAttribute('data-text');
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
      try {
        await speakText(textToSpeak);
      } catch (err) {
        console.error(err);
      } finally {
        btn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
      }
    });
  });
}
