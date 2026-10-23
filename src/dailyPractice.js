/**
 * British English Vault - Daily Practice (תרגול יומי: דיבור וכתיבה חופשית) 🎙️✍️
 * Rock-solid continuous speech recognition, real audio voice recording with playback,
 * grammar analysis, "למה טעיתי" explanations, and native British model answers.
 */

import { speakText } from './speech.js';

const DAILY_PRACTICE_HISTORY_KEY = 'bev_daily_practice_history';
const DAILY_PRACTICE_STATS_KEY = 'bev_daily_practice_stats';

// Daily conversation/writing ideas for inspiration
export const PRACTICE_IDEAS = [
  { id: 'free', title: '💭 נושא חופשי', hint: 'דבר או כתוב על כל מה שעולה לך לראש - מה עשית היום, מה אתה מרגיש, או תוכניות לעתיד.' },
  { id: 'day', title: '☕ שיחת יום-יום', hint: 'ספר באנגלית: מה היה החלק הכי מעניין או מפתיע ביום שלך עד עכשיו?' },
  { id: 'weekend', title: '🇬🇧 סוף שבוע בלונדון', hint: 'אילו היית נוחת מחר בלונדון ל-24 שעות, לאן היית הולך ומה היית מזמין בפאב מקומי?' },
  { id: 'opinion', title: '🗣️ הבעת דעה', hint: 'האם עדיף לעבוד מהבית או מהמשרד? נמק באנגלית לפחות 2 סיבות.' }
];

let activeIdea = PRACTICE_IDEAS[0];
let recognition = null;
let isRecording = false;
let recognitionTimer = null;
let recognitionStartTime = 0;

// MediaRecorder state for actual voice playback
let mediaStream = null;
let mediaRecorder = null;
let recordedAudioChunks = [];
let voiceAudioUrl = null;

// Speech recognition text accumulator to prevent cutting off or duplicating
let baseTextCommitted = '';
let currentSessionFinal = '';
let currentSessionInterim = '';

/**
 * Initialize Speech Recognition with continuous auto-restart and zero duplication
 */
function createSpeechEngine(onTranscriptUpdate, onStopped) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  const rec = new SpeechRecognition();
  rec.continuous = true;
  rec.interimResults = true;
  rec.lang = 'en-GB';
  rec.maxAlternatives = 1;

  rec.onresult = (event) => {
    let sessionFinal = '';
    let sessionInterim = '';

    for (let i = 0; i < event.results.length; ++i) {
      const item = event.results[i];
      if (item && item[0]) {
        if (item.isFinal) {
          sessionFinal += item[0].transcript + ' ';
        } else {
          sessionInterim += item[0].transcript;
        }
      }
    }

    currentSessionFinal = sessionFinal.trim();
    currentSessionInterim = sessionInterim.trim();

    // Assemble full transcript without duplication
    let assembled = baseTextCommitted;
    if (currentSessionFinal) {
      assembled += (assembled ? ' ' : '') + currentSessionFinal;
    }
    if (currentSessionInterim) {
      assembled += (assembled ? ' ' : '') + currentSessionInterim;
    }

    if (onTranscriptUpdate) {
      onTranscriptUpdate(assembled.trim());
    }
  };

  rec.onerror = (event) => {
    // 'no-speech' is non-fatal: user paused to breathe/think
    if (event.error === 'no-speech') {
      return;
    }
    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
      alert('נא לאשר גישה למיקרופון בדפדפן כדי להקליט, או הקלד ישירות את המשפט בתיבה.');
      isRecording = false;
      if (onStopped) onStopped();
      return;
    }
    console.warn('Speech recognition warning:', event.error);
  };

  rec.onend = () => {
    // If user is still actively recording, commit finalized chunk and seamlessly restart!
    if (isRecording) {
      if (currentSessionFinal) {
        baseTextCommitted += (baseTextCommitted ? ' ' : '') + currentSessionFinal;
        currentSessionFinal = '';
        currentSessionInterim = '';
      }
      try {
        rec.start();
      } catch (e) {
        // Retry shortly if restarting too quickly
        setTimeout(() => {
          if (isRecording) {
            try { rec.start(); } catch (err) {}
          }
        }, 200);
      }
    } else {
      if (onStopped) onStopped();
    }
  };

  return rec;
}

/**
 * Storage functions
 */
export function getDailyPracticeHistory() {
  try {
    const raw = localStorage.getItem(DAILY_PRACTICE_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveDailyPracticeEntry(entry) {
  const history = getDailyPracticeHistory();
  history.unshift(entry);
  if (history.length > 50) history.pop();
  localStorage.setItem(DAILY_PRACTICE_HISTORY_KEY, JSON.stringify(history));

  const stats = getDailyPracticeStats();
  stats.totalCount = (stats.totalCount || 0) + 1;
  stats.xp = (stats.xp || 0) + 30;
  localStorage.setItem(DAILY_PRACTICE_STATS_KEY, JSON.stringify(stats));

  return entry;
}

export function getDailyPracticeStats() {
  try {
    const raw = localStorage.getItem(DAILY_PRACTICE_STATS_KEY);
    return raw ? JSON.parse(raw) : { totalCount: 0, xp: 0 };
  } catch (e) {
    return { totalCount: 0, xp: 0 };
  }
}

/**
 * Linguistic Analyzer for Daily Input
 */
export function analyzeDailyInput(rawText) {
  const text = (rawText || '').trim();
  if (!text) {
    return { success: false, error: 'נא להקליט או להקליד טקסט באנגלית קודם.' };
  }

  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const mistakes = [];

  // 1. Subject-Verb Agreement
  if (/\b(he|she|it)\s+(don't|do|have|are)\b/i.test(text)) {
    mistakes.push({
      error: 'התאמת נושא ופועל (Subject-Verb Agreement)',
      found: text.match(/\b(he|she|it)\s+(don't|do|have|are)\b/i)?.[0] || 'he/she/it + don\'t',
      correct: 'שימוש ב-doesn\'t / does / has / is',
      why: 'באנגלית, בגוף שלישי יחיד (He / She / It) הפועל מקבל תוספת s/es, ובשלילה משתמשים תמיד ב-doesn\'t ולא ב-don\'t (לדוגמה: "She doesn\'t like" ולא "She don\'t likes").'
    });
  }

  if (/\b(i|we|they|you)\s+(does|is|has)\b/i.test(text)) {
    mistakes.push({
      error: 'התאמת פועל לגופים רבים או לגוף ראשון',
      found: text.match(/\b(i|we|they|you)\s+(does|is|has)\b/i)?.[0] || 'I/we/they + does/is',
      correct: 'שימוש ב-do / are / have',
      why: 'עם הגופים I, We, You, They משתמשים בפועל בצורת רבים (do, are, have ולא does/is/has).'
    });
  }

  // 2. Double Negatives (שלילה כפולה)
  if (/\b(don't|doesn't|didn't|can't|won't)\s+.*?\b(no|nothing|nobody|nowhere|never)\b/i.test(text)) {
    mistakes.push({
      error: 'שלילה כפולה (Double Negative)',
      found: 'שילוב של שתי מילות שלילה באותו המשפט',
      correct: 'להשתמש ב-anything / anybody / anywhere',
      why: 'באנגלית תקינה לא משתמשים בשתי מילות שלילה באותו משפט (למשל: לא אומרים "I didn\'t see nothing", אלא "I didn\'t see anything").'
    });
  }

  // 3. Prepositions (מילות יחס נפוצות)
  if (/\b(listen)\s+(to\s+)?(music|radio|him|her|them)\b/i.test(text) && !/\blisten\s+to\b/i.test(text)) {
    mistakes.push({
      error: 'מילת יחס חסרה אחרי הפועל listen',
      found: 'listen music',
      correct: 'listen to music',
      why: 'באנגלית אחרי הפועל listen חייבים להוסיף את מילת היחס to כאשר מקשיבים למשהו (listen to the radio, listen to music).'
    });
  }

  if (/\b(depend\s+of)\b/i.test(text)) {
    mistakes.push({
      error: 'מילת יחס שגויה עם depend',
      found: 'depend of',
      correct: 'depend on',
      why: 'בעברית אומרים "תלוי ב-", אך באנגלית הפועל depend הולך תמיד עם on (למשל: "It depends on the weather").'
    });
  }

  if (/\b(since\s+\d+\s+(years|months|days|hours))\b/i.test(text)) {
    mistakes.push({
      error: 'שימוש ב-since במקום for למשך זמן',
      found: text.match(/\bsince\s+\d+\s+(years|months|days|hours)\b/i)?.[0] || 'since X years',
      correct: 'for + משך זמן (לדוגמה: for three years)',
      why: 'כאשר מציינים משך זמן (Duration) משתמשים ב-for. ב-since משתמשים רק לנקודת זמן ספציפית בעבר (since 2020, since yesterday).'
    });
  }

  if (/\b(very\s+like|very\s+love)\b/i.test(text)) {
    mistakes.push({
      error: 'ניסוח לא טבעי: very like',
      found: 'very like / very love',
      correct: 'really like / love ... very much',
      why: 'באנגלית לא שמים very ישירות לפני פועל. אומרים: "I really like it" או "I like it very much".'
    });
  }

  // 4. British vs American phrasing
  const britishHints = [];
  if (/\b(french fries|fries)\b/i.test(text)) {
    britishHints.push('באנגליה נהוג לומר **chips** במקום fries.');
  }
  if (/\b(apartment)\b/i.test(text)) {
    britishHints.push('בבריטניה נהוג לומר **flat** במקום apartment.');
  }
  if (/\b(elevator)\b/i.test(text)) {
    britishHints.push('בבריטניה משתמשים ב-**lift** במקום elevator.');
  }
  if (/\b(subway)\b/i.test(text)) {
    britishHints.push('בלונדון הרכבת התחתית נקראת **Tube** או **Underground**.');
  }

  // 5. Generate Polished British Version
  let polished = text
    .replace(/\bhe don't\b/gi, "he doesn't")
    .replace(/\bshe don't\b/gi, "she doesn't")
    .replace(/\bit don't\b/gi, "it doesn't")
    .replace(/\blisten music\b/gi, "listen to music")
    .replace(/\bdepend of\b/gi, "depend on")
    .replace(/\bvery like\b/gi, "really like")
    .replace(/\bfrench fries\b/gi, "chips")
    .replace(/\bapartment\b/gi, "flat")
    .replace(/\belevator\b/gi, "lift")
    .replace(/\bcolor\b/gi, "colour")
    .replace(/\bcenter\b/gi, "centre");

  polished = polished.charAt(0).toUpperCase() + polished.slice(1);
  if (!/[.!?]$/.test(polished)) polished += '.';

  let score = 95 - (mistakes.length * 20);
  if (score < 50) score = 50;

  return {
    success: true,
    originalText: text,
    polishedVersion: polished,
    wordCount,
    score,
    mistakes,
    britishHints
  };
}

/**
 * Initialize and render Daily Practice view into #view-daily-practice
 */
export function initDailyPracticeUI() {
  const container = document.getElementById('view-daily-practice');
  if (!container) return;

  // Clean up any stale active recording before re-rendering
  stopActiveRecording();

  const history = getDailyPracticeHistory();
  const stats = getDailyPracticeStats();

  container.innerHTML = `
    <div class="daily-practice-container" style="max-width: 950px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- HERO HEADER -->
      <div class="card" style="padding: 1.5rem 1.75rem; background: linear-gradient(135deg, rgba(0,36,125,0.06) 0%, rgba(212,175,55,0.12) 100%); border: 1px solid var(--border-color); border-radius: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span style="background: var(--uk-blue); color: #fff; font-size: 0.8rem; font-weight: 700; padding: 0.25rem 0.65rem; border-radius: 999px; text-transform: uppercase;">
              <i class="fa-solid fa-microphone-lines"></i> תרגול יומי
            </span>
            <h2 style="margin: 0.5rem 0 0.25rem 0; font-size: 1.6rem; color: var(--text-main);">תרגול דיבור וכתיבה חופשית באנגלית</h2>
            <p style="margin: 0; color: var(--text-muted); font-size: 0.95rem;">
              הקלט את עצמך מדבר חופשי או כתוב באנגלית. המערכת תבדוק את המשפט, תסביר בעברית <strong>למה טעית</strong>, ותציג <strong>מה התשובה הנכונה</strong> עם השמעה בריטית!
            </p>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 0.6rem 1rem; border-radius: 12px; text-align: center;">
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--gold);">${stats.xp || 0}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Practice XP</div>
            </div>
            <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 0.6rem 1rem; border-radius: 12px; text-align: center;">
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--uk-blue);">${stats.totalCount || 0}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">תרגולים</div>
            </div>
          </div>
        </div>
      </div>

      <!-- WORKBENCH CARD -->
      <div class="card" style="padding: 1.75rem; border-radius: 16px;">
        <!-- IDEAS CHIPS -->
        <div style="margin-bottom: 1.25rem;">
          <span style="font-size: 0.88rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">
            <i class="fa-solid fa-lightbulb" style="color: var(--gold);"></i> רעיון לשיחה או כתיבה (או פשוט דבר/כתוב חופשי):
          </span>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;" id="practice-ideas-row">
            ${PRACTICE_IDEAS.map(idea => `
              <button type="button" class="btn-idea-chip ${idea.id === activeIdea.id ? 'active' : ''}" data-id="${idea.id}" 
                style="padding: 0.4rem 0.85rem; border-radius: 999px; font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 1px solid var(--border-color); background: ${idea.id === activeIdea.id ? 'var(--uk-blue)' : 'var(--bg-hover)'}; color: ${idea.id === activeIdea.id ? '#fff' : 'var(--text-main)'}; transition: all 0.2s;">
                ${idea.title}
              </button>
            `).join('')}
          </div>
          <p id="practice-idea-hint" style="margin: 0.65rem 0 0 0; font-size: 0.9rem; color: var(--text-muted); font-style: italic;">
            💡 ${activeIdea.hint}
          </p>
        </div>

        <!-- RECORD & WRITE WORKBENCH -->
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <!-- RECORDING BAR -->
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; padding: 0.85rem 1.15rem; background: var(--bg-hover); border-radius: 14px; border: 1px solid var(--border-color);">
            <div style="display: flex; align-items: center; gap: 0.85rem; flex-wrap: wrap;">
              <button type="button" id="btn-practice-record" 
                style="background: var(--uk-red); color: #fff; border: none; padding: 0.75rem 1.5rem; border-radius: 999px; font-weight: 700; font-size: 1rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.55rem; box-shadow: 0 4px 14px rgba(200,16,46,0.3); transition: all 0.25s;">
                <i class="fa-solid fa-microphone"></i>
                <span id="practice-rec-text">לחץ להקלטת דיבור</span>
              </button>
              
              <div id="practice-rec-indicator" style="display: none; align-items: center; gap: 0.6rem; color: var(--uk-red); font-weight: 700; font-size: 0.9rem;">
                <span class="pulse-dot" style="display: inline-block; width: 12px; height: 12px; background: var(--uk-red); border-radius: 50%; box-shadow: 0 0 0 4px rgba(200,16,46,0.25); animation: blink 1s infinite;"></span>
                <span id="practice-rec-timer">מקליט ומאזין... 00:00</span>
              </div>
            </div>

            <button type="button" id="btn-practice-clear" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.85rem; font-weight: 600;">
              <i class="fa-solid fa-trash-can"></i> נקה טקסט
            </button>
          </div>

          <!-- VOICE AUDIO PLAYBACK ROW (YOUR RECORDING) -->
          <div id="practice-voice-playback" style="display: none; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.75rem 1rem; background: rgba(0,36,125,0.06); border: 1px solid var(--uk-blue); border-radius: 12px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; color: var(--uk-blue); font-size: 0.92rem;">
              <i class="fa-solid fa-circle-play"></i> שמע את הקול שלך (הקלטה מהמיקרופון):
            </div>
            <audio id="practice-voice-audio" controls style="height: 38px; max-width: 100%; border-radius: 8px;"></audio>
          </div>

          <!-- TEXTAREA -->
          <div>
            <label for="practice-textarea" class="form-label" style="font-weight: 700; display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
              <span>הטקסט שלך (מדבר או כותב):</span>
              <span id="practice-word-counter" style="color: var(--text-muted); font-size: 0.82rem; font-weight: 500;">0 מילים</span>
            </label>
            <textarea id="practice-textarea" class="form-control" rows="4" 
              placeholder="לחץ על המיקרופון והתחל לדבר, או הקלד כאן באנגלית חופשית... (לדוגמה: 'Yesterday she don't go to school because she was very tired')" 
              style="font-size: 1.05rem; line-height: 1.6; border-radius: 12px; padding: 1rem; border: 1.5px solid var(--border-color);"></textarea>
          </div>

          <!-- ACTIONS ROW -->
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <button type="button" id="btn-practice-analyze" class="btn btn-primary btn-lg" style="flex: 1; min-width: 200px;">
              <i class="fa-solid fa-wand-magic-sparkles"></i> בדוק שגיאות ותקן אותי
            </button>
            <button type="button" id="btn-practice-listen-raw" class="btn btn-secondary btn-lg" title="Listen to what you wrote">
              <i class="fa-solid fa-volume-high"></i> השמע לי
            </button>
          </div>
        </div>

        <!-- FEEDBACK & CORRECTIONS CARD -->
        <div id="practice-feedback-card" style="display: none; margin-top: 1.5rem; padding: 1.5rem; background: var(--bg-hover); border-radius: 14px; border: 1px solid var(--border-color);">
          <!-- Dynamic Content Rendered Here -->
        </div>
      </div>

      <!-- RECENT PRACTICE SESSIONS -->
      <div class="card" style="padding: 1.5rem; border-radius: 16px;">
        <h3 style="margin: 0 0 1rem 0; font-size: 1.15rem; color: var(--text-main); display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-clock-rotate-left" style="color: var(--uk-blue);"></i>
          תרגולים אחרונים שנשמרו בבסיס הנתונים
        </h3>
        <div id="practice-history-list" style="display: flex; flex-direction: column; gap: 0.75rem;">
          <!-- Loaded dynamically -->
        </div>
      </div>
    </div>
  `;

  setupDailyPracticeEvents();
  renderDailyPracticeHistory();
}

/**
 * Safely stop active recording and release streams
 */
function stopActiveRecording() {
  isRecording = false;
  clearInterval(recognitionTimer);

  if (recognition) {
    try { recognition.abort(); } catch (e) {}
    recognition = null;
  }

  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    try { mediaRecorder.stop(); } catch (e) {}
    mediaRecorder = null;
  }

  if (mediaStream) {
    try {
      mediaStream.getTracks().forEach(track => track.stop());
    } catch (e) {}
    mediaStream = null;
  }
}

/**
 * Setup Event Listeners for Daily Practice
 */
function setupDailyPracticeEvents() {
  const recBtn = document.getElementById('btn-practice-record');
  const recText = document.getElementById('practice-rec-text');
  const indicator = document.getElementById('practice-rec-indicator');
  const timerEl = document.getElementById('practice-rec-timer');
  const textarea = document.getElementById('practice-textarea');
  const clearBtn = document.getElementById('btn-practice-clear');
  const analyzeBtn = document.getElementById('btn-practice-analyze');
  const listenRawBtn = document.getElementById('btn-practice-listen-raw');
  const wordCounter = document.getElementById('practice-word-counter');

  // Word counter update
  if (textarea && wordCounter) {
    textarea.addEventListener('input', () => {
      const words = textarea.value.trim().split(/\s+/).filter(Boolean).length;
      wordCounter.innerText = `${words} מילים`;
    });
  }

  // Ideas chip switcher
  document.querySelectorAll('#practice-ideas-row .btn-idea-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#practice-ideas-row .btn-idea-chip').forEach(b => {
        b.style.background = 'var(--bg-hover)';
        b.style.color = 'var(--text-main)';
      });
      e.currentTarget.style.background = 'var(--uk-blue)';
      e.currentTarget.style.color = '#fff';

      const id = e.currentTarget.getAttribute('data-id');
      const found = PRACTICE_IDEAS.find(i => i.id === id);
      if (found) {
        activeIdea = found;
        const hintEl = document.getElementById('practice-idea-hint');
        if (hintEl) hintEl.innerText = `💡 ${found.hint}`;
      }
    });
  });

  // Recording toggle
  if (recBtn) {
    recBtn.addEventListener('click', async () => {
      if (!isRecording) {
        // 1. Prepare text accumulators
        baseTextCommitted = textarea.value.trim();
        currentSessionFinal = '';
        currentSessionInterim = '';

        // 2. Request mic access and start voice recorder (MediaRecorder)
        recordedAudioChunks = [];
        try {
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (window.MediaRecorder) {
              mediaRecorder = new MediaRecorder(mediaStream);
              mediaRecorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) recordedAudioChunks.push(e.data);
              };
              mediaRecorder.onstop = () => {
                const blob = new Blob(recordedAudioChunks, { type: 'audio/webm' });
                if (voiceAudioUrl) URL.revokeObjectURL(voiceAudioUrl);
                voiceAudioUrl = URL.createObjectURL(blob);

                const voicePlayback = document.getElementById('practice-voice-playback');
                const voiceAudio = document.getElementById('practice-voice-audio');
                if (voicePlayback && voiceAudio) {
                  voiceAudio.src = voiceAudioUrl;
                  voicePlayback.style.display = 'flex';
                }
              };
              mediaRecorder.start(250);
            }
          }
        } catch (micErr) {
          console.warn('Microphone capture error:', micErr);
        }

        // 3. Start speech recognition engine
        recognition = createSpeechEngine(
          (fullText) => {
            textarea.value = fullText;
            if (wordCounter) {
              const words = fullText.split(/\s+/).filter(Boolean).length;
              wordCounter.innerText = `${words} מילים`;
            }
          },
          () => stopRecUI()
        );

        if (!recognition && !mediaRecorder) {
          alert('דפדפן זה אינו תומך בהקלטה ישירה. מומלץ להשתמש ב-Chrome/Edge או להקליד ישירות את הטקסט.');
          return;
        }

        try {
          if (recognition) recognition.start();
          isRecording = true;
          recBtn.style.background = '#111';
          recText.innerText = 'עצור הקלטה';
          indicator.style.display = 'inline-flex';
          recognitionStartTime = Date.now();
          clearInterval(recognitionTimer);
          recognitionTimer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - recognitionStartTime) / 1000);
            const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
            const secs = String(elapsed % 60).padStart(2, '0');
            timerEl.innerText = `מקליט ומאזין... ${mins}:${secs}`;
          }, 1000);
        } catch (e) {
          console.error('Speech recognition start failed:', e);
          stopRecUI();
        }
      } else {
        // User explicitly clicked Stop Recording
        stopRecUI();
      }
    });
  }

  function stopRecUI() {
    isRecording = false;
    clearInterval(recognitionTimer);

    if (recognition) {
      try { recognition.stop(); } catch (e) {}
      recognition = null;
    }

    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      try { mediaRecorder.stop(); } catch (e) {}
    }

    if (mediaStream) {
      try {
        mediaStream.getTracks().forEach(track => track.stop());
      } catch (e) {}
      mediaStream = null;
    }

    if (recBtn) {
      recBtn.style.background = 'var(--uk-red)';
      recText.innerText = 'לחץ להקלטת דיבור';
    }
    if (indicator) indicator.style.display = 'none';
  }

  // Clear text button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      textarea.value = '';
      baseTextCommitted = '';
      currentSessionFinal = '';
      currentSessionInterim = '';
      if (wordCounter) wordCounter.innerText = '0 מילים';

      const feedbackCard = document.getElementById('practice-feedback-card');
      if (feedbackCard) feedbackCard.style.display = 'none';

      const voicePlayback = document.getElementById('practice-voice-playback');
      if (voicePlayback) voicePlayback.style.display = 'none';
    });
  }

  // Listen to raw text
  if (listenRawBtn) {
    listenRawBtn.addEventListener('click', () => {
      const text = textarea.value.trim();
      if (!text) {
        alert('נא להקליד או להקליט טקסט תחילה!');
        return;
      }
      speakText(text);
    });
  }

  // Analyze & Check
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
      const text = textarea.value.trim();
      if (!text) {
        alert('נא להקליד או להקליט משפט באנגלית לפני הבדיקה!');
        return;
      }

      const res = analyzeDailyInput(text);
      renderDailyFeedback(res);

      // Save to database
      const entry = {
        id: `dp-${Date.now()}`,
        date: new Date().toISOString(),
        userText: text,
        polishedVersion: res.polishedVersion,
        score: res.score,
        mistakesCount: res.mistakes.length
      };

      saveDailyPracticeEntry(entry);
      renderDailyPracticeHistory();
    });
  }
}

/**
 * Render Feedback: "מה התשובה הנכונה" ו-"למה טעיתי"
 */
function renderDailyFeedback(res) {
  const card = document.getElementById('practice-feedback-card');
  if (!card) return;

  const scoreColor = res.score >= 80 ? 'var(--success)' : res.score >= 60 ? 'var(--warning)' : '#e74c3c';

  card.style.display = 'block';
  card.innerHTML = `
    <!-- HEADER -->
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <div style="width: 52px; height: 52px; border-radius: 50%; border: 3px solid ${scoreColor}; color: ${scoreColor}; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: 800; background: var(--bg-card);">
          ${res.score}
        </div>
        <div>
          <h4 style="margin: 0; font-size: 1.15rem; color: var(--text-main);">
            ${res.score >= 85 ? '🌟 מצוין! דיבור וכתיבה ברמה גבוהה' : res.score >= 65 ? '👍 טוב מאוד! הנה כמה תיקונים חשובים' : '💡 כל הכבוד על הניסיון! הנה בדיוק איך לשפר'}
          </h4>
          <span style="font-size: 0.85rem; color: var(--text-muted);">
            נותחו ${res.wordCount} מילים • נמצאו ${res.mistakes.length} נקודות לתיקון
          </span>
        </div>
      </div>
    </div>

    <!-- 1. מה התשובה הנכונה (THE CORRECT ANSWER) -->
    <div style="background: linear-gradient(135deg, rgba(46,204,113,0.08) 0%, rgba(0,36,125,0.06) 100%); border: 1.5px solid var(--success); border-radius: 12px; padding: 1.2rem; margin-bottom: 1.25rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
        <span style="font-weight: 800; font-size: 0.95rem; color: var(--success); display: flex; align-items: center; gap: 0.4rem;">
          <i class="fa-solid fa-circle-check"></i> מה התשובה הנכונה (Native British English):
        </span>
        <button type="button" id="btn-play-correct-speech" class="btn btn-sm btn-primary" style="display: inline-flex; align-items: center; gap: 0.4rem;">
          <i class="fa-solid fa-volume-high"></i> האזן להגייה הנכונה
        </button>
      </div>
      <p style="margin: 0; font-size: 1.2rem; font-weight: 700; color: var(--text-main); line-height: 1.5;">
        "${res.polishedVersion}"
      </p>
    </div>

    <!-- 2. למה טעיתי? (WHY DID I MAKE A MISTAKE?) -->
    ${res.mistakes.length > 0 ? `
      <div style="margin-bottom: 1.25rem;">
        <h4 style="margin: 0 0 0.75rem 0; font-size: 1.05rem; color: #e74c3c; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-circle-question"></i> למה טעיתי? (${res.mistakes.length} שגיאות שזוהו):
        </h4>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${res.mistakes.map((m, idx) => `
            <div style="background: var(--bg-card); border: 1px solid rgba(231,76,60,0.3); border-right: 4px solid #e74c3c; padding: 1rem; border-radius: 10px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
                <span style="font-weight: 700; color: #e74c3c; font-size: 0.92rem;">${idx + 1}. ${m.error}</span>
                <span style="font-size: 0.8rem; background: rgba(231,76,60,0.1); color: #e74c3c; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700;">שגיאה</span>
              </div>
              <div style="margin-bottom: 0.4rem; font-size: 0.9rem;">
                <span style="color: var(--text-muted);">מה שאמרת/כתבת:</span> <strong style="color: #e74c3c; text-decoration: line-through;">"${m.found}"</strong> 
                &larr; <span style="color: var(--text-muted);">התיקון:</span> <strong style="color: var(--success);">"${m.correct}"</strong>
              </div>
              <p style="margin: 0; font-size: 0.9rem; color: var(--text-main); line-height: 1.5; background: var(--bg-hover); padding: 0.6rem 0.85rem; border-radius: 6px;">
                💡 <strong>ההסבר למה טעית:</strong> ${m.why}
              </p>
            </div>
          `).join('')}
        </div>
      </div>
    ` : `
      <div style="background: rgba(46,204,113,0.1); border: 1px solid var(--success); padding: 1rem; border-radius: 10px; color: var(--success); font-weight: 700; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
        <i class="fa-solid fa-trophy" style="font-size: 1.2rem;"></i>
        <span>כל הכבוד! לא נמצאו שגיאות דקדוקיות במשפט שלך. הדיבור/כתיבה היו מדויקים לחלוטין!</span>
      </div>
    `}

    <!-- 3. טיפים לאנגלית בריטית -->
    ${res.britishHints.length > 0 ? `
      <div style="background: rgba(0,36,125,0.06); border: 1px solid rgba(0,36,125,0.2); border-radius: 10px; padding: 0.85rem 1rem;">
        <span style="font-weight: 700; color: var(--uk-blue); font-size: 0.9rem; display: flex; align-items: center; gap: 0.4rem;">
          🇬🇧 שדרוג לאנגלית בריטית מקורית:
        </span>
        <ul style="margin: 0.35rem 0 0 1.25rem; font-size: 0.88rem; color: var(--text-main); line-height: 1.5;">
          ${res.britishHints.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    ` : ''}
  `;

  // Bind listen button for correct sentence
  const playBtn = document.getElementById('btn-play-correct-speech');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      speakText(res.polishedVersion);
    });
  }

  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Render Daily Practice History List
 */
function renderDailyPracticeHistory() {
  const listEl = document.getElementById('practice-history-list');
  if (!listEl) return;

  const history = getDailyPracticeHistory();
  if (history.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: 1.5rem 0; color: var(--text-muted); font-size: 0.9rem;">
        עדיין אין תרגולים שמורים. הקלט את עצמך או כתוב משפט כדי להתחיל!
      </div>
    `;
    return;
  }

  listEl.innerHTML = history.slice(0, 8).map(item => {
    const d = new Date(item.date);
    const dateStr = `${d.getDate()}/${d.getMonth() + 1} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    const scoreColor = item.score >= 80 ? 'var(--success)' : item.score >= 60 ? 'var(--warning)' : '#e74c3c';

    return `
      <div style="background: var(--bg-hover); border: 1px solid var(--border-color); padding: 0.85rem 1rem; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <div style="flex: 1; min-width: 220px;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
            <span style="font-weight: 700; color: ${scoreColor}; font-size: 0.85rem;">ציון: ${item.score}</span>
            <span style="color: var(--text-muted); font-size: 0.75rem;">• ${dateStr}</span>
          </div>
          <div style="font-size: 0.92rem; color: var(--text-main); font-weight: 500;">
            "${item.userText.length > 70 ? item.userText.slice(0, 70) + '...' : item.userText}"
          </div>
        </div>
        <button type="button" class="btn btn-sm btn-secondary btn-history-play" data-text="${encodeURIComponent(item.polishedVersion || item.userText)}" 
          style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.8rem;">
          <i class="fa-solid fa-volume-high"></i> השמע תיקון
        </button>
      </div>
    `;
  }).join('');

  listEl.querySelectorAll('.btn-history-play').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const raw = e.currentTarget.getAttribute('data-text');
      if (raw) {
        speakText(decodeURIComponent(raw));
      }
    });
  });
}
