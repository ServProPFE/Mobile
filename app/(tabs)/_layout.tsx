import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const homeTabIcon = ({ color }: { color: string }) => <Ionicons size={20} name="home" color={color} />;
const servicesTabIcon = ({ color }: { color: string }) => <Ionicons size={20} name="grid" color={color} />;
const bookingsTabIcon = ({ color }: { color: string }) => <Ionicons size={20} name="calendar" color={color} />;
const transactionsTabIcon = ({ color }: { color: string }) => <Ionicons size={20} name="wallet" color={color} />;
const profileTabIcon = ({ color }: { color: string }) => <Ionicons size={20} name="person" color={color} />;

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
          borderTopColor: '#e2e8f0',
          backgroundColor: '#ffffff',
        },
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 12,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('nav.home'),
          tabBarIcon: homeTabIcon,
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: t('nav.services'),
          tabBarIcon: servicesTabIcon,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: t('nav.myBookings'),
          tabBarIcon: bookingsTabIcon,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: t('nav.myTransactions'),
          tabBarIcon: transactionsTabIcon,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('mobile.profile', { defaultValue: 'Profile' }),
          tabBarIcon: profileTabIcon,
        }}
      />
    </Tabs>
  );
}
