import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'oetTest-app',
  webDir: 'www',
  bundledWebRuntime: false, 

  server: {
    androidScheme: "http",
    cleartext: true,
    allowNavigation: [
      "http://192.168.0.10"
    ],
  }
};

export default config;
