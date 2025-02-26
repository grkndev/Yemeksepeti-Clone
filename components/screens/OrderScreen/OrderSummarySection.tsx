import React from 'react'
import { View, Text, Image } from 'react-native'
import Icons from '@/components/Icons'

interface OrderSummarySectionProps {
  cart: any[]
  totalPrice: number
}

export default function OrderSummarySection({ 
  cart, 
  totalPrice 
}: OrderSummarySectionProps) {
  const deliveryFee = 0.00
  const finalTotal = totalPrice + deliveryFee
  
  return (
    <View className="p-4 border-b border-gray-200">
      <View className="flex-row items-center mb-2">
        <Icons name="ClipboardList" color="#000" size={18} />
        <Text className="text-lg font-bold ml-2">Sipariş Özeti</Text>
      </View>
      
      <View className="bg-gray-100 p-3 rounded-lg">
        {/* Mağaza Bilgisi */}
        {cart.length > 0 && (
          <View className="mb-2 pb-2 border-b border-gray-300">
            <Text className="font-bold">{cart[0].storeName}</Text>
          </View>
        )}
        
        {/* Ürünler */}
        {cart.map((item) => (
          <View key={item.id} className="flex-row py-2">
            <View className="w-12 h-12 bg-gray-300 rounded-md overflow-hidden mr-2">
              {item.image && (
                <Image 
                  source={{ uri: item.image }} 
                  className="w-full h-full" 
                  resizeMode="cover"
                />
              )}
            </View>
            
            <View className="flex-1">
              <Text className="font-medium">{item.name}</Text>
              
              {/* Ürün opsiyonları */}
              {Object.entries(item.selectedOptions || {}).map(([key, value]) => {
                if (!value || (Array.isArray(value) && value.length === 0)) return null
                return (
                  <Text key={key} className="text-xs text-gray-600">
                    {key}: {Array.isArray(value) ? value.join(', ') : value}
                  </Text>
                )
              })}
              
              {/* Ürün notu */}
              {item.note && (
                <Text className="text-xs text-gray-600 italic">Not: {item.note}</Text>
              )}
            </View>
            
            <View className="flex-row items-center">
              <Text className="text-gray-600 mr-2">{item.quantity}x</Text>
              <Text className="font-bold">{item.totalPrice.toFixed(2)} ₺</Text>
            </View>
          </View>
        ))}
        
        {/* Fiyat özeti */}
        <View className="mt-3 pt-3 border-t border-gray-300">
          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-600">Ara Toplam</Text>
            <Text>{totalPrice.toFixed(2)} ₺</Text>
          </View>
          
          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-600">Teslimat Ücreti</Text>
            <Text>{deliveryFee.toFixed(2)} ₺</Text>
          </View>
          
          <View className="flex-row justify-between mt-2 pt-2 border-t border-gray-300">
            <Text className="font-bold">Toplam</Text>
            <Text className="font-bold text-ys">{finalTotal.toFixed(2)} ₺</Text>
          </View>
        </View>
      </View>
    </View>
  )
}