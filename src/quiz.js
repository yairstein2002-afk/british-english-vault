/**
 * British English Vault - Quiz & Dictation Engine
 */

let quizSession = {
  category: 'all',
  mode: 'mc', // 'mc' (multiple choice)
  questions: [],
  currentIndex: 0,
  correctCount: 0,
  incorrectCount: 0,
  answersRecord: []
};

let dictationSession = {
  category: 'words',
  questions: [],
  currentIndex: 0,
  attemptsLeft: 3,
  correctCount: 0,
  incorrectCount: 0,
  answersRecord: []
};

/**
 * Shuffle helper
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Normalization helper for dictation string comparison
 */
export function normalizeAnswer(str) {
  return (str || '')
    .toLowerCase()
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"’“”]/g, '')
    .replace(/\s+/g, ' ');
}

/* ==========================================================================
   1. STANDARD QUIZ ENGINE (Multiple Choice)
   ========================================================================== */

export function startQuiz(category = 'all', allItems = [], grammarTopics = [], mode = 'mc') {
  let pool = [];

  const getGrammarQuestions = () => {
    return (grammarTopics || []).flatMap(topic =>
      (topic.practice || []).map((p, idx) => ({
        id: `gram_${topic.id}_${idx}`,
        category: 'grammar',
        term: p.question,
        meaning: p.options[p.correctIndex],
        example: p.explanation || topic.summary,
        isGrammar: true,
        options: p.options,
        correctIndex: p.correctIndex,
        subgroup: topic.title
      }))
    );
  };

  if (category === 'grammar') {
    pool = getGrammarQuestions();
  } else if (category === 'all-vocab') {
    pool = allItems.filter(item => ['words', 'slangs', 'phrases', 'idioms'].includes(item.category));
  } else if (category === 'all') {
    const vocab = allItems.filter(item => ['words', 'slangs', 'phrases', 'idioms'].includes(item.category));
    const grammarQs = getGrammarQuestions();
    pool = [...vocab, ...grammarQs];
  } else {
    pool = allItems.filter(item => item.category === category);
  }

  if (pool.length === 0) {
    return false;
  }

  const shuffled = shuffleArray(pool);
  const quizItems = shuffled.slice(0, 10);

  quizSession = {
    category,
    mode: mode || 'mc',
    questions: quizItems,
    currentIndex: 0,
    correctCount: 0,
    incorrectCount: 0,
    answersRecord: []
  };

  return true;
}

export function getCurrentQuestion() {
  if (quizSession.questions.length === 0 || quizSession.currentIndex >= quizSession.questions.length) {
    return null;
  }
  return quizSession.questions[quizSession.currentIndex];
}

export function getQuizMode() {
  return quizSession.mode || 'mc';
}

export function getQuizProgress() {
  return {
    current: quizSession.currentIndex + 1,
    total: quizSession.questions.length,
    percentage: Math.round(((quizSession.currentIndex) / quizSession.questions.length) * 100)
  };
}

export function gradeQuestion(isCorrect) {
  const currentItem = getCurrentQuestion();
  if (!currentItem) return;

  quizSession.answersRecord.push({
    item: currentItem,
    isCorrect
  });

  if (isCorrect) {
    quizSession.correctCount++;
  } else {
    quizSession.incorrectCount++;
  }
}

export function nextQuestion() {
  quizSession.currentIndex++;
  return quizSession.currentIndex < quizSession.questions.length;
}

export function getQuizSummary() {
  const total = quizSession.questions.length;
  const correct = quizSession.correctCount;
  const incorrect = quizSession.incorrectCount;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  return {
    total,
    correct,
    incorrect,
    percentage: pct,
    answers: quizSession.answersRecord
  };
}

export function getQuizChoices(currentItem, allItems) {
  if (currentItem.isGrammar && Array.isArray(currentItem.options) && currentItem.options.length > 0) {
    return currentItem.options.map((optText, idx) => ({
      text: optText,
      isCorrect: idx === currentItem.correctIndex
    }));
  }

  const correctMeaning = currentItem.meaning;
  let distractors = allItems
    .filter(item => item.meaning.trim() !== correctMeaning.trim())
    .map(item => item.meaning);

  distractors = [...new Set(distractors)];

  let chosenDistractors = [];
  if (distractors.length >= 3) {
    const shuffledDistractors = shuffleArray(distractors);
    chosenDistractors = shuffledDistractors.slice(0, 3);
  } else {
    const staticFillers = [
      "Very tired, completely exhausted (Knackered)",
      "Extremely happy, delighted (Chuffed)",
      "Would you like a cup of tea? (Fancy a cuppa?)",
      "Completely shocked or astonished (Gobsmacked)",
      "Extremely disappointed, devastated (Gutted)",
      "A pound sterling (British currency slang)",
      "Broke, having no money (Skint)"
    ];
    const filteredFillers = staticFillers.filter(f => f.trim() !== correctMeaning.trim());
    chosenDistractors = [...distractors, ...shuffleArray(filteredFillers)].slice(0, 3);
  }

  const choices = [
    { text: correctMeaning, isCorrect: true },
    ...chosenDistractors.map(text => ({ text, isCorrect: false }))
  ];

  return shuffleArray(choices);
}

/* ==========================================================================
   2. DICTATION ENGINE (10 Words, 3 Attempts per Word, Sunday Routine)
   ========================================================================== */

/**
 * Start a 10-Word Dictation session
 * @param {string} category - 'words', 'slangs', 'phrases', 'idioms', or 'all' (all together)
 * @param {Array} allItems - Vocabulary items array from database
 */
export function startDictationSession(category = 'words', allItems = []) {
  let pool = [];

  if (category === 'words') {
    pool = allItems.filter(i => i.category === 'words');
  } else if (category === 'slangs') {
    pool = allItems.filter(i => i.category === 'slangs');
  } else if (category === 'phrases') {
    pool = allItems.filter(i => i.category === 'phrases');
  } else if (category === 'idioms') {
    pool = allItems.filter(i => i.category === 'idioms');
  } else {
    // 'all' / All Together
    pool = allItems.filter(i => ['words', 'slangs', 'phrases', 'idioms'].includes(i.category));
  }

  if (pool.length === 0) {
    return false;
  }

  // Exactly 10 words per session (or all if fewer than 10)
  const shuffled = shuffleArray(pool);
  const selectedItems = shuffled.slice(0, 10);

  dictationSession = {
    category,
    questions: selectedItems,
    currentIndex: 0,
    attemptsLeft: 3,
    correctCount: 0,
    incorrectCount: 0,
    answersRecord: []
  };

  return true;
}

export function getCurrentDictationWord() {
  if (!dictationSession.questions.length || dictationSession.currentIndex >= dictationSession.questions.length) {
    return null;
  }
  return dictationSession.questions[dictationSession.currentIndex];
}

export function getDictationProgress() {
  return {
    current: dictationSession.currentIndex + 1,
    total: dictationSession.questions.length,
    percentage: Math.round(((dictationSession.currentIndex) / dictationSession.questions.length) * 100),
    attemptsLeft: dictationSession.attemptsLeft
  };
}

export function resetDictationAttempts() {
  dictationSession.attemptsLeft = 3;
  return dictationSession.attemptsLeft;
}

/**
 * Check user dictation attempt
 * Returns: { isCorrect, attemptsLeft, exhausted, correctTerm, userInput }
 */
export function checkDictationAttempt(userInput) {
  const currentItem = getCurrentDictationWord();
  if (!currentItem) {
    return { isCorrect: false, attemptsLeft: 0, exhausted: true, correctTerm: '', userInput: '' };
  }

  const target = normalizeAnswer(currentItem.term);
  const input = normalizeAnswer(userInput);

  const isCorrect = (input === target) ||
                    (target.length > 2 && target.replace(/^(to |a |an |the )/, '') === input);

  if (isCorrect) {
    dictationSession.correctCount++;
    dictationSession.answersRecord.push({
      item: currentItem,
      isCorrect: true,
      attemptsUsed: 4 - dictationSession.attemptsLeft
    });

    return {
      isCorrect: true,
      attemptsLeft: dictationSession.attemptsLeft,
      exhausted: false,
      correctTerm: currentItem.term,
      userInput: userInput.trim()
    };
  } else {
    dictationSession.attemptsLeft = Math.max(0, dictationSession.attemptsLeft - 1);
    const exhausted = dictationSession.attemptsLeft === 0;

    if (exhausted) {
      dictationSession.incorrectCount++;
      dictationSession.answersRecord.push({
        item: currentItem,
        isCorrect: false,
        attemptsUsed: 3
      });
    }

    return {
      isCorrect: false,
      attemptsLeft: dictationSession.attemptsLeft,
      exhausted,
      correctTerm: currentItem.term,
      userInput: userInput.trim()
    };
  }
}

export function nextDictationWord() {
  dictationSession.currentIndex++;
  dictationSession.attemptsLeft = 3;
  return dictationSession.currentIndex < dictationSession.questions.length;
}

export function getDictationSummary() {
  const total = dictationSession.questions.length;
  const correct = dictationSession.correctCount;
  const incorrect = dictationSession.incorrectCount;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  return {
    total,
    correct,
    incorrect,
    percentage: pct,
    answers: dictationSession.answersRecord
  };
}

/* ==========================================================================
   3. SUNDAY ROUTINE TRACKER
   ========================================================================== */

export function getSundayRoutineStats() {
  const storage = typeof localStorage !== 'undefined' ? localStorage : null;
  const lastCompleted = storage ? storage.getItem('sunday_dictation_last_completed') : null;
  const streak = storage ? parseInt(storage.getItem('sunday_dictation_streak') || '0', 10) : 0;
  const today = new Date();
  const isSunday = today.getDay() === 0;

  let completedThisSunday = false;
  if (lastCompleted) {
    const lastDate = new Date(parseInt(lastCompleted, 10));
    const isSameDay = today.toDateString() === lastDate.toDateString();
    if (isSameDay) {
      completedThisSunday = true;
    }
  }

  return {
    isSunday,
    streak,
    completedThisSunday,
    lastCompletedFormatted: lastCompleted ? new Date(parseInt(lastCompleted, 10)).toLocaleDateString() : 'Never'
  };
}

export function recordSundayRoutineCompleted() {
  const storage = typeof localStorage !== 'undefined' ? localStorage : null;
  const now = Date.now();
  const today = new Date();
  const currentStreak = storage ? parseInt(storage.getItem('sunday_dictation_streak') || '0', 10) : 0;
  
  const newStreak = currentStreak + 1;
  if (storage) {
    storage.setItem('sunday_dictation_streak', newStreak.toString());
    storage.setItem('sunday_dictation_last_completed', now.toString());
  }

  return {
    newStreak,
    isSunday: today.getDay() === 0
  };
}
