/**
 * British English Vault - Irregular Verbs Module
 * Searchable, audio-enabled interactive dictionary of irregular verbs (V1, V2, V3).
 */

import { IRREGULAR_VERBS } from './irregularVerbsData.js';
import { speakText } from './speech.js';
import { copyTextToClipboard } from './shareUtils.js';

let searchQuery = '';
let selectedLetter = 'ALL';
let isInitialized = false;

export function initIrregularVerbsUI() {
  renderIrregularVerbsView();
  if (!isInitialized) {
    bindGlobalEvents();
    isInitialized = true;
  }
}

function bindGlobalEvents() {
  const container = document.getElementById('view-irregular-verbs');
  if (!container) return;

  // Search input delegation
  container.addEventListener('input', (e) => {
    if (e.target && e.target.id === 'irregular-search-input') {
      searchQuery = e.target.value.trim().toLowerCase();
      renderVerbsTable();
    }
  });

  // Clear search button delegation
  container.addEventListener('click', (e) => {
    const clearBtn = e.target.closest('#btn-clear-irregular-search');
    if (clearBtn) {
      searchQuery = '';
      const input = document.getElementById('irregular-search-input');
      if (input) {
        input.value = '';
        input.focus();
      }
      renderVerbsTable();
      return;
    }

    // Letter filter buttons
    const letterBtn = e.target.closest('.letter-filter-pill');
    if (letterBtn) {
      selectedLetter = letterBtn.getAttribute('data-letter') || 'ALL';
      container.querySelectorAll('.letter-filter-pill').forEach(b => b.classList.remove('active'));
      letterBtn.classList.add('active');
      renderVerbsTable();
      return;
    }

    // Speak verb button
    const speakBtn = e.target.closest('.verb-speak-btn');
    if (speakBtn) {
      const v1 = speakBtn.getAttribute('data-v1') || '';
      const v2 = speakBtn.getAttribute('data-v2') || '';
      const v3 = speakBtn.getAttribute('data-v3') || '';
      // Speak with slight pause between forms: "Break, ... Broke, ... Broken"
      const speechText = `${v1}, ${v2}, ${v3}`;
      
      speakBtn.classList.add('speaking');
      speakText(speechText, { rate: 0.85 }).finally(() => {
        speakBtn.classList.remove('speaking');
      });
      return;
    }

    // Copy verb button
    const copyBtn = e.target.closest('.verb-copy-btn');
    if (copyBtn) {
      const rowText = copyBtn.getAttribute('data-text') || '';
      copyTextToClipboard(rowText, 'Verb forms copied to clipboard! 📋');
      return;
    }
  });
}

function renderIrregularVerbsView() {
  const container = document.getElementById('view-irregular-verbs');
  if (!container) return;

  // Extract distinct first letters
  const letters = ['ALL', ...new Set(IRREGULAR_VERBS.map(item => item.v1.charAt(0).toUpperCase()))].sort();

  container.innerHTML = `
    <!-- HERO BANNER -->
    <div class="card irregular-hero-banner">
      <div class="irregular-hero-content">
        <div class="irregular-hero-badge">
          <i class="fa-solid fa-bolt"></i>
        </div>
        <div class="irregular-hero-text">
          <div class="section-badge-small"><i class="fa-solid fa-crown"></i> English Grammar Reference</div>
          <h2>Irregular Verbs (יוצאים מן הכלל)</h2>
          <p>Comprehensive guide to English irregular verbs: Base Form (V1), Past Simple (V2), and Past Participle (V3) with authentic British pronunciation.</p>
        </div>
      </div>

      <div class="irregular-stats-row">
        <div class="metric-pill">
          <i class="fa-solid fa-spell-check"></i>
          <div>
            <span class="metric-val">${IRREGULAR_VERBS.length}</span>
            <span class="metric-lbl">Total Verbs</span>
          </div>
        </div>
        <div class="metric-pill">
          <i class="fa-solid fa-headphones"></i>
          <div>
            <span class="metric-val">100%</span>
            <span class="metric-lbl">UK Audio</span>
          </div>
        </div>
        <div class="metric-pill">
          <i class="fa-solid fa-magnifying-glass"></i>
          <div>
            <span class="metric-val" id="irregular-matched-count">${IRREGULAR_VERBS.length}</span>
            <span class="metric-lbl">Visible</span>
          </div>
        </div>
      </div>
    </div>

    <!-- SEARCH & FILTER TOOLBAR -->
    <div class="card irregular-toolbar-card">
      <div class="irregular-search-wrapper">
        <div class="irregular-search-box">
          <i class="fa-solid fa-magnifying-glass search-icon"></i>
          <input 
            type="text" 
            id="irregular-search-input" 
            placeholder="Search verb in V1, V2, or V3 (e.g. go, went, gone)..." 
            value="${searchQuery}" 
            autocomplete="off"
            spellcheck="false"
          >
          <button type="button" id="btn-clear-irregular-search" class="clear-search-btn ${searchQuery ? 'visible' : ''}" title="Clear search">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- LETTER FILTER PILLS -->
      <div class="irregular-letter-filters">
        <span class="filter-label"><i class="fa-solid fa-arrow-down-a-z"></i> Letter:</span>
        <div class="letter-pills-scroll">
          ${letters.map(letter => `
            <button 
              type="button" 
              class="letter-filter-pill ${selectedLetter === letter ? 'active' : ''}" 
              data-letter="${letter}">
              ${letter}
            </button>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- TABLE & RESULTS CONTAINER -->
    <div class="card irregular-table-card">
      <div class="table-meta-header">
        <div class="meta-title-col">
          <span class="meta-badge"><i class="fa-solid fa-table-list"></i> Verb Conjugation Table</span>
          <span class="meta-subtext" id="irregular-table-subtitle">Showing all ${IRREGULAR_VERBS.length} verbs</span>
        </div>
      </div>

      <div class="irregular-table-responsive">
        <table class="irregular-table">
          <thead>
            <tr>
              <th class="col-num">#</th>
              <th class="col-v1">Base Form (V1)</th>
              <th class="col-v2">Past Simple (V2)</th>
              <th class="col-v3">Past Participle (V3)</th>
              <th class="col-actions">Pronunciation</th>
            </tr>
          </thead>
          <tbody id="irregular-table-body">
            <!-- Rendered by renderVerbsTable() -->
          </tbody>
        </table>
      </div>

      <!-- EMPTY STATE -->
      <div id="irregular-empty-state" class="irregular-empty-state" style="display: none;">
        <div class="empty-icon-badge">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <h3>No verbs found</h3>
        <p>No irregular verbs match your search query. Try typing a different form or clear the search.</p>
        <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('btn-clear-irregular-search').click();">
          <i class="fa-solid fa-rotate-right"></i> Reset Search
        </button>
      </div>
    </div>
  `;

  renderVerbsTable();
}

function renderVerbsTable() {
  const tbody = document.getElementById('irregular-table-body');
  const emptyState = document.getElementById('irregular-empty-state');
  const matchedCountEl = document.getElementById('irregular-matched-count');
  const subtitleEl = document.getElementById('irregular-table-subtitle');
  const clearBtn = document.getElementById('btn-clear-irregular-search');

  if (!tbody) return;

  if (clearBtn) {
    if (searchQuery) {
      clearBtn.classList.add('visible');
    } else {
      clearBtn.classList.remove('visible');
    }
  }

  // Filter verbs
  const q = searchQuery.toLowerCase();
  const filtered = IRREGULAR_VERBS.filter(item => {
    // Letter filter check
    if (selectedLetter !== 'ALL') {
      if (item.v1.charAt(0).toUpperCase() !== selectedLetter) return false;
    }

    // Search query check
    if (!q) return true;
    const matchV1 = item.v1.toLowerCase().includes(q);
    const matchV2 = item.v2.toLowerCase().includes(q);
    const matchV3 = item.v3.toLowerCase().includes(q);
    return matchV1 || matchV2 || matchV3;
  });

  if (matchedCountEl) matchedCountEl.innerText = filtered.length;
  if (subtitleEl) {
    subtitleEl.innerText = `Showing ${filtered.length} of ${IRREGULAR_VERBS.length} verbs${searchQuery ? ` matching "${searchQuery}"` : ''}${selectedLetter !== 'ALL' ? ` (Letter: ${selectedLetter})` : ''}`;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  tbody.innerHTML = filtered.map((item, index) => {
    const v1Highlighted = highlightText(item.v1, q);
    const v2Highlighted = highlightText(item.v2, q);
    const v3Highlighted = highlightText(item.v3, q);
    const rowCopyText = `${item.v1} | ${item.v2} | ${item.v3}`;

    return `
      <tr class="irregular-row">
        <td class="col-num"><span class="row-index">${index + 1}</span></td>
        <td class="col-v1">
          <div class="v1-wrapper">
            <span class="v1-tag">V1</span>
            <strong class="v1-text">${v1Highlighted}</strong>
          </div>
        </td>
        <td class="col-v2">
          <div class="v2-wrapper">
            <span class="form-tag v2-badge">V2</span>
            <span class="v2-text">${v2Highlighted}</span>
          </div>
        </td>
        <td class="col-v3">
          <div class="v3-wrapper">
            <span class="form-tag v3-badge">V3</span>
            <span class="v3-text">${v3Highlighted}</span>
          </div>
        </td>
        <td class="col-actions">
          <div class="actions-group">
            <button 
              type="button" 
              class="audio-btn-modern verb-speak-btn" 
              data-v1="${item.v1.replace(/"/g, '&quot;')}" 
              data-v2="${item.v2.replace(/"/g, '&quot;')}" 
              data-v3="${item.v3.replace(/"/g, '&quot;')}" 
              title="Listen in British English: ${item.v1} - ${item.v2} - ${item.v3}">
              <span class="audio-wave-anim"><span></span><span></span><span></span></span>
              <i class="fa-solid fa-volume-high audio-icon"></i>
            </button>
            <button 
              type="button" 
              class="icon-action-btn verb-copy-btn" 
              data-text="${rowCopyText.replace(/"/g, '&quot;')}" 
              title="Copy row to clipboard">
              <i class="fa-regular fa-copy"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function highlightText(text, query) {
  if (!query) return text;
  // Escape regex special characters
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  return text.replace(regex, '<mark class="search-highlight">$1</mark>');
}
