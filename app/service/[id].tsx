import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppBackground } from '@/components/servpro/AppBackground';
import { AppTheme } from '@/constants/theme';
import type { ServiceItem } from '@/data/mockData';
import { servproDataService } from '@/services/servproDataService';

export default function ServiceDetailScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    (async () => {
      const data = await servproDataService.getServices();
      setServices(data);
    })();
  }, []);

  const service = useMemo(() => services.find((item) => item._id === id), [id, services]);

  return (
    <AppBackground>
      <ScrollView contentContainerStyle={styles.content}>
        {service ? (
          <View style={styles.card}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>{t(`services.categories.${service.category}`)}</Text>
            </View>
            <Text style={styles.title}>{t(service.name, { defaultValue: service.name })}</Text>
            <Text style={styles.description}>{service.description || t('services.descriptionFallback')}</Text>

            <View style={styles.metricsRow}>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>{t('service.from')}</Text>
                <Text style={styles.metricValue}>{service.priceMin} {service.currency}</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>{t('service.duration')}</Text>
                <Text style={styles.metricValue}>{t('service.minutes', { count: service.duration })}</Text>
              </View>
            </View>

            <View style={styles.noteBox}>
              <Text style={styles.noteTitle}>{t('service.providerAbout')}</Text>
              <Text style={styles.noteText}>
                {t('chatbot.welcomeMessage')}
              </Text>
            </View>
          </View>
        ) : (
          <Text style={styles.notFound}>{t('service.notFound')}</Text>
        )}
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  card: {
    borderRadius: AppTheme.radius.xl,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    padding: 18,
    ...AppTheme.shadow.card,
  },
  pill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: 'rgba(15,118,110,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pillText: {
    color: AppTheme.colors.primary,
    fontWeight: '800',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 12,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '900',
    color: AppTheme.colors.text,
  },
  description: {
    marginTop: 10,
    color: AppTheme.colors.mutedText,
    lineHeight: 22,
    fontSize: 15,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  metricCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    padding: 12,
  },
  metricLabel: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  metricValue: {
    color: AppTheme.colors.text,
    marginTop: 4,
    fontSize: 19,
    fontWeight: '900',
  },
  noteBox: {
    marginTop: 16,
    borderRadius: 14,
    backgroundColor: '#0f172a',
    padding: 14,
  },
  noteTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  noteText: {
    marginTop: 6,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  notFound: {
    marginTop: 30,
    textAlign: 'center',
    color: AppTheme.colors.mutedText,
  },
});
