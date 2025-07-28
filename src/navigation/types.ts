export type RootStackParamList = {
  Map: undefined;
  // Aquí se pueden agregar más rutas en el futuro
  // Auth: undefined;
  // Profile: { userId: string };
};

// Tipos para la navegación
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}