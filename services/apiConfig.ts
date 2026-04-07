import Constants from 'expo-constants';
import { Platform } from 'react-native';

const localhostByPlatform = Platform.select({
  android: 'http://10.0.2.2:4000',
  default: 'http://localhost:4000',
});

const extraBaseUrl =
  (Constants.expoConfig?.extra as { apiBaseUrl?: string } | undefined)?.apiBaseUrl ?? '';

export const API_BASE_URL = extraBaseUrl || localhostByPlatform || 'http://localhost:4000';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  SERVICES: `${API_BASE_URL}/services`,
  ACTIVE_OFFERS: `${API_BASE_URL}/offers?active=true`,
  BOOKINGS: `${API_BASE_URL}/bookings`,
  BOOKING_BY_ID: (id: string) => `${API_BASE_URL}/bookings/${id}`,
  RESERVATION_DETAILS: `${API_BASE_URL}/reservation-details`,
};
