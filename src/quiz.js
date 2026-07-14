/**
 * British English Vault - Quiz Engine
 */

let quizSession = {
  category: 'all',
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
 * Start a new Quiz session
 */
export function startQuiz(category, allItems) {
  // 1. Filter items by category
  let filtered = allItems;
  if (category !== 'all') {
    filtered = allItems.filter(item => item.category === category);
  }

  // 2. Return false if not enough questions
  if (filtered.length === 0) {
    return false;
  }

  // 3. Shuffle and pick up to 10 questions
  const shuffled = shuffleArray(filtered);
  const quizItems = shuffled.slice(0, 10);

  // 4. Initialize session
  quizSession = {
    category,
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
    // We will increment the mistake count of this item globally.
    // This is handled in main.js when updating database.
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
      "עייף מאוד, מותש לחלוטין (Knackered)",
      "שמח מאוד, מרוצה מעצמו (Chuffed)",
      "בא לך כוס תה? (Fancy a cuppa?)",
      "המום או מופתע לחלוטין (Gobsmacked)",
      "מאוכזב מאוד, שבור (Gutted)",
      "פאונד (סלנג בריטי למטבע)",
      "תפרן, בלי פרוטה (Skint)"
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

