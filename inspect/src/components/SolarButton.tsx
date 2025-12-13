// src/components/SolarButton.tsx
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { 
  TouchableOpacity, 
  Text, 
  View,
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  GestureResponderEvent 
} from 'react-native';
import { useTheme } from '../theme/themes';
import { ButtonVariant } from '../theme/types';

interface SolarButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
}

const SolarButton: React.FC<SolarButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  disabled = false,
  fullWidth = false,
  icon,
  loading = false,
}) => {
  const { theme } = useTheme();
  
  const getBackgroundColor = (): string => {
    switch (variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'danger': return theme.colors.danger;
      case 'success': return theme.colors.accent;
      case 'warning': return theme.colors.warning;
      case 'outline': return 'transparent';
      default: return theme.colors.primary;
    }
  };
  
  const getBorderColor = (): string => {
    if (variant === 'outline') return theme.colors.primary;
    return theme.colors.textPrimary;
  };
  
  const getTextColor = (): string => {
    if (variant === 'outline') return theme.colors.primary;
    return theme.colors.textPrimary;
  };
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: getBackgroundColor(),
      borderRadius: theme.borderRadius.medium,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderWidth: variant === 'outline' ? 2 : 2,
      borderColor: getBorderColor(),
      minHeight: 56,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      flexDirection: 'row' as const,
      opacity: disabled || loading ? 0.6 : 1,
      width: fullWidth ? '100%' : 'auto',
    },
    text: {
      color: getTextColor(),
      fontSize: theme.typography.h3.fontSize,
      fontWeight: '600' as const,
      textAlign: 'center' as const,
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
    },
    iconContainer: {
      marginRight: icon ? theme.spacing.sm : 0,
    },
    spinner: {
      marginRight: theme.spacing.sm,
    },
  });
  
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      accessibilityLabel={title}
      accessibilityRole="button"
    >
      {loading && <ActivityIndicator size="small" color={getTextColor()} style={styles.spinner} />}
      {icon && !loading && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SolarButton;