// src/components/SolarCard.tsx
import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme/themes';

interface SolarCardProps {
  children: ReactNode;
  style?: ViewStyle;
  elevation?: 'low' | 'medium' | 'high';
  withBorder?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
}

const SolarCard: React.FC<SolarCardProps> = ({
  children,
  style,
  elevation = 'medium',
  withBorder = true,
  padding = 'medium',
}) => {
  const { theme } = useTheme();
  
  const getElevationStyle = () => {
    switch (elevation) {
      case 'low':
        return {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        };
      case 'medium':
        return {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        };
      case 'high':
        return {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.5,
          shadowRadius: 16,
          elevation: 16,
        };
    }
  };
  
  const getPadding = () => {
    switch (padding) {
      case 'none': return 0;
      case 'small': return theme.spacing.sm;
      case 'medium': return theme.spacing.md;
      case 'large': return theme.spacing.lg;
    }
  };
  
  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.large,
      padding: getPadding(),
      marginVertical: theme.spacing.sm,
      borderWidth: withBorder ? 1 : 0,
      borderColor: theme.colors.border,
      ...getElevationStyle(),
    },
  });
  
  return (
    <View style={[styles.card, style]} accessibilityRole="summary">
      {children}
    </View>
  );
};

export default SolarCard;