/**
 * British English Vault - Interactive 3-Tier Curriculum Module (100% English)
 * Architecture:
 * 1. Topic Buttons (17 Master Topics: Grammar, Vocabulary, Pronunciation, etc.)
 * 2. Sub-header Buttons (Accordion toggle buttons for each category)
 * 3. Subtopics with Selection Options (Dropdown picker & selection choice buttons)
 * 4. Dedicated Subtopic Lesson Modal: Detailed Rules & Examples + Interactive Practice Exercises with Instant Feedback
 */

import { CURRICULUM_PILLARS, getSubtopicLesson } from './curriculumData.js';
import { speakText } from './speech.js';
import { copyTextToClipboard, shareTextContent } from './shareUtils.js';

let activePillarId = 'grammar';
let expandedSubHeaderId = 'parts-of-speech'; // Open the first sub-header by default
let subtopicSearchQuery = '';
let activeSelectedSubtopicId = null;
let activeLesson = null;
let activeLessonTab = 'rules'; // 'rules' | 'practice'
let lessonQuizAnswers = {}; // { qIndex: optIndex }

export function initLearnUI() {
  initCurriculumInteractiveSystem();
  setupModalDismissHandlers();
}

/**
 * ============================================================================
 * 1. 3-TIER CURRICULUM INTERACTIVE SYSTEM
 * ============================================================================
 */

function initCurriculumInteractiveSystem() {
  renderPillarsNav();
  renderActivePillarView();
}

/**
 * Render the 17 numbered master topic buttons (100% English)
 */
function renderPillarsNav() {
  const container = document.getElementById('curriculum-pillars-nav');
  if (!container) return;

  container.innerHTML = CURRICULUM_PILLARS.map(pillar => {
    const isActive = pillar.id === activePillarId;
    const padNum = pillar.number < 10 ? `0${pillar.number}` : pillar.number;

    return `
      <button type="button" class="pillar-nav-btn ${isActive ? 'active' : ''}" data-pillar-id="${pillar.id}">
        <span class="pillar-badge-num">Topic ${padNum}</span>
        <span class="pillar-btn-title">${pillar.title}</span>
      </button>
    `;
  }).join('');

  // Bind click on topic buttons
  container.querySelectorAll('.pillar-nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pid = e.currentTarget.getAttribute('data-pillar-id');
      if (pid && pid !== activePillarId) {
        activePillarId = pid;
        subtopicSearchQuery = '';
        const currentPillar = CURRICULUM_PILLARS.find(p => p.id === pid);
        // Default to opening the first sub-header so subtopics are immediately visible
        expandedSubHeaderId = currentPillar?.subHeaders?.[0]?.id || null;
        renderPillarsNav();
        renderActivePillarView();
      }
    });
  });
}

/**
 * Render the active topic view with expandable sub-header buttons and subtopics
 */
function renderActivePillarView() {
  const container = document.getElementById('curriculum-pillar-content');
  if (!container) return;

  const pillar = CURRICULUM_PILLARS.find(p => p.id === activePillarId) || CURRICULUM_PILLARS[0];
  if (!pillar) return;

  // Calculate total subtopics
  let totalSubtopicsCount = 0;
  pillar.subHeaders.forEach(sh => {
    totalSubtopicsCount += (sh.subtopics || []).length;
  });

  const query = subtopicSearchQuery.toLowerCase().trim();

  // Filter subheaders and subtopics if search query exists
  const filteredSubHeaders = pillar.subHeaders.map(sh => {
    const matchingSubtopics = (sh.subtopics || []).filter(st => {
      if (!query) return true;
      const matchTitle = (st.title || '').toLowerCase().includes(query);
      const matchDesc = (st.desc || '').toLowerCase().includes(query);
      return matchTitle || matchDesc;
    });

    return {
      ...sh,
      matchingSubtopics
    };
  }).filter(sh => sh.matchingSubtopics.length > 0);

  container.innerHTML = `
    <!-- ACTIVE TOPIC HERO CARD -->
    <div class="card active-pillar-hero">
      <div class="pillar-hero-left">
        <div class="pillar-avatar-badge">
          <i class="fa-solid ${pillar.icon || 'fa-book-bookmark'}"></i>
        </div>
        <div>
          <div class="section-badge-small"><i class="fa-solid fa-crown"></i> Topic ${pillar.number} of 17</div>
          <h2 class="pillar-hero-title">${pillar.number}. ${pillar.title}</h2>
          <p class="pillar-hero-meta">
            <i class="fa-solid fa-layer-group" style="color: var(--uk-blue); margin-right: 0.35rem;"></i>
            <strong>${totalSubtopicsCount} Subtopics</strong> across ${pillar.subHeaders.length} categories
          </p>
        </div>
      </div>
      
      <div class="pillar-search-box">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" id="curriculum-subtopic-search" placeholder="Search in ${pillar.title}..." value="${subtopicSearchQuery}">
      </div>
    </div>

    <!-- SUB-HEADERS ACCORDION BUTTONS STACK -->
    <div class="subheaders-accordion-stack">
      ${filteredSubHeaders.length === 0 ? `
        <div class="card text-center" style="padding: 3rem 1.5rem; color: var(--text-muted);">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2.2rem; margin-bottom: 0.85rem; color: var(--uk-blue);"></i>
          <h4>No subtopics found matching "${subtopicSearchQuery}".</h4>
          <p style="font-size: 0.9rem; margin-top: 0.25rem;">Try clearing your search query.</p>
        </div>
      ` : filteredSubHeaders.map(sh => {
        const isExpanded = query ? true : (sh.id === expandedSubHeaderId);
        return `
          <div class="subheader-accordion-item" data-subheader-id="${sh.id}">
            <!-- SUB-HEADER TOGGLE BUTTON -->
            <button type="button" class="subheader-toggle-btn ${isExpanded ? 'expanded' : ''}" data-subheader-id="${sh.id}" aria-expanded="${isExpanded}">
              <div class="subheader-btn-left">
                <span class="subheader-btn-icon">
                  <i class="fa-solid ${isExpanded ? 'fa-folder-open' : 'fa-folder'}"></i>
                </span>
                <div class="subheader-btn-text">
                  <span class="subheader-btn-title">${sh.title}</span>
                </div>
              </div>
              <div class="subheader-btn-right">
                <span class="subheader-count-pill">${sh.matchingSubtopics.length} Subtopics</span>
                <i class="fa-solid fa-chevron-down subheader-chevron"></i>
              </div>
            </button>

            <!-- SUBTOPICS REVEALED WHEN OPENED -->
            ${isExpanded ? `
              <div class="subheader-expanded-panel">
                <!-- DROPDOWN SELECTION PICKER -->
                <div class="subtopic-picker-row" style="margin-bottom: 1rem;">
                  <div class="subtopic-select-control">
                    <i class="fa-solid fa-hand-pointer select-icon"></i>
                    <select class="subtopic-picker-dropdown" data-pillar="${pillar.id}" data-subheader="${sh.id}">
                      <option value="" disabled ${!activeSelectedSubtopicId ? 'selected' : ''}>✨ Choose a subtopic to study...</option>
                      ${sh.matchingSubtopics.map(st => `
                        <option value="${st.id}" ${activeSelectedSubtopicId === st.id ? 'selected' : ''}>${st.title} – ${st.desc}</option>
                      `).join('')}
                    </select>
                    <i class="fa-solid fa-chevron-down chevron-icon"></i>
                  </div>
                </div>

                <!-- SUBTOPIC CHOICE BUTTONS -->
                <div class="subtopics-selection-grid">
                  ${sh.matchingSubtopics.map(st => {
                    const isSelected = activeSelectedSubtopicId === st.id;
                    return `
                      <button type="button" class="subtopic-choice-btn ${isSelected ? 'active' : ''}" data-pillar="${pillar.id}" data-subheader="${sh.id}" data-subtopic="${st.id}">
                        <span class="choice-radio-indicator">
                          <i class="fa-regular fa-circle indicator-unselected"></i>
                          <i class="fa-solid fa-circle-dot indicator-selected"></i>
                        </span>
                        <div class="choice-text-col">
                          <span class="choice-title-eng">${st.title}</span>
                          <span class="choice-desc-eng">${st.desc || ''}</span>
                        </div>
                        <span class="choice-action-pill" title="Study lesson and practice quiz">
                          <span>Practice</span>
                          <i class="fa-solid fa-play" style="font-size: 0.65rem;"></i>
                        </span>
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Bind Search Input
  const searchInput = document.getElementById('curriculum-subtopic-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      subtopicSearchQuery = e.target.value;
      renderActivePillarView();
      const newSearchInput = document.getElementById('curriculum-subtopic-search');
      if (newSearchInput) {
        newSearchInput.focus();
        newSearchInput.setSelectionRange(newSearchInput.value.length, newSearchInput.value.length);
      }
    });
  }

  // Bind Sub-header toggle buttons (clicking expands/collapses subtopics)
  container.querySelectorAll('.subheader-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const shid = e.currentTarget.getAttribute('data-subheader-id');
      expandedSubHeaderId = (expandedSubHeaderId === shid) ? null : shid;
      renderActivePillarView();
    });
  });

  // Bind change event on subtopic dropdown selector
  container.querySelectorAll('.subtopic-picker-dropdown').forEach(dropdown => {
    dropdown.addEventListener('change', (e) => {
      const pid = e.target.getAttribute('data-pillar');
      const shid = e.target.getAttribute('data-subheader');
      const stid = e.target.value;
      if (pid && shid && stid) {
        activeSelectedSubtopicId = stid;
        openSubtopicDetail(pid, shid, stid);
      }
    });
  });

  // Bind click on subtopic choice buttons
  container.querySelectorAll('.subtopic-choice-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pid = e.currentTarget.getAttribute('data-pillar');
      const shid = e.currentTarget.getAttribute('data-subheader');
      const stid = e.currentTarget.getAttribute('data-subtopic');
      if (pid && shid && stid) {
        activeSelectedSubtopicId = stid;
        container.querySelectorAll('.subtopic-choice-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        openSubtopicDetail(pid, shid, stid);
      }
    });
  });
}

/**
 * ============================================================================
 * 2. SUBTOPIC LESSON & PRACTICE MODAL (100% ENGLISH)
 * ============================================================================
 */

export function openSubtopicDetail(pillarId, subHeaderId, subtopicId) {
  const lesson = getSubtopicLesson(pillarId, subHeaderId, subtopicId);
  if (!lesson) return;

  activeLesson = lesson;
  activeLessonTab = 'rules';
  lessonQuizAnswers = {};

  const detailModal = document.getElementById('learn-topic-modal');
  if (!detailModal) return;

  renderSubtopicModalContent();
  detailModal.classList.add('active');
}

export function closeTopicDetail() {
  const detailModal = document.getElementById('learn-topic-modal');
  if (detailModal) detailModal.classList.remove('active');
}

function renderSubtopicModalContent() {
  const modalBody = document.getElementById('learn-modal-body');
  if (!modalBody || !activeLesson) return;

  const lesson = activeLesson;

  modalBody.innerHTML = `
    <!-- SUBTOPIC MODAL HEADER -->
    <div class="subtopic-modal-header" style="margin-bottom: 1.25rem;">
      <div class="subtopic-modal-breadcrumb">
        <span>${lesson.pillarNumber}. ${lesson.pillarTitle}</span>
        <i class="fa-solid fa-chevron-right" style="font-size: 0.65rem;"></i>
        <span>${lesson.subHeaderTitle}</span>
        <i class="fa-solid fa-chevron-right" style="font-size: 0.65rem;"></i>
        <strong>${lesson.title}</strong>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap;">
        <div>
          <h2 style="font-size: 1.6rem; font-weight: 800; margin: 0 0 0.35rem; color: var(--text-main);">${lesson.title}</h2>
          <p style="font-size: 0.95rem; color: var(--text-color); margin: 0; line-height: 1.5;">${lesson.description}</p>
        </div>
        
        <button type="button" class="audio-pill-btn" id="btn-speak-subtopic-lesson" title="Listen to lesson overview in British English">
          <span class="audio-wave-anim"><span></span><span></span><span></span></span>
          <i class="fa-solid fa-volume-high audio-icon"></i>
          <span class="btn-text">Listen Lesson</span>
        </button>
      </div>

      <!-- VIEW SWITCHER TABS -->
      <div class="learn-tab-bar" style="margin-top: 1.25rem;">
        <button type="button" class="learn-tab-btn ${activeLessonTab === 'rules' ? 'active' : ''}" id="btn-tab-subtopic-rules">
          <i class="fa-solid fa-book-open"></i> Learn Rules & Examples
        </button>
        <button type="button" class="learn-tab-btn ${activeLessonTab === 'practice' ? 'active' : ''}" id="btn-tab-subtopic-practice">
          <i class="fa-solid fa-pen-to-square"></i> Practice Quiz (${(lesson.practice || []).length} Exercises)
        </button>
      </div>
    </div>

    <!-- TAB 1: RULES & EXAMPLES -->
    <div id="subtopic-tab-rules-content" class="topic-tab-content" style="display: ${activeLessonTab === 'rules' ? 'block' : 'none'};">
      <div class="rules-list-grid">
        ${(lesson.rules || []).map(r => `
          <div class="rule-card">
            <div class="rule-card-header" style="display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; margin-bottom: 0.35rem;">
              <h4><i class="fa-solid fa-circle-info" style="color: var(--uk-blue);"></i> ${r.title}</h4>
              <button type="button" class="audio-btn-modern subtopic-rule-speak-btn" data-text="${(r.title + '. ' + r.details).replace(/"/g, '&quot;')}" title="Listen Rule (UK Accent)">
                <span class="audio-wave-anim"><span></span><span></span><span></span></span>
                <i class="fa-solid fa-volume-high audio-icon"></i>
              </button>
            </div>
            <p>${r.details}</p>
          </div>
        `).join('')}
      </div>

      <!-- EXAMPLES PANEL -->
      <div class="examples-panel card" style="margin-top: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <h4><i class="fa-solid fa-quote-left" style="color: var(--uk-crimson);"></i> Illustrative Examples (British English)</h4>
        </div>
        <div class="example-sentences-list">
          ${(lesson.examples || []).map(ex => {
            const sentenceText = typeof ex === 'string' ? ex : ex.sentence;
            const noteText = typeof ex === 'object' && ex.note ? ex.note : '';
            return `
              <div class="example-sentence-row" style="flex-direction: column; align-items: flex-start; gap: 0.35rem; padding: 0.85rem 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; gap: 0.75rem;">
                  <div class="sentence-text">
                    <i class="fa-solid fa-circle-check" style="color: var(--success, #28a745); margin-right: 0.5rem; font-size: 0.85rem;"></i>
                    <span>${sentenceText}</span>
                  </div>
                  <button type="button" class="audio-btn-modern subtopic-sentence-speak-btn" data-text="${sentenceText.replace(/"/g, '&quot;')}" title="Listen in British English">
                    <span class="audio-wave-anim"><span></span><span></span><span></span></span>
                    <i class="fa-solid fa-volume-high audio-icon"></i>
                  </button>
                </div>
                ${noteText ? `<span style="font-size: 0.82rem; color: var(--text-muted); margin-left: 1.45rem;">💡 ${noteText}</span>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div style="margin-top: 1.5rem; text-align: right;">
        <button type="button" id="btn-jump-to-practice" class="btn btn-primary">
          <span>Start Practice Exercises</span> <i class="fa-solid fa-arrow-right" style="margin-left: 0.4rem;"></i>
        </button>
      </div>
    </div>

    <!-- TAB 2: INTERACTIVE PRACTICE QUIZ -->
    <div id="subtopic-tab-practice-content" class="topic-tab-content" style="display: ${activeLessonTab === 'practice' ? 'block' : 'none'};">
      ${renderSubtopicPracticeQuiz(lesson)}
    </div>
  `;

  // Bind Tab Switchers
  const tabRulesBtn = document.getElementById('btn-tab-subtopic-rules');
  const tabPracticeBtn = document.getElementById('btn-tab-subtopic-practice');
  const jumpToPracticeBtn = document.getElementById('btn-jump-to-practice');

  if (tabRulesBtn) {
    tabRulesBtn.addEventListener('click', () => {
      activeLessonTab = 'rules';
      renderSubtopicModalContent();
    });
  }

  if (tabPracticeBtn) {
    tabPracticeBtn.addEventListener('click', () => {
      activeLessonTab = 'practice';
      renderSubtopicModalContent();
    });
  }

  if (jumpToPracticeBtn) {
    jumpToPracticeBtn.addEventListener('click', () => {
      activeLessonTab = 'practice';
      renderSubtopicModalContent();
    });
  }

  // Bind Listen Lesson
  const speakLessonBtn = document.getElementById('btn-speak-subtopic-lesson');
  if (speakLessonBtn) {
    speakLessonBtn.addEventListener('click', async () => {
      const narrative = `${lesson.title}. ${lesson.description}. Key rule: ` +
        (lesson.rules || []).map(r => `${r.title}: ${r.details}`).join('. ');

      speakLessonBtn.classList.add('speaking');
      const textSpan = speakLessonBtn.querySelector('.btn-text');
      if (textSpan) textSpan.textContent = 'Reading...';
      try {
        await speakText(narrative);
      } catch (err) {
        console.error('Audio play error:', err);
      } finally {
        speakLessonBtn.classList.remove('speaking');
        if (textSpan) textSpan.textContent = 'Listen Lesson';
      }
    });
  }

  // Bind Rule Audio Buttons
  modalBody.querySelectorAll('.subtopic-rule-speak-btn').forEach(btn => {
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
  modalBody.querySelectorAll('.subtopic-sentence-speak-btn').forEach(btn => {
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

  // Bind Practice Quiz Option Click
  modalBody.querySelectorAll('.subtopic-quiz-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const qIdx = parseInt(e.currentTarget.getAttribute('data-q-idx'));
      const optIdx = parseInt(e.currentTarget.getAttribute('data-opt-idx'));
      lessonQuizAnswers[qIdx] = optIdx;
      renderSubtopicModalContent();
    });
  });

  // Bind Retry Quiz
  const retryBtn = document.getElementById('btn-retry-subtopic-quiz');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      lessonQuizAnswers = {};
      renderSubtopicModalContent();
    });
  }

  // Bind Copy Score
  const copyBtn = document.getElementById('btn-copy-subtopic-score');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const questions = lesson.practice || [];
      const correct = Object.keys(lessonQuizAnswers).filter(k => questions[k] && questions[k].correctIndex === lessonQuizAnswers[k]).length;
      const scorePct = questions.length ? Math.round((correct / questions.length) * 100) : 0;
      const summary = `🇬🇧 British English Vault - ${lesson.title} (${lesson.pillarTitle})\nScore: ${correct}/${questions.length} (${scorePct}%)\nMaster British English Fluency!`;
      copyTextToClipboard(summary, 'Practice score copied to clipboard! 📋');
    });
  }

  // Bind Share Score
  const shareBtn = document.getElementById('btn-share-subtopic-score');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const questions = lesson.practice || [];
      const correct = Object.keys(lessonQuizAnswers).filter(k => questions[k] && questions[k].correctIndex === lessonQuizAnswers[k]).length;
      const scorePct = questions.length ? Math.round((correct / questions.length) * 100) : 0;
      const summary = `🇬🇧 British English Vault - ${lesson.title} (${lesson.pillarTitle})\nScore: ${correct}/${questions.length} (${scorePct}%)\nMaster British English Fluency!`;
      shareTextContent(`Practice Score: ${lesson.title}`, summary);
    });
  }
}

function renderSubtopicPracticeQuiz(lesson) {
  const questions = lesson.practice || [];
  if (questions.length === 0) {
    return `<div class="card text-center" style="padding: 2rem;"><p style="color: var(--text-muted);">No practice exercises available for this subtopic yet.</p></div>`;
  }

  let answeredCount = Object.keys(lessonQuizAnswers).length;
  let correctCount = 0;

  const questionsHTML = questions.map((q, qIdx) => {
    const userSelected = lessonQuizAnswers[qIdx];
    const isAnswered = typeof userSelected === 'number';
    const isCorrect = isAnswered && userSelected === q.correctIndex;

    if (isCorrect) correctCount++;

    return `
      <div class="card practice-q-card ${isAnswered ? (isCorrect ? 'answered-correct' : 'answered-incorrect') : ''}" style="margin-bottom: 1.25rem; padding: 1.25rem;">
        <div class="q-header-row" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.85rem;">
          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin: 0; line-height: 1.4;">
            <span class="q-number-pill" style="display: inline-block; width: 26px; height: 26px; border-radius: 50%; background: var(--uk-blue); color: #fff; text-align: center; line-height: 26px; font-size: 0.82rem; margin-right: 0.4rem;">${qIdx + 1}</span>
            ${q.question}
          </h4>
          <button type="button" class="audio-btn-modern q-speak-btn" data-text="${q.question.replace(/"/g, '&quot;')}" title="Listen Question (UK Accent)">
            <span class="audio-wave-anim"><span></span><span></span><span></span></span>
            <i class="fa-solid fa-volume-high audio-icon"></i>
          </button>
        </div>

        <div class="options-list">
          ${q.options.map((opt, optIdx) => {
            let optClass = 'subtopic-quiz-option';
            let iconHTML = '';

            if (isAnswered) {
              if (optIdx === q.correctIndex) {
                optClass += ' correct';
                iconHTML = `<i class="fa-solid fa-check" style="color: #059669; font-size: 1.1rem;"></i>`;
              } else if (optIdx === userSelected) {
                optClass += ' incorrect';
                iconHTML = `<i class="fa-solid fa-xmark" style="color: #DC2626; font-size: 1.1rem;"></i>`;
              }
            }

            return `
              <button type="button" class="${optClass}" data-q-idx="${qIdx}" data-opt-idx="${optIdx}" ${isAnswered ? 'disabled' : ''}>
                <span>${opt}</span>
                ${iconHTML}
              </button>
            `;
          }).join('')}
        </div>

        ${isAnswered ? `
          <div class="feedback-box card" style="margin-top: 1rem; padding: 0.9rem 1.1rem; border-radius: 10px; background: ${isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)'}; border: 1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'};">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
              <i class="fa-solid ${isCorrect ? 'fa-circle-check' : 'fa-circle-xmark'}" style="color: ${isCorrect ? '#059669' : '#DC2626'}; font-size: 1.1rem;"></i>
              <strong style="color: ${isCorrect ? '#059669' : '#DC2626'}; font-size: 0.95rem;">${isCorrect ? 'Splendid! Correct Answer' : 'Incorrect'}</strong>
            </div>
            <p style="margin: 0; font-size: 0.9rem; color: var(--text-color); line-height: 1.45;">${q.explanation}</p>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  const pct = Math.round((correctCount / questions.length) * 100);

  return `
    <!-- PRACTICE SCORE BAR -->
    <div class="card practice-summary-banner" style="margin-bottom: 1.25rem; padding: 1.1rem 1.35rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-radius: 12px; background: var(--bg-main);">
      <div>
        <span style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Practice Progress</span>
        <h4 style="margin: 0.2rem 0 0; font-size: 1.25rem; font-weight: 800; color: var(--text-main);">
          Score: ${correctCount} / ${questions.length} (${pct}%)
        </h4>
      </div>

      <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
        <button type="button" id="btn-retry-subtopic-quiz" class="btn btn-secondary btn-sm">
          <i class="fa-solid fa-rotate-right"></i> Reset & Try Again
        </button>
        <button type="button" id="btn-copy-subtopic-score" class="btn btn-primary btn-sm">
          <i class="fa-solid fa-copy"></i> Copy Score
        </button>
        <button type="button" id="btn-share-subtopic-score" class="btn btn-secondary btn-sm">
          <i class="fa-solid fa-share-nodes"></i> Share
        </button>
      </div>
    </div>

    <!-- QUESTIONS STACK -->
    <div class="questions-stack">
      ${questionsHTML}
    </div>
  `;
}

function setupModalDismissHandlers() {
  const closeBtn = document.getElementById('learn-topic-close-btn');
  if (closeBtn && !closeBtn.dataset.bound) {
    closeBtn.dataset.bound = 'true';
    closeBtn.addEventListener('click', closeTopicDetail);
  }

  const modal = document.getElementById('learn-topic-modal');
  if (modal && !modal.dataset.bound) {
    modal.dataset.bound = 'true';
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeTopicDetail();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeTopicDetail();
  });
}
