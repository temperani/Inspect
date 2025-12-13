// src/theme/themes.ts
import { solarPalette } from './colors';
import { Theme } from './types';

export const darkTheme: Theme = {
  colors: solarPalette.dark,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
    round: 999,
  },
  typography: {
    h1: { 
      fontSize: 32, 
      fontWeight: '700' as const, 
      lineHeight: 40,
      letterSpacing: 0.5,
    },
    h2: { 
      fontSize: 24, 
      fontWeight: '700' as const, 
      lineHeight: 32,
      letterSpacing: 0.3,
    },
    h3: { 
      fontSize: 18, 
      fontWeight: '600' as const, 
      lineHeight: 24,
    },
    body: { 
      fontSize: 16, 
      lineHeight: 22,
      fontWeight: '400' as const,
    },
    caption: { 
      fontSize: 12, 
      lineHeight: 16,
      fontWeight: '400' as const,
    },
  },
};

export const lightTheme: Theme = {
  colors: solarPalette.light,
  spacing: { ...darkTheme.spacing },
  borderRadius: { ...darkTheme.borderRadius },
  typography: { 
    ...darkTheme.typography,
    // Ajustes específicos para modo claro (fontes mais escuras)
    h1: { ...darkTheme.typography.h1, fontWeight: '800' as const },
    h2: { ...darkTheme.typography.h2, fontWeight: '700' as const },
  },
};

// Função para obter tema baseado no modo
export const getTheme = (mode: 'light' | 'dark'): Theme => {
  return mode === 'dark' ? darkTheme : lightTheme;
};

// Hook personalizado para usar tema com TypeScript
import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeProvider';
import { ThemeContextType } from './types';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  return context;
};

// Hook para estilos dinâmicos
import { StyleSheet } from 'react-native';

export const useSolarStyles = () => {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    solarContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md,
    },
    solarText: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.h3.fontSize,
      fontWeight: '600' as const,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    solarButton: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      borderWidth: 2,
      borderColor: theme.colors.textPrimary,
      minHeight: 56,
    },
    solarCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.large,
      padding: theme.spacing.lg,
      marginVertical: theme.spacing.sm,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
  });
  
  return styles;
};