# ServPro Mobile Application

ServProMobile is the React Native (Expo) mobile client for ServPro.
It follows the same visual direction as the web frontend:

- Teal and orange accent palette
- Rounded premium cards with soft shadows
- Optimistic and professional product tone
- Hero sections and elevated service/offer blocks

## Features

- Home feed with hero banner, active offers, and highlighted services
- Service catalog with search and category filters
- Service details screen
- Authentication screens (login/register)
- Profile management and session persistence
- Bookings view with status badges
- Localization with English/Arabic resources aligned with the frontend app
- API integration with fallback mock data for offline/demo usage

## Tech Stack

- Expo Router + React Native + TypeScript
- AsyncStorage for auth session persistence
- i18next + react-i18next + expo-localization for multilingual support
- Shared service layer for API calls and endpoint configuration

## Run the App

1. Install dependencies:

```bash
npm install
```

2. Start Expo:

```bash
npm run start
```

3. Launch platform target:

```bash
npm run android
npm run ios
npm run web
```

## API Configuration

API base URL is resolved from Expo config extra field if available:

- `expo.extra.apiBaseUrl`

Otherwise defaults are:

- Android emulator: `http://10.0.2.2:4000`
- Other platforms: `http://localhost:4000`

## Localization

- Mobile i18n bootstrap file: `i18n.ts`
- Locale resources: `locales/en.json` and `locales/ar.json`
- Resources mirror frontend i18n keys for consistency across web and mobile
- Selected language is persisted in AsyncStorage and can be switched from Profile (EN/AR)

## Key Folders

- `app/`: screens and routing (tabs, auth, service details)
- `components/servpro/`: reusable branded UI blocks
- `context/`: auth context and session management
- `services/`: API, auth, storage, and data providers
- `data/`: typed mock fallback data
