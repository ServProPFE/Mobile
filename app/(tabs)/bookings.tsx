import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppBackground } from '@/components/servpro/AppBackground';
import { SectionHeader } from '@/components/servpro/SectionHeader';
import { AppTheme } from '@/constants/theme';
import type { BookingItem } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { servproDataService } from '@/services/servproDataService';

const statusColors: Record<BookingItem['status'], string> = {
  PENDING: '#f59e0b',
  CONFIRMED: '#0f766e',
  COMPLETED: '#2563eb',
};

export default function BookingsScreen() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState<BookingItem[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    (async () => {
      const data = await servproDataService.getBookings();
      setBookings(data);
    })();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <AppBackground>
        <View style={styles.centeredCard}>
          <Text style={styles.title}>{t('booking.myBookings')}</Text>
          <Text style={styles.subtitle}>{t('chatbot.loginRequired')}</Text>
          <Link href={'/auth/login' as never} style={styles.loginLink}>{t('nav.login')}</Link>
        </View>
      </AppBackground>
    );
  }

  return (
    <AppBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title={t('booking.myBookings')} rightLabel={`${bookings.length} ${t('booking.statusAll').toLowerCase()}`} />

        {bookings.map((booking) => (
          <View key={booking._id} style={styles.card}>
            <View style={styles.topRow}>
              <Text style={styles.serviceName}>{t(booking.serviceName, { defaultValue: booking.serviceName })}</Text>
              <View style={[styles.statusPill, { backgroundColor: `${statusColors[booking.status]}22` }]}>
                <Text style={[styles.statusText, { color: statusColors[booking.status] }]}>{t(`booking.status.${booking.status}`, { defaultValue: booking.status })}</Text>
              </View>
            </View>

            <Text style={styles.provider}>{t('booking.provider')}: {booking.providerName}</Text>
            <Text style={styles.meta}>{t('booking.date')}: {new Date(booking.scheduledAt).toLocaleString()}</Text>
            <Text style={styles.amount}>{booking.amount} {booking.currency}</Text>
          </View>
        ))}

        {bookings.length === 0 ? <Text style={styles.subtitle}>{t('booking.none')}</Text> : null}
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 24,
  },
  centeredCard: {
    margin: 16,
    marginTop: 80,
    borderRadius: AppTheme.radius.xl,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    padding: 20,
    ...AppTheme.shadow.card,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: AppTheme.colors.text,
  },
  subtitle: {
    marginTop: 8,
    color: AppTheme.colors.mutedText,
    lineHeight: 21,
  },
  loginLink: {
    marginTop: 14,
    backgroundColor: '#0f172a',
    color: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
    fontWeight: '800',
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  card: {
    borderRadius: AppTheme.radius.lg,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    ...AppTheme.shadow.card,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    alignItems: 'center',
  },
  serviceName: {
    flex: 1,
    fontSize: 18,
    color: AppTheme.colors.text,
    fontWeight: '800',
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  provider: {
    marginTop: 8,
    color: AppTheme.colors.mutedText,
    fontWeight: '600',
  },
  meta: {
    marginTop: 2,
    color: '#64748b',
  },
  amount: {
    marginTop: 10,
    fontSize: 18,
    color: AppTheme.colors.primary,
    fontWeight: '900',
  },
});
