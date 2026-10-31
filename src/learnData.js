/**
 * British English Vault - Learn & Practice Module Data Structure (100% English)
 * 17 Master Pillars of English Fluency: Complete Curriculum from Foundations to Mastery.
 */

export const LEARN_CATEGORIES = [
  {
    "id": "foundations",
    "titleEng": "Foundations & Mechanics",
    "icon": "fa-cubes",
    "emoji": "🧱",
    "desc": "Grammar rules, core vocabulary, spelling mechanics, and punctuation precision."
  },
  {
    "id": "core-skills",
    "titleEng": "The 4 Core Skills & Pronunciation",
    "icon": "fa-comments",
    "emoji": "🎙️",
    "desc": "Speaking fluency, listening comprehension, extensive reading, writing, and pronunciation."
  },
  {
    "id": "idioms-varieties",
    "titleEng": "Phrasals, Idioms & Varieties",
    "icon": "fa-crown",
    "emoji": "🇬🇧",
    "desc": "Phrasal verbs, idiomatic expressions, British vs American English, and advanced eloquence."
  },
  {
    "id": "practical-accuracy",
    "titleEng": "Functional English & Error Traps",
    "icon": "fa-briefcase",
    "emoji": "💼",
    "desc": "Real-world situational dialogues and systematically eliminating common grammatical mistakes."
  },
  {
    "id": "mindset-techniques",
    "titleEng": "Thinking in English & Techniques",
    "icon": "fa-brain",
    "emoji": "🧠",
    "desc": "Forming direct English thoughts without translating, and accelerated learning methodologies."
  }
];

export const LEARN_TOPICS = [
  // 1. Grammar
  {
    "id": "grammar",
    "categoryId": "foundations",
    "subgroup": "Foundations & Mechanics",
    "title": "Grammar",
    "summary": "Master the structural architecture of English: Parts of Speech, Sentence Structures, the 12 Verb Tenses, Modal Verbs, Conditionals, and Voice.",
    "rules": [
      {
        "title": "Parts of Speech & Word Classes",
        "details": "Nouns, Verbs, Adjectives, Adverbs, Pronouns, Prepositions, Conjunctions, Articles, Determiners, and Interjections form the grammatical foundation."
      },
      {
        "title": "Sentence Structure & Word Order",
        "details": "English adheres strictly to Subject-Verb-Object (SVO). Combine clauses into Simple, Compound, and Complex sentences with relative clauses."
      },
      {
        "title": "The 12 Verb Tenses & Aspects",
        "details": "Coordinate Simple, Continuous, Perfect, and Perfect Continuous across Present, Past, and Future timeframes with consistent temporal markers."
      },
      {
        "title": "Conditionals, Modals & Voice",
        "details": "Employ 0-3 and Mixed Conditionals (if-clauses), modal verbs (must, should, would, might), passive voice, and reported speech for sophisticated expression."
      }
    ],
    "keywords": [
      "parts of speech",
      "sentence structure",
      "verb tenses",
      "modal verbs",
      "conditionals",
      "passive voice",
      "reported speech",
      "subjunctive mood"
    ],
    "examples": [
      "Although the train was delayed, the conductor promptly apologised to all passengers aboard.",
      "If you had arrived on time, we would have caught the express coach to Oxford.",
      "The historic charter was meticulously examined by senior constitutional scholars."
    ],
    "practice": [
      {
        "question": "Which of the following sentences represents a correct Third Conditional structure?",
        "options": [
          "If I study hard, I will pass the exam.",
          "If I had known about the meeting, I would have attended.",
          "If it rains, we stay at home.",
          "If I were you, I would accept the offer."
        ],
        "correctIndex": 1,
        "explanation": "Third Conditional (past hypothetical) requires: If + Past Perfect, would have + Past Participle."
      },
      {
        "question": "What is the standard unmarked word order in an English affirmative clause?",
        "options": [
          "Verb - Subject - Object (VSO)",
          "Subject - Object - Verb (SOV)",
          "Subject - Verb - Object (SVO)",
          "Object - Verb - Subject (OVS)"
        ],
        "correctIndex": 2,
        "explanation": "Standard English grammar relies primarily on Subject - Verb - Object order (e.g., 'The conductor blew the whistle')."
      }
    ]
  },

  // 2. Vocabulary
  {
    "id": "vocabulary",
    "categoryId": "foundations",
    "subgroup": "Foundations & Mechanics",
    "title": "Vocabulary",
    "summary": "Build a vast lexical repertoire spanning everyday topics, academic prose, professional business, technology, collocations, and word formation.",
    "rules": [
      {
        "title": "Thematic & Contextual Clusters",
        "details": "Acquire vocabulary clustered around domains: Career, Technology, Finance, Travel, Health, Nature, Society, and Describing People."
      },
      {
        "title": "Collocations & Natural Word Partnerships",
        "details": "Learn words with their natural partners (e.g., 'make an effort', 'bear in mind', 'pay attention', 'heavy rain') rather than isolated translations."
      },
      {
        "title": "Word Families & Affixes",
        "details": "Expand a single root word using prefixes (un-, dis-, re-) and suffixes (-tion, -able, -ment, -ly) to multiply your vocabulary fourfold."
      }
    ],
    "keywords": [
      "collocations",
      "word families",
      "synonyms",
      "antonyms",
      "academic vocabulary",
      "prefixes and suffixes",
      "register",
      "homophones"
    ],
    "examples": [
      "Acquiring strong collocations like 'profound impact' and 'vital role' elevates written expression.",
      "Recognizing prefixes helps deduce the meaning of unfamiliar academic terms effortlessly.",
      "The business proposal incorporated formal vocabulary suited for international executive review."
    ],
    "practice": [
      {
        "question": "Which collocation is natural and standard in English?",
        "options": [
          "Do a decision",
          "Make a decision",
          "Create a decision",
          "Form a decision"
        ],
        "correctIndex": 1,
        "explanation": "'Make a decision' is the standard fixed collocation in English; 'do a decision' is an incorrect calque."
      },
      {
        "question": "What is the antonym of the formal adjective 'scarce'?",
        "options": [
          "Abundant",
          "Rare",
          "Minimal",
          "Limited"
        ],
        "correctIndex": 0,
        "explanation": "'Abundant' means plentiful or available in large quantities, opposite to 'scarce' (rare/in short supply)."
      }
    ]
  },

  // 3. Pronunciation
  {
    "id": "pronunciation",
    "categoryId": "core-skills",
    "subgroup": "The 4 Core Skills & Pronunciation",
    "title": "Pronunciation",
    "summary": "Master English vowel sounds, diphthongs, consonants, word and sentence stress, connected speech, weak forms, and British cadence.",
    "rules": [
      {
        "title": "Connected Speech & Linking Sounds",
        "details": "Native speech links consonant to vowel ('pick it up' -> /pɪ.kɪ.tʌp/) and inserts linking 'r' in non-rhotic British pronunciation."
      },
      {
        "title": "Word & Sentence Stress",
        "details": "English is stress-timed. Stressed syllables are louder and longer; unstressed function words reduce to the neutral schwa /ə/."
      },
      {
        "title": "Challenging Sounds & Intonation",
        "details": "Master minimal pairs: TH (/θ/ vs /ð/), short I vs long E (/ɪ/ vs /iː/), W vs V, and expressive falling/rising intonation curves."
      }
    ],
    "keywords": [
      "connected speech",
      "word stress",
      "schwa sound",
      "weak forms",
      "diphthongs",
      "intonation",
      "linking sounds",
      "silent letters"
    ],
    "examples": [
      "In standard British English, the letter 'r' is silent in 'car' unless followed immediately by a vowel.",
      "The neutral schwa sound /ə/ appears in unstressed syllables like the 'a' in 'about' and 'doctor'.",
      "Falling intonation signals certainty and completion at the end of affirmative British statements."
    ],
    "practice": [
      {
        "question": "What is the most common vowel sound in spoken English?",
        "options": [
          "The long /iː/ sound as in 'see'",
          "The neutral schwa /ə/ sound found in unstressed syllables",
          "The short /æ/ sound as in 'cat'",
          "The open /ɑː/ sound as in 'car'"
        ],
        "correctIndex": 1,
        "explanation": "The schwa /ə/ is the most prevalent sound in English, occurring in nearly all unstressed syllables and weak forms."
      },
      {
        "question": "Which letter is completely silent in the British word 'subtle'?",
        "options": [
          "The letter 's'",
          "The letter 'u'",
          "The letter 'b'",
          "The letter 't'"
        ],
        "correctIndex": 2,
        "explanation": "In 'subtle', the letter 'b' is completely silent (/ˈsʌt.əl/)."
      }
    ]
  },

  // 4. Speaking
  {
    "id": "speaking",
    "categoryId": "core-skills",
    "subgroup": "The 4 Core Skills & Pronunciation",
    "title": "Speaking",
    "summary": "Build effortless spontaneous speech: introductions, small talk, expressing nuanced opinions, agreeing/disagreeing, storytelling, and public speaking.",
    "rules": [
      {
        "title": "Conversational Fluency & Small Talk",
        "details": "Open dialogue with courteous remarks on common ground (the weather, weekend plans, shared events) to establish instant rapport."
      },
      {
        "title": "Diplomatic Politeness & Hedging",
        "details": "Soften opinions and disagreements using polite British hedging: 'I see your point, however...', 'I'm not entirely convinced that...'"
      },
      {
        "title": "Storytelling & Experience Sharing",
        "details": "Structure narratives with sequencing markers: 'To begin with', 'Out of nowhere', 'Before I knew it', and 'In the end'."
      }
    ],
    "keywords": [
      "small talk",
      "hedging",
      "fluency",
      "spontaneous speech",
      "public speaking",
      "negotiation",
      "agreeing and disagreeing",
      "discourse markers"
    ],
    "examples": [
      "To be entirely honest, I would recommend reviewing the budget before finalising our proposal.",
      "That's a fascinating perspective, although I wonder if there might be an alternative route.",
      "Could you possibly elaborate on how this strategy will benefit our client base?"
    ],
    "practice": [
      {
        "question": "Which phrase expresses polite, diplomatic disagreement in professional British English?",
        "options": [
          "You are completely wrong about this.",
          "I see what you mean, but I'm inclined to look at it somewhat differently.",
          "No way, that makes no sense.",
          "I refuse to listen to that idea."
        ],
        "correctIndex": 1,
        "explanation": "'I see what you mean, but...' acknowledges the other person's view before politely presenting a counter-perspective."
      },
      {
        "question": "What is the role of discourse markers like 'Well', 'Actually', or 'As a matter of fact' in spoken English?",
        "options": [
          "They signal tone, structure ideas, and buy natural thinking time",
          "They indicate grammatical errors",
          "They are only used in written poetry",
          "They indicate that the conversation is ending"
        ],
        "correctIndex": 0,
        "explanation": "Discourse markers give spoken conversations natural rhythm, soften transitions, and manage conversational flow."
      }
    ]
  },

  // 5. Listening
  {
    "id": "listening",
    "categoryId": "core-skills",
    "subgroup": "The 4 Core Skills & Pronunciation",
    "title": "Listening",
    "summary": "Calibrate your ear to understand native British speakers, rapid speech, diverse regional accents, podcasts, news broadcasts, and television dialogues.",
    "rules": [
      {
        "title": "Listening for Gist vs. Detail",
        "details": "Train your brain to catch the primary thesis without panicking over missed words; focus on stressed content words (nouns and verbs)."
      },
      {
        "title": "Deciphering Fast Connected Speech",
        "details": "Understand how native speakers elide (drop) sounds (e.g. 'next door' sounds like 'nexdoor') and assimilate neighboring consonants."
      },
      {
        "title": "Multi-Accent Calibration",
        "details": "Expose your hearing regularly to BBC News, Scottish, Welsh, Northern English, and Estuary voices to build versatile real-world comprehension."
      }
    ],
    "keywords": [
      "fast speech",
      "comprehension",
      "accents",
      "connected speech",
      "podcasts",
      "BBC Radio",
      "dictation",
      "shadowing"
    ],
    "examples": [
      "Listening to BBC Radio 4 broadcasts trains the ear to follow complex debates delivered at natural speed.",
      "Noticing how consonants assimilate in rapid speech prevents misinterpreting common phrases.",
      "Regular podcast immersion makes following fast-paced native conversations comfortable and natural."
    ],
    "practice": [
      {
        "question": "When listening to fast native English speech, which words carry the most essential meaning?",
        "options": [
          "Auxiliary verbs and articles",
          "Stressed content words: nouns, main verbs, adjectives, and adverbs",
          "Prepositions and pronouns exclusively",
          "Conjunctions only"
        ],
        "correctIndex": 1,
        "explanation": "Content words receive primary stress in English, carrying the core meaning of the message."
      },
      {
        "question": "What auditory technique trains both accurate listening and vocal imitation simultaneously?",
        "options": [
          "Reading a silent book",
          "Shadowing (repeating audio in real-time right behind the speaker)",
          "Memorizing spelling lists",
          "Translating subtitles into another language"
        ],
        "correctIndex": 1,
        "explanation": "Shadowing directly connects auditory perception with vocal motor reproduction."
      }
    ]
  },

  // 6. Reading
  {
    "id": "reading",
    "categoryId": "core-skills",
    "subgroup": "The 4 Core Skills & Pronunciation",
    "title": "Reading",
    "summary": "Develop rapid reading comprehension, skimming, scanning, contextual word deduction, and analytical critique across British journalism, essays, and literature.",
    "rules": [
      {
        "title": "Skimming & Scanning Techniques",
        "details": "Skim introductory and concluding paragraphs for global overview; scan rapidly for dates, names, figures, and key terms."
      },
      {
        "title": "Contextual Clue Deduction",
        "details": "Infer the meaning of unfamiliar vocabulary from sentence syntax, surrounding adjectives, contrast markers, and logical flow."
      },
      {
        "title": "Evaluating Tone & Author's Stance",
        "details": "Detect subtle British irony, understatement, academic detachment, or rhetorical persuasion through modal adverbs and adjectives."
      }
    ],
    "keywords": [
      "skimming",
      "scanning",
      "comprehension",
      "context clues",
      "academic reading",
      "author purpose",
      "tone",
      "editorial analysis"
    ],
    "examples": [
      "Skimming the opening paragraph gave me an immediate understanding of the editorial's central thesis.",
      "Contextual clues in the surrounding passage made the meaning of the rare adjective unmistakable.",
      "Analyzing articles from The Economist deepens reading speed and critical comprehension."
    ],
    "practice": [
      {
        "question": "What is the difference between 'skimming' and 'scanning' a text?",
        "options": [
          "Skimming reads every word slowly; scanning reads backwards",
          "Skimming grasps the overall main idea; scanning searches for specific pieces of information",
          "Skimming is only for novels; scanning is for newspapers",
          "There is no difference between the two"
        ],
        "correctIndex": 1,
        "explanation": "Skimming provides a rapid global overview; scanning targets specific names, dates, or keywords."
      },
      {
        "question": "How can you deduce the meaning of an unfamiliar word without checking a dictionary?",
        "options": [
          "Skip the entire page immediately",
          "Examine surrounding contrast words, examples, synonyms, and grammatical role in the sentence",
          "Assume it means the opposite of everything in the paragraph",
          "Replace it with a random noun"
        ],
        "correctIndex": 1,
        "explanation": "Contextual clues (syntax, punctuation, contrast conjunctions like 'unlike' or 'whereas') reveal word meaning naturally."
      }
    ]
  },

  // 7. Writing
  {
    "id": "writing",
    "categoryId": "core-skills",
    "subgroup": "The 4 Core Skills & Pronunciation",
    "title": "Writing",
    "summary": "Craft elegant sentences, cohesive paragraphs, professional emails, essays, reports, and CVs with British spelling, punctuation, and style.",
    "rules": [
      {
        "title": "Paragraph Architecture",
        "details": "Structure every paragraph around a single core Topic Sentence, expand with evidence/analysis, and synthesize with a closing transition."
      },
      {
        "title": "Cohesive Transition Devices",
        "details": "Bind sentences together using sophisticated transitional linkers ('furthermore', 'nevertheless', 'consequently', 'on the other hand')."
      },
      {
        "title": "Tone & Register Adaptation",
        "details": "Master the distinction between formal professional correspondence (impersonal passive, polite sign-offs) and informal creative writing."
      }
    ],
    "keywords": [
      "paragraph structure",
      "cohesion",
      "formal emails",
      "essay writing",
      "linking words",
      "proofreading",
      "punctuation",
      "register"
    ],
    "examples": [
      "I am writing to inquire about the prospective fellowship announced in your latest academic journal.",
      "Furthermore, the collected empirical data reinforces our primary hypothesis regarding economic stability.",
      "Meticulous proofreading ensures that spelling, punctuation, and syntax remain impeccably accurate."
    ],
    "practice": [
      {
        "question": "Which transitional linker expresses contrast between two ideas?",
        "options": [
          "Consequently",
          "Furthermore",
          "Nevertheless",
          "Similarly"
        ],
        "correctIndex": 2,
        "explanation": "'Nevertheless' introduces a contrasting or counter-balancing statement (similar to 'yet' or 'in spite of that')."
      },
      {
        "question": "What is the recommended opening for a formal business letter when the recipient's name is unknown?",
        "options": [
          "Hey mate,",
          "Dear Sir or Madam, / Dear Hiring Team,",
          "To anyone reading this,",
          "Greetings friend,"
        ],
        "correctIndex": 1,
        "explanation": "'Dear Sir or Madam' or 'Dear Hiring Team' maintains the highest standard of formal British etiquette."
      }
    ]
  },

  // 8. Phrasal Verbs
  {
    "id": "phrasal-verbs",
    "categoryId": "idioms-varieties",
    "subgroup": "Phrasals, Idioms & Varieties",
    "title": "Phrasal Verbs",
    "summary": "Conquer one of the most vital features of natural English: separable/inseparable, transitive/intransitive phrasals with Get, Take, Put, Come, Go, Make, Turn, Look, Break, Bring.",
    "rules": [
      {
        "title": "Separable vs. Inseparable Phrasals",
        "details": "In separable phrasals ('turn off'), pronouns MUST go in the middle ('turn it off'). Inseparable phrasals ('look after') keep verb and particle together."
      },
      {
        "title": "Literal vs. Idiomatic Meaning",
        "details": "Distinguish literal direction ('look up at the sky') from idiomatic meaning ('look up a word in the dictionary' or 'things are looking up')."
      },
      {
        "title": "Core Particle Families",
        "details": "Learn particles systematically: 'out' often means discovery or completion ('find out', 'figure out', 'carry out'); 'off' indicates departure ('set off', 'take off')."
      }
    ],
    "keywords": [
      "phrasal verbs",
      "separable",
      "inseparable",
      "transitive",
      "intransitive",
      "particles",
      "get",
      "take",
      "put",
      "look"
    ],
    "examples": [
      "Could you please look after the documents while I attend the morning conference?",
      "We had to put off the meeting until next Friday due to unexpected train strikes.",
      "She came across a vintage edition of classic British poetry in a small bookshop."
    ],
    "practice": [
      {
        "question": "If a pronoun (it/them) is used with a separable phrasal verb like 'turn down' (to reject), where must it go?",
        "options": [
          "Always after the particle: 'turn down it'",
          "Always between the verb and particle: 'turn it down'",
          "At the very beginning of the sentence only",
          "It does not matter"
        ],
        "correctIndex": 1,
        "explanation": "With separable phrasal verbs, pronoun objects must be placed between the verb and the particle ('turn it down')."
      },
      {
        "question": "What does the phrasal verb 'call off' mean?",
        "options": [
          "To phone someone loudly",
          "To cancel a scheduled event or arrangement",
          "To postpone until next week",
          "To invite someone inside"
        ],
        "correctIndex": 1,
        "explanation": "'Call off' means to cancel completely (e.g., 'They decided to call off the football match')."
      }
    ]
  },

  // 9. Idioms and Expressions
  {
    "id": "idioms-expressions",
    "categoryId": "idioms-varieties",
    "subgroup": "Phrasals, Idioms & Varieties",
    "title": "Idioms and Expressions",
    "summary": "Master figurative language, metaphors, proverbs, and idiomatic expressions across daily life, business, money, time, and human relationships.",
    "rules": [
      {
        "title": "Figurative Meaning Over Literal Words",
        "details": "Idioms cannot be understood from the literal definition of individual words ('cost an arm and a leg' means extremely expensive)."
      },
      {
        "title": "Register & Appropriateness",
        "details": "Some idioms suit casual conversations ('spill the beans'), while others are valued in professional settings ('touch base', 'ahead of the curve')."
      },
      {
        "title": "Fixed Phrasing",
        "details": "Do not alter the words or grammar inside fixed idioms ('bite the bullet', never 'chew the bullet')."
      }
    ],
    "keywords": [
      "idioms",
      "figurative language",
      "proverbs",
      "metaphors",
      "similes",
      "business idioms",
      "everyday expressions",
      "cultural sayings"
    ],
    "examples": [
      "After months of hesitation, the founders decided to bite the bullet and launch the venture.",
      "The new vintage sports car cost an arm and a leg, but it performs magnificently.",
      "Let's touch base next Monday afternoon once the initial analytics have arrived."
    ],
    "practice": [
      {
        "question": "What does the idiom 'bite the bullet' mean?",
        "options": [
          "To eat something very hard",
          "To endure a painful or difficult situation with courage and fortitude",
          "To start a violent argument",
          "To shoot a target accurately"
        ],
        "correctIndex": 1,
        "explanation": "'Bite the bullet' means to face a challenging or unpleasant situation bravely because it cannot be avoided."
      },
      {
        "question": "What does someone mean if they say an opportunity happens 'once in a blue moon'?",
        "options": [
          "It happens during every lunar eclipse",
          "It occurs very rarely or hardly ever",
          "It happens every single weekend",
          "It only happens at night"
        ],
        "correctIndex": 1,
        "explanation": "'Once in a blue moon' is a classic idiom meaning something takes place very infrequently."
      }
    ]
  },

  // 10. British English
  {
    "id": "british-english",
    "categoryId": "idioms-varieties",
    "subgroup": "Phrasals, Idioms & Varieties",
    "title": "British English",
    "summary": "Explore authentic British vocabulary, slang, polite understatement, Received Pronunciation, spelling differences, and cultural social customs.",
    "rules": [
      {
        "title": "Distinctive British Vocabulary & Slang",
        "details": "Master everyday UK terms: 'flat' (apartment), 'boot' (car trunk), 'lift' (elevator), 'chuffed' (very pleased), 'knackered' (exhausted)."
      },
      {
        "title": "British Orthography & Spelling",
        "details": "Preserve standard UK spelling: -our ('colour', 'honour'), -ise ('organise', 'realise'), -re ('theatre', 'centre'), and double-l ('travelling')."
      },
      {
        "title": "British Understatement & Courtesy",
        "details": "British culture favors understatement ('not bad at all' = excellent; 'a bit of a nuisance' = major disaster) and courteous apologies ('Sorry!')."
      }
    ],
    "keywords": [
      "British vocabulary",
      "British slang",
      "UK spelling",
      "understatement",
      "politeness",
      "Received Pronunciation",
      "tea culture",
      "regional accents"
    ],
    "examples": [
      "I was absolutely chuffed when my essay on British constitutional history received top honors.",
      "Mind the gap between the train and the platform edge when alighting at Piccadilly Circus.",
      "Shall we pop over to the corner cafe for a proper cup of Earl Grey tea?"
    ],
    "practice": [
      {
        "question": "In British English, what is the word for an apartment?",
        "options": [
          "Condo",
          "Flat",
          "Cabin",
          "Chamber"
        ],
        "correctIndex": 1,
        "explanation": "In standard British English, an apartment is universally called a 'flat'."
      },
      {
        "question": "Which of the following follows standard British English spelling?",
        "options": [
          "Color and Theater",
          "Colour and Theatre",
          "Color and Theatre",
          "Colour and Theater"
        ],
        "correctIndex": 1,
        "explanation": "British English preserves the '-our' ('colour') and '-re' ('theatre') spellings."
      }
    ]
  },

  // 11. American English
  {
    "id": "american-english",
    "categoryId": "idioms-varieties",
    "subgroup": "Phrasals, Idioms & Varieties",
    "title": "American English",
    "summary": "Understand General American pronunciation, rhoticity, simplified spellings, slang, vocabulary contrasts, and conversational directness.",
    "rules": [
      {
        "title": "Rhotic Pronunciation & T-Flapping",
        "details": "American English is rhotic (the 'r' is always pronounced). Intervocalic 't' frequently flaps into a soft 'd' sound ('water' sounds like 'wader')."
      },
      {
        "title": "Lexical Counterparts",
        "details": "Recognize key American terms: 'elevator' (lift), 'trunk' (boot), 'sidewalk' (pavement), 'gas' (petrol), 'fall' (autumn), 'apartment' (flat)."
      },
      {
        "title": "American Spelling Conventions",
        "details": "American orthography prefers -or ('color'), -ize ('organize'), -er ('center'), and single consonants in inflections ('traveling')."
      }
    ],
    "keywords": [
      "American vocabulary",
      "rhoticity",
      "t-flapping",
      "US spelling",
      "American slang",
      "directness",
      "differences vs British",
      "General American"
    ],
    "examples": [
      "Take the elevator to the tenth floor and walk down the hallway to room 104.",
      "In the fall, the colorful leaves in Central Park create a stunning landscape.",
      "He put his luggage into the trunk of the car and headed out onto the highway."
    ],
    "practice": [
      {
        "question": "What is the American English equivalent for the British term 'pavement'?",
        "options": [
          "Sidewalk",
          "Crosswalk",
          "Highway",
          "Driveway"
        ],
        "correctIndex": 0,
        "explanation": "In the United States, the pedestrian walkway alongside a road is called the 'sidewalk'."
      },
      {
        "question": "What happens to the letter 'r' in American English (rhotic pronunciation)?",
        "options": [
          "It is always silent after vowels",
          "It is pronounced clearly in all positions, including word-finally (e.g. 'car', 'hard')",
          "It is pronounced as an 'h'",
          "It is only pronounced before vowels"
        ],
        "correctIndex": 1,
        "explanation": "American English is predominantly rhotic, meaning the 'r' sound is voiced wherever it appears in spelling."
      }
    ]
  },

  // 12. Advanced English
  {
    "id": "advanced-english",
    "categoryId": "idioms-varieties",
    "subgroup": "Phrasals, Idioms & Varieties",
    "title": "Advanced English",
    "summary": "Attain C1/C2 mastery: negative inversion, cleft sentences, nuanced vocabulary, rhetoric, subjunctive constructions, precision, and formal academic registers.",
    "rules": [
      {
        "title": "Negative Inversion for Emphasis",
        "details": "Invert subject and auxiliary after negative limiters: 'Seldom have I witnessed...', 'Not only did she succeed, but...'"
      },
      {
        "title": "Cleft Sentences for Focus",
        "details": "Highlight specific details using It-clefts ('It was the executive who made the decision') or What-clefts ('What surprised us was his composure')."
      },
      {
        "title": "Lexical Precision & Nuance",
        "details": "Distinguish exact shades of meaning (e.g., 'meticulous' vs 'fastidious'; 'inevitable' vs 'imminent'; 'pervasive' vs 'ubiquitous')."
      }
    ],
    "keywords": [
      "inversion",
      "cleft sentences",
      "subjunctive",
      "rhetoric",
      "nuance",
      "register",
      "academic prose",
      "C1 C2 fluency"
    ],
    "examples": [
      "Rarely has a breakthrough in biomedical research sparked such profound global optimism.",
      "It was through sheer resilience and intellectual rigor that the scholars overcame the crisis.",
      "The treaty contained meticulous stipulations designed to preempt future diplomatic discord."
    ],
    "practice": [
      {
        "question": "Which sentence correctly demonstrates formal negative inversion?",
        "options": [
          "Seldom I have seen such magnificent architecture.",
          "Seldom have I seen such magnificent architecture.",
          "I have seen seldom such magnificent architecture.",
          "Have I seen seldom such magnificent architecture."
        ],
        "correctIndex": 1,
        "explanation": "Negative inversion inverts the auxiliary verb and subject when a limiting adverb begins the clause ('Seldom have I seen...')."
      },
      {
        "question": "What is the primary function of a cleft sentence (e.g., 'It was her determination that saved the project')?",
        "options": [
          "To make the sentence shorter",
          "To place special focus and emphasis on a specific element of the sentence",
          "To turn a statement into a question",
          "To indicate future tense"
        ],
        "correctIndex": 1,
        "explanation": "Cleft structures ('It was X that...') split a clause into two parts to highlight and emphasize a specific component."
      }
    ]
  },

  // 13. Spelling and Punctuation
  {
    "id": "spelling-punctuation",
    "categoryId": "foundations",
    "subgroup": "Foundations & Mechanics",
    "title": "Spelling and Punctuation",
    "summary": "Master English orthography, silent letters, double consonants, apostrophe possession vs contraction, semicolons, commas, and hyphenation rules.",
    "rules": [
      {
        "title": "Apostrophe Precision (Its vs. It's)",
        "details": "'It's' is ONLY a contraction for 'it is' or 'it has'. The possessive pronoun is 'its' (no apostrophe), exactly like 'his' or 'hers'."
      },
      {
        "title": "Semicolon & Comma Rules",
        "details": "Use semicolons (;) to link two closely related independent clauses without a conjunction. Avoid comma splices between complete sentences."
      },
      {
        "title": "Silent Letters & Tricky Double Consonants",
        "details": "Memorize common silent letters (doubt, receipt, knight, column) and tricky spellings (definitely, accommodation, necessary, separate)."
      }
    ],
    "keywords": [
      "spelling rules",
      "silent letters",
      "double consonants",
      "semicolons",
      "apostrophes",
      "comma splice",
      "hyphens",
      "capitalization"
    ],
    "examples": [
      "The museum completed its expansion; the newly restored Victorian wing opens on Tuesday.",
      "It's definitely necessary to accommodate all guests with utmost courtesy.",
      "She packed her scissors, receipt, and diary before departing for Edinburgh."
    ],
    "practice": [
      {
        "question": "Which sentence uses the apostrophe correctly?",
        "options": [
          "The company celebrated it's tenth anniversary in London.",
          "The company celebrated its tenth anniversary in London.",
          "The company celebrated its' tenth anniversary in London.",
          "The company celebrated its's tenth anniversary in London."
        ],
        "correctIndex": 1,
        "explanation": "Possessive 'its' takes no apostrophe ('its tenth anniversary'); 'it's' is exclusively a contraction for 'it is' or 'it has'."
      },
      {
        "question": "Which of the following words is spelled correctly?",
        "options": [
          "Definately",
          "Definitly",
          "Definitely",
          "Definitelyy"
        ],
        "correctIndex": 2,
        "explanation": "'Definitely' is spelled with 'i-t-e' in the middle (derived from 'finite')."
      }
    ]
  },

  // 14. Functional English
  {
    "id": "functional-english",
    "categoryId": "practical-accuracy",
    "subgroup": "Functional English & Error Traps",
    "title": "Functional English",
    "summary": "Practical English for authentic real-world situations: restaurants, hotels, airports, doctor appointments, banking, job interviews, and complaints.",
    "rules": [
      {
        "title": "Polite Service Inquiries & Requests",
        "details": "Use indirect structures: 'Could you possibly advise...', 'I would like to make a reservation for two', 'Would you mind checking...'"
      },
      {
        "title": "Handling Discontent & Making Complaints",
        "details": "British complaints are framed constructively: 'I'm afraid there appears to be a slight discrepancy with my invoice', rather than shouting."
      },
      {
        "title": "Navigating Travel & Transit",
        "details": "Master vocabulary for boarding gates, delays, connections, baggage claims, ticketing machines, and booking changes."
      }
    ],
    "keywords": [
      "restaurant dialogues",
      "hotel check-in",
      "airport transit",
      "doctor appointments",
      "making complaints",
      "job interviews",
      "phone etiquette",
      "asking for directions"
    ],
    "examples": [
      "Could we please have the bill whenever it is convenient for you?",
      "I am afraid there appears to be a slight misunderstanding regarding my hotel booking.",
      "Which platform does the express service to London King's Cross depart from?"
    ],
    "practice": [
      {
        "question": "What is the polite British way to request the bill in a restaurant?",
        "options": [
          "Give me the check right now!",
          "Could we please have the bill, whenever you have a moment?",
          "Money, please!",
          "I want to pay immediately."
        ],
        "correctIndex": 1,
        "explanation": "'Could we please have the bill, whenever you have a moment?' demonstrates ideal British courtesy and phrasing."
      },
      {
        "question": "How do you politely announce a problem with a service or product in English?",
        "options": [
          "You ruined everything!",
          "I'm afraid there seems to be a slight issue with my order.",
          "Fix this immediately or else!",
          "Your service is unacceptable and terrible."
        ],
        "correctIndex": 1,
        "explanation": "Opening with 'I'm afraid there seems to be...' is the professional, polite way to introduce a complaint."
      }
    ]
  },

  // 15. Common Mistakes
  {
    "id": "common-mistakes",
    "categoryId": "practical-accuracy",
    "subgroup": "Functional English & Error Traps",
    "title": "Common Mistakes",
    "summary": "Systematically eliminate the most frequent grammar, preposition, translation, and word-choice traps (Make vs. Do, Say vs. Tell, In/On/At, False Friends).",
    "rules": [
      {
        "title": "Make vs. Do Collocations",
        "details": "'Make' involves creating, producing, or deciding ('make a mistake', 'make coffee'). 'Do' involves actions, tasks, and duties ('do homework', 'do business')."
      },
      {
        "title": "Prepositions of Time & Place (In, On, At)",
        "details": "'At' for specific points/times (at 5:00, at the station); 'On' for days/surfaces (on Monday, on the wall); 'In' for enclosed areas/months/years (in London, in July)."
      },
      {
        "title": "Subject-Verb Agreement & Tense Clashes",
        "details": "He/she/it takes -s in Present Simple ('he goes', not 'he go'). Don't mix 'yesterday' with present tense ('yesterday I went', not 'yesterday I go')."
      }
    ],
    "keywords": [
      "make vs do",
      "say vs tell",
      "in on at",
      "false friends",
      "subject-verb agreement",
      "confused words",
      "since vs for",
      "common grammar traps"
    ],
    "examples": [
      "Everyone makes mistakes when learning something new, but consistent practice brings mastery.",
      "The train arrives at Heathrow Airport at quarter past nine in the morning.",
      "She explained the proposal to me thoroughly before we commenced the project."
    ],
    "practice": [
      {
        "question": "Which sentence correctly pairs the verb with 'mistake'?",
        "options": [
          "I did a mistake on the examination.",
          "I made a mistake on the examination.",
          "I created a mistake on the examination.",
          "I performed a mistake on the examination."
        ],
        "correctIndex": 1,
        "explanation": "In English, the fixed collocation is always 'make a mistake', never 'do a mistake'."
      },
      {
        "question": "Which preposition should be used before a specific calendar day (e.g., Friday)?",
        "options": [
          "In Friday",
          "At Friday",
          "On Friday",
          "For Friday"
        ],
        "correctIndex": 2,
        "explanation": "Specific days and dates always take 'on' (e.g. 'on Friday', 'on the 15th of October')."
      }
    ]
  },

  // 16. Thinking in English
  {
    "id": "thinking-in-english",
    "categoryId": "mindset-techniques",
    "subgroup": "Thinking in English & Techniques",
    "title": "Thinking in English",
    "summary": "Break the translation habit, build direct English thought pathways, narrate your daily environment, describe unknown words, and boost response speed.",
    "rules": [
      {
        "title": "Eliminate Subconscious Mental Translation",
        "details": "Connecting ideas directly to English words and phrases avoids cognitive delay and unnatural literal translations."
      },
      {
        "title": "Internal Monologue & Narration",
        "details": "Narrate your surroundings silently in English during routine tasks: 'I am boiling the kettle, checking my emails, and planning my afternoon schedule.'"
      },
      {
        "title": "Circumlocution & Paraphrasing",
        "details": "When you forget a specific word, describe its purpose or appearance ('the device used to cork wine bottles') rather than pausing or switching languages."
      }
    ],
    "keywords": [
      "thinking in English",
      "stop translating",
      "internal monologue",
      "circumlocution",
      "paraphrasing",
      "response speed",
      "spontaneous thoughts",
      "fluency mindset"
    ],
    "examples": [
      "Mentally narrating my morning commute in English accelerated my speaking response speed dramatically.",
      "When I forgot the word for 'whisk', I paraphrased: 'the kitchen tool used to beat eggs.'",
      "Thinking directly in sentence frames eliminates hesitation pauses during live conversations."
    ],
    "practice": [
      {
        "question": "What is 'circumlocution' and why is it essential for fluency?",
        "options": [
          "Stopping speech completely until you look up a word",
          "Describing or paraphrasing an unknown word using familiar terms to keep conversation flowing",
          "Speaking in circular rhymes",
          "Translating every word through a dictionary"
        ],
        "correctIndex": 1,
        "explanation": "Circumlocution allows speakers to explain concepts even when a specific noun escapes memory, maintaining unbroken fluency."
      },
      {
        "question": "What is an effective daily exercise to train thinking directly in English?",
        "options": [
          "Silently narrating your actions and surroundings in English as you go about your day",
          "Translating a dictionary page backwards",
          "Only reading single words without sentences",
          "Avoiding all English communication"
        ],
        "correctIndex": 0,
        "explanation": "Silent self-narration builds immediate neural pathways connecting thoughts directly to English sentences."
      }
    ]
  },

  // 17. English Learning Techniques
  {
    "id": "learning-techniques",
    "categoryId": "mindset-techniques",
    "subgroup": "Thinking in English & Techniques",
    "title": "English Learning Techniques",
    "summary": "Accelerate your mastery using proven pedagogical science: Spaced Repetition (SRS), Active Recall, Flashcards, Vocabulary Notebooks, Shadowing, and Error Tracking.",
    "rules": [
      {
        "title": "Active Recall & Spaced Repetition",
        "details": "Testing yourself repeatedly at expanding intervals transfers vocabulary and grammar rules permanently into your long-term memory."
      },
      {
        "title": "The Input-Output Balance",
        "details": "Pair comprehensive input (Daily Reading, Podcasts, Audio) with immediate active output (Shadowing, Dictation, Writing Practice, Speaking)."
      },
      {
        "title": "Consistent Micro-Habits",
        "details": "Twenty focused minutes of deliberate practice daily outperforms sporadic three-hour cramming sessions every time."
      }
    ],
    "keywords": [
      "spaced repetition",
      "active recall",
      "flashcards",
      "shadowing",
      "dictation",
      "deliberate practice",
      "error tracking",
      "habit building"
    ],
    "examples": [
      "Combining spaced repetition flashcards with daily shadowing produced dramatic fluency gains in just three months.",
      "Maintaining an error log and reviewing it weekly systematically eliminated my chronic preposition mistakes.",
      "Twenty minutes of deliberate daily practice builds lifelong linguistic intuition and effortless fluency."
    ],
    "practice": [
      {
        "question": "Why is 'active recall' superior to passively re-reading notes?",
        "options": [
          "It takes less time to read notes",
          "Forcing the brain to retrieve information strengthens neural pathways and dramatically boosts retention",
          "Passive reading has been proven useless",
          "Active recall requires no mental effort"
        ],
        "correctIndex": 1,
        "explanation": "The cognitive effort required to retrieve information signals to the brain that the memory is valuable and must be retained."
      },
      {
        "question": "What is the key advantage of daily 20-minute micro-habits over occasional cramming?",
        "options": [
          "It avoids cognitive overload, sustains motivation, and capitalizes on overnight memory consolidation",
          "It is required by British law",
          "It eliminates the need for grammar exercises",
          "It allows you to skip listening practice"
        ],
        "correctIndex": 0,
        "explanation": "Daily consistent practice harnesses sleep cycles for memory consolidation, creating permanent language habits."
      }
    ]
  }
];

export const GRAMMAR_CHECKLIST = [
  {
    num: 1,
    title: "Grammar",
    desc: "The structural rules: parts of speech, sentence structure, 12 tenses, conditionals, passive voice, and modals",
    topicId: "grammar",
    example: "Although the train was delayed, the conductor promptly apologised to all passengers aboard."
  },
  {
    num: 2,
    title: "Vocabulary",
    desc: "Everyday, academic, professional, and business vocabulary, natural collocations, synonyms, and word families",
    topicId: "vocabulary",
    example: "Acquiring strong collocations like 'profound impact' and 'vital role' elevates written expression."
  },
  {
    num: 3,
    title: "Pronunciation",
    desc: "Vowels, consonants, word and sentence stress, connected speech, weak forms, intonation, and British cadence",
    topicId: "pronunciation",
    example: "In standard British English, the letter 'r' is silent in 'car' unless followed immediately by a vowel."
  },
  {
    num: 4,
    title: "Speaking",
    desc: "Introductions, small talk, expressing opinions, diplomatic agreement/disagreement, fluency, and spontaneous dialogue",
    topicId: "speaking",
    example: "To be entirely honest, I would recommend reviewing the budget before finalising our proposal."
  },
  {
    num: 5,
    title: "Listening",
    desc: "Understanding native speakers, diverse regional accents, fast connected speech, podcasts, news, and films",
    topicId: "listening",
    example: "Listening to BBC Radio 4 broadcasts trains the ear to follow complex debates delivered at natural speed."
  },
  {
    num: 6,
    title: "Reading",
    desc: "Comprehension, skimming, scanning, contextual deduction, articles, short stories, and academic literature",
    topicId: "reading",
    example: "Skimming the opening paragraph gave me an immediate understanding of the editorial's central thesis."
  },
  {
    num: 7,
    title: "Writing",
    desc: "Sentence mechanics, cohesive paragraph architecture, formal letters, emails, essays, and proofreading",
    topicId: "writing",
    example: "I am writing to inquire about the prospective fellowship announced in your latest academic journal."
  },
  {
    num: 8,
    title: "Phrasal Verbs",
    desc: "Separable, inseparable, transitive phrasals with Get, Take, Put, Come, Go, Make, Turn, Look, Break, Bring",
    topicId: "phrasal-verbs",
    example: "Could you please look after the documents while I attend the morning conference?"
  },
  {
    num: 9,
    title: "Idioms and Expressions",
    desc: "Everyday idioms, British expressions, business idioms, metaphors, similes, and cultural proverbs",
    topicId: "idioms-expressions",
    example: "After months of hesitation, the founders decided to bite the bullet and launch the venture."
  },
  {
    num: 10,
    title: "British English",
    desc: "British vocabulary, slang, polite understatement, Received Pronunciation, spelling differences, and culture",
    topicId: "british-english",
    example: "I was absolutely chuffed when my essay on British constitutional history received top honors."
  },
  {
    num: 11,
    title: "American English",
    desc: "General American vocabulary, rhotic pronunciation, t-flapping, spelling conventions, and slang differences",
    topicId: "american-english",
    example: "Take the elevator to the tenth floor and walk down the hallway to room 104."
  },
  {
    num: 12,
    title: "Advanced English",
    desc: "C1/C2 advanced grammar, negative inversion, cleft sentences, nuanced vocabulary, rhetoric, and precision",
    topicId: "advanced-english",
    example: "Rarely has a breakthrough in biomedical research sparked such profound global optimism."
  },
  {
    num: 13,
    title: "Spelling and Punctuation",
    desc: "Spelling rules, silent letters, double consonants, apostrophe possession vs contraction, and semicolons",
    topicId: "spelling-punctuation",
    example: "The museum completed its expansion; the newly restored Victorian wing opens on Tuesday."
  },
  {
    num: 14,
    title: "Functional English",
    desc: "Real-world English: restaurant, hotel, airport, bank, doctor, workplace, interviews, directions, complaints",
    topicId: "functional-english",
    example: "Could we please have the bill whenever it is convenient for you?"
  },
  {
    num: 15,
    title: "Common Mistakes",
    desc: "Eradicating frequent errors: Make vs Do, Say vs Tell, In/On/At, False Friends, Subject-Verb agreement",
    topicId: "common-mistakes",
    example: "Everyone makes mistakes when learning something new, but consistent practice brings mastery."
  },
  {
    num: 16,
    title: "Thinking in English",
    desc: "Stopping translation in your head, building direct English thoughts, self-narration, and response speed",
    topicId: "thinking-in-english",
    example: "Mentally narrating my morning commute in English accelerated my speaking response speed dramatically."
  },
  {
    num: 17,
    title: "English Learning Techniques",
    desc: "Accelerated learning science: Spaced Repetition, Active Recall, Flashcards, Notebooks, Shadowing, Dictation",
    topicId: "learning-techniques",
    example: "Combining spaced repetition flashcards with daily shadowing produced dramatic fluency gains."
  }
];

export const WHERE_TO_START_GUIDE = {
  title: "Where should you start?",
  intro: "To reach advanced English fluency, follow this structured roadmap: begin with Grammar & Vocabulary foundations, develop your 4 Core Skills, master Phrasals & Idioms, and train your mind to think directly in English.",
  examples: [
    { part: "1. Grammar", sentence: "If you had arrived on time, we would have caught the express coach to Oxford.", highlight: "had arrived", role: "Master sentence structures, parts of speech, and the 12 verb tenses." },
    { part: "2. Vocabulary", sentence: "Acquiring strong collocations like 'profound impact' elevates written expression.", highlight: "collocations", role: "Build rich everyday, academic, and professional word partnerships." },
    { part: "3. Pronunciation", sentence: "In standard British English, the letter 'r' is silent in 'car' unless followed by a vowel.", highlight: "silent", role: "Train vowels, word stress, connected speech, and weak forms." },
    { part: "4. Speaking", sentence: "To be entirely honest, I would recommend reviewing the budget before finalising our proposal.", highlight: "honest", role: "Practice spontaneous speech, polite hedging, and conversational fluency." },
    { part: "5. Listening", sentence: "Listening to BBC Radio 4 broadcasts trains the ear to follow complex debates delivered at natural speed.", highlight: "Listening", role: "Accustom your ears to native cadence, diverse accents, and rapid speech." },
    { part: "6. Reading", sentence: "Skimming the opening paragraph gave me an immediate understanding of the editorial's central thesis.", highlight: "Skimming", role: "Expand comprehension through extensive reading of news and literature." },
    { part: "7. Writing", sentence: "I am writing to inquire about the prospective fellowship announced in your latest journal.", highlight: "inquire", role: "Craft clear paragraph architecture, formal correspondence, and essays." },
    { part: "8. Phrasal Verbs", sentence: "Could you please look after the documents while I attend the morning conference?", highlight: "look after", role: "Master separable and inseparable verbs that native speakers use daily." },
    { part: "9. Idioms & Expressions", sentence: "After months of hesitation, the founders decided to bite the bullet and launch the venture.", highlight: "bite the bullet", role: "Enrich your language with figurative expressions, metaphors, and sayings." },
    { part: "10. British English", sentence: "I was absolutely chuffed when my essay on British constitutional history received top honors.", highlight: "chuffed", role: "Learn authentic UK vocabulary, slang, polite understatement, and spelling." },
    { part: "11. American English", sentence: "Take the elevator to the tenth floor and walk down the hallway to room 104.", highlight: "elevator", role: "Understand American vocabulary, rhoticity, and spelling differences." },
    { part: "12. Advanced English", sentence: "Rarely has a breakthrough in biomedical research sparked such profound global optimism.", highlight: "Rarely has", role: "Acquire C1/C2 mastery: negative inversion, cleft sentences, and rhetoric." },
    { part: "13. Spelling & Punctuation", sentence: "The museum completed its expansion; the newly restored Victorian wing opens on Tuesday.", highlight: "its", role: "Ensure flawless orthography, apostrophe accuracy, and semicolon usage." },
    { part: "14. Functional English", sentence: "Could we please have the bill whenever it is convenient for you?", highlight: "bill", role: "Confidently handle real-life situations: restaurants, hotels, flights, and interviews." },
    { part: "15. Common Mistakes", sentence: "Everyone makes mistakes when learning something new, but consistent practice brings mastery.", highlight: "makes mistakes", role: "Systematically eliminate frequent traps like Make vs Do and In/On/At." },
    { part: "16. Thinking in English", sentence: "Mentally narrating my morning commute in English accelerated my speaking response speed dramatically.", highlight: "narrating", role: "Stop translating in your head and form thoughts directly in English." },
    { part: "17. Learning Techniques", sentence: "Combining spaced repetition flashcards with daily shadowing produced dramatic fluency gains.", highlight: "spaced repetition", role: "Harness pedagogical science: Spaced Repetition, Active Recall, and Dictation." }
  ],
  conclusion: "Work through these 17 pillars systematically to build unshakeable confidence and total British English fluency."
};
