/**
 * British English Vault - Quiz Engine
 */

let quizSession = {
  category: 'all',
  mode: 'mc', // 'mc' (multiple choice) or 'dictation' (listen and write)
  questions: [],
  currentIndex: 0,
  correctCount: 0,
  incorrectCount: 0,
  answersRecord: [] // list of { item, isCorrect }
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

/**
 * Start a new Quiz session
 * @param {string} category - 'all', 'all-vocab', 'grammar', 'words', 'slangs', 'phrases', 'idioms'
 * @param {Array} allItems - Vocabulary items array
 * @param {Array} grammarTopics - Grammar topics array from learnData.js
 * @param {string} mode - 'mc' or 'dictation'
 */
export function startQuiz(category = 'all', allItems = [], grammarTopics = [], mode = 'mc') {
  let pool = [];

  // Helper to extract grammar practice questions as quiz items
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
    // Select all 4 vocabulary types: words, slangs, phrases, idioms
    pool = allItems.filter(item => ['words', 'slangs', 'phrases', 'idioms'].includes(item.category));
  } else if (category === 'all') {
    // Mixed: combine vocabulary items and grammar questions
    const vocab = allItems.filter(item => ['words', 'slangs', 'phrases', 'idioms'].includes(item.category));
    const grammarQs = getGrammarQuestions();
    pool = [...vocab, ...grammarQs];
  } else {
    // Specific single category (words, slangs, phrases, idioms)
    pool = allItems.filter(item => item.category === category);
  }

  // If in dictation mode and pool only has grammar questions, filter to those whose answers can be dictated,
  // or for vocabulary items where term can be spoken
  if (pool.length === 0) {
    return false;
  }

  // Shuffle and pick up to 10 questions
  const shuffled = shuffleArray(pool);
  const quizItems = shuffled.slice(0, 10);

  // Initialize session
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

/**
 * Get active question
 */
export function getCurrentQuestion() {
  if (quizSession.questions.length === 0 || quizSession.currentIndex >= quizSession.questions.length) {
    return null;
  }
  return quizSession.questions[quizSession.currentIndex];
}

/**
 * Get current quiz mode ('mc' or 'dictation')
 */
export function getQuizMode() {
  return quizSession.mode || 'mc';
}

/**
 * Get session progress
 */
export function getQuizProgress() {
  return {
    current: quizSession.currentIndex + 1,
    total: quizSession.questions.length,
    percentage: Math.round(((quizSession.currentIndex) / quizSession.questions.length) * 100)
  };
}

/**
 * Check user dictation input against target
 */
export function checkDictationAnswer(userInput) {
  const currentItem = getCurrentQuestion();
  if (!currentItem) {
    return { isCorrect: false, correctTerm: '', userAnswer: userInput };
  }

  const targetTerm = currentItem.isGrammar ? currentItem.meaning : currentItem.term;
  const normalizedTarget = normalizeAnswer(targetTerm);
  const normalizedInput = normalizeAnswer(userInput);

  // Exact match or tolerant match
  const isCorrect = (normalizedInput === normalizedTarget) ||
                    (normalizedTarget.length > 2 && normalizedTarget.replace(/^(to |a |an |the )/, '') === normalizedInput);

  return {
    isCorrect,
    correctTerm: targetTerm,
    userAnswer: userInput.trim()
  };
}

/**
 * Grade current question
 */
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

/**
 * Advance to next question
 * Returns true if there is a next question, false if quiz is completed
 */
export function nextQuestion() {
  quizSession.currentIndex++;
  return quizSession.currentIndex < quizSession.questions.length;
}

/**
 * Return results summary
 */
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

/**
 * Generate 4 multiple-choice options for the quiz card
 * Includes 1 correct answer and 3 randomized distractors
 */
export function getQuizChoices(currentItem, allItems) {
  // If this is a grammar item with pre-defined multiple-choice options
  if (currentItem.isGrammar && Array.isArray(currentItem.options) && currentItem.options.length > 0) {
    return currentItem.options.map((optText, idx) => ({
      text: optText,
      isCorrect: idx === currentItem.correctIndex
    }));
  }

  const correctMeaning = currentItem.meaning;
  
  // 1. Gather all potential distractors (excluding current meaning)
  let distractors = allItems
    .filter(item => item.meaning.trim() !== correctMeaning.trim())
    .map(item => item.meaning);

  // De-duplicate distractors
  distractors = [...new Set(distractors)];

  // 2. Select 3 distractors
  let chosenDistractors = [];
  if (distractors.length >= 3) {
    const shuffledDistractors = shuffleArray(distractors);
    chosenDistractors = shuffledDistractors.slice(0, 3);
  } else {
    // Fallback static distractors if the user database is too small
    const staticFillers = [
      "Very tired, completely exhausted (Knackered)",
      "Extremely happy, delighted (Chuffed)",
      "Would you like a cup of tea? (Fancy a cuppa?)",
      "Completely shocked or astonished (Gobsmacked)",
      "Extremely disappointed, devastated (Gutted)",
      "A pound sterling (British currency slang)",
      "Broke, having no money (Skint)"
    ];
    
    // Filter out correct meaning if it overlaps
    const filteredFillers = staticFillers.filter(f => f.trim() !== correctMeaning.trim());
    const shuffledFillers = shuffleArray(filteredFillers);
    
    chosenDistractors = [...distractors, ...shuffledFillers].slice(0, 3);
  }

  // 3. Assemble and shuffle choices
  const choices = [
    { text: correctMeaning, isCorrect: true },
    ...chosenDistractors.map(text => ({ text, isCorrect: false }))
  ];

  return shuffleArray(choices);
}
