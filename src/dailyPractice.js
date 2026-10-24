/**
 * British English Vault - Daily Practice (Writing Lab ✍️)
 * 100% English Interface
 * Features:
 * - 8 Interactive Writing Challenges & Games:
 *   1. Sentence Builder
 *   2. Daily Journal
 *   3. Story Challenge
 *   4. Fix My Writing
 *   5. Real-Life Writing
 *   6. Word to Writing
 *   7. Expand the Sentence
 *   8. Paragraph Master
 * - Modern, Ergonomic, Redesigned Buttons & Interactive Controls (No AI Button)
 * - Deep Grammar & Spelling Audit with In-Depth "Why this is an error" Explanations
 * - No Penalty / Errors for Punctuation or Missing Periods
 * - Before & After Comparison Cards with Native British Reference Answers
 * - Gradual Hints System (Step-by-step guidance)
 * - Date & Mode Filterable Writing History & Portfolio
 * - Personal Error Tracker (Common error trends and recommendations)
 */

import { speakText } from './speech.js';
import { getGeminiApiKey } from './ai.js';
import { copyTextToClipboard, shareTextContent, showCopyShareToast } from './shareUtils.js';

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
// 8 WRITING MODES CURRICULUM (100% ENGLISH)
// ============================================================================
export const WRITING_MODES = [
  {
    id: 'sentence-builder',
    title: 'Sentence Builder',
    icon: 'fa-cubes-stacked',
    color: '#3B82F6',
    desc: 'Construct a complete, grammatically sound sentence incorporating all required target words.',
    xpReward: 25
  },
  {
    id: 'daily-journal',
    title: 'Daily Journal',
    icon: 'fa-book-bookmark',
    color: '#10B981',
    desc: 'Respond to an inspiring daily prompt with 3 to 5 authentic, descriptive sentences.',
    xpReward: 35
  },
  {
    id: 'story-challenge',
    title: 'Story Challenge',
    icon: 'fa-wand-magic-sparkles',
    color: '#8B5CF6',
    desc: 'Read a captivating story opening and write your own original continuation.',
    xpReward: 40
  },
  {
    id: 'fix-my-writing',
    title: 'Fix My Writing',
    icon: 'fa-spell-check',
    color: '#EF4444',
    desc: 'Spot common grammatical traps in a flawed sentence and rewrite it accurately.',
    xpReward: 30
  },
  {
    id: 'real-life-writing',
    title: 'Real-Life Writing',
    icon: 'fa-briefcase',
    color: '#F59E0B',
    desc: 'Draft authentic workplace emails, polite requests, inquiries, and social notes.',
    xpReward: 35
  },
  {
    id: 'word-to-writing',
    title: 'Word to Writing',
    icon: 'fa-gem',
    color: '#EC4899',
    desc: 'Master rich British vocabulary by weaving a featured term into an original sentence.',
    xpReward: 25
  },
  {
    id: 'expand-sentence',
    title: 'Expand the Sentence',
    icon: 'fa-up-right-and-down-left-from-center',
    color: '#06B6D4',
    desc: 'Transform a short, basic sentence into a detailed, descriptive, and complex sentence.',
    xpReward: 30
  },
  {
    id: 'paragraph-master',
    title: 'Paragraph Master',
    icon: 'fa-align-left',
    color: '#6366F1',
    desc: 'Craft a structured paragraph: Topic Sentence, Supporting Evidence, and Conclusion.',
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
      hints: [
        'Hint 1: Adverbs of frequency like "always" normally appear before the main verb (e.g., "I always drink...").',
        'Hint 2: In English, pair "morning" with the preposition "in": "in the morning".',
        'Hint 3: Model layout: "I always enjoy a fresh cup of coffee in the morning before starting my work."'
      ],
      idealExample: 'I always drink a hot cup of coffee every morning to feel refreshed and alert.'
    },
    {
      id: 'sb-2',
      level: 'intermediate',
      words: ['although', 'tired', 'work'],
      prompt: 'Write a sentence using the words: "although", "tired", and "work".',
      hints: [
        'Hint 1: "Although" introduces a contrast clause (e.g., "Although I was feeling tired...").',
        'Hint 2: Avoid using "but" in the same sentence when you start with "Although"!',
        'Hint 3: Model layout: "Although he was exhausted and tired, he continued his work until late."'
      ],
      idealExample: 'Although I was feeling very tired after the long flight, I decided to finish my work.'
    },
    {
      id: 'sb-3',
      level: 'intermediate',
      words: ['despite', 'rain', 'walk'],
      prompt: 'Write a sentence using the words: "despite", "rain", and "walk".',
      hints: [
        'Hint 1: "Despite" is followed directly by a noun phrase or gerund (e.g., "Despite the heavy rain..."). Never use "despite of".',
        'Hint 2: Pair with the past simple: "we went for a walk" or "we took a walk".',
        'Hint 3: Model layout: "Despite the relentless London rain, we went for a peaceful walk in Hyde Park."'
      ],
      idealExample: 'Despite the torrential rain, we went for a lovely walk along the river Thames.'
    },
    {
      id: 'sb-4',
      level: 'advanced',
      words: ['nevertheless', 'adversity', 'succeed'],
      prompt: 'Write a sentence using the words: "nevertheless", "adversity", and "succeed".',
      hints: [
        'Hint 1: "Nevertheless" functions as a conjunctive adverb meaning "in spite of that" or "yet".',
        'Hint 2: Connect the challenge ("facing great adversity") with the determination to succeed.',
        'Hint 3: Model layout: "The founders faced considerable adversity; nevertheless, their resilience enabled them to succeed."'
      ],
      idealExample: 'They faced great financial adversity during the economic crisis; nevertheless, their determination enabled them to succeed.'
    },
    {
      id: 'sb-5',
      level: 'advanced',
      words: ['reluctant', 'compromise', 'negotiation'],
      prompt: 'Write a sentence using the words: "reluctant", "compromise", and "negotiation".',
      hints: [
        'Hint 1: "Reluctant" means unwilling or hesitant, followed by an infinitive: "reluctant to compromise".',
        'Hint 2: Frame the sentence within a business or diplomatic context.',
        'Hint 3: Model layout: "Both delegates were initially reluctant to compromise during the tense negotiation."'
      ],
      idealExample: 'Although the directors were initially reluctant to compromise, the negotiation ultimately reached a constructive resolution.'
    }
  ],

  'daily-journal': [
    {
      id: 'dj-1',
      level: 'all',
      prompt: 'What was the most memorable part of your day, and why did it stand out?',
      minSentences: 3,
      hints: [
        'Sentence 1: State the event or moment clearly ("The highlight of my day was...").',
        'Sentence 2: Describe who was there and what took place in detail.',
        'Sentence 3: Reflect on how the experience made you feel and why you appreciated it.'
      ],
      idealExample: 'The highlight of my day was taking an unexpected walk through the neighborhood garden during sunset. The brisk autumn air felt refreshing after spending several hours behind my desk. It reminded me how vital it is to step away from screens and enjoy quiet moments.'
    },
    {
      id: 'dj-2',
      level: 'all',
      prompt: 'Describe a skill you would love to master in the future and how it would change your daily life.',
      minSentences: 3,
      hints: [
        'Sentence 1: Introduce the skill (e.g. fluent British English pronunciation, coding, or public speaking).',
        'Sentence 2: Explain the main steps or practice routine required to develop it.',
        'Sentence 3: Conclude with the opportunities, confidence, and personal freedom it will unlock.'
      ],
      idealExample: 'I would truly love to master British English pronunciation and natural conversational fluency. Attaining this level would allow me to express complex ideas effortlessly in international business discussions. Ultimately, it would give me immense confidence when traveling and working abroad.'
    },
    {
      id: 'dj-3',
      level: 'all',
      prompt: 'If you had a completely free weekend in London with unlimited transport, what would your ideal itinerary look like?',
      minSentences: 3,
      hints: [
        'Sentence 1: Outline your morning activity (e.g., British Museum, Borough Market, breakfast in Soho).',
        'Sentence 2: Describe your afternoon stroll or cultural landmark (e.g., Greenwich, Tate Modern, West End theatre).',
        'Sentence 3: Wrap up with your evening dinner or scenic spot along the Thames.'
      ],
      idealExample: 'I would begin Saturday morning with fresh pastries and coffee at Borough Market before heading to the British Museum. In the afternoon, I would take a leisurely stroll through Covent Garden and catch a play in the West End. Finally, I would wrap up the weekend with traditional fish and chips by the Thames.'
    }
  ],

  'story-challenge': [
    {
      id: 'sc-1',
      level: 'intermediate',
      prompt: 'You wake up on a foggy Tuesday morning and discover that you can clearly understand every animal talking. What happens next?',
      starter: 'I rubbed my eyes and heard two pigeons on my window sill having an argument...',
      minSentences: 3,
      hints: [
        'Hint 1: Describe the humorous conversation you overheard on the window sill.',
        'Hint 2: How did you test your newfound ability as you walked through the kitchen or outside?',
        'Hint 3: Use dynamic sensory verbs: overheard, barked, whispered, glanced, startled.'
      ],
      idealExample: 'I rubbed my eyes and heard two pigeons on my window sill having an argument over a dropped pastry crust. Shocked, I walked to the kitchen and greeted my golden retriever, who immediately replied asking for his breakfast in crisp, polite English! I realized at that moment that my ordinary life was about to become extraordinary.'
    },
    {
      id: 'sc-2',
      level: 'advanced',
      prompt: 'As the ancient grandfather clock struck 13, a hidden oak panel in the old British library swung open with a soft click...',
      starter: 'I froze in place holding my teacup as dust drifted into the dim candle light...',
      minSentences: 3,
      hints: [
        'Hint 1: What did you discover inside the hidden alcove? (An antique ledger, a brass key, a spiraling staircase?)',
        'Hint 2: Build suspense by describing the flickering shadows and quiet atmosphere.',
        'Hint 3: Conclude with an adventurous choice made by your character.'
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
        "In the Present Simple with 'she/he/it', use auxiliary 'doesn't' + base verb 'like' (not 'don't likes').",
        "Subject-Verb Agreement: 'it' requires 'makes' with an '-s' suffix (not 'it make')."
      ]
    },
    {
      id: 'fm-2',
      level: 'beginner',
      badText: "He go to London yesterday with his friend and they seen the Big Ben.",
      correction: "He went to London yesterday with his friend and they saw Big Ben.",
      rules: [
        "Past Simple tense: the irregular verb 'go' becomes 'went' when referring to 'yesterday'.",
        "Past Simple of 'see' is 'saw' ('seen' is the past participle, which requires a helper verb).",
        "Proper landmarks like 'Big Ben' do not take the definite article 'the'."
      ]
    },
    {
      id: 'fm-3',
      level: 'intermediate',
      badText: "I am agree with your opinion because it is make a lot of sense.",
      correction: "I agree with your opinion because it makes a lot of sense.",
      rules: [
        "'Agree' is already an active verb in English. Say 'I agree', never 'I am agree'.",
        "Avoid adding redundant 'is': say 'it makes sense', not 'it is make sense'."
      ]
    },
    {
      id: 'fm-4',
      level: 'intermediate',
      badText: "She has been living here since five years and works as an teacher.",
      correction: "She has been living here for five years and works as a teacher.",
      rules: [
        "Use 'for' for duration (a period of five years). Use 'since' only for a starting point (e.g. since 2019).",
        "Use article 'a' before consonant sounds: 'a teacher' ('an' is reserved for vowel sounds)."
      ]
    },
    {
      id: 'fm-5',
      level: 'advanced',
      badText: "Although it was heavily raining, but we still arrived on the meeting at time.",
      correction: "Although it was heavily raining, we still arrived at the meeting on time.",
      rules: [
        "Do not combine 'Although' and 'but' in the same sentence; choose one connector.",
        "Correct prepositions: 'arrive at a meeting' and 'on time' (punctual), not 'at time'."
      ]
    }
  ],

  'real-life-writing': [
    {
      id: 'rl-1',
      level: 'intermediate',
      scenario: '✉️ Reschedule a Business Meeting',
      prompt: 'Write a polite 3-sentence email to a colleague requesting to reschedule your catch-up to tomorrow afternoon due to an unexpected client conflict.',
      hints: [
        'Sentence 1: Politely state the request ("I am writing to ask if we could kindly reschedule our sync...").',
        'Sentence 2: Briefly explain the reason ("An urgent client conflict has arisen today...").',
        'Sentence 3: Propose an alternative time ("Would tomorrow afternoon around 3:00 PM suit your calendar?").'
      ],
      idealExample: 'Dear David, I am writing to ask if we could kindly reschedule our sync today due to an urgent client issue that requires my immediate attention. Would tomorrow afternoon around 3:00 PM suit your calendar? I truly apologize for any inconvenience caused and look forward to catching up then.'
    },
    {
      id: 'rl-2',
      level: 'intermediate',
      scenario: '📦 Customer Support Inquiry (Missing Parcel)',
      prompt: 'Write a polite inquiry to an online store asking about an order that hasn’t arrived past its estimated delivery date, providing order reference #UK-4891.',
      hints: [
        'Cite the order reference #UK-4891 clearly.',
        'Politely state the expected delivery date and the delay.',
        'Request an updated status or tracking timeline.'
      ],
      idealExample: 'Hello Support Team, I am reaching out regarding order #UK-4891, which was scheduled to arrive by last Friday. According to the tracking portal, the status has not updated for three days. Could you please look into this and provide an estimated delivery timeline? Thank you for your assistance.'
    },
    {
      id: 'rl-3',
      level: 'advanced',
      scenario: '🤝 Professional LinkedIn Networking Message',
      prompt: 'Write a concise, professional LinkedIn note introducing yourself to an industry peer after enjoying their recent article on modern software engineering.',
      hints: [
        'Compliment a specific insight from their article.',
        'State your common background or shared professional interest.',
        'End with an open, courteous connection invite.'
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
      exampleSentence: 'He was reluctant to admit his mistake in front of the board.',
      prompt: 'Write an authentic sentence using the word "reluctant".',
      hints: [
        'Common collocation: "reluctant to [verb]" or "felt reluctant about [noun]".',
        'Use it to describe hesitation before signing an agreement or making a major decision.'
      ],
      idealExample: 'She felt very reluctant to sign the agreement without consulting her lawyer first.'
    },
    {
      id: 'ww-2',
      word: 'chuffed',
      phonetic: '/tʃʌft/',
      partOfSpeech: 'adjective (British slang)',
      definition: 'Very pleased, proud, and delighted with an outcome.',
      exampleSentence: 'I was absolutely chuffed to bits when I received the promotion letter.',
      prompt: 'Write a lively sentence using the British adjective "chuffed".',
      hints: [
        'Often paired with adverbs: "absolutely chuffed", "proper chuffed", or "chuffed to bits".',
        'Express personal pride or joy regarding good news or an examination result.'
      ],
      idealExample: 'I was absolutely chuffed when my team won the regional debate competition.'
    },
    {
      id: 'ww-3',
      word: 'meticulous',
      phonetic: '/məˈtɪk.jə.ləs/',
      partOfSpeech: 'adjective',
      definition: 'Showing great attention to detail; very careful, precise, and thorough.',
      exampleSentence: 'Her meticulous planning ensured that the royal gala ran without a hitch.',
      prompt: 'Write a descriptive sentence using the word "meticulous".',
      hints: [
        'Frequently describes thorough craft: "meticulous research", "meticulous attention to detail".'
      ],
      idealExample: 'The architect demonstrated meticulous attention to detail while restoring the historic Victorian building.'
    },
    {
      id: 'ww-4',
      word: 'resilient',
      phonetic: '/rɪˈzɪl.jənt/',
      partOfSpeech: 'adjective',
      definition: 'Able to withstand or recover quickly from difficult conditions.',
      exampleSentence: 'The community remained resilient throughout the challenging winter.',
      prompt: 'Write an inspiring sentence using the word "resilient".',
      hints: [
        'Describe people, organizations, or nature overcoming hardships.'
      ],
      idealExample: 'Despite encountering numerous startup setbacks, the founders proved remarkably resilient and eventually built a thriving company.'
    }
  ],

  'expand-sentence': [
    {
      id: 'es-1',
      level: 'beginner',
      baseSentence: 'I went home.',
      targetGoal: 'Expand this sentence by detailing: WHEN it happened, HOW you traveled, and the REASON why.',
      minWords: 10,
      hints: [
        'Use a time phrase: "Yesterday afternoon..." or "Last night around 10 PM..."',
        'State your transport: "...by bicycle", "...on foot", "...via the tube"',
        'Add a reason connector: "...because I was feeling exhausted after an intense workout."'
      ],
      idealExample: 'Yesterday evening I went home on the London Underground earlier than usual because a massive rainstorm was approaching.'
    },
    {
      id: 'es-2',
      level: 'intermediate',
      baseSentence: 'She bought a book.',
      targetGoal: 'Expand this sentence by detailing: WHICH genre/title, WHERE she discovered it, and WHY it captivated her.',
      minWords: 12,
      hints: [
        'Name the venue: "in a quaint vintage bookshop in Bloomsbury"',
        'Describe the edition: "a rare illustrated novel on British folklore"',
        'Add the motivation: "...which her professor had warmly recommended."'
      ],
      idealExample: 'While exploring a quaint vintage bookshop in Covent Garden, she bought an antique hardcover book on British folklore that she had been searching for all year.'
    },
    {
      id: 'es-3',
      level: 'advanced',
      baseSentence: 'The train arrived.',
      targetGoal: 'Transform this into a vivid cinematic sentence by detailing weather, platform atmosphere, and passenger reactions.',
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
      topic: 'Why learning the English language opens boundless global opportunities.',
      structureGuide: [
        '1. Topic Sentence: State clearly that English serves as a universal bridge for global growth.',
        '2. Supporting Evidence: Mention career advancement, technology access, and cross-border collaboration.',
        '3. Concluding Thought: Summarize the lifelong personal freedom that fluency brings.'
      ],
      minSentences: 3,
      minWords: 35,
      hints: [
        'Useful connectors: "Furthermore,", "In addition,", "For instance,", "Ultimately,".',
        'Aim for smooth, logical transitions between sentences.'
      ],
      idealExample: 'Mastering the English language serves as a vital bridge to boundless personal and professional opportunities around the world. In today’s interconnected economy, fluency enables professionals to collaborate seamlessly with international teams and access cutting-edge research across technology and science. Furthermore, communicating effortlessly in English boosts personal travel confidence and cultural empathy. Ultimately, dedicating time to learn English is one of the most rewarding investments one can make for their future.'
    },
    {
      id: 'pm-2',
      level: 'advanced',
      topic: 'City Life in London vs. Quiet Countryside Living in the Cotswolds.',
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
  return 0;
}

export function recordWritingSessionSuccess(xpEarned = 25) {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const lastDate = localStorage.getItem(STORAGE_KEYS.LAST_DATE);
  let streak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '0', 10);

  if (lastDate === today) {
    // Maintained
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
// REAL AI-POWERED GRAMMAR & SPELL AUDITING ENGINE (NO PUNCTUATION PENALTY)
// ============================================================================
async function auditWithGemini(cleanText, exercise) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;

  const prompt = `You are an expert British English grammar examiner and writing tutor.
Student's text: "${cleanText}"
${exercise?.prompt ? `Exercise Prompt: "${exercise.prompt}"` : ''}

CRITICAL RULES:
1. Detect ALL real spelling mistakes, typos (e.g. "drnk" -> "drink"), incorrect verb tenses, subject-verb disagreements, incorrect prepositions, and improper word choices.
2. DO NOT flag or penalize missing punctuation, missing commas, or missing periods at the end of sentences.
3. For each error, provide the exact mistaken word/phrase, the correct British English replacement, the grammatical category, and a clear explanation in English of why it is an error according to the rules of English.
4. Provide a polished version of the sentence in natural British English.

Return a valid JSON object ONLY:
{
  "errors": [
    {
      "category": "Spelling & Typo",
      "mistake": "drnk",
      "correction": "drink",
      "rule": "Spelling mistake: 'drnk' is not a recognized English word; the correct spelling is 'drink'."
    }
  ],
  "polishedText": "The fully corrected sentence in natural British English.",
  "strengths": ["One or two specific positive comments about the student's writing."]
}`;

  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
  const cachedModel = localStorage.getItem('bev_working_gemini_model');
  if (cachedModel && models.includes(cachedModel)) {
    models.splice(models.indexOf(cachedModel), 1);
    models.unshift(cachedModel);
  }

  for (const model of models) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.1,
            maxOutputTokens: 1000
          }
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const json = await res.json();
        const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          localStorage.setItem('bev_working_gemini_model', model);
          let cleaned = text.trim();
          if (cleaned.startsWith('```')) {
            cleaned = cleaned.replace(/^```[a-zA-Z]*\n?/, '').replace(/\n?```$/, '').trim();
          }
          const s = cleaned.indexOf('{');
          const e = cleaned.lastIndexOf('}');
          if (s !== -1 && e !== -1 && e > s) {
            cleaned = cleaned.substring(s, e + 1);
          }
          const parsed = JSON.parse(cleaned);
          if (parsed && Array.isArray(parsed.errors)) {
            return parsed;
          }
        }
      }
    } catch (e) {
      // Continue to next model or LanguageTool fallback
    }
  }
  return null;
}

// ============================================================================
// COMPREHENSIVE LINGUISTIC & PEDAGOGICAL AUDIT ENGINE (100% ENGLISH)
// ============================================================================
export function makeGerund(verb) {
  const v = (verb || '').toLowerCase().trim();
  if (v === 'swim') return 'swimming';
  if (v === 'run') return 'running';
  if (v === 'sit') return 'sitting';
  if (v === 'get') return 'getting';
  if (v === 'travel') return 'travelling';
  if (v.endsWith('ie')) return v.slice(0, -2) + 'ying';
  if (v.endsWith('e') && !v.endsWith('ee')) return v.slice(0, -1) + 'ing';
  return v + 'ing';
}

export function runLinguisticAudit(cleanText) {
  return runDeepPedagogicalAudit(cleanText);
}

export function runDeepPedagogicalAudit(cleanText) {
  let polished = cleanText;
  const errors = [];

  function addError(err) {
    if (!errors.some(e => e.mistake.toLowerCase() === err.mistake.toLowerCase() && e.category === err.category)) {
      errors.push(err);
    }
  }

  // 1. Verb Form: Auxiliary (doesn't/don't/didn't) + [verb]s -> base verb
  const auxS = cleanText.match(/\b(doesn't|doesnt|don't|dont|didn't|didnt)\s+([a-z]+)s\b/i);
  if (auxS) {
    addError({
      category: 'Verb Form',
      classification: 'Incorrect',
      mistake: auxS[2] + 's',
      correction: auxS[2],
      explanation: 'After auxiliary verbs like "doesn\'t", "don\'t", or "didn\'t", the main verb must always appear in its bare base form without an "-s" ending.',
      rule: 'Auxiliary (do / does / did) + bare base verb.',
      examples: [
        'She doesn\'t like coffee (not: doesn\'t likes).',
        'He doesn\'t want to leave early.',
        'She didn\'t know the secret.'
      ],
      yourTurn: 'Write a negative sentence using "doesn\'t" and the base verb "want" or "like".',
      offset: auxS.index + auxS[1].length + 1
    });
    polished = polished.replace(new RegExp(`\\b(${auxS[1]})\\s+(${auxS[2]})s\\b`, 'i'), '$1 $2');
  }

  // 2. Past Auxiliary Form: didn't + [past verb] -> didn't + base verb
  const pastAux = cleanText.match(/\b(didn't|didnt)\s+(went|saw|bought|ate|took|made|came|drank|wrote|spoke)\b/i);
  if (pastAux) {
    const map = { went: 'go', saw: 'see', bought: 'buy', ate: 'eat', took: 'take', made: 'make', came: 'come', drank: 'drink', wrote: 'write', spoke: 'speak' };
    const baseVerb = map[pastAux[2].toLowerCase()] || pastAux[2];
    addError({
      category: 'Verb Form',
      classification: 'Incorrect',
      mistake: pastAux[2],
      correction: baseVerb,
      explanation: 'The auxiliary "didn\'t" already signals the past tense. Therefore, the main verb must remain in its bare infinitive form.',
      rule: 'Didn\'t + base verb (never use a past tense verb after didn\'t).',
      examples: [
        'He didn\'t go to London (not: didn\'t went).',
        'I didn\'t see him yesterday at the office.'
      ],
      yourTurn: 'Write a negative past sentence using "didn\'t" with "go" or "see".',
      offset: pastAux.index + pastAux[1].length + 1
    });
    polished = polished.replace(new RegExp(`\\b(${pastAux[1]})\\s+(${pastAux[2]})\\b`, 'i'), `$1 ${baseVerb}`);
  }

  // 3. Subject-Verb Agreement: he/she/it don't -> doesn't
  const subjNeg = cleanText.match(/\b(he|she|it)\s+(don't|dont)\b/i);
  if (subjNeg) {
    addError({
      category: 'Subject–Verb Agreement',
      classification: 'Incorrect',
      mistake: subjNeg[0],
      correction: `${subjNeg[1]} doesn't`,
      explanation: 'With third-person singular subjects ("he", "she", and "it"), always use "doesn\'t" instead of "don\'t" in the present simple negative.',
      rule: 'Doesn\'t + base verb.',
      examples: [
        'He doesn\'t work here on Mondays.',
        'She doesn\'t drink black coffee.',
        'It doesn\'t seem right to me.'
      ],
      yourTurn: 'Write a new sentence using "doesn\'t" with a different person and verb.',
      offset: subjNeg.index
    });
    polished = polished.replace(new RegExp(`\\b${subjNeg[1]}\\s+${subjNeg[2]}\\b`, 'i'), `${subjNeg[1]} doesn't`);
  }

  // 4. Subject-Verb Agreement: he/she/it have -> has
  const subjHave = cleanText.match(/\b(he|she|it)\s+(have)\b/i);
  if (subjHave) {
    addError({
      category: 'Subject–Verb Agreement',
      classification: 'Incorrect',
      mistake: subjHave[0],
      correction: `${subjHave[1]} has`,
      explanation: 'Third-person singular subjects ("he", "she", "it") require the singular verb form "has", whereas plural subjects take "have".',
      rule: 'He / She / It + has.',
      examples: [
        'She has an impressive vocabulary.',
        'He has a meeting in London tomorrow.'
      ],
      yourTurn: 'Write a sentence starting with "She has..."',
      offset: subjHave.index
    });
    polished = polished.replace(new RegExp(`\\b${subjHave[1]}\\s+have\\b`, 'i'), `${subjHave[1]} has`);
  }

  // 5. Subject-Verb Agreement: they/we/you is/was -> are/were
  const pluralBe = cleanText.match(/\b(they|we|you)\s+(is|was)\b/i);
  if (pluralBe) {
    const corrBe = pluralBe[2].toLowerCase() === 'is' ? 'are' : 'were';
    addError({
      category: 'Subject–Verb Agreement',
      classification: 'Incorrect',
      mistake: pluralBe[0],
      correction: `${pluralBe[1]} ${corrBe}`,
      explanation: 'Plural pronouns ("they", "we", "you") must agree with plural verb forms ("are" in the present, "were" in the past).',
      rule: 'They / We / You + are (or were).',
      examples: [
        'They are arriving at five o\'clock.',
        'We were very pleased with the outcome.'
      ],
      yourTurn: 'Write a sentence starting with "They are..." or "We were..."',
      offset: pluralBe.index
    });
    polished = polished.replace(new RegExp(`\\b${pluralBe[1]}\\s+${pluralBe[2]}\\b`, 'i'), `${pluralBe[1]} ${corrBe}`);
  }

  // 6. Subject-Verb Agreement: he/she/it + base verb without -s
  const singularBase = cleanText.match(/\b(he|she|it)\s+(go|like|want|need|work|look|feel|come|live|play|speak)\b/i);
  if (singularBase) {
    const v = singularBase[2].toLowerCase();
    const sForm = v === 'go' ? 'goes' : v + 's';
    addError({
      category: 'Subject–Verb Agreement',
      classification: 'Incorrect',
      mistake: singularBase[0],
      correction: `${singularBase[1]} ${sForm}`,
      explanation: 'In the Present Simple tense, when the subject is third-person singular ("he", "she", "it"), you must add "-s" or "-es" to the verb.',
      rule: 'He / She / It + verb(-s / -es).',
      examples: [
        'He goes to Oxford every Thursday.',
        'She speaks British English fluently.',
        'It looks brilliant in the morning light.'
      ],
      yourTurn: 'Write a sentence with "He" or "She" and a verb with an "-s" ending.',
      offset: singularBase.index
    });
    polished = polished.replace(new RegExp(`\\b${singularBase[1]}\\s+${singularBase[2]}\\b`, 'i'), `${singularBase[1]} ${sForm}`);
  }

  // 7. Preposition of Time: and/at/on/to the morning -> in the morning
  const prepMorning = cleanText.match(/\b(and|at|on|to)\s+(the\s+)?morning\b/i);
  if (prepMorning) {
    addError({
      category: 'Preposition Error',
      classification: 'Incorrect',
      mistake: prepMorning[0],
      correction: 'in the morning',
      explanation: 'In English, to express a time of day, use the preposition "in" ("in the morning"). The conjunction "and" links words, but cannot act as a time preposition.',
      rule: 'In + the morning / afternoon / evening.',
      examples: [
        'I always drink a fresh cup of coffee in the morning.',
        'She goes for a brisk run in the morning.'
      ],
      yourTurn: 'Write a sentence describing an activity you do "in the morning".',
      offset: prepMorning.index
    });
    polished = polished.replace(new RegExp(`\\b${prepMorning[0]}\\b`, 'i'), 'in the morning');
  }

  // 8. Preposition of Time: afternoon
  const prepAfternoon = cleanText.match(/\b(and|at|on|to)\s+(the\s+)?afternoon\b/i);
  if (prepAfternoon) {
    addError({
      category: 'Preposition Error',
      classification: 'Incorrect',
      mistake: prepAfternoon[0],
      correction: 'in the afternoon',
      explanation: 'To express that an event happens during the day, use "in the afternoon", never "and the afternoon" or "at the afternoon".',
      rule: 'In + the afternoon.',
      examples: [
        'We have our departmental briefing in the afternoon.',
        'I enjoy having afternoon tea in the afternoon.'
      ],
      yourTurn: 'Write a sentence about your schedule using "in the afternoon".',
      offset: prepAfternoon.index
    });
    polished = polished.replace(new RegExp(`\\b${prepAfternoon[0]}\\b`, 'i'), 'in the afternoon');
  }

  // 9. Preposition of Time: evening
  const prepEvening = cleanText.match(/\b(and|at|on|to)\s+(the\s+)?evening\b/i);
  if (prepEvening) {
    addError({
      category: 'Preposition Error',
      classification: 'Incorrect',
      mistake: prepEvening[0],
      correction: 'in the evening',
      explanation: 'The natural British English expression is "in the evening", not "and the evening" or "at the evening".',
      rule: 'In + the evening.',
      examples: [
        'They relax with a good book in the evening.',
        'Dinner is served at seven in the evening.'
      ],
      yourTurn: 'Write a sentence using "in the evening".',
      offset: prepEvening.index
    });
    polished = polished.replace(new RegExp(`\\b${prepEvening[0]}\\b`, 'i'), 'in the evening');
  }

  // 10. Preposition of Time: at night
  const prepNight = cleanText.match(/\b(and|in|on)\s+(the\s+)?night\b/i);
  if (prepNight) {
    addError({
      category: 'Preposition Error',
      classification: 'Incorrect',
      mistake: prepNight[0],
      correction: 'at night',
      explanation: 'For recurring or habitual night times, English pairs with "at" ("at night"), not "and night" or "in the night".',
      rule: 'At + night (for habitual night times).',
      examples: [
        'The stars look magnificent at night.',
        'I prefer listening to audiobooks at night.'
      ],
      yourTurn: 'Write a sentence using "at night".',
      offset: prepNight.index
    });
    polished = polished.replace(new RegExp(`\\b${prepNight[0]}\\b`, 'i'), 'at night');
  }

  // 11. Preposition with Days: on Monday
  const prepDays = cleanText.match(/\b(in|at|and)\s+(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/i);
  if (prepDays) {
    addError({
      category: 'Preposition Error',
      classification: 'Incorrect',
      mistake: prepDays[0],
      correction: `on ${prepDays[2]}`,
      explanation: 'Days of the week always take the preposition "on" (e.g. "on Monday"), never "in", "at", or "and".',
      rule: 'On + specific day of the week.',
      examples: [
        'Our project kicks off on Monday morning.',
        'I am meeting my colleague on Friday.'
      ],
      yourTurn: 'Write a sentence about your weekly plans using "on Friday" or "on Monday".',
      offset: prepDays.index
    });
    polished = polished.replace(new RegExp(`\\b${prepDays[0]}\\b`, 'i'), `on ${prepDays[2]}`);
  }

  // 12. Verb Pattern: enjoy to [verb] -> enjoy [verb]-ing
  const enjoyTo = cleanText.match(/\benjoy\s+to\s+([a-z]+)\b/i);
  if (enjoyTo) {
    const gerund = makeGerund(enjoyTo[1]);
    addError({
      category: 'Verb Pattern',
      classification: 'Incorrect',
      mistake: enjoyTo[0],
      correction: `enjoy ${gerund}`,
      explanation: 'The verb "enjoy" must be followed by a gerund (an "-ing" form), never by an infinitive with "to".',
      rule: 'Enjoy + [verb]-ing.',
      examples: [
        'I enjoy swimming in the open sea (not: enjoy to swim).',
        'She enjoys reading classic literature in the library.'
      ],
      yourTurn: 'Write a sentence about a favourite pastime using "I enjoy" followed by an "-ing" verb.',
      offset: enjoyTo.index
    });
    polished = polished.replace(new RegExp(`\\b${enjoyTo[0]}\\b`, 'i'), `enjoy ${gerund}`);
  }

  // 13. Verb Pattern: avoid to [verb] -> avoid [verb]-ing
  const avoidTo = cleanText.match(/\bavoid\s+to\s+([a-z]+)\b/i);
  if (avoidTo) {
    const gerund = makeGerund(avoidTo[1]);
    addError({
      category: 'Verb Pattern',
      classification: 'Incorrect',
      mistake: avoidTo[0],
      correction: `avoid ${gerund}`,
      explanation: 'The verb "avoid" takes a gerund ("-ing"), not an infinitive with "to".',
      rule: 'Avoid + [verb]-ing.',
      examples: [
        'I avoid travelling during peak hours.',
        'He avoids eating late at night.'
      ],
      yourTurn: 'Write a sentence with "avoid" and an "-ing" verb.',
      offset: avoidTo.index
    });
    polished = polished.replace(new RegExp(`\\b${avoidTo[0]}\\b`, 'i'), `avoid ${gerund}`);
  }

  // 14. Verb Pattern & Preposition: look forward to [verb] -> look forward to [verb]-ing
  const lookFwd = cleanText.match(/\blook\s+forward\s+to\s+([a-z]+)(?!ing\b)\b/i);
  if (lookFwd) {
    const gerund = makeGerund(lookFwd[1]);
    addError({
      category: 'Verb Pattern & Preposition',
      classification: 'Incorrect',
      mistake: lookFwd[0],
      correction: `look forward to ${gerund}`,
      explanation: 'In the expression "look forward to", the word "to" is a preposition, which requires a gerund ("-ing") form.',
      rule: 'Look forward to + [verb]-ing.',
      examples: [
        'I look forward to meeting you next week in Manchester.',
        'We look forward to hearing your thoughts.'
      ],
      yourTurn: 'Write a polite closing email sentence using "I look forward to" + "-ing".',
      offset: lookFwd.index
    });
    polished = polished.replace(new RegExp(`\\b${lookFwd[0]}\\b`, 'i'), `look forward to ${gerund}`);
  }

  // 15. Collocation: do a mistake -> make a mistake
  const doMistake = cleanText.match(/\b(do|doing|did|done)\s+(a\s+|some\s+)?mistake(s)?\b/i);
  if (doMistake) {
    const corr = doMistake[0].toLowerCase().replace(/\bdo\b/, 'make').replace(/\bdoing\b/, 'making').replace(/\bdid\b/, 'made').replace(/\bdone\b/, 'made');
    addError({
      category: 'Collocation & Word Choice',
      classification: 'Incorrect',
      mistake: doMistake[0],
      correction: corr,
      explanation: 'In English, we say "make a mistake", never "do a mistake". "Do" and "make" have fixed partner nouns.',
      rule: 'Make + a mistake (fixed English collocation).',
      examples: [
        'Everyone makes mistakes when learning something new.',
        'I made a mistake in my initial calculations.'
      ],
      yourTurn: 'Write a sentence using "made a mistake".',
      offset: doMistake.index
    });
    polished = polished.replace(new RegExp(`\\b${doMistake[0]}\\b`, 'i'), corr);
  }

  // 16. Collocation: make homework -> do homework
  const makeHw = cleanText.match(/\b(make|making|made)\s+(my\s+|the\s+)?homework\b/i);
  if (makeHw) {
    const corrHw = makeHw[0].toLowerCase().replace(/\bmake\b/, 'do').replace(/\bmaking\b/, 'doing').replace(/\bmade\b/, 'did');
    addError({
      category: 'Collocation & Word Choice',
      classification: 'Incorrect',
      mistake: makeHw[0],
      correction: corrHw,
      explanation: 'In English, tasks and study activities take "do": we say "do homework", not "make homework".',
      rule: 'Do + homework (action / task).',
      examples: [
        'I always do my homework before dinner.',
        'The students did their homework diligently.'
      ],
      yourTurn: 'Write a sentence with "do my homework".',
      offset: makeHw.index
    });
    polished = polished.replace(new RegExp(`\\b${makeHw[0]}\\b`, 'i'), corrHw);
  }

  // 17. Dependent Preposition: married with -> married to
  const marriedWith = cleanText.match(/\bmarried\s+with\b/i);
  if (marriedWith) {
    addError({
      category: 'Preposition Error',
      classification: 'Incorrect',
      mistake: 'married with',
      correction: 'married to',
      explanation: 'In English, someone is married "to" their partner, not "with".',
      rule: 'Married + to (person).',
      examples: [
        'He has been happily married to Charlotte for fifteen years.',
        'She is married to a talented musician.'
      ],
      yourTurn: 'Write a sentence using the phrase "married to".',
      offset: marriedWith.index
    });
    polished = polished.replace(/\bmarried\s+with\b/gi, 'married to');
  }

  // 18. Dependent Preposition: arrive to -> arrive at / in
  const arriveTo = cleanText.match(/\barrive\s+to\b/i);
  if (arriveTo) {
    addError({
      category: 'Preposition Error',
      classification: 'Incorrect',
      mistake: 'arrive to',
      correction: 'arrive at / in',
      explanation: 'The verb "arrive" pairs with "at" (for venues, buildings, airports) or "in" (for towns, cities, countries), never "to".',
      rule: 'Arrive at (a venue/airport) / Arrive in (a city/country).',
      examples: [
        'We arrived at Heathrow Airport early in the morning.',
        'The train arrived in Edinburgh right on time.'
      ],
      yourTurn: 'Write a sentence using "arrived at" or "arrived in".',
      offset: arriveTo.index
    });
    polished = polished.replace(/\barrive\s+to\b/gi, 'arrive at');
  }

  // 19. Direction Adverb: go/went to home -> go/went home
  const goToHome = cleanText.match(/\b(go|went|going|gone)\s+to\s+home\b/i);
  if (goToHome) {
    addError({
      category: 'Preposition Redundancy',
      classification: 'Incorrect',
      mistake: goToHome[0],
      correction: `${goToHome[1]} home`,
      explanation: 'In English, "home" acts as an adverb of direction; it does not take the preposition "to". Say "go home" or "went home".',
      rule: 'Go / went + home (no preposition).',
      examples: [
        'It is getting late, let us go home.',
        'He went home immediately after work.'
      ],
      yourTurn: 'Write a sentence using "went home".',
      offset: goToHome.index
    });
    polished = polished.replace(/\b(go|went|going|gone)\s+to\s+home\b/i, (m, v) => `${v} home`);
  }

  // 20. Verb Usage: I am agree -> I agree
  const amAgree = cleanText.match(/\bI\s+am\s+agree\b/i);
  if (amAgree) {
    addError({
      category: 'Verb Usage',
      classification: 'Incorrect',
      mistake: 'I am agree',
      correction: 'I agree',
      explanation: '"Agree" is an active verb, not an adjective. Therefore, you do not need the auxiliary verb "am". Simply say "I agree".',
      rule: 'Subject + agree (active verb without "am").',
      examples: [
        'I agree with your analysis completely.',
        'I agree that we need more practice.'
      ],
      yourTurn: 'Write a sentence starting with "I agree with..."',
      offset: amAgree.index
    });
    polished = polished.replace(/\bI\s+am\s+agree\b/gi, 'I agree');
  }

  // 21. Conjunction Redundancy: although ... but
  const althoughBut = cleanText.match(/\balthough\b(.*?)\bbut\b/i);
  if (althoughBut) {
    addError({
      category: 'Conjunction Redundancy',
      classification: 'Incorrect',
      mistake: 'although ... but',
      correction: 'Although (remove "but")',
      explanation: '"Although" and "but" are both contrastive connectors. Using both in one sentence creates a grammatical clash.',
      rule: 'Use "Although [clause], [main clause]" OR "[clause], but [main clause]". Never both.',
      examples: [
        'Although it was raining, we went for a lovely walk.',
        'It was raining, but we still went for a walk.'
      ],
      yourTurn: 'Write a sentence starting with "Although" without using "but".',
      offset: althoughBut.index
    });
    polished = polished.replace(/\bbut\b/gi, ',');
  }

  // 22. Preposition Redundancy: despite of -> despite
  const despiteOf = cleanText.match(/\bdespite\s+of\b/i);
  if (despiteOf) {
    addError({
      category: 'Preposition Redundancy',
      classification: 'Incorrect',
      mistake: 'despite of',
      correction: 'despite',
      explanation: '"Despite" is a single preposition that never takes "of". Alternatively, you can use the three-word phrase "in spite of".',
      rule: 'Despite + noun phrase (OR: in spite of).',
      examples: [
        'Despite the heavy traffic, we reached the theatre on time.',
        'In spite of the cold breeze, the walk was delightful.'
      ],
      yourTurn: 'Write a sentence beginning with "Despite the..."',
      offset: despiteOf.index
    });
    polished = polished.replace(/\bdespite\s+of\b/gi, 'despite');
  }

  // 23. Dependent Preposition: listen the / listen me -> listen to
  const listenPrep = cleanText.match(/\blisten\s+(the\s+music|music|the\s+radio|him|her|them|me)\b/i);
  if (listenPrep) {
    addError({
      category: 'Preposition Error',
      classification: 'Incorrect',
      mistake: listenPrep[0],
      correction: `listen to ${listenPrep[1]}`,
      explanation: 'The verb "listen" requires the preposition "to" before an object (e.g. "listen to music", "listen to me").',
      rule: 'Listen + to + object.',
      examples: [
        'I love to listen to podcasts while cooking.',
        'Please listen to the teacher carefully.'
      ],
      yourTurn: 'Write a sentence with "listen to".',
      offset: listenPrep.index
    });
    polished = polished.replace(new RegExp(`\\b${listenPrep[0]}\\b`, 'i'), `listen to ${listenPrep[1]}`);
  }

  // 24. Dependent Preposition: explain me -> explain to me
  const explainMe = cleanText.match(/\bexplain\s+(me|him|her|us|them)\b/i);
  if (explainMe) {
    addError({
      category: 'Preposition Error',
      classification: 'Incorrect',
      mistake: explainMe[0],
      correction: `explain to ${explainMe[1]}`,
      explanation: 'In English, you explain something "to" a person; you cannot place the person directly after "explain".',
      rule: 'Explain + something + to + person (e.g. explain this to me).',
      examples: [
        'Could you please explain this grammar rule to me?',
        'The doctor explained the procedure to him.'
      ],
      yourTurn: 'Write a sentence asking someone to "explain" something "to me".',
      offset: explainMe.index
    });
    polished = polished.replace(new RegExp(`\\b${explainMe[0]}\\b`, 'i'), `explain to ${explainMe[1]}`);
  }

  // 25. Articles before vowel: a apple -> an apple
  const aVowel = cleanText.match(/\b(a)\s+([aeiou][a-z]+)\b/i);
  if (aVowel && !/^(uni|eu|one)/i.test(aVowel[2])) {
    addError({
      category: 'Articles (a / an)',
      classification: 'Incorrect',
      mistake: aVowel[0],
      correction: `an ${aVowel[2]}`,
      explanation: 'Use the indefinite article "an" before words starting with a vowel sound (a, e, i, o, u) to make speech flow smoothly.',
      rule: 'An + vowel sound (e.g. an apple, an engineer, an orange).',
      examples: [
        'She is an exceptional British author.',
        'I had an apple and a cup of tea for breakfast.'
      ],
      yourTurn: 'Write a sentence using "an" before a word starting with a vowel.',
      offset: aVowel.index
    });
    polished = polished.replace(new RegExp(`\\b${aVowel[0]}\\b`, 'i'), `an ${aVowel[2]}`);
  }

  // 26. Articles before consonant: an book -> a book
  const anCons = cleanText.match(/\b(an)\s+([bcdfghjklmnpqrstvwxyz][a-z]+)\b/i);
  if (anCons && !/^(hour|honest|honor)/i.test(anCons[2])) {
    addError({
      category: 'Articles (a / an)',
      classification: 'Incorrect',
      mistake: anCons[0],
      correction: `a ${anCons[2]}`,
      explanation: 'Use the indefinite article "a" before words starting with a consonant sound.',
      rule: 'A + consonant sound (e.g. a book, a university, a doctor).',
      examples: [
        'He is a dedicated teacher.',
        'She bought a lovely new coat in London.'
      ],
      yourTurn: 'Write a sentence using "a" before a noun.',
      offset: anCons.index
    });
    polished = polished.replace(new RegExp(`\\b${anCons[0]}\\b`, 'i'), `a ${anCons[2]}`);
  }

  // 27. Past Tense with Time Marker: yesterday I go -> yesterday I went
  const pastMarker = cleanText.match(/\b(yesterday|last\s+night|last\s+week|last\s+year|two\s+days\s+ago)\b.*?\b(I|he|she|they|we)\s+(go|see|buy|eat|make|meet|take|drink|write)\b/i);
  if (pastMarker) {
    const map = { go: 'went', see: 'saw', buy: 'bought', ate: 'ate', make: 'made', meet: 'met', take: 'took', drink: 'drank', write: 'wrote' };
    const pastV = map[pastMarker[3].toLowerCase()] || pastMarker[3];
    addError({
      category: 'Past Tense Consistency',
      classification: 'Incorrect',
      mistake: `${pastMarker[2]} ${pastMarker[3]}`,
      correction: `${pastMarker[2]} ${pastV}`,
      explanation: 'When describing finished events with past time markers like "yesterday", use the Past Simple form of the verb.',
      rule: 'Past time marker + Past Simple verb form.',
      examples: [
        'Yesterday I went to the British Museum.',
        'Last night we ate a delicious traditional dinner.'
      ],
      yourTurn: 'Write a sentence about yesterday using the past simple verb "went" or "bought".',
      offset: pastMarker.index
    });
    polished = polished.replace(new RegExp(`\\b${pastMarker[2]}\\s+${pastMarker[3]}\\b`, 'i'), `${pastMarker[2]} ${pastV}`);
  }

  // 28. Pronoun Capitalization: i -> I
  const smallI = cleanText.match(/\b(i)\b/);
  if (smallI) {
    addError({
      category: 'Capitalization',
      classification: 'Incorrect',
      mistake: 'i',
      correction: 'I',
      explanation: 'In English, the personal pronoun "I" must always be capitalized, regardless of where it appears in the sentence.',
      rule: 'The pronoun "I" is always an uppercase capital letter.',
      examples: [
        'My friend and I went to Oxford.',
        'Every morning, I drink English breakfast tea.'
      ],
      yourTurn: 'Write a sentence containing the pronoun "I".',
      offset: smallI.index
    });
    polished = polished.replace(/\bi\b/g, 'I');
  }

  // Sort errors by order of appearance in original text
  errors.sort((a, b) => (a.offset || 0) - (b.offset || 0));

  return { errors, polished };
}

export async function auditWritingSubmission(text, exercise = {}) {
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
      errors: [{ 
        category: 'Empty Submission', 
        mistake: 'Blank entry', 
        correction: 'Type your sentence in English',
        rule: 'Please enter your response before submitting.',
        explanation: 'Please enter your response before submitting.'
      }],
      suggestions: ['Write your thoughts in the text area above.'],
      strengths: [],
      polishedText: ''
    };
  }

  // 1. Mandatory Target Words Check (for Sentence Builder)
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
        mistake: `Missing: ${missingWords.join(', ')}`,
        correction: `Include all mandatory words: [${exercise.words.join(', ')}]`,
        rule: `This challenge requires you to incorporate all target words in your sentence: ${missingWords.join(', ')}.`,
        explanation: `This challenge requires you to incorporate all target words in your sentence: ${missingWords.join(', ')}.`
      });
    } else {
      strengths.push(`✨ Successfully incorporated all mandatory target words: [${exercise.words.join(', ')}].`);
    }
  }

  if (exercise.word) {
    const stem = exercise.word.toLowerCase().replace(/ing$|ed$|s$|es$/g, '');
    const regex = new RegExp(`\\b${stem}`, 'i');
    if (!regex.test(cleanText)) {
      errors.push({
        category: 'Missing Target Word',
        mistake: `Word "${exercise.word}" not found`,
        correction: `Include "${exercise.word}" in your sentence`,
        rule: `Make sure your sentence includes the target vocabulary word "${exercise.word}".`,
        explanation: `Make sure your sentence includes the target vocabulary word "${exercise.word}".`
      });
    } else {
      strengths.push(`🎯 Great job weaving the target word "${exercise.word}" into your writing.`);
    }
  }

  // 2. Minimum Sentences / Word Count Check (Gentle guide)
  const sentences = cleanText.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  if (exercise.minSentences && sentences.length < exercise.minSentences) {
    errors.push({
      category: 'Sentence Count',
      mistake: `Wrote ${sentences.length} sentence(s)`,
      correction: `Aim for at least ${exercise.minSentences} sentences`,
      rule: `The prompt requests a fuller reflection with at least ${exercise.minSentences} complete thoughts.`,
      explanation: `The prompt requests a fuller reflection with at least ${exercise.minSentences} complete thoughts.`
    });
  }

  if (exercise.minWords && wordCount < exercise.minWords) {
    errors.push({
      category: 'Word Count',
      mistake: `${wordCount} words written`,
      correction: `Expand to at least ${exercise.minWords} words`,
      rule: `Expand your ideas with more descriptive adjectives, reasons, and sensory details.`,
      explanation: `Expand your ideas with more descriptive adjectives, reasons, and sensory details.`
    });
  }

  let polished = cleanText;

  // 3. LanguageTool AI (Catches real spelling typos like "drnk" -> "drink", verb tenses, and British English rules)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const body = new URLSearchParams();
    body.append('text', cleanText);
    body.append('language', 'en-GB');

    const res = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.matches)) {
        // Filter out punctuation / period / comma rules (NO punctuation penalties as requested!)
        const validMatches = data.matches.filter(m => {
          const ruleId = m.rule?.id || '';
          const issueType = m.rule?.issueType || '';
          const catId = m.rule?.category?.id || '';
          if (
            catId === 'PUNCTUATION' ||
            catId === 'TYPOGRAPHY' ||
            issueType === 'whitespace' ||
            /PUNCTUATION|PERIOD|COMMA|APOSTROPHE|PARAGRAPH_END|WHITESPACE|SENTENCE_END/i.test(ruleId)
          ) {
            return false;
          }
          return true;
        });

        // Apply replacements from back to front to construct polished British text
        const sortedDesc = [...validMatches].sort((a, b) => b.offset - a.offset);
        for (const m of sortedDesc) {
          if (m.replacements && m.replacements.length > 0) {
            const best = m.replacements[0].value;
            polished = polished.substring(0, m.offset) + best + polished.substring(m.offset + m.length);
          }
        }

        // Add each detected error with pedagogical explanation fields
        for (const m of validMatches) {
          const mistakeWord = cleanText.substring(m.offset, m.offset + m.length);
          const suggested = m.replacements?.[0]?.value || '';
          const isSpelling = m.rule?.issueType === 'misspelling' || /spelling|typo/i.test(m.rule?.category?.name || '');
          const catName = isSpelling ? 'Spelling & Typo' : (m.rule?.category?.name || 'Grammar');
          let ruleMsg = m.message || m.rule?.description || 'Grammatical rule in British English.';

          if (suggested && !ruleMsg.toLowerCase().includes(suggested.toLowerCase())) {
            ruleMsg += ` Did you mean "${suggested}"?`;
          }

          const explanation = isSpelling
            ? `The word "${mistakeWord}" is misspelled. In British English, the correct spelling is "${suggested}".`
            : ruleMsg;

          const ruleFormula = isSpelling
            ? `Standard British English orthography: "${suggested}".`
            : (m.rule?.description || 'Follow standard British English grammar.');

          const examples = suggested
            ? [`Correct British usage: "${suggested}".`, `Always ensure accurate spelling in formal and daily writing.`]
            : ['Review the sentence structure carefully.'];

          const yourTurn = suggested
            ? `Write a new sentence correctly spelling or using "${suggested}".`
            : 'Write a sentence applying this grammar rule.';

          errors.push({
            category: catName,
            classification: 'Incorrect',
            mistake: mistakeWord,
            correction: suggested,
            explanation: explanation,
            rule: ruleFormula,
            examples: examples,
            yourTurn: yourTurn
          });
        }
      }
    }
  } catch (err) {
    console.warn('LanguageTool AI API call failed or timed out', err);
  }

  // 4. Linguistic & Preposition Audit Engine (Accurately corrects prepositions and idioms on polished text)
  const lingAudit = runLinguisticAudit(cleanText);
  if (lingAudit.errors.length > 0) {
    lingAudit.errors.forEach(err => {
      const alreadyCaught = errors.some(e => e.mistake && e.mistake.toLowerCase().includes(err.mistake.toLowerCase()));
      if (!alreadyCaught) {
        errors.push(err);
      }
    });
    polished = lingAudit.polished;
  }

  // Also verify polished text against lingAudit to catch chained fixes
  const secondPass = runLinguisticAudit(polished);
  if (secondPass.polished) {
    polished = secondPass.polished;
  }

  // 5. Gemini AI Call (if configured by user)
  try {
    const geminiRes = await auditWithGemini(cleanText, exercise);
    if (geminiRes && Array.isArray(geminiRes.errors)) {
      if (geminiRes.polishedText) polished = geminiRes.polishedText;
      if (Array.isArray(geminiRes.strengths)) strengths.push(...geminiRes.strengths);

      geminiRes.errors.forEach(err => {
        if (!/punctuation|period|comma/i.test(err.category || '') && !/punctuation|period|comma/i.test(err.mistake || '')) {
          const already = errors.some(e => e.mistake && e.mistake.toLowerCase().includes((err.mistake || '').toLowerCase()));
          if (!already) {
            errors.push({
              category: err.category || 'Grammar',
              classification: err.classification || 'Incorrect',
              mistake: err.mistake || '',
              correction: err.correction || '',
              explanation: err.explanation || err.rule || 'Grammatical rule in English.',
              rule: err.rule || err.explanation || 'Grammatical rule in English.',
              examples: err.examples || [`Correct usage: ${err.correction || 'accurate form'}.`],
              yourTurn: err.yourTurn || `Write a new sentence using "${err.correction || 'the correct form'}".`
            });
          }
        }
      });
    }
  } catch (geminiErr) {
    console.warn('Gemini check error:', geminiErr);
  }

  // Capitalize initial letter and pronoun "I" in polished version
  polished = polished.charAt(0).toUpperCase() + polished.slice(1);
  polished = polished.replace(/\bi\b/g, 'I');
  if (!/[.!?]$/.test(polished)) polished += '.';

  // Strengths & Highlights
  if (wordCount >= 14) {
    strengths.push(`Rich sentence length (${wordCount} words) showcasing natural descriptive ability.`);
  }
  if (/(furthermore|however|consequently|therefore|moreover|nevertheless|because|although|despite)/i.test(cleanText)) {
    strengths.push('Great use of cohesive conjunctions and transitional linkers.');
  }
  if (errors.length === 0) {
    strengths.push('Flawless grammar and spelling! No structural or vocabulary mistakes detected.');
  }

  // 6. Identify Repeated Mistakes & Recurring Patterns
  const errorStats = getErrorStats();
  const recurringPatterns = [];
  errors.forEach(err => {
    const cat = err.category;
    const prevCount = errorStats[cat] || 0;
    if (prevCount >= 2 && !recurringPatterns.some(r => r.category === cat)) {
      recurringPatterns.push({
        category: cat,
        previousCount: prevCount,
        explanation: err.explanation,
        rule: err.rule,
        targetedExercise: err.yourTurn || `Write 2 practice sentences focusing on ${cat}.`
      });
    }
  });

  // Score calculation (never penalizes missing periods or punctuation)
  const score = errors.length === 0 ? 100 : Math.max(20, Math.min(90, 100 - (errors.length * 15)));

  return {
    isValid: errors.length === 0,
    score,
    errors,
    recurringPatterns,
    suggestions,
    strengths,
    polishedText: polished
  };
}

// ============================================================================
// UI RENDERING & CONTROLLER (100% ENGLISH & REDESIGNED BUTTONS)
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
    <div class="card daily-practice-hero" style="background: linear-gradient(135deg, rgba(0,36,125,0.07), rgba(212,175,55,0.14)); border: 1px solid var(--border-color); border-radius: 16px; padding: 1.6rem 2rem; margin-bottom: 1.5rem; position: relative; overflow: hidden;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(212,175,55,0.18); color: var(--gold-dark, #A6801C); font-weight: 800; font-size: 0.8rem; padding: 0.35rem 0.85rem; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.6rem;">
            <i class="fa-solid fa-pen-nib"></i> Daily Practice Laboratory
          </div>
          <h1 style="margin: 0 0 0.4rem 0; font-size: 1.9rem; font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 0.6rem;">
            Writing Lab ✍️
          </h1>
          <p style="margin: 0; color: var(--text-muted); font-size: 0.95rem; max-width: 650px; line-height: 1.5;">
            Master writing authentic British English independently — build complex sentences, craft stories, rewrite real-life notes, and gain lifelong fluency.
          </p>
        </div>

        <!-- Quick Stats Badges -->
        <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
          <div class="stat-pill-badge" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 14px; padding: 0.7rem 1.1rem; text-align: center; min-width: 95px; box-shadow: var(--card-shadow);">
            <div style="font-size: 1.3rem; font-weight: 800; color: #EF4444;" id="ui-writing-streak">
              🔥 ${streak} <span style="font-size: 0.75rem; font-weight: 600;">Days</span>
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Streak</div>
          </div>
          <div class="stat-pill-badge" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 14px; padding: 0.7rem 1.1rem; text-align: center; min-width: 95px; box-shadow: var(--card-shadow);">
            <div style="font-size: 1.3rem; font-weight: 800; color: var(--gold-dark, #D4AF37);" id="ui-writing-xp">
              ⚡ ${xp} <span style="font-size: 0.75rem; font-weight: 600;">XP</span>
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Writing XP</div>
          </div>
          <div class="stat-pill-badge" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 14px; padding: 0.7rem 1.1rem; text-align: center; min-width: 95px; box-shadow: var(--card-shadow);">
            <div style="font-size: 1.3rem; font-weight: 800; color: #10B981;" id="ui-writing-completed">
              📝 ${completed}
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Completed</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs Bar (Modern 2-Button Segmented Control) -->
    <div style="margin-bottom: 1.2rem;">
      <div class="practice-subtab-container" id="practice-subtab-bar">
        <button type="button" class="practice-tab-btn active" data-subtab="challenges">
          <i class="fa-solid fa-shapes"></i>
          <span>Writing Challenges <span class="tab-badge">8 Modes</span></span>
        </button>
        <button type="button" class="practice-tab-btn" data-subtab="error-tracker">
          <i class="fa-solid fa-chart-pie"></i>
          <span>Personal Error Tracker</span>
        </button>
      </div>

      <!-- Difficulty Level Pill Selector -->
      <div id="level-pill-container" style="display: flex; gap: 0.35rem; background: var(--input-bg); padding: 0.35rem 0.5rem; border-radius: 20px; border: 1px solid var(--border-color); width: fit-content; margin: 0.6rem auto 0 auto; flex-wrap: wrap; justify-content: center;">
        <button type="button" class="btn-level-filter active" data-level="all" style="border: none; background: var(--card-bg); color: var(--text-main); font-size: 0.82rem; font-weight: 700; padding: 0.35rem 0.85rem; border-radius: 16px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">All Levels</button>
        <button type="button" class="btn-level-filter" data-level="beginner" style="border: none; background: transparent; color: var(--text-muted); font-size: 0.82rem; font-weight: 600; padding: 0.35rem 0.85rem; border-radius: 16px; cursor: pointer;">🌱 Beginner</button>
        <button type="button" class="btn-level-filter" data-level="intermediate" style="border: none; background: transparent; color: var(--text-muted); font-size: 0.82rem; font-weight: 600; padding: 0.35rem 0.85rem; border-radius: 16px; cursor: pointer;">🌿 Intermediate</button>
        <button type="button" class="btn-level-filter" data-level="advanced" style="border: none; background: transparent; color: var(--text-muted); font-size: 0.82rem; font-weight: 600; padding: 0.35rem 0.85rem; border-radius: 16px; cursor: pointer;">🌲 Advanced</button>
      </div>
    </div>

    <!-- SUB-VIEW CONTAINER -->
    <div id="practice-subview-content"></div>
  `;

  renderCurrentSubTab();
}

function renderCurrentSubTab() {
  const container = document.getElementById('practice-subview-content');
  if (!container) return;

  const levelPills = document.getElementById('level-pill-container');

  if (activeSubTab === 'challenges') {
    if (levelPills) levelPills.style.display = 'flex';
    renderChallengesView(container);
  } else if (activeSubTab === 'error-tracker') {
    if (levelPills) levelPills.style.display = 'none';
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
          <i class="fa-solid fa-shapes" style="color: var(--gold);"></i> Select a Writing Challenge:
        </h3>
        <span style="font-size: 0.82rem; color: var(--text-muted);">8 Modes Available</span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 0.8rem;" id="writing-modes-grid">
        ${WRITING_MODES.map(mode => {
          const isActive = mode.id === activeMode;
          return `
            <div class="practice-mode-card ${isActive ? 'active-mode' : ''}" data-mode-id="${mode.id}" style="
              background: var(--card-bg);
              border: 2px solid ${isActive ? mode.color : 'var(--border-color)'};
              border-radius: 14px;
              padding: 1rem 1.1rem;
              cursor: pointer;
              box-shadow: ${isActive ? '0 8px 24px rgba(0,0,0,0.08)' : 'var(--card-shadow)'};
              display: flex;
              align-items: flex-start;
              gap: 0.8rem;
              position: relative;
            ">
              <div style="
                width: 40px;
                height: 40px;
                border-radius: 12px;
                background: ${mode.color}15;
                color: ${mode.color};
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.15rem;
                flex-shrink: 0;
              ">
                <i class="fa-solid ${mode.icon}"></i>
              </div>
              <div style="flex: 1; min-width: 0;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem;">
                  <strong style="font-size: 0.95rem; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${mode.title}</strong>
                  <span style="font-size: 0.72rem; font-weight: 800; color: #10B981; background: #10B98115; padding: 0.15rem 0.45rem; border-radius: 8px;">+${mode.xpReward} XP</span>
                </div>
                <div style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                  ${mode.desc}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Active Writing Exercise Workbench -->
    <div class="card active-workbench-card" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 16px; padding: 1.6rem; box-shadow: var(--card-shadow); margin-bottom: 2rem;">
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

function getExercisePromptText(exercise, mode) {
  if (!exercise) return '';
  let txt = '';
  if (mode && mode.title) txt += `🇬🇧 British English Practice - ${mode.title}\n\n`;
  if (exercise.badText) {
    txt += `Challenge: Rewrite this sentence correctly:\n"${exercise.badText}"`;
  } else if (exercise.prompt) {
    txt += `Challenge Prompt:\n${exercise.prompt}`;
  } else if (exercise.topic) {
    txt += `Paragraph Topic: ${exercise.topic}`;
  } else if (exercise.word) {
    txt += `Featured Vocabulary: ${exercise.word} (${exercise.partOfSpeech || 'Word'})`;
  }
  if (exercise.starter) {
    txt += `\nOpening Line: "${exercise.starter}"`;
  }
  if (exercise.words && exercise.words.length) {
    txt += `\nTarget Words to Include: ${exercise.words.join(', ')}`;
  }
  return txt;
}

function renderExerciseWorkbench(mode, exercise, totalAvailable) {
  if (!exercise) {
    return `<div style="text-align: center; padding: 2rem; color: var(--text-muted);">No exercises found for this level. Please select "All Levels".</div>`;
  }

  return `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.8rem;">
      <div style="display: flex; align-items: center; gap: 0.8rem;">
        <span style="width: 36px; height: 36px; border-radius: 10px; background: ${mode.color}20; color: ${mode.color}; display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">
          <i class="fa-solid ${mode.icon}"></i>
        </span>
        <div>
          <h2 style="margin: 0; font-size: 1.35rem; font-weight: 800; color: var(--text-main);">
            ${mode.title}
          </h2>
          <div style="font-size: 0.82rem; color: var(--text-muted);">
            Challenge ${(currentExerciseIndex % totalAvailable) + 1} of ${totalAvailable}
            ${exercise.level ? `• <span style="text-transform: capitalize; font-weight: 700; color: var(--uk-blue);">${exercise.level}</span>` : ''}
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
        <button type="button" id="btn-copy-practice-prompt" class="practice-btn-copy" style="font-size: 0.85rem; padding: 0.55rem 1.05rem;" title="Copy exercise prompt">
          <i class="fa-regular fa-copy"></i> <span>Copy Prompt</span>
        </button>
        <button type="button" id="btn-share-practice-prompt" class="practice-btn-share" style="font-size: 0.85rem; padding: 0.55rem 1.05rem;" title="Share exercise challenge">
          <i class="fa-solid fa-share-nodes"></i> <span>Share Challenge</span>
        </button>
        <button type="button" id="btn-next-prompt" class="practice-btn-secondary" style="font-size: 0.85rem; padding: 0.55rem 1.1rem;">
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
      <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.1rem;">
        <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">Mandatory Words:</span>
        ${exercise.words.map(w => `
          <span class="badge-target-word" data-word="${w.toLowerCase()}" style="background: rgba(59,130,246,0.12); color: #2563EB; border: 1px solid rgba(59,130,246,0.3); font-weight: 700; font-size: 0.82rem; padding: 0.3rem 0.75rem; border-radius: 20px; transition: all 0.2s ease;">
            <i class="fa-solid fa-circle-dot" style="font-size: 0.6rem; margin-right: 0.3rem;"></i> ${w}
          </span>
        `).join('')}
      </div>
    ` : ''}

    ${exercise.word ? `
      <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 1.1rem;">
        <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">Target Vocabulary:</span>
        <span class="badge-target-word" data-word="${exercise.word.toLowerCase()}" style="background: rgba(236,72,153,0.12); color: #DB2777; border: 1px solid rgba(236,72,153,0.3); font-weight: 800; font-size: 0.88rem; padding: 0.35rem 0.9rem; border-radius: 20px; display: inline-flex; align-items: center; gap: 0.4rem;">
          <i class="fa-solid fa-gem"></i> ${exercise.word}
        </span>
        <button type="button" id="btn-audio-prompt-word" class="icon-btn" style="width: 36px; height: 36px;" title="Listen to British pronunciation">
          <i class="fa-solid fa-volume-high" style="color: var(--uk-blue);"></i>
        </button>
      </div>
    ` : ''}

    <!-- Gradual Hints Banner -->
    <div style="margin-bottom: 1.2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <button type="button" id="btn-reveal-hint" class="practice-btn-hint">
          <i class="fa-solid fa-lightbulb"></i>
          <span>${hintStage === 0 ? 'Need a hint? (Step-by-step)' : `Next Hint (${hintStage}/${exercise.hints ? exercise.hints.length : 1})`}</span>
        </button>
        ${hintStage > 0 ? `<span style="font-size: 0.78rem; font-weight: 600; color: var(--text-muted);">Hint unlocked</span>` : ''}
      </div>

      <div id="hints-display-area" style="margin-top: 0.6rem;">
        ${renderHintsBox(exercise)}
      </div>
    </div>

    <!-- Writing Input Textarea Area -->
    <div style="margin-bottom: 1.2rem; position: relative;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.45rem; flex-wrap: wrap; gap: 0.5rem;">
        <label for="practice-textarea" style="font-size: 0.88rem; font-weight: 700; color: var(--text-main); margin: 0; display: flex; align-items: center; gap: 0.4rem;">
          <span>✍️ Write your English response:</span>
          <span id="char-word-counter" style="font-weight: 500; color: var(--text-muted); font-size: 0.82rem; margin-left: 0.4rem;">0 words • 0 characters</span>
        </label>
        <div style="display: flex; gap: 0.45rem; align-items: center;">
          <button type="button" id="btn-copy-practice-writing-top" class="practice-btn-copy" style="padding: 0.35rem 0.85rem; font-size: 0.82rem; border-radius: 10px;" title="Copy written sentence">
            <i class="fa-regular fa-copy"></i> <span>Copy</span>
          </button>
          <button type="button" id="btn-share-practice-writing-top" class="practice-btn-share" style="padding: 0.35rem 0.85rem; font-size: 0.82rem; border-radius: 10px;" title="Share sentence">
            <i class="fa-solid fa-share-nodes"></i> <span>Share</span>
          </button>
        </div>
      </div>
      <textarea id="practice-textarea" rows="4" placeholder="${getPlaceholderForMode(mode.id, exercise)}" style="
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
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      "></textarea>
    </div>

    <!-- Action Buttons (Modern, Comfortable, Distinct Copy & Share) -->
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem;">
      <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
        <button type="button" id="btn-check-writing" class="practice-btn-primary">
          <i class="fa-solid fa-magnifying-glass-check"></i> <span>Check My Writing & Feedback</span>
        </button>

        <button type="button" id="btn-copy-practice-writing" class="practice-btn-copy" title="Copy written sentence">
          <i class="fa-regular fa-copy"></i> <span>Copy</span>
        </button>

        <button type="button" id="btn-share-practice-writing" class="practice-btn-share" title="Share sentence">
          <i class="fa-solid fa-share-nodes"></i> <span>Share</span>
        </button>

        <button type="button" id="btn-clear-writing" class="practice-btn-secondary">
          <i class="fa-solid fa-eraser"></i> <span>Clear</span>
        </button>
      </div>

      <div style="font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.4rem;">
        <i class="fa-solid fa-shield-halved" style="color: #10B981;"></i> Automatic Grammar, Spelling & Syntax Diagnosis
      </div>
    </div>

    <!-- Real-Time / Checked Feedback Box Area -->
    <div id="writing-feedback-area" style="margin-top: 1.6rem; display: none;"></div>
  `;
}

function renderExercisePromptContent(modeId, ex) {
  if (modeId === 'fix-my-writing') {
    return `
      <div style="font-size: 0.85rem; font-weight: 700; color: #EF4444; margin-bottom: 0.3rem;">
        <i class="fa-solid fa-triangle-exclamation"></i> FLAGGED SENTENCE WITH GRAMMATICAL ERRORS:
      </div>
      <div style="font-size: 1.25rem; font-weight: 800; color: var(--text-main); font-style: italic; margin-bottom: 0.6rem; letter-spacing: -0.01em;">
        "${ex.badText}"
      </div>
      <div style="font-size: 0.9rem; color: var(--text-muted);">
        <strong>Task:</strong> Rewrite this sentence correctly in English. Afterwards, you will receive full explanations of each mistake.
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
      <div style="font-size: 1.05rem; color: var(--text-main); margin-bottom: 0.5rem;">
        <strong>Definition:</strong> ${ex.definition}
      </div>
      <div style="background: rgba(0,0,0,0.03); border-radius: 8px; padding: 0.6rem 0.9rem; font-size: 0.88rem; color: var(--text-muted); font-style: italic;">
        Example: "${ex.exampleSentence}"
      </div>
    `;
  }

  if (modeId === 'expand-sentence') {
    return `
      <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.3rem;">
        Base Simple Sentence:
      </div>
      <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
        "${ex.baseSentence}"
      </div>
      <div style="font-size: 0.95rem; color: var(--uk-blue); font-weight: 600; margin-bottom: 0.2rem;">
        🎯 Target: ${ex.targetGoal}
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
      ${ex.structureGuide ? `
        <div style="background: rgba(99,102,241,0.06); border-radius: 8px; padding: 0.6rem 0.8rem; font-size: 0.82rem; color: var(--text-main); line-height: 1.5;">
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
    <div style="background: rgba(212,175,55,0.1); border: 1px dashed var(--gold); border-radius: 10px; padding: 0.9rem 1.1rem;">
      <div style="font-size: 0.82rem; font-weight: 700; color: var(--gold-dark, #A6801C); margin-bottom: 0.4rem;">
        <i class="fa-solid fa-lightbulb"></i> Step-by-Step Writing Guidance:
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
  container.querySelectorAll('.practice-mode-card').forEach(card => {
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
        hintStage = 1; // cycle
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

  // Copy & Share for Prompt
  const copyPromptBtn = document.getElementById('btn-copy-practice-prompt');
  if (copyPromptBtn) {
    copyPromptBtn.addEventListener('click', () => {
      const exerciseList = getFilteredExerciseList(activeMode);
      const curEx = exerciseList[currentExerciseIndex % exerciseList.length];
      const curMode = WRITING_MODES.find(m => m.id === activeMode);
      const promptText = getExercisePromptText(curEx, curMode);
      if (promptText) {
        copyTextToClipboard(promptText, 'Challenge prompt copied to clipboard! 📋');
      }
    });
  }

  const sharePromptBtn = document.getElementById('btn-share-practice-prompt');
  if (sharePromptBtn) {
    sharePromptBtn.addEventListener('click', () => {
      const exerciseList = getFilteredExerciseList(activeMode);
      const curEx = exerciseList[currentExerciseIndex % exerciseList.length];
      const curMode = WRITING_MODES.find(m => m.id === activeMode);
      const promptText = getExercisePromptText(curEx, curMode);
      if (promptText) {
        shareTextContent(`British English Practice: ${curMode ? curMode.title : 'Writing Challenge'}`, promptText);
      }
    });
  }

  // Copy & Share for written practice sentence (both top and bottom buttons)
  const handleCopyWriting = () => {
    const text = textarea ? textarea.value.trim() : '';
    if (!text) {
      showCopyShareToast('Please write your sentence first to copy!', 'fa-circle-exclamation');
      return;
    }
    copyTextToClipboard(text, 'Practice sentence copied to clipboard! 📋');
  };

  const handleShareWriting = () => {
    const text = textarea ? textarea.value.trim() : '';
    if (!text) {
      showCopyShareToast('Please write your sentence first to share!', 'fa-circle-exclamation');
      return;
    }
    const curMode = WRITING_MODES.find(m => m.id === activeMode);
    shareTextContent(`My British English Practice (${curMode ? curMode.title : 'Writing'})`, text);
  };

  const copyPracticeBtn = document.getElementById('btn-copy-practice-writing');
  if (copyPracticeBtn) copyPracticeBtn.addEventListener('click', handleCopyWriting);

  const copyPracticeTopBtn = document.getElementById('btn-copy-practice-writing-top');
  if (copyPracticeTopBtn) copyPracticeTopBtn.addEventListener('click', handleCopyWriting);

  const sharePracticeBtn = document.getElementById('btn-share-practice-writing');
  if (sharePracticeBtn) sharePracticeBtn.addEventListener('click', handleShareWriting);

  const sharePracticeTopBtn = document.getElementById('btn-share-practice-writing-top');
  if (sharePracticeTopBtn) sharePracticeTopBtn.addEventListener('click', handleShareWriting);

  // Check writing button
  const checkBtn = document.getElementById('btn-check-writing');
  if (checkBtn && textarea) {
    checkBtn.addEventListener('click', async () => {
      const text = textarea.value.trim();
      const exerciseList = getFilteredExerciseList(activeMode);
      const curEx = exerciseList[currentExerciseIndex % exerciseList.length];
      const curMode = WRITING_MODES.find(m => m.id === activeMode);

      const originalHtml = checkBtn.innerHTML;
      checkBtn.disabled = true;
      checkBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Checking with AI...</span>';

      try {
        const feedback = await auditWritingSubmission(text, curEx);
        lastCheckedFeedback = feedback;

        // Render feedback UI
        const fbArea = document.getElementById('writing-feedback-area');
        if (fbArea) {
          fbArea.style.display = 'block';
          fbArea.innerHTML = renderFeedbackCard(feedback, text, curEx, curMode);
          fbArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          // Bind Copy & Share for Feedback Card
          const copySubBtn = document.getElementById('btn-copy-practice-submission');
          if (copySubBtn) {
            copySubBtn.addEventListener('click', () => {
              copyTextToClipboard(text, 'My practice sentence copied! 📋');
            });
          }
          const shareSubBtn = document.getElementById('btn-share-practice-submission');
          if (shareSubBtn) {
            shareSubBtn.addEventListener('click', () => {
              const errorsSummary = feedback.errors && feedback.errors.length > 0 
                ? `\nIdentified Mistakes: ${feedback.errors.length}\n` + feedback.errors.map((e, i) => `${i+1}. ${e.category} - ${e.rule}`).join('\n')
                : '\nFlawless writing - Zero mistakes!';
              const shareContent = `🇬🇧 British English Practice (${curMode ? curMode.title : 'Writing'})\n\nMy Text: "${text}"\nQuality Score: ${feedback.score}/100${errorsSummary}`;
              shareTextContent('My British English Writing Practice', shareContent);
            });
          }
        }

        // Record errors if any
        if (feedback.errors && feedback.errors.length > 0) {
          recordDetectedErrors(feedback.errors);
        }

        // If valid or decent score, award XP & streak
        if (feedback.isValid || feedback.score >= 70) {
          const rewardXP = curMode ? curMode.xpReward : 25;
          recordWritingSessionSuccess(rewardXP);
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
      } catch (err) {
        console.error('Error during AI writing check:', err);
      } finally {
        checkBtn.disabled = false;
        checkBtn.innerHTML = originalHtml;
      }
    });
  }
}

// ============================================================================
// BEAUTIFUL FEEDBACK CARD (7 PEDAGOGICAL FIELDS + RECURRING PATTERNS)
// ============================================================================
function renderFeedbackCard(feedback, originalText, exercise = {}, mode = {}) {
  const isPerfect = feedback.isValid && (!feedback.errors || feedback.errors.length === 0);
  const xpReward = mode.xpReward || 25;

  return `
    <div style="background: var(--card-bg); border: 2px solid ${isPerfect ? '#10B981' : 'var(--gold)'}; border-radius: 16px; padding: 1.6rem; box-shadow: 0 10px 30px rgba(0,0,0,0.06); animation: fade-in 0.3s ease;">
      <!-- Score & Status Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.8rem;">
        <div style="display: flex; align-items: center; gap: 0.8rem;">
          <div style="width: 46px; height: 46px; border-radius: 50%; background: ${isPerfect ? '#10B98120' : '#F59E0B20'}; color: ${isPerfect ? '#10B981' : '#F59E0B'}; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">
            <i class="fa-solid ${isPerfect ? 'fa-circle-check' : 'fa-graduation-cap'}"></i>
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: var(--text-main);">
              ${isPerfect ? '🎉 Splendid Writing! Flawless English' : '📝 Writing Analysis & Identified Mistakes'}
            </h3>
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              Quality Score: <strong>${feedback.score}/100</strong>
              ${feedback.score >= 70 ? `• <span style="color: #10B981; font-weight: 700;">+${xpReward} XP Earned!</span>` : ''}
            </div>
          </div>
        </div>

        <button type="button" onclick="this.closest('#writing-feedback-area').style.display='none'" class="icon-btn" aria-label="Close feedback">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Quick Action Toolbar (My Writing & Diagnosis) -->
      <div style="display: flex; gap: 0.8rem; align-items: center; flex-wrap: wrap; margin-bottom: 1.2rem; background: var(--input-bg); padding: 0.75rem 1.1rem; border-radius: 12px; border: 1px solid var(--border-color);">
        <span style="font-size: 0.82rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em;">
          Actions:
        </span>
        <button type="button" class="practice-btn-copy" id="btn-copy-practice-submission" title="Copy my written response">
          <i class="fa-regular fa-copy"></i> <span>Copy My Sentence</span>
        </button>
        <button type="button" class="practice-btn-share" id="btn-share-practice-submission" title="Share my practice response and feedback">
          <i class="fa-solid fa-share-nodes"></i> <span>Share Sentence & Feedback</span>
        </button>
      </div>

      <!-- Your Submitted Writing Card (Active Self-Correction, No Spoon-fed Answer) -->
      <div style="margin-bottom: 1.5rem;">
        <div style="background: rgba(0,36,125,0.04); border: 1px solid var(--border-color); border-radius: 14px; padding: 1.2rem 1.4rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; flex-wrap: wrap; gap: 0.5rem;">
            <div style="font-size: 0.82rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; display: flex; align-items: center; gap: 0.4rem;">
              <i class="fa-solid fa-pen" style="color: var(--uk-blue);"></i> Your Submitted Writing:
            </div>
            ${feedback.errors && feedback.errors.length > 0 ? `
              <button type="button" class="practice-btn-primary" style="font-size: 0.82rem; padding: 0.4rem 0.9rem;" onclick="const ta=document.getElementById('practice-textarea'); if(ta){ta.scrollIntoView({behavior:'smooth'}); ta.focus();}">
                <i class="fa-solid fa-pen-to-square"></i> <span>Edit & Fix It Yourself</span>
              </button>
            ` : ''}
          </div>
          <div style="font-size: 1.05rem; color: var(--text-main); line-height: 1.6; font-weight: 500; background: var(--card-bg); padding: 0.85rem 1.1rem; border-radius: 10px; border: 1px solid var(--border-color);">
            "${originalText}"
          </div>
          ${feedback.errors && feedback.errors.length > 0 ? `
            <div style="margin-top: 0.7rem; font-size: 0.85rem; color: var(--gold-dark); font-weight: 700; display: flex; align-items: center; gap: 0.4rem;">
              <i class="fa-solid fa-lightbulb"></i> Study the explanations and rules below, then edit your sentence above to fix it yourself — no ready-made answers!
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Recurring Pattern Alert (If user repeatedly makes the same mistake) -->
      ${feedback.recurringPatterns && feedback.recurringPatterns.length > 0 ? `
        <div class="pedagogy-pattern-alert">
          <div style="display: flex; align-items: center; gap: 0.5rem; color: #D97706; font-weight: 800; font-size: 0.95rem; margin-bottom: 0.5rem;">
            <i class="fa-solid fa-triangle-exclamation"></i> Recurring Error Pattern Detected!
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.6rem;">
            ${feedback.recurringPatterns.map(p => `
              <div style="font-size: 0.88rem; color: var(--text-main); line-height: 1.5;">
                You have previously encountered mistakes with <strong>${p.category}</strong> (${p.previousCount} recorded occurrences).
                <div style="margin-top: 0.3rem;">
                  <strong>Core Rule:</strong> ${p.rule}
                </div>
                <div style="margin-top: 0.4rem; padding: 0.5rem 0.8rem; background: rgba(245,158,11,0.12); border-radius: 6px; font-size: 0.84rem; color: var(--text-main);">
                  🎯 <strong>Targeted Weakness Practice:</strong> ${p.targetedExercise}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Detailed Explanations of Mistakes (7 Pedagogical Fields) -->
      ${feedback.errors && feedback.errors.length > 0 ? `
        <div style="margin-bottom: 1.4rem;">
          <div style="font-size: 0.82rem; font-weight: 800; color: #EF4444; text-transform: uppercase; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.4rem;">
            <i class="fa-solid fa-list-check"></i> Identified Mistakes & Explanations (${feedback.errors.length}):
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.9rem;">
            ${feedback.errors.map((err, idx) => `
              <div class="pedagogy-error-card ${err.classification === 'More natural' ? 'natural' : ''}">
                <div class="pedagogy-header-row">
                  <span class="pedagogy-mistake-title">
                    Mistake ${idx + 1} — ${err.category}
                  </span>
                  <span class="pedagogy-badge ${err.classification === 'More natural' ? 'natural' : 'incorrect'}">
                    ${err.classification || 'Incorrect'}
                  </span>
                </div>

                <!-- Issue Flagged in Text (No ready-made corrected sentence) -->
                <div class="pedagogy-diff-row" style="background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.2); padding: 0.6rem 0.9rem; border-radius: 8px;">
                  <span style="color: #EF4444; font-weight: 800; font-size: 0.92rem;">
                    ❌ Flagged in your sentence: <code>${err.mistake || err.issue}</code>
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
                      <i class="fa-solid fa-lightbulb"></i> Rule in Action (General Examples):
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
                    <strong>Your turn:</strong> Apply this rule to edit your sentence above and check again!
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
            Your sentence is completely correct!
          </h4>
          <p style="margin: 0; font-size: 0.88rem; color: var(--text-main);">
            No grammatical, spelling, or prepositional errors detected. Your sentence reads naturally in British English.
          </p>
        </div>
      `}

      <!-- Strengths & Praises -->
      ${feedback.strengths && feedback.strengths.length > 0 ? `
        <div style="margin-bottom: 1rem;">
          <div style="font-size: 0.82rem; font-weight: 700; color: #10B981; text-transform: uppercase; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
            <i class="fa-solid fa-thumbs-up"></i> Writing Highlights:
          </div>
          <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.88rem; color: var(--text-main); line-height: 1.5;">
            ${feedback.strengths.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <!-- Native British Model Answer (if available in exercise) -->
      ${exercise && exercise.idealExample ? `
        <div style="background: rgba(0,36,125,0.04); border-radius: 10px; padding: 0.85rem 1.1rem; border: 1px dashed var(--border-color); margin-top: 1rem;">
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--uk-blue); margin-bottom: 0.3rem;">
            <i class="fa-solid fa-crown" style="color: var(--gold);"></i> Native British Model Answer:
          </div>
          <div style="font-size: 0.92rem; color: var(--text-main); font-style: italic;">
            "${exercise.idealExample}"
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// ============================================================================
// 2. WRITING HISTORY & PORTFOLIO VIEW (100% ENGLISH)
// ============================================================================
function renderHistoryView(container) {
  const history = getWritingHistory();

  container.innerHTML = `
    <div style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 16px; padding: 1.6rem; box-shadow: var(--card-shadow);">
      <!-- Filter Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
        <div>
          <h2 style="margin: 0 0 0.3rem 0; font-size: 1.35rem; font-weight: 800; color: var(--text-main);">
            📜 My Writing Portfolio & Journal
          </h2>
          <p style="margin: 0; font-size: 0.88rem; color: var(--text-muted);">
            All your submitted challenges, exercises, and corrected texts are safely stored here.
          </p>
        </div>

        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap; align-items: center;">
          <!-- Date Filter Selector -->
          <div style="display: flex; align-items: center; gap: 0.4rem; background: var(--input-bg); padding: 0.35rem 0.7rem; border-radius: 10px; border: 1px solid var(--border-color);">
            <i class="fa-solid fa-calendar-day" style="color: var(--gold-dark); font-size: 0.85rem;"></i>
            <select id="history-date-filter" style="border: none; background: transparent; font-size: 0.85rem; font-weight: 600; color: var(--text-main); outline: none; cursor: pointer;">
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>
          </div>

          <!-- Mode Filter Selector -->
          <div style="display: flex; align-items: center; gap: 0.4rem; background: var(--input-bg); padding: 0.35rem 0.7rem; border-radius: 10px; border: 1px solid var(--border-color);">
            <i class="fa-solid fa-filter" style="color: var(--uk-blue); font-size: 0.85rem;"></i>
            <select id="history-mode-filter" style="border: none; background: transparent; font-size: 0.85rem; font-weight: 600; color: var(--text-main); outline: none; cursor: pointer;">
              <option value="all">All Modes</option>
              ${WRITING_MODES.map(m => `<option value="${m.id}">${m.title}</option>`).join('')}
            </select>
          </div>

          <!-- Keyword Search -->
          <input type="text" id="history-search-input" placeholder="Search words..." style="
            padding: 0.35rem 0.8rem;
            border-radius: 10px;
            border: 1px solid var(--border-color);
            background: var(--input-bg);
            color: var(--text-main);
            font-size: 0.85rem;
            outline: none;
            min-width: 160px;
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
        <h3 style="margin: 0 0 0.4rem 0; font-size: 1.15rem; color: var(--text-main);">No writing entries found yet</h3>
        <p style="margin: 0; font-size: 0.88rem;">Complete a challenge above to build your personal British English portfolio.</p>
      </div>
    `;
  }

  return `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      ${history.map(item => {
        const dateObj = new Date(item.timestamp);
        const formattedDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        const formattedTime = dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

        return `
          <div class="card history-item-card" data-date="${item.timestamp}" data-mode="${item.modeId}" style="background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.1rem 1.3rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.6rem;">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span style="font-size: 0.8rem; font-weight: 800; color: var(--uk-blue); background: rgba(0,36,125,0.08); padding: 0.2rem 0.65rem; border-radius: 12px;">
                  ${item.modeTitle || 'Writing Challenge'}
                </span>
                <span style="font-size: 0.8rem; font-weight: 700; color: #10B981;">
                  +${item.xpEarned || 25} XP
                </span>
                <span style="font-size: 0.78rem; color: var(--text-muted);">
                  Score: ${item.score || 100}/100
                </span>
              </div>

              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <div style="font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.4rem;">
                  <i class="fa-regular fa-calendar"></i> ${formattedDate} at ${formattedTime}
                </div>
                <button type="button" class="practice-btn-copy btn-practice-history-copy" data-time="${item.timestamp}" style="padding: 0.25rem 0.65rem; font-size: 0.75rem; border-radius: 8px;" title="Copy entry text">
                  <i class="fa-regular fa-copy"></i> <span>Copy</span>
                </button>
                <button type="button" class="practice-btn-share btn-practice-history-share" data-time="${item.timestamp}" style="padding: 0.25rem 0.65rem; font-size: 0.75rem; border-radius: 8px;" title="Share entry">
                  <i class="fa-solid fa-share-nodes"></i> <span>Share</span>
                </button>
              </div>
            </div>

            <div style="margin-bottom: 0.6rem;">
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.2rem;">YOUR WRITING:</div>
              <div style="font-size: 0.98rem; color: var(--text-main); line-height: 1.5; font-style: italic;">
                "${item.inputText}"
              </div>
            </div>

            ${item.polishedText && item.polishedText !== item.inputText ? `
              <div style="background: rgba(16,185,129,0.08); border-left: 3px solid #10B981; border-radius: 0 8px 8px 0; padding: 0.6rem 0.9rem; font-size: 0.9rem; color: var(--text-main);">
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

      if (modeVal !== 'all' && item.modeId !== modeVal) return false;

      if (searchVal) {
        const text = (item.inputText + ' ' + (item.polishedText || '')).toLowerCase();
        if (!text.includes(searchVal)) return false;
      }

      return true;
    });

    const listEl = document.getElementById('history-items-list');
    if (listEl) {
      listEl.innerHTML = renderHistoryItemsList(filtered);
      bindHistoryActionButtons();
    }
  }

  function bindHistoryActionButtons() {
    container.querySelectorAll('.btn-practice-history-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const time = btn.getAttribute('data-time');
        const history = getWritingHistory();
        const item = history.find(h => String(h.timestamp) === String(time));
        if (item) {
          copyTextToClipboard(item.polishedText || item.inputText, 'Practice entry copied to clipboard! 📋');
        }
      });
    });

    container.querySelectorAll('.btn-practice-history-share').forEach(btn => {
      btn.addEventListener('click', () => {
        const time = btn.getAttribute('data-time');
        const history = getWritingHistory();
        const item = history.find(h => String(h.timestamp) === String(time));
        if (item) {
          const shareContent = `🇬🇧 British English Practice - ${item.modeTitle || 'Challenge'}\n\n"${item.polishedText || item.inputText}"\nScore: ${item.score || 100}/100`;
          shareTextContent('My British English Writing Practice', shareContent);
        }
      });
    });
  }

  bindHistoryActionButtons();
  if (dateFilter) dateFilter.addEventListener('change', applyFilters);
  if (modeFilter) modeFilter.addEventListener('change', applyFilters);
  if (searchInput) searchInput.addEventListener('input', applyFilters);
}

// ============================================================================
// 3. PERSONAL ERROR TRACKER VIEW (100% ENGLISH)
// ============================================================================
function renderErrorTrackerView(container) {
  const errorStats = getErrorStats();
  const entries = Object.entries(errorStats);
  const totalErrors = entries.reduce((acc, curr) => acc + curr[1], 0);

  container.innerHTML = `
    <div style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 16px; padding: 1.6rem; box-shadow: var(--card-shadow);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1.5rem;">
        <div>
          <h2 style="margin: 0 0 0.3rem 0; font-size: 1.35rem; font-weight: 800; color: var(--text-main);">
            📊 Personal Error Tracker
          </h2>
          <p style="margin: 0; font-size: 0.88rem; color: var(--text-muted);">
            Analyzes recurring error patterns (Subject-Verb agreement, prepositions, spelling) to accelerate your progress.
          </p>
        </div>

        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          ${totalErrors > 0 ? `
            <button type="button" id="btn-copy-error-stats" class="practice-btn-copy" style="font-size: 0.8rem; padding: 0.5rem 1rem;" title="Copy error statistics">
              <i class="fa-regular fa-copy"></i> <span>Copy Stats</span>
            </button>
            <button type="button" id="btn-share-error-stats" class="practice-btn-share" style="font-size: 0.8rem; padding: 0.5rem 1rem;" title="Share error statistics">
              <i class="fa-solid fa-share-nodes"></i> <span>Share Stats</span>
            </button>
          ` : ''}
          <button type="button" id="btn-reset-error-stats" class="practice-btn-secondary" style="font-size: 0.8rem; padding: 0.5rem 1rem;">
            <i class="fa-solid fa-arrows-rotate"></i> Reset Error Stats
          </button>
        </div>
      </div>

      ${totalErrors === 0 ? `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.8rem; color: #10B981;">🛡️</div>
          <h3 style="margin: 0 0 0.4rem 0; font-size: 1.15rem; color: var(--text-main);">No Recurring Errors Logged Yet!</h3>
          <p style="margin: 0; font-size: 0.88rem;">Keep writing challenges. When mistakes are detected, they will appear here with targeted rules.</p>
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
                <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">
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

  const copyStatsBtn = document.getElementById('btn-copy-error-stats');
  if (copyStatsBtn) {
    copyStatsBtn.addEventListener('click', () => {
      const statsSummary = `🇬🇧 British English Vault - Personal Error Analysis\n\nTotal Errors Analyzed: ${totalErrors}\n` +
        entries.sort((a,b) => b[1] - a[1]).map(([c, cnt]) => `• ${c}: ${cnt} time(s)`).join('\n');
      copyTextToClipboard(statsSummary, 'Error statistics copied to clipboard! 📋');
    });
  }

  const shareStatsBtn = document.getElementById('btn-share-error-stats');
  if (shareStatsBtn) {
    shareStatsBtn.addEventListener('click', () => {
      const statsSummary = `🇬🇧 British English Vault - Personal Error Analysis\n\nTotal Errors Analyzed: ${totalErrors}\n` +
        entries.sort((a,b) => b[1] - a[1]).map(([c, cnt]) => `• ${c}: ${cnt} time(s)`).join('\n');
      shareTextContent('My British English Error Analysis', statsSummary);
    });
  }
}

function getErrorAdvice(category) {
  if (category.includes('Subject-Verb')) return '💡 Tip: Always check if the subject is singular (he/she/it takes -s or doesn\'t) or plural (they/we take are/do).';
  if (category.includes('Preposition')) return '💡 Tip: Note dependent prepositions: "listen to", "married to", "arrive at/in", "depend on".';
  if (category.includes('Article')) return '💡 Tip: Use "an" only when the sound starts with a vowel (a, e, i, o, u) like "an hour", "an apple".';
  if (category.includes('Spelling')) return '💡 Tip: Review tricky English double letters and silent characters (definitely, separate, receive).';
  if (category.includes('Capitalization')) return '💡 Tip: Always capitalize the personal pronoun "I" and the initial letter of every sentence.';
  return '💡 Tip: Read sentences aloud to test natural British cadence and flow.';
}

// ============================================================================
// GLOBAL EVENTS & SUB-TAB SWITCHING
// ============================================================================
function bindDailyPracticeEvents(container) {
  // Subtab switching (Challenges / History / Error Tracker)
  container.querySelectorAll('#practice-subtab-bar .practice-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('#practice-subtab-bar .practice-tab-btn').forEach(b => {
        b.classList.remove('active');
      });
      btn.classList.add('active');

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
