import { create } from 'zustand'

interface StoreState {
  // Örnek state değerleri
  cart: any[]
  totalPrice: number
  // State değiştirme methodları
  addToCart: (item: any) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
}

export const useStore = create<StoreState>((set) => ({
  cart: [],
  totalPrice: 0,

  addToCart: (item) => 
    set((state) => ({
      cart: [...state.cart, item],
      totalPrice: state.totalPrice + (item.price || 0)
    })),

  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
      totalPrice: state.totalPrice - (state.cart.find(item => item.id === itemId)?.price || 0)
    })),

  clearCart: () => 
    set({
      cart: [],
      totalPrice: 0
    })
})) 