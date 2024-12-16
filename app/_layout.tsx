import 'expo-dev-client';
import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context'
import '@/global.css'
import { useColorScheme } from "react-native";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/db/tanstack";
import Toast from "react-native-toast-message";
export default function RootLayout() {
  const theme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })
  if (!loaded) return null

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={theme == 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name='index' options={{
              title: 'Watchlist'
            }} />
            <Stack.Screen name='title/[id]' options={{
              headerShown: false
            }} />
            <Stack.Screen name="search" options={{
              headerShown: false,
              presentation: 'modal'
            }} />
          </Stack>
          <Toast />
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
