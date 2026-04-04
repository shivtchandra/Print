import type { CapacitorConfig } from '@capacitor/cli';

/**
 * APK loads your **hosted** Next.js admin in a WebView (no Play Store required).
 *
 * Before `npm run cap:sync`, set where the app should open:
 *
 *   export CAPACITOR_SERVER_URL="https://your-domain.com/admin/login"
 *   npm run cap:sync
 *
 * For LAN dev against `next dev`, use your machine IP and http (cleartext is enabled automatically):
 *
 *   export CAPACITOR_SERVER_URL="http://192.168.1.10:3000/admin/login"
 *   npm run cap:sync
 */
const serverUrl = process.env.CAPACITOR_SERVER_URL?.trim();

const config: CapacitorConfig = {
  appId: 'com.fotopalace.admin',
  appName: 'Foto Palace Admin',
  webDir: 'capacitor-www',
  ...(serverUrl
    ? {
        server: {
          url: serverUrl,
          cleartext: serverUrl.startsWith('http://')
        }
      }
    : {})
};

export default config;
