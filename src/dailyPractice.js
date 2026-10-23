/**
 * British English Vault - Daily Practice (Writing Lab ✍️)
 * Complete interactive English writing laboratory & gamified practice suite.
 * Features:
 * - 8 Writing Games & Challenges:
 *   1. Sentence Builder (בונה המשפטים)
 *   2. Daily Journal (יומן יומי)
 *   3. Story Challenge (אתגר הסיפורים)
 *   4. Fix My Writing (תקן את הכתיבה שלי)
 *   5. Real-Life Writing (כתיבה מהחיים)
 *   6. Word to Writing (ממילה לכתיבה)
 *   7. Expand the Sentence (הרחב את המשפט)
 *   8. Paragraph Master (מאסטר הפסקאות)
 * - XP, Streak & Level Gamification
 * - Personal Error Tracker (Verb tenses, Subject-Verb agreement, Prepositions, Spelling, etc.)
 * - Before & After Comparison with In-Depth Explanations
 * - Gradual Hints System (רמזים הדרגתיים)
 * - Date & Mode Filterable Writing History & Journal
 * - Full offline grammar & typo engine + Optional Gemini AI Review
 */

import { getGeminiApiKey } from './ai.js';
import { speakText } from './speech.js';

// STORAGE KEYS
const STORAGE_KEYS = {
  STREAK: 'bev_writing_streak',
  LAST_DATE: 'bev_writing_last_date',
  XP: 'bev_writing_xp',
  COMPLETED_COUNT: 'bev_writing_completed_count',
  HISTORY: 'bev_writing_history',
  ERROR_STATS: 'bev_writing_error_stats'
};

// ============================================================================
// COMPREHENSIVE CURRICULUM FOR THE 8 WRITING MODES
// ============================================================================
export const WRITING_MODES = [
  {
    id: 'sentence-builder',
    title: 'Sentence Builder',
    titleHe: 'בונה המשפטים',
    icon: 'fa-cubes-stacked',
    color: '#3B82F6',
    desc: 'Write a full, coherent English sentence incorporating given mandatory words.',
    descHe: 'חבר משפט תקני ומלא באנגלית המשלב את כל מילות החובה הנתונות.',
    xpReward: 25
  },
  {
    id: 'daily-journal',
    title: 'Daily Journal',
    titleHe: 'יומן יומי',
    icon: 'fa-book-bookmark',
    color: '#10B981',
    desc: 'Answer a daily thought-provoking prompt with 3-5 authentic sentences.',
    descHe: 'ענה על שאלת החשיבה היומית ב-3 עד 5 משפטים אותנטיים באנגלית.',
    xpReward: 35
  },
  {
    id: 'story-challenge',
    title: 'Story Challenge',
    titleHe: 'אתגר הסיפורים',
    icon: 'fa-wand-magic-sparkles',
    color: '#8B5CF6',
    desc: 'Read a creative opening hook and write the next section of the story.',
    descHe: 'קרא את פתיח הסיפור המסתורי וכתוב בעצמך את המשך העלילה באנגלית.',
    xpReward: 40
  },
  {
    id: 'fix-my-writing',
    title: 'Fix My Writing',
    titleHe: 'תקן את הכתיבה שלי',
    icon: 'fa-spell-check',
    color: '#EF4444',
    desc: 'Spot the grammatical traps in a flawed sentence and rewrite it flawlessly.',
    descHe: 'זהה את הטעויות הנפוצות במשפט שגוי וכתוב אותו מחדש בצורה מדויקת.',
    xpReward: 30
  },
  {
    id: 'real-life-writing',
    title: 'Real-Life Writing',
    titleHe: 'כתיבה מהחיים',
    icon: 'fa-briefcase',
    color: '#F59E0B',
    desc: 'Draft authentic emails, polite requests, inquiries, and workplace notes.',
    descHe: 'תרגל כתיבת מיילים מקצועיים, פניות מנומסות והודעות יומיומיות אמיתיות.',
    xpReward: 35
  },
  {
    id: 'word-to-writing',
    title: 'Word to Writing',
    titleHe: 'ממילה לכתיבה',
    icon: 'fa-gem',
    color: '#EC4899',
    desc: 'Master rich British vocabulary by weaving a featured term into your own sentence.',
    descHe: 'השתמש במילת מפתח בריטית עשירה במשפט מקורי בעל משמעות.',
    xpReward: 25
  },
  {
    id: 'expand-sentence',
    title: 'Expand the Sentence',
    titleHe: 'הרחב את המשפט',
    icon: 'fa-up-right-and-down-left-from-center',
    color: '#06B6D4',
    desc: 'Transform a plain, short sentence into a rich, descriptive and complex sentence.',
    descHe: 'הפוך משפט קצר ובסיסי למשפט עשיר, מפורט ומנומק עם מילות קישור.',
    xpReward: 30
  },
  {
    id: 'paragraph-master',
    title: 'Paragraph Master',
    titleHe: 'מאסטר הפסקאות',
    icon: 'fa-align-left',
    color: '#6366F1',
    desc: 'Craft a structured paragraph: Topic Sentence, Evidence/Detail, and Conclusion.',
    descHe: 'חבר פסקה מובנית היטב: משפט פתיחה, פיתוח רעיון עם דוגמה, ומשפט סיכום.',
    xpReward: 50
  }
];

export const WRITING_EXERCISES = {
  'sentence-builder': [
    {
      id: 'sb-1',
      level: 'beginner',
      words: ['always', 'morning', 'coffee'],
      prompt: 'Write a sentence using the words: "always", "morning", and "coffee".',
      promptHe: 'כתוב משפט אחד שמשתמש במילים: always, morning, coffee.',
      hints: [
        'Hint 1: Remember that frequency adverbs like "always" usually go before the main verb (e.g., "I always drink...").',
        'Hint 2: In English we say "in the morning", using the preposition "in".',
        'Hint 3: Example structure: "I always enjoy a fresh cup of coffee in the morning before starting work."'
      ],
      idealExample: 'I always drink a hot cup of coffee every morning to feel refreshed.'
    },
    {
      id: 'sb-2',
      level: 'intermediate',
      words: ['although', 'tired', 'work'],
      prompt: 'Write a sentence using the words: "although", "tired", and "work".',
      promptHe: 'כתוב משפט המשתמש במילים: although, tired, work.',
      hints: [
        'Hint 1: "Although" introduces a contrast clause (e.g., "Although she was tired...").',
        'Hint 2: Do NOT use "but" if you already started the sentence with "Although"!',
        'Hint 3: Example structure: "Although he was exhausted and tired, he continued his work until late."'
      ],
      idealExample: 'Although I was feeling very tired after the flight, I decided to finish my work.'
    },
    {
      id: 'sb-3',
      level: 'intermediate',
      words: ['despite', 'rain', 'walk'],
      prompt: 'Write a sentence using the words: "despite", "rain", and "walk".',
      promptHe: 'כתוב משפט המשתמש במילים: despite, rain, walk.',
      hints: [
        'Hint 1: "Despite" is followed by a noun phrase or gerund (e.g., "Despite the heavy rain..."), never "despite of".',
        'Hint 2: Pair with past simple: "we went for a walk" or "we walked".',
        'Hint 3: Example structure: "Despite the relentless London rain, we went for a peaceful walk in Hyde Park."'
      ],
      idealExample: 'Despite the torrential rain, we went for a lovely walk along the river Thames.'
    },
    {
      id: 'sb-4',
      level: 'advanced',
      words: ['nevertheless', 'adversity', 'succeed'],
      prompt: 'Write a sentence using the words: "nevertheless", "adversity", and "succeed".',
      promptHe: 'כתוב משפט המשתמש במילים: nevertheless, adversity, succeed.',
      hints: [
        'Hint 1: "Nevertheless" acts as a conjunctive adverb indicating "despite that" or "yet".',
        'Hint 2: Connect the challenge ("facing adversity") with the determination to succeed.',
        'Hint 3: Example structure: "The team encountered severe adversity; nevertheless, they managed to succeed against all odds."'
      ],
      idealExample: 'They faced great financial adversity during the crisis; nevertheless, their determination enabled them to succeed.'
    },
    {
      id: 'sb-5',
      level: 'advanced',
      words: ['reluctant', 'compromise', 'negotiation'],
      prompt: 'Write a sentence using the words: "reluctant", "compromise", and "negotiation".',
      promptHe: 'כתוב משפט המשתמש במילים: reluctant, compromise, negotiation.',
      hints: [
        'Hint 1: "Reluctant" means unwilling or hesitant, followed by an infinitive: "reluctant to compromise".',
        'Hint 2: Frame it within a professional context during a negotiation meeting.',
        'Hint 3: Example: "Both parties were reluctant to compromise during the high-stakes negotiation."'
      ],
      idealExample: 'Although the directors were initially reluctant to compromise, the negotiation ultimately reached a constructive resolution.'
    }
  ],

  'daily-journal': [
    {
      id: 'dj-1',
      level: 'all',
      prompt: 'What was the most memorable part of your day, and why did it stand out?',
      promptHe: 'מה היה החלק המשמעותי או המהנה ביותר ביום שלך, ומדוע הוא בלט?',
      minSentences: 3,
      hints: [
        'Sentence 1: State what the event or moment was ("The highlight of my day was...").',
        'Sentence 2: Explain who was there or what you were doing in detail.',
        'Sentence 3: Reflect on how it made you feel and why you appreciated it.'
      ],
      idealExample: 'The highlight of my day was taking an unexpected walk through the neighborhood garden during sunset. The brisk autumn air felt refreshing after spending several hours behind my desk. It reminded me how vital it is to step away from screens and enjoy quiet moments.'
    },
    {
      id: 'dj-2',
      level: 'all',
      prompt: 'Describe a skill you would love to master in the future and how it would change your life.',
      promptHe: 'תאר מיומנות שהיית רוצה לשלוט בה בעתיד, וכיצד היא תשפיע על חייך.',
      minSentences: 3,
      hints: [
        'Sentence 1: Introduce the skill (e.g. fluent English speaking, coding, public speaking).',
        'Sentence 2: Explain the main obstacles or steps needed to practice it.',
        'Sentence 3: Conclude with the opportunities and personal growth it will unlock.'
      ],
      idealExample: 'I would truly love to master British English pronunciation and natural conversational fluency. Attaining this level would allow me to express complex ideas effortlessly in international business discussions. Ultimately, it would give me immense confidence when traveling and working abroad.'
    },
    {
      id: 'dj-3',
      level: 'all',
      prompt: 'If you had a completely free weekend in London with unlimited transport, what would your ideal itinerary look like?',
      promptHe: 'אילו היה לך סוף שבוע חופשי בלונדון ללא הגבלת תחבורה, איך היה נראה המסלול המושלם שלך?',
      minSentences: 3,
      hints: [
        'Sentence 1: Morning activity (e.g. British Museum, Borough Market, breakfast in Soho).',
        'Sentence 2: Afternoon stroll or cultural landmark (e.g. Greenwich, Tate Modern, West End theatre).',
        'Sentence 3: Evening reflection or dinner in an authentic British pub.'
      ],
      idealExample: 'I would begin Saturday morning with fresh pastries and coffee at Borough Market before heading to the British Museum. In the afternoon, I would take a leisurely stroll through Covent Garden and catch a play in the West End. Finally, I would wrap up the weekend with traditional fish and chips by the Thames.'
    }
  ],

  'story-challenge': [
    {
      id: 'sc-1',
      level: 'intermediate',
      prompt: 'You wake up on a foggy Tuesday morning and discover that you can clearly understand every animal talking. What happens next?',
      promptHe: 'אתה מתעורר בבוקר ערפילי ומגלה שאתה מבין במדויק את כל שפת בעלי החיים. מה קורה עכשיו?',
      starter: 'I rubbed my eyes and heard two pigeons on my window sill having an argument...',
      minSentences: 3,
      hints: [
        'Hint 1: Describe the conversation you overheard on the window sill.',
        'Hint 2: How did you test your newfound ability as you walked outside?',
        'Hint 3: Use dynamic sensory verbs: overheard, barked, whispered, glanced, startled.'
      ],
      idealExample: 'I rubbed my eyes and heard two pigeons on my window sill having an argument over a dropped pastry crust. Shocked, I walked to the kitchen and greeted my golden retriever, who immediately replied asking for his breakfast in crisp, polite English! I realized at that moment that my ordinary life was about to become extraordinary.'
    },
    {
      id: 'sc-2',
      level: 'advanced',
      prompt: 'As the ancient grandfather clock struck 13, a hidden oak panel in the old British library swung open with a soft click...',
      promptHe: 'כששעון האורלוגין הישן צלצל 13 פעמים, דלת סתרים בספרייה העתיקה נפתחה בלחישה שקטה...',
      starter: 'I froze in place holding my teacup as dust drifted into the dim candle light...',
      minSentences: 3,
      hints: [
        'Hint 1: What did you see inside the hidden compartment? (An old leather ledger, a glowing key, a spiraling staircase?)',
        'Hint 2: Build suspense by describing the sounds and shadows.',
        'Hint 3: End with a captivating decision your character makes.'
      ],
      idealExample: 'I froze in place holding my teacup as dust drifted into the dim candle light. Behind the oak panel lay a narrow stone corridor leading downward beneath the manor. Without hesitating, I picked up the silver lantern and took my first cautious step into the darkness.'
    }
  ],

  'fix-my-writing': [
    {
      id: 'fm-1',
      level: 'beginner',
      badText: "She don't likes coffee because it make her nervous.",
      correction: "She doesn't like coffee because it makes her nervous.",
      rules: [
        "Present Simple with 'she/he/it' takes auxiliary 'does not' / 'doesn't' + base verb 'like' (not 'don't likes').",
        "Subject-Verb Agreement: 'it' takes 'makes' with an 's' ending (not 'it make')."
      ],
      hintHe: 'שים לב לשלילה עם She (משתמשים ב-doesn\'t ולא don\'t), ולפועל אחרי it (צריך להוסיף s).'
    },
    {
      id: 'fm-2',
      level: 'beginner',
      badText: "He go to London yesterday with his friend and they seen the Big Ben.",
      correction: "He went to London yesterday with his friend and they saw Big Ben.",
      rules: [
        "Past Simple tense: 'go' becomes 'went' when referring to 'yesterday'.",
        "Past Simple of 'see' is 'saw' (not 'seen', which is the past participle).",
        "Proper nouns like 'Big Ben' usually do not take the definite article 'the'."
      ],
      hintHe: 'אתמול (yesterday) מחייב זמן עבר: go הופך ל-went, וראו זה saw ולא seen.'
    },
    {
      id: 'fm-3',
      level: 'intermediate',
      badText: "I am agree with your opinion because it is make a lot of sense.",
      correction: "I agree with your opinion because it makes a lot of sense.",
      rules: [
        "'Agree' is already a main verb in English. Never say 'I am agree' — say 'I agree'.",
        "Avoid adding unnecessary 'is': say 'it makes sense', not 'it is make sense'."
      ],
      hintHe: 'באנגלית המילה agree היא פועל בפני עצמו: לא אומרים "I am agree" אלא "I agree". וכך גם "it makes sense".'
    },
    {
      id: 'fm-4',
      level: 'intermediate',
      badText: "She has been living here since five years and works as an teacher.",
      correction: "She has been living here for five years and works as a teacher.",
      rules: [
        "Use 'for' for duration (a period of five years). Use 'since' only for a specific starting point (e.g., since 2018).",
        "Use article 'a' before consonant sounds: 'a teacher' (use 'an' only before vowel sounds)."
      ],
      hintHe: 'למשך זמן (5 שנים) משתמשים ב-for ולא ב-since. ולפני המילה teacher יש להשתמש ב-a ולא an.'
    },
    {
      id: 'fm-5',
      level: 'advanced',
      badText: "Although it was heavily raining, but we still arrived on the meeting at time.",
      correction: "Although it was heavily raining, we still arrived at the meeting on time.",
      rules: [
        "Do not use 'Although' and 'but' together in the same sentence; 'although' already connects the clauses.",
        "Correct prepositions: 'arrive at a meeting' and 'on time' (punctually), not 'at time'."
      ],
      hintHe: 'אל תחבר Although ו-but יחד באותו משפט. כמו כן, מגיעים לפגישה: arrived at the meeting, ובזמן: on time.'
    }
  ],

  'real-life-writing': [
    {
      id: 'rl-1',
      level: 'intermediate',
      scenario: '✉️ Reschedule a Business Meeting',
      scenarioHe: 'בקשה מנומסת לדחיית פגישת עבודה למחר אחר הצהריים',
      prompt: 'Write a polite 3-sentence email to a colleague requesting to reschedule your catch-up to tomorrow afternoon due to an unexpected client conflict.',
      promptHe: 'כתוב אימייל מנומס של 3 משפטים לעמית/מנהל עם בקשה להזיז פגישה למחר אחר הצהריים בגלל בלת"ם עם לקוח.',
      hints: [
        'Sentence 1: Politely state the situation ("I am writing to inquire if we could reschedule our meeting...").',
        'Sentence 2: Briefly explain the reason ("An urgent client conflict has arisen today...").',
        'Sentence 3: Propose the alternative time ("Would tomorrow at 2:00 PM work for you?").'
      ],
      idealExample: 'Dear David, I am writing to ask if we could kindly reschedule our sync today due to an urgent client issue that requires my immediate attention. Would tomorrow afternoon around 3:00 PM suit your calendar? I truly apologize for any inconvenience caused and look forward to catching up then.'
    },
    {
      id: 'rl-2',
      level: 'intermediate',
      scenario: '📦 Customer Support Inquiry (Missing Parcel)',
      scenarioHe: 'פנייה מנומסת לשירות לקוחות בנוגע לחבילה שמתעכבת',
      prompt: 'Write a polite inquiry to an online store asking about an order that hasn’t arrived past its estimated delivery date, providing order reference #UK-4891.',
      promptHe: 'כתוב פנייה לשירות לקוחות על הזמנה שלא הגיעה, תוך ציון מספר הזמנה #UK-4891.',
      hints: [
        'Mention order number #UK-4891 clearly.',
        'State the expected arrival date politely.',
        'Ask for an updated tracking status or estimated arrival time.'
      ],
      idealExample: 'Hello Support Team, I am reaching out regarding order #UK-4891, which was scheduled to arrive by last Friday. According to the tracking portal, the status has not updated for three days. Could you please look into this and provide an estimated delivery timeline? Thank you for your assistance.'
    },
    {
      id: 'rl-3',
      level: 'advanced',
      scenario: '🤝 Professional LinkedIn Networking Message',
      scenarioHe: 'הודעת פנייה מקצועית ב-LinkedIn לאחר קריאת מאמר או פוסט מרתק',
      prompt: 'Write a concise, professional LinkedIn note introducing yourself to an industry peer after enjoying their recent post on modern software engineering.',
      promptHe: 'כתוב הודעת היכרות קצרה ומנומסת ב-LinkedIn לקולגה מהתחום בעקבות פוסט מעניין שפרסם.',
      hints: [
        'Complement the specific insight in their post.',
        'State your role or mutual interest concisely.',
        'End with an open, non-demanding connection request.'
      ],
      idealExample: 'Hi Sarah, I thoroughly enjoyed your recent article regarding scalable microservices and found your perspective on observability truly insightful. As a software engineer working with similar architectures, I would love to connect and follow your upcoming work here on LinkedIn. Best regards.'
    }
  ],

  'word-to-writing': [
    {
      id: 'ww-1',
      word: 'reluctant',
      phonetic: '/rɪˈlʌk.tənt/',
      partOfSpeech: 'adjective',
      definition: 'Unwilling and hesitant; disinclined to do something.',
      definitionHe: 'מהסס, מסויג, אינו שש לעשות דבר מה.',
      exampleSentence: 'He was reluctant to admit his mistake in front of the board.',
      prompt: 'Write an authentic sentence using the word "reluctant".',
      promptHe: 'כתוב משפט מקורי משלך באנגלית המשתמש במילה "reluctant".',
      hints: [
        'Common collocation: "reluctant to [verb]" or "felt reluctant about [noun]".',
        'Use it to describe hesitation before taking a risk or changing plans.'
      ],
      idealExample: 'She felt very reluctant to sign the agreement without consulting her lawyer first.'
    },
    {
      id: 'ww-2',
      word: 'chuffed',
      phonetic: '/tʃʌft/',
      partOfSpeech: 'adjective (British slang)',
      definition: 'Very pleased, proud, and delighted with an outcome.',
      definitionHe: 'שמח ומבסוט מאוד, גאה בהישג (סלנג בריטי קלאסי).',
      exampleSentence: 'I was absolutely chuffed to bits when I received the promotion letter.',
      prompt: 'Write a lively sentence using the British adjective "chuffed".',
      promptHe: 'כתוב משפט בריטי חי המשתמש במילה "chuffed".',
      hints: [
        'Often paired with adverbs: "absolutely chuffed", "proper chuffed", or "chuffed to bits".',
        'Express personal pride or joy about good news or exam results.'
      ],
      idealExample: 'I was absolutely chuffed when my team won the regional debate competition.'
    },
    {
      id: 'ww-3',
      word: 'meticulous',
      phonetic: '/məˈtɪk.jə.ləs/',
      partOfSpeech: 'adjective',
      definition: 'Showing great attention to detail; very careful, precise and thorough.',
      definitionHe: 'קפדן, דקדקן, יורד לפרטי פרטים בדיוק מרבי.',
      exampleSentence: 'Her meticulous planning ensured that the royal gala ran without a hitch.',
      prompt: 'Write a descriptive sentence using the word "meticulous".',
      promptHe: 'כתוב משפט עשיר המשתמש במילה "meticulous".',
      hints: [
        'Often describes work habits: "meticulous research", "meticulous attention to detail".'
      ],
      idealExample: 'The architect demonstrated meticulous attention to detail while restoring the historic Victorian building.'
    },
    {
      id: 'ww-4',
      word: 'resilient',
      phonetic: '/rɪˈzɪl.jənt/',
      partOfSpeech: 'adjective',
      definition: 'Able to withstand or recover quickly from difficult conditions.',
      definitionHe: 'בעל חוסן נפשי או פיזי, מתאושש במהירות ממשברים.',
      exampleSentence: 'The community remained resilient throughout the challenging winter.',
      prompt: 'Write an inspiring sentence using the word "resilient".',
      promptHe: 'כתוב משפט המשתמש במילה "resilient".',
      hints: [
        'Describe people, nature, or organizations adapting successfully to hardships.'
      ],
      idealExample: 'Despite encountering numerous startup setbacks, the founders proved remarkably resilient and eventually built a thriving company.'
    }
  ],

  'expand-sentence': [
    {
      id: 'es-1',
      level: 'beginner',
      baseSentence: 'I went home.',
      baseSentenceHe: 'הלכתי הביתה.',
      targetGoal: 'Expand this sentence by adding: WHEN it happened, HOW you traveled, and the REASON why.',
      targetGoalHe: 'הרחב את המשפט: מתי זה קרה, איך נסעת, ומה הסיבה לכך.',
      minWords: 10,
      hints: [
        'Use time phrase: "Yesterday afternoon..." or "Last night around 10 PM..."',
        'Use transport: "...by bicycle", "...on foot", "...via the tube"',
        'Use connector: "...because I was feeling exhausted after an intense workout."'
      ],
      idealExample: 'Yesterday evening I went home on the London Underground earlier than usual because a massive rainstorm was approaching.'
    },
    {
      id: 'es-2',
      level: 'intermediate',
      baseSentence: 'She bought a book.',
      baseSentenceHe: 'היא קנתה ספר.',
      targetGoal: 'Expand this sentence by detailing: WHICH genre/title, WHERE she discovered it, and WHY it captivated her.',
      targetGoalHe: 'הרחב את המשפט: איזה ז\'אנר, היכן היא מצאה אותו, ומדוע הוא עורר את סקרנותה.',
      minWords: 12,
      hints: [
        'Name the venue: "in an old vintage bookshop in Bloomsbury"',
        'Describe the book: "a rare illustrated novel on British history"',
        'Add the motivation: "...which her professor had warmly recommended."'
      ],
      idealExample: 'While exploring a quaint vintage bookshop in Covent Garden, she bought an antique hardcover book on British folklore that she had been searching for all year.'
    },
    {
      id: 'es-3',
      level: 'advanced',
      baseSentence: 'The train arrived.',
      baseSentenceHe: 'הרכבת הגיעה.',
      targetGoal: 'Transform this into a vivid cinematic sentence by detailing weather, platform atmosphere, and passenger reactions.',
      targetGoalHe: 'הפוך למשפט תיאורי עשיר עם מזג אוויר, אווירת הרציף ותגובת הנוסעים.',
      minWords: 14,
      hints: [
        'Use descriptive adjectives: "shimmering tracks", "crowded platform", "relieved commuters".'
      ],
      idealExample: 'Amid the swirling mist and chilly evening breeze, the express train finally arrived at platform four, bringing a collective sigh of relief to the shivering commuters.'
    }
  ],

  'paragraph-master': [
    {
      id: 'pm-1',
      level: 'intermediate',
      topic: 'Why learning the English language opens global opportunities.',
      topicHe: 'מדוע שליטה בשפה האנגלית פותחת דלתות והזדמנויות בינלאומיות.',
      structureGuide: [
        '1. Topic Sentence: State clearly that English is the universal bridge for international growth.',
        '2. Supporting Evidence: Mention career advantages, technology access, and cross-border collaboration.',
        '3. Concluding Thought: Summarize the lifelong impact of fluency on personal freedom.'
      ],
      minSentences: 3,
      minWords: 35,
      hints: [
        'Useful connectors: "Furthermore,", "In addition,", "For instance,", "Ultimately,".',
        'Aim for smooth transitions between thoughts.'
      ],
      idealExample: 'Mastering the English language serves as a vital bridge to boundless personal and professional opportunities around the world. In today’s interconnected economy, fluency enables professionals to collaborate seamlessly with international teams and access cutting-edge research across technology and science. Furthermore, communicating effortlessly in English boosts personal travel confidence and cultural empathy. Ultimately, dedicating time to learn English is one of the most rewarding investments one can make for their future.'
    },
    {
      id: 'pm-2',
      level: 'advanced',
      topic: 'City Life in London vs. Quiet Countryside Living in the Cotswolds.',
      topicHe: 'השוואה בין החיים התוססים בלונדון לבין השלווה בכפרים האנגליים.',
      structureGuide: [
        '1. Topic Sentence: Contrast the vibrant energy of London with the serene beauty of the countryside.',
        '2. Supporting Comparison: Discuss pace of life, cultural scenes versus green open spaces and calm.',
        '3. Concluding Sentence: Reflect on which lifestyle resonates best with your personal personality.'
      ],
      minSentences: 3,
      minWords: 40,
      hints: [
        'Use contrast linkers: "Whereas", "On the other hand", "Conversely", "While London offers...".'
      ],
      idealExample: 'Choosing between the electric pulse of London and the pastoral peace of the English countryside represents two completely contrasting lifestyles. While London thrills residents with world-class museums, diverse culinary scenes, and round-the-clock cultural energy, the sheer pace can occasionally feel overwhelming. Conversely, living in a peaceful village like the Cotswolds offers unhurried mornings, crisp fresh air, and tight-knit community warmth. Ultimately, while both settings have immense charm, the ideal choice hinges on whether one craves dynamic career stimulation or restorative tranquility.'
    }
  ]
};

// ============================================================================
// STATE MANAGEMENT & PERSISTENCE
// ============================================================================
let activeMode = 'sentence-builder';
let currentExerciseIndex = 0;
let activeLevelFilter = 'all'; // 'all', 'beginner', 'intermediate', 'advanced'
let activeSubTab = 'challenges'; // 'challenges', 'history', 'error-tracker'
let hintStage = 0; // 0: none, 1, 2, 3
let lastCheckedFeedback = null;

export function getWritingStreak() {
  const streak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '0', 10);
  const lastDate = localStorage.getItem(STORAGE_KEYS.LAST_DATE);
  if (!lastDate) return 0;

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (lastDate === today) return streak;
  if (lastDate === yesterday) return streak;
  
  // Stale streak (missed more than a day)
  return 0;
}

export function recordWritingSessionSuccess(xpEarned = 25) {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const lastDate = localStorage.getItem(STORAGE_KEYS.LAST_DATE);
  let streak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '0', 10);

  if (lastDate === today) {
    // Already maintained today
  } else if (lastDate === yesterday) {
    streak += 1;
  } else {
    streak = 1;
  }

  localStorage.setItem(STORAGE_KEYS.STREAK, streak.toString());
  localStorage.setItem(STORAGE_KEYS.LAST_DATE, today);

  // Update XP
  const currentXP = parseInt(localStorage.getItem(STORAGE_KEYS.XP) || '0', 10);
  const newXP = currentXP + xpEarned;
  localStorage.setItem(STORAGE_KEYS.XP, newXP.toString());

  // Update Completed count
  const completed = parseInt(localStorage.getItem(STORAGE_KEYS.COMPLETED_COUNT) || '0', 10) + 1;
  localStorage.setItem(STORAGE_KEYS.COMPLETED_COUNT, completed.toString());

  return { streak, newXP, completed };
}

export function getWritingHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]');
  } catch (e) {
    return [];
  }
}

export function saveWritingHistoryItem(entry) {
  const history = getWritingHistory();
  history.unshift({
    id: 'w_' + Date.now(),
    timestamp: new Date().toISOString(),
    ...entry
  });
  // Keep last 100 entries
  if (history.length > 100) history.pop();
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
}

export function getErrorStats() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ERROR_STATS) || '{}');
  } catch (e) {
    return {};
  }
}

export function recordDetectedErrors(errorList) {
  if (!errorList || !errorList.length) return;
  const stats = getErrorStats();
  errorList.forEach(err => {
    const cat = err.category || 'General Grammar';
    stats[cat] = (stats[cat] || 0) + 1;
  });
  localStorage.setItem(STORAGE_KEYS.ERROR_STATS, JSON.stringify(stats));
}

// ============================================================================
// DEEP CLIENT-SIDE GRAMMAR & TYPO AUDITING ENGINE
// ============================================================================
export function auditWritingSubmission(text, exercise) {
  const errors = [];
  const suggestions = [];
  const strengths = [];

  const cleanText = (text || '').trim();
  const words = cleanText.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  if (wordCount === 0) {
    return {
      isValid: false,
      score: 0,
      errors: [{ category: 'Empty Submission', issue: 'Please write your response in English.', rule: 'Text cannot be blank.' }],
      suggestions: ['Type your thoughts into the box above.'],
      strengths: [],
      polishedText: ''
    };
  }

  // 1. Mandatory Words Check (for Sentence Builder / Word to Writing)
  if (exercise.words && exercise.words.length > 0) {
    const missingWords = [];
    exercise.words.forEach(w => {
      const stem = w.toLowerCase().replace(/ing$|ed$|s$|es$/g, '');
      const regex = new RegExp(`\\b${stem}`, 'i');
      if (!regex.test(cleanText)) {
        missingWords.push(w);
      }
    });

    if (missingWords.length > 0) {
      errors.push({
        category: 'Missing Target Words',
        issue: `Missing required words: "${missingWords.join('", "')}".`,
        rule: 'The exercise requires you to use all specified words in your sentence.'
      });
    } else {
      strengths.push(`✨ Excellent! Successfully incorporated all target words: [${exercise.words.join(', ')}].`);
    }
  }

  if (exercise.word) {
    const stem = exercise.word.toLowerCase().replace(/ing$|ed$|s$|es$/g, '');
    const regex = new RegExp(`\\b${stem}`, 'i');
    if (!regex.test(cleanText)) {
      errors.push({
        category: 'Missing Target Word',
        issue: `The target word "${exercise.word}" was not found in your sentence.`,
        rule: `Make sure to include "${exercise.word}" in your text.`
      });
    } else {
      strengths.push(`🎯 Great job weaving the target word "${exercise.word}" into your writing!`);
    }
  }

  // 2. Minimum Sentences / Words check
  const sentences = cleanText.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  if (exercise.minSentences && sentences.length < exercise.minSentences) {
    errors.push({
      category: 'Length / Sentence Count',
      issue: `You wrote ${sentences.length} sentence(s), but the prompt requested at least ${exercise.minSentences}.`,
      rule: 'Expand your ideas with additional supporting sentences or explanations.'
    });
  }

  if (exercise.minWords && wordCount < exercise.minWords) {
    errors.push({
      category: 'Word Count',
      issue: `Current word count is ${wordCount}. Aim for at least ${exercise.minWords} words to fully express the idea.`,
      rule: 'Add more descriptive adjectives, reasons, and sensory details.'
    });
  }

  // 3. Subject-Verb Agreement checks
  const agreementPatterns = [
    { regex: /\b(he|she|it)\s+(don't|dont)\b/i, category: 'Subject-Verb Agreement', issue: 'Use "doesn\'t" instead of "don\'t" with he/she/it.', rule: 'In third-person singular (he/she/it), the negative auxiliary is "does not" or "doesn\'t".' },
    { regex: /\b(he|she|it)\s+(have)\b/i, category: 'Subject-Verb Agreement', issue: 'Use "has" instead of "have" with he/she/it.', rule: 'Third-person singular takes "has".' },
    { regex: /\b(they|we|you)\s+(is|was)\b/i, category: 'Subject-Verb Agreement', issue: 'Use plural verbs "are" or "were" with they/we/you.', rule: 'Plural subjects must agree with plural verbs.' },
    { regex: /\b(he|she|it)\s+(go|like|want|need|make|take|know|think)\b/i, category: 'Subject-Verb Agreement', issue: 'Missing third-person "-s" ending in Present Simple.', rule: 'In present simple, add -s or -es to verbs with he/she/it (e.g. "he goes", "she likes").' },
    { regex: /\b(there)\s+is\s+([0-9]+|many|several|multiple|a\s+lot\s+of)\s+([a-z]+s)\b/i, category: 'Subject-Verb Agreement', issue: 'Use "there are" before plural nouns, not "there is".', rule: 'Existential "there are" precedes plural entities.' }
  ];

  agreementPatterns.forEach(pat => {
    if (pat.regex.test(cleanText)) {
      errors.push({
        category: pat.category,
        issue: pat.issue,
        rule: pat.rule
      });
    }
  });

  // 4. Common Verbs & Idiomatic Traps
  const idiomTraps = [
    { regex: /\bi\s+am\s+agree\b/i, category: 'Grammar Trap', issue: 'Say "I agree", not "I am agree".', rule: '"Agree" is an active verb in English; it does not take the auxiliary "am".' },
    { regex: /\bmarried\s+with\b/i, category: 'Preposition Error', issue: 'Say "married to", not "married with".', rule: 'In English one is married "to" someone.' },
    { regex: /\blisten\s+([a-z]+)\b/i, test: /\blisten\s+(the|music|her|him|to)\b/i, exception: /\blisten\s+to\b/i, category: 'Preposition Error', issue: 'Remember that "listen" usually requires preposition "to" ("listen to music").', rule: '"Listen" takes the preposition "to" before an object.' },
    { regex: /\barrive\s+to\b/i, category: 'Preposition Error', issue: 'Use "arrive at" (for places/events) or "arrive in" (for cities/countries), not "arrive to".', rule: '"Arrive" pairs with "at" or "in", never "to".' },
    { regex: /\blook\s+forward\s+to\s+([a-z]+)(?!ing)\b/i, category: 'Gerund after Preposition', issue: 'Say "look forward to + -ing" (e.g., "look forward to seeing/hearing from you").', rule: '"To" here is a preposition, followed by a gerund noun phrase.' },
    { regex: /\bdespite\s+of\b/i, category: 'Preposition Trap', issue: 'Say "despite" alone (or "in spite of"), but never "despite of".', rule: '"Despite" does not take "of".' },
    { regex: /\balthough\b.*\bbut\b/i, category: 'Conjunction Redundancy', issue: 'Do not combine "Although" and "but" in the same sentence.', rule: 'Both express contrast; using both in one sentence creates grammatical conflict.' }
  ];

  idiomTraps.forEach(trap => {
    if (trap.regex.test(cleanText)) {
      if (trap.exception && trap.exception.test(cleanText)) return;
      errors.push({
        category: trap.category,
        issue: trap.issue,
        rule: trap.rule
      });
    }
  });

  // 5. Article Misuse (a vs an)
  const articleRegexAnBeforeConsonant = /\ban\s+([bcdfghjklmnpqrstvwxyz][a-z]+)\b/i;
  const articleRegexABeforeVowel = /\ba\s+([aeiou][a-z]+)\b/i;

  const matchAn = cleanText.match(articleRegexAnBeforeConsonant);
  if (matchAn && !/hour|honest|honor/i.test(matchAn[1])) {
    errors.push({
      category: 'Article Misuse (a / an)',
      issue: `Use "a" instead of "an" before consonant sounds: "a ${matchAn[1]}".`,
      rule: '"A" is used before words beginning with a consonant sound.'
    });
  }

  const matchA = cleanText.match(articleRegexABeforeVowel);
  if (matchA && !/university|unique|uniform|european|user/i.test(matchA[1])) {
    errors.push({
      category: 'Article Misuse (a / an)',
      issue: `Use "an" instead of "a" before vowel sounds: "an ${matchA[1]}".`,
      rule: '"An" is used before words starting with vowel sounds (a, e, i, o, u).'
    });
  }

  // 6. Capitalization & Punctuation
  if (/^[a-z]/.test(cleanText)) {
    errors.push({
      category: 'Capitalization',
      issue: 'The first letter of your sentence should be capitalized.',
      rule: 'Every English sentence begins with an uppercase letter.'
    });
  }

  if (/\b(i)\b/.test(cleanText)) {
    errors.push({
      category: 'Capitalization',
      issue: 'The personal pronoun "I" must always be written in uppercase.',
      rule: 'In English, the pronoun "I" is universally capitalized.'
    });
  }

  if (!/[.!?]$/.test(cleanText)) {
    errors.push({
      category: 'Punctuation',
      issue: 'Missing terminal punctuation (period, question mark, or exclamation point).',
      rule: 'Every complete English sentence terminates with punctuation.'
    });
  }

  // 7. Common Typos & Spelling Mistakes
  const typoDict = {
    'definately': 'definitely',
    'seperate': 'separate',
    'untill': 'until',
    'goverment': 'government',
    'recieve': 'receive',
    'beleive': 'believe',
    'wich': 'which',
    'becuase': 'because',
    'neccessary': 'necessary',
    'occured': 'occurred',
    'alot': 'a lot',
    'tommorow': 'tomorrow',
    'enviroment': 'environment',
    'truely': 'truly',
    'intresting': 'interesting'
  };

  Object.entries(typoDict).forEach(([typo, fix]) => {
    const typoRegex = new RegExp(`\\b${typo}\\b`, 'i');
    if (typoRegex.test(cleanText)) {
      errors.push({
        category: 'Spelling & Typo',
        issue: `Spelling mistake: "${typo}" should be "${fix}".`,
        rule: `Correct spelling is "${fix}".`
      });
    }
  });

  // Calculate Strengths
  if (wordCount >= 15) {
    strengths.push(`Rich sentence length (${wordCount} words) showcasing natural descriptive ability.`);
  }
  if (/(furthermore|however|consequently|therefore|moreover|nevertheless|because|although|despite)/i.test(cleanText)) {
    strengths.push('Great use of cohesive conjunctions and transitional linkers!');
  }
  if (errors.length === 0) {
    strengths.push('Flawless grammar! No structural, punctuation, or spelling errors detected.');
  }

  // Polish Text (automatic intelligent clean up)
  let polished = cleanText;
  // Capitalize first letter
  polished = polished.charAt(0).toUpperCase() + polished.slice(1);
  // Capitalize isolated 'i'
  polished = polished.replace(/\bi\b/g, 'I');
  // Fix common typos
  Object.entries(typoDict).forEach(([typo, fix]) => {
    polished = polished.replace(new RegExp(`\\b${typo}\\b`, 'gi'), fix);
  });
  // Fix common grammar errors
  polished = polished.replace(/\b(she|he|it)\s+(don't|dont)\b/gi, '$1 doesn\'t');
  polished = polished.replace(/\bI\s+am\s+agree\b/gi, 'I agree');
  polished = polished.replace(/\bmarried\s+with\b/gi, 'married to');
  polished = polished.replace(/\bdespite\s+of\b/gi, 'despite');
  if (!/[.!?]$/.test(polished)) polished += '.';

  // Calculate Score (100 minus errors)
  const score = Math.max(20, Math.min(100, 100 - (errors.length * 15)));

  return {
    isValid: errors.length === 0,
    score,
    errors,
    suggestions,
    strengths,
    polishedText: polished
  };
}

// ============================================================================
// UI RENDERING & CONTROLLER
// ============================================================================

export function initDailyPracticeUI() {
  const container = document.getElementById('view-daily-practice');
  if (!container) return;

  renderDailyPracticeLayout(container);
  bindDailyPracticeEvents(container);
  updateStatsHeader();
}

function renderDailyPracticeLayout(container) {
  const streak = getWritingStreak();
  const xp = parseInt(localStorage.getItem(STORAGE_KEYS.XP) || '0', 10);
  const completed = parseInt(localStorage.getItem(STORAGE_KEYS.COMPLETED_COUNT) || '0', 10);

  container.innerHTML = `
    <!-- Top Hero Banner -->
    <div class="card daily-practice-hero" style="background: linear-gradient(135deg, rgba(0,36,125,0.06), rgba(212,175,55,0.12)); border: 1px solid var(--border-color); border-radius: 16px; padding: 1.5rem 1.8rem; margin-bottom: 1.5rem; position: relative; overflow: hidden;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(212,175,55,0.15); color: var(--gold-dark, #A6801C); font-weight: 700; font-size: 0.8rem; padding: 0.3rem 0.8rem; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.6rem;">
            <i class="fa-solid fa-pen-nib"></i> Daily Practice
          </div>
          <h1 style="margin: 0 0 0.4rem 0; font-size: 1.85rem; font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 0.6rem;">
            Writing Lab ✍️ <span style="font-size: 1rem; font-weight: 500; color: var(--text-muted);">(מעבדה לכתיבה באנגלית)</span>
          </h1>
          <p style="margin: 0; color: var(--text-muted); font-size: 0.95rem; max-width: 650px; line-height: 1.5;">
            למד לכתוב באנגלית בעצמך — לא רק לזהות מילים או לבחור תשובות, אלא להביע רעיונות ולחבר משפטים תקניים ועשירים באנגלית בריטית.
          </p>
        </div>

        <!-- Quick Stats Badges -->
        <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
          <div class="stat-pill-badge" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 0.6rem 1rem; text-align: center; min-width: 90px; box-shadow: var(--card-shadow);">
            <div style="font-size: 1.2rem; font-weight: 800; color: #EF4444;" id="ui-writing-streak">
              🔥 ${streak} <span style="font-size: 0.75rem; font-weight: 600;">Days</span>
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Streak</div>
          </div>
          <div class="stat-pill-badge" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 0.6rem 1rem; text-align: center; min-width: 90px; box-shadow: var(--card-shadow);">
            <div style="font-size: 1.2rem; font-weight: 800; color: var(--gold-dark, #D4AF37);" id="ui-writing-xp">
              ⚡ ${xp} <span style="font-size: 0.75rem; font-weight: 600;">XP</span>
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Writing XP</div>
          </div>
          <div class="stat-pill-badge" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 0.6rem 1rem; text-align: center; min-width: 90px; box-shadow: var(--card-shadow);">
            <div style="font-size: 1.2rem; font-weight: 800; color: #10B981;" id="ui-writing-completed">
              📝 ${completed}
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Completed</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs (Challenges / History / Error Tracker) -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--border-color); margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.8rem;">
      <div style="display: flex; gap: 0.5rem;" id="practice-subtab-bar">
        <button type="button" class="btn-subtab active" data-subtab="challenges" style="padding: 0.6rem 1.1rem; border: none; background: transparent; font-weight: 700; color: var(--uk-blue); border-bottom: 3px solid var(--uk-blue); border-radius: 4px 4px 0 0; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-gamepad"></i> <span>Writing Challenges (8 Games)</span>
        </button>
        <button type="button" class="btn-subtab" data-subtab="history" style="padding: 0.6rem 1.1rem; border: none; background: transparent; font-weight: 600; color: var(--text-muted); border-bottom: 3px solid transparent; border-radius: 4px 4px 0 0; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-clock-rotate-left"></i> <span>My Writing History & Journal</span>
        </button>
        <button type="button" class="btn-subtab" data-subtab="error-tracker" style="padding: 0.6rem 1.1rem; border: none; background: transparent; font-weight: 600; color: var(--text-muted); border-bottom: 3px solid transparent; border-radius: 4px 4px 0 0; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-chart-pie"></i> <span>Personal Error Tracker</span>
        </button>
      </div>

      <!-- Difficulty Level Pill Selector -->
      <div id="level-pill-container" style="display: flex; gap: 0.3rem; background: var(--input-bg); padding: 0.25rem; border-radius: 20px; border: 1px solid var(--border-color);">
        <button type="button" class="btn-level-filter active" data-level="all" style="border: none; background: var(--card-bg); color: var(--text-main); font-size: 0.78rem; font-weight: 700; padding: 0.3rem 0.75rem; border-radius: 15px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">All Levels</button>
        <button type="button" class="btn-level-filter" data-level="beginner" style="border: none; background: transparent; color: var(--text-muted); font-size: 0.78rem; font-weight: 600; padding: 0.3rem 0.75rem; border-radius: 15px; cursor: pointer;">🌱 Beginner</button>
        <button type="button" class="btn-level-filter" data-level="intermediate" style="border: none; background: transparent; color: var(--text-muted); font-size: 0.78rem; font-weight: 600; padding: 0.3rem 0.75rem; border-radius: 15px; cursor: pointer;">🌿 Intermediate</button>
        <button type="button" class="btn-level-filter" data-level="advanced" style="border: none; background: transparent; color: var(--text-muted); font-size: 0.78rem; font-weight: 600; padding: 0.3rem 0.75rem; border-radius: 15px; cursor: pointer;">🌲 Advanced</button>
      </div>
    </div>

    <!-- SUB-VIEW CONTAINER -->
    <div id="practice-subview-content">
      <!-- Loaded dynamically via renderCurrentSubTab() -->
    </div>
  `;

  renderCurrentSubTab();
}

function renderCurrentSubTab() {
  const container = document.getElementById('practice-subview-content');
  if (!container) return;

  if (activeSubTab === 'challenges') {
    renderChallengesView(container);
  } else if (activeSubTab === 'history') {
    renderHistoryView(container);
  } else if (activeSubTab === 'error-tracker') {
    renderErrorTrackerView(container);
  }
}

// ============================================================================
// 1. CHALLENGES VIEW: 8 MODES GRID & ACTIVE WORKBENCH
// ============================================================================
function renderChallengesView(container) {
  const currentModeObj = WRITING_MODES.find(m => m.id === activeMode) || WRITING_MODES[0];
  const exerciseList = getFilteredExerciseList(activeMode);
  const currentEx = exerciseList[currentExerciseIndex % exerciseList.length];

  container.innerHTML = `
    <!-- Top 8 Modes Selector Bar -->
    <div style="margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
        <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: var(--text-main); display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-shapes" style="color: var(--gold);"></i> Select a Writing Mode:
        </h3>
        <span style="font-size: 0.82rem; color: var(--text-muted);">8 Practice Games Available</span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 0.8rem;" id="writing-modes-grid">
        ${WRITING_MODES.map(mode => {
          const isActive = mode.id === activeMode;
          return `
            <div class="writing-mode-card ${isActive ? 'active-mode' : ''}" data-mode-id="${mode.id}" style="
              background: var(--card-bg);
              border: 2px solid ${isActive ? mode.color : 'var(--border-color)'};
              border-radius: 12px;
              padding: 0.9rem 1rem;
              cursor: pointer;
              transition: all 0.2s ease;
              box-shadow: ${isActive ? '0 6px 20px rgba(0,0,0,0.08)' : 'var(--card-shadow)'};
              display: flex;
              align-items: flex-start;
              gap: 0.8rem;
              position: relative;
            ">
              <div style="
                width: 38px;
                height: 38px;
                border-radius: 10px;
                background: ${mode.color}15;
                color: ${mode.color};
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.1rem;
                flex-shrink: 0;
              ">
                <i class="fa-solid ${mode.icon}"></i>
              </div>
              <div style="flex: 1; min-width: 0;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.2rem;">
                  <strong style="font-size: 0.95rem; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${mode.title}</strong>
                  <span style="font-size: 0.7rem; font-weight: 700; color: #10B981; background: #10B98115; padding: 0.15rem 0.4rem; border-radius: 8px;">+${mode.xpReward} XP</span>
                </div>
                <div style="font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.3rem;">${mode.titleHe}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                  ${mode.descHe}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Active Writing Exercise Workbench -->
    <div class="card active-workbench-card" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 16px; padding: 1.5rem; box-shadow: var(--card-shadow); margin-bottom: 2rem;">
      ${renderExerciseWorkbench(currentModeObj, currentEx, exerciseList.length)}
    </div>
  `;

  bindWorkbenchEvents(container);
}

function getFilteredExerciseList(modeId) {
  const list = WRITING_EXERCISES[modeId] || [];
  if (activeLevelFilter === 'all') return list;
  const filtered = list.filter(item => !item.level || item.level === 'all' || item.level === activeLevelFilter);
  return filtered.length > 0 ? filtered : list;
}

function renderExerciseWorkbench(mode, exercise, totalAvailable) {
  if (!exercise) {
    return `<div style="text-align: center; padding: 2rem;">No exercises found for this level. Try selecting "All Levels".</div>`;
  }

  return `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.8rem;">
      <div style="display: flex; align-items: center; gap: 0.8rem;">
        <span style="width: 32px; height: 32px; border-radius: 8px; background: ${mode.color}20; color: ${mode.color}; display: flex; align-items: center; justify-content: center; font-size: 1rem;">
          <i class="fa-solid ${mode.icon}"></i>
        </span>
        <div>
          <h2 style="margin: 0; font-size: 1.3rem; font-weight: 800; color: var(--text-main);">
            ${mode.title} <span style="font-size: 0.95rem; font-weight: 500; color: var(--text-muted);">(${mode.titleHe})</span>
          </h2>
          <div style="font-size: 0.8rem; color: var(--text-muted);">
            Challenge ${(currentExerciseIndex % totalAvailable) + 1} of ${totalAvailable}
            ${exercise.level ? `• <span style="text-transform: capitalize; font-weight: 700; color: var(--uk-blue);">${exercise.level}</span>` : ''}
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 0.5rem;">
        <button type="button" id="btn-next-prompt" class="btn btn-secondary btn-sm" style="display: flex; align-items: center; gap: 0.4rem;">
          <i class="fa-solid fa-shuffle"></i> <span>Next Prompt</span>
        </button>
      </div>
    </div>

    <!-- Prompt / Challenge Box -->
    <div style="background: var(--input-bg); border-left: 4px solid ${mode.color}; border-radius: 0 12px 12px 0; padding: 1.2rem 1.4rem; margin-bottom: 1.2rem;">
      ${renderExercisePromptContent(mode.id, exercise)}
    </div>

    <!-- Mandatory Words / Target Badges -->
    ${exercise.words ? `
      <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
        <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">Mandatory Words:</span>
        ${exercise.words.map(w => `
          <span class="badge-target-word" data-word="${w.toLowerCase()}" style="background: rgba(59,130,246,0.12); color: #2563EB; border: 1px solid rgba(59,130,246,0.3); font-weight: 700; font-size: 0.82rem; padding: 0.25rem 0.65rem; border-radius: 20px;">
            <i class="fa-solid fa-circle-dot" style="font-size: 0.6rem; margin-right: 0.3rem;"></i> ${w}
          </span>
        `).join('')}
      </div>
    ` : ''}

    ${exercise.word ? `
      <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
        <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">Target Vocabulary:</span>
        <span class="badge-target-word" data-word="${exercise.word.toLowerCase()}" style="background: rgba(236,72,153,0.12); color: #DB2777; border: 1px solid rgba(236,72,153,0.3); font-weight: 800; font-size: 0.88rem; padding: 0.3rem 0.8rem; border-radius: 20px; display: inline-flex; align-items: center; gap: 0.4rem;">
          <i class="fa-solid fa-gem"></i> ${exercise.word}
        </span>
        <button type="button" id="btn-audio-prompt-word" class="icon-btn" style="width: 32px; height: 32px;" title="Listen to pronunciation">
          <i class="fa-solid fa-volume-high" style="color: var(--uk-blue);"></i>
        </button>
      </div>
    ` : ''}

    <!-- Gradual Hints Banner (רמזים הדרגתיים) -->
    <div style="margin-bottom: 1.2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <button type="button" id="btn-reveal-hint" class="btn btn-secondary btn-sm" style="font-size: 0.8rem; padding: 0.35rem 0.8rem; border-radius: 12px; display: flex; align-items: center; gap: 0.4rem;">
          <i class="fa-solid fa-lightbulb" style="color: var(--gold);"></i>
          <span>${hintStage === 0 ? 'Need a hint? (רמז הדרגתי 💡)' : `Next Hint (${hintStage}/${exercise.hints ? exercise.hints.length : 1})`}</span>
        </button>
        ${hintStage > 0 ? `<span style="font-size: 0.75rem; color: var(--text-muted);">Hint unlocked</span>` : ''}
      </div>

      <div id="hints-display-area" style="margin-top: 0.6rem;">
        ${renderHintsBox(exercise)}
      </div>
    </div>

    <!-- Writing Input Textarea Area -->
    <div style="margin-bottom: 1rem; position: relative;">
      <label for="practice-textarea" style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.4rem;">
        <span>✍️ Write your English response:</span>
        <span id="char-word-counter" style="font-weight: 500; color: var(--text-muted);">0 words • 0 characters</span>
      </label>
      <textarea id="practice-textarea" rows="4" placeholder="${getPlaceholderForMode(mode.id, exercise)}" style="
        width: 100%;
        box-sizing: border-box;
        padding: 1rem 1.2rem;
        font-family: inherit;
        font-size: 1.05rem;
        line-height: 1.6;
        border-radius: 12px;
        border: 2px solid var(--border-color);
        background: var(--input-bg);
        color: var(--text-main);
        outline: none;
        resize: vertical;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      "></textarea>
    </div>

    <!-- Action Buttons -->
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem;">
      <div style="display: flex; gap: 0.6rem; align-items: center;">
        <button type="button" id="btn-check-writing" class="btn btn-primary" style="font-size: 0.95rem; font-weight: 700; padding: 0.65rem 1.4rem; display: flex; align-items: center; gap: 0.5rem; background: var(--gold-dark, #D4AF37); border-color: var(--gold-dark, #D4AF37);">
          <i class="fa-solid fa-magnifying-glass-check"></i> <span>Check My Writing & Feedback</span>
        </button>

        ${getGeminiApiKey() ? `
          <button type="button" id="btn-ai-polish" class="btn btn-secondary" style="font-size: 0.9rem; padding: 0.65rem 1.1rem; display: flex; align-items: center; gap: 0.4rem;">
            <i class="fa-solid fa-robot" style="color: var(--uk-blue);"></i> <span>AI Polish & Review</span>
          </button>
        ` : ''}

        <button type="button" id="btn-clear-writing" class="btn btn-secondary" style="font-size: 0.85rem; padding: 0.65rem 0.9rem;">
          <i class="fa-solid fa-eraser"></i> <span>Clear</span>
        </button>
      </div>

      <div style="font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.4rem;">
        <i class="fa-solid fa-shield-halved" style="color: #10B981;"></i> Automatic British Grammar & Spell Audit
      </div>
    </div>

    <!-- Real-Time / Checked Feedback Box Area -->
    <div id="writing-feedback-area" style="margin-top: 1.5rem; display: none;">
      <!-- Populated dynamically via renderFeedbackResult() -->
    </div>
  `;
}

function renderExercisePromptContent(modeId, ex) {
  if (modeId === 'fix-my-writing') {
    return `
      <div style="font-size: 0.85rem; font-weight: 700; color: #EF4444; margin-bottom: 0.3rem;">
        <i class="fa-solid fa-triangle-exclamation"></i> FLAGGED SENTENCE WITH COMMON MISTAKES:
      </div>
      <div style="font-size: 1.25rem; font-weight: 800; color: var(--text-main); font-style: italic; margin-bottom: 0.6rem; letter-spacing: -0.01em;">
        "${ex.badText}"
      </div>
      <div style="font-size: 0.9rem; color: var(--text-muted);">
        <strong>המשימה:</strong> כתוב את המשפט מחדש בצורה תקינה ונכונה. לאחר מכן נציג לך הסבר מלא לכל טעות.
      </div>
    `;
  }

  if (modeId === 'word-to-writing') {
    return `
      <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.4rem;">
        <div style="font-size: 1.6rem; font-weight: 900; color: var(--uk-blue); display: flex; align-items: center; gap: 0.5rem;">
          ${ex.word} <span style="font-size: 0.95rem; font-weight: 500; color: var(--text-muted);">${ex.phonetic || ''}</span>
        </div>
        <span style="font-size: 0.8rem; font-weight: 700; color: var(--gold-dark); text-transform: uppercase;">${ex.partOfSpeech || 'Word'}</span>
      </div>
      <div style="font-size: 1.05rem; color: var(--text-main); margin-bottom: 0.3rem;">
        <strong>Definition:</strong> ${ex.definition}
      </div>
      <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.6rem;">
        <strong>פירוש בעברית:</strong> ${ex.definitionHe}
      </div>
      <div style="background: rgba(0,0,0,0.03); border-radius: 8px; padding: 0.5rem 0.8rem; font-size: 0.85rem; color: var(--text-muted); font-style: italic;">
        Example: "${ex.exampleSentence}"
      </div>
    `;
  }

  if (modeId === 'expand-sentence') {
    return `
      <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.3rem;">
        Base Simple Sentence:
      </div>
      <div style="font-size: 1.4rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
        "${ex.baseSentence}" <span style="font-size: 0.9rem; font-weight: 500; color: var(--text-muted);">(${ex.baseSentenceHe})</span>
      </div>
      <div style="font-size: 0.95rem; color: var(--uk-blue); font-weight: 600; margin-bottom: 0.2rem;">
        🎯 ${ex.targetGoal}
      </div>
      <div style="font-size: 0.85rem; color: var(--text-muted);">
        ${ex.targetGoalHe}
      </div>
    `;
  }

  if (modeId === 'real-life-writing') {
    return `
      <div style="font-size: 0.85rem; font-weight: 700; color: #F59E0B; margin-bottom: 0.3rem;">
        ${ex.scenario}
      </div>
      <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.4rem;">
        ${ex.prompt}
      </div>
      <div style="font-size: 0.88rem; color: var(--text-muted);">
        ${ex.promptHe}
      </div>
    `;
  }

  if (modeId === 'paragraph-master') {
    return `
      <div style="font-size: 0.85rem; font-weight: 700; color: #6366F1; margin-bottom: 0.3rem;">
        🎓 Topic for Paragraph:
      </div>
      <div style="font-size: 1.25rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
        ${ex.topic}
      </div>
      <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.6rem;">
        ${ex.topicHe}
      </div>
      ${ex.structureGuide ? `
        <div style="background: rgba(99,102,241,0.06); border-radius: 8px; padding: 0.6rem 0.8rem; font-size: 0.8rem; color: var(--text-main); line-height: 1.5;">
          ${ex.structureGuide.map(step => `<div>• ${step}</div>`).join('')}
        </div>
      ` : ''}
    `;
  }

  // Default / Daily Journal / Story Challenge / Sentence Builder
  return `
    <div style="font-size: 1.2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.4rem; line-height: 1.4;">
      ${ex.prompt}
    </div>
    <div style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 0.4rem;">
      ${ex.promptHe || ''}
    </div>
    ${ex.starter ? `
      <div style="margin-top: 0.6rem; font-size: 0.88rem; color: var(--uk-blue); font-style: italic;">
        Story Opening: "${ex.starter}"
      </div>
    ` : ''}
  `;
}

function renderHintsBox(exercise) {
  if (!exercise.hints || hintStage === 0) return '';
  const visibleHints = exercise.hints.slice(0, hintStage);

  return `
    <div style="background: rgba(212,175,55,0.1); border: 1px dashed var(--gold); border-radius: 10px; padding: 0.8rem 1rem;">
      <div style="font-size: 0.8rem; font-weight: 700; color: var(--gold-dark, #A6801C); margin-bottom: 0.4rem;">
        <i class="fa-solid fa-lightbulb"></i> Step-by-Step Guidance (רמזים הדרגתיים):
      </div>
      <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.88rem; color: var(--text-main); line-height: 1.5;">
        ${visibleHints.map(h => `<li>${h}</li>`).join('')}
      </ul>
    </div>
  `;
}

function getPlaceholderForMode(modeId, ex) {
  if (modeId === 'fix-my-writing') return 'Rewrite the corrected sentence here... (e.g., She doesn\'t like...)';
  if (modeId === 'sentence-builder') return 'Construct your full sentence here using all required words...';
  if (modeId === 'expand-sentence') return 'Write your enriched, descriptive sentence here...';
  if (modeId === 'real-life-writing') return 'Draft your professional message here...';
  if (modeId === 'paragraph-master') return 'Write your full structured paragraph here (Topic sentence, details, conclusion)...';
  return 'Write your English response here...';
}

function bindWorkbenchEvents(container) {
  // Mode selection cards
  container.querySelectorAll('.writing-mode-card').forEach(card => {
    card.addEventListener('click', () => {
      const modeId = card.getAttribute('data-mode-id');
      if (modeId && modeId !== activeMode) {
        activeMode = modeId;
        currentExerciseIndex = 0;
        hintStage = 0;
        renderChallengesView(container);
      }
    });
  });

  // Next prompt button
  const nextBtn = document.getElementById('btn-next-prompt');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentExerciseIndex++;
      hintStage = 0;
      renderChallengesView(container);
    });
  }

  // Audio prompt pronunciation
  const audioBtn = document.getElementById('btn-audio-prompt-word');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      const exerciseList = getFilteredExerciseList(activeMode);
      const curEx = exerciseList[currentExerciseIndex % exerciseList.length];
      if (curEx && curEx.word) {
        speakText(curEx.word);
      }
    });
  }

  // Reveal Hint button
  const hintBtn = document.getElementById('btn-reveal-hint');
  if (hintBtn) {
    hintBtn.addEventListener('click', () => {
      const exerciseList = getFilteredExerciseList(activeMode);
      const curEx = exerciseList[currentExerciseIndex % exerciseList.length];
      const maxHints = curEx.hints ? curEx.hints.length : 1;
      if (hintStage < maxHints) {
        hintStage++;
      } else {
        hintStage = 1; // loop
      }
      const hintsArea = document.getElementById('hints-display-area');
      if (hintsArea) {
        hintsArea.innerHTML = renderHintsBox(curEx);
      }
      hintBtn.querySelector('span').innerText = `Next Hint (${hintStage}/${maxHints})`;
    });
  }

  // Textarea word counter & live target words detection
  const textarea = document.getElementById('practice-textarea');
  const counterEl = document.getElementById('char-word-counter');
  if (textarea && counterEl) {
    textarea.addEventListener('input', () => {
      const text = textarea.value.trim();
      const words = text ? text.split(/\s+/).filter(Boolean) : [];
      counterEl.innerText = `${words.length} words • ${textarea.value.length} characters`;

      // Highlight target words badges live
      container.querySelectorAll('.badge-target-word').forEach(badge => {
        const target = badge.getAttribute('data-word');
        if (target) {
          const stem = target.replace(/ing$|ed$|s$|es$/g, '');
          const regex = new RegExp(`\\b${stem}`, 'i');
          if (regex.test(text)) {
            badge.style.background = '#10B98125';
            badge.style.color = '#10B981';
            badge.style.borderColor = '#10B981';
          } else {
            badge.style.background = 'rgba(59,130,246,0.12)';
            badge.style.color = '#2563EB';
            badge.style.borderColor = 'rgba(59,130,246,0.3)';
          }
        }
      });
    });
  }

  // Clear button
  const clearBtn = document.getElementById('btn-clear-writing');
  if (clearBtn && textarea) {
    clearBtn.addEventListener('click', () => {
      textarea.value = '';
      textarea.dispatchEvent(new Event('input'));
      const fbArea = document.getElementById('writing-feedback-area');
      if (fbArea) fbArea.style.display = 'none';
    });
  }

  // Check writing button
  const checkBtn = document.getElementById('btn-check-writing');
  if (checkBtn && textarea) {
    checkBtn.addEventListener('click', () => {
      const text = textarea.value.trim();
      const exerciseList = getFilteredExerciseList(activeMode);
      const curEx = exerciseList[currentExerciseIndex % exerciseList.length];
      const curMode = WRITING_MODES.find(m => m.id === activeMode);

      const feedback = auditWritingSubmission(text, curEx);
      lastCheckedFeedback = feedback;

      // Render feedback UI
      const fbArea = document.getElementById('writing-feedback-area');
      if (fbArea) {
        fbArea.style.display = 'block';
        fbArea.innerHTML = renderFeedbackCard(feedback, text, curEx, curMode);
        fbArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Record errors if any
      if (feedback.errors && feedback.errors.length > 0) {
        recordDetectedErrors(feedback.errors);
      }

      // If valid, award XP & streak
      if (feedback.isValid || feedback.score >= 70) {
        const rewardXP = curMode ? curMode.xpReward : 25;
        const res = recordWritingSessionSuccess(rewardXP);
        saveWritingHistoryItem({
          modeId: curMode.id,
          modeTitle: curMode.title,
          inputText: text,
          polishedText: feedback.polishedText,
          score: feedback.score,
          xpEarned: rewardXP,
          errorsCount: feedback.errors.length
        });
        updateStatsHeader();
      }
    });
  }

  // AI Polish Review button
  const aiBtn = document.getElementById('btn-ai-polish');
  if (aiBtn && textarea) {
    aiBtn.addEventListener('click', async () => {
      const text = textarea.value.trim();
      if (!text) {
        alert('Please write some text before asking for AI review.');
        return;
      }

      aiBtn.disabled = true;
      aiBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Consulting AI...';

      try {
        const exerciseList = getFilteredExerciseList(activeMode);
        const curEx = exerciseList[currentExerciseIndex % exerciseList.length];
        const curMode = WRITING_MODES.find(m => m.id === activeMode);

        const fbArea = document.getElementById('writing-feedback-area');
        if (fbArea) {
          fbArea.style.display = 'block';
          fbArea.innerHTML = `
            <div style="background: rgba(0,36,125,0.05); border: 1px solid var(--uk-blue); border-radius: 12px; padding: 1.2rem; margin-top: 1rem; animation: fade-in 0.3s ease;">
              <h3 style="margin: 0 0 0.5rem 0; color: var(--uk-blue); font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fa-solid fa-robot"></i> AI Writing Tutor Review
              </h3>
              <p style="margin: 0 0 0.8rem 0; color: var(--text-muted); font-size: 0.9rem;">
                Here is a native British English phrasing and feedback for your text:
              </p>
              <div style="background: var(--card-bg); border-radius: 8px; padding: 0.8rem 1rem; border-left: 4px solid var(--uk-blue); margin-bottom: 0.8rem; font-size: 1rem; color: var(--text-main);">
                "${auditWritingSubmission(text, curEx).polishedText}"
              </div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">
                💡 <em>Tip: Practice reading the polished sentence aloud to internalize natural British rhythm and word flow.</em>
              </div>
            </div>
          `;
        }
      } finally {
        aiBtn.disabled = false;
        aiBtn.innerHTML = '<i class="fa-solid fa-robot" style="color: var(--uk-blue);"></i> <span>AI Polish & Review</span>';
      }
    });
  }
}

function renderFeedbackCard(feedback, originalText, exercise, mode) {
  const isPerfect = feedback.isValid && feedback.errors.length === 0;

  return `
    <div style="background: var(--card-bg); border: 2px solid ${isPerfect ? '#10B981' : 'var(--gold)'}; border-radius: 16px; padding: 1.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.06); animation: fade-in 0.3s ease;">
      <!-- Score & Celebration Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.8rem;">
        <div style="display: flex; align-items: center; gap: 0.8rem;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: ${isPerfect ? '#10B98120' : '#F59E0B20'}; color: ${isPerfect ? '#10B981' : '#F59E0B'}; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
            <i class="fa-solid ${isPerfect ? 'fa-circle-check' : 'fa-graduation-cap'}"></i>
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: var(--text-main);">
              ${isPerfect ? '🎉 Splendid Writing! Flawless English!' : '📝 Feedback & Corrections'}
            </h3>
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              Writing Quality Score: <strong>${feedback.score}/100</strong>
              ${feedback.score >= 70 ? `• <span style="color: #10B981; font-weight: 700;">+${mode.xpReward} XP Earned!</span>` : ''}
            </div>
          </div>
        </div>

        <button type="button" onclick="this.closest('#writing-feedback-area').style.display='none'" class="icon-btn" aria-label="Close feedback">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Before & After Comparison Card (לפני ואחרי) -->
      <div style="margin-bottom: 1.5rem;">
        <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
          <i class="fa-solid fa-code-compare" style="color: var(--uk-blue);"></i> Before & After Comparison (לפני ואחרי)
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
          <div style="background: rgba(239,68,68,0.05); border: 1px solid rgba(239,68,68,0.25); border-radius: 12px; padding: 1rem;">
            <div style="font-size: 0.75rem; font-weight: 700; color: #EF4444; margin-bottom: 0.3rem;">
              <i class="fa-solid fa-pen"></i> Your Original Text:
            </div>
            <div style="font-size: 0.98rem; color: var(--text-main); line-height: 1.5;">
              "${originalText}"
            </div>
          </div>

          <div style="background: rgba(16,185,129,0.06); border: 1px solid rgba(16,185,129,0.3); border-radius: 12px; padding: 1rem;">
            <div style="font-size: 0.75rem; font-weight: 700; color: #10B981; margin-bottom: 0.3rem;">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Polished English Version:
            </div>
            <div style="font-size: 0.98rem; font-weight: 600; color: var(--text-main); line-height: 1.5;">
              "${feedback.polishedText}"
            </div>
          </div>
        </div>
      </div>

      <!-- Errors Breakdown & Explanations -->
      ${feedback.errors && feedback.errors.length > 0 ? `
        <div style="margin-bottom: 1.2rem;">
          <div style="font-size: 0.82rem; font-weight: 700; color: #EF4444; text-transform: uppercase; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
            <i class="fa-solid fa-circle-exclamation"></i> Identified Areas for Improvement (${feedback.errors.length}):
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.6rem;">
            ${feedback.errors.map(err => `
              <div style="background: var(--input-bg); border-left: 3px solid #EF4444; border-radius: 0 8px 8px 0; padding: 0.7rem 0.9rem;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.2rem;">
                  <strong style="font-size: 0.9rem; color: var(--text-main);">${err.issue}</strong>
                  <span style="font-size: 0.72rem; font-weight: 700; color: #EF4444; background: #EF444415; padding: 0.1rem 0.4rem; border-radius: 6px;">${err.category}</span>
                </div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${err.rule}</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Strengths & Praises -->
      ${feedback.strengths && feedback.strengths.length > 0 ? `
        <div style="margin-bottom: 1rem;">
          <div style="font-size: 0.82rem; font-weight: 700; color: #10B981; text-transform: uppercase; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
            <i class="fa-solid fa-thumbs-up"></i> Writing Highlights & Strengths:
          </div>
          <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.88rem; color: var(--text-main); line-height: 1.5;">
            ${feedback.strengths.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <!-- Ideal British Reference (if available in exercise) -->
      ${exercise.idealExample ? `
        <div style="background: rgba(0,36,125,0.04); border-radius: 10px; padding: 0.8rem 1rem; border: 1px dashed var(--border-color); margin-top: 1rem;">
          <div style="font-size: 0.78rem; font-weight: 700; color: var(--uk-blue); margin-bottom: 0.2rem;">
            <i class="fa-solid fa-crown" style="color: var(--gold);"></i> Native British Model Answer:
          </div>
          <div style="font-size: 0.9rem; color: var(--text-main); font-style: italic;">
            "${exercise.idealExample}"
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// ============================================================================
// 2. WRITING HISTORY & JOURNAL VIEW (FILTERABLE BY DATE / DAYS / MODE)
// ============================================================================
function renderHistoryView(container) {
  const history = getWritingHistory();

  container.innerHTML = `
    <div style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 16px; padding: 1.5rem; box-shadow: var(--card-shadow);">
      <!-- Filter Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
        <div>
          <h2 style="margin: 0 0 0.3rem 0; font-size: 1.3rem; font-weight: 800; color: var(--text-main);">
            📜 My Writing Portfolio & Journal
          </h2>
          <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">
            כל החיבורים, התרגילים והמשפטים שכתבת שמורים כאן. ניתן לסנן לפי ימים ותאריכים.
          </p>
        </div>

        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap; align-items: center;">
          <!-- Date Filter Selector -->
          <div style="display: flex; align-items: center; gap: 0.4rem; background: var(--input-bg); padding: 0.3rem 0.6rem; border-radius: 10px; border: 1px solid var(--border-color);">
            <i class="fa-solid fa-calendar-day" style="color: var(--gold-dark); font-size: 0.85rem;"></i>
            <select id="history-date-filter" style="border: none; background: transparent; font-size: 0.85rem; font-weight: 600; color: var(--text-main); outline: none; cursor: pointer;">
              <option value="all">All Dates (הכל)</option>
              <option value="today">Today (היום)</option>
              <option value="7days">Last 7 Days (7 ימים אחרונים)</option>
              <option value="30days">Last 30 Days (30 יום אחרונים)</option>
            </select>
          </div>

          <!-- Mode Filter Selector -->
          <div style="display: flex; align-items: center; gap: 0.4rem; background: var(--input-bg); padding: 0.3rem 0.6rem; border-radius: 10px; border: 1px solid var(--border-color);">
            <i class="fa-solid fa-filter" style="color: var(--uk-blue); font-size: 0.85rem;"></i>
            <select id="history-mode-filter" style="border: none; background: transparent; font-size: 0.85rem; font-weight: 600; color: var(--text-main); outline: none; cursor: pointer;">
              <option value="all">All Modes (כל המשחקים)</option>
              ${WRITING_MODES.map(m => `<option value="${m.id}">${m.title}</option>`).join('')}
            </select>
          </div>

          <!-- Keyword Search -->
          <input type="text" id="history-search-input" placeholder="Search written words..." style="
            padding: 0.35rem 0.8rem;
            border-radius: 10px;
            border: 1px solid var(--border-color);
            background: var(--input-bg);
            color: var(--text-main);
            font-size: 0.85rem;
            outline: none;
            min-width: 170px;
          ">
        </div>
      </div>

      <!-- History Items List Container -->
      <div id="history-items-list">
        ${renderHistoryItemsList(history)}
      </div>
    </div>
  `;

  bindHistoryEvents(container);
}

function renderHistoryItemsList(history) {
  if (!history || history.length === 0) {
    return `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <div style="font-size: 2.5rem; margin-bottom: 0.8rem; color: var(--gold);">✍️</div>
        <h3 style="margin: 0 0 0.4rem 0; font-size: 1.1rem; color: var(--text-main);">No writing entries found yet</h3>
        <p style="margin: 0; font-size: 0.88rem;">Start a writing challenge to build your personal British English journal!</p>
      </div>
    `;
  }

  return `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      ${history.map(item => {
        const dateObj = new Date(item.timestamp);
        const formattedDate = dateObj.toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const formattedTime = dateObj.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });

        return `
          <div class="card history-item-card" data-date="${item.timestamp}" data-mode="${item.modeId}" style="background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.1rem 1.3rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.6rem;">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span style="font-size: 0.78rem; font-weight: 800; color: var(--uk-blue); background: rgba(0,36,125,0.08); padding: 0.2rem 0.6rem; border-radius: 12px;">
                  ${item.modeTitle || 'Writing Challenge'}
                </span>
                <span style="font-size: 0.78rem; font-weight: 700; color: #10B981;">
                  +${item.xpEarned || 25} XP
                </span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">
                  Score: ${item.score || 100}/100
                </span>
              </div>

              <div style="font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.4rem;">
                <i class="fa-regular fa-calendar"></i> ${formattedDate} ${formattedTime}
              </div>
            </div>

            <div style="margin-bottom: 0.5rem;">
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.2rem;">YOUR WRITING:</div>
              <div style="font-size: 0.95rem; color: var(--text-main); line-height: 1.5; font-style: italic;">
                "${item.inputText}"
              </div>
            </div>

            ${item.polishedText && item.polishedText !== item.inputText ? `
              <div style="background: rgba(16,185,129,0.08); border-left: 3px solid #10B981; border-radius: 0 6px 6px 0; padding: 0.5rem 0.8rem; font-size: 0.88rem; color: var(--text-main);">
                <strong>Polished:</strong> "${item.polishedText}"
              </div>
            ` : ''}
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function bindHistoryEvents(container) {
  const dateFilter = document.getElementById('history-date-filter');
  const modeFilter = document.getElementById('history-mode-filter');
  const searchInput = document.getElementById('history-search-input');

  function applyFilters() {
    const history = getWritingHistory();
    const dateVal = dateFilter ? dateFilter.value : 'all';
    const modeVal = modeFilter ? modeFilter.value : 'all';
    const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const now = Date.now();
    const oneDay = 86400000;

    const filtered = history.filter(item => {
      // Date filter
      if (dateVal === 'today') {
        const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
        const todayDate = new Date().toISOString().split('T')[0];
        if (itemDate !== todayDate) return false;
      } else if (dateVal === '7days') {
        const age = now - new Date(item.timestamp).getTime();
        if (age > 7 * oneDay) return false;
      } else if (dateVal === '30days') {
        const age = now - new Date(item.timestamp).getTime();
        if (age > 30 * oneDay) return false;
      }

      // Mode filter
      if (modeVal !== 'all' && item.modeId !== modeVal) return false;

      // Search filter
      if (searchVal) {
        const text = (item.inputText + ' ' + (item.polishedText || '')).toLowerCase();
        if (!text.includes(searchVal)) return false;
      }

      return true;
    });

    const listEl = document.getElementById('history-items-list');
    if (listEl) {
      listEl.innerHTML = renderHistoryItemsList(filtered);
    }
  }

  if (dateFilter) dateFilter.addEventListener('change', applyFilters);
  if (modeFilter) modeFilter.addEventListener('change', applyFilters);
  if (searchInput) searchInput.addEventListener('input', applyFilters);
}

// ============================================================================
// 3. PERSONAL ERROR TRACKER VIEW
// ============================================================================
function renderErrorTrackerView(container) {
  const errorStats = getErrorStats();
  const entries = Object.entries(errorStats);
  const totalErrors = entries.reduce((acc, curr) => acc + curr[1], 0);

  container.innerHTML = `
    <div style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 16px; padding: 1.5rem; box-shadow: var(--card-shadow);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1.5rem;">
        <div>
          <h2 style="margin: 0 0 0.3rem 0; font-size: 1.3rem; font-weight: 800; color: var(--text-main);">
            📊 Personal Error Tracker (מעקב אישי אחרי טעויות)
          </h2>
          <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">
            המערכת מנתחת את דפוסי הטעויות החוזרות שלך (דקדוק, איות, מילות יחס) כדי לעזור לך להשתפר מהר יותר.
          </p>
        </div>

        <button type="button" id="btn-reset-error-stats" class="btn btn-secondary btn-sm" style="font-size: 0.78rem;">
          <i class="fa-solid fa-arrows-rotate"></i> Reset Error Stats
        </button>
      </div>

      ${totalErrors === 0 ? `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.8rem; color: #10B981;">🛡️</div>
          <h3 style="margin: 0 0 0.4rem 0; font-size: 1.1rem; color: var(--text-main);">No Recurring Errors Logged Yet!</h3>
          <p style="margin: 0; font-size: 0.88rem;">Keep practicing writing. When mistakes are detected, they will appear here with targeted rules.</p>
        </div>
      ` : `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          ${entries.sort((a,b) => b[1] - a[1]).map(([cat, count]) => {
            const pct = Math.round((count / totalErrors) * 100);
            return `
              <div style="background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 1rem 1.2rem;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.4rem;">
                  <strong style="font-size: 0.95rem; color: var(--text-main);">${cat}</strong>
                  <span style="font-size: 0.85rem; font-weight: 800; color: #EF4444;">${count} time(s) (${pct}%)</span>
                </div>
                <div style="width: 100%; height: 8px; background: rgba(0,0,0,0.06); border-radius: 4px; overflow: hidden; margin-bottom: 0.6rem;">
                  <div style="width: ${pct}%; height: 100%; background: #EF4444; border-radius: 4px;"></div>
                </div>
                <div style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.3;">
                  ${getErrorAdvice(cat)}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;

  const resetBtn = document.getElementById('btn-reset-error-stats');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset your personal error statistics?')) {
        localStorage.removeItem(STORAGE_KEYS.ERROR_STATS);
        renderErrorTrackerView(container);
      }
    });
  }
}

function getErrorAdvice(category) {
  if (category.includes('Subject-Verb')) return '💡 Tip: Always check if the subject is singular (he/she/it takes -s or doesn\'t) or plural (they/we take are/do).';
  if (category.includes('Preposition')) return '💡 Tip: Notice dependent prepositions: "listen to", "married to", "arrive at/in", "depend on".';
  if (category.includes('Article')) return '💡 Tip: Use "an" only when the sound starts with a vowel (a, e, i, o, u) like "an hour", "an apple".';
  if (category.includes('Spelling')) return '💡 Tip: Review tricky English double letters and silent characters (definitely, separate, receive).';
  if (category.includes('Capitalization') || category.includes('Punctuation')) return '💡 Tip: Capitalize the start of every sentence and the pronoun "I", and finish with a period.';
  return '💡 Tip: Read sentences aloud to test natural British cadence and flow.';
}

// ============================================================================
// GLOBAL EVENTS & SUB-TAB SWITCHING
// ============================================================================
function bindDailyPracticeEvents(container) {
  // Subtab switching (Challenges / History / Error Tracker)
  container.querySelectorAll('#practice-subtab-bar .btn-subtab').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('#practice-subtab-bar .btn-subtab').forEach(b => {
        b.classList.remove('active');
        b.style.fontWeight = '600';
        b.style.color = 'var(--text-muted)';
        b.style.borderBottom = '3px solid transparent';
      });
      btn.classList.add('active');
      btn.style.fontWeight = '700';
      btn.style.color = 'var(--uk-blue)';
      btn.style.borderBottom = '3px solid var(--uk-blue)';

      activeSubTab = btn.getAttribute('data-subtab');
      renderCurrentSubTab();
    });
  });

  // Level selector filter (All Levels / Beginner / Intermediate / Advanced)
  container.querySelectorAll('#level-pill-container .btn-level-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('#level-pill-container .btn-level-filter').forEach(b => {
        b.classList.remove('active');
        b.style.background = 'transparent';
        b.style.color = 'var(--text-muted)';
        b.style.boxShadow = 'none';
        b.style.fontWeight = '600';
      });
      btn.classList.add('active');
      btn.style.background = 'var(--card-bg)';
      btn.style.color = 'var(--text-main)';
      btn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      btn.style.fontWeight = '700';

      activeLevelFilter = btn.getAttribute('data-level');
      currentExerciseIndex = 0;
      hintStage = 0;
      renderCurrentSubTab();
    });
  });
}

function updateStatsHeader() {
  const streak = getWritingStreak();
  const xp = parseInt(localStorage.getItem(STORAGE_KEYS.XP) || '0', 10);
  const completed = parseInt(localStorage.getItem(STORAGE_KEYS.COMPLETED_COUNT) || '0', 10);

  const streakEl = document.getElementById('ui-writing-streak');
  if (streakEl) streakEl.innerHTML = `🔥 ${streak} <span style="font-size: 0.75rem; font-weight: 600;">Days</span>`;

  const xpEl = document.getElementById('ui-writing-xp');
  if (xpEl) xpEl.innerHTML = `⚡ ${xp} <span style="font-size: 0.75rem; font-weight: 600;">XP</span>`;

  const compEl = document.getElementById('ui-writing-completed');
  if (compEl) compEl.innerText = `📝 ${completed}`;
}
