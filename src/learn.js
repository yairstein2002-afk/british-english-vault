/**
 * British English Vault - Learn & Practice UI Module
 */

import { LEARN_CATEGORIES, LEARN_TOPICS, GRAMMAR_CHECKLIST, WHERE_TO_START_GUIDE } from './learnData.js';
import { speakText } from './speech.js';

let activeCategory = 'all';
let activeTopicId = null;
let currentTopicTab = 'rules'; // 'rules' or 'practice'
let practiceAnswers = {}; // { questionIndex: selectedOptionIndex }

export function initLearnUI() {
  initGrammarChecklist();
  initWhereToStartGuide();
  renderCategoryChips();
  renderTopicsList();
  setupSearchHandler();
}

/**
 * Get completed checklist item IDs from localStorage
 */
function getCompletedChecklist() {
  try {
    const raw = localStorage.getItem('grammar_checklist_completed');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Save completed checklist item IDs to localStorage
 */
function saveCompletedChecklist(completed) {
  try {
    localStorage.setItem('grammar_checklist_completed', JSON.stringify(completed));
  } catch (e) {
    console.error('Failed to save checklist to localStorage:', e);
  }
}

/**
 * Initialize 25-topic English Grammar Checklist
 */
function initGrammarChecklist() {
  const container = document.getElementById('checklist-items-container');
  if (!container) return;

  const completed = getCompletedChecklist();
  updateChecklistProgress(completed.length);

  container.innerHTML = (GRAMMAR_CHECKLIST || []).map(item => {
    const isChecked = completed.includes(item.num);
    return `
      <div class="checklist-item-row ${isChecked ? 'completed' : ''}" data-item-num="${item.num}">
        <label class="checklist-item-check-label">
          <input type="checkbox" class="checklist-checkbox" data-num="${item.num}" ${isChecked ? 'checked' : ''}>
          <span class="checklist-custom-check"></span>
          <span class="checklist-num-badge">${item.num}</span>
        </label>
        <div class="checklist-item-text">
          <div class="checklist-item-title-row">
            <h4 class="checklist-item-title">${item.title}</h4>
            ${item.topicId ? `
              <button type="button" class="btn-open-topic-link" data-topic-id="${item.topicId}" title="Open ${item.title} Lesson">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Lesson
              </button>
            ` : ''}
          </div>
          <p class="checklist-item-desc">${item.desc}</p>
        </div>
      </div>
    `;
  }).join('');

  // Bind checkbox changes
  container.querySelectorAll('.checklist-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const num = parseInt(e.target.getAttribute('data-num'));
      let currentCompleted = getCompletedChecklist();
      const row = e.target.closest('.checklist-item-row');

      if (e.target.checked) {
        if (!currentCompleted.includes(num)) currentCompleted.push(num);
        if (row) row.classList.add('completed');
      } else {
        currentCompleted = currentCompleted.filter(n => n !== num);
        if (row) row.classList.remove('completed');
      }

      saveCompletedChecklist(currentCompleted);
      updateChecklistProgress(currentCompleted.length);
    });
  });

  // Bind Open Topic Lesson buttons
  container.querySelectorAll('.btn-open-topic-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const topicId = btn.getAttribute('data-topic-id');
      if (topicId) openTopicDetail(topicId);
    });
  });

  // Bind Copy study checklist button
  const copyBtn = document.getElementById('btn-copy-checklist');
  if (copyBtn && !copyBtn.dataset.bound) {
    copyBtn.dataset.bound = 'true';
    copyBtn.addEventListener('click', () => {
      const currentCompleted = getCompletedChecklist();
      const lines = [
        '### English grammar learning checklist',
        '',
        '### Your study list',
        '',
        `${currentCompleted.length} of 25 completed`,
        ''
      ];

      (GRAMMAR_CHECKLIST || []).forEach(item => {
        const check = currentCompleted.includes(item.num) ? '[x]' : '[ ]';
        lines.push(`${item.num}. ${item.title} ${check}`);
        lines.push(`${item.desc}`);
        lines.push('');
      });

      lines.push('### Where should you start?');
      lines.push("I'd recommend starting with Parts of Speech, because understanding the role of each word makes the rest of English grammar much easier.");
      lines.push('');
      lines.push('For example:');
      (WHERE_TO_START_GUIDE.examples || []).forEach(ex => {
        lines.push(`* ${ex.part}: ${ex.sentence}`);
      });
      lines.push('');
      lines.push('Once you understand these categories, you can move on to tenses, sentence structure and more advanced grammar.');

      const fullText = lines.join('\n');
      navigator.clipboard.writeText(fullText).then(() => {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--success, #28a745);"></i> <span>Copied!</span>';
        setTimeout(() => {
          copyBtn.innerHTML = originalHTML;
        }, 2200);
      }).catch(err => {
        console.error('Clipboard copy error:', err);
      });
    });
  }

  // Bind Toggle Expand / Collapse button
  const toggleBtn = document.getElementById('btn-toggle-checklist');
  if (toggleBtn && !toggleBtn.dataset.bound) {
    toggleBtn.dataset.bound = 'true';
    toggleBtn.addEventListener('click', () => {
      const isHidden = container.style.display === 'none';
      container.style.display = isHidden ? 'grid' : 'none';
      toggleBtn.innerHTML = isHidden
        ? '<i class="fa-solid fa-chevron-up"></i> <span>Hide List</span>'
        : '<i class="fa-solid fa-chevron-down"></i> <span>Show 25 Topics</span>';
    });
  }
}

/**
 * Update checklist counter and progress bar
 */
function updateChecklistProgress(completedCount) {
  const textEl = document.getElementById('checklist-progress-text');
  const fillEl = document.getElementById('checklist-progress-fill');

  const total = (GRAMMAR_CHECKLIST || []).length || 25;
  const pct = Math.round((completedCount / total) * 100);

  if (textEl) textEl.innerText = `${completedCount} of ${total} completed`;
  if (fillEl) fillEl.style.width = `${pct}%`;
}

/**
 * Initialize "Where should you start?" Guide
 */
function initWhereToStartGuide() {
  const container = document.getElementById('guide-examples-container');
  if (!container) return;

  const examples = WHERE_TO_START_GUIDE?.examples || [];

  container.innerHTML = examples.map((ex, idx) => {
    // Format sentence with highlight
    const parts = ex.sentence.split(new RegExp(`(${ex.highlight})`, 'i'));
    const formattedSentence = parts.map(part => {
      if (part.toLowerCase() === ex.highlight.toLowerCase()) {
        return `<mark class="part-highlight">${part}</mark>`;
      }
      return part;
    }).join('');

    return `
      <div class="guide-example-card">
        <div class="guide-card-top">
          <span class="guide-part-badge">${ex.part}</span>
          <button type="button" class="mini-speak-btn guide-speak-btn" data-text="${ex.sentence}" title="Listen (UK Pronunciation)">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
        <div class="guide-sentence-text">${formattedSentence}</div>
        <p class="guide-role-note">${ex.role || ''}</p>
      </div>
    `;
  }).join('');

  // Bind speech handlers
  container.querySelectorAll('.guide-speak-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const text = btn.getAttribute('data-text');
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
      try {
        await speakText(text, { rate: 0.9 });
      } finally {
        btn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      }
    });
  });

  // Bind Start with Parts of Speech button
  const startBtn = document.getElementById('btn-start-parts-of-speech');
  if (startBtn && !startBtn.dataset.bound) {
    startBtn.dataset.bound = 'true';
    startBtn.addEventListener('click', () => {
      openTopicDetail('parts-of-speech-overview');
    });
  }
}

function renderCategoryChips() {
  const container = document.getElementById('learn-chips-container');
  if (!container) return;

  container.innerHTML = `
    <button class="chip ${activeCategory === 'all' ? 'active' : ''}" data-cat="all">
      🌐 All Topics
    </button>
    ${LEARN_CATEGORIES.map(cat => `
      <button class="chip ${activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
        ${cat.emoji} ${cat.titleEng}
      </button>
    `).join('')}
  `;

  container.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      e.currentTarget.classList.add('active');
      activeCategory = e.currentTarget.getAttribute('data-cat');
      renderTopicsList();
    });
  });
}

function setupSearchHandler() {
  const searchInput = document.getElementById('learn-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    renderTopicsList();
  });
}

export function renderTopicsList() {
  const container = document.getElementById('learn-topics-container');
  if (!container) return;

  const searchQuery = (document.getElementById('learn-search-input')?.value || '').toLowerCase().trim();

  // Filter topics
  const filteredTopics = LEARN_TOPICS.filter(topic => {
    if (activeCategory !== 'all' && topic.categoryId !== activeCategory) return false;

    if (searchQuery) {
      const matchTitle = topic.title.toLowerCase().includes(searchQuery);
      const matchSummary = topic.summary.toLowerCase().includes(searchQuery);
      const matchSubgroup = (topic.subgroup || '').toLowerCase().includes(searchQuery);
      const matchKeywords = (topic.keywords || []).some(kw => kw.toLowerCase().includes(searchQuery));

      if (!matchTitle && !matchSummary && !matchSubgroup && !matchKeywords) return false;
    }
    return true;
  });

  if (filteredTopics.length === 0) {
    container.innerHTML = `
      <div class="card text-center" style="grid-column: 1/-1; padding: 3rem 1.5rem; color: var(--text-muted);">
        <i class="fa-solid fa-graduation-cap" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--uk-blue);"></i>
        <h4>No grammar topics found matching your query.</h4>
        <p style="font-size: 0.9rem; margin-top: 0.25rem;">Try adjusting your search term or category filter.</p>
      </div>
    `;
    return;
  }

  // Group topics by Category
  const categoryGroups = {};
  filteredTopics.forEach(topic => {
    if (!categoryGroups[topic.categoryId]) {
      categoryGroups[topic.categoryId] = [];
    }
    categoryGroups[topic.categoryId].push(topic);
  });

  container.innerHTML = '';

  Object.keys(categoryGroups).forEach(catId => {
    const catData = LEARN_CATEGORIES.find(c => c.id === catId) || { emoji: '📚', titleEng: catId };
    const topicsInCat = categoryGroups[catId];

    const groupCard = document.createElement('div');
    groupCard.className = 'learn-category-group card';
    groupCard.innerHTML = `
      <div class="learn-category-header">
        <div class="cat-title-badge">
          <span class="cat-emoji">${catData.emoji}</span>
          <div>
            <h3>${catData.titleEng}</h3>
            <span class="cat-subtitle-he">${catData.desc || ''}</span>
          </div>
        </div>
        <span class="badge-count">${topicsInCat.length} Topics</span>
      </div>

      <div class="learn-topics-accordion-list">
        ${topicsInCat.map(topic => `
          <div class="learn-topic-item ${activeTopicId === topic.id ? 'active' : ''}" data-topic-id="${topic.id}">
            <div class="topic-item-header">
              <div class="topic-title-group">
                <span class="topic-tag">${topic.subgroup || catData.titleEng}</span>
                <h4 class="topic-name">${topic.title}</h4>
                <p class="topic-summary">${topic.summary}</p>
              </div>
              <div class="topic-action-arrow">
                <i class="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    groupCard.querySelectorAll('.learn-topic-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-topic-id');
        openTopicDetail(id);
      });
    });

    container.appendChild(groupCard);
  });
}

export function openTopicDetail(topicId) {
  activeTopicId = topicId;
  currentTopicTab = 'rules';
  practiceAnswers = {};

  const topic = LEARN_TOPICS.find(t => t.id === topicId);
  if (!topic) return;

  const detailModal = document.getElementById('learn-topic-modal');
  if (!detailModal) return;

  renderTopicDetailContent(topic);
  detailModal.classList.add('active');
}

export function closeTopicDetail() {
  const detailModal = document.getElementById('learn-topic-modal');
  if (detailModal) detailModal.classList.remove('active');
}

function renderTopicDetailContent(topic) {
  const modalBody = document.getElementById('learn-modal-body');
  const catData = LEARN_CATEGORIES.find(c => c.id === topic.categoryId) || { emoji: '📚', titleEng: '' };

  modalBody.innerHTML = `
    <div class="topic-detail-header">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap;">
        <div>
          <span class="category-pill">${catData.emoji} ${catData.titleEng}</span>
          <h2 class="topic-modal-title">${topic.title}</h2>
          <p class="topic-modal-summary">${topic.summary}</p>
        </div>
        <button class="btn btn-secondary topic-speak-btn" id="btn-speak-lesson" style="margin-top: 0.5rem;" title="Listen to entire lesson out loud (UK Accent)">
          <i class="fa-solid fa-volume-high"></i> <span>Listen Lesson</span>
        </button>
      </div>

      <!-- Topic View Switcher (Rules vs Practice) -->
      <div class="learn-tab-bar" style="margin-top: 1.25rem;">
        <button class="learn-tab-btn ${currentTopicTab === 'rules' ? 'active' : ''}" id="btn-tab-rules">
          <i class="fa-solid fa-book-open"></i> Learn Rules & Examples
        </button>
        <button class="learn-tab-btn ${currentTopicTab === 'practice' ? 'active' : ''}" id="btn-tab-practice">
          <i class="fa-solid fa-pen-to-square"></i> Practice Quiz (${(topic.practice || []).length} Qs)
        </button>
      </div>
    </div>

    <!-- TAB 1: RULES & EXAMPLES -->
    <div id="topic-tab-rules-content" class="topic-tab-content" style="display: ${currentTopicTab === 'rules' ? 'block' : 'none'};">
      <div class="rules-list-grid">
        ${(topic.rules || []).map(rule => `
          <div class="rule-card">
            <div class="rule-card-header" style="display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; margin-bottom: 0.35rem;">
              <h4><i class="fa-solid fa-circle-info" style="color: var(--uk-blue);"></i> ${rule.title}</h4>
              <button class="mini-speak-btn rule-speak-btn" data-text="${rule.title}. ${rule.details}" title="Listen Rule (UK Accent)">
                <i class="fa-solid fa-volume-high"></i> Listen
              </button>
            </div>
            <p>${rule.details}</p>
          </div>
        `).join('')}
      </div>

      ${topic.keywords && topic.keywords.length > 0 ? `
        <div class="keywords-panel card" style="margin-top: 1.25rem;">
          <h4><i class="fa-solid fa-key" style="color: var(--gold);"></i> Signal Words & Key Identifiers</h4>
          <div class="keywords-tag-cloud" style="margin-top: 0.5rem;">
            ${topic.keywords.map(kw => `<span class="keyword-tag">${kw}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      <div class="examples-panel card" style="margin-top: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <h4><i class="fa-solid fa-quote-left" style="color: var(--uk-crimson);"></i> Illustrative Examples (British English)</h4>
        </div>
        <div class="example-sentences-list">
          ${(topic.examples || []).map(sentence => `
            <div class="example-sentence-row">
              <div class="sentence-text">
                <i class="fa-solid fa-circle-check" style="color: var(--success, #28a745); margin-right: 0.5rem; font-size: 0.85rem;"></i>
                <span>${sentence}</span>
              </div>
              <button class="mini-speak-btn sentence-speak-btn" data-text="${sentence}" title="Listen in British English">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- TAB 2: PRACTICE QUIZ -->
    <div id="topic-tab-practice-content" class="topic-tab-content" style="display: ${currentTopicTab === 'practice' ? 'block' : 'none'};">
      ${renderPracticeQuestions(topic)}
    </div>
  `;

  // Bind Tab Switching
  document.getElementById('btn-tab-rules').addEventListener('click', () => {
    currentTopicTab = 'rules';
    renderTopicDetailContent(topic);
  });

  document.getElementById('btn-tab-practice').addEventListener('click', () => {
    currentTopicTab = 'practice';
    renderTopicDetailContent(topic);
  });

  // Bind Lesson Narrator
  document.getElementById('btn-speak-lesson').addEventListener('click', async () => {
    const btn = document.getElementById('btn-speak-lesson');
    const lessonNarrative = `${topic.title}. ${topic.summary}. Rules: ` +
      (topic.rules || []).map(r => `${r.title}: ${r.details}`).join('. ') +
      '. Examples: ' + (topic.examples || []).join('. ');

    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Reading Lesson...';
    try {
      await speakText(lessonNarrative);
    } finally {
      btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>Listen Lesson</span>';
    }
  });

  // Bind Rule Audio Buttons
  modalBody.querySelectorAll('.rule-speak-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const text = btn.getAttribute('data-text');
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Listen';
      try {
        await speakText(text);
      } finally {
        btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
      }
    });
  });

  // Bind Sentence Audio Buttons
  modalBody.querySelectorAll('.sentence-speak-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const text = btn.getAttribute('data-text');
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
      try {
        await speakText(text);
      } finally {
        btn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      }
    });
  });

  // Bind Question Audio Buttons
  modalBody.querySelectorAll('.q-speak-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const text = btn.getAttribute('data-text');
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Listen';
      try {
        await speakText(text);
      } finally {
        btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
      }
    });
  });

  // Bind Explanation Audio Buttons
  modalBody.querySelectorAll('.explanation-speak-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const text = btn.getAttribute('data-text');
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Listen';
      try {
        await speakText(text);
      } finally {
        btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
      }
    });
  });

  // Bind Practice Answer Selections
  modalBody.querySelectorAll('.practice-opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const qIdx = parseInt(e.currentTarget.getAttribute('data-q-idx'));
      const optIdx = parseInt(e.currentTarget.getAttribute('data-opt-idx'));
      practiceAnswers[qIdx] = optIdx;
      renderTopicDetailContent(topic);
    });
  });

  // Bind Retry Practice Button
  const retryBtn = document.getElementById('btn-retry-topic-practice');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      practiceAnswers = {};
      renderTopicDetailContent(topic);
    });
  }
}

function renderPracticeQuestions(topic) {
  const questions = topic.practice || [];
  if (questions.length === 0) {
    return `<p style="color: var(--text-muted);">No practice questions available for this topic yet.</p>`;
  }

  let answeredCount = Object.keys(practiceAnswers).length;
  let correctCount = 0;

  const questionsHTML = questions.map((q, qIdx) => {
    const userSelected = practiceAnswers[qIdx];
    const hasAnswered = userSelected !== undefined;
    const isCorrect = userSelected === q.correctIndex;

    if (hasAnswered && isCorrect) correctCount++;

    return `
      <div class="practice-question-card ${hasAnswered ? (isCorrect ? 'correct' : 'incorrect') : ''}">
        <div class="q-header">
          <span class="q-number">Question ${qIdx + 1} of ${questions.length}</span>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <button class="mini-speak-btn q-speak-btn" data-text="${q.question.replace(/"/g, '&quot;')}" title="Listen Question (UK Accent)">
              <i class="fa-solid fa-volume-high"></i> Listen
            </button>
            ${hasAnswered ? `
              <span class="q-badge ${isCorrect ? 'correct' : 'incorrect'}">
                ${isCorrect ? '✓ Correct' : '✕ Incorrect'}
              </span>
            ` : ''}
          </div>
        </div>
        <h4 class="q-text">${q.question}</h4>

        <div class="practice-options-grid">
          ${q.options.map((opt, optIdx) => {
            let btnClass = 'practice-opt-btn';
            if (hasAnswered) {
              if (optIdx === q.correctIndex) btnClass += ' correct-answer';
              if (userSelected === optIdx && !isCorrect) btnClass += ' wrong-selected';
            }

            return `
              <button class="${btnClass}" data-q-idx="${qIdx}" data-opt-idx="${optIdx}" ${hasAnswered ? 'disabled' : ''}>
                <span class="opt-letter">${String.fromCharCode(65 + optIdx)}</span>
                <span class="opt-text">${opt}</span>
              </button>
            `;
          }).join('')}
        </div>

        ${hasAnswered ? `
          <div class="q-explanation-box">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <strong><i class="fa-solid fa-lightbulb"></i> Explanation:</strong>
              <button class="mini-speak-btn explanation-speak-btn" type="button" data-text="${q.explanation.replace(/"/g, '&quot;')}" title="Listen Explanation (UK Accent)">
                <i class="fa-solid fa-volume-high"></i> Listen
              </button>
            </div>
            <span>${q.explanation}</span>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  const isAllAnswered = answeredCount === questions.length;
  const scorePct = Math.round((correctCount / questions.length) * 100);

  const summaryHTML = isAllAnswered ? `
    <div class="practice-score-summary card text-center">
      <div class="summary-trophy">
        <i class="fa-solid ${scorePct >= 80 ? 'fa-trophy' : 'fa-graduation-cap'}" style="font-size: 2.5rem; color: var(--gold);"></i>
      </div>
      <h3>Practice Complete!</h3>
      <p style="font-size: 1.1rem; font-weight: 700; margin: 0.5rem 0;">Score: ${correctCount} / ${questions.length} (${scorePct}%)</p>
      <button class="btn btn-primary" id="btn-retry-topic-practice">
        <i class="fa-solid fa-rotate-right"></i> Retry Practice
      </button>
    </div>
  ` : '';

  return summaryHTML + questionsHTML;
}
