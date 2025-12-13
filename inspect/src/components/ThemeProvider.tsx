// src/components/ThemeProvider.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import { darkTheme, lightTheme, getTheme } from '../theme/themes';
import { ThemeContextType, ThemeMode } from '../theme/types';

// Criar contexto com valor padrão
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme = ThemeMode.AUTO 
}) => {
  const deviceTheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialTheme);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(deviceTheme === 'dark');
  
  // Determinar qual tema usar
  const getCurrentTheme = () => {
    switch (themeMode) {
      case ThemeMode.LIGHT:
        return lightTheme;
      case ThemeMode.DARK:
        return darkTheme;
      case ThemeMode.AUTO:
        return deviceTheme === 'dark' ? darkTheme : lightTheme;
      default:
        return deviceTheme === 'dark' ? darkTheme : lightTheme;
    }
  };
  
  // Detectar mudanças no tema do dispositivo
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeMode === ThemeMode.AUTO) {
        setIsDarkMode(colorScheme === 'dark');
      }
    });
    
    return () => subscription.remove();
  }, [themeMode]);
  
  // Forçar tema escuro durante o dia (para sol forte)
  const shouldForceDarkForSunlight = (): boolean => {
    const hour = new Date().getHours();
    const isDaytime = hour >= 6 && hour <= 18;
    
    // Aqui você poderia integrar com sensor de luz real
    // Por enquanto, forçar escuro durante o dia
    return isDaytime;
  };
  
  // Tema atual considerando condições solares
  const currentTheme = shouldForceDarkForSunlight() ? darkTheme : getCurrentTheme();
  
  const toggleTheme = () => {
    const newMode = isDarkMode ? ThemeMode.LIGHT : ThemeMode.DARK;
    setThemeMode(newMode);
    setIsDarkMode(!isDarkMode);
  };
  
  const setTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
    setIsDarkMode(mode === ThemeMode.DARK || (mode === ThemeMode.AUTO && deviceTheme === 'dark'));
  };
  
  const contextValue: ThemeContextType = {
    theme: currentTheme,
    isDarkMode,
    toggleTheme,
    setTheme,
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};