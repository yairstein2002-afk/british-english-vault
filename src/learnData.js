/**
 * British English Vault - Learn & Practice Module Data Structure (100% English)
 * Comprehensive English Grammar Reference, Topics, Rules, UK Examples & Practice Quizzes.
 */

export const LEARN_CATEGORIES = [
  {
    "id": "tenses",
    "titleEng": "Verb Tenses",
    "icon": "fa-clock",
    "emoji": "⏰",
    "desc": "Present, Past, and Future tenses with structures, signal words, and usage rules."
  },
  {
    "id": "parts-of-speech",
    "titleEng": "Parts of Speech",
    "icon": "fa-cubes",
    "emoji": "🧱",
    "desc": "Nouns, Articles, Quantifiers, Pronouns, Adjectives, Adverbs, and Prepositions."
  },
  {
    "id": "syntax",
    "titleEng": "Sentence Structure & Syntax",
    "icon": "fa-diagram-project",
    "emoji": "🔀",
    "desc": "Word order (SVO), clause types, negation, question forms, and relative clauses."
  },
  {
    "id": "special-verbs",
    "titleEng": "Verb Forms & Special Systems",
    "icon": "fa-bolt",
    "emoji": "⚡",
    "desc": "Modal verbs, Stative vs Dynamic, Gerunds & Infinitives, Phrasal verbs, Causatives, Transitive/Intransitive."
  },
  {
    "id": "advanced-grammar",
    "titleEng": "Advanced Grammar & British Varieties",
    "icon": "fa-graduation-cap",
    "emoji": "🎓",
    "desc": "Conditionals (0-3 & Mixed), Passive Voice, Reported Speech, Inversion, Subjunctive Mood & British/American differences."
  },
  {
    "id": "mechanics",
    "titleEng": "Mechanics & Word Formation",
    "icon": "fa-font",
    "emoji": "✍️",
    "desc": "Punctuation, Capitalization, Apostrophe rules, Semicolons, Prefixes, and Suffixes."
  },
  {
    "id": "pragmatics",
    "titleEng": "Politeness & Social Pragmatics",
    "icon": "fa-comments",
    "emoji": "💬",
    "desc": "British courtesy, polite requests, hedging, tag questions, indirect questions, and social registers."
  },
  {
    "id": "discourse",
    "titleEng": "Discourse Markers & Sentence Cohesion",
    "icon": "fa-link",
    "emoji": "🔗",
    "desc": "Connectors, contrast, addition, cause-and-effect transitions, cleft sentences, and emphasis."
  },
  {
    "id": "academic-business",
    "titleEng": "Business & Formal Written English",
    "icon": "fa-briefcase",
    "emoji": "💼",
    "desc": "Formal correspondence, email conventions, hedging, professional sign-offs, and academic style."
  }
];

export const LEARN_TOPICS = [
  {
    "id": "present-simple",
    "categoryId": "tenses",
    "subgroup": "Present Tenses",
    "title": "Present Simple",
    "summary": "Used for permanent facts, habits, routines, and scheduled timetables.",
    "rules": [
      {
        "title": "Core Usage",
        "details": "Scientific and natural facts, daily routines, habits, and fixed public timetables (trains, flights)."
      },
      {
        "title": "Third-Person Singular (-s / -es / -ies)",
        "details": "Add -s for standard verbs with He/She/It (walks). Add -es for sibilant endings -s, -ss, -sh, -ch, -x, -z, -o (watches, goes). Convert -y after consonant to -ies (fly -> flies)."
      },
      {
        "title": "Negation & Questions",
        "details": "Use auxiliary verbs Do / Does. When using Does/Doesn't, the main verb returns to its base form without -s."
      }
    ],
    "keywords": [
      "always",
      "usually",
      "often",
      "sometimes",
      "never",
      "every day",
      "once a week",
      "on Mondays"
    ],
    "examples": [
      "The Earth revolves around the Sun.",
      "He always drinks Earl Grey tea in the morning.",
      "Does the train to London depart at 9:00 AM?",
      "The Thames flows through the heart of London.",
      "She has been working as a curator at the British Museum for five years.",
      "By the time the train arrived at Paddington, we had already bought our tickets.",
      "He was sipping Earl Grey tea when the announcement was made.",
      "Next month, they will be traveling across the Scottish Highlands."
    ],
    "practice": [
      {
        "question": "She _____ to the library every Tuesday.",
        "options": [
          "go",
          "goes",
          "is going",
          "went"
        ],
        "correctIndex": 1,
        "explanation": "Third-person singular (She) in Present Simple requires the -es suffix (goes)."
      },
      {
        "question": "_____ he like British biscuits with his tea?",
        "options": [
          "Do",
          "Does",
          "Is",
          "Are"
        ],
        "correctIndex": 1,
        "explanation": "Questions in Present Simple for He/She/It use the auxiliary verb Does."
      },
      {
        "question": "Select the correct British English usage for \"Present Simple\":",
        "options": [
          "Correct application of Present Simple in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Present Simple."
      },
      {
        "question": "Which sentence correctly demonstrates \"Present Simple\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Present Simple."
      },
      {
        "question": "Complete the sentence according to the rule of Present Simple: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Present Simple\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      }
    ]
  },
  {
    "id": "present-progressive",
    "categoryId": "tenses",
    "subgroup": "Present Tenses",
    "title": "Present Progressive / Continuous",
    "summary": "Used for actions happening right now, temporary situations, or fixed near-future arrangements.",
    "rules": [
      {
        "title": "Structure",
        "details": "Subject + am/is/are + Verb-ing."
      },
      {
        "title": "Spelling Rules for -ing",
        "details": "Drop silent -e (make -> making). Double final consonant for short CVC verbs (run -> running, stop -> stopping)."
      },
      {
        "title": "Future Arrangements",
        "details": "Expresses confirmed personal arrangements in the near future (e.g. We are meeting the manager at 3 PM)."
      }
    ],
    "keywords": [
      "now",
      "at the moment",
      "currently",
      "right now",
      "Look!",
      "Listen!",
      "tonight",
      "this week"
    ],
    "examples": [
      "Listen! Someone is playing the piano downstairs.",
      "We are meeting the director at 3 PM today.",
      "She is studying for her Cambridge exams this semester.",
      "The Thames flows through the heart of London.",
      "She has been working as a curator at the British Museum for five years.",
      "By the time the train arrived at Paddington, we had already bought our tickets.",
      "He was sipping Earl Grey tea when the announcement was made.",
      "Next month, they will be traveling across the Scottish Highlands."
    ],
    "practice": [
      {
        "question": "Look! It _____ heavily outside.",
        "options": [
          "rains",
          "is raining",
          "rained",
          "was raining"
        ],
        "correctIndex": 1,
        "explanation": "\"Look!\" indicates an action happening at this exact moment."
      },
      {
        "question": "Select the correct British English usage for \"Present Progressive / Continuous\":",
        "options": [
          "Correct application of Present Progressive / Continuous in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Present Progressive / Continuous."
      },
      {
        "question": "Which sentence correctly demonstrates \"Present Progressive / Continuous\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Present Progressive / Continuous."
      },
      {
        "question": "Complete the sentence according to the rule of Present Progressive / Continuous: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Present Progressive / Continuous\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "present-perfect-simple",
    "categoryId": "tenses",
    "subgroup": "Present Tenses",
    "title": "Present Perfect Simple",
    "summary": "Used for past actions with present result or relevance, and life experiences without a specific time.",
    "rules": [
      {
        "title": "Structure",
        "details": "Subject + have/has + V3 (Past Participle)."
      },
      {
        "title": "Present Perfect vs Past Simple",
        "details": "If a specific past time is stated (yesterday, in 2020), use Past Simple. If time is unspecified or ongoing, use Present Perfect."
      },
      {
        "title": "Key Time Expressions",
        "details": "already, yet (negative/questions), ever (questions), never, just, since (starting point), for (duration)."
      }
    ],
    "keywords": [
      "already",
      "yet",
      "ever",
      "never",
      "just",
      "recently",
      "since",
      "for",
      "so far"
    ],
    "examples": [
      "I have lived in London for three years.",
      "Have you ever visited Big Ben?",
      "She has just finished writing her essay.",
      "The Thames flows through the heart of London.",
      "She has been working as a curator at the British Museum for five years.",
      "By the time the train arrived at Paddington, we had already bought our tickets.",
      "He was sipping Earl Grey tea when the announcement was made.",
      "Next month, they will be traveling across the Scottish Highlands."
    ],
    "practice": [
      {
        "question": "Have you _____ the new Oxford dictionary?",
        "options": [
          "saw",
          "seen",
          "seeing",
          "sees"
        ],
        "correctIndex": 1,
        "explanation": "After have/has, use the Past Participle (V3) form: seen."
      },
      {
        "question": "Select the correct British English usage for \"Present Perfect Simple\":",
        "options": [
          "Correct application of Present Perfect Simple in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Present Perfect Simple."
      },
      {
        "question": "Which sentence correctly demonstrates \"Present Perfect Simple\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Present Perfect Simple."
      },
      {
        "question": "Complete the sentence according to the rule of Present Perfect Simple: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Present Perfect Simple\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "present-perfect-progressive",
    "categoryId": "tenses",
    "subgroup": "Present Tenses",
    "title": "Present Perfect Progressive",
    "summary": "Used for continuous actions that started in the past and continue into the present, emphasizing duration.",
    "rules": [
      {
        "title": "Structure",
        "details": "Subject + have/has + been + Verb-ing."
      },
      {
        "title": "Focus on Duration",
        "details": "Emphasizes how long an activity has been ongoing (How long... / for hours / all day)."
      }
    ],
    "keywords": [
      "for 2 hours",
      "since morning",
      "all day",
      "how long..."
    ],
    "examples": [
      "He has been waiting for the bus for two hours.",
      "They have been revising for their exams all week.",
      "The Thames flows through the heart of London.",
      "She has been working as a curator at the British Museum for five years.",
      "By the time the train arrived at Paddington, we had already bought our tickets.",
      "He was sipping Earl Grey tea when the announcement was made.",
      "Next month, they will be traveling across the Scottish Highlands.",
      "By 2030, the government will have completed the new high-speed rail line."
    ],
    "practice": [
      {
        "question": "How long _____ for the train?",
        "options": [
          "did you wait",
          "have you been waiting",
          "are you waiting",
          "were you waiting"
        ],
        "correctIndex": 1,
        "explanation": "\"How long\" asks about continuous duration up to the present."
      },
      {
        "question": "Select the correct British English usage for \"Present Perfect Progressive\":",
        "options": [
          "Correct application of Present Perfect Progressive in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Present Perfect Progressive."
      },
      {
        "question": "Which sentence correctly demonstrates \"Present Perfect Progressive\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Present Perfect Progressive."
      },
      {
        "question": "Complete the sentence according to the rule of Present Perfect Progressive: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Present Perfect Progressive\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "past-simple",
    "categoryId": "tenses",
    "subgroup": "Past Tenses",
    "title": "Past Simple",
    "summary": "Used for completed actions at a definite, specified time in the past.",
    "rules": [
      {
        "title": "Regular & Irregular Verbs",
        "details": "Regular verbs take -ed (walk -> walked). Irregular verbs use V2 second column (go -> went, buy -> bought)."
      },
      {
        "title": "Negation & Questions",
        "details": "Use Did / Didn't. The main verb reverts to its base form without -ed."
      }
    ],
    "keywords": [
      "yesterday",
      "last night",
      "in 2015",
      "two days ago",
      "when I was young"
    ],
    "examples": [
      "We visited Windsor Castle yesterday.",
      "She did not buy the tickets online.",
      "Did you watch the Premier League match last night?",
      "The Thames flows through the heart of London.",
      "She has been working as a curator at the British Museum for five years.",
      "By the time the train arrived at Paddington, we had already bought our tickets.",
      "He was sipping Earl Grey tea when the announcement was made.",
      "Next month, they will be traveling across the Scottish Highlands."
    ],
    "practice": [
      {
        "question": "They _____ to Edinburgh last summer.",
        "options": [
          "go",
          "went",
          "gone",
          "were going"
        ],
        "correctIndex": 1,
        "explanation": "Past Simple V2 form of \"go\" is \"went\"."
      },
      {
        "question": "Select the correct British English usage for \"Past Simple\":",
        "options": [
          "Correct application of Past Simple in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Past Simple."
      },
      {
        "question": "Which sentence correctly demonstrates \"Past Simple\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Past Simple."
      },
      {
        "question": "Complete the sentence according to the rule of Past Simple: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Past Simple\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "past-progressive",
    "categoryId": "tenses",
    "subgroup": "Past Tenses",
    "title": "Past Progressive",
    "summary": "Used for an action in progress at a specific time in the past or interrupted by a shorter event.",
    "rules": [
      {
        "title": "Structure",
        "details": "Subject + was/were + Verb-ing."
      },
      {
        "title": "While vs When",
        "details": "While / As precede the ongoing background action (Past Progressive). When precedes the shorter interrupting event (Past Simple)."
      }
    ],
    "keywords": [
      "while",
      "as",
      "when",
      "at 8 PM yesterday"
    ],
    "examples": [
      "I was reading a book when the telephone rang.",
      "While she was cooking dinner, he was listening to the radio.",
      "The Thames flows through the heart of London.",
      "She has been working as a curator at the British Museum for five years.",
      "By the time the train arrived at Paddington, we had already bought our tickets.",
      "He was sipping Earl Grey tea when the announcement was made.",
      "Next month, they will be traveling across the Scottish Highlands.",
      "By 2030, the government will have completed the new high-speed rail line."
    ],
    "practice": [
      {
        "question": "While I _____ in Hyde Park, it started to rain.",
        "options": [
          "walked",
          "was walking",
          "am walking",
          "have walked"
        ],
        "correctIndex": 1,
        "explanation": "Action in progress in the past after \"While\" takes Past Progressive (was walking)."
      },
      {
        "question": "Select the correct British English usage for \"Past Progressive\":",
        "options": [
          "Correct application of Past Progressive in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Past Progressive."
      },
      {
        "question": "Which sentence correctly demonstrates \"Past Progressive\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Past Progressive."
      },
      {
        "question": "Complete the sentence according to the rule of Past Progressive: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Past Progressive\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "past-perfect-simple",
    "categoryId": "tenses",
    "subgroup": "Past Tenses",
    "title": "Past Perfect Simple",
    "summary": "Used for an action completed before another past event (\"the earlier past\").",
    "rules": [
      {
        "title": "Structure",
        "details": "Subject + had + V3 (Past Participle)."
      }
    ],
    "keywords": [
      "before",
      "after",
      "by the time",
      "already",
      "because"
    ],
    "examples": [
      "The train had already left by the time we arrived at Paddington Station.",
      "The Thames flows through the heart of London.",
      "She has been working as a curator at the British Museum for five years.",
      "By the time the train arrived at Paddington, we had already bought our tickets.",
      "He was sipping Earl Grey tea when the announcement was made.",
      "Next month, they will be traveling across the Scottish Highlands.",
      "By 2030, the government will have completed the new high-speed rail line.",
      "Look! The Royal Guard is marching past Buckingham Palace."
    ],
    "practice": [
      {
        "question": "When we arrived at the theatre, the play _____ .",
        "options": [
          "already started",
          "has already started",
          "had already started",
          "was starting"
        ],
        "correctIndex": 2,
        "explanation": "The event completed prior to another past event takes Past Perfect (had already started)."
      },
      {
        "question": "Select the correct British English usage for \"Past Perfect Simple\":",
        "options": [
          "Correct application of Past Perfect Simple in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Past Perfect Simple."
      },
      {
        "question": "Which sentence correctly demonstrates \"Past Perfect Simple\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Past Perfect Simple."
      },
      {
        "question": "Complete the sentence according to the rule of Past Perfect Simple: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Past Perfect Simple\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "past-perfect-progressive",
    "categoryId": "tenses",
    "subgroup": "Past Tenses",
    "title": "Past Perfect Progressive",
    "summary": "Used for an action that continued up until another point in the past.",
    "rules": [
      {
        "title": "Structure",
        "details": "Subject + had + been + Verb-ing."
      }
    ],
    "keywords": [
      "had been -ing for",
      "before"
    ],
    "examples": [
      "He had been driving for four hours before he stopped for lunch.",
      "The Thames flows through the heart of London.",
      "She has been working as a curator at the British Museum for five years.",
      "By the time the train arrived at Paddington, we had already bought our tickets.",
      "He was sipping Earl Grey tea when the announcement was made.",
      "Next month, they will be traveling across the Scottish Highlands.",
      "By 2030, the government will have completed the new high-speed rail line.",
      "Look! The Royal Guard is marching past Buckingham Palace."
    ],
    "practice": [
      {
        "question": "They _____ for hours before the electricity went out.",
        "options": [
          "had been studying",
          "have studied",
          "were studying",
          "studied"
        ],
        "correctIndex": 0,
        "explanation": "Continuous ongoing duration prior to a past point takes Past Perfect Progressive."
      },
      {
        "question": "Select the correct British English usage for \"Past Perfect Progressive\":",
        "options": [
          "Correct application of Past Perfect Progressive in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Past Perfect Progressive."
      },
      {
        "question": "Which sentence correctly demonstrates \"Past Perfect Progressive\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Past Perfect Progressive."
      },
      {
        "question": "Complete the sentence according to the rule of Past Perfect Progressive: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Past Perfect Progressive\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "future-simple",
    "categoryId": "tenses",
    "subgroup": "Future Tenses",
    "title": "Future Simple (Will vs Be Going To)",
    "summary": "Used to express future predictions, intentions, promises, and spontaneous decisions.",
    "rules": [
      {
        "title": "Will (will + base verb)",
        "details": "Spontaneous decisions at the moment of speaking, promises, offers of help, and predictions without present evidence."
      },
      {
        "title": "Be Going To (am/is/are going to + base verb)",
        "details": "Pre-planned intentions and predictions based on present physical evidence."
      }
    ],
    "keywords": [
      "tomorrow",
      "next week",
      "in the future",
      "I promise",
      "I think"
    ],
    "examples": [
      "I think it will rain tomorrow in London.",
      "Look at those black clouds! It is going to rain.",
      "I will help you with your luggage.",
      "The Thames flows through the heart of London.",
      "She has been working as a curator at the British Museum for five years.",
      "By the time the train arrived at Paddington, we had already bought our tickets.",
      "He was sipping Earl Grey tea when the announcement was made.",
      "Next month, they will be traveling across the Scottish Highlands."
    ],
    "practice": [
      {
        "question": "Look at the traffic! We _____ our flight.",
        "options": [
          "will miss",
          "are going to miss",
          "miss",
          "missed"
        ],
        "correctIndex": 1,
        "explanation": "Prediction based on present physical evidence (traffic) uses \"be going to\"."
      },
      {
        "question": "Select the correct British English usage for \"Future Simple (Will vs Be Going To)\":",
        "options": [
          "Correct application of Future Simple (Will vs Be Going To) in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Future Simple (Will vs Be Going To)."
      },
      {
        "question": "Which sentence correctly demonstrates \"Future Simple (Will vs Be Going To)\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Future Simple (Will vs Be Going To)."
      },
      {
        "question": "Complete the sentence according to the rule of Future Simple (Will vs Be Going To): \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Future Simple (Will vs Be Going To)\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "future-progressive",
    "categoryId": "tenses",
    "subgroup": "Future Tenses",
    "title": "Future Progressive",
    "summary": "Used for an action that will be in progress at a specific time in the future.",
    "rules": [
      {
        "title": "Structure",
        "details": "Subject + will be + Verb-ing."
      }
    ],
    "keywords": [
      "this time tomorrow",
      "at 10 AM next Monday"
    ],
    "examples": [
      "This time tomorrow, I will be flying to Edinburgh.",
      "The Thames flows through the heart of London.",
      "She has been working as a curator at the British Museum for five years.",
      "By the time the train arrived at Paddington, we had already bought our tickets.",
      "He was sipping Earl Grey tea when the announcement was made.",
      "Next month, they will be traveling across the Scottish Highlands.",
      "By 2030, the government will have completed the new high-speed rail line.",
      "Look! The Royal Guard is marching past Buckingham Palace."
    ],
    "practice": [
      {
        "question": "At 8 PM tonight, we _____ the football match.",
        "options": [
          "will watch",
          "will be watching",
          "are watching",
          "watched"
        ],
        "correctIndex": 1,
        "explanation": "Action in progress at a specific future moment takes Future Progressive."
      },
      {
        "question": "Select the correct British English usage for \"Future Progressive\":",
        "options": [
          "Correct application of Future Progressive in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Future Progressive."
      },
      {
        "question": "Which sentence correctly demonstrates \"Future Progressive\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Future Progressive."
      },
      {
        "question": "Complete the sentence according to the rule of Future Progressive: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Future Progressive\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "future-perfect-simple",
    "categoryId": "tenses",
    "subgroup": "Future Tenses",
    "title": "Future Perfect Simple",
    "summary": "Used for an action that will be completed before a specified point in the future.",
    "rules": [
      {
        "title": "Structure",
        "details": "Subject + will have + V3 (Past Participle)."
      }
    ],
    "keywords": [
      "by tomorrow",
      "by 2030",
      "by next month",
      "by the time"
    ],
    "examples": [
      "By next year, she will have graduated from Oxford University.",
      "The Thames flows through the heart of London.",
      "She has been working as a curator at the British Museum for five years.",
      "By the time the train arrived at Paddington, we had already bought our tickets.",
      "He was sipping Earl Grey tea when the announcement was made.",
      "Next month, they will be traveling across the Scottish Highlands.",
      "By 2030, the government will have completed the new high-speed rail line.",
      "Look! The Royal Guard is marching past Buckingham Palace."
    ],
    "practice": [
      {
        "question": "By 5 PM, I _____ the entire report.",
        "options": [
          "will finish",
          "will have finished",
          "am finishing",
          "finished"
        ],
        "correctIndex": 1,
        "explanation": "\"By 5 PM\" indicates completion prior to a future point (Future Perfect)."
      },
      {
        "question": "Select the correct British English usage for \"Future Perfect Simple\":",
        "options": [
          "Correct application of Future Perfect Simple in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Future Perfect Simple."
      },
      {
        "question": "Which sentence correctly demonstrates \"Future Perfect Simple\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Future Perfect Simple."
      },
      {
        "question": "Complete the sentence according to the rule of Future Perfect Simple: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Future Perfect Simple\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "future-perfect-progressive",
    "categoryId": "tenses",
    "subgroup": "Future Tenses",
    "title": "Future Perfect Progressive",
    "summary": "Used to measure the duration of an ongoing action up to a future point in time.",
    "rules": [
      {
        "title": "Structure",
        "details": "Subject + will have been + Verb-ing."
      }
    ],
    "keywords": [
      "by next month, for 5 years"
    ],
    "examples": [
      "By December, I will have been working at this firm for ten years.",
      "The Thames flows through the heart of London.",
      "She has been working as a curator at the British Museum for five years.",
      "By the time the train arrived at Paddington, we had already bought our tickets.",
      "He was sipping Earl Grey tea when the announcement was made.",
      "Next month, they will be traveling across the Scottish Highlands.",
      "By 2030, the government will have completed the new high-speed rail line.",
      "Look! The Royal Guard is marching past Buckingham Palace."
    ],
    "practice": [
      {
        "question": "By next month, he _____ in London for five years.",
        "options": [
          "will live",
          "will have been living",
          "is living",
          "lived"
        ],
        "correctIndex": 1,
        "explanation": "Measuring ongoing duration leading to a future point takes Future Perfect Progressive."
      },
      {
        "question": "Select the correct British English usage for \"Future Perfect Progressive\":",
        "options": [
          "Correct application of Future Perfect Progressive in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Future Perfect Progressive."
      },
      {
        "question": "Which sentence correctly demonstrates \"Future Perfect Progressive\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Future Perfect Progressive."
      },
      {
        "question": "Complete the sentence according to the rule of Future Perfect Progressive: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Future Perfect Progressive\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "nouns-plural",
    "categoryId": "parts-of-speech",
    "subgroup": "Nouns & Articles",
    "title": "Plural Noun Rules & Irregulars",
    "summary": "Rules for converting singular nouns to plural, including sibilants, -ves changes, and irregulars.",
    "rules": [
      {
        "title": "Standard Plurals",
        "details": "Add -s to the singular noun (book -> books)."
      },
      {
        "title": "Sibilant Endings (-s, -ss, -sh, -ch, -x, -z)",
        "details": "Add -es (bus -> buses, watch -> watches, box -> boxes)."
      },
      {
        "title": "-f / -fe Endings",
        "details": "Convert to -ves (wolf -> wolves, leaf -> leaves, knife -> knives)."
      },
      {
        "title": "Irregular Plurals",
        "details": "Vowel changes: man -> men, foot -> feet, tooth -> teeth, child -> children. Identical forms: sheep, deer, fish."
      }
    ],
    "keywords": [
      "regular plural (-s)",
      "sibilants (-es)",
      "-ves rule",
      "irregular plurals"
    ],
    "examples": [
      "The children saw three wolves in the countryside.",
      "She bought two boxes of English tea.",
      "The historic cobblestone streets of York are beautifully preserved.",
      "She gave him a rare antique silver pocket watch.",
      "Neither of the proposals was approved by the executive committee.",
      "He walked quietly into the grand library of Trinity College.",
      "They placed the heavy wooden crates on top of the lorry.",
      "An apple a day keeps the doctor away."
    ],
    "practice": [
      {
        "question": "What is the plural form of \"knife\"?",
        "options": [
          "knifes",
          "knives",
          "knifess",
          "knifies"
        ],
        "correctIndex": 1,
        "explanation": "Nouns ending in -fe change to -ves in the plural (knives)."
      },
      {
        "question": "Select the correct British English usage for \"Plural Noun Rules & Irregulars\":",
        "options": [
          "Correct application of Plural Noun Rules & Irregulars in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Plural Noun Rules & Irregulars."
      },
      {
        "question": "Which sentence correctly demonstrates \"Plural Noun Rules & Irregulars\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Plural Noun Rules & Irregulars."
      },
      {
        "question": "Complete the sentence according to the rule of Plural Noun Rules & Irregulars: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Plural Noun Rules & Irregulars\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "nouns-countable",
    "categoryId": "parts-of-speech",
    "subgroup": "Nouns & Articles",
    "title": "Countable vs Uncountable Nouns",
    "summary": "Distinction between countable nouns and mass/uncountable nouns.",
    "rules": [
      {
        "title": "Uncountable Nouns",
        "details": "Substances, liquids, abstract concepts (water, advice, luggage, information, money, furniture). They do NOT take plural -s or a/an."
      },
      {
        "title": "Meaning Shift",
        "details": "Some nouns shift meaning between mass and countable: paper (material) vs a paper (newspaper/essay)."
      }
    ],
    "keywords": [
      "water",
      "advice",
      "information",
      "luggage",
      "furniture",
      "money"
    ],
    "examples": [
      "Can you give me some advice on learning British English?",
      "Her luggage was lost at Heathrow Airport.",
      "The historic cobblestone streets of York are beautifully preserved.",
      "She gave him a rare antique silver pocket watch.",
      "Neither of the proposals was approved by the executive committee.",
      "He walked quietly into the grand library of Trinity College.",
      "They placed the heavy wooden crates on top of the lorry.",
      "An apple a day keeps the doctor away."
    ],
    "practice": [
      {
        "question": "Which of the following is an UNCOUNTABLE noun?",
        "options": [
          "Apple",
          "Chair",
          "Information",
          "Car"
        ],
        "correctIndex": 2,
        "explanation": "\"Information\" is uncountable and cannot take a plural -s."
      },
      {
        "question": "Select the correct British English usage for \"Countable vs Uncountable Nouns\":",
        "options": [
          "Correct application of Countable vs Uncountable Nouns in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Countable vs Uncountable Nouns."
      },
      {
        "question": "Which sentence correctly demonstrates \"Countable vs Uncountable Nouns\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Countable vs Uncountable Nouns."
      },
      {
        "question": "Complete the sentence according to the rule of Countable vs Uncountable Nouns: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Countable vs Uncountable Nouns\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "articles-quantifiers",
    "categoryId": "parts-of-speech",
    "subgroup": "Nouns & Articles",
    "title": "Articles & Quantifiers",
    "summary": "Usage of A, An, The, Zero Article, and Quantifiers (Much, Many, Few, Little).",
    "rules": [
      {
        "title": "A / An (Indefinite Article)",
        "details": "For singular countable non-specific nouns. \"An\" is used before a vowel sound (an apple, an hour)."
      },
      {
        "title": "The (Definite Article)",
        "details": "For specific, known nouns or unique entities (the Sun, the Thames)."
      },
      {
        "title": "Zero Article",
        "details": "Omitted before plural general nouns, languages, sports, and meals."
      },
      {
        "title": "Quantifiers",
        "details": "Countables: many, few, a few, several. Uncountables: much, little, a little. Both: some, any, a lot of."
      }
    ],
    "keywords": [
      "a",
      "an",
      "the",
      "zero article",
      "many",
      "much",
      "some",
      "any"
    ],
    "examples": [
      "He ordered a cup of tea at the station.",
      "There is much interest in British history.",
      "The historic cobblestone streets of York are beautifully preserved.",
      "She gave him a rare antique silver pocket watch.",
      "Neither of the proposals was approved by the executive committee.",
      "He walked quietly into the grand library of Trinity College.",
      "They placed the heavy wooden crates on top of the lorry.",
      "An apple a day keeps the doctor away."
    ],
    "practice": [
      {
        "question": "He is _____ honest man.",
        "options": [
          "a",
          "an",
          "the",
          "zero article"
        ],
        "correctIndex": 1,
        "explanation": "\"Honest\" begins with a vowel sound (silent h), requiring \"an\"."
      },
      {
        "question": "Select the correct British English usage for \"Articles & Quantifiers\":",
        "options": [
          "Correct application of Articles & Quantifiers in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Articles & Quantifiers."
      },
      {
        "question": "Which sentence correctly demonstrates \"Articles & Quantifiers\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Articles & Quantifiers."
      },
      {
        "question": "Complete the sentence according to the rule of Articles & Quantifiers: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Articles & Quantifiers\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "pronouns",
    "categoryId": "parts-of-speech",
    "subgroup": "Pronouns & Determiners",
    "title": "Pronoun System & Reflexives",
    "summary": "Subject, object, possessive adjectives, independent possessives, and reflexive pronouns.",
    "rules": [
      {
        "title": "Subject vs Object Pronouns",
        "details": "Subject: I, you, he, she, it, we, they. Object: me, you, him, her, it, us, them."
      },
      {
        "title": "Possessives",
        "details": "Possessive adjectives (before noun): my, your, his, her, its, our, their. Independent possessives (stand alone): mine, yours, his, hers, ours, theirs."
      },
      {
        "title": "Reflexive Pronouns",
        "details": "myself, yourself, himself, herself, itself, ourselves, yourselves, themselves."
      }
    ],
    "keywords": [
      "I / Me",
      "My / Mine",
      "Myself"
    ],
    "examples": [
      "This umbrella is mine, not yours.",
      "She prepared afternoon tea herself.",
      "The historic cobblestone streets of York are beautifully preserved.",
      "She gave him a rare antique silver pocket watch.",
      "Neither of the proposals was approved by the executive committee.",
      "He walked quietly into the grand library of Trinity College.",
      "They placed the heavy wooden crates on top of the lorry.",
      "An apple a day keeps the doctor away."
    ],
    "practice": [
      {
        "question": "This book belongs to John. It is _____ .",
        "options": [
          "him",
          "his",
          "he",
          "himself"
        ],
        "correctIndex": 1,
        "explanation": "The independent possessive pronoun for \"he\" is \"his\"."
      },
      {
        "question": "Select the correct British English usage for \"Pronoun System & Reflexives\":",
        "options": [
          "Correct application of Pronoun System & Reflexives in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Pronoun System & Reflexives."
      },
      {
        "question": "Which sentence correctly demonstrates \"Pronoun System & Reflexives\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Pronoun System & Reflexives."
      },
      {
        "question": "Complete the sentence according to the rule of Pronoun System & Reflexives: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Pronoun System & Reflexives\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "adjectives-adverbs",
    "categoryId": "parts-of-speech",
    "subgroup": "Modifiers",
    "title": "Adjectives, Adverbs & Order of Adjectives",
    "summary": "Adjective word order (OSASCOMP), comparative/superlative forms, and adverbs.",
    "rules": [
      {
        "title": "Order of Adjectives (OSASCOMP)",
        "details": "Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose -> Noun. (e.g. A lovely small old round black English wooden tea table)."
      },
      {
        "title": "Comparatives & Superlatives",
        "details": "One syllable: -er / -est (tall -> taller -> tallest). Two+ syllables: more / most. Irregulars: good -> better -> best, bad -> worse -> worst."
      },
      {
        "title": "Adverbs of Manner",
        "details": "Derived by adding -ly to adjectives (quick -> quickly). Irregulars: fast -> fast, hard -> hard, late -> late, good -> well."
      }
    ],
    "keywords": [
      "OSASCOMP",
      "comparative",
      "superlative",
      "-ly adverbs"
    ],
    "examples": [
      "She drives very carefully in London traffic.",
      "This building is much older than that tower.",
      "The historic cobblestone streets of York are beautifully preserved.",
      "She gave him a rare antique silver pocket watch.",
      "Neither of the proposals was approved by the executive committee.",
      "He walked quietly into the grand library of Trinity College.",
      "They placed the heavy wooden crates on top of the lorry.",
      "An apple a day keeps the doctor away."
    ],
    "practice": [
      {
        "question": "He plays the violin very _____ (good).",
        "options": [
          "good",
          "goodly",
          "well",
          "better"
        ],
        "correctIndex": 2,
        "explanation": "The adverb of the adjective \"good\" is \"well\"."
      },
      {
        "question": "Select the correct British English usage for \"Adjectives, Adverbs & Order of Adjectives\":",
        "options": [
          "Correct application of Adjectives, Adverbs & Order of Adjectives in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Adjectives, Adverbs & Order of Adjectives."
      },
      {
        "question": "Which sentence correctly demonstrates \"Adjectives, Adverbs & Order of Adjectives\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Adjectives, Adverbs & Order of Adjectives."
      },
      {
        "question": "Complete the sentence according to the rule of Adjectives, Adverbs & Order of Adjectives: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Adjectives, Adverbs & Order of Adjectives\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "prepositions",
    "categoryId": "parts-of-speech",
    "subgroup": "Prepositions",
    "title": "Prepositions of Time & Place (At, On, In)",
    "summary": "Precise rules for prepositions of time, place, and movement.",
    "rules": [
      {
        "title": "At",
        "details": "Exact times (at 5 PM, at midnight) and specific locations/points (at the bus stop, at home)."
      },
      {
        "title": "On",
        "details": "Days and dates (on Monday, on 5th July) and surfaces (on the table, on the floor)."
      },
      {
        "title": "In",
        "details": "Months, years, seasons, centuries (in July, in 2026, in summer) and enclosed/3D spaces (in London, in the room)."
      }
    ],
    "keywords": [
      "at",
      "on",
      "in",
      "into",
      "across",
      "through"
    ],
    "examples": [
      "The coronation was held in May on a rainy Saturday at 11 AM.",
      "The historic cobblestone streets of York are beautifully preserved.",
      "She gave him a rare antique silver pocket watch.",
      "Neither of the proposals was approved by the executive committee.",
      "He walked quietly into the grand library of Trinity College.",
      "They placed the heavy wooden crates on top of the lorry.",
      "An apple a day keeps the doctor away.",
      "Both candidates presented exceptional arguments during the Oxford debate."
    ],
    "practice": [
      {
        "question": "The concert takes place _____ Friday night.",
        "options": [
          "at",
          "on",
          "in",
          "to"
        ],
        "correctIndex": 1,
        "explanation": "Preposition \"on\" is used before specific days and dates."
      },
      {
        "question": "Select the correct British English usage for \"Prepositions of Time & Place (At, On, In)\":",
        "options": [
          "Correct application of Prepositions of Time & Place (At, On, In) in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Prepositions of Time & Place (At, On, In)."
      },
      {
        "question": "Which sentence correctly demonstrates \"Prepositions of Time & Place (At, On, In)\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Prepositions of Time & Place (At, On, In)."
      },
      {
        "question": "Complete the sentence according to the rule of Prepositions of Time & Place (At, On, In): \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Prepositions of Time & Place (At, On, In)\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "syntax-svo",
    "categoryId": "syntax",
    "subgroup": "Basic Syntax",
    "title": "Word Order & Subject-Verb Agreement",
    "summary": "Standard Subject-Verb-Object (SVO) sequence and agreement rules.",
    "rules": [
      {
        "title": "Basic Word Order (SVO)",
        "details": "Subject -> Verb -> Object."
      },
      {
        "title": "Subject-Verb Agreement",
        "details": "Singular subjects require singular verbs. Plural subjects require plural verbs. Pronouns like \"everyone\", \"nobody\", \"each\" take singular verbs."
      }
    ],
    "keywords": [
      "SVO",
      "Subject-Verb Agreement",
      "everyone",
      "nobody"
    ],
    "examples": [
      "Everyone in the auditorium is listening attentively to the speaker.",
      "Although the rain was heavy, the trooping of the colour proceeded as planned.",
      "The professor explained the complex theory clearly to the students.",
      "Seldom have we witnessed such a spectacular display of fireworks over the Thames.",
      "She asked whether the flight to Edinburgh had been delayed.",
      "The castle, which was built in the 12th century, attracts thousands of tourists.",
      "Because the weather improved, the outdoor garden party was a huge success.",
      "Not only did he pass the exam, but he also achieved the highest distinction."
    ],
    "practice": [
      {
        "question": "Everyone in the team _____ a clear role.",
        "options": [
          "have",
          "has",
          "having",
          "are having"
        ],
        "correctIndex": 1,
        "explanation": "\"Everyone\" is an indefinite pronoun requiring a singular verb (has)."
      },
      {
        "question": "Select the correct British English usage for \"Word Order & Subject-Verb Agreement\":",
        "options": [
          "Correct application of Word Order & Subject-Verb Agreement in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Word Order & Subject-Verb Agreement."
      },
      {
        "question": "Which sentence correctly demonstrates \"Word Order & Subject-Verb Agreement\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Word Order & Subject-Verb Agreement."
      },
      {
        "question": "Complete the sentence according to the rule of Word Order & Subject-Verb Agreement: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Word Order & Subject-Verb Agreement\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "conjunctions-types",
    "categoryId": "syntax",
    "subgroup": "Clauses & Connectors",
    "title": "Sentence Types & Conjunctions",
    "summary": "Simple, compound, complex sentences, FANBOYS, and transition linkers.",
    "rules": [
      {
        "title": "Compound Connectors (FANBOYS)",
        "details": "For, And, Nor, But, Or, Yet, So connect independent clauses."
      },
      {
        "title": "Transitions by Function",
        "details": "Addition: furthermore, moreover. Contrast: however, whereas, despite. Cause/Effect: therefore, as a result."
      }
    ],
    "keywords": [
      "FANBOYS",
      "however",
      "despite",
      "therefore",
      "furthermore"
    ],
    "examples": [
      "He was tired; however, he continued studying for his English exam.",
      "Although the rain was heavy, the trooping of the colour proceeded as planned.",
      "The professor explained the complex theory clearly to the students.",
      "Seldom have we witnessed such a spectacular display of fireworks over the Thames.",
      "She asked whether the flight to Edinburgh had been delayed.",
      "The castle, which was built in the 12th century, attracts thousands of tourists.",
      "Because the weather improved, the outdoor garden party was a huge success.",
      "Not only did he pass the exam, but he also achieved the highest distinction."
    ],
    "practice": [
      {
        "question": "_____ the heavy rain, we went for a walk in Hyde Park.",
        "options": [
          "Although",
          "Despite",
          "However",
          "Because"
        ],
        "correctIndex": 1,
        "explanation": "\"Despite\" is followed by a noun phrase to express contrast."
      },
      {
        "question": "Select the correct British English usage for \"Sentence Types & Conjunctions\":",
        "options": [
          "Correct application of Sentence Types & Conjunctions in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Sentence Types & Conjunctions."
      },
      {
        "question": "Which sentence correctly demonstrates \"Sentence Types & Conjunctions\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Sentence Types & Conjunctions."
      },
      {
        "question": "Complete the sentence according to the rule of Sentence Types & Conjunctions: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Sentence Types & Conjunctions\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "negation-questions",
    "categoryId": "syntax",
    "subgroup": "Questions & Negation",
    "title": "Questions, Indirect Questions & Tag Questions",
    "summary": "Yes/No questions, Wh- questions, polite Indirect Questions, and Question Tags.",
    "rules": [
      {
        "title": "Indirect Questions",
        "details": "Maintain positive statement word order without inversion (e.g. Could you tell me where the station is? NOT where is the station)."
      },
      {
        "title": "Question Tags",
        "details": "Positive statements take negative tags, and vice versa (e.g. You are British, aren't you?)."
      }
    ],
    "keywords": [
      "Wh- questions",
      "Indirect questions",
      "Question tags"
    ],
    "examples": [
      "Could you tell me what time the museum opens?",
      "She lives in London, doesn't she?",
      "Although the rain was heavy, the trooping of the colour proceeded as planned.",
      "The professor explained the complex theory clearly to the students.",
      "Seldom have we witnessed such a spectacular display of fireworks over the Thames.",
      "She asked whether the flight to Edinburgh had been delayed.",
      "The castle, which was built in the 12th century, attracts thousands of tourists.",
      "Because the weather improved, the outdoor garden party was a huge success."
    ],
    "practice": [
      {
        "question": "You haven't seen my keys, _____ you?",
        "options": [
          "do",
          "did",
          "have",
          "haven't"
        ],
        "correctIndex": 2,
        "explanation": "A negative statement (haven't seen) takes a positive tag (have you)."
      },
      {
        "question": "Select the correct British English usage for \"Questions, Indirect Questions & Tag Questions\":",
        "options": [
          "Correct application of Questions, Indirect Questions & Tag Questions in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Questions, Indirect Questions & Tag Questions."
      },
      {
        "question": "Which sentence correctly demonstrates \"Questions, Indirect Questions & Tag Questions\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Questions, Indirect Questions & Tag Questions."
      },
      {
        "question": "Complete the sentence according to the rule of Questions, Indirect Questions & Tag Questions: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Questions, Indirect Questions & Tag Questions\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "relative-clauses",
    "categoryId": "syntax",
    "subgroup": "Clauses & Connectors",
    "title": "Relative Clauses (Who, Which, That, Whose)",
    "summary": "Defining vs non-defining relative clauses and relative pronoun usage.",
    "rules": [
      {
        "title": "Relative Pronouns",
        "details": "who (people), which (things/animals), that (both in defining clauses), whose (possession), where (place)."
      },
      {
        "title": "Non-Defining Relative Clauses",
        "details": "Set off by commas; provide extra information. The relative pronoun \"that\" cannot be used in non-defining clauses!"
      }
    ],
    "keywords": [
      "who",
      "which",
      "that",
      "whose",
      "where"
    ],
    "examples": [
      "The author who wrote Harry Potter lives in Scotland.",
      "London, which is the capital of the UK, has a rich history.",
      "Although the rain was heavy, the trooping of the colour proceeded as planned.",
      "The professor explained the complex theory clearly to the students.",
      "Seldom have we witnessed such a spectacular display of fireworks over the Thames.",
      "She asked whether the flight to Edinburgh had been delayed.",
      "The castle, which was built in the 12th century, attracts thousands of tourists.",
      "Because the weather improved, the outdoor garden party was a huge success."
    ],
    "practice": [
      {
        "question": "The man _____ car was stolen called the police.",
        "options": [
          "who",
          "which",
          "whose",
          "that"
        ],
        "correctIndex": 2,
        "explanation": "\"Whose\" indicates possession (the man's car)."
      },
      {
        "question": "Select the correct British English usage for \"Relative Clauses (Who, Which, That, Whose)\":",
        "options": [
          "Correct application of Relative Clauses (Who, Which, That, Whose) in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Relative Clauses (Who, Which, That, Whose)."
      },
      {
        "question": "Which sentence correctly demonstrates \"Relative Clauses (Who, Which, That, Whose)\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Relative Clauses (Who, Which, That, Whose)."
      },
      {
        "question": "Complete the sentence according to the rule of Relative Clauses (Who, Which, That, Whose): \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Relative Clauses (Who, Which, That, Whose)\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "modals",
    "categoryId": "special-verbs",
    "subgroup": "Modals",
    "title": "Modal Verbs & Modal Perfect",
    "summary": "Core modals (Can, Could, Must, Should, Might) and past modal perfect structures.",
    "rules": [
      {
        "title": "Base Modal Rules",
        "details": "Modals do not take third-person -s and are followed by a bare base verb."
      },
      {
        "title": "Modal Perfect (Past Deduction & Regret)",
        "details": "Modal + have + V3 (e.g. should have done = regret/past advice; must have been = logical past certainty)."
      }
    ],
    "keywords": [
      "can",
      "could",
      "must",
      "should",
      "might",
      "should have + V3"
    ],
    "examples": [
      "You should visit the British Museum while in London.",
      "He must have missed the train because he isn't here yet.",
      "You ought to visit the National Gallery while you are in Trafalgar Square.",
      "She decided to pursue a master's degree at Cambridge University.",
      "He has gotten used to driving on the left side of the road.",
      "They had their historic townhouse restored by expert craftsmen.",
      "She regrets not taking the morning train to Manchester.",
      "The officer let the passengers proceed through customs without delay."
    ],
    "practice": [
      {
        "question": "You _____ an umbrella; it was raining all day!",
        "options": [
          "should bring",
          "should have brought",
          "must bring",
          "can bring"
        ],
        "correctIndex": 1,
        "explanation": "Expressing regret or advice about a past action uses Should have + V3."
      },
      {
        "question": "Select the correct British English usage for \"Modal Verbs & Modal Perfect\":",
        "options": [
          "Correct application of Modal Verbs & Modal Perfect in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Modal Verbs & Modal Perfect."
      },
      {
        "question": "Which sentence correctly demonstrates \"Modal Verbs & Modal Perfect\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Modal Verbs & Modal Perfect."
      },
      {
        "question": "Complete the sentence according to the rule of Modal Verbs & Modal Perfect: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Modal Verbs & Modal Perfect\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "stative-verbs",
    "categoryId": "special-verbs",
    "subgroup": "Verb Properties",
    "title": "Stative vs Dynamic Verbs",
    "summary": "State verbs that avoid progressive (-ing) forms and verbs with dual meanings.",
    "rules": [
      {
        "title": "Stative Verbs",
        "details": "Verbs of emotion, thought, perception, possession (love, believe, know, understand, seem, belong) do not take continuous forms."
      },
      {
        "title": "Dual Meaning Verbs",
        "details": "Some verbs shift meaning: \"I think\" (opinion - stative) vs \"I am thinking\" (mental action - dynamic)."
      }
    ],
    "keywords": [
      "love",
      "believe",
      "know",
      "understand",
      "think vs thinking"
    ],
    "examples": [
      "I understand the grammar rule perfectly.",
      "She is thinking about buying a flat in London.",
      "You ought to visit the National Gallery while you are in Trafalgar Square.",
      "She decided to pursue a master's degree at Cambridge University.",
      "He has gotten used to driving on the left side of the road.",
      "They had their historic townhouse restored by expert craftsmen.",
      "She regrets not taking the morning train to Manchester.",
      "The officer let the passengers proceed through customs without delay."
    ],
    "practice": [
      {
        "question": "I _____ what you are saying.",
        "options": [
          "am understanding",
          "understand",
          "was understanding",
          "have been understanding"
        ],
        "correctIndex": 1,
        "explanation": "\"Understand\" is a stative verb and takes simple form."
      },
      {
        "question": "Select the correct British English usage for \"Stative vs Dynamic Verbs\":",
        "options": [
          "Correct application of Stative vs Dynamic Verbs in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Stative vs Dynamic Verbs."
      },
      {
        "question": "Which sentence correctly demonstrates \"Stative vs Dynamic Verbs\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Stative vs Dynamic Verbs."
      },
      {
        "question": "Complete the sentence according to the rule of Stative vs Dynamic Verbs: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Stative vs Dynamic Verbs\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "gerunds-infinitives",
    "categoryId": "special-verbs",
    "subgroup": "Verb Complements",
    "title": "Gerunds vs Infinitives",
    "summary": "Determining when to use Verb-ing vs To + Base Verb.",
    "rules": [
      {
        "title": "Gerunds (-ing)",
        "details": "After prepositions (interested in learning), as sentence subject (Reading is beneficial), and after specific verbs (enjoy, avoid, suggest, finish, mind)."
      },
      {
        "title": "Infinitives (To + Verb)",
        "details": "To express purpose (came to help), after adjectives (happy to meet), and after specific verbs (decide, plan, hope, want, offer)."
      }
    ],
    "keywords": [
      "enjoy doing",
      "decide to do",
      "interested in doing"
    ],
    "examples": [
      "She enjoys drinking British tea in the afternoon.",
      "They decided to move to Manchester.",
      "You ought to visit the National Gallery while you are in Trafalgar Square.",
      "She decided to pursue a master's degree at Cambridge University.",
      "He has gotten used to driving on the left side of the road.",
      "They had their historic townhouse restored by expert craftsmen.",
      "She regrets not taking the morning train to Manchester.",
      "The officer let the passengers proceed through customs without delay."
    ],
    "practice": [
      {
        "question": "He suggested _____ to the pub after work.",
        "options": [
          "to go",
          "going",
          "go",
          "went"
        ],
        "correctIndex": 1,
        "explanation": "The verb \"suggest\" is followed by a gerund (-ing)."
      },
      {
        "question": "Select the correct British English usage for \"Gerunds vs Infinitives\":",
        "options": [
          "Correct application of Gerunds vs Infinitives in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Gerunds vs Infinitives."
      },
      {
        "question": "Which sentence correctly demonstrates \"Gerunds vs Infinitives\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Gerunds vs Infinitives."
      },
      {
        "question": "Complete the sentence according to the rule of Gerunds vs Infinitives: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Gerunds vs Infinitives\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "transitive-intransitive",
    "categoryId": "special-verbs",
    "subgroup": "Verb Properties",
    "title": "Transitive vs Intransitive Verbs",
    "summary": "Verbs requiring a direct object vs verbs operating independently (raise/rise, lay/lie).",
    "rules": [
      {
        "title": "Transitive Verbs (Require Direct Object)",
        "details": "Require an object to complete meaning: raise (raise your hand), lay (lay the book down), set (set the table)."
      },
      {
        "title": "Intransitive Verbs (No Direct Object)",
        "details": "Do not take a direct object: rise (the sun rises), lie (lie down on the bed), sit (sit in the chair)."
      }
    ],
    "keywords": [
      "raise vs rise",
      "lay vs lie",
      "set vs sit",
      "direct object"
    ],
    "examples": [
      "Prices continue to rise in London.",
      "Please raise your hand if you have a question.",
      "You ought to visit the National Gallery while you are in Trafalgar Square.",
      "She decided to pursue a master's degree at Cambridge University.",
      "He has gotten used to driving on the left side of the road.",
      "They had their historic townhouse restored by expert craftsmen.",
      "She regrets not taking the morning train to Manchester.",
      "The officer let the passengers proceed through customs without delay."
    ],
    "practice": [
      {
        "question": "The Sun _____ in the east every morning.",
        "options": [
          "raises",
          "rises",
          "lays",
          "sets"
        ],
        "correctIndex": 1,
        "explanation": "\"Rise\" is intransitive and does not require a direct object."
      },
      {
        "question": "Select the correct British English usage for \"Transitive vs Intransitive Verbs\":",
        "options": [
          "Correct application of Transitive vs Intransitive Verbs in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Transitive vs Intransitive Verbs."
      },
      {
        "question": "Which sentence correctly demonstrates \"Transitive vs Intransitive Verbs\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Transitive vs Intransitive Verbs."
      },
      {
        "question": "Complete the sentence according to the rule of Transitive vs Intransitive Verbs: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Transitive vs Intransitive Verbs\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "emphatic-do",
    "categoryId": "special-verbs",
    "subgroup": "Emphasis",
    "title": "Emphatic Do / Does / Did",
    "summary": "Using auxiliary \"do\" in positive statements for strong emphasis or polite invitation.",
    "rules": [
      {
        "title": "Strong Affirmation & Contrast",
        "details": "Insert Do/Does/Did before base verb to contradict doubt or add passion (e.g. I DO love British tea!)."
      },
      {
        "title": "Polite British Imperatives",
        "details": "Use \"Do\" before imperative verbs for warm, polite hospitality (e.g. Do sit down! Do have another biscuit!)."
      }
    ],
    "keywords": [
      "I do believe",
      "Do sit down!",
      "emphatic stress"
    ],
    "examples": [
      "I may not speak fluently, but I do understand everything.",
      "Do come in and make yourself at home!",
      "You ought to visit the National Gallery while you are in Trafalgar Square.",
      "She decided to pursue a master's degree at Cambridge University.",
      "He has gotten used to driving on the left side of the road.",
      "They had their historic townhouse restored by expert craftsmen.",
      "She regrets not taking the morning train to Manchester.",
      "The officer let the passengers proceed through customs without delay."
    ],
    "practice": [
      {
        "question": "Please, _____ sit down and enjoy a cup of tea!",
        "options": [
          "do",
          "does",
          "did",
          "done"
        ],
        "correctIndex": 0,
        "explanation": "Emphatic \"Do\" adds polite British warmth to imperatives."
      },
      {
        "question": "Select the correct British English usage for \"Emphatic Do / Does / Did\":",
        "options": [
          "Correct application of Emphatic Do / Does / Did in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Emphatic Do / Does / Did."
      },
      {
        "question": "Which sentence correctly demonstrates \"Emphatic Do / Does / Did\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Emphatic Do / Does / Did."
      },
      {
        "question": "Complete the sentence according to the rule of Emphatic Do / Does / Did: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Emphatic Do / Does / Did\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "phrasal-verbs",
    "categoryId": "special-verbs",
    "subgroup": "Phrasal Verbs",
    "title": "Phrasal Verbs & Separability",
    "summary": "Verb + preposition/adverb combinations and pronoun separation rules.",
    "rules": [
      {
        "title": "Separable Phrasal Verbs",
        "details": "If the object is a pronoun (it, them), it MUST go between verb and particle (turn it on, take them off)."
      },
      {
        "title": "Inseparable Phrasal Verbs",
        "details": "The object always follows the entire phrasal verb (look after him, run into a friend)."
      }
    ],
    "keywords": [
      "give up",
      "take off",
      "look after",
      "turn on/off"
    ],
    "examples": [
      "Please turn the lights off -> Please turn them off.",
      "She looks after her grandmother every weekend.",
      "You ought to visit the National Gallery while you are in Trafalgar Square.",
      "She decided to pursue a master's degree at Cambridge University.",
      "He has gotten used to driving on the left side of the road.",
      "They had their historic townhouse restored by expert craftsmen.",
      "She regrets not taking the morning train to Manchester.",
      "The officer let the passengers proceed through customs without delay."
    ],
    "practice": [
      {
        "question": "Please turn the radio _____ ; it is too loud.",
        "options": [
          "off",
          "on",
          "up",
          "in"
        ],
        "correctIndex": 0,
        "explanation": "\"Turn off\" means to deactivate or stop."
      },
      {
        "question": "Select the correct British English usage for \"Phrasal Verbs & Separability\":",
        "options": [
          "Correct application of Phrasal Verbs & Separability in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Phrasal Verbs & Separability."
      },
      {
        "question": "Which sentence correctly demonstrates \"Phrasal Verbs & Separability\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Phrasal Verbs & Separability."
      },
      {
        "question": "Complete the sentence according to the rule of Phrasal Verbs & Separability: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Phrasal Verbs & Separability\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "causative-verbs",
    "categoryId": "special-verbs",
    "subgroup": "Causative Structures",
    "title": "Causative Verbs & Passive Causative",
    "summary": "Structures for forcing, allowing, or arranging actions (Let, Make, Have, Get).",
    "rules": [
      {
        "title": "Let / Make / Have",
        "details": "Let/Make/Have + person + Base Verb (She made him clean the room)."
      },
      {
        "title": "Get",
        "details": "Get + person + TO + Base Verb (I got him to fix the car)."
      },
      {
        "title": "Passive Causative",
        "details": "have/get + object + V3 (I had my car repaired by a professional mechanic)."
      }
    ],
    "keywords": [
      "make someone do",
      "get someone to do",
      "have something done"
    ],
    "examples": [
      "She had her roof repaired last week.",
      "The teacher made the students rewrite the assignment.",
      "You ought to visit the National Gallery while you are in Trafalgar Square.",
      "She decided to pursue a master's degree at Cambridge University.",
      "He has gotten used to driving on the left side of the road.",
      "They had their historic townhouse restored by expert craftsmen.",
      "She regrets not taking the morning train to Manchester.",
      "The officer let the passengers proceed through customs without delay."
    ],
    "practice": [
      {
        "question": "I had my hair _____ yesterday.",
        "options": [
          "cut",
          "cutting",
          "to cut",
          "cuts"
        ],
        "correctIndex": 0,
        "explanation": "Passive Causative: have + object + V3 (cut)."
      },
      {
        "question": "Select the correct British English usage for \"Causative Verbs & Passive Causative\":",
        "options": [
          "Correct application of Causative Verbs & Passive Causative in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Causative Verbs & Passive Causative."
      },
      {
        "question": "Which sentence correctly demonstrates \"Causative Verbs & Passive Causative\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Causative Verbs & Passive Causative."
      },
      {
        "question": "Complete the sentence according to the rule of Causative Verbs & Passive Causative: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Causative Verbs & Passive Causative\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "conditionals",
    "categoryId": "advanced-grammar",
    "subgroup": "Conditionals",
    "title": "Conditionals (0, 1, 2, 3 & Mixed)",
    "summary": "Real, unreal, hypothetical, past regrets, and mixed conditional structures.",
    "rules": [
      {
        "title": "Zero Conditional (General Truths)",
        "details": "If + Present Simple, Present Simple (If you heat ice, it melts)."
      },
      {
        "title": "First Conditional (Real Future)",
        "details": "If + Present Simple, Will + base verb (If it rains, I will take an umbrella)."
      },
      {
        "title": "Second Conditional (Unreal Present/Future)",
        "details": "If + Past Simple, Would + base verb (If I won the lottery, I would buy a castle)."
      },
      {
        "title": "Third Conditional (Past Regrets)",
        "details": "If + Past Perfect, Would have + V3 (If I had studied, I would have passed)."
      }
    ],
    "keywords": [
      "Zero",
      "First",
      "Second",
      "Third",
      "Mixed Conditionals"
    ],
    "examples": [
      "If I had known about the meeting, I would have attended.",
      "If you mix red and blue, you get purple.",
      "Had we known about the line closure, we would have taken the Underground.",
      "It is essential that every delegate be registered before the opening session.",
      "The historic treaty was signed by representatives from six nations.",
      "She spoke as if she had lived in the United Kingdom all her life.",
      "In British English, \"bonnet\" is used for the front cover of a car.",
      "Were the situation to deteriorate, emergency measures would be implemented immediately."
    ],
    "practice": [
      {
        "question": "If I _____ more free time, I would learn Welsh.",
        "options": [
          "have",
          "had",
          "had had",
          "will have"
        ],
        "correctIndex": 1,
        "explanation": "Second Conditional unreal present takes Past Simple in the IF clause."
      },
      {
        "question": "Select the correct British English usage for \"Conditionals (0, 1, 2, 3 & Mixed)\":",
        "options": [
          "Correct application of Conditionals (0, 1, 2, 3 & Mixed) in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Conditionals (0, 1, 2, 3 & Mixed)."
      },
      {
        "question": "Which sentence correctly demonstrates \"Conditionals (0, 1, 2, 3 & Mixed)\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Conditionals (0, 1, 2, 3 & Mixed)."
      },
      {
        "question": "Complete the sentence according to the rule of Conditionals (0, 1, 2, 3 & Mixed): \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Conditionals (0, 1, 2, 3 & Mixed)\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "subjunctive-mood",
    "categoryId": "advanced-grammar",
    "subgroup": "Advanced Structures",
    "title": "Subjunctive Mood",
    "summary": "Formal expressions of demand, urgency, necessity, or unreal hypothetical situations.",
    "rules": [
      {
        "title": "Present Subjunctive (Mandatory Base Verb)",
        "details": "After verbs/adjectives of demand, requirement, or recommendation (insist, demand, recommend, vital, crucial), use the bare base verb for ALL persons without third-person -s (e.g. It is vital that he BE present)."
      },
      {
        "title": "Past Subjunctive (Were)",
        "details": "Use \"were\" instead of \"was\" for all subjects in unreal hypothetical clauses (e.g. If I WERE you, I would accept)."
      }
    ],
    "keywords": [
      "insist that he be",
      "vital that she go",
      "If I were you"
    ],
    "examples": [
      "The chairman insisted that he attend the summit.",
      "If I were you, I would take the train to Edinburgh.",
      "Had we known about the line closure, we would have taken the Underground.",
      "It is essential that every delegate be registered before the opening session.",
      "The historic treaty was signed by representatives from six nations.",
      "She spoke as if she had lived in the United Kingdom all her life.",
      "In British English, \"bonnet\" is used for the front cover of a car.",
      "Were the situation to deteriorate, emergency measures would be implemented immediately."
    ],
    "practice": [
      {
        "question": "It is essential that she _____ informed immediately.",
        "options": [
          "is",
          "be",
          "was",
          "been"
        ],
        "correctIndex": 1,
        "explanation": "Formal subjunctive requirement requires bare base verb \"be\"."
      },
      {
        "question": "Select the correct British English usage for \"Subjunctive Mood\":",
        "options": [
          "Correct application of Subjunctive Mood in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Subjunctive Mood."
      },
      {
        "question": "Which sentence correctly demonstrates \"Subjunctive Mood\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Subjunctive Mood."
      },
      {
        "question": "Complete the sentence according to the rule of Subjunctive Mood: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Subjunctive Mood\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "ellipsis-substitution",
    "categoryId": "advanced-grammar",
    "subgroup": "Advanced Structures",
    "title": "Ellipsis & Substitution",
    "summary": "Omitting repetitive words or using substitutes (so, do, neither, nor).",
    "rules": [
      {
        "title": "Substitution with \"So\" & \"Neither\"",
        "details": "Agreement: \"So do I\" (positive), \"Neither do I\" (negative). Short response: \"I think so\", \"I hope so\", \"I suppose so\"."
      },
      {
        "title": "Ellipsis (Word Omission)",
        "details": "Omitting redundant words when context is clear (e.g. \"Are you coming?\" - \"I'd love to [come]\")."
      }
    ],
    "keywords": [
      "So do I",
      "Neither do I",
      "I hope so",
      "ellipsis"
    ],
    "examples": [
      "\"I love British tea.\" - \"So do I!\"",
      "\"Will it rain today?\" - \"I hope not.\"",
      "Had we known about the line closure, we would have taken the Underground.",
      "It is essential that every delegate be registered before the opening session.",
      "The historic treaty was signed by representatives from six nations.",
      "She spoke as if she had lived in the United Kingdom all her life.",
      "In British English, \"bonnet\" is used for the front cover of a car.",
      "Were the situation to deteriorate, emergency measures would be implemented immediately."
    ],
    "practice": [
      {
        "question": "\"I don't like cold weather.\" - \"_____ do I.\"",
        "options": [
          "So",
          "Neither",
          "Also",
          "Either"
        ],
        "correctIndex": 1,
        "explanation": "Agreement with a negative statement uses \"Neither do I\"."
      },
      {
        "question": "Select the correct British English usage for \"Ellipsis & Substitution\":",
        "options": [
          "Correct application of Ellipsis & Substitution in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Ellipsis & Substitution."
      },
      {
        "question": "Which sentence correctly demonstrates \"Ellipsis & Substitution\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Ellipsis & Substitution."
      },
      {
        "question": "Complete the sentence according to the rule of Ellipsis & Substitution: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Ellipsis & Substitution\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "british-vs-american",
    "categoryId": "advanced-grammar",
    "subgroup": "British Varieties",
    "title": "British vs American English Rules",
    "summary": "Key grammar, spelling, and usage differences between UK and US English.",
    "rules": [
      {
        "title": "Collective Nouns Agreement",
        "details": "UK English treats collective nouns as plural or singular depending on context (e.g. The team ARE playing well / The government HAVE decided). US English treats them strictly as singular."
      },
      {
        "title": "Have vs Have Got",
        "details": "UK English frequently uses \"have got\" for possession (I've got a new car), whereas US English favors \"have\" (I have a new car)."
      },
      {
        "title": "Spelling Variations",
        "details": "UK: -our (colour), -ise (organise), -re (centre), doubling l in past tense (travelled). US: -or (color), -ize (organize), -er (center), single l (traveled)."
      }
    ],
    "keywords": [
      "have got",
      "collective nouns ARE",
      "colour vs color",
      "travelled vs traveled"
    ],
    "examples": [
      "The England team are confident about winning tonight.",
      "Have you got any change for the bus?",
      "Had we known about the line closure, we would have taken the Underground.",
      "It is essential that every delegate be registered before the opening session.",
      "The historic treaty was signed by representatives from six nations.",
      "She spoke as if she had lived in the United Kingdom all her life.",
      "In British English, \"bonnet\" is used for the front cover of a car.",
      "Were the situation to deteriorate, emergency measures would be implemented immediately."
    ],
    "practice": [
      {
        "question": "In UK English, which spelling is standard for \"colour\"?",
        "options": [
          "color",
          "colour",
          "culur",
          "coler"
        ],
        "correctIndex": 1,
        "explanation": "UK English uses the \"-our\" suffix (colour, honour, harbour)."
      },
      {
        "question": "Select the correct British English usage for \"British vs American English Rules\":",
        "options": [
          "Correct application of British vs American English Rules in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of British vs American English Rules."
      },
      {
        "question": "Which sentence correctly demonstrates \"British vs American English Rules\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for British vs American English Rules."
      },
      {
        "question": "Complete the sentence according to the rule of British vs American English Rules: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"British vs American English Rules\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "punctuation-capitalization",
    "categoryId": "mechanics",
    "subgroup": "Punctuation & Mechanics",
    "title": "Capitalization & Apostrophe Rules",
    "summary": "Rules for capital letters, possessive apostrophes, and contraction clarity.",
    "rules": [
      {
        "title": "Capital Letters",
        "details": "Sentence starts, proper nouns, days, months, languages, nationalities, and the pronoun I."
      },
      {
        "title": "Possessive Apostrophes",
        "details": "Singular noun: the boy's book. Plural noun ending in s: the boys' school. Critical distinction: It's = It is vs Its = possessive pronoun."
      }
    ],
    "keywords": [
      "Capital letters",
      "Apostrophe",
      "it's vs its"
    ],
    "examples": [
      "The cat chased its tail.",
      "It's raining in London today.",
      "London, the capital of the United Kingdom, is a global center for culture.",
      "The company's main offices are situated near Canary Wharf.",
      "She asked, \"Has the 9:45 train to Cambridge arrived at platform 2?\"",
      "The well-known archaeologist discovered a hoard of Roman gold coins.",
      "He didn't forget to pack his passport and visa, did he?",
      "The multi-phase project was completed well within the allocated budget."
    ],
    "practice": [
      {
        "question": "The dog wagged _____ tail happily.",
        "options": [
          "it's",
          "its",
          "its'",
          "it"
        ],
        "correctIndex": 1,
        "explanation": "\"Its\" without an apostrophe is the possessive pronoun."
      },
      {
        "question": "Select the correct British English usage for \"Capitalization & Apostrophe Rules\":",
        "options": [
          "Correct application of Capitalization & Apostrophe Rules in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Capitalization & Apostrophe Rules."
      },
      {
        "question": "Which sentence correctly demonstrates \"Capitalization & Apostrophe Rules\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Capitalization & Apostrophe Rules."
      },
      {
        "question": "Complete the sentence according to the rule of Capitalization & Apostrophe Rules: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Capitalization & Apostrophe Rules\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "advanced-punctuation",
    "categoryId": "mechanics",
    "subgroup": "Punctuation & Mechanics",
    "title": "Semicolons, Colons, Hyphens & Dashes",
    "summary": "Advanced punctuation mechanics for academic and formal written English.",
    "rules": [
      {
        "title": "Semicolons (;)",
        "details": "Connect two closely related independent clauses without a conjunction (e.g. The rain was heavy; we decided to stay indoors)."
      },
      {
        "title": "Colons (:)",
        "details": "Introduce a list, explanation, or direct quotation following a complete independent clause."
      },
      {
        "title": "Hyphens (-) vs Dashes (--)",
        "details": "Hyphens join compound words (well-known, thirty-two). Em-dashes set off emphatic parenthetical thoughts."
      }
    ],
    "keywords": [
      "semicolon ;",
      "colon :",
      "hyphen -",
      "em dash"
    ],
    "examples": [
      "London is a global capital; it attracts millions of visitors annually.",
      "She had one goal: to master British English.",
      "London, the capital of the United Kingdom, is a global center for culture.",
      "The company's main offices are situated near Canary Wharf.",
      "She asked, \"Has the 9:45 train to Cambridge arrived at platform 2?\"",
      "The well-known archaeologist discovered a hoard of Roman gold coins.",
      "He didn't forget to pack his passport and visa, did he?",
      "The multi-phase project was completed well within the allocated budget."
    ],
    "practice": [
      {
        "question": "Which punctuation mark joins two closely related independent clauses without a conjunction?",
        "options": [
          "Comma",
          "Semicolon",
          "Hyphen",
          "Apostrophe"
        ],
        "correctIndex": 1,
        "explanation": "A semicolon (;) connects related independent clauses."
      },
      {
        "question": "Select the correct British English usage for \"Semicolons, Colons, Hyphens & Dashes\":",
        "options": [
          "Correct application of Semicolons, Colons, Hyphens & Dashes in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Semicolons, Colons, Hyphens & Dashes."
      },
      {
        "question": "Which sentence correctly demonstrates \"Semicolons, Colons, Hyphens & Dashes\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Semicolons, Colons, Hyphens & Dashes."
      },
      {
        "question": "Complete the sentence according to the rule of Semicolons, Colons, Hyphens & Dashes: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Semicolons, Colons, Hyphens & Dashes\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "tag-questions",
    "categoryId": "pragmatics",
    "subgroup": "Conversational Grammar",
    "title": "Question Tags (Tag Questions)",
    "summary": "Forming agreement checks, confirmation tags, and polite conversational prompts in British English.",
    "rules": [
      {
        "title": "Polarity Inversion Rule",
        "details": "A positive main clause takes a negative tag (e.g. You live in London, don't you?). A negative main clause takes a positive tag (e.g. He hasn't arrived, has he?)."
      },
      {
        "title": "Auxiliary & Modal Matching",
        "details": "Match the auxiliary or modal verb from the main sentence (is -> isn't, can -> can't). If no auxiliary is present, use do/does/did."
      },
      {
        "title": "Special British Tags",
        "details": "For \"I am\", the negative tag is \"aren't I?\" (e.g. I am right, aren't I?). For imperatives: \"Pass the tea, will you?\" or \"Let's have a break, shall we?\"."
      }
    ],
    "keywords": [
      "tag questions",
      "aren't I",
      "shall we",
      "will you",
      "don't you"
    ],
    "examples": [
      "Lovely afternoon for a walk, isn't it?",
      "You haven't seen my umbrella, have you?",
      "Let's pop into the cafe, shall we?",
      "Would you mind passing the marmalade, please?",
      "I was wondering if I could trouble you for a brief moment.",
      "Lovely afternoon for a walk through Hyde Park, isn't it?",
      "I'm afraid the chief executive is currently out of the office.",
      "Could you possibly direct me to the nearest tube station?"
    ],
    "practice": [
      {
        "question": "I am invited to the garden party, _____?",
        "options": [
          "am not I",
          "aren't I",
          "don't I",
          "isn't it"
        ],
        "correctIndex": 1,
        "explanation": "The standard tag for \"I am\" in spoken British English is \"aren't I?\"."
      },
      {
        "question": "They didn't catch the early train, _____?",
        "options": [
          "did they",
          "didn't they",
          "do they",
          "have they"
        ],
        "correctIndex": 0,
        "explanation": "A negative statement (didn't catch) takes a positive tag (did they)."
      },
      {
        "question": "Select the correct British English usage for \"Question Tags (Tag Questions)\":",
        "options": [
          "Correct application of Question Tags (Tag Questions) in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Question Tags (Tag Questions)."
      },
      {
        "question": "Which sentence correctly demonstrates \"Question Tags (Tag Questions)\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Question Tags (Tag Questions)."
      },
      {
        "question": "Complete the sentence according to the rule of Question Tags (Tag Questions): \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Question Tags (Tag Questions)\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      }
    ]
  },
  {
    "id": "polite-requests",
    "categoryId": "pragmatics",
    "subgroup": "British Social Courtesy",
    "title": "Polite Requests, Softening & Hedging",
    "summary": "Using indirect questions, modal verbs, and hedging phrases to make polite requests without sounding abrupt.",
    "rules": [
      {
        "title": "Indirect Questions",
        "details": "Structure requests with tentative introductory frames: \"Could you possibly...\", \"I was wondering if you could...\", \"Do you happen to know...\""
      },
      {
        "title": "Gerund after \"Would you mind\"",
        "details": "Always follow \"Would you mind\" with a gerund (verb-ing) (e.g. Would you mind opening the window?)."
      },
      {
        "title": "Hedging Words",
        "details": "Softening phrases like \"quite\", \"rather\", \"perhaps\", \"I'm afraid\", \"possibly\" prevent sentences from sounding too demanding."
      }
    ],
    "keywords": [
      "would you mind",
      "I was wondering",
      "could you possibly",
      "hedging",
      "I'm afraid"
    ],
    "examples": [
      "I was wondering if I could borrow your pen for a second.",
      "Would you mind waiting in the reception room, please?",
      "I'm afraid the manager is currently in a meeting.",
      "Would you mind passing the marmalade, please?",
      "I was wondering if I could trouble you for a brief moment.",
      "Lovely afternoon for a walk through Hyde Park, isn't it?",
      "I'm afraid the chief executive is currently out of the office.",
      "Could you possibly direct me to the nearest tube station?"
    ],
    "practice": [
      {
        "question": "Would you mind _____ the window a little?",
        "options": [
          "open",
          "to open",
          "opening",
          "opened"
        ],
        "correctIndex": 2,
        "explanation": "\"Would you mind\" is always followed by a verb in the -ing form (opening)."
      },
      {
        "question": "Choose the most polite British request:",
        "options": [
          "Give me that paper now.",
          "I want that paper.",
          "Could you possibly pass that paper?",
          "Pass paper."
        ],
        "correctIndex": 2,
        "explanation": "\"Could you possibly...\" softens the request politely."
      },
      {
        "question": "Select the correct British English usage for \"Polite Requests, Softening & Hedging\":",
        "options": [
          "Correct application of Polite Requests, Softening & Hedging in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Polite Requests, Softening & Hedging."
      },
      {
        "question": "Which sentence correctly demonstrates \"Polite Requests, Softening & Hedging\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Polite Requests, Softening & Hedging."
      },
      {
        "question": "Complete the sentence according to the rule of Polite Requests, Softening & Hedging: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Polite Requests, Softening & Hedging\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      }
    ]
  },
  {
    "id": "sentence-connectors",
    "categoryId": "discourse",
    "subgroup": "Text Cohesion",
    "title": "Cohesive Transitions & Sentence Connectors",
    "summary": "Linking sentences logically using contrast, addition, cause, and concession.",
    "rules": [
      {
        "title": "Contrast & Concession",
        "details": "However, Nevertheless (introduce independent clauses). Although, Even though (+ subject + verb). Despite, In spite of (+ noun / verb-ing)."
      },
      {
        "title": "Addition & Elaboration",
        "details": "Furthermore, Moreover, In addition, Besides (used to introduce further supporting arguments)."
      },
      {
        "title": "Cause & Result",
        "details": "Therefore, Consequently, As a result, Thus (indicate logical outcome)."
      }
    ],
    "keywords": [
      "however",
      "nevertheless",
      "despite",
      "furthermore",
      "therefore",
      "consequently"
    ],
    "examples": [
      "The weather was foggy; nevertheless, the flight landed safely at Heathrow.",
      "Despite the heavy rain, the football match continued.",
      "She passed with distinction; furthermore, she won the academic prize.",
      "The market conditions were challenging; nevertheless, quarterly profits rose.",
      "Furthermore, the commission published three additional recommendations.",
      "It was in Edinburgh that Robert Louis Stevenson wrote his classic tales.",
      "Under no circumstances should personal belongings be left unattended.",
      "In light of the evidence, the tribunal reached a unanimous verdict."
    ],
    "practice": [
      {
        "question": "_____ the heavy traffic, we arrived at Piccadilly Circus on time.",
        "options": [
          "Although",
          "Despite",
          "However",
          "Even though"
        ],
        "correctIndex": 1,
        "explanation": "\"Despite\" is followed directly by a noun phrase (\"the heavy traffic\"). \"Although\" requires a subject + verb."
      },
      {
        "question": "The museum was closed; _____, we visited the gallery nearby.",
        "options": [
          "therefore",
          "because",
          "despite",
          "in order to"
        ],
        "correctIndex": 0,
        "explanation": "\"Therefore\" introduces the logical consequence of the first clause."
      },
      {
        "question": "Select the correct British English usage for \"Cohesive Transitions & Sentence Connectors\":",
        "options": [
          "Correct application of Cohesive Transitions & Sentence Connectors in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Cohesive Transitions & Sentence Connectors."
      },
      {
        "question": "Which sentence correctly demonstrates \"Cohesive Transitions & Sentence Connectors\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Cohesive Transitions & Sentence Connectors."
      },
      {
        "question": "Complete the sentence according to the rule of Cohesive Transitions & Sentence Connectors: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Cohesive Transitions & Sentence Connectors\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      }
    ]
  },
  {
    "id": "cleft-sentences",
    "categoryId": "discourse",
    "subgroup": "Emphasis & Focus",
    "title": "Emphasis & Cleft Sentences",
    "summary": "Structuring sentences with \"It is... that\" or \"What... is\" to highlight specific information.",
    "rules": [
      {
        "title": "It-Cleft Sentences",
        "details": "Structure: It + be + [emphasized element] + that/who... (e.g. It was William Shakespeare who wrote Hamlet)."
      },
      {
        "title": "Wh-Cleft Sentences (Pseudo-clefts)",
        "details": "Structure: What + clause + be + [emphasized element] (e.g. What I really enjoy is a walk along the River Thames)."
      },
      {
        "title": "Inversion for High Rhetorical Emphasis",
        "details": "Fronting negative adverbs requires subject-auxiliary inversion (e.g. Seldom have I heard such impressive eloquence)."
      }
    ],
    "keywords": [
      "it was... that",
      "what I need is",
      "cleft sentence",
      "emphasis",
      "seldom have I"
    ],
    "examples": [
      "It was in Edinburgh that they first met.",
      "What amazed us most was the architecture of St Paul's Cathedral.",
      "Rarely have we experienced such outstanding service.",
      "The market conditions were challenging; nevertheless, quarterly profits rose.",
      "Furthermore, the commission published three additional recommendations.",
      "It was in Edinburgh that Robert Louis Stevenson wrote his classic tales.",
      "Under no circumstances should personal belongings be left unattended.",
      "In light of the evidence, the tribunal reached a unanimous verdict."
    ],
    "practice": [
      {
        "question": "Rewrite for emphasis: \"I love the historical atmosphere in York.\" -> \"What I love about York _____ the historical atmosphere.\"",
        "options": [
          "is",
          "are",
          "were",
          "being"
        ],
        "correctIndex": 0,
        "explanation": "In a Wh-cleft sentence focusing on a singular concept, use \"is\" (or \"was\" for past tense)."
      },
      {
        "question": "Select the correct British English usage for \"Emphasis & Cleft Sentences\":",
        "options": [
          "Correct application of Emphasis & Cleft Sentences in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Emphasis & Cleft Sentences."
      },
      {
        "question": "Which sentence correctly demonstrates \"Emphasis & Cleft Sentences\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Emphasis & Cleft Sentences."
      },
      {
        "question": "Complete the sentence according to the rule of Emphasis & Cleft Sentences: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Emphasis & Cleft Sentences\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "collocations-prepositions",
    "categoryId": "discourse",
    "subgroup": "Lexical Collocations",
    "title": "Fixed Prepositional Phrases & Collocations",
    "summary": "Mastering set prepositional combinations in formal and spoken British English.",
    "rules": [
      {
        "title": "Fixed Prepositional Phrases",
        "details": "at short notice, on behalf of, in light of, under no circumstances, by accident, in charge of."
      },
      {
        "title": "Dependent Prepositions",
        "details": "Verbs and adjectives take fixed prepositions: rely ON, accuse OF, interested IN, famous FOR, congratulate ON."
      }
    ],
    "keywords": [
      "at short notice",
      "on behalf of",
      "in light of",
      "under no circumstances",
      "rely on"
    ],
    "examples": [
      "I am writing on behalf of the director.",
      "In light of recent news, the event has been postponed.",
      "Under no circumstances should you leave your luggage unattended.",
      "The market conditions were challenging; nevertheless, quarterly profits rose.",
      "Furthermore, the commission published three additional recommendations.",
      "It was in Edinburgh that Robert Louis Stevenson wrote his classic tales.",
      "Under no circumstances should personal belongings be left unattended.",
      "In light of the evidence, the tribunal reached a unanimous verdict."
    ],
    "practice": [
      {
        "question": "He accepted the job offer _____ short notice.",
        "options": [
          "in",
          "at",
          "on",
          "with"
        ],
        "correctIndex": 1,
        "explanation": "The fixed prepositional phrase is \"at short notice\"."
      },
      {
        "question": "Select the correct British English usage for \"Fixed Prepositional Phrases & Collocations\":",
        "options": [
          "Correct application of Fixed Prepositional Phrases & Collocations in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Fixed Prepositional Phrases & Collocations."
      },
      {
        "question": "Which sentence correctly demonstrates \"Fixed Prepositional Phrases & Collocations\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Fixed Prepositional Phrases & Collocations."
      },
      {
        "question": "Complete the sentence according to the rule of Fixed Prepositional Phrases & Collocations: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Fixed Prepositional Phrases & Collocations\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "formal-correspondence",
    "categoryId": "academic-business",
    "subgroup": "Professional Writing",
    "title": "British Business Email & Letter Conventions",
    "summary": "Salutations, sign-offs, formal register, and polite phrasing in British correspondence.",
    "rules": [
      {
        "title": "Salutation & Sign-off Pairing",
        "details": "If you start with \"Dear Sir/Madam\" (unknown name) -> end with \"Yours faithfully\". If you start with \"Dear Mr Smith\" (known name) -> end with \"Yours sincerely\"."
      },
      {
        "title": "Opening & Closing Phrasing",
        "details": "Opening: \"I am writing to inquire regarding...\", \"Further to our phone conversation...\". Closing: \"I look forward to hearing from you.\""
      },
      {
        "title": "Look forward to + -ing",
        "details": "The phrase \"look forward to\" requires a gerund (-ing verb) (e.g. I look forward to meeting you, NOT to meet)."
      }
    ],
    "keywords": [
      "yours faithfully",
      "yours sincerely",
      "dear sir or madam",
      "look forward to",
      "formal email"
    ],
    "examples": [
      "Dear Ms Davies, Further to your email, please find attached the invoice. Yours sincerely, Arthur Pendelton.",
      "I look forward to receiving your reply.",
      "Dear Mr Sterling, Further to our discussion, please find enclosed the proposal.",
      "I am writing to express my strong interest in the research fellowship.",
      "I look forward to hearing from you at your earliest convenience.",
      "The empirical findings indicate a positive correlation between the variables.",
      "Yours sincerely, Victoria Pendelton.",
      "It is recommended that further clinical trials be conducted."
    ],
    "practice": [
      {
        "question": "If a formal British letter begins with \"Dear Sir or Madam\", how should it end?",
        "options": [
          "Yours sincerely,",
          "Yours faithfully,",
          "Best wishes,",
          "Cheers,"
        ],
        "correctIndex": 1,
        "explanation": "\"Yours faithfully\" is paired with \"Dear Sir or Madam\" when the recipient's name is unknown."
      },
      {
        "question": "I look forward to _____ from you soon.",
        "options": [
          "hear",
          "hearing",
          "heard",
          "be hearing"
        ],
        "correctIndex": 1,
        "explanation": "\"Look forward to\" is followed by the -ing form (hearing)."
      },
      {
        "question": "Select the correct British English usage for \"British Business Email & Letter Conventions\":",
        "options": [
          "Correct application of British Business Email & Letter Conventions in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of British Business Email & Letter Conventions."
      },
      {
        "question": "Which sentence correctly demonstrates \"British Business Email & Letter Conventions\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for British Business Email & Letter Conventions."
      },
      {
        "question": "Complete the sentence according to the rule of British Business Email & Letter Conventions: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"British Business Email & Letter Conventions\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      }
    ]
  },
  {
    "id": "used-to-would",
    "categoryId": "special-verbs",
    "subgroup": "Habitual Past",
    "title": "Used To vs. Would vs. Be/Get Used To",
    "summary": "Distinguishing past habits, repeated actions, and becoming accustomed to something.",
    "rules": [
      {
        "title": "Used To + Base Verb",
        "details": "Expresses past habits or past states that are no longer true (e.g. I used to live in Oxford)."
      },
      {
        "title": "Would + Base Verb",
        "details": "Expresses repeated past ACTIONS only, NOT past states (e.g. Every summer we would visit Brighton; NOT \"I would be a child\")."
      },
      {
        "title": "Be / Get Used To + -ing / Noun",
        "details": "To be or become accustomed to a situation (e.g. She is used to driving in London traffic)."
      }
    ],
    "keywords": [
      "used to",
      "would",
      "be used to",
      "get used to",
      "past habit"
    ],
    "examples": [
      "I used to work in Manchester.",
      "When we were young, we would spend hours playing in the park.",
      "He is getting used to the British weather.",
      "You ought to visit the National Gallery while you are in Trafalgar Square.",
      "She decided to pursue a master's degree at Cambridge University.",
      "He has gotten used to driving on the left side of the road.",
      "They had their historic townhouse restored by expert craftsmen.",
      "She regrets not taking the morning train to Manchester."
    ],
    "practice": [
      {
        "question": "She _____ living in a cold climate now.",
        "options": [
          "used to",
          "is used to",
          "would",
          "use to"
        ],
        "correctIndex": 1,
        "explanation": "\"is used to\" (+ -ing) means she is currently accustomed to it."
      },
      {
        "question": "Select the correct British English usage for \"Used To vs. Would vs. Be/Get Used To\":",
        "options": [
          "Correct application of Used To vs. Would vs. Be/Get Used To in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Used To vs. Would vs. Be/Get Used To."
      },
      {
        "question": "Which sentence correctly demonstrates \"Used To vs. Would vs. Be/Get Used To\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Used To vs. Would vs. Be/Get Used To."
      },
      {
        "question": "Complete the sentence according to the rule of Used To vs. Would vs. Be/Get Used To: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Used To vs. Would vs. Be/Get Used To\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  },
  {
    "id": "determiners-quantifiers",
    "categoryId": "parts-of-speech",
    "subgroup": "Determiners",
    "title": "Determiners: Each, Every, Both, Either, Neither",
    "summary": "Expressing distribution, dual choices, and negative pairings in formal English.",
    "rules": [
      {
        "title": "Each vs Every",
        "details": "\"Each\" considers items individually (each student). \"Every\" considers them as a total group (every day)."
      },
      {
        "title": "Both / Either / Neither (Dual Items)",
        "details": "Used strictly for TWO items. \"Both\" takes a plural verb. \"Either\" means one or the other. \"Neither\" means not one nor the other (takes singular verb)."
      },
      {
        "title": "Neither... nor / Either... or",
        "details": "Neither John nor Mary was available. Either option is acceptable."
      }
    ],
    "keywords": [
      "each",
      "every",
      "both",
      "either",
      "neither",
      "determiners"
    ],
    "examples": [
      "Both candidates interviewed well.",
      "Neither answer is correct.",
      "Each ticket has a unique seat number.",
      "The historic cobblestone streets of York are beautifully preserved.",
      "She gave him a rare antique silver pocket watch.",
      "Neither of the proposals was approved by the executive committee.",
      "He walked quietly into the grand library of Trinity College.",
      "They placed the heavy wooden crates on top of the lorry."
    ],
    "practice": [
      {
        "question": "_____ of the two proposals was accepted by the committee.",
        "options": [
          "Neither",
          "None",
          "No one",
          "Not"
        ],
        "correctIndex": 0,
        "explanation": "When referring to two items, use \"Neither\" (not one nor the other)."
      },
      {
        "question": "Select the correct British English usage for \"Determiners: Each, Every, Both, Either, Neither\":",
        "options": [
          "Correct application of Determiners: Each, Every, Both, Either, Neither in a standard British clause",
          "Incorrect tense or structure application",
          "Double negative or misplaced modifier",
          "Non-standard colloquial mismatch"
        ],
        "correctIndex": 0,
        "explanation": "Standard British English grammar requires proper adherence to the rules of Determiners: Each, Every, Both, Either, Neither."
      },
      {
        "question": "Which sentence correctly demonstrates \"Determiners: Each, Every, Both, Either, Neither\"?",
        "options": [
          "The team has already completed their task successfully.",
          "The team have did their task yesterday already.",
          "The team is complete their task already tomorrow.",
          "The team completes task done yesterday."
        ],
        "correctIndex": 0,
        "explanation": "Proper subject-verb agreement and structure are required for Determiners: Each, Every, Both, Either, Neither."
      },
      {
        "question": "Complete the sentence according to the rule of Determiners: Each, Every, Both, Either, Neither: \"They _____ to London.\"",
        "options": [
          "have traveled",
          "traveling",
          "has travel",
          "were travel"
        ],
        "correctIndex": 0,
        "explanation": "Plural subject \"They\" pairs with \"have\" + past participle."
      },
      {
        "question": "Identify the correct option for formal British English:",
        "options": [
          "I would be grateful if you could confirm your attendance.",
          "I want you confirm you coming now.",
          "Confirm me if you come or not.",
          "You must to tell me if coming."
        ],
        "correctIndex": 0,
        "explanation": "Formal British English prefers polite modal structures (\"would be grateful if...\")."
      },
      {
        "question": "Choose the grammatically sound structure for \"Determiners: Each, Every, Both, Either, Neither\":",
        "options": [
          "Neither the director nor the assistant was available.",
          "Neither the director or assistant were present.",
          "Not the director and not assistant was there.",
          "Either director nor assistant wasn't there."
        ],
        "correctIndex": 0,
        "explanation": "\"Neither... nor\" pairs with a singular verb in formal British English."
      },
      {
        "question": "Fill in the blank: \"She is used to _____ in cold weather.\"",
        "options": [
          "walking",
          "walk",
          "walked",
          "to walk"
        ],
        "correctIndex": 0,
        "explanation": "\"Be used to\" is followed by a gerund (-ing form)."
      },
      {
        "question": "Which option expresses a polite indirect request?",
        "options": [
          "Could you possibly open the door?",
          "Open the door right now.",
          "I demand you open door.",
          "You must open door for me."
        ],
        "correctIndex": 0,
        "explanation": "\"Could you possibly...\" softens the request courteously."
      }
    ]
  }
,
  {
  "id": "parts-of-speech-overview",
  "categoryId": "parts-of-speech",
  "subgroup": "Foundations of Grammar",
  "title": "Parts of Speech (Word Classes)",
  "summary": "The 9 core word classes: Nouns, Verbs, Adjectives, Adverbs, Pronouns, Prepositions, Conjunctions, Determiners, and Interjections.",
  "rules": [
    {
      "title": "The Core Classification",
      "details": "Every English word belongs to a grammatical class that determines its role and syntactic position within a sentence."
    },
    {
      "title": "Open vs. Closed Classes",
      "details": "Open classes (nouns, verbs, adjectives, adverbs) regularly acquire new vocabulary. Closed classes (pronouns, prepositions, conjunctions, determiners) have a fixed set of grammatical function words."
    },
    {
      "title": "Word Class Conversion",
      "details": "The same word form can serve different parts of speech based on sentence function (e.g. 'She reads a book' [noun] vs. 'I need to book a train' [verb])."
    }
  ],
  "keywords": [
    "parts of speech",
    "word classes",
    "nouns",
    "verbs",
    "adjectives",
    "adverbs",
    "pronouns",
    "prepositions",
    "conjunctions",
    "determiners"
  ],
  "examples": [
    "Noun: She reads a book in the British Library.",
    "Verb: She reads a book every evening.",
    "Adjective: She reads an interesting book.",
    "Adverb: She reads quickly on the train.",
    "Pronoun: She reads a book before bed.",
    "Preposition: The book is on the table.",
    "Conjunction: She reads and writes every weekend.",
    "Determiner: She reads a book by Charles Dickens."
  ],
  "practice": [
    {
      "question": "In the sentence 'She reads an interesting book', which part of speech is 'interesting'?",
      "options": [
        "Adjective",
        "Noun",
        "Adverb",
        "Pronoun"
      ],
      "correctIndex": 0,
      "explanation": "'Interesting' describes the noun 'book', making it an adjective."
    },
    {
      "question": "In 'The book is on the table', what role does 'on' play?",
      "options": [
        "Preposition",
        "Conjunction",
        "Determiner",
        "Adverb"
      ],
      "correctIndex": 0,
      "explanation": "'On' indicates spatial relationship, functioning as a preposition."
    },
    {
      "question": "Which word in 'She reads quickly' is an adverb of manner?",
      "options": [
        "quickly",
        "She",
        "reads",
        "None"
      ],
      "correctIndex": 0,
      "explanation": "'Quickly' describes how she reads, functioning as an adverb."
    },
    {
      "question": "Identify the conjunction in: 'She reads and writes diligently.'",
      "options": [
        "and",
        "reads",
        "writes",
        "diligently"
      ],
      "correctIndex": 0,
      "explanation": "'And' joins the two verbs together, functioning as a coordinating conjunction."
    },
    {
      "question": "What part of speech is 'a' in 'She reads a book'?",
      "options": [
        "Determiner (Indefinite Article)",
        "Adjective",
        "Pronoun",
        "Preposition"
      ],
      "correctIndex": 0,
      "explanation": "'A' is an indefinite article, which belongs to the class of determiners."
    },
    {
      "question": "In the sentence 'They arrived at Paddington station', which word is a proper noun?",
      "options": [
        "Paddington",
        "arrived",
        "at",
        "station"
      ],
      "correctIndex": 0,
      "explanation": "'Paddington' is a specific named place, capitalized as a proper noun."
    },
    {
      "question": "Which of the following contains an interjection?",
      "options": [
        "Brilliant! We won the match.",
        "We won the match yesterday.",
        "The match was brilliant.",
        "He played in the match."
      ],
      "correctIndex": 0,
      "explanation": "'Brilliant!' used standalone at the start expresses sudden emotion or praise as an interjection."
    },
    {
      "question": "In 'He made himself a cup of tea', what type of pronoun is 'himself'?",
      "options": [
        "Reflexive pronoun",
        "Possessive pronoun",
        "Relative pronoun",
        "Demonstrative pronoun"
      ],
      "correctIndex": 0,
      "explanation": "'Himself' reflects back to the subject 'He', functioning as a reflexive pronoun."
    }
  ]
},
  {
  "id": "adverbs-types",
  "categoryId": "parts-of-speech",
  "subgroup": "Parts of Speech",
  "title": "Adverbs: Manner, Time, Place, Frequency & Degree",
  "summary": "Adverbs modify verbs, adjectives, or entire clauses to convey how, when, where, how often, or to what extent an action occurs.",
  "rules": [
    {
      "title": "Adverbs of Manner (-ly)",
      "details": "Describe how something happens (e.g. softly, patiently, brilliantly, quickly). Positioned typically after the verb or object."
    },
    {
      "title": "Adverbs of Frequency",
      "details": "Always, usually, often, sometimes, rarely, never. Placed before main verbs but after the verb 'to be' and auxiliaries."
    },
    {
      "title": "Adverbs of Degree",
      "details": "Very, extremely, quite, rather, thoroughly, totally. Modify adjectives, adverbs, or verbs to express intensity."
    }
  ],
  "keywords": [
    "adverbs",
    "manner",
    "time",
    "place",
    "frequency",
    "degree",
    "quickly",
    "often",
    "extremely"
  ],
  "examples": [
    "He spoke very politely to the shopkeeper in Covent Garden.",
    "She rarely misses the morning train to Victoria.",
    "They walked briskly through Hyde Park in the crisp autumn air.",
    "The performance was thoroughly impressive."
  ],
  "practice": [
    {
      "question": "Which sentence has the adverb of frequency correctly placed?",
      "options": [
        "He always catches the 8:15 train to Waterloo.",
        "He catches always the 8:15 train to Waterloo.",
        "Always he catches to Waterloo the 8:15 train.",
        "He catches the 8:15 train always to Waterloo."
      ],
      "correctIndex": 0,
      "explanation": "Adverbs of frequency go directly before the main lexical verb."
    },
    {
      "question": "Identify the adverb of degree in: 'The weather in Scotland was extremely chilly.'",
      "options": [
        "extremely",
        "chilly",
        "weather",
        "Scotland"
      ],
      "correctIndex": 0,
      "explanation": "'Extremely' intensifies the adjective 'chilly'."
    },
    {
      "question": "Fill in the blank: 'The solicitor handled the confidential case _____.'",
      "options": [
        "discreetly",
        "discreet",
        "discretion",
        "discreetness"
      ],
      "correctIndex": 0,
      "explanation": "Modifying how the verb 'handled' was executed requires the adverb 'discreetly'."
    },
    {
      "question": "Which of these is an adverb of place?",
      "options": [
        "downstairs",
        "frequently",
        "quietly",
        "barely"
      ],
      "correctIndex": 0,
      "explanation": "'Downstairs' indicates the spatial location."
    },
    {
      "question": "In 'She spoke quite softly', what does 'quite' modify?",
      "options": [
        "The adverb 'softly'",
        "The verb 'spoke'",
        "The pronoun 'She'",
        "The whole clause"
      ],
      "correctIndex": 0,
      "explanation": "'Quite' is an adverb of degree modifying the adverb 'softly'."
    },
    {
      "question": "Choose the adverb of time:",
      "options": [
        "yesterday",
        "carefully",
        "everywhere",
        "almost"
      ],
      "correctIndex": 0,
      "explanation": "'Yesterday' specifies when the event occurred."
    },
    {
      "question": "What is the irregular adverb form of the adjective 'good'?",
      "options": [
        "well",
        "goodly",
        "good",
        "betterly"
      ],
      "correctIndex": 0,
      "explanation": "'Good' becomes 'well' as an adverb."
    },
    {
      "question": "In 'The train barely arrived on time', 'barely' expresses:",
      "options": [
        "Degree / limitation (almost not)",
        "Manner (how it moved)",
        "Place",
        "Direction"
      ],
      "correctIndex": 0,
      "explanation": "'Barely' is an adverb of degree meaning hardly or only just."
    }
  ]
},
  {
  "id": "auxiliary-verbs",
  "categoryId": "special-verbs",
  "subgroup": "Verb Forms & Special Systems",
  "title": "Auxiliary Verbs (Be, Do, Have)",
  "summary": "Primary helping verbs used to construct progressive aspects, perfect tenses, passive voice, negations, and questions.",
  "rules": [
    {
      "title": "The Auxiliary 'Be'",
      "details": "Used with present participles (-ing) for continuous aspects ('is waiting') and with past participles for the passive voice ('was written')."
    },
    {
      "title": "The Auxiliary 'Do'",
      "details": "Used for simple present/past questions, negations ('Do you know?', 'He did not go'), and emphatic affirmation ('I do appreciate your help')."
    },
    {
      "title": "The Auxiliary 'Have'",
      "details": "Used with past participles to create the perfect aspect across present, past, and future ('has arrived', 'had finished')."
    }
  ],
  "keywords": [
    "auxiliary verbs",
    "be",
    "do",
    "have",
    "helping verbs",
    "tenses",
    "aspect"
  ],
  "examples": [
    "We are currently reviewing the annual report.",
    "Do you fancy a cuppa before the meeting?",
    "She has lived in Kensington for over ten years.",
    "The parcel was delivered by Royal Mail this morning."
  ],
  "practice": [
    {
      "question": "Which sentence uses 'have' as an auxiliary verb rather than a main verb?",
      "options": [
        "They have completed the refurbishment of the station.",
        "They have a lovely cottage in the Cotswolds.",
        "They have breakfast at seven o'clock.",
        "They have many interesting books."
      ],
      "correctIndex": 0,
      "explanation": "In 'have completed', 'have' helps form the present perfect tense."
    },
    {
      "question": "Complete the question: '_____ she like Earl Grey tea?'",
      "options": [
        "Does",
        "Is",
        "Has",
        "Do"
      ],
      "correctIndex": 0,
      "explanation": "Third-person singular Present Simple questions use 'Does'."
    },
    {
      "question": "Which auxiliary is required for passive voice?",
      "options": [
        "Be",
        "Do",
        "Have",
        "Can"
      ],
      "correctIndex": 0,
      "explanation": "Passive voice is always constructed with a form of 'to be' + past participle."
    },
    {
      "question": "In 'I did tell him the right platform!', 'did' is used for:",
      "options": [
        "Emphatic stress",
        "A question",
        "Negation",
        "Future intention"
      ],
      "correctIndex": 0,
      "explanation": "'Did' with a base verb provides strong emphatic affirmation."
    },
    {
      "question": "Fill in the blank: 'By the time we arrived, the gallery _____ closed.'",
      "options": [
        "had",
        "has",
        "did",
        "was having"
      ],
      "correctIndex": 0,
      "explanation": "Past perfect requires the auxiliary 'had'."
    },
    {
      "question": "Identify the auxiliary verb in: 'The team was awarded first prize.'",
      "options": [
        "was",
        "awarded",
        "first",
        "prize"
      ],
      "correctIndex": 0,
      "explanation": "'Was' is the auxiliary verb forming the passive construction."
    },
    {
      "question": "Which auxiliary is used with '-ing' to form continuous tenses?",
      "options": [
        "Be",
        "Have",
        "Do",
        "Will"
      ],
      "correctIndex": 0,
      "explanation": "The auxiliary 'be' + '-ing' participle forms progressive/continuous tenses."
    },
    {
      "question": "Select the correct negative contraction of 'have not':",
      "options": [
        "haven't",
        "havn't",
        "havenot",
        "have'nt"
      ],
      "correctIndex": 0,
      "explanation": "The apostrophe replaces the omitted letter 'o': 'haven't'."
    }
  ]
},
  {
  "id": "negatives-system",
  "categoryId": "syntax",
  "subgroup": "Sentence Structure & Syntax",
  "title": "Negatives & Contractions (Don't, Doesn't, Didn't, Won't)",
  "summary": "Forming negative clauses correctly with auxiliary verbs, modal verbs, and avoiding double negatives in standard British English.",
  "rules": [
    {
      "title": "Negation with Auxiliaries",
      "details": "Attach 'not' or contracted \"n't\" directly to the first auxiliary or modal verb (e.g. is not -> isn't, will not -> won't, cannot -> can't)."
    },
    {
      "title": "Do-Support in Simple Tenses",
      "details": "Present simple uses don't / doesn't; past simple uses didn't. The lexical main verb always reverts to its base infinitive (bare form)."
    },
    {
      "title": "Avoiding Double Negatives",
      "details": "Standard English grammar uses single negation: 'I didn't see anything' (NOT 'I didn't see nothing')."
    }
  ],
  "keywords": [
    "negatives",
    "contractions",
    "don't",
    "doesn't",
    "didn't",
    "won't",
    "isn't",
    "aren't",
    "can't"
  ],
  "examples": [
    "He doesn't commute to Central London on Fridays.",
    "We didn't receive the notification until this morning.",
    "They aren't keen on queueing in the rain.",
    "I won't be able to attend the gallery opening."
  ],
  "practice": [
    {
      "question": "Which sentence follows standard British English negation rules?",
      "options": [
        "I haven't got any cash on me today.",
        "I haven't got no cash on me today.",
        "I didn't got any cash on me today.",
        "I hasn't any cash on me today."
      ],
      "correctIndex": 0,
      "explanation": "Standard grammar uses single negation ('haven't got any...')."
    },
    {
      "question": "What is the contraction of 'will not'?",
      "options": [
        "won't",
        "willn't",
        "wont",
        "woul'nt"
      ],
      "correctIndex": 0,
      "explanation": "'Will not' contracts irregularly to 'won't'."
    },
    {
      "question": "Complete the negative sentence: 'She _____ drink coffee after midday.'",
      "options": [
        "doesn't",
        "don't",
        "isn't",
        "aren't"
      ],
      "correctIndex": 0,
      "explanation": "Third-person singular 'She' takes 'doesn't' with the base verb 'drink'."
    },
    {
      "question": "Correct the mistake: 'He didn't knew the route to Oxford.'",
      "options": [
        "He didn't know the route to Oxford.",
        "He didn't known the route to Oxford.",
        "He didn't knows the route to Oxford.",
        "He not knew the route to Oxford."
      ],
      "correctIndex": 0,
      "explanation": "After 'didn't', the main verb must remain in its bare infinitive form ('know')."
    },
    {
      "question": "Which sentence uses a negative modal correctly?",
      "options": [
        "You mustn't feed the pigeons in Trafalgar Square.",
        "You don't must feed the pigeons in Trafalgar Square.",
        "You mustn't to feed the pigeons in Trafalgar Square.",
        "You must not feeding the pigeons in Trafalgar Square."
      ],
      "correctIndex": 0,
      "explanation": "'Mustn't' takes a bare infinitive without 'to'."
    },
    {
      "question": "Choose the formal, uncontracted negative:",
      "options": [
        "It is not permissible under the current regulations.",
        "It isn't permissible under the current regulations.",
        "It ain't permissible under the current regulations.",
        "It not permissible under the current regulations."
      ],
      "correctIndex": 0,
      "explanation": "Formal written British English prefers the full form 'is not'."
    },
    {
      "question": "Select the correct negative question for polite confirmation:",
      "options": [
        "Aren't you meeting Oliver at Piccadilly Circus?",
        "Don't you meeting Oliver at Piccadilly Circus?",
        "Isn't you meeting Oliver at Piccadilly Circus?",
        "Are you not meet Oliver at Piccadilly Circus?"
      ],
      "correctIndex": 0,
      "explanation": "'Aren't you meeting...' correctly pairs 'aren't' with 'you' in present continuous."
    },
    {
      "question": "Which word turns the sentence negative without using 'not'?",
      "options": [
        "seldom",
        "frequently",
        "occasionally",
        "definitely"
      ],
      "correctIndex": 0,
      "explanation": "'Seldom' is an inherently negative / restrictive adverb meaning rarely."
    }
  ]
},
  {
  "id": "passive-voice",
  "categoryId": "advanced-grammar",
  "subgroup": "Advanced Grammar & British Varieties",
  "title": "Passive Voice (Be + Past Participle)",
  "summary": "Shifting sentence focus to the receiver of the action: 'The cake was made; the letter was sent.' Crucial for academic, journalistic, and formal British English.",
  "rules": [
    {
      "title": "Formation Principle",
      "details": "Subject (Receiver) + Form of 'Be' (conjugated for tense/person) + Past Participle (+ 'by' agent if necessary)."
    },
    {
      "title": "Why Use Passive Voice?",
      "details": "When the agent is unknown, obvious, unimportant, or intentionally omitted for objective or diplomatic tone in formal reports."
    },
    {
      "title": "Tense Transformations",
      "details": "Active 'She writes letters' -> Passive 'Letters are written'. Active 'They built the bridge in 1894' -> Passive 'The bridge was built in 1894'."
    }
  ],
  "keywords": [
    "passive voice",
    "past participle",
    "was made",
    "was sent",
    "by agent",
    "formal english"
  ],
  "examples": [
    "The Magna Carta was signed in 1215 at Runnymede.",
    "The cake was made for the Queen's jubilee celebration.",
    "The letter was sent via registered British post.",
    "All visitors are requested to keep to the designated paths."
  ],
  "practice": [
    {
      "question": "Convert into passive: 'The architect designed the new museum wing.'",
      "options": [
        "The new museum wing was designed by the architect.",
        "The new museum wing is designed by the architect.",
        "The new museum wing had designed by the architect.",
        "The new museum wing was being design by the architect."
      ],
      "correctIndex": 0,
      "explanation": "Past simple active ('designed') converts to past simple passive ('was designed')."
    },
    {
      "question": "Identify the passive sentence:",
      "options": [
        "The historic clock tower is being restored this year.",
        "The engineers are restoring the historic clock tower.",
        "The engineers restored the historic clock tower.",
        "The clock tower will chime loudly tomorrow."
      ],
      "correctIndex": 0,
      "explanation": "'is being restored' is present continuous passive."
    },
    {
      "question": "Complete the sentence in the passive voice: 'The invitations _____ yesterday.'",
      "options": [
        "were sent",
        "was sent",
        "are sent",
        "sent"
      ],
      "correctIndex": 0,
      "explanation": "'Invitations' is plural and the timeframe is 'yesterday', requiring 'were sent'."
    },
    {
      "question": "Which sentence demonstrates the formal 'impersonal passive'?",
      "options": [
        "It is widely believed that the treaty will be signed.",
        "People widely believe that they will sign the treaty.",
        "We believe the treaty will be signed.",
        "They think the treaty is signed."
      ],
      "correctIndex": 0,
      "explanation": "'It is widely believed that...' is a classic impersonal passive structure."
    },
    {
      "question": "Why is 'by Royal Mail' placed at the end of 'The parcel was dispatched by Royal Mail'?",
      "options": [
        "It identifies the agent (who performed the action).",
        "It is the direct object of the clause.",
        "It acts as an adverb of time.",
        "It is an indirect pronoun."
      ],
      "correctIndex": 0,
      "explanation": "The preposition 'by' introduces the agent performing the action in passive voice."
    },
    {
      "question": "Select the correct present perfect passive:",
      "options": [
        "The documents have been signed by the solicitor.",
        "The documents have signed by the solicitor.",
        "The documents were been signed by the solicitor.",
        "The documents has been signed by the solicitor."
      ],
      "correctIndex": 0,
      "explanation": "Plural subject 'documents' requires 'have been' + past participle 'signed'."
    },
    {
      "question": "Which verb cannot normally be made passive?",
      "options": [
        "arrive (intransitive)",
        "inspect (transitive)",
        "demolish (transitive)",
        "publish (transitive)"
      ],
      "correctIndex": 0,
      "explanation": "Intransitive verbs like 'arrive' have no direct object and cannot form a passive voice."
    },
    {
      "question": "What is the passive form of: 'They will announce the winner soon.'?",
      "options": [
        "The winner will be announced soon.",
        "The winner will announced soon.",
        "The winner is announced soon.",
        "The winner will being announced soon."
      ],
      "correctIndex": 0,
      "explanation": "Future simple modal passive is formed with 'will be' + past participle."
    }
  ]
},
  {
  "id": "reported-speech",
  "categoryId": "advanced-grammar",
  "subgroup": "Advanced Grammar & British Varieties",
  "title": "Reported Speech & Indirect Discourse",
  "summary": "Reporting what someone said with backshifting tenses, adjusting pronouns, and updating time and place references ('She said that she was tired').",
  "rules": [
    {
      "title": "Tense Backshifting",
      "details": "When the reporting verb is in the past (e.g. said, told), present tenses shift one step into the past: Present Simple -> Past Simple; Present Continuous -> Past Continuous; Present Perfect -> Past Perfect."
    },
    {
      "title": "Reporting Verbs & Structure",
      "details": "'Say' does not require a personal indirect object ('He said that...'), whereas 'tell' must have a personal object ('He told me that...')."
    },
    {
      "title": "Time & Place Shift",
      "details": "Time markers adapt to the reporting frame: 'now' -> 'then', 'today' -> 'that day', 'tomorrow' -> 'the following day', 'here' -> 'there'."
    }
  ],
  "keywords": [
    "reported speech",
    "indirect speech",
    "backshifting",
    "she said that",
    "told me",
    "reported questions"
  ],
  "examples": [
    "Direct: \"I am tired.\" -> Reported: She said that she was tired.",
    "Direct: \"We have bought tickets.\" -> Reported: They told me they had bought tickets.",
    "Direct: \"I will call you tomorrow.\" -> Reported: He promised he would call the following day.",
    "Direct: \"Where is the station?\" -> Reported: She asked where the station was."
  ],
  "practice": [
    {
      "question": "Direct speech: \"I live in Manchester.\" How is this reported in the past?",
      "options": [
        "He said that he lived in Manchester.",
        "He said that he lives in Manchester.",
        "He said that he had lived in Manchester.",
        "He told that he lived in Manchester."
      ],
      "correctIndex": 0,
      "explanation": "Present simple 'live' backshifts to past simple 'lived'."
    },
    {
      "question": "Which sentence correctly uses 'tell' in reported speech?",
      "options": [
        "She told me that the meeting was postponed.",
        "She told that the meeting was postponed.",
        "She said to me that the meeting postponed.",
        "She told to me that the meeting was postponed."
      ],
      "correctIndex": 0,
      "explanation": "'Tell' requires an object pronoun ('told me') without 'to'."
    },
    {
      "question": "Direct speech: \"I have finished my thesis.\" -> Reported speech:",
      "options": [
        "He stated that he had finished his thesis.",
        "He stated that he has finished his thesis.",
        "He stated that he finished his thesis.",
        "He stated that he would finish his thesis."
      ],
      "correctIndex": 0,
      "explanation": "Present perfect 'have finished' backshifts to past perfect 'had finished'."
    },
    {
      "question": "Convert the modal 'can': \"I can assist you with that.\"",
      "options": [
        "She said she could assist with that.",
        "She said she can assist with that.",
        "She said she would can assist with that.",
        "She said she will could assist with that."
      ],
      "correctIndex": 0,
      "explanation": "'Can' shifts to its past equivalent 'could'."
    },
    {
      "question": "How does 'tomorrow' transform in reported speech?",
      "options": [
        "The following day / the next day",
        "The previous day",
        "The day before yesterday",
        "That day"
      ],
      "correctIndex": 0,
      "explanation": "'Tomorrow' shifts to 'the next day' or 'the following day'."
    },
    {
      "question": "Report this question: \"Do you take sugar in your tea?\"",
      "options": [
        "She asked if I took sugar in my tea.",
        "She asked did I take sugar in my tea.",
        "She asked do I take sugar in my tea.",
        "She asked that I take sugar in my tea."
      ],
      "correctIndex": 0,
      "explanation": "Yes/no questions in reported speech use 'if' or 'whether' with normal statement word order."
    },
    {
      "question": "Which reporting verb matches an order or command?",
      "options": [
        "instructed",
        "inquired",
        "wondered",
        "speculated"
      ],
      "correctIndex": 0,
      "explanation": "'Instructed' is used to report commands ('He instructed us to wait')."
    },
    {
      "question": "Direct speech: \"I will be there.\" -> Reported speech:",
      "options": [
        "He said he would be there.",
        "He said he will be there.",
        "He said he is being there.",
        "He said he was there."
      ],
      "correctIndex": 0,
      "explanation": "'Will' backshifts to conditional 'would'."
    }
  ]
},
  {
  "id": "comparisons",
  "categoryId": "parts-of-speech",
  "subgroup": "Parts of Speech",
  "title": "Comparisons: As...as, More than, The Most",
  "summary": "Comparing qualities of nouns and actions using comparative and superlative adjectives, adverbs, and equative structures.",
  "rules": [
    {
      "title": "One-Syllable Adjectives",
      "details": "Add -er / -est (e.g. quick -> quicker -> quickest; cold -> colder -> coldest). Double final consonant after a short vowel (big -> bigger -> biggest)."
    },
    {
      "title": "Multi-Syllable Adjectives",
      "details": "Use 'more' and 'most' for words of three or more syllables and most two-syllable adjectives (e.g. more sophisticated, the most expensive)."
    },
    {
      "title": "Equative Comparison (As...as)",
      "details": "Use 'as + base adjective + as' to indicate equality ('London is as vibrant as New York'). In negatives, 'not as...as' or 'not so...as' is standard."
    }
  ],
  "keywords": [
    "comparisons",
    "as as",
    "more than",
    "the most",
    "comparative",
    "superlative",
    "better",
    "best"
  ],
  "examples": [
    "The train is much faster than the coach to Bristol.",
    "The Shard is the tallest building in the United Kingdom.",
    "Today's weather is not as gloomy as yesterday's.",
    "She performed far more brilliantly than expected."
  ],
  "practice": [
    {
      "question": "Which sentence shows correct comparative structure?",
      "options": [
        "The Thames is wider than the River Cam.",
        "The Thames is more wide than the River Cam.",
        "The Thames is wider as the River Cam.",
        "The Thames is more wider than the River Cam."
      ],
      "correctIndex": 0,
      "explanation": "One-syllable adjective 'wide' takes the -r suffix ('wider') followed by 'than'."
    },
    {
      "question": "Complete the equative comparison: 'His flat is _____ mine.'",
      "options": [
        "as spacious as",
        "more spacious as",
        "as spacious than",
        "spacious as"
      ],
      "correctIndex": 0,
      "explanation": "Equative comparisons strictly require 'as + adjective + as'."
    },
    {
      "question": "What is the superlative form of the irregular adjective 'bad'?",
      "options": [
        "worst",
        "worse",
        "baddest",
        "most bad"
      ],
      "correctIndex": 0,
      "explanation": "'Bad' -> 'worse' (comparative) -> 'worst' (superlative)."
    },
    {
      "question": "Fill in the blank: 'This boutique offers _____ service in Mayfair.'",
      "options": [
        "the most courteous",
        "the courteousest",
        "the more courteous",
        "most courteous"
      ],
      "correctIndex": 0,
      "explanation": "Multi-syllable adjectives form superlatives with 'the most'."
    },
    {
      "question": "Which modifier is used for emphatic comparative degree?",
      "options": [
        "far",
        "very",
        "too",
        "so"
      ],
      "correctIndex": 0,
      "explanation": "We say 'far better' or 'much better' (not 'very better')."
    },
    {
      "question": "Choose the correct irregular comparative:",
      "options": [
        "further / farther",
        "farer",
        "more far",
        "farrest"
      ],
      "correctIndex": 0,
      "explanation": "'Far' becomes 'further' or 'farther' in comparative form."
    },
    {
      "question": "Select the correct double comparative expression:",
      "options": [
        "The more you practice, the more confident you become.",
        "The more you practice, more you become confident.",
        "More you practice, the more you confident.",
        "As more you practice, so you become confident."
      ],
      "correctIndex": 0,
      "explanation": "'The more..., the more...' is the classic proportional comparative structure."
    },
    {
      "question": "Which word correctly completes: 'She is two years _____ than her brother.'?",
      "options": [
        "older",
        "elder",
        "more old",
        "eldest"
      ],
      "correctIndex": 0,
      "explanation": "When followed by 'than', 'older' is grammatically mandatory ('elder' is an attributive adjective without 'than')."
    }
  ]
},
  {
  "id": "word-formation",
  "categoryId": "mechanics",
  "subgroup": "Mechanics & Word Formation",
  "title": "Word Formation: Prefixes, Suffixes & Conversion",
  "summary": "Expanding vocabulary by deriving nouns from verbs, adjectives from nouns, using prefixes (un-, dis-, mis-), and morphological conversion.",
  "rules": [
    {
      "title": "Prefixes (Altering Meaning)",
      "details": "Common negative prefixes: un- (unhappy), dis- (disagree), mis- (misunderstand), in-/im-/il-/ir- (impossible, irregular). Re- (do again), over- (too much)."
    },
    {
      "title": "Suffixes (Altering Word Class)",
      "details": "Noun suffixes: -tion, -ment, -ness, -ity (develop -> development). Adjective suffixes: -ful, -less, -able, -ive (care -> careful, careless). Verb suffixes: -ify, -ise/-ize."
    },
    {
      "title": "Conversion (Zero Derivation)",
      "details": "Creating a new part of speech without altering the form (e.g. 'email' [noun] -> 'to email' [verb]; 'bottle' -> 'to bottle')."
    }
  ],
  "keywords": [
    "word formation",
    "prefixes",
    "suffixes",
    "conversion",
    "nouns from verbs",
    "adjectives from nouns"
  ],
  "examples": [
    "Verb 'conclude' -> Noun 'conclusion'.",
    "Noun 'delight' -> Adjective 'delightful'.",
    "Adjective 'kind' -> Noun 'kindness'.",
    "Prefix 'mis-' + 'understand' -> 'misunderstand'."
  ],
  "practice": [
    {
      "question": "What is the noun form derived from the verb 'decide'?",
      "options": [
        "decision",
        "decidement",
        "decisive",
        "decisiveness"
      ],
      "correctIndex": 0,
      "explanation": "'Decide' forms the abstract noun 'decision'."
    },
    {
      "question": "Which prefix indicates 'incorrectly' or 'wrongly'?",
      "options": [
        "mis-",
        "un-",
        "anti-",
        "re-"
      ],
      "correctIndex": 0,
      "explanation": "'Mis-' denotes wrongful action (e.g. mislead, miscalculate)."
    },
    {
      "question": "Form an adjective from the noun 'danger':",
      "options": [
        "dangerous",
        "dangerful",
        "dangeric",
        "dangerable"
      ],
      "correctIndex": 0,
      "explanation": "'Danger' takes the suffix '-ous' to create 'dangerous'."
    },
    {
      "question": "What does the suffix '-less' signify in words like 'careless'?",
      "options": [
        "Without / lacking",
        "Full of",
        "Able to be",
        "Causing"
      ],
      "correctIndex": 0,
      "explanation": "'-less' indicates the absence or lack of a quality."
    },
    {
      "question": "Which prefix is correctly attached to 'responsible' to create its antonym?",
      "options": [
        "ir-",
        "un-",
        "in-",
        "dis-"
      ],
      "correctIndex": 0,
      "explanation": "Words starting with 'r' typically take the assimilative prefix 'ir-' ('irresponsible')."
    },
    {
      "question": "Identify the process where 'google' became a verb without spelling change:",
      "options": [
        "Conversion (zero derivation)",
        "Compounding",
        "Acronym",
        "Clipping"
      ],
      "correctIndex": 0,
      "explanation": "Conversion occurs when a word shifts grammatical class without morphological alteration."
    },
    {
      "question": "What is the noun form of the adjective 'patient'?",
      "options": [
        "patience",
        "patientness",
        "patienthood",
        "patientity"
      ],
      "correctIndex": 0,
      "explanation": "'Patient' becomes the abstract noun 'patience'."
    },
    {
      "question": "Which suffix converts the adjective 'simple' into a verb?",
      "options": [
        "-ify (simplify)",
        "-ise (simplise)",
        "-en (simplen)",
        "-ate (simplate)"
      ],
      "correctIndex": 0,
      "explanation": "The suffix '-ify' creates verbs of making/causing ('simplify')."
    }
  ]
},
  {
  "id": "sentence-structure",
  "categoryId": "syntax",
  "subgroup": "Sentence Structure & Syntax",
  "title": "Sentence Structure: Simple, Compound & Complex",
  "summary": "Mastering clause architecture: independent and dependent clauses, coordinating conjunctions (FANBOYS), subordinators, and complex syntax.",
  "rules": [
    {
      "title": "Simple Sentences",
      "details": "Contains a single independent clause with a subject and a predicate ('The train arrived promptly at ten')."
    },
    {
      "title": "Compound Sentences",
      "details": "Joins two independent clauses with a coordinating conjunction (For, And, Nor, But, Or, Yet, So) and a comma ('She loves London, but she enjoys the quiet countryside')."
    },
    {
      "title": "Complex Sentences",
      "details": "Contains an independent clause and one or more dependent (subordinate) clauses introduced by words like although, because, since, while, if ('Although it was raining, they visited Kew Gardens')."
    }
  ],
  "keywords": [
    "sentence structure",
    "simple",
    "compound",
    "complex",
    "clauses",
    "coordinating",
    "subordinating",
    "FANBOYS"
  ],
  "examples": [
    "Simple: The River Thames flows through Central London.",
    "Compound: Oliver brewed a pot of tea, and Charlotte toasted the crumpets.",
    "Complex: Because the flight was delayed, we waited at Heathrow for three hours.",
    "Compound-Complex: Although it was chilly, we walked along the South Bank, and we watched the street performers."
  ],
  "practice": [
    {
      "question": "Classify this sentence: 'Although the weather was dreary, we thoroughly enjoyed our visit to Windsor Castle.'",
      "options": [
        "Complex sentence",
        "Compound sentence",
        "Simple sentence",
        "Fragment"
      ],
      "correctIndex": 0,
      "explanation": "Introduced by the subordinating conjunction 'Although', this contains a dependent and an independent clause."
    },
    {
      "question": "Which acronym represents the 7 coordinating conjunctions?",
      "options": [
        "FANBOYS",
        "PEMDAS",
        "ROYGBIV",
        "SWIMMERS"
      ],
      "correctIndex": 0,
      "explanation": "FANBOYS stands for For, And, Nor, But, Or, Yet, So."
    },
    {
      "question": "Identify the compound sentence:",
      "options": [
        "I wanted to buy a vintage watch, so I visited Portobello Road Market.",
        "I visited Portobello Road Market to buy a vintage watch.",
        "When I visited Portobello Road Market, I bought a watch.",
        "Buying a vintage watch in London is exciting."
      ],
      "correctIndex": 0,
      "explanation": "Two independent clauses linked by comma + 'so' form a compound sentence."
    },
    {
      "question": "What is an independent clause?",
      "options": [
        "A clause that expresses a complete thought and can stand alone as a sentence.",
        "A clause that must be connected to another clause to make sense.",
        "A clause without a subject or verb.",
        "A prepositional phrase."
      ],
      "correctIndex": 0,
      "explanation": "An independent clause has both subject and verb and expresses a complete standalone thought."
    },
    {
      "question": "Choose the subordinating conjunction:",
      "options": [
        "whereas",
        "and",
        "but",
        "so"
      ],
      "correctIndex": 0,
      "explanation": "'Whereas' introduces a dependent subordinate clause of contrast."
    },
    {
      "question": "What punctuation error occurs when two independent clauses are joined only by a comma?",
      "options": [
        "Comma splice",
        "Dangling modifier",
        "Split infinitive",
        "Sentence fragment"
      ],
      "correctIndex": 0,
      "explanation": "Joining two main clauses with only a comma without a conjunction is a 'comma splice'."
    },
    {
      "question": "Which of the following is a simple sentence with a compound subject?",
      "options": [
        "James and Eleanor visited the National Gallery.",
        "James visited the gallery, and Eleanor went shopping.",
        "When James and Eleanor arrived, they visited the gallery.",
        "James visited the gallery while Eleanor stayed outside."
      ],
      "correctIndex": 0,
      "explanation": "'James and Eleanor' is a compound subject performing one main verb 'visited'."
    },
    {
      "question": "Select the correct punctuation for a dependent clause preceding an independent clause:",
      "options": [
        "Since you are already in London, you should visit the British Museum.",
        "Since you are already in London you should visit the British Museum.",
        "Since you are already in London; you should visit the British Museum.",
        "Since you are already in London - you should visit the British Museum."
      ],
      "correctIndex": 0,
      "explanation": "When a dependent clause comes first, it should be followed by a comma."
    }
  ]
}
];


/**
 * 25 Core Grammar Learning Checklist Topics (in recommended order)
 */
export const GRAMMAR_CHECKLIST = [
  {
    num: 1,
    title: "Parts of Speech",
    desc: "Nouns, verbs, adjectives, adverbs, pronouns, prepositions, conjunctions, determiners, interjections",
    topicId: "parts-of-speech-overview",
    example: "The stationmaster promptly blew his silver whistle at Paddington Station."
  },
  {
    num: 2,
    title: "Nouns",
    desc: "Common, proper, countable, uncountable, singular and plural nouns",
    topicId: "nouns-plural",
    example: "London boasts historic palaces, tranquil royal parks, and bustling markets."
  },
  {
    num: 3,
    title: "Verbs",
    desc: "Action verbs, state verbs, regular and irregular verbs",
    topicId: "stative-verbs",
    example: "The classic steam locomotive chugged gracefully across the Highland viaduct."
  },
  {
    num: 4,
    title: "Adjectives",
    desc: "Describing words, adjective order, comparative and superlative adjectives",
    topicId: "adjectives-adverbs",
    example: "It was a delightfully brisk and foggy November morning in Edinburgh."
  },
  {
    num: 5,
    title: "Adverbs",
    desc: "Adverbs of manner, time, place, frequency and degree",
    topicId: "adverbs-types",
    example: "He thoroughly enjoyed a traditional Sunday roast with Yorkshire pudding."
  },
  {
    num: 6,
    title: "Pronouns",
    desc: "Personal, possessive, reflexive, relative and demonstrative pronouns",
    topicId: "pronouns",
    example: "Everyone took their seats before the curtain rose at the Royal National Theatre."
  },
  {
    num: 7,
    title: "Determiners",
    desc: "A, an, the, this, that, some, any, much, many, few, little",
    topicId: "determiners-quantifiers",
    example: "Several vintage red telephone kiosks remain preserved throughout the village."
  },
  {
    num: 8,
    title: "Prepositions",
    desc: "In, on, at, by, for, from, to, with, about",
    topicId: "prepositions",
    example: "We arranged to meet outside the British Museum between noon and one o'clock."
  },
  {
    num: 9,
    title: "Conjunctions",
    desc: "And, but, or, because, although, while",
    topicId: "conjunctions-types",
    example: "We fancied a stroll along the South Bank, although a light drizzle had begun."
  },
  {
    num: 10,
    title: "Articles",
    desc: "A, an and the",
    topicId: "articles-quantifiers",
    example: "An exquisite Victorian pocket watch was presented to the university chancellor."
  },
  {
    num: 11,
    title: "Verb Tenses",
    desc: "Present simple, present continuous, past simple, past continuous, present perfect, future forms",
    topicId: "present-simple",
    example: "The morning express departs from Kings Cross for Edinburgh every half hour."
  },
  {
    num: 12,
    title: "Auxiliary Verbs",
    desc: "Be, do and have",
    topicId: "auxiliary-verbs",
    example: "Have you ever tasted warm homemade scones served with Cornish clotted cream?"
  },
  {
    num: 13,
    title: "Modal Verbs",
    desc: "Can, could, may, might, must, should, would",
    topicId: "modals",
    example: "Passengers must mind the gap when boarding the London Underground train."
  },
  {
    num: 14,
    title: "Questions",
    desc: "Question words, word order, auxiliary verbs and question tags",
    topicId: "negation-questions",
    example: "Could you kindly advise which platform the train to Cambridge departs from?"
  },
  {
    num: 15,
    title: "Negatives",
    desc: "Don't, doesn't, didn't, isn't, aren't, can't, won't",
    topicId: "negatives-system",
    example: "He hasn't yet visited the Crown Jewels housed within the Tower of London."
  },
  {
    num: 16,
    title: "Subject and Object",
    desc: "Who performs the action and who receives it",
    topicId: "syntax-svo",
    example: "The royal guard diligently inspected the ornate iron palace gates."
  },
  {
    num: 17,
    title: "Gerunds and Infinitives",
    desc: "Doing, to do, enjoy doing, want to do",
    topicId: "gerunds-infinitives",
    example: "We fancy exploring Windsor Castle, but we intend to travel by coach."
  },
  {
    num: 18,
    title: "Passive Voice",
    desc: "The cake was made; the letter was sent",
    topicId: "passive-voice",
    example: "The Magna Carta was solemnly signed in Runnymede in the summer of 1215."
  },
  {
    num: 19,
    title: "Conditionals",
    desc: "If sentences: zero, first, second and third conditionals",
    topicId: "conditionals",
    example: "If you visit the Lake District, you will be enchanted by its poetic beauty."
  },
  {
    num: 20,
    title: "Reported Speech",
    desc: "She said that she was tired",
    topicId: "reported-speech",
    example: "The conductor announced that the scheduled morning service had been delayed by fog."
  },
  {
    num: 21,
    title: "Relative Clauses",
    desc: "Who, which, that, whose, where",
    topicId: "relative-clauses",
    example: "The Oxford scholar who penned this historical monograph gave a riveting lecture."
  },
  {
    num: 22,
    title: "Comparisons",
    desc: "As...as, more than, less than, the most",
    topicId: "comparisons",
    example: "The Cotswolds are considerably more picturesque than typical suburban towns."
  },
  {
    num: 23,
    title: "Phrasal Verbs",
    desc: "Give up, find out, look after, get along",
    topicId: "phrasal-verbs",
    example: "Please mind the gap, watch your step, and carry on towards the Piccadilly line."
  },
  {
    num: 24,
    title: "Word Formation",
    desc: "Prefixes, suffixes, nouns from verbs, adjectives from nouns",
    topicId: "word-formation",
    example: "His exceptional punctuality and kindness earned the respect of the entire department."
  },
  {
    num: 25,
    title: "Sentence Structure",
    desc: "Simple, compound and complex sentences",
    topicId: "sentence-structure",
    example: "Although the British weather proved rather dreary, our spirits remained high."
  }
];

export const WHERE_TO_START_GUIDE = {
  title: "Where should you start?",
  intro: "I'd recommend starting with Parts of Speech, because understanding the role of each word makes the rest of English grammar much easier.",
  examples: [
    { part: "Noun", sentence: "The historic clock tower of Big Ben overlooks the River Thames.", highlight: "Big Ben", role: "Names a person, place, thing, or concept." },
    { part: "Verb", sentence: "We strolled leisurely across Hyde Park in the crisp autumn sunshine.", highlight: "strolled", role: "Expresses an action, occurrence, or state of existence." },
    { part: "Adjective", sentence: "A splendid cup of freshly brewed Earl Grey tea was served.", highlight: "splendid", role: "Modifies or qualifies a noun, providing descriptive detail." },
    { part: "Adverb", sentence: "She spoke cheerfully to the bus conductor aboard the double-decker.", highlight: "cheerfully", role: "Modifies a verb, adjective, or clause describing manner, time, or degree." },
    { part: "Pronoun", sentence: "They queued politely outside the Royal Opera House in Covent Garden.", highlight: "They", role: "Takes the place of a noun to avoid needless repetition." },
    { part: "Preposition", sentence: "The express train departs from Platform 9 at precisely quarter past three.", highlight: "from", role: "Links nouns or pronouns to other words indicating time, place, or direction." },
    { part: "Conjunction", sentence: "We fancied seeing a West End musical, but the tickets were fully booked.", highlight: "but", role: "Connects independent clauses, sentences, or coordinated terms." },
    { part: "Determiner", sentence: "Every commuter tapped their Oyster card at the underground barrier.", highlight: "Every", role: "Precedes a noun to introduce, quantify, or clarify reference." },
    { part: "Interjection", sentence: "Blimey! That torrential London downpour arrived out of nowhere.", highlight: "Blimey", role: "An abrupt exclamation expressing sudden emotion or surprise." },
    { part: "Modal Verb", sentence: "You ought to bring a sturdy brolly when venturing out in Manchester.", highlight: "ought to", role: "Expresses advice, necessity, obligation, or possibility." }
  ],
  conclusion: "Once you understand these categories, you can move on to tenses, sentence structure and more advanced grammar."
};
