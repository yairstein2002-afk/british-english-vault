/**
 * British English Vault - Irregular Verbs Module
 * Clean, readable, unified reference table without audio playback or horizontal shifting.
 * 100% in English.
 */

import { IRREGULAR_VERBS, VERB_CATEGORIES } from './irregularVerbsData.js';

let searchQuery = '';
let selectedLetter = 'ALL';
let selectedCategory = 'ALL';
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

  // Click delegation
  container.addEventListener('click', (e) => {
    // Clear search button delegation
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

    // Category filter tabs
    const catBtn = e.target.closest('.cat-filter-btn');
    if (catBtn) {
      selectedCategory = catBtn.getAttribute('data-cat') || 'ALL';
      container.querySelectorAll('.cat-filter-btn').forEach(b => b.classList.remove('active'));
      catBtn.classList.add('active');
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
  });
}

function renderIrregularVerbsView() {
  const container = document.getElementById('view-irregular-verbs');
  if (!container) return;

  // Extract distinct first letters
  const letters = ['ALL', ...new Set(IRREGULAR_VERBS.map(item => item.v1.charAt(0).toUpperCase()))].sort();

  // Category counts
  const coreCount = IRREGULAR_VERBS.filter(v => v.category === 'core').length;
  const archaicCount = IRREGULAR_VERBS.filter(v => v.category === 'archaic').length;
  const compoundCount = IRREGULAR_VERBS.filter(v => v.category === 'compound').length;

  container.innerHTML = `
    <!-- HERO BANNER -->
    <div class="card irregular-hero-banner">
      <div class="irregular-hero-content">
        <div class="irregular-hero-badge">
          <i class="fa-solid fa-bolt"></i>
        </div>
        <div class="irregular-hero-text">
          <div class="section-badge-small"><i class="fa-solid fa-crown"></i> Complete English Grammar Reference</div>
          <h2>Irregular Verbs</h2>
          <p>The complete master list of English irregular verbs: Core, Compound, and Archaic forms with Base Form (V1), Past Simple (V2), and Past Participle (V3).</p>
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
          <i class="fa-solid fa-layer-group"></i>
          <div>
            <span class="metric-val">3</span>
            <span class="metric-lbl">Categories</span>
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

    <!-- CATEGORY TABS -->
    <div class="irregular-category-tabs-bar">
      <button type="button" class="cat-filter-btn ${selectedCategory === 'ALL' ? 'active' : ''}" data-cat="ALL">
        <i class="fa-solid fa-globe"></i>
        <span>All Verbs</span>
        <span class="cat-count-badge">${IRREGULAR_VERBS.length}</span>
      </button>
      <button type="button" class="cat-filter-btn ${selectedCategory === 'core' ? 'active' : ''}" data-cat="core">
        <i class="fa-solid fa-bolt"></i>
        <span>Core Verbs</span>
        <span class="cat-count-badge">${coreCount}</span>
      </button>
      <button type="button" class="cat-filter-btn ${selectedCategory === 'compound' ? 'active' : ''}" data-cat="compound">
        <i class="fa-solid fa-layer-group"></i>
        <span>Compound Prefixes</span>
        <span class="cat-count-badge">${compoundCount}</span>
      </button>
      <button type="button" class="cat-filter-btn ${selectedCategory === 'archaic' ? 'active' : ''}" data-cat="archaic">
        <i class="fa-solid fa-feather-pointed"></i>
        <span>Archaic & Rare</span>
        <span class="cat-count-badge">${archaicCount}</span>
      </button>
    </div>

    <!-- SEARCH & FILTER TOOLBAR -->
    <div class="card irregular-toolbar-card">
      <div class="irregular-search-wrapper">
        <div class="irregular-search-box">
          <i class="fa-solid fa-magnifying-glass search-icon"></i>
          <input 
            type="text" 
            id="irregular-search-input" 
            placeholder="Search any verb in V1, V2, V3, or base root (e.g. go, broke, eaten, undo)..." 
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

    <!-- UNIFIED TABLE (ONE TABLE, ZERO HORIZONTAL SCROLL) -->
    <div class="card irregular-table-card">
      <div class="table-meta-header">
        <div class="meta-title-col">
          <span class="meta-badge"><i class="fa-solid fa-table-list"></i> Irregular Verbs Table</span>
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
        <p>No irregular verbs match your current filters. Try typing a different search query or selecting another category.</p>
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
    // Category check
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
      return false;
    }

    // Letter filter check
    if (selectedLetter !== 'ALL') {
      if (item.v1.charAt(0).toUpperCase() !== selectedLetter) return false;
    }

    // Search query check
    if (!q) return true;
    const matchV1 = item.v1.toLowerCase().includes(q);
    const matchV2 = item.v2.toLowerCase().includes(q);
    const matchV3 = item.v3.toLowerCase().includes(q);
    const matchRoot = (item.root || '').toLowerCase().includes(q);
    const matchNote = (item.note || '').toLowerCase().includes(q);
    return matchV1 || matchV2 || matchV3 || matchRoot || matchNote;
  });

  if (matchedCountEl) matchedCountEl.innerText = filtered.length;
  if (subtitleEl) {
    let catText = selectedCategory === 'ALL' ? 'All' : (selectedCategory === 'core' ? 'Core' : (selectedCategory === 'compound' ? 'Compound Prefixes' : 'Archaic & Rare'));
    subtitleEl.innerText = `Showing ${filtered.length} of ${IRREGULAR_VERBS.length} verbs [${catText}]${searchQuery ? ` matching "${searchQuery}"` : ''}${selectedLetter !== 'ALL' ? ` (Letter: ${selectedLetter})` : ''}`;
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

    // Meta badge for Compound or Archaic
    let metaBadge = '';
    if (item.category === 'compound') {
      metaBadge = `
        <span class="compound-root-tag" title="Compound verb derived from base root '${item.root}'">
          <i class="fa-solid fa-code-branch"></i> ${item.root}
        </span>
      `;
    } else if (item.category === 'archaic') {
      metaBadge = `
        <span class="archaic-tag" title="${item.note || 'Archaic / Historical form'}">
          ${item.note || 'Archaic'}
        </span>
      `;
    }

    return `
      <tr class="irregular-row cat-${item.category}">
        <td class="col-num"><span class="row-index">${index + 1}</span></td>
        <td class="col-v1">
          <div class="v1-info-col">
            <strong class="v1-text">${v1Highlighted}</strong>
            ${metaBadge ? `<div class="compound-meta-row">${metaBadge}</div>` : ''}
          </div>
        </td>
        <td class="col-v2">
          <span class="v2-text">${v2Highlighted}</span>
        </td>
        <td class="col-v3">
          <span class="v3-text">${v3Highlighted}</span>
        </td>
      </tr>
    `;
  }).join('');
}

function highlightText(text, query) {
  if (!query) return text;
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  return text.replace(regex, '<mark class="search-highlight">$1</mark>');
}
