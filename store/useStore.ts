import { create } from 'zustand'
import { SelectedOptions } from '../app/(screens)/ProductScreen/types'

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  totalPrice: number
  image: string
  selectedOptions: SelectedOptions
  note?: string
  storeId: string
  storeName: string
}

interface StoreState {
  cart: CartItem[]
  totalPrice: number
  currentStoreId: string | null
  addToCart: (item: CartItem) => { success: boolean; message?: string }
  removeFromCart: (itemId: string) => void
  clearCart: () => void
}

const isSameProduct = (item1: CartItem, item2: CartItem) => {
  // Aynı ürün ID'sine sahip olmalı
  if (item1.productId !== item2.productId) return false;
  
  // Seçilen opsiyonlar aynı olmalı
  const options1 = Object.entries(item1.selectedOptions);
  const options2 = Object.entries(item2.selectedOptions);
  
  if (options1.length !== options2.length) return false;
  
  return options1.every(([key, value]) => {
    const value2 = item2.selectedOptions[key];
    if (Array.isArray(value) && Array.isArray(value2)) {
      return value.length === value2.length && 
             value.every(v => value2.includes(v));
    }
    return value === value2;
  });
};

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  totalPrice: 0,
  currentStoreId: null,

  addToCart: (item) => {
    const state = get();
    
    // Eğer sepet boşsa, bu mağazayı current store olarak ayarla
    if (state.cart.length === 0) {
      set({ currentStoreId: item.storeId });
      set((state) => ({
        cart: [...state.cart, item],
        totalPrice: state.totalPrice + item.totalPrice
      }));
      return { success: true };
    }

    // Eğer farklı bir mağazadan ürün eklenmeye çalışılıyorsa
    if (state.currentStoreId !== item.storeId) {
      return {
        success: false,
        message: 'Sepetinizde farklı bir mağazadan ürünler var. Önce sepeti temizlemek ister misiniz?'
      };
    }

    // Aynı üründen var mı kontrol et
    const existingItemIndex = state.cart.findIndex(
      cartItem => isSameProduct(cartItem, item)
    );

    if (existingItemIndex !== -1) {
      // Aynı ürün varsa quantity'yi güncelle
      const updatedCart = [...state.cart];
      const existingItem = updatedCart[existingItemIndex];
      
      const newQuantity = existingItem.quantity + item.quantity;
      const newTotalPrice = (item.price * newQuantity);
      
      updatedCart[existingItemIndex] = {
        ...existingItem,
        quantity: newQuantity,
        totalPrice: newTotalPrice
      };

      set((state) => ({
        cart: updatedCart,
        totalPrice: state.cart.reduce((total, item) => total + item.totalPrice, 0)
      }));
      
      return { success: true };
    }

    // Yeni ürün ekle
    set((state) => ({
      cart: [...state.cart, item],
      totalPrice: state.totalPrice + item.totalPrice
    }));
    return { success: true };
  },

  removeFromCart: (itemId) =>
    set((state) => {
      const itemToRemove = state.cart.find(item => item.id === itemId);
      const newCart = state.cart.filter((item) => item.id !== itemId);
      
      // Eğer sepet boşaldıysa currentStoreId'yi sıfırla
      if (newCart.length === 0) {
        return {
          cart: [],
          totalPrice: 0,
          currentStoreId: null
        };
      }

      return {
        cart: newCart,
        totalPrice: state.totalPrice - (itemToRemove?.totalPrice || 0)
      };
    }),

  clearCart: () => 
    set({
      cart: [],
      totalPrice: 0,
      currentStoreId: null
    })
})) 