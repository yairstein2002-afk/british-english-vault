/**
 * British English Vault - GitHub Sync & Storage Service
 */

const LOCAL_STORAGE_KEY = 'bev_vault_data';
const GITHUB_CONFIG_KEY = 'bev_github_config';

// Default pre-populated items (34 Curated Master British Vocabulary Items)
const DEFAULT_VAULT_DATA = {
  items: [
    {"id":"word-1","category":"words","term":"Knackered","meaning":"Very tired or completely exhausted.","example":"I was absolutely knackered after a long day at the office.","favorite":false,"dateAdded":"2026-07-10T10:00:00Z","mistakeCount":0},
    {"id":"word-2","category":"words","term":"Gobsmacked","meaning":"completely astonished, shocked, or amazed","example":"I was completely gobsmacked when she told me the news.","favorite":false,"dateAdded":"2026-07-11T12:00:00Z","mistakeCount":0},
    {"id":"word-3","category":"words","term":"Quid","meaning":"A pound (£1) in British currency.","example":"Can you lend me ten quid until tomorrow?","favorite":false,"dateAdded":"2026-07-12T09:00:00Z","mistakeCount":0},
    {"id":"slang-1","category":"slangs","term":"Chuffed","meaning":"Very pleased, really happy, or proud about something.","example":"He was chuffed to bits with his birthday present.","favorite":false,"dateAdded":"2026-07-10T11:00:00Z","mistakeCount":0},
    {"id":"slang-2","category":"slangs","term":"Gutted","meaning":"Very disappointed, upset, or heartbroken about something.","example":"She was absolutely gutted when her team lost the cup final.","favorite":false,"dateAdded":"2026-07-11T14:30:00Z","mistakeCount":0},
    {"id":"slang-3","category":"slangs","term":"Skint","meaning":"Broke","example":"I would love to go to the pub, but I'm skint.","favorite":false,"dateAdded":"2026-07-12T16:00:00Z","mistakeCount":0},
    {"id":"phrase-1","category":"phrases","term":"Bob's your uncle","meaning":"👉 And there you go!\n👉 That’s it — it’s done!\n👉 Everything is sorted.","example":"Just add hot water, stir, and Bob's your uncle!","favorite":false,"dateAdded":"2026-07-10T08:00:00Z","mistakeCount":0},
    {"id":"phrase-2","category":"phrases","term":"Fancy a cuppa?","meaning":"Would you like a cup of tea?","example":"You look cold and tired. Fancy a cuppa?","favorite":false,"dateAdded":"2026-07-11T10:15:00Z","mistakeCount":0},
    {"id":"idiom-1","category":"idioms","term":"A penny for your thoughts","meaning":"👉 What are you thinking about?\n👉 Tell me what’s on your mind.","example":"You've been staring out the window for ages. A penny for your thoughts?","favorite":false,"dateAdded":"2026-07-10T09:30:00Z","mistakeCount":0},
    {"id":"idiom-2","category":"idioms","term":"Cost an arm and a leg","meaning":"To be extremely expensive.","example":"Buying that designer winter coat cost me an arm and a leg.","favorite":false,"dateAdded":"2026-07-12T11:00:00Z","mistakeCount":0},
    {"id":"slangs-1784605466595","category":"slangs","term":"Pukka","meaning":"Excellent, first-class, really good.","example":"You've done a pukka job.","favorite":false,"dateAdded":"2026-07-21T03:44:26.595Z","mistakeCount":0},
    {"id":"words-1784605875375","category":"words","term":"Bin","meaning":"trash can / garbage can","example":"Put the rubbish in the bin.","favorite":false,"dateAdded":"2026-07-21T03:51:15.375Z","mistakeCount":0},
    {"id":"idioms-1784605974856","category":"idioms","term":"Barking up the wrong tree","meaning":"To be mistaken about something or looking in the wrong place for an answer.","example":"I thought John broke the computer, but I was barking up the wrong tree.","favorite":false,"dateAdded":"2026-07-21T03:52:54.856Z","mistakeCount":0},
    {"id":"phrases-1784606144752","category":"phrases","term":"I’m just off","meaning":"I’m leaving now / I’m going.","example":"Right, I’m just off. See you later! → I’m leaving now.","favorite":false,"dateAdded":"2026-07-21T03:55:44.752Z","mistakeCount":0},
    {"id":"slangs-1784908163992","category":"slangs","term":"Naff","meaning":"Unfashionable, uncool, cheap-looking, or a bit rubbish.","example":"“The film was pretty naff, to be honest.” → The film wasn't very good.","favorite":false,"dateAdded":"2026-07-24T15:49:23.992Z","mistakeCount":0},
    {"id":"phrases-1784908238776","category":"phrases","term":"I’d better be off","meaning":"I should leave now.","example":"It’s getting late. I’d better be off.","favorite":false,"dateAdded":"2026-07-24T15:50:38.776Z","mistakeCount":0},
    {"id":"idioms-1784908318479","category":"idioms","term":"Go the extra mile","meaning":"To make more effort than is expected","example":"“She always goes the extra mile to help her customers.”","favorite":false,"dateAdded":"2026-07-24T15:51:58.479Z","mistakeCount":0},
    {"id":"words-1784908395608","category":"words","term":"Zebra crossing","meaning":"a pedestrian crossing marked with black and white stripes","example":"Always stop at a zebra crossing when someone is waiting to cross","favorite":false,"dateAdded":"2026-07-24T15:53:15.608Z","mistakeCount":0},
    {"id":"words-1785090558825","category":"words","term":"Post","meaning":"mail (letters and parcels).","example":"Did the post arrive this morning?","favorite":false,"dateAdded":"2026-07-26T18:29:18.825Z","mistakeCount":0},
    {"id":"slangs-1785090607360","category":"slangs","term":"Mither","meaning":"To bother, pester, or annoy someone, usually by repeatedly asking for something.","example":"“Stop mithering me—I’m trying to work.” → Stop bothering me.","favorite":false,"dateAdded":"2026-07-26T18:30:07.360Z","mistakeCount":0},
    {"id":"phrases-1785090654042","category":"phrases","term":"I’ll leave you to it","meaning":"I'll let you get on with what you're doing.","example":"You look busy, so I'll leave you to it.","favorite":false,"dateAdded":"2026-07-26T18:30:54.042Z","mistakeCount":0},
    {"id":"idioms-1785090694903","category":"idioms","term":"Burn the midnight oil","meaning":"To stay up late working or studying.","example":"“I had to burn the midnight oil to finish my assignment.”","favorite":false,"dateAdded":"2026-07-26T18:31:34.903Z","mistakeCount":0},
    {"id":"idioms-1785171218516","category":"idioms","term":"Miss the boat","meaning":"To miss an opportunity because you were too late.","example":"“I wanted to buy those concert tickets, but I missed the boat.”","favorite":false,"dateAdded":"2026-07-27T16:53:38.516Z","mistakeCount":0},
    {"id":"phrases-1785171276400","category":"phrases","term":"I’m easy","meaning":"I don't mind / I'm happy with whatever you choose.","example":"“Where shall we eat?” — “I’m easy.”","favorite":false,"dateAdded":"2026-07-27T16:54:36.400Z","mistakeCount":0},
    {"id":"slangs-1785171321689","category":"slangs","term":"Yap / Yapping","meaning":"To talk a lot, usually too much or about unimportant things.","example":"“He's been yapping all afternoon.” → He's been talking non-stop.","favorite":false,"dateAdded":"2026-07-27T16:55:21.689Z","mistakeCount":0},
    {"id":"words-1785171372753","category":"words","term":"Solicitor","meaning":"a lawyer who gives legal advice and prepares legal documents.","example":"You should speak to a solicitor before signing the contract.","favorite":false,"dateAdded":"2026-07-27T16:56:12.753Z","mistakeCount":0},
    {"id":"words-1785209723717","category":"words","term":"Timetable","meaning":"schedule (especially for trains, buses, schools, or events).","example":"Have you checked the train timetable?","favorite":false,"dateAdded":"2026-07-28T03:35:23.717Z","mistakeCount":0},
    {"id":"slangs-1785209781159","category":"slangs","term":"Chinwag","meaning":"A friendly chat or conversation.","example":"“I bumped into my neighbour and ended up having a half-hour chinwag.” → We ended up chatting for half an hour.","favorite":false,"dateAdded":"2026-07-28T03:36:21.159Z","mistakeCount":0},
    {"id":"phrases-1785209838393","category":"phrases","term":"I’ll catch you later","meaning":"See you later / I'll see you later.","example":"“I’ve got to head off. I’ll catch you later.”","favorite":false,"dateAdded":"2026-07-28T03:37:18.393Z","mistakeCount":0},
    {"id":"idioms-1785209890371","category":"idioms","term":"Once in a blue moon","meaning":"Very rarely.","example":"“We see each other once in a blue moon these days.”","favorite":false,"dateAdded":"2026-07-28T03:38:10.371Z","mistakeCount":0},
    {"id":"idioms-1785391218338","category":"idioms","term":"Be over the moon","meaning":"To be extremely happy or delighted.","example":"I was over the moon when I got the job","favorite":false,"dateAdded":"2026-07-30T06:00:18.338Z","mistakeCount":0},
    {"id":"phrases-1785391289356","category":"phrases","term":"I wouldn’t bother","meaning":"I don't think it's worth doing.","example":"“Should I queue up for that café?” — “I wouldn’t bother. It’s not that good.”","favorite":false,"dateAdded":"2026-07-30T06:01:29.356Z","mistakeCount":0},
    {"id":"slangs-1785391364081","category":"slangs","term":"Nicked","meaning":"Stolen","example":"“Someone's nicked my bike!” → Someone has stolen my bike.","favorite":false,"dateAdded":"2026-07-30T06:02:44.081Z","mistakeCount":0},
    {"id":"words-1785391414371","category":"words","term":"Revision","meaning":"studying or reviewing school material before an exam.","example":"I'm doing some revision for my maths exam","favorite":false,"dateAdded":"2026-07-30T06:03:34.371Z","mistakeCount":0}
  ],
  stats: {
    quizzesCompleted: 1,
    correctAnswers: 3,
    incorrectAnswers: 0,
    history: []
  }
};

// Master Cloud Database Config (Zero-Token Setup for Users)
const DEFAULT_CLOUD_DB_CONFIG = {
  pat: '',
  owner: 'yairstein2002-afk',
  repo: 'british-english-vault',
  branch: 'main',
  path: 'data/vault.json'
};

export function getGitHubConfig() {
  return DEFAULT_CLOUD_DB_CONFIG;
}

export function saveGitHubConfig(config) {
  return true;
}

// Auth & Encoding Helpers
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
function mergeRemoteWithLocal(parsedData, onSyncStateChange = () => {}, ignoreDeleted = false) {
  const isLocalStorageEmpty = !localStorage.getItem(LOCAL_STORAGE_KEY);
  
  // If localStorage was cleared or explicit full restore requested, Cloud DB is 100% ground truth!
  if ((isLocalStorageEmpty || ignoreDeleted) && parsedData && Array.isArray(parsedData.items) && parsedData.items.length > 0) {
    saveLocalData(parsedData);
    onSyncStateChange('synced');
    return parsedData;
  }

  const localData = getLocalFallbackData();
  const deletedIds = ignoreDeleted ? new Set() : new Set(localData.deletedIds || []);

  const itemMap = new Map();

  // 1. Load remote Cloud DB items first into map
  (parsedData.items || []).forEach(gitItem => {
    if (gitItem && gitItem.id && !deletedIds.has(gitItem.id)) {
      itemMap.set(gitItem.id, gitItem);
    }
  });

  // 2. Overlay local items (offline local additions/edits take priority)
  (localData.items || []).forEach(item => {
    if (item && item.id && !deletedIds.has(item.id)) {
      itemMap.set(item.id, item);
    }
  });

  const mergedItems = Array.from(itemMap.values());
  
  const mergedStats = {
    quizzesCompleted: Math.max(parsedData.stats?.quizzesCompleted || 0, localData.stats?.quizzesCompleted || 0),
    correctAnswers: Math.max(parsedData.stats?.correctAnswers || 0, localData.stats?.correctAnswers || 0),
    incorrectAnswers: Math.max(parsedData.stats?.incorrectAnswers || 0, localData.stats?.incorrectAnswers || 0),
    history: [...(localData.stats?.history || [])]
  };
  
  (parsedData.stats?.history || []).forEach(gitHist => {
    const histExists = mergedStats.history.some(localHist => 
      localHist.date === gitHist.date && 
      localHist.percentage === gitHist.percentage
    );
    if (!histExists) {
      mergedStats.history.push(gitHist);
    }
  });

  const mergedData = {
    items: mergedItems,
    stats: mergedStats,
    deletedIds: Array.from(deletedIds)
  };

  saveLocalData(mergedData);
  onSyncStateChange('synced');
  return mergedData;
}

/**
 * Fetch Data: Checks GitHub first. If configured, pulls the data file.
 * Falls back to raw.githubusercontent.com CDN, local static vault.json, and localStorage.
 */
export async function fetchVaultData(onSyncStateChange = () => {}, forceRefresh = false, ignoreDeleted = false) {
  const config = getGitHubConfig();
  
  if (!config) {
    onSyncStateChange('local');
    return getLocalFallbackData();
  }

  // If localStorage was cleared or force refresh, clear session cache
  const isLocalEmpty = !localStorage.getItem(LOCAL_STORAGE_KEY);
  if (isLocalEmpty || forceRefresh) {
    sessionStorage.removeItem('bev_last_github_fetch_time');
    sessionStorage.removeItem('bev_github_cached_remote');
  }

  // 5-Minute Session Cache check to prevent GitHub 403 Rate Limits
  const now = Date.now();
  const lastFetch = sessionStorage.getItem('bev_last_github_fetch_time');
  const cachedRemoteJson = sessionStorage.getItem('bev_github_cached_remote');

  if (!forceRefresh && !isLocalEmpty && lastFetch && cachedRemoteJson && (now - parseInt(lastFetch, 10) < 300000)) {
    try {
      const parsedData = JSON.parse(cachedRemoteJson);
      return mergeRemoteWithLocal(parsedData, onSyncStateChange, ignoreDeleted);
    } catch (e) {}
  }

  onSyncStateChange('syncing');
  const { pat, owner, repo, branch, path } = config;
  const targetBranch = branch || 'main';
  const targetPath = path || 'data/vault.json';
  
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${targetPath}?ref=${targetBranch}&t=${now}`;
  const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${targetBranch}/${targetPath}?t=${now}`;
  const localUrl = `${import.meta.env?.BASE_URL || './'}data/vault.json?t=${now}`;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    let parsedData = null;

    // 1. Try GitHub API
    try {
      let response = null;
      if (pat) {
        response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': getAuthHeader(pat),
            'Accept': 'application/vnd.github.v3+json'
          },
          signal: controller.signal
        }).catch(() => null);
      }

      if (!response || response.status === 401 || response.status === 403) {
        response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          },
          signal: controller.signal
        }).catch(() => null);
      }

      if (response && response.status === 200) {
        const data = await response.json();
        const contentString = decodeBase64UTF8(data.content);
        parsedData = JSON.parse(contentString);
        if (data.sha) {
          sessionStorage.setItem('bev_github_file_sha', data.sha);
        }
      }
    } catch (apiErr) {
      console.warn("GitHub API fetch notice:", apiErr);
    }

    // 2. If API didn't return data (e.g. Rate Limit 403 or network error), fallback to direct raw CDN
    if (!parsedData) {
      try {
        const rawRes = await fetch(rawUrl, {
          method: 'GET',
          signal: controller.signal
        }).catch(() => null);

        if (rawRes && rawRes.ok) {
          parsedData = await rawRes.json();
        }
      } catch (rawErr) {
        console.warn("Raw CDN fetch notice:", rawErr);
      }
    }

    // 3. If raw CDN also failed, fallback to local bundled static data/vault.json
    if (!parsedData) {
      try {
        const localRes = await fetch(localUrl, {
          method: 'GET',
          signal: controller.signal
        }).catch(() => null);

        if (localRes && localRes.ok) {
          parsedData = await localRes.json();
        }
      } catch (locErr) {
        console.warn("Local static bundle fetch notice:", locErr);
      }
    }

    clearTimeout(timeoutId);

    if (parsedData && Array.isArray(parsedData.items) && parsedData.items.length > 0) {
      sessionStorage.setItem('bev_last_github_fetch_time', now.toString());
      sessionStorage.setItem('bev_github_cached_remote', JSON.stringify(parsedData));
      return mergeRemoteWithLocal(parsedData, onSyncStateChange, ignoreDeleted);
    }

    onSyncStateChange('local');
    return getLocalFallbackData();
  } catch (error) {
    console.warn("GitHub fetch failed, loading local cache:", error?.message || error);
    onSyncStateChange('local');
    return getLocalFallbackData();
  }
}

/**
 * Explicit Data Restoration from Cloud Database
 */
export async function restoreAllDataFromCloud(onSyncStateChange = () => {}) {
  const localData = getLocalFallbackData();
  localData.deletedIds = [];
  saveLocalData(localData);
  sessionStorage.removeItem('bev_last_github_fetch_time');
  sessionStorage.removeItem('bev_github_cached_remote');
  return await fetchVaultData(onSyncStateChange, true, true);
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
      sessionStorage.setItem('bev_last_github_fetch_time', Date.now().toString());
      sessionStorage.setItem('bev_github_cached_remote', JSON.stringify(data));
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
export function getLocalFallbackData() {
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
