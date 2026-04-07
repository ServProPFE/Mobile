import { API_ENDPOINTS } from '@/services/apiConfig';
import { apiService } from '@/services/apiService';
import { mockBookings, mockOffers, mockServices, type BookingItem, type OfferItem, type ServiceItem } from '@/data/mockData';

type ApiItems<T> = { items?: T[] } | T[];
let localBookings: BookingItem[] = [...mockBookings];

type BookingApiItem = Partial<BookingItem> & {
  _id?: string;
  id?: string;
  expectedAt?: string;
  scheduledAt?: string;
  totalPrice?: number;
  amount?: number;
  currency?: string;
  status?: string;
  serviceName?: string;
  providerName?: string;
  service?: { name?: string } | string;
  provider?: { name?: string } | string;
};

type CreateBookingInput = {
  serviceId: string;
  serviceName: string;
  providerName?: string;
  scheduledAt: string;
  address: string;
  notes?: string;
  amount: number;
  currency: string;
  clientId?: string;
};

const normalizeItems = <T,>(payload: ApiItems<T>): T[] => {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (Array.isArray(payload.items)) {
    return payload.items;
  }
  return [];
};

const normalizeBooking = (item: BookingApiItem): BookingItem => {
  const normalizedStatus = item.status === 'COMPLETED' ? 'DONE' : item.status;
  const serviceName =
    item.serviceName ||
    (typeof item.service === 'object' && item.service?.name ? item.service.name : undefined) ||
    (typeof item.service === 'string' ? item.service : undefined) ||
    'services.title';
  const providerName =
    item.providerName ||
    (typeof item.provider === 'object' && item.provider?.name ? item.provider.name : undefined) ||
    (typeof item.provider === 'string' ? item.provider : undefined) ||
    'ServPro Provider';

  return {
    _id: item._id || item.id || `booking-${Date.now()}`,
    serviceName,
    providerName,
    scheduledAt: item.scheduledAt || item.expectedAt || '',
    status: (normalizedStatus as BookingItem['status']) || 'PENDING',
    amount: Number(item.amount ?? item.totalPrice ?? 0),
    currency: item.currency || 'TND',
  };
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
      const data = await apiService.get<ApiItems<BookingApiItem>>(API_ENDPOINTS.BOOKINGS);
      const items = normalizeItems(data);
      localBookings = items.length ? items.map(normalizeBooking) : localBookings;
      return localBookings;
    } catch {
      return localBookings;
    }
  },

  async createBooking(input: CreateBookingInput): Promise<BookingItem> {
    const payload = {
      service: input.serviceId,
      serviceName: input.serviceName,
      providerName: input.providerName,
      clientId: input.clientId,
      expectedAt: input.scheduledAt,
      scheduledAt: input.scheduledAt,
      address: input.address,
      notes: input.notes,
      totalPrice: input.amount,
      amount: input.amount,
      currency: input.currency,
      status: 'PENDING',
    };

    try {
      const created = await apiService.post<BookingApiItem>(API_ENDPOINTS.BOOKINGS, payload);
      const normalized = normalizeBooking({
        ...created,
        serviceName: created.serviceName || input.serviceName,
        providerName: created.providerName || input.providerName || 'ServPro Provider',
        scheduledAt: created.scheduledAt || created.expectedAt || input.scheduledAt,
        amount: created.amount ?? created.totalPrice ?? input.amount,
        currency: created.currency || input.currency,
      });
      localBookings = [normalized, ...localBookings];
      return normalized;
    } catch {
      const fallback: BookingItem = {
        _id: `local-${Date.now()}`,
        serviceName: input.serviceName,
        providerName: input.providerName || 'ServPro Provider',
        scheduledAt: input.scheduledAt,
        status: 'PENDING',
        amount: input.amount,
        currency: input.currency,
      };
      localBookings = [fallback, ...localBookings];
      return fallback;
    }
  },
};
