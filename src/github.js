/**
 * British English Vault - GitHub Sync & Storage Service
 */

const LOCAL_STORAGE_KEY = 'bev_vault_data';
const GITHUB_CONFIG_KEY = 'bev_github_config';

// Default pre-populated items
const DEFAULT_VAULT_DATA = {
  items: [
    {
      id: "word-1",
      category: "words",
      term: "Knackered",
      meaning: "Extremely tired or exhausted.",
      example: "I was absolutely knackered after a long day at the office.",
      favorite: false,
      dateAdded: "2026-07-10T10:00:00Z",
      mistakeCount: 0
    },
    {
      id: "word-2",
      category: "words",
      term: "Gobsmacked",
      meaning: "Utterly astonished or surprised.",
      example: "I was completely gobsmacked when she told me the news.",
      favorite: true,
      dateAdded: "2026-07-11T12:00:00Z",
      mistakeCount: 0
    },
    {
      id: "word-3",
      category: "words",
      term: "Quid",
      meaning: "One pound sterling (slang).",
      example: "Can you lend me ten quid until tomorrow?",
      favorite: false,
      dateAdded: "2026-07-12T09:00:00Z",
      mistakeCount: 0
    },
    {
      id: "slang-1",
      category: "slangs",
      term: "Chuffed",
      meaning: "Very pleased or happy.",
      example: "He was chuffed to bits with his birthday present.",
      favorite: true,
      dateAdded: "2026-07-10T11:00:00Z",
      mistakeCount: 0
    },
    {
      id: "slang-2",
      category: "slangs",
      term: "Gutted",
      meaning: "Extremely disappointed or devastated.",
      example: "She was absolutely gutted when her team lost the cup final.",
      favorite: false,
      dateAdded: "2026-07-11T14:30:00Z",
      mistakeCount: 0
    },
    {
      id: "slang-3",
      category: "slangs",
      term: "Skint",
      meaning: "Having no money; penniless.",
      example: "I would love to go to the pub, but I'm skint.",
      favorite: false,
      dateAdded: "2026-07-12T16:00:00Z",
      mistakeCount: 0
    },
    {
      id: "phrase-1",
      category: "phrases",
      term: "Bob's your uncle",
      meaning: "A phrase used to show that a task is simple and successfully completed.",
      example: "Just add hot water, stir, and Bob's your uncle!",
      favorite: false,
      dateAdded: "2026-07-10T08:00:00Z",
      mistakeCount: 0
    },
    {
      id: "phrase-2",
      category: "phrases",
      term: "Fancy a cuppa?",
      meaning: "Would you like a cup of tea?",
      example: "You look cold and tired. Fancy a cuppa?",
      favorite: true,
      dateAdded: "2026-07-11T10:15:00Z",
      mistakeCount: 0
    },
    {
      id: "idiom-1",
      category: "idioms",
      term: "A penny for your thoughts",
      meaning: "A way of asking what someone is thinking about when they are quiet.",
      example: "You've been staring out the window for ages. A penny for your thoughts?",
      favorite: false,
      dateAdded: "2026-07-10T09:30:00Z",
      mistakeCount: 0
    },
    {
      id: "idiom-2",
      category: "idioms",
      term: "Cost an arm and a leg",
      meaning: "To be extremely expensive.",
      example: "Buying that designer winter coat cost me an arm and a leg.",
      favorite: false,
      dateAdded: "2026-07-12T11:00:00Z",
      mistakeCount: 0
    }
  ],
  stats: {
    quizzesCompleted: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    history: []
  }
};

/**
 * Get GitHub Config settings from Local Storage
 */
export function getGitHubConfig() {
  const config = localStorage.getItem(GITHUB_CONFIG_KEY);
  return config ? JSON.parse(config) : null;
}

/**
 * Save GitHub Config settings to Local Storage
 */
export function saveGitHubConfig(config) {
  if (config && config.pat && config.owner && config.repo) {
    localStorage.setItem(GITHUB_CONFIG_KEY, JSON.stringify(config));
    return true;
  }
  return false;
}

/**
function getAuthHeader(pat) {
  const cleanPat = (pat || '').trim();
  if (cleanPat.startsWith('github_pat_') || cleanPat.startsWith('ghp_')) {
    return `Bearer ${cleanPat}`;
  }
  return `token ${cleanPat}`;
}

function decodeBase64UTF8(base64Str) {
  const cleanBase64 = (base64Str || '').replace(/\s/g, '');
  try {
    const binaryString = atob(cleanBase64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
  } catch (e) {
    return decodeURIComponent(escape(atob(cleanBase64)));
  }
}

function encodeBase64UTF8(str) {
  try {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch (e) {
    return btoa(unescape(encodeURIComponent(str)));
  }
}

/**
 * Test Connection with GitHub Repo
 */
export async function testGitHubConnection(config) {
  const { pat, owner, repo, branch, path } = config;
  const targetBranch = branch || 'main';
  const targetPath = path || 'data/vault.json';
  
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${targetPath}?ref=${targetBranch}&t=${Date.now()}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(pat),
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (response.status === 200) {
      return { success: true, exists: true };
    } else if (response.status === 404) {
      // Check if the repository itself exists
      const repoUrl = `https://api.github.com/repos/${owner}/${repo}`;
      const repoRes = await fetch(repoUrl, {
        method: 'GET',
        headers: {
          'Authorization': getAuthHeader(pat),
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      if (repoRes.status === 200) {
        return { success: true, exists: false };
      } else {
        return { success: false, error: `Repository "${owner}/${repo}" not found or token lacks access (HTTP ${repoRes.status})` };
      }
    } else if (response.status === 401) {
      return { success: false, error: `Bad credentials (HTTP 401). Please check your Personal Access Token.` };
    } else {
      let errorMsg = `HTTP ${response.status}`;
      try {
        const errJson = await response.json();
        if (errJson.message) errorMsg = errJson.message;
      } catch (e) {}
      return { success: false, error: `${errorMsg} (${response.status})` };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Fetch Data: Checks GitHub first. If configured, pulls the data file.
 * If not, or if it fails, falls back to browser localStorage.
 */
export async function fetchVaultData(onSyncStateChange = () => {}) {
  const config = getGitHubConfig();
  
  if (!config) {
    onSyncStateChange('local');
    return getLocalFallbackData();
  }

  onSyncStateChange('syncing');
  const { pat, owner, repo, branch, path } = config;
  const targetBranch = branch || 'main';
  const targetPath = path || 'data/vault.json';
  
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${targetPath}?ref=${targetBranch}&t=${Date.now()}`;
  
  try {
    let response;
    if (pat) {
      response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': getAuthHeader(pat),
          'Accept': 'application/vnd.github.v3+json'
        }
      });
    }

    // If no PAT, or if PAT returns 401/403, fallback to unauthenticated public GET
    if (!response || response.status === 401 || response.status === 403) {
      response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
    }

    if (response.status === 200) {
      const data = await response.json();
      const contentString = decodeBase64UTF8(data.content);
      const parsedData = JSON.parse(contentString);
      
      // Merge local items with GitHub items to prevent data loss on connection
      const localData = getLocalFallbackData();
      const mergedItems = [...(parsedData.items || [])];
      
      (localData.items || []).forEach(localItem => {
        const exists = mergedItems.some(gitItem => 
          gitItem.id === localItem.id || 
          gitItem.term.toLowerCase().trim() === localItem.term.toLowerCase().trim()
        );
        if (!exists) {
          mergedItems.push(localItem);
        }
      });
      
      const mergedStats = {
        quizzesCompleted: Math.max(parsedData.stats?.quizzesCompleted || 0, localData.stats?.quizzesCompleted || 0),
        correctAnswers: Math.max(parsedData.stats?.correctAnswers || 0, localData.stats?.correctAnswers || 0),
        incorrectAnswers: Math.max(parsedData.stats?.incorrectAnswers || 0, localData.stats?.incorrectAnswers || 0),
        history: [...(parsedData.stats?.history || [])]
      };
      
      (localData.stats?.history || []).forEach(localHist => {
        const histExists = mergedStats.history.some(gitHist => 
          gitHist.date === localHist.date && 
          gitHist.percentage === localHist.percentage
        );
        if (!histExists) {
          mergedStats.history.push(localHist);
        }
      });

      const mergedData = {
        items: mergedItems,
        stats: mergedStats
      };

      // Save locally as cache
      saveLocalData(mergedData);
      
      // Cache the file SHA in sessionStorage for subsequent commits
      sessionStorage.setItem('bev_github_file_sha', data.sha);
      
      onSyncStateChange('synced');
      return mergedData;
    } else if (response.status === 404) {
      // File not found in GitHub. Create it immediately using local data.
      const localData = getLocalFallbackData();
      saveVaultData(localData, onSyncStateChange);
      return localData;
    } else {
      let errDetail = `HTTP ${response.status}`;
      try {
        const errJson = await response.json();
        if (errJson.message) errDetail = errJson.message;
      } catch (e) {}
      throw new Error(errDetail);
    }
  } catch (error) {
    console.error("GitHub fetch failed, loading local cache", error);
    onSyncStateChange('sync-failed', error.message);
    return getLocalFallbackData();
  }
}

/**
 * Save Data: Writes to local cache first, then attempts upload to GitHub in background.
 */
export async function saveVaultData(data, onSyncStateChange = () => {}) {
  // Save locally first
  saveLocalData(data);

  const config = getGitHubConfig();
  if (!config) {
    onSyncStateChange('local');
    return true;
  }

  onSyncStateChange('syncing');
  const { pat, owner, repo, branch, path } = config;
  const targetBranch = branch || 'main';
  const targetPath = path || 'data/vault.json';

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${targetPath}`;
  
  try {
    // 1. Get the current file SHA (always check latest before upload to prevent 409 conflicts)
    let sha = sessionStorage.getItem('bev_github_file_sha');
    
    const checkUrl = `${url}?ref=${targetBranch}&t=${Date.now()}`;
    const checkResponse = await fetch(checkUrl, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(pat),
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (checkResponse.status === 200) {
      const fileMeta = await checkResponse.json();
      sha = fileMeta.sha;
      sessionStorage.setItem('bev_github_file_sha', sha);
    } else if (checkResponse.status === 404) {
      sha = null;
      sessionStorage.removeItem('bev_github_file_sha');
    }

    // 2. Prepare payload
    const jsonStr = JSON.stringify(data, null, 2);
    const base64Content = encodeBase64UTF8(jsonStr);
    
    const body = {
      message: `Sync learning data: ${new Date().toISOString()}`,
      content: base64Content,
      branch: targetBranch
    };

    if (sha) {
      body.sha = sha;
    }

    // 3. Commit to GitHub (Attempt 1)
    let putResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': getAuthHeader(pat),
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    // 4. If we get a 409 conflict, the cached SHA was stale. Refetch the SHA and retry once!
    if (putResponse.status === 409 || putResponse.status === 422) {
      console.warn(`SHA conflict (${putResponse.status}). Refetching fresh SHA and retrying...`);
      const retryCheck = await fetch(checkUrl, {
        method: 'GET',
        headers: {
          'Authorization': getAuthHeader(pat),
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (retryCheck.status === 200) {
        const fileMeta = await retryCheck.json();
        sha = fileMeta.sha;
        sessionStorage.setItem('bev_github_file_sha', sha);
        
        body.sha = sha;
        putResponse = await fetch(url, {
          method: 'PUT',
          headers: {
            'Authorization': getAuthHeader(pat),
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
      }
    }

    if (putResponse.status === 200 || putResponse.status === 201) {
      const responseData = await putResponse.json();
      if (responseData.content && responseData.content.sha) {
        sessionStorage.setItem('bev_github_file_sha', responseData.content.sha);
      }
      onSyncStateChange('synced');
      return true;
    } else {
      let errText = `Status ${putResponse.status}`;
      try {
        const errJson = await putResponse.json();
        if (errJson.message) errText = errJson.message;
      } catch (e) {
        errText = await putResponse.text();
      }
      throw new Error(`Write failed: ${errText}`);
    }
  } catch (error) {
    console.error("GitHub sync failed", error);
    onSyncStateChange('sync-failed', error.message);
    return false;
  }
}

/**
 * Local Fallback functions
 */
function getLocalFallbackData() {
  const localDataStr = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (localDataStr) {
    try {
      return JSON.parse(localDataStr);
    } catch (e) {
      console.error("Error parsing local vault data", e);
    }
  }
  
  // Set default data
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_VAULT_DATA));
  return DEFAULT_VAULT_DATA;
}

function saveLocalData(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

/**
 * Clear all local data configuration
 */
export function clearAllLocalData() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  localStorage.removeItem(GITHUB_CONFIG_KEY);
  sessionStorage.removeItem('bev_github_file_sha');
}
