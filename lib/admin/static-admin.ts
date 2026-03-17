export const STATIC_ADMIN_EMAIL = 'admin@fotopalace.local';
export const STATIC_ADMIN_PASSWORD = 'FotoPalace@123';
export const STATIC_ADMIN_TOKEN = 'fotopalace-admin-static-token-v1';

export const STATIC_ADMIN_TOKEN_STORAGE_KEY = 'foto-palace-admin-token';
export const STATIC_ADMIN_EMAIL_STORAGE_KEY = 'foto-palace-admin-email';

export function isStaticAdminCredentials(email: string, password: string) {
  return email.trim().toLowerCase() === STATIC_ADMIN_EMAIL && password === STATIC_ADMIN_PASSWORD;
}
