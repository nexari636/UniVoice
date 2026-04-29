import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import FloatingButton from '@/components/utils/FloatingButton';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false, title: "AMIC" }} />
        <Stack.Screen name="chatUserMessages" options={{ headerShown: false, title: "AMIC" }} />
        <Stack.Screen name="ViewProfile" options={{ headerShown: false, title: "Profile" }} />
        <Stack.Screen name="ProfileChatUserPrincipal" options={{ headerShown: false, title: "Profile Chat User" }} />
        <Stack.Screen name="uriSettingsApp" options={{ headerShown: false, title: "AMIC" }} />
        <Stack.Screen name="main" options={{ headerShown: false, title: "AMIC" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <FloatingButton></FloatingButton>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
