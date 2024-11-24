import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.johnmata.examenbimetral',
  appName: 'Examen Bimestral - John Mata',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false,
      androidSpinnerStyle: 'small',
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: false,
      splashImmersive: true,
    },
  },
};

export default config;
