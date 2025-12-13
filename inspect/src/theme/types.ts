// src/theme/types.ts

// Tipos para cores
export type ColorPalette = {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  danger: string;
  warning: string;
  info: string;
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  border: string;
  divider: string;
  overlay: string;
};

export type CommonColors = {
  white: string;
  black: string;
  transparent: string;
  highContrast: {
    neonOrange: string;
    neonGreen: string;
    neonYellow: string;
    darkBlue: string;
  };
};

// Tipos para tema completo
export interface Theme {
  colors: ColorPalette;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
    round: number;
  };
  typography: {
    h1: TextStyle;
    h2: TextStyle;
    h3: TextStyle;
    body: TextStyle;
    caption: TextStyle;
  };
}

// Extensão do TextStyle do React Native
import { TextStyle } from 'react-native';

// Tipo para o contexto do tema
export interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

// Props para componentes que usam tema
export interface WithThemeProps {
  theme: Theme;
}

// Enum para modos de tema
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto'
}

// Tipo para variantes de botão
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'outline';

// Tipo para paleta solar completa
export interface SolarPalette {
  dark: ColorPalette;
  light: ColorPalette;
  common: CommonColors;
}