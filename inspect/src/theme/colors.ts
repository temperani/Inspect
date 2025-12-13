// src/theme/colors.ts
import { SolarPalette } from './types';

export const solarPalette: SolarPalette = {
  // Modo Escuro (Recomendado para sol)
  dark: {
    background: '#121212',
    surface: '#1E1E1E',
    primary: '#00BCD4',
    secondary: '#FF9800',
    accent: '#4CAF50',
    danger: '#F44336',
    warning: '#FFC107',
    info: '#2196F3',
    textPrimary: '#FFFFFF',
    textSecondary: '#BDBDBD',
    textDisabled: '#757575',
    border: '#424242',
    divider: '#303030',
    overlay: 'rgba(0, 0, 0, 0.8)',
  },
  
  // Modo Claro
  light: {
    background: '#F5F5F5',
    surface: '#FFFFFF',
    primary: '#1E88E5',
    secondary: '#E65100',
    accent: '#388E3C',
    danger: '#D32F2F',
    warning: '#F57C00',
    info: '#1976D2',
    textPrimary: '#212121',
    textSecondary: '#757575',
    textDisabled: '#9E9E9E',
    border: '#E0E0E0',
    divider: '#EEEEEE',
    overlay: 'rgba(255, 255, 255, 0.9)',
  },
  
  // Cores comuns (não mudam com tema)
  common: {
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
    highContrast: {
      neonOrange: '#FF6D00',
      neonGreen: '#00E676',
      neonYellow: '#FFEA00',
      darkBlue: '#0D47A1',
    }
  }
};

// Helper para obter cores de alto contraste baseado no tema
export const getHighContrastColor = (isDark: boolean, type: 'text' | 'background' | 'accent'): string => {
  if (isDark) {
    switch (type) {
      case 'text': return solarPalette.dark.textPrimary;
      case 'background': return solarPalette.dark.background;
      case 'accent': return solarPalette.dark.primary;
    }
  } else {
    switch (type) {
      case 'text': return solarPalette.light.textPrimary;
      case 'background': return solarPalette.light.background;
      case 'accent': return solarPalette.light.primary;
    }
  }
};

// Export para uso rápido
export const colors = solarPalette;