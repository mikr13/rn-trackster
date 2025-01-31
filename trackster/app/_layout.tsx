import '@/global.css';

import { useColorScheme } from '@/hooks/useColorScheme';
import { NAV_THEME } from '@/lib/constants';
import { ReactQueryProvider } from '@/providers/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

const FONTS: Theme["fonts"] = {
  regular: {
    fontFamily: 'Inter_400Regular',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'Inter_500Medium',
    fontWeight: 'normal',
  },
  bold: {
    fontFamily: 'Inter_700Bold',
    fontWeight: 'normal',
  },
  heavy: {
    fontFamily: 'Inter_800ExtraBold',
    fontWeight: 'normal',
  },
}

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
  fonts: FONTS
};

const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
  fonts: FONTS
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        await AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ReactQueryProvider>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        <Slot />
      </ThemeProvider>
    </ReactQueryProvider>
  );
}

export default RootLayout;
