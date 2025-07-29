# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Expo Development Server
- `npm start` - Start the Expo development server
- `npm run android` - Start for Android development
- `npm run ios` - Start for iOS development  
- `npm run web` - Start for web development

### TypeScript
- TypeScript is configured with strict mode enabled
- Configuration extends from `expo/tsconfig.base`

## Project Architecture

This is a React Native Expo application using a **feature-based architecture**. The codebase is organized around features rather than file types, making it more scalable and maintainable.

### Key Architecture Patterns

1. **Feature-based Structure**: Each feature (auth, map) contains its own components, screens, and state management
2. **Zustand State Management**: Uses Zustand for simple, efficient state management instead of Redux
3. **React Navigation**: Stack navigation with type-safe routing defined in `src/navigation/types.ts`
4. **Centralized API Layer**: API calls organized in `src/api/` with Axios for HTTP requests

### Core Directory Structure

```
src/
├── features/           # Feature-based modules
│   ├── auth/          # Authentication feature
│   │   ├── components/
│   │   ├── screens/
│   │   └── store/     # Zustand store slices
│   └── map/           # Map feature with dark mode toggle
│       ├── components/
│       ├── screens/   # MapScreen.tsx
│       └── store/     # mapStore.ts
├── navigation/        # React Navigation setup
│   ├── AppNavigator.tsx
│   └── types.ts       # Route parameter types
├── components/        # Shared components
│   ├── common/        # Generic reusable components
│   └── map/           # Map-specific shared components
├── api/               # API layer with Axios
├── store/             # Global store configuration
├── styles/            # Global styles and themes
└── utils/             # Utility functions
```

### Key Dependencies

- **React Navigation**: `@react-navigation/native` + `@react-navigation/native-stack` for navigation
- **React Native Maps**: `react-native-maps` for map functionality with custom styling
- **Zustand**: `zustand` for state management
- **Axios**: `axios` for HTTP requests
- **Expo Location**: `expo-location` for location services
- **Expo Vector Icons**: `@expo/vector-icons` for iconography

### State Management with Zustand

Each feature can have its own Zustand store in `src/features/*/store/`. For example, the map feature has `mapStore.ts` which manages:
- Dark mode state (`isDarkMode`)
- Theme toggle functions (`toggleDarkMode`, `setDarkMode`)

### Navigation Flow

1. `App.tsx` renders `AppNavigator`
2. `AppNavigator.tsx` defines the navigation stack
3. Initial route is "Map" which shows `MapScreen`
4. Navigation types are defined in `src/navigation/types.ts`

### Map Feature

The map feature includes:
- Google Maps integration with custom dark mode styling
- Location tracking capabilities
- Theme toggle button with dynamic icons (sun/moon)
- Custom map styles for dark mode in `MapScreen.tsx`

### Development Notes

- The app uses Expo with the new architecture enabled (`newArchEnabled: true`)
- TypeScript is configured with strict mode
- The project supports Android, iOS, and web platforms
- UI follows a portrait orientation by default
- Uses feature-specific README files for complex functionality (see `src/features/map/README.md`)