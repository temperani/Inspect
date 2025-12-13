// App.tsx
import React from 'react';
import { 
  StatusBar, 
  useColorScheme, 
  LogBox,
  Platform,
  UIManager 
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/components/ThemeProvider';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import { ThemeMode } from './src/theme/types';

// Ignorar logs específicos (opcional)
LogBox.ignoreLogs(['Require cycle:']);

// Habilitar LayoutAnimation no Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App: React.FC = () => {
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  
  // Inicializar com tema automático, mas forçar escuro durante o dia
  const getInitialTheme = (): ThemeMode => {
    const hour = new Date().getHours();
    const isDaytime = hour >= 6 && hour <= 18;
    
    // Para app solar, começar com tema escuro se for dia
    return isDaytime ? ThemeMode.DARK : ThemeMode.AUTO;
  };
  
  return (
    <SafeAreaProvider>
      <ThemeProvider initialTheme={getInitialTheme()}>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        {isLoggedIn ? (
          <HomeScreen />
        ) : (
          <LoginScreen onLogin={() => setIsLoggedIn(true)} />
        )}
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;