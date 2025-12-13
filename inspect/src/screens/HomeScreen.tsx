// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Switch,
} from 'react-native';
import { useTheme } from '../theme/themes';
import SolarButton from '../components/SolarButton';
import SolarCard from '../components/SolarCard';
import { ThemeMode } from '../theme/types';

interface HomeScreenProps {
  onLogout?: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onLogout }) => {
  const { theme, isDarkMode, toggleTheme, setTheme } = useTheme();
  
  const [isHighContrast, setIsHighContrast] = useState<boolean>(true);
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      padding: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
      backgroundColor: theme.colors.surface,
    },
    title: {
      ...theme.typography.h1,
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing.sm,
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    subtitle: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.md,
    },
    content: {
      padding: theme.spacing.lg,
    },
    section: {
      marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
      ...theme.typography.h2,
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing.md,
    },
    row: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      marginBottom: theme.spacing.md,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.medium,
    },
    label: {
      ...theme.typography.body,
      color: theme.colors.textPrimary,
      fontWeight: '500' as const,
    },
    buttonGroup: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
      gap: theme.spacing.sm,
      marginBottom: theme.spacing.md,
    },
    demoText: {
      ...theme.typography.body,
      color: theme.colors.textPrimary,
      backgroundColor: isHighContrast ? theme.colors.surface : 'transparent',
      padding: isHighContrast ? theme.spacing.sm : 0,
      borderRadius: isHighContrast ? theme.borderRadius.small : 0,
      borderWidth: isHighContrast ? 1 : 0,
      borderColor: isHighContrast ? theme.colors.primary : 'transparent',
    },
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>🌞 App Solar</Text>
          <Text style={styles.subtitle}>
            Interface otimizada para uso sob sol forte
          </Text>
          {onLogout && (
            <View style={{ marginTop: theme.spacing.sm }}>
              <SolarButton title="Sair" onPress={() => onLogout()} variant="danger" />
            </View>
          )}
        </View>
        
        <View style={styles.content}>
          {/* Controles de Tema */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Configurações de Tema</Text>
            
            <View style={styles.row}>
              <Text style={styles.label}>Modo Escuro</Text>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={isDarkMode ? theme.colors.secondary : '#f4f3f4'}
              />
            </View>
            
            <View style={styles.row}>
              <Text style={styles.label}>Alto Contraste (Recomendado)</Text>
              <Switch
                value={isHighContrast}
                onValueChange={setIsHighContrast}
                trackColor={{ false: '#767577', true: theme.colors.accent }}
                thumbColor={isHighContrast ? theme.colors.warning : '#f4f3f4'}
              />
            </View>
            
            <View style={styles.buttonGroup}>
              <SolarButton
                title="Modo Claro"
                onPress={() => setTheme(ThemeMode.LIGHT)}
                variant={!isDarkMode ? 'primary' : 'outline'}
                style={{ flex: 1, minWidth: 100 }}
              />
              <SolarButton
                title="Modo Escuro"
                onPress={() => setTheme(ThemeMode.DARK)}
                variant={isDarkMode ? 'primary' : 'outline'}
                style={{ flex: 1, minWidth: 100 }}
              />
              <SolarButton
                title="Automático"
                onPress={() => setTheme(ThemeMode.AUTO)}
                variant="secondary"
                style={{ flex: 1, minWidth: 100 }}
              />
            </View>
          </View>
          
          {/* Demonstração de Cores */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Paleta Solar</Text>
            
            <SolarCard elevation="high">
              <View style={{ marginBottom: theme.spacing.md }}>
                <Text style={styles.demoText}>
                  Texto de exemplo com alto contraste para legibilidade sob sol
                </Text>
              </View>
              
              <View style={styles.buttonGroup}>
                <SolarButton
                  title="Primário"
                  onPress={() => {}}
                  variant="primary"
                />
                <SolarButton
                  title="Secundário"
                  onPress={() => {}}
                  variant="secondary"
                />
                <SolarButton
                  title="Sucesso"
                  onPress={() => {}}
                  variant="success"
                />
                <SolarButton
                  title="Perigo"
                  onPress={() => {}}
                  variant="danger"
                />
                <SolarButton
                  title="Aviso"
                  onPress={() => {}}
                  variant="warning"
                />
                <SolarButton
                  title="Outline"
                  onPress={() => {}}
                  variant="outline"
                />
              </View>
            </SolarCard>
          </View>
          
          {/* Informações do Tema */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações do Tema Atual</Text>
            
            <SolarCard>
              <View style={styles.row}>
                <Text style={styles.label}>Fundo:</Text>
                <View 
                  style={{ 
                    width: 24, 
                    height: 24, 
                    backgroundColor: theme.colors.background,
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                  }} 
                />
              </View>
              
              <View style={styles.row}>
                <Text style={styles.label}>Superfície:</Text>
                <View 
                  style={{ 
                    width: 24, 
                    height: 24, 
                    backgroundColor: theme.colors.surface,
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                  }} 
                />
              </View>
              
              <View style={styles.row}>
                <Text style={styles.label}>Texto Primário:</Text>
                <Text style={{ color: theme.colors.textPrimary, fontWeight: 'bold' }}>
                  Aa
                </Text>
              </View>
              
              <View style={styles.row}>
                <Text style={styles.label}>Modo:</Text>
                <Text style={{ color: theme.colors.textSecondary }}>
                  {isDarkMode ? 'Escuro' : 'Claro'} {isHighContrast ? '(Alto Contraste)' : ''}
                </Text>
              </View>
            </SolarCard>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;