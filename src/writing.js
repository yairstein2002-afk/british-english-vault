/**
 * British English Vault - Writing Lab ✍️ (מעבדה לכתיבה באנגלית)
 * 8 Interactive Writing Games & Exercises:
 * 1. Sentence Builder (בונה המשפטים)
 * 2. Daily Journal (יומן יומי)
 * 3. Story Challenge (אתגר הסיפורים)
 * 4. Fix My Writing (תקן את הכתיבה שלי)
 * 5. Real-Life Writing (כתיבה מהחיים)
 * 6. Word to Writing (ממילה לכתיבה)
 * 7. Expand the Sentence (הרחב את המשפט)
 * 8. Paragraph Master (מאסטר הפסקאות)
 *
 * Includes XP, Writing Streak, Error Tracker, Before & After, Progressive Hints, Audio TTS, and Database Sync.
 */

import { speakPhrase } from './speech.js';

const WRITING_HISTORY_KEY = 'bev_writing_history';
const WRITING_STATS_KEY = 'bev_writing_stats';
const WRITING_ERRORS_KEY = 'bev_writing_error_tracker';

// 8 Curated Writing Games Data
export const WRITING_GAMES = {
  'sentence-builder': {
    id: 'sentence-builder',
    title: 'Sentence Builder',
    titleHe: 'בונה המשפטים',
    icon: 'fa-cubes-stacked',
    desc: 'כתוב משפט שלם ותקין המשלב את כל המילים הנדרשות.',
    exercises: [
      {
        id: 'sb-1',
        level: 'Beginner',
        requiredWords: ['although', 'tired', 'work'],
        prompt: 'Write a sentence using the words: "although", "tired" and "work".',
        hints: [
          'Use "although" to show a contrast between being tired and working.',
          'Start with: "Although I was tired..." or put "although" in the middle.',
          'Example: "Although he was exhausted and tired, he continued to work until late."'
        ],
        modelAnswer: 'Although I was terribly tired, I finished all my work before heading home.',
        grammarFocus: 'Concessive Clauses (Although)'
      },
      {
        id: 'sb-2',
        level: 'Intermediate',
        requiredWords: ['keen on', 'whilst', 'London'],
        prompt: 'Write a sentence using the British phrases: "keen on", "whilst" and "London".',
        hints: [
          '"Keen on" means very fond of / enthusiastic about.',
          '"Whilst" is the classic British equivalent of "while".',
          'Example: "Whilst living in London, she was extremely keen on visiting art galleries."'
        ],
        modelAnswer: 'Whilst exploring London last autumn, I was particularly keen on visiting historic pubs.',
        grammarFocus: 'British Prepositions & Subordinate Conjunctions'
      },
      {
        id: 'sb-3',
        level: 'Advanced',
        requiredWords: ['nevertheless', 'reluctant', 'decision'],
        prompt: 'Write an advanced sentence using: "nevertheless", "reluctant" and "decision".',
        hints: [
          '"Reluctant" means unwilling or hesitant.',
          '"Nevertheless" functions as a formal transition word (like "however").',
          'Example: "She was reluctant at first; nevertheless, she stood by her final decision."'
        ],
        modelAnswer: 'The team was initially reluctant to endorse the project; nevertheless, it proved to be a brilliant decision.',
        grammarFocus: 'Formal Discourse Markers'
      }
    ]
  },

  'daily-journal': {
    id: 'daily-journal',
    title: 'Daily Journal',
    titleHe: 'יומן יומי',
    icon: 'fa-book-journal-whills',
    desc: 'ענה על שאלת היום וכתוב 3–5 משפטים באנגלית לפיתוח שטף ומחשבה.',
    exercises: [
      {
        id: 'dj-1',
        level: 'All Levels',
        prompt: 'What was the best or most surprising part of your day today?',
        minSentences: 3,
        starter: 'The highlight of my day was certainly when...',
        hints: [
          'Describe what happened, who you were with, and how it made you feel.',
          'Use past simple or present perfect tenses.',
          'Try incorporating British adjectives like "splendid", "refreshing", or "delightful".'
        ],
        modelAnswer: 'The highlight of my day was certainly when I enjoyed a quiet cuppa in the afternoon. I managed to finish reading a captivating book while listening to the gentle rain outside. All in all, it gave me a tremendous sense of calm and accomplishment.',
        grammarFocus: 'Reflective Writing & Sentence Flow'
      },
      {
        id: 'dj-2',
        level: 'All Levels',
        prompt: 'If you could spend one entire day exploring anywhere in Great Britain, where would you go and what would you do?',
        minSentences: 3,
        starter: 'If I had the chance to spend a day in Britain, I would definitely visit...',
        hints: [
          'Use conditional sentences (If I had... I would...).',
          'Mention specific locations (e.g., Edinburgh, the Cotswolds, Oxford, the British Museum).',
          'Explain why this location appeals to you.'
        ],
        modelAnswer: 'If I were given the opportunity to spend a day in the UK, I would immediately head to the Scottish Highlands. The dramatic landscapes and historic castles have always fascinated me. In the evening, I would stop at a traditional village inn for a warm hearty stew.',
        grammarFocus: 'Second Conditional (Imaginary Scenarios)'
      }
    ]
  },

  'story-challenge': {
    id: 'story-challenge',
    title: 'Story Challenge',
    titleHe: 'אתגר הסיפורים',
    icon: 'fa-hat-wizard',
    desc: 'קבל פתיחה מסקרנת לסיפור וכתוב את ההמשך המרתק בעצמך.',
    exercises: [
      {
        id: 'sc-1',
        level: 'Intermediate',
        opener: 'You wake up on a foggy Tuesday morning in London and suddenly discover that you can clearly understand every animal talking. What happens next?',
        prompt: 'Continue the story in 3 to 6 sentences. What was the first animal you met, and what did it tell you?',
        hints: [
          'Use vivid sensory adjectives (foggy, chattering, bewildered, muffled).',
          'Keep your verbs consistently in the past tense (awoke, glanced, whispered).',
          'Create a humorous or mysterious encounter.'
        ],
        modelAnswer: 'As I opened the bedroom window, a stout London pigeon perched on the railing looked me straight in the eye and complained bitterly about the damp weather. Utterly stunned, I rubbed my eyes in disbelief, wondering whether I was still dreaming. "Mind dropping a crumb of toast?" the bird squawked impatiently before fluttering towards the garden.',
        grammarFocus: 'Narrative Past Tense & Dialogue'
      },
      {
        id: 'sc-2',
        level: 'Advanced',
        opener: 'The old brass clock inside the antique shop in York began ticking backwards. Suddenly, the shop door clicked shut...',
        prompt: 'Write the next paragraph of this mystery tale.',
        hints: [
          'Build suspense and describe the eerie atmosphere inside the shop.',
          'Use evocative verbs like "creaked", "echoed", "shivered".',
          'Conclude with an intriguing cliffhanger.'
        ],
        modelAnswer: 'A sudden chill swept through the narrow aisles as shadows stretched across the floorboards. The brass pendulum swung in reverse with an uncanny rhythmic hum. Outside, the cobblestone streets seemed to vanish into a swirling golden mist of a forgotten century.',
        grammarFocus: 'Atmospheric Description & Past Perfect'
      }
    ]
  },

  'fix-my-writing': {
    id: 'fix-my-writing',
    title: 'Fix My Writing',
    titleHe: 'תקן את הכתיבה שלי',
    icon: 'fa-pen-to-square',
    desc: 'זהה את הטעויות במשפט ושכתב אותו מחדש בצורה תקינה וטבעית.',
    exercises: [
      {
        id: 'fmw-1',
        level: 'Beginner',
        buggySentence: 'She don\'t likes coffee and he never go to school by bus.',
        prompt: 'Correct the subject-verb agreement and negative verb form.',
        correctVersion: 'She doesn\'t like coffee and he never goes to school by bus.',
        explanation: '1. "She" takes "doesn\'t like" (base verb after auxiliary does). 2. Third person singular "he" requires "goes" in present simple.',
        hints: [
          'After "doesn\'t", the main verb stays in base form (like, not likes).',
          'Check third-person singular "-s" on "go" -> "goes".'
        ]
      },
      {
        id: 'fmw-2',
        level: 'Intermediate',
        buggySentence: 'I am living in Manchester since three years and I very like fish and chips.',
        prompt: 'Fix the tense and word order error.',
        correctVersion: 'I have been living in Manchester for three years and I really like fish and chips.',
        explanation: '1. Actions continuing up to now with "since/for" require the Present Perfect Continuous ("have been living"). 2. Use "for" with durations (for three years). 3. Native speakers say "really like" or "like ... very much", never "very like".',
        hints: [
          'Replace "am living" with Present Perfect Continuous.',
          'Duration of time uses "for", not "since".',
          'Do not use "very like" — use "really like".'
        ]
      },
      {
        id: 'fmw-3',
        level: 'Advanced',
        buggySentence: 'If I would know about the meeting yesterday, I would attend it definitely.',
        prompt: 'Fix the Third Conditional structure.',
        correctVersion: 'If I had known about the meeting yesterday, I would definitely have attended it.',
        explanation: 'Third conditional requires "If + had + past participle" in the condition clause, and "would have + past participle" in the result clause.',
        hints: [
          'Never put "would" inside the "if" clause for past hypotheticals.',
          'Use "had known" and "would have attended".'
        ]
      }
    ]
  },

  'real-life-writing': {
    id: 'real-life-writing',
    title: 'Real-Life Writing',
    titleHe: 'כתיבה מהחיים',
    icon: 'fa-envelope-open-text',
    desc: 'תרגל כתיבת מיילים, הודעות מקצועיות ופניות רשמיות באנגלית בריטית מנומסת.',
    exercises: [
      {
        id: 'rlw-1',
        level: 'Intermediate',
        scenario: 'Professional Email — Rescheduling a Meeting',
        prompt: 'Write a polite email to your British colleague (James) asking to reschedule tomorrow\'s 10:00 AM project review meeting to Thursday afternoon due to an unexpected dentist appointment.',
        starter: 'Dear James,\n\nI hope this email finds you well.\n\n',
        hints: [
          'Use polite British framing: "I am writing to inquire whether it might be possible to..."',
          'Offer sincere apologies for any inconvenience caused.',
          'Suggest alternative times clearly and conclude with "Kind regards".'
        ],
        modelAnswer: 'Dear James,\n\nI hope this email finds you well.\n\nI am writing to inquire whether it might be possible to reschedule our project review meeting originally planned for tomorrow at 10:00 AM. Unfortunately, an urgent medical appointment has arisen which I cannot postpone.\n\nWould Thursday afternoon, perhaps around 2:00 PM, suit you instead? Please accept my sincere apologies for any inconvenience this may cause.\n\nKind regards,\n[Your Name]',
        grammarFocus: 'Polite Modals & Formal Tone'
      },
      {
        id: 'rlw-2',
        level: 'Advanced',
        scenario: 'Polite Inquiry / Complaint to a London Hotel',
        prompt: 'Write a courteous email to a boutique hotel in Covent Garden, inquiring about an invoice discrepancy from your recent stay where room service was double-charged.',
        starter: 'Dear Hotel Management,\n\n',
        hints: [
          'State the booking reference and dates of stay.',
          'Remain diplomatic, constructive, and polite.',
          'Request a revised invoice or refund to your card.'
        ],
        modelAnswer: 'Dear Management,\n\nI recently completed a thoroughly enjoyable stay at your Covent Garden hotel between 12th and 15th October (Reservation #UK-4891).\n\nUpon reviewing my final invoice, however, I noticed that the room service charge of £38.50 appears to have been applied twice. Could you kindly look into this matter and provide an updated statement at your earliest convenience?\n\nThank you very much for your assistance.\n\nYours sincerely,\n[Your Name]',
        grammarFocus: 'Diplomatic English & Formal Inquiries'
      }
    ]
  },

  'word-to-writing': {
    id: 'word-to-writing',
    title: 'Word to Writing',
    titleHe: 'ממילה לכתיבה',
    icon: 'fa-feather',
    desc: 'קבל מילה או ביטוי בריטי מובחר וכתוב משפט מקורי שממחיש את משמעותו.',
    exercises: [
      {
        id: 'wtw-1',
        level: 'Intermediate',
        targetWord: 'reluctant',
        meaning: 'Unwilling and hesitant; disinclined (הססני, מסויג).',
        prompt: 'Write an original sentence using "reluctant". Show clearly why the person was hesitant.',
        hints: [
          'Follow "reluctant" with a to-infinitive (reluctant to leave, reluctant to agree).',
          'Example context: changing jobs, speaking in public, or going out in the rain.'
        ],
        modelAnswer: 'He was initially reluctant to invest in the venture, but the strong financial forecast convinced him.'
      },
      {
        id: 'wtw-2',
        level: 'Intermediate',
        targetWord: 'chuffed',
        meaning: 'Extremely pleased or delighted (British slang: מבסוט עד הגג, שמח מאוד).',
        prompt: 'Write a casual sentence expressing high satisfaction using the British term "chuffed".',
        hints: [
          'Often combined with "to bits" -> "chuffed to bits".',
          'Example context: getting a promotion, passing a difficult driving test.'
        ],
        modelAnswer: 'I was absolutely chuffed to bits when I received the acceptance letter from Oxford University.'
      },
      {
        id: 'wtw-3',
        level: 'Advanced',
        targetWord: 'redundant',
        meaning: 'No longer needed or useful; superfluous (מיותר / מפוטר מעבודה עקב עודף תקנים).',
        prompt: 'Write an advanced sentence using "redundant" in either a workplace or writing context.',
        hints: [
          'Workplace context: "made redundant" (laid off).',
          'Stylistic context: "redundant words" (repetitive/unnecessary).'
        ],
        modelAnswer: 'The new automated system made several manual paperwork processes completely redundant.'
      }
    ]
  },

  'expand-sentence': {
    id: 'expand-sentence',
    title: 'Expand the Sentence',
    titleHe: 'הרחב את המשפט',
    icon: 'fa-arrows-left-right-to-line',
    desc: 'התחל ממשפט קצר והפוך אותו לפסקה קטנה ועשירה בעזרת תיאורים, סיבות ומילות קישור.',
    exercises: [
      {
        id: 'es-1',
        level: 'Beginner',
        baseSentence: 'I went home.',
        prompt: 'Expand "I went home" by adding: When? Why? How were you feeling? What was the weather like?',
        targetLength: 'At least 15 words',
        hints: [
          'Add a time marker: "Yesterday evening..."',
          'Add a reason: "...because I was thoroughly exhausted from..."',
          'Add weather details: "...through the pouring London rain."'
        ],
        modelAnswer: 'Yesterday evening, I went home early on the Tube because I was thoroughly exhausted after a hectic day at the office.'
      },
      {
        id: 'es-2',
        level: 'Intermediate',
        baseSentence: 'The dog barked.',
        prompt: 'Expand "The dog barked" into a vivid descriptive sentence with adjectives, adverbs, and consequences.',
        targetLength: 'At least 18 words',
        hints: [
          'Describe the dog: "The neighbour\'s restless terrier..."',
          'Describe how it barked: "...barked frantically at the shadows..."',
          'Describe the result: "...waking up the entire sleepy street."'
        ],
        modelAnswer: 'The neighbour\'s energetic golden retriever barked persistently at the front gate, alerting everyone to the postman\'s arrival.'
      }
    ]
  },

  'paragraph-master': {
    id: 'paragraph-master',
    title: 'Paragraph Master',
    titleHe: 'מאסטר הפסקאות',
    icon: 'fa-align-left',
    desc: 'כתוב פסקה מובנית באנגלית: משפט פתיחה, נימוקים תומכים ומשפט סיכום.',
    exercises: [
      {
        id: 'pm-1',
        level: 'Advanced',
        topic: 'Why Learning British English Opens International Opportunities',
        prompt: 'Write a well-structured paragraph (4–6 sentences). Include a strong topic sentence, two supporting arguments with examples, and a concluding remark.',
        hints: [
          'Topic sentence: "Mastering British English provides learners with a profound international advantage..."',
          'Linking words: "Firstly", "Moreover", "Consequently", "In summary".',
          'Focus on clarity and coherent paragraph flow.'
        ],
        modelAnswer: 'Mastering British English provides professionals and students with a profound international advantage. Firstly, it familiarizes learners with the nuances, idioms, and formal register utilized in top academic institutions worldwide. Furthermore, having a command of natural British vocabulary enhances cross-cultural business communication throughout Europe and the Commonwealth. In summary, cultivating this dialect builds confidence and enriches one\'s global perspective.'
      }
    ]
  }
};

let activeGameKey = 'sentence-builder';
let activeExerciseIndex = 0;
let currentHintStep = 0;

/**
 * Storage & Stats Functions
 */
export function getWritingHistory() {
  try {
    const raw = localStorage.getItem(WRITING_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveWritingSubmission(sub) {
  const history = getWritingHistory();
  history.unshift(sub);
  if (history.length > 50) history.pop();
  localStorage.setItem(WRITING_HISTORY_KEY, JSON.stringify(history));

  // Update Stats
  const stats = getWritingStats();
  stats.totalSubmissions = (stats.totalSubmissions || 0) + 1;
  stats.xp = (stats.xp || 0) + (sub.earnedXp || 30);
  
  // Streak tracking
  const today = new Date().toISOString().split('T')[0];
  if (stats.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (stats.lastActiveDate === yesterday) {
      stats.streak = (stats.streak || 0) + 1;
    } else {
      stats.streak = 1;
    }
    stats.lastActiveDate = today;
  }
  localStorage.setItem(WRITING_STATS_KEY, JSON.stringify(stats));

  return sub;
}

export function getWritingStats() {
  try {
    const raw = localStorage.getItem(WRITING_STATS_KEY);
    return raw ? JSON.parse(raw) : { totalSubmissions: 0, xp: 0, streak: 1, lastActiveDate: null };
  } catch (e) {
    return { totalSubmissions: 0, xp: 0, streak: 1, lastActiveDate: null };
  }
}

export function getWritingErrorTracker() {
  try {
    const raw = localStorage.getItem(WRITING_ERRORS_KEY);
    return raw ? JSON.parse(raw) : {
      tenses: 0,
      prepositions: 0,
      spelling: 0,
      agreement: 0,
      punctuation: 0
    };
  } catch (e) {
    return { tenses: 0, prepositions: 0, spelling: 0, agreement: 0, punctuation: 0 };
  }
}

export function recordWritingError(category) {
  const tracker = getWritingErrorTracker();
  if (tracker[category] !== undefined) {
    tracker[category] += 1;
    localStorage.setItem(WRITING_ERRORS_KEY, JSON.stringify(tracker));
  }
}

/**
 * Intelligent Text Evaluator for Writing Submissions
 */
export function evaluateWritingSubmission(userText, gameKey, exerciseObj) {
  const text = (userText || '').trim();
  if (!text) {
    return { success: false, error: 'Please write your answer in English first!' };
  }

  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const detectedMistakes = [];
  const lower = text.toLowerCase();

  // 1. Game Specific Verifications
  if (gameKey === 'sentence-builder' && exerciseObj.requiredWords) {
    const missing = exerciseObj.requiredWords.filter(w => !lower.includes(w.toLowerCase()));
    if (missing.length > 0) {
      detectedMistakes.push({
        category: 'Task Requirement',
        error: `Missing required words: "${missing.join('", "')}"`,
        fix: 'Ensure your sentence clearly integrates all specified target words.'
      });
    }
  }

  if (gameKey === 'word-to-writing' && exerciseObj.targetWord) {
    if (!lower.includes(exerciseObj.targetWord.toLowerCase())) {
      detectedMistakes.push({
        category: 'Task Requirement',
        error: `The target word "${exerciseObj.targetWord}" was not found in your sentence.`,
        fix: `Make sure to incorporate "${exerciseObj.targetWord}" into your sentence.`
      });
    }
  }

  if (gameKey === 'daily-journal' && exerciseObj.minSentences) {
    if (sentences.length < exerciseObj.minSentences) {
      detectedMistakes.push({
        category: 'Length Requirement',
        error: `Wrote ${sentences.length} sentences instead of the recommended ${exerciseObj.minSentences}.`,
        fix: 'Expand your reflection with another sentence or two describing reasons or feelings.'
      });
    }
  }

  // 2. Universal Grammar & Spelling Inspections
  if (/\b(he|she|it)\s+(don't|do|have|are)\b/i.test(text)) {
    detectedMistakes.push({
      category: 'Subject-Verb Agreement',
      error: 'Subject-Verb agreement error with he/she/it.',
      fix: 'Use "doesn\'t", "does", "has", "is".'
    });
    recordWritingError('agreement');
  }

  if (/\b(i\s+very\s+like|very\s+like)\b/i.test(text)) {
    detectedMistakes.push({
      category: 'Collocation & Natural Phrasing',
      error: '"very like" is unidiomatic.',
      fix: 'Use "really like", "thoroughly enjoy", or "like ... very much".'
    });
  }

  if (/\b(depend\s+of)\b/i.test(text)) {
    detectedMistakes.push({
      category: 'Preposition',
      error: '"depend of" is incorrect.',
      fix: 'Always use "depend on".'
    });
    recordWritingError('prepositions');
  }

  if (/\b(since\s+\d+\s+years)\b/i.test(text)) {
    detectedMistakes.push({
      category: 'Verb Tenses',
      error: 'Using "since" with a duration.',
      fix: 'Use "for" with durations (e.g. "for three years") and "since" with points in time.'
    });
    recordWritingError('tenses');
  }

  // American to British spelling suggestions
  const britishPolishes = [];
  if (/\bcolor\b/i.test(text)) britishPolishes.push('British spelling: "colour"');
  if (/\bfavor\b/i.test(text)) britishPolishes.push('British spelling: "favour"');
  if (/\bcenter\b/i.test(text)) britishPolishes.push('British spelling: "centre"');
  if (/\btheater\b/i.test(text)) britishPolishes.push('British spelling: "theatre"');
  if (/\brealize\b/i.test(text)) britishPolishes.push('British variant: "realise" (or realize)');

  // Build polished version
  let polished = text;
  polished = polished
    .replace(/\bhe don't\b/gi, "he doesn't")
    .replace(/\bshe don't\b/gi, "she doesn't")
    .replace(/\bvery like\b/gi, "really like")
    .replace(/\bdepend of\b/gi, "depend on")
    .replace(/\bcolor\b/gi, "colour")
    .replace(/\bcenter\b/gi, "centre");

  if (!/[.!?]$/.test(polished)) polished += '.';

  // Calculate score
  let baseScore = 95 - (detectedMistakes.length * 20);
  if (baseScore < 45) baseScore = 45;
  if (wordCount >= 20) baseScore = Math.min(100, baseScore + 5);

  const earnedXp = detectedMistakes.length === 0 ? 40 : 25;

  return {
    success: true,
    score: baseScore,
    wordCount,
    sentencesCount: sentences.length,
    originalText: text,
    polishedVersion: polished,
    modelAnswer: exerciseObj.modelAnswer || exerciseObj.correctVersion || null,
    detectedMistakes,
    britishPolishes,
    earnedXp
  };
}

/**
 * Initialize and render Writing Lab UI inside #view-writing
 */
export function initWritingLabUI() {
  const container = document.getElementById('view-writing');
  if (!container) return;

  const stats = getWritingStats();
  const errorTracker = getWritingErrorTracker();
  const currentGame = WRITING_GAMES[activeGameKey];
  const currentExercise = currentGame.exercises[activeExerciseIndex] || currentGame.exercises[0];

  container.innerHTML = `
    <div class="writing-lab-wrapper">
      <!-- HERO HEADER -->
      <div class="writing-hero-card card">
        <div class="hero-left">
          <div class="hero-badge"><i class="fa-solid fa-pen-nib"></i> Writing Lab ✍️</div>
          <h2>מעבדה לכתיבה באנגלית • Writing Lab</h2>
          <p>
            אל תסתפק רק בזיהוי מילים! למד לייצר ולכתוב אנגלית בעצמך דרך 8 משחקים ותרגולים אינטראקטיביים,
            קבל משוב דקדוקי מיידי, השוואת Before & After מול אנגלית בריטית טבעית ומעקב אחר התקדמותך!
          </p>
        </div>
        <div class="hero-stats-pills">
          <div class="stat-pill">
            <span class="stat-num">${stats.streak || 1} 🔥</span>
            <span class="stat-lbl">Writing Streak</span>
          </div>
          <div class="stat-pill">
            <span class="stat-num">${stats.xp || 0}</span>
            <span class="stat-lbl">Writing XP</span>
          </div>
          <div class="stat-pill">
            <span class="stat-num">${stats.totalSubmissions || 0}</span>
            <span class="stat-lbl">Tasks Done</span>
          </div>
        </div>
      </div>

      <!-- GAME SELECTOR TABS -->
      <div class="writing-games-nav-card card">
        <div class="games-nav-scroll" id="writing-games-tabs">
          ${Object.values(WRITING_GAMES).map(g => `
            <button type="button" class="writing-game-tab ${g.id === activeGameKey ? 'active' : ''}" data-key="${g.id}">
              <i class="fa-solid ${g.icon}"></i>
              <div class="tab-text">
                <span class="tab-title-en">${g.title}</span>
                <span class="tab-title-he">${g.titleHe}</span>
              </div>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- MAIN EXERCISE WORKBENCH & SIDEBAR -->
      <div class="writing-workbench-grid">
        <!-- LEFT: ACTIVE EXERCISE & EDITOR -->
        <div class="writing-main-card card">
          <div class="exercise-header">
            <div class="exercise-badge-group">
              <span class="game-badge"><i class="fa-solid ${currentGame.icon}"></i> ${currentGame.title}</span>
              <span class="level-badge">${currentExercise.level || 'All Levels'}</span>
              ${currentExercise.grammarFocus ? `<span class="grammar-badge">💡 ${currentExercise.grammarFocus}</span>` : ''}
            </div>
            <div class="exercise-step-indicator">
              Exercise ${activeExerciseIndex + 1} of ${currentGame.exercises.length}
            </div>
          </div>

          <!-- PROMPT DETAILS -->
          <div class="exercise-prompt-container">
            <h3 class="exercise-prompt-title">${currentExercise.prompt || currentGame.desc}</h3>
            
            ${currentExercise.opener ? `
              <div class="story-opener-quote">
                <i class="fa-solid fa-quote-left"></i>
                <p>${currentExercise.opener}</p>
              </div>
            ` : ''}

            ${currentExercise.buggySentence ? `
              <div class="buggy-sentence-box">
                <span class="buggy-label">❌ משפט לתיקון:</span>
                <p class="buggy-text">"${currentExercise.buggySentence}"</p>
              </div>
            ` : ''}

            ${currentExercise.requiredWords ? `
              <div class="required-words-box">
                <span class="required-label">📌 חובה לשלב את המילים:</span>
                <div class="words-pill-list">
                  ${currentExercise.requiredWords.map(w => `<span class="word-pill">${w}</span>`).join('')}
                </div>
              </div>
            ` : ''}

            ${currentExercise.targetWord ? `
              <div class="target-word-card">
                <div class="target-word-title">🇬🇧 Target Word: <strong>${currentExercise.targetWord}</strong></div>
                <div class="target-word-meaning">${currentExercise.meaning}</div>
              </div>
            ` : ''}

            ${currentExercise.baseSentence ? `
              <div class="base-sentence-card">
                <span>משפט בסיס להרחבה:</span>
                <h4>"${currentExercise.baseSentence}"</h4>
              </div>
            ` : ''}
          </div>

          <!-- PROGRESSIVE HINTS ACCORDION -->
          ${currentExercise.hints && currentExercise.hints.length > 0 ? `
            <div class="hints-accordion-box">
              <div class="hints-header" id="btn-toggle-hint">
                <span><i class="fa-solid fa-lightbulb" style="color: var(--gold);"></i> רמז הדרגתי (Progressive Hint)</span>
                <span class="hint-count-pill" id="hint-count-pill">רמז ${currentHintStep} מתוך ${currentExercise.hints.length}</span>
              </div>
              <div class="hint-body" id="hint-body" style="display: ${currentHintStep > 0 ? 'block' : 'none'};">
                ${currentHintStep > 0 ? `<p class="hint-text">${currentExercise.hints[currentHintStep - 1]}</p>` : ''}
              </div>
              <button type="button" class="btn-reveal-hint" id="btn-reveal-hint">
                <i class="fa-solid fa-unlock-keyhole"></i> ${currentHintStep === 0 ? 'גלה רמז ראשון' : currentHintStep < currentExercise.hints.length ? 'גלה רמז נוסף' : 'כל הרמזים נחשפו'}
              </button>
            </div>
          ` : ''}

          <!-- WRITING INPUT AREA -->
          <div class="writing-input-section">
            <div class="input-header-row">
              <label for="writing-textarea" class="form-label">
                כתוב את תשובתך באנגלית:
              </label>
              <div class="word-char-counter">
                <span id="writing-word-count">0 words</span> • <span id="writing-sentence-count">0 sentences</span>
              </div>
            </div>

            <textarea id="writing-textarea" class="form-control writing-textarea" rows="5" 
              placeholder="${currentExercise.starter || 'Type your English text here...'}">${currentExercise.starter || ''}</textarea>

            <div class="writing-action-row">
              <button type="button" id="btn-submit-writing" class="btn btn-primary btn-lg">
                <i class="fa-solid fa-paper-plane"></i> בדוק את הכתיבה שלי (Check My Writing)
              </button>
              <button type="button" id="btn-listen-writing" class="btn btn-secondary btn-lg" title="Hear with British Voice">
                <i class="fa-solid fa-volume-high"></i> השמע לי
              </button>
              <button type="button" id="btn-next-exercise" class="btn btn-secondary btn-lg" title="Next Exercise">
                <i class="fa-solid fa-forward"></i> התרגיל הבא
              </button>
            </div>
          </div>

          <!-- EVALUATION RESULT & BEFORE & AFTER CARD -->
          <div id="writing-result-card" class="writing-result-card" style="display: none;">
            <!-- Rendered dynamically upon submission -->
          </div>
        </div>

        <!-- RIGHT: ERROR TRACKER & RECENT WRITING -->
        <div class="writing-sidebar">
          <!-- ERROR TRACKER SUMMARY -->
          <div class="card error-tracker-card">
            <h4><i class="fa-solid fa-chart-pie" style="color: var(--uk-red);"></i> Personal Error Tracker</h4>
            <p class="panel-desc">מעקב אישי אחר סוגי הטעויות לשיפור ממוקד:</p>
            
            <div class="error-bars-list">
              <div class="error-bar-item">
                <div class="error-bar-label">
                  <span>זמני פועל (Verb Tenses)</span>
                  <strong>${errorTracker.tenses || 0}</strong>
                </div>
                <div class="error-progress"><div class="error-fill" style="width: ${Math.min(100, (errorTracker.tenses || 0) * 20)}%;"></div></div>
              </div>
              <div class="error-bar-item">
                <div class="error-bar-label">
                  <span>מילות יחס (Prepositions)</span>
                  <strong>${errorTracker.prepositions || 0}</strong>
                </div>
                <div class="error-progress"><div class="error-fill" style="width: ${Math.min(100, (errorTracker.prepositions || 0) * 20)}%;"></div></div>
              </div>
              <div class="error-bar-item">
                <div class="error-bar-label">
                  <span>התאמת נושא-פועל (Agreement)</span>
                  <strong>${errorTracker.agreement || 0}</strong>
                </div>
                <div class="error-progress"><div class="error-fill" style="width: ${Math.min(100, (errorTracker.agreement || 0) * 20)}%;"></div></div>
              </div>
            </div>
          </div>

          <!-- RECENT WRITING SUBMISSIONS -->
          <div class="card submissions-card">
            <h4><i class="fa-solid fa-clock-rotate-left"></i> יומן כתיבה אחרון</h4>
            <div class="recent-submissions-list" id="recent-submissions-list">
              <!-- Rendered dynamically -->
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach Event Handlers
  setupWritingEventListeners();
  renderRecentSubmissions();
}

/**
 * Setup All Event Listeners for Writing Lab
 */
function setupWritingEventListeners() {
  const textarea = document.getElementById('writing-textarea');
  const wordCountEl = document.getElementById('writing-word-count');
  const sentenceCountEl = document.getElementById('writing-sentence-count');
  const submitBtn = document.getElementById('btn-submit-writing');
  const listenBtn = document.getElementById('btn-listen-writing');
  const nextBtn = document.getElementById('btn-next-exercise');
  const hintBtn = document.getElementById('btn-reveal-hint');

  // Real-time word and sentence counter
  if (textarea) {
    const updateCounts = () => {
      const val = textarea.value.trim();
      const words = val ? val.split(/\s+/).filter(Boolean).length : 0;
      const sentences = val ? val.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
      if (wordCountEl) wordCountEl.innerText = `${words} words`;
      if (sentenceCountEl) sentenceCountEl.innerText = `${sentences} sentences`;
    };
    textarea.addEventListener('input', updateCounts);
    updateCounts();
  }

  // Game Tabs switching
  document.querySelectorAll('#writing-games-tabs .writing-game-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const key = e.currentTarget.getAttribute('data-key');
      if (key && WRITING_GAMES[key]) {
        activeGameKey = key;
        activeExerciseIndex = 0;
        currentHintStep = 0;
        initWritingLabUI();
      }
    });
  });

  // Next Exercise Button
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const currentGame = WRITING_GAMES[activeGameKey];
      if (currentGame && currentGame.exercises.length > 0) {
        activeExerciseIndex = (activeExerciseIndex + 1) % currentGame.exercises.length;
        currentHintStep = 0;
        initWritingLabUI();
      }
    });
  }

  // Progressive Hint Revealer
  if (hintBtn) {
    hintBtn.addEventListener('click', () => {
      const currentGame = WRITING_GAMES[activeGameKey];
      const currentExercise = currentGame.exercises[activeExerciseIndex] || currentGame.exercises[0];
      if (currentExercise.hints && currentExercise.hints.length > 0) {
        if (currentHintStep < currentExercise.hints.length) {
          currentHintStep++;
          const hintBody = document.getElementById('hint-body');
          const hintPill = document.getElementById('hint-count-pill');
          if (hintBody) {
            hintBody.style.display = 'block';
            hintBody.innerHTML = `<p class="hint-text">💡 ${currentExercise.hints[currentHintStep - 1]}</p>`;
          }
          if (hintPill) {
            hintPill.innerText = `רמז ${currentHintStep} מתוך ${currentExercise.hints.length}`;
          }
          if (currentHintStep >= currentExercise.hints.length) {
            hintBtn.innerHTML = '<i class="fa-solid fa-check"></i> כל הרמזים נחשפו';
          }
        }
      }
    });
  }

  // Audio Playback
  if (listenBtn) {
    listenBtn.addEventListener('click', () => {
      const text = textarea ? textarea.value.trim() : '';
      if (!text) {
        alert('Please write something in English first!');
        return;
      }
      speakPhrase(text);
    });
  }

  // Submission & Analysis
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const text = textarea ? textarea.value.trim() : '';
      if (!text) {
        alert('Please write your answer in English before submitting!');
        return;
      }

      const currentGame = WRITING_GAMES[activeGameKey];
      const currentExercise = currentGame.exercises[activeExerciseIndex] || currentGame.exercises[0];
      const result = evaluateWritingSubmission(text, activeGameKey, currentExercise);

      renderWritingFeedback(result, currentExercise);

      // Save submission
      const sub = {
        id: `wr-${Date.now()}`,
        date: new Date().toISOString(),
        game: currentGame.title,
        gameKey: activeGameKey,
        score: result.score,
        userText: text,
        polishedVersion: result.polishedVersion,
        earnedXp: result.earnedXp
      };
      saveWritingSubmission(sub);
      renderRecentSubmissions();
    });
  }
}

/**
 * Render Writing Feedback with Before & After, Errors, and Audio
 */
function renderWritingFeedback(res, exerciseObj) {
  const card = document.getElementById('writing-result-card');
  if (!card) return;

  const scoreColor = res.score >= 80 ? 'var(--success)' : res.score >= 60 ? 'var(--warning)' : '#e74c3c';

  card.style.display = 'block';
  card.innerHTML = `
    <div class="result-header">
      <div class="score-pill-lg" style="background: ${scoreColor}; color: #fff;">
        <i class="fa-solid fa-award"></i> ${res.score} Points (+${res.earnedXp} XP)
      </div>
      <h3 style="margin: 0; color: var(--text-main);">
        ${res.score >= 85 ? '🌟 Outstanding Writing!' : res.score >= 65 ? '👍 Well written! Here are a few improvements' : '💡 Nice effort! Check the corrections below'}
      </h3>
    </div>

    <!-- BEFORE & AFTER COMPARISON -->
    <div class="before-after-grid">
      <div class="ba-card ba-original">
        <div class="ba-tag tag-before">Your Original Writing (המשפט שלך)</div>
        <p class="ba-content">"${res.originalText}"</p>
      </div>

      <div class="ba-card ba-polished">
        <div class="ba-tag tag-after">
          <span>Native British Polished (הגרסה המשופרת)</span>
          <button type="button" class="btn-audio-mini" id="btn-play-after-audio" title="Listen to Native Audio">
            <i class="fa-solid fa-volume-high"></i> האזן
          </button>
        </div>
        <p class="ba-content">"${res.polishedVersion}"</p>
      </div>
    </div>

    <!-- MODEL ANSWER (IF AVAILABLE) -->
    ${res.modelAnswer ? `
      <div class="model-answer-box">
        <div class="model-header">
          <i class="fa-solid fa-gem" style="color: var(--gold);"></i>
          <strong>דוגמה לניסוח אידיאלי (Model Answer):</strong>
          <button type="button" class="btn-audio-mini" id="btn-play-model-audio" title="Listen">
            <i class="fa-solid fa-volume-high"></i> השמע דוגמה
          </button>
        </div>
        <p class="model-text">"${res.modelAnswer}"</p>
      </div>
    ` : ''}

    <!-- DETECTED MISTAKES -->
    ${res.detectedMistakes.length > 0 ? `
      <div class="writing-mistakes-box">
        <h4 style="margin: 0 0 0.5rem 0; color: #e74c3c; font-size: 1rem;">
          <i class="fa-solid fa-circle-exclamation"></i> נקודות לתיקון ולשיפור:
        </h4>
        <div class="wm-list">
          ${res.detectedMistakes.map(m => `
            <div class="wm-item">
              <span class="wm-cat">${m.category}</span>
              <div class="wm-desc">
                <strong>${m.error}</strong>
                <p style="margin: 0.2rem 0; font-size: 0.88rem; color: var(--text-muted);">${m.fix}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : `
      <div class="perfect-writing-badge">
        <i class="fa-solid fa-circle-check" style="color: var(--success); font-size: 1.25rem;"></i>
        <span>כתיבה מצוינת ללא שגיאות מהותיות! המשך כך.</span>
      </div>
    `}

    <!-- BRITISH POLISH TIPS -->
    ${res.britishPolishes.length > 0 ? `
      <div class="british-spelling-box">
        <span style="font-weight: 700; color: var(--uk-blue);"><i class="fa-solid fa-flag"></i> טיפים לאוצר מילים ואיות בריטי:</span>
        <ul style="margin: 0.35rem 0 0 1.25rem; font-size: 0.88rem; color: var(--text-muted);">
          ${res.britishPolishes.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>
    ` : ''}
  `;

  // Bind audio for polished version
  const playAfterBtn = document.getElementById('btn-play-after-audio');
  if (playAfterBtn) {
    playAfterBtn.addEventListener('click', () => {
      speakPhrase(res.polishedVersion);
    });
  }

  // Bind audio for model answer
  const playModelBtn = document.getElementById('btn-play-model-audio');
  if (playModelBtn && res.modelAnswer) {
    playModelBtn.addEventListener('click', () => {
      speakPhrase(res.modelAnswer);
    });
  }

  // Smooth scroll
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Render Recent Writing Submissions in Sidebar
 */
function renderRecentSubmissions() {
  const listEl = document.getElementById('recent-submissions-list');
  if (!listEl) return;

  const history = getWritingHistory();
  if (history.length === 0) {
    listEl.innerHTML = `
      <div class="empty-submissions" style="text-align: center; padding: 1.5rem 0.5rem; color: var(--text-muted);">
        <i class="fa-solid fa-pen-fancy" style="font-size: 1.8rem; opacity: 0.4; margin-bottom: 0.5rem;"></i>
        <p style="margin: 0; font-size: 0.85rem;">עדיין אין חיבורים שמורים. בחר משימה והתחל לכתוב!</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = history.slice(0, 6).map(sub => {
    const d = new Date(sub.date);
    const dateStr = `${d.getDate()}/${d.getMonth() + 1}`;
    return `
      <div class="recent-sub-item">
        <div class="sub-item-header">
          <span class="sub-game-title">${sub.game}</span>
          <span class="sub-score-badge">${sub.score} pts</span>
        </div>
        <p class="sub-snippet">"${sub.userText.length > 60 ? sub.userText.slice(0, 60) + '...' : sub.userText}"</p>
        <span class="sub-date">${dateStr}</span>
      </div>
    `;
  }).join('');
}
