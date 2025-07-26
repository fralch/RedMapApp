# Arquitectura de la Aplicación

Este documento describe la arquitectura y la estructura de directorios del proyecto RedMapApp.

## Filosofía

La arquitectura está basada en funcionalidades (`feature-based`). Esto significa que el código relacionado con una funcionalidad específica (como la autenticación o el mapa) se agrupa en un mismo lugar, facilitando la escalabilidad y el mantenimiento.

## Estructura de Directorios

```
/
├── assets/               # Archivos estáticos como imágenes y fuentes
│   ├── fonts/
│   └── images/
├── src/                  # Contenedor principal del código fuente
│   ├── api/              # Lógica para la comunicación con APIs externas
│   │   ├── auth.ts
│   │   └── map.ts
│   ├── components/       # Componentes de UI reutilizables
│   │   ├── common/       # Componentes genéricos (Button, Input, etc.)
│   │   └── map/          # Componentes específicos del mapa
│   ├── features/         # Código agrupado por funcionalidad
│   │   ├── auth/         # Funcionalidad de autenticación
│   │   │   ├── components/ # Componentes de React para esta funcionalidad
│   │   │   ├── screens/    # Pantallas completas (Login, Register)
│   │   │   └── store/      # Lógica de estado (Zustand)
│   │   └── map/          # Funcionalidad del mapa
│   │       ├── components/
│   │       ├── screens/    # Pantalla del mapa
│   │       └── store/
│   ├── navigation/       # Configuración de la navegación
│   │   ├── AppNavigator.tsx # Stack de navegación principal
│   │   └── types.ts      # Tipos de TypeScript para las rutas
│   ├── store/            # Configuración del estado global
│   │   ├── store.ts      # Creación de la tienda principal de Zustand
│   │   └── rootReducer.ts # (Si se usara Redux, aquí iría el reducer raíz)
│   ├── styles/           # Estilos globales, temas y colores
│   │   ├── colors.ts
│   │   └── theme.ts
│   └── utils/            # Funciones de utilidad y helpers
│       └── helpers.ts
├── App.tsx               # Punto de entrada principal de la aplicación
├── ARCHITECTURE.md       # Este archivo
└── ...                   # Otros archivos de configuración
```

## Flujo de Datos

1.  **`App.tsx`**: Es el punto de entrada. Renderiza el `AppNavigator`.
2.  **`src/navigation/AppNavigator.tsx`**: Define las rutas y las pantallas de la aplicación utilizando React Navigation. Decide qué pantalla mostrar (por ejemplo, si el usuario está autenticado, muestra el mapa; si no, muestra la pantalla de login).
3.  **`src/features/*/screens/*.tsx`**: Son las pantallas que ve el usuario. Utilizan componentes de `src/components` y de su propia carpeta de `features`.
4.  **Estado (Zustand)**: La lógica de estado se maneja con Zustand. Cada `feature` puede tener su propio "slice" o "store" en `src/features/*/store/`. Estos se pueden combinar o usar de forma independiente.
5.  **API**: Las interacciones con el backend se realizan a través de los módulos en `src/api/`. Se utiliza `axios` para las peticiones HTTP.
6.  **Componentes**: Los componentes reutilizables se colocan en `src/components/common`. Los componentes que son específicos de una `feature` se colocan dentro de la carpeta de esa `feature`.

## Dependencias Clave

-   **React Navigation**: Para la navegación entre pantallas.
-   **React Native Maps**: Para mostrar el mapa.
-   **Zustand**: Para la gestión del estado global de una manera simple.
-   **Axios**: Para las peticiones a la API.
