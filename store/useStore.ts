import { create } from 'zustand'
import { SelectedOptions } from '../components/screens/ProductScreen/types'

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
  updateCartItemQuantity: (itemId: string, newQuantity: number) => void
}

const isSameProduct = (item1: CartItem, item2: CartItem) => {
  // Aynı ürün ID'sine sahip olmalı
  if (item1.productId !== item2.productId) return false;
  
  // Seçilen opsiyonlar aynı olmalı
  const options1 = Object.entries(item1.selectedOptions).sort();
  const options2 = Object.entries(item2.selectedOptions).sort();
  
  return JSON.stringify(options1) === JSON.stringify(options2);
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

  updateCartItemQuantity: (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    set((state) => {
      const updatedCart = state.cart.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: item.price * newQuantity
          };
        }
        return item;
      });

      return {
        cart: updatedCart,
        totalPrice: updatedCart.reduce((total, item) => total + item.totalPrice, 0)
      };
    });
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