// App.tsx
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [checkingLogin, setCheckingLogin] = React.useState<boolean>(true);
  
  // Inicializar com tema automático, mas forçar escuro durante o dia
  const getInitialTheme = (): ThemeMode => {
    const hour = new Date().getHours();
    const isDaytime = hour >= 6 && hour <= 18;
    
    // Para app solar, começar com tema escuro se for dia
    return isDaytime ? ThemeMode.DARK : ThemeMode.AUTO;
  };
  
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        setIsLoggedIn(!!token);
      } catch (e) {
        setIsLoggedIn(false);
      } finally {
        setCheckingLogin(false);
      }
    };
    checkToken();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('auth_token');
    setIsLoggedIn(false);
  };

  return (
    <SafeAreaProvider>
      <ThemeProvider initialTheme={getInitialTheme()}>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        {!checkingLogin && (isLoggedIn ? (
          <HomeScreen onLogout={handleLogout} />
        ) : (
          <LoginScreen onLogin={() => setIsLoggedIn(true)} />
        ))}
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;