/**
 * British English Vault - Supabase PostgreSQL Database Service
 */

// Supabase REST Database Credentials
const SUPABASE_PROJECT_URL = 'https://british-english-vault.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyaXRpc2gtZW5nbGlzaC12YXVsdCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzgzOTE5ODAwLCJleHAiOjIwOTk0OTU4MDB9.vault_supabase_public_anon_key';

/**
 * Get HTTP Headers for Supabase REST API
 */
function getSupabaseHeaders() {
  return {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };
}

/**
 * Fetch all Vault items from Supabase PostgreSQL Database
 */
export async function fetchVaultFromSupabase() {
  const url = `${SUPABASE_PROJECT_URL}/rest/v1/vault_items?select=*&order=id.asc`;
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
  const url = `${SUPABASE_PROJECT_URL}/rest/v1/vault_items`;
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
  const url = `${SUPABASE_PROJECT_URL}/rest/v1/vault_items?id=eq.${encodeURIComponent(itemId)}`;
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
