// src/screens/LoginScreen.tsx
import React, { useState, useRef } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

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
    // Reset validation
    setUsernameError(null);
    setPasswordError(null);

    let hasError = false;
    if (!username || username.trim().length === 0) {
      setUsernameError('Por favor insira um usuário.');
      hasError = true;
    } else if (username.indexOf(' ') !== -1) {
      setUsernameError('O usuário não pode conter espaços.');
      hasError = true;
    }

    if (!password || password.length < 6) {
      setPasswordError('A senha deve ter ao menos 6 caracteres.');
      hasError = true;
    }

    if (hasError) return;
    
    setLoading(true);
    
    // Simular requisição de autenticação (substituir por API real)
    const mockLogin = async (u: string, p: string) => {
      await new Promise((res) => setTimeout(res, 600));
      // Simular sucesso: retornar token
      return `token_${u}_12345`;
    };

    mockLogin(username.trim(), password)
      .then(async (token) => {
        await AsyncStorage.setItem('auth_token', token);
        setLoading(false);
        onLogin();
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert('Erro', 'Falha na autenticação. Tente novamente.');
      });
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
              onChangeText={(text) => { setUsername(text); setUsernameError(null); }}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              accessibilityLabel="Usuário"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
            {usernameError ? <Text style={{ color: theme.colors.danger, marginBottom: theme.spacing.sm }}>{usernameError}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor={theme.colors.textSecondary}
              value={password}
              onChangeText={(text) => { setPassword(text); setPasswordError(null); }}
              secureTextEntry
              autoCapitalize="none"
              accessibilityLabel="Senha"
              ref={passwordRef}
              returnKeyType="send"
              onSubmitEditing={handleLogin}
            />
            {passwordError ? <Text style={{ color: theme.colors.danger, marginBottom: theme.spacing.sm }}>{passwordError}</Text> : null}

            <TouchableOpacity onPress={() => Alert.alert('Recuperar senha', 'Funcionalidade em desenvolvimento')}>
              <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <View style={styles.actions}>
              <SolarButton
                title={loading ? 'Entrando...' : 'Entrar'}
                onPress={handleLogin}
                variant="primary"
                fullWidth
                loading={loading}
                disabled={loading}
              />
            </View>
          </View>
        </SolarCard>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
