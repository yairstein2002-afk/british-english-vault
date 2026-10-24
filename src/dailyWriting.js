/**
 * British English Vault - Daily Writing ✍️🎙️
 * 100% English Interface
 * Features:
 * - Daily Free Writing (open journaling about your day)
 * - Deep Grammar & Style Correction with "Why this is an error" explanations
 * - Advanced Voice Recording with Improved Speech Recognition (Zero Word-Repeating)
 * - HTML5 Audio Playback of your actual microphone voice (IndexedDB Storage)
 * - British Accent, Pacing (WPM), and Pronunciation Feedback
 * - Date & Mode Filtering for Past Writings and Audio Recordings
 * - Database Persistence (LocalStorage + IndexedDB + Supabase Sync)
 */

import { getGeminiApiKey } from './ai.js';
import { speakText } from './speech.js';
import { getSupabaseConfig, upsertItemInSupabase } from './supabase.js';
import { auditWritingSubmission } from './dailyPractice.js';
import { showCopyShareToast, copyTextToClipboard, shareTextContent } from './shareUtils.js';

export { showCopyShareToast, copyTextToClipboard, shareTextContent };

// STORAGE KEYS
const STORAGE_KEYS = {
  ENTRIES: 'bev_daily_writing_entries',
  STREAK: 'bev_daily_writing_streak',
  LAST_DATE: 'bev_daily_writing_last_date',
  TOTAL_WORDS: 'bev_daily_writing_total_words'
};

// INDEXEDDB CONFIG FOR AUDIO BLOBS
const IDB_NAME = 'bev_audio_vault_db';
const IDB_VERSION = 1;
const IDB_STORE = 'voice_recordings';

function openAudioDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }
    const request = window.indexedDB.open(IDB_NAME, IDB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}

async function saveAudioBlobToDB(id, blob) {
  try {
    const db = await openAudioDB();
    if (!db) return false;
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      const store = tx.objectStore(IDB_STORE);
      store.put({ id, blob, createdAt: Date.now() });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch (e) {
    return false;
  }
}

async function getAudioBlobFromDB(id) {
  try {
    const db = await openAudioDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const store = tx.objectStore(IDB_STORE);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result ? req.result.blob : null);
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    return null;
  }
}

async function deleteAudioBlobFromDB(id) {
  try {
    const db = await openAudioDB();
    if (!db) return;
    const tx = db.transaction(IDB_STORE, 'readwrite');
    tx.objectStore(IDB_STORE).delete(id);
  } catch (e) {}
}

// ============================================================================
// STATE
// ============================================================================
let activeMode = 'write'; // 'write' | 'record' | 'archive'
let currentRecordingStream = null;
let currentMediaRecorder = null;
let currentAudioChunks = [];
let recordingStartTime = 0;
let recordingTimerInterval = null;
let activeSpeechRecognition = null;
let recordedAudioBlob = null;
let recordedAudioUrl = null;
let currentVoiceTranscript = '';
let isRecordingActive = false;

// Filter State for Archive
let filterDatePreset = 'all'; // 'all', 'today', 'yesterday', '7days', '30days', 'custom'
let filterMediaType = 'all'; // 'all', 'text', 'audio'
let filterSearchKeyword = '';
let filterCustomDate = '';

// ============================================================================
// DATA PERSISTENCE
// ============================================================================
export function getDailyWritingEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ENTRIES) || '[]');
  } catch (e) {
    return [];
  }
}

export function saveDailyWritingEntry(entry) {
  const entries = getDailyWritingEntries();
  const newEntry = {
    id: entry.id || 'dw_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    timestamp: new Date().toISOString(),
    dateStr: new Date().toISOString().split('T')[0],
    ...entry
  };

  entries.unshift(newEntry);
  if (entries.length > 200) entries.pop();
  localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));

  // Update Daily Streak
  updateStreakCounter();

  // Try Syncing to Supabase if configured
  syncEntryToDatabase(newEntry);

  return newEntry;
}

export function deleteDailyWritingEntry(id) {
  let entries = getDailyWritingEntries();
  entries = entries.filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));
  deleteAudioBlobFromDB(id);
}

function updateStreakCounter() {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const lastDate = localStorage.getItem(STORAGE_KEYS.LAST_DATE);
  let streak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '0', 10);

  if (lastDate === today) {
    // Already updated today
  } else if (lastDate === yesterday) {
    streak += 1;
  } else {
    streak = 1;
  }

  localStorage.setItem(STORAGE_KEYS.STREAK, streak.toString());
  localStorage.setItem(STORAGE_KEYS.LAST_DATE, today);
}

function getDailyStreak() {
  const streak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '0', 10);
  const lastDate = localStorage.getItem(STORAGE_KEYS.LAST_DATE);
  if (!lastDate) return 0;

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (lastDate === today || lastDate === yesterday) return streak;
  return 0;
}

async function syncEntryToDatabase(entry) {
  try {
    const config = getSupabaseConfig();
    if (!config.url || !config.key) return;

    // Optional sync to custom daily_writing table in Supabase
    const payload = {
      id: entry.id,
      entry_type: entry.type,
      raw_text: entry.rawText,
      polished_text: entry.polishedText || '',
      word_count: entry.wordCount || 0,
      score: entry.score || 100,
      created_at: entry.timestamp
    };

    fetch(`${config.url}/rest/v1/daily_writing`, {
      method: 'POST',
      headers: {
        'apikey': config.key,
        'Authorization': `Bearer ${config.key}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(payload)
    }).catch(() => {});
  } catch (e) {}
}

// ============================================================================
// DEEP TEXT AUDIT & ERROR EXPLANATION ENGINE
// ============================================================================
export function analyzeDailyWriting(text) {
  const clean = (text || '').trim();
  const words = clean.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  if (wordCount === 0) {
    return {
      isValid: false,
      score: 0,
      wordCount: 0,
      errors: [{
        category: 'Blank Entry',
        mistake: 'No text provided',
        correction: 'Write a few sentences about your day.',
        explanation: 'Expressing your daily thoughts requires at least one sentence.'
      }],
      polishedText: '',
      tips: ['Start by describing what you did this morning or how you feel right now.']
    };
  }

  const errors = [];
  const tips = [];

  // 1. Subject-Verb Agreement checks
  const agreementRules = [
    {
      regex: /\b(he|she|it)\s+(don't|dont)\b/i,
      mistake: (match) => match[0],
      correction: 'doesn\'t',
      category: 'Subject-Verb Agreement',
      explanation: 'In the Present Simple tense with third-person singular pronouns (he, she, it), the correct negative auxiliary verb is "doesn\'t" (does not), not "don\'t".'
    },
    {
      regex: /\b(he|she|it)\s+(have)\b/i,
      mistake: (match) => match[0],
      correction: 'has',
      category: 'Subject-Verb Agreement',
      explanation: 'Third-person singular subjects (he, she, it) pair with "has", while plural subjects (they, we) pair with "have".'
    },
    {
      regex: /\b(they|we|you)\s+(is|was)\b/i,
      mistake: (match) => match[0],
      correction: 'are / were',
      category: 'Subject-Verb Agreement',
      explanation: 'Plural pronouns (they, we, you) must agree with plural verb forms ("are" in the present, "were" in the past).'
    },
    {
      regex: /\b(he|she|it)\s+(go|want|like|need|make|take|think|feel)\b/i,
      mistake: (match) => match[0],
      correction: (match) => match[1] + ' ' + match[2] + 's',
      category: 'Subject-Verb Agreement',
      explanation: 'In the Present Simple, verbs after "he", "she", or "it" require an "-s" or "-es" suffix (e.g. "he goes", "she wants").'
    },
    {
      regex: /\bthere\s+is\s+([0-9]+|many|several|multiple|a\s+lot\s+of)\s+([a-z]+s)\b/i,
      mistake: (match) => match[0],
      correction: 'there are',
      category: 'Plural Agreement',
      explanation: 'When describing multiple items or people, use "there are" rather than "there is".'
    }
  ];

  agreementRules.forEach(rule => {
    const match = clean.match(rule.regex);
    if (match) {
      errors.push({
        category: rule.category,
        mistake: typeof rule.mistake === 'function' ? rule.mistake(match) : match[0],
        correction: typeof rule.correction === 'function' ? rule.correction(match) : rule.correction,
        explanation: rule.explanation
      });
    }
  });

  // 2. Common Grammatical Traps & Idioms
  const grammarTrapRules = [
    {
      regex: /\bI\s+am\s+agree\b/i,
      mistake: 'I am agree',
      correction: 'I agree',
      category: 'Verb Usage',
      explanation: '"Agree" is an active verb, not an adjective. Therefore, you do not need the auxiliary verb "am". Say "I agree".'
    },
    {
      regex: /\bmarried\s+with\b/i,
      mistake: 'married with',
      correction: 'married to',
      category: 'Preposition Error',
      explanation: 'In English, one is married "to" someone, rather than "with".'
    },
    {
      regex: /\barrive\s+to\b/i,
      mistake: 'arrive to',
      correction: 'arrive at / in',
      category: 'Preposition Error',
      explanation: 'The verb "arrive" pairs with "at" (for buildings and specific venues) or "in" (for cities and countries), never "to".'
    },
    {
      regex: /\blook\s+forward\s+to\s+([a-z]+)(?!ing)\b/i,
      mistake: (m) => m[0],
      correction: 'look forward to + [verb]-ing',
      category: 'Gerund after Preposition',
      explanation: 'In the idiom "look forward to", the word "to" functions as a preposition, which requires a gerund noun form (-ing).'
    },
    {
      regex: /\bdespite\s+of\b/i,
      mistake: 'despite of',
      correction: 'despite (or in spite of)',
      category: 'Preposition Redundancy',
      explanation: '"Despite" does not take "of". You can either use "despite" alone or the three-word phrase "in spite of".'
    },
    {
      regex: /\balthough\b.*\bbut\b/i,
      mistake: 'although ... but',
      correction: 'Use either "Although" OR "but", never both',
      category: 'Conjunction Redundancy',
      explanation: '"Although" and "but" are both contrastive connectors. Using both in one sentence creates grammatical conflict.'
    },
    {
      regex: /\byesterday\s+I\s+(go|see|buy|eat|make|meet|take)\b/i,
      mistake: (m) => m[0],
      correction: 'Use Past Simple form (went, saw, bought, ate, made, met, took)',
      category: 'Past Tense Consistency',
      explanation: 'When talking about "yesterday", actions that finished in the past must be conjugated into the Past Simple tense.'
    }
  ];

  grammarTrapRules.forEach(rule => {
    const match = clean.match(rule.regex);
    if (match) {
      errors.push({
        category: rule.category,
        mistake: typeof rule.mistake === 'function' ? rule.mistake(match) : match[0],
        correction: typeof rule.correction === 'function' ? rule.correction(match) : rule.correction,
        explanation: rule.explanation
      });
    }
  });

  // 3. Articles (a vs an)
  const aAnVowelMatch = clean.match(/\ba\s+([aeiou][a-z]+)\b/i);
  if (aAnVowelMatch && !/university|unique|uniform|european|user/i.test(aAnVowelMatch[1])) {
    errors.push({
      category: 'Article Misuse (a / an)',
      mistake: `a ${aAnVowelMatch[1]}`,
      correction: `an ${aAnVowelMatch[1]}`,
      explanation: 'Use the indefinite article "an" before words that begin with a vowel sound (a, e, i, o, u).'
    });
  }

  const anConsonantMatch = clean.match(/\ban\s+([bcdfghjklmnpqrstvwxyz][a-z]+)\b/i);
  if (anConsonantMatch && !/hour|honest|honor/i.test(anConsonantMatch[1])) {
    errors.push({
      category: 'Article Misuse (a / an)',
      mistake: `an ${anConsonantMatch[1]}`,
      correction: `a ${anConsonantMatch[1]}`,
      explanation: 'Use the indefinite article "a" before words that start with a consonant sound.'
    });
  }

  // 4. Capitalization & Punctuation
  if (/^[a-z]/.test(clean)) {
    errors.push({
      category: 'Capitalization',
      mistake: clean.charAt(0),
      correction: clean.charAt(0).toUpperCase(),
      explanation: 'Every English sentence must begin with an uppercase letter.'
    });
  }

  if (/\b(i)\b/.test(clean)) {
    errors.push({
      category: 'Capitalization',
      mistake: 'i (lowercase)',
      correction: 'I (uppercase)',
      explanation: 'The personal pronoun "I" is always written in uppercase in English.'
    });
  }

  if (!/[.!?]$/.test(clean)) {
    errors.push({
      category: 'Punctuation',
      mistake: 'Missing final punctuation',
      correction: 'Add a period (.) or exclamation mark (!)',
      explanation: 'Complete sentences should conclude with terminal punctuation.'
    });
  }

  // 5. Common Typos
  const typoMap = {
    'definately': 'definitely',
    'seperate': 'separate',
    'untill': 'until',
    'goverment': 'government',
    'recieve': 'receive',
    'beleive': 'believe',
    'wich': 'which',
    'becuase': 'because',
    'alot': 'a lot',
    'tommorow': 'tomorrow',
    'truely': 'truly',
    'intresting': 'interesting'
  };

  Object.entries(typoMap).forEach(([typo, fix]) => {
    const typoRegex = new RegExp(`\\b${typo}\\b`, 'i');
    if (typoRegex.test(clean)) {
      errors.push({
        category: 'Spelling & Typo',
        mistake: typo,
        correction: fix,
        explanation: `The standard spelling is "${fix}".`
      });
    }
  });

  // British Vocabulary suggestions
  if (/\b(very tired|exhausted)\b/i.test(clean)) {
    tips.push('British Nuance: You can express extreme tiredness with authentic British expressions like "absolutely knackered" or "shattered".');
  }
  if (/\b(very happy|excited)\b/i.test(clean)) {
    tips.push('British Nuance: In the UK, being delighted or proud is commonly described as being "proper chuffed" or "thrilled to bits".');
  }
  if (wordCount >= 25) {
    tips.push('Great fluency! Your entry has solid length and detailed personal storytelling.');
  }

  // Polish Text Generator
  let polished = clean;
  polished = polished.charAt(0).toUpperCase() + polished.slice(1);
  polished = polished.replace(/\bi\b/g, 'I');
  Object.entries(typoMap).forEach(([typo, fix]) => {
    polished = polished.replace(new RegExp(`\\b${typo}\\b`, 'gi'), fix);
  });
  polished = polished.replace(/\b(she|he|it)\s+(don't|dont)\b/gi, '$1 doesn\'t');
  polished = polished.replace(/\bI\s+am\s+agree\b/gi, 'I agree');
  polished = polished.replace(/\bmarried\s+with\b/gi, 'married to');
  polished = polished.replace(/\bdespite\s+of\b/gi, 'despite');
  if (!/[.!?]$/.test(polished)) polished += '.';

  const score = Math.max(20, Math.min(100, 100 - (errors.length * 15)));

  return {
    isValid: errors.length === 0,
    score,
    wordCount,
    errors,
    polishedText: polished,
    tips
  };
}

// ============================================================================
// ACCENT, PACING & PRONUNCIATION ANALYSIS ENGINE (FOR AUDIO)
// ============================================================================
export function analyzeSpokenRecording(transcript, durationSeconds) {
  const clean = deduplicateWords(transcript || '');
  const words = clean.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Words Per Minute (WPM)
  const durationMinutes = Math.max(0.1, durationSeconds / 60);
  const wpm = Math.round(wordCount / durationMinutes);

  let pacingFeedback = '';
  let pacingBadge = '';
  if (wpm < 90) {
    pacingFeedback = 'Deliberate and thoughtful pace. As your confidence grows, try linking words together for smoother British flow.';
    pacingBadge = 'Slow & Measured';
  } else if (wpm <= 150) {
    pacingFeedback = 'Ideal natural conversational speed! Your words are delivered at a comfortable, authentic British English pace.';
    pacingBadge = 'Natural Conversational Pace 🎯';
  } else {
    pacingFeedback = 'Fast tempo. Remember that British speech often employs short micro-pauses at commas and conjunctions to enhance clarity.';
    pacingBadge = 'Fast Tempo';
  }

  // Pronunciation & Accent Highlights
  const accentTips = [];
  if (/\b(water|better|city|matter|party|bottle)\b/i.test(clean)) {
    accentTips.push('T-Sound Clarity: In modern standard British English (SSB / RP), pronounce the "t" sound clearly with the tip of your tongue against your alveolar ridge (avoid the American flap "d").');
  }
  if (/\b(car|park|hard|start|father|after)\b/i.test(clean)) {
    accentTips.push('Broad British Vowels: In British English, words like "park", "car", and "hard" use a deep, resonant long /ɑː/ vowel sound from the back of the mouth.');
  }
  if (/\b(hard|work|car|more|floor|door|water)\b/i.test(clean)) {
    accentTips.push('Non-Rhoticity: British English is generally non-rhotic. The letter "r" is silent after vowels unless immediately followed by another vowel sound (e.g. "car" sounds like "cah").');
  }
  if (accentTips.length === 0) {
    accentTips.push('Intonation & Rhythm: Try practicing British cadence — lowering your pitch slightly at the conclusion of affirmative statements and elevating it gently for polite questions.');
  }

  // Grammatical Audit of Spoken Words
  const grammarAudit = analyzeDailyWriting(clean);

  return {
    transcript: clean,
    wordCount,
    durationSeconds: Math.round(durationSeconds),
    wpm,
    pacingFeedback,
    pacingBadge,
    accentTips,
    grammarErrors: grammarAudit.errors,
    polishedTranscript: grammarAudit.polishedText,
    fluencyScore: Math.min(100, Math.max(30, 100 - (grammarAudit.errors.length * 12) + (wpm >= 100 && wpm <= 150 ? 10 : 0)))
  };
}

// Clean duplicate repeated words created by speech recognition glitches
export function deduplicateWords(str) {
  if (!str) return '';
  const cleaned = str.replace(/\s+/g, ' ').trim();
  // Remove immediate duplicate adjacent identical words (e.g. "today today I went went" -> "today I went")
  return cleaned.replace(/\b(\w+)(?:\s+\1\b)+/gi, '$1');
}

// ============================================================================
// UI RENDERING & CONTROLLER (100% ENGLISH)
// ============================================================================
export function initDailyWritingUI() {
  const container = document.getElementById('view-daily-writing');
  if (!container) return;

  renderDailyWritingLayout(container);
  bindDailyWritingEvents(container);
}

function renderDailyWritingLayout(container) {
  const streak = getDailyStreak();
  const entries = getDailyWritingEntries();
  const totalWritings = entries.filter(e => e.type === 'text').length;
  const totalAudios = entries.filter(e => e.type === 'audio').length;

  container.innerHTML = `
    <!-- Top Hero Header -->
    <div class="card daily-writing-hero" style="background: linear-gradient(135deg, rgba(0,36,125,0.08), rgba(212,175,55,0.14)); border: 1px solid var(--border-color); border-radius: 16px; padding: 1.6rem 2rem; margin-bottom: 1.5rem; position: relative; overflow: hidden;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.2rem;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(0,36,125,0.1); color: var(--uk-blue); font-weight: 700; font-size: 0.8rem; padding: 0.3rem 0.8rem; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
            <i class="fa-solid fa-feather"></i> Daily Expression & Audio Lab
          </div>
          <h1 style="margin: 0 0 0.4rem 0; font-size: 2rem; font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 0.6rem;">
            Daily Writing & Speaking ✍️🎙️
          </h1>
          <p style="margin: 0; color: var(--text-muted); font-size: 0.95rem; max-width: 680px; line-height: 1.5;">
            Write freely about your day or record your voice. Receive immediate grammatical corrections with in-depth explanations, speech cadence analysis, and British accent guidance.
          </p>
        </div>

        <!-- Badges Bar -->
        <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
          <div style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 0.7rem 1.1rem; text-align: center; min-width: 95px; box-shadow: var(--card-shadow);">
            <div style="font-size: 1.3rem; font-weight: 800; color: #EF4444;" id="ui-dw-streak">
              🔥 ${streak} <span style="font-size: 0.75rem; font-weight: 600;">Days</span>
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Streak</div>
          </div>
          <div style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 0.7rem 1.1rem; text-align: center; min-width: 95px; box-shadow: var(--card-shadow);">
            <div style="font-size: 1.3rem; font-weight: 800; color: var(--uk-blue);">
              ✍️ ${totalWritings}
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Writings</div>
          </div>
          <div style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 0.7rem 1.1rem; text-align: center; min-width: 95px; box-shadow: var(--card-shadow);">
            <div style="font-size: 1.3rem; font-weight: 800; color: #10B981;">
              🎙️ ${totalAudios}
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Recordings</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mode Selector Navigation Bar (Ergonomic Segmented Control) -->
    <div style="margin-bottom: 1.5rem;">
      <div class="dw-subtab-container" id="dw-main-tabs" role="tablist" aria-label="Writing and Speaking Modes">
        <button type="button" class="dw-tab-btn ${activeMode === 'write' ? 'active' : ''}" data-mode="write" role="tab" aria-selected="${activeMode === 'write'}" id="dw-tab-write" title="Daily Free Writing (Press 1 or Left Arrow)">
          <i class="fa-solid fa-pen-nib"></i>
          <span class="dw-tab-text-full">Daily Free Writing</span>
          <span class="dw-tab-text-short">Free Writing</span>
        </button>

        <button type="button" class="dw-tab-btn ${activeMode === 'record' ? 'active' : ''}" data-mode="record" role="tab" aria-selected="${activeMode === 'record'}" id="dw-tab-record" title="Voice Recording & Accent Lab (Press 2)">
          <i class="fa-solid fa-microphone-lines"></i>
          <span class="dw-tab-text-full">Voice & Accent Lab</span>
          <span class="dw-tab-text-short">Voice Lab</span>
        </button>

        <button type="button" class="dw-tab-btn ${activeMode === 'archive' ? 'active' : ''}" data-mode="archive" role="tab" aria-selected="${activeMode === 'archive'}" id="dw-tab-archive" title="Past Entries & Archive (Press 3 or Right Arrow)">
          <i class="fa-solid fa-clock-rotate-left"></i>
          <span class="dw-tab-text-full">Past Entries & Archive</span>
          <span class="dw-tab-text-short">Past Entries</span>
        </button>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: var(--text-muted); padding: 0 0.4rem; flex-wrap: wrap;">
        <span style="display: flex; align-items: center; gap: 0.35rem;">
          <i class="fa-solid fa-arrows-left-right" style="color: var(--uk-blue); font-size: 0.75rem;"></i>
          <span>Switch tabs seamlessly or swipe left/right</span>
        </span>
        <span style="display: flex; align-items: center; gap: 0.35rem;">
          <i class="fa-solid fa-shield-check" style="color: #10B981;"></i> Synced to Local Storage & Database
        </span>
      </div>
    </div>

    <!-- SUBVIEW CONTENT CONTAINER -->
    <div id="dw-subview-content" class="dw-subview-enter">
      <!-- Loaded dynamically via renderActiveModeView() -->
    </div>
  `;

  renderActiveModeView();
}

const MODES_LIST = ['write', 'record', 'archive'];

export function switchDailyWritingSubtab(mode) {
  if (!mode || mode === activeMode) return;
  activeMode = mode;

  // 1. Instantly update active states on the segmented pill buttons
  const tabBtns = document.querySelectorAll('#dw-main-tabs .dw-tab-btn');
  tabBtns.forEach(btn => {
    const isTarget = btn.getAttribute('data-mode') === mode;
    btn.classList.toggle('active', isTarget);
    btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  // 2. Smoothly update only the content area without full DOM destruction
  const contentContainer = document.getElementById('dw-subview-content');
  if (contentContainer) {
    contentContainer.classList.remove('dw-subview-enter');
    void contentContainer.offsetWidth; // force reflow for smooth animation replay
    renderActiveModeView();
    contentContainer.classList.add('dw-subview-enter');
  } else {
    renderActiveModeView();
  }
}

function renderActiveModeView() {
  const container = document.getElementById('dw-subview-content');
  if (!container) return;

  if (activeMode === 'write') {
    renderFreeWritingView(container);
  } else if (activeMode === 'record') {
    renderVoiceRecordingView(container);
  } else if (activeMode === 'archive') {
    renderArchiveView(container);
  }
}

// ============================================================================
// 1. FREE WRITING VIEW
// ============================================================================
function renderFreeWritingView(container) {
  container.innerHTML = `
    <div class="card" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 16px; padding: 1.8rem; box-shadow: var(--card-shadow); margin-bottom: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.8rem;">
        <div>
          <h2 style="margin: 0 0 0.3rem 0; font-size: 1.3rem; font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-pen-nib" style="color: var(--uk-blue);"></i> Daily Free Journaling
          </h2>
          <p style="margin: 0; font-size: 0.88rem; color: var(--text-muted);">
            Write naturally about your day, activities, thoughts, or feelings. Don't worry about making mistakes — we'll point them out and explain why!
          </p>
        </div>

        <!-- Quick Inspiration Ideas -->
        <button type="button" id="btn-inspiration-prompt" class="dw-btn-gold">
          <i class="fa-solid fa-lightbulb" style="color: var(--gold);"></i> <span>Need an idea?</span>
        </button>
      </div>

      <div id="inspiration-box" style="display: none; background: rgba(212,175,55,0.08); border: 1px dashed var(--gold); border-radius: 10px; padding: 0.8rem 1.1rem; margin-bottom: 1.2rem; font-size: 0.88rem; color: var(--text-main);">
        <!-- Populated on click -->
      </div>

      <!-- Writing Box -->
      <div style="margin-bottom: 1rem;">
        <label for="dw-textarea" style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">
          <span>Type your English journal here:</span>
          <span id="dw-char-counter" style="color: var(--text-muted); font-weight: 500;">0 words • 0 characters</span>
        </label>
        <textarea id="dw-textarea" rows="6" placeholder="Today was quite productive. This morning I woke up early and made a fresh cup of tea..." style="
          width: 100%;
          box-sizing: border-box;
          padding: 1.1rem 1.3rem;
          font-family: inherit;
          font-size: 1.05rem;
          line-height: 1.6;
          border-radius: 12px;
          border: 2px solid var(--border-color);
          background: var(--input-bg);
          color: var(--text-main);
          outline: none;
          resize: vertical;
          transition: border-color 0.2s ease;
        "></textarea>
      </div>

      <!-- Actions Toolbar (Check, Copy, Share, Clear) -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem;">
        <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
          <button type="button" id="btn-analyze-text" class="dw-btn-primary">
            <i class="fa-solid fa-magnifying-glass-check"></i> <span>Check & Explain Mistakes</span>
          </button>

          <button type="button" id="btn-copy-writing" class="dw-btn-tool dw-btn-copy" title="Copy written journal text">
            <i class="fa-regular fa-copy"></i> <span>Copy</span>
          </button>

          <button type="button" id="btn-share-writing" class="dw-btn-tool dw-btn-share" title="Share journal text">
            <i class="fa-solid fa-share-nodes"></i> <span>Share</span>
          </button>

          <button type="button" id="btn-clear-text" class="dw-btn-secondary" title="Clear journal text">
            <i class="fa-solid fa-eraser"></i> <span>Clear</span>
          </button>
        </div>

        <div style="font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.4rem;">
          <i class="fa-solid fa-shield-halved" style="color: #10B981;"></i> Automatic Grammar, Spelling & Syntax Diagnosis
        </div>
      </div>

      <!-- Feedback Area -->
      <div id="dw-feedback-area" style="margin-top: 1.8rem; display: none;"></div>
    </div>

    <!-- Quick Navigation Bottom Footer -->
    <div class="dw-subview-nav-footer">
      <span class="dw-subview-nav-hint">
        <i class="fa-solid fa-microphone-lines" style="color: #C8102E;"></i> Want to practice speaking and accent cadence?
      </span>
      <button type="button" class="dw-btn-nav-switch" data-switch-to="record" title="Switch to Voice Recording & Accent Lab">
        <span>Go to Voice Recording Lab 🎙️</span> <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  `;

  bindFreeWritingEvents(container);
}

function bindFreeWritingEvents(container) {
  const textarea = document.getElementById('dw-textarea');
  const counter = document.getElementById('dw-char-counter');
  const inspirationBtn = document.getElementById('btn-inspiration-prompt');
  const inspirationBox = document.getElementById('inspiration-box');
  const checkBtn = document.getElementById('btn-analyze-text');
  const clearBtn = document.getElementById('btn-clear-text');
  const feedbackArea = document.getElementById('dw-feedback-area');

  const inspirationPrompts = [
    "What was the most surprising or unexpected thing that happened today?",
    "Describe your morning routine today: did you wake up on time? What was for breakfast?",
    "Write about a conversation you had today with a friend, coworker, or family member.",
    "Did you face any obstacles or stressful moments today, and how did you resolve them?",
    "What are three things you felt grateful for throughout the day?",
    "What are your main goals and plans for tomorrow?"
  ];

  if (inspirationBtn && inspirationBox) {
    inspirationBtn.addEventListener('click', () => {
      const prompt = inspirationPrompts[Math.floor(Math.random() * inspirationPrompts.length)];
      inspirationBox.style.display = 'block';
      inspirationBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div><strong>💡 Daily Prompt:</strong> ${prompt}</div>
          <button type="button" onclick="this.closest('#inspiration-box').style.display='none'" class="icon-btn" style="width: 24px; height: 24px;">&times;</button>
        </div>
      `;
    });
  }

  if (textarea && counter) {
    textarea.addEventListener('input', () => {
      const text = textarea.value.trim();
      const words = text ? text.split(/\s+/).filter(Boolean) : [];
      counter.innerText = `${words.length} words • ${textarea.value.length} characters`;
    });
  }

  if (clearBtn && textarea) {
    clearBtn.addEventListener('click', () => {
      textarea.value = '';
      textarea.dispatchEvent(new Event('input'));
      if (feedbackArea) feedbackArea.style.display = 'none';
    });
  }

  // Copy & Share written journal text
  const copyWritingBtn = document.getElementById('btn-copy-writing');
  if (copyWritingBtn && textarea) {
    copyWritingBtn.addEventListener('click', () => {
      const text = textarea.value.trim();
      if (!text) {
        showCopyShareToast('Please write something first to copy!', 'fa-circle-exclamation');
        return;
      }
      copyTextToClipboard(text, 'Journal text copied to clipboard! 📋');
    });
  }

  const shareWritingBtn = document.getElementById('btn-share-writing');
  if (shareWritingBtn && textarea) {
    shareWritingBtn.addEventListener('click', () => {
      const text = textarea.value.trim();
      if (!text) {
        showCopyShareToast('Please write something first to share!', 'fa-circle-exclamation');
        return;
      }
      shareTextContent('My Daily English Journal', text);
    });
  }

  if (checkBtn && textarea) {
    checkBtn.addEventListener('click', async () => {
      const text = textarea.value.trim();
      if (!text) {
        showCopyShareToast('Please write a sentence about your day first.', 'fa-circle-exclamation');
        return;
      }

      const origHtml = checkBtn.innerHTML;
      checkBtn.disabled = true;
      checkBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing with AI...';

      try {
        const feedback = await auditWritingSubmission(text, {});
        const analysis = {
          isValid: feedback.isValid,
          score: feedback.score,
          wordCount: text.split(/\s+/).filter(Boolean).length,
          errors: feedback.errors || [],
          recurringPatterns: feedback.recurringPatterns || [],
          polishedText: feedback.polishedText,
          tips: feedback.strengths || []
        };

        if (feedbackArea) {
          feedbackArea.style.display = 'block';
          feedbackArea.innerHTML = renderTextFeedbackCard(analysis, text);
          feedbackArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          // Bind Copy & Share for Feedback Card
          const copyWritingFb = document.getElementById('btn-copy-writing-fb');
          if (copyWritingFb) {
            copyWritingFb.addEventListener('click', () => {
              copyTextToClipboard(text, 'Journal text copied to clipboard! 📋');
            });
          }
          const shareWritingFb = document.getElementById('btn-share-writing-fb');
          if (shareWritingFb) {
            shareWritingFb.addEventListener('click', () => {
              const errsText = analysis.errors && analysis.errors.length > 0 
                ? `\nIdentified Mistakes: ${analysis.errors.length}\n` + analysis.errors.map((e, i) => `${i+1}. ${e.category} - ${e.rule}`).join('\n')
                : '\nFlawless British English journal entry!';
              const shareContent = `🇬🇧 British English Vault - Daily Journal\n\n"${text}"\nQuality Score: ${analysis.score}/100${errsText}`;
              shareTextContent('My British English Journal', shareContent);
            });
          }
        }

        // Save Entry to Database / LocalStorage
        saveDailyWritingEntry({
          type: 'text',
          rawText: text,
          polishedText: analysis.polishedText,
          wordCount: analysis.wordCount,
          score: analysis.score,
          errors: analysis.errors
        });

        // Update Header Streak and Stats
        const streakEl = document.getElementById('ui-dw-streak');
        if (streakEl) streakEl.innerHTML = `🔥 ${getDailyStreak()} <span style="font-size: 0.75rem; font-weight: 600;">Days</span>`;
      } catch (err) {
        console.error('Error during AI free writing check:', err);
      } finally {
        checkBtn.disabled = false;
        checkBtn.innerHTML = origHtml;
      }
    });
  }
}

function renderTextFeedbackCard(analysis, rawText) {
  const isPerfect = (!analysis.errors || analysis.errors.length === 0);

  return `
    <div style="background: var(--card-bg); border: 2px solid ${isPerfect ? '#10B981' : 'var(--gold)'}; border-radius: 16px; padding: 1.6rem; box-shadow: 0 10px 30px rgba(0,0,0,0.06); animation: fade-in 0.3s ease;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.8rem;">
        <div style="display: flex; align-items: center; gap: 0.8rem;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: ${isPerfect ? '#10B98120' : '#F59E0B20'}; color: ${isPerfect ? '#10B981' : '#F59E0B'}; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
            <i class="fa-solid ${isPerfect ? 'fa-circle-check' : 'fa-graduation-cap'}"></i>
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.2rem; font-weight: 800; color: var(--text-main);">
              ${isPerfect ? '🎉 Splendid Writing! Zero Errors Found' : '📝 Writing Analysis & Identified Mistakes'}
            </h3>
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              Writing Quality Score: <strong>${analysis.score}/100</strong> • Length: <strong>${analysis.wordCount} words</strong> • Saved to Database ✅
            </div>
          </div>
        </div>

        <button type="button" onclick="this.closest('#dw-feedback-area').style.display='none'" class="icon-btn" aria-label="Close">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Quick Action Toolbar (Copy & Share) -->
      <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap; margin-bottom: 1.2rem; background: var(--input-bg); padding: 0.6rem 0.9rem; border-radius: 12px; border: 1px solid var(--border-color);">
        <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
          Quick Actions:
        </span>
        <button type="button" class="dw-btn-tool dw-btn-copy" id="btn-copy-writing-fb" title="Copy my journal text">
          <i class="fa-regular fa-copy"></i> <span>Copy My Journal</span>
        </button>
        <button type="button" class="dw-btn-tool dw-btn-share" id="btn-share-writing-fb" title="Share journal text and feedback">
          <i class="fa-solid fa-share-nodes"></i> <span>Share Journal & Feedback</span>
        </button>
      </div>

      <!-- Your Submitted Journal Card (Active Self-Correction, No Spoon-fed Answer) -->
      <div style="margin-bottom: 1.5rem;">
        <div style="background: rgba(0,36,125,0.04); border: 1px solid var(--border-color); border-radius: 14px; padding: 1.2rem 1.4rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; flex-wrap: wrap; gap: 0.5rem;">
            <div style="font-size: 0.82rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; display: flex; align-items: center; gap: 0.4rem;">
              <i class="fa-solid fa-pen" style="color: var(--uk-blue);"></i> Your Original Journal Writing:
            </div>
            ${analysis.errors && analysis.errors.length > 0 ? `
              <button type="button" class="dw-btn-primary" style="font-size: 0.82rem; padding: 0.4rem 0.9rem;" onclick="const ta=document.getElementById('dw-textarea'); if(ta){ta.scrollIntoView({behavior:'smooth'}); ta.focus();}">
                <i class="fa-solid fa-pen-to-square"></i> <span>Edit & Fix It Yourself</span>
              </button>
            ` : ''}
          </div>
          <div style="font-size: 1.05rem; color: var(--text-main); line-height: 1.6; font-weight: 500; background: var(--card-bg); padding: 0.85rem 1.1rem; border-radius: 10px; border: 1px solid var(--border-color);">
            "${rawText}"
          </div>
          ${analysis.errors && analysis.errors.length > 0 ? `
            <div style="margin-top: 0.7rem; font-size: 0.85rem; color: var(--gold-dark); font-weight: 700; display: flex; align-items: center; gap: 0.4rem;">
              <i class="fa-solid fa-lightbulb"></i> Study the explanations and rules below, then edit your text above to fix it yourself — no ready-made answers!
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Recurring Pattern Alert (If user repeatedly makes the same mistake) -->
      ${analysis.recurringPatterns && analysis.recurringPatterns.length > 0 ? `
        <div class="pedagogy-pattern-alert">
          <div style="display: flex; align-items: center; gap: 0.5rem; color: #D97706; font-weight: 800; font-size: 0.95rem; margin-bottom: 0.5rem;">
            <i class="fa-solid fa-triangle-exclamation"></i> Recurring Error Pattern Detected!
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.6rem;">
            ${analysis.recurringPatterns.map(p => `
              <div style="font-size: 0.88rem; color: var(--text-main); line-height: 1.5;">
                You have repeatedly made mistakes in <strong>${p.category}</strong> (${p.previousCount} recorded occurrences).
                <div style="margin-top: 0.3rem;">
                  <strong>Core Rule:</strong> ${p.rule}
                </div>
                <div style="margin-top: 0.4rem; padding: 0.5rem 0.8rem; background: rgba(245,158,11,0.12); border-radius: 6px; font-size: 0.84rem; color: var(--text-main);">
                  🎯 <strong>Targeted Practice:</strong> ${p.targetedExercise}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Detailed Explanations of Mistakes (7 Pedagogical Fields) -->
      ${analysis.errors && analysis.errors.length > 0 ? `
        <div style="margin-bottom: 1.4rem;">
          <div style="font-size: 0.82rem; font-weight: 800; color: #EF4444; text-transform: uppercase; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.4rem;">
            <i class="fa-solid fa-list-check"></i> Explanations of Mistakes (${analysis.errors.length}):
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.9rem;">
            ${analysis.errors.map((err, idx) => `
              <div class="pedagogy-error-card ${err.classification === 'More natural' ? 'natural' : ''}">
                <div class="pedagogy-header-row">
                  <span class="pedagogy-mistake-title">
                    Mistake ${idx + 1} — ${err.category}
                  </span>
                  <span class="pedagogy-badge ${err.classification === 'More natural' ? 'natural' : 'incorrect'}">
                    ${err.classification || 'Incorrect'}
                  </span>
                </div>

                <!-- Issue Flagged in Text (No spoon-fed answer) -->
                <div class="pedagogy-diff-row" style="background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.2); padding: 0.6rem 0.9rem; border-radius: 8px;">
                  <span style="color: #EF4444; font-weight: 800; font-size: 0.92rem;">
                    ❌ Flagged in your journal: <code>${err.mistake}</code>
                  </span>
                </div>

                <!-- Explanation in simple English -->
                <div class="pedagogy-explanation">
                  <strong>Why it is an error:</strong> ${err.explanation || err.rule}
                </div>

                <!-- Short Grammar or Vocabulary Rule Box -->
                <div class="pedagogy-rule-box">
                  <i class="fa-solid fa-book-open"></i>
                  <span><strong>Rule:</strong> ${err.rule}</span>
                </div>

                <!-- More Examples showing correct usage -->
                ${err.examples && err.examples.length > 0 ? `
                  <div class="pedagogy-examples">
                    <div class="pedagogy-examples-title">
                      <i class="fa-solid fa-lightbulb"></i> More Examples:
                    </div>
                    <ul class="pedagogy-examples-list">
                      ${err.examples.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}

                <!-- Try Again / Your Turn -->
                <div class="pedagogy-your-turn">
                  <i class="fa-solid fa-pen-to-square" style="color: #10B981;"></i>
                  <div>
                    <strong>Your Turn:</strong> Apply this rule to edit your journal text above and try checking again!
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : `
        <!-- When Sentence is Correct -->
        <div style="background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.25); border-radius: 12px; padding: 1.2rem; margin-bottom: 1.2rem; text-align: center;">
          <div style="font-size: 1.8rem; margin-bottom: 0.3rem;">🎉</div>
          <h4 style="margin: 0 0 0.3rem 0; font-size: 1.1rem; color: #10B981; font-weight: 800;">
            Your writing is completely correct!
          </h4>
          <p style="margin: 0; font-size: 0.88rem; color: var(--text-main);">
            No grammatical, spelling, or prepositional errors detected. Excellent expression in British English.
          </p>
        </div>
      `}

      <!-- Writing Highlights / Tips -->
      ${analysis.tips && analysis.tips.length > 0 ? `
        <div style="background: rgba(0,36,125,0.04); border-radius: 10px; padding: 0.8rem 1rem; border: 1px dashed var(--border-color);">
          <div style="font-size: 0.78rem; font-weight: 700; color: var(--uk-blue); margin-bottom: 0.3rem;">
            <i class="fa-solid fa-lightbulb" style="color: var(--gold);"></i> British Vocabulary & Fluency Highlights:
          </div>
          <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-main); line-height: 1.4;">
            ${analysis.tips.map(t => `<li>${t}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `;
}

// ============================================================================
// 2. VOICE RECORDING & ACCENT LAB VIEW
// ============================================================================
function renderVoiceRecordingView(container) {
  container.innerHTML = `
    <div class="card" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 16px; padding: 1.8rem; box-shadow: var(--card-shadow); margin-bottom: 2rem;">
      <div style="margin-bottom: 1.2rem;">
        <h2 style="margin: 0 0 0.3rem 0; font-size: 1.3rem; font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-microphone-lines" style="color: #C8102E;"></i> Voice Recording & British Accent Lab
        </h2>
        <p style="margin: 0; font-size: 0.88rem; color: var(--text-muted);">
          Speak out loud about your day in English. Your audio is recorded so you can listen back to your real voice, and our engine will analyze your accent, speech tempo (WPM), and spoken grammar.
        </p>
      </div>

      <!-- Recording Workbench Centerpiece -->
      <div style="text-align: center; padding: 2rem 1.5rem; background: var(--input-bg); border-radius: 16px; border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
        
        <!-- Big Microphone Action Button -->
        <div style="margin-bottom: 1.2rem; position: relative; display: inline-block;">
          <button type="button" id="btn-toggle-recording" class="dw-mic-center-btn" title="Click to start/stop speaking">
            <i class="fa-solid fa-microphone" id="mic-icon"></i>
          </button>
        </div>

        <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.3rem;" id="recording-status-title">
          Tap Microphone to Start Speaking
        </div>
        <div style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.8rem;" id="recording-status-subtitle">
          Describe your day, experiences, or thoughts freely in English.
        </div>

        <!-- Recording Timer & Wave indicator -->
        <div id="recording-timer" style="display: none; font-size: 1.4rem; font-weight: 800; font-family: monospace; color: #C8102E; margin-bottom: 0.5rem;">
          🔴 00:00
        </div>
      </div>

      <!-- Real-Time Speech Recognition Live Box -->
      <div style="margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
          <label style="font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin: 0;">
            🎙️ Live Speech Transcription:
          </label>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <button type="button" id="btn-copy-transcript" class="dw-btn-tool dw-btn-copy" title="Copy spoken transcript">
              <i class="fa-regular fa-copy"></i> <span>Copy Transcript</span>
            </button>
            <button type="button" id="btn-share-transcript" class="dw-btn-tool dw-btn-share" title="Share transcript">
              <i class="fa-solid fa-share-nodes"></i> <span>Share</span>
            </button>
          </div>
        </div>
        <div id="voice-live-transcript-box" style="
          min-height: 90px;
          background: var(--card-bg);
          border: 2px dashed var(--border-color);
          border-radius: 12px;
          padding: 1rem 1.2rem;
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--text-main);
        ">
          <span style="color: var(--text-muted); font-style: italic;">Your spoken words will appear here in real-time as you speak...</span>
        </div>
      </div>

      <!-- Audio Player Container (for playback of user's voice) -->
      <div id="audio-playback-container" style="display: none; background: rgba(0,36,125,0.05); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.2rem; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
          <div style="font-size: 0.9rem; font-weight: 700; color: var(--uk-blue); display: flex; align-items: center; gap: 0.4rem;">
            <i class="fa-solid fa-headphones"></i> Listen Back to Your Real Voice Recording:
          </div>
          <span style="font-size: 0.78rem; font-weight: 600; color: #10B981;">Ready for Audio Playback ✅</span>
        </div>
        <audio id="user-voice-audio-player" controls style="width: 100%; height: 42px; outline: none;"></audio>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem;">
        <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
          <button type="button" id="btn-analyze-recording" class="dw-btn-primary" disabled>
            <i class="fa-solid fa-chart-line"></i> <span>Analyze Accent, Pronunciation & Grammar</span>
          </button>

          <button type="button" id="btn-reset-recording" class="dw-btn-secondary">
            <i class="fa-solid fa-rotate-left"></i> <span>Reset Recording</span>
          </button>
        </div>
      </div>

      <!-- Voice Analysis Result Card -->
      <div id="voice-analysis-result-area" style="margin-top: 1.8rem; display: none;"></div>
    </div>

    <!-- Quick Navigation Bottom Footer -->
    <div class="dw-subview-nav-footer dw-subview-nav-split">
      <button type="button" class="dw-btn-nav-switch dw-btn-nav-secondary" data-switch-to="write" title="Back to Daily Free Writing">
        <i class="fa-solid fa-arrow-left"></i> <span>Daily Free Writing ✍️</span>
      </button>
      <button type="button" class="dw-btn-nav-switch" data-switch-to="archive" title="View Past Entries & Archive">
        <span>Past Entries & Archive 📜</span> <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  `;

  bindVoiceRecordingEvents(container);
}

function bindVoiceRecordingEvents(container) {
  const toggleBtn = document.getElementById('btn-toggle-recording');
  const micIcon = document.getElementById('mic-icon');
  const titleEl = document.getElementById('recording-status-title');
  const subtitleEl = document.getElementById('recording-status-subtitle');
  const timerEl = document.getElementById('recording-timer');
  const transcriptBox = document.getElementById('voice-live-transcript-box');
  const analyzeBtn = document.getElementById('btn-analyze-recording');
  const resetBtn = document.getElementById('btn-reset-recording');
  const audioContainer = document.getElementById('audio-playback-container');
  const audioPlayer = document.getElementById('user-voice-audio-player');
  const resultArea = document.getElementById('voice-analysis-result-area');
  const copyTranscriptBtn = document.getElementById('btn-copy-transcript');
  const shareTranscriptBtn = document.getElementById('btn-share-transcript');

  let accumulatedFinalText = '';
  let recordedSeconds = 0;

  // Copy & Share for live spoken transcript
  if (copyTranscriptBtn) {
    copyTranscriptBtn.addEventListener('click', () => {
      const text = (currentVoiceTranscript || accumulatedFinalText || '').trim();
      if (!text) {
        showCopyShareToast('Speak into the microphone first to copy!', 'fa-circle-exclamation');
        return;
      }
      copyTextToClipboard(text, 'Spoken transcript copied to clipboard! 📋');
    });
  }

  if (shareTranscriptBtn) {
    shareTranscriptBtn.addEventListener('click', () => {
      const text = (currentVoiceTranscript || accumulatedFinalText || '').trim();
      if (!text) {
        showCopyShareToast('Speak into the microphone first to share!', 'fa-circle-exclamation');
        return;
      }
      shareTextContent('My English Spoken Transcript', text);
    });
  }

  toggleBtn.addEventListener('click', async () => {
    if (!isRecordingActive) {
      // START RECORDING
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        currentRecordingStream = stream;
        currentMediaRecorder = new MediaRecorder(stream);
        currentAudioChunks = [];

        currentMediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) currentAudioChunks.push(e.data);
        };

        currentMediaRecorder.onstop = () => {
          recordedAudioBlob = new Blob(currentAudioChunks, { type: 'audio/webm' });
          if (recordedAudioUrl) URL.revokeObjectURL(recordedAudioUrl);
          recordedAudioUrl = URL.createObjectURL(recordedAudioBlob);
          if (audioPlayer) {
            audioPlayer.src = recordedAudioUrl;
            audioContainer.style.display = 'block';
          }
          if (analyzeBtn) analyzeBtn.disabled = false;
        };

        currentMediaRecorder.start();

        // Speech Recognition Setup (Deduplication enabled!)
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
          activeSpeechRecognition = new SpeechRecognition();
          activeSpeechRecognition.continuous = true;
          activeSpeechRecognition.interimResults = true;
          activeSpeechRecognition.lang = 'en-GB';

          accumulatedFinalText = '';

          activeSpeechRecognition.onresult = (event) => {
            let currentInterim = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              const segment = event.results[i][0].transcript;
              if (event.results[i].isFinal) {
                accumulatedFinalText += segment + ' ';
              } else {
                currentInterim += segment;
              }
            }

            // Deduplicate repeat words
            const cleanFinal = deduplicateWords(accumulatedFinalText);
            currentVoiceTranscript = cleanFinal;

            if (transcriptBox) {
              transcriptBox.innerHTML = `
                <span>${cleanFinal}</span>
                <span style="color: var(--text-muted); font-style: italic;"> ${currentInterim}</span>
              `;
            }
          };

          activeSpeechRecognition.onerror = (e) => {
            console.warn('Speech recognition error:', e.error);
          };

          activeSpeechRecognition.start();
        } else {
          transcriptBox.innerHTML = `<span style="color: #EF4444;">Speech Recognition is not supported on this browser. Voice recording will still work!</span>`;
        }

        // UI State Updates
        isRecordingActive = true;
        recordingStartTime = Date.now();
        toggleBtn.classList.add('recording');
        toggleBtn.style.background = '#10B981';
        toggleBtn.style.borderColor = '#10B981';
        micIcon.className = 'fa-solid fa-stop';
        titleEl.innerText = 'Listening & Recording... (Speak in English)';
        subtitleEl.innerText = 'Click the button again when you finish speaking.';
        timerEl.style.display = 'block';

        recordingTimerInterval = setInterval(() => {
          recordedSeconds = (Date.now() - recordingStartTime) / 1000;
          const mins = Math.floor(recordedSeconds / 60).toString().padStart(2, '0');
          const secs = Math.floor(recordedSeconds % 60).toString().padStart(2, '0');
          timerEl.innerText = `🔴 ${mins}:${secs}`;
        }, 500);

      } catch (err) {
        showCopyShareToast('Microphone access denied. Please allow permissions in browser.', 'fa-triangle-exclamation');
      }
    } else {
      // STOP RECORDING
      isRecordingActive = false;
      clearInterval(recordingTimerInterval);

      if (currentMediaRecorder && currentMediaRecorder.state !== 'inactive') {
        currentMediaRecorder.stop();
      }
      if (currentRecordingStream) {
        currentRecordingStream.getTracks().forEach(t => t.stop());
      }
      if (activeSpeechRecognition) {
        try { activeSpeechRecognition.stop(); } catch (e) {}
      }

      toggleBtn.classList.remove('recording');
      toggleBtn.style.background = '';
      toggleBtn.style.borderColor = '';
      micIcon.className = 'fa-solid fa-microphone';
      titleEl.innerText = 'Recording Finished!';
      subtitleEl.innerText = 'You can listen back to your recording below, or run the Accent Analysis.';
    }
  });

  // Reset button
  resetBtn.addEventListener('click', () => {
    isRecordingActive = false;
    clearInterval(recordingTimerInterval);
    if (currentRecordingStream) {
      currentRecordingStream.getTracks().forEach(t => t.stop());
    }
    if (activeSpeechRecognition) {
      try { activeSpeechRecognition.stop(); } catch (e) {}
    }

    recordedAudioBlob = null;
    currentVoiceTranscript = '';
    transcriptBox.innerHTML = `<span style="color: var(--text-muted); font-style: italic;">Your spoken words will appear here in real-time as you speak...</span>`;
    audioContainer.style.display = 'none';
    timerEl.style.display = 'none';
    analyzeBtn.disabled = true;
    if (resultArea) resultArea.style.display = 'none';
    titleEl.innerText = 'Tap Microphone to Start Speaking';
    subtitleEl.innerText = 'Describe your day, experiences, or thoughts freely in English.';
    toggleBtn.classList.remove('recording');
    toggleBtn.style.background = '';
    toggleBtn.style.borderColor = '';
    micIcon.className = 'fa-solid fa-microphone';
  });

  // Analyze Recording Button
  analyzeBtn.addEventListener('click', async () => {
    const finalTranscript = deduplicateWords(currentVoiceTranscript || '');
    if (!finalTranscript && !recordedAudioBlob) {
      showCopyShareToast('No speech detected. Please speak a sentence first.', 'fa-circle-exclamation');
      return;
    }

    const duration = recordedSeconds || 5;
    const analysis = analyzeSpokenRecording(finalTranscript || 'Speech recorded without text transcript', duration);

    if (resultArea) {
      resultArea.style.display = 'block';
      resultArea.innerHTML = renderVoiceAnalysisCard(analysis);
      resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Bind Copy & Share for Voice Analysis
      const copyVoiceBtn = document.getElementById('btn-copy-voice-analysis');
      if (copyVoiceBtn) {
        copyVoiceBtn.addEventListener('click', () => {
          const report = `🎙️ British Accent & Spoken English Report\n\nTranscript: "${analysis.transcript}"\nFluency Score: ${analysis.fluencyScore}/100\nPacing: ${analysis.wpm} WPM (${analysis.pacingBadge})\n\nPolished Version: "${analysis.polishedTranscript || analysis.transcript}"`;
          copyTextToClipboard(report, 'Voice report copied to clipboard! 📋');
        });
      }
      const shareVoiceBtn = document.getElementById('btn-share-voice-analysis');
      if (shareVoiceBtn) {
        shareVoiceBtn.addEventListener('click', () => {
          const shareContent = `🎙️ British Accent & Spoken English Report\n\nTranscript: "${analysis.transcript}"\n⚡ Pace: ${analysis.wpm} WPM (${analysis.pacingBadge})\nFluency: ${analysis.fluencyScore}/100\n\n✨ Polished: "${analysis.polishedTranscript || analysis.transcript}"`;
          shareTextContent('My British Accent & Spoken English Report', shareContent);
        });
      }
    }

    // Save Recording Entry with Audio Blob to IndexedDB & metadata to localStorage
    const entryId = 'dw_rec_' + Date.now();
    if (recordedAudioBlob) {
      await saveAudioBlobToDB(entryId, recordedAudioBlob);
    }

    saveDailyWritingEntry({
      id: entryId,
      type: 'audio',
      rawText: analysis.transcript,
      polishedText: analysis.polishedTranscript,
      durationSeconds: analysis.durationSeconds,
      wpm: analysis.wpm,
      score: analysis.fluencyScore,
      errors: analysis.grammarErrors,
      hasAudio: !!recordedAudioBlob
    });

    const streakEl = document.getElementById('ui-dw-streak');
    if (streakEl) streakEl.innerHTML = `🔥 ${getDailyStreak()} <span style="font-size: 0.75rem; font-weight: 600;">Days</span>`;
  });
}

function renderVoiceAnalysisCard(analysis) {
  return `
    <div style="background: var(--card-bg); border: 2px solid var(--uk-blue); border-radius: 16px; padding: 1.6rem; box-shadow: 0 10px 30px rgba(0,0,0,0.06); animation: fade-in 0.3s ease;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.8rem;">
        <div style="display: flex; align-items: center; gap: 0.8rem;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(0,36,125,0.1); color: var(--uk-blue); display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
            <i class="fa-solid fa-chart-simple"></i>
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.2rem; font-weight: 800; color: var(--text-main);">
              🎙️ Accent, Pronunciation & Spoken Grammar Audit
            </h3>
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              Fluency Score: <strong>${analysis.fluencyScore}/100</strong> • Speaking Pace: <strong>${analysis.wpm} WPM</strong> (${analysis.pacingBadge})
            </div>
          </div>
        </div>

        <button type="button" onclick="this.closest('#voice-analysis-result-area').style.display='none'" class="icon-btn" aria-label="Close">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Quick Action Toolbar (Copy & Share) -->
      <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap; margin-bottom: 1.2rem; background: var(--input-bg); padding: 0.6rem 0.9rem; border-radius: 12px; border: 1px solid var(--border-color);">
        <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
          Quick Actions:
        </span>
        <button type="button" class="dw-btn-tool dw-btn-copy" id="btn-copy-voice-analysis">
          <i class="fa-solid fa-copy"></i> <span>Copy Spoken Report</span>
        </button>
        <button type="button" class="dw-btn-tool dw-btn-share" id="btn-share-voice-analysis">
          <i class="fa-solid fa-share-nodes"></i> <span>Share Speech Analysis</span>
        </button>
      </div>
      <!-- Spoken Transcript Box -->
      <div style="background: var(--input-bg); border-radius: 12px; padding: 1rem 1.2rem; margin-bottom: 1.2rem;">
        <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.3rem;">
          Clean Spoken Transcript:
        </div>
        <div style="font-size: 1.05rem; color: var(--text-main); line-height: 1.5; font-style: italic;">
          "${analysis.transcript}"
        </div>
      </div>

      <!-- Speech Pacing Feedback -->
      <div style="background: rgba(16,185,129,0.06); border-left: 4px solid #10B981; border-radius: 0 10px 10px 0; padding: 0.8rem 1rem; margin-bottom: 1.2rem;">
        <div style="font-size: 0.82rem; font-weight: 700; color: #10B981; margin-bottom: 0.2rem;">
          ⚡ Speaking Pace Analysis (${analysis.wpm} Words Per Minute):
        </div>
        <div style="font-size: 0.88rem; color: var(--text-main); line-height: 1.4;">
          ${analysis.pacingFeedback}
        </div>
      </div>

      <!-- British Accent & Pronunciation Tips -->
      <div style="background: rgba(212,175,55,0.08); border-left: 4px solid var(--gold); border-radius: 0 10px 10px 0; padding: 0.8rem 1rem; margin-bottom: 1.2rem;">
        <div style="font-size: 0.82rem; font-weight: 700; color: var(--gold-dark, #A6801C); margin-bottom: 0.4rem;">
          🇬🇧 British Accent & Pronunciation Guidance:
        </div>
        <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-main); line-height: 1.4;">
          ${analysis.accentTips.map(tip => `<li>${tip}</li>`).join('')}
        </ul>
      </div>

      <!-- Spoken Grammar Mistakes (if any) -->
      ${analysis.grammarErrors.length > 0 ? `
        <div>
          <div style="font-size: 0.82rem; font-weight: 700; color: #EF4444; text-transform: uppercase; margin-bottom: 0.5rem;">
            ⚠️ Spoken Grammar Mistakes Detected (${analysis.grammarErrors.length}):
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.6rem;">
            ${analysis.grammarErrors.map(err => `
              <div style="background: var(--input-bg); border-left: 3px solid #EF4444; border-radius: 0 8px 8px 0; padding: 0.7rem 0.9rem;">
                <div style="font-size: 0.88rem; font-weight: 700; color: #EF4444; margin-bottom: 0.2rem;">
                  ❌ Flagged in speech: "${err.mistake}"
                </div>
                <div style="font-size: 0.82rem; color: var(--text-main); margin-bottom: 0.2rem;"><strong>Rule & Explanation:</strong> ${err.explanation}</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : `
        <div style="color: #10B981; font-size: 0.9rem; font-weight: 700;">
          ✨ No spoken grammar errors detected! Your sentence structure was natural and coherent.
        </div>
      `}
    </div>
  `;
}

// ============================================================================
// 3. ARCHIVE VIEW WITH DATE & MEDIA FILTERING
// ============================================================================
function renderArchiveView(container) {
  const entries = getDailyWritingEntries();

  container.innerHTML = `
    <div class="card" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 16px; padding: 1.8rem; box-shadow: var(--card-shadow);">
      <!-- Filter Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1.2rem; margin-bottom: 1.5rem;">
        <div>
          <h2 style="margin: 0 0 0.3rem 0; font-size: 1.3rem; font-weight: 800; color: var(--text-main);">
            📜 Past Entries & Audio Recordings Archive
          </h2>
          <p style="margin: 0; font-size: 0.88rem; color: var(--text-muted);">
            Filter by date, listen to past recordings, and review grammar corrections.
          </p>
        </div>

        <!-- Filter Controls -->
        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap; align-items: center;">
          
          <!-- Date Filter Selector -->
          <div style="display: flex; align-items: center; gap: 0.4rem; background: var(--input-bg); padding: 0.35rem 0.7rem; border-radius: 10px; border: 1px solid var(--border-color);">
            <i class="fa-solid fa-calendar-day" style="color: var(--gold-dark); font-size: 0.85rem;"></i>
            <select id="archive-date-preset" style="border: none; background: transparent; font-size: 0.85rem; font-weight: 600; color: var(--text-main); outline: none; cursor: pointer;">
              <option value="all" ${filterDatePreset === 'all' ? 'selected' : ''}>All Dates</option>
              <option value="today" ${filterDatePreset === 'today' ? 'selected' : ''}>Today</option>
              <option value="yesterday" ${filterDatePreset === 'yesterday' ? 'selected' : ''}>Yesterday</option>
              <option value="7days" ${filterDatePreset === '7days' ? 'selected' : ''}>Last 7 Days</option>
              <option value="30days" ${filterDatePreset === '30days' ? 'selected' : ''}>Last 30 Days</option>
            </select>
          </div>

          <!-- Specific Date Picker Input -->
          <input type="date" id="archive-date-picker" title="Filter by specific date" style="
            padding: 0.35rem 0.6rem;
            border-radius: 10px;
            border: 1px solid var(--border-color);
            background: var(--input-bg);
            color: var(--text-main);
            font-size: 0.85rem;
            outline: none;
          ">

          <!-- Type Selector: All / Writings / Audio Recordings -->
          <div style="display: flex; align-items: center; gap: 0.4rem; background: var(--input-bg); padding: 0.35rem 0.7rem; border-radius: 10px; border: 1px solid var(--border-color);">
            <i class="fa-solid fa-filter" style="color: var(--uk-blue); font-size: 0.85rem;"></i>
            <select id="archive-type-filter" style="border: none; background: transparent; font-size: 0.85rem; font-weight: 600; color: var(--text-main); outline: none; cursor: pointer;">
              <option value="all" ${filterMediaType === 'all' ? 'selected' : ''}>All Types</option>
              <option value="text" ${filterMediaType === 'text' ? 'selected' : ''}>✍️ Writings Only</option>
              <option value="audio" ${filterMediaType === 'audio' ? 'selected' : ''}>🎙️ Audio Recordings Only</option>
            </select>
          </div>

          <!-- Keyword Search -->
          <input type="text" id="archive-search-keyword" placeholder="Search words..." value="${filterSearchKeyword}" style="
            padding: 0.35rem 0.8rem;
            border-radius: 10px;
            border: 1px solid var(--border-color);
            background: var(--input-bg);
            color: var(--text-main);
            font-size: 0.85rem;
            outline: none;
            min-width: 150px;
          ">
        </div>
      </div>

      <!-- Archive List -->
      <div id="archive-items-container">
        <!-- Rendered via applyArchiveFilters() -->
      </div>
    </div>

    <!-- Quick Navigation Bottom Footer -->
    <div class="dw-subview-nav-footer dw-subview-nav-split">
      <button type="button" class="dw-btn-nav-switch dw-btn-nav-secondary" data-switch-to="record" title="Switch to Voice Recording Lab">
        <i class="fa-solid fa-arrow-left"></i> <span>Voice Recording Lab 🎙️</span>
      </button>
      <button type="button" class="dw-btn-nav-switch" data-switch-to="write" title="Write New Journal Entry">
        <span>Write New Entry ✍️</span> <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  `;

  bindArchiveEvents(container);
  applyArchiveFilters();
}

function bindArchiveEvents(container) {
  const datePreset = document.getElementById('archive-date-preset');
  const datePicker = document.getElementById('archive-date-picker');
  const typeFilter = document.getElementById('archive-type-filter');
  const searchInput = document.getElementById('archive-search-keyword');

  if (datePreset) {
    datePreset.addEventListener('change', () => {
      filterDatePreset = datePreset.value;
      if (datePicker) datePicker.value = '';
      filterCustomDate = '';
      applyArchiveFilters();
    });
  }

  if (datePicker) {
    datePicker.addEventListener('change', () => {
      filterCustomDate = datePicker.value;
      if (filterCustomDate && datePreset) {
        datePreset.value = 'all';
        filterDatePreset = 'all';
      }
      applyArchiveFilters();
    });
  }

  if (typeFilter) {
    typeFilter.addEventListener('change', () => {
      filterMediaType = typeFilter.value;
      applyArchiveFilters();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterSearchKeyword = searchInput.value.toLowerCase().trim();
      applyArchiveFilters();
    });
  }
}

async function applyArchiveFilters() {
  const container = document.getElementById('archive-items-container');
  if (!container) return;

  const entries = getDailyWritingEntries();
  const now = Date.now();
  const oneDay = 86400000;
  const todayStr = new Date().toISOString().split('T')[0];
  const yesterdayStr = new Date(Date.now() - oneDay).toISOString().split('T')[0];

  const filtered = entries.filter(item => {
    // Specific date picker filter
    if (filterCustomDate) {
      const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
      if (itemDate !== filterCustomDate) return false;
    } else {
      // Preset date filter
      if (filterDatePreset === 'today') {
        const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
        if (itemDate !== todayStr) return false;
      } else if (filterDatePreset === 'yesterday') {
        const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
        if (itemDate !== yesterdayStr) return false;
      } else if (filterDatePreset === '7days') {
        const age = now - new Date(item.timestamp).getTime();
        if (age > 7 * oneDay) return false;
      } else if (filterDatePreset === '30days') {
        const age = now - new Date(item.timestamp).getTime();
        if (age > 30 * oneDay) return false;
      }
    }

    // Media type filter
    if (filterMediaType !== 'all' && item.type !== filterMediaType) return false;

    // Search keyword
    if (filterSearchKeyword) {
      const combined = (item.rawText + ' ' + (item.polishedText || '')).toLowerCase();
      if (!combined.includes(filterSearchKeyword)) return false;
    }

    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <div style="font-size: 2.5rem; margin-bottom: 0.8rem; color: var(--gold);">🔍</div>
        <h3 style="margin: 0 0 0.4rem 0; font-size: 1.15rem; color: var(--text-main);">No matching entries found</h3>
        <p style="margin: 0; font-size: 0.88rem;">Try selecting a broader date filter or writing a new daily entry.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.2rem;">
      ${filtered.map(item => {
        const dateObj = new Date(item.timestamp);
        const formattedDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        const formattedTime = dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        const isAudio = item.type === 'audio';

        return `
          <div class="card archive-entry-card" id="card-${item.id}" style="background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 14px; padding: 1.2rem 1.4rem;">
            <!-- Header Bar -->
            <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 0.8rem;">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span style="font-size: 0.8rem; font-weight: 800; color: ${isAudio ? '#C8102E' : 'var(--uk-blue)'}; background: ${isAudio ? 'rgba(200,16,46,0.1)' : 'rgba(0,36,125,0.08)'}; padding: 0.2rem 0.7rem; border-radius: 12px;">
                  ${isAudio ? '🎙️ Voice Recording' : '✍️ Written Journal'}
                </span>
                <span style="font-size: 0.78rem; font-weight: 700; color: #10B981;">
                  Score: ${item.score || 100}/100
                </span>
                ${item.wpm ? `<span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">• ${item.wpm} WPM</span>` : ''}
              </div>

              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <span style="font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.35rem; margin-right: 0.3rem;">
                  <i class="fa-regular fa-clock"></i> ${formattedDate} at ${formattedTime}
                </span>
                <button type="button" class="dw-btn-tool dw-btn-copy btn-archive-copy" data-entry-id="${item.id}" title="Copy entry text">
                  <i class="fa-regular fa-copy"></i> <span>Copy</span>
                </button>
                <button type="button" class="dw-btn-tool dw-btn-share btn-archive-share" data-entry-id="${item.id}" title="Share entry">
                  <i class="fa-solid fa-share-nodes"></i> <span>Share</span>
                </button>
                <button type="button" class="btn-delete-entry" data-entry-id="${item.id}" style="border: 1px solid rgba(239,68,68,0.25); background: rgba(239,68,68,0.06); color: #EF4444; border-radius: 8px; padding: 0.45rem 0.65rem; cursor: pointer; font-size: 0.85rem;" title="Delete Entry">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>

            <!-- Content -->
            <div style="margin-bottom: 0.8rem;">
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.2rem;">
                ${isAudio ? 'RECORDED SPEECH TRANSCRIPT:' : 'YOUR WRITING:'}
              </div>
              <div style="font-size: 0.98rem; color: var(--text-main); line-height: 1.5; font-style: italic;">
                "${item.rawText}"
              </div>
            </div>

            ${isAudio ? `
              <!-- Audio Player Slot -->
              <div style="margin-bottom: 0.8rem;" id="audio-slot-${item.id}">
                <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.3rem;">
                  <i class="fa-solid fa-play"></i> Voice Recording Playback:
                </div>
                <audio controls class="archive-audio-player" data-entry-id="${item.id}" style="width: 100%; height: 38px; outline: none;"></audio>
              </div>
            ` : ''}

            ${item.polishedText && item.polishedText !== item.rawText ? `
              <div style="background: rgba(16,185,129,0.08); border-left: 3px solid #10B981; border-radius: 0 8px 8px 0; padding: 0.6rem 0.9rem; font-size: 0.9rem; color: var(--text-main); margin-bottom: 0.6rem;">
                <strong>Polished British English:</strong> "${item.polishedText}"
              </div>
            ` : ''}

            <!-- Errors & Explanations summary if any -->
            ${item.errors && item.errors.length > 0 ? `
              <div style="margin-top: 0.6rem; font-size: 0.82rem; color: var(--text-muted);">
                <strong>Corrected Mistakes (${item.errors.length}):</strong>
                ${item.errors.map(err => `<span style="display: block; margin-top: 0.2rem; color: #EF4444;">• ${err.mistake} → <strong>${err.correction}</strong>: <em>${err.explanation}</em></span>`).join('')}
              </div>
            ` : ''}
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Attach Audio Blobs from IndexedDB to HTML5 Audio Players
  container.querySelectorAll('.archive-audio-player').forEach(async (audioEl) => {
    const entryId = audioEl.getAttribute('data-entry-id');
    if (entryId) {
      const blob = await getAudioBlobFromDB(entryId);
      if (blob) {
        audioEl.src = URL.createObjectURL(blob);
      } else {
        const slot = document.getElementById(`audio-slot-${entryId}`);
        if (slot) slot.innerHTML = `<span style="font-size: 0.75rem; color: var(--text-muted); font-style: italic;">Audio recording expired or stored on another device.</span>`;
      }
    }
  });

  // Copy Archive Entry Event
  container.querySelectorAll('.btn-archive-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const entryId = btn.getAttribute('data-entry-id');
      const entry = entries.find(e => e.id === entryId);
      if (entry) {
        const textToCopy = entry.polishedText || entry.rawText;
        copyTextToClipboard(textToCopy, 'Archived entry copied to clipboard! 📋');
      }
    });
  });

  // Share Archive Entry Event
  container.querySelectorAll('.btn-archive-share').forEach(btn => {
    btn.addEventListener('click', () => {
      const entryId = btn.getAttribute('data-entry-id');
      const entry = entries.find(e => e.id === entryId);
      if (entry) {
        const shareContent = `🇬🇧 British English Vault - Entry\n\n"${entry.rawText}"\n\n${entry.polishedText ? `✨ Polished: "${entry.polishedText}"\n` : ''}Score: ${entry.score || 100}/100`;
        shareTextContent('My British English Journal Entry', shareContent);
      }
    });
  });

  // Delete Entry Event
  container.querySelectorAll('.btn-delete-entry').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-entry-id');
      if (id && confirm('Are you sure you want to delete this entry?')) {
        deleteDailyWritingEntry(id);
        applyArchiveFilters();
      }
    });
  });
}

// ============================================================================
// MAIN TAB SWITCHING & GESTURES
// ============================================================================
function bindDailyWritingEvents(container) {
  // Tab Button Click & Keyboard Navigation
  const tabButtons = Array.from(container.querySelectorAll('#dw-main-tabs .dw-tab-btn'));
  tabButtons.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const mode = btn.getAttribute('data-mode');
      if (mode) switchDailyWritingSubtab(mode);
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIdx = (idx + 1) % tabButtons.length;
        tabButtons[nextIdx].focus();
        const nextMode = tabButtons[nextIdx].getAttribute('data-mode');
        if (nextMode) switchDailyWritingSubtab(nextMode);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIdx = (idx - 1 + tabButtons.length) % tabButtons.length;
        tabButtons[prevIdx].focus();
        const prevMode = tabButtons[prevIdx].getAttribute('data-mode');
        if (prevMode) switchDailyWritingSubtab(prevMode);
      } else if (e.key === '1') {
        e.preventDefault();
        switchDailyWritingSubtab('write');
      } else if (e.key === '2') {
        e.preventDefault();
        switchDailyWritingSubtab('record');
      } else if (e.key === '3') {
        e.preventDefault();
        switchDailyWritingSubtab('archive');
      }
    });
  });

  // Delegated Clicks for Quick-Switch Buttons [data-switch-to]
  container.addEventListener('click', (e) => {
    const switchBtn = e.target.closest('[data-switch-to]');
    if (switchBtn) {
      e.preventDefault();
      const targetMode = switchBtn.getAttribute('data-switch-to');
      if (targetMode) {
        switchDailyWritingSubtab(targetMode);
        const tabsEl = document.getElementById('dw-main-tabs');
        if (tabsEl) {
          tabsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
  });

  // Touch Swipe Navigation for mobile
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;

  container.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    if (e.changedTouches.length !== 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const timeDelta = Date.now() - touchStartTime;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (timeDelta > 600) return; // Too slow
    if (Math.abs(deltaY) > Math.abs(deltaX) * 0.75) return; // Vertical scroll
    if (Math.abs(deltaX) < 50) return; // Minimum swipe distance

    // Ignore swipe when interacting with textarea or text input
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'INPUT')) {
      return;
    }

    const currentIdx = MODES_LIST.indexOf(activeMode);
    if (currentIdx === -1) return;

    if (deltaX < 0) {
      // Swipe Left -> next tab
      if (currentIdx < MODES_LIST.length - 1) {
        switchDailyWritingSubtab(MODES_LIST[currentIdx + 1]);
      }
    } else {
      // Swipe Right -> previous tab
      if (currentIdx > 0) {
        switchDailyWritingSubtab(MODES_LIST[currentIdx - 1]);
      }
    }
  }, { passive: true });
}
