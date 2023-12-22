import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'granp.app.customer',
  appName: 'GranP',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    }
  }
};

export default config;
