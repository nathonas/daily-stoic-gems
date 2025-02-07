
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.lovable.stoicquotes',
  appName: 'Daily Stoic Quotes',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
    url: 'http://10.0.2.2:8080',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
    },
  },
};

export default config;
