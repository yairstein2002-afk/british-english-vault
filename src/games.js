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

export function getAdaptiveGameItems(vaultData, count = 20) {
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
    const fallbacks = shuffleArray(getFallbackVaultItems());
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

export function makeDynamicMC(vaultData, promptKey, answerKey, count = 20) {
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
    { id: 'fb-35', term: 'Brolly', meaning: 'An umbrella', category: 'slangs', example: 'Do not forget your brolly, it is raining cats and dogs!' },
    { id: 'fb-36', term: 'Chinwag', meaning: 'A friendly, informal chat or gossip', category: 'slangs', example: 'We had a lovely chinwag over a pot of tea.' },
    { id: 'fb-37', term: 'Faffing', meaning: 'Wasting time or dallying around', category: 'slangs', example: 'Stop faffing about or we will miss the train!' },
    { id: 'fb-38', term: 'Peculiar', meaning: 'Strange, odd or unusual', category: 'words', example: 'That old clock makes a rather peculiar sound.' },
    { id: 'fb-39', term: 'Bespoke', meaning: 'Custom-made for a particular customer', category: 'words', example: 'He ordered a bespoke suit on Savile Row.' },
    { id: 'fb-40', term: 'Tickety-boo', meaning: 'In good order, fine and satisfactory', category: 'phrases', example: 'Everything is tickety-boo with the project plan.' },
    { id: 'fb-41', term: 'Full of beans', meaning: 'Lively, energetic and in high spirits', category: 'idioms', example: 'The children are full of beans this morning!' },
    { id: 'fb-42', term: 'Donkey\'s years', meaning: 'A very long time', category: 'idioms', example: 'I have not seen him in donkey\'s years!' },
    { id: 'fb-43', term: 'Smashing', meaning: 'Wonderful, excellent or terrific', category: 'slangs', example: 'We had a smashing time in Edinburgh.' },
    { id: 'fb-44', term: 'Gormless', meaning: 'Lacking intelligence or vitality, clueless', category: 'slangs', example: 'He stood there with a gormless expression.' },
    { id: 'fb-45', term: 'Throw a spanner in the works', meaning: 'Disrupt or cause problems for a plan', category: 'idioms', example: 'The sudden storm threw a spanner in the works.' },
    { id: 'fb-46', term: 'peckish', meaning: 'Slightly hungry', category: 'slangs', example: 'I am feeling a bit peckish, fancy a biscuit?' },
    { id: 'fb-47', term: 'Scrummy', meaning: 'Scrumptious, very delicious', category: 'slangs', example: 'Those homemade scones are absolutely scrummy!' },
    { id: 'fb-48', term: 'Cack-handed', meaning: 'Clumsy or awkward with one\'s hands', category: 'slangs', example: 'Sorry, that was rather cack-handed of me!' },
    { id: 'fb-49', term: ' Brass monkeys', meaning: 'Extremely cold weather', category: 'phrases', example: 'Put your coat on, it is brass monkeys outside!' },
    { id: 'fb-50', term: 'Keep your chin up', meaning: 'Stay cheerful in a tough situation', category: 'idioms', example: 'Keep your chin up, things will get better soon!' }
  ];
}

// ==========================================================================
// UNIVERSAL GAME HEADER COMPONENT (Live Score & Progress Bar)
// ==========================================================================

export function renderGameHeader(title, current, total = 20, score = 0) {
  const pct = Math.round(((current - 1) / total) * 100);
  return `
    <div class="game-round-header" style="margin-bottom: 1.25rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; flex-wrap: wrap; gap: 0.5rem;">
        <span class="category-pill" style="margin: 0; font-size: 0.85rem;"><i class="fa-solid fa-gamepad"></i> ${title}</span>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span style="font-weight: 700; color: var(--gold); font-size: 0.95rem;">
            <i class="fa-solid fa-trophy"></i> Score: <span class="score-display">${score}</span>
          </span>
          <span style="font-weight: 700; color: var(--uk-blue); font-size: 0.95rem;">
            Question ${current} of ${total}
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
// 1. GAME: WORD MATCH 🧩 (20 consecutive matching questions)
// ==========================================================================

export function startWordMatchGame(stageEl, vaultData, onComplete = () => {}) {
  const items = getAdaptiveGameItems(vaultData, 20);
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
  const questions = getAdaptiveGameItems(vaultData, 20);
  const allVault = getAllVaultItems(vaultData);
  let currentIdx = 0;
  let score = 0;
  let timerVal = 30;
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
        <span class="timer-badge" id="qc-timer" style="font-weight: 700; color: var(--danger);"><i class="fa-solid fa-clock"></i> <b id="qc-timer-num">30</b>s</span>
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

    timerVal = 30;
    const timerNum = stageEl.querySelector('#qc-timer-num');
    const timerFill = stageEl.querySelector('#qc-timer-fill');

    timerInterval = setInterval(() => {
      timerVal--;
      if (timerNum) timerNum.innerText = timerVal;
      if (timerFill) timerFill.style.width = `${(timerVal / 30) * 100}%`;

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
  const items = getAdaptiveGameItems(vaultData, 20);
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
  const items = getAdaptiveGameItems(vaultData, 20);
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
        <button class="btn btn-secondary" id="btn-clear-scramble"><i class="fa-solid fa-rotate-left"></i> Clear</button>
        <button class="btn btn-primary" id="btn-submit-scramble"><i class="fa-solid fa-circle-check"></i> Submit</button>
        <button class="btn btn-secondary" id="btn-skip-scramble" style="opacity: 0.85;"><i class="fa-solid fa-forward"></i> Skip</button>
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
  const items = getAdaptiveGameItems(vaultData, 20);
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
  const items = getAdaptiveGameItems(vaultData, 20);
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
          <i class="fa-solid fa-volume-high"></i> Listen First (UK Accent)
        </button>

        <div id="speech-recognition-box">
          <button class="speech-btn speaking" id="btn-record-speech" style="width: 75px; height: 75px; font-size: 2rem; margin: 0 auto 0.75rem; border-radius: 50%;">
            <i class="fa-solid fa-microphone"></i>
          </button>
          <p id="speech-status-text" style="font-size: 0.9rem; font-weight: 600;">Tap the microphone and say the word out loud</p>
        </div>
      </div>

      <div class="text-center" style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
        <button class="btn btn-primary" id="btn-verify-pronunciation">
          <i class="fa-solid fa-circle-check"></i> I Pronounced It! (+XP)
        </button>
        <button class="btn btn-secondary" id="btn-skip-sayit">
          <i class="fa-solid fa-forward"></i> Next
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
        statusText.innerText = 'Listening... Speak now!';
        micBtn.classList.add('speaking');
        try {
          recognition.start();
        } catch (e) {}
      });

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        statusText.innerText = `Heard: "${transcript}"`;
        if (transcript.toLowerCase().includes(currentItem.term.toLowerCase())) {
          statusText.innerHTML = `<span style="color: var(--success);">✓ Spot on pronunciation! Heard: "${transcript}"</span>`;
          score++;
          recordGameSuccess(vaultData, currentItem.id);
          setTimeout(() => {
            currentIdx++;
            renderSayIt();
          }, 1200);
        } else {
          statusText.innerHTML = `<span style="color: var(--gold);">Good try! Heard: "${transcript}"</span>`;
        }
      };

      recognition.onerror = () => {
        statusText.innerText = 'Could not access microphone. You can click "I Pronounced It!" below.';
      };
    } else {
      micBtn.addEventListener('click', () => {
        speakText(currentItem.term);
        statusText.innerText = 'Listen to the British pronunciation and repeat it aloud!';
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
  const items = getAdaptiveGameItems(vaultData, 20);
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
            <i class="fa-solid fa-forward"></i> Skip Question
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
    { words: ['Faffing', 'Dawdling', 'Procrastinating', 'Sprint'], oddIndex: 3, reason: '"Sprint" means running fast, while the others mean wasting time.' },
    { words: ['Thames', 'Severn', 'Mersey', 'Ben Nevis'], oddIndex: 3, reason: '"Ben Nevis" is a mountain, while the others are famous British rivers.' },
    { words: ['Oxford', 'Cambridge', 'Edinburgh', 'Heathrow'], oddIndex: 3, reason: '"Heathrow" is an airport, while the others are historic university cities.' },
    { words: ['Earl Grey', 'Darjeeling', 'Assam', 'Stilton'], oddIndex: 3, reason: '"Stilton" is a British cheese, while the others are types of tea.' },
    { words: ['Cheddar', 'Red Leicester', 'Wensleydale', 'Trifle'], oddIndex: 3, reason: '"Trifle" is a sweet dessert, while the others are British cheeses.' },
    { words: ['Dodgy', 'Fishy', 'Suspicious', 'Reliable'], oddIndex: 3, reason: '"Reliable" means trustworthy, while the others mean questionable or risky.' },
    { words: ['Cheeky', 'Impudent', 'Saucy', 'Polite'], oddIndex: 3, reason: '"Polite" means respectful, while the others mean playfully rude.' },
    { words: ['Chinwag', 'Chat', 'Gossip', 'Silence'], oddIndex: 3, reason: '"Silence" is quietness, while the others mean an informal conversation.' },
    { words: ['Smashing', 'Superb', 'Terrific', 'Dreadful'], oddIndex: 3, reason: '"Dreadful" means terrible, while the others mean wonderful.' },
    { words: ['Chemist', 'Butcher', 'Greengrocer', 'Solicitor'], oddIndex: 3, reason: '"Solicitor" is a lawyer, while the others are High Street shops.' },
    { words: ['Double-decker', 'Black cab', 'Tram', 'Postbox'], oddIndex: 3, reason: '"Postbox" is for letters, while the others are forms of British transport.' }
  ];

  const oddSets = shuffleArray(allOddSets).slice(0, 20);
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
// 9. GAME: BUILD THE SENTENCE 💬 (20 consecutive sentence assemblies)
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
    { target: 'That old cottage in the village looks charming.', words: ['That', 'old cottage', 'in the', 'village', 'looks', 'charming.'] },
    { target: 'Don\'t forget to bring your brolly today.', words: ['Don\'t', 'forget to', 'bring', 'your brolly', 'today.'] },
    { target: 'We had a lovely chinwag over a cuppa.', words: ['We had', 'a lovely', 'chinwag', 'over', 'a cuppa.'] },
    { target: 'The Changing of the Guard starts at eleven.', words: ['The', 'Changing of', 'the Guard', 'starts at', 'eleven.'] },
    { target: 'She was gobsmacked when she heard the news.', words: ['She was', 'gobsmacked', 'when she', 'heard', 'the news.'] },
    { target: 'Let us pop down to the local bakery.', words: ['Let us', 'pop down', 'to the', 'local', 'bakery.'] },
    { target: 'He ordered fish and chips with malt vinegar.', words: ['He ordered', 'fish and', 'chips', 'with malt', 'vinegar.'] },
    { target: 'We are going away for a whole fortnight.', words: ['We are', 'going away', 'for a', 'whole', 'fortnight.'] },
    { target: 'I am feeling a bit peckish this afternoon.', words: ['I am', 'feeling', 'a bit', 'peckish', 'this afternoon.'] },
    { target: 'Could you tell me where the nearest tube is?', words: ['Could you', 'tell me', 'where the', 'nearest', 'tube is?'] },
    { target: 'Stop faffing about or we will be late.', words: ['Stop', 'faffing about', 'or we', 'will be', 'late.'] }
  ];

  const sentences = shuffleArray(allSentences).slice(0, 20);
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
        <button class="btn btn-secondary" id="btn-reset-sentence"><i class="fa-solid fa-rotate-left"></i> Reset</button>
        <button class="btn btn-primary" id="btn-check-sentence"><i class="fa-solid fa-circle-check"></i> Check</button>
        <button class="btn btn-secondary" id="btn-skip-sentence" style="opacity: 0.85;"><i class="fa-solid fa-forward"></i> Skip</button>
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
// 10. GAME: ENGLISH QUIZ 🏆 (20 consecutive mixed questions)
// ==========================================================================

export function startEnglishQuizGame(stageEl, vaultData, onComplete = () => {}) {
  const dynamicItems = makeDynamicMC(vaultData, 'term', 'meaning', 20);
  runChoiceGame(stageEl, dynamicItems, '🏆 English Quiz', 'Choose the correct answer for each question:', onComplete);
}

// ==========================================================================
// 11. GAME: SYNONYM HUNT 🧠 (20 consecutive dynamic questions)
// ==========================================================================

export function startSynonymHuntGame(stageEl, vaultData, onComplete = () => {}) {
  const dataset = makeDynamicMC(vaultData, 'term', 'meaning', 20);
  runChoiceGame(stageEl, dataset, '🧠 Synonym Hunt', 'Select the word or meaning that matches best:', onComplete);
}

// ==========================================================================
// 12. GAME: ANTONYM ATTACK ⚔️ (20 consecutive questions from 26 items)
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
    { word: 'Lenient', target: 'Strict', choices: ['Strict', 'Kind', 'Easy', 'Soft'] },
    { word: 'Skint', target: 'Wealthy', choices: ['Wealthy', 'Broke', 'Poor', 'Needy'] },
    { word: 'Dodgy', target: 'Reliable', choices: ['Reliable', 'Risky', 'Shady', 'Uncertain'] },
    { word: 'Daft', target: 'Sensible', choices: ['Sensible', 'Silly', 'Foolish', 'Absurd'] },
    { word: 'Cheeky', target: 'Respectful', choices: ['Respectful', 'Rude', 'Playful', 'Bold'] },
    { word: 'Miserable', target: 'Cheerful', choices: ['Cheerful', 'Gloomy', 'Sad', 'Upset'] },
    { word: 'Permanent', target: 'Temporary', choices: ['Temporary', 'Lasting', 'Eternal', 'Fixed'] },
    { word: 'Vivid', target: 'Dull', choices: ['Dull', 'Bright', 'Clear', 'Colorful'] },
    { word: 'Polite', target: 'Impolite', choices: ['Impolite', 'Courteous', 'Civil', 'Gentle'] },
    { word: 'Mandatory', target: 'Optional', choices: ['Optional', 'Required', 'Forced', 'Vital'] },
    { word: 'Optimistic', target: 'Pessimistic', choices: ['Pessimistic', 'Hopeful', 'Positive', 'Bright'] }
  ];

  const dataset = shuffleArray(allAntonyms).slice(0, 20);
  runChoiceGame(stageEl, dataset, '⚔️ Antonym Attack', 'Select the word with the OPPOSITE meaning:', onComplete);
}

// ==========================================================================
// 13. GAME: DEFINITION DUEL 📖 (20 consecutive definition matches)
// ==========================================================================

export function startDefinitionDuelGame(stageEl, vaultData, onComplete = () => {}) {
  const dataset = makeDynamicMC(vaultData, 'meaning', 'term', 20);
  runChoiceGame(stageEl, dataset, '📖 Definition Duel', 'Which English word or phrase matches this definition?', onComplete);
}

// ==========================================================================
// 14. GAME: WORD LADDER 🪜 (20 consecutive word ladder steps)
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
    { from: 'GOLD', to: 'HOLD', options: ['HOLD', 'BOLD', 'COLD', 'FOLD'], correct: 'HOLD' },
    { from: 'MIND', to: 'MINT', options: ['MINT', 'FIND', 'KIND', 'WIND'], correct: 'MINT' },
    { from: 'WORD', to: 'WORK', options: ['WORK', 'WOOD', 'WOOL', 'WORM'], correct: 'WORK' },
    { from: 'BELL', to: 'BALL', options: ['BALL', 'BELT', 'CELL', 'FELL'], correct: 'BALL' },
    { from: 'KING', to: 'SING', options: ['SING', 'KIND', 'KITE', 'KICK'], correct: 'SING' },
    { from: 'CAKE', to: 'LAKE', options: ['LAKE', 'CARE', 'CAME', 'CAGE'], correct: 'LAKE' },
    { from: 'ROSE', to: 'RISE', options: ['RISE', 'ROPE', 'ROLE', 'RODE'], correct: 'RISE' },
    { from: 'COAT', to: 'BOAT', options: ['BOAT', 'COST', 'COAL', 'COIN'], correct: 'BOAT' },
    { from: 'PARK', to: 'PART', options: ['PART', 'PACK', 'PAST', 'PATH'], correct: 'PART' },
    { from: 'HAND', to: 'BAND', options: ['BAND', 'HARD', 'HALT', 'HALF'], correct: 'BAND' },
    { from: 'WINE', to: 'LINE', options: ['LINE', 'WIDE', 'WIFE', 'WIRE'], correct: 'LINE' },
    { from: 'tall', to: 'WALL', options: ['WALL', 'TALK', 'TAIL', 'TANK'], correct: 'WALL' },
    { from: 'BLUE', to: 'GLUE', options: ['GLUE', 'BLUR', 'CLUB', 'TRUE'], correct: 'GLUE' }
  ];

  const steps = shuffleArray(allSteps).slice(0, 20);
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
// 15. GAME: MISSING LETTER 🔤 (20 consecutive word puzzles)
// ==========================================================================

export function startMissingLetterGame(stageEl, vaultData, onComplete = () => {}) {
  const items = shuffleArray(getAllVaultItems(vaultData)).slice(0, 20);
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
// 16. GAME: SPELL RACE 🏁 (20 consecutive spelling questions)
// ==========================================================================

export function startSpellRaceGame(stageEl, vaultData, onComplete = () => {}) {
  const items = shuffleArray(getAllVaultItems(vaultData)).slice(0, 20);
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
          <i class="fa-solid fa-volume-high"></i> Play Sound 🎧
        </button>

        <div style="max-width: 320px; margin: 0 auto 1.25rem auto;">
          <input type="text" id="spell-input" class="form-control text-center" placeholder="Type word here..." autocomplete="off" autofocus>
        </div>

        <div style="display: flex; justify-content: center; gap: 0.75rem;">
          <button class="btn btn-primary" id="btn-submit-spell"><i class="fa-solid fa-paper-plane"></i> Submit</button>
          <button class="btn btn-secondary" id="btn-skip-spell"><i class="fa-solid fa-forward"></i> Skip</button>
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
// 17. GAME: SENTENCE DETECTIVE 🕵️ (20 consecutive sentence error detections)
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
    { sentence: 'He suggested to go to the British Museum.', error: 'to go', correct: 'going' },
    { sentence: 'She plays the piano very good.', error: 'good', correct: 'well' },
    { sentence: 'Each of the students have a notebook.', error: 'have', correct: 'has' },
    { sentence: 'I have visited Edinburgh last summer.', error: 'have', correct: '(remove "have")' },
    { sentence: 'The informations you gave me were helpful.', error: 'informations', correct: 'information' },
    { sentence: 'He is married with a famous doctor.', error: 'with', correct: 'to' },
    { sentence: 'If I will see him I will tell him.', error: 'will', correct: '(remove first "will")' },
    { sentence: 'She asked me where was the station.', error: 'was', correct: '(station was)' },
    { sentence: 'They enjoyed theirselves at the party.', error: 'theirselves', correct: 'themselves' },
    { sentence: 'This tea is too much hot to drink.', error: 'much', correct: '(remove "much")' },
    { sentence: 'He hasn\'t got no money left.', error: 'no', correct: 'any' },
    { sentence: 'You should to practice English every day.', error: 'to', correct: '(remove "to")' }
  ];

  const dataset = shuffleArray(allDataset).slice(0, 20);
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
// 18. GAME: GRAMMAR BATTLE ⚔️ (20 consecutive questions from 24 items)
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
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'Had I known about the traffic, I would have left earlier.',
      choices: [
        'Had I known about the traffic, I would have left earlier.',
        'If I would have known about the traffic, I left earlier.',
        'Had I knew about the traffic, I would leave earlier.',
        'If I had knew about the traffic, I would have left earlier.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'Scarcely had the match started when it began to pour.',
      choices: [
        'Scarcely had the match started when it began to pour.',
        'Scarcely the match had started than it began to pour.',
        'Scarcely did the match started when it began to pour.',
        'Scarcely had the match start when it began pouring.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'Each of the participants was given a certificate.',
      choices: [
        'Each of the participants was given a certificate.',
        'Each of the participants were given a certificate.',
        'Each of the participant was given a certificate.',
        'Every of the participants were given certificates.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'It is high time we went home.',
      choices: [
        'It is high time we went home.',
        'It is high time we go home.',
        'It is high time we will go home.',
        'It is high time for us going home.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'She denied having taken the confidential folder.',
      choices: [
        'She denied having taken the confidential folder.',
        'She denied to take the confidential folder.',
        'She denied that she has took the confidential folder.',
        'She denied of taking the confidential folder.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'No sooner had I sat down than the phone rang.',
      choices: [
        'No sooner had I sat down than the phone rang.',
        'No sooner had I sat down when the phone rang.',
        'No sooner I sat down than the phone rang.',
        'No sooner did I sat down than the phone rang.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'The news we received this morning is very encouraging.',
      choices: [
        'The news we received this morning is very encouraging.',
        'The news we received this morning are very encouraging.',
        'Many news we received this morning were encouraging.',
        'A news we received this morning is encouraging.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'Despite being exhausted, he finished the marathon.',
      choices: [
        'Despite being exhausted, he finished the marathon.',
        'Despite of being exhausted, he finished the marathon.',
        'Although being exhausted, he finished the marathon.',
        'In spite being exhausted, he finished the marathon.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'I wish I had brought my umbrella today.',
      choices: [
        'I wish I had brought my umbrella today.',
        'I wish I would bring my umbrella today.',
        'I wish I have brought my umbrella today.',
        'I wish I brought my umbrella yesterday.'
      ]
    },
    {
      word: 'Which sentence is grammatically flawless?',
      target: 'Few people know the true story behind the castle.',
      choices: [
        'Few people know the true story behind the castle.',
        'Little people know the true story behind the castle.',
        'Less people knows the true story behind the castle.',
        'Few person know the true story behind the castle.'
      ]
    }
  ];

  const dataset = shuffleArray(allBattles).slice(0, 20);
  runChoiceGame(stageEl, dataset, '⚔️ Grammar Battle', 'Choose the sentence that is grammatically flawless:', onComplete);
}

// ==========================================================================
// 19. GAME: TENSE CHALLENGE ⏳ (20 consecutive verb tense questions)
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
    { word: 'She ________ in Manchester before moving to London.', target: 'had lived', choices: ['had lived', 'has lived', 'lives', 'is living'] },
    { word: 'Water ________ at 100 degrees Celsius.', target: 'boils', choices: ['boils', 'is boiling', 'boiled', 'has boiled'] },
    { word: 'We ________ for the bus for twenty minutes when it finally arrived.', target: 'had been waiting', choices: ['had been waiting', 'have waited', 'were waiting', 'waited'] },
    { word: 'As soon as I ________ home, I will give you a ring.', target: 'get', choices: ['get', 'will get', 'got', 'would get'] },
    { word: 'Shakespeare ________ more than thirty plays during his lifetime.', target: 'wrote', choices: ['wrote', 'has written', 'was writing', 'writes'] },
    { word: 'Listen! Someone ________ the violin upstairs.', target: 'is playing', choices: ['is playing', 'plays', 'played', 'has played'] },
    { word: 'If it rains tomorrow, we ________ the picnic indoors.', target: 'will hold', choices: ['will hold', 'would hold', 'held', 'have held'] },
    { word: 'She ________ three cups of coffee already this morning.', target: 'has drunk', choices: ['has drunk', 'drank', 'is drinking', 'drinks'] },
    { word: 'At 8 PM last night, they ________ dinner at the pub.', target: 'were having', choices: ['were having', 'had', 'have had', 'are having'] },
    { word: 'I ________ to Edinburgh twice so far this year.', target: 'have been', choices: ['have been', 'went', 'was going', 'am going'] },
    { word: 'By 2030, scientists ________ new clean energy solutions.', target: 'will have discovered', choices: ['will have discovered', 'discover', 'discovered', 'are discovering'] },
    { word: 'He promised that he ________ us as soon as he landed.', target: 'would call', choices: ['would call', 'will call', 'calls', 'has called'] },
    { word: 'The train to Oxford ________ from Platform 4 at 9:15 AM every day.', target: 'departs', choices: ['departs', 'is departing', 'departed', 'has departed'] }
  ];

  const dataset = shuffleArray(allTenses).slice(0, 20);
  runChoiceGame(stageEl, dataset, '⏳ Tense Challenge', 'Complete the sentence with the correct verb tense:', onComplete);
}

// ==========================================================================
// 20. GAME: PREPOSITION MASTER 🎯 (20 consecutive preposition questions)
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
    { word: 'Are you familiar _____ British afternoon tea etiquette?', target: 'with', choices: ['with', 'to', 'of', 'in'] },
    { word: 'She is very proud _____ her Scottish heritage.', target: 'of', choices: ['of', 'for', 'with', 'in'] },
    { word: 'The decision depends _____ the weather tomorrow.', target: 'on', choices: ['on', 'of', 'from', 'at'] },
    { word: 'He is responsible _____ managing the entire department.', target: 'for', choices: ['for', 'of', 'to', 'with'] },
    { word: 'I completely agree _____ your assessment of the situation.', target: 'with', choices: ['with', 'to', 'on', 'for'] },
    { word: 'Please refrain _____ smoking on the train platform.', target: 'from', choices: ['from', 'of', 'to', 'by'] },
    { word: 'She prefers Earl Grey tea _____ coffee.', target: 'to', choices: ['to', 'than', 'over', 'from'] },
    { word: 'The museum is open _____ Mondays through Saturdays.', target: 'on', choices: ['on', 'in', 'at', 'by'] },
    { word: 'Our flight leaves _____ 7:30 in the evening.', target: 'at', choices: ['at', 'on', 'in', 'by'] },
    { word: 'He graduated _____ Oxford University with honours.', target: 'from', choices: ['from', 'of', 'at', 'in'] },
    { word: 'She divided the scones equally _____ the four guests.', target: 'among', choices: ['among', 'between', 'into', 'with'] },
    { word: 'Don\'t worry, you can always rely _____ me.', target: 'on', choices: ['on', 'at', 'in', 'to'] },
    { word: 'The cat hid _____ the sofa during the thunderstorm.', target: 'under', choices: ['under', 'above', 'into', 'between'] }
  ];

  const dataset = shuffleArray(allPrepositions).slice(0, 20);
  runChoiceGame(stageEl, dataset, '🎯 Preposition Master', 'Choose the correct preposition:', onComplete);
}

// ==========================================================================
// 21. GAME: ARTICLE CHALLENGE 📝 (20 consecutive article questions)
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
    { word: 'We usually have _____ breakfast at 8:00 AM.', target: 'Ø (No article)', choices: ['Ø (No article)', 'the', 'a', 'an'] },
    { word: 'He is _____ university professor in Cambridge.', target: 'a', choices: ['a', 'an', 'the', 'Ø (No article)'] },
    { word: 'It takes about _____ hour to get there by tube.', target: 'an', choices: ['an', 'a', 'the', 'Ø (No article)'] },
    { word: '_____ sun rises in the east and sets in the west.', target: 'The', choices: ['The', 'A', 'An', 'Ø (No article)'] },
    { word: 'She speaks _____ fluent English and French.', target: 'Ø (No article)', choices: ['Ø (No article)', 'the', 'a', 'an'] },
    { word: 'Could you please close _____ door on your way out?', target: 'the', choices: ['the', 'a', 'an', 'Ø (No article)'] },
    { word: 'That was _____ most exciting match of the season!', target: 'the', choices: ['the', 'a', 'an', 'Ø (No article)'] },
    { word: 'He bought _____ umbrella because it started drizzling.', target: 'an', choices: ['an', 'a', 'the', 'Ø (No article)'] },
    { word: '_____ Mount Everest is the highest peak in the world.', target: 'Ø (No article)', choices: ['Ø (No article)', 'The', 'A', 'An'] },
    { word: 'I saw _____ owl perched on the old oak tree.', target: 'an', choices: ['an', 'a', 'the', 'Ø (No article)'] },
    { word: '_____ rich should help those who are less fortunate.', target: 'The', choices: ['The', 'A', 'An', 'Ø (No article)'] }
  ];

  const dataset = shuffleArray(allArticles).slice(0, 20);
  runChoiceGame(stageEl, dataset, '📝 Article Challenge', 'Choose the correct article:', onComplete);
}

// ==========================================================================
// 22. GAME: NATURAL ENGLISH 🌍 (20 consecutive British phrasing questions)
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
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'Shall we pop round to Sarah\'s house for a cuppa?',
      choices: [
        'Shall we pop round to Sarah\'s house for a cuppa?',
        'Shall we jump circle to Sarah\'s house for tea?',
        'Will we visit into Sarah\'s building for cup?',
        'Do we walk roundly to Sarah for drinking?'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'I\'m afraid I won\'t be able to make it tonight.',
      choices: [
        'I\'m afraid I won\'t be able to make it tonight.',
        'I have fear I cannot construct it tonight.',
        'I am scared I will not do arrival tonight.',
        'Sorry I cannot fabricate the meeting tonight.'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'He always pays close attention to detail.',
      choices: [
        'He always pays close attention to detail.',
        'He always gives near look to details.',
        'He always spends tight attention on detail.',
        'He always buys close focus for detail.'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'Let\'s play it by ear and see how the weather turns out.',
      choices: [
        'Let\'s play it by ear and see how the weather turns out.',
        'Let\'s listen with ear and see weather.',
        'Let\'s music the ear until weather shows.',
        'Let\'s touch ear for weather result.'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'She caught a terrible cold last week.',
      choices: [
        'She caught a terrible cold last week.',
        'She grabbed a bad coldness last week.',
        'She took a freezing sickness last week.',
        'She hunted a cold virus last week.'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'Do you mind if I open the window for some fresh air?',
      choices: [
        'Do you mind if I open the window for some fresh air?',
        'Are you angry if I unclose window for wind?',
        'Do you brain if I open glass for air?',
        'Is it bothering to open window for new air?'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'We had a whale of a time at the festival!',
      choices: [
        'We had a whale of a time at the festival!',
        'We had a big fish of time at the festival!',
        'We owned a shark time at the festival!',
        'We spent a dolphin hour at the festival!'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'I\'ll keep my fingers crossed for your interview tomorrow.',
      choices: [
        'I\'ll keep my fingers crossed for your interview tomorrow.',
        'I\'ll fold my thumbs for your interview tomorrow.',
        'I\'ll tie my hands together for your interview.',
        'I\'ll twist my fingers for your job talk.'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'There is no point crying over spilt milk.',
      choices: [
        'There is no point crying over spilt milk.',
        'There is no sense weeping on dropped milk.',
        'Do not cry above fallen dairy.',
        'No reason to shout at wet milk.'
      ]
    },
    {
      word: 'Which sentence sounds most natural to a native British speaker?',
      target: 'He broke the ice with a witty British joke.',
      choices: [
        'He broke the ice with a witty British joke.',
        'He smashed the snow with a funny British joke.',
        'He cracked the frost by laughing.',
        'He melted the ice cube with humor.'
      ]
    }
  ];

  const dataset = shuffleArray(allNatural).slice(0, 20);
  runChoiceGame(stageEl, dataset, '🌍 Natural English', 'Select the expression that sounds most natural:', onComplete);
}

// ==========================================================================
// 23. GAME: FORMAL OR CASUAL? 🎩 (20 consecutive phrase classifications)
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
    { phrase: 'Yours faithfully, Mr. H. Smith', correct: 'Formal' },
    { phrase: 'Please find attached the quarterly financial report.', correct: 'Formal' },
    { phrase: 'Alright mate, how\'s it going?', correct: 'Casual' },
    { phrase: 'I would appreciate it if you could review this document.', correct: 'Formal' },
    { phrase: 'I\'m proper chuffed with my new motor!', correct: 'Casual' },
    { phrase: 'We regret to inform you that your application was unsuccessful.', correct: 'Formal' },
    { phrase: 'Hang on a sec, I\'ll be right there!', correct: 'Casual' },
    { phrase: 'Thank you for your prompt attention to this matter.', correct: 'Formal' },
    { phrase: 'Let\'s have a quick chinwag over a cuppa.', correct: 'Casual' },
    { phrase: 'I am pleased to accept the invitation to the gala.', correct: 'Formal' },
    { phrase: 'Blimey, it\'s brass monkeys outside today!', correct: 'Casual' }
  ];

  const dataset = shuffleArray(allPhrases).slice(0, 20);
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
          <button class="btn btn-primary fc-btn" data-type="Formal" style="padding: 0.85rem 2rem; font-size: 1.05rem;">🎩 Formal</button>
          <button class="btn btn-secondary fc-btn" data-type="Casual" style="padding: 0.85rem 2rem; font-size: 1.05rem;">🗣️ Casual</button>
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
// 24. GAME: COMPLETE THE CONVERSATION 💬 (20 consecutive dialogues)
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
    },
    {
      word: 'Conductor: "Tickets and railcards, please!"\nCommuter: "_______________"',
      target: 'Here you go! I have a return ticket to Oxford.',
      choices: ['Here you go! I have a return ticket to Oxford.', 'Trains are made of steel.', 'I enjoy reading books.', 'The window is clean.']
    },
    {
      word: 'Friend: "I just passed my driving test on the first attempt!"\nYou: "_______________"',
      target: 'Congratulations! You must be absolutely chuffed!',
      choices: ['Congratulations! You must be absolutely chuffed!', 'Cars use petrol or electricity.', 'Roads are grey.', 'Tuesday is after Monday.']
    },
    {
      word: 'Receptionist: "Good morning, how may I help you?"\nGuest: "_______________"',
      target: 'Hello, I have a reservation under the name Smith.',
      choices: ['Hello, I have a reservation under the name Smith.', 'Morning is before afternoon.', 'The carpet is red.', 'I have a suitcase.']
    },
    {
      word: 'Caller: "Hello, could I speak to Mrs. Evans, please?"\nSecretary: "_______________"',
      target: 'Hold the line a moment, I\'ll put you through.',
      choices: ['Hold the line a moment, I\'ll put you through.', 'Phones ring loudly.', 'Mrs. Evans has brown hair.', 'I am sitting at a desk.']
    },
    {
      word: 'Friend: "Oh no, I left my wallet at home!"\nYou: "_______________"',
      target: 'Don\'t worry, it\'s my treat today—I\'ll cover you.',
      choices: ['Don\'t worry, it\'s my treat today—I\'ll cover you.', 'Wallets are made of leather.', 'Home is where the heart is.', 'Coins are round.']
    },
    {
      word: 'Baker: "What can I get for you this morning, love?"\nCustomer: "_______________"',
      target: 'Two freshly baked scones and a loaf of sourdough, please.',
      choices: ['Two freshly baked scones and a loaf of sourdough, please.', 'Flour is white powder.', 'Ovens are very hot.', 'I walked here today.']
    },
    {
      word: 'Colleague: "Do you mind if I borrow your pen for a second?"\nYou: "_______________"',
      target: 'Not at all, help yourself!',
      choices: ['Not at all, help yourself!', 'Pens contain blue ink.', 'Paper comes from trees.', 'I can write fast.']
    },
    {
      word: 'Guest: "Thank you so much for hosting such a wonderful dinner!"\nHost: "_______________"',
      target: 'It was our pleasure! Thank you for coming.',
      choices: ['It was our pleasure! Thank you for coming.', 'Plates are round.', 'Dinner is eaten in the evening.', 'Forks have four prongs.']
    },
    {
      word: 'Sister: "What do you fancy doing this Saturday?"\nBrother: "_______________"',
      target: 'How about a day trip down to Brighton beach?',
      choices: ['How about a day trip down to Brighton beach?', 'Saturday is the weekend.', 'Beaches have pebbles.', 'The sea is salty.']
    },
    {
      word: 'Customer: "Excuse me, do you have this trench coat in a medium?"\nAssistant: "_______________"',
      target: 'Let me check the stockroom for you right away.',
      choices: ['Let me check the stockroom for you right away.', 'Coats have buttons.', 'Winter is cold.', 'Cotton is soft.']
    },
    {
      word: 'Flatmate: "It\'s pouring with rain outside!"\nYou: "_______________"',
      target: 'Good thing I packed my brolly and wellies!',
      choices: ['Good thing I packed my brolly and wellies!', 'Water falls from clouds.', 'Grass is green.', 'Clouds are high up.']
    }
  ];

  const dataset = shuffleArray(allDialogues).slice(0, 20);
  runChoiceGame(stageEl, dataset, '💬 Complete Conversation', 'Choose the response that completes the conversation naturally:', onComplete);
}

// ==========================================================================
// 25. GAME: STORY BUILDER 📚 (20 consecutive story steps)
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
    { word: 'Inside the manuscript was an ancient map showing...', target: 'a hidden garden deep behind Buckingham Palace', choices: ['a hidden garden deep behind Buckingham Palace', 'the location of a lost shoe store', 'a map of the moon in 3000 BC', 'a recipe for soup'] },
    { word: 'Delighted with the discovery, Oliver and the curator toasted with...', target: 'a proper pot of Earl Grey tea and scones', choices: ['a proper pot of Earl Grey tea and scones', 'a bottle of washing detergent', 'melted ice cubes', 'a glass of seawater'] },
    { word: 'The next morning, they took a classic red double-decker bus towards...', target: 'Westminster Abbey to inspect the royal archives', choices: ['Westminster Abbey to inspect the royal archives', 'the bottom of the Pacific Ocean', 'an active volcano in Hawaii', 'a space station'] },
    { word: 'Outside the abbey, a friendly Beefeater guard handed them...', target: 'an ornate brass key from the Tudor era', choices: ['an ornate brass key from the Tudor era', 'a broken plastic spoon', 'a skateboard with square wheels', 'a snowglobe from Mars'] },
    { word: 'Using the brass key, they opened a heavy oak door leading to...', target: 'a spiral stone staircase lit by lanterns', choices: ['a spiral stone staircase lit by lanterns', 'a bowling alley', 'a car wash', 'a trampoline park'] },
    { word: 'At the top of the tower, they looked out the window and admired...', target: 'the panoramic view of Big Ben and the London Eye', choices: ['the panoramic view of Big Ben and the London Eye', 'the Eiffel Tower and Statue of Liberty', 'a desert full of cacti', 'an icy glacier'] },
    { word: 'On an antique mahogany desk in the corner rested...', target: 'a leather-bound journal signed by Sir Isaac Newton', choices: ['a leather-bound journal signed by Sir Isaac Newton', 'a modern smartphone charger', 'a bag of frozen peas', 'a bicycle tyre'] },
    { word: 'Flipping carefully through the fragile pages, Oliver discovered...', target: 'notes on an ancient clockwork astrolabe', choices: ['notes on an ancient clockwork astrolabe', 'cheat codes for a computer game', 'a grocery list for crisps', 'lyrics to a pop song'] },
    { word: 'Suddenly, the bells of Westminster chimed noon, which caused...', target: 'a secret compartment in the desk to slide open', choices: ['a secret compartment in the desk to slide open', 'gravity to stop working', 'rain to fall upwards', 'the walls to turn pink'] },
    { word: 'Inside the hidden compartment gleamed...', target: 'a golden pocket watch engraved with the Royal Coat of Arms', choices: ['a golden pocket watch engraved with the Royal Coat of Arms', 'a half-eaten cheese sandwich', 'a pair of muddy wellies', 'a tin of baked beans'] },
    { word: 'The curator gasped with joy and declared that the artifact would...', target: 'be the centrepiece of the royal exhibition', choices: ['be the centrepiece of the royal exhibition', 'be thrown into a skip', 'be traded for a bus ticket', 'be used as a paperweight'] },
    { word: 'For his brilliant help, Oliver was honoured with...', target: 'a lifetime fellowship at the British Museum', choices: ['a lifetime fellowship at the British Museum', 'a parking ticket', 'a broken umbrella', 'a cold cup of water'] }
  ];

  const dataset = allStorySteps.slice(0, 20);
  runChoiceGame(stageEl, dataset, '📚 Story Builder', 'Choose the next logical step in the story:', onComplete);
}

// ==========================================================================
// 26. GAME: WORD CATEGORIES 🗂️ (20 consecutive word categorizations)
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
    { word: 'Brolly (Umbrella)', cat: 'Clothing' },
    { word: 'Shepherd\'s pie', cat: 'Food & Drink' },
    { word: 'Roundabout', cat: 'Travel & Transport' },
    { word: 'Jumper (Sweater)', cat: 'Clothing' },
    { word: 'Knackered', cat: 'Emotions' },
    { word: 'Yorkshire pudding', cat: 'Food & Drink' },
    { word: 'Motorway', cat: 'Travel & Transport' },
    { word: 'Trainers (Sneakers)', cat: 'Clothing' },
    { word: 'Miffed', cat: 'Emotions' },
    { word: 'Clotted cream', cat: 'Food & Drink' },
    { word: 'Cardigan', cat: 'Clothing' }
  ];

  const dataset = shuffleArray(allWords).slice(0, 20);
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
// 27. GAME: SPEED READING ⚡ (20 consecutive reading questions)
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
    },
    {
      word: 'Passage: "Oxford University is the oldest university in the English-speaking world, with teaching dating back to 1096."',
      target: '1096',
      choices: ['1096', '1950', '1800', '1650']
    },
    {
      word: 'Passage: "London\'s iconic black cabs require drivers to pass \'The Knowledge\', memorizing 25,000 streets."',
      target: '25,000 streets',
      choices: ['25,000 streets', 'Only 50 streets', '100 motorways', '5 bridges']
    },
    {
      word: 'Passage: "Stonehenge in Wiltshire was built in several stages, with the earliest monument dating back 5,000 years."',
      target: '5,000 years ago',
      choices: ['5,000 years ago', '200 years ago', 'In the 1960s', 'During World War II']
    },
    {
      word: 'Passage: "William Shakespeare was born in Stratford-upon-Avon and wrote 37 plays and 154 sonnets."',
      target: 'Stratford-upon-Avon',
      choices: ['Stratford-upon-Avon', 'Manchester', 'Edinburgh', 'Liverpool']
    },
    {
      word: 'Passage: "The River Thames flows 215 miles through southern England, making it the longest river entirely in England."',
      target: '215 miles',
      choices: ['215 miles', '10 miles', '5,000 miles', '50 yards']
    },
    {
      word: 'Passage: "The British Library in London holds over 170 million items from every age of written civilization."',
      target: 'Over 170 million items',
      choices: ['Over 170 million items', 'Only 500 books', '10,000 magazines', 'A few dozen scrolls']
    },
    {
      word: 'Passage: "In the UK, driving on the left side of the road became official law across the country in 1835."',
      target: 'Left side of the road',
      choices: ['Left side of the road', 'Right side of the road', 'Middle of the pavement', 'Only on Sundays']
    },
    {
      word: 'Passage: "Edinburgh Castle sits atop Castle Rock, an extinct volcanic plug in the heart of Scotland\'s capital."',
      target: 'An extinct volcanic plug',
      choices: ['An extinct volcanic plug', 'A floating island', 'A sandy beach', 'An artificial glass tower']
    },
    {
      word: 'Passage: "A traditional Sunday roast consists of roasted meat, roast potatoes, vegetables, gravy, and Yorkshire pudding."',
      target: 'Yorkshire pudding and roast meat',
      choices: ['Yorkshire pudding and roast meat', 'Sushi and miso soup', 'Tacos and salsa', 'Croissants and jam']
    },
    {
      word: 'Passage: "Greenwich Mean Time (GMT) is measured from the Royal Observatory in Greenwich, London."',
      target: 'Royal Observatory in Greenwich',
      choices: ['Royal Observatory in Greenwich', 'Cardiff Castle', 'Belfast Harbour', 'Brighton Pier']
    },
    {
      word: 'Passage: "The red telephone box was designed by Sir Giles Gilbert Scott in 1924 to commemorate King George V\'s Silver Jubilee."',
      target: 'Sir Giles Gilbert Scott',
      choices: ['Sir Giles Gilbert Scott', 'Winston Churchill', 'Charles Darwin', 'Alexander Fleming']
    },
    {
      word: 'Passage: "The Channel Tunnel, or \'Chunnel\', connects Folkestone in Kent with Coquelles in northern France beneath the sea."',
      target: 'England and northern France',
      choices: ['England and northern France', 'London and New York', 'Scotland and Norway', 'Wales and Spain']
    }
  ];

  const dataset = shuffleArray(allPassages).slice(0, 20);
  runChoiceGame(stageEl, dataset, '⚡ Speed Reading', 'Read the passage and choose the correct answer:', onComplete);
}

// ==========================================================================
// 28. GAME: TRUE OR FALSE? ✅❌ (20 consecutive facts)
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
    { statement: 'In British English, a "flat" is what Americans call an "apartment".', target: 'True' },
    { statement: 'In British English, the "boot" of a car is the front engine cover.', target: 'False' },
    { statement: '"Crisps" in the UK are thin, crunchy potato chips sold in bags.', target: 'True' },
    { statement: '"Gobsmacked" means being utterly astonished or amazed.', target: 'True' },
    { statement: 'In British English, a "jumper" is a warm knitted sweater.', target: 'True' },
    { statement: 'A "lorry" in British English means a small bicycle.', target: 'False' },
    { statement: '"Cheeky" often describes someone who is playfully bold or slightly impudent.', target: 'True' },
    { statement: 'The River Seine flows through the centre of London.', target: 'False' },
    { statement: '"Ta" is an informal British way of saying "thank you".', target: 'True' },
    { statement: 'In the UK, the "ground floor" is the same as the 10th floor.', target: 'False' },
    { statement: 'A "quid" is British slang for one pound sterling (£1).', target: 'True' }
  ];

  const questions = shuffleArray(allStatements).slice(0, 20);
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
          <button class="btn btn-primary tf-btn" data-ans="True" style="padding: 0.85rem 2rem; font-size: 1.1rem;">✅ True</button>
          <button class="btn btn-secondary tf-btn" data-ans="False" style="padding: 0.85rem 2rem; font-size: 1.1rem;">❌ False</button>
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
// 29. GAME: MEMORY CHALLENGE 🧠 (20 consecutive fast-recall rounds)
// ==========================================================================

export function startMemoryChallengeGame(stageEl, vaultData, onComplete = () => {}) {
  const allVault = getAllVaultItems(vaultData);
  const rounds = shuffleArray(allVault).slice(0, 20);
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
// 30. GAME: WORD CHAIN 🔗 (20 consecutive word chain links)
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
    { start: 'DAPPER', lastLetter: 'R', choices: ['Royal', 'Common', 'Cheap', 'Wild'], correct: 'Royal' },
    { start: 'ROYAL', lastLetter: 'L', choices: ['Lorry', 'Bus', 'Train', 'Cab'], correct: 'Lorry' },
    { start: 'LORRY', lastLetter: 'Y', choices: ['Yorkshire', 'Cornwall', 'Devon', 'Kent'], correct: 'Yorkshire' },
    { start: 'YORKSHIRE', lastLetter: 'E', choices: ['Empire', 'Kingdom', 'Crown', 'Palace'], correct: 'Empire' },
    { start: 'EMPIRE', lastLetter: 'E', choices: ['Earl', 'Duke', 'Baron', 'Knight'], correct: 'Earl' },
    { start: 'EARL', lastLetter: 'L', choices: ['Lovely', 'Jolly', 'Cheeky', 'Posh'], correct: 'Lovely' },
    { start: 'LOVELY', lastLetter: 'Y', choices: ['Yeoman', 'Guard', 'Soldier', 'Watchman'], correct: 'Yeoman' },
    { start: 'YEOMAN', lastLetter: 'N', choices: ['Natter', 'Chat', 'Gossip', 'Whisper'], correct: 'Natter' },
    { start: 'NATTER', lastLetter: 'R', choices: ['Rubbish', 'Trash', 'Litter', 'Waste'], correct: 'Rubbish' },
    { start: 'RUBBISH', lastLetter: 'H', choices: ['Hamlet', 'Macbeth', 'Othello', 'Tempest'], correct: 'Hamlet' },
    { start: 'HAMLET', lastLetter: 'T', choices: ['Teapot', 'Kettle', 'Saucer', 'Mug'], correct: 'Teapot' }
  ];

  const chain = shuffleArray(allChain).slice(0, 20);
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
// 31. GAME: CATEGORY RUSH 🚀 (20 consecutive rapid identification questions)
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
    { targetCat: 'Transport', correct: 'Black cab', options: ['Black cab', 'Black tea', 'Blackberry', 'Blackboard'] },
    { targetCat: 'Food & Drink', correct: 'Bangers and mash', options: ['Bangers and mash', 'Bonnet and boot', 'Bricks and mortar', 'Bowler and cane'] },
    { targetCat: 'London Landmarks', correct: 'Tower Bridge', options: ['Tower Bridge', 'Golden Gate', 'Brooklyn Bridge', 'Sydney Harbour'] },
    { targetCat: 'Clothing', correct: 'Wellies', options: ['Wellies', 'Waffles', 'Walnuts', 'Whistles'] },
    { targetCat: 'Transport', correct: 'Roundabout', options: ['Roundabout', 'Roast beef', 'Raincoat', 'Rucksack'] },
    { targetCat: 'British Currency', correct: 'Quid', options: ['Quid', 'Quarter', 'Quiche', 'Quarry'] },
    { targetCat: 'London Landmarks', correct: 'Buckingham Palace', options: ['Buckingham Palace', 'Versailles', 'White House', 'Taj Mahal'] },
    { targetCat: 'Food & Drink', correct: 'Yorkshire Pudding', options: ['Yorkshire Pudding', 'Piccadilly Circus', 'Paddington Station', 'Sherwood Forest'] },
    { targetCat: 'British Slang', correct: 'Dodgy', options: ['Dodgy', 'Dolphin', 'Domino', 'Doctor'] },
    { targetCat: 'Clothing', correct: 'Jumper', options: ['Jumper', 'Junction', 'Journal', 'Jubilee'] },
    { targetCat: 'British Currency', correct: 'Tenner', options: ['Tenner', 'Tennis', 'Terrace', 'Thistle'] }
  ];

  const dataset = shuffleArray(allRush).slice(0, 20);
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
// 32. GAME: FORBIDDEN WORD 🚫 (20 consecutive taboo word puzzles)
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
    { word: 'Clue: Official London residence of the British Monarch.\nForbidden words: [queen, king, palace]', target: 'Buckingham Palace', choices: ['Buckingham Palace', 'Windsor', 'Westminster', 'Whitehall'] },
    { word: 'Clue: Iconic two-storey red vehicle that drives along London streets.\nForbidden words: [bus, red, wheels]', target: 'Double-decker', choices: ['Double-decker', 'Helicopter', 'Submarine', 'Scooter'] },
    { word: 'Clue: Waterproof rubber boots worn in muddy British fields.\nForbidden words: [boots, rain, shoes]', target: 'Wellies', choices: ['Wellies', 'Sandals', 'Slippers', 'Flip-flops'] },
    { word: 'Clue: British slang term for having no money at all.\nForbidden words: [poor, money, broke]', target: 'Skint', choices: ['Skint', 'Wealthy', 'Generous', 'Greedy'] },
    { word: 'Clue: Giant Ferris wheel on the South Bank of the River Thames.\nForbidden words: [wheel, circle, ride]', target: 'London Eye', choices: ['London Eye', 'Tower of London', 'Hyde Park', 'Trafalgar Square'] },
    { word: 'Clue: British word for a warm knitted garment worn over a shirt.\nForbidden words: [sweater, wool, warm]', target: 'Jumper', choices: ['Jumper', 'Trousers', 'Socks', 'Gloves'] },
    { word: 'Clue: British slang for being completely shocked or astonished.\nForbidden words: [surprised, shocked, mouth]', target: 'Gobsmacked', choices: ['Gobsmacked', 'Sleepy', 'Calm', 'Careless'] },
    { word: 'Clue: Circular traffic junction where cars drive around a central island.\nForbidden words: [circle, traffic, turn]', target: 'Roundabout', choices: ['Roundabout', 'Crosswalk', 'Bridge', 'Tunnel'] },
    { word: 'Clue: The rear storage compartment of a car in British English.\nForbidden words: [trunk, car, back]', target: 'Boot', choices: ['Boot', 'Bonnet', 'Steering wheel', 'Exhaust'] },
    { word: 'Clue: A polite line of people waiting patiently for their turn.\nForbidden words: [line, wait, stand]', target: 'Queue', choices: ['Queue', 'Crowd', 'Mob', 'Parade'] },
    { word: 'Clue: Informal British slang for a five-pound banknote (£5).\nForbidden words: [five, pounds, money]', target: 'Fiver', choices: ['Fiver', 'Tenner', 'Penny', 'Shilling'] },
    { word: 'Clue: Traditional British dish of sausages served with mashed potatoes.\nForbidden words: [sausage, potato, onion]', target: 'Bangers and Mash', choices: ['Bangers and Mash', 'Roast Chicken', 'Beef Wellington', 'Cornish Pasty'] },
    { word: 'Clue: Ancient prehistoric ring of standing stones in Wiltshire.\nForbidden words: [stones, rocks, circle]', target: 'Stonehenge', choices: ['Stonehenge', 'Hadrian\'s Wall', 'Roman Baths', 'Edinburgh Castle'] }
  ];

  const dataset = shuffleArray(allForbidden).slice(0, 20);
  runChoiceGame(stageEl, dataset, '🚫 Forbidden Word', 'Guess the target word from the clue (without the forbidden words):', onComplete);
}

// ==========================================================================
// 33. GAME: ENGLISH TRIVIA 🌎 (20 consecutive British trivia questions)
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
    { word: 'How many weeks are in a British "fortnight"?', target: 'Two weeks', choices: ['Two weeks', 'Four weeks', 'One week', 'Three weeks'] },
    { word: 'Which Scottish loch is famous for legends of a mythical underwater monster?', target: 'Loch Ness', choices: ['Loch Ness', 'Loch Lomond', 'Lake Windermere', 'Serpentine Lake'] },
    { word: 'What is the capital city of Scotland?', target: 'Edinburgh', choices: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Inverness'] },
    { word: 'What is the capital city of Wales?', target: 'Cardiff', choices: ['Cardiff', 'Swansea', 'Newport', 'Bangor'] },
    { word: 'Which English city is world-famous as the birthplace of The Beatles?', target: 'Liverpool', choices: ['Liverpool', 'Manchester', 'Birmingham', 'Bristol'] },
    { word: 'What is the name of the ceremonial guards at the Tower of London?', target: 'Yeoman Warders (Beefeaters)', choices: ['Yeoman Warders (Beefeaters)', 'Swiss Guards', 'Royal Marines', 'Highlanders'] },
    { word: 'Which British author wrote "Pride and Prejudice" and "Sense and Sensibility"?', target: 'Jane Austen', choices: ['Jane Austen', 'Charlotte Brontë', 'Agatha Christie', 'Virginia Woolf'] },
    { word: 'Which British detective created by Sir Arthur Conan Doyle lived at 221B Baker Street?', target: 'Sherlock Holmes', choices: ['Sherlock Holmes', 'Hercule Poirot', 'Miss Marple', 'Inspector Morse'] },
    { word: 'What flower is the national emblem of England?', target: 'The Tudor Rose', choices: ['The Tudor Rose', 'The Thistle', 'The Daffodil', 'The Shamrock'] },
    { word: 'What is the name of the flag of the United Kingdom?', target: 'The Union Jack', choices: ['The Union Jack', 'The Stars and Stripes', 'The Tricolour', 'The Southern Cross'] },
    { word: 'Which London square features Nelson\'s Column and four giant bronze lions?', target: 'Trafalgar Square', choices: ['Trafalgar Square', 'Parliament Square', 'Russell Square', 'Soho Square'] }
  ];

  const dataset = shuffleArray(allTrivia).slice(0, 20);
  runChoiceGame(stageEl, dataset, '🌎 English Trivia', 'Answer the British English trivia question:', onComplete);
}

// ==========================================================================
// 34. GAME: WORD CONNECTIONS 🧩 (20 consecutive word connection groups)
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
    { word: 'Words: [Oxford, Cambridge, Imperial, UCL]', target: 'Top British Universities', choices: ['Top British Universities', 'London Hospitals', 'Museums', 'Bookstores'] },
    { word: 'Words: [England, Scotland, Wales, Northern Ireland]', target: 'Countries of the United Kingdom', choices: ['Countries of the United Kingdom', 'Channel Islands', 'London Boroughs', 'Counties of Kent'] },
    { word: 'Words: [Hamlet, Macbeth, Othello, King Lear]', target: 'Shakespearean Tragedies', choices: ['Shakespearean Tragedies', 'Charles Dickens Novels', 'British Operas', 'Modern Films'] },
    { word: 'Words: [Heathrow, Gatwick, Stansted, Luton]', target: 'London Airports', choices: ['London Airports', 'Seaports', 'Underground Depots', 'Royal Castles'] },
    { word: 'Words: [Paddington, King\'s Cross, Waterloo, Victoria]', target: 'Major London Train Termini', choices: ['Major London Train Termini', 'British Prime Ministers', 'Famous Poets', 'Tennis Champions'] },
    { word: 'Words: [Cheddar, Stilton, Red Leicester, Wensleydale]', target: 'British Cheeses', choices: ['British Cheeses', 'Apple Varieties', 'Tea Brands', 'Wool Fabrics'] },
    { word: 'Words: [Drizzle, Downpour, Mizzle, Overcast]', target: 'British Weather Terms', choices: ['British Weather Terms', 'Cooking Methods', 'Gardening Tools', 'Sailing Terms'] },
    { word: 'Words: [Jumper, Waistcoat, Cardigan, Trousers]', target: 'British Clothing Terms', choices: ['British Clothing Terms', 'Shoe Brands', 'Bedding Items', 'Curtain Styles'] },
    { word: 'Words: [Thames, Severn, Trent, Mersey]', target: 'Major British Rivers', choices: ['Major British Rivers', 'Mountain Ranges', 'Coastal Towns', 'Ancient Forests'] },
    { word: 'Words: [Tudor, Stuart, Georgian, Victorian]', target: 'British Historical Eras', choices: ['British Historical Eras', 'Architectural Columns', 'Football Leagues', 'Newspaper Titles'] },
    { word: 'Words: [Ta, Cheers, Brill, Ace]', target: 'Casual British Exclamations', choices: ['Casual British Exclamations', 'Card Games', 'Pub Drinks', 'Postcodes'] }
  ];

  const dataset = shuffleArray(allConnections).slice(0, 20);
  runChoiceGame(stageEl, dataset, '🧩 Word Connections', 'What is the common connection between these 4 items?', onComplete);
}

// ==========================================================================
// HELPER CHOICE RUNNER FOR MULTIPLE CHOICE GAMES (20 questions, audio, progress)
// ==========================================================================

function runChoiceGame(stageEl, dataset, title, promptText, onComplete) {
  let currentIdx = 0;
  let score = 0;
  const questions = dataset.slice(0, 20);

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
