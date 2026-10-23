/**
 * British English Vault - Supabase PostgreSQL Database Service
 */

const SUPABASE_CONFIG_KEY = 'bev_supabase_custom_config';

export function getSupabaseConfig() {
  const raw = localStorage.getItem(SUPABASE_CONFIG_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.url && parsed.key) return parsed;
    } catch (e) {}
  }
  return {
    url: 'https://iqngleyyuwyaomufdmlm.supabase.co',
    key: ''
  };
}

export function saveSupabaseConfig(url, key) {
  if (url && key) {
    let cleanUrl = url.trim().replace(/\/+$/, '');
    if (cleanUrl.endsWith('/rest/v1')) {
      cleanUrl = cleanUrl.replace(/\/rest\/v1$/, '');
    }
    localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify({ url: cleanUrl, key: key.trim() }));
    return true;
  }
  return false;
}

/**
 * Get HTTP Headers for Supabase REST API
 */
function getSupabaseHeaders() {
  const config = getSupabaseConfig();
  return {
    'apikey': config.key,
    'Authorization': `Bearer ${config.key}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };
}

/**
 * Fetch all Vault items from Supabase PostgreSQL Database
 */
export async function fetchVaultFromSupabase() {
  const config = getSupabaseConfig();
  if (!config.url || !config.key) {
    return { success: false, error: 'Supabase URL or Key is not configured.' };
  }
  
  const url = `${config.url}/rest/v1/vault_items?select=*&order=id.asc`;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, {
      method: 'GET',
      headers: getSupabaseHeaders(),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const items = await response.json();
      return { success: true, items: Array.isArray(items) ? items : [] };
    } else {
      let errDetail = `HTTP ${response.status}`;
      try {
        const errJson = await response.json();
        if (errJson.message) errDetail = errJson.message;
        else if (errJson.hint) errDetail = `${errJson.message || ''} (${errJson.hint})`;
        else if (errJson.details) errDetail = errJson.details;
      } catch (e) {}
      return { success: false, status: response.status, error: errDetail };
    }
  } catch (err) {
    console.warn("Supabase fetch notice:", err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Insert or Update (Upsert) an item in Supabase PostgreSQL Database
 */
export async function upsertItemInSupabase(item) {
  const config = getSupabaseConfig();
  if (!config.url || !config.key) return false;

  const url = `${config.url}/rest/v1/vault_items`;
  const headers = {
    ...getSupabaseHeaders(),
    'Prefer': 'resolution=merge-duplicates,return=representation'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(item)
    });

    return response.ok;
  } catch (err) {
    console.error("Supabase upsert error:", err);
    return false;
  }
}

/**
 * Delete an item from Supabase PostgreSQL Database
 */
export async function deleteItemFromSupabase(itemId) {
  const config = getSupabaseConfig();
  if (!config.url || !config.key) return false;

  const url = `${config.url}/rest/v1/vault_items?id=eq.${encodeURIComponent(itemId)}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: getSupabaseHeaders()
    });

    return response.ok;
  } catch (err) {
    console.error("Supabase delete error:", err);
    return false;
  }
}

/**
 * Sync entire Vault database items to Supabase
 */
export async function syncAllVaultToSupabase(vaultData) {
  if (!vaultData || !Array.isArray(vaultData.items)) return { success: false, count: 0 };
  const config = getSupabaseConfig();
  if (!config.url || !config.key) return { success: false, count: 0, error: 'No credentials' };

  // 1. Try batch upsert
  const url = `${config.url}/rest/v1/vault_items`;
  const headers = {
    ...getSupabaseHeaders(),
    'Prefer': 'resolution=merge-duplicates,return=representation'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(vaultData.items)
    });

    if (response.ok) {
      return { success: true, count: vaultData.items.length };
    }
  } catch (err) {
    console.warn("Batch Supabase sync fallback:", err);
  }

  // 2. Sequential fallback if batch rejected
  let successCount = 0;
  for (const item of vaultData.items) {
    const ok = await upsertItemInSupabase(item);
    if (ok) successCount++;
  }
  return { success: successCount > 0, count: successCount };
}
