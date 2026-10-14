/**
 * British English Vault - Interactive Games & Gamification Engine
 * Implements 34 mini-games, 10 consecutive questions per game,
 * live scoring, progress bars, audio pronunciation, and end-of-game summary screens.
 */

import { speakText } from './speech.js';

// ==========================================================================
// GAMIFICATION STATE MANAGEMENT
// ==========================================================================

export function getGameStats(vaultData) {
  if (!vaultData.gameStats) {
    vaultData.gameStats = {
      xp: 0,
      coins: 50,
      streak: 1,
      lastPlayDate: null,
      gamesPlayed: 0,
      perfectScores: 0,
      weakItems: [],
      highScores: {}
    };
  }
  updateDailyStreak(vaultData.gameStats);
  return vaultData.gameStats;
}

export function updateDailyStreak(stats) {
  const today = new Date().toISOString().split('T')[0];
  if (!stats.lastPlayDate) {
    stats.lastPlayDate = today;
    stats.streak = 1;
    return;
  }

  if (stats.lastPlayDate === today) return;

  const last = new Date(stats.lastPlayDate);
  const current = new Date(today);
  const diffDays = Math.round((current - last) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    stats.streak += 1;
  } else if (diffDays > 1) {
    stats.streak = 1;
  }
  stats.lastPlayDate = today;
}

export function calculateUserLevel(xp) {
  if (xp >= 4000) return { level: 6, code: 'C2', title: 'Level C2 Royal Master', badge: '👑 C2', nextXp: 5000, currentBase: 4000, pct: 100 };
  if (xp >= 2000) return { level: 5, code: 'C1', title: 'Level C1 Advanced Orator', badge: '🎓 C1', nextXp: 4000, currentBase: 2000, pct: Math.round(((xp - 2000) / 2000) * 100) };
  if (xp >= 1000) return { level: 4, code: 'B2', title: 'Level B2 Upper-Int Master', badge: '🏆 B2', nextXp: 2000, currentBase: 1000, pct: Math.round(((xp - 1000) / 1000) * 100) };
  if (xp >= 500)  return { level: 3, code: 'B1', title: 'Level B1 Intermediate Scholar', badge: '📚 B1', nextXp: 1000, currentBase: 500, pct: Math.round(((xp - 500) / 500) * 100) };
  if (xp >= 200)  return { level: 2, code: 'A2', title: 'Level A2 Elementary Explorer', badge: '🧭 A2', nextXp: 500, currentBase: 200, pct: Math.round(((xp - 200) / 300) * 100) };
  return { level: 1, code: 'A1', title: 'Level A1 Novice Learner', badge: '🌱 A1', nextXp: 200, currentBase: 0, pct: Math.round((xp / 200) * 100) };
}

export function awardGameRewards(vaultData, xpAmount, coinsAmount, gameKey, isPerfect = false, saveFn = () => {}) {
  const stats = getGameStats(vaultData);
  stats.xp += xpAmount;
  stats.coins += coinsAmount;
  stats.gamesPlayed += 1;
  if (isPerfect) stats.perfectScores += 1;

  if (!stats.highScores) stats.highScores = {};
  if (!stats.highScores[gameKey] || xpAmount > stats.highScores[gameKey]) {
    stats.highScores[gameKey] = xpAmount;
  }

  saveFn();
  return { xp: xpAmount, coins: coinsAmount };
}

// ==========================================================================
// SPACED REPETITION & ADAPTIVE ITEM SELECTION
// ==========================================================================

export function getAdaptiveGameItems(vaultData, count = 10) {
  const allItems = vaultData.items || [];
  const stats = getGameStats(vaultData);
  const weakIds = stats.weakItems || [];

  const weakPool = allItems.filter(i => weakIds.includes(i.id));
  const normalPool = allItems.filter(i => !weakIds.includes(i.id));

  const selected = [];
  const shuffledWeak = shuffleArray(weakPool);
  const shuffledNormal = shuffleArray(normalPool);

  selected.push(...shuffledWeak.slice(0, Math.ceil(count / 2)));
  const remaining = count - selected.length;
  selected.push(...shuffledNormal.slice(0, remaining));

  // Fallbacks if vault items are fewer than count
  if (selected.length < count) {
    const fallbacks = getFallbackVaultItems();
    for (const fb of fallbacks) {
      if (selected.length >= count) break;
      if (!selected.some(s => s.term.toLowerCase() === fb.term.toLowerCase())) {
        selected.push(fb);
      }
    }
  }

  return shuffleArray(selected.slice(0, count));
}

export function recordGameMistake(vaultData, itemId) {
  const stats = getGameStats(vaultData);
  if (itemId && !stats.weakItems.includes(itemId)) {
    stats.weakItems.push(itemId);
  }
}

export function recordGameSuccess(vaultData, itemId) {
  const stats = getGameStats(vaultData);
  if (itemId && stats.weakItems.includes(itemId)) {
    stats.weakItems = stats.weakItems.filter(id => id !== itemId);
  }
}

export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getAllVaultItems(vaultData) {
  const items = vaultData.items || [];
  const fallbacks = getFallbackVaultItems();
  const map = new Map();
  items.forEach(i => { if (i && i.term) map.set(i.term.toLowerCase().trim(), i); });
  fallbacks.forEach(f => { if (f && f.term && !map.has(f.term.toLowerCase().trim())) map.set(f.term.toLowerCase().trim(), f); });
  return Array.from(map.values());
}

export function makeDynamicMC(vaultData, promptKey, answerKey, count = 10) {
  const all = getAllVaultItems(vaultData);
  const shuffledItems = shuffleArray(all).slice(0, count);
  
  return shuffledItems.map(item => {
    const prompt = item[promptKey] || item.term;
    const correct = item[answerKey] || item.meaning;
    
    const otherValues = all
      .filter(i => i[answerKey] && i[answerKey].toLowerCase().trim() !== correct.toLowerCase().trim())
      .map(i => i[answerKey]);
    
    const uniqueDistractors = Array.from(new Set(otherValues));
    const chosenDistractors = shuffleArray(uniqueDistractors).slice(0, 3);
    
    return {
      word: prompt,
      target: correct,
      choices: [correct, ...chosenDistractors]
    };
  });
}

export function getFallbackVaultItems() {
  return [
    { id: 'fb-1', term: 'Chuffed', meaning: 'Very pleased or happy', category: 'slangs', example: 'I was absolutely chuffed with my exam results.' },
    { id: 'fb-2', term: 'Knackered', meaning: 'Extremely tired, exhausted', category: 'slangs', example: 'After walking across London all day, I am knackered.' },
    { id: 'fb-3', term: 'Gobsmacked', meaning: 'Astonished or deeply shocked', category: 'slangs', example: 'She was gobsmacked when she won the award.' },
    { id: 'fb-4', term: 'Gutted', meaning: 'Bitterly disappointed', category: 'slangs', example: 'We were gutted when our train was cancelled.' },
    { id: 'fb-5', term: 'Skint', meaning: 'Having no money, broke', category: 'slangs', example: 'I cannot go out tonight because I am skint.' },
    { id: 'fb-6', term: 'Fancy a cuppa?', meaning: 'Would you like a cup of tea?', category: 'phrases', example: 'Come in from the cold! Fancy a cuppa?' },
    { id: 'fb-7', term: 'Piece of cake', meaning: 'Something very easy to do', category: 'idioms', example: 'Do not worry, the test will be a piece of cake.' },
    { id: 'fb-8', term: 'Bite the bullet', meaning: 'Face a difficult situation with courage', category: 'idioms', example: 'I decided to bite the bullet and speak to the boss.' },
    { id: 'fb-9', term: 'Dodgy', meaning: 'Suspicious, unreliable or risky', category: 'slangs', example: 'That dark alley looks a bit dodgy.' },
    { id: 'fb-10', term: 'Posh', meaning: 'Elegant, high class or luxurious', category: 'words', example: 'They stayed at a very posh hotel in Mayfair.' },
    { id: 'fb-11', term: 'Bloke', meaning: 'A man, guy or fellow', category: 'slangs', example: 'He is a nice bloke from Manchester.' },
    { id: 'fb-12', term: 'Cheerio', meaning: 'Goodbye, see you later', category: 'phrases', example: 'Cheerio! Have a safe trip home.' },
    { id: 'fb-13', term: 'Break a leg', meaning: 'Good luck before a performance', category: 'idioms', example: 'Break a leg on stage tonight!' },
    { id: 'fb-14', term: 'Spill the tea', meaning: 'Share gossip or secret information', category: 'phrases', example: 'Come on, spill the tea about what happened!' },
    { id: 'fb-15', term: 'Under the weather', meaning: 'Feeling slightly unwell or sick', category: 'idioms', example: 'I am feeling a bit under the weather today.' },
    { id: 'fb-16', term: 'Splendid', meaning: 'Magnificent, excellent or grand', category: 'words', example: 'We had a splendid afternoon in the gardens.' },
    { id: 'fb-17', term: 'Quaint', meaning: 'Attractively unusual or old-fashioned', category: 'words', example: 'It is a quaint little village in the Cotswolds.' },
    { id: 'fb-18', term: 'Proper', meaning: 'Genuine, thorough or correct', category: 'words', example: 'Make sure to get a proper night sleep.' },
    { id: 'fb-19', term: 'Fortnight', meaning: 'A period of two weeks (14 days)', category: 'words', example: 'We are going on holiday for a fortnight.' },
    { id: 'fb-20', term: 'Rubbish', meaning: 'Waste material, or nonsense', category: 'words', example: 'Do not talk rubbish, of course you can do it!' },
    { id: 'fb-21', term: 'Cheeky', meaning: 'Playfully rude or impudent', category: 'slangs', example: 'He made a cheeky comment that made everyone laugh.' },
    { id: 'fb-22', term: 'Daft', meaning: 'Silly, foolish or senseless', category: 'slangs', example: 'Do not be daft, you are doing wonderfully!' },
    { id: 'fb-23', term: 'Cost an arm and a leg', meaning: 'Very expensive', category: 'idioms', example: 'That bespoke tailored coat cost an arm and a leg.' },
    { id: 'fb-24', term: 'Bob\'s your uncle', meaning: 'And there it is, simple as that!', category: 'idioms', example: 'Press this red button and Bob\'s your uncle!' },
    { id: 'fb-25', term: 'To take the biscuit', meaning: 'To be the most annoying or surprising thing', category: 'idioms', example: 'Arriving two hours late really takes the biscuit.' },
    { id: 'fb-26', term: 'Nosh', meaning: 'Food or a snack', category: 'slangs', example: 'Let us grab some quick nosh before the train leaves.' },
    { id: 'fb-27', term: 'Kip', meaning: 'A short sleep or nap', category: 'slangs', example: 'I am going to have a quick kip on the sofa.' },
    { id: 'fb-28', term: 'Blimey', meaning: 'An exclamation of surprise or wonder', category: 'phrases', example: 'Blimey, look at the size of that castle!' },
    { id: 'fb-29', term: 'Toodle-oo', meaning: 'A cheerful, old-fashioned goodbye', category: 'phrases', example: 'Toodle-oo! See you next Tuesday!' },
    { id: 'fb-30', term: 'Miffed', meaning: 'Slightly annoyed or offended', category: 'slangs', example: 'She was rather miffed that they forgot to invite her.' },
    { id: 'fb-31', term: 'Brilliant', meaning: 'Exceptionally clever, or great', category: 'words', example: 'That is a brilliant idea to solve the problem.' },
    { id: 'fb-32', term: 'Wonky', meaning: 'Crooked, unsteady or not working properly', category: 'slangs', example: 'This table leg is a bit wonky.' },
    { id: 'fb-33', term: 'Loo', meaning: 'Toilet or restroom', category: 'slangs', example: 'Could you tell me where the loo is, please?' },
    { id: 'fb-34', term: 'Kerfuffle', meaning: 'A commotion, fuss or mild controversy', category: 'words', example: 'There was a bit of a kerfuffle outside the station.' },
    { id: 'fb-35', term: 'Brolly', meaning: 'An umbrella', category: 'slangs', example: 'Do not forget your brolly, it is raining cats and dogs!' }
  ];
}

// ==========================================================================
// UNIVERSAL GAME HEADER COMPONENT (Live Score & Progress Bar)
// ==========================================================================

export function renderGameHeader(title, current, total = 10, score = 0) {
  const pct = Math.round(((current - 1) / total) * 100);
  return `
    <div class="game-round-header" style="margin-bottom: 1.25rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; flex-wrap: wrap; gap: 0.5rem;">
        <span class="category-pill" style="margin: 0; font-size: 0.85rem;"><i class="fa-solid fa-gamepad"></i> ${title}</span>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span style="font-weight: 700; color: var(--gold); font-size: 0.95rem;">
            <i class="fa-solid fa-trophy"></i> ניקוד (Score): <span class="score-display">${score}</span>
          </span>
          <span style="font-weight: 700; color: var(--uk-blue); font-size: 0.95rem;">
            שאלה ${current} מתוך ${total} <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: normal;">(Q ${current}/${total})</span>
          </span>
        </div>
      </div>
      <div class="game-xp-bar-container" style="height: 8px; background: rgba(0,0,0,0.06); border-radius: 999px; overflow: hidden;">
        <div class="game-xp-bar-fill" style="width: ${pct}%; transition: width 0.3s ease; height: 100%; background: linear-gradient(90deg, var(--uk-blue), var(--uk-red));"></div>
      </div>
    </div>
  `;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ==========================================================================
// 1. GAME: WORD MATCH 🧩 (10 consecutive matching questions)
// ==========================================================================

export function startWordMatchGame(stageEl, vaultData, onComplete = () => {}) {
  const items = getAdaptiveGameItems(vaultData, 10);
  const allVault = getAllVaultItems(vaultData);
  let currentIdx = 0;
  let score = 0;

  const renderMatchQuestion = () => {
    if (currentIdx >= items.length) {
      onComplete({
        title: 'Word Match Complete! 🧩',
        correct: score,
        total: items.length,
        percentage: Math.round((score / items.length) * 100),
        xp: score * 10 + (score === items.length ? 25 : 0),
        coins: score * 2,
        details: `Successfully matched ${score} out of ${items.length} English terms to their definitions!`
      });
      return;
    }

    const currentItem = items[currentIdx];
    const distractors = allVault
      .filter(i => i.id !== currentItem.id && i.meaning !== currentItem.meaning)
      .map(i => i.meaning);
    
    const uniqueDistractors = shuffleArray(Array.from(new Set(distractors))).slice(0, 3);
    const options = shuffleArray([
      { text: currentItem.meaning, correct: true },
      ...uniqueDistractors.map(d => ({ text: d, correct: false }))
    ]);

    stageEl.innerHTML = `
      ${renderGameHeader('🧩 Word Match', currentIdx + 1, items.length, score)}

      <div class="card text-center" style="padding: 1.75rem 1rem; margin-bottom: 1.25rem;">
        <span class="category-pill">${currentItem.category || 'Vocabulary'}</span>
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin: 0.75rem 0;">
          <h3 style="font-size: 2rem; font-family: 'Playfair Display', serif; margin: 0;">${currentItem.term}</h3>
          <button class="game-speak-btn wm-speak-btn" data-text="${currentItem.term.replace(/"/g, '&quot;')}" title="Listen to pronunciation">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Tap the matching definition card below:</p>
      </div>

      <div class="practice-options-grid">
        ${options.map((opt, i) => `
          <button class="practice-opt-btn wm-opt-btn" data-correct="${opt.correct}">
            <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
            <span class="opt-text">${opt.text}</span>
          </button>
        `).join('')}
      </div>
    `;

    const speakBtn = stageEl.querySelector('.wm-speak-btn');
    if (speakBtn) {
      speakBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        speakText(currentItem.term);
      });
    }

    stageEl.querySelectorAll('.wm-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.getAttribute('data-correct') === 'true';
        stageEl.querySelectorAll('.wm-opt-btn').forEach(b => {
          b.disabled = true;
          if (b.getAttribute('data-correct') === 'true') b.classList.add('correct-answer');
        });

        if (isCorrect) {
          btn.classList.add('correct-answer');
          score++;
          recordGameSuccess(vaultData, currentItem.id);
          speakText(currentItem.term);
        } else {
          btn.classList.add('wrong-selected');
          recordGameMistake(vaultData, currentItem.id);
        }

        setTimeout(() => {
          currentIdx++;
          renderMatchQuestion();
        }, 1100);
      });
    });
  };

  renderMatchQuestion();
}

// ==========================================================================
// 2. GAME: QUICK CHOICE ⚡ (10 consecutive timed questions)
// ==========================================================================

export function startQuickChoiceGame(stageEl, vaultData, onComplete = () => {}) {
  const questions = getAdaptiveGameItems(vaultData, 10);
  const allVault = getAllVaultItems(vaultData);
  let currentIdx = 0;
  let score = 0;
  let timerVal = 10;
  let timerInterval = null;

  const renderQuestion = () => {
    clearInterval(timerInterval);
    if (currentIdx >= questions.length) {
      onComplete({
        title: 'Quick Choice Finished! ⚡',
        correct: score,
        total: questions.length,
        percentage: Math.round((score / questions.length) * 100),
        xp: score * 10 + (score === questions.length ? 25 : 0),
        coins: score * 2,
        details: `Scored ${score} out of ${questions.length} rapid-fire questions!`
      });
      return;
    }

    const currentItem = questions[currentIdx];
    let distractors = allVault
      .filter(i => i.id !== currentItem.id && i.meaning !== currentItem.meaning)
      .map(i => i.meaning);
    
    distractors = shuffleArray(Array.from(new Set(distractors))).slice(0, 3);
    const options = shuffleArray([
      { text: currentItem.meaning, correct: true },
      ...distractors.map(d => ({ text: d, correct: false }))
    ]);

    stageEl.innerHTML = `
      ${renderGameHeader('⚡ Quick Choice', currentIdx + 1, questions.length, score)}

      <div class="quick-choice-header" style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
        <span class="timer-badge" id="qc-timer" style="font-weight: 700; color: var(--danger);"><i class="fa-solid fa-clock"></i> <b id="qc-timer-num">10</b>s</span>
        <div style="flex: 1; margin-left: 1rem; background: rgba(0,0,0,0.06); height: 6px; border-radius: 999px; overflow: hidden;">
          <div id="qc-timer-fill" style="width: 100%; height: 100%; background: var(--danger); transition: width 1s linear;"></div>
        </div>
      </div>

      <div class="card text-center" style="padding: 1.5rem 1rem; margin-bottom: 1.25rem;">
        <span class="category-pill" style="margin-bottom: 0.5rem; display: inline-block;">${currentItem.category || 'Vocabulary'}</span>
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
          <h3 style="font-size: 1.9rem; font-family: 'Playfair Display', serif; margin: 0.25rem 0;">${currentItem.term}</h3>
          <button class="game-speak-btn qc-speak-btn" data-text="${currentItem.term.replace(/"/g, '&quot;')}" title="Listen">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
        <p style="color: var(--text-muted); font-size: 0.9rem;">What is the correct meaning?</p>
      </div>

      <div class="practice-options-grid" id="qc-options-grid">
        ${options.map((opt, i) => `
          <button class="practice-opt-btn qc-opt-btn" data-correct="${opt.correct}">
            <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
            <span class="opt-text">${opt.text}</span>
          </button>
        `).join('')}
      </div>
    `;

    const speakBtn = stageEl.querySelector('.qc-speak-btn');
    if (speakBtn) {
      speakBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        speakText(currentItem.term);
      });
    }

    timerVal = 10;
    const timerNum = stageEl.querySelector('#qc-timer-num');
    const timerFill = stageEl.querySelector('#qc-timer-fill');

    timerInterval = setInterval(() => {
      timerVal--;
      if (timerNum) timerNum.innerText = timerVal;
      if (timerFill) timerFill.style.width = `${(timerVal / 10) * 100}%`;

      if (timerVal <= 0) {
        clearInterval(timerInterval);
        recordGameMistake(vaultData, currentItem.id);
        stageEl.querySelectorAll('.qc-opt-btn').forEach(b => {
          b.disabled = true;
          if (b.getAttribute('data-correct') === 'true') b.classList.add('correct-answer');
        });
        setTimeout(() => {
          currentIdx++;
          renderQuestion();
        }, 1000);
      }
    }, 1000);

    stageEl.querySelectorAll('.qc-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        clearInterval(timerInterval);
        const isCorrect = btn.getAttribute('data-correct') === 'true';

        stageEl.querySelectorAll('.qc-opt-btn').forEach(b => {
          b.disabled = true;
          if (b.getAttribute('data-correct') === 'true') b.classList.add('correct-answer');
        });

        if (isCorrect) {
          btn.classList.add('correct-answer');
          score++;
          recordGameSuccess(vaultData, currentItem.id);
          speakText(currentItem.term);
        } else {
          btn.classList.add('wrong-selected');
          recordGameMistake(vaultData, currentItem.id);
        }

        setTimeout(() => {
          currentIdx++;
          renderQuestion();
        }, 1000);
      });
    });
  };

  renderQuestion();
}

// ==========================================================================
// 3. GAME: FILL THE GAP 📝 (10 consecutive sentence gaps)
// ==========================================================================

export function startFillGapGame(stageEl, vaultData, onComplete = () => {}) {
  const items = getAdaptiveGameItems(vaultData, 10);
  const allVault = getAllVaultItems(vaultData);
  let currentIdx = 0;
  let score = 0;

  const renderGapQuestion = () => {
    if (currentIdx >= items.length) {
      onComplete({
        title: 'Fill the Gap Complete! 📝',
        correct: score,
        total: items.length,
        percentage: Math.round((score / items.length) * 100),
        xp: score * 10 + (score === items.length ? 25 : 0),
        coins: score * 2,
        details: `Completed ${score} out of ${items.length} sentence gaps accurately!`
      });
      return;
    }

    const currentItem = items[currentIdx];
    const sentence = currentItem.example || `I felt extremely ${currentItem.term} yesterday.`;
    
    const regex = new RegExp(`\\b${escapeRegExp(currentItem.term)}\\b`, 'gi');
    const maskedSentence = sentence.replace(regex, '__________');

    const distractors = allVault
      .filter(i => i.id !== currentItem.id && i.term !== currentItem.term)
      .map(i => i.term);

    const choices = shuffleArray([
      { text: currentItem.term, correct: true },
      ...shuffleArray(Array.from(new Set(distractors))).slice(0, 3).map(d => ({ text: d, correct: false }))
    ]);

    stageEl.innerHTML = `
      ${renderGameHeader('📝 Fill the Gap', currentIdx + 1, items.length, score)}

      <div class="card text-center" style="padding: 1.75rem 1.25rem; margin-bottom: 1.25rem;">
        <span class="category-pill">Sentence Gap Fill</span>
        <h3 style="font-size: 1.3rem; margin: 1.25rem 0; line-height: 1.6;" id="gap-sentence">"${maskedSentence}"</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Clue Meaning: <b>${currentItem.meaning}</b></p>
      </div>

      <div class="practice-options-grid">
        ${choices.map((c, i) => `
          <button class="practice-opt-btn gap-opt-btn" data-correct="${c.correct}">
            <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
            <span class="opt-text">${c.text}</span>
          </button>
        `).join('')}
      </div>
    `;

    stageEl.querySelectorAll('.gap-opt-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const isCorrect = btn.getAttribute('data-correct') === 'true';

        stageEl.querySelectorAll('.gap-opt-btn').forEach(b => {
          b.disabled = true;
          if (b.getAttribute('data-correct') === 'true') b.classList.add('correct-answer');
        });

        if (isCorrect) {
          btn.classList.add('correct-answer');
          score++;
          recordGameSuccess(vaultData, currentItem.id);
          await speakText(sentence);
        } else {
          btn.classList.add('wrong-selected');
          recordGameMistake(vaultData, currentItem.id);
        }

        setTimeout(() => {
          currentIdx++;
          renderGapQuestion();
        }, 1100);
      });
    });
  };

  renderGapQuestion();
}

// ==========================================================================
// 4. GAME: WORD SCRAMBLE 🔤 (10 consecutive scrambled words)
// ==========================================================================

export function startWordScrambleGame(stageEl, vaultData, onComplete = () => {}) {
  const items = getAdaptiveGameItems(vaultData, 10);
  let currentIdx = 0;
  let score = 0;

  const renderScramble = () => {
    if (currentIdx >= items.length) {
      onComplete({
        title: 'Word Scramble Solved! 🔤',
        correct: score,
        total: items.length,
        percentage: Math.round((score / items.length) * 100),
        xp: score * 12 + (score === items.length ? 25 : 0),
        coins: score * 2,
        details: `Successfully unscrambled ${score} out of ${items.length} words!`
      });
      return;
    }

    const currentItem = items[currentIdx];
    const targetWord = currentItem.term.toUpperCase().replace(/[^A-Z]/g, '');
    const letters = shuffleArray(targetWord.split(''));
    let currentInput = [];

    stageEl.innerHTML = `
      ${renderGameHeader('🔤 Word Scramble', currentIdx + 1, items.length, score)}

      <div class="card text-center" style="padding: 1.5rem; margin-bottom: 1.25rem;">
        <span class="category-pill">Unscramble the word</span>
        <h4 style="margin-top: 0.75rem; color: var(--text-muted); font-size: 1rem;">Clue: ${currentItem.meaning}</h4>
        
        <div class="scramble-slots" id="scramble-slots" style="display: flex; justify-content: center; gap: 0.4rem; margin: 1.25rem 0; flex-wrap: wrap;">
          ${Array.from({ length: targetWord.length }).map(() => `
            <div class="scramble-slot" style="min-width: 38px; height: 44px; line-height: 44px; font-size: 1.3rem; border-bottom: 3px solid var(--uk-blue); text-align: center; font-weight: 700;">_</div>
          `).join('')}
        </div>
      </div>

      <div class="scramble-letters-grid" id="scramble-letters" style="display: flex; justify-content: center; gap: 0.5rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
        ${letters.map((char, idx) => `
          <button class="scramble-tile-btn" data-char="${char}" data-idx="${idx}" style="min-width: 42px; height: 44px; font-size: 1.2rem; font-weight: 700;">${char}</button>
        `).join('')}
      </div>

      <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
        <button class="btn btn-secondary" id="btn-clear-scramble"><i class="fa-solid fa-rotate-left"></i> נקה (Clear)</button>
        <button class="btn btn-primary" id="btn-submit-scramble"><i class="fa-solid fa-circle-check"></i> בדוק (Submit)</button>
        <button class="btn btn-secondary" id="btn-skip-scramble" style="opacity: 0.85;"><i class="fa-solid fa-forward"></i> דלג (Skip)</button>
      </div>
    `;

    const updateSlots = () => {
      const slots = stageEl.querySelectorAll('.scramble-slot');
      slots.forEach((slot, i) => {
        if (currentInput[i]) {
          slot.innerText = currentInput[i].char;
          slot.classList.add('filled');
        } else {
          slot.innerText = '_';
          slot.classList.remove('filled');
        }
      });
    };

    stageEl.querySelectorAll('.scramble-tile-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        btn.disabled = true;
        btn.classList.add('used');
        currentInput.push({ char: btn.getAttribute('data-char'), btnEl: btn });
        updateSlots();
      });
    });

    stageEl.querySelector('#btn-clear-scramble').addEventListener('click', () => {
      currentInput.forEach(item => {
        item.btnEl.disabled = false;
        item.btnEl.classList.remove('used');
      });
      currentInput = [];
      updateSlots();
    });

    stageEl.querySelector('#btn-skip-scramble').addEventListener('click', () => {
      recordGameMistake(vaultData, currentItem.id);
      currentIdx++;
      renderScramble();
    });

    stageEl.querySelector('#btn-submit-scramble').addEventListener('click', () => {
      const userSpelling = currentInput.map(i => i.char).join('');
      if (userSpelling === targetWord) {
        score++;
        recordGameSuccess(vaultData, currentItem.id);
        stageEl.querySelector('#scramble-slots').style.color = 'var(--success)';
        speakText(currentItem.term);
        setTimeout(() => {
          currentIdx++;
          renderScramble();
        }, 1100);
      } else {
        recordGameMistake(vaultData, currentItem.id);
        stageEl.querySelector('#scramble-slots').classList.add('shake');
        setTimeout(() => stageEl.querySelector('#scramble-slots')?.classList.remove('shake'), 600);
      }
    });
  };

  renderScramble();
}

// ==========================================================================
// 5. GAME: LISTEN & CHOOSE 🎧 (10 consecutive audio clips)
// ==========================================================================

export function startListenChooseGame(stageEl, vaultData, onComplete = () => {}) {
  const items = getAdaptiveGameItems(vaultData, 10);
  const allVault = getAllVaultItems(vaultData);
  let currentIdx = 0;
  let score = 0;

  const renderListen = () => {
    if (currentIdx >= items.length) {
      onComplete({
        title: 'Listening Master! 🎧',
        correct: score,
        total: items.length,
        percentage: Math.round((score / items.length) * 100),
        xp: score * 10 + (score === items.length ? 25 : 0),
        coins: score * 2,
        details: `Identified ${score} out of ${items.length} spoken audio clips!`
      });
      return;
    }

    const currentItem = items[currentIdx];
    const distractors = allVault
      .filter(i => i.id !== currentItem.id && i.term !== currentItem.term)
      .map(i => i.term);

    const choices = shuffleArray([
      { text: currentItem.term, correct: true },
      ...shuffleArray(Array.from(new Set(distractors))).slice(0, 3).map(d => ({ text: d, correct: false }))
    ]);

    stageEl.innerHTML = `
      ${renderGameHeader('🎧 Listen & Choose', currentIdx + 1, items.length, score)}

      <div class="card text-center" style="padding: 2rem 1.25rem; margin-bottom: 1.25rem;">
        <span class="category-pill">Listening Comprehension</span>
        <div style="margin: 1.25rem 0;">
          <button class="speech-btn text-speech-trigger" id="btn-play-listen-audio" style="width: 70px; height: 70px; font-size: 2rem; margin: 0 auto; border-radius: 50%;">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Tap the speaker to hear the UK English term, then choose what you heard.</p>
      </div>

      <div class="practice-options-grid">
        ${choices.map((c, i) => `
          <button class="practice-opt-btn listen-opt-btn" data-correct="${c.correct}">
            <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
            <span class="opt-text">${c.text}</span>
          </button>
        `).join('')}
      </div>
    `;

    const audioBtn = stageEl.querySelector('#btn-play-listen-audio');
    const playAudio = () => speakText(currentItem.term);

    audioBtn.addEventListener('click', playAudio);
    setTimeout(playAudio, 300);

    stageEl.querySelectorAll('.listen-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.getAttribute('data-correct') === 'true';
        stageEl.querySelectorAll('.listen-opt-btn').forEach(b => {
          b.disabled = true;
          if (b.getAttribute('data-correct') === 'true') b.classList.add('correct-answer');
        });

        if (isCorrect) {
          btn.classList.add('correct-answer');
          score++;
          recordGameSuccess(vaultData, currentItem.id);
        } else {
          btn.classList.add('wrong-selected');
          recordGameMistake(vaultData, currentItem.id);
        }

        setTimeout(() => {
          currentIdx++;
          renderListen();
        }, 1100);
      });
    });
  };

  renderListen();
}

// ==========================================================================
// 6. GAME: SAY IT (SPEAKING PRACTICE) 🗣️ (10 consecutive speaking challenges)
// ==========================================================================

export function startSayItGame(stageEl, vaultData, onComplete = () => {}) {
  const items = getAdaptiveGameItems(vaultData, 10);
  let currentIdx = 0;
  let score = 0;

  const renderSayIt = () => {
    if (currentIdx >= items.length) {
      onComplete({
        title: 'Pronunciation Champion! 🗣️',
        correct: score,
        total: items.length,
        percentage: Math.round((score / items.length) * 100),
        xp: score * 12 + (score === items.length ? 25 : 0),
        coins: score * 2,
        details: `Practiced ${score} British expressions out loud with UK pronunciation!`
      });
      return;
    }

    const currentItem = items[currentIdx];

    stageEl.innerHTML = `
      ${renderGameHeader('🗣️ Say It', currentIdx + 1, items.length, score)}

      <div class="card text-center" style="padding: 1.75rem 1.25rem; margin-bottom: 1.25rem;">
        <span class="category-pill">Pronunciation & Speech</span>
        <h3 style="font-size: 2rem; font-family: 'Playfair Display', serif; margin: 0.75rem 0;">${currentItem.term}</h3>
        <p style="color: var(--text-muted); margin-bottom: 1rem;">"${currentItem.example || currentItem.meaning}"</p>
        
        <button class="btn btn-secondary" id="btn-listen-target" style="margin-bottom: 1.25rem;">
          <i class="fa-solid fa-volume-high"></i> השמע קודם במבטא בריטי (Listen UK)
        </button>

        <div id="speech-recognition-box">
          <button class="speech-btn speaking" id="btn-record-speech" style="width: 75px; height: 75px; font-size: 2rem; margin: 0 auto 0.75rem; border-radius: 50%;">
            <i class="fa-solid fa-microphone"></i>
          </button>
          <p id="speech-status-text" style="font-size: 0.9rem; font-weight: 600;">לחץ על המיקרופון ואמור את המילה בקול רם</p>
        </div>
      </div>

      <div class="text-center" style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
        <button class="btn btn-primary" id="btn-verify-pronunciation">
          <i class="fa-solid fa-circle-check"></i> הגיתי נכון! (+XP)
        </button>
        <button class="btn btn-secondary" id="btn-skip-sayit">
          <i class="fa-solid fa-forward"></i> הבא (Next)
        </button>
      </div>
    `;

    stageEl.querySelector('#btn-listen-target').addEventListener('click', () => {
      speakText(currentItem.example || currentItem.term);
    });

    const micBtn = stageEl.querySelector('#btn-record-speech');
    const statusText = stageEl.querySelector('#speech-status-text');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-GB';
      recognition.interimResults = false;

      micBtn.addEventListener('click', () => {
        statusText.innerText = 'מקשיב... דבר עכשיו!';
        micBtn.classList.add('speaking');
        try {
          recognition.start();
        } catch (e) {}
      });

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        statusText.innerText = `נשמע: "${transcript}"`;
        if (transcript.toLowerCase().includes(currentItem.term.toLowerCase())) {
          statusText.innerHTML = `<span style="color: var(--success);">✓ הגייה מצוינת! נשמע: "${transcript}"</span>`;
          score++;
          recordGameSuccess(vaultData, currentItem.id);
          setTimeout(() => {
            currentIdx++;
            renderSayIt();
          }, 1200);
        } else {
          statusText.innerHTML = `<span style="color: var(--gold);">ניסיון טוב! נשמע: "${transcript}"</span>`;
        }
      };

      recognition.onerror = () => {
        statusText.innerText = 'לא הצלחנו לגשת למיקרופון. תוכל ללחוץ על "הגיתי נכון!" למטה.';
      };
    } else {
      micBtn.addEventListener('click', () => {
        speakText(currentItem.term);
        statusText.innerText = 'האזן להגייה הבריטית וחזור עליה בקול!';
      });
    }

    stageEl.querySelector('#btn-verify-pronunciation').addEventListener('click', () => {
      score++;
      recordGameSuccess(vaultData, currentItem.id);
      currentIdx++;
      renderSayIt();
    });

    stageEl.querySelector('#btn-skip-sayit').addEventListener('click', () => {
      currentIdx++;
      renderSayIt();
    });
  };

  renderSayIt();
}

// ==========================================================================
// 7. GAME: GUESS THE WORD (CLUE DETECTIVE) 🕵️ (10 consecutive secret words)
// ==========================================================================

export function startGuessWordGame(stageEl, vaultData, onComplete = () => {}) {
  const items = getAdaptiveGameItems(vaultData, 10);
  let currentIdx = 0;
  let score = 0;

  const renderDetective = () => {
    if (currentIdx >= items.length) {
      onComplete({
        title: 'Word Detective Master! 🕵️',
        correct: score,
        total: items.length,
        percentage: Math.round((score / items.length) * 100),
        xp: score * 12 + (score === items.length ? 25 : 0),
        coins: score * 2,
        details: `Solved ${score} out of ${items.length} secret word clues!`
      });
      return;
    }

    const currentItem = items[currentIdx];
    const targetWord = currentItem.term.toUpperCase();
    let guessedLetters = new Set();
    let lives = 6;

    const renderStage = () => {
      const isWon = targetWord.split('').every(char => !/[A-Z]/.test(char) || guessedLetters.has(char));
      const isLost = lives <= 0;

      stageEl.innerHTML = `
        ${renderGameHeader('🕵️ Guess the Word', currentIdx + 1, items.length, score)}

        <div class="card text-center" style="padding: 1.5rem; margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="category-pill">Category: ${currentItem.category || 'Word'}</span>
            <span style="color: var(--danger); font-weight: 700;">Lives: ${'❤️'.repeat(lives)}</span>
          </div>
          
          <h4 style="margin: 0.75rem 0 0.5rem; color: var(--text-main); font-size: 1rem;">Clue: ${currentItem.meaning}</h4>

          <div class="scramble-slots" style="display: flex; justify-content: center; gap: 0.4rem; margin: 1.25rem 0; flex-wrap: wrap;">
            ${targetWord.split('').map(char => {
              if (!/[A-Z]/.test(char)) return `<span class="scramble-slot filled">${char}</span>`;
              return `<span class="scramble-slot ${guessedLetters.has(char) ? 'filled' : ''}">${guessedLetters.has(char) ? char : '_'}</span>`;
            }).join('')}
          </div>
        </div>

        <div class="keyboard-grid" style="display: flex; justify-content: center; gap: 0.35rem; flex-wrap: wrap; max-width: 500px; margin: 0 auto 1.25rem;">
          ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => `
            <button class="btn-kb-key" data-key="${l}" ${guessedLetters.has(l) || isWon || isLost ? 'disabled' : ''} style="width: 32px; height: 38px; font-weight: 700;">${l}</button>
          `).join('')}
        </div>

        <div class="text-center">
          <button class="btn btn-secondary" id="btn-skip-hangman" style="opacity: 0.85;">
            <i class="fa-solid fa-forward"></i> דלג לשאלה הבאה (Skip)
          </button>
        </div>
      `;

      if (isWon) {
        score++;
        recordGameSuccess(vaultData, currentItem.id);
        speakText(currentItem.term);
        setTimeout(() => {
          currentIdx++;
          renderDetective();
        }, 1100);
      } else if (isLost) {
        recordGameMistake(vaultData, currentItem.id);
        setTimeout(() => {
          currentIdx++;
          renderDetective();
        }, 1300);
      }

      const skipBtn = stageEl.querySelector('#btn-skip-hangman');
      if (skipBtn) {
        skipBtn.addEventListener('click', () => {
          recordGameMistake(vaultData, currentItem.id);
          currentIdx++;
          renderDetective();
        });
      }

      stageEl.querySelectorAll('.btn-kb-key').forEach(btn => {
        btn.addEventListener('click', () => {
          const letter = btn.getAttribute('data-key');
          guessedLetters.add(letter);
          if (!targetWord.includes(letter)) {
            lives--;
          }
          renderStage();
        });
      });
    };

    renderStage();
  };

  renderDetective();
}

// ==========================================================================
// 8. GAME: ODD ONE OUT 🚫 (10 consecutive questions from 18 items)
// ==========================================================================

export function startOddOneOutGame(stageEl, vaultData, onComplete = () => {}) {
  const allOddSets = [
    { words: ['Chuffed', 'Delighted', 'Ecstatic', 'Knackered'], oddIndex: 3, reason: '"Knackered" means exhausted, while the others mean happy!' },
    { words: ['Gutted', 'Devastated', 'Downcast', 'Gobsmacked'], oddIndex: 3, reason: '"Gobsmacked" means shocked, while the rest mean disappointed.' },
    { words: ['Quid', 'Fiver', 'Tenner', 'Cuppa'], oddIndex: 3, reason: '"Cuppa" is tea, while the others are British currency terms.' },
    { words: ['Lorry', 'Boot', 'Bonnet', 'Tube'], oddIndex: 3, reason: '"Tube" is the subway, while lorry, boot and bonnet are car/truck terms.' },
    { words: ['Splendid', 'Brilliant', 'Marvellous', 'Daft'], oddIndex: 3, reason: '"Daft" means silly, while the others mean wonderful.' },
    { words: ['Flat', 'Cottage', 'Mansion', 'Brolly'], oddIndex: 3, reason: '"Brolly" means umbrella, while the others are types of housing.' },
    { words: ['Nosh', 'Scran', 'Grub', 'Kip'], oddIndex: 3, reason: '"Kip" means sleep, while nosh, scran and grub mean food.' },
    { words: ['Pavement', 'Motorway', 'Roundabout', 'Waistcoat'], oddIndex: 3, reason: '"Waistcoat" is clothing, while the rest are road/traffic terms.' },
    { words: ['Bloke', 'Chap', 'Lad', 'Birdie'], oddIndex: 3, reason: '"Birdie" is a small bird, while bloke, chap and lad mean a man/guy.' },
    { words: ['Kerfuffle', 'Brouhaha', 'Commotion', 'Snooze'], oddIndex: 3, reason: '"Snooze" means a short sleep, while the others mean fuss or commotion.' },
    { words: ['Brolly', 'Mac', 'Wellies', 'Biscuit'], oddIndex: 3, reason: '"Biscuit" is a baked snack, while the others are rain gear.' },
    { words: ['Scone', 'Crumpet', 'Shortbread', 'Loo'], oddIndex: 3, reason: '"Loo" means bathroom, while the rest are British baked goods.' },
    { words: ['Toodle-oo', 'Cheerio', 'Ta-ta', 'Proper'], oddIndex: 3, reason: '"Proper" means correct/real, while the others are goodbyes.' },
    { words: ['Skint', 'Penniless', 'Broke', 'Posh'], oddIndex: 3, reason: '"Posh" means high-class, while the others mean having no money.' },
    { words: ['Aubergine', 'Courgette', 'Coriander', 'Pram'], oddIndex: 3, reason: '"Pram" is a baby stroller, while the others are British food items.' },
    { words: ['Trainers', 'Trousers', 'Jumper', 'Petrol'], oddIndex: 3, reason: '"Petrol" is fuel, while the rest are British clothing items.' },
    { words: ['Windscreen', 'Number plate', 'Steering wheel', 'Queue'], oddIndex: 3, reason: '"Queue" is waiting in line, while the others are car parts.' },
    { words: ['Faffing', 'Dawdling', 'Procrastinating', 'Sprint'], oddIndex: 3, reason: '"Sprint" means running fast, while the others mean wasting time.' }
  ];

  const oddSets = shuffleArray(allOddSets).slice(0, 10);
  let currentIdx = 0;
  let score = 0;

  const renderOddSet = () => {
    if (currentIdx >= oddSets.length) {
      onComplete({
        title: 'Odd One Out Solved! 🚫',
        correct: score,
        total: oddSets.length,
        percentage: Math.round((score / oddSets.length) * 100),
        xp: score * 10 + (score === oddSets.length ? 25 : 0),
        coins: score * 2,
        details: `Identified ${score} out of ${oddSets.length} semantic mismatches!`
      });
      return;
    }

    const currentSet = oddSets[currentIdx];

    stageEl.innerHTML = `
      ${renderGameHeader('🚫 Odd One Out', currentIdx + 1, oddSets.length, score)}

      <div class="card text-center" style="padding: 1.5rem; margin-bottom: 1.25rem;">
        <span class="category-pill">Semantic Odd One Out</span>
        <h3 style="margin: 0.75rem 0 0.25rem; font-size: 1.3rem;">Which word does NOT belong?</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Find the word that has a different category or meaning.</p>
      </div>

      <div class="practice-options-grid">
        ${currentSet.words.map((w, i) => `
          <button class="practice-opt-btn odd-opt-btn" data-idx="${i}">
            <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
            <span class="opt-text">${w}</span>
          </button>
        `).join('')}
      </div>

      <div id="odd-reason-box" style="display: none; margin-top: 1.25rem;" class="card">
        <p id="odd-reason-text" style="font-weight: 600; font-size: 0.95rem;"></p>
      </div>
    `;

    stageEl.querySelectorAll('.odd-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const clickedIdx = parseInt(btn.getAttribute('data-idx'));
        const isCorrect = clickedIdx === currentSet.oddIndex;
        stageEl.querySelectorAll('.odd-opt-btn').forEach(b => b.disabled = true);

        const reasonBox = stageEl.querySelector('#odd-reason-box');
        const reasonText = stageEl.querySelector('#odd-reason-text');
        reasonBox.style.display = 'block';

        if (isCorrect) {
          btn.classList.add('correct-answer');
          score++;
          reasonText.innerHTML = `<span style="color: var(--success);">✓ Correct! ${currentSet.reason}</span>`;
        } else {
          btn.classList.add('wrong-selected');
          reasonText.innerHTML = `<span style="color: var(--danger);">✗ Incorrect. ${currentSet.reason}</span>`;
        }

        setTimeout(() => {
          currentIdx++;
          renderOddSet();
        }, 1500);
      });
    });
  };

  renderOddSet();
}

// ==========================================================================
// 9. GAME: BUILD THE SENTENCE 💬 (10 consecutive sentence assemblies)
// ==========================================================================

export function startBuildSentenceGame(stageEl, vaultData, onComplete = () => {}) {
  const allSentences = [
    { target: 'He always drinks Earl Grey tea in the morning.', words: ['He', 'always', 'drinks', 'Earl Grey', 'tea', 'in the', 'morning.'] },
    { target: 'I was absolutely chuffed with my exam results.', words: ['I', 'was', 'absolutely', 'chuffed', 'with my', 'exam', 'results.'] },
    { target: 'Would you mind passing the marmalade please?', words: ['Would', 'you mind', 'passing', 'the', 'marmalade', 'please?'] },
    { target: 'Despite the heavy rain we arrived on time.', words: ['Despite', 'the heavy', 'rain', 'we arrived', 'on time.'] },
    { target: 'She has been living in London for three years.', words: ['She', 'has been', 'living in', 'London', 'for three', 'years.'] },
    { target: 'If I were you I would take the train.', words: ['If', 'I were', 'you I', 'would take', 'the', 'train.'] },
    { target: 'Do you fancy grabbing a bite to eat?', words: ['Do', 'you fancy', 'grabbing', 'a bite', 'to', 'eat?'] },
    { target: 'We took a ride on the famous red bus.', words: ['We', 'took a', 'ride on', 'the famous', 'red', 'bus.'] },
    { target: 'It is raining cats and dogs outside right now.', words: ['It is', 'raining', 'cats and', 'dogs', 'outside', 'right now.'] },
    { target: 'I am really looking forward to visiting the museum.', words: ['I am', 'really', 'looking forward', 'to visiting', 'the', 'museum.'] },
    { target: 'Mind the gap between the train and platform.', words: ['Mind', 'the gap', 'between', 'the train', 'and', 'platform.'] },
    { target: 'They decided to bite the bullet and apologize.', words: ['They', 'decided to', 'bite the', 'bullet', 'and', 'apologize.'] },
    { target: 'Could you please give me a quick ring tomorrow?', words: ['Could', 'you please', 'give me', 'a quick', 'ring', 'tomorrow?'] },
    { target: 'That old cottage in the village looks charming.', words: ['That', 'old cottage', 'in the', 'village', 'looks', 'charming.'] }
  ];

  const sentences = shuffleArray(allSentences).slice(0, 10);
  let currentIdx = 0;
  let score = 0;

  const renderSentenceBuilder = () => {
    if (currentIdx >= sentences.length) {
      onComplete({
        title: 'Syntax Master! 💬',
        correct: score,
        total: sentences.length,
        percentage: Math.round((score / sentences.length) * 100),
        xp: score * 10 + (score === sentences.length ? 25 : 0),
        coins: score * 2,
        details: `Assembled ${score} out of ${sentences.length} English sentences correctly!`
      });
      return;
    }

    const currentSentence = sentences[currentIdx];
    const shuffledWords = shuffleArray(currentSentence.words);
    let selectedWords = [];

    stageEl.innerHTML = `
      ${renderGameHeader('💬 Build the Sentence', currentIdx + 1, sentences.length, score)}

      <div class="card text-center" style="padding: 1.5rem; margin-bottom: 1.25rem;">
        <span class="category-pill">Syntax Builder</span>
        <h4 style="margin-top: 0.75rem; font-size: 1.05rem;">Tap word blocks in order to build the sentence:</h4>

        <div class="sentence-build-slot" id="build-slot" style="min-height: 56px; border: 2px dashed var(--border-color); border-radius: 12px; padding: 0.75rem; margin: 1rem 0; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; justify-content: center;">
          <span style="color: var(--text-muted); font-size: 0.85rem;" id="slot-placeholder">Tap words below...</span>
        </div>
      </div>

      <div class="word-blocks-flex" id="word-blocks" style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.25rem;">
        ${shuffledWords.map((word, idx) => `
          <button class="word-tile-btn" data-word="${word}" data-idx="${idx}">${word}</button>
        `).join('')}
      </div>

      <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
        <button class="btn btn-secondary" id="btn-reset-sentence"><i class="fa-solid fa-rotate-left"></i> איפוס (Reset)</button>
        <button class="btn btn-primary" id="btn-check-sentence"><i class="fa-solid fa-circle-check"></i> בדיקה (Check)</button>
        <button class="btn btn-secondary" id="btn-skip-sentence" style="opacity: 0.85;"><i class="fa-solid fa-forward"></i> דלג (Skip)</button>
      </div>
    `;

    const buildSlot = stageEl.querySelector('#build-slot');
    const slotPlaceholder = stageEl.querySelector('#slot-placeholder');

    const renderSlot = () => {
      if (selectedWords.length === 0) {
        slotPlaceholder.style.display = 'inline';
        buildSlot.querySelectorAll('.word-tile-btn').forEach(el => el.remove());
      } else {
        slotPlaceholder.style.display = 'none';
        buildSlot.innerHTML = '';
        selectedWords.forEach(w => {
          const span = document.createElement('span');
          span.className = 'word-tile-btn in-slot';
          span.innerText = w.word;
          buildSlot.appendChild(span);
        });
      }
    };

    stageEl.querySelectorAll('.word-tile-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        btn.disabled = true;
        btn.classList.add('used');
        selectedWords.push({ word: btn.getAttribute('data-word'), btnEl: btn });
        renderSlot();
      });
    });

    stageEl.querySelector('#btn-reset-sentence').addEventListener('click', () => {
      selectedWords.forEach(item => {
        item.btnEl.disabled = false;
        item.btnEl.classList.remove('used');
      });
      selectedWords = [];
      renderSlot();
    });

    stageEl.querySelector('#btn-skip-sentence').addEventListener('click', () => {
      currentIdx++;
      renderSentenceBuilder();
    });

    stageEl.querySelector('#btn-check-sentence').addEventListener('click', () => {
      const userConstructed = selectedWords.map(w => w.word).join(' ');
      if (userConstructed === currentSentence.target) {
        score++;
        buildSlot.style.borderColor = 'var(--success)';
        speakText(currentSentence.target);
        setTimeout(() => {
          currentIdx++;
          renderSentenceBuilder();
        }, 1200);
      } else {
        buildSlot.classList.add('shake');
        setTimeout(() => buildSlot.classList.remove('shake'), 600);
      }
    });
  };

  renderSentenceBuilder();
}

// ==========================================================================
// 10. GAME: ENGLISH QUIZ 🏆 (10 consecutive mixed questions)
// ==========================================================================

export function startEnglishQuizGame(stageEl, vaultData, onComplete = () => {}) {
  const dynamicItems = makeDynamicMC(vaultData, 'term', 'meaning', 10);
  runChoiceGame(stageEl, dynamicItems, '🏆 English Quiz', 'Choose the correct answer for each question:', onComplete);
}

// ==========================================================================
// 11. GAME: SYNONYM HUNT 🧠 (10 consecutive dynamic questions)
// ==========================================================================

export function startSynonymHuntGame(stageEl, vaultData, onComplete = () => {}) {
  const dataset = makeDynamicMC(vaultData, 'term', 'meaning', 10);
  runChoiceGame(stageEl, dataset, '🧠 Synonym Hunt', 'Select the word or meaning that matches best:', onComplete);
}

// ==========================================================================
// 12. GAME: ANTONYM ATTACK ⚔️ (10 consecutive questions from 18 items)
// ==========================================================================

export function startAntonymAttackGame(stageEl, vaultData, onComplete = () => {}) {
  const allAntonyms = [
    { word: 'Ancient', target: 'Modern', choices: ['Modern', 'Old', 'Historic', 'Traditional'] },
    { word: 'Gutted', target: 'Delighted', choices: ['Delighted', 'Saddened', 'Disappointed', 'Hurt'] },
    { word: 'Generous', target: 'Stingy', choices: ['Stingy', 'Kind', 'Friendly', 'Rich'] },
    { word: 'Formal', target: 'Casual', choices: ['Casual', 'Official', 'Polite', 'Serious'] },
    { word: 'Conceal', target: 'Reveal', choices: ['Reveal', 'Hide', 'Mask', 'Cover'] },
    { word: 'Arrogant', target: 'Humble', choices: ['Humble', 'Proud', 'Loud', 'Fierce'] },
    { word: 'Abundant', target: 'Scarce', choices: ['Scarce', 'Plentiful', 'Vast', 'Rich'] },
    { word: 'Posh', target: 'Common', choices: ['Common', 'Luxurious', 'Fancy', 'Grand'] },
    { word: 'Chuffed', target: 'Disappointed', choices: ['Disappointed', 'Thrilled', 'Happy', 'Joyful'] },
    { word: 'Knackered', target: 'Energized', choices: ['Energized', 'Tired', 'Sleepy', 'Exhausted'] },
    { word: 'Artificial', target: 'Natural', choices: ['Natural', 'Fake', 'Synthetic', 'Plastic'] },
    { word: 'Expand', target: 'Shrink', choices: ['Shrink', 'Grow', 'Enlarge', 'Widen'] },
    { word: 'Permit', target: 'Forbid', choices: ['Forbid', 'Allow', 'Grant', 'Accept'] },
    { word: 'Courageous', target: 'Cowardly', choices: ['Cowardly', 'Brave', 'Bold', 'Valiant'] },
    { word: 'Damp', target: 'Dry', choices: ['Dry', 'Wet', 'Moist', 'Soaked'] },
    { word: 'Lenient', target: 'Strict', choices: ['Strict', 'Kind', 'Easy', 'Soft'] }
  ];

  const dataset = shuffleArray(allAntonyms).slice(0, 10);
  runChoiceGame(stageEl, dataset, '⚔️ Antonym Attack', 'Select the word with the OPPOSITE meaning:', onComplete);
}

// ==========================================================================
// 13. GAME: DEFINITION DUEL 📖 (10 consecutive definition matches)
// ==========================================================================

export function startDefinitionDuelGame(stageEl, vaultData, onComplete = () => {}) {
  const dataset = makeDynamicMC(vaultData, 'meaning', 'term', 10);
  runChoiceGame(stageEl, dataset, '📖 Definition Duel', 'Which English word or phrase matches this definition?', onComplete);
}

// ==========================================================================
// 14. GAME: WORD LADDER 🪜 (10 consecutive word ladder steps)
// ==========================================================================

export function startWordLadderGame(stageEl, vaultData, onComplete = () => {}) {
  const allSteps = [
    { from: 'COLD', to: 'WARM', options: ['CORD', 'CARD', 'WARD', 'WARM'], correct: 'CORD' },
    { from: 'CAT', to: 'DOG', options: ['COT', 'BAT', 'RAT', 'HAT'], correct: 'COT' },
    { from: 'BOOK', to: 'LOOK', options: ['COOK', 'BOOT', 'BARK', 'BACK'], correct: 'COOK' },
    { from: 'HEAD', to: 'HEAL', options: ['HEAL', 'HERD', 'HEAT', 'HEAR'], correct: 'HEAT' },
    { from: 'FAST', to: 'LAST', options: ['PAST', 'FIST', 'FACT', 'FATE'], correct: 'PAST' },
    { from: 'RAIN', to: 'GAIN', options: ['PAIN', 'MAIN', 'SAIL', 'RAIL'], correct: 'PAIN' },
    { from: 'SHIP', to: 'SHOP', options: ['SHOP', 'SLIP', 'SKIP', 'CHIP'], correct: 'SHOP' },
    { from: 'LIME', to: 'TIME', options: ['TIME', 'LIKE', 'LIFE', 'LIMP'], correct: 'TIME' },
    { from: 'SAND', to: 'SEND', options: ['SEND', 'LAND', 'BAND', 'HAND'], correct: 'SEND' },
    { from: 'FIRE', to: 'FINE', options: ['FINE', 'FORE', 'FILE', 'FARE'], correct: 'FINE' },
    { from: 'DARK', to: 'DART', options: ['DART', 'PARK', 'BARK', 'MARK'], correct: 'DART' },
    { from: 'GOLD', to: 'HOLD', options: ['HOLD', 'BOLD', 'COLD', 'FOLD'], correct: 'HOLD' }
  ];

  const steps = shuffleArray(allSteps).slice(0, 10);
  let currentIdx = 0;
  let score = 0;

  const render = () => {
    if (currentIdx >= steps.length) {
      onComplete({
        title: 'Word Ladder Completed! 🪜',
        correct: score,
        total: steps.length,
        percentage: Math.round((score / steps.length) * 100),
        xp: score * 10 + (score === steps.length ? 25 : 0),
        coins: score * 2,
        details: `Climbed the word ladder with ${score} out of ${steps.length} correct moves!`
      });
      return;
    }

    const step = steps[currentIdx];
    stageEl.innerHTML = `
      ${renderGameHeader('🪜 Word Ladder', currentIdx + 1, steps.length, score)}

      <div class="card text-center" style="padding: 1.5rem;">
        <span class="category-pill">Word Ladder</span>
        <h4 style="margin: 0.75rem 0;">Change 1 letter: <strong>${step.from} ➔ ??? ➔ ${step.to}</strong></h4>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.25rem;">Pick the word that logically connects the step:</p>
        
        <div class="practice-options-grid">
          ${shuffleArray(step.options).map(opt => `
            <button class="btn btn-secondary ladder-opt-btn" data-word="${opt}">${opt}</button>
          `).join('')}
        </div>
      </div>
    `;

    stageEl.querySelectorAll('.ladder-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = btn.getAttribute('data-word');
        stageEl.querySelectorAll('.ladder-opt-btn').forEach(b => b.disabled = true);

        if (chosen === step.correct) {
          btn.classList.add('correct-answer');
          score++;
          speakText(chosen);
        } else {
          btn.classList.add('wrong-selected');
        }
        setTimeout(() => { currentIdx++; render(); }, 1000);
      });
    });
  };
  render();
}

// ==========================================================================
// 15. GAME: MISSING LETTER 🔤 (10 consecutive word puzzles)
// ==========================================================================

export function startMissingLetterGame(stageEl, vaultData, onComplete = () => {}) {
  const items = shuffleArray(getAllVaultItems(vaultData)).slice(0, 10);
  let currentIdx = 0;
  let score = 0;

  const render = () => {
    if (currentIdx >= items.length) {
      onComplete({
        title: 'Missing Letter Cleared! 🔤',
        correct: score,
        total: items.length,
        percentage: Math.round((score / items.length) * 100),
        xp: score * 10 + (score === items.length ? 25 : 0),
        coins: score * 2,
        details: `Identified ${score} out of ${items.length} missing letters accurately!`
      });
      return;
    }

    const item = items[currentIdx];
    const wordStr = item.term.toUpperCase().replace(/[^A-Z]/g, '');
    const midIdx = Math.floor(wordStr.length / 2);
    const targetChar = wordStr[midIdx] || 'A';
    const displayStr = wordStr.substring(0, midIdx) + ' _ ' + wordStr.substring(midIdx + 1);

    const alphabet = shuffleArray(['A', 'E', 'I', 'O', 'U', 'B', 'C', 'D', 'K', 'M', 'R', 'S', 'T', 'L']).filter(c => c !== targetChar).slice(0, 4);
    const shuffledLetters = shuffleArray([targetChar, ...alphabet]);

    stageEl.innerHTML = `
      ${renderGameHeader('🔤 Missing Letter', currentIdx + 1, items.length, score)}

      <div class="card text-center" style="padding: 1.5rem;">
        <span class="category-pill">Spelling Detective</span>
        <h3 style="font-size: 2.2rem; letter-spacing: 0.15em; margin: 1.25rem 0; font-family: monospace;">${displayStr}</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.25rem;">Meaning: ${item.meaning}</p>

        <div style="display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap;">
          ${shuffledLetters.map(l => `
            <button class="scramble-tile-btn letter-tile-btn" data-letter="${l}" style="min-width: 44px; height: 46px; font-size: 1.25rem; font-weight: 700;">${l}</button>
          `).join('')}
        </div>
      </div>
    `;

    stageEl.querySelectorAll('.letter-tile-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const l = btn.getAttribute('data-letter');
        stageEl.querySelectorAll('.letter-tile-btn').forEach(b => b.disabled = true);

        if (l === targetChar) {
          btn.style.backgroundColor = 'var(--success)';
          btn.style.color = '#fff';
          score++;
          speakText(item.term);
        } else {
          btn.style.backgroundColor = 'var(--danger)';
          btn.style.color = '#fff';
        }
        setTimeout(() => { currentIdx++; render(); }, 1000);
      });
    });
  };
  render();
}

// ==========================================================================
// 16. GAME: SPELL RACE 🏁 (10 consecutive spelling questions)
// ==========================================================================

export function startSpellRaceGame(stageEl, vaultData, onComplete = () => {}) {
  const items = shuffleArray(getAllVaultItems(vaultData)).slice(0, 10);
  let currentIdx = 0;
  let score = 0;

  const render = () => {
    if (currentIdx >= items.length) {
      onComplete({
        title: 'Spell Race Winner! 🏁',
        correct: score,
        total: items.length,
        percentage: Math.round((score / items.length) * 100),
        xp: score * 10 + (score === items.length ? 25 : 0),
        coins: score * 2,
        details: `Spelled ${score} out of ${items.length} UK words correctly!`
      });
      return;
    }

    const item = items[currentIdx];
    const word = item.term.trim();

    stageEl.innerHTML = `
      ${renderGameHeader('🏁 Spell Race', currentIdx + 1, items.length, score)}

      <div class="card text-center" style="padding: 1.5rem;">
        <span class="category-pill">Listening & Spelling</span>
        <h4 style="margin-top: 0.75rem;">Listen to the UK pronunciation and type the spelling:</h4>
        
        <button class="btn btn-primary" id="btn-listen-spell" style="margin: 1.25rem 0; padding: 0.85rem 1.5rem;">
          <i class="fa-solid fa-volume-high"></i> השמע מילה (Play Sound 🎧)
        </button>

        <div style="max-width: 320px; margin: 0 auto 1.25rem auto;">
          <input type="text" id="spell-input" class="form-control text-center" placeholder="Type word here..." autocomplete="off" autofocus>
        </div>

        <div style="display: flex; justify-content: center; gap: 0.75rem;">
          <button class="btn btn-primary" id="btn-submit-spell"><i class="fa-solid fa-paper-plane"></i> שלח (Submit)</button>
          <button class="btn btn-secondary" id="btn-skip-spell"><i class="fa-solid fa-forward"></i> דלג (Skip)</button>
        </div>
      </div>
    `;

    speakText(word);
    stageEl.querySelector('#btn-listen-spell').addEventListener('click', () => speakText(word));
    
    const checkAnswer = () => {
      const val = stageEl.querySelector('#spell-input').value.trim().toLowerCase();
      const inputEl = stageEl.querySelector('#spell-input');
      if (val === word.toLowerCase()) {
        score++;
        inputEl.style.borderColor = 'var(--success)';
        inputEl.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
      } else {
        inputEl.style.borderColor = 'var(--danger)';
        inputEl.value = `${val} ➔ Correct: ${word}`;
      }
      setTimeout(() => { currentIdx++; render(); }, 1200);
    };

    stageEl.querySelector('#btn-submit-spell').addEventListener('click', checkAnswer);
    stageEl.querySelector('#btn-skip-spell').addEventListener('click', () => {
      currentIdx++;
      render();
    });
    stageEl.querySelector('#spell-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') checkAnswer();
    });
  };
  render();
}

// ==========================================================================
// 17. GAME: SENTENCE DETECTIVE 🕵️ (10 consecutive sentence error detections)
// ==========================================================================

export function startSentenceDetectiveGame(stageEl, vaultData, onComplete = () => {}) {
  const allDataset = [
    { sentence: 'She don\'t like drinking tea in the morning.', error: 'don\'t', correct: 'doesn\'t' },
    { sentence: 'They has lived in London for five years.', error: 'has', correct: 'have' },
    { sentence: 'I am looking forward to meet you tomorrow.', error: 'meet', correct: 'meeting' },
    { sentence: 'He went to London and buy a new coat.', error: 'buy', correct: 'bought' },
    { sentence: 'Despite of the rain we had a lovely picnic.', error: 'of', correct: '(remove "of")' },
    { sentence: 'There is many people waiting at the bus stop.', error: 'is', correct: 'are' },
    { sentence: 'She is more taller than her brother.', error: 'more', correct: '(remove "more")' },
    { sentence: 'He didn\'t saw the speed limit sign.', error: 'saw', correct: 'see' },
    { sentence: 'Neither of the boys were at school yesterday.', error: 'were', correct: 'was' },
    { sentence: 'Could you give me an advice about the trip?', error: 'an', correct: 'some' },
    { sentence: 'I have been knowing him for ten years.', error: 'knowing', correct: 'known' },
    { sentence: 'We was very tired after walking all day.', error: 'was', correct: 'were' },
    { sentence: 'He suggested to go to the British Museum.', error: 'to go', correct: 'going' }
  ];

  const dataset = shuffleArray(allDataset).slice(0, 10);
  let currentIdx = 0;
  let score = 0;

  const render = () => {
    if (currentIdx >= dataset.length) {
      onComplete({
        title: 'Sentence Detective Solved! 🕵️',
        correct: score,
        total: dataset.length,
        percentage: Math.round((score / dataset.length) * 100),
        xp: score * 10 + (score === dataset.length ? 25 : 0),
        coins: score * 2,
        details: `Identified ${score} out of ${dataset.length} grammatical errors accurately!`
      });
      return;
    }

    const item = dataset[currentIdx];
    const words = item.sentence.split(' ');

    stageEl.innerHTML = `
      ${renderGameHeader('🕵️ Sentence Detective', currentIdx + 1, dataset.length, score)}

      <div class="card text-center" style="padding: 1.5rem;">
        <span class="category-pill">Sentence Detective</span>
        <h4 style="margin: 0.75rem 0;">Tap the word block containing the grammatical error:</h4>
        
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin: 1.25rem 0;">
          ${words.map(w => `
            <button class="word-tile-btn word-detect-btn" data-word="${w}">${w}</button>
          `).join('')}
        </div>
      </div>
    `;

    stageEl.querySelectorAll('.word-detect-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        stageEl.querySelectorAll('.word-detect-btn').forEach(b => b.disabled = true);
        const wordText = btn.getAttribute('data-word').replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
        const targetClean = item.error.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");

        if (wordText.toLowerCase() === targetClean.toLowerCase()) {
          btn.style.backgroundColor = 'var(--success)';
          btn.style.color = '#fff';
          score++;
        } else {
          btn.style.backgroundColor = 'var(--danger)';
          btn.style.color = '#fff';
        }
        setTimeout(() => { currentIdx++; render(); }, 1100);
      });
    });
  };
  render();
}

// ==========================================================================
// 18. GAME: GRAMMAR BATTLE ⚔️ (10 consecutive questions from 16 items)
// ==========================================================================

export function startGrammarBattleGame(stageEl, vaultData, onComplete = () => {}) {
  const allBattles = [
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'If I were you, I would accept the job offer.',
      choices: [
        'If I were you, I would accept the job offer.',
        'If I was you, I would accept the job offer.',
        'If I am you, I will accepted the job offer.',
        'If I be you, I would accept job offer.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'She has been working here since 2020.',
      choices: [
        'She has been working here since 2020.',
        'She has been working here for 2020.',
        'She is working here since 2020.',
        'She works here for since 2020.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'Hardly had he arrived when the bell rang.',
      choices: [
        'Hardly had he arrived when the bell rang.',
        'Hardly he arrived than the bell rang.',
        'Hardly did he arrived when the bell rang.',
        'Hardly he had arrived then the bell rang.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'Neither the manager nor the employees were present.',
      choices: [
        'Neither the manager nor the employees were present.',
        'Neither the manager nor the employees was present.',
        'Neither the manager or the employees was present.',
        'Neither the manager nor the employees is present.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'I look forward to meeting you next week.',
      choices: [
        'I look forward to meeting you next week.',
        'I look forward to meet you next week.',
        'I am looking forward to meet you next week.',
        'I look forward meet you next week.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'She suggested that he take a taxi to the airport.',
      choices: [
        'She suggested that he take a taxi to the airport.',
        'She suggested him to take a taxi to airport.',
        'She suggested that he takes a taxi to airport.',
        'She suggested him taking a taxi airport.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'By the time we arrived, the play had already begun.',
      choices: [
        'By the time we arrived, the play had already begun.',
        'By the time we arrived, the play already began.',
        'By the time we arrived, the play has already begun.',
        'By the time we arrived, the play was already begun.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'Not only is she intelligent, but she is also very kind.',
      choices: [
        'Not only is she intelligent, but she is also very kind.',
        'Not only she is intelligent, but she is also very kind.',
        'Not only is she intelligent, but also she very kind.',
        'Not only she is intelligent, and also very kind.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'I would rather you didn\'t smoke in here.',
      choices: [
        'I would rather you didn\'t smoke in here.',
        'I would rather you don\'t smoke in here.',
        'I would rather you not smoke in here.',
        'I would rather you haven\'t smoked in here.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'The team consists of eleven talented players.',
      choices: [
        'The team consists of eleven talented players.',
        'The team is comprised with eleven talented players.',
        'The team consists from eleven talented players.',
        'The team is consisting of eleven talented players.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'The luggage was safely delivered to the hotel.',
      choices: [
        'The luggage was safely delivered to the hotel.',
        'The luggages were safely delivered to hotel.',
        'The luggage were safely delivered to hotel.',
        'The pieces of luggages was delivered.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'He is accustomed to waking up early.',
      choices: [
        'He is accustomed to waking up early.',
        'He is accustomed to wake up early.',
        'He is accustom to wake up early.',
        'He has accustomed to waking early.'
      ]
    }
  ];

  const dataset = shuffleArray(allBattles).slice(0, 10);
  runChoiceGame(stageEl, dataset, '⚔️ Grammar Battle', 'Choose the sentence that is grammatically flawless:', onComplete);
}

// ==========================================================================
// 19. GAME: TENSE CHALLENGE ⏳ (10 consecutive verb tense questions)
// ==========================================================================

export function startTenseChallengeGame(stageEl, vaultData, onComplete = () => {}) {
  const allTenses = [
    { word: 'By the time we arrived at the station, the train ________.', target: 'had already left', choices: ['had already left', 'already left', 'has left', 'was leaving'] },
    { word: 'I ________ in London since 2018.', target: 'have lived', choices: ['have lived', 'lived', 'am living', 'was lived'] },
    { word: 'While she ________ tea, the doorbell rang.', target: 'was drinking', choices: ['was drinking', 'drank', 'is drinking', 'had drunk'] },
    { word: 'This time tomorrow, we ________ over the Atlantic.', target: 'will be flying', choices: ['will be flying', 'fly', 'are flying', 'will fly'] },
    { word: 'If he ________ harder, he would have passed the exam.', target: 'had studied', choices: ['had studied', 'studied', 'would study', 'has studied'] },
    { word: 'They ________ each other for more than twenty years.', target: 'have known', choices: ['have known', 'are knowing', 'know', 'were knowing'] },
    { word: 'Look at those dark clouds! It ________ to rain.', target: 'is going', choices: ['is going', 'will', 'is about', 'goes'] },
    { word: 'He usually ________ by train, but today he took a cab.', target: 'travels', choices: ['travels', 'is travelling', 'has travelled', 'travelled'] },
    { word: 'By next year, she ________ her master\'s degree.', target: 'will have completed', choices: ['will have completed', 'completes', 'will complete', 'has completed'] },
    { word: 'I ________ my keys! Could you help me look for them?', target: 'have lost', choices: ['have lost', 'lost', 'was losing', 'am losing'] },
    { word: 'When the telephone rang, I ________ a bath.', target: 'was having', choices: ['was having', 'had', 'have had', 'have'] },
    { word: 'She ________ in Manchester before moving to London.', target: 'had lived', choices: ['had lived', 'has lived', 'lives', 'is living'] }
  ];

  const dataset = shuffleArray(allTenses).slice(0, 10);
  runChoiceGame(stageEl, dataset, '⏳ Tense Challenge', 'Complete the sentence with the correct verb tense:', onComplete);
}

// ==========================================================================
// 20. GAME: PREPOSITION MASTER 🎯 (10 consecutive preposition questions)
// ==========================================================================

export function startPrepositionMasterGame(stageEl, vaultData, onComplete = () => {}) {
  const allPrepositions = [
    { word: 'She is remarkably good _____ playing the piano.', target: 'at', choices: ['at', 'in', 'on', 'with'] },
    { word: 'We arrived _____ London Heathrow Airport at midnight.', target: 'at', choices: ['at', 'in', 'to', 'on'] },
    { word: 'Are you interested _____ learning British slang?', target: 'in', choices: ['in', 'on', 'for', 'about'] },
    { word: 'He apologized _____ being late to the meeting.', target: 'for', choices: ['for', 'about', 'to', 'of'] },
    { word: 'The book is based _____ a true Victorian story.', target: 'on', choices: ['on', 'in', 'at', 'with'] },
    { word: 'They congratulated him _____ winning the scholarship.', target: 'on', choices: ['on', 'for', 'in', 'at'] },
    { word: 'She succeeded _____ passing her driving test on the first try.', target: 'in', choices: ['in', 'at', 'on', 'with'] },
    { word: 'I was astonished _____ how beautiful the Cotswolds were.', target: 'at', choices: ['at', 'with', 'from', 'for'] },
    { word: 'He insists _____ paying for everyone\'s dinner.', target: 'on', choices: ['on', 'in', 'for', 'to'] },
    { word: 'This bespoke coat was made _____ hand.', target: 'by', choices: ['by', 'with', 'in', 'from'] },
    { word: 'We are looking forward _____ seeing you in London.', target: 'to', choices: ['to', 'at', 'for', 'with'] },
    { word: 'Are you familiar _____ British afternoon tea etiquette?', target: 'with', choices: ['with', 'to', 'of', 'in'] }
  ];

  const dataset = shuffleArray(allPrepositions).slice(0, 10);
  runChoiceGame(stageEl, dataset, '🎯 Preposition Master', 'Choose the correct preposition:', onComplete);
}

// ==========================================================================
// 21. GAME: ARTICLE CHALLENGE 📝 (10 consecutive article questions)
// ==========================================================================

export function startArticleChallengeGame(stageEl, vaultData, onComplete = () => {}) {
  const allArticles = [
    { word: 'Honesty is _____ best policy.', target: 'the', choices: ['the', 'a', 'an', 'Ø (No article)'] },
    { word: 'He is studying to become _____ architect.', target: 'an', choices: ['an', 'a', 'the', 'Ø (No article)'] },
    { word: 'I love drinking _____ hot tea in the afternoon.', target: 'Ø (No article)', choices: ['Ø (No article)', 'a', 'an', 'the'] },
    { word: 'We sailed across _____ Atlantic Ocean.', target: 'the', choices: ['the', 'a', 'an', 'Ø (No article)'] },
    { word: 'She plays _____ violin with great passion.', target: 'the', choices: ['the', 'a', 'an', 'Ø (No article)'] },
    { word: 'They went to _____ Lake District for the weekend.', target: 'the', choices: ['the', 'a', 'an', 'Ø (No article)'] },
    { word: 'It was such _____ wonderful surprise!', target: 'a', choices: ['a', 'an', 'the', 'Ø (No article)'] },
    { word: 'He has lived in _____ United Kingdom for a decade.', target: 'the', choices: ['the', 'a', 'an', 'Ø (No article)'] },
    { word: 'She goes to _____ work by train every morning.', target: 'Ø (No article)', choices: ['Ø (No article)', 'the', 'a', 'an'] },
    { word: 'Can you give me _____ honest opinion?', target: 'an', choices: ['an', 'a', 'the', 'Ø (No article)'] },
    { word: '_____ Thames flows right through central London.', target: 'The', choices: ['The', 'A', 'An', 'Ø (No article)'] },
    { word: 'We usually have _____ breakfast at 8:00 AM.', target: 'Ø (No article)', choices: ['Ø (No article)', 'the', 'a', 'an'] }
  ];

  const dataset = shuffleArray(allArticles).slice(0, 10);
  runChoiceGame(stageEl, dataset, '📝 Article Challenge', 'Choose the correct article:', onComplete);
}

// ==========================================================================
// 22. GAME: NATURAL ENGLISH 🌍 (10 consecutive British phrasing questions)
// ==========================================================================

export function startNaturalEnglishGame(stageEl, vaultData, onComplete = () => {}) {
  const allNatural = [
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'I am going to make a quick phone call.',
      choices: [
        'I am going to make a quick phone call.',
        'I am going to do a quick phone call.',
        'I am going to perform a phone call.',
        'I am making phone call quickly.'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'Could you do me a quick favour?',
      choices: [
        'Could you do me a quick favour?',
        'Could you make me a quick favour?',
        'Could you create me a favour?',
        'Could you render me a favour?'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'I need to make a decision by Friday.',
      choices: [
        'I need to make a decision by Friday.',
        'I need to take a decision by Friday.',
        'I need to do a decision by Friday.',
        'I need to create a decision by Friday.'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'Have a safe journey home!',
      choices: [
        'Have a safe journey home!',
        'Make a good trip home!',
        'Do a nice traveling home!',
        'Spend a safe moving home!'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'I had a cup of tea and a biscuit.',
      choices: [
        'I had a cup of tea and a biscuit.',
        'I drank a tea cup and one cookie.',
        'I took tea liquid with dry cracker.',
        'I consumed a hot beverage tea.'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'Would you mind giving me a hand with this box?',
      choices: [
        'Would you mind giving me a hand with this box?',
        'Would you mind lending your body to this box?',
        'Do you care to donate hand for this box?',
        'Can you make me a hand with box?'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'I completely lost track of time.',
      choices: [
        'I completely lost track of time.',
        'I dropped the time line completely.',
        'My time memory was totally missed.',
        'I forgot where the watch was.'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'Let us call it a day and go home.',
      choices: [
        'Let us call it a day and go home.',
        'Let us name today finished and leave.',
        'We should stop working for day.',
        'Let us close the day duration.'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'It goes without saying that you are welcome.',
      choices: [
        'It goes without saying that you are welcome.',
        'It walks without talking that you are welcome.',
        'Without speaking words you are welcomed.',
        'Naturally speaking without mouth.'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'He made a very good point during the debate.',
      choices: [
        'He made a very good point during the debate.',
        'He did a very good point in discussion.',
        'He performed a sharp dot in conversation.',
        'He constructed a good point.'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'It takes my breath away every single time.',
      choices: [
        'It takes my breath away every single time.',
        'It steals my breathing every time.',
        'It stops my lung respiration always.',
        'It takes out my air.'
      ]
    }
  ];

  const dataset = shuffleArray(allNatural).slice(0, 10);
  runChoiceGame(stageEl, dataset, '🌍 Natural English', 'Select the expression that sounds most natural:', onComplete);
}

// ==========================================================================
// 23. GAME: FORMAL OR CASUAL? 🎩 (10 consecutive phrase classifications)
// ==========================================================================

export function startFormalCasualGame(stageEl, vaultData, onComplete = () => {}) {
  const allPhrases = [
    { phrase: 'I look forward to hearing from you at your earliest convenience.', correct: 'Formal' },
    { phrase: 'Catch you later! Cheers!', correct: 'Casual' },
    { phrase: 'Please accept my sincere apologies for the delay.', correct: 'Formal' },
    { phrase: 'No worries at all, mate!', correct: 'Casual' },
    { phrase: 'With reference to our telephone conversation earlier today...', correct: 'Formal' },
    { phrase: 'Fancy grabbing a quick pint tonight?', correct: 'Casual' },
    { phrase: 'Should you require any further assistance, do not hesitate to contact me.', correct: 'Formal' },
    { phrase: 'I\'m totally knackered after work!', correct: 'Casual' },
    { phrase: 'I am writing to express my dissatisfaction with the service.', correct: 'Formal' },
    { phrase: 'What are you up to this weekend?', correct: 'Casual' },
    { phrase: 'We would be grateful if you could confirm your attendance.', correct: 'Formal' },
    { phrase: 'See ya! Take care!', correct: 'Casual' },
    { phrase: 'In accordance with our prior agreement...', correct: 'Formal' },
    { phrase: 'That film was absolute rubbish!', correct: 'Casual' },
    { phrase: 'Yours faithfully, Mr. H. Smith', correct: 'Formal' }
  ];

  const dataset = shuffleArray(allPhrases).slice(0, 10);
  let currentIdx = 0;
  let score = 0;

  const render = () => {
    if (currentIdx >= dataset.length) {
      onComplete({
        title: 'Formal or Casual Completed! 🎩',
        correct: score,
        total: dataset.length,
        percentage: Math.round((score / dataset.length) * 100),
        xp: score * 10 + (score === dataset.length ? 25 : 0),
        coins: score * 2,
        details: `Classified ${score} out of ${dataset.length} phrases accurately!`
      });
      return;
    }

    const item = dataset[currentIdx];

    stageEl.innerHTML = `
      ${renderGameHeader('🎩 Formal or Casual?', currentIdx + 1, dataset.length, score)}

      <div class="card text-center" style="padding: 1.5rem;">
        <span class="category-pill">Register Classifier</span>
        <h3 style="font-size: 1.25rem; margin: 1.25rem 0; font-style: italic; line-height: 1.5;">"${item.phrase}"</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.25rem;">Is this expression Formal or Casual?</p>

        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button class="btn btn-primary fc-btn" data-type="Formal" style="padding: 0.85rem 2rem; font-size: 1.05rem;">🎩 Formal (רשמי)</button>
          <button class="btn btn-secondary fc-btn" data-type="Casual" style="padding: 0.85rem 2rem; font-size: 1.05rem;">🗣️ Casual (יומיומי)</button>
        </div>
      </div>
    `;

    stageEl.querySelectorAll('.fc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        stageEl.querySelectorAll('.fc-btn').forEach(b => b.disabled = true);
        const choice = btn.getAttribute('data-type');
        if (choice === item.correct) {
          btn.style.backgroundColor = 'var(--success)';
          btn.style.color = '#fff';
          score++;
        } else {
          btn.style.backgroundColor = 'var(--danger)';
          btn.style.color = '#fff';
        }
        setTimeout(() => { currentIdx++; render(); }, 900);
      });
    });
  };
  render();
}

// ==========================================================================
// 24. GAME: COMPLETE THE CONVERSATION 💬 (10 consecutive dialogues)
// ==========================================================================

export function startCompleteConversationGame(stageEl, vaultData, onComplete = () => {}) {
  const allDialogues = [
    {
      word: 'Person A: "Fancy grabbing a pint at the local pub after work?"\nPerson B: "_______________"',
      target: 'I\'d love to! Cheers, see you at 6.',
      choices: ['I\'d love to! Cheers, see you at 6.', 'Yes, my favorite color is blue.', 'It rained heavily yesterday.', 'No, I am a doctor.']
    },
    {
      word: 'Tourist: "Excuse me, could you tell me how to get to Covent Garden?"\nLondoner: "_______________"',
      target: 'Sure! Take the Piccadilly Line eastbound two stops.',
      choices: ['Sure! Take the Piccadilly Line eastbound two stops.', 'I like apples very much.', 'The weather is quite nice today.', 'My name is Henry.']
    },
    {
      word: 'Host: "Would you like a splash of milk in your tea?"\nGuest: "_______________"',
      target: 'Just a drop, please. Thank you!',
      choices: ['Just a drop, please. Thank you!', 'I forgot my luggage at the station.', 'Milk comes from cows.', 'Tea is hot.']
    },
    {
      word: 'Colleague: "How did your presentation go with the board?"\nWorker: "_______________"',
      target: 'Brilliant! They approved the entire project proposal.',
      choices: ['Brilliant! They approved the entire project proposal.', 'I ate a sandwich for lunch.', 'The board is made of oak wood.', 'Tomorrow is Wednesday.']
    },
    {
      word: 'Friend: "Are you feeling any better today?"\nPatient: "_______________"',
      target: 'Much better, thanks! The medicine really helped.',
      choices: ['Much better, thanks! The medicine really helped.', 'Better is a comparative adjective.', 'I woke up in 1995.', 'The hospital has many rooms.']
    },
    {
      word: 'Shopkeeper: "That comes to twenty pounds fifty, please."\nCustomer: "_______________"',
      target: 'Can I pay by contactless card?',
      choices: ['Can I pay by contactless card?', 'Twenty is after nineteen.', 'I have two shoes.', 'The shop has nice windows.']
    },
    {
      word: 'Neighbor: "Lovely weather we are having today, isn\'t it?"\nResident: "_______________"',
      target: 'Splendid indeed! Makes a nice change from the rain.',
      choices: ['Splendid indeed! Makes a nice change from the rain.', 'Weather is meteorology.', 'I have an umbrella.', 'The sky is 10 miles away.']
    },
    {
      word: 'Interviewer: "Why are you interested in joining our London team?"\nCandidate: "_______________"',
      target: 'I admire your company values and want to contribute my skills.',
      choices: ['I admire your company values and want to contribute my skills.', 'Because my alarm clock rang.', 'I live on planet Earth.', 'Work is necessary for survival.']
    },
    {
      word: 'Waiter: "Are you ready to order, or would you like a few more minutes?"\nDiner: "_______________"',
      target: 'We are ready, thank you. Could we have the fish and chips?',
      choices: ['We are ready, thank you. Could we have the fish and chips?', 'A minute has 60 seconds.', 'I am sitting on a chair.', 'Fish swim in water.']
    },
    {
      word: 'Driver: "Terrible traffic on the M25 motorway today!"\nPassenger: "_______________"',
      target: 'Tell me about it! We have barely moved an inch.',
      choices: ['Tell me about it! We have barely moved an inch.', 'Cars have four wheels.', 'Motorway begins with letter M.', 'I like bicycles.']
    }
  ];

  const dataset = shuffleArray(allDialogues).slice(0, 10);
  runChoiceGame(stageEl, dataset, '💬 Complete Conversation', 'Choose the response that completes the conversation naturally:', onComplete);
}

// ==========================================================================
// 25. GAME: STORY BUILDER 📚 (10 consecutive story steps)
// ==========================================================================

export function startStoryBuilderGame(stageEl, vaultData, onComplete = () => {}) {
  const allStorySteps = [
    { word: 'Oliver woke up early on a foggy London morning and decided to...', target: 'take a walk in Hyde Park', choices: ['take a walk in Hyde Park', 'fly to Mars on a bicycle', 'buy 100 tractors', 'sleep for 3 years'] },
    { word: 'While walking near the Serpentine lake, he suddenly spotted...', target: 'a mysterious vintage envelope on the bench', choices: ['a mysterious vintage envelope on the bench', 'a talking volcano', 'a floating alien spaceship', 'an erupting iceberg'] },
    { word: 'He picked it up and read the wax seal, which was stamped with...', target: 'the crest of the Royal Society of London', choices: ['the crest of the Royal Society of London', 'a drawing of a pepperoni pizza', 'his kindergarten report card', 'a secret recipe for candy'] },
    { word: 'Inside the envelope lay a handwritten letter inviting him to...', target: 'a private viewing at the British Museum after dark', choices: ['a private viewing at the British Museum after dark', 'clean the floor of the local supermarket', 'jump off Big Ben', 'eat 50 lemons'] },
    { word: 'At 8 PM, Oliver arrived at the grand museum gates, where...', target: 'the head curator greeted him warmly with a cup of tea', choices: ['the head curator greeted him warmly with a cup of tea', 'a pack of wild lions attacked him', 'the building vanished into thin air', 'he was handed a bucket of paint'] },
    { word: 'The curator led him to a secret archive room and revealed...', target: 'a lost manuscript written by William Shakespeare', choices: ['a lost manuscript written by William Shakespeare', 'a giant rubber duck', 'a box of half-eaten crisps', 'a bowling ball from 2024'] },
    { word: 'To unlock the glass display case, Oliver had to solve...', target: 'a clever British riddle about the River Thames', choices: ['a clever British riddle about the River Thames', 'a video game level on impossible mode', 'a 1000-page tax document', 'a wrestling match with a bear'] },
    { word: 'Recalling his history lessons, Oliver whispered the correct word and...', target: 'the antique case clicked open smoothly', choices: ['the antique case clicked open smoothly', 'the museum alarms exploded', 'the floor opened into lava', 'the curator turned into a frog'] },
    { word: 'Inside the manuscript was an ancient map showing...', target: 'a hidden garden hidden deep behind Buckingham Palace', choices: ['a hidden garden hidden deep behind Buckingham Palace', 'the location of a lost shoe store', 'a map of the moon in 3000 BC', 'a recipe for soup'] },
    { word: 'Delighted with the discovery, Oliver and the curator toasted with...', target: 'a proper pot of Earl Grey tea and scones', choices: ['a proper pot of Earl Grey tea and scones', 'a bottle of washing detergent', 'melted ice cubes', 'a glass of seawater'] }
  ];

  const dataset = allStorySteps.slice(0, 10);
  runChoiceGame(stageEl, dataset, '📚 Story Builder', 'Choose the next logical step in the story:', onComplete);
}

// ==========================================================================
// 26. GAME: WORD CATEGORIES 🗂️ (10 consecutive word categorizations)
// ==========================================================================

export function startWordCategoriesGame(stageEl, vaultData, onComplete = () => {}) {
  const allWords = [
    { word: 'Scone', cat: 'Food & Drink' },
    { word: 'Double-decker bus', cat: 'Travel & Transport' },
    { word: 'Earl Grey', cat: 'Food & Drink' },
    { word: 'The Tube', cat: 'Travel & Transport' },
    { word: 'Trench coat', cat: 'Clothing' },
    { word: 'Chuffed', cat: 'Emotions' },
    { word: 'Crumpet', cat: 'Food & Drink' },
    { word: 'Black cab', cat: 'Travel & Transport' },
    { word: 'Wellies (Boots)', cat: 'Clothing' },
    { word: 'Gutted', cat: 'Emotions' },
    { word: 'Bangers and mash', cat: 'Food & Drink' },
    { word: 'Underground station', cat: 'Travel & Transport' },
    { word: 'Waistcoat', cat: 'Clothing' },
    { word: 'Gobsmacked', cat: 'Emotions' },
    { word: 'Fish and chips', cat: 'Food & Drink' },
    { word: 'Brolly (Umbrella)', cat: 'Clothing' }
  ];

  const dataset = shuffleArray(allWords).slice(0, 10);
  let currentIdx = 0;
  let score = 0;

  const categories = ['Food & Drink', 'Travel & Transport', 'Clothing', 'Emotions'];

  const render = () => {
    if (currentIdx >= dataset.length) {
      onComplete({
        title: 'Word Categories Sorted! 🗂️',
        correct: score,
        total: dataset.length,
        percentage: Math.round((score / dataset.length) * 100),
        xp: score * 10 + (score === dataset.length ? 25 : 0),
        coins: score * 2,
        details: `Classified ${score} out of ${dataset.length} items into their proper categories!`
      });
      return;
    }

    const item = dataset[currentIdx];

    stageEl.innerHTML = `
      ${renderGameHeader('🗂️ Word Categories', currentIdx + 1, dataset.length, score)}

      <div class="card text-center" style="padding: 1.5rem;">
        <span class="category-pill">Category Classifier</span>
        <h3 style="font-size: 2rem; font-family: 'Playfair Display', serif; margin: 1rem 0;">${item.word}</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.25rem;">Select the correct category for this British item:</p>

        <div class="practice-options-grid">
          ${categories.map(cat => `
            <button class="btn btn-secondary cat-btn" data-cat="${cat}">${cat}</button>
          `).join('')}
        </div>
      </div>
    `;

    stageEl.querySelectorAll('.cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        stageEl.querySelectorAll('.cat-btn').forEach(b => b.disabled = true);
        const choice = btn.getAttribute('data-cat');
        if (choice === item.cat) {
          btn.classList.add('correct-answer');
          score++;
          speakText(item.word);
        } else {
          btn.classList.add('wrong-selected');
        }
        setTimeout(() => { currentIdx++; render(); }, 900);
      });
    });
  };
  render();
}

// ==========================================================================
// 27. GAME: SPEED READING ⚡ (10 consecutive reading questions)
// ==========================================================================

export function startSpeedReadingGame(stageEl, vaultData, onComplete = () => {}) {
  const allPassages = [
    {
      word: 'Passage: "Afternoon tea is served between 3:30 PM and 5:00 PM with scones and hot tea."',
      target: 'Between 3:30 PM and 5:00 PM',
      choices: ['Between 3:30 PM and 5:00 PM', 'At midnight', 'Early morning 6:00 AM', 'Only on Sundays']
    },
    {
      word: 'Passage: "Big Ben is actually the nickname for the Great Bell inside the Elizabeth Tower in London."',
      target: 'The Great Bell inside Elizabeth Tower',
      choices: ['The Great Bell inside Elizabeth Tower', 'The whole clock tower building', 'The London Eye wheel', 'The River Thames bridge']
    },
    {
      word: 'Passage: "The London Underground, known as The Tube, opened in 1863 as the world\'s first metro."',
      target: 'In 1863',
      choices: ['In 1863', 'In 1945', 'In 1776', 'In 2000']
    },
    {
      word: 'Passage: "Hyde Park is one of the eight Royal Parks of London, covering over 350 acres."',
      target: 'Over 350 acres',
      choices: ['Over 350 acres', 'Only 10 acres', '50 square miles', '1000 square feet']
    },
    {
      word: 'Passage: "Fish and chips became a staple meal among the working class in the UK during the 19th century."',
      target: 'The 19th century',
      choices: ['The 19th century', 'The Bronze Age', 'The 21st century', 'The 14th century']
    },
    {
      word: 'Passage: "A proper British cup of tea is traditionally brewed for 3 to 5 minutes before milk is added."',
      target: '3 to 5 minutes',
      choices: ['3 to 5 minutes', '1 second', 'Over one hour', 'Exactly 20 minutes']
    },
    {
      word: 'Passage: "The Changing of the Guard takes place outside Buckingham Palace and attracts thousands of tourists."',
      target: 'Buckingham Palace',
      choices: ['Buckingham Palace', 'Heathrow Airport', 'Stonehenge', 'Piccadilly Circus']
    },
    {
      word: 'Passage: "Wimbledon is the oldest tennis tournament in the world and is played exclusively on outdoor grass courts."',
      target: 'Outdoor grass courts',
      choices: ['Outdoor grass courts', 'Clay courts', 'Concrete indoor courts', 'Wooden gym floors']
    },
    {
      word: 'Passage: "The Ravenmaster at the Tower of London cares for at least six resident ravens by ancient royal decree."',
      target: 'At least six ravens',
      choices: ['At least six ravens', 'One hundred eagles', 'Twenty owls', 'Two pigeons']
    },
    {
      word: 'Passage: "The British pound sterling is the oldest currency in continuous use in the world today."',
      target: 'Oldest continuous currency',
      choices: ['Oldest continuous currency', 'Newest currency', 'Digital cryptocurrency', 'Only used in Scotland']
    }
  ];

  const dataset = shuffleArray(allPassages).slice(0, 10);
  runChoiceGame(stageEl, dataset, '⚡ Speed Reading', 'Read the passage and choose the correct answer:', onComplete);
}

// ==========================================================================
// 28. GAME: TRUE OR FALSE? ✅❌ (10 consecutive facts)
// ==========================================================================

export function startTrueFalseGame(stageEl, vaultData, onComplete = () => {}) {
  const allStatements = [
    { statement: 'In British English, "chips" refers to thick French fries.', target: 'True' },
    { statement: 'The UK currency is the Euro.', target: 'False' },
    { statement: '"Chuffed" in British slang means disappointed and upset.', target: 'False' },
    { statement: 'A "brolly" is British slang for an umbrella.', target: 'True' },
    { statement: 'London taxis are famous for being bright yellow like New York cabs.', target: 'False' },
    { statement: 'A "fortnight" refers to a period of exactly two weeks (14 days).', target: 'True' },
    { statement: 'The Queen or King of the UK resides at Buckingham Palace in London.', target: 'True' },
    { statement: 'In the UK, people drive on the right side of the road.', target: 'False' },
    { statement: '"Knackered" means full of energy and ready to run.', target: 'False' },
    { statement: 'Afternoon tea traditionally includes scones with clotted cream and jam.', target: 'True' },
    { statement: '"Skint" is a British slang word meaning very wealthy.', target: 'False' },
    { statement: 'Big Ben is the name of the bell inside the clock tower, not the tower itself.', target: 'True' },
    { statement: 'The Tube is the nickname for the London Underground railway.', target: 'True' },
    { statement: 'In British English, a "flat" is what Americans call an "apartment".', target: 'True' }
  ];

  const questions = shuffleArray(allStatements).slice(0, 10);
  let currentIdx = 0;
  let score = 0;

  const render = () => {
    if (currentIdx >= questions.length) {
      onComplete({
        title: 'True or False Completed! ✅',
        correct: score,
        total: questions.length,
        percentage: Math.round((score / questions.length) * 100),
        xp: score * 10 + (score === questions.length ? 25 : 0),
        coins: score * 2,
        details: `Evaluated ${score} out of ${questions.length} statements correctly!`
      });
      return;
    }

    const q = questions[currentIdx];
    stageEl.innerHTML = `
      ${renderGameHeader('✅❌ True or False?', currentIdx + 1, questions.length, score)}

      <div class="card text-center" style="padding: 1.75rem 1rem;">
        <span class="category-pill">Fact Check</span>
        <h4 style="margin: 1.25rem 0; font-size: 1.2rem; line-height: 1.5;">"${q.statement}"</h4>

        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button class="btn btn-primary tf-btn" data-ans="True" style="padding: 0.85rem 2rem; font-size: 1.1rem;">✅ True (נכון)</button>
          <button class="btn btn-secondary tf-btn" data-ans="False" style="padding: 0.85rem 2rem; font-size: 1.1rem;">❌ False (לא נכון)</button>
        </div>
      </div>
    `;

    stageEl.querySelectorAll('.tf-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        stageEl.querySelectorAll('.tf-btn').forEach(b => b.disabled = true);
        const choice = btn.getAttribute('data-ans');
        if (choice === q.target) {
          btn.style.backgroundColor = 'var(--success)';
          btn.style.color = '#fff';
          score++;
        } else {
          btn.style.backgroundColor = 'var(--danger)';
          btn.style.color = '#fff';
        }
        setTimeout(() => { currentIdx++; render(); }, 900);
      });
    });
  };
  render();
}

// ==========================================================================
// 29. GAME: MEMORY CHALLENGE 🧠 (10 consecutive fast-recall rounds)
// ==========================================================================

export function startMemoryChallengeGame(stageEl, vaultData, onComplete = () => {}) {
  const allVault = getAllVaultItems(vaultData);
  const rounds = shuffleArray(allVault).slice(0, 10);
  let currentIdx = 0;
  let score = 0;

  const renderMemoryRound = () => {
    if (currentIdx >= rounds.length) {
      onComplete({
        title: 'Memory Challenge Completed! 🧠',
        correct: score,
        total: rounds.length,
        percentage: Math.round((score / rounds.length) * 100),
        xp: score * 10 + (score === rounds.length ? 25 : 0),
        coins: score * 2,
        details: `Successfully recalled ${score} out of ${rounds.length} memory targets!`
      });
      return;
    }

    const currentTarget = rounds[currentIdx];
    const otherItems = allVault.filter(i => i.id !== currentTarget.id);
    const flashWords = shuffleArray([currentTarget.term, ...shuffleArray(otherItems).slice(0, 2).map(i => i.term)]);

    stageEl.innerHTML = `
      ${renderGameHeader('🧠 Memory Challenge', currentIdx + 1, rounds.length, score)}

      <div class="card text-center" style="padding: 1.75rem;">
        <span class="category-pill">Memorize Phase</span>
        <h4 style="margin: 0.75rem 0;">Memorize these words before they disappear!</h4>
        <div style="font-size: 2.5rem; color: var(--gold); font-weight: 800; margin: 0.5rem 0;" id="mem-timer">3</div>

        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; margin: 1.25rem 0;">
          ${flashWords.map(w => `<span class="badge" style="font-size: 1.25rem; padding: 0.6rem 1.25rem; background: var(--uk-blue); color: #fff;">${w}</span>`).join('')}
        </div>
      </div>
    `;

    let timeLeft = 3;
    const timer = setInterval(() => {
      timeLeft--;
      const timerEl = stageEl.querySelector('#mem-timer');
      if (timerEl) timerEl.innerText = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer);
        renderRecallPhase(currentTarget, otherItems);
      }
    }, 1000);
  };

  const renderRecallPhase = (targetItem, otherItems) => {
    const distractors = shuffleArray(otherItems.filter(i => i.term !== targetItem.term)).slice(0, 3).map(i => i.term);
    const options = shuffleArray([targetItem.term, ...distractors]);

    stageEl.innerHTML = `
      ${renderGameHeader('🧠 Memory Challenge', currentIdx + 1, rounds.length, score)}

      <div class="card text-center" style="padding: 1.75rem;">
        <span class="category-pill">Recall Phase</span>
        <h4 style="margin: 0.75rem 0;">Which word was shown on the screen?</h4>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.25rem;">Select the word that was in the list:</p>

        <div class="practice-options-grid">
          ${options.map(w => `
            <button class="btn btn-secondary recall-btn" data-word="${w}">${w}</button>
          `).join('')}
        </div>
      </div>
    `;

    stageEl.querySelectorAll('.recall-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        stageEl.querySelectorAll('.recall-btn').forEach(b => b.disabled = true);
        const w = btn.getAttribute('data-word');
        if (w === targetItem.term) {
          btn.classList.add('correct-answer');
          score++;
          speakText(w);
        } else {
          btn.classList.add('wrong-selected');
        }
        setTimeout(() => {
          currentIdx++;
          renderMemoryRound();
        }, 1000);
      });
    });
  };

  renderMemoryRound();
}

// ==========================================================================
// 30. GAME: WORD CHAIN 🔗 (10 consecutive word chain links)
// ==========================================================================

export function startWordChainGame(stageEl, vaultData, onComplete = () => {}) {
  const allChain = [
    { start: 'LONDON', lastLetter: 'N', choices: ['Nifty', 'Cat', 'Dog', 'Book'], correct: 'Nifty' },
    { start: 'NIFTY', lastLetter: 'Y', choices: ['Yummy', 'Apple', 'Pen', 'Car'], correct: 'Yummy' },
    { start: 'YUMMY', lastLetter: 'Y', choices: ['Yellow', 'Blue', 'Green', 'Red'], correct: 'Yellow' },
    { start: 'YELLOW', lastLetter: 'W', choices: ['Wonderful', 'Great', 'Super', 'Nice'], correct: 'Wonderful' },
    { start: 'WONDERFUL', lastLetter: 'L', choices: ['London', 'Paris', 'Rome', 'Berlin'], correct: 'London' },
    { start: 'BRITAIN', lastLetter: 'N', choices: ['Noble', 'King', 'Queen', 'Prince'], correct: 'Noble' },
    { start: 'NOBLE', lastLetter: 'E', choices: ['Elegant', 'Fast', 'Slow', 'Cold'], correct: 'Elegant' },
    { start: 'ELEGANT', lastLetter: 'T', choices: ['Thames', 'River', 'Lake', 'Ocean'], correct: 'Thames' },
    { start: 'THAMES', lastLetter: 'S', choices: ['Splendid', 'Dull', 'Boring', 'Sad'], correct: 'Splendid' },
    { start: 'SPLENDID', lastLetter: 'D', choices: ['Delightful', 'Awful', 'Bad', 'Poor'], correct: 'Delightful' },
    { start: 'CHUFFED', lastLetter: 'D', choices: ['Dapper', 'Scared', 'Rough', 'Plain'], correct: 'Dapper' },
    { start: 'DAPPER', lastLetter: 'R', choices: ['Royal', 'Common', 'Cheap', 'Wild'], correct: 'Royal' }
  ];

  const chain = shuffleArray(allChain).slice(0, 10);
  let currentIdx = 0;
  let score = 0;

  const render = () => {
    if (currentIdx >= chain.length) {
      onComplete({
        title: 'Word Chain Complete! 🔗',
        correct: score,
        total: chain.length,
        percentage: Math.round((score / chain.length) * 100),
        xp: score * 10 + (score === chain.length ? 25 : 0),
        coins: score * 2,
        details: `Connected ${score} out of ${chain.length} word links in sequence!`
      });
      return;
    }

    const item = chain[currentIdx];
    stageEl.innerHTML = `
      ${renderGameHeader('🔗 Word Chain', currentIdx + 1, chain.length, score)}

      <div class="card text-center" style="padding: 1.5rem;">
        <span class="category-pill">Word Chain</span>
        <h3 style="font-size: 2rem; margin: 1rem 0;">${item.start} ➔ <span style="color: var(--gold);">?</span></h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.25rem;">Pick the word starting with letter '<strong>${item.lastLetter}</strong>':</p>

        <div class="practice-options-grid">
          ${shuffleArray(item.choices).map(c => `
            <button class="btn btn-secondary chain-btn" data-word="${c}">${c}</button>
          `).join('')}
        </div>
      </div>
    `;

    stageEl.querySelectorAll('.chain-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        stageEl.querySelectorAll('.chain-btn').forEach(b => b.disabled = true);
        const w = btn.getAttribute('data-word');
        if (w === item.correct) {
          btn.classList.add('correct-answer');
          score++;
          speakText(w);
        } else {
          btn.classList.add('wrong-selected');
        }
        setTimeout(() => { currentIdx++; render(); }, 900);
      });
    });
  };
  render();
}

// ==========================================================================
// 31. GAME: CATEGORY RUSH 🚀 (10 consecutive rapid identification questions)
// ==========================================================================

export function startCategoryRushGame(stageEl, vaultData, onComplete = () => {}) {
  const allRush = [
    { targetCat: 'British Slang', correct: 'Knackered', options: ['Knackered', 'Elephant', 'Computer', 'Mountain'] },
    { targetCat: 'Food & Drink', correct: 'Scone', options: ['Scone', 'Pavement', 'Motorway', 'Umbrella'] },
    { targetCat: 'British Slang', correct: 'Chuffed', options: ['Chuffed', 'Telephone', 'Bicycle', 'Hospital'] },
    { targetCat: 'Transport', correct: 'Double-decker', options: ['Double-decker', 'Cheddar', 'Pancake', 'Teapot'] },
    { targetCat: 'British Slang', correct: 'Gutted', options: ['Gutted', 'Guitar', 'Window', 'Keyboard'] },
    { targetCat: 'Clothing', correct: 'Waistcoat', options: ['Waistcoat', 'Marmalade', 'Porridge', 'Pint'] },
    { targetCat: 'British Slang', correct: 'Skint', options: ['Skint', 'Skateboard', 'Skyline', 'Skipping'] },
    { targetCat: 'Food & Drink', correct: 'Crumpet', options: ['Crumpet', 'Subway', 'Platform', 'Carriage'] },
    { targetCat: 'British Slang', correct: 'Gobsmacked', options: ['Gobsmacked', 'Goldfish', 'Goalkeeper', 'Garden'] },
    { targetCat: 'British Weather', correct: 'Drizzle', options: ['Drizzle', 'Desert', 'Dune', 'Canyon'] },
    { targetCat: 'British Slang', correct: 'Brolly', options: ['Brolly', 'Broccoli', 'Brother', 'Bronze'] },
    { targetCat: 'Transport', correct: 'Black cab', options: ['Black cab', 'Black tea', 'Blackberry', 'Blackboard'] }
  ];

  const dataset = shuffleArray(allRush).slice(0, 10);
  let currentIdx = 0;
  let score = 0;

  const render = () => {
    if (currentIdx >= dataset.length) {
      onComplete({
        title: 'Category Rush Finished! 🚀',
        correct: score,
        total: dataset.length,
        percentage: Math.round((score / dataset.length) * 100),
        xp: score * 10 + (score === dataset.length ? 25 : 0),
        coins: score * 2,
        details: `Identified ${score} out of ${dataset.length} items in Category Rush!`
      });
      return;
    }

    const item = dataset[currentIdx];
    stageEl.innerHTML = `
      ${renderGameHeader('🚀 Category Rush', currentIdx + 1, dataset.length, score)}

      <div class="card text-center" style="padding: 1.5rem;">
        <span class="category-pill">Rapid Category Match</span>
        <h3 style="margin: 0.75rem 0;">Which item belongs to: <strong style="color: var(--uk-blue);">${item.targetCat}</strong>?</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.25rem;">Tap the correct item:</p>

        <div class="practice-options-grid">
          ${shuffleArray(item.options).map(opt => `
            <button class="btn btn-secondary rush-btn" data-word="${opt}">${opt}</button>
          `).join('')}
        </div>
      </div>
    `;

    stageEl.querySelectorAll('.rush-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        stageEl.querySelectorAll('.rush-btn').forEach(b => b.disabled = true);
        const w = btn.getAttribute('data-word');
        if (w === item.correct) {
          btn.classList.add('correct-answer');
          score++;
          speakText(w);
        } else {
          btn.classList.add('wrong-selected');
        }
        setTimeout(() => { currentIdx++; render(); }, 900);
      });
    });
  };
  render();
}

// ==========================================================================
// 32. GAME: FORBIDDEN WORD 🚫 (10 consecutive taboo word puzzles)
// ==========================================================================

export function startForbiddenWordGame(stageEl, vaultData, onComplete = () => {}) {
  const allForbidden = [
    { word: 'Clue: Warm British beverage served with milk in the afternoon.\nForbidden words: [drink, cup, leaf]', target: 'Tea', choices: ['Tea', 'Coffee', 'Juice', 'Water'] },
    { word: 'Clue: Handheld device used to protect you from British rain.\nForbidden words: [rain, wet, water]', target: 'Umbrella (Brolly)', choices: ['Umbrella (Brolly)', 'Sunglasses', 'Coat', 'Hat'] },
    { word: 'Clue: Underground railway network beneath London.\nForbidden words: [train, underground, rails]', target: 'The Tube', choices: ['The Tube', 'The Bus', 'The Taxi', 'The Tram'] },
    { word: 'Clue: Baked British good served with clotted cream and jam.\nForbidden words: [cake, bread, bake]', target: 'Scone', choices: ['Scone', 'Pizza', 'Sandwich', 'Burger'] },
    { word: 'Clue: Famous tall clock bell tower beside the UK Parliament.\nForbidden words: [clock, tower, time]', target: 'Big Ben', choices: ['Big Ben', 'London Eye', 'Tower Bridge', 'Shard'] },
    { word: 'Clue: British slang for someone who is completely exhausted.\nForbidden words: [tired, sleep, bed]', target: 'Knackered', choices: ['Knackered', 'Excited', 'Hungry', 'Active'] },
    { word: 'Clue: British slang for being extremely pleased or proud.\nForbidden words: [happy, glad, smile]', target: 'Chuffed', choices: ['Chuffed', 'Angry', 'Sad', 'Bored'] },
    { word: 'Clue: Traditional British pub dish with fried potato strips.\nForbidden words: [potato, fry, grease]', target: 'Fish and Chips', choices: ['Fish and Chips', 'Pasta', 'Steak', 'Salad'] },
    { word: 'Clue: A period of fourteen consecutive days.\nForbidden words: [two, weeks, fourteen]', target: 'Fortnight', choices: ['Fortnight', 'Month', 'Decade', 'Century'] },
    { word: 'Clue: Official London residence of the British Monarch.\nForbidden words: [queen, king, palace]', target: 'Buckingham Palace', choices: ['Buckingham Palace', 'Windsor', 'Westminster', 'Whitehall'] }
  ];

  const dataset = shuffleArray(allForbidden).slice(0, 10);
  runChoiceGame(stageEl, dataset, '🚫 Forbidden Word', 'Guess the target word from the clue (without the forbidden words):', onComplete);
}

// ==========================================================================
// 33. GAME: ENGLISH TRIVIA 🌎 (10 consecutive British trivia questions)
// ==========================================================================

export function startEnglishTriviaGame(stageEl, vaultData, onComplete = () => {}) {
  const allTrivia = [
    { word: 'What is the popular nickname for London\'s Underground railway network?', target: 'The Tube', choices: ['The Tube', 'The Metro', 'The Subway', 'The Cable'] },
    { word: 'What traditional British dish consists of battered fish and deep-fried potatoes?', target: 'Fish and Chips', choices: ['Fish and Chips', 'Bangers and Mash', 'Shepherd\'s Pie', 'Full English'] },
    { word: 'Which famous English playwright wrote Romeo and Juliet and Hamlet?', target: 'William Shakespeare', choices: ['William Shakespeare', 'Charles Dickens', 'George Orwell', 'Jane Austen'] },
    { word: 'What major river flows directly through central London?', target: 'The River Thames', choices: ['The River Thames', 'The River Seine', 'The River Danube', 'The River Mersey'] },
    { word: 'What is the official currency of the United Kingdom?', target: 'Pound Sterling (£)', choices: ['Pound Sterling (£)', 'Euro (€)', 'Dollar ($)', 'Franc'] },
    { word: 'Which famous London intersection is known for its giant neon advertising displays?', target: 'Piccadilly Circus', choices: ['Piccadilly Circus', 'Trafalgar Square', 'Covent Garden', 'Leicester Square'] },
    { word: 'What is the world\'s oldest tennis tournament, played on outdoor grass in London?', target: 'Wimbledon', choices: ['Wimbledon', 'US Open', 'Roland Garros', 'Australian Open'] },
    { word: 'What color are London\'s iconic double-decker buses?', target: 'Bright Red', choices: ['Bright Red', 'Yellow', 'Deep Blue', 'Emerald Green'] },
    { word: 'Which prehistoric stone circle monument is located in Wiltshire, England?', target: 'Stonehenge', choices: ['Stonehenge', 'Colosseum', 'Parthenon', 'Pyramids'] },
    { word: 'What is the official London home of the Prime Minister of the UK?', target: '10 Downing Street', choices: ['10 Downing Street', 'Buckingham Palace', 'Tower of London', 'Kensington Palace'] },
    { word: 'What is the traditional accompaniment to scones in British cream tea?', target: 'Clotted cream and jam', choices: ['Clotted cream and jam', 'Butter and mustard', 'Chocolate syrup', 'Olive oil'] },
    { word: 'How many weeks are in a British "fortnight"?', target: 'Two weeks', choices: ['Two weeks', 'Four weeks', 'One week', 'Three weeks'] }
  ];

  const dataset = shuffleArray(allTrivia).slice(0, 10);
  runChoiceGame(stageEl, dataset, '🌎 English Trivia', 'Answer the British English trivia question:', onComplete);
}

// ==========================================================================
// 34. GAME: WORD CONNECTIONS 🧩 (10 consecutive word connection groups)
// ==========================================================================

export function startWordConnectionsGame(stageEl, vaultData, onComplete = () => {}) {
  const allConnections = [
    { word: 'Words: [Big Ben, London Eye, Tower Bridge, Buckingham Palace]', target: 'London Landmarks', choices: ['London Landmarks', 'British Foods', 'TV Shows', 'Royal Titles'] },
    { word: 'Words: [Earl Grey, English Breakfast, Peppermint, Chamomile]', target: 'Types of Tea', choices: ['Types of Tea', 'London Parks', 'British Coins', 'Tube Stations'] },
    { word: 'Words: [Penny, Two Pence, Fiver, Tenner]', target: 'British Currency', choices: ['British Currency', 'Clothing Sizes', 'Tube Lines', 'Royal Families'] },
    { word: 'Words: [Piccadilly, Central, Northern, Victoria]', target: 'London Underground Lines', choices: ['London Underground Lines', 'British Queens', 'London Bridges', 'Rivers'] },
    { word: 'Words: [Chuffed, Knackered, Gobsmacked, Gutted]', target: 'British Slang Words', choices: ['British Slang Words', 'Car Parts', 'British Weather', 'Pastries'] },
    { word: 'Words: [Scone, Crumpet, Shortbread, Flapjack]', target: 'British Baked Treats', choices: ['British Baked Treats', 'London Streets', 'British Birds', 'Musical Instruments'] },
    { word: 'Words: [Hyde, Regent\'s, Richmond, St. James\'s]', target: 'Royal Parks of London', choices: ['Royal Parks of London', 'Airports', 'Train Stations', 'Historic Ships'] },
    { word: 'Words: [Lorry, Boot, Bonnet, Windscreen]', target: 'British Vehicle Terms', choices: ['British Vehicle Terms', 'Kitchen Tools', 'Clothing Items', 'Furniture'] },
    { word: 'Words: [Fish & Chips, Shepherd\'s Pie, Sunday Roast, Bangers & Mash]', target: 'Traditional British Dishes', choices: ['Traditional British Dishes', 'Breakfast Cereals', 'Supermarkets', 'Fast Foods'] },
    { word: 'Words: [Wimbledon, Wembley, Lord\'s, Twickenham]', target: 'Famous British Sports Venues', choices: ['Famous British Sports Venues', 'Royal Palaces', 'Universities', 'Cathedrals'] },
    { word: 'Words: [Brolly, Mac, Trench Coat, Wellies]', target: 'British Rain Gear', choices: ['British Rain Gear', 'Summer Beachwear', 'Winter Sports', 'Formal Suits'] },
    { word: 'Words: [Oxford, Cambridge, Imperial, UCL]', target: 'Top British Universities', choices: ['Top British Universities', 'London Hospitals', 'Museums', 'Bookstores'] }
  ];

  const dataset = shuffleArray(allConnections).slice(0, 10);
  runChoiceGame(stageEl, dataset, '🧩 Word Connections', 'What is the common connection between these 4 items?', onComplete);
}

// ==========================================================================
// HELPER CHOICE RUNNER FOR MULTIPLE CHOICE GAMES (10 questions, audio, progress)
// ==========================================================================

function runChoiceGame(stageEl, dataset, title, promptText, onComplete) {
  let currentIdx = 0;
  let score = 0;
  const questions = dataset.slice(0, 10);

  const render = () => {
    if (currentIdx >= questions.length) {
      onComplete({
        title: `${title} Completed! 🎉`,
        correct: score,
        total: questions.length,
        percentage: Math.round((score / questions.length) * 100),
        xp: score * 10 + (score === questions.length ? 25 : 0),
        coins: score * 2,
        details: `Answered ${score} out of ${questions.length} questions correctly (${Math.round((score / questions.length) * 100)}% success rate).`
      });
      return;
    }

    const item = questions[currentIdx];
    const shuffledChoices = shuffleArray(item.choices);
    const promptString = (item.word || item.prompt || '').trim();

    stageEl.innerHTML = `
      ${renderGameHeader(title, currentIdx + 1, questions.length, score)}

      <div class="card text-center" style="padding: 1.5rem 1.25rem; margin-bottom: 1.25rem;">
        <span class="category-pill">${title}</span>
        
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin: 1rem 0 0.5rem 0;">
          <h3 style="font-size: 1.25rem; margin: 0; font-family: 'Playfair Display', serif; white-space: pre-line; line-height: 1.5;">${promptString}</h3>
          ${promptString ? `
            <button class="game-speak-btn prompt-speak-btn" data-text="${promptString.replace(/"/g, '&quot;')}" title="Listen to prompt">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          ` : ''}
        </div>
        
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.25rem;">${promptText}</p>

        <div class="practice-options-grid">
          ${shuffledChoices.map(c => `
            <button class="btn btn-secondary mc-opt-btn" data-choice="${c}" style="display: flex; justify-content: space-between; align-items: center; text-align: left; padding: 0.85rem 1rem;">
              <span style="flex: 1;">${c}</span>
              <button class="game-speak-btn opt-speak-btn" data-text="${c.replace(/"/g, '&quot;')}" title="Listen to pronunciation">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    const promptBtn = stageEl.querySelector('.prompt-speak-btn');
    if (promptBtn) {
      promptBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        speakText(promptBtn.getAttribute('data-text'));
      });
    }

    stageEl.querySelectorAll('.opt-speak-btn').forEach(speakBtn => {
      speakBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        speakText(speakBtn.getAttribute('data-text'));
      });
    });

    stageEl.querySelectorAll('.mc-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        stageEl.querySelectorAll('.mc-opt-btn').forEach(b => {
          b.disabled = true;
          if (b.getAttribute('data-choice') === item.target) {
            b.classList.add('correct-answer');
          }
        });

        const choice = btn.getAttribute('data-choice');
        if (choice === item.target) {
          btn.classList.add('correct-answer');
          score++;
          speakText(choice);
        } else {
          btn.classList.add('wrong-selected');
        }

        setTimeout(() => {
          currentIdx++;
          render();
        }, 1000);
      });
    });
  };

  render();
}
