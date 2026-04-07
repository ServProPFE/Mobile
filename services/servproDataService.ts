import { API_ENDPOINTS } from '@/services/apiConfig';
import { apiService } from '@/services/apiService';
import { mockBookings, mockOffers, mockServices, type BookingItem, type OfferItem, type ServiceItem } from '@/data/mockData';

type ApiItems<T> = { items?: T[] } | T[];

const normalizeItems = <T,>(payload: ApiItems<T>): T[] => {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (Array.isArray(payload.items)) {
    return payload.items;
  }
  return [];
};

export const servproDataService = {
  async getServices(): Promise<ServiceItem[]> {
    try {
      const data = await apiService.get<ApiItems<ServiceItem>>(API_ENDPOINTS.SERVICES);
      const items = normalizeItems(data);
      return items.length ? items : mockServices;
    } catch {
      return mockServices;
    }
  },

  async getOffers(): Promise<OfferItem[]> {
    try {
      const data = await apiService.get<ApiItems<OfferItem>>(API_ENDPOINTS.ACTIVE_OFFERS);
      const items = normalizeItems(data);
      return items.length ? items : mockOffers;
    } catch {
      return mockOffers;
    }
  },

  async getBookings(): Promise<BookingItem[]> {
    try {
      const data = await apiService.get<ApiItems<BookingItem>>(API_ENDPOINTS.BOOKINGS);
      const items = normalizeItems(data);
      return items.length ? items : mockBookings;
    } catch {
      return mockBookings;
    }
  },
};
