import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'granp.app.customer',
  appName: 'granp-customer-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
