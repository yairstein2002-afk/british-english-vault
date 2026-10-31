/**
 * British English Vault - Learn & Practice Module Data Structure (100% English)
 * 14 Core Language Learning Pillars, Methods, Rules, UK Examples & Interactive Practice Quizzes.
 */

export const LEARN_CATEGORIES = [
  {
    "id": "vocabulary",
    "titleEng": "Vocabulary & Retention",
    "icon": "fa-layer-group",
    "emoji": "🗂️",
    "desc": "Spaced repetition flashcards, lexical notebooks, and active recall techniques."
  },
  {
    "id": "comprehension",
    "titleEng": "Comprehension & Ear Training",
    "icon": "fa-headphones",
    "emoji": "🎧",
    "desc": "Extensive daily reading, authentic listening, shadowing cadence, and dictation."
  },
  {
    "id": "production",
    "titleEng": "Active Production",
    "icon": "fa-comments",
    "emoji": "🗣️",
    "desc": "Spontaneous conversational speaking drills and structured British English writing."
  },
  {
    "id": "assessment",
    "titleEng": "Accuracy & Testing",
    "icon": "fa-list-check",
    "emoji": "📊",
    "desc": "Targeted grammar drills, interactive vocabulary quizzes, and systematic error tracking."
  },
  {
    "id": "immersion",
    "titleEng": "Entertainment & Immersion",
    "icon": "fa-film",
    "emoji": "🎬",
    "desc": "Real-world British English through cinema, authentic podcasts, and language games."
  }
];

export const LEARN_TOPICS = [
  // 1. Flashcards
  {
    "id": "flashcards",
    "categoryId": "vocabulary",
    "subgroup": "Vocabulary & Retention",
    "title": "Flashcards",
    "summary": "Harness the power of digital and physical spaced-repetition flashcards to transfer British vocabulary and collocations into permanent long-term memory.",
    "rules": [
      {
        "title": "Spaced Repetition System (SRS)",
        "details": "Review cards at expanding time intervals (1 day, 3 days, 1 week, 2 weeks) to interrupt the forgetting curve precisely before memory fades."
      },
      {
        "title": "Sentence-Based Context",
        "details": "Never store isolated words on a card. Always include a complete, natural British English context sentence showcasing prepositions and word partners."
      },
      {
        "title": "Active Recall Over Recognition",
        "details": "Force your brain to actively retrieve the target word or phrase from meaning before flipping the card over to verify."
      }
    ],
    "keywords": [
      "spaced repetition",
      "active recall",
      "Anki",
      "retrieval practice",
      "context clues",
      "collocations",
      "long-term memory"
    ],
    "examples": [
      "Reviewing my digital flashcards on the morning tube journey keeps new British idioms fresh in my memory.",
      "By adding authentic audio pronunciations to my flashcards, I mastered subtle British vowel distinctions.",
      "Each flashcard contains a complete sentence, the UK definition, and common dependent prepositions."
    ],
    "practice": [
      {
        "question": "What is the most effective approach when creating English flashcards?",
        "options": [
          "Write single words with dictionary definitions only",
          "Include a full context sentence featuring the target term and collocations",
          "Memorize 150 new cards in a single sitting",
          "Review cards only once a month"
        ],
        "correctIndex": 1,
        "explanation": "Context sentences provide essential grammatical meaning, tone register, and associated dependent prepositions."
      },
      {
        "question": "How does Spaced Repetition (SRS) improve long-term vocabulary retention?",
        "options": [
          "It prompts reviews right before memory traces fade, strengthening neural connections",
          "It eliminates the need to review words altogether",
          "It tests spelling without requiring definitions",
          "It only functions with grammar rules rather than vocabulary"
        ],
        "correctIndex": 0,
        "explanation": "Reviewing at expanding intervals right at the verge of forgetting cements knowledge permanently in memory."
      }
    ]
  },

  // 2. Vocabulary Notebooks
  {
    "id": "vocabulary-notebooks",
    "categoryId": "vocabulary",
    "subgroup": "Vocabulary & Retention",
    "title": "Vocabulary Notebooks",
    "summary": "Build a personalized lexical repository categorizing authentic British terms, synonyms, collocations, dependent prepositions, and self-written sentences.",
    "rules": [
      {
        "title": "Thematic Categorization",
        "details": "Organize vocabulary by thematic clusters (workplace negotiations, travel, polite debates, culinary arts) rather than alphabetical order."
      },
      {
        "title": "Collocation Columns",
        "details": "Record words with their fixed natural partners (e.g., 'make a decision', 'bear in mind', 'take into consideration') to sound genuinely native."
      },
      {
        "title": "Personal Connection Sentences",
        "details": "Draft personal sentences describing your own routines, reflections, or goals using the newly acquired British phrasing."
      }
    ],
    "keywords": [
      "lexical chunks",
      "word partnerships",
      "dependent prepositions",
      "thematic logging",
      "synonyms",
      "register",
      "antonyms"
    ],
    "examples": [
      "I maintain a dedicated notebook section for British workplace idioms like 'touch base' and 'across the board'.",
      "Writing down dependent prepositions alongside verbs prevents common grammatical slips.",
      "My vocabulary journal includes antonyms, formal registers, and colloquial equivalents for every entry."
    ],
    "practice": [
      {
        "question": "Why is thematic grouping superior to alphabetical ordering in a vocabulary notebook?",
        "options": [
          "It mirrors how the brain connects related concepts, accelerating spontaneous conversational retrieval",
          "It saves physical pages in a notebook",
          "It makes spelling easier to check in a dictionary",
          "It is mandatory for British university examinations"
        ],
        "correctIndex": 0,
        "explanation": "Thematic networks mimic the brain's semantic webs, facilitating immediate access during spontaneous speech."
      },
      {
        "question": "What should always accompany a new verb in your vocabulary notebook?",
        "options": [
          "Its dependent prepositions and natural collocations",
          "Its translation into five languages",
          "Only its infinitive form",
          "The date you learned it"
        ],
        "correctIndex": 0,
        "explanation": "Noting dependent prepositions (e.g. 'arrive at' vs 'arrive in') prevents the most common usage mistakes."
      }
    ]
  },

  // 3. Daily Reading
  {
    "id": "daily-reading",
    "categoryId": "comprehension",
    "subgroup": "Comprehension & Ear Training",
    "title": "Daily Reading",
    "summary": "Immerse your mind in authentic British journalism, essays, literature, and analytical commentary for 15-20 minutes daily to absorb natural syntax and phrasing.",
    "rules": [
      {
        "title": "The 95% Rule (Comprehensible Input)",
        "details": "Select reading material where you comfortably understand 90-95% of the words, allowing you to deduce unfamiliar terms effortlessly from context."
      },
      {
        "title": "Extensive vs. Intensive Reading",
        "details": "Read extensive articles for general flow without stopping; choose one short paragraph daily for intensive sentence-by-sentence analysis."
      },
      {
        "title": "Reputable British Sources",
        "details": "Rotate between quality publications like BBC News, The Guardian, The Economist, and contemporary British fiction."
      }
    ],
    "keywords": [
      "extensive reading",
      "comprehensible input",
      "contextual deduction",
      "reading flow",
      "BBC News",
      "editorial prose",
      "literary cadence"
    ],
    "examples": [
      "Reading an editorial from The Times each morning expands my academic vocabulary and analytical reasoning.",
      "I highlight unfamiliar idioms in novel chapters and deduce their nuance before checking a dictionary.",
      "Ten minutes of concentrated reading per day delivers thousands of natural grammar encounters each month."
    ],
    "practice": [
      {
        "question": "What does the '95% rule' in language reading recommend?",
        "options": [
          "Reading 95 pages every week",
          "Selecting material where you understand ~95% of words to enable contextual deduction",
          "Memorizing 95% of every vocabulary list",
          "Reading at 95 words per minute"
        ],
        "correctIndex": 1,
        "explanation": "When 90-95% of words are known, the text remains enjoyable and you deduce new words naturally without frustration."
      },
      {
        "question": "What is the primary benefit of 'extensive reading'?",
        "options": [
          "Analyzing every single grammatical rule",
          "Building reading speed, intuition for natural word patterns, and effortless language immersion",
          "Looking up every unknown word in a dictionary",
          "Memorizing entire paragraphs by heart"
        ],
        "correctIndex": 1,
        "explanation": "Extensive reading develops automatic processing, subconscious grammar acquisition, and reading stamina."
      }
    ]
  },

  // 4. Daily Listening
  {
    "id": "daily-listening",
    "categoryId": "comprehension",
    "subgroup": "Comprehension & Ear Training",
    "title": "Daily Listening",
    "summary": "Train your ear to natural British cadence, connected speech, elision, and intonation curves through consistent daily immersion in spoken audio.",
    "rules": [
      {
        "title": "Connected Speech Awareness",
        "details": "Observe how native British speakers link consonant to vowel ('pick it up' sounds like 'pi-ki-tup') and drop unstressed sounds."
      },
      {
        "title": "Weak Forms & The Schwa",
        "details": "Notice how function words like 'to', 'for', 'of', and 'at' reduce to the unstressed neutral schwa sound /ə/ in rapid conversation."
      },
      {
        "title": "Accent Diversity",
        "details": "Expose your ears to Received Pronunciation (RP), Estuary English, Scottish, northern dialects, and diverse regional varieties."
      }
    ],
    "keywords": [
      "connected speech",
      "elision",
      "weak forms",
      "RP accent",
      "BBC Radio 4",
      "intonation patterns",
      "ear calibration"
    ],
    "examples": [
      "Listening to BBC Radio 4 during my morning tea attuned my ears to natural British intonation curves.",
      "I focus on how small words like 'to' and 'for' reduce into weak forms /tə/ and /fə/ in rapid speech.",
      "Active listening with the transcript open helps clarify dropped consonants and rapid colloquial speech."
    ],
    "practice": [
      {
        "question": "What happens to weak forms (e.g. 'to', 'at', 'of') in connected British speech?",
        "options": [
          "They are stressed loudly",
          "Their vowels reduce to the neutral schwa sound /ə/",
          "They are omitted completely in formal English",
          "They double in length"
        ],
        "correctIndex": 1,
        "explanation": "In standard British English, unstressed grammatical function words naturally reduce to weak forms featuring the schwa /ə/."
      },
      {
        "question": "Why is listening to regional British accents beneficial?",
        "options": [
          "It prepares you for real-world communication with native speakers across the UK",
          "Regional accents are grammatically incorrect",
          "It is only useful for actors",
          "It replaces the need to learn vocabulary"
        ],
        "correctIndex": 0,
        "explanation": "Real-world British English encompasses rich regional variations; exposure prevents auditory shock during travel or work."
      }
    ]
  },

  // 5. Shadowing
  {
    "id": "shadowing",
    "categoryId": "comprehension",
    "subgroup": "Comprehension & Ear Training",
    "title": "Shadowing",
    "summary": "Speak simultaneously alongside a native British speaker, mimicking pitch, rhythm, stress, and pronunciation in real time.",
    "rules": [
      {
        "title": "Micro-Delay Execution",
        "details": "Repeat the words a split-second (about 0.2 seconds) behind the speaker, matching their exact vocal inflection and breathing pauses."
      },
      {
        "title": "Focus on Prosody & Music",
        "details": "Prioritize sentence musicality, rises and falls in pitch, and vowel length rather than isolated individual consonants."
      },
      {
        "title": "Short, Intense Repetitions",
        "details": "Select 60-90 second audio segments from documentaries, speeches, or audiobooks and repeat them until delivery feels completely automatic."
      }
    ],
    "keywords": [
      "speech shadowing",
      "prosody",
      "rhythm mimicry",
      "intonation mirroring",
      "neuromuscular training",
      "accent tuning"
    ],
    "examples": [
      "Shadowing Sir David Attenborough's nature documentaries dramatically refined my pauses and pacing.",
      "By mirroring native audio at normal speed, my tongue muscles adapted to complex British consonant clusters.",
      "Just five minutes of intense shadowing before a meeting warms up your vocal cadence and confidence."
    ],
    "practice": [
      {
        "question": "What is the primary objective of the language shadowing technique?",
        "options": [
          "Translating audio in your head into another language",
          "Imitating native pronunciation, cadence, and rhythm in real time",
          "Writing down every word heard as quickly as possible",
          "Reading subtitles silently without vocalizing"
        ],
        "correctIndex": 1,
        "explanation": "Shadowing trains the vocal articulators and auditory cortex to reproduce natural speech melody and tempo."
      },
      {
        "question": "What type of audio material is ideal for effective shadowing practice?",
        "options": [
          "Short 1-2 minute clips of clear, natural speech from documentaries or quality podcasts",
          "Long 3-hour lectures with heavy background noise",
          "Songs with heavily distorted vocals",
          "Silent movies with subtitles"
        ],
        "correctIndex": 0,
        "explanation": "Short, crystal-clear clips allow repeated focused practice until vocal synchronization is achieved."
      }
    ]
  },

  // 6. Dictation
  {
    "id": "dictation",
    "categoryId": "comprehension",
    "subgroup": "Comprehension & Ear Training",
    "title": "Dictation",
    "summary": "Listen to short audio passages and transcribe every single word accurately, sharpening orthography, acoustic discrimination, and punctuation.",
    "rules": [
      {
        "title": "The Three-Pass Method",
        "details": "1st pass: Listen without writing for overall meaning. 2nd pass: Pause sentence by sentence to transcribe. 3rd pass: Listen continuously to proofread."
      },
      {
        "title": "Identify Acoustic Blindspots",
        "details": "Compare your transcript letter-by-letter against the original to discover which words, contractions, or prepositions your ears missed."
      },
      {
        "title": "British Spelling Precision",
        "details": "Use dictation to enforce standard British orthography (e.g., 'colour', 'organise', 'theatre', 'travelled', 'practise')."
      }
    ],
    "keywords": [
      "transcription",
      "spelling precision",
      "acoustic discrimination",
      "orthography",
      "punctuation accuracy",
      "three-pass listening"
    ],
    "examples": [
      "Transcribing short BBC clips revealed words I thought I recognized but misheard due to connected speech.",
      "Dictation exercises bridge the gap between spoken sounds and standard British orthography.",
      "Comparing my handwritten transcription against the official transcript immediately pinpoints listening blindspots."
    ],
    "practice": [
      {
        "question": "What is the recommended multi-pass approach for effective dictation?",
        "options": [
          "Write blindly on the first pass without listening",
          "Listen once for meaning, second with pauses to transcribe, third to proofread",
          "Only write down words you already know and omit others",
          "Listen at 2x speed with subtitles"
        ],
        "correctIndex": 1,
        "explanation": "The three-pass method ensures comprehension precedes transcription and is followed by rigorous proofreading."
      },
      {
        "question": "Why is dictation particularly valuable for British English learners?",
        "options": [
          "It exposes the discrepancy between complex British pronunciation and non-phonetic spelling",
          "It eliminates the need to speak",
          "It only teaches handwriting",
          "It is the only way to learn vocabulary"
        ],
        "correctIndex": 0,
        "explanation": "English has many silent letters and homophones; dictation forces you to link sounds directly to correct spelling."
      }
    ]
  },

  // 7. Speaking Practice
  {
    "id": "speaking-practice",
    "categoryId": "production",
    "subgroup": "Active Production",
    "title": "Speaking Practice",
    "summary": "Transform passive vocabulary into effortless active speech through structured monologue prompts, dialogue simulation, and vocal self-recording.",
    "rules": [
      {
        "title": "Formulate Directly in English",
        "details": "Discipline your mind to bypass translation. Construct ideas directly using simple, well-practiced English sentence frames."
      },
      {
        "title": "Voice Memo Journaling",
        "details": "Record 60 to 90 seconds answering an engaging prompt daily. Listen back objectively to identify hesitation patterns and pacing."
      },
      {
        "title": "Authentic British Discourse Markers",
        "details": "Enrich spoken fluency using natural connectors such as 'Well, to be fair', 'As a matter of fact', 'Actually', and 'Mind you'."
      }
    ],
    "keywords": [
      "active fluency",
      "conversational fillers",
      "vocal recording",
      "spontaneous speech",
      "monologue drills",
      "discourse markers"
    ],
    "examples": [
      "Practicing 2-minute spontaneous speeches on random topics builds conversational agility under pressure.",
      "Recording daily voice notes allows me to track improvements in fluidity and grammatical precision over time.",
      "Using authentic British conversational markers like 'to be honest' and 'frankly' gives speech natural warmth."
    ],
    "practice": [
      {
        "question": "Why is recording yourself speaking one of the fastest ways to build fluency?",
        "options": [
          "It lets you objectively hear your pacing, hesitations, and pronunciation flaws",
          "It eliminates all grammar requirements",
          "It replaces the need for listening practice",
          "It guarantees immediate native fluency overnight"
        ],
        "correctIndex": 0,
        "explanation": "Self-recording provides objective feedback on cadence, pronunciation, and recurring hesitation traps."
      },
      {
        "question": "What is the role of British discourse markers like 'Well, to be fair' or 'Mind you'?",
        "options": [
          "They buy thinking time, soften statements, and signal natural conversational tone",
          "They indicate that you are ending the conversation",
          "They are considered grammatically incorrect in the UK",
          "They are only used in academic textbooks"
        ],
        "correctIndex": 0,
        "explanation": "Discourse markers give spoken English natural rhythm, politeness, and conversational flow."
      }
    ]
  },

  // 8. Writing Practice
  {
    "id": "writing-practice",
    "categoryId": "production",
    "subgroup": "Active Production",
    "title": "Writing Practice",
    "summary": "Develop structured expression, nuanced British vocabulary, and grammatical coherence through daily journaling, reflections, and essay drafting.",
    "rules": [
      {
        "title": "Three-Part Paragraph Architecture",
        "details": "Anchor every paragraph with a clear Topic Sentence, substantiate with Evidence or Examples, and conclude with a Cohesive Wrap-up."
      },
      {
        "title": "Cohesive Transitional Linkers",
        "details": "Connect thoughts with varied linkers like 'nevertheless', 'furthermore', 'in contrast', and 'consequently' to avoid choppy sentences."
      },
      {
        "title": "Self-Proofreading Routine",
        "details": "Always read your text aloud before checking. Your ear will frequently catch awkward phrasing that your eye overlooks."
      }
    ],
    "keywords": [
      "journaling",
      "cohesion",
      "transitional linkers",
      "paragraph mastery",
      "active drafting",
      "British spelling",
      "self-editing"
    ],
    "examples": [
      "Writing a 5-sentence personal reflection each evening solidifies the words learned throughout the day.",
      "Employing cohesive linkers like 'nevertheless' and 'in addition' elevated my written clarity and structure.",
      "Daily writing forces deliberate grammatical choices that passive reading alone cannot instill."
    ],
    "practice": [
      {
        "question": "What is the hallmark of a well-crafted English paragraph?",
        "options": [
          "A single sentence spanning 100 words",
          "A clear topic sentence followed by supporting details and a cohesive wrap-up",
          "Avoiding all punctuation marks",
          "Using only past tense verbs exclusively"
        ],
        "correctIndex": 1,
        "explanation": "Standard academic and professional paragraphs are built on a topic statement, elaboration, and cohesive conclusion."
      },
      {
        "question": "Why is reading your written draft aloud recommended?",
        "options": [
          "It activates auditory feedback, helping you spot awkward rhythm and missing words",
          "It replaces the need to spell correctly",
          "It makes your writing longer automatically",
          "It is required by British grammar publishers"
        ],
        "correctIndex": 0,
        "explanation": "Reading aloud engages auditory processing, catching clumsy phrasing and grammatical missteps easily."
      }
    ]
  },

  // 9. Grammar Exercises
  {
    "id": "grammar-exercises",
    "categoryId": "assessment",
    "subgroup": "Accuracy & Testing",
    "title": "Grammar Exercises",
    "summary": "Sharpen sentence accuracy, tense consistency, and structural mechanics through targeted, contextual grammar exercises and diagnostic drills.",
    "rules": [
      {
        "title": "Articulate the Underlying Rule",
        "details": "Never guess based on vague feeling alone. Formulate the exact grammatical rule (e.g. 'doesn't + base verb', 'enjoy + gerund') for every choice."
      },
      {
        "title": "Targeted Weakness Focus",
        "details": "Dedicate the majority of drill time to areas that trigger recurring errors (articles, dependent prepositions, mixed conditionals)."
      },
      {
        "title": "Transformation & Inversion Drills",
        "details": "Practice rewriting sentences into passive voice, reported speech, or negative inversion to gain complete syntactic mastery."
      }
    ],
    "keywords": [
      "syntax drills",
      "tense consistency",
      "subject-verb agreement",
      "prepositional rules",
      "error elimination",
      "deliberate practice"
    ],
    "examples": [
      "Targeted preposition exercises helped me master difficult combinations like 'listen to' and 'arrive at'.",
      "Practicing conditional transformations solidified my understanding of hypothetical British speech.",
      "Understanding the grammatical logic behind each answer turns mistakes into lasting learning breakthroughs."
    ],
    "practice": [
      {
        "question": "What is the most effective way to approach grammar exercises?",
        "options": [
          "Guessing quickly to finish as fast as possible",
          "Articulating the specific grammatical rule behind your choice",
          "Only practicing topics you already find easy",
          "Memorizing question numbers rather than content"
        ],
        "correctIndex": 1,
        "explanation": "Explaining the rationale for an answer ensures deep structural understanding rather than surface-level intuition."
      },
      {
        "question": "How do sentence transformation exercises build advanced fluency?",
        "options": [
          "They teach you to express the same core idea using multiple syntactic structures",
          "They prove that grammar rules do not matter",
          "They eliminate the need for vocabulary study",
          "They only test punctuation marks"
        ],
        "correctIndex": 0,
        "explanation": "Transformations (e.g. active to passive, direct to reported) give you versatile stylistic flexibility."
      }
    ]
  },

  // 10. Vocabulary Quizzes
  {
    "id": "vocabulary-quizzes",
    "categoryId": "assessment",
    "subgroup": "Accuracy & Testing",
    "title": "Vocabulary Quizzes",
    "summary": "Test active retrieval, synonym recognition, collocations, and contextual nuance through timed interactive vocabulary quizzes.",
    "rules": [
      {
        "title": "Contextual Nuance Discrimination",
        "details": "Distinguish between subtle synonyms (e.g. 'adequate' vs 'splendid' vs 'superb') based on formality, emotion, and context."
      },
      {
        "title": "Timed Recall Pressure",
        "details": "Incorporate timed quizzes to train quick lexical retrieval, eliminating long pauses during live conversations."
      },
      {
        "title": "Immediate Feedback Loop",
        "details": "Analyze missed quiz items immediately and feed them directly into your flashcards or vocabulary notebook for review."
      }
    ],
    "keywords": [
      "synonym discrimination",
      "lexical testing",
      "timed challenges",
      "active recall",
      "multiple-choice mastery",
      "connotation"
    ],
    "examples": [
      "Daily 5-minute vocabulary quizzes expose gaps in my active recall and test subtle synonym nuances.",
      "Testing collocations like 'heavy rain' versus 'strong wind' trains natural British phrase pairing.",
      "Reviewing incorrect quiz items creates high-priority candidates for my spaced repetition flashcards."
    ],
    "practice": [
      {
        "question": "How should you treat words you miss during a vocabulary quiz?",
        "options": [
          "Ignore them and move on to new lists",
          "Immediately review the explanation and add them to your flashcard or notebook routine",
          "Only re-test them next year",
          "Delete the question from the quiz"
        ],
        "correctIndex": 1,
        "explanation": "Mistakes in quizzes highlight prime learning opportunities that must be integrated into active retention tools."
      },
      {
        "question": "Why is testing words in full context sentences more valuable than testing word-definition pairs?",
        "options": [
          "It tests whether you know the word's prepositions, tone, and grammatical partner words",
          "It takes less time to answer",
          "It prevents you from reading definitions",
          "It only tests grammar"
        ],
        "correctIndex": 0,
        "explanation": "Context reveals the correct grammatical behavior, collocations, and formality register of the term."
      }
    ]
  },

  // 11. Error Tracking
  {
    "id": "error-tracking",
    "categoryId": "assessment",
    "subgroup": "Accuracy & Testing",
    "title": "Error Tracking",
    "summary": "Maintain an analytical log of your recurring grammar, spelling, and pronunciation mistakes to systematically eradicate them.",
    "rules": [
      {
        "title": "Categorize by Error Pattern",
        "details": "Tag logged mistakes under specific headings (e.g., Subject-Verb Agreement, Article Omission, Tricky Spelling, Preposition Error)."
      },
      {
        "title": "The Rule & Examples Formula",
        "details": "Never just write the wrong word. Write the flawed sentence, the corrected version, the governing rule, and two original examples."
      },
      {
        "title": "Targeted Re-testing Cycles",
        "details": "Regularly challenge yourself specifically on previously logged mistakes until you achieve a 100% accuracy streak."
      }
    ],
    "keywords": [
      "error log",
      "habitual traps",
      "diagnostic review",
      "recurring patterns",
      "self-auditing",
      "accuracy streaks"
    ],
    "examples": [
      "Logging every missed third-person '-s' ended a habit of saying 'he go' instead of 'he goes'.",
      "My personal error tracker alerted me that 40% of my writing mistakes were related to dependent prepositions.",
      "Systematically reviewing my error journal transformed chronic weaknesses into confident strengths."
    ],
    "practice": [
      {
        "question": "What is the primary benefit of maintaining an Error Tracker?",
        "options": [
          "Punishing yourself for every mistake",
          "Identifying recurring personal blindspots so you can apply targeted practice",
          "Proving that English has no consistent rules",
          "Counting how many words you know"
        ],
        "correctIndex": 1,
        "explanation": "Tracking reveals persistent subconscious error patterns, enabling focused, efficient self-correction."
      },
      {
        "question": "What should you record alongside a flagged mistake in your error tracker?",
        "options": [
          "The corrected sentence, the grammatical rule, and two new model examples",
          "Only the wrong word in red ink",
          "A translation into your native language",
          "The time of day the mistake happened"
        ],
        "correctIndex": 0,
        "explanation": "Understanding the core rule and generating model examples rewrites flawed neural habits."
      }
    ]
  },

  // 12. Learning Through Movies
  {
    "id": "learning-through-movies",
    "categoryId": "immersion",
    "subgroup": "Entertainment & Immersion",
    "title": "Learning Through Movies",
    "summary": "Absorb British cultural nuances, regional accents, idiomatic expressions, and body language through UK cinema and television drama.",
    "rules": [
      {
        "title": "Smart Subtitle Progression",
        "details": "Begin with English subtitles to link sound with orthography, then re-watch favorite scenes with subtitles turned completely off."
      },
      {
        "title": "The 2-Minute Pause & Shadow Technique",
        "details": "Pause an engaging 2-minute dialogue, note down colloquial idioms, and vocalize the lines mimicking the actor's exact emotion and cadence."
      },
      {
        "title": "Diverse British Genres",
        "details": "Explore period dramas (The Crown, Downton Abbey) for formal elegance alongside sharp modern comedy and gritty British crime series."
      }
    ],
    "keywords": [
      "British cinema",
      "English subtitles",
      "cultural idioms",
      "intonation mimicry",
      "slang detection",
      "visual context"
    ],
    "examples": [
      "Watching British period dramas familiarised me with formal polite phrasing and sophisticated vocabulary.",
      "Pausing and repeating witty TV banter helped me absorb British conversational sarcasm and timing.",
      "English subtitles connect the spoken pronunciation of fast dialogue directly to written words."
    ],
    "practice": [
      {
        "question": "What is the recommended subtitle strategy for maximizing language gains from movies?",
        "options": [
          "Using native language subtitles permanently",
          "Watching with English subtitles first, then re-watching key scenes without subtitles",
          "Watching on mute with subtitles",
          "Never watching with subtitles even as a beginner"
        ],
        "correctIndex": 1,
        "explanation": "English subtitles connect sounds to spellings; removing them on a second pass forces genuine auditory comprehension."
      },
      {
        "question": "Why is watching British cinema particularly helpful for real-world fluency?",
        "options": [
          "It reveals body language, humor, cultural idioms, and realistic speech rhythms",
          "It replaces the need to study grammar",
          "It only teaches Shakespearean English",
          "It makes reading textbooks unnecessary"
        ],
        "correctIndex": 0,
        "explanation": "Film embeds language within rich cultural, visual, and social contexts that textbooks cannot replicate."
      }
    ]
  },

  // 13. Learning Through Podcasts
  {
    "id": "learning-through-podcasts",
    "categoryId": "immersion",
    "subgroup": "Entertainment & Immersion",
    "title": "Learning Through Podcasts",
    "summary": "Transform daily commutes and routine chores into productive listening immersion with authentic British podcasts across topics you genuinely love.",
    "rules": [
      {
        "title": "Interest-Driven Selection",
        "details": "Listen to content you would enjoy in your native language (history, science, comedy, football, literature) to sustain intrinsic motivation."
      },
      {
        "title": "Speed Calibration",
        "details": "Modulate playback speed: drop to 0.85x if a speaker is excessively fast, or accelerate to 1.1x to train agile processing."
      },
      {
        "title": "The 2-Minute Post-Listen Summary",
        "details": "Immediately after listening to an episode, speak or write a 2-minute summary of the core arguments in your own English words."
      }
    ],
    "keywords": [
      "podcast immersion",
      "BBC Sounds",
      "passive exposure",
      "speed adjustment",
      "topic passions",
      "comprehension summaries"
    ],
    "examples": [
      "Listening to British history podcasts on my daily commute added an hour of natural immersion every day.",
      "BBC podcasts provide a rich variety of natural discussions, interviews, and intellectual debates.",
      "Summarizing podcast episodes aloud right after listening trains spontaneous synthesis in English."
    ],
    "practice": [
      {
        "question": "Why are interest-driven podcasts exceptionally effective for language acquisition?",
        "options": [
          "Because genuine curiosity keeps your brain actively engaged and eager to decipher meaning",
          "Because they only use simple, basic vocabulary",
          "Because podcasts do not require audio equipment",
          "Because they always come with grammar tests"
        ],
        "correctIndex": 0,
        "explanation": "High intrinsic interest maintains focused attention, significantly boosting contextual vocabulary absorption."
      },
      {
        "question": "What is the benefit of summarizing a podcast episode in your own words immediately after listening?",
        "options": [
          "It converts passive auditory intake into active productive language skills",
          "It lets you delete the podcast episode",
          "It proves the podcast host was wrong",
          "It is required by podcast applications"
        ],
        "correctIndex": 0,
        "explanation": "Summarizing forces you to synthesize concepts and retrieve vocabulary, cementing active comprehension."
      }
    ]
  },

  // 14. Learning Through Games
  {
    "id": "learning-through-games",
    "categoryId": "immersion",
    "subgroup": "Entertainment & Immersion",
    "title": "Learning Through Games",
    "summary": "Activate vocabulary recall, quick thinking, and spelling precision in a fun, pressure-free gamified environment.",
    "rules": [
      {
        "title": "Word Puzzles & Crosswords",
        "details": "Solve British cryptic or quick crosswords, wordle variants, and anagram puzzles to reinforce letter patterns and subtle definitions."
      },
      {
        "title": "Story-Driven Video Games",
        "details": "Play narrative-rich video games featuring British voice acting and dialogue trees where choices depend on understanding nuances."
      },
      {
        "title": "Rapid Category Challenges",
        "details": "Challenge yourself to name 10 items belonging to a category (e.g., kitchen utensils, autumn words) within 30 seconds to bypass hesitation."
      }
    ],
    "keywords": [
      "gamification",
      "word puzzles",
      "interactive quests",
      "quick retrieval",
      "narrative games",
      "stress-free learning"
    ],
    "examples": [
      "Word association and anagram games accelerate my rapid retrieval of vocabulary under time pressure.",
      "Story-driven games provide interactive environments where choices require comprehending complex English text.",
      "Gamifying daily practice turns tedious memorization into an engaging, habit-forming challenge."
    ],
    "practice": [
      {
        "question": "How does gamified language practice enhance vocabulary recall?",
        "options": [
          "It increases engagement and dopamine, lowering anxiety and speeding up retrieval",
          "It removes the need to understand grammar rules",
          "It replaces reading books completely",
          "It only benefits young children"
        ],
        "correctIndex": 0,
        "explanation": "Play-based learning lowers the affective filter, boosting motivation and strengthening neural recall pathways."
      },
      {
        "question": "What skill do rapid category recall games (e.g. 10 words in 30 seconds) develop?",
        "options": [
          "Overcoming hesitation and retrieving vocabulary rapidly under mild pressure",
          "Improving handwriting speed",
          "Memorizing alphabetical lists",
          "Avoiding all difficult words"
        ],
        "correctIndex": 0,
        "explanation": "Timed category challenges train the brain to access lexical stores quickly, mirroring live conversational tempo."
      }
    ]
  }
];

export const GRAMMAR_CHECKLIST = [
  {
    num: 1,
    title: "Flashcards",
    desc: "Spaced repetition digital & physical cards for permanent lexical retention",
    topicId: "flashcards",
    example: "Reviewing my digital flashcards on the morning tube journey keeps new British idioms fresh in my memory."
  },
  {
    num: 2,
    title: "Vocabulary Notebooks",
    desc: "Personalized thematic notebooks recording collocations, prepositions & personal sentences",
    topicId: "vocabulary-notebooks",
    example: "I maintain a dedicated notebook section for British workplace idioms and dependent prepositions."
  },
  {
    num: 3,
    title: "Daily Reading",
    desc: "15-20 minutes of daily extensive British journalism, literature, and analytical essays",
    topicId: "daily-reading",
    example: "Reading an editorial from The Times each morning expands my academic vocabulary and analytical reasoning."
  },
  {
    num: 4,
    title: "Daily Listening",
    desc: "Consistent ear calibration with authentic BBC radio, connected speech, and diverse accents",
    topicId: "daily-listening",
    example: "Listening to BBC Radio 4 during my morning tea attuned my ears to natural British intonation curves."
  },
  {
    num: 5,
    title: "Shadowing",
    desc: "Real-time speech mimicry matching native British pacing, pitch, pauses, and cadence",
    topicId: "shadowing",
    example: "Shadowing Sir David Attenborough's nature documentaries dramatically refined my pauses and pacing."
  },
  {
    num: 6,
    title: "Dictation",
    desc: "Three-pass transcription of native British audio to eliminate spelling and acoustic blindspots",
    topicId: "dictation",
    example: "Transcribing short BBC clips revealed words I thought I recognized but misheard due to connected speech."
  },
  {
    num: 7,
    title: "Speaking Practice",
    desc: "Active fluency monologues, 60-second voice memos, and spontaneous conversational prompts",
    topicId: "speaking-practice",
    example: "Recording daily voice notes allows me to track improvements in fluidity and grammatical precision over time."
  },
  {
    num: 8,
    title: "Writing Practice",
    desc: "Structured paragraph crafting, cohesive discourse linkers, and active daily journaling",
    topicId: "writing-practice",
    example: "Writing a 5-sentence personal reflection each evening solidifies the words learned throughout the day."
  },
  {
    num: 9,
    title: "Grammar Exercises",
    desc: "Targeted syntax drills, conditional transformations, and rule-based diagnostic exercises",
    topicId: "grammar-exercises",
    example: "Targeted preposition exercises helped me master difficult combinations like 'listen to' and 'arrive at'."
  },
  {
    num: 10,
    title: "Vocabulary Quizzes",
    desc: "Contextual multiple-choice challenges, synonym discrimination, and rapid recall tests",
    topicId: "vocabulary-quizzes",
    example: "Daily 5-minute vocabulary quizzes expose gaps in my active recall and test subtle synonym nuances."
  },
  {
    num: 11,
    title: "Error Tracking",
    desc: "Systematic logging and recurring pattern analysis to eradicate habitual grammatical traps",
    topicId: "error-tracking",
    example: "My personal error tracker alerted me that 40% of my writing mistakes were related to dependent prepositions."
  },
  {
    num: 12,
    title: "Learning Through Movies",
    desc: "British TV dramas and cinema with smart subtitle progression to master colloquial cadence",
    topicId: "learning-through-movies",
    example: "Watching British period dramas familiarised me with formal polite phrasing and sophisticated vocabulary."
  },
  {
    num: 13,
    title: "Learning Through Podcasts",
    desc: "Interest-driven audio immersion with BBC Sounds, speed modulation, and oral summaries",
    topicId: "learning-through-podcasts",
    example: "Listening to British history podcasts on my daily commute added an hour of natural immersion every day."
  },
  {
    num: 14,
    title: "Learning Through Games",
    desc: "Crosswords, interactive word quests, and gamified speed challenges for stress-free mastery",
    topicId: "learning-through-games",
    example: "Word association and anagram games accelerate my rapid retrieval of vocabulary under time pressure."
  }
];

export const WHERE_TO_START_GUIDE = {
  title: "Where should you start?",
  intro: "We recommend starting with Vocabulary Notebooks & Flashcards to establish your core lexical base, followed by Daily Listening & Reading for steady immersion.",
  examples: [
    { part: "Flashcards", sentence: "Reviewing my digital flashcards on the morning tube journey keeps new British idioms fresh in my memory.", highlight: "flashcards", role: "Spaced repetition active recall to cement words into long-term memory." },
    { part: "Vocabulary Notebooks", sentence: "I maintain a dedicated notebook section for British workplace idioms and dependent prepositions.", highlight: "notebook", role: "Organized thematic logging of collocations, definitions, and personal sentences." },
    { part: "Daily Reading", sentence: "Reading an editorial from The Times each morning expands my academic vocabulary and analytical reasoning.", highlight: "Reading", role: "Extensive exposure to natural sentence structures, vocabulary, and flow." },
    { part: "Daily Listening", sentence: "Listening to BBC Radio 4 during my morning tea attuned my ears to natural British intonation curves.", highlight: "Listening", role: "Training auditory discrimination, connected speech, and accent recognition." },
    { part: "Shadowing", sentence: "Shadowing Sir David Attenborough's nature documentaries dramatically refined my pauses and pacing.", highlight: "Shadowing", role: "Neuromuscular vocal training to match native British rhythm and intonation." },
    { part: "Dictation", sentence: "Transcribing short BBC clips revealed words I thought I recognized but misheard due to connected speech.", highlight: "Transcribing", role: "Connecting fast spoken sounds to precise spelling and punctuation." },
    { part: "Speaking Practice", sentence: "Recording daily voice notes allows me to track improvements in fluidity and grammatical precision over time.", highlight: "voice notes", role: "Converting passive knowledge into active, spontaneous speech." },
    { part: "Writing Practice", sentence: "Writing a 5-sentence personal reflection each evening solidifies the words learned throughout the day.", highlight: "reflection", role: "Deliberate sentence construction and cohesive paragraph architecture." },
    { part: "Grammar Exercises", sentence: "Targeted preposition exercises helped me master difficult combinations like 'listen to' and 'arrive at'.", highlight: "exercises", role: "Diagnostic drills to understand the core logic behind English rules." },
    { part: "Vocabulary Quizzes", sentence: "Daily 5-minute vocabulary quizzes expose gaps in my active recall and test subtle synonym nuances.", highlight: "quizzes", role: "Fast-paced contextual testing to measure active lexical strength." },
    { part: "Error Tracking", sentence: "My personal error tracker alerted me that 40% of my writing mistakes were related to dependent prepositions.", highlight: "error tracker", role: "Systematic logging to eliminate repeated mistakes and build accuracy." },
    { part: "Learning Through Movies", sentence: "Watching British period dramas familiarised me with formal polite phrasing and sophisticated vocabulary.", highlight: "period dramas", role: "Immersive cultural context, body language, and colloquial idioms." },
    { part: "Learning Through Podcasts", sentence: "Listening to British history podcasts on my daily commute added an hour of natural immersion every day.", highlight: "podcasts", role: "Passion-driven listening during daily routines to train sustained focus." },
    { part: "Learning Through Games", sentence: "Word association and anagram games accelerate my rapid retrieval of vocabulary under time pressure.", highlight: "anagram games", role: "Low-stress, gamified challenges that sharpen rapid lexical retrieval." }
  ],
  conclusion: "Combine these 14 learning methods throughout your week for balanced, natural, and lasting English mastery."
};
