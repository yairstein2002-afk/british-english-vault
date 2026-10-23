import { 
  fetchVaultData, 
  saveVaultData, 
  getGitHubConfig, 
  saveGitHubConfig, 
  testGitHubConnection, 
  getLocalFallbackData,
  restoreAllDataFromCloud
} from './github.js';
import {
  initSpeech,
  getBritishVoices,
  getSelectedVoice,
  setSelectedVoice,
  speakText,
  speakMultipleTimes,
  speakSlowSyllables
} from './speech.js';
import { 
  startQuiz, 
  getCurrentQuestion, 
  getQuizProgress, 
  gradeQuestion, 
  nextQuestion, 
  getQuizSummary,
  getQuizChoices,
  startDictationSession,
  getCurrentDictationWord,
  getDictationProgress,
  checkDictationAttempt,
  nextDictationWord,
  getDictationSummary,
  getSundayRoutineStats,
  recordSundayRoutineCompleted
} from './quiz.js';
import { LEARN_TOPICS } from './learnData.js';
import { renderStatsUI } from './stats.js';
import { getGeminiApiKey, saveGeminiApiKey, askGeminiTutor } from './ai.js';
import { 
  getSupabaseConfig, 
  saveSupabaseConfig, 
  extractRefFromSupabaseJWT,
  fetchVaultFromSupabase, 
  upsertItemInSupabase, 
  deleteItemFromSupabase, 
  syncAllVaultToSupabase 
} from './supabase.js';
import { 
  DEFAULT_GOALS, 
  GOAL_CATEGORIES, 
  getGoalsState, 
  getAllActiveGoals, 
  toggleGoalCompletion, 
  addCustomGoal, 
  editGoal, 
  deleteGoal, 
  calculateGoalsStats 
} from './goals.js';
import { initLearnUI, closeTopicDetail } from './learn.js';
import { initDailyPracticeUI } from './dailyPractice.js';
import {
  getGameStats,
  calculateUserLevel,
  awardGameRewards,
  startWordMatchGame,
  startQuickChoiceGame,
  startFillGapGame,
  startWordScrambleGame,
  startListenChooseGame,
  startSayItGame,
  startGuessWordGame,
  startOddOneOutGame,
  startBuildSentenceGame,
  startEnglishQuizGame,
  startSynonymHuntGame,
  startAntonymAttackGame,
  startDefinitionDuelGame,
  startWordLadderGame,
  startMissingLetterGame,
  startSpellRaceGame,
  startSentenceDetectiveGame,
  startGrammarBattleGame,
  startTenseChallengeGame,
  startPrepositionMasterGame,
  startArticleChallengeGame,
  startNaturalEnglishGame,
  startFormalCasualGame,
  startCompleteConversationGame,
  startStoryBuilderGame,
  startWordCategoriesGame,
  startSpeedReadingGame,
  startTrueFalseGame,
  startMemoryChallengeGame,
  startWordChainGame,
  startCategoryRushGame,
  startForbiddenWordGame,
  startEnglishTriviaGame,
  startWordConnectionsGame
} from './games.js';

// Global State
let vaultData = { items: [], stats: {} };
let currentView = 'words'; // words, slangs, phrases, idioms, learn, games, quiz, stats, settings, ai, goals
let isSyncing = false;
let syncQueue = false;

// Voice Selection Cache
let brVoices = [];

// DOM Elements
const views = {
  cards: document.getElementById('view-cards-container'),
  dailyPractice: document.getElementById('view-daily-practice'),
  learn: document.getElementById('view-learn'),
  games: document.getElementById('view-games'),
  quiz: document.getElementById('view-quiz'),
  stats: document.getElementById('view-stats'),
  settings: document.getElementById('view-settings'),
  ai: document.getElementById('view-ai'),
  goals: document.getElementById('view-goals')
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
    const validViews = ['words', 'slangs', 'phrases', 'idioms', 'daily-practice', 'learn', 'games', 'quiz', 'stats', 'settings', 'ai', 'goals'];
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
  Object.values(views).forEach(v => {
    if (v) v.classList.remove('active');
  });

  // Update Header title and visible content view
  const titleMap = {
    words: 'Words',
    slangs: 'Slangs',
    phrases: 'Phrases',
    idioms: 'Idioms',
    'daily-practice': 'Daily Practice — Writing Lab ✍️',
    learn: 'Learn & Practice',
    games: 'Interactive Games',
    quiz: 'Practice & Quiz',
    stats: 'Statistics',
    settings: 'App Settings',
    ai: 'AI Assistant',
    goals: 'Goals & Achievements'
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
    if (currentView === 'daily-practice') {
      if (views.dailyPractice) views.dailyPractice.classList.add('active');
      initDailyPracticeUI();
    } else if (currentView === 'learn') {
      if (views.learn) views.learn.classList.add('active');
      initLearnUI();
    } else if (currentView === 'games') {
      if (views.games) views.games.classList.add('active');
      renderGamesUI();
    } else if (currentView === 'quiz') {
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
    } else if (currentView === 'goals') {
      views.goals.classList.add('active');
      renderGoalsUI();
    }
  }
}

// ==========================================================================
// DATABASE / SYNC OPERATIONS
// ==========================================================================
function normalizeTerm(term) {
  if (!term) return '';
  return term.toString()
    .replace(/^["'“`]+|["'”`]+$/g, '')
    .trim()
    .toLowerCase();
}

async function loadDatabase(forceRemote = false) {
  try {
    // 1. Immediately load curated local data so user sees everything in 0ms!
    if (!vaultData || !Array.isArray(vaultData.items) || vaultData.items.length === 0 || forceRemote) {
      vaultData = getLocalFallbackData() || { items: [], stats: {} };
      if (!vaultData.items || !Array.isArray(vaultData.items)) {
        vaultData.items = [];
      }
    }

    renderStatsUI(vaultData);
    if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
      renderCardsGrid();
    }
    hideLoader();

    // 2. If Supabase configured, check and pull from Supabase in background
    const sbConfig = getSupabaseConfig();
    if (sbConfig && sbConfig.url && sbConfig.key) {
      fetchVaultFromSupabase().then(sbRes => {
        if (sbRes && sbRes.success && Array.isArray(sbRes.items) && sbRes.items.length > 0) {
          let updated = false;
          sbRes.items.forEach(sbItem => {
            if (sbItem && (sbItem.term || sbItem.word)) {
              const term = (sbItem.term || sbItem.word).trim();
              const idx = vaultData.items.findIndex(i => (sbItem.id && i.id === sbItem.id) || normalizeTerm(i.term) === normalizeTerm(term));
              if (idx !== -1) {
                vaultData.items[idx] = { ...vaultData.items[idx], ...sbItem };
              } else {
                vaultData.items.push(sbItem);
                updated = true;
              }
            }
          });
          if (updated) {
            saveVaultData(vaultData, updateSyncStateUI);
            renderStatsUI(vaultData);
            if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
              renderCardsGrid();
            }
          }
        }
      }).catch(e => console.warn('Supabase background sync:', e));
    }

    // 3. Background check: fetch updates from Cloud Database
    fetchVaultData(updateSyncStateUI, forceRemote).then(remoteData => {
      if (remoteData && Array.isArray(remoteData.items) && remoteData.items.length > 0) {
        vaultData = remoteData;
        renderStatsUI(vaultData);
        if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
          renderCardsGrid();
        }
      }
    }).catch(e => console.warn('Background sync:', e));
  } catch (err) {
    console.error('loadDatabase error:', err);
    if (!vaultData || !Array.isArray(vaultData.items)) {
      vaultData = { items: [], stats: {} };
    }
    hideLoader();
    if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
      renderCardsGrid();
    }
  }
}

/**
 * Universal Database Restore: Restores all vocabulary data from Supabase or Cloud Database
 */
async function restoreDataFromDatabase(targetSource = 'all') {
  showLoader();
  let restoredCount = 0;
  let sourceLabel = '';
  let errorDetail = '';

  try {
    const sbConfig = getSupabaseConfig();
    let supabaseSuccess = false;

    // 1. Try Supabase PostgreSQL if requested or 'all'
    if ((targetSource === 'all' || targetSource === 'supabase') && sbConfig && sbConfig.url && sbConfig.key) {
      try {
        const sbRes = await fetchVaultFromSupabase();
        if (sbRes && sbRes.success && Array.isArray(sbRes.items) && sbRes.items.length > 0) {
          localStorage.removeItem('bev_deleted_ids');
          const itemMap = new Map();
          (sbRes.items || []).forEach(item => {
            if (item && (item.term || item.word)) {
              const term = (item.term || item.word).trim();
              const cleanItem = {
                id: item.id || `sb-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                category: item.category || 'words',
                term,
                meaning: item.meaning || item.definition || item.translation || '',
                example: item.example || item.sentence || '',
                favorite: Boolean(item.favorite),
                dateAdded: item.dateAdded || new Date().toISOString(),
                mistakeCount: item.mistakeCount || 0
              };
              itemMap.set(normalizeTerm(cleanItem.term), cleanItem);
            }
          });
          vaultData.items = Array.from(itemMap.values());
          restoredCount = vaultData.items.length;
          sourceLabel = 'Supabase PostgreSQL';
          supabaseSuccess = true;
        } else if (sbRes && !sbRes.success) {
          errorDetail = sbRes.error || `HTTP ${sbRes.status || ''}`;
        }
      } catch (sbErr) {
        errorDetail = sbErr.message || String(sbErr);
      }
    }

    // 2. If Supabase was not configured or didn't return items, restore from Cloud Database
    if (!supabaseSuccess && (targetSource === 'all' || targetSource === 'cloud')) {
      const cloudData = await restoreAllDataFromCloud(updateSyncStateUI);
      if (cloudData && Array.isArray(cloudData.items) && cloudData.items.length > 0) {
        vaultData = cloudData;
        restoredCount = vaultData.items.length;
        sourceLabel = 'Cloud Database';
      }
    }

    // 3. Fallback to Master Bundled Dataset if remote empty
    if (restoredCount === 0 && (!vaultData.items || vaultData.items.length === 0)) {
      vaultData = getLocalFallbackData();
      restoredCount = vaultData.items ? vaultData.items.length : 0;
      sourceLabel = 'Master Vault Backup';
    }

    // Save locally and sync
    await saveVaultData(vaultData, updateSyncStateUI);
    if (sbConfig && sbConfig.url && sbConfig.key) {
      syncAllVaultToSupabase(vaultData).catch(() => {});
    }

    renderStatsUI(vaultData);
    if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
      renderCardsGrid();
    }

    if (restoredCount > 0) {
      showBannerAlert(`✅ Data restored successfully from ${sourceLabel}! (${vaultData.items.length} total entries loaded)`, "success");
      return { success: true, count: vaultData.items.length, source: sourceLabel };
    } else {
      showBannerAlert(`Restore failed: ${errorDetail || 'No database entries found.'}`, "error");
      return { success: false, error: errorDetail };
    }
  } catch (err) {
    console.error("restoreDataFromDatabase error:", err);
    showBannerAlert(`Failed to restore data: ${err.message}`, "error");
    return { success: false, error: err.message };
  } finally {
    hideLoader();
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
    // 1. Sync to Supabase PostgreSQL Database
    syncAllVaultToSupabase(vaultData);
    
    // 2. Sync to local storage & Cloud DB
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
  if (!badge) return;
  const badgeText = badge.querySelector('.status-text');

  badge.className = 'status-indicator github-mode';
  if (badgeText) badgeText.innerText = 'Cloud Database';

  if (syncIndicator) {
    if (state === 'syncing') {
      syncIndicator.style.display = 'inline-flex';
      syncIndicator.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin"></i> Syncing...';
    } else if (state === 'synced') {
      syncIndicator.style.display = 'inline-flex';
      syncIndicator.innerHTML = '<i class="fa-solid fa-cloud-check" style="color: var(--success);"></i> Saved';
      setTimeout(() => {
        if (!isSyncing) syncIndicator.style.display = 'none';
      }, 2500);
    } else {
      syncIndicator.style.display = 'none';
    }
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

  if (!vaultData || !Array.isArray(vaultData.items) || vaultData.items.length === 0) {
    const fallback = getLocalFallbackData();
    if (fallback && Array.isArray(fallback.items) && fallback.items.length > 0) {
      vaultData = fallback;
    }
  }

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

function cleanForSorting(str) {
  if (!str) return '';
  return str.replace(/[^\p{L}\p{N}\s]/gu, '').trim().toLowerCase();
}

  // Sort items
  filteredItems.sort((a, b) => {
    if (sortBy === 'az') {
      const cleanA = cleanForSorting(a.term);
      const cleanB = cleanForSorting(b.term);
      const cmp = cleanA.localeCompare(cleanB, undefined, { sensitivity: 'base' });
      return cmp !== 0 ? cmp : a.term.localeCompare(b.term);
    } else if (sortBy === 'za') {
      const cleanA = cleanForSorting(a.term);
      const cleanB = cleanForSorting(b.term);
      const cmp = cleanB.localeCompare(cleanA, undefined, { sensitivity: 'base' });
      return cmp !== 0 ? cmp : b.term.localeCompare(a.term);
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
            <button class="btn btn-text hide-answer-btn" style="font-size: 0.85rem; padding: 0.25rem 0.5rem; color: var(--text-muted);" title="Hide Answer">
              <i class="fa-solid fa-chevron-up"></i> Hide Answer
            </button>
            <div style="margin-left: auto; display: flex; gap: 0.5rem;">
              <button class="action-icon-btn edit-item-btn" title="Edit">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="action-icon-btn delete-item-btn" style="color: var(--danger);" title="Delete">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // 1. Reveal / Hide Answer Button Handler
    const revealBtn = card.querySelector('.reveal-answer-btn');
    const answerPanel = card.querySelector('.answer-panel');
    const hideBtn = card.querySelector('.hide-answer-btn');

    const toggleAnswer = (show) => {
      if (show) {
        answerPanel.style.display = 'block';
        revealBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Hide Answer';
        revealBtn.classList.add('active-revealed');
      } else {
        answerPanel.style.display = 'none';
        revealBtn.innerHTML = '<i class="fa-solid fa-eye"></i> Show Answer';
        revealBtn.classList.remove('active-revealed');
      }
    };

    revealBtn.addEventListener('click', () => {
      const isCurrentlyHidden = answerPanel.style.display === 'none' || !answerPanel.style.display;
      toggleAnswer(isCurrentlyHidden);
    });

    if (hideBtn) {
      hideBtn.addEventListener('click', () => {
        toggleAnswer(false);
      });
    }

    // 2. Favorite toggle handler
    const favBtn = card.querySelector('.fav-btn');
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      item.favorite = !item.favorite;
      upsertItemInSupabase(item);
      renderCardsGrid();
      saveDatabase();
    });

    // 3. Edit Handler
    card.querySelector('.edit-item-btn').addEventListener('click', () => {
      openItemModal(item);
    });

    // 4. Delete Handler
    card.querySelector('.delete-item-btn').addEventListener('click', () => {
      if (confirm(`Are you sure you want to delete "${item.term}"?`)) {
        vaultData.deletedIds = vaultData.deletedIds || [];
        if (!vaultData.deletedIds.includes(item.id)) {
          vaultData.deletedIds.push(item.id);
        }
        vaultData.items = vaultData.items.filter(i => i.id !== item.id);
        deleteItemFromSupabase(item.id);
        renderCardsGrid();
        saveDatabase();
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

  // Strict Duplicate Check across ALL categories (Words, Slangs, Phrases, Idioms)
  const normTerm = normalizeTerm(term);
  const existingDuplicate = (vaultData.items || []).find(i => 
    i.id !== id && normalizeTerm(i.term) === normTerm
  );

  if (existingDuplicate) {
    const categoryLabels = { words: 'Words', slangs: 'Slangs', phrases: 'Phrases', idioms: 'Idioms' };
    const catLabel = categoryLabels[existingDuplicate.category] || existingDuplicate.category;
    showBannerAlert(`⚠️ Duplicate blocked! "${term}" already exists in your vault under ${catLabel}.`, "warning");
    const termInput = document.getElementById('item-term');
    if (termInput) {
      termInput.focus();
      termInput.select();
    }
    return;
  }

  let savedItem;
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
      savedItem = vaultData.items[index];
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
    savedItem = newEntry;
  }

  if (savedItem) {
    upsertItemInSupabase(savedItem);
  }

  closeItemModal();

  // Reset search input and favorite filter so the newly added card is guaranteed to show in UI
  const searchInput = document.getElementById('search-input');
  const favFilter = document.getElementById('filter-fav-btn');
  if (searchInput) searchInput.value = '';
  if (favFilter) favFilter.classList.remove('active');

  // Reload lists immediately
  if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
    if (category !== currentView) {
      navigateTo(category);
    } else {
      renderCardsGrid();
    }
  } else {
    navigateTo(category);
  }

  // Save database in background
  saveDatabase();
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
// QUIZ & DICTATION SECTION VIEW LOGIC
// ==========================================================================
const quizSetupPanel = document.getElementById('quiz-setup');
const quizActivePanel = document.getElementById('quiz-active');
const quizResultsPanel = document.getElementById('quiz-results');

const dictationSetupPanel = document.getElementById('dictation-setup');
const dictationActivePanel = document.getElementById('dictation-active');
const dictationResultsPanel = document.getElementById('dictation-results');

const tabBtnOpenQuiz = document.getElementById('tab-btn-open-quiz');
const tabBtnOpenDictation = document.getElementById('tab-btn-open-dictation');

let activeQuizViewMode = 'quiz'; // 'quiz' or 'dictation'

function setupQuizUI() {
  if (activeQuizViewMode === 'dictation') {
    openDictationSetup();
  } else {
    openQuizSetup();
  }

  // Setup tab switcher event listeners
  if (tabBtnOpenQuiz && !tabBtnOpenQuiz.dataset.bound) {
    tabBtnOpenQuiz.dataset.bound = 'true';
    tabBtnOpenQuiz.addEventListener('click', () => {
      activeQuizViewMode = 'quiz';
      openQuizSetup();
    });
  }

  if (tabBtnOpenDictation && !tabBtnOpenDictation.dataset.bound) {
    tabBtnOpenDictation.dataset.bound = 'true';
    tabBtnOpenDictation.addEventListener('click', () => {
      activeQuizViewMode = 'dictation';
      openDictationSetup();
    });
  }
}

function openQuizSetup() {
  activeQuizViewMode = 'quiz';
  if (tabBtnOpenQuiz) {
    tabBtnOpenQuiz.className = 'btn btn-primary active-mode-btn';
  }
  if (tabBtnOpenDictation) {
    tabBtnOpenDictation.className = 'btn btn-secondary';
  }

  if (quizSetupPanel) quizSetupPanel.style.display = 'block';
  if (quizActivePanel) quizActivePanel.style.display = 'none';
  if (quizResultsPanel) quizResultsPanel.style.display = 'none';

  if (dictationSetupPanel) dictationSetupPanel.style.display = 'none';
  if (dictationActivePanel) dictationActivePanel.style.display = 'none';
  if (dictationResultsPanel) dictationResultsPanel.style.display = 'none';

  // Category selection in quiz
  const categoryCards = quizSetupPanel.querySelectorAll('#quiz-category-grid .cat-radio-card');
  categoryCards.forEach(card => {
    const input = card.querySelector('input[type="radio"]');
    
    card.onclick = () => {
      categoryCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      input.checked = true;
    };

    if (input.checked) {
      card.classList.add('active');
    }
  });
}

function openDictationSetup() {
  activeQuizViewMode = 'dictation';
  if (tabBtnOpenQuiz) {
    tabBtnOpenQuiz.className = 'btn btn-secondary';
  }
  if (tabBtnOpenDictation) {
    tabBtnOpenDictation.className = 'btn btn-primary active-mode-btn';
  }

  if (quizSetupPanel) quizSetupPanel.style.display = 'none';
  if (quizActivePanel) quizActivePanel.style.display = 'none';
  if (quizResultsPanel) quizResultsPanel.style.display = 'none';

  if (dictationSetupPanel) dictationSetupPanel.style.display = 'block';
  if (dictationActivePanel) dictationActivePanel.style.display = 'none';
  if (dictationResultsPanel) dictationResultsPanel.style.display = 'none';

  // Update Sunday Streak Badge
  const sundayStats = getSundayRoutineStats();
  const streakPill = document.getElementById('sunday-streak-pill');
  if (streakPill) {
    streakPill.innerHTML = `<i class="fa-solid fa-fire" style="color: var(--gold);"></i> Sunday Streak: ${sundayStats.streak}`;
  }

  // Setup the 5 Dictation Category options
  const dictationCards = dictationSetupPanel.querySelectorAll('#dictation-category-grid .cat-radio-card');
  dictationCards.forEach(card => {
    const input = card.querySelector('input[type="radio"]');
    card.onclick = () => {
      dictationCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      input.checked = true;
    };
    if (input.checked) {
      card.classList.add('active');
    }
  });
}

// --------------------------------------------------------------------------
// MULTIPLE CHOICE QUIZ FLOW
// --------------------------------------------------------------------------
document.getElementById('start-quiz-btn').addEventListener('click', () => {
  const selectedCat = quizSetupPanel.querySelector('input[name="quiz-cat"]:checked')?.value || 'all';

  const success = startQuiz(selectedCat, vaultData.items || [], LEARN_TOPICS, 'mc');
  if (!success) {
    alert("Insufficient vocabulary in this category. Please add items before starting the quiz.");
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

  document.getElementById('quiz-answer-block').style.display = 'none';
  document.getElementById('quiz-next-btn').style.display = 'none';
  const feedbackBanner = document.getElementById('quiz-feedback-banner');
  if (feedbackBanner) {
    feedbackBanner.style.display = 'none';
    feedbackBanner.className = 'quiz-feedback-banner';
    feedbackBanner.innerHTML = '';
  }

  document.getElementById('quiz-progress-text').innerText = `Question ${progress.current} of ${progress.total}`;
  document.getElementById('quiz-progress-fill').style.width = `${progress.percentage}%`;
  
  const categoryPill = document.getElementById('quiz-card-category');
  categoryPill.innerText = item.category;
  
  const cardWordEl = document.getElementById('quiz-card-word');
  cardWordEl.innerText = item.term;
  
  const containsHebrew = /[\u0590-\u05FF]/.test(item.meaning);
  const meaningEl = document.getElementById('quiz-card-meaning');
  meaningEl.innerText = item.meaning;
  meaningEl.className = containsHebrew ? '' : 'ltr';

  document.getElementById('quiz-card-example').innerText = item.example;

  const speakBtn = document.getElementById('quiz-speak-btn');
  if (speakBtn) {
    speakBtn.onclick = async () => {
      speakBtn.classList.add('speaking');
      const rateSelect = document.getElementById('quiz-word-rate');
      const rate = rateSelect ? parseFloat(rateSelect.value) : 1.0;
      try {
        await speakText(item.term, { rate });
      } finally {
        speakBtn.classList.remove('speaking');
      }
    };
  }

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
  
  speakQuizSentenceBtn.onclick = async () => {
    const rate = parseFloat(rateSelect.value);
    const repeats = parseInt(repeatSelect.value);
    speakQuizSentenceBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    try {
      await speakMultipleTimes(item.example, rate, repeats);
    } finally {
      speakQuizSentenceBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    }
  };

  const meaningSpeakBtn = document.getElementById('quiz-meaning-speak-btn');
  if (meaningSpeakBtn) {
    meaningSpeakBtn.onclick = async () => {
      meaningSpeakBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Listen';
      try {
        const rateSelect = document.getElementById('quiz-word-rate');
        const rate = rateSelect ? parseFloat(rateSelect.value) : 1.0;
        await speakText(item.meaning, { rate });
      } catch (err) {
        console.error(err);
      } finally {
        meaningSpeakBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
      }
    };
  }

  const optionsContainer = document.getElementById('quiz-options');
  optionsContainer.innerHTML = '';

  const choices = getQuizChoices(item, vaultData.items || []);
  
  choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    
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

function handleQuizChoiceSelected(choice, selectedBtn, choices) {
  const optionsContainer = document.getElementById('quiz-options');
  if (!optionsContainer) return;

  const allButtons = Array.from(optionsContainer.querySelectorAll('.quiz-option-btn'));
  // Disable all buttons immediately to prevent duplicate selection
  allButtons.forEach(b => {
    b.disabled = true;
    b.classList.add('disabled');
  });

  const item = getCurrentQuestion();
  const isCorrect = Boolean(choice.isCorrect);

  // Grade the question in session
  gradeQuestion(isCorrect);

  if (isCorrect) {
    selectedBtn.classList.remove('disabled');
    selectedBtn.classList.add('correct');
    selectedBtn.innerHTML = `<span>${choice.text}</span> <i class="fa-solid fa-circle-check" style="color: var(--success); margin-left: 8px;"></i>`;
  } else {
    selectedBtn.classList.remove('disabled');
    selectedBtn.classList.add('incorrect');
    selectedBtn.innerHTML = `<span>${choice.text}</span> <i class="fa-solid fa-circle-xmark" style="color: var(--danger); margin-left: 8px;"></i>`;

    // Highlight the correct option among buttons
    allButtons.forEach((b, idx) => {
      if (choices[idx] && choices[idx].isCorrect) {
        b.classList.remove('disabled');
        b.classList.add('correct');
        b.innerHTML = `<span>${choices[idx].text}</span> <i class="fa-solid fa-circle-check" style="color: var(--success); margin-left: 8px;"></i>`;
      }
    });

    // Record mistake in vaultData
    if (item && item.id) {
      const idx = (vaultData.items || []).findIndex(i => i.id === item.id);
      if (idx !== -1) {
        vaultData.items[idx].mistakeCount = (vaultData.items[idx].mistakeCount || 0) + 1;
      }
    }
  }

  // Display feedback banner
  const feedbackBanner = document.getElementById('quiz-feedback-banner');
  if (feedbackBanner) {
    feedbackBanner.style.display = 'block';
    if (isCorrect) {
      feedbackBanner.className = 'quiz-feedback-banner correct';
      feedbackBanner.innerHTML = '<i class="fa-solid fa-circle-check"></i> Splendid! Exactly correct.';
    } else {
      feedbackBanner.className = 'quiz-feedback-banner incorrect';
      const cleanMeaning = item ? item.meaning : '';
      feedbackBanner.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Incorrect. Correct meaning: <strong>${cleanMeaning}</strong>`;
    }
  }

  // Reveal answer block & Next button
  const answerBlock = document.getElementById('quiz-answer-block');
  if (answerBlock) answerBlock.style.display = 'block';

  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) nextBtn.style.display = 'block';
}

async function completeQuiz() {
  const summary = getQuizSummary();

  // Update Database stats
  if (!vaultData.stats) {
    vaultData.stats = { quizzesCompleted: 0, correctAnswers: 0, incorrectAnswers: 0, history: [] };
  }
  vaultData.stats.quizzesCompleted = (vaultData.stats.quizzesCompleted || 0) + 1;
  vaultData.stats.correctAnswers = (vaultData.stats.correctAnswers || 0) + summary.correct;
  vaultData.stats.incorrectAnswers = (vaultData.stats.incorrectAnswers || 0) + summary.incorrect;

  showLoader();
  await saveDatabase();
  hideLoader();

  // Render Quiz Scoreboard
  quizSetupPanel.style.display = 'none';
  quizActivePanel.style.display = 'none';
  quizResultsPanel.style.display = 'block';

  const totalEl = document.getElementById('quiz-res-total');
  const correctEl = document.getElementById('quiz-res-correct');
  const incorrectEl = document.getElementById('quiz-res-incorrect');
  const pctEl = document.getElementById('quiz-res-pct');
  const ringEl = document.getElementById('quiz-score-ring');
  const summaryText = document.getElementById('quiz-results-summary-text');

  if (totalEl) totalEl.innerText = summary.total;
  if (correctEl) correctEl.innerText = summary.correct;
  if (incorrectEl) incorrectEl.innerText = summary.incorrect;
  if (pctEl) pctEl.innerText = `${summary.percentage}%`;
  if (ringEl) {
    const circumference = 314.16;
    const offset = circumference - (summary.percentage / 100) * circumference;
    ringEl.style.strokeDashoffset = offset;
  }
  if (summaryText) {
    if (summary.percentage >= 80) {
      summaryText.innerText = `Splendid! Outstanding British English mastery (${summary.percentage}%).`;
    } else if (summary.percentage >= 50) {
      summaryText.innerText = `Good effort! Keep practising to hone your British nuances (${summary.percentage}%).`;
    } else {
      summaryText.innerText = `Keep at it! Regular practice will strengthen your recall (${summary.percentage}%).`;
    }
  }
}

// Quiz Flow Button Listeners
document.getElementById('quiz-next-btn').addEventListener('click', async () => {
  if (nextQuestion()) {
    showQuizQuestion();
  } else {
    await completeQuiz();
  }
});

document.getElementById('quiz-cancel-btn').addEventListener('click', () => {
  if (confirm("Are you sure you want to exit the quiz? Progress in this session will not be saved.")) {
    openQuizSetup();
  }
});

document.getElementById('quiz-retry-btn').addEventListener('click', openQuizSetup);
document.getElementById('quiz-home-btn').addEventListener('click', () => navigateTo('words'));

// --------------------------------------------------------------------------
// GRAMMAR DICTATION FLOW (10 Words, 3 Attempts, Play Word Button)
// --------------------------------------------------------------------------
document.getElementById('start-dictation-btn').addEventListener('click', () => {
  const selectedCat = dictationSetupPanel.querySelector('input[name="dictation-cat"]:checked')?.value || 'words';
  
  const success = startDictationSession(selectedCat, vaultData.items || []);
  if (!success) {
    alert("Insufficient vocabulary in this category. Please add items or choose 'All Together (Mixed)'.");
    return;
  }

  showDictationWord();
});

function showDictationWord() {
  dictationSetupPanel.style.display = 'none';
  dictationActivePanel.style.display = 'block';
  dictationResultsPanel.style.display = 'none';

  const item = getCurrentDictationWord();
  const progress = getDictationProgress();

  // Reset panels and next button
  document.getElementById('dictation-answer-block').style.display = 'none';
  document.getElementById('dictation-next-btn').style.display = 'none';
  const feedbackBanner = document.getElementById('dictation-feedback-banner');
  feedbackBanner.style.display = 'none';

  // Update progress header
  document.getElementById('dictation-progress-text').innerText = `Word ${progress.current} of ${progress.total}`;
  document.getElementById('dictation-progress-fill').style.width = `${progress.percentage}%`;

  // Update category pill
  document.getElementById('dictation-card-category').innerText = item.category;

  // Render 3 Hearts (Attempts)
  renderDictationHearts(3);

  // Setup input field
  const inputEl = document.getElementById('dictation-user-input');
  inputEl.value = '';
  inputEl.disabled = false;
  inputEl.className = 'form-control';

  // Setup Check button
  const checkBtn = document.getElementById('dictation-check-btn');
  checkBtn.disabled = false;

  // Speak word handler (English Play Word button)
  const rateSelect = document.getElementById('dictation-word-rate');
  const playWordBtn = document.getElementById('dictation-play-word-btn');

  const playCurrentWordAudio = async () => {
    const rate = parseFloat(rateSelect?.value || 1.0);
    const btn = document.getElementById('dictation-play-word-btn');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Playing...</span>';
    try {
      await speakText(item.term, { rate });
    } finally {
      if (btn) btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>Play Word</span>';
    }
  };

  if (playWordBtn) {
    playWordBtn.onclick = playCurrentWordAudio;
  }

  // Dictation Check Logic with 3 Attempts
  const handleCheckAnswer = () => {
    const liveInput = document.getElementById('dictation-user-input');
    const liveCheckBtn = document.getElementById('dictation-check-btn');
    const typedValue = (liveInput?.value || '').trim();
    if (!typedValue) {
      liveInput?.focus();
      return;
    }

    const result = checkDictationAttempt(typedValue);

    if (result.isCorrect) {
      // SUCCESS!
      renderDictationHearts(result.attemptsLeft);
      if (liveInput) liveInput.disabled = true;
      if (liveCheckBtn) liveCheckBtn.disabled = true;

      feedbackBanner.className = 'quiz-feedback-banner correct';
      feedbackBanner.style.display = 'block';
      feedbackBanner.innerHTML = `<i class="fa-solid fa-circle-check"></i> Splendid! Exactly correct: <strong>"${result.correctTerm}"</strong>`;

      revealDictationAnswer(item, result.correctTerm);
      document.getElementById('dictation-next-btn').style.display = 'block';

    } else {
      // INCORRECT ATTEMPT
      renderDictationHearts(result.attemptsLeft);

      if (result.attemptsLeft === 2) {
        feedbackBanner.className = 'quiz-feedback-banner incorrect';
        feedbackBanner.style.display = 'block';
        feedbackBanner.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Incorrect ("${result.userInput}"). Try again! <strong>2 attempts remaining.</strong>`;
        liveInput?.select();
        liveInput?.focus();
        // Play word again to assist
        playCurrentWordAudio();

      } else if (result.attemptsLeft === 1) {
        feedbackBanner.className = 'quiz-feedback-banner incorrect';
        feedbackBanner.style.display = 'block';
        feedbackBanner.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Incorrect. Final attempt! <strong>1 attempt remaining.</strong>`;
        liveInput?.select();
        liveInput?.focus();
        // Play word again to assist
        playCurrentWordAudio();

      } else {
        // 3 ATTEMPTS EXHAUSTED! Move to next word
        if (liveInput) liveInput.disabled = true;
        if (liveCheckBtn) liveCheckBtn.disabled = true;

        feedbackBanner.className = 'quiz-feedback-banner incorrect';
        feedbackBanner.style.display = 'block';
        feedbackBanner.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> 3 attempts used! The correct spelling is: <strong>"${result.correctTerm}"</strong>`;

        // Record mistake in database
        const index = vaultData.items.findIndex(i => i.id === item.id);
        if (index !== -1) {
          vaultData.items[index].mistakeCount = (vaultData.items[index].mistakeCount || 0) + 1;
        }

        revealDictationAnswer(item, result.correctTerm);
        document.getElementById('dictation-next-btn').style.display = 'block';
      }
    }
  };

  if (checkBtn) {
    checkBtn.onclick = handleCheckAnswer;
  }
  if (inputEl) {
    inputEl.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleCheckAnswer();
      }
    };
    setTimeout(() => inputEl.focus(), 150);
  }
}

function renderDictationHearts(attemptsLeft) {
  const heartsContainer = document.getElementById('dictation-hearts');
  const attemptsLabel = document.getElementById('dictation-attempts-label');
  if (!heartsContainer || !attemptsLabel) return;

  let heartsHTML = '';
  for (let i = 1; i <= 3; i++) {
    if (i <= attemptsLeft) {
      heartsHTML += '<i class="fa-solid fa-heart attempt-heart active" style="color: var(--danger, #EF4444);"></i> ';
    } else {
      heartsHTML += '<i class="fa-solid fa-heart attempt-heart spent" style="color: #CBD5E1; opacity: 0.45;"></i> ';
    }
  }
  heartsContainer.innerHTML = heartsHTML;
  attemptsLabel.innerText = `${attemptsLeft} attempt${attemptsLeft === 1 ? '' : 's'} left`;
}

function revealDictationAnswer(item, correctTerm) {
  document.getElementById('dictation-revealed-word').innerText = correctTerm;
  document.getElementById('dictation-revealed-meaning').innerText = item.meaning;
  document.getElementById('dictation-revealed-example').innerText = item.example;

  // Bind Meaning audio button in Dictation
  const meaningBtn = document.getElementById('dictation-meaning-speak-btn');
  if (meaningBtn) {
    meaningBtn.onclick = async () => {
      meaningBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Listen';
      try {
        await speakText(item.meaning, { rate: 1.0 });
      } finally {
        meaningBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
      }
    };
  }

  // Setup Sentence Toolbar in Dictation
  const sentenceToolbar = document.getElementById('dictation-sentence-toolbar');
  sentenceToolbar.innerHTML = `
    <button class="mini-speak-btn speak-dictation-sentence-btn" title="Speak sentence">
      <i class="fa-solid fa-circle-play"></i>
    </button>
    <select class="dictation-sentence-rate" title="Speed">
      <option value="1">1.0x</option>
      <option value="0.75">0.75x</option>
      <option value="0.5">0.5x</option>
    </select>
  `;

  const speakSentenceBtn = sentenceToolbar.querySelector('.speak-dictation-sentence-btn');
  const rateSelect = sentenceToolbar.querySelector('.dictation-sentence-rate');
  speakSentenceBtn.addEventListener('click', async () => {
    const rate = parseFloat(rateSelect.value);
    speakSentenceBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    try {
      await speakText(item.example, { rate });
    } finally {
      speakSentenceBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    }
  });

  document.getElementById('dictation-answer-block').style.display = 'block';
}

// Dictation Next Button
document.getElementById('dictation-next-btn').addEventListener('click', async () => {
  if (nextDictationWord()) {
    showDictationWord();
  } else {
    await completeDictationSession();
  }
});

async function completeDictationSession() {
  const summary = getDictationSummary();

  // Record Sunday Routine Progress & Streak
  const sundayResult = recordSundayRoutineCompleted();

  // Update Database stats
  if (!vaultData.stats) {
    vaultData.stats = { quizzesCompleted: 0, correctAnswers: 0, incorrectAnswers: 0, history: [] };
  }
  vaultData.stats.quizzesCompleted = (vaultData.stats.quizzesCompleted || 0) + 1;
  vaultData.stats.correctAnswers = (vaultData.stats.correctAnswers || 0) + summary.correct;
  vaultData.stats.incorrectAnswers = (vaultData.stats.incorrectAnswers || 0) + summary.incorrect;

  showLoader();
  await saveDatabase();
  hideLoader();

  // Render Dictation Scoreboard
  dictationSetupPanel.style.display = 'none';
  dictationActivePanel.style.display = 'none';
  dictationResultsPanel.style.display = 'block';

  document.getElementById('dictation-res-correct').innerText = summary.correct;
  document.getElementById('dictation-res-incorrect').innerText = summary.incorrect;
  document.getElementById('dictation-results-summary-text').innerText = `Score: ${summary.correct} / 10 words spelled correctly`;

  const streakMsgEl = document.getElementById('dictation-streak-message');
  if (streakMsgEl) {
    streakMsgEl.innerText = `Sunday Streak: ${sundayResult.newStreak} week${sundayResult.newStreak === 1 ? '' : 's'} active! Practice every Sunday.`;
  }
}

// Dictation Exit & Retry buttons
document.getElementById('dictation-cancel-btn').addEventListener('click', () => {
  if (confirm("Are you sure you want to exit dictation? Progress in this session will not be saved.")) {
    openDictationSetup();
  }
});

document.getElementById('dictation-retry-btn').addEventListener('click', openDictationSetup);
document.getElementById('dictation-home-btn').addEventListener('click', () => navigateTo('words'));

// ==========================================================================
// SETTINGS VIEWS AND EVENT LISTENERS
// ==========================================================================
const gitForm = document.getElementById('settings-github-form');
const voiceSelect = document.getElementById('voice-selector');

function loadSettingsUI() {
  const sbConfig = getSupabaseConfig();
  const sbUrlInput = document.getElementById('supabase-url');
  const sbKeyInput = document.getElementById('supabase-key');
  if (sbUrlInput) sbUrlInput.value = sbConfig.url;
  if (sbKeyInput) sbKeyInput.value = sbConfig.key;

  const geminiKeyInput = document.getElementById('gemini-key');
  if (geminiKeyInput) {
    geminiKeyInput.value = getGeminiApiKey();
  }
  populateVoiceSelector();
}

// Database Key Entry & Auto-Restore Handler
async function handleDatabaseKeyEntry(rawKey, rawUrl = '') {
  if (!rawKey) {
    showBannerAlert("Please enter a database key or token.", "error");
    return;
  }
  const key = rawKey.trim();

  showLoader();

  // 1. Did the user paste a Supabase Project URL instead of an API Key?
  if (key.startsWith('http://') || key.startsWith('https://') || key.includes('.supabase.co')) {
    const urlInput = document.getElementById('supabase-url');
    if (urlInput) urlInput.value = key;
    const keyInput = document.getElementById('supabase-key');
    if (keyInput) keyInput.value = '';

    // Guarantee data is immediately populated from local vault
    vaultData = getLocalFallbackData();
    await saveVaultData(vaultData, updateSyncStateUI);
    renderStatsUI(vaultData);
    if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
      renderCardsGrid();
    }
    hideLoader();

    showBannerAlert("⚠️ שמת לב? הזנת את ה-Project URL במקום מפתח API (Anon Key). כתובת ה-URL עודכנה. אנא העתק את מפתח ה-anon public מתוך Supabase (Settings ⚙️ -> API) והדבק אותו כאן. (הנתונים באתר הוטענו בהצלחה!)", "warning");
    return;
  }

  // 2. Is it a GitHub Token? (ghp_..., github_pat_...)
  if (key.startsWith('ghp_') || key.startsWith('github_pat_')) {
    saveGitHubConfig(key);
    showBannerAlert("<i class='fa-solid fa-spinner fa-spin'></i> GitHub Token detected! Connecting to database repository...", "info");
    
    try {
      const restored = await restoreAllDataFromCloud(updateSyncStateUI);
      if (restored && Array.isArray(restored.items) && restored.items.length > 0) {
        vaultData = restored;
        await saveVaultData(vaultData, updateSyncStateUI);
        renderStatsUI(vaultData);
        if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
          renderCardsGrid();
        }
        hideLoader();
        showBannerAlert(`✅ GitHub Database Token verified! Successfully restored ${vaultData.items.length} vocabulary entries.`, "success");
        return;
      }
    } catch (err) {
      console.warn("GitHub PAT restore error:", err);
    }
  }

  // 3. Supabase Key Handling
  const isSupabaseJWT = key.startsWith('eyJ');
  let url = (rawUrl || document.getElementById('supabase-url')?.value || '').trim();
  const extractedRef = extractRefFromSupabaseJWT(key);
  if (extractedRef) {
    url = `https://${extractedRef}.supabase.co`;
    const urlInput = document.getElementById('supabase-url');
    if (urlInput) urlInput.value = url;
  }

  if (!url) {
    url = 'https://iqngleyyuwyaomufdmlm.supabase.co';
    const urlInput = document.getElementById('supabase-url');
    if (urlInput) urlInput.value = url;
  }

  saveSupabaseConfig(url, key);
  showBannerAlert("<i class='fa-solid fa-spinner fa-spin'></i> Connecting to Supabase database...", "info");

  try {
    const sbRes = await fetchVaultFromSupabase();

    if (sbRes && sbRes.success && Array.isArray(sbRes.items) && sbRes.items.length > 0) {
      localStorage.removeItem('bev_deleted_ids');
      const itemMap = new Map();
      sbRes.items.forEach(item => {
        if (item && (item.term || item.word)) {
          const cleanItem = {
            id: item.id || `sb-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            category: item.category || 'words',
            term: (item.term || item.word).trim(),
            meaning: item.meaning || item.definition || item.translation || '',
            example: item.example || item.sentence || '',
            favorite: Boolean(item.favorite),
            dateAdded: item.dateAdded || new Date().toISOString(),
            mistakeCount: item.mistakeCount || 0
          };
          itemMap.set(normalizeTerm(cleanItem.term), cleanItem);
        }
      });
      vaultData.items = Array.from(itemMap.values());
      await saveVaultData(vaultData, updateSyncStateUI);
      renderStatsUI(vaultData);
      if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
        renderCardsGrid();
      }
      hideLoader();
      showBannerAlert(`✅ Connected to Supabase! Successfully restored ${vaultData.items.length} entries from table "${sbRes.tableName}".`, "success");
      return;
    }

    // If Supabase table exists but has 0 rows: seed it with the full master vocabulary!
    if (sbRes && sbRes.success && Array.isArray(sbRes.items) && sbRes.items.length === 0) {
      const masterData = await restoreAllDataFromCloud(updateSyncStateUI);
      if (masterData && masterData.items && masterData.items.length > 0) {
        vaultData = masterData;
      } else {
        vaultData = getLocalFallbackData();
      }
      await syncAllVaultToSupabase(vaultData);
      await saveVaultData(vaultData, updateSyncStateUI);
      renderStatsUI(vaultData);
      if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
        renderCardsGrid();
      }
      hideLoader();
      showBannerAlert(`✅ Supabase connected! Initialized your database table with all ${vaultData.items.length} vocabulary entries.`, "success");
      return;
    }

    // 4. If Supabase returned an error (e.g. table not found or key is password instead of anon JWT):
    // Fall back to Cloud/Local Database so user is NEVER left empty
    const cloudData = await restoreAllDataFromCloud(updateSyncStateUI);
    if (cloudData && Array.isArray(cloudData.items) && cloudData.items.length > 0) {
      vaultData = cloudData;
    } else {
      vaultData = getLocalFallbackData();
    }
    await saveVaultData(vaultData, updateSyncStateUI);
    renderStatsUI(vaultData);
    if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
      renderCardsGrid();
    }
    hideLoader();

    if (!isSupabaseJWT) {
      showBannerAlert(`⚠️ המפתח שהוזן אינו Anon Key של Supabase (מפתח תקין מתחיל ב-'eyJ...'). אם הזנת את סיסמת הפרויקט, יש להעתיק את מפתח ה-anon מתוך Settings ⚙️ -> API. כל ${vaultData.items.length} המילים נטענו וזמינות עבורך באתר!`, "warning");
    } else if (sbRes && !sbRes.success) {
      showBannerAlert(`טבלת הנתונים vault_items עדיין לא נוצרה ב-Supabase (${sbRes.error}). כל ${vaultData.items.length} המילים נטענו עבורך באתר!`, "info");
    } else {
      showBannerAlert(`✅ כל ${vaultData.items.length} המילים והתכנים נטענו ומוצגים באתר!`, "success");
    }
  } catch (err) {
    hideLoader();
    console.error("handleDatabaseKeyEntry error:", err);
    vaultData = getLocalFallbackData();
    renderStatsUI(vaultData);
    if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
      renderCardsGrid();
    }
    showBannerAlert(`כל ${vaultData.items.length} המילים נטענו בהצלחה באתר!`, "success");
  }
}

// Supabase Form Submit Listener
const sbForm = document.getElementById('settings-supabase-form');
if (sbForm) {
  sbForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('supabase-url').value;
    const key = document.getElementById('supabase-key').value;
    await handleDatabaseKeyEntry(key, url);
  });
}

// Restore from Supabase button
const restoreSbBtn = document.getElementById('btn-restore-supabase');
if (restoreSbBtn) {
  restoreSbBtn.addEventListener('click', async () => {
    const url = document.getElementById('supabase-url')?.value;
    const key = document.getElementById('supabase-key')?.value;
    await handleDatabaseKeyEntry(key, url);
  });
}

// Restore Master Vault button (direct 100% reliable 1-click restore)
const restoreMasterBtn = document.getElementById('btn-restore-master-vault');
if (restoreMasterBtn) {
  restoreMasterBtn.addEventListener('click', async () => {
    showLoader();
    vaultData = getLocalFallbackData();
    localStorage.removeItem('bev_deleted_ids');
    await saveVaultData(vaultData, updateSyncStateUI);
    renderStatsUI(vaultData);
    if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
      renderCardsGrid();
    }
    // Also try pushing to Supabase in background if credentials present
    syncAllVaultToSupabase(vaultData).catch(() => {});
    hideLoader();
    showBannerAlert(`✅ שוחזרו בהצלחה כל ${vaultData.items.length} המילים והתכנים לתוך האתר!`, "success");
  });
}

// Auto-trigger on key paste or change
const sbKeyInputEl = document.getElementById('supabase-key');
if (sbKeyInputEl) {
  sbKeyInputEl.addEventListener('paste', () => {
    setTimeout(async () => {
      const val = sbKeyInputEl.value.trim();
      if (val.length > 15) {
        await handleDatabaseKeyEntry(val);
      }
    }, 120);
  });
  sbKeyInputEl.addEventListener('change', async () => {
    const val = sbKeyInputEl.value.trim();
    if (val.length > 15) {
      await handleDatabaseKeyEntry(val);
    }
  });
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

// Password visibility toggle buttons
document.querySelectorAll('.toggle-password-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const input = document.getElementById(targetId);
    if (!input) return;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    btn.innerHTML = isPassword ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
  });
});

// Sync Cloud Database Now Button click
const syncNowBtn = document.getElementById('btn-sync-now');
if (syncNowBtn) {
  syncNowBtn.addEventListener('click', async () => {
    syncNowBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Syncing Database...';
    try {
      const sbConfig = getSupabaseConfig();
      let sbInfo = '';

      // 1. If Supabase configured, pull remote items then push additions
      if (sbConfig && sbConfig.url && sbConfig.key) {
        const fetchRes = await fetchVaultFromSupabase();
        if (fetchRes && fetchRes.success && Array.isArray(fetchRes.items)) {
          fetchRes.items.forEach(sbItem => {
            if (sbItem && (sbItem.term || sbItem.word)) {
              const term = (sbItem.term || sbItem.word).trim();
              const idx = vaultData.items.findIndex(i => (sbItem.id && i.id === sbItem.id) || normalizeTerm(i.term) === normalizeTerm(term));
              if (idx !== -1) {
                vaultData.items[idx] = { ...vaultData.items[idx], ...sbItem };
              } else {
                vaultData.items.push(sbItem);
              }
            }
          });
        }
        const pushRes = await syncAllVaultToSupabase(vaultData);
        if (pushRes && pushRes.success) {
          sbInfo = ` (Supabase: ${pushRes.count} items synced)`;
        }
      }

      // 2. Save locally and to Cloud Database
      const ok = await saveVaultData(vaultData, updateSyncStateUI);
      renderStatsUI(vaultData);
      if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
        renderCardsGrid();
      }

      if (ok || sbInfo) {
        showBannerAlert(`✅ Database synced successfully!${sbInfo} (${vaultData.items.length} total entries)`, "success");
      } else {
        showBannerAlert(`Database saved to local cache (${vaultData.items.length} entries).`, "info");
      }
    } catch (err) {
      showBannerAlert(`Sync note: ${err.message}`, "error");
    } finally {
      syncNowBtn.innerHTML = '<i class="fa-solid fa-rotate"></i> Sync Database Now';
    }
  });
}

// Restore from Cloud Database button (in Backup Card)
const restoreCloudBtn = document.getElementById('btn-restore-cloud-db');
if (restoreCloudBtn) {
  restoreCloudBtn.addEventListener('click', async () => {
    if (confirm("Restore all vocabulary data from the database? Existing entries will be merged and preserved.")) {
      restoreCloudBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Restoring...';
      try {
        await restoreDataFromDatabase('all');
      } finally {
        restoreCloudBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i> Restore from Database';
      }
    }
  });
}

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

// Import database backup
const importBtn = document.getElementById('btn-import-data');
const importFileInput = document.getElementById('file-import-input');

if (importBtn && importFileInput) {
  importBtn.addEventListener('click', () => {
    importFileInput.click();
  });

  importFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        let itemsToImport = [];

        if (Array.isArray(importedData)) {
          itemsToImport = importedData;
        } else if (importedData && Array.isArray(importedData.items)) {
          itemsToImport = importedData.items;
        } else if (importedData && Array.isArray(importedData.data)) {
          itemsToImport = importedData.data;
        } else if (importedData && Array.isArray(importedData.vault_items)) {
          itemsToImport = importedData.vault_items;
        } else {
          showBannerAlert("Invalid backup file. File must contain an items array or a list of vocabulary entries.", "error");
          return;
        }

        // Merge imported items into vaultData
        let addedCount = 0;
        let updatedCount = 0;

        itemsToImport.forEach(item => {
          if (!item) return;
          const term = (item.term || item.word || item.name || '').trim();
          const meaning = (item.meaning || item.definition || item.translation || '').trim();
          if (!term) return;

          const category = item.category || 'words';
          const example = item.example || item.sentence || '';
          const favorite = Boolean(item.favorite);

          const index = vaultData.items.findIndex(i => 
            (item.id && i.id === item.id) || 
            normalizeTerm(i.term) === normalizeTerm(term)
          );

          if (index !== -1) {
            vaultData.items[index] = {
              ...vaultData.items[index],
              category: category || vaultData.items[index].category,
              meaning: meaning || vaultData.items[index].meaning,
              example: example || vaultData.items[index].example,
              favorite: item.favorite !== undefined ? favorite : vaultData.items[index].favorite
            };
            updatedCount++;
          } else {
            const newItem = {
              id: item.id || `imported-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
              category,
              term,
              meaning,
              example,
              favorite,
              dateAdded: item.dateAdded || new Date().toISOString(),
              mistakeCount: item.mistakeCount || 0
            };
            vaultData.items.push(newItem);
            addedCount++;
          }
        });

        if (importedData && importedData.stats) {
          vaultData.stats = {
            quizzesCompleted: Math.max(vaultData.stats.quizzesCompleted || 0, importedData.stats.quizzesCompleted || 0),
            correctAnswers: Math.max(vaultData.stats.correctAnswers || 0, importedData.stats.correctAnswers || 0),
            incorrectAnswers: Math.max(vaultData.stats.incorrectAnswers || 0, importedData.stats.incorrectAnswers || 0),
            history: [...(vaultData.stats.history || [])]
          };
        }

        // Save locally and sync to database
        await saveDatabase();
        renderStatsUI(vaultData);
        if (['words', 'slangs', 'phrases', 'idioms'].includes(currentView)) {
          renderCardsGrid();
        }

        showBannerAlert(`✅ Backup imported successfully! ${addedCount} new added, ${updatedCount} updated (${vaultData.items.length} total entries).`, "success");
      } catch (err) {
        showBannerAlert(`Failed to read backup file: ${err.message}`, "error");
      }
    };
    reader.readAsText(file);
    importFileInput.value = '';
  });
}

// Reset application data cached
document.getElementById('btn-reset-data').addEventListener('click', () => {
  if (confirm("WARNING: This will clear local browser cache on this device. Proceed?")) {
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

  // Theme Toggler (Desktop & Mobile)
  const themeToggle = document.getElementById('theme-toggle-btn');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle-btn');
  
  // Detect saved theme or phone system preference (Dark / Light)
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('bev_theme') || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButtonUI(savedTheme);

  const toggleThemeAction = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('bev_theme', newTheme);
    updateThemeButtonUI(newTheme);
  };

  if (themeToggle) themeToggle.addEventListener('click', toggleThemeAction);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleThemeAction);

  // Listen to OS system dark mode changes dynamically if user hasn't overridden
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('bev_theme')) {
        const newSystemTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newSystemTheme);
        updateThemeButtonUI(newSystemTheme);
      }
    });
  }

  // Init AI Assistant controllers
  initAIHandlers();

  // Init Goals & Achievements handlers
  setupGoalsEventListeners();

  // Init Learn Topic Modal Close Listener
  const learnModal = document.getElementById('learn-topic-modal');
  const learnCloseBtn = document.getElementById('learn-topic-close-btn');
  if (learnCloseBtn) learnCloseBtn.addEventListener('click', closeTopicDetail);
  if (learnModal) {
    learnModal.addEventListener('click', (e) => {
      if (e.target === learnModal) closeTopicDetail();
    });
  }
}

function updateThemeButtonUI(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  const mobileBtn = document.getElementById('mobile-theme-toggle-btn');
  
  if (theme === 'dark') {
    if (btn) btn.innerHTML = '<i class="fa-solid fa-sun"></i> <span>Light Mode</span>';
    if (mobileBtn) {
      mobileBtn.innerHTML = '<i class="fa-solid fa-sun" style="color: var(--gold);"></i>';
      mobileBtn.title = "Switch to Light Mode";
    }
  } else {
    if (btn) btn.innerHTML = '<i class="fa-solid fa-moon"></i> <span>Dark Mode</span>';
    if (mobileBtn) {
      mobileBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      mobileBtn.title = "Switch to Dark Mode";
    }
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
  const loaders = document.querySelectorAll('.loader-container');
  loaders.forEach(el => el.remove());
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
    { btnId: 'btn-ai-english-spoken', mode: 'english-spoken' },
    { btnId: 'btn-ai-british-spoken', mode: 'british-spoken' },
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
      if (!apiKey && mode !== 'english-spoken' && mode !== 'british-spoken') {
        showBannerAlert("Please configure your Gemini API Key in Settings first.", "error");
        navigateTo('settings');
        return;
      }

      // Show loading panel, hide response
      const loadingPanel = document.getElementById('ai-loading');
      const responsePanel = document.getElementById('ai-response');
      const loadingTitle = document.querySelector('#ai-loading h4');
      const loadingDesc = document.querySelector('#ai-loading p');

      if (mode === 'english-spoken') {
        if (loadingTitle) loadingTitle.innerText = "Analyzing Spoken English Phrasing...";
        if (loadingDesc) loadingDesc.innerText = "Checking how native speakers say this in real everyday conversations.";
      } else if (mode === 'british-spoken') {
        if (loadingTitle) loadingTitle.innerText = "Converting to Authentic British English...";
        if (loadingDesc) loadingDesc.innerText = "Transforming vocabulary, British idioms, and UK slang.";
      } else {
        if (loadingTitle) loadingTitle.innerText = "Tuning in with British AI Tutor...";
        if (loadingDesc) loadingDesc.innerText = "Fetching structured definitions and audio examples.";
      }

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

        if (mode === 'grammar') {
          vaultData.stats = vaultData.stats || {};
          vaultData.stats.aiGrammarCount = (vaultData.stats.aiGrammarCount || 0) + 1;
          saveDatabase();
        }
      } catch (err) {
        console.error(err);
        let userFriendlyMsg = err.message;
        const lowerErr = err.message.toLowerCase();
        if (lowerErr.includes("quota") || lowerErr.includes("exhausted") || lowerErr.includes("429") || lowerErr.includes("rate limit")) {
          userFriendlyMsg = "⚠️ Google AI service is temporarily busy (Rate Limit). Please wait about 30 seconds and try again.";
        } else if (lowerErr.includes("key") || lowerErr.includes("invalid") || lowerErr.includes("400") || lowerErr.includes("credential")) {
          userFriendlyMsg = "⚠️ Invalid API Key. Please verify you copied your full Gemini API key from Google AI Studio under Settings.";
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
            <button class="mini-copy-btn ai-copy-btn" data-text="${data.example.replace(/"/g, '&quot;')}" title="Copy sentence">
              <i class="fa-regular fa-copy"></i>
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
          <button class="mini-copy-btn ai-copy-btn" data-text="${data.correction.replace(/"/g, '&quot;')}" title="Copy sentence">
            <i class="fa-regular fa-copy"></i>
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
            <button class="mini-copy-btn ai-copy-btn" data-text="${data.example.replace(/"/g, '&quot;')}" title="Copy sentence">
              <i class="fa-regular fa-copy"></i>
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
                <button class="mini-copy-btn ai-copy-btn" data-text="${ex.text.replace(/"/g, '&quot;')}" title="Copy sentence">
                  <i class="fa-regular fa-copy"></i>
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
          <button class="mini-copy-btn ai-copy-btn" data-text="${data.translation.replace(/"/g, '&quot;')}" title="Copy sentence">
            <i class="fa-regular fa-copy"></i>
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
            <button class="mini-copy-btn ai-copy-btn" data-text="${data.example.replace(/"/g, '&quot;')}" title="Copy sentence">
              <i class="fa-regular fa-copy"></i>
            </button>
            <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">Listen (UK Accent)</span>
          </div>
        </div>
      </div>
    `;
  } else if (mode === 'english-spoken') {
    const statusLower = (data.status || '').toLowerCase();
    const isNatural = statusLower.includes('natural') && !statusLower.includes('unnatural');
    const badgeClass = isNatural ? 'correct' : 'spoken';
    const badgeIcon = isNatural ? 'fa-circle-check' : 'fa-comments';

    const alternativesHTML = (data.alternatives && data.alternatives.length > 0) ? `
      <div class="ai-section" style="margin-top: 1.25rem;">
        <h4>Alternative Spoken Expressions</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
          ${data.alternatives.map(alt => `
            <span class="reward-tag ai-pill-input" data-val="${alt.replace(/"/g, '&quot;')}" style="background: rgba(0, 36, 125, 0.08); color: var(--uk-blue); border-color: rgba(0, 36, 125, 0.2); font-size: 0.9rem; padding: 0.45rem 0.85rem; cursor: pointer;" title="Click to test in AI box">
              <i class="fa-solid fa-comment-dots"></i> ${alt}
            </span>
          `).join('')}
        </div>
      </div>
    ` : '';

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem;">
        <div class="ai-badge ${badgeClass}" style="margin-bottom: 0;">
          <i class="fa-solid ${badgeIcon}"></i> ${data.status || 'Natural Spoken English'}
        </div>
        ${data.context ? `<span class="category-pill" style="margin: 0; font-size: 0.8rem;"><i class="fa-solid fa-tag"></i> ${data.context}</span>` : ''}
      </div>

      <div class="ai-section">
        <h4>Natural Spoken English</h4>
        <div class="ai-correction-text" style="font-size: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <span>"${data.spokenVersion}"</span>
          <div class="sentence-speech-toolbar" style="margin: 0;">
            <button class="mini-speak-btn ai-speak-btn" data-text="${data.spokenVersion.replace(/"/g, '&quot;')}" title="Listen to pronunciation">
              <i class="fa-solid fa-circle-play"></i>
            </button>
            <button class="mini-copy-btn ai-copy-btn" data-text="${data.spokenVersion.replace(/"/g, '&quot;')}" title="Copy sentence">
              <i class="fa-regular fa-copy"></i>
            </button>
          </div>
        </div>
      </div>

      <hr style="border: none; border-top: 1px solid var(--border-color); margin: 1.25rem 0;">

      <div class="ai-section">
        <h4>Why Native Speakers Use This</h4>
        <p style="font-size: 1.05rem; line-height: 1.6;">${data.explanation}</p>
      </div>

      <div class="ai-section">
        <h4>Real-Life Spoken Conversation Example</h4>
        <div class="ai-example-box">
          <div class="example-text">"${data.spokenExample}"</div>
          <div class="sentence-speech-toolbar" style="margin-top: 0.75rem;">
            <button class="mini-speak-btn ai-speak-btn" data-text="${data.spokenExample.replace(/"/g, '&quot;')}" title="Speak sentence">
              <i class="fa-solid fa-circle-play"></i>
            </button>
            <button class="mini-copy-btn ai-copy-btn" data-text="${data.spokenExample.replace(/"/g, '&quot;')}" title="Copy sentence">
              <i class="fa-regular fa-copy"></i>
            </button>
            <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">Listen (UK Accent)</span>
          </div>
        </div>
      </div>

      ${alternativesHTML}
    `;
  } else if (mode === 'british-spoken') {
    const relatedHTML = (data.relatedBritishTerms && data.relatedBritishTerms.length > 0) ? `
      <div class="ai-section" style="margin-top: 1.25rem;">
        <h4>Related British Expressions</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
          ${data.relatedBritishTerms.map(term => `
            <span class="reward-tag ai-pill-input" data-val="${term.replace(/"/g, '&quot;')}" style="background: rgba(200, 16, 46, 0.08); color: var(--uk-red); border-color: rgba(200, 16, 46, 0.2); font-size: 0.9rem; padding: 0.45rem 0.85rem; cursor: pointer;" title="Click to test in AI box">
              <i class="fa-solid fa-crown"></i> ${term}
            </span>
          `).join('')}
        </div>
      </div>
    ` : '';

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem;">
        <div class="ai-badge british" style="background-color: rgba(200, 16, 46, 0.1); color: var(--uk-red); border: 1px solid rgba(200, 16, 46, 0.3); margin-bottom: 0;">
          <i class="fa-solid fa-crown"></i> 🇬🇧 ${data.britishSlangLevel || 'Authentic British English'}
        </div>
        ${data.usOrNeutral ? `<span class="category-pill" style="margin: 0; font-size: 0.8rem;">Standard / US: ${data.usOrNeutral}</span>` : ''}
      </div>

      <div class="ai-section">
        <h4>Authentic British Expression</h4>
        <div class="ai-correction-text" style="font-size: 1.5rem; border-left-color: var(--uk-red); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <span style="color: var(--uk-red);">"${data.britishVersion}"</span>
          <div class="sentence-speech-toolbar" style="margin: 0;">
            <button class="mini-speak-btn ai-speak-btn" data-text="${data.britishVersion.replace(/"/g, '&quot;')}" title="Listen to British pronunciation">
              <i class="fa-solid fa-circle-play"></i>
            </button>
            <button class="mini-copy-btn ai-copy-btn" data-text="${data.britishVersion.replace(/"/g, '&quot;')}" title="Copy sentence">
              <i class="fa-regular fa-copy"></i>
            </button>
          </div>
        </div>
      </div>

      <hr style="border: none; border-top: 1px solid var(--border-color); margin: 1.25rem 0;">

      <div class="ai-section">
        <h4>British Cultural Context & Usage</h4>
        <p style="font-size: 1.05rem; line-height: 1.6;">${data.explanation}</p>
      </div>

      <div class="ai-section">
        <h4>Quintessential British Dialogue</h4>
        <div class="ai-example-box" style="border-left: 3px solid var(--uk-blue);">
          <div class="example-text">"${data.britishExample}"</div>
          <div class="sentence-speech-toolbar" style="margin-top: 0.75rem;">
            <button class="mini-speak-btn ai-speak-btn" data-text="${data.britishExample.replace(/"/g, '&quot;')}" title="Speak British sentence">
              <i class="fa-solid fa-circle-play"></i>
            </button>
            <button class="mini-copy-btn ai-copy-btn" data-text="${data.britishExample.replace(/"/g, '&quot;')}" title="Copy sentence">
              <i class="fa-regular fa-copy"></i>
            </button>
            <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">Listen (Pure British Accent)</span>
          </div>
        </div>
      </div>

      ${relatedHTML}
    `;
  }

  // Bind click on interactive suggestion pills to fill textarea
  container.querySelectorAll('.ai-pill-input').forEach(pill => {
    pill.addEventListener('click', () => {
      const term = pill.getAttribute('data-val');
      const inputEl = document.getElementById('ai-input');
      if (inputEl && term) {
        inputEl.value = term;
        inputEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

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

  // Bind copy click event listeners to copy buttons
  const copyButtons = container.querySelectorAll('.ai-copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-text');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const ta = document.createElement('textarea');
          ta.value = textToCopy;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }

        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--success);"></i>';
        btn.classList.add('copied');
        btn.setAttribute('title', 'Copied!');

        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.classList.remove('copied');
          btn.setAttribute('title', 'Copy sentence');
        }, 1800);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    });
  });
}

// ==========================================================================
// GOALS & ACHIEVEMENTS CONTROLLER
// ==========================================================================
let activeGoalsTab = 'goals';
let activeGoalsDomain = 'all';

function renderGoalsUI() {
  const stats = calculateGoalsStats(vaultData);
  
  // Update Header Summary
  const unlockedCount = document.getElementById('goals-unlocked-count');
  const progressFill = document.getElementById('goals-progress-bar-fill');
  const progressText = document.getElementById('goals-progress-text');
  const countText = document.getElementById('goals-count-text');

  if (unlockedCount) unlockedCount.innerText = stats.unlockedTrophies;
  if (progressFill) progressFill.style.width = `${stats.percentage}%`;
  if (progressText) progressText.innerText = `${stats.percentage}% Completed`;
  if (countText) countText.innerText = `${stats.completedCount} / ${stats.totalGoalsCount} Unlocked`;

  // Render Grid Cards
  const grid = document.getElementById('goals-grid-container');
  if (!grid) return;
  grid.innerHTML = '';

  const goalsState = getGoalsState(vaultData);
  const completedSet = new Set(goalsState.completedIds || []);

  const allGoals = getAllActiveGoals(vaultData);

  const filteredGoals = allGoals.filter(goal => {
    if (activeGoalsDomain !== 'all' && goal.category !== activeGoalsDomain) return false;
    return true;
  });

  if (filteredGoals.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1.5rem; color: var(--text-muted);">
        <i class="fa-solid fa-bullseye" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--gold);"></i>
        <h4>No goals found in this domain.</h4>
        <p style="font-size: 0.9rem;">Click "+ Create Custom Goal" to add your own personal milestone!</p>
      </div>
    `;
    return;
  }

  filteredGoals.forEach(goal => {
    const isCompleted = completedSet.has(goal.id) || goal.completed;
    const catInfo = GOAL_CATEGORIES[goal.category] || { emoji: '🎯', labelEng: goal.category, name: goal.category };
    const domainLabel = catInfo.labelEng || catInfo.name || goal.category;

    if (activeGoalsTab === 'goals') {
      const card = document.createElement('div');
      card.className = `goal-card ${isCompleted ? 'completed' : ''}`;
      card.innerHTML = `
        <input type="checkbox" class="goal-checkbox" data-id="${goal.id}" ${isCompleted ? 'checked' : ''}>
        <div class="goal-info">
          <div class="goal-title">${goal.title}</div>
          <div class="goal-meta">
            <span class="goal-badge">${catInfo.emoji} ${domainLabel}</span>
            ${goal.isCustom ? `<span class="goal-badge" style="background: var(--gold); color: #111;">Custom Goal</span>` : ''}
            ${goal.targetDate ? `<span>📅 ${goal.targetDate}</span>` : ''}
          </div>
        </div>
        <div class="goal-card-actions">
          <button class="goal-action-btn edit-goal-btn" data-id="${goal.id}" title="Edit Goal">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="goal-action-btn delete-goal-btn" data-id="${goal.id}" title="Delete Goal">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;
      grid.appendChild(card);
    } else {
      // Achievements Tab (Pure trophy cards without edit/delete action buttons)
      const card = document.createElement('div');
      card.className = `achievement-card ${isCompleted ? 'unlocked' : ''}`;
      card.innerHTML = `
        <div class="achievement-icon">
          ${isCompleted ? '🏆' : '🔒'}
        </div>
        <div style="flex: 1;">
          <h4 style="font-size: 1rem; margin-bottom: 0.25rem; color: var(--text-main);">${goal.achievementTitle || goal.title}</h4>
          <span class="goal-badge">${catInfo.emoji} ${domainLabel}</span>
          <span style="font-size: 0.75rem; color: ${isCompleted ? 'var(--success)' : 'var(--text-muted)'}; margin-left: 0.5rem; font-weight: 600;">
            ${isCompleted ? '✓ Unlocked' : '🔒 Locked'}
          </span>
        </div>
      `;
      grid.appendChild(card);
    }
  });

  // Bind checkbox events (toggles completion directly without popups)
  grid.querySelectorAll('.goal-checkbox').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const goalId = e.target.getAttribute('data-id');
      toggleGoalCompletion(goalId, vaultData);
      saveDatabase();
      renderGoalsUI();
    });
  });

  // Bind edit goal events
  grid.querySelectorAll('.edit-goal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const goalId = e.currentTarget.getAttribute('data-id');
      const goalObj = allGoals.find(g => g.id === goalId);
      if (!goalObj) return;

      document.getElementById('edit-goal-id').value = goalObj.id;
      document.getElementById('edit-goal-title').value = goalObj.title || '';
      document.getElementById('edit-goal-category').value = goalObj.category || 'special';
      document.getElementById('edit-goal-achievement-title').value = goalObj.achievementTitle || `🏆 ${goalObj.title || ''}`;
      document.getElementById('edit-goal-date').value = goalObj.targetDate || '';

      document.getElementById('edit-goal-modal').classList.add('active');
    });
  });

  // Bind delete goal events
  grid.querySelectorAll('.delete-goal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const goalId = e.currentTarget.getAttribute('data-id');
      if (confirm("Are you sure you want to delete this goal?")) {
        deleteGoal(goalId, vaultData);
        saveDatabase();
        renderGoalsUI();
        showBannerAlert("🗑️ Goal deleted successfully.", "info");
      }
    });
  });
}

function setupGoalsEventListeners() {
  // Tab Switcher (Goals vs Achievements)
  document.querySelectorAll('.goals-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.goals-tab-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      activeGoalsTab = e.currentTarget.getAttribute('data-tab');
      renderGoalsUI();
    });
  });

  // Domain Filter Chips
  document.querySelectorAll('#domain-chips-container .chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      document.querySelectorAll('#domain-chips-container .chip').forEach(c => c.classList.remove('active'));
      e.currentTarget.classList.add('active');
      activeGoalsDomain = e.currentTarget.getAttribute('data-domain');
      renderGoalsUI();
    });
  });

  // Custom Goal Modal Trigger
  const createBtn = document.getElementById('btn-create-custom-goal');
  const customModal = document.getElementById('custom-goal-modal');
  const closeBtn = document.getElementById('custom-goal-close-btn');
  const cancelBtn = document.getElementById('custom-goal-cancel-btn');

  if (createBtn) createBtn.addEventListener('click', () => customModal.classList.add('active'));
  if (closeBtn) closeBtn.addEventListener('click', () => customModal.classList.remove('active'));
  if (cancelBtn) cancelBtn.addEventListener('click', () => customModal.classList.remove('active'));

  // Custom Goal Form Submit
  const customForm = document.getElementById('custom-goal-form');
  if (customForm) {
    customForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('custom-goal-title').value;
      const category = document.getElementById('custom-goal-category').value;
      const targetCount = document.getElementById('custom-goal-target').value;
      const targetDate = document.getElementById('custom-goal-date').value;

      addCustomGoal({ title, category, targetCount, targetDate }, vaultData);
      saveDatabase();
      customModal.classList.remove('active');
      customForm.reset();
      showBannerAlert("➕ Custom Goal created successfully!", "success");
      renderGoalsUI();
    });
  }

  // Edit Goal Modal Controls & Submit
  const editModal = document.getElementById('edit-goal-modal');
  const editCloseBtn = document.getElementById('edit-goal-close-btn');
  const editCancelBtn = document.getElementById('edit-goal-cancel-btn');
  const editForm = document.getElementById('edit-goal-form');

  if (editCloseBtn) editCloseBtn.addEventListener('click', () => editModal.classList.remove('active'));
  if (editCancelBtn) editCancelBtn.addEventListener('click', () => editModal.classList.remove('active'));

  if (editForm) {
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const goalId = document.getElementById('edit-goal-id').value;
      const title = document.getElementById('edit-goal-title').value;
      const category = document.getElementById('edit-goal-category').value;
      const achievementTitle = document.getElementById('edit-goal-achievement-title').value;
      const targetDate = document.getElementById('edit-goal-date').value;

      editGoal(goalId, { title, category, achievementTitle, targetDate }, vaultData);
      saveDatabase();
      editModal.classList.remove('active');
      showBannerAlert("✏️ Goal updated successfully!", "success");
      renderGoalsUI();
    });
  }

  // Games Event Listeners
  initGamesEventListeners();
}

// ==========================================================================
// GAMES & GAMIFICATION CONTROLLER
// ==========================================================================
function renderGamesUI(resetPanels = true) {
  const stats = getGameStats(vaultData);
  const lvlInfo = calculateUserLevel(stats.xp);

  const crownEl = document.getElementById('game-level-crown');
  const levelTitleEl = document.getElementById('game-user-level-title');
  const xpSubtextEl = document.getElementById('game-xp-subtext');
  const xpBarFill = document.getElementById('game-xp-bar-fill');

  if (crownEl) crownEl.innerText = lvlInfo.badge.split(' ')[0];
  if (levelTitleEl) levelTitleEl.innerText = lvlInfo.title;
  if (xpSubtextEl) xpSubtextEl.innerText = `${stats.xp} / ${lvlInfo.nextXp} XP`;
  if (xpBarFill) xpBarFill.style.width = `${lvlInfo.pct}%`;

  const streakEl = document.getElementById('game-user-streak');
  const coinsEl = document.getElementById('game-user-coins');
  const xpEl = document.getElementById('game-user-xp');

  if (streakEl) streakEl.innerText = stats.streak;
  if (coinsEl) coinsEl.innerText = stats.coins;
  if (xpEl) xpEl.innerText = stats.xp;

  if (resetPanels) {
    const hubPanel = document.getElementById('games-hub-panel');
    const activePanel = document.getElementById('game-active-panel');

    if (hubPanel) hubPanel.style.display = 'block';
    if (activePanel) activePanel.style.display = 'none';
  }
}

function initGamesEventListeners() {
  document.querySelectorAll('.btn-launch-game').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const gameKey = e.currentTarget.getAttribute('data-game');
      launchGame(gameKey);
    });
  });

  const gamesSearchInput = document.getElementById('games-search-input');
  const gamesSearchClear = document.getElementById('games-search-clear');
  const gamesSearchCount = document.getElementById('games-search-count');
  const gamesNoResults = document.getElementById('games-no-results');

  const filterGamesGrid = () => {
    const activeChip = document.querySelector('#game-category-chips .chip.active');
    const cat = activeChip ? activeChip.getAttribute('data-cat') : 'all';
    const query = (gamesSearchInput ? gamesSearchInput.value : '').trim().toLowerCase();

    if (gamesSearchClear) {
      gamesSearchClear.style.display = query.length > 0 ? 'flex' : 'none';
    }

    let visibleCount = 0;
    document.querySelectorAll('.games-grid .game-card').forEach(card => {
      const cardCat = card.getAttribute('data-cat') || '';
      const matchesCat = (cat === 'all' || cardCat === cat);
      const cardText = (card.innerText || '').toLowerCase();
      const gameKey = (card.querySelector('.btn-launch-game')?.getAttribute('data-game') || '').toLowerCase();
      const matchesQuery = !query || cardText.includes(query) || cardCat.toLowerCase().includes(query) || gameKey.includes(query);

      if (matchesCat && matchesQuery) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (gamesSearchCount) {
      gamesSearchCount.innerText = `${visibleCount} ${visibleCount === 1 ? 'Game' : 'Games'}`;
    }

    if (gamesNoResults) {
      gamesNoResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  if (gamesSearchInput) {
    gamesSearchInput.addEventListener('input', filterGamesGrid);
  }

  if (gamesSearchClear) {
    gamesSearchClear.addEventListener('click', () => {
      if (gamesSearchInput) {
        gamesSearchInput.value = '';
        gamesSearchInput.focus();
      }
      filterGamesGrid();
    });
  }

  // Filter chips in Games Hub
  document.querySelectorAll('#game-category-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#game-category-chips .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filterGamesGrid();
    });
  });

  const dailyBtn = document.getElementById('btn-start-daily-challenge');
  if (dailyBtn) {
    dailyBtn.addEventListener('click', () => {
      launchGame('word-match', true);
    });
  }

  const exitBtn = document.getElementById('btn-exit-game');
  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      document.getElementById('games-hub-panel').style.display = 'block';
      document.getElementById('game-active-panel').style.display = 'none';
    });
  }

  const exitBtnX = document.getElementById('btn-active-panel-close-x');
  if (exitBtnX) {
    exitBtnX.addEventListener('click', () => {
      document.getElementById('games-hub-panel').style.display = 'block';
      document.getElementById('game-active-panel').style.display = 'none';
    });
  }
}

function launchGame(gameKey, isDaily = false) {
  const hubPanel = document.getElementById('games-hub-panel');
  const activePanel = document.getElementById('game-active-panel');
  const stageEl = document.getElementById('game-stage-container');
  const titleEl = document.getElementById('active-game-title');

  const gameTitles = {
    'word-match': '🧩 Word Match',
    'quick-choice': '⚡ Quick Choice',
    'fill-gap': '📝 Fill the Gap',
    'word-scramble': '🔤 Word Scramble',
    'listen-choose': '🎧 Listen & Choose',
    'say-it': '🗣️ Say It',
    'guess-word': '🕵️ Guess the Word',
    'odd-one-out': '🚫 Odd One Out',
    'build-sentence': '💬 Build the Sentence',
    'english-quiz': '🏆 English Quiz',
    'synonym-hunt': '🧠 Synonym Hunt',
    'antonym-attack': '⚔️ Antonym Attack',
    'definition-duel': '📖 Definition Duel',
    'word-ladder': '🪜 Word Ladder',
    'missing-letter': '🔤 Missing Letter',
    'spell-race': '🏁 Spell Race',
    'sentence-detective': '🕵️ Sentence Detective',
    'grammar-battle': '⚔️ Grammar Battle',
    'tense-challenge': '⏳ Tense Challenge',
    'preposition-master': '🎯 Preposition Master',
    'article-challenge': '📝 Article Challenge',
    'natural-english': '🌍 Natural English',
    'formal-casual': '🎩 Formal or Casual?',
    'complete-conversation': '💬 Complete Conversation',
    'story-builder': '📚 Story Builder',
    'word-categories': '🗂️ Word Categories',
    'speed-reading': '⚡ Speed Reading',
    'true-false': '✅❌ True or False?',
    'memory-challenge': '🧠 Memory Challenge',
    'word-chain': '🔗 Word Chain',
    'category-rush': '🚀 Category Rush',
    'forbidden-word': '🚫 Forbidden Word',
    'english-trivia': '🌎 English Trivia',
    'word-connections': '🧩 Word Connections'
  };

  if (titleEl) titleEl.innerText = (isDaily ? '⭐ Daily Challenge: ' : '') + (gameTitles[gameKey] || 'Mini Game');

  if (hubPanel) hubPanel.style.display = 'none';
  if (activePanel) activePanel.style.display = 'block';
  if (stageEl) stageEl.innerHTML = '';

  const handleGameComplete = (result) => {
    const totalCount = result.total || 20;
    const correctCount = result.correct !== undefined ? result.correct : (result.isPerfect ? totalCount : Math.round(totalCount * 0.8));
    const percentage = result.percentage !== undefined ? result.percentage : Math.round((correctCount / totalCount) * 100);

    let xpAward = result.xp !== undefined ? result.xp : (correctCount * 10);
    let coinAward = result.coins !== undefined ? result.coins : (correctCount * 2);

    if (isDaily) {
      xpAward += 50;
      coinAward += 20;
    }

    awardGameRewards(vaultData, xpAward, coinAward, gameKey, correctCount === totalCount, saveDatabase);

    // Dynamic praise & spoken feedback depending on the user's score
    let feedbackAudio = '';
    let feedbackSubtitle = '';
    let feedbackBadge = '';

    if (percentage === 100) {
      feedbackAudio = "Splendid! Absolutely chuffed with your perfect score! You are a true British English master.";
      feedbackSubtitle = `Perfect ${correctCount} out of ${totalCount}! Complete mastery of British English!`;
      feedbackBadge = "👑 Perfect Score";
    } else if (percentage >= 80) {
      feedbackAudio = "Brilliant work! Jolly good effort, you are doing wonderfully!";
      feedbackSubtitle = "Outstanding performance! Keep up the great momentum!";
      feedbackBadge = "🏆 Excellent";
    } else if (percentage >= 60) {
      feedbackAudio = "Good job! Practice makes perfect, keep at it and have another go.";
      feedbackSubtitle = "Solid effort! A bit more practice and you will reach perfection.";
      feedbackBadge = "👍 Good Job";
    } else {
      feedbackAudio = "Chin up! Keep practicing every day and you will master it in no time.";
      feedbackSubtitle = "Every mistake is a step toward mastery — play again to improve your score!";
      feedbackBadge = "💪 Keep Practising";
    }

    stageEl.innerHTML = `
      <div class="text-center card game-summary-card" style="position: relative; padding: 2.5rem 1.5rem; max-width: 600px; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.08);">
        <!-- Top Corner 'X' Close Button -->
        <button id="btn-summary-close-x" class="btn-close-x" title="Exit to Games Hub">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="trophy-icon" style="font-size: 3.5rem; color: ${percentage >= 70 ? 'var(--gold)' : 'var(--uk-blue)'}; margin-bottom: 0.75rem;">
          <i class="fa-solid ${percentage >= 90 ? 'fa-crown' : percentage >= 70 ? 'fa-trophy' : 'fa-award'}"></i>
        </div>
        <h3 style="font-size: 1.8rem; font-family: 'Playfair Display', serif; margin-bottom: 0.25rem;">${result.title}</h3>
        <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 1.25rem;">${result.details || `Successfully completed all ${totalCount} questions!`}</p>

        <!-- Spoken Feedback According to Score -->
        <div class="summary-speech-box">
          <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; flex-wrap: wrap;">
            <span class="category-pill" style="margin: 0; font-size: 0.8rem;">${feedbackBadge}</span>
            <button class="mini-speak-btn" id="btn-replay-feedback-audio" title="Play Voice Feedback" style="width: 28px; height: 28px; font-size: 0.85rem;">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
          <div class="summary-speech-quote">"${feedbackAudio}"</div>
          <div class="summary-speech-hebrew">${feedbackSubtitle}</div>
        </div>

        <!-- 3 Performance Stat Cards -->
        <div class="results-stats-row" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin-bottom: 1.5rem;">
          <div class="results-stat-card" style="background: rgba(0, 36, 125, 0.05); padding: 1rem 0.5rem; border-radius: 12px; border: 1px solid rgba(0, 36, 125, 0.1);">
            <span class="stat-val" style="font-size: 1.7rem; font-weight: 800; color: var(--uk-blue); display: block;">${correctCount} / ${totalCount}</span>
            <span class="stat-lbl" style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Correct Answers</span>
          </div>
          <div class="results-stat-card success" style="background: rgba(16, 185, 129, 0.08); padding: 1rem 0.5rem; border-radius: 12px; border: 1px solid rgba(16, 185, 129, 0.2);">
            <span class="stat-val" style="font-size: 1.7rem; font-weight: 800; color: #10B981; display: block;">${percentage}%</span>
            <span class="stat-lbl" style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Success Rate</span>
          </div>
          <div class="results-stat-card" style="background: rgba(212, 175, 55, 0.1); padding: 1rem 0.5rem; border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.25);">
            <span class="stat-val" style="font-size: 1.7rem; font-weight: 800; color: var(--gold); display: block;">+${xpAward}</span>
            <span class="stat-lbl" style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Final XP</span>
          </div>
        </div>

        <div class="reward-tags" style="justify-content: center; margin-bottom: 2rem;">
          <span class="reward-tag" style="background-color: rgba(0, 36, 125, 0.1); color: var(--uk-blue); border-color: rgba(0, 36, 125, 0.2); font-size: 0.95rem; padding: 0.5rem 1rem;">
            <i class="fa-solid fa-bolt"></i> +${xpAward} XP Earned
          </span>
          <span class="reward-tag" style="background-color: rgba(212, 175, 55, 0.15); color: var(--gold); border-color: rgba(212, 175, 55, 0.3); font-size: 0.95rem; padding: 0.5rem 1rem;">
            <i class="fa-solid fa-coins"></i> +${coinAward} Coins
          </span>
        </div>

        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button class="btn btn-primary" id="btn-play-again" style="padding: 0.85rem 1.8rem; font-size: 1rem;">
            <i class="fa-solid fa-rotate-right"></i> Play Again
          </button>
          <button class="btn btn-secondary" id="btn-back-hub" style="padding: 0.85rem 1.8rem; font-size: 1rem; border-color: var(--uk-red); color: var(--uk-red);">
            <i class="fa-solid fa-right-from-bracket"></i> Exit Game
          </button>
        </div>
      </div>
    `;

    // Update XP/Coins/Level header WITHOUT hiding the active game panel!
    renderGamesUI(false);

    // Automatically speak the score feedback phrase out loud with UK accent
    setTimeout(() => {
      speakText(feedbackAudio);
    }, 450);

    stageEl.querySelector('#btn-replay-feedback-audio')?.addEventListener('click', () => {
      speakText(feedbackAudio);
    });

    stageEl.querySelector('#btn-summary-close-x')?.addEventListener('click', () => {
      if (hubPanel) hubPanel.style.display = 'block';
      if (activePanel) activePanel.style.display = 'none';
    });

    stageEl.querySelector('#btn-play-again').addEventListener('click', () => {
      launchGame(gameKey, isDaily);
    });

    stageEl.querySelector('#btn-back-hub').addEventListener('click', () => {
      if (hubPanel) hubPanel.style.display = 'block';
      if (activePanel) activePanel.style.display = 'none';
    });
  };

  const launchers = {
    'word-match': startWordMatchGame,
    'quick-choice': startQuickChoiceGame,
    'fill-gap': startFillGapGame,
    'word-scramble': startWordScrambleGame,
    'listen-choose': startListenChooseGame,
    'say-it': startSayItGame,
    'guess-word': startGuessWordGame,
    'odd-one-out': startOddOneOutGame,
    'build-sentence': startBuildSentenceGame,
    'english-quiz': startEnglishQuizGame,
    'synonym-hunt': startSynonymHuntGame,
    'antonym-attack': startAntonymAttackGame,
    'definition-duel': startDefinitionDuelGame,
    'word-ladder': startWordLadderGame,
    'missing-letter': startMissingLetterGame,
    'spell-race': startSpellRaceGame,
    'sentence-detective': startSentenceDetectiveGame,
    'grammar-battle': startGrammarBattleGame,
    'tense-challenge': startTenseChallengeGame,
    'preposition-master': startPrepositionMasterGame,
    'article-challenge': startArticleChallengeGame,
    'natural-english': startNaturalEnglishGame,
    'formal-casual': startFormalCasualGame,
    'complete-conversation': startCompleteConversationGame,
    'story-builder': startStoryBuilderGame,
    'word-categories': startWordCategoriesGame,
    'speed-reading': startSpeedReadingGame,
    'true-false': startTrueFalseGame,
    'memory-challenge': startMemoryChallengeGame,
    'word-chain': startWordChainGame,
    'category-rush': startCategoryRushGame,
    'forbidden-word': startForbiddenWordGame,
    'english-trivia': startEnglishTriviaGame,
    'word-connections': startWordConnectionsGame
  };

  const fn = launchers[gameKey] || startQuickChoiceGame;
  fn(stageEl, vaultData, handleGameComplete);
}
