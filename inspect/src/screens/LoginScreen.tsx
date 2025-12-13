// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useTheme } from '../theme/themes';
import SolarButton from '../components/SolarButton';
import SolarCard from '../components/SolarCard';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const { theme } = useTheme();
  
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
      justifyContent: 'center',
    },
    title: {
      ...theme.typography.h1,
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing.md,
      textAlign: 'center' as const,
    },
    subtitle: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.lg,
      textAlign: 'center' as const,
    },
    form: {
      width: '100%',
    },
    input: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.medium,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      marginBottom: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      color: theme.colors.textPrimary,
      ...theme.typography.body,
    },
    actions: {
      marginTop: theme.spacing.md,
    },
    forgotPassword: {
      color: theme.colors.primary,
      textAlign: 'right' as const,
      marginBottom: theme.spacing.sm,
    },
  });

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Preencha o usuário e a senha.');
      return;
    }

    setLoading(true);
    // Simular requisição de autenticação (substituir por API real)
    setTimeout(() => {
      setLoading(false);
      // Simular sucesso
      onLogin();
    }, 700);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <SolarCard padding="large" elevation="high">
          <Text style={styles.title}>Entrar</Text>
          <Text style={styles.subtitle}>Acesse sua conta para continuar</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Usuário"
              placeholderTextColor={theme.colors.textSecondary}
              value={username}
              onChangeText={setUsername}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              accessibilityLabel="Usuário"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor={theme.colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              accessibilityLabel="Senha"
            />

            <TouchableOpacity onPress={() => Alert.alert('Recuperar senha', 'Funcionalidade em desenvolvimento')}>
              <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <View style={styles.actions}>
              <SolarButton
                title={loading ? 'Entrando...' : 'Entrar'}
                onPress={handleLogin}
                variant="primary"
                fullWidth
              />
            </View>
          </View>
        </SolarCard>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
