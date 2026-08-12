/**
 * British English Vault - User Authentication & Personal Cloud Database Service
 */

const USER_SESSION_KEY = 'bev_user_session';
const USERS_DB_KEY = 'bev_registered_users';

/**
 * Get current logged in user session
 */
export function getCurrentUser() {
  const session = localStorage.getItem(USER_SESSION_KEY);
  if (session) {
    try {
      return JSON.parse(session);
    } catch (e) {}
  }
  return null;
}

/**
 * Register a new user account
 */
export async function signUpUser(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();
  if (!cleanEmail || !password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  const usersRaw = localStorage.getItem(USERS_DB_KEY);
  const users = usersRaw ? JSON.parse(usersRaw) : {};

  if (users[cleanEmail]) {
    throw new Error("An account with this email address already exists. Please Sign In.");
  }

  const user = {
    id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    email: cleanEmail,
    passwordHash: btoa(password),
    createdAt: new Date().toISOString()
  };

  users[cleanEmail] = user;
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));

  // Set session
  const session = { id: user.id, email: user.email };
  localStorage.setItem(USER_SESSION_KEY, JSON.stringify(session));

  return session;
}

/**
 * Sign in existing user account
 */
export async function signInUser(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const usersRaw = localStorage.getItem(USERS_DB_KEY);
  const users = usersRaw ? JSON.parse(usersRaw) : {};

  const existingUser = users[cleanEmail];
  if (!existingUser) {
    throw new Error("No account found with this email. Please check your email or click Register.");
  }

  if (existingUser.passwordHash !== btoa(password)) {
    throw new Error("Incorrect password. Please try again.");
  }

  const session = { id: existingUser.id, email: existingUser.email };
  localStorage.setItem(USER_SESSION_KEY, JSON.stringify(session));
  return session;
}

/**
 * Sign out current user
 */
export function signOutUser() {
  localStorage.removeItem(USER_SESSION_KEY);
}

/**
 * Get Personal Cloud Vault Data for specific User ID
 */
export function getUserPersonalVault(userId) {
  if (!userId) return null;
  const userVaultKey = `bev_vault_user_${userId}`;
  const data = localStorage.getItem(userVaultKey);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {}
  }
  return null;
}

/**
 * Save Personal Cloud Vault Data for specific User ID
 */
export function saveUserPersonalVault(userId, vaultData) {
  if (!userId || !vaultData) return;
  const userVaultKey = `bev_vault_user_${userId}`;
  localStorage.setItem(userVaultKey, JSON.stringify(vaultData));
}
