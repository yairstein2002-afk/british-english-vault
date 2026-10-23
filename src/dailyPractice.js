/**
 * British English Vault - Daily Practice (מעבדת כתיבה יומית באנגלית)
 * Pure English writing workbench with deep multi-rule grammar & spelling verification,
 * comprehensive explanations ("למה טעיתי"), exact corrections ("מה צריך לעשות נכון"),
 * and history filtered by days.
 */

import { speakText } from './speech.js';

const DAILY_PRACTICE_HISTORY_KEY = 'bev_daily_practice_history';
const DAILY_PRACTICE_STATS_KEY = 'bev_daily_practice_stats';

// Daily prompts for writing inspiration
export const PRACTICE_PROMPTS = [
  { id: 'free', title: '💭 Free Topic', hint: 'Write about anything on your mind: your day, your goals, or what you learned recently.' },
  { id: 'day', title: '☕ Daily Life', hint: 'Describe the most interesting, challenging, or enjoyable moment of your day.' },
  { id: 'opinion', title: '🗣️ Express Opinion', hint: 'Should people read books every day? Explain your view with 2 clear reasons.' },
  { id: 'london', title: '🇬🇧 A Day in the UK', hint: 'If you had 24 hours in London or Edinburgh, where would you go and why?' },
  { id: 'work', title: '💼 Work & Ambition', hint: 'Talk about a skill you are trying to master or a career milestone you aim to reach.' }
];

let activePrompt = PRACTICE_PROMPTS[0];
let currentHistoryFilter = 'all'; // 'all', 'today', 'yesterday', 'week', 'month'

/**
 * Storage & History Management
 */
export function getDailyPracticeHistory() {
  try {
    const raw = localStorage.getItem(DAILY_PRACTICE_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveDailyPracticeEntry(entry) {
  const history = getDailyPracticeHistory();
  history.unshift(entry);
  if (history.length > 100) history.pop();
  localStorage.setItem(DAILY_PRACTICE_HISTORY_KEY, JSON.stringify(history));

  const stats = getDailyPracticeStats();
  stats.totalCount = (stats.totalCount || 0) + 1;
  stats.xp = (stats.xp || 0) + 35;
  localStorage.setItem(DAILY_PRACTICE_STATS_KEY, JSON.stringify(stats));

  return entry;
}

export function getDailyPracticeStats() {
  try {
    const raw = localStorage.getItem(DAILY_PRACTICE_STATS_KEY);
    return raw ? JSON.parse(raw) : { totalCount: 0, xp: 0 };
  } catch (e) {
    return { totalCount: 0, xp: 0 };
  }
}

/**
 * DEEP GRAMMAR, SPELLING & SYNTAX ERROR VERIFICATION ENGINE
 */
export function analyzeDailyWriting(rawText) {
  const text = (rawText || '').trim();
  if (!text) {
    return { success: false, error: 'Please write some English text before checking.' };
  }

  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const mistakes = [];
  const britishPolishes = [];
  let polished = text;

  // Helper to record a detected mistake safely
  const addMistake = (category, foundText, correctText, whyExplanation, whatToDo, regexToReplace = null) => {
    mistakes.push({
      category,
      found: foundText,
      correct: correctText,
      why: whyExplanation,
      whatToDo: whatToDo
    });
    if (regexToReplace) {
      polished = polished.replace(regexToReplace, correctText);
    }
  };

  // 1. SPELLING & TYPOS
  const spellingRules = [
    { regex: /\bteh\b/gi, found: 'teh', correct: 'the', why: 'שגיאת הקלדה נפוצה.', fix: 'יש להקליד the.' },
    { regex: /\brecieve\b/gi, found: 'recieve', correct: 'receive', why: 'כלל האיות הידוע באנגלית: I before E except after C.', fix: 'אחרי האות C כותבים ei -> receive.' },
    { regex: /\bseperate\b/gi, found: 'seperate', correct: 'separate', why: 'במילה separate האות השנייה היא a (יש "a rat" במילה sepa-rat-e).', fix: 'כתוב separate עם a.' },
    { regex: /\bdefinately\b/gi, found: 'definately', correct: 'definitely', why: 'המילה מגיעה מ-finite (סופי).', fix: 'יש לכתוב definitely עם i.' },
    { regex: /\buntill\b/gi, found: 'untill', correct: 'until', why: 'עד (until) נכתבת עם l אחת בלבד (רק בקיצור till יש שתיים).', fix: 'כתוב until עם l יחידה.' },
    { regex: /\bwritting\b/gi, found: 'writting', correct: 'writing', why: 'הפועל write מסתיים ב-e יחידה, לכן בהטיית ing אין הכפלת t.', fix: 'כתוב writing עם t אחת.' },
    { regex: /\balot\b/gi, found: 'alot', correct: 'a lot', why: 'המילים a ו-lot הן שתי מילים נפרדות.', fix: 'כתוב a lot עם רווח.' },
    { regex: /\b(tommorow|tommorrow)\b/gi, found: 'tommorow', correct: 'tomorrow', why: 'במילה tomorrow יש m אחת ו-r כפולה.', fix: 'כתוב tomorrow.' },
    { regex: /\bbeleive\b/gi, found: 'beleive', correct: 'believe', why: 'הכלל I before E.', fix: 'כתוב believe.' },
    { regex: /\bwich\b/gi, found: 'wich', correct: 'which', why: 'מילת השאלה "איזה/אשר" מתחילה ב-wh.', fix: 'כתוב which.' },
    { regex: /\b(becuase|becouse)\b/gi, found: 'becuase', correct: 'because', why: 'שגיאת איות נפוצה.', fix: 'כתוב because.' },
    { regex: /\bfreind\b/gi, found: 'freind', correct: 'friend', why: 'הכלל I before E.', fix: 'כתוב friend (זכור: fri-end).' },
    { regex: /\bknowlege\b/gi, found: 'knowlege', correct: 'knowledge', why: 'חסרה האות d.', fix: 'כתוב knowledge.' },
    { regex: /\bdiffrent\b/gi, found: 'diffrent', correct: 'different', why: 'חסרה האות e באמצע.', fix: 'כתוב different.' },
    { regex: /\bsuccesful\b/gi, found: 'succesful', correct: 'successful', why: 'במילה successful יש כפל באות c וכפל באות s.', fix: 'כתוב successful.' },
    { regex: /\btruely\b/gi, found: 'truely', correct: 'truly', why: 'בהוספת ly ל-true האות e נושרת.', fix: 'כתוב truly.' }
  ];

  spellingRules.forEach(rule => {
    if (rule.regex.test(polished)) {
      addMistake('שגיאת איות (Spelling)', rule.found, rule.correct, rule.why, rule.fix, rule.regex);
    }
  });

  // 2. CONFUSED HOMOPHONES (מילים שנשמעות דומה אך משמעותן שונה)
  if (/\btheir\s+(is|are|was|were)\b/i.test(polished)) {
    addMistake(
      'בלבול בין מילים (Homophones)',
      'their is/are',
      'there is/are',
      'their מציין שייכות ("שלהם"), ואילו there מציין קיום ("יש/שם").',
      'כדי לומר "יש", השתמש תמיד ב-there is / there are.',
      /\btheir\s+(is|are|was|were)\b/gi
    );
  }

  if (/\byour\s+(welcome|right|wrong|good)\b/i.test(polished)) {
    addMistake(
      'בלבול בין your ל-you\'re',
      'your welcome',
      'you\'re welcome',
      'your פירושו "שלך" (שייכות). you\'re הוא קיצור של you are ("אתה").',
      'השתמש ב-you\'re welcome ("על לא דבר").',
      /\byour\s+welcome\b/gi
    );
  }

  if (/\bits\s+(raining|cold|hot|important|nice|good|bad)\b/i.test(polished)) {
    addMistake(
      'בלבול בין its ל-it\'s',
      'its + adjective/verb',
      'it\'s',
      'its פירושו "שלו/שלה" לחפץ/חיה. it\'s עם גרש הוא קיצור של it is.',
      'לתיאור מצב (It is raining), השתמש ב-it\'s.',
      /\bits\s+(raining|cold|hot|important|nice|good|bad)\b/gi
    );
  }

  if (/\b(to\s+much|to\s+many|to\s+late|to\s+hard|to\s+easy|me\s+to)\b/i.test(polished)) {
    addMistake(
      'בלבול בין to ל-too',
      'to (במשמעות מדי/גם)',
      'too',
      'to משמש כמילת יחס ("אל"). too עם שתי o משמעותו "מדי" (too much) או "גם" (me too).',
      'הוסף o נוספת: too much / too late / me too.',
      /\bto\s+(much|many|late|hard|easy)\b/gi
    );
  }

  if (/\b(loose\s+(weight|the\s+game|my\s+keys|money|hope))\b/i.test(polished)) {
    addMistake(
      'בלבול בין loose ל-lose',
      'loose',
      'lose',
      'loose פירושו רפוי / משוחרר (למשל: loose pants). lose פירושו לאבד או להפסיד.',
      'השתמש ב-lose עם o אחת: lose weight, lose the game.',
      /\bloose\s+(weight|the\s+game|my\s+keys|money|hope)\b/gi
    );
  }

  if (/\b(better|more|less|worse|bigger|faster|older)\s+then\b/i.test(polished)) {
    addMistake(
      'בלבול בין then ל-than בהשוואה',
      'then',
      'than',
      'then פירושו "אז / אחר כך" (זמן). בהשוואה בין שני דברים משתמשים אך ורק ב-than ("מאשר").',
      'החלף ל-than: better than, more than.',
      /\b(better|more|less|worse|bigger|faster|older)\s+then\b/gi
    );
  }

  // 3. SUBJECT-VERB AGREEMENT (התאמת נושא ופועל)
  if (/\b(he|she|it)\s+(don't|do|have|are)\b/i.test(polished)) {
    const match = polished.match(/\b(he|she|it)\s+(don't|do|have|are)\b/i);
    addMistake(
      'התאמת נושא ופועל (Subject-Verb Agreement)',
      match ? match[0] : 'he/she/it + don\'t',
      'doesn\'t / does / has / is',
      'בגוף שלישי יחיד (He, She, It) הפועל מקבל s/es, ובשלילה משתמשים ב-doesn\'t ולא ב-don\'t.',
      'לדוגמה: "She doesn\'t know" ולא "She don\'t know".',
      /\bhe don't\b/gi
    );
    polished = polished
      .replace(/\bhe don't\b/gi, "he doesn't")
      .replace(/\bshe don't\b/gi, "she doesn't")
      .replace(/\bit don't\b/gi, "it doesn't")
      .replace(/\bhe have\b/gi, "he has")
      .replace(/\bshe have\b/gi, "she has")
      .replace(/\bit have\b/gi, "it has");
  }

  if (/\b(i|we|they|you)\s+(does|is|has)\b/i.test(polished)) {
    const match = polished.match(/\b(i|we|they|you)\s+(does|is|has)\b/i);
    addMistake(
      'התאמת פועל לגופי רבים / גוף ראשון',
      match ? match[0] : 'they is / we has',
      'do / are / have',
      'עם הגופים I, We, You, They משתמשים בצורת הבסיס/רבים של הפועל (are, have, do).',
      'לדוגמה: "We are ready" (ולא "We is"), "They have" (ולא "They has").',
      null
    );
    polished = polished
      .replace(/\bwe is\b/gi, "we are")
      .replace(/\bthey is\b/gi, "they are")
      .replace(/\byou is\b/gi, "you are")
      .replace(/\bwe has\b/gi, "we have")
      .replace(/\bthey has\b/gi, "they have");
  }

  if (/\b(everyone|everybody|someone|somebody|nobody|no one)\s+(are|were|have)\b/i.test(polished)) {
    addMistake(
      'התאמת כינוי בלתי מוגדר (Indefinite Pronouns)',
      'everyone/everybody + are/have',
      'everyone is / has',
      'מילים כמו everyone, everybody ו-nobody נתפסות בדקדוק האנגלי כגוף יחיד, ולכן דורשות פועל ביחיד (is/has).',
      'השתמש ב-everyone is / everybody has.',
      /\beveryone are\b/gi
    );
    polished = polished
      .replace(/\beveryone are\b/gi, "everyone is")
      .replace(/\beverybody are\b/gi, "everybody is");
  }

  // 4. VERB TENSES & DOUBLE PAST (זמני פועל ושגיאות עבר כפול)
  if (/\b(didn't|did not)\s+(went|saw|knew|had|came|bought|wrote|spoke)\b/i.test(polished)) {
    const match = polished.match(/\b(didn't|did not)\s+(\w+)\b/i);
    addMistake(
      'עבר כפול אחרי didn\'t (Double Past)',
      match ? match[0] : 'didn\'t went',
      'didn\'t + פועל בצורת מקור (Base Form)',
      'המילה didn\'t כבר נושאת את זמן העבר. הפועל שאחריה חייב לחזור לצורת המקור שלו (Infinitive).',
      'לדוגמה: "didn\'t go" (ולא "didn\'t went"), "didn\'t see" (ולא "didn\'t saw").',
      /\bdidn't went\b/gi
    );
    polished = polished
      .replace(/\bdidn't went\b/gi, "didn't go")
      .replace(/\bdidn't saw\b/gi, "didn't see")
      .replace(/\bdidn't came\b/gi, "didn't come")
      .replace(/\bdidn't bought\b/gi, "didn't buy");
  }

  // Irregular past tense errors (goed, seed, eated...)
  const irregularPastList = [
    { regex: /\bgoed\b/gi, found: 'goed', correct: 'went', why: 'הפועל go הוא בלתי סדיר. צורת העבר שלו היא went.', fix: 'החלף ל-went.' },
    { regex: /\bseed\b/gi, found: 'seed', correct: 'saw', why: 'עבר של see הוא saw ולא seed.', fix: 'החלף ל-saw.' },
    { regex: /\beated\b/gi, found: 'eated', correct: 'ate', why: 'עבר של eat הוא ate.', fix: 'החלף ל-ate.' },
    { regex: /\bbuyed\b/gi, found: 'buyed', correct: 'bought', why: 'עבר של buy הוא bought.', fix: 'החלף ל-bought.' },
    { regex: /\btaked\b/gi, found: 'taked', correct: 'took', why: 'עבר של take הוא took.', fix: 'החלף ל-took.' },
    { regex: /\bbringed\b/gi, found: 'bringed', correct: 'brought', why: 'עבר של bring הוא brought.', fix: 'החלף ל-brought.' },
    { regex: /\bteached\b/gi, found: 'teached', correct: 'taught', why: 'עבר של teach הוא taught.', fix: 'החלף ל-taught.' },
    { regex: /\bwrited\b/gi, found: 'writed', correct: 'wrote', why: 'עבר של write הוא wrote.', fix: 'החלף ל-wrote.' }
  ];

  irregularPastList.forEach(item => {
    if (item.regex.test(polished)) {
      addMistake('פועל עבר בלתי סדיר (Irregular Verb)', item.found, item.correct, item.why, item.fix, item.regex);
    }
  });

  // State verbs in continuous (I am knowing / I am understanding)
  if (/\b(i am knowing|i'm knowing|i am understanding|i'm understanding|i am wanting|i'm wanting)\b/i.test(polished)) {
    addMistake(
      'פועלי מצב ב-Present Simple (Stative Verbs)',
      'am knowing / am wanting',
      'know / want / understand',
      'פעלים המבטאים מצב מנטלי (know, believe, understand, want) לא מקבלים בדרך כלל צורת ing מתמשכת.',
      'השתמש ב-Present Simple: "I know" (ולא "I am knowing"), "I understand".',
      /\bi am knowing\b/gi
    );
    polished = polished
      .replace(/\bi am knowing\b/gi, "I know")
      .replace(/\bi'm knowing\b/gi, "I know")
      .replace(/\bi am wanting\b/gi, "I want");
  }

  // 5. MODAL VERBS & AUXILIARIES (פעלי עזר מודאליים)
  if (/\b(can|could|must|should|will|would)\s+to\s+([a-z]+)\b/i.test(polished)) {
    const match = polished.match(/\b(can|could|must|should|will|would)\s+to\s+([a-z]+)\b/i);
    addMistake(
      'שימוש שגוי ב-to אחרי פועל מודאלי',
      match ? match[0] : 'can to do',
      match ? `${match[1]} ${match[2]}` : 'can do',
      'אחרי פעלי עזר מודאליים (can, must, should, will, could) הפועל הבא מופיע ישירות בצורת מקור נקייה, ללא to.',
      'לדוגמה: "I can swim" (ולא "I can to swim"), "You must go" (ולא "must to go").',
      /\b(can|could|must|should|will|would)\s+to\s+/gi
    );
    polished = polished.replace(/\b(can|could|must|should|will|would)\s+to\s+([a-z]+)\b/gi, "$1 $2");
  }

  // 6. CONDITIONALS (משפטי תנאי)
  if (/\bif\s+(i|you|he|she|we|they)\s+will\b/i.test(polished)) {
    addMistake(
      'שימוש ב-will בתוך פסקת התנאי (If Clause)',
      'if ... will',
      'if + Present Simple',
      'במשפט תנאי ראשון (First Conditional), בחלק של ה-if משתמשים בזמן הווה (Present Simple) ולא ב-will.',
      'לדוגמה: "If it rains, I will stay home" (ולא "If it will rain").',
      null
    );
  }

  // 7. PREPOSITIONS (מילות יחס שגויות נפוצות)
  const prepositionRules = [
    {
      regex: /\bdepend\s+of\b/gi,
      found: 'depend of',
      correct: 'depend on',
      why: 'באנגלית הפועל depend דורש תמיד את מילת היחס on (בעברית תלוי ב-, באנגלית תלוי על).',
      fix: 'שנה ל-depend on.'
    },
    {
      regex: /\blisten\s+(music|radio|song|podcast)\b/gi,
      found: 'listen music',
      correct: 'listen to music',
      why: 'אחרי הפועל listen חייבים להוסיף to לפני מושא ההאזנה.',
      fix: 'שנה ל-listen to music / listen to the radio.'
    },
    {
      regex: /\bmarried\s+with\b/gi,
      found: 'married with',
      correct: 'married to',
      why: 'באנגלית נשוי למישהו מנוסח כ-married to ולא married with.',
      fix: 'שנה ל-married to (למשל: "She is married to John").'
    },
    {
      regex: /\bgood\s+in\s+(english|math|sports|cooking)\b/gi,
      found: 'good in',
      correct: 'good at',
      why: 'כאשר מתארים כישרון או מיומנות בתחום מסוים, משתמשים ב-good at ולא ב-good in.',
      fix: 'השתמש ב-good at (לדוגמה: "He is good at English").'
    },
    {
      regex: /\barrive\s+to\s+(london|paris|england|school|work|home)\b/gi,
      found: 'arrive to',
      correct: 'arrive in / arrive at',
      why: 'עם ערים ומדינות אומרים arrive in, ועם מקומות ואירועים אומרים arrive at. לעולם לא arrive to.',
      fix: 'השתמש ב-arrive in London או arrive at the station.'
    },
    {
      regex: /\bexplain\s+me\b/gi,
      found: 'explain me',
      correct: 'explain to me',
      why: 'באנגלית מסבירים משהו *ל*מישהו -> explain something to someone.',
      fix: 'כתוב explain to me או explain this to me.'
    },
    {
      regex: /\bat\s+the\s+morning\b/gi,
      found: 'at the morning',
      correct: 'in the morning',
      why: 'חלקי היממה הולכים עם in: in the morning, in the afternoon, in the evening (יוצא דופן: at night).',
      fix: 'שנה ל-in the morning.'
    },
    {
      regex: /\bin\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/gi,
      found: 'in + day of week',
      correct: 'on + day of week',
      why: 'לפני ימי השבוע משתמשים תמיד במילת היחס on.',
      fix: 'שנה ל-on Monday, on Friday.'
    }
  ];

  prepositionRules.forEach(rule => {
    if (rule.regex.test(polished)) {
      addMistake('מילת יחס שגויה (Preposition Error)', rule.found, rule.correct, rule.why, rule.fix, rule.regex);
    }
  });

  // 8. DURATION: SINCE VS FOR
  if (/\bsince\s+\d+\s+(years|months|days|hours|weeks)\b/i.test(polished)) {
    addMistake(
      'שימוש ב-since במקום for לציון משך זמן',
      'since + מספר שנים/ימים',
      'for + משך זמן',
      'ב-for משתמשים לציון משך זמן (Duration, למשל for three years). ב-since משתמשים רק לנקודת התחלה ספציפית בעבר (since 2021).',
      'שנה ל-for three years.',
      /\bsince\s+(\d+\s+(?:years|months|days|hours|weeks))\b/gi
    );
    polished = polished.replace(/\bsince\s+(\d+\s+(?:years|months|days|hours|weeks))\b/gi, "for $1");
  }

  // 9. COLLOCATIONS & NATURAL WORD CHOICE (צירופי מילים טבעיים)
  if (/\b(very\s+like|very\s+love)\b/i.test(polished)) {
    addMistake(
      'צירוף מילים לא טבעי: very like',
      'very like',
      'really like / like ... very much',
      'באנגלית לא שמים very ישירות לפני פועל. משתמשים ב-really like או שמים very much בסוף המשפט.',
      'לדוגמה: "I really like British tea" או "I like it very much".',
      /\bvery\s+like\b/gi
    );
    polished = polished.replace(/\bvery\s+like\b/gi, "really like");
  }

  if (/\b(take\s+a\s+decision)\b/i.test(polished)) {
    addMistake(
      'צירוף מילים (Collocation)',
      'take a decision',
      'make a decision',
      'באנגלית "לקבל החלטה" נאמר בעזרת הפועל make ולא take.',
      'השתמש ב-make a decision.',
      /\btake\s+a\s+decision\b/gi
    );
    polished = polished.replace(/\btake\s+a\s+decision\b/gi, "make a decision");
  }

  if (/\b(make\s+homework|make\s+my\s+homework)\b/i.test(polished)) {
    addMistake(
      'צירוף מילים (Collocation)',
      'make homework',
      'do homework',
      'שיעורי בית ומטלות מבצעים עם הפועל do (do homework, do the dishes).',
      'השתמש ב-do homework / do my homework.',
      /\bmake\s+(my\s+)?homework\b/gi
    );
    polished = polished.replace(/\bmake\s+(my\s+)?homework\b/gi, "do $1homework");
  }

  // 10. DOUBLE NEGATIVES (שלילה כפולה)
  if (/\b(don't|doesn't|didn't|can't|won't)\s+.*?\b(no|nothing|nobody|nowhere|never)\b/i.test(polished)) {
    addMistake(
      'שלילה כפולה (Double Negative)',
      'didn\'t ... nothing',
      'didn\'t ... anything / anybody',
      'באנגלית תקנית לא משלבים שתי מילות שלילה באותו משפט, כי שלילה כפולה מתפרשת כחיוב.',
      'החלף את מילת השלילה השנייה לצורת any: "I didn\'t see anything" (ולא "I didn\'t see nothing").',
      null
    );
  }

  // 11. UNCOUNTABLE NOUNS & PLURAL MISTAKES
  const uncountableList = [
    { regex: /\binformations\b/gi, found: 'informations', correct: 'information', why: 'המילה information היא שם עצם שאינו ספיר (Uncountable) ואינה מקבלת s ברבים.', fix: 'השתמש ב-information או pieces of information.' },
    { regex: /\badvices\b/gi, found: 'advices', correct: 'advice', why: 'advice היא בלתי ספירה.', fix: 'השתמש ב-advice או pieces of advice.' },
    { regex: /\bfurnitures\b/gi, found: 'furnitures', correct: 'furniture', why: 'furniture היא בלתי ספירה.', fix: 'השתמש ב-furniture.' },
    { regex: /\bhomeworks\b/gi, found: 'homeworks', correct: 'homework', why: 'homework היא בלתי ספירה.', fix: 'השתמש ב-homework.' },
    { regex: /\bpeoples\b/gi, found: 'peoples', correct: 'people', why: 'people היא כבר צורת הרבים של person (למעט בהקשר של "עמים").', fix: 'השתמש ב-people.' },
    { regex: /\bchildrens\b/gi, found: 'childrens', correct: 'children', why: 'children היא כבר צורת הרבים של child.', fix: 'השתמש ב-children.' }
  ];

  uncountableList.forEach(item => {
    if (item.regex.test(polished)) {
      addMistake('שם עצם בלתי ספיר / ריבוי שגוי', item.found, item.correct, item.why, item.fix, item.regex);
    }
  });

  // 12. ARTICLES (A vs AN)
  if (/\ban\s+(university|uniform|unique|european)\b/i.test(polished)) {
    addMistake(
      'שימוש ב-a מול an',
      'an university',
      'a university',
      'הבחירה בין a ל-an תלויה בצליל הפותח ולא באות. מילים המתחילות בצליל "יוּ" (כמו university) מקבלות a.',
      'השתמש ב-a university, a unique opportunity.',
      /\ban\s+(university|uniform|unique|european)\b/gi
    );
    polished = polished.replace(/\ban\s+(university|uniform|unique|european)\b/gi, "a $1");
  }

  if (/\ba\s+(hour|honest|honor)\b/i.test(polished)) {
    addMistake(
      'שימוש ב-a מול an (אות h שקטה)',
      'a hour',
      'an hour',
      'במילים hour ו-honest האות h שקטה, ולכן הצליל הראשון הוא תנועה הדורשת an.',
      'השתמש ב-an hour, an honest person.',
      /\ba\s+(hour|honest|honor)\b/gi
    );
    polished = polished.replace(/\ba\s+(hour|honest|honor)\b/gi, "an $1");
  }

  // 13. CAPITALIZATION OF "I" & PROPER NOUNS
  if (/\b(i)\b/g.test(polished)) {
    const iMatches = polished.match(/\b(i)\b/g);
    if (iMatches && iMatches.length > 0) {
      addMistake(
        'אות גדולה בכינוי הגוף I',
        'i (באות קטנה)',
        'I (אות גדולה)',
        'באנגלית כינוי הגוף "אני" (I) נכתב תמיד באות גדולה (Capital letter), בכל מקום במשפט.',
        'החלף i קטנה ב-I גדולה.',
        /\b(i)\b/g
      );
      polished = polished.replace(/\b(i)\b/g, "I");
    }
  }

  // 14. BRITISH ENGLISH ENHANCEMENTS
  const britishVocabulary = [
    { regex: /\bfrench fries\b/gi, us: 'french fries', uk: 'chips', tip: 'באנגליה צ\'יפס נקרא chips (ולא french fries).' },
    { regex: /\bfries\b/gi, us: 'fries', uk: 'chips', tip: 'בבריטניה אומרים chips.' },
    { regex: /\bapartment\b/gi, us: 'apartment', uk: 'flat', tip: 'בבריטניה דירה נקראת flat.' },
    { regex: /\belevator\b/gi, us: 'elevator', uk: 'lift', tip: 'בבריטניה מעלית נקראת lift.' },
    { regex: /\bsubway\b/gi, us: 'subway', uk: 'Tube / Underground', tip: 'בלונדון הרכבת התחתית נקראת Tube.' },
    { regex: /\bcolor\b/gi, us: 'color', uk: 'colour', tip: 'איות בריטי: colour עם u.' },
    { regex: /\bfavorite\b/gi, us: 'favorite', uk: 'favourite', tip: 'איות בריטי: favourite עם u.' },
    { regex: /\bcenter\b/gi, us: 'center', uk: 'centre', tip: 'איות בריטי: centre עם re.' },
    { regex: /\btheater\b/gi, us: 'theater', uk: 'theatre', tip: 'איות בריטי: theatre עם re.' },
    { regex: /\btraveling\b/gi, us: 'traveling', uk: 'travelling', tip: 'איות בריטי: travelling עם שתי l.' }
  ];

  britishVocabulary.forEach(item => {
    if (item.regex.test(polished)) {
      britishPolishes.push(item.tip);
      polished = polished.replace(item.regex, item.uk);
    }
  });

  // Capitalize first character and ensure punctuation at end
  polished = polished.charAt(0).toUpperCase() + polished.slice(1);
  if (!/[.!?]$/.test(polished)) {
    polished += '.';
  }

  // Calculate score
  let score = 98 - (mistakes.length * 15);
  if (score < 40) score = 40;
  if (mistakes.length === 0 && wordCount >= 15) score = 100;

  return {
    success: true,
    originalText: text,
    polishedVersion: polished,
    wordCount,
    score,
    mistakes,
    britishPolishes
  };
}

/**
 * Filter History Entries by Date Range
 */
export function filterHistoryByRange(history, range) {
  if (range === 'all' || !range) return history;

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfYesterday = startOfToday - 86400000;
  const startOfWeek = startOfToday - (7 * 86400000);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  return history.filter(item => {
    const itemTime = new Date(item.date).getTime();
    if (range === 'today') return itemTime >= startOfToday;
    if (range === 'yesterday') return itemTime >= startOfYesterday && itemTime < startOfToday;
    if (range === 'week') return itemTime >= startOfWeek;
    if (range === 'month') return itemTime >= startOfMonth;
    return true;
  });
}

/**
 * Render Daily Practice UI
 */
export function initDailyPracticeUI() {
  const container = document.getElementById('view-daily-practice');
  if (!container) return;

  const stats = getDailyPracticeStats();

  container.innerHTML = `
    <div class="daily-practice-container" style="max-width: 960px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- HERO HEADER -->
      <div class="card" style="padding: 1.5rem 1.75rem; background: linear-gradient(135deg, rgba(0,36,125,0.06) 0%, rgba(212,175,55,0.12) 100%); border: 1px solid var(--border-color); border-radius: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span style="background: var(--uk-blue); color: #fff; font-size: 0.8rem; font-weight: 700; padding: 0.25rem 0.65rem; border-radius: 999px; text-transform: uppercase;">
              <i class="fa-solid fa-pen-nib"></i> Daily Practice
            </span>
            <h2 style="margin: 0.5rem 0 0.25rem 0; font-size: 1.6rem; color: var(--text-main);">Daily English Writing & Grammar Workshop</h2>
            <p style="margin: 0; color: var(--text-muted); font-size: 0.95rem;">
              כתוב באנגלית חופשית על כל נושא. המערכת תבדוק את <strong>כל סוגי השגיאות</strong> (דקדוק, איות, מילות יחס, התאמת זמנים), תסביר בעברית <strong>למה טעית</strong>, ותציג <strong>מה צריך לעשות נכון</strong> עם הגרסה הבריטית המושלמת!
            </p>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 0.6rem 1rem; border-radius: 12px; text-align: center; min-width: 85px;">
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--gold);">${stats.xp || 0}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">XP Points</div>
            </div>
            <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 0.6rem 1rem; border-radius: 12px; text-align: center; min-width: 85px;">
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--uk-blue);">${stats.totalCount || 0}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">משימות</div>
            </div>
          </div>
        </div>
      </div>

      <!-- MAIN WORKBENCH -->
      <div class="card" style="padding: 1.75rem; border-radius: 16px;">
        <!-- PROMPT / INSPIRATION CHIPS -->
        <div style="margin-bottom: 1.25rem;">
          <span style="font-size: 0.88rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">
            <i class="fa-solid fa-lightbulb" style="color: var(--gold);"></i> רעיונות לכתיבה (או כתוב על כל נושא חופשי שתרצה):
          </span>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;" id="practice-ideas-row">
            ${PRACTICE_PROMPTS.map(p => `
              <button type="button" class="btn-idea-chip ${p.id === activePrompt.id ? 'active' : ''}" data-id="${p.id}" 
                style="padding: 0.4rem 0.85rem; border-radius: 999px; font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 1px solid var(--border-color); background: ${p.id === activePrompt.id ? 'var(--uk-blue)' : 'var(--bg-hover)'}; color: ${p.id === activePrompt.id ? '#fff' : 'var(--text-main)'}; transition: all 0.2s;">
                ${p.title}
              </button>
            `).join('')}
          </div>
          <p id="practice-idea-hint" style="margin: 0.65rem 0 0 0; font-size: 0.9rem; color: var(--text-muted); font-style: italic;">
            💡 ${activePrompt.hint}
          </p>
        </div>

        <!-- WRITING INPUT AREA -->
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <label for="practice-textarea" class="form-label" style="font-weight: 700; margin: 0;">
                כתוב כאן באנגלית חופשית:
              </label>
              <div style="display: flex; align-items: center; gap: 1rem;">
                <span id="practice-word-counter" style="color: var(--text-muted); font-size: 0.85rem; font-weight: 600;">0 מילים</span>
                <button type="button" id="btn-practice-clear" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.85rem; font-weight: 600;">
                  <i class="fa-solid fa-trash-can"></i> נקה
                </button>
              </div>
            </div>

            <textarea id="practice-textarea" class="form-control" rows="5" 
              placeholder="Type your English sentences here... (e.g. 'Yesterday she don't go to school because she was very tired and wanted to sleep alot.')" 
              style="font-size: 1.05rem; line-height: 1.6; border-radius: 12px; padding: 1.1rem; border: 1.5px solid var(--border-color);"></textarea>
          </div>

          <!-- ACTIONS ROW -->
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <button type="button" id="btn-practice-analyze" class="btn btn-primary btn-lg" style="flex: 1; min-width: 220px;">
              <i class="fa-solid fa-wand-magic-sparkles"></i> בדוק את כל הטעויות והסבר לי (Analyze & Check)
            </button>
            <button type="button" id="btn-practice-listen-raw" class="btn btn-secondary btn-lg" title="Listen to what you wrote">
              <i class="fa-solid fa-volume-high"></i> השמע לי
            </button>
          </div>
        </div>

        <!-- FEEDBACK & DETAILED CORRECTIONS CARD -->
        <div id="practice-feedback-card" style="display: none; margin-top: 1.5rem; padding: 1.5rem; background: var(--bg-hover); border-radius: 14px; border: 1px solid var(--border-color);">
          <!-- Dynamic Content Rendered Here -->
        </div>
      </div>

      <!-- RECENT PRACTICE SESSIONS WITH DATE FILTER -->
      <div class="card" style="padding: 1.75rem; border-radius: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
          <h3 style="margin: 0; font-size: 1.2rem; color: var(--text-main); display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-clock-rotate-left" style="color: var(--uk-blue);"></i>
            היסטוריית הכתיבה שלי
          </h3>

          <!-- FILTER BY DAYS TABS -->
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;" id="history-filter-tabs">
            <button type="button" class="btn-filter-tab ${currentHistoryFilter === 'all' ? 'active' : ''}" data-filter="all">כל הימים</button>
            <button type="button" class="btn-filter-tab ${currentHistoryFilter === 'today' ? 'active' : ''}" data-filter="today">היום</button>
            <button type="button" class="btn-filter-tab ${currentHistoryFilter === 'yesterday' ? 'active' : ''}" data-filter="yesterday">אתמול</button>
            <button type="button" class="btn-filter-tab ${currentHistoryFilter === 'week' ? 'active' : ''}" data-filter="week">7 ימים אחרונים</button>
            <button type="button" class="btn-filter-tab ${currentHistoryFilter === 'month' ? 'active' : ''}" data-filter="month">החודש</button>
          </div>
        </div>

        <div id="practice-history-list" style="display: flex; flex-direction: column; gap: 0.85rem;">
          <!-- Loaded dynamically -->
        </div>
      </div>
    </div>
  `;

  setupDailyPracticeEvents();
  renderDailyPracticeHistory();
}

/**
 * Setup Event Listeners for Daily Practice
 */
function setupDailyPracticeEvents() {
  const textarea = document.getElementById('practice-textarea');
  const clearBtn = document.getElementById('btn-practice-clear');
  const analyzeBtn = document.getElementById('btn-practice-analyze');
  const listenRawBtn = document.getElementById('btn-practice-listen-raw');
  const wordCounter = document.getElementById('practice-word-counter');

  // Real-time word counter
  if (textarea && wordCounter) {
    textarea.addEventListener('input', () => {
      const words = textarea.value.trim().split(/\s+/).filter(Boolean).length;
      wordCounter.innerText = `${words} מילים`;
    });
  }

  // Prompt chips switcher
  document.querySelectorAll('#practice-ideas-row .btn-idea-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#practice-ideas-row .btn-idea-chip').forEach(b => {
        b.style.background = 'var(--bg-hover)';
        b.style.color = 'var(--text-main)';
      });
      e.currentTarget.style.background = 'var(--uk-blue)';
      e.currentTarget.style.color = '#fff';

      const id = e.currentTarget.getAttribute('data-id');
      const found = PRACTICE_PROMPTS.find(p => p.id === id);
      if (found) {
        activePrompt = found;
        const hintEl = document.getElementById('practice-idea-hint');
        if (hintEl) hintEl.innerText = `💡 ${found.hint}`;
      }
    });
  });

  // History Filter Tabs click
  document.querySelectorAll('#history-filter-tabs .btn-filter-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('#history-filter-tabs .btn-filter-tab').forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentHistoryFilter = e.currentTarget.getAttribute('data-filter') || 'all';
      renderDailyPracticeHistory();
    });
  });

  // Clear button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      textarea.value = '';
      if (wordCounter) wordCounter.innerText = '0 מילים';
      const feedbackCard = document.getElementById('practice-feedback-card');
      if (feedbackCard) feedbackCard.style.display = 'none';
    });
  }

  // Listen to raw text
  if (listenRawBtn) {
    listenRawBtn.addEventListener('click', () => {
      const text = textarea.value.trim();
      if (!text) {
        alert('Please write something in English first!');
        return;
      }
      speakText(text);
    });
  }

  // Analyze & Check
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
      const text = textarea.value.trim();
      if (!text) {
        alert('Please write your sentence in English before checking!');
        return;
      }

      const res = analyzeDailyWriting(text);
      renderDailyFeedback(res);

      // Save to database history
      const entry = {
        id: `dp-${Date.now()}`,
        date: new Date().toISOString(),
        userText: text,
        polishedVersion: res.polishedVersion,
        score: res.score,
        mistakesCount: res.mistakes.length
      };

      saveDailyPracticeEntry(entry);
      renderDailyPracticeHistory();
    });
  }
}

/**
 * Render Comprehensive Feedback: "מה התשובה הנכונה", "למה טעיתי", ו-"מה צריך לעשות נכון"
 */
function renderDailyFeedback(res) {
  const card = document.getElementById('practice-feedback-card');
  if (!card) return;

  const scoreColor = res.score >= 85 ? 'var(--success)' : res.score >= 65 ? 'var(--warning)' : '#e74c3c';

  card.style.display = 'block';
  card.innerHTML = `
    <!-- HEADER & SCORE -->
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <div style="width: 54px; height: 54px; border-radius: 50%; border: 3px solid ${scoreColor}; color: ${scoreColor}; display: flex; align-items: center; justify-content: center; font-size: 1.35rem; font-weight: 800; background: var(--bg-card);">
          ${res.score}
        </div>
        <div>
          <h4 style="margin: 0; font-size: 1.2rem; color: var(--text-main);">
            ${res.score >= 90 ? '🌟 מצוין! כתיבה רהוטה ומדויקת' : res.score >= 70 ? '👍 עבודה יפה! הנה מספר טעויות לתיקון' : '💡 כל הכבוד על התרגול! עיין בפירוט הטעויות כדי להשתפר'}
          </h4>
          <span style="font-size: 0.88rem; color: var(--text-muted);">
            נותחו ${res.wordCount} מילים • נמצאו ${res.mistakes.length} טעויות שדורשות תיקון
          </span>
        </div>
      </div>
    </div>

    <!-- 1. מה התשובה הנכונה (THE CORRECT ANSWER) -->
    <div style="background: linear-gradient(135deg, rgba(46,204,113,0.08) 0%, rgba(0,36,125,0.06) 100%); border: 1.5px solid var(--success); border-radius: 12px; padding: 1.25rem; margin-bottom: 1.25rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; flex-wrap: wrap; gap: 0.5rem;">
        <span style="font-weight: 800; font-size: 1rem; color: var(--success); display: flex; align-items: center; gap: 0.4rem;">
          <i class="fa-solid fa-circle-check"></i> מה התשובה הנכונה (Native British English):
        </span>
        <button type="button" id="btn-play-correct-speech" class="btn btn-sm btn-primary" style="display: inline-flex; align-items: center; gap: 0.4rem;">
          <i class="fa-solid fa-volume-high"></i> האזן לתשובה הנכונה
        </button>
      </div>
      <p style="margin: 0; font-size: 1.2rem; font-weight: 700; color: var(--text-main); line-height: 1.55;">
        "${res.polishedVersion}"
      </p>
    </div>

    <!-- 2. פירוט כל הטעויות: למה טעיתי ומה צריך לעשות נכון -->
    ${res.mistakes.length > 0 ? `
      <div style="margin-bottom: 1.25rem;">
        <h4 style="margin: 0 0 0.85rem 0; font-size: 1.1rem; color: #e74c3c; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-circle-question"></i> למה טעיתי ומה צריך לעשות נכון? (${res.mistakes.length} טעויות שזוהו):
        </h4>
        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          ${res.mistakes.map((m, idx) => `
            <div style="background: var(--bg-card); border: 1px solid rgba(231,76,60,0.3); border-right: 4px solid #e74c3c; padding: 1.1rem; border-radius: 10px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
                <span style="font-weight: 800; color: #e74c3c; font-size: 0.95rem;">${idx + 1}. ${m.category}</span>
                <span style="font-size: 0.78rem; background: rgba(231,76,60,0.1); color: #e74c3c; padding: 0.2rem 0.55rem; border-radius: 4px; font-weight: 700;">שגיאה לתיקון</span>
              </div>
              
              <!-- COMPARISON ROW -->
              <div style="margin-bottom: 0.6rem; font-size: 0.92rem; display: flex; gap: 1rem; flex-wrap: wrap;">
                <div>
                  <span style="color: var(--text-muted);">מה שכתבת:</span> 
                  <strong style="color: #e74c3c; text-decoration: line-through;">"${m.found}"</strong>
                </div>
                <div>
                  <span style="color: var(--text-muted);">&larr; התיקון:</span> 
                  <strong style="color: var(--success);">"${m.correct}"</strong>
                </div>
              </div>

              <!-- WHY DID I MAKE A MISTAKE -->
              <div style="margin-bottom: 0.4rem; font-size: 0.9rem; color: var(--text-main); line-height: 1.5; background: var(--bg-hover); padding: 0.65rem 0.9rem; border-radius: 6px;">
                💡 <strong>למה טעיתי?</strong> ${m.why}
              </div>

              <!-- WHAT TO DO CORRECTLY -->
              <div style="font-size: 0.9rem; color: var(--uk-blue); line-height: 1.5; padding: 0.4rem 0.9rem; font-weight: 600;">
                ✅ <strong>מה צריך לעשות נכון?</strong> ${m.whatToDo}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : `
      <div style="background: rgba(46,204,113,0.1); border: 1px solid var(--success); padding: 1.1rem; border-radius: 10px; color: var(--success); font-weight: 700; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.6rem;">
        <i class="fa-solid fa-trophy" style="font-size: 1.3rem;"></i>
        <span>כתיבה מושלמת! כל הכבוד, לא נמצאו שגיאות דקדוקיות או שגיאות כתיב במשפט שלך.</span>
      </div>
    `}

    <!-- 3. שדרוגים לאוצר מילים בריטי מקורי -->
    ${res.britishPolishes.length > 0 ? `
      <div style="background: rgba(0,36,125,0.06); border: 1px solid rgba(0,36,125,0.2); border-radius: 10px; padding: 1rem 1.25rem;">
        <span style="font-weight: 700; color: var(--uk-blue); font-size: 0.92rem; display: flex; align-items: center; gap: 0.4rem;">
          🇬🇧 שדרוג לאנגלית בריטית מקורית:
        </span>
        <ul style="margin: 0.4rem 0 0 1.25rem; font-size: 0.9rem; color: var(--text-main); line-height: 1.6;">
          ${res.britishPolishes.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>
    ` : ''}
  `;

  // Bind listen button for correct sentence
  const playBtn = document.getElementById('btn-play-correct-speech');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      speakText(res.polishedVersion);
    });
  }

  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Render History List with Date Filtering
 */
function renderDailyPracticeHistory() {
  const listEl = document.getElementById('practice-history-list');
  if (!listEl) return;

  const allHistory = getDailyPracticeHistory();
  const filtered = filterHistoryByRange(allHistory, currentHistoryFilter);

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: 1.75rem 0; color: var(--text-muted); font-size: 0.92rem;">
        ${allHistory.length === 0 ? 'עדיין אין חיבורים שמורים בהיסטוריה. כתוב משפט באנגלית ולחץ על בדיקה כדי להתחיל!' : 'לא נמצאו פריטים בטווח התאריכים שנבחר.'}
      </div>
    `;
    return;
  }

  listEl.innerHTML = filtered.map(item => {
    const d = new Date(item.date);
    const dateStr = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    const scoreColor = item.score >= 85 ? 'var(--success)' : item.score >= 65 ? 'var(--warning)' : '#e74c3c';

    return `
      <div style="background: var(--bg-hover); border: 1px solid var(--border-color); padding: 0.95rem 1.15rem; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
        <div style="flex: 1; min-width: 250px;">
          <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.3rem;">
            <span style="font-weight: 800; color: ${scoreColor}; font-size: 0.88rem;">ציון: ${item.score}</span>
            <span style="color: var(--text-muted); font-size: 0.78rem;">📅 ${dateStr}</span>
            ${item.mistakesCount > 0 ? `<span style="font-size: 0.75rem; color: #e74c3c; background: rgba(231,76,60,0.1); padding: 0.15rem 0.45rem; border-radius: 4px; font-weight: 600;">${item.mistakesCount} טעויות</span>` : '<span style="font-size: 0.75rem; color: var(--success); background: rgba(46,204,113,0.1); padding: 0.15rem 0.45rem; border-radius: 4px; font-weight: 600;">ללא שגיאות</span>'}
          </div>
          <div style="font-size: 0.95rem; color: var(--text-main); font-weight: 500; line-height: 1.4;">
            "${item.userText.length > 80 ? item.userText.slice(0, 80) + '...' : item.userText}"
          </div>
        </div>
        <button type="button" class="btn btn-sm btn-secondary btn-history-play" data-text="${encodeURIComponent(item.polishedVersion || item.userText)}" 
          style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; font-weight: 600;">
          <i class="fa-solid fa-volume-high"></i> השמע תיקון
        </button>
      </div>
    `;
  }).join('');

  listEl.querySelectorAll('.btn-history-play').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const raw = e.currentTarget.getAttribute('data-text');
      if (raw) {
        speakText(decodeURIComponent(raw));
      }
    });
  });
}
