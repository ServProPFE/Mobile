import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppBackground } from '@/components/servpro/AppBackground';
import { AppTheme } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  const { user, isAuthenticated, logout } = useAuth();
  const { t, i18n } = useTranslation();

  return (
    <AppBackground>
      <View style={styles.container}>
        <Text style={styles.title}>{t('mobile.profile', { defaultValue: 'Profile' })}</Text>

        <View style={styles.languageRow}>
          <Text style={styles.languageLabel}>{t('nav.language')}:</Text>
          <Pressable
            onPress={() => i18n.changeLanguage('en')}
            style={[styles.langBtn, i18n.language.startsWith('en') && styles.langBtnActive]}>
            <Text style={[styles.langText, i18n.language.startsWith('en') && styles.langTextActive]}>EN</Text>
          </Pressable>
          <Pressable
            onPress={() => i18n.changeLanguage('ar')}
            style={[styles.langBtn, i18n.language.startsWith('ar') && styles.langBtnActive]}>
            <Text style={[styles.langText, i18n.language.startsWith('ar') && styles.langTextActive]}>AR</Text>
          </Pressable>
        </View>

        {isAuthenticated && user ? (
          <View style={styles.card}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.info}>{user.email}</Text>
            <Text style={styles.info}>{t('auth.accountType')}: {user.type === 'CLIENT' ? t('auth.client') : t('auth.provider')}</Text>

            <Pressable style={styles.logoutBtn} onPress={() => logout()}>
              <Text style={styles.logoutText}>{t('nav.logout')}</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.name}>{t('chatbot.welcome')}</Text>
            <Text style={styles.info}>
              {t('auth.noAccount')}
            </Text>

            <View style={styles.row}>
              <Link href={'/auth/login' as never} style={styles.primaryLink}>{t('nav.login')}</Link>
              <Link href={'/auth/register' as never} style={styles.secondaryLink}>{t('nav.register')}</Link>
            </View>
          </View>
        )}
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: AppTheme.colors.text,
    marginBottom: 12,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  languageLabel: {
    color: AppTheme.colors.mutedText,
    fontWeight: '700',
  },
  langBtn: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f8fafc',
  },
  langBtnActive: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  langText: {
    color: '#334155',
    fontWeight: '800',
  },
  langTextActive: {
    color: '#ffffff',
  },
  card: {
    borderRadius: AppTheme.radius.xl,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    padding: 18,
    ...AppTheme.shadow.card,
  },
  name: {
    fontSize: 24,
    fontWeight: '900',
    color: AppTheme.colors.text,
  },
  info: {
    color: AppTheme.colors.mutedText,
    marginTop: 6,
    lineHeight: 20,
  },
  row: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 10,
  },
  primaryLink: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 9,
    fontWeight: '800',
    overflow: 'hidden',
  },
  secondaryLink: {
    backgroundColor: 'rgba(15,118,110,0.12)',
    color: '#0f766e',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 9,
    fontWeight: '800',
    overflow: 'hidden',
  },
  logoutBtn: {
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: '#dc2626',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  logoutText: {
    color: '#ffffff',
    fontWeight: '800',
  },
});
