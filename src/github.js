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
 * Test Connection with GitHub Repo
 */
export async function testGitHubConnection(config) {
  const { pat, owner, repo, branch, path } = config;
  const targetBranch = branch || 'main';
  const targetPath = path || 'data/vault.json';
  
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${targetPath}?ref=${targetBranch}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `token ${pat}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (response.status === 200) {
      return { success: true, exists: true };
    } else if (response.status === 404) {
      // File doesn't exist, but repo and token are valid
      return { success: true, exists: false };
    } else {
      const errorMsg = await response.text();
      return { success: false, error: `GitHub API error: ${response.statusText} (${response.status})` };
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
  
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${targetPath}?ref=${targetBranch}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `token ${pat}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (response.status === 200) {
      const data = await response.json();
      const contentString = atob(data.content.replace(/\s/g, ''));
      const parsedData = JSON.parse(decodeURIComponent(escape(contentString)));
      
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
      
      // Auto-upload merged data to GitHub in background to ensure sync
      saveVaultData(mergedData, onSyncStateChange);
      
      return mergedData;
    } else if (response.status === 404) {
      // File not found in GitHub. Create it immediately using local data.
      const localData = getLocalFallbackData();
      saveVaultData(localData, onSyncStateChange);
      return localData;
    } else {
      throw new Error(`Status ${response.status}`);
    }
  } catch (error) {
    console.error("GitHub fetch failed, loading local cache", error);
    onSyncStateChange('sync-failed');
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
    // 1. Get the current file SHA (required to update files on GitHub)
    let sha = sessionStorage.getItem('bev_github_file_sha');
    
    // Always fetch latest SHA to prevent conflict errors
    const checkUrl = `${url}?ref=${targetBranch}`;
    const checkResponse = await fetch(checkUrl, {
      method: 'GET',
      headers: {
        'Authorization': `token ${pat}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (checkResponse.status === 200) {
      const fileMeta = await checkResponse.json();
      sha = fileMeta.sha;
      sessionStorage.setItem('bev_github_file_sha', sha);
    }

    // 2. Prepare payload
    // Handle Hebrew character encoding properly with btoa
    const jsonStr = JSON.stringify(data, null, 2);
    const base64Content = btoa(unescape(encodeURIComponent(jsonStr)));
    
    const body = {
      message: `Sync learning data: ${new Date().toISOString()}`,
      content: base64Content,
      branch: targetBranch
    };

    if (sha) {
      body.sha = sha;
    }

    // 3. Commit to GitHub
    const putResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${pat}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (putResponse.status === 200 || putResponse.status === 201) {
      const responseData = await putResponse.json();
      sessionStorage.setItem('bev_github_file_sha', responseData.content.sha);
      onSyncStateChange('synced');
      return true;
    } else {
      const errText = await putResponse.text();
      throw new Error(`Write failed with status ${putResponse.status}: ${errText}`);
    }
  } catch (error) {
    console.error("GitHub sync failed", error);
    onSyncStateChange('sync-failed');
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
