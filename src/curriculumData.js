/**
 * British English Vault - Master Curriculum Hierarchy & Subtopics Engine
 * Structure: 17 Master Pillars -> Thematic Sub-headers -> Granular Subtopic Lessons & Exercises.
 */

export const CURRICULUM_PILLARS = [
  {
    "id": "grammar",
    "number": 1,
    "title": "Grammar",
    "titleHe": "כללי המבנה של השפה האנגלית",
    "icon": "fa-book-bookmark",
    "subHeaders": [
      {
        "id": "parts-of-speech",
        "title": "Parts of Speech",
        "titleHe": "חלקי הדיבר",
        "subtopics": [
          {
            "id": "nouns",
            "title": "Nouns",
            "titleHe": "שמות עצם",
            "desc": "Words denoting people, places, things, ideas, or concepts."
          },
          {
            "id": "verbs",
            "title": "Verbs",
            "titleHe": "פעלים",
            "desc": "Action words, states of being, and occurrences that drive sentences."
          },
          {
            "id": "adjectives",
            "title": "Adjectives",
            "titleHe": "שמות תואר",
            "desc": "Words that describe, modify, or qualify nouns and pronouns."
          },
          {
            "id": "adverbs",
            "title": "Adverbs",
            "titleHe": "תוארי הפועל",
            "desc": "Words modifying verbs, adjectives, or other adverbs (manner, time, place, degree)."
          },
          {
            "id": "pronouns",
            "title": "Pronouns",
            "titleHe": "כינויי גוף",
            "desc": "Words replacing nouns (I, you, he, she, it, they, someone, which)."
          },
          {
            "id": "prepositions",
            "title": "Prepositions",
            "titleHe": "מילות יחס",
            "desc": "Words indicating spatial, temporal, or logical relationships (in, on, at, under, through)."
          },
          {
            "id": "conjunctions",
            "title": "Conjunctions",
            "titleHe": "מילות קישור",
            "desc": "Connecting words that link clauses, phrases, or words (and, but, although, because)."
          },
          {
            "id": "articles",
            "title": "Articles",
            "titleHe": "תוויות יידוע",
            "desc": "Definite (the) and Indefinite (a, an) markers preceding nouns."
          },
          {
            "id": "determiners",
            "title": "Determiners",
            "titleHe": "מילים הקובעות כמות או יידוע",
            "desc": "Specifiers indicating reference or quantity (this, those, every, many, several)."
          },
          {
            "id": "interjections",
            "title": "Interjections",
            "titleHe": "מילות קריאה",
            "desc": "Exclamatory words expressing sudden emotion or reaction (Oh!, Cheers!, Blimey!)."
          }
        ]
      },
      {
        "id": "sentence-structure",
        "title": "Sentence Structure",
        "titleHe": "מבנה משפט",
        "subtopics": [
          {
            "id": "subject-predicate",
            "title": "Subject and Predicate",
            "titleHe": "נושא ונשוא",
            "desc": "The two foundational components of every complete English clause."
          },
          {
            "id": "object-complement",
            "title": "Object and Complement",
            "titleHe": "מושא ומשלים",
            "desc": "Direct objects, indirect objects, subject complements, and object complements."
          },
          {
            "id": "word-order",
            "title": "Word Order",
            "titleHe": "סדר מילים (SVO)",
            "desc": "Strict English Subject-Verb-Object word order and adverb placement."
          },
          {
            "id": "simple-sentences",
            "title": "Simple Sentences",
            "titleHe": "משפטים פשוטים",
            "desc": "A single independent clause containing a subject and a predicate."
          },
          {
            "id": "compound-sentences",
            "title": "Compound Sentences",
            "titleHe": "משפטים מחוברים",
            "desc": "Two independent clauses joined by coordinating conjunctions (FANBOYS) or semicolons."
          },
          {
            "id": "complex-sentences",
            "title": "Complex Sentences",
            "titleHe": "משפטים מורכבים",
            "desc": "An independent clause joined with one or more dependent (subordinate) clauses."
          },
          {
            "id": "sentence-types",
            "title": "Sentence Types",
            "titleHe": "סוגי משפטים",
            "desc": "Declarative, Interrogative, Imperative, and Exclamatory sentences."
          }
        ]
      },
      {
        "id": "verb-tenses",
        "title": "Verb Tenses",
        "titleHe": "זמנים",
        "subtopics": [
          {
            "id": "present-simple",
            "title": "Present Simple",
            "titleHe": "הווה פשוט",
            "desc": "Habits, general truths, routines, and permanent situations."
          },
          {
            "id": "present-continuous",
            "title": "Present Continuous",
            "titleHe": "הווה ממושך",
            "desc": "Actions happening right now, temporary situations, and fixed future plans."
          },
          {
            "id": "present-perfect",
            "title": "Present Perfect",
            "titleHe": "הווה מושלם",
            "desc": "Past actions with present relevance, life experiences, and uncompleted timeframes."
          },
          {
            "id": "present-perfect-continuous",
            "title": "Present Perfect Continuous",
            "titleHe": "הווה מושלם ממושך",
            "desc": "Actions starting in the past continuing until now, emphasizing duration."
          },
          {
            "id": "past-simple",
            "title": "Past Simple",
            "titleHe": "עבר פשוט",
            "desc": "Completed actions at a specific, definite point in past time."
          },
          {
            "id": "past-continuous",
            "title": "Past Continuous",
            "titleHe": "עבר ממושך",
            "desc": "Actions in progress at a specific past moment or interrupted past actions."
          },
          {
            "id": "past-perfect",
            "title": "Past Perfect",
            "titleHe": "עבר מושלם",
            "desc": "An action completed before another past event (the 'past of the past')."
          },
          {
            "id": "past-perfect-continuous",
            "title": "Past Perfect Continuous",
            "titleHe": "עבר מושלם ממושך",
            "desc": "Ongoing past actions leading up to another past action, emphasizing duration."
          },
          {
            "id": "future-simple",
            "title": "Future Simple",
            "titleHe": "עתיד פשוט",
            "desc": "Spontaneous decisions, predictions based on beliefs, promises, and offers (will/shall)."
          },
          {
            "id": "future-continuous",
            "title": "Future Continuous",
            "titleHe": "עתיד ממושך",
            "desc": "Actions in progress at a specific time in the future."
          },
          {
            "id": "future-perfect",
            "title": "Future Perfect",
            "titleHe": "עתיד מושלם",
            "desc": "Actions that will be completed by a specific point in the future."
          },
          {
            "id": "future-perfect-continuous",
            "title": "Future Perfect Continuous",
            "titleHe": "עתיד מושלם ממושך",
            "desc": "Actions ongoing up until a future reference point, highlighting duration."
          }
        ]
      },
      {
        "id": "modal-verbs",
        "title": "Modal Verbs",
        "titleHe": "פעלי עזר מודאליים",
        "subtopics": [
          {
            "id": "can-could",
            "title": "Can / Could",
            "titleHe": "יכולת ובקשות מנומסות",
            "desc": "Ability, permission, possibility, and polite British requests."
          },
          {
            "id": "may-might",
            "title": "May / Might",
            "titleHe": "הסתברות ורשות רשמית",
            "desc": "Formal permission, hypothetical possibilities, and weak probability."
          },
          {
            "id": "must-have-to",
            "title": "Must / Have to",
            "titleHe": "חובה והכרח",
            "desc": "Internal obligation, objective rules, strong necessity, and logical deduction."
          },
          {
            "id": "should-ought-to",
            "title": "Should / Ought to",
            "titleHe": "המלצה ועצה",
            "desc": "Giving advice, moral duty, expectations, and reasonable recommendations."
          },
          {
            "id": "would-will",
            "title": "Would / Will",
            "titleHe": "רצון, הרגלי עבר ותנאים",
            "desc": "Polite offers, future certainty, hypothetical results, and past repeated habits."
          },
          {
            "id": "need-to",
            "title": "Need to",
            "titleHe": "נחיצות וצורך",
            "desc": "Expressing necessity and absence of obligation (don't need to / needn't)."
          }
        ]
      },
      {
        "id": "conditional-sentences",
        "title": "Conditional Sentences",
        "titleHe": "משפטי תנאי",
        "subtopics": [
          {
            "id": "zero-conditional",
            "title": "Zero Conditional",
            "titleHe": "תנאי אפס (אמיתות מדעיות)",
            "desc": "Universal scientific facts, general laws of nature, and constant truths."
          },
          {
            "id": "first-conditional",
            "title": "First Conditional",
            "titleHe": "תנאי ראשון (עתיד אפשרי)",
            "desc": "Real, probable future conditions and their likely outcomes."
          },
          {
            "id": "second-conditional",
            "title": "Second Conditional",
            "titleHe": "תנאי שני (היפותטי בהווה)",
            "desc": "Unreal, hypothetical, or improbable present/future scenarios and advice."
          },
          {
            "id": "third-conditional",
            "title": "Third Conditional",
            "titleHe": "תנאי שלישי (חרטה בעבר)",
            "desc": "Hypothetical past situations, past regrets, and impossible outcomes."
          },
          {
            "id": "mixed-conditionals",
            "title": "Mixed Conditionals",
            "titleHe": "תנאים מעורבים",
            "desc": "Past conditions with present results, or ongoing conditions with past results."
          }
        ]
      },
      {
        "id": "grammatical-structures",
        "title": "Core Grammatical Structures",
        "titleHe": "מבנים דקדוקיים מרכזיים",
        "subtopics": [
          {
            "id": "passive-voice",
            "title": "Passive Voice",
            "titleHe": "קול סביל",
            "desc": "Focusing on the action or receiver rather than the agent."
          },
          {
            "id": "active-voice",
            "title": "Active Voice",
            "titleHe": "קול פעיל",
            "desc": "Clear, direct sentences where the subject actively performs the verb."
          },
          {
            "id": "reported-speech",
            "title": "Reported Speech",
            "titleHe": "דיבור עקיף",
            "desc": "Relaying what someone said with backshift in tense, pronouns, and time markers."
          },
          {
            "id": "direct-speech",
            "title": "Direct Speech",
            "titleHe": "דיבור ישיר",
            "desc": "Quoting exact spoken words inside quotation marks with correct punctuation."
          },
          {
            "id": "gerunds-infinitives",
            "title": "Gerunds and Infinitives",
            "titleHe": "שמות פעולה ומקור",
            "desc": "Verbs taking -ing vs to + infinitive based on semantic rules."
          },
          {
            "id": "phrasal-verbs-grammar",
            "title": "Phrasal Verbs in Grammar",
            "titleHe": "פעלים מורכבים במבנה משפט",
            "desc": "Particles, prepositional complements, and separability rules in syntax."
          },
          {
            "id": "relative-clauses",
            "title": "Relative Clauses",
            "titleHe": "פסוקיות זיקה",
            "desc": "Defining (essential) and non-defining (extra information with commas) relative clauses."
          },
          {
            "id": "question-forms",
            "title": "Question Forms",
            "titleHe": "מבנה שאלות",
            "desc": "Yes/No questions, Wh- questions, subject questions, and inverted word order."
          },
          {
            "id": "negative-sentences",
            "title": "Negative Sentences",
            "titleHe": "משפטי שלילה",
            "desc": "Using auxiliary verbs with 'not', negative adverbs, and avoiding double negatives."
          },
          {
            "id": "subject-verb-agreement",
            "title": "Subject-Verb Agreement",
            "titleHe": "התאמת נושא ונשוא",
            "desc": "Singular/plural agreement rules, collective nouns, and compound subjects."
          },
          {
            "id": "singular-plural",
            "title": "Singular and Plural",
            "titleHe": "יחיד ורבים",
            "desc": "Regular plurals, irregular forms (children, mice, criteria), and uncountable nouns."
          },
          {
            "id": "possessives",
            "title": "Possessives",
            "titleHe": "שייכות",
            "desc": "Apostrophe rules ('s vs s'), possessive determiners (my, your), and pronouns (mine)."
          },
          {
            "id": "comparatives-superlatives",
            "title": "Comparatives and Superlatives",
            "titleHe": "דרגות השוואה והפלגה",
            "desc": "Comparing two items (-er / more) vs identifying the extreme (-est / most)."
          },
          {
            "id": "quantifiers",
            "title": "Quantifiers",
            "titleHe": "מילות כמות",
            "desc": "Much, many, little, few, some, any, a lot of, and their countability rules."
          },
          {
            "id": "question-tags",
            "title": "Question Tags",
            "titleHe": "שאלות תגית",
            "desc": "Mini-questions added to statements for confirmation (isn't it?, have you?)."
          },
          {
            "id": "causative-structures",
            "title": "Causative Structures",
            "titleHe": "מבני גרימה",
            "desc": "Having or getting something done by someone else (have something done)."
          },
          {
            "id": "subjunctive-mood",
            "title": "Subjunctive Mood",
            "titleHe": "דרך התילוי",
            "desc": "Formal expressions of demands, urgency, or hypothetical states (I insist that he be...)."
          }
        ]
      }
    ]
  },
  {
    "id": "vocabulary",
    "number": 2,
    "title": "Vocabulary",
    "titleHe": "אוצר מילים",
    "icon": "fa-spell-check",
    "subHeaders": [
      {
        "id": "thematic-vocab",
        "title": "Thematic & Real-World Vocabulary",
        "titleHe": "אוצר מילים לפי תחומי חיים",
        "subtopics": [
          {
            "id": "everyday-vocabulary",
            "title": "Everyday Vocabulary",
            "titleHe": "מילים יומיומיות",
            "desc": "Essential words for common interactions, household items, and routines."
          },
          {
            "id": "academic-vocabulary",
            "title": "Academic Vocabulary",
            "titleHe": "מילים אקדמיות",
            "desc": "High-level analytical words for university essays, research, and analysis."
          },
          {
            "id": "professional-vocabulary",
            "title": "Professional Vocabulary",
            "titleHe": "מילים מקצועיות",
            "desc": "Workplace terminology for meetings, project management, and reporting."
          },
          {
            "id": "business-vocabulary",
            "title": "Business Vocabulary",
            "titleHe": "אנגלית עסקית",
            "desc": "Commercial terms, corporate finance, transactions, and negotiations."
          },
          {
            "id": "technology-vocabulary",
            "title": "Technology Vocabulary",
            "titleHe": "טכנולוגיה",
            "desc": "Digital systems, modern devices, software, and online applications."
          },
          {
            "id": "it-cybersecurity-vocabulary",
            "title": "IT and Cybersecurity Vocabulary",
            "titleHe": "מחשבים ואבטחת מידע",
            "desc": "Networks, coding, encryption, firewalls, and data infrastructure."
          },
          {
            "id": "travel-vocabulary",
            "title": "Travel Vocabulary",
            "titleHe": "תיירות ונסיעות",
            "desc": "Airports, hotels, public transport, itineraries, and sightseeing."
          },
          {
            "id": "food-cooking-vocabulary",
            "title": "Food and Cooking Vocabulary",
            "titleHe": "אוכל ובישול",
            "desc": "Ingredients, culinary techniques, restaurant dining, and flavours."
          },
          {
            "id": "health-body-vocabulary",
            "title": "Health and Body Vocabulary",
            "titleHe": "בריאות וגוף האדם",
            "desc": "Anatomy, symptoms, medical care, fitness, and wellness."
          },
          {
            "id": "emotions-feelings",
            "title": "Emotions and Feelings",
            "titleHe": "רגשות ותחושות",
            "desc": "Nuanced emotional states beyond simple happy, sad, or angry."
          },
          {
            "id": "personality-character",
            "title": "Personality and Character",
            "titleHe": "אישיות ואופי",
            "desc": "Describing traits, virtues, flaws, temperaments, and social behaviours."
          },
          {
            "id": "relationships-family",
            "title": "Relationships and Family",
            "titleHe": "משפחה ויחסים",
            "desc": "Kinship, romantic partnerships, friendships, and community bonds."
          },
          {
            "id": "education-learning",
            "title": "Education and Learning",
            "titleHe": "חינוך ולימודים",
            "desc": "Schools, universities, exams, qualifications, and pedagogical methods."
          },
          {
            "id": "work-career",
            "title": "Work and Career",
            "titleHe": "עבודה וקריירה",
            "desc": "Job hunting, promotions, contracts, corporate hierarchy, and industries."
          },
          {
            "id": "money-finance",
            "title": "Money and Finance",
            "titleHe": "כסף ופיננסים",
            "desc": "Banking, investments, budgets, mortgages, inflation, and currencies."
          },
          {
            "id": "politics-society",
            "title": "Politics and Society",
            "titleHe": "פוליטיקה וחברה",
            "desc": "Government, democracy, civic duties, legislation, and current affairs."
          },
          {
            "id": "nature-environment",
            "title": "Nature and Environment",
            "titleHe": "טבע וסביבה",
            "desc": "Ecology, wildlife, climate change, conservation, and geography."
          },
          {
            "id": "house-furniture",
            "title": "House and Furniture",
            "titleHe": "בית וריהוט",
            "desc": "Rooms, interior decor, domestic appliances, and household repairs."
          },
          {
            "id": "transportation",
            "title": "Transportation",
            "titleHe": "תחבורה",
            "desc": "Vehicles, transit networks, road infrastructure, trains, and cycling."
          },
          {
            "id": "shopping",
            "title": "Shopping",
            "titleHe": "קניות ומסחר",
            "desc": "Retail, discounts, receipts, customer service, and e-commerce."
          },
          {
            "id": "weather",
            "title": "Weather",
            "titleHe": "מזג אוויר",
            "desc": "Meteorological terms, British weather idioms, rain, sunshine, and storms."
          },
          {
            "id": "time-dates",
            "title": "Time and Dates",
            "titleHe": "זמן ותאריכים",
            "desc": "Calendars, eras, schedules, durations, and telling time with precision."
          },
          {
            "id": "numbers-measurements",
            "title": "Numbers and Measurements",
            "titleHe": "מספרים ומידות",
            "desc": "Metric vs Imperial units, fractions, percentages, and dimensions."
          },
          {
            "id": "describing-people",
            "title": "Describing People",
            "titleHe": "תיאור אנשים",
            "desc": "Physical appearances, age, clothing styles, and facial features."
          },
          {
            "id": "describing-places",
            "title": "Describing Places",
            "titleHe": "תיאור מקומות",
            "desc": "Atmosphere, architecture, urban landscapes, and scenic countryside."
          },
          {
            "id": "describing-objects",
            "title": "Describing Objects",
            "titleHe": "תיאור חפצים",
            "desc": "Materials, textures, dimensions, shapes, and functionality."
          }
        ]
      },
      {
        "id": "word-mechanics",
        "title": "Word Relationships & Mechanics",
        "titleHe": "יחסי מילים ומבנה המילה",
        "subtopics": [
          {
            "id": "synonyms",
            "title": "Synonyms",
            "titleHe": "מילים נרדפות",
            "desc": "Words with identical or closely related meanings and subtle nuances."
          },
          {
            "id": "antonyms",
            "title": "Antonyms",
            "titleHe": "מילים הפוכות",
            "desc": "Opposite words used to create contrast and clarity in language."
          },
          {
            "id": "homophones",
            "title": "Homophones",
            "titleHe": "מילים בעלות צליל זהה",
            "desc": "Words that sound identical but differ in spelling and meaning (their/there/they're)."
          },
          {
            "id": "homonyms",
            "title": "Homonyms",
            "titleHe": "מילים בעלות כמה משמעויות",
            "desc": "Words with identical spelling and sound but unrelated definitions (bank, bark)."
          },
          {
            "id": "word-families",
            "title": "Word Families",
            "titleHe": "משפחות מילים",
            "desc": "Related nouns, verbs, adjectives, and adverbs sharing a common root."
          },
          {
            "id": "prefixes-suffixes",
            "title": "Prefixes and Suffixes",
            "titleHe": "תחיליות וסיומות",
            "desc": "Affixes that alter word meanings (un-, re-, dis-) or change word classes (-tion, -able)."
          },
          {
            "id": "collocations",
            "title": "Collocations",
            "titleHe": "צירופי מילים טבעיים",
            "desc": "Natural word partnerships commonly used together by native speakers."
          },
          {
            "id": "word-formation",
            "title": "Word Formation",
            "titleHe": "יצירת מילים",
            "desc": "Compounding, blending, conversion, and coining new terms."
          },
          {
            "id": "formal-informal-vocab",
            "title": "Formal and Informal Vocabulary",
            "titleHe": "משלב שפה רשמי מול לא-רשמי",
            "desc": "Choosing appropriate vocabulary registers for specific social contexts."
          }
        ]
      }
    ]
  },
  {
    "id": "pronunciation",
    "number": 3,
    "title": "Pronunciation",
    "titleHe": "הגייה",
    "icon": "fa-microphone-lines",
    "subHeaders": [
      {
        "id": "sounds-phonetics",
        "title": "Sounds & Phonetics",
        "titleHe": "צלילים ופונטיקה",
        "subtopics": [
          {
            "id": "alphabet-sounds",
            "title": "English Alphabet Sounds",
            "titleHe": "צלילי האלפבית",
            "desc": "The phonetic values of the 26 letters of the English alphabet."
          },
          {
            "id": "vowel-sounds",
            "title": "Vowel Sounds",
            "titleHe": "צלילי תנועות",
            "desc": "Pure vowel phonemes produced without constriction of airflow."
          },
          {
            "id": "consonant-sounds",
            "title": "Consonant Sounds",
            "titleHe": "צלילי עיצורים",
            "desc": "Voiced and unvoiced consonants produced with specific mouth positions."
          },
          {
            "id": "short-long-vowels",
            "title": "Short and Long Vowels",
            "titleHe": "תנועות קצרות וארוכות",
            "desc": "Distinguishing vowel lengths (ship vs sheep, bit vs beat, cut vs cart)."
          },
          {
            "id": "diphthongs",
            "title": "Diphthongs",
            "titleHe": "דיפתונגים (תנועות מורכבות)",
            "desc": "Two vowel sounds gliding together in a single syllable (coin, loud, day, bear)."
          },
          {
            "id": "silent-letters",
            "title": "Silent Letters",
            "titleHe": "אותיות שקטות",
            "desc": "Letters written but unpronounced in standard English (doubt, knight, salmon)."
          }
        ]
      },
      {
        "id": "stress-connected-speech",
        "title": "Stress & Connected Speech",
        "titleHe": "הטעמה ודיבור מחובר",
        "subtopics": [
          {
            "id": "word-stress",
            "title": "Word Stress",
            "titleHe": "הטעמת מילים",
            "desc": "Primary and secondary stress patterns within multi-syllable words."
          },
          {
            "id": "sentence-stress",
            "title": "Sentence Stress",
            "titleHe": "הטעמת משפט",
            "desc": "Stressing content words (nouns, verbs) while reducing function words."
          },
          {
            "id": "syllables",
            "title": "Syllables",
            "titleHe": "הברות",
            "desc": "Units of pronunciation organized around a central vowel sound."
          },
          {
            "id": "connected-speech",
            "title": "Connected Speech",
            "titleHe": "דיבור מחובר",
            "desc": "How words blend naturally together in continuous native speech."
          },
          {
            "id": "linking-sounds",
            "title": "Linking Sounds",
            "titleHe": "צלילי חיבור (Linking R / J / W)",
            "desc": "Consonant-to-vowel links and intrusive glide sounds between words."
          },
          {
            "id": "weak-forms",
            "title": "Weak Forms",
            "titleHe": "צורות חלשות (שווא)",
            "desc": "Unstressed grammatical words reducing to the neutral schwa sound /ə/."
          },
          {
            "id": "reduced-sounds",
            "title": "Reduced Sounds",
            "titleHe": "צלילים מופחתים ואליזיה",
            "desc": "Elision and assimilation of unstressed vowels and consonant clusters."
          },
          {
            "id": "intonation",
            "title": "Intonation",
            "titleHe": "אינטונציה (ניגון הדיבור)",
            "desc": "Rising and falling vocal pitch curves conveying meaning and emotion."
          },
          {
            "id": "rhythm",
            "title": "Rhythm",
            "titleHe": "קצב הדיבור (Stress-timed)",
            "desc": "The stress-timed rhythm characteristic of natural British English."
          }
        ]
      },
      {
        "id": "difficult-sounds",
        "title": "Challenging Sounds",
        "titleHe": "צלילים מאתגרים",
        "subtopics": [
          {
            "id": "th-sound",
            "title": "Difficult Sounds: TH",
            "titleHe": "צליל ה-TH (/θ/ ו-/ð/)",
            "desc": "Unvoiced /θ/ (think) vs voiced /ð/ (this) tongue positions."
          },
          {
            "id": "r-sound",
            "title": "Difficult Sounds: R",
            "titleHe": "צליל ה-R",
            "desc": "Non-rhotic British post-vocalic R vs initial alveolar approximant."
          },
          {
            "id": "w-sound",
            "title": "Difficult Sounds: W",
            "titleHe": "צליל ה-W",
            "desc": "Rounded-lip bilabial glide distinct from the V sound."
          },
          {
            "id": "v-sound",
            "title": "Difficult Sounds: V",
            "titleHe": "צליל ה-V",
            "desc": "Labiodental fricative produced by upper teeth on lower lip."
          },
          {
            "id": "p-sound",
            "title": "Difficult Sounds: P",
            "titleHe": "צליל ה-P",
            "desc": "Aspirated bilabial plosive with distinct puff of air."
          },
          {
            "id": "f-sound",
            "title": "Difficult Sounds: F",
            "titleHe": "צליל ה-F",
            "desc": "Unvoiced labiodental fricative contrasting with the voiced V."
          },
          {
            "id": "short-i-long-e",
            "title": "Difficult Sounds: Short I vs Long E",
            "titleHe": "חיריק קצר מול אי ארוך",
            "desc": "Mastering the minimal pair distinction (/ɪ/ in ship vs /iː/ in sheep)."
          }
        ]
      },
      {
        "id": "accents-endings",
        "title": "Accents & Morphemic Endings",
        "titleHe": "מבטאים וסיומות",
        "subtopics": [
          {
            "id": "british-pronunciation",
            "title": "British Pronunciation (RP)",
            "titleHe": "הגייה בריטית תקנית",
            "desc": "Received Pronunciation phonology, non-rhoticity, and broad A sounds."
          },
          {
            "id": "american-pronunciation",
            "title": "American Pronunciation",
            "titleHe": "הגייה אמריקאית (GenAm)",
            "desc": "General American rhoticity, flap T, and unrounded open vowels."
          },
          {
            "id": "accent-reduction",
            "title": "Accent Reduction",
            "titleHe": "שיפור מבטא ושטף",
            "desc": "Techniques to eliminate native-language interference and gain clarity."
          },
          {
            "id": "pronunciation-ed",
            "title": "Pronunciation of -ED",
            "titleHe": "הגיית סיומות -ED",
            "desc": "Rules for pronouncing past forms as /t/, /d/, or /ɪd/ based on voicing."
          },
          {
            "id": "pronunciation-s-es",
            "title": "Pronunciation of -S and -ES",
            "titleHe": "הגיית סיומות -S ו- -ES",
            "desc": "Rules for pronouncing plural/third-person suffixes as /s/, /z/, or /ɪz/."
          }
        ]
      }
    ]
  },
  {
    "id": "speaking",
    "number": 4,
    "title": "Speaking",
    "titleHe": "דיבור",
    "icon": "fa-comments",
    "subHeaders": [
      {
        "id": "conversational-openers",
        "title": "Conversational Openers & Social Interaction",
        "titleHe": "פתיחת שיחה ואינטראקציה חברתית",
        "subtopics": [
          {
            "id": "introducing-yourself",
            "title": "Introducing Yourself",
            "titleHe": "הצגה עצמית",
            "desc": "Professional and casual self-introductions with poise."
          },
          {
            "id": "starting-conversations",
            "title": "Starting Conversations",
            "titleHe": "פתיחת שיחה",
            "desc": "Icebreakers, polite greetings, and establishing initial rapport."
          },
          {
            "id": "small-talk",
            "title": "Small Talk",
            "titleHe": "שיחות חולין",
            "desc": "British small talk topics: weather, weekend plans, and casual observations."
          },
          {
            "id": "everyday-conversations",
            "title": "Everyday Conversations",
            "titleHe": "שיחות יומיומיות",
            "desc": "Navigating casual banter, routine encounters, and neighborhood chats."
          }
        ]
      },
      {
        "id": "questions-opinions",
        "title": "Questions & Opinions",
        "titleHe": "שאלות והבעת דעות",
        "subtopics": [
          {
            "id": "asking-questions",
            "title": "Asking Questions",
            "titleHe": "שאילת שאלות",
            "desc": "Formulating direct, indirect, and open-ended exploratory questions."
          },
          {
            "id": "answering-questions",
            "title": "Answering Questions",
            "titleHe": "מתן תשובות",
            "desc": "Providing complete, articulate, and engaging answers without hesitation."
          },
          {
            "id": "expressing-opinions",
            "title": "Expressing Opinions",
            "titleHe": "הבעת דעה",
            "desc": "Nuanced phrasing for personal viewpoints (In my view, I'm inclined to think)."
          },
          {
            "id": "agreeing-disagreeing",
            "title": "Agreeing and Disagreeing",
            "titleHe": "הסכמה ואי-הסכמה",
            "desc": "Polite British hedging and diplomatic disagreement strategies."
          },
          {
            "id": "handling-disagreements",
            "title": "Handling Disagreements",
            "titleHe": "ניהול חילוקי דעות",
            "desc": "De-escalating conflicts and debating constructively in English."
          }
        ]
      },
      {
        "id": "practical-expression",
        "title": "Practical Expression & Instructions",
        "titleHe": "הנחיות, עצות וסיפור חוויות",
        "subtopics": [
          {
            "id": "giving-advice",
            "title": "Giving Advice",
            "titleHe": "מתן עצות",
            "desc": "Constructive recommendations using modals and conditional phrasing."
          },
          {
            "id": "making-suggestions",
            "title": "Making Suggestions",
            "titleHe": "הצעת הצעות",
            "desc": "How about, why don't we, and courteous proposals."
          },
          {
            "id": "making-requests",
            "title": "Making Requests",
            "titleHe": "בקשת בקשות מנומסות",
            "desc": "Could you possibly, would you mind, and polite British phrasing."
          },
          {
            "id": "asking-for-help",
            "title": "Asking for Help",
            "titleHe": "בקשת עזרה",
            "desc": "Courteously seeking guidance, clarification, or assistance."
          },
          {
            "id": "giving-instructions",
            "title": "Giving Instructions",
            "titleHe": "מתן הוראות",
            "desc": "Step-by-step sequencing, imperatives, and clarity in guidance."
          },
          {
            "id": "explaining-ideas",
            "title": "Explaining Ideas",
            "titleHe": "הסבר רעיונות",
            "desc": "Structuring conceptual explanations with examples and analogies."
          },
          {
            "id": "describing-experiences",
            "title": "Describing Experiences",
            "titleHe": "תיאור חוויות",
            "desc": "Vividly recounting memorable events, travels, and personal milestones."
          },
          {
            "id": "telling-stories",
            "title": "Telling Stories",
            "titleHe": "סיפור סיפורים",
            "desc": "Narrative hooks, pacing, chronological signposts, and climaxes."
          },
          {
            "id": "expressing-feelings",
            "title": "Expressing Feelings",
            "titleHe": "הבעת רגשות",
            "desc": "Articulating emotions with precision, vulnerability, and clarity."
          },
          {
            "id": "expressing-preferences",
            "title": "Expressing Preferences",
            "titleHe": "הבעת העדפות",
            "desc": "Would rather, prefer X to Y, and explaining personal taste."
          },
          {
            "id": "making-decisions",
            "title": "Making Decisions",
            "titleHe": "קבלת החלטות",
            "desc": "Weighing options, reaching consensus, and stating conclusions."
          }
        ]
      },
      {
        "id": "fluency-professional",
        "title": "Professional & Fluency Mastery",
        "titleHe": "דיבור מקצועי ושטף שפה",
        "subtopics": [
          {
            "id": "negotiation",
            "title": "Negotiation",
            "titleHe": "משא ומתן",
            "desc": "Tactical bargaining, concessions, win-win framing, and formal deals."
          },
          {
            "id": "public-speaking",
            "title": "Public Speaking",
            "titleHe": "נאום ודיבור בפני קהל",
            "desc": "Stage presence, vocal projection, rhetorical questions, and audience engagement."
          },
          {
            "id": "job-interviews",
            "title": "Job Interviews",
            "titleHe": "ראיונות עבודה",
            "desc": "Answering behavioral questions with the STAR method and confident delivery."
          },
          {
            "id": "telephone-conversations",
            "title": "Telephone Conversations",
            "titleHe": "שיחות טלפון",
            "desc": "Telephone etiquette, taking messages, and overcoming lack of visual cues."
          },
          {
            "id": "fluency-practice",
            "title": "Fluency Practice",
            "titleHe": "אימון שטף דיבור",
            "desc": "Eliminating filler pauses (um, er) and maintaining continuous speech flow."
          },
          {
            "id": "thinking-in-english-speech",
            "title": "Thinking in English in Speech",
            "titleHe": "חשיבה באנגלית בזמן דיבור",
            "desc": "Formulating thoughts directly in English to eliminate translation lag."
          },
          {
            "id": "spontaneous-speaking",
            "title": "Spontaneous Speaking",
            "titleHe": "דיבור ספונטני",
            "desc": "Speaking on unfamiliar topics without preparation with composure."
          }
        ]
      }
    ]
  },
  {
    "id": "listening",
    "number": 5,
    "title": "Listening",
    "titleHe": "הבנת הנשמע",
    "icon": "fa-headphones",
    "subHeaders": [
      {
        "id": "comprehension-accents",
        "title": "Comprehension & Accents",
        "titleHe": "הבנת דוברים ומבטאים",
        "subtopics": [
          {
            "id": "understanding-native-speakers",
            "title": "Understanding Native Speakers",
            "titleHe": "הבנת דוברי שפת אם",
            "desc": "Decoding colloquial pacing, natural contractions, and idiomatic speech."
          },
          {
            "id": "understanding-different-accents",
            "title": "Understanding Different Accents",
            "titleHe": "הבנת מבטאים שונים",
            "desc": "Tuning the ear to regional UK, US, Australian, and global accents."
          },
          {
            "id": "understanding-fast-speech",
            "title": "Understanding Fast Speech",
            "titleHe": "הבנת דיבור מהיר",
            "desc": "Identifying rhythm units and content words in rapid conversations."
          },
          {
            "id": "following-conversations",
            "title": "Following Conversations",
            "titleHe": "מעקב אחר שיחות רב-משתתפים",
            "desc": "Tracking overlapping dialogue, topic transitions, and informal banter."
          },
          {
            "id": "understanding-questions",
            "title": "Understanding Questions",
            "titleHe": "הבנת שאלות מורכבות",
            "desc": "Recognising intonation signals in tag questions and indirect inquiries."
          }
        ]
      },
      {
        "id": "listening-strategies",
        "title": "Listening Strategies",
        "titleHe": "אסטרטגיות האזנה",
        "subtopics": [
          {
            "id": "listening-for-main-ideas",
            "title": "Listening for Main Ideas",
            "titleHe": "האזנה לרעיון המרכזי",
            "desc": "Focusing on the broad thesis rather than agonizing over unknown words."
          },
          {
            "id": "listening-for-details",
            "title": "Listening for Details",
            "titleHe": "האזנה לפרטים ספציפיים",
            "desc": "Extracting names, dates, numerical data, and factual points."
          },
          {
            "id": "identifying-keywords",
            "title": "Identifying Keywords",
            "titleHe": "זיהוי מילות מפתח",
            "desc": "Catching stressed syllables and focal words that carry essential meaning."
          },
          {
            "id": "understanding-context",
            "title": "Understanding Context",
            "titleHe": "הבנה מתוך ההקשר",
            "desc": "Using situational clues, speaker tone, and setting to deduce meaning."
          },
          {
            "id": "recognising-connected-speech",
            "title": "Recognising Connected Speech",
            "titleHe": "זיהוי חיבורי מילים",
            "desc": "Recognising when 'what do you' becomes 'whaddya' or linked sounds."
          },
          {
            "id": "understanding-reduced-sounds",
            "title": "Understanding Reduced Sounds",
            "titleHe": "הבנת צלילים מופחתים",
            "desc": "Hearing schwas and dropped consonants in everyday spoken English."
          }
        ]
      },
      {
        "id": "media-techniques",
        "title": "Media & Practice Protocols",
        "titleHe": "מדיה וטכניקות תרגול",
        "subtopics": [
          {
            "id": "listening-to-podcasts",
            "title": "Listening to Podcasts",
            "titleHe": "האזנה לפודקאסטים",
            "desc": "Active podcast listening protocols for vocabulary acquisition."
          },
          {
            "id": "understanding-movies-tv",
            "title": "Understanding Movies and TV Shows",
            "titleHe": "הבנת סרטים ותוכניות טלוויזיה",
            "desc": "Transitioning away from subtitles to authentic audio comprehension."
          },
          {
            "id": "understanding-news",
            "title": "Understanding News",
            "titleHe": "הבנת חדשות (BBC)",
            "desc": "Comprehending formal broadcast syntax and current affairs reporting."
          },
          {
            "id": "listening-to-audiobooks",
            "title": "Listening to Audiobooks",
            "titleHe": "האזנה לספרים קוליים",
            "desc": "Sustained listening endurance with rich literary narration."
          },
          {
            "id": "dictation-exercises",
            "title": "Dictation Exercises",
            "titleHe": "תרגילי הכתבה",
            "desc": "Transcribing audio word-for-word to sharpen acoustic precision."
          },
          {
            "id": "listening-and-repeating",
            "title": "Listening and Repeating",
            "titleHe": "האזנה וחזרה (Drills)",
            "desc": "Immediate vocal repetition to match native cadence and rhythm."
          },
          {
            "id": "shadowing-technique",
            "title": "Shadowing Technique",
            "titleHe": "טכניקת Shadowing",
            "desc": "Speaking simultaneously alongside native audio with a fraction of a second delay."
          }
        ]
      }
    ]
  },
  {
    "id": "reading",
    "number": 6,
    "title": "Reading",
    "titleHe": "הבנת הנקרא",
    "icon": "fa-book-open-reader",
    "subHeaders": [
      {
        "id": "reading-skills",
        "title": "Reading Skills & Strategies",
        "titleHe": "מיומנויות ואסטרטגיות קריאה",
        "subtopics": [
          {
            "id": "reading-comprehension",
            "title": "Reading Comprehension",
            "titleHe": "הבנת הנקרא",
            "desc": "Synthesizing explicit meaning and inferred implications in written texts."
          },
          {
            "id": "reading-main-ideas",
            "title": "Reading for Main Ideas",
            "titleHe": "קריאה לרעיון מרכזי",
            "desc": "Extracting the core message from introductions and conclusions."
          },
          {
            "id": "reading-details",
            "title": "Reading for Details",
            "titleHe": "קריאה לפרטים",
            "desc": "Locating specific supporting evidence, stats, and definitions."
          },
          {
            "id": "skimming",
            "title": "Skimming",
            "titleHe": "קריאה מרפרפת (סקירה מהירה)",
            "desc": "Rapid scanning of headings, topic sentences, and summaries."
          },
          {
            "id": "scanning",
            "title": "Scanning",
            "titleHe": "סריקה ממוקדת",
            "desc": "Searching text specifically for a targeted word, number, or keyword."
          },
          {
            "id": "understanding-context-clues",
            "title": "Understanding Context Clues",
            "titleHe": "הבנה מתוך הקשר הטקסט",
            "desc": "Deducing meanings of unfamiliar vocabulary from adjacent sentences."
          },
          {
            "id": "understanding-paragraphs",
            "title": "Understanding Paragraphs",
            "titleHe": "הבנת מבנה הפסקה",
            "desc": "Topic sentences, supporting details, and concluding transitions."
          },
          {
            "id": "identifying-main-argument",
            "title": "Identifying the Main Argument",
            "titleHe": "זיהוי הטענה המרכזית",
            "desc": "Separating the author's primary thesis from secondary illustrations."
          },
          {
            "id": "understanding-tone",
            "title": "Understanding Tone",
            "titleHe": "זיהוי נימת הכותב",
            "desc": "Recognising irony, sarcasm, objectivity, advocacy, and humor."
          },
          {
            "id": "author-purpose",
            "title": "Identifying Author's Purpose",
            "titleHe": "זיהוי מטרת הכותב",
            "desc": "Determining whether a text seeks to persuade, inform, entertain, or satirize."
          },
          {
            "id": "idioms-in-context",
            "title": "Understanding Idioms in Context",
            "titleHe": "הבנת ניבים בהקשר",
            "desc": "Decoding figurative expressions embedded in journalistic and literary prose."
          }
        ]
      },
      {
        "id": "text-types",
        "title": "Text Types & Literature",
        "titleHe": "סוגי טקסטים ומקורות קריאה",
        "subtopics": [
          {
            "id": "reading-articles",
            "title": "Reading Articles",
            "titleHe": "קריאת מאמרים",
            "desc": "Magazine essays, opinion columns, and specialized long-form pieces."
          },
          {
            "id": "reading-news",
            "title": "Reading News",
            "titleHe": "קריאת חדשות",
            "desc": "Analyzing inverted-pyramid news reporting in The Guardian, Times, BBC."
          },
          {
            "id": "reading-short-stories",
            "title": "Reading Short Stories",
            "titleHe": "קריאת סיפורים קצרים",
            "desc": "Character development, narrative suspense, and descriptive prose."
          },
          {
            "id": "reading-books",
            "title": "Reading Books",
            "titleHe": "קריאת ספרים באנגלית",
            "desc": "Building stamina through unabridged novels and non-fiction works."
          },
          {
            "id": "reading-academic-texts",
            "title": "Reading Academic Texts",
            "titleHe": "קריאת טקסטים אקדמיים",
            "desc": "Peer-reviewed abstracts, methodology sections, and scholarly critiques."
          },
          {
            "id": "reading-technical-documentation",
            "title": "Reading Technical Documentation",
            "titleHe": "קריאת תיעוד טכני",
            "desc": "Manuals, API docs, specifications, and instructional diagrams."
          }
        ]
      }
    ]
  },
  {
    "id": "writing",
    "number": 7,
    "title": "Writing",
    "titleHe": "כתיבה",
    "icon": "fa-pen-nib",
    "subHeaders": [
      {
        "id": "sentence-paragraph-foundations",
        "title": "Sentence & Paragraph Foundations",
        "titleHe": "יסודות המשפט והפסקה",
        "subtopics": [
          {
            "id": "sentence-writing",
            "title": "Sentence Writing",
            "titleHe": "כתיבת משפטים מדויקים",
            "desc": "Crafting grammatically impeccable sentences with varied structures."
          },
          {
            "id": "paragraph-writing",
            "title": "Paragraph Writing",
            "titleHe": "כתיבת פסקאות",
            "desc": "Unifying a single theme around a robust topic sentence."
          },
          {
            "id": "paragraph-structure",
            "title": "Paragraph Structure",
            "titleHe": "מבנה הפסקה",
            "desc": "Claim, Evidence, Explanation, and Link (PEEL framework)."
          },
          {
            "id": "coherence-cohesion",
            "title": "Coherence and Cohesion",
            "titleHe": "קוהרנטיות ולכידות",
            "desc": "Logical conceptual flow combined with grammatical connecting devices."
          },
          {
            "id": "linking-words",
            "title": "Linking Words",
            "titleHe": "מילות קישור",
            "desc": "Furthermore, however, consequently, in addition, and nonetheless."
          },
          {
            "id": "transition-words",
            "title": "Transition Words",
            "titleHe": "מילות מעבר",
            "desc": "Guiding the reader smoothly across distinct viewpoints and sections."
          }
        ]
      },
      {
        "id": "writing-styles-genres",
        "title": "Writing Styles & Genres",
        "titleHe": "סגנונות וסוגי כתיבה",
        "subtopics": [
          {
            "id": "essay-writing",
            "title": "Essay Writing",
            "titleHe": "כתיבת חיבורים",
            "desc": "Five-paragraph essays, thesis development, and balanced arguments."
          },
          {
            "id": "descriptive-writing",
            "title": "Descriptive Writing",
            "titleHe": "כתיבה תיאורית",
            "desc": "Evoking sensory details, vivid adjectives, and atmospheric prose."
          },
          {
            "id": "narrative-writing",
            "title": "Narrative Writing",
            "titleHe": "כתיבה עלילתית",
            "desc": "Storytelling arcs, character voice, pacing, and conflict resolution."
          },
          {
            "id": "argumentative-writing",
            "title": "Argumentative Writing",
            "titleHe": "כתיבה טיעונית",
            "desc": "Building persuasive claims backed by facts, logic, and counter-arguments."
          },
          {
            "id": "formal-writing",
            "title": "Formal Writing",
            "titleHe": "כתיבה רשמית",
            "desc": "Impersonal tone, passive phrasing, and elevated academic register."
          },
          {
            "id": "informal-writing",
            "title": "Informal Writing",
            "titleHe": "כתיבה לא-רשמית",
            "desc": "Conversational cadence, contractions, idioms, and friendly tone."
          },
          {
            "id": "creative-writing",
            "title": "Creative Writing",
            "titleHe": "כתיבה יצירתית",
            "desc": "Poetry, figurative language, metaphorical imagery, and flash fiction."
          }
        ]
      },
      {
        "id": "professional-functional-writing",
        "title": "Professional & Functional Writing",
        "titleHe": "כתיבה מקצועית ושימושית",
        "subtopics": [
          {
            "id": "email-writing",
            "title": "Email Writing",
            "titleHe": "כתיבת אימיילים",
            "desc": "Subject lines, formal salutations, concise body text, and sign-offs."
          },
          {
            "id": "business-writing",
            "title": "Business Writing",
            "titleHe": "כתיבה עסקית",
            "desc": "Meeting minutes, executive proposals, memos, and commercial briefs."
          },
          {
            "id": "cv-cover-letter",
            "title": "CV and Cover Letter Writing",
            "titleHe": "כתיבת קורות חיים ומכתב מקדים",
            "desc": "Action verbs, UK format resume architecture, and compelling pitch letters."
          },
          {
            "id": "writing-reports",
            "title": "Writing Reports",
            "titleHe": "כתיבת דוחות",
            "desc": "Structured headings, executive summaries, findings, and recommendations."
          },
          {
            "id": "writing-summaries",
            "title": "Writing Summaries",
            "titleHe": "כתיבת תמציות וסיכומים",
            "desc": "Condensing lengthy documents into essential key points objectively."
          },
          {
            "id": "writing-opinions",
            "title": "Writing Opinions",
            "titleHe": "כתיבת חוות דעת",
            "desc": "Articulating editorial viewpoints with reasoned conviction."
          },
          {
            "id": "writing-instructions",
            "title": "Writing Instructions",
            "titleHe": "כתיבת הוראות ומדריכים",
            "desc": "Imperative clarity, bulleted sequence, and unambiguous steps."
          }
        ]
      },
      {
        "id": "mechanics-proofreading",
        "title": "Mechanics & Proofreading",
        "titleHe": "מכניקה והגהה",
        "subtopics": [
          {
            "id": "punctuation-in-writing",
            "title": "Punctuation",
            "titleHe": "סימני פיסוק בכתיבה",
            "desc": "Commas, apostrophes, semicolons, and dashes used correctly."
          },
          {
            "id": "capitalisation",
            "title": "Capitalisation",
            "titleHe": "אותיות גדולות",
            "desc": "Proper nouns, titles, acronyms, and sentence capitalisation rules."
          },
          {
            "id": "spelling-in-writing",
            "title": "Spelling",
            "titleHe": "איות נכון",
            "desc": "Avoiding homophone confusions and typos in formal prose."
          },
          {
            "id": "editing-proofreading",
            "title": "Editing and Proofreading",
            "titleHe": "עריכה והגהה",
            "desc": "Multi-pass proofreading checklists for grammar, style, and flow."
          },
          {
            "id": "common-writing-mistakes",
            "title": "Common Writing Mistakes",
            "titleHe": "טעויות כתיבה נפוצות",
            "desc": "Eliminating run-on sentences, comma splices, and dangling modifiers."
          }
        ]
      }
    ]
  },
  {
    "id": "phrasal-verbs",
    "number": 8,
    "title": "Phrasal Verbs",
    "titleHe": "פעלים מורכבים",
    "icon": "fa-arrows-split-up-and-left",
    "subHeaders": [
      {
        "id": "phrasal-verb-types",
        "title": "Grammatical Types",
        "titleHe": "סוגים דקדוקיים",
        "subtopics": [
          {
            "id": "separable-phrasal-verbs",
            "title": "Separable Phrasal Verbs",
            "titleHe": "פעלים מורכבים פרידים",
            "desc": "Verbs where the object can sit between verb and particle (turn it off)."
          },
          {
            "id": "inseparable-phrasal-verbs",
            "title": "Inseparable Phrasal Verbs",
            "titleHe": "פעלים לא-פרידים",
            "desc": "Verbs whose particle must remain immediately adjacent to the verb (look after)."
          },
          {
            "id": "transitive-phrasal-verbs",
            "title": "Transitive Phrasal Verbs",
            "titleHe": "פעלים יוצאים (דורשי מושא)",
            "desc": "Phrasal verbs requiring a direct object to complete their meaning."
          },
          {
            "id": "intransitive-phrasal-verbs",
            "title": "Intransitive Phrasal Verbs",
            "titleHe": "פעלים עומדים (ללא מושא)",
            "desc": "Phrasal verbs complete without an object (wake up, break down)."
          }
        ]
      },
      {
        "id": "core-root-verbs",
        "title": "Core Root Verbs",
        "titleHe": "פעלים מורכבים לפי פועל בסיס",
        "subtopics": [
          {
            "id": "phrasals-get",
            "title": "Phrasal Verbs with Get",
            "titleHe": "פעלים עם Get",
            "desc": "Get by, get over, get along with, get away, get through."
          },
          {
            "id": "phrasals-take",
            "title": "Phrasal Verbs with Take",
            "titleHe": "פעלים עם Take",
            "desc": "Take off, take over, take up, take aback, take after."
          },
          {
            "id": "phrasals-put",
            "title": "Phrasal Verbs with Put",
            "titleHe": "פעלים עם Put",
            "desc": "Put off, put up with, put across, put out, put down."
          },
          {
            "id": "phrasals-come",
            "title": "Phrasal Verbs with Come",
            "titleHe": "פעלים עם Come",
            "desc": "Come across, come up with, come into, come round."
          },
          {
            "id": "phrasals-go",
            "title": "Phrasal Verbs with Go",
            "titleHe": "פעלים עם Go",
            "desc": "Go on, go through with, go off, go out, go over."
          },
          {
            "id": "phrasals-make",
            "title": "Phrasal Verbs with Make",
            "titleHe": "פעלים עם Make",
            "desc": "Make up, make out, make up for, make off with."
          },
          {
            "id": "phrasals-turn",
            "title": "Phrasal Verbs with Turn",
            "titleHe": "פעלים עם Turn",
            "desc": "Turn down, turn up, turn out, turn into, turn over."
          },
          {
            "id": "phrasals-look",
            "title": "Phrasal Verbs with Look",
            "titleHe": "פעלים עם Look",
            "desc": "Look forward to, look up to, look into, look after."
          },
          {
            "id": "phrasals-break",
            "title": "Phrasal Verbs with Break",
            "titleHe": "פעלים עם Break",
            "desc": "Break down, break through, break out, break up."
          },
          {
            "id": "phrasals-bring",
            "title": "Phrasal Verbs with Bring",
            "titleHe": "פעלים עם Bring",
            "desc": "Bring up, bring about, bring in, bring back."
          }
        ]
      },
      {
        "id": "phrasals-context",
        "title": "Contextual Use",
        "titleHe": "שימוש בהקשר",
        "subtopics": [
          {
            "id": "everyday-phrasal-verbs",
            "title": "Everyday Phrasal Verbs",
            "titleHe": "פעלים מורכבים יומיומיים",
            "desc": "Wake up, eat out, hang out, calm down, figure out."
          },
          {
            "id": "business-phrasal-verbs",
            "title": "Business Phrasal Verbs",
            "titleHe": "פעלים מורכבים בעסקים",
            "desc": "Draw up, roll out, scale up, phase out, lay off, follow up."
          }
        ]
      }
    ]
  },
  {
    "id": "idioms-expressions",
    "number": 9,
    "title": "Idioms and Expressions",
    "titleHe": "ניבים וביטויים",
    "icon": "fa-crown",
    "subHeaders": [
      {
        "id": "varieties-domains",
        "title": "Varieties & Domains",
        "titleHe": "סוגי ניבים ותחומים",
        "subtopics": [
          {
            "id": "everyday-idioms",
            "title": "Everyday Idioms",
            "titleHe": "ניבים יומיומיים",
            "desc": "Piece of cake, break a leg, under the weather, see eye to eye."
          },
          {
            "id": "british-idioms",
            "title": "British Idioms",
            "titleHe": "ניבים בריטיים אותנטיים",
            "desc": "Bob's your uncle, threw a spanner in the works, lost the plot."
          },
          {
            "id": "american-idioms",
            "title": "American Idioms",
            "titleHe": "ניבים אמריקאיים",
            "desc": "Ballpark figure, hit it out of the park, Monday-morning quarterback."
          },
          {
            "id": "business-idioms",
            "title": "Business Idioms",
            "titleHe": "ניבים בעולם העסקים",
            "desc": "Touch base, think outside the box, move the needle, cut corners."
          },
          {
            "id": "workplace-expressions",
            "title": "Workplace Expressions",
            "titleHe": "ביטויים במקום העבודה",
            "desc": "On the same page, bring to the table, ramp up, circle back."
          },
          {
            "id": "social-expressions",
            "title": "Social Expressions",
            "titleHe": "ביטויים חברתיים",
            "desc": "Break the ice, play devil's advocate, hit it off, make yourself at home."
          },
          {
            "id": "emotional-expressions",
            "title": "Emotional Expressions",
            "titleHe": "ביטויי רגש",
            "desc": "Over the moon, down in the dumps, head over heels, beside oneself."
          }
        ]
      },
      {
        "id": "thematic-idioms",
        "title": "Thematic Idioms",
        "titleHe": "ניבים לפי נושאים",
        "subtopics": [
          {
            "id": "idioms-money",
            "title": "Idioms About Money",
            "titleHe": "ניבים על כסף",
            "desc": "Cost an arm and a leg, penny for your thoughts, break the bank."
          },
          {
            "id": "idioms-time",
            "title": "Idioms About Time",
            "titleHe": "ניבים על זמן",
            "desc": "Against the clock, in the nick of time, once in a blue moon."
          },
          {
            "id": "idioms-work",
            "title": "Idioms About Work",
            "titleHe": "ניבים על עבודה",
            "desc": "Burn the midnight oil, call it a day, back to the drawing board."
          },
          {
            "id": "idioms-relationships",
            "title": "Idioms About Relationships",
            "titleHe": "ניבים על יחסים וחברות",
            "desc": "Clear the air, bury the hatchet, keep someone at arm's length."
          }
        ]
      },
      {
        "id": "figurative-language",
        "title": "Figurative Language",
        "titleHe": "שפה ציורית ומטפורית",
        "subtopics": [
          {
            "id": "proverbs-sayings",
            "title": "Proverbs and Sayings",
            "titleHe": "פתגמים ואימרות שפר",
            "desc": "Every cloud has a silver lining, actions speak louder than words."
          },
          {
            "id": "figurative-language-concept",
            "title": "Figurative Language",
            "titleHe": "לשון ציורית",
            "desc": "Symbolism, hyperbole, personification, and evocative tropes."
          },
          {
            "id": "metaphors",
            "title": "Metaphors",
            "titleHe": "מטפורות",
            "desc": "Direct implicit comparisons (Time is a thief, a rollercoaster of emotions)."
          },
          {
            "id": "similes",
            "title": "Similes",
            "titleHe": "דימויים (Similes)",
            "desc": "Explicit comparisons using 'as' or 'like' (as clear as day, like two peas in a pod)."
          }
        ]
      }
    ]
  },
  {
    "id": "british-english",
    "number": 10,
    "title": "British English",
    "titleHe": "אנגלית בריטית",
    "icon": "fa-landmark",
    "subHeaders": [
      {
        "id": "british-language-fundamentals",
        "title": "Language Fundamentals",
        "titleHe": "יסודות השפה הבריטית",
        "subtopics": [
          {
            "id": "british-vocabulary",
            "title": "British Vocabulary",
            "titleHe": "אוצר מילים בריטי",
            "desc": "Lorry (truck), lift (elevator), flat (apartment), boot (trunk), bonnet (hood)."
          },
          {
            "id": "british-slang",
            "title": "British Slang",
            "titleHe": "סלנג בריטי",
            "desc": "Chuffed, gutted, dodgy, proper, knackered, cheeky, bloke, mate."
          },
          {
            "id": "british-phrases",
            "title": "British Phrases",
            "titleHe": "ביטויים בריטיים",
            "desc": "Fancy a cuppa?, not my cup of tea, I can't be asked, taking the mick."
          },
          {
            "id": "british-idioms-specific",
            "title": "British Idioms",
            "titleHe": "ניבים בריטיים טיפוסיים",
            "desc": "Throw a spanner in the works, Bob's your uncle, over-egging the pudding."
          },
          {
            "id": "british-expressions",
            "title": "British Expressions",
            "titleHe": "ביטויי שיחה בריטיים",
            "desc": "Right you are, cheers then, pop round, have a butcher's."
          }
        ]
      },
      {
        "id": "british-pronunciation-mechanics",
        "title": "Pronunciation & Mechanics",
        "titleHe": "הגייה ואיות בריטי",
        "subtopics": [
          {
            "id": "british-pronunciation-rp",
            "title": "British Pronunciation",
            "titleHe": "הגיית Received Pronunciation",
            "desc": "Non-rhotic R, broad bath vowel /ɑː/, crisp T articulation."
          },
          {
            "id": "british-spelling",
            "title": "British Spelling",
            "titleHe": "איות בריטי",
            "desc": "Colour vs color, organise vs organize, centre vs center, defence vs defense."
          },
          {
            "id": "british-grammar-differences",
            "title": "British Grammar Differences",
            "titleHe": "הבדלי דקדוק בריטיים",
            "desc": "Have got vs have, collective nouns as plural (the team are playing)."
          },
          {
            "id": "british-accent-practice",
            "title": "British Accent Practice",
            "titleHe": "אימון מבטא בריטי",
            "desc": "Intonation curves, speech melody, and vowel placement drills."
          },
          {
            "id": "regional-british-accents",
            "title": "Regional British Accents",
            "titleHe": "מבטאים אזוריים בבריטניה",
            "desc": "Cockney (London), Scouse (Liverpool), Geordie (Newcastle), Scottish, Yorkshire."
          }
        ]
      },
      {
        "id": "british-culture-etiquette",
        "title": "Culture & Etiquette",
        "titleHe": "תרבות ונימוס בריטי",
        "subtopics": [
          {
            "id": "british-everyday-conversations",
            "title": "British Everyday Conversations",
            "titleHe": "שיחות יומיומיות בבריטניה",
            "desc": "Apologizing when someone bumps into you, pub etiquette, queueing."
          },
          {
            "id": "british-politeness",
            "title": "British Politeness",
            "titleHe": "איפוק ונימוס בריטי",
            "desc": "Masterful understatement (a bit of a nuisance = a disaster)."
          },
          {
            "id": "british-culture",
            "title": "British Culture",
            "titleHe": "תרבות בריטית",
            "desc": "Self-deprecating humour, dry wit, tea rituals, and social conventions."
          },
          {
            "id": "british-vs-american",
            "title": "British vs American English",
            "titleHe": "השוואה: בריטית מול אמריקאית",
            "desc": "Comprehensive side-by-side linguistic contrast matrix."
          }
        ]
      }
    ]
  },
  {
    "id": "american-english",
    "number": 11,
    "title": "American English",
    "titleHe": "אנגלית אמריקאית",
    "icon": "fa-flag-usa",
    "subHeaders": [
      {
        "id": "american-vocabulary-expressions",
        "title": "Vocabulary & Expressions",
        "titleHe": "אוצר מילים וסלנג אמריקאי",
        "subtopics": [
          {
            "id": "american-vocabulary",
            "title": "American Vocabulary",
            "titleHe": "אוצר מילים אמריקאי",
            "desc": "Apartment, elevator, trunk, sidewalk, sweater, diaper, gas."
          },
          {
            "id": "american-slang",
            "title": "American Slang",
            "titleHe": "סלנג אמריקאי",
            "desc": "Awesome, bummer, buck (dollar), chill, hit the road, ballpark."
          },
          {
            "id": "american-idioms-specific",
            "title": "American Idioms",
            "titleHe": "ניבים אמריקאיים מובהקים",
            "desc": "Rain check, spill the beans, shoot the breeze, call the shots."
          },
          {
            "id": "american-expressions",
            "title": "American Expressions",
            "titleHe": "ביטויי שיחה אמריקאיים",
            "desc": "You bet!, no biggie, my bad, for real, reach out."
          }
        ]
      },
      {
        "id": "american-pronunciation-mechanics",
        "title": "Pronunciation & Mechanics",
        "titleHe": "הגייה ואיות אמריקאי",
        "subtopics": [
          {
            "id": "american-pronunciation-genam",
            "title": "American Pronunciation",
            "titleHe": "הגיית General American",
            "desc": "Rhotic R in all positions, flat A in bath /æ/, unrounded lot vowel /ɑ/."
          },
          {
            "id": "american-spelling",
            "title": "American Spelling",
            "titleHe": "איות אמריקאי",
            "desc": "Color, organize, center, defense, traveling, program."
          },
          {
            "id": "american-grammar-differences",
            "title": "American Grammar Differences",
            "titleHe": "הבדלי דקדוק אמריקאיים",
            "desc": "Past simple with already/yet (Did you eat yet?), collective nouns as singular."
          }
        ]
      },
      {
        "id": "american-culture-contrast",
        "title": "Culture & Contrast",
        "titleHe": "תרבות והשוואה",
        "subtopics": [
          {
            "id": "american-everyday-conversations",
            "title": "American Everyday Conversations",
            "titleHe": "שיחות יומיומיות בארה״ב",
            "desc": "Directness, optimism, customer enthusiasm, and casual networking."
          },
          {
            "id": "american-culture",
            "title": "American Culture",
            "titleHe": "תרבות אמריקאית",
            "desc": "Can-do mindset, informal workplace culture, and expressive directness."
          },
          {
            "id": "american-vs-british-contrast",
            "title": "American vs British English",
            "titleHe": "טבלת השוואה ישירה",
            "desc": "Linguistic mapping between US and UK terminology."
          }
        ]
      }
    ]
  },
  {
    "id": "advanced-english",
    "number": 12,
    "title": "Advanced English",
    "titleHe": "אנגלית מתקדמת (C1/C2)",
    "icon": "fa-gem",
    "subHeaders": [
      {
        "id": "advanced-grammar-syntax",
        "title": "Advanced Grammar & Syntax",
        "titleHe": "דקדוק ומבני משפט מתקדמים",
        "subtopics": [
          {
            "id": "advanced-grammar",
            "title": "Advanced Grammar",
            "titleHe": "דקדוק ברמת שפת אם",
            "desc": "Subjunctive mood, mixed conditionals, inversion, and fronting."
          },
          {
            "id": "advanced-vocabulary",
            "title": "Advanced Vocabulary",
            "titleHe": "אוצר מילים מתקדם",
            "desc": "Sophisticated lexis: ubiquitous, ephemeral, serendipity, exacerbate."
          },
          {
            "id": "nuanced-word-meanings",
            "title": "Nuanced Word Meanings",
            "titleHe": "ניואנסים ודקויות משמעות",
            "desc": "Distinguishing close synonyms (stubborn vs resolute, frugal vs stingy)."
          },
          {
            "id": "advanced-sentence-structures",
            "title": "Advanced Sentence Structures",
            "titleHe": "מבני משפט מורכבים",
            "desc": "Cleft sentences (It is X that...), participial clauses, and absolute phrases."
          },
          {
            "id": "complex-expressions",
            "title": "Complex Expressions",
            "titleHe": "ביטויים מורכבים",
            "desc": "Multi-layered rhetorical phrases and formal diplomatic discourse."
          }
        ]
      },
      {
        "id": "stylistic-rhetorical-eloquence",
        "title": "Stylistic & Rhetorical Eloquence",
        "titleHe": "רטוריקה ושפה משכנעת",
        "subtopics": [
          {
            "id": "formal-academic-english",
            "title": "Formal and Academic English",
            "titleHe": "אנגלית אקדמית ורשמית",
            "desc": "Nominalisation, passive hedging, and scholarly citations."
          },
          {
            "id": "persuasive-language",
            "title": "Persuasive Language",
            "titleHe": "שפה משכנעת",
            "desc": "Ethos, pathos, logos, evocative adjectives, and compelling syntax."
          },
          {
            "id": "rhetorical-devices",
            "title": "Rhetorical Devices",
            "titleHe": "אמצעים רטוריים",
            "desc": "Anaphora, chiasmus, antithesis, litotes, and triadic tricolon."
          },
          {
            "id": "subtle-differences-words",
            "title": "Subtle Differences Between Words",
            "titleHe": "הבדלים עדינים בין מילים",
            "desc": "Connotation vs denotation and cultural associations of vocabulary."
          },
          {
            "id": "precision-clarity",
            "title": "Precision and Clarity",
            "titleHe": "דיוק ובהירות",
            "desc": "Eliminating ambiguity and wordiness in high-stakes communication."
          }
        ]
      },
      {
        "id": "fluency-mastery",
        "title": "Fluency & Mastery",
        "titleHe": "שליטה ושטף שפה עילאי",
        "subtopics": [
          {
            "id": "advanced-reading",
            "title": "Advanced Reading",
            "titleHe": "קריאה ביקורתית מתקדמת",
            "desc": "Analyzing high-level literary, philosophical, and legal prose."
          },
          {
            "id": "advanced-writing",
            "title": "Advanced Writing",
            "titleHe": "כתיבה מלוטשת ברמת שפת אם",
            "desc": "Crafting impactful dissertations, treatises, and persuasive articles."
          },
          {
            "id": "idiomatic-fluency",
            "title": "Idiomatic Fluency",
            "titleHe": "שטף ביטויי טבעי",
            "desc": "Using figurative idioms instinctively without cognitive pause."
          },
          {
            "id": "natural-speech-patterns",
            "title": "Natural Speech Patterns",
            "titleHe": "דפוסי דיבור טבעיים",
            "desc": "Native prosody, timing, pausing, and melodic cadence."
          },
          {
            "id": "register-and-tone",
            "title": "Register and Tone",
            "titleHe": "משלב וטון דיבור",
            "desc": "Effortlessly shifting from courtroom formal to pub colloquial."
          }
        ]
      }
    ]
  },
  {
    "id": "spelling-punctuation",
    "number": 13,
    "title": "Spelling and Punctuation",
    "titleHe": "איות וסימני פיסוק",
    "icon": "fa-signature",
    "subHeaders": [
      {
        "id": "spelling-rules",
        "title": "Spelling Rules & Mechanics",
        "titleHe": "חוקי איות ומכניקה",
        "subtopics": [
          {
            "id": "english-spelling-rules",
            "title": "English Spelling Rules",
            "titleHe": "כללי איות בסיסיים",
            "desc": "I before E except after C, dropping silent E, and changing Y to I."
          },
          {
            "id": "commonly-misspelled-words",
            "title": "Commonly Misspelled Words",
            "titleHe": "מילים עם שגיאות נפוצות",
            "desc": "Necessary, accommodate, rhythm, definitely, embarrass, separate."
          },
          {
            "id": "silent-letters-spelling",
            "title": "Silent Letters",
            "titleHe": "אותיות שקטות באיות",
            "desc": "K in knife, B in subtle/climb, G in foreign, P in receipt."
          },
          {
            "id": "double-consonants",
            "title": "Double Consonants",
            "titleHe": "הכפלת עיצורים",
            "desc": "When to double consonants when adding suffixes (occurred, beginning)."
          },
          {
            "id": "plural-spelling-rules",
            "title": "Plural Spelling Rules",
            "titleHe": "איות צורות רבים",
            "desc": "-s, -es (busses, dishes), -ies (babies), -ves (calves, wives)."
          },
          {
            "id": "ing-spelling-rules",
            "title": "-ING Spelling Rules",
            "titleHe": "איות סיומות -ING",
            "desc": "Doubling consonants, dropping E (make -> making), IE to Y (die -> dying)."
          },
          {
            "id": "ed-spelling-rules",
            "title": "-ED Spelling Rules",
            "titleHe": "איות סיומות -ED",
            "desc": "Adding -d, doubling final consonant, changing Y to I (tried)."
          }
        ]
      },
      {
        "id": "punctuation-marks",
        "title": "Punctuation Marks",
        "titleHe": "סימני פיסוק ושימושם",
        "subtopics": [
          {
            "id": "capital-letters",
            "title": "Capital Letters",
            "titleHe": "אותיות רישיות",
            "desc": "Proper names, sentence starts, days, months, nationalities, and titles."
          },
          {
            "id": "full-stops",
            "title": "Full Stops (Periods)",
            "titleHe": "נקודה בסוף משפט",
            "desc": "Marking sentence boundaries and common abbreviations (etc., e.g.)."
          },
          {
            "id": "commas",
            "title": "Commas",
            "titleHe": "פסיקים",
            "desc": "Lists, introductory clauses, Oxford comma, non-defining clauses."
          },
          {
            "id": "apostrophes",
            "title": "Apostrophes",
            "titleHe": "גרש וגרשיים (שייכות וקיצור)",
            "desc": "Possession (John's, students') vs contractions (it's vs its)."
          },
          {
            "id": "question-marks",
            "title": "Question Marks",
            "titleHe": "סימני שאלה",
            "desc": "Direct questions vs avoiding question marks in indirect statements."
          },
          {
            "id": "exclamation-marks",
            "title": "Exclamation Marks",
            "titleHe": "סימני קריאה",
            "desc": "Conveying surprise, urgency, or strong emotions without overuse."
          },
          {
            "id": "colons-semicolons",
            "title": "Colons and Semicolons",
            "titleHe": "נקודתיים ונקודה-פסיק",
            "desc": "Colons introduce lists/explanations; semicolons link related clauses."
          },
          {
            "id": "quotation-marks",
            "title": "Quotation Marks",
            "titleHe": "מרכאות (ציטוט ישיר)",
            "desc": "Direct speech quotes, single vs double quotes in British vs American."
          },
          {
            "id": "hyphens-dashes",
            "title": "Hyphens and Dashes",
            "titleHe": "מקפים וקווים מפרידים",
            "desc": "Hyphens for compound words; En-dash and Em-dash for parenthetical breaks."
          }
        ]
      }
    ]
  },
  {
    "id": "functional-english",
    "number": 14,
    "title": "Functional English",
    "titleHe": "אנגלית שימושית למצבים אמיתיים",
    "icon": "fa-briefcase",
    "subHeaders": [
      {
        "id": "travel-public",
        "title": "Travel & Public Situations",
        "titleHe": "נסיעות ומצבים ציבוריים",
        "subtopics": [
          {
            "id": "at-the-restaurant",
            "title": "At the Restaurant",
            "titleHe": "במסעדה",
            "desc": "Ordering, dietary requirements, requesting the bill, compliments, and tipping."
          },
          {
            "id": "at-the-hotel",
            "title": "At the Hotel",
            "titleHe": "במלון",
            "desc": "Checking in/out, room service, reporting amenities issues."
          },
          {
            "id": "at-the-airport",
            "title": "At the Airport",
            "titleHe": "בשדה התעופה",
            "desc": "Check-in, boarding gates, baggage claims, customs, and delays."
          },
          {
            "id": "at-the-supermarket",
            "title": "At the Supermarket",
            "titleHe": "בסופרמרקט",
            "desc": "Finding aisles, weighing produce, checkout counters, and discounts."
          },
          {
            "id": "asking-for-directions",
            "title": "Asking for Directions",
            "titleHe": "שאלת כיוונים והתמצאות",
            "desc": "Turn left, take the second exit at the roundabout, cross the road."
          },
          {
            "id": "travelling-abroad",
            "title": "Travelling Abroad",
            "titleHe": "נסיעות לחו״ל",
            "desc": "Currency exchanges, public transit cards, tourist queries."
          }
        ]
      },
      {
        "id": "services-everyday",
        "title": "Services & Everyday Affairs",
        "titleHe": "שירותים וענייני יום-יום",
        "subtopics": [
          {
            "id": "at-the-doctor",
            "title": "At the Doctor",
            "titleHe": "אצל הרופא",
            "desc": "Describing symptoms, aches, prescriptions, appointments, and dosages."
          },
          {
            "id": "at-the-bank",
            "title": "At the Bank",
            "titleHe": "בבנק",
            "desc": "Opening accounts, overdrafts, wire transfers, debit card issues."
          },
          {
            "id": "on-the-telephone",
            "title": "On the Telephone",
            "titleHe": "בשיחת טלפון",
            "desc": "Hold on a moment, put you through, leave a message, bad line."
          },
          {
            "id": "meeting-new-people",
            "title": "Meeting New People",
            "titleHe": "מפגש עם אנשים חדשים",
            "desc": "Introducing friends, common interests, courteous polite banter."
          },
          {
            "id": "making-appointments",
            "title": "Making Appointments",
            "titleHe": "קביעת תורים ופגישות",
            "desc": "Scheduling dates, confirming times, rescheduling courteously."
          },
          {
            "id": "making-complaints",
            "title": "Making Complaints",
            "titleHe": "הגשת תלונות באופן מנומס",
            "desc": "Expressing dissatisfaction firmly yet politely to get resolutions."
          },
          {
            "id": "returning-products",
            "title": "Returning Products",
            "titleHe": "החזרת מוצרים וקבלת זיכוי",
            "desc": "Refunds, exchanges, presenting receipts, faulty merchandise."
          }
        ]
      },
      {
        "id": "professional-emergency",
        "title": "Professional & Emergency",
        "titleHe": "עבודה ומצבי חירום",
        "subtopics": [
          {
            "id": "at-the-workplace",
            "title": "At the Workplace",
            "titleHe": "במקום העבודה",
            "desc": "Standups, deadline updates, collaborative tasks, and workplace etiquette."
          },
          {
            "id": "at-job-interview",
            "title": "At a Job Interview",
            "titleHe": "בראיון עבודה",
            "desc": "Presenting accomplishments, answering difficult questions, confident closing."
          },
          {
            "id": "online-communication",
            "title": "Online Communication",
            "titleHe": "תקשורת מקוונת",
            "desc": "Slack etiquette, Zoom etiquette, collaborative comments, email tone."
          },
          {
            "id": "social-situations",
            "title": "Social Situations",
            "titleHe": "מצבים חברתיים ואירוח",
            "desc": "Housewarming gifts, dinner parties, congratulations, condolences."
          },
          {
            "id": "emergency-situations",
            "title": "Emergency Situations",
            "titleHe": "מצבי חירום (999 / 112)",
            "desc": "Calling emergency services, reporting accidents, urgent first aid terms."
          }
        ]
      }
    ]
  },
  {
    "id": "common-mistakes",
    "number": 15,
    "title": "Common Mistakes",
    "titleHe": "טעויות נפוצות ומניעתן",
    "icon": "fa-triangle-exclamation",
    "subHeaders": [
      {
        "id": "grammar-traps",
        "title": "Grammatical Traps",
        "titleHe": "מלכודות דקדוקיות",
        "subtopics": [
          {
            "id": "common-grammar-mistakes",
            "title": "Common Grammar Mistakes",
            "titleHe": "שגיאות דקדוק נפוצות",
            "desc": "Double negatives, misplaced modifiers, and sentence fragments."
          },
          {
            "id": "incorrect-verb-forms",
            "title": "Incorrect Verb Forms",
            "titleHe": "צורות פועל שגויות",
            "desc": "Confusing past simple and past participle (I seen -> I saw)."
          },
          {
            "id": "incorrect-tenses",
            "title": "Incorrect Tenses",
            "titleHe": "שימוש שגוי בזמנים",
            "desc": "Using present tense with past time markers (Yesterday I go -> I went)."
          },
          {
            "id": "subject-verb-agreement-errors",
            "title": "Subject-Verb Agreement Errors",
            "titleHe": "שגיאות התאמת נושא ונשוא",
            "desc": "Everyone are -> Everyone is; Neither of the boys were -> was."
          },
          {
            "id": "article-mistakes",
            "title": "Article Mistakes",
            "titleHe": "טעויות בתוויות יידוע (a/an/the)",
            "desc": "Omitting 'the' before unique nouns or adding 'a' to uncountable nouns."
          },
          {
            "id": "preposition-mistakes",
            "title": "Preposition Mistakes",
            "titleHe": "טעויות במילות יחס",
            "desc": "In the bus -> on the bus; married with -> married to; depend of -> depend on."
          },
          {
            "id": "word-order-mistakes",
            "title": "Word Order Mistakes",
            "titleHe": "שגיאות בסדר מילים",
            "desc": "Incorrect indirect questions (Can you tell me where is it? -> where it is)."
          }
        ]
      },
      {
        "id": "word-usage-traps",
        "title": "Word & Expression Traps",
        "titleHe": "מלכודות בבחירת מילים",
        "subtopics": [
          {
            "id": "incorrect-word-choices",
            "title": "Incorrect Word Choices",
            "titleHe": "בחירת מילים שגויה (Make vs Do)",
            "desc": "Make a mistake (not do a mistake); do business (not make business)."
          },
          {
            "id": "false-friends",
            "title": "False Friends",
            "titleHe": "מילים מטעות (False Friends)",
            "desc": "Actually (meaning in reality, not currently); Eventually (in the end)."
          },
          {
            "id": "singular-vs-plural-errors",
            "title": "Singular vs Plural Errors",
            "titleHe": "שגיאות יחיד/רבים בשמות שאינם ספירים",
            "desc": "Informations -> information; advices -> advice; furnitures -> furniture."
          },
          {
            "id": "pronoun-errors",
            "title": "Pronoun Errors",
            "titleHe": "שגיאות בכינויי גוף",
            "desc": "Me and him went -> He and I went; between you and I -> between you and me."
          }
        ]
      },
      {
        "id": "mechanics-translation-traps",
        "title": "Mechanics & Translation Traps",
        "titleHe": "שגיאות איות ותרגום מילולי",
        "subtopics": [
          {
            "id": "spelling-mistakes-traps",
            "title": "Spelling Mistakes",
            "titleHe": "שגיאות איות נפוצות",
            "desc": "Their / there / they're; your / you're; its / it's; loose / lose."
          },
          {
            "id": "punctuation-mistakes-traps",
            "title": "Punctuation Mistakes",
            "titleHe": "שגיאות פיסוק נפוצות",
            "desc": "Comma splices joining independent clauses without conjunctions."
          },
          {
            "id": "pronunciation-mistakes-traps",
            "title": "Pronunciation Mistakes",
            "titleHe": "שגיאות הגייה נפוצות",
            "desc": "Pronouncing silent B in debt/subtle, or silent P in receipt."
          },
          {
            "id": "literal-translation-mistakes",
            "title": "Literal Translation Mistakes",
            "titleHe": "טעויות תרגום מילולי מעברית",
            "desc": "Calques like 'open the light' -> turn on the light; 'I have 20 years' -> I am 20."
          }
        ]
      }
    ]
  },
  {
    "id": "thinking-in-english",
    "number": 16,
    "title": "Thinking in English",
    "titleHe": "חשיבה באנגלית",
    "icon": "fa-brain",
    "subHeaders": [
      {
        "id": "internal-monologue",
        "title": "Mindset Shift & Internal Voice",
        "titleHe": "שינוי תפיסתי וקול פנימי",
        "subtopics": [
          {
            "id": "stopping-translation",
            "title": "Stopping Translation in Your Head",
            "titleHe": "הפסקת התרגום בראש",
            "desc": "Breaking the bilingual mental bottleneck by associating concepts directly with English."
          },
          {
            "id": "building-inner-monologue",
            "title": "Building an Inner Monologue",
            "titleHe": "בניית מונולוג פנימי באנגלית",
            "desc": "Shifting everyday silent inner thoughts into continuous English narration."
          },
          {
            "id": "self-talk-english",
            "title": "Self-Talk in English",
            "titleHe": "דיבור עצמי באנגלית",
            "desc": "Whispering or thinking your daily actions in real time while cooking or walking."
          },
          {
            "id": "thinking-in-words-phrases",
            "title": "Thinking in Words and Phrases",
            "titleHe": "חשיבה בביטויים ובלוקים",
            "desc": "Memorizing prefabricated lexical chunks rather than translating word by word."
          },
          {
            "id": "describing-day-mentally",
            "title": "Describing Your Day Mentally",
            "titleHe": "תיאור סדר היום במחשבה",
            "desc": "Rehearsing morning routines and evening reflections silently in English."
          }
        ]
      },
      {
        "id": "speed-immersion",
        "title": "Speed & Immersion",
        "titleHe": "מהירות תגובה וטבילה בשפה",
        "subtopics": [
          {
            "id": "fast-response-practice",
            "title": "Fast Response Practice",
            "titleHe": "אימון תגובה מהירה (3 שניות)",
            "desc": "The 3-second challenge: answering spoken prompts immediately without hesitation."
          },
          {
            "id": "overcoming-hesitation",
            "title": "Overcoming Hesitation",
            "titleHe": "התגברות על היסוס ופחד מטעויות",
            "desc": "Valuing communication and flow over perfectionism during spoken discourse."
          },
          {
            "id": "immersion-at-home",
            "title": "Immersion at Home",
            "titleHe": "טבילה בשפה בסביבה הביתית",
            "desc": "Setting phone, computer, and notes to English to build total immersion."
          },
          {
            "id": "english-media-consumption",
            "title": "English Media Consumption",
            "titleHe": "צריכת מדיה בלעדית באנגלית",
            "desc": "Replacing podcasts, YouTube, and news sources with authentic English media."
          },
          {
            "id": "reacting-without-hesitation",
            "title": "Reacting in English Without Hesitation",
            "titleHe": "תגובות אינסטינקטיביות",
            "desc": "Instinctive reactions (Ouch!, Oh really?, Absolutely!, Spot on!) without translating."
          }
        ]
      }
    ]
  },
  {
    "id": "learning-techniques",
    "number": 17,
    "title": "English Learning Techniques",
    "titleHe": "שיטות וטכניקות לימוד מואץ",
    "icon": "fa-graduation-cap",
    "subHeaders": [
      {
        "id": "core-study-protocols",
        "title": "Core Study Protocols",
        "titleHe": "פרוטוקולי למידה מרכזיים",
        "subtopics": [
          {
            "id": "flashcards-spaced-repetition",
            "title": "Flashcards (Spaced Repetition)",
            "titleHe": "כרטיסיות חזרה במרווחים",
            "desc": "Reviewing vocabulary right before the brain is about to forget using Leitner algorithms."
          },
          {
            "id": "vocabulary-notebooks",
            "title": "Vocabulary Notebooks",
            "titleHe": "מחברות אוצר מילים מסודרות",
            "desc": "Recording collocations, preposition partners, and personal example sentences."
          },
          {
            "id": "daily-reading-technique",
            "title": "Daily Reading",
            "titleHe": "קריאה יומיומית מובנית",
            "desc": "Reading 15-20 minutes daily across graded and authentic texts."
          },
          {
            "id": "daily-listening-technique",
            "title": "Daily Listening",
            "titleHe": "האזנה יומיומית",
            "desc": "Ear-training with podcasts and radio to build acoustic pattern recognition."
          },
          {
            "id": "shadowing-technique-learning",
            "title": "Shadowing Technique",
            "titleHe": "טכניקת Shadowing לדיבור",
            "desc": "Mirroring native British speech rhythm, stress, and pronunciation simultaneously."
          },
          {
            "id": "dictation-practice-learning",
            "title": "Dictation Practice",
            "titleHe": "תרגול הכתבות",
            "desc": "Writing down spoken audio verbatim to bridge the gap between spelling and sound."
          }
        ]
      },
      {
        "id": "active-practice-feedback",
        "title": "Active Practice & Feedback",
        "titleHe": "תרגול פעיל ומשוב",
        "subtopics": [
          {
            "id": "speaking-practice-technique",
            "title": "Speaking Practice",
            "titleHe": "תרגול דיבור פעיל",
            "desc": "Voice memo journaling, language exchanges, and talking aloud daily."
          },
          {
            "id": "writing-practice-technique",
            "title": "Writing Practice",
            "titleHe": "תרגול כתיבה יומיומי",
            "desc": "Daily journal reflections, 100-word summaries, and essay writing."
          },
          {
            "id": "grammar-exercises-technique",
            "title": "Grammar Exercises",
            "titleHe": "תרגילי דקדוק ממוקדים",
            "desc": "Targeted fill-in-the-blank and transformation exercises with immediate feedback."
          },
          {
            "id": "vocabulary-quizzes-technique",
            "title": "Vocabulary Quizzes",
            "titleHe": "חידוני אוצר מילים פעילים",
            "desc": "Active recall testing over passive recognition to solidify long-term retention."
          },
          {
            "id": "error-tracking-technique",
            "title": "Error Tracking & Mistake Logs",
            "titleHe": "מעקב טעויות ויומן שגיאות",
            "desc": "Logging personal grammar and word errors to deliberately prevent recurrence."
          }
        ]
      },
      {
        "id": "immersion-entertainment",
        "title": "Immersion & Entertainment",
        "titleHe": "למידה דרך מדיה והנאה",
        "subtopics": [
          {
            "id": "learning-through-movies",
            "title": "Learning Through Movies",
            "titleHe": "לימוד דרך סרטים וטלוויזיה",
            "desc": "Using English subtitles first, then disabling subtitles for natural comprehension."
          },
          {
            "id": "learning-through-podcasts",
            "title": "Learning Through Podcasts",
            "titleHe": "לימוד דרך פודקאסטים",
            "desc": "Listening at 1.0x and 1.2x speed to accustom ears to rapid natural delivery."
          },
          {
            "id": "learning-through-games",
            "title": "Learning Through Games",
            "titleHe": "לימוד דרך משחקים ואפליקציות",
            "desc": "Gamifying vocabulary retention with timed challenges, quizzes, and vault achievements."
          }
        ]
      }
    ]
  }
];

/**
 * Generate rich tailored lesson content and practice exercises for any subtopic
 */
const CUSTOM_LESSONS = {
  "nouns": {
    "rules": [
      {
        "title": "Noun Classes & Countability",
        "details": "Nouns are either Countable (a book / three books) or Uncountable (information, advice, furniture). Uncountable nouns never take 'a/an' or a plural -s."
      },
      {
        "title": "Proper vs Common Nouns",
        "details": "Proper nouns (London, Shakespeare, Tuesday, October) always require a capital letter regardless of where they appear in a sentence."
      },
      {
        "title": "Collective Nouns in British English",
        "details": "In British English, collective nouns (the team, the government, the staff) can take either singular or plural verbs depending on whether you view them as a unit or as individuals (e.g. 'The team are playing brilliantly today')."
      }
    ],
    "examples": [
      {
        "sentence": "The museum in Kensington houses an extraordinary collection of Victorian artifacts.",
        "note": "Proper and common nouns functioning as subject and object."
      },
      {
        "sentence": "Could you give me some advice on applying for British university scholarships?",
        "note": "'Advice' is an uncountable noun and cannot be pluralized."
      },
      {
        "sentence": "The committee have reached an agreement after a lengthy deliberation.",
        "note": "British collective noun taking plural agreement."
      }
    ],
    "practice": [
      {
        "question": "Which of the following nouns is UNCOUNTABLE in standard British English?",
        "options": [
          "Advice",
          "Suggestion",
          "Book",
          "Chair"
        ],
        "correctIndex": 0,
        "explanation": "'Advice' is uncountable; you cannot say 'an advice' or 'two advices'. Use 'a piece of advice' instead."
      },
      {
        "question": "In British English, which sentence is completely acceptable when referring to a collective noun?",
        "options": [
          "The committee are currently debating the proposal in parliament.",
          "The committee am currently debating the proposal.",
          "The committee be debating the proposal.",
          "The committees is currently debating."
        ],
        "correctIndex": 0,
        "explanation": "British English naturally permits plural verbs with collective nouns ('The committee are debating') when viewing members individually."
      }
    ]
  },
  "verbs": {
    "rules": [
      {
        "title": "Dynamic vs Stative Verbs",
        "details": "Dynamic verbs describe actions (run, write, eat) and can take continuous (-ing) forms. Stative verbs describe states, feelings, or thoughts (believe, understand, prefer, know, belong) and rarely appear in continuous tenses."
      },
      {
        "title": "Transitive vs Intransitive Verbs",
        "details": "Transitive verbs require a direct object ('She wrote a letter'). Intransitive verbs do not take an object ('The train arrived on time')."
      },
      {
        "title": "Irregular Past Forms",
        "details": "Master core irregular verbs where past simple and past participle differ (e.g. write/wrote/written, sing/sang/sung, go/went/gone)."
      }
    ],
    "examples": [
      {
        "sentence": "I thoroughly understand the principles behind British constitutional law.",
        "note": "'Understand' is a stative verb; avoid 'I am understanding'."
      },
      {
        "sentence": "The courier delivered the sensitive parcels directly to the ambassador's residence.",
        "note": "'Delivered' is a transitive verb followed by the direct object 'the parcels'."
      },
      {
        "sentence": "The express coach has already departed from Victoria Coach Station.",
        "note": "Intransitive verb 'depart' with present perfect tense."
      }
    ],
    "practice": [
      {
        "question": "Which sentence correctly uses a stative verb?",
        "options": [
          "I understand your explanation completely.",
          "I am understanding your explanation completely.",
          "I am believing in your innocence.",
          "She is preferring tea over coffee."
        ],
        "correctIndex": 0,
        "explanation": "'Understand' is a stative verb describing a mental state; it should not be used in the present continuous tense."
      },
      {
        "question": "What is the past participle form of the irregular verb 'break'?",
        "options": [
          "Broken",
          "Broke",
          "Breaked",
          "Broked"
        ],
        "correctIndex": 0,
        "explanation": "The principal parts of 'break' are: break (base), broke (past simple), broken (past participle)."
      }
    ]
  },
  "present-simple": {
    "rules": [
      {
        "title": "Habitual Actions & General Truths",
        "details": "Use Present Simple for recurring routines, scientific facts, and permanent states (e.g. 'Water boils at 100°C', 'I commute by train every morning')."
      },
      {
        "title": "The Third-Person Singular -S Rule",
        "details": "Always add -s, -es, or -ies to the verb when the subject is he, she, it, or a singular noun (e.g. 'He lives in Bristol', 'She catches the bus')."
      },
      {
        "title": "Fixed Timetables & Schedules",
        "details": "Present Simple is used for future events that follow a fixed public schedule or timetable ('The flight departs tomorrow at 06:00')."
      }
    ],
    "examples": [
      {
        "sentence": "The express train to Edinburgh departs from platform 4 every weekday at 08:15.",
        "note": "Fixed public timetable using Present Simple."
      },
      {
        "sentence": "She manages an established publishing firm in central London.",
        "note": "Permanent state with third-person singular -s."
      },
      {
        "sentence": "British citizens rarely complain loudly in public places.",
        "note": "Habitual cultural trait using adverb of frequency 'rarely'."
      }
    ],
    "practice": [
      {
        "question": "Choose the grammatically correct Present Simple sentence:",
        "options": [
          "He usually catches the early morning train to Leeds.",
          "He usually catch the early morning train to Leeds.",
          "He is usually catch the early morning train to Leeds.",
          "He usually catching the early morning train to Leeds."
        ],
        "correctIndex": 0,
        "explanation": "In Present Simple, third-person singular (He) requires the verb ending '-es' ('catches')."
      },
      {
        "question": "Why is Present Simple used in: 'The conference begins on Monday at 09:00'?",
        "options": [
          "Because it expresses a fixed official schedule or timetable",
          "Because the action is happening right at this very second",
          "Because it happened in the distant past",
          "Because it is an impossible hypothetical situation"
        ],
        "correctIndex": 0,
        "explanation": "Present Simple frequently conveys scheduled future events tied to official timetables."
      }
    ]
  },
  "present-perfect": {
    "rules": [
      {
        "title": "Connecting Past Actions to the Present",
        "details": "Formed with 'have/has + past participle'. Use it for past experiences when the exact time is unstated, or for actions in an unfinished time period (today, this week, in my lifetime)."
      },
      {
        "title": "Present Perfect vs Past Simple",
        "details": "If a specific past time is stated (yesterday, in 2018, two hours ago), you MUST use Past Simple. If time is unstated or ongoing (already, yet, since, for), use Present Perfect."
      },
      {
        "title": "Been to vs Gone to",
        "details": "'She has been to London' means she visited and has now returned. 'She has gone to London' means she is still in London or currently traveling there."
      }
    ],
    "examples": [
      {
        "sentence": "I have lived in Oxford for six years, and I continue to work at the university.",
        "note": "Action began in the past and continues into the present."
      },
      {
        "sentence": "Have you ever tasted traditional British fish and chips in Yorkshire?",
        "note": "Life experience query with 'ever' and unspecified past time."
      },
      {
        "sentence": "The diplomat has just arrived at Downing Street for urgent talks.",
        "note": "'Just' marks an action completed moments before the present."
      }
    ],
    "practice": [
      {
        "question": "Which sentence is grammatically correct?",
        "options": [
          "I have seen that documentary three times in my life.",
          "I have seen that documentary yesterday evening.",
          "I saw that documentary three times in my life already yet.",
          "I has seen that documentary last week."
        ],
        "correctIndex": 0,
        "explanation": "Life experiences without a specific finished time word use Present Perfect ('I have seen'). Specific past times like 'yesterday' require Past Simple ('I saw')."
      },
      {
        "question": "What does 'George has gone to Manchester' mean?",
        "options": [
          "George is currently in Manchester or on his way there.",
          "George visited Manchester in the past and is back home now.",
          "George has never visited Manchester.",
          "George refuses to visit Manchester."
        ],
        "correctIndex": 0,
        "explanation": "'Has gone to' indicates that the person has traveled there and has not yet returned."
      }
    ]
  },
  "zero-conditional": {
    "rules": [
      {
        "title": "Scientific Truths & General Realities",
        "details": "Structure: 'If / When + Present Simple, ... Present Simple'. Used for universal laws of nature, scientific facts, and automatic results that happen 100% of the time."
      },
      {
        "title": "Interchangeability of 'If' and 'When'",
        "details": "In Zero Conditional sentences, 'if' can be replaced by 'when' with no change in meaning because the outcome is guaranteed (e.g. 'When water reaches 100°C, it boils')."
      }
    ],
    "examples": [
      {
        "sentence": "If you heat ice, it melts into water.",
        "note": "Universal physical reality using Present Simple in both clauses."
      },
      {
        "sentence": "When temperatures drop below zero, puddles on the pavement freeze over.",
        "note": "'When' replaces 'if' to state a certain recurring condition."
      }
    ],
    "practice": [
      {
        "question": "Which of the following is a classic Zero Conditional sentence?",
        "options": [
          "If you mix red and blue, you get purple.",
          "If you study tonight, you will pass tomorrow.",
          "If I had money, I would buy a car.",
          "If it had rained, we would have stayed inside."
        ],
        "correctIndex": 0,
        "explanation": "'If you mix red and blue, you get purple' expresses a constant scientific fact using Present Simple in both clauses."
      }
    ]
  },
  "first-conditional": {
    "rules": [
      {
        "title": "Real & Probable Future Scenarios",
        "details": "Structure: 'If + Present Simple, ... will + base verb'. Describes a realistic, possible condition in the present or future and its probable consequence."
      },
      {
        "title": "No 'Will' Inside the If-Clause",
        "details": "Never place 'will' inside the if-clause itself (incorrect: 'If it will rain'; correct: 'If it rains, we will stay indoors')."
      }
    ],
    "examples": [
      {
        "sentence": "If you book your train tickets well in advance, you will save a considerable sum.",
        "note": "Real condition with probable future financial saving."
      },
      {
        "sentence": "If the rain eases before noon, we shall take a walk through Hyde Park.",
        "note": "British usage of 'shall' with 'we' for future intention."
      }
    ],
    "practice": [
      {
        "question": "Identify the correct First Conditional sentence:",
        "options": [
          "If it rains tomorrow, we will postpone the garden tour.",
          "If it will rain tomorrow, we will postpone the tour.",
          "If it rained tomorrow, we would postpone the tour.",
          "If it rain tomorrow, we will postpone."
        ],
        "correctIndex": 0,
        "explanation": "The condition clause takes Present Simple ('If it rains'), while the result takes 'will + base verb'."
      }
    ]
  },
  "second-conditional": {
    "rules": [
      {
        "title": "Hypothetical & Improbable Scenarios",
        "details": "Structure: 'If + Past Simple, ... would + base verb'. Used for dreams, imaginary situations, or impossible conditions in the present or future."
      },
      {
        "title": "The Subjunctive 'Were' Rule",
        "details": "In formal and standard English, use 'were' for all persons in the if-clause: 'If I were you...', 'If he were here today...'."
      }
    ],
    "examples": [
      {
        "sentence": "If I were you, I would accept the fellowship at Oxford without hesitation.",
        "note": "Giving diplomatic advice using the subjunctive 'If I were you'."
      },
      {
        "sentence": "If they had sufficient capital, they would open a bookshop in Bath.",
        "note": "Hypothetical present situation contrary to reality."
      }
    ],
    "practice": [
      {
        "question": "Complete the sentence: 'If she _____ the managing director, she would reform company policy.'",
        "options": [
          "were",
          "was be",
          "is",
          "will be"
        ],
        "correctIndex": 0,
        "explanation": "In standard Second Conditional, 'were' is preferred across all persons for hypothetical states ('If she were')."
      }
    ]
  },
  "third-conditional": {
    "rules": [
      {
        "title": "Past Regrets & Alternate History",
        "details": "Structure: 'If + Past Perfect (had + past participle), ... would have + past participle'. Used for hypothetical past situations that never occurred and cannot be altered."
      },
      {
        "title": "Expressing What Could Have Happened",
        "details": "Modal variations include 'could have' (past ability) or 'might have' (past possibility) instead of 'would have'."
      }
    ],
    "examples": [
      {
        "sentence": "If you had arrived on time, we would have caught the express coach to Oxford.",
        "note": "Past regret: you did not arrive on time, so we missed the coach."
      },
      {
        "sentence": "If the pilot had received the warning, the flight could have diverted safely.",
        "note": "Past hypothetical with 'could have'."
      }
    ],
    "practice": [
      {
        "question": "Choose the correct Third Conditional structure:",
        "options": [
          "If I had known about the delay, I would have notified you sooner.",
          "If I knew about the delay, I would have notified you.",
          "If I had known about the delay, I will notify you.",
          "If I would know about the delay, I had notified you."
        ],
        "correctIndex": 0,
        "explanation": "Third Conditional requires 'If + Past Perfect (had known)' and 'would have + past participle (would have notified)'."
      }
    ]
  },
  "passive-voice": {
    "rules": [
      {
        "title": "Focus on the Action, Not the Actor",
        "details": "Form: 'be (in appropriate tense) + past participle'. Use passive when the agent is unknown, irrelevant, obvious, or when establishing an objective formal tone."
      },
      {
        "title": "Agent Marker with 'By'",
        "details": "If you wish to mention who performed the action, introduce them with 'by' at the end of the clause (e.g. 'The symphony was composed by Elgar')."
      }
    ],
    "examples": [
      {
        "sentence": "The historic treaty was signed in London by senior representatives from both nations.",
        "note": "Past simple passive focusing on the document and the historic event."
      },
      {
        "sentence": "New safety regulations are being implemented across the entire rail network.",
        "note": "Present continuous passive ('are being implemented')."
      }
    ],
    "practice": [
      {
        "question": "Convert to passive voice: 'Charles Dickens wrote Great Expectations.'",
        "options": [
          "Great Expectations was written by Charles Dickens.",
          "Great Expectations is written by Charles Dickens.",
          "Great Expectations had been written by Charles Dickens.",
          "Great Expectations wrote Charles Dickens."
        ],
        "correctIndex": 0,
        "explanation": "The active sentence is in Past Simple ('wrote'), so the passive is 'was written by Charles Dickens'."
      }
    ]
  },
  "collocations": {
    "rules": [
      {
        "title": "Natural Word Partnerships",
        "details": "Collocations are words that naturally belong together in English. Native speakers instantly recognize unnatural pairings (e.g. 'make an effort' vs *'do an effort')."
      },
      {
        "title": "Core Verb Collocations (Make vs Do)",
        "details": "Use 'Make' for creating, producing, or deciding ('make a decision', 'make a cake', 'make money'). Use 'Do' for tasks, work, and general activities ('do homework', 'do research', 'do business')."
      }
    ],
    "examples": [
      {
        "sentence": "The board of directors made a crucial decision regarding overseas expansion.",
        "note": "'Make a decision' is a fixed standard collocation."
      },
      {
        "sentence": "Before publishing the report, the scientists did extensive research.",
        "note": "'Do research' is the correct pairing, never 'make research'."
      }
    ],
    "practice": [
      {
        "question": "Which of the following is an authentic English collocation?",
        "options": [
          "Make an effort",
          "Do an effort",
          "Create an effort",
          "Form an effort"
        ],
        "correctIndex": 0,
        "explanation": "'Make an effort' is the standard fixed collocation in English."
      }
    ]
  },
  "at-the-restaurant": {
    "rules": [
      {
        "title": "Polite Requests & Ordering",
        "details": "Use courteous modals when ordering: 'Could I please have...', 'I'll have the...', or 'Would you recommend...'. Avoid blunt imperatives like 'Give me...'."
      },
      {
        "title": "Asking for the Bill in the UK",
        "details": "In Britain, always say 'Could we have the bill, please?' (not 'check', which is American). In pubs, you usually pay immediately at the bar when ordering drinks."
      }
    ],
    "examples": [
      {
        "sentence": "Could we please have the bill whenever it is convenient for you?",
        "note": "Classic polite British phrasing at the end of a meal."
      },
      {
        "sentence": "Excuse me, could you tell me if this soup contains dairy?",
        "note": "Courteous inquiry regarding dietary restrictions."
      }
    ],
    "practice": [
      {
        "question": "What is the standard, polite British way to ask for payment at a restaurant table?",
        "options": [
          "Could we please have the bill?",
          "Give me the check right now!",
          "I want to pay money immediately.",
          "Bring the price ticket over here."
        ],
        "correctIndex": 0,
        "explanation": "In British English, 'Could we please have the bill?' is the universally accepted polite phrasing."
      }
    ]
  },
  "shadowing-technique": {
    "rules": [
      {
        "title": "The Science of Speech Shadowing",
        "details": "Shadowing involves listening to native audio and speaking the words out loud almost simultaneously (with a delay of only 0.2 to 0.5 seconds). It trains motor memory, intonation, and rhythm."
      },
      {
        "title": "Three-Stage Shadowing Routine",
        "details": "1. Listen to the audio once for comprehension. 2. Shadow with the text in front of you. 3. Shadow blind without looking at any text to mirror vocal cadence."
      }
    ],
    "examples": [
      {
        "sentence": "Shadowing BBC Radio broadcasts for 15 minutes each morning transformed my British intonation.",
        "note": "Daily practice recommendation for accent improvement."
      },
      {
        "sentence": "By mimicking the speaker's exact rhythm, your tongue adapts to natural connected speech.",
        "note": "Motor learning benefit of the shadowing method."
      }
    ],
    "practice": [
      {
        "question": "What is the primary action involved in the Shadowing technique?",
        "options": [
          "Speaking the words out loud simultaneously as you hear the native speaker",
          "Translating every word silently into your native language with a dictionary",
          "Memorizing written grammar tables without listening to any audio",
          "Reading aloud in a dark room with the lights turned off"
        ],
        "correctIndex": 0,
        "explanation": "Shadowing is an audio-motor technique where you speak alongside a native audio track with a fraction of a second delay to absorb cadence and pronunciation."
      }
    ]
  }
};

export function getSubtopicLesson(pillarId, subHeaderId, subtopicId) {
  // Find pillar, subheader and subtopic
  const pillar = CURRICULUM_PILLARS.find(p => p.id === pillarId);
  if (!pillar) return null;

  let foundSubHeader = null;
  let foundSubtopic = null;

  for (const sh of pillar.subHeaders) {
    const st = sh.subtopics.find(s => s.id === subtopicId);
    if (st) {
      foundSubHeader = sh;
      foundSubtopic = st;
      break;
    }
  }

  if (!foundSubtopic) return null;

  // Build comprehensive educational lesson details
  const title = foundSubtopic.title;
  const titleHe = foundSubtopic.titleHe;
  const desc = foundSubtopic.desc;

  // High quality tailored examples and rules
  
  const custom = CUSTOM_LESSONS[foundSubtopic.id];
  if (custom) {
    return {
      id: foundSubtopic.id,
      pillarId: pillar.id,
      pillarTitle: pillar.title,
      pillarNumber: pillar.number,
      subHeaderId: foundSubHeader.id,
      subHeaderTitle: foundSubHeader.title,
      subHeaderTitleHe: foundSubHeader.titleHe,
      title: title,
      titleHe: titleHe,
      description: desc,
      rules: custom.rules || [],
      examples: custom.examples || [],
      practice: custom.practice || []
    };
  }

  const lesson = {
    id: foundSubtopic.id,
    pillarId: pillar.id,
    pillarTitle: pillar.title,
    pillarNumber: pillar.number,
    subHeaderId: foundSubHeader.id,
    subHeaderTitle: foundSubHeader.title,
    subHeaderTitleHe: foundSubHeader.titleHe,
    title: title,
    titleHe: titleHe,
    description: desc,
    rules: [
      {
        title: `Core Concept of ${title}`,
        details: `In British English, ${title} (${titleHe}) forms an essential element of natural communication. ${desc}`
      },
      {
        title: "Key Structural Pattern & Usage",
        details: `Apply ${title} systematically in context: maintain strict agreement, pay close attention to collocations, and adhere to authentic British English register.`
      },
      {
        title: "British English Nuance & Politeness",
        details: `Native British speakers often combine ${title} with polite hedging and clear sentence structure to communicate with precision, understatement, and clarity.`
      }
    ],
    examples: [
      {
        sentence: `Mastering ${title} allows you to express complex ideas with total fluency in British English.`,
        note: `Standard usage in formal and professional British contexts.`
      },
      {
        sentence: `During our discussion in London, the speaker highlighted the importance of ${title.toLowerCase()} in everyday communication.`,
        note: `Natural spoken cadence with authentic British vocabulary.`
      },
      {
        sentence: `Could you please verify whether this example illustrates ${title.toLowerCase()} accurately?`,
        note: `Polite conversational question format common across the UK.`
      }
    ],
    practice: [
      {
        question: `Which of the following statements best describes the primary function of "${title}"?`,
        options: [
          `It serves as ${desc.toLowerCase()}.`,
          `It is only used in medieval literature and has no modern application.`,
          `It completely replaces all verbs in an English sentence.`,
          `It is strictly forbidden in formal British correspondence.`
        ],
        correctIndex: 0,
        explanation: `Correct! ${title} is defined as: ${desc}`
      },
      {
        question: `In standard British English, when applying "${title}", what is the recommended practice?`,
        options: [
          `Ignore grammar conventions and translate word-by-word from your native language.`,
          `Apply it within natural collocations, observing proper word order and register.`,
          `Always use American slang regardless of the conversational setting.`,
          `Avoid using it entirely in academic or workplace writing.`
        ],
        correctIndex: 1,
        explanation: `Correct! In British English, using ${title} naturally within established collocations and correct register ensures maximum clarity and elegance.`
      },
      {
        question: `Choose the sentence that correctly integrates "${title}":`,
        options: [
          `"Understanding ${title.toLowerCase()} significantly elevates your spoken and written British English."`,
          `"The understanding of ${title.toLowerCase()} does not matter at all for fluency."`,
          `"Yesterday they has forgot how to use ${title.toLowerCase()} properly."`,
          `"Nobody cannot understand ${title.toLowerCase()} without translating."`
        ],
        correctIndex: 0,
        explanation: `Correct! The first sentence is grammatically flawless, elegant, and uses natural British English vocabulary and syntax.`
      }
    ]
  };

  return lesson;
}
