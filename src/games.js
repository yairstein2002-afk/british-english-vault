/**
 * British English Vault - Interactive Games & Gamification Engine
 * Implements 10 mini-games, XP levels, Coins, Streaks, Daily Challenge, and Spaced Repetition.
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

export function getAdaptiveGameItems(vaultData, count = 5) {
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

  // Fallbacks if vault items are few
  if (selected.length < count) {
    const fallbacks = getFallbackVaultItems();
    for (const fb of fallbacks) {
      if (selected.length >= count) break;
      if (!selected.some(s => s.term.toLowerCase() === fb.term.toLowerCase())) {
        selected.push(fb);
      }
    }
  }

  return selected;
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

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getFallbackVaultItems() {
  return [
    { id: 'fb-1', term: 'Chuffed', meaning: 'Very pleased or happy', category: 'slangs', example: 'I was absolutely chuffed with my exam results.' },
    { id: 'fb-2', term: 'Knackered', meaning: 'Extremely tired, exhausted', category: 'slangs', example: 'After walking across London all day, I am knackered.' },
    { id: 'fb-3', term: 'Gobsmacked', meaning: 'Astonished or deeply shocked', category: 'slangs', example: 'She was gobsmacked when she won the award.' },
    { id: 'fb-4', term: 'Gutted', meaning: 'Bitterly disappointed', category: 'slangs', example: 'We were gutted when our train was cancelled.' },
    { id: 'fb-5', term: 'Skint', meaning: 'Having no money, broke', category: 'slangs', example: 'I can\'t go to the cinema tonight because I\'m skint.' },
    { id: 'fb-6', term: 'Fancy a cuppa?', meaning: 'Would you like a cup of tea?', category: 'phrases', example: 'Come in from the cold! Fancy a cuppa?' },
    { id: 'fb-7', term: 'Piece of cake', meaning: 'Something very easy to do', category: 'idioms', example: 'Don\'t worry, the exam will be a piece of cake.' },
    { id: 'fb-8', term: 'Bite the bullet', meaning: 'Face a difficult situation with courage', category: 'idioms', example: 'I decided to bite the bullet and speak to the boss.' }
  ];
}

// ==========================================================================
// 1. GAME: WORD MATCH 🧩
// ==========================================================================

export function startWordMatchGame(stageEl, vaultData, onComplete = () => {}) {
  const items = getAdaptiveGameItems(vaultData, 5);
  let selectedLeft = null;
  let selectedRight = null;
  let matchesFound = 0;
  let mistakes = 0;
  const startTime = Date.now();

  const leftCards = shuffleArray(items.map(item => ({ id: item.id, text: item.term })));
  const rightCards = shuffleArray(items.map(item => ({ id: item.id, text: item.meaning })));

  stageEl.innerHTML = `
    <div class="game-instructions text-center" style="margin-bottom: 1.5rem;">
      <h4>🧩 Word Match</h4>
      <p style="color: var(--text-muted); font-size: 0.9rem;">Tap an English term on the left, then tap its matching meaning on the right.</p>
    </div>

    <div class="match-game-grid">
      <div class="match-column" id="match-col-left">
        ${leftCards.map(c => `
          <button class="match-card left-card" data-id="${c.id}">${c.text}</button>
        `).join('')}
      </div>
      <div class="match-column" id="match-col-right">
        ${rightCards.map(c => `
          <button class="match-card right-card" data-id="${c.id}">${c.text}</button>
        `).join('')}
      </div>
    </div>
  `;

  const leftBtns = stageEl.querySelectorAll('.left-card');
  const rightBtns = stageEl.querySelectorAll('.right-card');

  const checkPair = () => {
    if (!selectedLeft || !selectedRight) return;

    const leftId = selectedLeft.getAttribute('data-id');
    const rightId = selectedRight.getAttribute('data-id');

    if (leftId === rightId) {
      // Correct Match!
      selectedLeft.classList.remove('selected');
      selectedRight.classList.remove('selected');
      selectedLeft.classList.add('matched');
      selectedRight.classList.add('matched');
      selectedLeft.disabled = true;
      selectedRight.disabled = true;

      recordGameSuccess(vaultData, leftId);
      matchesFound++;
      selectedLeft = null;
      selectedRight = null;

      if (matchesFound === items.length) {
        const timeTakenSec = Math.round((Date.now() - startTime) / 1000);
        const speedBonus = Math.max(0, 30 - timeTakenSec);
        const xpEarned = 25 + speedBonus - (mistakes * 2);
        const coinsEarned = 10;
        
        onComplete({
          title: 'Word Match Complete! 🧩',
          xp: Math.max(10, xpEarned),
          coins: coinsEarned,
          details: `Matched 5 pairs in ${timeTakenSec} seconds with ${mistakes} mistakes.`
        });
      }
    } else {
      // Mismatch
      mistakes++;
      const itemObj = items.find(i => i.id === leftId);
      if (itemObj) recordGameMistake(vaultData, itemObj.id);

      selectedLeft.classList.add('mismatch');
      selectedRight.classList.add('mismatch');

      setTimeout(() => {
        if (selectedLeft) selectedLeft.classList.remove('selected', 'mismatch');
        if (selectedRight) selectedRight.classList.remove('selected', 'mismatch');
        selectedLeft = null;
        selectedRight = null;
      }, 600);
    }
  };

  leftBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('matched')) return;
      leftBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedLeft = btn;
      checkPair();
    });
  });

  rightBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('matched')) return;
      rightBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedRight = btn;
      checkPair();
    });
  });
}

// ==========================================================================
// 2. GAME: QUICK CHOICE ⚡
// ==========================================================================

export function startQuickChoiceGame(stageEl, vaultData, onComplete = () => {}) {
  const questions = getAdaptiveGameItems(vaultData, 5);
  let currentIdx = 0;
  let score = 0;
  let timerVal = 10;
  let timerInterval = null;

  const renderQuestion = () => {
    clearInterval(timerInterval);
    if (currentIdx >= questions.length) {
      const isPerfect = score === questions.length;
      onComplete({
        title: 'Quick Choice Finished! ⚡',
        xp: score * 10 + (isPerfect ? 20 : 0),
        coins: score * 3,
        details: `Scored ${score} out of ${questions.length} rapid-fire questions!`
      });
      return;
    }

    const currentItem = questions[currentIdx];
    const allItems = vaultData.items || getFallbackVaultItems();
    
    let distractors = allItems
      .filter(i => i.id !== currentItem.id)
      .map(i => i.meaning);
    
    distractors = shuffleArray(distractors).slice(0, 3);
    const options = shuffleArray([
      { text: currentItem.meaning, correct: true },
      ...distractors.map(d => ({ text: d, correct: false }))
    ]);

    stageEl.innerHTML = `
      <div class="quick-choice-header" style="margin-bottom: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span>Question ${currentIdx + 1} of ${questions.length}</span>
          <span class="timer-badge" id="qc-timer"><i class="fa-solid fa-clock"></i> <b id="qc-timer-num">10</b>s</span>
        </div>
        <div class="game-xp-bar-container">
          <div class="game-xp-bar-fill" id="qc-timer-fill" style="width: 100%; transition: width 1s linear;"></div>
        </div>
      </div>

      <div class="card text-center" style="padding: 1.75rem 1rem; margin-bottom: 1.5rem;">
        <span class="category-pill" style="margin-bottom: 0.5rem; display: inline-block;">${currentItem.category || 'Vocabulary'}</span>
        <h3 style="font-size: 2rem; font-family: 'Playfair Display', serif; margin: 0.5rem 0;">${currentItem.term}</h3>
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

    timerVal = 10;
    const timerNum = document.getElementById('qc-timer-num');
    const timerFill = document.getElementById('qc-timer-fill');

    timerInterval = setInterval(() => {
      timerVal--;
      if (timerNum) timerNum.innerText = timerVal;
      if (timerFill) timerFill.style.width = `${(timerVal / 10) * 100}%`;

      if (timerVal <= 0) {
        clearInterval(timerInterval);
        recordGameMistake(vaultData, currentItem.id);
        currentIdx++;
        renderQuestion();
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
// 3. GAME: FILL THE GAP 📝
// ==========================================================================

export function startFillGapGame(stageEl, vaultData, onComplete = () => {}) {
  const items = getAdaptiveGameItems(vaultData, 5);
  let currentIdx = 0;
  let score = 0;

  const renderGapQuestion = () => {
    if (currentIdx >= items.length) {
      onComplete({
        title: 'Fill the Gap Complete! 📝',
        xp: score * 12,
        coins: score * 2,
        details: `You successfully completed ${score} out of ${items.length} sentences!`
      });
      return;
    }

    const currentItem = items[currentIdx];
    const sentence = currentItem.example || `I felt extremely ${currentItem.term} yesterday.`;
    
    // Mask term in sentence with _____
    const regex = new RegExp(`\\b${escapeRegExp(currentItem.term)}\\b`, 'gi');
    const maskedSentence = sentence.replace(regex, '__________');

    const distractors = (vaultData.items || getFallbackVaultItems())
      .filter(i => i.id !== currentItem.id)
      .map(i => i.term);

    const choices = shuffleArray([
      { text: currentItem.term, correct: true },
      ...shuffleArray(distractors).slice(0, 3).map(d => ({ text: d, correct: false }))
    ]);

    stageEl.innerHTML = `
      <div class="card text-center" style="padding: 2rem 1.5rem; margin-bottom: 1.5rem;">
        <span class="category-pill">Sentence Gap Fill</span>
        <h3 style="font-size: 1.3rem; margin: 1.5rem 0; line-height: 1.6;" id="gap-sentence">"${maskedSentence}"</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem;">Clue Meaning: <b>${currentItem.meaning}</b></p>
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
          // Play full sentence audio out loud!
          await speakText(sentence);
        } else {
          btn.classList.add('wrong-selected');
          recordGameMistake(vaultData, currentItem.id);
        }

        setTimeout(() => {
          currentIdx++;
          renderGapQuestion();
        }, 1200);
      });
    });
  };

  renderGapQuestion();
}

// ==========================================================================
// 4. GAME: WORD SCRAMBLE 🔤
// ==========================================================================

export function startWordScrambleGame(stageEl, vaultData, onComplete = () => {}) {
  const items = getAdaptiveGameItems(vaultData, 4);
  let currentIdx = 0;
  let score = 0;

  const renderScramble = () => {
    if (currentIdx >= items.length) {
      onComplete({
        title: 'Word Scramble Solved! 🔤',
        xp: score * 15,
        coins: score * 4,
        details: `Successfully unscrambled ${score} out of ${items.length} words!`
      });
      return;
    }

    const currentItem = items[currentIdx];
    const targetWord = currentItem.term.toUpperCase();
    const letters = shuffleArray(targetWord.split(''));
    let currentInput = [];

    stageEl.innerHTML = `
      <div class="card text-center" style="padding: 1.75rem; margin-bottom: 1.5rem;">
        <span class="category-pill">Unscramble the word</span>
        <h4 style="margin-top: 0.75rem; color: var(--text-muted);">Clue: ${currentItem.meaning}</h4>
        
        <!-- Answer Slots -->
        <div class="scramble-slots" id="scramble-slots" style="display: flex; justify-content: center; gap: 0.5rem; margin: 1.5rem 0; flex-wrap: wrap;">
          ${Array.from({ length: targetWord.length }).map(() => `
            <div class="scramble-slot">_</div>
          `).join('')}
        </div>
      </div>

      <!-- Scrambled Letter Buttons -->
      <div class="scramble-letters-grid" id="scramble-letters" style="display: flex; justify-content: center; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
        ${letters.map((char, idx) => `
          <button class="scramble-tile-btn" data-char="${char}" data-idx="${idx}">${char}</button>
        `).join('')}
      </div>

      <div style="display: flex; justify-content: center; gap: 0.75rem;">
        <button class="btn btn-secondary" id="btn-clear-scramble"><i class="fa-solid fa-rotate-left"></i> Clear</button>
        <button class="btn btn-primary" id="btn-submit-scramble"><i class="fa-solid fa-circle-check"></i> Submit</button>
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
        }, 1200);
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
// 5. GAME: LISTEN & CHOOSE 🎧
// ==========================================================================

export function startListenChooseGame(stageEl, vaultData, onComplete = () => {}) {
  const items = getAdaptiveGameItems(vaultData, 5);
  let currentIdx = 0;
  let score = 0;

  const renderListen = () => {
    if (currentIdx >= items.length) {
      onComplete({
        title: 'Listening Master! 🎧',
        xp: score * 12,
        coins: score * 3,
        details: `Accurately identified ${score} out of ${items.length} spoken audio clips!`
      });
      return;
    }

    const currentItem = items[currentIdx];
    const choices = shuffleArray([
      { text: currentItem.term, correct: true },
      ...shuffleArray((vaultData.items || getFallbackVaultItems()).filter(i => i.id !== currentItem.id))
        .slice(0, 3)
        .map(d => ({ text: d.term, correct: false }))
    ]);

    stageEl.innerHTML = `
      <div class="card text-center" style="padding: 2.5rem 1.5rem; margin-bottom: 1.5rem;">
        <span class="category-pill">Listening Comprehension</span>
        <div style="margin: 1.5rem 0;">
          <button class="speech-btn text-speech-trigger" id="btn-play-listen-audio" style="width: 70px; height: 70px; font-size: 2rem; margin: 0 auto;">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Tap the speaker button to hear the UK English word, then choose what you heard.</p>
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
    // Play automatically when loaded
    setTimeout(playAudio, 300);

    stageEl.querySelectorAll('.listen-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.getAttribute('data-correct') === 'true';
        stageEl.querySelectorAll('.listen-opt-btn').forEach(b => b.disabled = true);

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
        }, 1200);
      });
    });
  };

  renderListen();
}

// ==========================================================================
// 6. GAME: SAY IT (SPEAKING PRACTICE) 🗣️
// ==========================================================================

export function startSayItGame(stageEl, vaultData, onComplete = () => {}) {
  const items = getAdaptiveGameItems(vaultData, 4);
  let currentIdx = 0;
  let score = 0;

  const renderSayIt = () => {
    if (currentIdx >= items.length) {
      onComplete({
        title: 'Pronunciation Champion! 🗣️',
        xp: score * 15,
        coins: score * 4,
        details: `Practiced ${score} British expressions out loud!`
      });
      return;
    }

    const currentItem = items[currentIdx];

    stageEl.innerHTML = `
      <div class="card text-center" style="padding: 2rem 1.5rem; margin-bottom: 1.5rem;">
        <span class="category-pill">Pronunciation & Speech</span>
        <h3 style="font-size: 2rem; font-family: 'Playfair Display', serif; margin: 1rem 0;">${currentItem.term}</h3>
        <p style="color: var(--text-muted); margin-bottom: 1rem;">"${currentItem.example || currentItem.meaning}"</p>
        
        <button class="btn btn-secondary" id="btn-listen-target" style="margin-bottom: 1.5rem;">
          <i class="fa-solid fa-volume-high"></i> Listen First (UK Accent)
        </button>

        <div id="speech-recognition-box">
          <button class="speech-btn speaking" id="btn-record-speech" style="width: 80px; height: 80px; font-size: 2.2rem; margin: 0 auto 1rem;">
            <i class="fa-solid fa-microphone"></i>
          </button>
          <p id="speech-status-text" style="font-size: 0.9rem; font-weight: 600;">Tap mic and speak out loud!</p>
        </div>
      </div>

      <div class="text-center" style="display: flex; justify-content: center; gap: 1rem;">
        <button class="btn btn-primary" id="btn-verify-pronunciation">
          <i class="fa-solid fa-circle-check"></i> I Spoke It Correctly (+15 XP)
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
          statusText.innerHTML = `<span style="color: var(--success);">✓ Great Pronunciation! Heard: "${transcript}"</span>`;
          score++;
          recordGameSuccess(vaultData, currentItem.id);
        } else {
          statusText.innerHTML = `<span style="color: var(--gold);">Nice try! Heard: "${transcript}"</span>`;
        }
      };

      recognition.onerror = () => {
        statusText.innerText = 'Could not access microphone. You can self-verify below!';
      };
    } else {
      micBtn.addEventListener('click', () => {
        speakText(currentItem.term);
        statusText.innerText = 'Listen to the UK pronunciation and repeat out loud!';
      });
    }

    stageEl.querySelector('#btn-verify-pronunciation').addEventListener('click', () => {
      score++;
      recordGameSuccess(vaultData, currentItem.id);
      currentIdx++;
      renderSayIt();
    });
  };

  renderSayIt();
}

// ==========================================================================
// 7. GAME: GUESS THE WORD (CLUE DETECTIVE) 🕵️
// ==========================================================================

export function startGuessWordGame(stageEl, vaultData, onComplete = () => {}) {
  const items = getAdaptiveGameItems(vaultData, 4);
  let currentIdx = 0;
  let score = 0;

  const renderDetective = () => {
    if (currentIdx >= items.length) {
      onComplete({
        title: 'Word Detective Master! 🕵️',
        xp: score * 15,
        coins: score * 4,
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
        <div class="card text-center" style="padding: 1.75rem; margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="category-pill">Category: ${currentItem.category}</span>
            <span style="color: var(--danger); font-weight: 700;">Lives: ${'❤️'.repeat(lives)}</span>
          </div>
          
          <h4 style="margin: 1rem 0 0.5rem; color: var(--text-main);">Clue: ${currentItem.meaning}</h4>

          <!-- Letter Blanks -->
          <div class="scramble-slots" style="display: flex; justify-content: center; gap: 0.5rem; margin: 1.5rem 0; flex-wrap: wrap;">
            ${targetWord.split('').map(char => {
              if (!/[A-Z]/.test(char)) return `<span class="scramble-slot filled">${char}</span>`;
              return `<span class="scramble-slot ${guessedLetters.has(char) ? 'filled' : ''}">${guessedLetters.has(char) ? char : '_'}</span>`;
            }).join('')}
          </div>
        </div>

        <!-- On-screen Keyboard -->
        <div class="keyboard-grid" style="display: flex; justify-content: center; gap: 0.35rem; flex-wrap: wrap; max-width: 500px; margin: 0 auto 1.5rem;">
          ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => `
            <button class="btn-kb-key" data-key="${l}" ${guessedLetters.has(l) || isWon || isLost ? 'disabled' : ''}>${l}</button>
          `).join('')}
        </div>
      `;

      if (isWon) {
        score++;
        recordGameSuccess(vaultData, currentItem.id);
        speakText(currentItem.term);
        setTimeout(() => {
          currentIdx++;
          renderDetective();
        }, 1200);
      } else if (isLost) {
        recordGameMistake(vaultData, currentItem.id);
        setTimeout(() => {
          currentIdx++;
          renderDetective();
        }, 1500);
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
// 8. GAME: ODD ONE OUT 🚫
// ==========================================================================

export function startOddOneOutGame(stageEl, vaultData, onComplete = () => {}) {
  const oddSets = [
    {
      group: 'Happiness & Delight',
      words: ['Chuffed', 'Delighted', 'Ecstatic', 'Knackered'],
      oddIndex: 3,
      reason: '"Knackered" means exhausted, while the others mean happy!'
    },
    {
      group: 'Disappointment & Sadness',
      words: ['Gutted', 'Devastated', 'Downcast', 'Gobsmacked'],
      oddIndex: 3,
      reason: '"Gobsmacked" means astonished/shocked, while the rest mean disappointed.'
    },
    {
      group: 'Money & Wealth',
      words: ['Quid', 'Fiver', 'Tenner', 'Cuppa'],
      oddIndex: 3,
      reason: '"Cuppa" is a cup of tea, while the others are British currency terms.'
    },
    {
      group: 'Movement & Places',
      words: ['Lorry', 'Tube', 'Boot', 'Bonnet'],
      oddIndex: 1,
      reason: '"Tube" is public transport, while lorry, boot, and bonnet are motor vehicle terms.'
    }
  ];

  let currentIdx = 0;
  let score = 0;

  const renderOddSet = () => {
    if (currentIdx >= oddSets.length) {
      onComplete({
        title: 'Odd One Out Solved! 🚫',
        xp: score * 12,
        coins: score * 3,
        details: `Identified ${score} out of ${oddSets.length} semantic mismatches!`
      });
      return;
    }

    const currentSet = oddSets[currentIdx];

    stageEl.innerHTML = `
      <div class="card text-center" style="padding: 1.75rem; margin-bottom: 1.5rem;">
        <span class="category-pill">Semantic Odd One Out</span>
        <h3 style="margin: 1rem 0 0.5rem;">Which word does NOT belong?</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Find the word that has a different meaning category.</p>
      </div>

      <div class="practice-options-grid">
        ${currentSet.words.map((w, i) => `
          <button class="practice-opt-btn odd-opt-btn" data-idx="${i}">
            <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
            <span class="opt-text">${w}</span>
          </button>
        `).join('')}
      </div>

      <div id="odd-reason-box" style="display: none; margin-top: 1.5rem;" class="card">
        <p id="odd-reason-text" style="font-weight: 600;"></p>
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
        }, 2000);
      });
    });
  };

  renderOddSet();
}

// ==========================================================================
// 9. GAME: BUILD THE SENTENCE 💬
// ==========================================================================

export function startBuildSentenceGame(stageEl, vaultData, onComplete = () => {}) {
  const sentences = [
    { target: 'He always drinks Earl Grey tea in the morning.', words: ['He', 'always', 'drinks', 'Earl Grey', 'tea', 'in the', 'morning.'] },
    { target: 'I was absolutely chuffed with my exam results.', words: ['I', 'was', 'absolutely', 'chuffed', 'with my', 'exam', 'results.'] },
    { target: 'Would you mind passing the marmalade please?', words: ['Would', 'you mind', 'passing', 'the', 'marmalade', 'please?'] },
    { target: 'Despite the heavy rain we arrived on time.', words: ['Despite', 'the heavy', 'rain', 'we arrived', 'on time.'] }
  ];

  let currentIdx = 0;
  let score = 0;

  const renderSentenceBuilder = () => {
    if (currentIdx >= sentences.length) {
      onComplete({
        title: 'Syntax Master! 💬',
        xp: score * 15,
        coins: score * 4,
        details: `Assembled ${score} out of ${sentences.length} English sentences correctly!`
      });
      return;
    }

    const currentSentence = sentences[currentIdx];
    const shuffledWords = shuffleArray(currentSentence.words);
    let selectedWords = [];

    stageEl.innerHTML = `
      <div class="card text-center" style="padding: 1.75rem; margin-bottom: 1.5rem;">
        <span class="category-pill">Syntax Builder</span>
        <h4 style="margin-top: 0.75rem;">Tap word blocks in order to build the sentence:</h4>

        <!-- Output Slot -->
        <div class="sentence-build-slot" id="build-slot" style="min-height: 60px; border: 2px dashed var(--border-color); border-radius: 12px; padding: 0.75rem; margin: 1.25rem 0; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
          <span style="color: var(--text-muted); font-size: 0.85rem;" id="slot-placeholder">Tap words below...</span>
        </div>
      </div>

      <!-- Scrambled Word Blocks -->
      <div class="word-blocks-flex" id="word-blocks" style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.5rem;">
        ${shuffledWords.map((word, idx) => `
          <button class="word-tile-btn" data-word="${word}" data-idx="${idx}">${word}</button>
        `).join('')}
      </div>

      <div style="display: flex; justify-content: center; gap: 0.75rem;">
        <button class="btn btn-secondary" id="btn-reset-sentence"><i class="fa-solid fa-rotate-left"></i> Reset</button>
        <button class="btn btn-primary" id="btn-check-sentence"><i class="fa-solid fa-circle-check"></i> Check</button>
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

    stageEl.querySelector('#btn-check-sentence').addEventListener('click', () => {
      const userConstructed = selectedWords.map(w => w.word).join(' ');
      if (userConstructed === currentSentence.target) {
        score++;
        buildSlot.style.borderColor = 'var(--success)';
        speakText(currentSentence.target);
        setTimeout(() => {
          currentIdx++;
          renderSentenceBuilder();
        }, 1500);
      } else {
        buildSlot.classList.add('shake');
        setTimeout(() => buildSlot.classList.remove('shake'), 600);
      }
    });
  };

  renderSentenceBuilder();
}

// ==========================================================================
// 10. GAME: ENGLISH QUIZ 🏆
// ==========================================================================

export function startEnglishQuizGame(stageEl, vaultData, onComplete = () => {}) {
  startQuickChoiceGame(stageEl, vaultData, onComplete);
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
