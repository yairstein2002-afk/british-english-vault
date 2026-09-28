/**
 * British English Vault - Learn & Practice UI Module
 */

import { LEARN_CATEGORIES, LEARN_TOPICS } from './learnData.js';
import { speakText } from './speech.js';

let activeCategory = 'all';
let activeTopicId = null;
let currentTopicTab = 'rules'; // 'rules' or 'practice'
let practiceAnswers = {}; // { questionIndex: selectedOptionIndex }

export function initLearnUI() {
  renderCategoryChips();
  renderTopicsList();
  setupSearchHandler();
}

function renderCategoryChips() {
  const container = document.getElementById('learn-chips-container');
  if (!container) return;

  container.innerHTML = `
    <button class="chip ${activeCategory === 'all' ? 'active' : ''}" data-cat="all">
      🌟 All Topics
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

function openTopicDetail(topicId) {
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
        <div class="keywords-box">
          <h4><i class="fa-solid fa-key" style="color: var(--gold);"></i> Key Signal Words / Keywords:</h4>
          <div class="keywords-flex">
            ${topic.keywords.map(kw => `<span class="kw-tag">${kw}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      ${topic.examples && topic.examples.length > 0 ? `
        <div class="examples-box card">
          <h4><i class="fa-solid fa-volume-high" style="color: var(--uk-blue);"></i> Sample Sentences (UK Pronunciation):</h4>
          <div class="examples-list">
            ${topic.examples.map(ex => `
              <div class="example-audio-row">
                <span class="ex-text">"${ex}"</span>
                <button class="mini-speak-btn ex-speak-btn" data-text="${ex.replace(/"/g, '&quot;')}" title="Listen (UK Accent)">
                  <i class="fa-solid fa-circle-play"></i> Listen
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>

    <!-- TAB 2: PRACTICE QUIZ -->
    <div id="topic-tab-practice-content" class="topic-tab-content" style="display: ${currentTopicTab === 'practice' ? 'block' : 'none'};">
      <div class="practice-quiz-wrapper">
        ${renderPracticeQuestions(topic)}
      </div>
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

  // Bind Speak Lesson Full Audio
  const speakLessonBtn = document.getElementById('btn-speak-lesson');
  if (speakLessonBtn) {
    speakLessonBtn.addEventListener('click', async () => {
      const fullScript = `${topic.title}. ${topic.summary}. ${(topic.rules || []).map(r => `${r.title}: ${r.details}`).join('. ')}`;
      speakLessonBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Reading Lesson...</span>';
      try {
        await speakText(fullScript);
      } finally {
        speakLessonBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>Listen Lesson</span>';
      }
    });
  }

  // Bind Rule Audio Buttons
  modalBody.querySelectorAll('.rule-speak-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
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
  modalBody.querySelectorAll('.ex-speak-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-text');
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Listen';
      try {
        await speakText(text);
      } finally {
        btn.innerHTML = '<i class="fa-solid fa-circle-play"></i> Listen';
      }
    });
  });

  // Bind Question Audio Buttons
  modalBody.querySelectorAll('.q-speak-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
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
                ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
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
            <strong><i class="fa-solid fa-lightbulb"></i> Explanation:</strong> ${q.explanation}
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
