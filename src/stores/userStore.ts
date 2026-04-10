import { create } from 'zustand';
import type { UserProfile, Address, OrderListItem, WishlistItem } from '@/types';

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  // Actions
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  // Addresses
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
  addAddress: (address: Address) => void;
  removeAddress: (addressId: string) => void;
  // Orders
  orders: OrderListItem[];
  setOrders: (orders: OrderListItem[]) => void;
  // Reset
  reset: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  isLoading: false,
  wishlist: [],
  addresses: [],
  orders: [],

  setProfile: (profile) => set({ profile }),
  setLoading: (isLoading) => set({ isLoading }),

  addToWishlist: (item) => {
    set((state) => {
      if (state.wishlist.some((w) => w.product.id === item.product.id)) {
        return state;
      }
      return { wishlist: [...state.wishlist, item] };
    });
  },

  removeFromWishlist: (productId) => {
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.product.id !== productId),
    }));
  },

  isInWishlist: (productId) => {
    return get().wishlist.some((item) => item.product.id === productId);
  },

  setAddresses: (addresses) => set({ addresses }),

  addAddress: (address) => {
    set((state) => ({ addresses: [...state.addresses, address] }));
  },

  removeAddress: (addressId) => {
    set((state) => ({
      addresses: state.addresses.filter((a) => a.id !== addressId),
    }));
  },

  setOrders: (orders) => set({ orders }),

  reset: () =>
    set({
      profile: null,
      isLoading: false,
      wishlist: [],
      addresses: [],
      orders: [],
    }),
}));
