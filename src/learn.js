/**
 * British English Vault - Learn & Practice UI Module
 */

import { LEARN_CATEGORIES, LEARN_TOPICS, GRAMMAR_CHECKLIST, WHERE_TO_START_GUIDE } from './learnData.js';
import { speakText } from './speech.js';
import { copyTextToClipboard, shareTextContent } from './shareUtils.js';

let activeCategory = 'all';
let activeTopicId = null;
let currentTopicTab = 'rules'; // 'rules' or 'practice'
let practiceAnswers = {}; // { questionIndex: selectedOptionIndex }
let checklistFilter = 'all'; // 'all', 'remaining', 'completed'

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
 * Initialize 25-topic English Grammar Checklist with Rich Examples & Modern Audio
 */
function initGrammarChecklist() {
  const container = document.getElementById('checklist-items-container');
  if (!container) return;

  const completed = getCompletedChecklist();
  updateChecklistProgress(completed.length);
  setupChecklistFilterPills();

  // Filter items based on checklistFilter
  const filteredList = (GRAMMAR_CHECKLIST || []).filter(item => {
    const isCompleted = completed.includes(item.num);
    if (checklistFilter === 'completed') return isCompleted;
    if (checklistFilter === 'remaining') return !isCompleted;
    return true;
  });

  if (filteredList.length === 0) {
    const totalCount = (GRAMMAR_CHECKLIST || []).length || 14;
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-circle-check" style="font-size: 2.5rem; color: var(--success, #28a745); margin-bottom: 0.75rem; display: block;"></i>
        <h4 style="font-size: 1.15rem; margin-bottom: 0.25rem;">${checklistFilter === 'remaining' ? `Splendid! You have completed all ${totalCount} topics!` : 'No topics found for this filter.'}</h4>
        <p style="font-size: 0.88rem;">Select "All" to view the complete curriculum.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredList.map(item => {
    const isChecked = completed.includes(item.num);
    const escapedEx = (item.example || '').replace(/"/g, '&quot;');

    return `
      <div class="checklist-item-row ${isChecked ? 'completed' : ''}" data-item-num="${item.num}">
        <label class="checklist-item-check-label" title="${isChecked ? 'Mark as incomplete' : 'Mark as completed'}">
          <input type="checkbox" class="checklist-checkbox" data-num="${item.num}" ${isChecked ? 'checked' : ''}>
          <span class="checklist-num-badge">${item.num}</span>
        </label>
        <div class="checklist-item-text">
          <div class="checklist-item-title-row">
            <h4 class="checklist-item-title">${item.title}</h4>
            ${item.topicId ? `
              <button type="button" class="btn-open-topic-link" data-topic-id="${item.topicId}" title="Open ${item.title} Lesson">
                <i class="fa-solid fa-book-open"></i> <span>Lesson</span>
              </button>
            ` : ''}
          </div>
          <p class="checklist-item-desc">${item.desc}</p>
          
          ${item.example ? `
            <div class="checklist-example-box">
              <div class="checklist-example-text">
                <i class="fa-solid fa-quote-left quote-icon"></i>
                <span>${item.example}</span>
              </div>
              <button type="button" class="audio-btn-modern checklist-speak-btn" data-text="${escapedEx}" title="Listen in British English">
                <span class="audio-wave-anim">
                  <span></span><span></span><span></span>
                </span>
                <i class="fa-solid fa-volume-high audio-icon"></i>
              </button>
            </div>
          ` : ''}
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

      // Re-render if in filtered mode
      if (checklistFilter !== 'all') {
        initGrammarChecklist();
      }
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

  // Bind audio speak buttons on each checklist item
  container.querySelectorAll('.checklist-speak-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const text = btn.getAttribute('data-text');
      btn.classList.add('speaking');
      try {
        await speakText(text, { rate: 0.9 });
      } catch (err) {
        console.error('Audio play error:', err);
      } finally {
        btn.classList.remove('speaking');
      }
    });
  });

  // Bind Copy study checklist button
  const copyBtn = document.getElementById('btn-copy-checklist');
  if (copyBtn && !copyBtn.dataset.bound) {
    copyBtn.dataset.bound = 'true';
    copyBtn.addEventListener('click', () => {
      const currentCompleted = getCompletedChecklist();
      const total = (GRAMMAR_CHECKLIST || []).length || 17;
      const lines = [
        '### 17 Master Pillars of English Fluency - Study Roadmap',
        '',
        '### Your Study Progress',
        `${currentCompleted.length} of ${total} completed (${Math.round((currentCompleted.length / total) * 100)}%)`,
        ''
      ];

      (GRAMMAR_CHECKLIST || []).forEach(item => {
        const check = currentCompleted.includes(item.num) ? '[x]' : '[ ]';
        lines.push(`${item.num}. ${item.title} ${check}`);
        lines.push(`   Description: ${item.desc}`);
        if (item.example) lines.push(`   UK Example: "${item.example}"`);
        lines.push('');
      });

      lines.push('### Where Should You Start?');
      lines.push(WHERE_TO_START_GUIDE?.intro || "I'd recommend starting with Parts of Speech...");
      lines.push('');
      (WHERE_TO_START_GUIDE?.examples || []).forEach(ex => {
        lines.push(`* ${ex.part}: "${ex.sentence}" (${ex.role})`);
      });
      lines.push('');
      lines.push('Once you understand these categories, move on to tenses, sentence structure and more advanced British English grammar.');

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
}

/**
 * Setup Status Filter Pills for Checklist (All, Remaining, Completed)
 */
function setupChecklistFilterPills() {
  const filterBtns = document.querySelectorAll('.checklist-filter-btn');
  filterBtns.forEach(btn => {
    if (!btn.dataset.bound) {
      btn.dataset.bound = 'true';
      btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
        });
        e.currentTarget.classList.add('active');
        checklistFilter = e.currentTarget.getAttribute('data-filter') || 'all';
        initGrammarChecklist();
      });
    }
  });
}

/**
 * Update checklist counter and progress bar
 */
function updateChecklistProgress(completedCount) {
  const textEl = document.getElementById('checklist-progress-text');
  const fillEl = document.getElementById('checklist-progress-fill');
  const heroCountEl = document.getElementById('hero-checklist-count');

  const total = (GRAMMAR_CHECKLIST || []).length || 17;
  const pct = Math.round((completedCount / total) * 100);

  if (textEl) textEl.innerText = `${completedCount} of ${total} completed (${pct}%)`;
  if (fillEl) fillEl.style.width = `${pct}%`;
  if (heroCountEl) heroCountEl.innerText = `${completedCount} / ${total}`;
}

/**
 * Initialize "Where should you start?" Guide with 17 Master Pillars & Modern Audio
 */
function initWhereToStartGuide() {
  const container = document.getElementById('guide-examples-container');
  if (!container) return;

  const examples = WHERE_TO_START_GUIDE?.examples || [];

  container.innerHTML = examples.map((ex) => {
    const escapedSentence = (ex.sentence || '').replace(/"/g, '&quot;');
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
          <button type="button" class="audio-btn-modern guide-speak-btn" data-text="${escapedSentence}" title="Listen with authentic UK accent">
            <span class="audio-wave-anim">
              <span></span><span></span><span></span>
            </span>
            <i class="fa-solid fa-volume-high audio-icon"></i>
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
      btn.classList.add('speaking');
      try {
        await speakText(text, { rate: 0.9 });
      } catch (err) {
        console.error('Audio play error:', err);
      } finally {
        btn.classList.remove('speaking');
      }
    });
  });

  // Bind Start with Grammar button
  const startBtn = document.getElementById('btn-start-parts-of-speech');
  if (startBtn && !startBtn.dataset.bound) {
    startBtn.dataset.bound = 'true';
    startBtn.addEventListener('click', () => {
      openTopicDetail('grammar');
    });
  }
}

function renderCategoryChips() {
  const container = document.getElementById('learn-chips-container');
  if (!container) return;

  container.innerHTML = `
    <button class="chip ${activeCategory === 'all' ? 'active' : ''}" data-cat="all">
      🌐 All Topics (${LEARN_TOPICS.length})
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

      const checklistCard = document.getElementById('grammar-checklist-card');
      const startGuideCard = document.getElementById('grammar-start-guide-card');

      if (activeCategory === 'all' || activeCategory === 'foundations') {
        if (checklistCard) checklistCard.style.display = 'block';
        if (startGuideCard) startGuideCard.style.display = 'block';
      } else {
        if (checklistCard) checklistCard.style.display = 'none';
        if (startGuideCard) startGuideCard.style.display = 'none';
      }

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
        <h4>No grammar topics found matching "${searchQuery}".</h4>
        <p style="font-size: 0.9rem; margin-top: 0.25rem;">Try selecting "All Topics" above.</p>
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
        ${topicsInCat.map(topic => {
          const firstEx = (topic.examples && topic.examples[0]) ? topic.examples[0] : '';
          const escapedEx = firstEx.replace(/"/g, '&quot;');
          return `
            <div class="learn-topic-item ${activeTopicId === topic.id ? 'active' : ''}" data-topic-id="${topic.id}">
              <div class="topic-item-header">
                <div class="topic-title-group" style="flex: 1; min-width: 0;">
                  <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.35rem;">
                    <span class="topic-tag"><i class="fa-solid fa-tag" style="font-size: 0.7rem;"></i> ${topic.subgroup || catData.titleEng}</span>
                  </div>
                  <h4 class="topic-name">${topic.title}</h4>
                  <p class="topic-summary">${topic.summary}</p>
                  ${firstEx ? `
                    <div class="topic-card-example-preview">
                      <i class="fa-solid fa-quote-left quote-icon"></i>
                      <span class="preview-text">${firstEx}</span>
                      <button type="button" class="audio-btn-modern topic-preview-speak-btn" data-text="${escapedEx}" title="Listen in British English">
                        <span class="audio-wave-anim"><span></span><span></span><span></span></span>
                        <i class="fa-solid fa-volume-high audio-icon"></i>
                      </button>
                    </div>
                  ` : ''}
                </div>
                <div class="topic-action-arrow">
                  <i class="fa-solid fa-chevron-right"></i>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    groupCard.querySelectorAll('.learn-topic-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-topic-id');
        openTopicDetail(id);
      });
    });

    groupCard.querySelectorAll('.topic-preview-speak-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const text = btn.getAttribute('data-text');
        btn.classList.add('speaking');
        try {
          await speakText(text, { rate: 0.9 });
        } catch (err) {
          console.error('Audio play error:', err);
        } finally {
          btn.classList.remove('speaking');
        }
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
        <button class="audio-pill-btn topic-speak-btn" id="btn-speak-lesson" style="margin-top: 0.5rem;" title="Listen to entire lesson out loud (UK Accent)">
          <span class="audio-wave-anim"><span></span><span></span><span></span></span>
          <i class="fa-solid fa-volume-high audio-icon"></i>
          <span class="btn-text">Listen Lesson</span>
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
              <button class="audio-btn-modern rule-speak-btn" data-text="${(rule.title + '. ' + rule.details).replace(/"/g, '&quot;')}" title="Listen Rule (UK Accent)">
                <span class="audio-wave-anim"><span></span><span></span><span></span></span>
                <i class="fa-solid fa-volume-high audio-icon"></i>
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
              <button class="audio-btn-modern sentence-speak-btn" data-text="${sentence.replace(/"/g, '&quot;')}" title="Listen in British English">
                <span class="audio-wave-anim"><span></span><span></span><span></span></span>
                <i class="fa-solid fa-volume-high audio-icon"></i>
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
  const speakLessonBtn = document.getElementById('btn-speak-lesson');
  if (speakLessonBtn) {
    speakLessonBtn.addEventListener('click', async () => {
      const lessonNarrative = `${topic.title}. ${topic.summary}. Rules: ` +
        (topic.rules || []).map(r => `${r.title}: ${r.details}`).join('. ') +
        '. Examples: ' + (topic.examples || []).join('. ');

      speakLessonBtn.classList.add('speaking');
      const textSpan = speakLessonBtn.querySelector('.btn-text');
      if (textSpan) textSpan.textContent = 'Reading Lesson...';
      try {
        await speakText(lessonNarrative);
      } catch (err) {
        console.error('Audio play error:', err);
      } finally {
        speakLessonBtn.classList.remove('speaking');
        if (textSpan) textSpan.textContent = 'Listen Lesson';
      }
    });
  }

  // Bind Rule Audio Buttons
  modalBody.querySelectorAll('.rule-speak-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const text = btn.getAttribute('data-text');
      btn.classList.add('speaking');
      try {
        await speakText(text);
      } catch (err) {
        console.error('Audio play error:', err);
      } finally {
        btn.classList.remove('speaking');
      }
    });
  });

  // Bind Sentence Audio Buttons
  modalBody.querySelectorAll('.sentence-speak-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const text = btn.getAttribute('data-text');
      btn.classList.add('speaking');
      try {
        await speakText(text);
      } catch (err) {
        console.error('Audio play error:', err);
      } finally {
        btn.classList.remove('speaking');
      }
    });
  });

  // Bind Question Audio Buttons
  modalBody.querySelectorAll('.q-speak-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const text = btn.getAttribute('data-text');
      btn.classList.add('speaking');
      try {
        await speakText(text);
      } catch (err) {
        console.error('Audio play error:', err);
      } finally {
        btn.classList.remove('speaking');
      }
    });
  });

  // Bind Explanation Audio Buttons
  modalBody.querySelectorAll('.explanation-speak-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const text = btn.getAttribute('data-text');
      btn.classList.add('speaking');
      try {
        await speakText(text);
      } catch (err) {
        console.error('Audio play error:', err);
      } finally {
        btn.classList.remove('speaking');
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

  // Bind Copy & Share for Learn Practice
  const copyLearnPractice = document.getElementById('btn-copy-learn-practice');
  if (copyLearnPractice) {
    copyLearnPractice.addEventListener('click', () => {
      const questions = topic.practice || [];
      const correct = Object.keys(practiceAnswers).filter(k => questions[k] && questions[k].correctIndex === practiceAnswers[k]).length;
      const scorePct = questions.length ? Math.round((correct / questions.length) * 100) : 0;
      const summary = `🇬🇧 British English Vault - Grammar Practice: ${topic.title}\nScore: ${correct}/${questions.length} (${scorePct}%)\nMaster British English!`;
      copyTextToClipboard(summary, 'Practice score copied to clipboard! 📋');
    });
  }

  const shareLearnPractice = document.getElementById('btn-share-learn-practice');
  if (shareLearnPractice) {
    shareLearnPractice.addEventListener('click', () => {
      const questions = topic.practice || [];
      const correct = Object.keys(practiceAnswers).filter(k => questions[k] && questions[k].correctIndex === practiceAnswers[k]).length;
      const scorePct = questions.length ? Math.round((correct / questions.length) * 100) : 0;
      const summary = `🇬🇧 British English Vault - Grammar Practice: ${topic.title}\nScore: ${correct}/${questions.length} (${scorePct}%)\nMaster British English!`;
      shareTextContent(`Grammar Practice: ${topic.title}`, summary);
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
            <button class="audio-btn-modern q-speak-btn" data-text="${q.question.replace(/"/g, '&quot;')}" title="Listen Question (UK Accent)">
              <span class="audio-wave-anim"><span></span><span></span><span></span></span>
              <i class="fa-solid fa-volume-high audio-icon"></i>
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
              <button class="audio-btn-modern explanation-speak-btn" type="button" data-text="${q.explanation.replace(/"/g, '&quot;')}" title="Listen Explanation (UK Accent)">
                <span class="audio-wave-anim"><span></span><span></span><span></span></span>
                <i class="fa-solid fa-volume-high audio-icon"></i>
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
      <div style="display: flex; gap: 0.6rem; justify-content: center; margin: 1rem 0; flex-wrap: wrap;">
        <button type="button" class="practice-btn-copy" id="btn-copy-learn-practice" style="padding: 0.55rem 1.1rem; font-size: 0.88rem;" title="Copy quiz score">
          <i class="fa-regular fa-copy"></i> <span>Copy Score</span>
        </button>
        <button type="button" class="practice-btn-share" id="btn-share-learn-practice" style="padding: 0.55rem 1.1rem; font-size: 0.88rem;" title="Share quiz score">
          <i class="fa-solid fa-share-nodes"></i> <span>Share Score</span>
        </button>
      </div>
      <button class="btn btn-primary" id="btn-retry-topic-practice">
        <i class="fa-solid fa-rotate-right"></i> Retry Practice
      </button>
    </div>
  ` : '';

  return summaryHTML + questionsHTML;
}

