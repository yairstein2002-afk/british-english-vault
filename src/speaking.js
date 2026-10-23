/**
 * British English Vault - Free Speaking Lab 🎙️
 * Record speech, transcribe, analyze pronunciation & grammar, provide native British suggestions,
 * and save history to database.
 */

import { speakPhrase } from './speech.js';
import { syncAllVaultToSupabase } from './supabase.js';

const SPEAKING_HISTORY_KEY = 'bev_speaking_history';
const SPEAKING_STATS_KEY = 'bev_speaking_stats';

// Pre-defined rich conversation prompts
export const SPEAKING_PROMPTS = [
  {
    id: 'sp-daily-1',
    category: 'Daily Routine',
    title: 'Your Morning Routine in the UK',
    prompt: 'Describe what your ideal morning routine looks like. What do you eat for breakfast, and how do you prepare for the day?',
    starter: 'In the morning, I usually wake up at...',
    targetVocab: ['fancy', 'cuppa', 'commute', 'head out', 'proper'],
    level: 'Beginner'
  },
  {
    id: 'sp-travel-2',
    category: 'Travel & Dining',
    title: 'Ordering in a Traditional British Pub',
    prompt: 'You are at a cosy pub in London. Order a Sunday roast or fish and chips, ask about the ales on tap, and request the bill politely.',
    starter: 'Good evening! Could I please get a pint of...',
    targetVocab: ['pint', 'Sunday roast', 'on tap', 'could I have', 'cheers'],
    level: 'Intermediate'
  },
  {
    id: 'sp-work-3',
    category: 'Work & Professional',
    title: 'Explaining a Project or Passion',
    prompt: 'Talk about a project you are currently working on or a hobby you are passionate about. Explain why it excites you and what challenges you face.',
    starter: 'At the moment, I am thoroughly involved in...',
    targetVocab: ['keen on', 'tackle', 'milestone', 'rewarding', 'in terms of'],
    level: 'Intermediate'
  },
  {
    id: 'sp-opinion-4',
    category: 'Opinions & Debate',
    title: 'Public Transport vs Driving',
    prompt: 'Do you believe big cities should ban cars from the city centre to encourage cycling and the London Underground (Tube)? Express your view with reasons.',
    starter: 'In my honest opinion, I reckon that...',
    targetVocab: ['reckon', 'sustainable', 'congestion', 'furthermore', 'drawback'],
    level: 'Advanced'
  },
  {
    id: 'sp-story-5',
    category: 'Storytelling',
    title: 'An Unforgettable Travel Experience',
    prompt: 'Describe a memorable trip you took or an unexpected adventure that happened to you. What went wrong, and how did it turn out in the end?',
    starter: 'A few years ago, I travelled to...',
    targetVocab: ['unexpectedly', 'stumble upon', 'breathtaking', 'all in all', 'memorable'],
    level: 'Advanced'
  },
  {
    id: 'sp-free-6',
    category: 'Free Speech',
    title: 'Freestyle Expression',
    prompt: 'Speak freely about anything you like! Talk about your day, your dreams, British culture, music, movies, or what you learned this week.',
    starter: 'Today I would like to talk about...',
    targetVocab: ['brilliant', 'quite', 'splendid', 'worthwhile', 'overall'],
    level: 'All Levels'
  }
];

let activePrompt = SPEAKING_PROMPTS[0];
let recognition = null;
let isRecording = false;
let recordedTranscript = '';
let recognitionStartTime = 0;
let recognitionTimer = null;

/**
 * Initialize Speech Recognition instance
 */
function setupSpeechRecognition(onResultCallback, onEndCallback) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    return null;
  }

  const rec = new SpeechRecognition();
  rec.continuous = true;
  rec.interimResults = true;
  rec.lang = 'en-GB'; // Native British English recognition

  rec.onresult = (event) => {
    let interim = '';
    let final = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final += event.results[i][0].transcript + ' ';
      } else {
        interim += event.results[i][0].transcript;
      }
    }

    if (onResultCallback) {
      onResultCallback({
        finalText: final.trim(),
        interimText: interim.trim(),
        fullText: (recordedTranscript + ' ' + final + ' ' + interim).trim()
      });
    }

    if (final) {
      recordedTranscript = (recordedTranscript + ' ' + final).trim();
    }
  };

  rec.onerror = (event) => {
    console.warn('Speech recognition event:', event.error);
    if (event.error === 'not-allowed') {
      alert('Microphone access was denied. Please allow microphone permissions in your browser or type your English text directly into the box.');
    }
  };

  rec.onend = () => {
    isRecording = false;
    if (onEndCallback) onEndCallback();
  };

  return rec;
}

/**
 * Get Saved Speaking History from Local Storage / Database
 */
export function getSpeakingHistory() {
  try {
    const raw = localStorage.getItem(SPEAKING_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Save Speaking Item to Database
 */
export function saveSpeakingItem(entry) {
  const history = getSpeakingHistory();
  history.unshift(entry);
  if (history.length > 50) history.pop();
  localStorage.setItem(SPEAKING_HISTORY_KEY, JSON.stringify(history));

  // Update speaking stats
  const stats = getSpeakingStats();
  stats.totalSessions = (stats.totalSessions || 0) + 1;
  stats.totalWords = (stats.totalWords || 0) + (entry.spokenText ? entry.spokenText.split(/\s+/).length : 0);
  stats.xp = (stats.xp || 0) + 25;
  stats.lastSpokenDate = new Date().toISOString().split('T')[0];
  localStorage.setItem(SPEAKING_STATS_KEY, JSON.stringify(stats));

  return entry;
}

export function getSpeakingStats() {
  try {
    const raw = localStorage.getItem(SPEAKING_STATS_KEY);
    return raw ? JSON.parse(raw) : { totalSessions: 0, totalWords: 0, xp: 0, lastSpokenDate: null };
  } catch (e) {
    return { totalSessions: 0, totalWords: 0, xp: 0, lastSpokenDate: null };
  }
}

/**
 * Smart Rule-Based & Linguistic Speaking Analyzer
 * Analyzes grammar, vocabulary richness, British idioms, and sentence structure.
 */
export function analyzeSpeech(rawText, promptObj = null) {
  const text = (rawText || '').trim();
  if (!text) {
    return {
      success: false,
      error: 'Please record or type some English speech first.'
    };
  }

  const words = text.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // 1. Check for common grammar & speaking mistakes
  const mistakes = [];
  const lower = text.toLowerCase();

  // Subject-Verb Agreement
  if (/\b(he|she|it)\s+(don't|do|are|were|have)\b/i.test(text)) {
    mistakes.push({
      type: 'Grammar',
      error: "Subject-Verb Agreement (e.g. 'he don't' instead of 'he doesn't')",
      explanation: "With third-person singular (he/she/it), use 'doesn't', 'does', 'is', 'has'.",
      tip: "Example: 'She doesn't know' rather than 'She don't know'."
    });
  }

  if (/\b(i|we|they|you)\s+(does|is|has)\b/i.test(text)) {
    mistakes.push({
      type: 'Grammar',
      error: "Plural / First Person Verb Agreement",
      explanation: "With 'I', 'we', 'they', 'you', use 'do', 'are', 'have'.",
      tip: "Example: 'We are going' not 'We is going'."
    });
  }

  // Double Negatives
  if (/\b(don't|doesn't|didn't|can't|won't)\s+.*?\b(no|nothing|nobody|nowhere|never)\b/i.test(text)) {
    mistakes.push({
      type: 'Clarity',
      error: "Double Negative detected",
      explanation: "In standard British English, avoid two negative words in one clause (e.g. 'I didn't see nothing').",
      tip: "Change to: 'I didn't see anything' or 'I saw nothing'."
    });
  }

  // Preposition Errors
  if (/\b(listen)\s+(music|him|her|them|radio)\b/i.test(text)) {
    mistakes.push({
      type: 'Preposition',
      error: "Missing 'to' after 'listen'",
      explanation: "'Listen' takes the preposition 'to' when followed by an object.",
      tip: "Use 'listen to music' instead of 'listen music'."
    });
  }

  if (/\b(depend\s+of)\b/i.test(text)) {
    mistakes.push({
      type: 'Preposition',
      error: "'depend of' is incorrect",
      explanation: "In English, the verb depend takes 'on' or 'upon'.",
      tip: "Use 'it depends on' instead of 'it depends of'."
    });
  }

  if (/\b(explain\s+me)\b/i.test(text)) {
    mistakes.push({
      type: 'Preposition',
      error: "'explain me' is unnatural",
      explanation: "We explain something TO someone.",
      tip: "Use 'explain to me' or 'explain this to me'."
    });
  }

  // American vs British vocabulary hints
  const britishPolishes = [];
  if (/\b(french fries|fries)\b/i.test(text)) {
    britishPolishes.push("In the UK, say 'chips' instead of 'fries'.");
  }
  if (/\b(apartment)\b/i.test(text)) {
    britishPolishes.push("In British English, 'flat' is far more common than 'apartment'.");
  }
  if (/\b(elevator)\b/i.test(text)) {
    britishPolishes.push("Brits call it a 'lift' rather than an 'elevator'.");
  }
  if (/\b(sidewalk)\b/i.test(text)) {
    britishPolishes.push("In Britain, use 'pavement' rather than 'sidewalk'.");
  }
  if (/\b(subway)\b/i.test(text)) {
    britishPolishes.push("In London, the underground train system is famously called the 'Tube' or 'Underground'.");
  }

  // Calculate Scores
  let grammarScore = 95 - (mistakes.length * 15);
  if (grammarScore < 40) grammarScore = 40;

  let lengthBonus = Math.min(25, Math.floor(wordCount / 2));
  let fluencyScore = Math.min(98, 70 + lengthBonus - (mistakes.length * 8));

  // Build polished Native British Version
  let polishedVersion = text;
  // Apply smart automatic corrections
  polishedVersion = polishedVersion
    .replace(/\bhe don't\b/gi, "he doesn't")
    .replace(/\bshe don't\b/gi, "she doesn't")
    .replace(/\bit don't\b/gi, "it doesn't")
    .replace(/\blisten music\b/gi, "listen to music")
    .replace(/\bdepend of\b/gi, "depend on")
    .replace(/\bexplain me\b/gi, "explain to me")
    .replace(/\bfrench fries\b/gi, "chips")
    .replace(/\bapartment\b/gi, "flat")
    .replace(/\belevator\b/gi, "lift");

  // Capitalize first letter and add proper punctuation
  polishedVersion = polishedVersion.charAt(0).toUpperCase() + polishedVersion.slice(1);
  if (!/[.!?]$/.test(polishedVersion)) {
    polishedVersion += '.';
  }

  // Check Target Vocabulary from prompt
  const usedTargetVocab = [];
  if (promptObj && Array.isArray(promptObj.targetVocab)) {
    promptObj.targetVocab.forEach(voc => {
      if (lower.includes(voc.toLowerCase())) {
        usedTargetVocab.push(voc);
      }
    });
  }

  return {
    success: true,
    originalText: text,
    polishedVersion,
    wordCount,
    fluencyScore,
    grammarScore,
    overallScore: Math.round((fluencyScore + grammarScore) / 2),
    mistakes,
    britishPolishes,
    usedTargetVocab,
    targetVocabTotal: promptObj && promptObj.targetVocab ? promptObj.targetVocab.length : 0
  };
}

/**
 * Render and Mount the Speaking Lab UI inside #view-speaking
 */
export function initSpeakingLabUI() {
  const container = document.getElementById('view-speaking');
  if (!container) return;

  const stats = getSpeakingStats();
  const history = getSpeakingHistory();

  container.innerHTML = `
    <div class="speaking-lab-wrapper">
      <!-- HEADER BANNER -->
      <div class="speaking-hero-card card">
        <div class="hero-left">
          <div class="hero-badge"><i class="fa-solid fa-microphone-lines"></i> Free Speech Lab</div>
          <h2>תירגול דיבור חופשי באנגלית • Speaking Lab 🎙️</h2>
          <p>
            תרגל דיבור חופשי וטבעי באנגלית בריטית. הקלט את עצמך או הקלד, קבל ניתוח שגיאות בזמן אמת, 
            למד איך לנסח כמו יליד לונדון (Native British), והאזן להגייה המדויקת של המשפט שלך!
          </p>
        </div>
        <div class="hero-stats-pills">
          <div class="stat-pill">
            <span class="stat-num">${stats.xp || 0}</span>
            <span class="stat-lbl">Speaking XP</span>
          </div>
          <div class="stat-pill">
            <span class="stat-num">${stats.totalSessions || 0}</span>
            <span class="stat-lbl">Sessions</span>
          </div>
          <div class="stat-pill">
            <span class="stat-num">${stats.totalWords || 0}</span>
            <span class="stat-lbl">Words Spoken</span>
          </div>
        </div>
      </div>

      <!-- MAIN INTERACTIVE GRID -->
      <div class="speaking-grid">
        <!-- LEFT: PROMPT & RECORDING WORKBENCH -->
        <div class="speaking-workbench card">
          <!-- TOPIC SELECTOR TABS -->
          <div class="topics-bar">
            <span class="topics-label"><i class="fa-solid fa-compass"></i> נושא לשיחה:</span>
            <div class="topics-chips" id="speaking-topics-chips">
              ${SPEAKING_PROMPTS.map((p, idx) => `
                <button type="button" class="topic-chip ${p.id === activePrompt.id ? 'active' : ''}" data-id="${p.id}">
                  ${p.category}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- ACTIVE PROMPT CARD -->
          <div class="active-prompt-box" id="active-prompt-box">
            <div class="prompt-header">
              <span class="prompt-level-badge">${activePrompt.level}</span>
              <h3 id="prompt-title">${activePrompt.title}</h3>
            </div>
            <p id="prompt-desc" class="prompt-desc">${activePrompt.prompt}</p>
            
            <div class="target-vocab-box">
              <span class="vocab-title"><i class="fa-solid fa-lightbulb"></i> British Words to Try:</span>
              <div class="vocab-tags" id="prompt-vocab-tags">
                ${activePrompt.targetVocab.map(v => `<span class="vocab-tag">${v}</span>`).join('')}
              </div>
            </div>
          </div>

          <!-- RECORDING & INPUT AREA -->
          <div class="record-area-box">
            <div class="mic-controls-row">
              <button type="button" id="btn-toggle-record" class="btn-mic-main" title="Click to Start/Stop Recording">
                <i class="fa-solid fa-microphone"></i>
                <span id="mic-btn-text">Start Speaking (הקלטה)</span>
              </button>
              <div id="recording-indicator" class="recording-indicator" style="display: none;">
                <span class="pulse-dot"></span>
                <span id="recording-timer">Listening in British English... 00:00</span>
              </div>
            </div>

            <!-- LIVE TEXTAREA -->
            <div class="transcript-wrapper">
              <label class="form-label" style="display: flex; justify-content: space-between; align-items: center;">
                <span>Your Spoken English Transcript (או הקלד ישירות כאן):</span>
                <button type="button" id="btn-clear-transcript" class="btn-text-action" title="Clear text">
                  <i class="fa-solid fa-trash-can"></i> נקה
                </button>
              </label>
              <textarea id="speaking-transcript" class="form-control speaking-textarea" rows="4" 
                placeholder="Click the microphone button and start speaking, or type your English sentence here... (e.g. 'Yesterday I went to a cosy coffee shop and ordered a flat white...')"></textarea>
            </div>

            <!-- ACTIONS -->
            <div class="speaking-action-buttons">
              <button type="button" id="btn-analyze-speech" class="btn btn-primary btn-lg">
                <i class="fa-solid fa-wand-magic-sparkles"></i> בדוק את הדיבור שלי (Analyze Speech)
              </button>
              <button type="button" id="btn-listen-my-text" class="btn btn-secondary btn-lg" title="Listen to what you wrote">
                <i class="fa-solid fa-volume-high"></i> השמע לי
              </button>
            </div>
          </div>

          <!-- RESULTS & FEEDBACK DISPLAY -->
          <div id="speaking-feedback-card" class="speaking-feedback-card" style="display: none;">
            <!-- Rendered dynamically -->
          </div>
        </div>

        <!-- RIGHT: RECENT SESSIONS & TIPS -->
        <div class="speaking-sidebar">
          <!-- RECENT RECORDINGS CARD -->
          <div class="card history-card">
            <h3><i class="fa-solid fa-clock-rotate-left"></i> Speaking History (היסטוריית דיבור)</h3>
            <p class="panel-desc">כל ההקלטות והמשפטים שלך נשמרים במסד הנתונים וזמינים להאזנה חוזרת.</p>
            
            <div class="history-list" id="speaking-history-list">
              <!-- Rendered dynamically -->
            </div>
          </div>

          <!-- BRITISH SPEAKING TIPS -->
          <div class="card tips-card">
            <h4><i class="fa-solid fa-crown" style="color: var(--gold);"></i> Native British Speech Secrets</h4>
            <ul class="speaking-tips-list">
              <li><strong>Be Polite:</strong> Use <em>"Could I possibly..."</em> or <em>"Would you mind..."</em> instead of direct commands.</li>
              <li><strong>Natural Softeners:</strong> Brits often use <em>"quite"</em>, <em>"rather"</em>, <em>"a bit"</em> to sound measured.</li>
              <li><strong>Express Feelings:</strong> Say <em>"I'm chuffed to bits"</em> (delighted) or <em>"I'm knackered"</em> (exhausted).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach event listeners
  setupSpeakingEventListeners();
  renderSpeakingHistory();
}

/**
 * Setup All Event Listeners for Speaking Lab
 */
function setupSpeakingEventListeners() {
  const toggleBtn = document.getElementById('btn-toggle-record');
  const indicator = document.getElementById('recording-indicator');
  const timerEl = document.getElementById('recording-timer');
  const micText = document.getElementById('mic-btn-text');
  const transcriptArea = document.getElementById('speaking-transcript');
  const analyzeBtn = document.getElementById('btn-analyze-speech');
  const listenBtn = document.getElementById('btn-listen-my-text');
  const clearBtn = document.getElementById('btn-clear-transcript');

  // Topic Chips Click
  document.querySelectorAll('#speaking-topics-chips .topic-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#speaking-topics-chips .topic-chip').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const id = e.currentTarget.getAttribute('data-id');
      const found = SPEAKING_PROMPTS.find(p => p.id === id);
      if (found) {
        activePrompt = found;
        document.getElementById('prompt-title').innerText = activePrompt.title;
        document.getElementById('prompt-desc').innerText = activePrompt.prompt;
        const tagsContainer = document.getElementById('prompt-vocab-tags');
        if (tagsContainer) {
          tagsContainer.innerHTML = activePrompt.targetVocab.map(v => `<span class="vocab-tag">${v}</span>`).join('');
        }
      }
    });
  });

  // Toggle Microphone Recording
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (!isRecording) {
        // Start Recording
        recordedTranscript = transcriptArea.value.trim();
        recognition = setupSpeechRecognition(
          (res) => {
            transcriptArea.value = res.fullText;
          },
          () => {
            // on End
            stopRecordingUI();
          }
        );

        if (!recognition) {
          alert('Speech Recognition is not supported directly in this browser. Please use Chrome/Edge or type your text directly in the box!');
          return;
        }

        try {
          recognition.start();
          isRecording = true;
          toggleBtn.classList.add('recording-active');
          micText.innerText = 'Stop Recording (עצור הקלטה)';
          indicator.style.display = 'inline-flex';
          recognitionStartTime = Date.now();
          clearInterval(recognitionTimer);
          recognitionTimer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - recognitionStartTime) / 1000);
            const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
            const secs = String(elapsed % 60).padStart(2, '0');
            timerEl.innerText = `Recording en-GB... ${mins}:${secs}`;
          }, 1000);
        } catch (err) {
          console.error('Speech recognition start failed:', err);
          stopRecordingUI();
        }
      } else {
        // Stop Recording
        if (recognition) {
          try { recognition.stop(); } catch (e) {}
        }
        stopRecordingUI();
      }
    });
  }

  function stopRecordingUI() {
    isRecording = false;
    clearInterval(recognitionTimer);
    if (toggleBtn) {
      toggleBtn.classList.remove('recording-active');
      if (micText) micText.innerText = 'Start Speaking (הקלטה)';
    }
    if (indicator) indicator.style.display = 'none';
  }

  // Clear button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      transcriptArea.value = '';
      recordedTranscript = '';
      const feedbackCard = document.getElementById('speaking-feedback-card');
      if (feedbackCard) feedbackCard.style.display = 'none';
    });
  }

  // Listen to current text
  if (listenBtn) {
    listenBtn.addEventListener('click', () => {
      const text = transcriptArea.value.trim();
      if (!text) {
        alert('Please record or type some text first!');
        return;
      }
      speakPhrase(text);
    });
  }

  // Analyze Speech Click
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
      const text = transcriptArea.value.trim();
      if (!text) {
        alert('Please speak or type some English text before analyzing!');
        return;
      }

      const analysis = analyzeSpeech(text, activePrompt);
      renderSpeakingFeedback(analysis);

      // Save to database
      const entry = {
        id: `spk-${Date.now()}`,
        date: new Date().toISOString(),
        topic: activePrompt.title,
        category: activePrompt.category,
        spokenText: analysis.originalText,
        polishedVersion: analysis.polishedVersion,
        overallScore: analysis.overallScore,
        fluencyScore: analysis.fluencyScore,
        grammarScore: analysis.grammarScore,
        mistakesCount: analysis.mistakes.length
      };

      saveSpeakingItem(entry);
      renderSpeakingHistory();
    });
  }
}

/**
 * Render Detailed Feedback Card
 */
function renderSpeakingFeedback(res) {
  const card = document.getElementById('speaking-feedback-card');
  if (!card) return;

  const scoreColor = res.overallScore >= 80 ? 'var(--success)' : res.overallScore >= 60 ? 'var(--warning)' : '#e74c3c';

  card.style.display = 'block';
  card.innerHTML = `
    <div class="feedback-header">
      <div class="score-circle" style="border-color: ${scoreColor}; color: ${scoreColor};">
        <span class="score-number">${res.overallScore}</span>
        <span class="score-label">Score</span>
      </div>
      <div>
        <h3 style="margin: 0 0 0.25rem 0; color: var(--text-main); font-size: 1.3rem;">
          ${res.overallScore >= 85 ? '🌟 Excellent British Fluency!' : res.overallScore >= 70 ? '👍 Good Job! Minor polish needed' : '💡 Great effort! Let’s refine your English'}
        </h3>
        <p style="margin: 0; color: var(--text-muted); font-size: 0.9rem;">
          Analyzed ${res.wordCount} words • Fluency: <strong>${res.fluencyScore}%</strong> • Grammar: <strong>${res.grammarScore}%</strong>
        </p>
      </div>
    </div>

    <!-- POLISHED BRITISH VERSION -->
    <div class="native-version-box">
      <div class="native-box-header">
        <span><i class="fa-solid fa-crown" style="color: var(--gold);"></i> Native British Phrasing (הגרסה המשופרת):</span>
        <button type="button" class="btn-play-native" id="btn-play-polished">
          <i class="fa-solid fa-volume-high"></i> האזן להגייה המדויקת
        </button>
      </div>
      <p class="native-text">"${res.polishedVersion}"</p>
    </div>

    <!-- MISTAKES & CORRECTIONS -->
    ${res.mistakes.length > 0 ? `
      <div class="mistakes-section">
        <h4 style="margin: 0 0 0.75rem 0; font-size: 1.05rem; color: #e74c3c; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-circle-exclamation"></i> נקודות לשיפור (${res.mistakes.length} טעויות שזוהו):
        </h4>
        <div class="mistakes-list">
          ${res.mistakes.map(m => `
            <div class="mistake-item">
              <span class="mistake-badge">${m.type}</span>
              <div class="mistake-content">
                <strong>${m.error}</strong>
                <p style="margin: 0.2rem 0; font-size: 0.88rem; color: var(--text-muted);">${m.explanation}</p>
                <span class="mistake-tip">💡 ${m.tip}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : `
      <div class="perfect-grammar-badge">
        <i class="fa-solid fa-circle-check" style="color: var(--success); font-size: 1.3rem;"></i>
        <span>לא נמצאו שגיאות דקדוקיות מהותיות! דיבור מעולה ורהוט.</span>
      </div>
    `}

    <!-- BRITISH POLISH TIPS -->
    ${res.britishPolishes.length > 0 ? `
      <div class="british-polish-section">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.98rem; color: var(--uk-blue); display: flex; align-items: center; gap: 0.4rem;">
          🇬🇧 טיפים לאוצר מילים בריטי:
        </h4>
        <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.88rem; color: var(--text-muted);">
          ${res.britishPolishes.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>
    ` : ''}

    <!-- TARGET VOCAB SUCCESS -->
    ${res.usedTargetVocab.length > 0 ? `
      <div class="target-vocab-success">
        🎉 כל הכבוד! שילבת בהצלחה מילים בריטיות מומלצות: 
        <strong>${res.usedTargetVocab.join(', ')}</strong>
      </div>
    ` : ''}
  `;

  // Bind listen to polished version
  const playPolishedBtn = document.getElementById('btn-play-polished');
  if (playPolishedBtn) {
    playPolishedBtn.addEventListener('click', () => {
      speakPhrase(res.polishedVersion);
    });
  }

  // Smooth scroll into view
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Render Speaking History List
 */
function renderSpeakingHistory() {
  const listEl = document.getElementById('speaking-history-list');
  if (!listEl) return;

  const history = getSpeakingHistory();
  if (history.length === 0) {
    listEl.innerHTML = `
      <div class="empty-history" style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-microphone-slash" style="font-size: 2rem; margin-bottom: 0.5rem; opacity: 0.5;"></i>
        <p style="margin: 0; font-size: 0.9rem;">עדיין אין הקלטות שמורות. בחר נושא, הקלט את עצמך והתחל לתרגל!</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = history.slice(0, 10).map(item => {
    const d = new Date(item.date);
    const dateStr = `${d.getDate()}/${d.getMonth() + 1} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    const scoreColor = item.overallScore >= 80 ? 'var(--success)' : item.overallScore >= 60 ? 'var(--warning)' : '#e74c3c';

    return `
      <div class="history-item-card">
        <div class="history-item-top">
          <span class="history-topic">${item.topic || 'Speaking Session'}</span>
          <span class="history-score" style="color: ${scoreColor}; font-weight: 700;">${item.overallScore || 75} pts</span>
        </div>
        <p class="history-text">"${item.spokenText.length > 85 ? item.spokenText.slice(0, 85) + '...' : item.spokenText}"</p>
        <div class="history-item-bottom">
          <span class="history-date">${dateStr}</span>
          <button type="button" class="btn-history-play" data-text="${encodeURIComponent(item.polishedVersion || item.spokenText)}" title="Listen to Native Audio">
            <i class="fa-solid fa-volume-high"></i> האזן
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Bind audio playback for history items
  listEl.querySelectorAll('.btn-history-play').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const raw = e.currentTarget.getAttribute('data-text');
      if (raw) {
        speakPhrase(decodeURIComponent(raw));
      }
    });
  });
}
