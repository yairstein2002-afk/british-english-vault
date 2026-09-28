/**
 * British English Vault - Learn & Practice Module Data Structure (100% English)
 * Comprehensive English Grammar Reference, Topics, Rules, UK Examples & Practice Quizzes.
 */

export const LEARN_CATEGORIES = [
  {
    id: 'tenses',
    titleEng: 'Verb Tenses',
    icon: 'fa-clock',
    emoji: '⏳',
    desc: 'Present, Past, and Future tenses with structures, signal words, and usage rules.'
  },
  {
    id: 'parts-of-speech',
    titleEng: 'Parts of Speech',
    icon: 'fa-cubes',
    emoji: '🧩',
    desc: 'Nouns, Articles, Quantifiers, Pronouns, Adjectives, Adverbs, and Prepositions.'
  },
  {
    id: 'syntax',
    titleEng: 'Sentence Structure & Syntax',
    icon: 'fa-diagram-project',
    emoji: '📐',
    desc: 'Word order (SVO), clause types, negation, question forms, and relative clauses.'
  },
  {
    id: 'special-verbs',
    titleEng: 'Verb Forms & Special Systems',
    icon: 'fa-bolt',
    emoji: '⚡',
    desc: 'Modal verbs, Stative vs Dynamic, Gerunds & Infinitives, Phrasal verbs, Causatives, Transitive/Intransitive.'
  },
  {
    id: 'advanced-grammar',
    titleEng: 'Advanced Grammar & British Varieties',
    icon: 'fa-graduation-cap',
    emoji: '🎓',
    desc: 'Conditionals (0-3 & Mixed), Passive Voice, Reported Speech, Inversion, Subjunctive Mood & British/American differences.'
  },
  {
    id: 'mechanics',
    titleEng: 'Mechanics & Word Formation',
    icon: 'fa-font',
    emoji: '✍️',
    desc: 'Punctuation, Capitalization, Apostrophe rules, Semicolons, Prefixes, and Suffixes.'
  }
];

export const LEARN_TOPICS = [
  // =========================================================================
  // 1. VERB TENSES
  // =========================================================================
  {
    id: 'present-simple',
    categoryId: 'tenses',
    subgroup: 'Present Tenses',
    title: 'Present Simple',
    summary: 'Used for permanent facts, habits, routines, and scheduled timetables.',
    rules: [
      {
        title: 'Core Usage',
        details: 'Scientific and natural facts, daily routines, habits, and fixed public timetables (trains, flights).'
      },
      {
        title: 'Third-Person Singular (-s / -es / -ies)',
        details: 'Add -s for standard verbs with He/She/It (walks). Add -es for sibilant endings -s, -ss, -sh, -ch, -x, -z, -o (watches, goes). Convert -y after consonant to -ies (fly -> flies).'
      },
      {
        title: 'Negation & Questions',
        details: 'Use auxiliary verbs Do / Does. When using Does/Doesn\'t, the main verb returns to its base form without -s.'
      }
    ],
    keywords: ['always', 'usually', 'often', 'sometimes', 'never', 'every day', 'once a week', 'on Mondays'],
    examples: [
      'The Earth revolves around the Sun.',
      'He always drinks Earl Grey tea in the morning.',
      'Does the train to London depart at 9:00 AM?'
    ],
    practice: [
      {
        question: 'She _____ to the library every Tuesday.',
        options: ['go', 'goes', 'is going', 'went'],
        correctIndex: 1,
        explanation: 'Third-person singular (She) in Present Simple requires the -es suffix (goes).'
      },
      {
        question: '_____ he like British biscuits with his tea?',
        options: ['Do', 'Does', 'Is', 'Are'],
        correctIndex: 1,
        explanation: 'Questions in Present Simple for He/She/It use the auxiliary verb Does.'
      }
    ]
  },
  {
    id: 'present-progressive',
    categoryId: 'tenses',
    subgroup: 'Present Tenses',
    title: 'Present Progressive / Continuous',
    summary: 'Used for actions happening right now, temporary situations, or fixed near-future arrangements.',
    rules: [
      {
        title: 'Structure',
        details: 'Subject + am/is/are + Verb-ing.'
      },
      {
        title: 'Spelling Rules for -ing',
        details: 'Drop silent -e (make -> making). Double final consonant for short CVC verbs (run -> running, stop -> stopping).'
      },
      {
        title: 'Future Arrangements',
        details: 'Expresses confirmed personal arrangements in the near future (e.g. We are meeting the manager at 3 PM).'
      }
    ],
    keywords: ['now', 'at the moment', 'currently', 'right now', 'Look!', 'Listen!', 'tonight', 'this week'],
    examples: [
      'Listen! Someone is playing the piano downstairs.',
      'We are meeting the director at 3 PM today.',
      'She is studying for her Cambridge exams this semester.'
    ],
    practice: [
      {
        question: 'Look! It _____ heavily outside.',
        options: ['rains', 'is raining', 'rained', 'was raining'],
        correctIndex: 1,
        explanation: '"Look!" indicates an action happening at this exact moment.'
      }
    ]
  },
  {
    id: 'present-perfect-simple',
    categoryId: 'tenses',
    subgroup: 'Present Tenses',
    title: 'Present Perfect Simple',
    summary: 'Used for past actions with present result or relevance, and life experiences without a specific time.',
    rules: [
      {
        title: 'Structure',
        details: 'Subject + have/has + V3 (Past Participle).'
      },
      {
        title: 'Present Perfect vs Past Simple',
        details: 'If a specific past time is stated (yesterday, in 2020), use Past Simple. If time is unspecified or ongoing, use Present Perfect.'
      },
      {
        title: 'Key Time Expressions',
        details: 'already, yet (negative/questions), ever (questions), never, just, since (starting point), for (duration).'
      }
    ],
    keywords: ['already', 'yet', 'ever', 'never', 'just', 'recently', 'since', 'for', 'so far'],
    examples: [
      'I have lived in London for three years.',
      'Have you ever visited Big Ben?',
      'She has just finished writing her essay.'
    ],
    practice: [
      {
        question: 'Have you _____ the new Oxford dictionary?',
        options: ['saw', 'seen', 'seeing', 'sees'],
        correctIndex: 1,
        explanation: 'After have/has, use the Past Participle (V3) form: seen.'
      }
    ]
  },
  {
    id: 'present-perfect-progressive',
    categoryId: 'tenses',
    subgroup: 'Present Tenses',
    title: 'Present Perfect Progressive',
    summary: 'Used for continuous actions that started in the past and continue into the present, emphasizing duration.',
    rules: [
      {
        title: 'Structure',
        details: 'Subject + have/has + been + Verb-ing.'
      },
      {
        title: 'Focus on Duration',
        details: 'Emphasizes how long an activity has been ongoing (How long... / for hours / all day).'
      }
    ],
    keywords: ['for 2 hours', 'since morning', 'all day', 'how long...'],
    examples: [
      'He has been waiting for the bus for two hours.',
      'They have been revising for their exams all week.'
    ],
    practice: [
      {
        question: 'How long _____ for the train?',
        options: ['did you wait', 'have you been waiting', 'are you waiting', 'were you waiting'],
        correctIndex: 1,
        explanation: '"How long" asks about continuous duration up to the present.'
      }
    ]
  },
  {
    id: 'past-simple',
    categoryId: 'tenses',
    subgroup: 'Past Tenses',
    title: 'Past Simple',
    summary: 'Used for completed actions at a definite, specified time in the past.',
    rules: [
      {
        title: 'Regular & Irregular Verbs',
        details: 'Regular verbs take -ed (walk -> walked). Irregular verbs use V2 second column (go -> went, buy -> bought).'
      },
      {
        title: 'Negation & Questions',
        details: 'Use Did / Didn\'t. The main verb reverts to its base form without -ed.'
      }
    ],
    keywords: ['yesterday', 'last night', 'in 2015', 'two days ago', 'when I was young'],
    examples: [
      'We visited Windsor Castle yesterday.',
      'She did not buy the tickets online.',
      'Did you watch the Premier League match last night?'
    ],
    practice: [
      {
        question: 'They _____ to Edinburgh last summer.',
        options: ['go', 'went', 'gone', 'were going'],
        correctIndex: 1,
        explanation: 'Past Simple V2 form of "go" is "went".'
      }
    ]
  },
  {
    id: 'past-progressive',
    categoryId: 'tenses',
    subgroup: 'Past Tenses',
    title: 'Past Progressive',
    summary: 'Used for an action in progress at a specific time in the past or interrupted by a shorter event.',
    rules: [
      {
        title: 'Structure',
        details: 'Subject + was/were + Verb-ing.'
      },
      {
        title: 'While vs When',
        details: 'While / As precede the ongoing background action (Past Progressive). When precedes the shorter interrupting event (Past Simple).'
      }
    ],
    keywords: ['while', 'as', 'when', 'at 8 PM yesterday'],
    examples: [
      'I was reading a book when the telephone rang.',
      'While she was cooking dinner, he was listening to the radio.'
    ],
    practice: [
      {
        question: 'While I _____ in Hyde Park, it started to rain.',
        options: ['walked', 'was walking', 'am walking', 'have walked'],
        correctIndex: 1,
        explanation: 'Action in progress in the past after "While" takes Past Progressive (was walking).'
      }
    ]
  },
  {
    id: 'past-perfect-simple',
    categoryId: 'tenses',
    subgroup: 'Past Tenses',
    title: 'Past Perfect Simple',
    summary: 'Used for an action completed before another past event ("the earlier past").',
    rules: [
      {
        title: 'Structure',
        details: 'Subject + had + V3 (Past Participle).'
      }
    ],
    keywords: ['before', 'after', 'by the time', 'already', 'because'],
    examples: [
      'The train had already left by the time we arrived at Paddington Station.'
    ],
    practice: [
      {
        question: 'When we arrived at the theatre, the play _____ .',
        options: ['already started', 'has already started', 'had already started', 'was starting'],
        correctIndex: 2,
        explanation: 'The event completed prior to another past event takes Past Perfect (had already started).'
      }
    ]
  },
  {
    id: 'past-perfect-progressive',
    categoryId: 'tenses',
    subgroup: 'Past Tenses',
    title: 'Past Perfect Progressive',
    summary: 'Used for an action that continued up until another point in the past.',
    rules: [
      {
        title: 'Structure',
        details: 'Subject + had + been + Verb-ing.'
      }
    ],
    keywords: ['had been -ing for', 'before'],
    examples: [
      'He had been driving for four hours before he stopped for lunch.'
    ],
    practice: [
      {
        question: 'They _____ for hours before the electricity went out.',
        options: ['had been studying', 'have studied', 'were studying', 'studied'],
        correctIndex: 0,
        explanation: 'Continuous ongoing duration prior to a past point takes Past Perfect Progressive.'
      }
    ]
  },
  {
    id: 'future-simple',
    categoryId: 'tenses',
    subgroup: 'Future Tenses',
    title: 'Future Simple (Will vs Be Going To)',
    summary: 'Used to express future predictions, intentions, promises, and spontaneous decisions.',
    rules: [
      {
        title: 'Will (will + base verb)',
        details: 'Spontaneous decisions at the moment of speaking, promises, offers of help, and predictions without present evidence.'
      },
      {
        title: 'Be Going To (am/is/are going to + base verb)',
        details: 'Pre-planned intentions and predictions based on present physical evidence.'
      }
    ],
    keywords: ['tomorrow', 'next week', 'in the future', 'I promise', 'I think'],
    examples: [
      'I think it will rain tomorrow in London.',
      'Look at those black clouds! It is going to rain.',
      'I will help you with your luggage.'
    ],
    practice: [
      {
        question: 'Look at the traffic! We _____ our flight.',
        options: ['will miss', 'are going to miss', 'miss', 'missed'],
        correctIndex: 1,
        explanation: 'Prediction based on present physical evidence (traffic) uses "be going to".'
      }
    ]
  },
  {
    id: 'future-progressive',
    categoryId: 'tenses',
    subgroup: 'Future Tenses',
    title: 'Future Progressive',
    summary: 'Used for an action that will be in progress at a specific time in the future.',
    rules: [
      {
        title: 'Structure',
        details: 'Subject + will be + Verb-ing.'
      }
    ],
    keywords: ['this time tomorrow', 'at 10 AM next Monday'],
    examples: [
      'This time tomorrow, I will be flying to Edinburgh.'
    ],
    practice: [
      {
        question: 'At 8 PM tonight, we _____ the football match.',
        options: ['will watch', 'will be watching', 'are watching', 'watched'],
        correctIndex: 1,
        explanation: 'Action in progress at a specific future moment takes Future Progressive.'
      }
    ]
  },
  {
    id: 'future-perfect-simple',
    categoryId: 'tenses',
    subgroup: 'Future Tenses',
    title: 'Future Perfect Simple',
    summary: 'Used for an action that will be completed before a specified point in the future.',
    rules: [
      {
        title: 'Structure',
        details: 'Subject + will have + V3 (Past Participle).'
      }
    ],
    keywords: ['by tomorrow', 'by 2030', 'by next month', 'by the time'],
    examples: [
      'By next year, she will have graduated from Oxford University.'
    ],
    practice: [
      {
        question: 'By 5 PM, I _____ the entire report.',
        options: ['will finish', 'will have finished', 'am finishing', 'finished'],
        correctIndex: 1,
        explanation: '"By 5 PM" indicates completion prior to a future point (Future Perfect).'
      }
    ]
  },
  {
    id: 'future-perfect-progressive',
    categoryId: 'tenses',
    subgroup: 'Future Tenses',
    title: 'Future Perfect Progressive',
    summary: 'Used to measure the duration of an ongoing action up to a future point in time.',
    rules: [
      {
        title: 'Structure',
        details: 'Subject + will have been + Verb-ing.'
      }
    ],
    keywords: ['by next month, for 5 years'],
    examples: [
      'By December, I will have been working at this firm for ten years.'
    ],
    practice: [
      {
        question: 'By next month, he _____ in London for five years.',
        options: ['will live', 'will have been living', 'is living', 'lived'],
        correctIndex: 1,
        explanation: 'Measuring ongoing duration leading to a future point takes Future Perfect Progressive.'
      }
    ]
  },

  // =========================================================================
  // 2. PARTS OF SPEECH
  // =========================================================================
  {
    id: 'nouns-plural',
    categoryId: 'parts-of-speech',
    subgroup: 'Nouns & Articles',
    title: 'Plural Noun Rules & Irregulars',
    summary: 'Rules for converting singular nouns to plural, including sibilants, -ves changes, and irregulars.',
    rules: [
      {
        title: 'Standard Plurals',
        details: 'Add -s to the singular noun (book -> books).'
      },
      {
        title: 'Sibilant Endings (-s, -ss, -sh, -ch, -x, -z)',
        details: 'Add -es (bus -> buses, watch -> watches, box -> boxes).'
      },
      {
        title: '-f / -fe Endings',
        details: 'Convert to -ves (wolf -> wolves, leaf -> leaves, knife -> knives).'
      },
      {
        title: 'Irregular Plurals',
        details: 'Vowel changes: man -> men, foot -> feet, tooth -> teeth, child -> children. Identical forms: sheep, deer, fish.'
      }
    ],
    keywords: ['regular plural (-s)', 'sibilants (-es)', '-ves rule', 'irregular plurals'],
    examples: [
      'The children saw three wolves in the countryside.',
      'She bought two boxes of English tea.'
    ],
    practice: [
      {
        question: 'What is the plural form of "knife"?',
        options: ['knifes', 'knives', 'knifess', 'knifies'],
        correctIndex: 1,
        explanation: 'Nouns ending in -fe change to -ves in the plural (knives).'
      }
    ]
  },
  {
    id: 'nouns-countable',
    categoryId: 'parts-of-speech',
    subgroup: 'Nouns & Articles',
    title: 'Countable vs Uncountable Nouns',
    summary: 'Distinction between countable nouns and mass/uncountable nouns.',
    rules: [
      {
        title: 'Uncountable Nouns',
        details: 'Substances, liquids, abstract concepts (water, advice, luggage, information, money, furniture). They do NOT take plural -s or a/an.'
      },
      {
        title: 'Meaning Shift',
        details: 'Some nouns shift meaning between mass and countable: paper (material) vs a paper (newspaper/essay).'
      }
    ],
    keywords: ['water', 'advice', 'information', 'luggage', 'furniture', 'money'],
    examples: [
      'Can you give me some advice on learning British English?',
      'Her luggage was lost at Heathrow Airport.'
    ],
    practice: [
      {
        question: 'Which of the following is an UNCOUNTABLE noun?',
        options: ['Apple', 'Chair', 'Information', 'Car'],
        correctIndex: 2,
        explanation: '"Information" is uncountable and cannot take a plural -s.'
      }
    ]
  },
  {
    id: 'articles-quantifiers',
    categoryId: 'parts-of-speech',
    subgroup: 'Nouns & Articles',
    title: 'Articles & Quantifiers',
    summary: 'Usage of A, An, The, Zero Article, and Quantifiers (Much, Many, Few, Little).',
    rules: [
      {
        title: 'A / An (Indefinite Article)',
        details: 'For singular countable non-specific nouns. "An" is used before a vowel sound (an apple, an hour).'
      },
      {
        title: 'The (Definite Article)',
        details: 'For specific, known nouns or unique entities (the Sun, the Thames).'
      },
      {
        title: 'Zero Article',
        details: 'Omitted before plural general nouns, languages, sports, and meals.'
      },
      {
        title: 'Quantifiers',
        details: 'Countables: many, few, a few, several. Uncountables: much, little, a little. Both: some, any, a lot of.'
      }
    ],
    keywords: ['a', 'an', 'the', 'zero article', 'many', 'much', 'some', 'any'],
    examples: [
      'He ordered a cup of tea at the station.',
      'There is much interest in British history.'
    ],
    practice: [
      {
        question: 'He is _____ honest man.',
        options: ['a', 'an', 'the', 'zero article'],
        correctIndex: 1,
        explanation: '"Honest" begins with a vowel sound (silent h), requiring "an".'
      }
    ]
  },
  {
    id: 'pronouns',
    categoryId: 'parts-of-speech',
    subgroup: 'Pronouns & Determiners',
    title: 'Pronoun System & Reflexives',
    summary: 'Subject, object, possessive adjectives, independent possessives, and reflexive pronouns.',
    rules: [
      {
        title: 'Subject vs Object Pronouns',
        details: 'Subject: I, you, he, she, it, we, they. Object: me, you, him, her, it, us, them.'
      },
      {
        title: 'Possessives',
        details: 'Possessive adjectives (before noun): my, your, his, her, its, our, their. Independent possessives (stand alone): mine, yours, his, hers, ours, theirs.'
      },
      {
        title: 'Reflexive Pronouns',
        details: 'myself, yourself, himself, herself, itself, ourselves, yourselves, themselves.'
      }
    ],
    keywords: ['I / Me', 'My / Mine', 'Myself'],
    examples: [
      'This umbrella is mine, not yours.',
      'She prepared afternoon tea herself.'
    ],
    practice: [
      {
        question: 'This book belongs to John. It is _____ .',
        options: ['him', 'his', 'he', 'himself'],
        correctIndex: 1,
        explanation: 'The independent possessive pronoun for "he" is "his".'
      }
    ]
  },
  {
    id: 'adjectives-adverbs',
    categoryId: 'parts-of-speech',
    subgroup: 'Modifiers',
    title: 'Adjectives, Adverbs & Order of Adjectives',
    summary: 'Adjective word order (OSASCOMP), comparative/superlative forms, and adverbs.',
    rules: [
      {
        title: 'Order of Adjectives (OSASCOMP)',
        details: 'Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose -> Noun. (e.g. A lovely small old round black English wooden tea table).'
      },
      {
        title: 'Comparatives & Superlatives',
        details: 'One syllable: -er / -est (tall -> taller -> tallest). Two+ syllables: more / most. Irregulars: good -> better -> best, bad -> worse -> worst.'
      },
      {
        title: 'Adverbs of Manner',
        details: 'Derived by adding -ly to adjectives (quick -> quickly). Irregulars: fast -> fast, hard -> hard, late -> late, good -> well.'
      }
    ],
    keywords: ['OSASCOMP', 'comparative', 'superlative', '-ly adverbs'],
    examples: [
      'She drives very carefully in London traffic.',
      'This building is much older than that tower.'
    ],
    practice: [
      {
        question: 'He plays the violin very _____ (good).',
        options: ['good', 'goodly', 'well', 'better'],
        correctIndex: 2,
        explanation: 'The adverb of the adjective "good" is "well".'
      }
    ]
  },
  {
    id: 'prepositions',
    categoryId: 'parts-of-speech',
    subgroup: 'Prepositions',
    title: 'Prepositions of Time & Place (At, On, In)',
    summary: 'Precise rules for prepositions of time, place, and movement.',
    rules: [
      {
        title: 'At',
        details: 'Exact times (at 5 PM, at midnight) and specific locations/points (at the bus stop, at home).'
      },
      {
        title: 'On',
        details: 'Days and dates (on Monday, on 5th July) and surfaces (on the table, on the floor).'
      },
      {
        title: 'In',
        details: 'Months, years, seasons, centuries (in July, in 2026, in summer) and enclosed/3D spaces (in London, in the room).'
      }
    ],
    keywords: ['at', 'on', 'in', 'into', 'across', 'through'],
    examples: [
      'The coronation was held in May on a rainy Saturday at 11 AM.'
    ],
    practice: [
      {
        question: 'The concert takes place _____ Friday night.',
        options: ['at', 'on', 'in', 'to'],
        correctIndex: 1,
        explanation: 'Preposition "on" is used before specific days and dates.'
      }
    ]
  },

  // =========================================================================
  // 3. SENTENCE STRUCTURE & SYNTAX
  // =========================================================================
  {
    id: 'syntax-svo',
    categoryId: 'syntax',
    subgroup: 'Basic Syntax',
    title: 'Word Order & Subject-Verb Agreement',
    summary: 'Standard Subject-Verb-Object (SVO) sequence and agreement rules.',
    rules: [
      {
        title: 'Basic Word Order (SVO)',
        details: 'Subject -> Verb -> Object.'
      },
      {
        title: 'Subject-Verb Agreement',
        details: 'Singular subjects require singular verbs. Plural subjects require plural verbs. Pronouns like "everyone", "nobody", "each" take singular verbs.'
      }
    ],
    keywords: ['SVO', 'Subject-Verb Agreement', 'everyone', 'nobody'],
    examples: [
      'Everyone in the auditorium is listening attentively to the speaker.'
    ],
    practice: [
      {
        question: 'Everyone in the team _____ a clear role.',
        options: ['have', 'has', 'having', 'are having'],
        correctIndex: 1,
        explanation: '"Everyone" is an indefinite pronoun requiring a singular verb (has).'
      }
    ]
  },
  {
    id: 'conjunctions-types',
    categoryId: 'syntax',
    subgroup: 'Clauses & Connectors',
    title: 'Sentence Types & Conjunctions',
    summary: 'Simple, compound, complex sentences, FANBOYS, and transition linkers.',
    rules: [
      {
        title: 'Compound Connectors (FANBOYS)',
        details: 'For, And, Nor, But, Or, Yet, So connect independent clauses.'
      },
      {
        title: 'Transitions by Function',
        details: 'Addition: furthermore, moreover. Contrast: however, whereas, despite. Cause/Effect: therefore, as a result.'
      }
    ],
    keywords: ['FANBOYS', 'however', 'despite', 'therefore', 'furthermore'],
    examples: [
      'He was tired; however, he continued studying for his English exam.'
    ],
    practice: [
      {
        question: '_____ the heavy rain, we went for a walk in Hyde Park.',
        options: ['Although', 'Despite', 'However', 'Because'],
        correctIndex: 1,
        explanation: '"Despite" is followed by a noun phrase to express contrast.'
      }
    ]
  },
  {
    id: 'negation-questions',
    categoryId: 'syntax',
    subgroup: 'Questions & Negation',
    title: 'Questions, Indirect Questions & Tag Questions',
    summary: 'Yes/No questions, Wh- questions, polite Indirect Questions, and Question Tags.',
    rules: [
      {
        title: 'Indirect Questions',
        details: 'Maintain positive statement word order without inversion (e.g. Could you tell me where the station is? NOT where is the station).'
      },
      {
        title: 'Question Tags',
        details: 'Positive statements take negative tags, and vice versa (e.g. You are British, aren\'t you?).'
      }
    ],
    keywords: ['Wh- questions', 'Indirect questions', 'Question tags'],
    examples: [
      'Could you tell me what time the museum opens?',
      'She lives in London, doesn\'t she?'
    ],
    practice: [
      {
        question: 'You haven\'t seen my keys, _____ you?',
        options: ['do', 'did', 'have', 'haven\'t'],
        correctIndex: 2,
        explanation: 'A negative statement (haven\'t seen) takes a positive tag (have you).'
      }
    ]
  },
  {
    id: 'relative-clauses',
    categoryId: 'syntax',
    subgroup: 'Clauses & Connectors',
    title: 'Relative Clauses (Who, Which, That, Whose)',
    summary: 'Defining vs non-defining relative clauses and relative pronoun usage.',
    rules: [
      {
        title: 'Relative Pronouns',
        details: 'who (people), which (things/animals), that (both in defining clauses), whose (possession), where (place).'
      },
      {
        title: 'Non-Defining Relative Clauses',
        details: 'Set off by commas; provide extra information. The relative pronoun "that" cannot be used in non-defining clauses!'
      }
    ],
    keywords: ['who', 'which', 'that', 'whose', 'where'],
    examples: [
      'The author who wrote Harry Potter lives in Scotland.',
      'London, which is the capital of the UK, has a rich history.'
    ],
    practice: [
      {
        question: 'The man _____ car was stolen called the police.',
        options: ['who', 'which', 'whose', 'that'],
        correctIndex: 2,
        explanation: '"Whose" indicates possession (the man\'s car).'
      }
    ]
  },

  // =========================================================================
  // 4. VERB FORMS & SPECIAL SYSTEMS
  // =========================================================================
  {
    id: 'modals',
    categoryId: 'special-verbs',
    subgroup: 'Modals',
    title: 'Modal Verbs & Modal Perfect',
    summary: 'Core modals (Can, Could, Must, Should, Might) and past modal perfect structures.',
    rules: [
      {
        title: 'Base Modal Rules',
        details: 'Modals do not take third-person -s and are followed by a bare base verb.'
      },
      {
        title: 'Modal Perfect (Past Deduction & Regret)',
        details: 'Modal + have + V3 (e.g. should have done = regret/past advice; must have been = logical past certainty).'
      }
    ],
    keywords: ['can', 'could', 'must', 'should', 'might', 'should have + V3'],
    examples: [
      'You should visit the British Museum while in London.',
      'He must have missed the train because he isn\'t here yet.'
    ],
    practice: [
      {
        question: 'You _____ an umbrella; it was raining all day!',
        options: ['should bring', 'should have brought', 'must bring', 'can bring'],
        correctIndex: 1,
        explanation: 'Expressing regret or advice about a past action uses Should have + V3.'
      }
    ]
  },
  {
    id: 'stative-verbs',
    categoryId: 'special-verbs',
    subgroup: 'Verb Properties',
    title: 'Stative vs Dynamic Verbs',
    summary: 'State verbs that avoid progressive (-ing) forms and verbs with dual meanings.',
    rules: [
      {
        title: 'Stative Verbs',
        details: 'Verbs of emotion, thought, perception, possession (love, believe, know, understand, seem, belong) do not take continuous forms.'
      },
      {
        title: 'Dual Meaning Verbs',
        details: 'Some verbs shift meaning: "I think" (opinion - stative) vs "I am thinking" (mental action - dynamic).'
      }
    ],
    keywords: ['love', 'believe', 'know', 'understand', 'think vs thinking'],
    examples: [
      'I understand the grammar rule perfectly.',
      'She is thinking about buying a flat in London.'
    ],
    practice: [
      {
        question: 'I _____ what you are saying.',
        options: ['am understanding', 'understand', 'was understanding', 'have been understanding'],
        correctIndex: 1,
        explanation: '"Understand" is a stative verb and takes simple form.'
      }
    ]
  },
  {
    id: 'gerunds-infinitives',
    categoryId: 'special-verbs',
    subgroup: 'Verb Complements',
    title: 'Gerunds vs Infinitives',
    summary: 'Determining when to use Verb-ing vs To + Base Verb.',
    rules: [
      {
        title: 'Gerunds (-ing)',
        details: 'After prepositions (interested in learning), as sentence subject (Reading is beneficial), and after specific verbs (enjoy, avoid, suggest, finish, mind).'
      },
      {
        title: 'Infinitives (To + Verb)',
        details: 'To express purpose (came to help), after adjectives (happy to meet), and after specific verbs (decide, plan, hope, want, offer).'
      }
    ],
    keywords: ['enjoy doing', 'decide to do', 'interested in doing'],
    examples: [
      'She enjoys drinking British tea in the afternoon.',
      'They decided to move to Manchester.'
    ],
    practice: [
      {
        question: 'He suggested _____ to the pub after work.',
        options: ['to go', 'going', 'go', 'went'],
        correctIndex: 1,
        explanation: 'The verb "suggest" is followed by a gerund (-ing).'
      }
    ]
  },
  {
    id: 'transitive-intransitive',
    categoryId: 'special-verbs',
    subgroup: 'Verb Properties',
    title: 'Transitive vs Intransitive Verbs',
    summary: 'Verbs requiring a direct object vs verbs operating independently (raise/rise, lay/lie).',
    rules: [
      {
        title: 'Transitive Verbs (Require Direct Object)',
        details: 'Require an object to complete meaning: raise (raise your hand), lay (lay the book down), set (set the table).'
      },
      {
        title: 'Intransitive Verbs (No Direct Object)',
        details: 'Do not take a direct object: rise (the sun rises), lie (lie down on the bed), sit (sit in the chair).'
      }
    ],
    keywords: ['raise vs rise', 'lay vs lie', 'set vs sit', 'direct object'],
    examples: [
      'Prices continue to rise in London.',
      'Please raise your hand if you have a question.'
    ],
    practice: [
      {
        question: 'The Sun _____ in the east every morning.',
        options: ['raises', 'rises', 'lays', 'sets'],
        correctIndex: 1,
        explanation: '"Rise" is intransitive and does not require a direct object.'
      }
    ]
  },
  {
    id: 'emphatic-do',
    categoryId: 'special-verbs',
    subgroup: 'Emphasis',
    title: 'Emphatic Do / Does / Did',
    summary: 'Using auxiliary "do" in positive statements for strong emphasis or polite invitation.',
    rules: [
      {
        title: 'Strong Affirmation & Contrast',
        details: 'Insert Do/Does/Did before base verb to contradict doubt or add passion (e.g. I DO love British tea!).'
      },
      {
        title: 'Polite British Imperatives',
        details: 'Use "Do" before imperative verbs for warm, polite hospitality (e.g. Do sit down! Do have another biscuit!).'
      }
    ],
    keywords: ['I do believe', 'Do sit down!', 'emphatic stress'],
    examples: [
      'I may not speak fluently, but I do understand everything.',
      'Do come in and make yourself at home!'
    ],
    practice: [
      {
        question: 'Please, _____ sit down and enjoy a cup of tea!',
        options: ['do', 'does', 'did', 'done'],
        correctIndex: 0,
        explanation: 'Emphatic "Do" adds polite British warmth to imperatives.'
      }
    ]
  },
  {
    id: 'phrasal-verbs',
    categoryId: 'special-verbs',
    subgroup: 'Phrasal Verbs',
    title: 'Phrasal Verbs & Separability',
    summary: 'Verb + preposition/adverb combinations and pronoun separation rules.',
    rules: [
      {
        title: 'Separable Phrasal Verbs',
        details: 'If the object is a pronoun (it, them), it MUST go between verb and particle (turn it on, take them off).'
      },
      {
        title: 'Inseparable Phrasal Verbs',
        details: 'The object always follows the entire phrasal verb (look after him, run into a friend).'
      }
    ],
    keywords: ['give up', 'take off', 'look after', 'turn on/off'],
    examples: [
      'Please turn the lights off -> Please turn them off.',
      'She looks after her grandmother every weekend.'
    ],
    practice: [
      {
        question: 'Please turn the radio _____ ; it is too loud.',
        options: ['off', 'on', 'up', 'in'],
        correctIndex: 0,
        explanation: '"Turn off" means to deactivate or stop.'
      }
    ]
  },
  {
    id: 'causative-verbs',
    categoryId: 'special-verbs',
    subgroup: 'Causative Structures',
    title: 'Causative Verbs & Passive Causative',
    summary: 'Structures for forcing, allowing, or arranging actions (Let, Make, Have, Get).',
    rules: [
      {
        title: 'Let / Make / Have',
        details: 'Let/Make/Have + person + Base Verb (She made him clean the room).'
      },
      {
        title: 'Get',
        details: 'Get + person + TO + Base Verb (I got him to fix the car).'
      },
      {
        title: 'Passive Causative',
        details: 'have/get + object + V3 (I had my car repaired by a professional mechanic).'
      }
    ],
    keywords: ['make someone do', 'get someone to do', 'have something done'],
    examples: [
      'She had her roof repaired last week.',
      'The teacher made the students rewrite the assignment.'
    ],
    practice: [
      {
        question: 'I had my hair _____ yesterday.',
        options: ['cut', 'cutting', 'to cut', 'cuts'],
        correctIndex: 0,
        explanation: 'Passive Causative: have + object + V3 (cut).'
      }
    ]
  },

  // =========================================================================
  // 5. ADVANCED GRAMMAR & BRITISH VARIETIES
  // =========================================================================
  {
    id: 'conditionals',
    categoryId: 'advanced-grammar',
    subgroup: 'Conditionals',
    title: 'Conditionals (0, 1, 2, 3 & Mixed)',
    summary: 'Real, unreal, hypothetical, past regrets, and mixed conditional structures.',
    rules: [
      {
        title: 'Zero Conditional (General Truths)',
        details: 'If + Present Simple, Present Simple (If you heat ice, it melts).'
      },
      {
        title: 'First Conditional (Real Future)',
        details: 'If + Present Simple, Will + base verb (If it rains, I will take an umbrella).'
      },
      {
        title: 'Second Conditional (Unreal Present/Future)',
        details: 'If + Past Simple, Would + base verb (If I won the lottery, I would buy a castle).'
      },
      {
        title: 'Third Conditional (Past Regrets)',
        details: 'If + Past Perfect, Would have + V3 (If I had studied, I would have passed).'
      }
    ],
    keywords: ['Zero', 'First', 'Second', 'Third', 'Mixed Conditionals'],
    examples: [
      'If I had known about the meeting, I would have attended.',
      'If you mix red and blue, you get purple.'
    ],
    practice: [
      {
        question: 'If I _____ more free time, I would learn Welsh.',
        options: ['have', 'had', 'had had', 'will have'],
        correctIndex: 1,
        explanation: 'Second Conditional unreal present takes Past Simple in the IF clause.'
      }
    ]
  },
  {
    id: 'subjunctive-mood',
    categoryId: 'advanced-grammar',
    subgroup: 'Advanced Structures',
    title: 'Subjunctive Mood',
    summary: 'Formal expressions of demand, urgency, necessity, or unreal hypothetical situations.',
    rules: [
      {
        title: 'Present Subjunctive (Mandatory Base Verb)',
        details: 'After verbs/adjectives of demand, requirement, or recommendation (insist, demand, recommend, vital, crucial), use the bare base verb for ALL persons without third-person -s (e.g. It is vital that he BE present).'
      },
      {
        title: 'Past Subjunctive (Were)',
        details: 'Use "were" instead of "was" for all subjects in unreal hypothetical clauses (e.g. If I WERE you, I would accept).'
      }
    ],
    keywords: ['insist that he be', 'vital that she go', 'If I were you'],
    examples: [
      'The chairman insisted that he attend the summit.',
      'If I were you, I would take the train to Edinburgh.'
    ],
    practice: [
      {
        question: 'It is essential that she _____ informed immediately.',
        options: ['is', 'be', 'was', 'been'],
        correctIndex: 1,
        explanation: 'Formal subjunctive requirement requires bare base verb "be".'
      }
    ]
  },
  {
    id: 'ellipsis-substitution',
    categoryId: 'advanced-grammar',
    subgroup: 'Advanced Structures',
    title: 'Ellipsis & Substitution',
    summary: 'Omitting repetitive words or using substitutes (so, do, neither, nor).',
    rules: [
      {
        title: 'Substitution with "So" & "Neither"',
        details: 'Agreement: "So do I" (positive), "Neither do I" (negative). Short response: "I think so", "I hope so", "I suppose so".'
      },
      {
        title: 'Ellipsis (Word Omission)',
        details: 'Omitting redundant words when context is clear (e.g. "Are you coming?" - "I\'d love to [come]").'
      }
    ],
    keywords: ['So do I', 'Neither do I', 'I hope so', 'ellipsis'],
    examples: [
      '"I love British tea." - "So do I!"',
      '"Will it rain today?" - "I hope not."'
    ],
    practice: [
      {
        question: '"I don\'t like cold weather." - "_____ do I."',
        options: ['So', 'Neither', 'Also', 'Either'],
        correctIndex: 1,
        explanation: 'Agreement with a negative statement uses "Neither do I".'
      }
    ]
  },
  {
    id: 'british-vs-american',
    categoryId: 'advanced-grammar',
    subgroup: 'British Varieties',
    title: 'British vs American English Rules',
    summary: 'Key grammar, spelling, and usage differences between UK and US English.',
    rules: [
      {
        title: 'Collective Nouns Agreement',
        details: 'UK English treats collective nouns as plural or singular depending on context (e.g. The team ARE playing well / The government HAVE decided). US English treats them strictly as singular.'
      },
      {
        title: 'Have vs Have Got',
        details: 'UK English frequently uses "have got" for possession (I\'ve got a new car), whereas US English favors "have" (I have a new car).'
      },
      {
        title: 'Spelling Variations',
        details: 'UK: -our (colour), -ise (organise), -re (centre), doubling l in past tense (travelled). US: -or (color), -ize (organize), -er (center), single l (traveled).'
      }
    ],
    keywords: ['have got', 'collective nouns ARE', 'colour vs color', 'travelled vs traveled'],
    examples: [
      'The England team are confident about winning tonight.',
      'Have you got any change for the bus?'
    ],
    practice: [
      {
        question: 'In UK English, which spelling is standard for "colour"?',
        options: ['color', 'colour', 'culur', 'coler'],
        correctIndex: 1,
        explanation: 'UK English uses the "-our" suffix (colour, honour, harbour).'
      }
    ]
  },

  // =========================================================================
  // 6. MECHANICS & WORD FORMATION
  // =========================================================================
  {
    id: 'punctuation-capitalization',
    categoryId: 'mechanics',
    subgroup: 'Punctuation & Mechanics',
    title: 'Capitalization & Apostrophe Rules',
    summary: 'Rules for capital letters, possessive apostrophes, and contraction clarity.',
    rules: [
      {
        title: 'Capital Letters',
        details: 'Sentence starts, proper nouns, days, months, languages, nationalities, and the pronoun I.'
      },
      {
        title: 'Possessive Apostrophes',
        details: 'Singular noun: the boy\'s book. Plural noun ending in s: the boys\' school. Critical distinction: It\'s = It is vs Its = possessive pronoun.'
      }
    ],
    keywords: ['Capital letters', 'Apostrophe', "it's vs its"],
    examples: [
      'The cat chased its tail.',
      'It\'s raining in London today.'
    ],
    practice: [
      {
        question: 'The dog wagged _____ tail happily.',
        options: ['it\'s', 'its', 'its\'', 'it'],
        correctIndex: 1,
        explanation: '"Its" without an apostrophe is the possessive pronoun.'
      }
    ]
  },
  {
    id: 'advanced-punctuation',
    categoryId: 'mechanics',
    subgroup: 'Punctuation & Mechanics',
    title: 'Semicolons, Colons, Hyphens & Dashes',
    summary: 'Advanced punctuation mechanics for academic and formal written English.',
    rules: [
      {
        title: 'Semicolons (;)',
        details: 'Connect two closely related independent clauses without a conjunction (e.g. The rain was heavy; we decided to stay indoors).'
      },
      {
        title: 'Colons (:)',
        details: 'Introduce a list, explanation, or direct quotation following a complete independent clause.'
      },
      {
        title: 'Hyphens (-) vs Dashes (--)',
        details: 'Hyphens join compound words (well-known, thirty-two). Em-dashes set off emphatic parenthetical thoughts.'
      }
    ],
    keywords: ['semicolon ;', 'colon :', 'hyphen -', 'em dash'],
    examples: [
      'London is a global capital; it attracts millions of visitors annually.',
      'She had one goal: to master British English.'
    ],
    practice: [
      {
        question: 'Which punctuation mark joins two closely related independent clauses without a conjunction?',
        options: ['Comma', 'Semicolon', 'Hyphen', 'Apostrophe'],
        correctIndex: 1,
        explanation: 'A semicolon (;) connects related independent clauses.'
      }
    ]
  },
  {
    id: 'word-formation',
    categoryId: 'mechanics',
    subgroup: 'Morphology',
    title: 'Prefixes, Suffixes & Word Formation',
    summary: 'Deriving nouns, verbs, adjectives, and adverbs using prefixes and suffixes.',
    rules: [
      {
        title: 'Negation Prefixes',
        details: 'un- (unhappy), in- (informal), im- (impossible), il- (illegal), ir- (irregular), dis- (disagree).'
      },
      {
        title: 'Derivational Suffixes',
        details: 'Nouns: -tion, -ment, -ness, -ity. Adjectives: -ful, -less, -able, -ous. Verbs: -ize/-ise, -ify. Adverbs: -ly.'
      }
    ],
    keywords: ['un-', 'dis-', '-tion', '-ment', '-ful', '-less'],
    examples: [
      'Learning English requires patience and dedication.',
      'It is illegal to park here.'
    ],
    practice: [
      {
        question: 'What is the opposite of "possible"?',
        options: ['unpossible', 'inpossible', 'impossible', 'dispossible'],
        correctIndex: 2,
        explanation: 'The prefix im- attaches to words beginning with p or m (impossible).'
      }
    ]
  }
];
