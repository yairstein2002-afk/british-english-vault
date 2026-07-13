/**
 * British English Vault - Statistics Rendering Service
 */

/**
 * Calculates stats from vault database
 */
export function calculateStats(vaultData) {
  const items = vaultData.items || [];
  const stats = vaultData.stats || { quizzesCompleted: 0, correctAnswers: 0, incorrectAnswers: 0, history: [] };

  // Category counts
  const counts = {
    words: 0,
    slangs: 0,
    phrases: 0,
    idioms: 0
  };

  items.forEach(item => {
    if (counts[item.category] !== undefined) {
      counts[item.category]++;
    }
  });

  const totalItems = items.length;

  // Most mistaken items (where mistakeCount > 0, sorted descending)
  const mostMistaken = [...items]
    .filter(item => item.mistakeCount && item.mistakeCount > 0)
    .sort((a, b) => b.mistakeCount - a.mistakeCount)
    .slice(0, 5);

  // Success rate
  let avgScore = 0;
  const history = stats.history || [];
  if (history.length > 0) {
    const totalPct = history.reduce((sum, h) => sum + h.percentage, 0);
    avgScore = Math.round(totalPct / history.length);
  }

  return {
    totalItems,
    quizzesCompleted: stats.quizzesCompleted || 0,
    averageScore: avgScore,
    categoryCounts: counts,
    mostMistaken,
    history
  };
}

/**
 * Update UI widgets on the Statistics page
 */
export function renderStatsUI(vaultData) {
  const s = calculateStats(vaultData);

  // 1. Text Indicators
  document.getElementById('stat-total-items').innerText = s.totalItems;
  document.getElementById('stat-total-quizzes').innerText = s.quizzesCompleted;
  document.getElementById('stat-avg-score').innerText = `${s.averageScore}%`;

  // 2. Category Distribution
  document.getElementById('stat-cnt-words').innerText = s.categoryCounts.words;
  document.getElementById('stat-cnt-slangs').innerText = s.categoryCounts.slangs;
  document.getElementById('stat-cnt-phrases').innerText = s.categoryCounts.phrases;
  document.getElementById('stat-cnt-idioms').innerText = s.categoryCounts.idioms;

  // Calculate percentage of max category to set progress widths nicely
  const maxCount = Math.max(...Object.values(s.categoryCounts), 1);
  
  document.getElementById('bar-words').style.width = `${(s.categoryCounts.words / maxCount) * 100}%`;
  document.getElementById('bar-slangs').style.width = `${(s.categoryCounts.slangs / maxCount) * 100}%`;
  document.getElementById('bar-phrases').style.width = `${(s.categoryCounts.phrases / maxCount) * 100}%`;
  document.getElementById('bar-idioms').style.width = `${(s.categoryCounts.idioms / maxCount) * 100}%`;

  // 3. Most Mistaken items
  const mistakeList = document.getElementById('stat-mistakes-list');
  mistakeList.innerHTML = '';

  if (s.mostMistaken.length === 0) {
    mistakeList.innerHTML = `<li class="empty-state">No mistakes recorded yet. Splendid job!</li>`;
  } else {
    s.mostMistaken.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="mistake-word">${item.term} <small style="font-weight: normal; color: var(--text-muted);">(${item.category})</small></span>
        <span class="mistake-badge">${item.mistakeCount} errors</span>
      `;
      mistakeList.appendChild(li);
    });
  }

  // 4. Performance Over Time Chart (last 10 quizzes)
  const chartContainer = document.getElementById('stats-history-chart');
  chartContainer.innerHTML = '';

  const chartHistory = s.history.slice(-10); // get last 10 entries

  if (chartHistory.length === 0) {
    chartContainer.innerHTML = `<div class="chart-empty">No quiz attempts yet. Complete a quiz to see your progress!</div>`;
  } else {
    chartHistory.forEach((run, idx) => {
      const column = document.createElement('div');
      column.className = 'chart-bar-col';
      
      // Calculate height percentage
      const heightVal = run.percentage;
      
      column.innerHTML = `
        <span class="chart-bar-value">${heightVal}%</span>
        <div class="chart-bar-pillar" style="height: ${heightVal * 1.5}px;" title="${run.correct}/${run.total} correct on ${run.date}"></div>
        <span class="chart-bar-label">Q${idx + 1}</span>
      `;
      chartContainer.appendChild(column);
    });
  }
}
