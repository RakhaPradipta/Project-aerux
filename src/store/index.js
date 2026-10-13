import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Auth Store
export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        
        login: (userData) =>
          set({
            user: userData,
            isAuthenticated: true,
          }),
        
        logout: () =>
          set({
            user: null,
            isAuthenticated: false,
          }),
        
        updateUser: (userData) =>
          set((state) => ({
            user: { ...state.user, ...userData },
          })),
      }),
      {
        name: 'auth-storage',
      }
    )
  )
);

// UI Store for themes, modals, etc
export const useUIStore = create((set) => ({
  isDarkMode: true,
  isSidebarOpen: true,
  
  toggleDarkMode: () =>
    set((state) => ({
      isDarkMode: !state.isDarkMode,
    })),
  
  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),
}));

// Products Store
export const useProductsStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  
  setProducts: (products) => set({ products }),
  
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  
  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    })),
  
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
  
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
