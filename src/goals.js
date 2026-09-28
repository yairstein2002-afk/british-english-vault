/**
 * British English Vault - Goals & Achievements Module
 */

export const GOAL_CATEGORIES = {
  speaking: { id: 'speaking', name: 'Speaking & Conversation', labelHeb: 'דיבור ושיחות', icon: 'fa-comments', emoji: '🗣️' },
  listening: { id: 'listening', name: 'Listening', labelHeb: 'שמיעה', icon: 'fa-headphones', emoji: '🎧' },
  reading: { id: 'reading', name: 'Reading', labelHeb: 'קריאה', icon: 'fa-book-open-reader', emoji: '📖' },
  writing: { id: 'writing', name: 'Writing', labelHeb: 'כתיבה', icon: 'fa-pen-fancy', emoji: '✍️' },
  vocabulary: { id: 'vocabulary', name: 'Vocabulary', labelHeb: 'אוצר מילים', icon: 'fa-brain', emoji: '🧠' },
  british: { id: 'british', name: 'British English', labelHeb: 'אנגלית בריטית', icon: 'fa-crown', emoji: '🇬🇧' },
  entertainment: { id: 'entertainment', name: 'Content & Entertainment', labelHeb: 'תוכן ובידור', icon: 'fa-tv', emoji: '📺' },
  consistency: { id: 'consistency', name: 'Consistency & Streaks', labelHeb: 'התמדה', icon: 'fa-fire', emoji: '🔥' },
  special: { id: 'special', name: 'Special Achievements', labelHeb: 'הישגים מיוחדים', icon: 'fa-star', emoji: '🌟' }
};

export const DEFAULT_GOALS = [
  // 🗣️ Speaking & Conversation
  { id: 'spk-1', category: 'speaking', title: 'לנהל שיחה של 5 דקות באנגלית', achievementTitle: '🏆 ניהלתי שיחה ראשונה באנגלית' },
  { id: 'spk-2', category: 'speaking', title: 'לנהל שיחה של 10 דקות', achievementTitle: '🏆 ניהלתי שיחה של 10 דקות' },
  { id: 'spk-3', category: 'speaking', title: 'לנהל שיחה של 30 דקות', achievementTitle: '🏆 ניהלתי שיחה של 30 דקות' },
  { id: 'spk-4', category: 'speaking', title: 'לנהל שיחה של שעה', achievementTitle: '🏆 ניהלתי שיחה של שעה' },
  { id: 'spk-5', category: 'speaking', title: 'לנהל שיחה של שעתיים', achievementTitle: '🏆 ניהלתי שיחה של שעתיים' },
  { id: 'spk-6', category: 'speaking', title: 'לנהל שיחה של 3 שעות', achievementTitle: '🏆 ניהלתי שיחה של 3 שעות' },
  { id: 'spk-7', category: 'speaking', title: 'לנהל שיחה עם דובר אנגלית ילידי', achievementTitle: '🏆 ניהלתי שיחה עם דובר ילידי' },
  { id: 'spk-8', category: 'speaking', title: 'לנהל שיחה עם אדם שלא מדבר עברית', achievementTitle: '🏆 ניהלתי שיחה ללא עברית' },
  { id: 'spk-9', category: 'speaking', title: 'לדבר 10 דקות בלי לעבור לעברית', achievementTitle: '🏆 דיברתי 10 דקות רצוף באנגלית' },
  { id: 'spk-10', category: 'speaking', title: 'לדבר 30 דקות בלי לעבור לעברית', achievementTitle: '🏆 דיברתי 30 דקות בלי לעבור לעברית' },
  { id: 'spk-11', category: 'speaking', title: 'לנהל שיחת טלפון באנגלית', achievementTitle: '🏆 ניהלתי שיחת טלפון באנגלית' },
  { id: 'spk-12', category: 'speaking', title: 'להשתתף בשיחה קבוצתית באנגלית', achievementTitle: '🏆 השתתפתי בשיחה קבוצתית באנגלית' },
  { id: 'spk-13', category: 'speaking', title: 'לספר סיפור שלם באנגלית', achievementTitle: '🏆 סופר סיפור שלם באנגלית' },
  { id: 'spk-14', category: 'speaking', title: 'להסביר נושא מורכב באנגלית', achievementTitle: '🏆 הסברתי נושא מורכב באנגלית' },
  { id: 'spk-15', category: 'speaking', title: 'להעביר מצגת באנגלית', achievementTitle: '🏆 העברתי מצגת באנגלית' },
  { id: 'spk-16', category: 'speaking', title: 'לנהל ראיון עבודה באנגלית', achievementTitle: '🏆 ניהלתי ראיון עבודה באנגלית' },

  // 🎧 Listening
  { id: 'lis-1', category: 'listening', title: 'להבין סרטון של 5 דקות באנגלית', achievementTitle: '🏆 הבנתי סרטון ראשון באנגלית' },
  { id: 'lis-2', category: 'listening', title: 'להבין סרטון של 15 דקות', achievementTitle: '🏆 הבנתי סרטון 15 דקות' },
  { id: 'lis-3', category: 'listening', title: 'לצפות בפרק בלי כתוביות', achievementTitle: '🏆 צפיתי בפרק ללא כתוביות' },
  { id: 'lis-4', category: 'listening', title: 'לצפות בסרט באנגלית בלי כתוביות', achievementTitle: '🏆 צפיתי בסרט שלם ללא כתוביות' },
  { id: 'lis-5', category: 'listening', title: 'להבין שיחה בין שני דוברי אנגלית', achievementTitle: '🏆 הבנתי שיחה בין דוברי אנגלית' },
  { id: 'lis-6', category: 'listening', title: 'להקשיב לפודקאסט באנגלית', achievementTitle: '🏆 האזנתי לפודקאסט ראשון באנגלית' },
  { id: 'lis-7', category: 'listening', title: 'להבין 80% מפודקאסט', achievementTitle: '🏆 הבנתי 80% מפודקאסט' },
  { id: 'lis-8', category: 'listening', title: 'להבין 90% מסרטון', achievementTitle: '🏆 הבנתי 90% מסרטון' },
  { id: 'lis-9', category: 'listening', title: 'לצפות בתוכן באנגלית בלי לעצור לתרגום', achievementTitle: '🏆 צפיתי בתוכן ללא עצירה לתרגום' },

  // 📖 Reading
  { id: 'rdg-1', category: 'reading', title: 'לקרוא מאמר באנגלית', achievementTitle: '🏆 קראתי מאמר ראשון באנגלית' },
  { id: 'rdg-2', category: 'reading', title: 'לקרוא 10 מאמרים', achievementTitle: '🏆 קראתי 10 מאמרים' },
  { id: 'rdg-3', category: 'reading', title: 'לקרוא ספר ראשון באנגלית', achievementTitle: '🏆 קראתי את הספר הראשון שלי באנגלית' },
  { id: 'rdg-4', category: 'reading', title: 'לקרוא 3 ספרים באנגלית', achievementTitle: '🏆 קראתי 3 ספרים באנגלית' },
  { id: 'rdg-5', category: 'reading', title: 'לקרוא 1,000 עמודים באנגלית', achievementTitle: '🏆 קראתי 1,000 עמודים באנגלית' },
  { id: 'rdg-6', category: 'reading', title: 'לקרוא חדשות באנגלית במשך שבוע', achievementTitle: '🏆 קראתי חדשות באנגלית במשך שבוע' },
  { id: 'rdg-7', category: 'reading', title: 'לקרוא טקסט באנגלית בלי להשתמש במתרגם', achievementTitle: '🏆 קראתי טקסט שלם בלי להשתמש במתרגם' },

  // ✍️ Writing
  { id: 'wrt-1', category: 'writing', title: 'לכתוב 100 מילים באנגלית', achievementTitle: '🏆 כתבתי 100 מילים באנגלית' },
  { id: 'wrt-2', category: 'writing', title: 'לכתוב 500 מילים', achievementTitle: '🏆 כתבתי 500 מילים' },
  { id: 'wrt-3', category: 'writing', title: 'לכתוב 1,000 מילים', achievementTitle: '🏆 כתבתי 1,000 מילים' },
  { id: 'wrt-4', category: 'writing', title: 'לכתוב אימייל באנגלית', achievementTitle: '🏆 כתבתי אימייל באנגלית' },
  { id: 'wrt-5', category: 'writing', title: 'לכתוב הודעה שלמה באנגלית', achievementTitle: '🏆 כתבתי הודעה שלמה באנגלית' },
  { id: 'wrt-6', category: 'writing', title: 'לכתוב יומן באנגלית במשך 7 ימים', achievementTitle: '🏆 כתבתי את היומן הראשון שלי באנגלית' },
  { id: 'wrt-7', category: 'writing', title: 'לכתוב יומן במשך 30 ימים', achievementTitle: '🏆 כתבתי באנגלית במשך 30 ימים' },
  { id: 'wrt-8', category: 'writing', title: 'לכתוב חיבור באנגלית', achievementTitle: '🏆 כתבתי חיבור באנגלית' },
  { id: 'wrt-9', category: 'writing', title: 'לכתוב בלי להשתמש במתרגם', achievementTitle: '🏆 כתבתי בלי להשתמש במתרגם' },

  // 🧠 Vocabulary (Auto-checked from Vault items)
  { id: 'voc-1', category: 'vocabulary', title: 'ללמוד 10 מילים', autoType: 'vocabCount', autoTarget: 10, achievementTitle: '🏆 למדתי 10 מילים ראשונות' },
  { id: 'voc-2', category: 'vocabulary', title: 'ללמוד 25 מילים', autoType: 'vocabCount', autoTarget: 25, achievementTitle: '🏆 למדתי 25 מילים' },
  { id: 'voc-3', category: 'vocabulary', title: 'ללמוד 50 מילים', autoType: 'vocabCount', autoTarget: 50, achievementTitle: '🏆 למדתי 50 מילים' },
  { id: 'voc-4', category: 'vocabulary', title: 'ללמוד 100 מילים', autoType: 'vocabCount', autoTarget: 100, achievementTitle: '🏆 למדתי 100 מילים' },
  { id: 'voc-5', category: 'vocabulary', title: 'ללמוד 500 מילים', autoType: 'vocabCount', autoTarget: 500, achievementTitle: '🏆 למדתי 500 מילים' },
  { id: 'voc-6', category: 'vocabulary', title: 'ללמוד 1,000 מילים', autoType: 'vocabCount', autoTarget: 1000, achievementTitle: '🏆 למדתי 1,000 מילים' },
  { id: 'voc-7', category: 'vocabulary', title: 'ללמוד 2,000 מילים', autoType: 'vocabCount', autoTarget: 2000, achievementTitle: '🏆 למדתי 2,000 מילים' },
  { id: 'voc-8', category: 'vocabulary', title: 'ללמוד 5,000 מילים', autoType: 'vocabCount', autoTarget: 5000, achievementTitle: '🏆 למדתי 5,000 מילים' },
  { id: 'voc-9', category: 'vocabulary', title: 'להשתמש ב-50 מילים חדשות בשיחה', achievementTitle: '🏆 השתמשתי ב-50 מילים חדשות' },
  { id: 'voc-10', category: 'vocabulary', title: 'להשתמש ב-100 מילים חדשות', achievementTitle: '🏆 השתמשתי ב-100 מילים חדשות בשיחה' },
  { id: 'voc-11', category: 'vocabulary', title: 'לזכור 100 מילים אחרי חודש', achievementTitle: '🏆 זכרתי 100 מילים במשך חודש' },

  // 🇬🇧 British English (Auto-checked from British Vault)
  { id: 'bri-1', category: 'british', title: 'ללמוד 10 מילים בריטיות', autoType: 'britishWordsCount', autoTarget: 10, achievementTitle: '🏆 למדתי 10 מילים בריטיות' },
  { id: 'bri-2', category: 'british', title: 'ללמוד 25 מילים בריטיות', autoType: 'britishWordsCount', autoTarget: 25, achievementTitle: '🏆 למדתי 25 מילים בריטיות' },
  { id: 'bri-3', category: 'british', title: 'ללמוד 50 מילים בריטיות', autoType: 'britishWordsCount', autoTarget: 50, achievementTitle: '🏆 למדתי 50 מילים בריטיות' },
  { id: 'bri-4', category: 'british', title: 'ללמוד 100 מילים בריטיות', autoType: 'britishWordsCount', autoTarget: 100, achievementTitle: '🏆 למדתי 100 מילים בריטיות' },
  { id: 'bri-5', category: 'british', title: 'ללמוד 10 ביטויים בריטיים', autoType: 'britishPhrasesCount', autoTarget: 10, achievementTitle: '🏆 למדתי 10 ביטויים בריטיים' },
  { id: 'bri-6', category: 'british', title: 'ללמוד 25 ביטויים בריטיים', autoType: 'britishPhrasesCount', autoTarget: 25, achievementTitle: '🏆 למדתי 25 ביטויים בריטיים' },
  { id: 'bri-7', category: 'british', title: 'ללמוד 50 ביטויים בריטיים', autoType: 'britishPhrasesCount', autoTarget: 50, achievementTitle: '🏆 למדתי 50 ביטויים בריטיים' },
  { id: 'bri-8', category: 'british', title: 'ללמוד 100 ביטויים בריטיים', autoType: 'britishPhrasesCount', autoTarget: 100, achievementTitle: '🏆 למדתי 100 ביטויים בריטיים' },
  { id: 'bri-9', category: 'british', title: 'להשתמש ב-10 ביטויים בריטיים בשיחה', achievementTitle: '🏆 השתמשתי ב-10 ביטויים בריטיים בשיחה' },
  { id: 'bri-10', category: 'british', title: 'לצפות בתוכן בריטי בלי כתוביות', achievementTitle: '🏆 צפיתי בתוכן בריטי ללא כתוביות' },
  { id: 'bri-11', category: 'british', title: 'לנהל שיחה תוך שימוש בביטויים בריטיים', achievementTitle: '🏆 ניהלתי שיחה עם ביטויים בריטיים' },

  // 📺 Content & Entertainment
  { id: 'ent-1', category: 'entertainment', title: 'לצפות בסרט באנגלית', achievementTitle: '🏆 צפיתי בסרט ראשון באנגלית' },
  { id: 'ent-2', category: 'entertainment', title: 'לצפות ב-5 סרטים באנגלית', achievementTitle: '🏆 צפיתי ב-5 סרטים באנגלית' },
  { id: 'ent-3', category: 'entertainment', title: 'לצפות בסדרה באנגלית', achievementTitle: '🏆 צפיתי בסדרה באנגלית' },
  { id: 'ent-4', category: 'entertainment', title: 'לסיים עונה שלמה באנגלית', achievementTitle: '🏆 סיימתי עונה שלמה באנגלית' },
  { id: 'ent-5', category: 'entertainment', title: 'לסיים סדרה שלמה באנגלית', achievementTitle: '🏆 סיימתי סדרה שלמה באנגלית' },
  { id: 'ent-6', category: 'entertainment', title: 'לצפות ב-10 סרטונים באנגלית', achievementTitle: '🏆 צפיתי ב-10 סרטונים באנגלית' },
  { id: 'ent-7', category: 'entertainment', title: 'לצפות ביוטיוב באנגלית במשך שבוע', achievementTitle: '🏆 צפיתי ביוטיוב באנגלית במשך שבוע' },
  { id: 'ent-8', category: 'entertainment', title: 'להאזין ל-10 פודקאסטים באנגלית', achievementTitle: '🏆 האזנתי ל-10 פודקאסטים באנגלית' },

  // 🔥 Consistency & Streaks (Auto-checked from Quizzes)
  { id: 'cns-1', category: 'consistency', title: 'ללמוד 3 ימים ברצף', autoType: 'quizAttempts', autoTarget: 3, achievementTitle: '🏆 3 ימים ברצף' },
  { id: 'cns-2', category: 'consistency', title: 'ללמוד 7 ימים ברצף', autoType: 'quizAttempts', autoTarget: 7, achievementTitle: '🏆 7 ימים ברצף' },
  { id: 'cns-3', category: 'consistency', title: 'ללמוד 14 ימים ברצף', autoType: 'quizAttempts', autoTarget: 14, achievementTitle: '🏆 14 ימים ברצף' },
  { id: 'cns-4', category: 'consistency', title: 'ללמוד 30 ימים ברצף', autoType: 'quizAttempts', autoTarget: 30, achievementTitle: '🏆 30 ימים ברצף' },
  { id: 'cns-5', category: 'consistency', title: 'ללמוד 60 ימים ברצף', autoType: 'quizAttempts', autoTarget: 60, achievementTitle: '🏆 60 ימים ברצף' },
  { id: 'cns-6', category: 'consistency', title: 'ללמוד 100 ימים ברצף', autoType: 'quizAttempts', autoTarget: 100, achievementTitle: '🏆 100 ימים ברצף' },
  { id: 'cns-7', category: 'consistency', title: 'לתרגל 10 שעות בסך הכול', achievementTitle: '🏆 10 שעות לימוד' },
  { id: 'cns-8', category: 'consistency', title: 'לתרגל 25 שעות', achievementTitle: '🏆 25 שעות לימוד' },
  { id: 'cns-9', category: 'consistency', title: 'לתרגל 50 שעות', achievementTitle: '🏆 50 שעות לימוד' },
  { id: 'cns-10', category: 'consistency', title: 'לתרגל 100 שעות', achievementTitle: '🏆 100 שעות לימוד' },
  { id: 'cns-11', category: 'consistency', title: 'לתרגל 365 ימים', achievementTitle: '🏆 365 ימים ברצף' },

  // 🌟 Special / Master Achievements
  { id: 'spc-1', category: 'special', title: 'לנהל יום שלם באנגלית', achievementTitle: '🏆 ניהלתי יום שלם באנגלית' },
  { id: 'spc-2', category: 'special', title: 'לחשוב באנגלית במשך יום שלם', achievementTitle: '🏆 חשבתי באנגלית במשך יום שלם' },
  { id: 'spc-3', category: 'special', title: 'לבלות שבוע עם מינימום שימוש בעברית', achievementTitle: '🏆 ביליתי שבוע עם מינימום שימוש בעברית' },
  { id: 'spc-4', category: 'special', title: 'לקרוא ספר שלם באנגלית', achievementTitle: '🏆 קראתי ספר שלם באנגלית' },
  { id: 'spc-5', category: 'special', title: 'לצפות בסדרה שלמה באנגלית', achievementTitle: '🏆 צפיתי בסדרה שלמה באנגלית' },
  { id: 'spc-6', category: 'special', title: 'לנהל שיחה של 3 שעות', achievementTitle: '🏆 ניהלתי שיחה של 3 שעות' },
  { id: 'spc-7', category: 'special', title: 'לנהל שיחה עם 3 אנשים באנגלית', achievementTitle: '🏆 ניהלתי שיחה עם 3 אנשים באנגלית' },
  { id: 'spc-8', category: 'special', title: 'להעביר הרצאה באנגלית', achievementTitle: '🏆 העברתי הרצאה באנגלית' },
  { id: 'spc-9', category: 'special', title: 'להצליח להסביר משהו מורכב באנגלית', achievementTitle: '🏆 הצלחתי להסביר משהו מורכב באנגלית' },
  { id: 'spc-10', category: 'special', title: 'לנהל את השיחה הארוכה ביותר שלי באנגלית', achievementTitle: '🏆 ניהלתי את השיחה הארוכה ביותר שלי באנגלית' }
];

/**
 * Initialize or evaluate goals state from vaultData
 */
export function getGoalsState(vaultData) {
  if (!vaultData.goals) {
    vaultData.goals = {
      completedIds: [],
      customGoals: []
    };
  }
  evaluateAutoGoals(vaultData);
  return vaultData.goals;
}

/**
 * Auto-checks vocabulary, British words, and quiz progress goals
 */
export function evaluateAutoGoals(vaultData) {
  if (!vaultData || !vaultData.items) return;

  const goalsState = vaultData.goals || { completedIds: [], customGoals: [] };
  const completedSet = new Set(goalsState.completedIds || []);

  const totalItems = vaultData.items.length;
  const britishWordsCount = vaultData.items.filter(i => i.category === 'words' || i.category === 'slangs').length;
  const britishPhrasesCount = vaultData.items.filter(i => i.category === 'phrases' || i.category === 'idioms').length;
  const quizzesCompleted = vaultData.stats?.quizzesCompleted || 0;

  let newlyCompletedCount = 0;

  DEFAULT_GOALS.forEach(goal => {
    if (goal.autoType && !completedSet.has(goal.id)) {
      let isMet = false;
      if (goal.autoType === 'vocabCount' && totalItems >= goal.autoTarget) isMet = true;
      if (goal.autoType === 'britishWordsCount' && britishWordsCount >= goal.autoTarget) isMet = true;
      if (goal.autoType === 'britishPhrasesCount' && britishPhrasesCount >= goal.autoTarget) isMet = true;
      if (goal.autoType === 'quizAttempts' && quizzesCompleted >= goal.autoTarget) isMet = true;

      if (isMet) {
        completedSet.add(goal.id);
        newlyCompletedCount++;
      }
    }
  });

  vaultData.goals.completedIds = Array.from(completedSet);
  return newlyCompletedCount;
}

/**
 * Toggle goal completion status
 */
export function toggleGoalCompletion(goalId, vaultData) {
  if (!vaultData.goals) vaultData.goals = { completedIds: [], customGoals: [] };
  
  const completedSet = new Set(vaultData.goals.completedIds || []);
  let isNowCompleted = false;

  if (completedSet.has(goalId)) {
    completedSet.delete(goalId);
    isNowCompleted = false;
  } else {
    completedSet.add(goalId);
    isNowCompleted = true;
  }

  vaultData.goals.completedIds = Array.from(completedSet);
  return isNowCompleted;
}

/**
 * Add Custom Personal Goal
 */
export function addCustomGoal(customGoalData, vaultData) {
  if (!vaultData.goals) vaultData.goals = { completedIds: [], customGoals: [] };

  const newCustomGoal = {
    id: `custom-${Date.now()}`,
    category: customGoalData.category || 'special',
    title: customGoalData.title.trim(),
    targetCount: parseInt(customGoalData.targetCount) || 1,
    targetDate: customGoalData.targetDate || '',
    achievementTitle: `🏆 ${customGoalData.title.trim()}`,
    isCustom: true,
    completed: false
  };

  vaultData.goals.customGoals.push(newCustomGoal);
  return newCustomGoal;
}

/**
 * Delete Custom Personal Goal
 */
export function deleteCustomGoal(goalId, vaultData) {
  if (!vaultData.goals || !vaultData.goals.customGoals) return;
  vaultData.goals.customGoals = vaultData.goals.customGoals.filter(g => g.id !== goalId);
  const completedSet = new Set(vaultData.goals.completedIds || []);
  completedSet.delete(goalId);
  vaultData.goals.completedIds = Array.from(completedSet);
}

/**
 * Calculate overall completion percentage and statistics
 */
export function calculateGoalsStats(vaultData) {
  const goalsState = getGoalsState(vaultData);
  const completedSet = new Set(goalsState.completedIds || []);

  const allGoals = [...DEFAULT_GOALS, ...(goalsState.customGoals || [])];
  const totalGoalsCount = allGoals.length;
  const completedCount = allGoals.filter(g => completedSet.has(g.id) || g.completed).length;

  const percentage = totalGoalsCount > 0 ? Math.round((completedCount / totalGoalsCount) * 100) : 0;

  return {
    totalGoalsCount,
    completedCount,
    percentage,
    unlockedTrophies: completedCount
  };
}
