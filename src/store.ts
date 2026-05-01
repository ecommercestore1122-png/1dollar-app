import { create } from 'zustand';
import { UserRole } from './constants';

interface User {
  uid: string;
  displayName: string;
  role: UserRole;
  phoneNumber?: string;
  pendingBalance: number;
  availableBalance: number;
  wishlist: string[];
}

interface AppState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  toggleWishlist: (productId: string) => void;
}

export const useStore = create<AppState>((set) => ({
  user: {
    uid: '123',
    displayName: 'Reseller Shop',
    role: UserRole.RESELLER,
    pendingBalance: 14200,
    availableBalance: 8450,
    wishlist: [],
  }, // Initial mock user
  loading: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  toggleWishlist: (productId) => set((state) => {
    if (!state.user) return state;
    const wishlist = state.user.wishlist.includes(productId)
      ? state.user.wishlist.filter(id => id !== productId)
      : [...state.user.wishlist, productId];
    return { user: { ...state.user, wishlist } };
  }),
}));
