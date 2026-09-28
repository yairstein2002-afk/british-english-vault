/**
 * British English Vault - Learn & Practice Module Data Structure
 * Contains full hierarchy of Grammar topics, detailed rules, examples, and practice quizzes.
 */

export const LEARN_CATEGORIES = [
  {
    id: 'tenses',
    titleEng: 'Verb Tenses',
    titleHeb: 'מערכת הזמנים',
    icon: 'fa-clock',
    emoji: '⏳',
    desc: 'Present, Past, and Future tenses with rules, structures, and signal words.'
  },
  {
    id: 'parts-of-speech',
    titleEng: 'Parts of Speech',
    titleHeb: 'חלקי הדיבור',
    icon: 'fa-cubes',
    emoji: '🧩',
    desc: 'Nouns, Articles, Quantifiers, Pronouns, Adjectives, Adverbs, and Prepositions.'
  },
  {
    id: 'syntax',
    titleEng: 'Sentence Structure & Syntax',
    titleHeb: 'תחביר ומבנה המשפט',
    icon: 'fa-diagram-project',
    emoji: '📐',
    desc: 'Word order (SVO), clause types, negation, question forms, and relative clauses.'
  },
  {
    id: 'special-verbs',
    titleEng: 'Verb Forms & Special Systems',
    titleHeb: 'צורות פועל מיוחדות',
    icon: 'fa-bolt',
    emoji: '⚡',
    desc: 'Modal verbs, Stative vs Dynamic, Gerunds & Infinitives, Phrasal verbs, Causatives.'
  },
  {
    id: 'advanced-grammar',
    titleEng: 'Advanced Grammar',
    titleHeb: 'דקדוק ומבנים מתקדמים',
    icon: 'fa-graduation-cap',
    emoji: '🎓',
    desc: 'Conditionals (0-3 & Mixed), Passive Voice, Reported Speech, Inversion & Clefts.'
  },
  {
    id: 'mechanics',
    titleEng: 'Mechanics & Morphology',
    titleHeb: 'מכניקה, פיסוק ותצורת מילים',
    icon: 'fa-font',
    emoji: '✍️',
    desc: 'Punctuation, Capitalization, Apostrophe rules, Prefixes, and Suffixes.'
  }
];

export const LEARN_TOPICS = [
  // =========================================================================
  // 1. VERB TENSES (מערכת הזמנים)
  // =========================================================================
  {
    id: 'present-simple',
    categoryId: 'tenses',
    subgroup: ' זמני הווה (Present Tenses)',
    title: 'Present Simple (הווה פשוט)',
    summary: 'שימוש: עובדות קבועות, הרגלים, ולוחות זמנים קבועים.',
    rules: [
      {
        title: 'שימושים עיקריים',
        details: 'עובדות טבעיות ומדעיות, הרגלים ושגרה (Daily Routine), ולוחות זמנים (תחבורה ציבורית, שיעורים).'
      },
      {
        title: 'חוק ה-s / es / ies (גוף שלישי יחיד - He/She/It)',
        details: 'פועל רגיל מקבל -s (e.g. walks). סיומות שורקות (s, ss, sh, ch, x, z, o) מקבלות -es (e.g. watches, goes). סיומת y אחרי עיצור נהפכת ל-ies (e.g. fly -> flies).'
      },
      {
        title: 'שלילה ושאלה (Negative & Questions)',
        details: 'משתמשים בפעלי העזר Do / Does. בשאלה ושלילה עם Does, הפועל העיקרי חוזר לצורת הבסיס (Base Form) ללא -s!'
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
        question: 'She _____ (go) to the library every Tuesday.',
        options: ['go', 'goes', 'is going', 'went'],
        correctIndex: 1,
        explanation: 'גוף שלישי יחיד (She) בהווה פשוט לקוח פועל עם סיומת -es.'
      },
      {
        question: '_____ he like British biscuits with his tea?',
        options: ['Do', 'Does', 'Is', 'Are'],
        correctIndex: 1,
        explanation: 'בשאלות בהווה פשוט לגוף שלישי יחיד (He) משתמשים בפועל העזר Does.'
      },
      {
        question: 'Water _____ (boil) at 100 degrees Celsius.',
        options: ['is boiling', 'boils', 'boil', 'boiled'],
        correctIndex: 1,
        explanation: 'עובדה מדעית קבועה מבוטאת ב-Present Simple.'
      }
    ]
  },
  {
    id: 'present-progressive',
    categoryId: 'tenses',
    subgroup: ' זמני הווה (Present Tenses)',
    title: 'Present Progressive / Continuous (הווה ממושך)',
    summary: 'שימוש: פעולות המתרחשות עכשיו ברגע זה, או תוכניות מוגדרות לעתיד הקרוב.',
    rules: [
      {
        title: 'מבנה המשפט',
        details: 'Subject + am/is/are + Verb-ing.'
      },
      {
        title: 'חוקי כתיב לסיומת -ing',
        details: 'השמטת e שקטה (make -> making). הכפלת עיצור במילה קצרה של עיצור-תנועה-עיצור (run -> running, stop -> stopping).'
      },
      {
        title: 'שימוש לתוכניות עתידיות',
        details: 'מבטא תוכניות וסידורים סגורים לעתיד הקרוב (Future Arrangements).'
      }
    ],
    keywords: ['now', 'at the moment', 'currently', 'right now', 'Look!', 'Listen!', 'tonight', 'this week'],
    examples: [
      'Listen! Someone is playing the piano downstairs.',
      'We are meeting the manager at 3 PM today.',
      'She is studying for her Cambridge exams this semester.'
    ],
    practice: [
      {
        question: 'Look! It _____ (rain) heavily outside.',
        options: ['rains', 'is raining', 'rained', 'was raining'],
        correctIndex: 1,
        explanation: 'מילת הזירוז "Look!" מצביעה על פעולה המתרחשת ברגע זה.'
      },
      {
        question: 'They _____ (travel) to Manchester tomorrow morning.',
        options: ['are traveling', 'travels', 'traveled', 'do travel'],
        correctIndex: 0,
        explanation: 'תוכניות סגורות לעתיד הקרוב מבוטאות ב-Present Progressive.'
      }
    ]
  },
  {
    id: 'present-perfect-simple',
    categoryId: 'tenses',
    subgroup: ' זמני הווה (Present Tenses)',
    title: 'Present Perfect Simple (הווה מושלם)',
    summary: 'שימוש: פעולות עבר עם השפעה ישירה על ההווה, או חוויות חיים ללא זמן מוגדר.',
    rules: [
      {
        title: 'מבנה המשפט',
        details: 'Subject + have/has + V3 (Past Participle).'
      },
      {
        title: 'הבחנה חשובה מול Past Simple',
        details: 'אם מצוין זמן מדויק בעבר (yesterday, in 2020) משתמשים ב-Past Simple. ב-Present Perfect הזמן המדויק אינו ידוע או אינו חשוב.'
      },
      {
        title: 'מילות מפתח עיקריות',
        details: 'already, yet (בשלילה ושאלה), ever (בשאלות), never, just, since (נקודת התחלה), for (משך זמן).'
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
        question: 'Have you _____ (see) the new Oxford dictionary?',
        options: ['saw', 'seen', 'seeing', 'sees'],
        correctIndex: 1,
        explanation: 'אחרי have/has נדרשת צורת ה-V3 (Past Participle) של הפועל, שהיא seen.'
      },
      {
        question: 'She hasn\'t called me _____ .',
        options: ['already', 'yet', 'ever', 'since'],
        correctIndex: 1,
        explanation: 'המילה yet מופיעה בסוף משפטי שלילה ושאלה ב-Present Perfect.'
      }
    ]
  },
  {
    id: 'present-perfect-progressive',
    categoryId: 'tenses',
    subgroup: ' זמני הווה (Present Tenses)',
    title: 'Present Perfect Progressive (הווה מושלם ממושך)',
    summary: 'שימוש: פעולה שהחלה בעבר ונמשכת ברציפות עד ההווה, או פעולה שהסתיימה זה עתה עם תוצאה נראית לעין.',
    rules: [
      {
        title: 'מבנה המשפט',
        details: 'Subject + have/has + been + Verb-ing.'
      },
      {
        title: 'דגש על המשכיות ומאמץ',
        details: 'משמש להדגשת משך הזמן שבו הפעולה התרחשה ברצף (How long...).'
      }
    ],
    keywords: ['for 2 hours', 'since morning', 'all day', 'how long...'],
    examples: [
      'He has been waiting for the bus for two hours.',
      'They have been revising for their exams all week.',
      'My hands are dirty because I have been repairing the bicycle.'
    ],
    practice: [
      {
        question: 'How long _____ (you / wait) for the train?',
        options: ['did you wait', 'have you been waiting', 'are you waiting', 'were you waiting'],
        correctIndex: 1,
        explanation: 'השאלה How long מצביעה על משך רציף מהעבר עד ההווה.'
      }
    ]
  },
  {
    id: 'past-simple',
    categoryId: 'tenses',
    subgroup: ' זמני עבר (Past Tenses)',
    title: 'Past Simple (עבר פשוט)',
    summary: 'שימוש: פעולה שהסתיימה לחלוטין בעבר בנקודת זמן ידועה ומוגדרת.',
    rules: [
      {
        title: 'מבנה המשפט',
        details: 'פעלים רגילים מקבלים סיומת -ed (e.g. walked). פעלים יוצאי דופן (Irregular Verbs) משתמשים בטור השני (V2) (e.g. go -> went).'
      },
      {
        title: 'שלילה ושאלות',
        details: 'משתמשים בפועל העזר Did / Didn\'t. הפועל העיקרי חוזר לצורת הבסיס (Base form) ללא הטיה!'
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
        question: 'They _____ (go) to Edinburgh last summer.',
        options: ['go', 'went', 'gone', 'were going'],
        correctIndex: 1,
        explanation: 'צורת ה-V2 (Past Simple) של הפועל go היא went.'
      },
      {
        question: 'Did you _____ (receive) my letter yesterday?',
        options: ['received', 'receive', 'receiving', 'receives'],
        correctIndex: 1,
        explanation: 'אחרי פועל העזר Did בשאלה, הפועל העיקרי מופיע בצורת הבסיס (receive).'
      }
    ]
  },
  {
    id: 'past-progressive',
    categoryId: 'tenses',
    subgroup: ' זמני עבר (Past Tenses)',
    title: 'Past Progressive (עבר ממושך)',
    summary: 'שימוש: פעולה שנמשכה בנקודת זמן ספציפית בעבר, או רקע לפעולה קצרה שקטעה אותה.',
    rules: [
      {
        title: 'מבנה המשפט',
        details: 'Subject + was/were + Verb-ing.'
      },
      {
        title: 'שילוב עם While ו-When',
        details: 'While / As מקדימים פעולה ממושכת (Past Progressive). When מקדים פעולה קצרה שקוטעת (Past Simple).'
      }
    ],
    keywords: ['while', 'as', 'when', 'at 8 PM yesterday'],
    examples: [
      'I was reading a book when the telephone rang.',
      'While she was cooking dinner, he was listening to the radio.'
    ],
    practice: [
      {
        question: 'While I _____ (walk) in the park, it started to rain.',
        options: ['walked', 'was walking', 'am walking', 'have walked'],
        correctIndex: 1,
        explanation: 'אחרי While מופיע תיאור הפעולה הממושכת ברקע ב-Past Progressive.'
      }
    ]
  },
  {
    id: 'past-perfect-simple',
    categoryId: 'tenses',
    subgroup: ' זמני עבר (Past Tenses)',
    title: 'Past Perfect Simple (עבר מושלם)',
    summary: 'שימוש: פעולה שהסתיימה בעבר לפני פעולה אחרת שאף היא התרחשה בעבר ("העבר המוקדם").',
    rules: [
      {
        title: 'מבנה המשפט',
        details: 'Subject + had + V3 (Past Participle).'
      }
    ],
    keywords: ['before', 'after', 'by the time', 'already', 'because'],
    examples: [
      'The train had already left by the time we arrived at Paddington Station.',
      'She failed the exam because she had not prepared.'
    ],
    practice: [
      {
        question: 'When we arrived at the theatre, the play _____ (already / start).',
        options: ['already started', 'has already started', 'had already started', 'was starting'],
        correctIndex: 2,
        explanation: 'הצגת האירוע שהתרחש קודם לכן בעבר ב-Past Perfect (had + V3).'
      }
    ]
  },
  {
    id: 'past-perfect-progressive',
    categoryId: 'tenses',
    subgroup: ' זמני עבר (Past Tenses)',
    title: 'Past Perfect Progressive (עבר מושלם ממושך)',
    summary: 'שימוש: פעולה שנמשכה ברציפות בעבר עד שנקטעה על ידי אירוע אחר בעבר.',
    rules: [
      {
        title: 'מבנה המשפט',
        details: 'Subject + had + been + Verb-ing.'
      }
    ],
    keywords: ['had been -ing for', 'before'],
    examples: [
      'He had been driving for four hours before he stopped for lunch.'
    ],
    practice: [
      {
        question: 'They _____ (study) for hours before the electricity went out.',
        options: ['had been studying', 'have studied', 'were studying', 'studied'],
        correctIndex: 0,
        explanation: 'תיאור המשכיות רציפה לפני נקודת זמן בעבר ב-Past Perfect Progressive.'
      }
    ]
  },
  {
    id: 'future-simple',
    categoryId: 'tenses',
    subgroup: ' זמני עתיד (Future Tenses)',
    title: 'Future Simple (Will vs Be Going To)',
    summary: 'שימוש: הבעת כוונות, תוכניות, תחזיות והחלטות לעתיד.',
    rules: [
      {
        title: 'שימוש ב-Will (will + base verb)',
        details: 'החלטות ספונטניות ברגע הדיבור, הבטחות, הצעות עזרה, ותחזיות ללא הוכחה בשטח.'
      },
      {
        title: 'שימוש ב-Be Going To (am/is/are going to + base verb)',
        details: 'תוכנית וכוונה שתוכננה מראש, או תחזית המבוססת על ראיה ברורה בשטח (e.g. Look at those dark clouds!).'
      }
    ],
    keywords: ['tomorrow', 'next week', 'in the future', 'I promise', 'I think'],
    examples: [
      'I think it will rain tomorrow in London.',
      'Look at those black clouds! It is going to rain.',
      'I will help you with your suitcase.'
    ],
    practice: [
      {
        question: 'Look at the traffic! We _____ (miss) our flight.',
        options: ['will miss', 'are going to miss', 'miss', 'missed'],
        correctIndex: 1,
        explanation: 'תחזית על בסיס ראייה ברורה בשטח (הפקק) מבוטאת ב-Be going to.'
      }
    ]
  },
  {
    id: 'future-progressive',
    categoryId: 'tenses',
    subgroup: ' זמני עתיד (Future Tenses)',
    title: 'Future Progressive (עתיד ממושך)',
    summary: 'שימוש: פעולה שתהיה בעיצומה בזמן ספציפי ומוגדר בעתיד.',
    rules: [
      {
        title: 'מבנה המשפט',
        details: 'Subject + will be + Verb-ing.'
      }
    ],
    keywords: ['this time tomorrow', 'at 10 AM next Monday'],
    examples: [
      'This time tomorrow, I will be flying to Edinburgh.'
    ],
    practice: [
      {
        question: 'At 8 PM tonight, we _____ (watch) the football match.',
        options: ['will watch', 'will be watching', 'are watching', 'watched'],
        correctIndex: 1,
        explanation: 'פעולה שתהיה בעיצומה בזמן ספציפי בעתיד ב-Future Progressive.'
      }
    ]
  },
  {
    id: 'future-perfect-simple',
    categoryId: 'tenses',
    subgroup: ' זמני עתיד (Future Tenses)',
    title: 'Future Perfect Simple (עתיד מושלם)',
    summary: 'שימוש: פעולה שתושלם עד נקודת זמן מסוימת בעתיד.',
    rules: [
      {
        title: 'מבנה המשפט',
        details: 'Subject + will have + V3 (Past Participle).'
      }
    ],
    keywords: ['by tomorrow', 'by 2030', 'by next month', 'by the time'],
    examples: [
      'By next year, she will have graduated from Oxford University.'
    ],
    practice: [
      {
        question: 'By 5 PM, I _____ (finish) the entire report.',
        options: ['will finish', 'will have finished', 'am finishing', 'finished'],
        correctIndex: 1,
        explanation: 'הביטוי "By 5 PM" מורה על השלמת הדיווח עד נקודת הזמן בעתיד.'
      }
    ]
  },
  {
    id: 'future-perfect-progressive',
    categoryId: 'tenses',
    subgroup: ' זמני עתיד (Future Tenses)',
    title: 'Future Perfect Progressive (עתיד מושלם ממושך)',
    summary: 'שימוש: מדידת משך הזמן שפעולה תימשך עד נקודה עתידית מסוימת.',
    rules: [
      {
        title: 'מבנה המשפט',
        details: 'Subject + will have been + Verb-ing.'
      }
    ],
    keywords: ['by next month, for 5 years'],
    examples: [
      'By December, I will have been working at this firm for ten years.'
    ],
    practice: [
      {
        question: 'By next month, he _____ (live) in London for five years.',
        options: ['will live', 'will have been living', 'is living', 'lived'],
        correctIndex: 1,
        explanation: 'מדידת משך זמן רציף עד נקודת זמן בעתיד.'
      }
    ]
  },

  // =========================================================================
  // 2. PARTS OF SPEECH (חלקי הדיבור)
  // =========================================================================
  {
    id: 'nouns-plural',
    categoryId: 'parts-of-speech',
    subgroup: '2.1 שמות עצם (Nouns)',
    title: 'Nouns & Plural Rules (שמות עצם וחוקי ריבוי)',
    summary: 'חוקי הפיכת שם עצם מיחיד לרבים, כולל סיומות מיוחדות ויוצאי דופן.',
    rules: [
      {
        title: 'ריבוי רגיל',
        details: 'הוספת -s בסוף המילה (book -> books, cat -> cats).'
      },
      {
        title: 'סיומות שורקות (s, ss, sh, ch, x, z)',
        details: 'הוספת -es (bus -> buses, watch -> watches, box -> boxes).'
      },
      {
        title: 'סיומת -y',
        details: 'אחרי עיצור: הופך ל-ies (city -> cities). אחרי תנועה: מוסיפים s בלבד (boy -> boys).'
      },
      {
        title: 'סיומות -f / -fe',
        details: 'הופך ל-ves (wolf -> wolves, leaf -> leaves, knife -> knives).'
      },
      {
        title: 'יוצאי דופן (Irregular Plurals)',
        details: 'שינוי תנועות: man -> men, woman -> women, foot -> feet, tooth -> teeth, child -> children, mouse -> mice. מילים זהות ביחיד וברבים: sheep, deer, fish.'
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
        explanation: 'סיומת fe הופכת ל-ves בצורת הרבים (knives).'
      }
    ]
  },
  {
    id: 'nouns-countable',
    categoryId: 'parts-of-speech',
    subgroup: '2.1 שמות עצם (Nouns)',
    title: 'Countable vs Uncountable Nouns (ספירים מול בלתי ספירים)',
    summary: 'הבחנה בין שמות עצם שניתן לספור לשמות עצם שאינם ניתנים לספירה יחידנית.',
    rules: [
      {
        title: 'שמות עצם בלתי ספירים (Uncountable)',
        details: 'חומרים, נוזלים, מושגים מופשטים (water, advice, luggage, information, money, furniture). אינם מקבלים s בריבוי ואינם מקבלים a/an!'
      },
      {
        title: 'שינוי משמעות',
        details: 'מילים מסוימות משנות משמעות: paper (חומר נייר - בלתי ספיר) מול a paper (עיתון/מאמר - ספיר).'
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
        explanation: 'Information הוא שם עצם בלתי ספיר שאינו מקבל s בריבוי.'
      }
    ]
  },
  {
    id: 'articles-quantifiers',
    categoryId: 'parts-of-speech',
    subgroup: '2.2 תוויות יידוע וכמות (Articles & Quantifiers)',
    title: 'Articles & Quantifiers (תוויות יידוע וכמות)',
    summary: 'שימוש ב-A, An, The, Zero Article ובמילות כמות כגון Much, Many, Some, Any.',
    rules: [
      {
        title: 'A / An (תווית בלתי מיודעת)',
        details: 'לשם עצם יחיד ספיר לא ספציפי. An בא לפני צליל תנועה (an apple, an hour).'
      },
      {
        title: 'The (תווית מיודעת)',
        details: 'לשם עצם ספציפי, ידוע לשני הצדדים, או דבר יחיד בעולם (the Sun, the Thames).'
      },
      {
        title: 'Zero Article (השמטה)',
        details: 'לפני שמות עצם כלליים ברבים, שפות, מקצועות ספורט, וארוחות.'
      },
      {
        title: 'כמותיים (Quantifiers)',
        details: 'לספירים: many, few, a few, several. לבלתי ספירים: much, little, a little. לשניהם: some, any, a lot of.'
      }
    ],
    keywords: ['a', 'an', 'the', 'zero article', 'many', 'much', 'some', 'any'],
    examples: [
      'He ordered a cup of coffee at the station.',
      'There is much interest in British history.',
      'Do you have any questions about the rule?'
    ],
    practice: [
      {
        question: 'He is _____ honest man.',
        options: ['a', 'an', 'the', 'zero article'],
        correctIndex: 1,
        explanation: 'המילה honest מתחילה בצליל תנועה (h שקטה), ולכן מקבלת an.'
      }
    ]
  },
  {
    id: 'pronouns',
    categoryId: 'parts-of-speech',
    subgroup: '2.3 כינויי גוף (Pronouns)',
    title: 'Pronouns System (כינויי גוף, שייכות וכינויים חוזרים)',
    summary: 'כינויי נושא, מושא, תארי שייכות, כינויי שייכות עצמאיים וכינויים חוזרים.',
    rules: [
      {
        title: 'כינויי נושא מול מושא',
        details: 'Subject: I, you, he, she, it, we, they. Object: me, you, him, her, it, us, them.'
      },
      {
        title: 'כינויי שייכות (Possessives)',
        details: 'תוארי שייכות (לפני שם עצם): my, your, his, her, its, our, their. כינויי שייכות עצמאיים (ללא שם עצם): mine, yours, his, hers, ours, theirs.'
      },
      {
        title: 'כינויים חוזרים (Reflexive Pronouns)',
        details: 'myself, yourself, himself, herself, itself, ourselves, yourselves, themselves.'
      }
    ],
    keywords: ['I / Me', 'My / Mine', 'Myself'],
    examples: [
      'This umbrella is mine, not yours.',
      'She prepared the British afternoon tea herself.'
    ],
    practice: [
      {
        question: 'This book belongs to John. It is _____ .',
        options: ['him', 'his', 'he', 'himself'],
        correctIndex: 1,
        explanation: 'כינוי שייכות עצמאי לגוף שלישי זכר הוא his.'
      }
    ]
  },
  {
    id: 'adjectives-adverbs',
    categoryId: 'parts-of-speech',
    subgroup: '2.4 שמות תואר ותוארי הפועל (Adjectives & Adverbs)',
    title: 'Adjectives & Adverbs (תארים, תוארי פועל וסדר תארים)',
    summary: 'סדר תארים במשפט, דרגות השוואה והפלגה, ותוארי פועל.',
    rules: [
      {
        title: 'סדר שמות תואר (Order of Adjectives)',
        details: 'OSASCOMP: Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose -> Noun. (e.g. A beautiful small old round black English wooden tea table).'
      },
      {
        title: 'השוואה והפלגה (Comparatives & Superlatives)',
        details: 'הברה אחת: -er / -est (tall -> taller -> tallest). שתי הברות ומעלה: more / most. יוצאי דופן: good -> better -> best, bad -> worse -> worst.'
      },
      {
        title: 'תוארי פועל (Adverbs)',
        details: 'גזירה על ידי הוספת -ly (quick -> quickly). יוצאי דופן: fast -> fast, hard -> hard, late -> late, good -> well.'
      }
    ],
    keywords: ['opinion', 'size', 'comparative (-er/more)', 'superlative (-est/most)', '-ly adverbs'],
    examples: [
      'She drives very carefully in London traffic.',
      'This building is much older than that tower.'
    ],
    practice: [
      {
        question: 'He plays the violin very _____ (good).',
        options: ['good', 'goodly', 'well', 'better'],
        correctIndex: 2,
        explanation: 'תואר הפועל של שם התואר good הוא well.'
      }
    ]
  },
  {
    id: 'prepositions',
    categoryId: 'parts-of-speech',
    subgroup: '2.5 מילות יחס (Prepositions)',
    title: 'Prepositions of Time & Place (At, On, In)',
    summary: 'מילות יחס לזמן, מקום ותנועה (into, across, through).',
    rules: [
      {
        title: 'At',
        details: 'זמן מדויק (at 5 PM, at midnight, at lunchtime), או נקודות ציון ספציפיות (at the bus stop, at home).'
      },
      {
        title: 'On',
        details: 'ימים ותאריכים (on Monday, on 5th July), או על משטח (on the table, on the floor).'
      },
      {
        title: 'In',
        details: 'חודשים, שנים, עונות, מאות (in July, in 2026, in summer), או מרחב סגור/תלת-ממדי (in London, in the room).'
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
        explanation: 'לפני ימי חול ותאריכים משתמשים במילת היחס On.'
      }
    ]
  },

  // =========================================================================
  // 3. SENTENCE STRUCTURE & SYNTAX (תחביר ומבנה המשפט)
  // =========================================================================
  {
    id: 'syntax-svo',
    categoryId: 'syntax',
    subgroup: '3.1 מבנה משפט בסיסי (Basic Syntax)',
    title: 'Word Order & Subject-Verb Agreement (סדר מילים והתאמת נושא-פועל)',
    summary: 'סדר מילים תקני (SVO) והתאמת גוף בין הנושא לפועל.',
    rules: [
      {
        title: 'סדר מילים בסיסי (SVO)',
        details: 'Subject (נושא) -> Verb (פועל) -> Object (מושא).'
      },
      {
        title: 'התאמת נושא ופועל (Subject-Verb Agreement)',
        details: 'נושא יחיד גורר פועל ביחיד. נושא ברבים גורר פועל ברבים. מילים כמו everyone, nobody, each, somebody מקבלות פועל ביחיד!'
      }
    ],
    keywords: ['SVO', 'Subject-Verb Agreement', 'everyone', 'nobody'],
    examples: [
      'Everyone in the auditorium is listening attentively to the speaker.'
    ],
    practice: [
      {
        question: 'Everyone in the team _____ (have) a clear role.',
        options: ['have', 'has', 'having', 'are having'],
        correctIndex: 1,
        explanation: 'המילה Everyone דורשת פועל ביחיד (has).'
      }
    ]
  },
  {
    id: 'conjunctions-types',
    categoryId: 'syntax',
    subgroup: '3.2 סוגי משפטים וחיבורים (Sentence Types & Conjunctions)',
    title: 'Sentence Types & Conjunctions (סוגי משפטים ומילות קישור)',
    summary: 'משפטים פשוטים, מורכבים, מאחים ומילות קישור לפי תפקיד.',
    rules: [
      {
        title: 'משפטים מחוברים (FANBOYS)',
        details: 'for, and, nor, but, or, yet, so מחברים בין שני איברים עצמאיים.'
      },
      {
        title: 'מילות קישור לפי תפקיד',
        details: 'הוספה: furthermore, moreover. ניגוד: however, whereas, despite. סיבה ותוצאה: therefore, as a result.'
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
        explanation: 'Despite מקדימה שם עצם או צירוף שמני להבעת ניגוד.'
      }
    ]
  },
  {
    id: 'negation-questions',
    categoryId: 'syntax',
    subgroup: '3.3 שלילה ושאלות (Negation & Questions)',
    title: 'Negation, Questions & Question Tags (שלילה, שאלות ושאלות תגית)',
    summary: 'שאלות כן/לא, שאלות Wh, שאלות עקיפות ושאלות תגית (Question Tags).',
    rules: [
      {
        title: 'שאלות עקיפות (Indirect Questions)',
        details: 'שומרות על סדר מילים חיובי ללא היפוך (e.g. Could you tell me where the station is? ולא where is the station).'
      },
      {
        title: 'שאלות תגית (Question Tags)',
        details: 'משפט חיובי מקבל תגית שלילית ולהיפך (e.g. You are British, aren\'t you?).'
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
        explanation: 'משפט שלילי (haven\'t seen) מקבל תגית חיובית (have you).'
      }
    ]
  },
  {
    id: 'relative-clauses',
    categoryId: 'syntax',
    subgroup: '3.4 פסוקיות זיקה (Relative Clauses)',
    title: 'Relative Clauses (פסוקיות זיקה: Who, Which, That, Whose)',
    summary: 'פסוקיות מגדירות (Defining) ולא מגדירות (Non-defining).',
    rules: [
      {
        title: 'כינויי זיקה',
        details: 'who (אנשים), which (חפצים/חיות), that (חפצים/אנשים בפסוקית מגדירה), whose (שייכות), where (מקום).'
      },
      {
        title: 'פסוקיות לא מגדירות (Non-defining)',
        details: 'מופרדות בפסיקים ומוסיפות מידע אופציונלי. אסור להשתמש ב-that!'
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
        explanation: 'Whose מציין שייכות (האוטו של האיש).'
      }
    ]
  },

  // =========================================================================
  // 4. VERB FORMS & SPECIAL SYSTEMS (צורות פועל מיוחדות)
  // =========================================================================
  {
    id: 'modals',
    categoryId: 'special-verbs',
    subgroup: '4.1 פעלים מודאליים (Modal Verbs)',
    title: 'Modal Verbs & Modal Perfect (פעלים מודאליים ומודאלים בעבר)',
    summary: 'שימוש ב-Can, Could, Must, Should, Might, May ומודאלים בעבר (Modal + have + V3).',
    rules: [
      {
        title: 'חוקי יסוד',
        details: 'אינם מקבלים סיומת -s בגוף שלישי, ואחריהם תמיד בא פועל בסיס (Base Form).'
      },
      {
        title: 'מודאלים בעבר (Modal Perfect)',
        details: 'Modal + have + V3 (e.g. should have done = היה כדאי לעשות בעבר אך לא נעשה; must have been = ודאי שזה קרה).'
      }
    ],
    keywords: ['can', 'could', 'must', 'should', 'might', 'should have + V3'],
    examples: [
      'You should visit the British Museum while in London.',
      'He must have missed the train because he isn\'t here yet.'
    ],
    practice: [
      {
        question: 'You _____ (bring) an umbrella; it was raining all day!',
        options: ['should bring', 'should have brought', 'must bring', 'can bring'],
        correctIndex: 1,
        explanation: 'הבעת חרטה/ביקורת על פעולת עבר שנעשתה או שלא נעשתה בעזרת Should have + V3.'
      }
    ]
  },
  {
    id: 'stative-verbs',
    categoryId: 'special-verbs',
    subgroup: '4.2 פעלי מצב מול פעלי פעולה (Stative vs Dynamic Verbs)',
    title: 'Stative vs Dynamic Verbs (פעלי מצב מול פעלי פעולה)',
    summary: 'פעלים שאינם מקבלים זמנים ממושכים (-ing) ופעלים בעלי משמעות כפולה.',
    rules: [
      {
        title: 'פעלי מצב (Stative Verbs)',
        details: 'רגשות, תפיסה, מחשבה ובעלות (love, believe, know, understand, seem, belong, possess) אינם מופיעים בזמנים ממושכים (Progressive).'
      },
      {
        title: 'משמעות כפולה',
        details: 'פעלים מסוימים משנים משמעות: I think (אני מאמין - מצב) מול I am thinking (אני מהרהר עכשיו - פעולה).'
      }
    ],
    keywords: ['love', 'believe', 'know', 'understand', 'think vs thinking'],
    examples: [
      'I understand the grammar rule perfectly.',
      'She is thinking about buying a flat in London.'
    ],
    practice: [
      {
        question: 'I _____ (understand) what you are saying.',
        options: ['am understanding', 'understand', 'was understanding', 'have been understanding'],
        correctIndex: 1,
        explanation: 'הפועל understand הוא stative verb ואינו מקבל -ing.'
      }
    ]
  },
  {
    id: 'gerunds-infinitives',
    categoryId: 'special-verbs',
    subgroup: '4.3 שמות פועל וג\'רונד (Gerunds vs Infinitives)',
    title: 'Gerunds vs Infinitives (Verb-ing מול To + Base Verb)',
    summary: 'מתי משתמשים ב-Gerund (-ing) ומתי ב-Infinitive (To + verb).',
    rules: [
      {
        title: 'Gerund (-ing)',
        details: 'אחרי מילות יחס (e.g. interested in learning), כנושא המשפט (e.g. Swimming is good exercise), ואחרי פעלים ספציפיים (avoid, enjoy, suggest, finish, mind).'
      },
      {
        title: 'Infinitive (To + Base Verb)',
        details: 'להבעת מטרה (e.g. came to help), אחרי תארים (e.g. happy to meet), ואחרי פעלים ספציפיים (decide, plan, hope, want, offer).'
      }
    ],
    keywords: ['enjoy doing', 'decide to do', 'interested in doing'],
    examples: [
      'She enjoys drinking British tea in the afternoon.',
      'They decided to move to Manchester.'
    ],
    practice: [
      {
        question: 'He suggested _____ (go) to the pub after work.',
        options: ['to go', 'going', 'go', 'went'],
        correctIndex: 1,
        explanation: 'אחרי הפועל suggest מופיע Gerund (-ing).'
      }
    ]
  },
  {
    id: 'phrasal-verbs',
    categoryId: 'special-verbs',
    subgroup: '4.4 פעלים מורכבים (Phrasal Verbs)',
    title: 'Phrasal Verbs (פעלים מורכבים וחוקי הפרדה)',
    summary: 'צירופי פועל + מילת יחס/תואר הפועל וחוקי הקישור שלהם.',
    rules: [
      {
        title: 'פעלים פרידים (Separable)',
        details: 'אם המושא הוא כינוי גוף (it, them), הוא חייב לבוא באמצע (e.g. turn it on, take them off).'
      },
      {
        title: 'פעלים שאינם פרידים (Inseparable)',
        details: 'המושא מופיע תמיד אחרי הצירוף השלם (e.g. look after him, run into a friend).'
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
        explanation: 'הביטוי turn off פירושו לכבות או להנמיך/להפסיק.'
      }
    ]
  },
  {
    id: 'causative-verbs',
    categoryId: 'special-verbs',
    subgroup: '4.5 פעלים גורמים (Causative Verbs)',
    title: 'Causative Verbs (Let, Make, Have, Get & Passive Causative)',
    summary: 'מבני פועל גורם (להכריח, לאפשר, לגרום למישהו לבצע פעולה).',
    rules: [
      {
        title: 'Let & Make & Have',
        details: 'Let/Make/Have + person + Base Verb (e.g. She made him clean the room; Let me check).'
      },
      {
        title: 'Get',
        details: 'Get + person + TO + Base Verb (e.g. I got him to fix the car).'
      },
      {
        title: 'Passive Causative (סביל גורם)',
        details: 'have/get + object + V3 (e.g. I had my car repaired by a mechanic).'
      }
    ],
    keywords: ['make someone do', 'get someone to do', 'have something done'],
    examples: [
      'She had her roof repaired last week.',
      'The teacher made the students rewrite the assignment.'
    ],
    practice: [
      {
        question: 'I had my hair _____ (cut) yesterday.',
        options: ['cut', 'cutting', 'to cut', 'cuts'],
        correctIndex: 0,
        explanation: 'מבנה Passive Causative: have + object + V3 (צורת V3 של cut היא cut).'
      }
    ]
  },

  // =========================================================================
  // 5. ADVANCED GRAMMAR (דקדוק ומבנים מתקדמים)
  // =========================================================================
  {
    id: 'conditionals',
    categoryId: 'advanced-grammar',
    subgroup: '5.1 משפטי תנאי (Conditionals)',
    title: 'Conditionals (משפטי תנאי: 0, 1, 2, 3 & Mixed)',
    summary: 'סוגי משפטי התנאי באנגלית, תנאי היפותטי ותנאי מעורב.',
    rules: [
      {
        title: 'Zero Conditional (אמיתות מדעיות)',
        details: 'If + Present Simple, Present Simple (e.g. If you heat ice, it melts).'
      },
      {
        title: 'First Conditional (סביר בעתיד)',
        details: 'If + Present Simple, Will + base verb (e.g. If it rains, I will take an umbrella).'
      },
      {
        title: 'Second Conditional (היפותטי בהווה/עתיד)',
        details: 'If + Past Simple, Would + base verb (e.g. If I won the lottery, I would buy a castle in Scotland).'
      },
      {
        title: 'Third Conditional (חרטה / היפותטי בעבר)',
        details: 'If + Past Perfect, Would have + V3 (e.g. If I had studied harder, I would have passed).'
      }
    ],
    keywords: ['Zero', 'First', 'Second', 'Third', 'Mixed Conditionals'],
    examples: [
      'If I had known about the meeting, I would have attended.',
      'If you mix red and blue, you get purple.'
    ],
    practice: [
      {
        question: 'If I _____ (have) more free time, I would learn Welsh.',
        options: ['have', 'had', 'had had', 'will have'],
        correctIndex: 1,
        explanation: 'משפט תנאי שני (Second Conditional) דורש Past Simple בראשי (had) ו-would + verb בתוצאה.'
      }
    ]
  },
  {
    id: 'passive-voice',
    categoryId: 'advanced-grammar',
    subgroup: '5.2 סביל (Passive Voice)',
    title: 'Passive Voice (משפטי סביל בכל הזמנים)',
    summary: 'העברת הדגש מביצוע הפעולה אל מקבל הפעולה בכל הזמנים.',
    rules: [
      {
        title: 'מבנה כללי',
        details: 'Subject + Form of BE + V3 (Past Participle).'
      },
      {
        title: 'דוגמאות לפי זמנים',
        details: 'Present Simple: is/are + V3. Past Simple: was/were + V3. Present Perfect: has/have been + V3. Modals: can/must be + V3.'
      }
    ],
    keywords: ['Passive', 'BE + V3', 'by agent'],
    examples: [
      'Big Ben was restored recently.',
      'English is spoken in many countries around the world.'
    ],
    practice: [
      {
        question: 'The new bridge _____ (build) next year.',
        options: ['will build', 'will be built', 'is building', 'was built'],
        correctIndex: 1,
        explanation: 'סביל בזמן עתיד נבנה בצורה: will be + V3 (will be built).'
      }
    ]
  },
  {
    id: 'reported-speech',
    categoryId: 'advanced-grammar',
    subgroup: '5.3 דיבור עקוף (Reported Speech)',
    title: 'Reported Speech (דיבור עקוף והזזת זמנים)',
    summary: 'דיווח על דברי אחרים, חוקי הזזת זמנים לאחור (Backshift) והתאמת כינויים.',
    rules: [
      {
        title: 'הזזת זמנים לאחור (Backshift)',
        details: 'Present Simple -> Past Simple. Present Progressive -> Past Progressive. Past Simple / Present Perfect -> Past Perfect. Will -> Would, Can -> Could.'
      },
      {
        title: 'שינויי זמן ומקום',
        details: 'here -> there, now -> then, today -> that day, yesterday -> the day before.'
      }
    ],
    keywords: ['backshift', 'he said that', 'she asked if'],
    examples: [
      'Direct: "I live in London." -> Reported: He said that he lived in London.'
    ],
    practice: [
      {
        question: 'Direct: "I am working." -> Reported: She said that she _____ .',
        options: ['is working', 'was working', 'had worked', 'has worked'],
        correctIndex: 1,
        explanation: 'בעת מעבר לדיבור עקוף, Present Progressive הופך ל-Past Progressive (was working).'
      }
    ]
  },
  {
    id: 'inversion-advanced',
    categoryId: 'advanced-grammar',
    subgroup: '5.4 מבני הדגשה וצמצום (Inversion, Clefts & Participles)',
    title: 'Inversion & Advanced Structures (היפוך תחבירי ומבני הדגשה)',
    summary: 'היפוך תחבירי אחרי מילות שלילה, משפטי ביקוע (Clefts) וצמצום פסוקיות.',
    rules: [
      {
        title: 'היפוך תחבירי (Inversion)',
        details: 'אחרי ביטויי שלילה בראש המשפט (Seldom, Rarely, Never, Hardly), מבנה המשפט הופך למבנה של שאלה (e.g. Seldom have I seen such beauty).'
      },
      {
        title: 'משפטי ביקוע (Cleft Sentences)',
        details: 'It was John who solved the problem / What I need is a hot cup of tea.'
      }
    ],
    keywords: ['Seldom have I...', 'Rarely do we...', 'Cleft sentences'],
    examples: [
      'Never have I heard such a wonderful British accent.',
      'What I enjoy most about London is its history.'
    ],
    practice: [
      {
        question: 'Rarely _____ (see) such dedication to learning.',
        options: ['I have seen', 'have I seen', 'did I saw', 'I saw'],
        correctIndex: 1,
        explanation: 'אחרי המילה Rarely בראש משפט מתקיים היפוך תחבירי (have I seen).'
      }
    ]
  },

  // =========================================================================
  // 6. MECHANICS & MORPHOLOGY (מכניקה, פיסוק ותצורת מילים)
  // =========================================================================
  {
    id: 'punctuation-capitalization',
    categoryId: 'mechanics',
    subgroup: '6.1 פיסוק ואותיות גדולות (Punctuation & Capitalization)',
    title: 'Capital Letters & Apostrophe Rules (אותיות גדולות וגרש)',
    summary: 'כללי שימוש באותיות גדולות, גרש שייכות (Apostrophe) וסימני פיסוק.',
    rules: [
      {
        title: 'Capital Letters (אותיות גדולות)',
        details: 'תחילת משפט, שמות פרטיים, ימות השבוע, חודשים, שפות, לאומים, והכינוי I.'
      },
      {
        title: 'גרש שייכות (Apostrophe -\')',
        details: 'קיצורים: can\'t, it\'s (It is). שייכות יחיד: the boy\'s book. שייכות רבים: the boys\' school. הבדלה קריטית: It\'s = It is מול Its = של זה (שייכות).'
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
        explanation: 'Its (ללא גרש) הוא תואר השייכות לגוף שלישי ניטרלי.'
      }
    ]
  },
  {
    id: 'word-formation',
    categoryId: 'mechanics',
    subgroup: '6.2 תצורת מילים (Word Formation)',
    title: 'Prefixes & Suffixes (קידומות וסופיות למילים)',
    summary: 'גזירת שמות עצם, פעלים, תארים ותוארי פועל בעזרת קידומות וסופיות.',
    rules: [
      {
        title: 'קידומות שלילה (Prefixes)',
        details: 'un- (unhappy), in- (informal), im- (impossible), il- (illegal), ir- (irregular), dis- (disagree).'
      },
      {
        title: 'סופיות (Suffixes)',
        details: 'שמות עצם: -tion, -ment, -ness, -ity. תארים: -ful, -less, -able, -ous. פעלים: -ize, -ify. תוארי פועל: -ly.'
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
        explanation: 'הקידומת im- מתווספת למילים המתחילות ב-p או m (impossible).'
      }
    ]
  }
];
