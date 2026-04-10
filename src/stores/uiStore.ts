import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface UIState {
  // Mobile menu
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  // Cart drawer
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  // Theme
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  // Search
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  // Lightbox
  lightbox: {
    isOpen: boolean;
    images: { url: string; alt?: string }[];
    currentIndex: number;
  };
  openLightbox: (images: { url: string; alt?: string }[], index: number) => void;
  closeLightbox: () => void;
  nextLightboxImage: () => void;
  prevLightboxImage: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Mobile menu
      isMobileMenuOpen: false,
      openMobileMenu: () => set({ isMobileMenuOpen: true }),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),
      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

      // Cart drawer — delegated to cartStore but kept here for convenience
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      // Theme
      theme: 'system',
      resolvedTheme: 'light',
      setTheme: (theme) => {
        set({ theme });
        // Apply to document
        const root = document.documentElement;
        if (theme === 'dark') {
          root.setAttribute('data-theme', 'dark');
          set({ resolvedTheme: 'dark' });
        } else if (theme === 'light') {
          root.setAttribute('data-theme', 'light');
          set({ resolvedTheme: 'light' });
        } else {
          // system — listen for changes
          const mq = window.matchMedia('(prefers-color-scheme: dark)');
          const applySystem = () => {
            const isDark = mq.matches;
            root.setAttribute('data-theme', isDark ? 'dark' : 'light');
            set({ resolvedTheme: isDark ? 'dark' : 'light' });
          };
          applySystem();
          mq.addEventListener('change', applySystem);
        }
      },

      // Search
      isSearchOpen: false,
      openSearch: () => set({ isSearchOpen: true }),
      closeSearch: () => set({ isSearchOpen: false }),
      toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),

      // Lightbox
      lightbox: {
        isOpen: false,
        images: [],
        currentIndex: 0,
      },
      openLightbox: (images, index) =>
        set({ lightbox: { isOpen: true, images, currentIndex: index } }),
      closeLightbox: () =>
        set((state) => ({
          lightbox: { ...state.lightbox, isOpen: false },
        })),
      nextLightboxImage: () =>
        set((state) => ({
          lightbox: {
            ...state.lightbox,
            currentIndex:
              (state.lightbox.currentIndex + 1) % state.lightbox.images.length,
          },
        })),
      prevLightboxImage: () =>
        set((state) => ({
          lightbox: {
            ...state.lightbox,
            currentIndex:
              (state.lightbox.currentIndex - 1 + state.lightbox.images.length) %
              state.lightbox.images.length,
          },
        })),
    }),
    {
      name: 'lumina-ui',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
