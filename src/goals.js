/**
 * British English Vault - Goals & Achievements Module
 */

export const GOAL_CATEGORIES = {
  grammar: { id: 'grammar', name: 'Grammar', labelEng: 'Grammar', icon: 'fa-spell-check', emoji: '📝' },
  speaking: { id: 'speaking', name: 'Speaking & Conversation', labelEng: 'Speaking & Conversation', icon: 'fa-comments', emoji: '🗣️' },
  listening: { id: 'listening', name: 'Listening', labelEng: 'Listening', icon: 'fa-headphones', emoji: '🎧' },
  reading: { id: 'reading', name: 'Reading', labelEng: 'Reading', icon: 'fa-book-open-reader', emoji: '📖' },
  writing: { id: 'writing', name: 'Writing', labelEng: 'Writing', icon: 'fa-pen-fancy', emoji: '✍️' },
  vocabulary: { id: 'vocabulary', name: 'Vocabulary', labelEng: 'Vocabulary', icon: 'fa-brain', emoji: '🧠' },
  british: { id: 'british', name: 'British English', labelEng: 'British English', icon: 'fa-crown', emoji: '🇬🇧' },
  entertainment: { id: 'entertainment', name: 'Content & Entertainment', labelEng: 'Content & Entertainment', icon: 'fa-tv', emoji: '📺' },
  consistency: { id: 'consistency', name: 'Consistency & Streaks', labelEng: 'Consistency & Streaks', icon: 'fa-fire', emoji: '🔥' },
  special: { id: 'special', name: 'Special Achievements', labelEng: 'Special Achievements', icon: 'fa-star', emoji: '🌟' }
};

export const DEFAULT_GOALS = [
  // 📝 Grammar
  { id: 'grm-1', category: 'grammar', title: 'Learn 5 core English grammar rules', achievementTitle: '🏆 Learned 5 Core Grammar Rules' },
  { id: 'grm-2', category: 'grammar', title: 'Master Present Perfect vs Past Simple', achievementTitle: '🏆 Mastered Present Perfect Tense' },
  { id: 'grm-3', category: 'grammar', title: 'Master British Modal Verbs (shall, ought to, might)', achievementTitle: '🏆 Mastered British Modals' },
  { id: 'grm-4', category: 'grammar', title: 'Check 5 sentences using AI Grammar Checker', autoType: 'aiGrammarCount', autoTarget: 5, achievementTitle: '🏆 Used AI Grammar Checker 5 Times' },
  { id: 'grm-5', category: 'grammar', title: 'Check 25 sentences using AI Grammar Checker', autoType: 'aiGrammarCount', autoTarget: 25, achievementTitle: '🏆 Used AI Grammar Checker 25 Times' },
  { id: 'grm-6', category: 'grammar', title: 'Master English Conditional Sentences (If clauses)', achievementTitle: '🏆 Mastered Conditionals' },
  { id: 'grm-7', category: 'grammar', title: 'Master Passive Voice in English', achievementTitle: '🏆 Mastered Passive Voice' },
  { id: 'grm-8', category: 'grammar', title: 'Write 10 error-free English sentences', achievementTitle: '🏆 Wrote 10 Error-Free Sentences' },
  { id: 'grm-9', category: 'grammar', title: 'Master Subject-Verb Agreement', achievementTitle: '🏆 Mastered Subject-Verb Agreement' },
  { id: 'grm-10', category: 'grammar', title: 'Master Articles (a, an, the) usage', achievementTitle: '🏆 Mastered English Articles' },

  // 🗣️ Speaking & Conversation
  { id: 'spk-1', category: 'speaking', title: 'Conduct a 5-minute conversation in English', achievementTitle: '🏆 Conducted First English Conversation' },
  { id: 'spk-2', category: 'speaking', title: 'Conduct a 10-minute conversation in English', achievementTitle: '🏆 Conducted 10-Minute Conversation' },
  { id: 'spk-3', category: 'speaking', title: 'Conduct a 30-minute conversation in English', achievementTitle: '🏆 Conducted 30-Minute Conversation' },
  { id: 'spk-4', category: 'speaking', title: 'Conduct a 1-hour conversation in English', achievementTitle: '🏆 Conducted 1-Hour Conversation' },
  { id: 'spk-5', category: 'speaking', title: 'Conduct a 2-hour conversation in English', achievementTitle: '🏆 Conducted 2-Hour Conversation' },
  { id: 'spk-6', category: 'speaking', title: 'Conduct a 3-hour conversation in English', achievementTitle: '🏆 Conducted 3-Hour Conversation' },
  { id: 'spk-7', category: 'speaking', title: 'Conduct a conversation with a native English speaker', achievementTitle: '🏆 Spoke with Native English Speaker' },
  { id: 'spk-8', category: 'speaking', title: 'Conduct a conversation with a non-native speaker', achievementTitle: '🏆 Spoke Entirely in English' },
  { id: 'spk-9', category: 'speaking', title: 'Speak for 10 minutes without switching languages', achievementTitle: '🏆 10-Minute Continuous English Speech' },
  { id: 'spk-10', category: 'speaking', title: 'Speak for 30 minutes without switching languages', achievementTitle: '🏆 30-Minute Continuous English Speech' },
  { id: 'spk-11', category: 'speaking', title: 'Conduct a phone call in English', achievementTitle: '🏆 Completed Phone Call in English' },
  { id: 'spk-12', category: 'speaking', title: 'Participate in a group conversation in English', achievementTitle: '🏆 Participated in Group Conversation' },
  { id: 'spk-13', category: 'speaking', title: 'Tell a complete story in English', achievementTitle: '🏆 Told a Complete Story in English' },
  { id: 'spk-14', category: 'speaking', title: 'Explain a complex topic in English', achievementTitle: '🏆 Explained Complex Topic in English' },
  { id: 'spk-15', category: 'speaking', title: 'Deliver a presentation in English', achievementTitle: '🏆 Delivered English Presentation' },
  { id: 'spk-16', category: 'speaking', title: 'Conduct a job interview in English', achievementTitle: '🏆 Completed Job Interview in English' },

  // 🎧 Listening
  { id: 'lis-1', category: 'listening', title: 'Understand a 5-minute video in English', achievementTitle: '🏆 Understood First English Video' },
  { id: 'lis-2', category: 'listening', title: 'Understand a 15-minute video in English', achievementTitle: '🏆 Understood 15-Minute Video' },
  { id: 'lis-3', category: 'listening', title: 'Watch a TV episode without subtitles', achievementTitle: '🏆 Watched TV Episode Without Subtitles' },
  { id: 'lis-4', category: 'listening', title: 'Watch a full movie in English without subtitles', achievementTitle: '🏆 Watched Full Movie Without Subtitles' },
  { id: 'lis-5', category: 'listening', title: 'Understand a conversation between native speakers', achievementTitle: '🏆 Understood Native Speakers Conversation' },
  { id: 'lis-6', category: 'listening', title: 'Listen to an English podcast episode', achievementTitle: '🏆 Listened to First English Podcast' },
  { id: 'lis-7', category: 'listening', title: 'Understand 80% of a podcast episode', achievementTitle: '🏆 Understood 80% of a Podcast' },
  { id: 'lis-8', category: 'listening', title: 'Understand 90% of a video', achievementTitle: '🏆 Understood 90% of a Video' },
  { id: 'lis-9', category: 'listening', title: 'Watch English content without pausing for translation', achievementTitle: '🏆 Watched Content Without Pausing' },

  // 📖 Reading
  { id: 'rdg-1', category: 'reading', title: 'Read an article in English', achievementTitle: '🏆 Read First English Article' },
  { id: 'rdg-2', category: 'reading', title: 'Read 10 articles in English', achievementTitle: '🏆 Read 10 English Articles' },
  { id: 'rdg-3', category: 'reading', title: 'Read your first book in English', achievementTitle: '🏆 Read First Book in English' },
  { id: 'rdg-4', category: 'reading', title: 'Read 3 books in English', achievementTitle: '🏆 Read 3 Books in English' },
  { id: 'rdg-5', category: 'reading', title: 'Read 1,000 pages in English', achievementTitle: '🏆 Read 1,000 Pages in English' },
  { id: 'rdg-6', category: 'reading', title: 'Read English news daily for a week', achievementTitle: '🏆 Read English News for a Week' },
  { id: 'rdg-7', category: 'reading', title: 'Read a full text in English without using a translator', achievementTitle: '🏆 Read Text Without Translator' },

  // ✍️ Writing
  { id: 'wrt-1', category: 'writing', title: 'Write 100 words in English', achievementTitle: '🏆 Wrote 100 Words in English' },
  { id: 'wrt-2', category: 'writing', title: 'Write 500 words in English', achievementTitle: '🏆 Wrote 500 Words in English' },
  { id: 'wrt-3', category: 'writing', title: 'Write 1,000 words in English', achievementTitle: '🏆 Wrote 1,000 Words in English' },
  { id: 'wrt-4', category: 'writing', title: 'Write an email in English', achievementTitle: '🏆 Wrote Email in English' },
  { id: 'wrt-5', category: 'writing', title: 'Write a full message in English', achievementTitle: '🏆 Wrote Full Message in English' },
  { id: 'wrt-6', category: 'writing', title: 'Keep an English journal for 7 days', achievementTitle: '🏆 Kept 7-Day English Journal' },
  { id: 'wrt-7', category: 'writing', title: 'Keep an English journal for 30 days', achievementTitle: '🏆 Kept 30-Day English Journal' },
  { id: 'wrt-8', category: 'writing', title: 'Write an essay in English', achievementTitle: '🏆 Wrote Essay in English' },
  { id: 'wrt-9', category: 'writing', title: 'Write without using a translator', achievementTitle: '🏆 Wrote Without Using Translator' },

  // 🧠 Vocabulary (Auto-checked from Vault items)
  { id: 'voc-1', category: 'vocabulary', title: 'Learn 10 words', autoType: 'vocabCount', autoTarget: 10, achievementTitle: '🏆 Learned First 10 Words' },
  { id: 'voc-2', category: 'vocabulary', title: 'Learn 25 words', autoType: 'vocabCount', autoTarget: 25, achievementTitle: '🏆 Learned 25 Words' },
  { id: 'voc-3', category: 'vocabulary', title: 'Learn 50 words', autoType: 'vocabCount', autoTarget: 50, achievementTitle: '🏆 Learned 50 Words' },
  { id: 'voc-4', category: 'vocabulary', title: 'Learn 100 words', autoType: 'vocabCount', autoTarget: 100, achievementTitle: '🏆 Learned 100 Words' },
  { id: 'voc-5', category: 'vocabulary', title: 'Learn 500 words', autoType: 'vocabCount', autoTarget: 500, achievementTitle: '🏆 Learned 500 Words' },
  { id: 'voc-6', category: 'vocabulary', title: 'Learn 1,000 words', autoType: 'vocabCount', autoTarget: 1000, achievementTitle: '🏆 Learned 1,000 Words' },
  { id: 'voc-7', category: 'vocabulary', title: 'Learn 2,000 words', autoType: 'vocabCount', autoTarget: 2000, achievementTitle: '🏆 Learned 2,000 Words' },
  { id: 'voc-8', category: 'vocabulary', title: 'Learn 5,000 words', autoType: 'vocabCount', autoTarget: 5000, achievementTitle: '🏆 Learned 5,000 Words' },
  { id: 'voc-9', category: 'vocabulary', title: 'Use 50 new words in conversation', achievementTitle: '🏆 Used 50 New Words in Speech' },
  { id: 'voc-10', category: 'vocabulary', title: 'Use 100 new words in conversation', achievementTitle: '🏆 Used 100 New Words in Speech' },
  { id: 'voc-11', category: 'vocabulary', title: 'Retain 100 words after a month', achievementTitle: '🏆 Retained 100 Words for a Month' },

  // 🇬🇧 British English (Auto-checked from British Vault)
  { id: 'bri-1', category: 'british', title: 'Learn 10 British words', autoType: 'britishWordsCount', autoTarget: 10, achievementTitle: '🏆 Learned 10 British Words' },
  { id: 'bri-2', category: 'british', title: 'Learn 25 British words', autoType: 'britishWordsCount', autoTarget: 25, achievementTitle: '🏆 Learned 25 British Words' },
  { id: 'bri-3', category: 'british', title: 'Learn 50 British words', autoType: 'britishWordsCount', autoTarget: 50, achievementTitle: '🏆 Learned 50 British Words' },
  { id: 'bri-4', category: 'british', title: 'Learn 100 British words', autoType: 'britishWordsCount', autoTarget: 100, achievementTitle: '🏆 Learned 100 British Words' },
  { id: 'bri-5', category: 'british', title: 'Learn 10 British phrases', autoType: 'britishPhrasesCount', autoTarget: 10, achievementTitle: '🏆 Learned 10 British Phrases' },
  { id: 'bri-6', category: 'british', title: 'Learn 25 British phrases', autoType: 'britishPhrasesCount', autoTarget: 25, achievementTitle: '🏆 Learned 25 British Phrases' },
  { id: 'bri-7', category: 'british', title: 'Learn 50 British phrases', autoType: 'britishPhrasesCount', autoTarget: 50, achievementTitle: '🏆 Learned 50 British Phrases' },
  { id: 'bri-8', category: 'british', title: 'Learn 100 British phrases', autoType: 'britishPhrasesCount', autoTarget: 100, achievementTitle: '🏆 Learned 100 British Phrases' },
  { id: 'bri-9', category: 'british', title: 'Use 10 British phrases in conversation', achievementTitle: '🏆 Used 10 British Phrases in Conversation' },
  { id: 'bri-10', category: 'british', title: 'Watch British content without subtitles', achievementTitle: '🏆 Watched British Content Without Subtitles' },
  { id: 'bri-11', category: 'british', title: 'Conduct a conversation using British phrases', achievementTitle: '🏆 Conducted Conversation with British Slang' },

  // 📺 Content & Entertainment
  { id: 'ent-1', category: 'entertainment', title: 'Watch a movie in English', achievementTitle: '🏆 Watched First Movie in English' },
  { id: 'ent-2', category: 'entertainment', title: 'Watch 5 movies in English', achievementTitle: '🏆 Watched 5 Movies in English' },
  { id: 'ent-3', category: 'entertainment', title: 'Watch an English TV show', achievementTitle: '🏆 Watched English TV Show' },
  { id: 'ent-4', category: 'entertainment', title: 'Finish a full TV season in English', achievementTitle: '🏆 Finished Full TV Season in English' },
  { id: 'ent-5', category: 'entertainment', title: 'Finish an entire series in English', achievementTitle: '🏆 Finished Entire TV Series in English' },
  { id: 'ent-6', category: 'entertainment', title: 'Watch 10 videos in English', achievementTitle: '🏆 Watched 10 English Videos' },
  { id: 'ent-7', category: 'entertainment', title: 'Watch English YouTube for a week', achievementTitle: '🏆 Watched English YouTube for a Week' },
  { id: 'ent-8', category: 'entertainment', title: 'Listen to 10 English podcast episodes', achievementTitle: '🏆 Listened to 10 English Podcasts' },

  // 🔥 Consistency & Streaks (Auto-checked from Quizzes)
  { id: 'cns-1', category: 'consistency', title: 'Study 3 days in a row', autoType: 'quizAttempts', autoTarget: 3, achievementTitle: '🏆 3-Day Study Streak' },
  { id: 'cns-2', category: 'consistency', title: 'Study 7 days in a row', autoType: 'quizAttempts', autoTarget: 7, achievementTitle: '🏆 7-Day Study Streak' },
  { id: 'cns-3', category: 'consistency', title: 'Study 14 days in a row', autoType: 'quizAttempts', autoTarget: 14, achievementTitle: '🏆 14-Day Study Streak' },
  { id: 'cns-4', category: 'consistency', title: 'Study 30 days in a row', autoType: 'quizAttempts', autoTarget: 30, achievementTitle: '🏆 30-Day Study Streak' },
  { id: 'cns-5', category: 'consistency', title: 'Study 60 days in a row', autoType: 'quizAttempts', autoTarget: 60, achievementTitle: '🏆 60-Day Study Streak' },
  { id: 'cns-6', category: 'consistency', title: 'Study 100 days in a row', autoType: 'quizAttempts', autoTarget: 100, achievementTitle: '🏆 100-Day Study Streak' },
  { id: 'cns-7', category: 'consistency', title: 'Practice for 10 total hours', achievementTitle: '🏆 Completed 10 Hours of Practice' },
  { id: 'cns-8', category: 'consistency', title: 'Practice for 25 total hours', achievementTitle: '🏆 Completed 25 Hours of Practice' },
  { id: 'cns-9', category: 'consistency', title: 'Practice for 50 total hours', achievementTitle: '🏆 Completed 50 Hours of Practice' },
  { id: 'cns-10', category: 'consistency', title: 'Practice for 100 total hours', achievementTitle: '🏆 Completed 100 Hours of Practice' },
  { id: 'cns-11', category: 'consistency', title: 'Practice 365 days in a row', achievementTitle: '🏆 365-Day Study Streak' },

  // 🌟 Special / Master Achievements
  { id: 'spc-1', category: 'special', title: 'Spend a full day speaking only English', achievementTitle: '🏆 Spent Full Day Speaking English' },
  { id: 'spc-2', category: 'special', title: 'Think in English for an entire day', achievementTitle: '🏆 Thought in English Entire Day' },
  { id: 'spc-3', category: 'special', title: 'Spend a week with minimal native language use', achievementTitle: '🏆 Minimal Native Language Week' },
  { id: 'spc-4', category: 'special', title: 'Read a full book in English', achievementTitle: '🏆 Read Entire Book in English' },
  { id: 'spc-5', category: 'special', title: 'Watch an entire series in English', achievementTitle: '🏆 Watched Entire Series in English' },
  { id: 'spc-6', category: 'special', title: 'Conduct a 3-hour conversation in English', achievementTitle: '🏆 Conducted 3-Hour Conversation' },
  { id: 'spc-7', category: 'special', title: 'Conduct a conversation with 3 people in English', achievementTitle: '🏆 Group Discussion with 3 People' },
  { id: 'spc-8', category: 'special', title: 'Deliver a lecture or speech in English', achievementTitle: '🏆 Delivered Lecture in English' },
  { id: 'spc-9', category: 'special', title: 'Explain a complex concept in English', achievementTitle: '🏆 Explained Complex Concept in English' },
  { id: 'spc-10', category: 'special', title: 'Conduct your longest conversation ever in English', achievementTitle: '🏆 Conducted Longest Conversation Ever' }
];

/**
 * Initialize or evaluate goals state from vaultData
 */
export function getGoalsState(vaultData) {
  if (!vaultData.goals) {
    vaultData.goals = {
      completedIds: [],
      deletedIds: [],
      editedGoals: {},
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

  const goalsState = vaultData.goals || { completedIds: [], deletedIds: [], editedGoals: {}, customGoals: [] };
  const completedSet = new Set(goalsState.completedIds || []);

  const totalItems = vaultData.items.length;
  const britishWordsCount = vaultData.items.filter(i => i.category === 'words' || i.category === 'slangs').length;
  const britishPhrasesCount = vaultData.items.filter(i => i.category === 'phrases' || i.category === 'idioms').length;
  const quizzesCompleted = vaultData.stats?.quizzesCompleted || 0;
  const aiGrammarCount = vaultData.stats?.aiGrammarCount || 0;

  let newlyCompletedCount = 0;

  DEFAULT_GOALS.forEach(goal => {
    if (goal.autoType && !completedSet.has(goal.id)) {
      let isMet = false;
      if (goal.autoType === 'vocabCount' && totalItems >= goal.autoTarget) isMet = true;
      if (goal.autoType === 'britishWordsCount' && britishWordsCount >= goal.autoTarget) isMet = true;
      if (goal.autoType === 'britishPhrasesCount' && britishPhrasesCount >= goal.autoTarget) isMet = true;
      if (goal.autoType === 'quizAttempts' && quizzesCompleted >= goal.autoTarget) isMet = true;
      if (goal.autoType === 'aiGrammarCount' && aiGrammarCount >= goal.autoTarget) isMet = true;

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
  if (!vaultData.goals) vaultData.goals = { completedIds: [], deletedIds: [], editedGoals: {}, customGoals: [] };
  
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
  if (!vaultData.goals) vaultData.goals = { completedIds: [], deletedIds: [], editedGoals: {}, customGoals: [] };

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
 * Get all active goals (Default goals minus deleted ones, merged with edits, plus custom goals)
 */
export function getAllActiveGoals(vaultData) {
  if (!vaultData.goals) {
    vaultData.goals = { completedIds: [], deletedIds: [], editedGoals: {}, customGoals: [] };
  }
  const deletedSet = new Set(vaultData.goals.deletedIds || []);
  const editedDict = vaultData.goals.editedGoals || {};

  // 1. Process default goals
  const activeDefaults = DEFAULT_GOALS
    .filter(g => !deletedSet.has(g.id))
    .map(g => {
      if (editedDict[g.id]) {
        return { ...g, ...editedDict[g.id] };
      }
      return g;
    });

  // 2. Process custom goals
  const activeCustoms = (vaultData.goals.customGoals || [])
    .filter(g => !deletedSet.has(g.id))
    .map(g => {
      if (editedDict[g.id]) {
        return { ...g, ...editedDict[g.id] };
      }
      return g;
    });

  return [...activeDefaults, ...activeCustoms];
}

/**
 * Edit an existing goal (default or custom)
 */
export function editGoal(goalId, updatedData, vaultData) {
  if (!vaultData.goals) {
    vaultData.goals = { completedIds: [], deletedIds: [], editedGoals: {}, customGoals: [] };
  }
  if (!vaultData.goals.editedGoals) vaultData.goals.editedGoals = {};

  const cleanData = {
    title: updatedData.title.trim(),
    category: updatedData.category || 'special',
    targetDate: updatedData.targetDate || '',
    achievementTitle: updatedData.achievementTitle ? updatedData.achievementTitle.trim() : `🏆 ${updatedData.title.trim()}`
  };

  vaultData.goals.editedGoals[goalId] = cleanData;

  // If it's a custom goal, also update customGoals array
  if (vaultData.goals.customGoals) {
    const customIndex = vaultData.goals.customGoals.findIndex(g => g.id === goalId);
    if (customIndex !== -1) {
      vaultData.goals.customGoals[customIndex] = {
        ...vaultData.goals.customGoals[customIndex],
        ...cleanData
      };
    }
  }
}

/**
 * Delete any Goal (Default or Custom)
 */
export function deleteGoal(goalId, vaultData) {
  if (!vaultData.goals) {
    vaultData.goals = { completedIds: [], deletedIds: [], editedGoals: {}, customGoals: [] };
  }
  if (!vaultData.goals.deletedIds) vaultData.goals.deletedIds = [];

  if (!vaultData.goals.deletedIds.includes(goalId)) {
    vaultData.goals.deletedIds.push(goalId);
  }

  if (vaultData.goals.customGoals) {
    vaultData.goals.customGoals = vaultData.goals.customGoals.filter(g => g.id !== goalId);
  }

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

  const allGoals = getAllActiveGoals(vaultData);
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
