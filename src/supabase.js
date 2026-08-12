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
    url: 'https://british-english-vault.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyaXRpc2gtZW5nbGlzaC12YXVsdCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzgzOTE5ODAwLCJleHAiOjIwOTk0OTU4MDB9.vault_supabase_public_anon_key'
  };
}

export function saveSupabaseConfig(url, key) {
  if (url && key) {
    localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify({ url: url.trim(), key: key.trim() }));
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
  const url = `${config.url}/rest/v1/vault_items?select=*&order=id.asc`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: getSupabaseHeaders()
    });

    if (response.ok) {
      const items = await response.json();
      return { success: true, items };
    } else {
      return { success: false, status: response.status };
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
