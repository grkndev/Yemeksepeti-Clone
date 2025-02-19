import { create } from 'zustand'
import { SelectedOptions } from '../app/(screens)/ProductScreen/types'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  totalPrice: number
  image: string
  selectedOptions: SelectedOptions
  note?: string
}

interface StoreState {
  cart: CartItem[]
  totalPrice: number
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
}

export const useStore = create<StoreState>((set) => ({
  cart: [],
  totalPrice: 0,

  addToCart: (item) => 
    set((state) => ({
      cart: [...state.cart, item],
      totalPrice: state.totalPrice + item.totalPrice
    })),

  removeFromCart: (itemId) =>
    set((state) => {
      const itemToRemove = state.cart.find(item => item.id === itemId);
      return {
        cart: state.cart.filter((item) => item.id !== itemId),
        totalPrice: state.totalPrice - (itemToRemove?.totalPrice || 0)
      };
    }),

  clearCart: () => 
    set({
      cart: [],
      totalPrice: 0
    })
})) 