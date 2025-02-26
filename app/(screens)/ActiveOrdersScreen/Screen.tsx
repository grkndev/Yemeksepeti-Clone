import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStore } from '@/store/useStore'
import { useRouter, useLocalSearchParams } from 'expo-router'
import Icons from '@/components/Icons'

// Helper function to format date
const formatDate = (date: Date): string => {
  return date.toLocaleString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Helper function to get status text in Turkish
const getStatusText = (status: string): string => {
  switch (status) {
    case 'preparing':
      return 'Hazırlanıyor'
    case 'onTheWay':
      return 'Yolda'
    case 'delivered':
      return 'Teslim Edildi'
    case 'cancelled':
      return 'İptal Edildi'
    default:
      return 'Bilinmiyor'
  }
}

// Helper function to get status color
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'preparing':
      return '#FFA500' // Orange
    case 'onTheWay':
      return '#1E90FF' // Blue
    case 'delivered':
      return '#32CD32' // Green
    case 'cancelled':
      return '#FF0000' // Red
    default:
      return '#808080' // Gray
  }
}

export default function ActiveOrdersScreen() {
  const router = useRouter()
  const { activeOrders, getActiveOrderById } = useStore()
  const { orderId } = useLocalSearchParams<{ orderId: string }>()
  
  // If there's a specific orderId in the URL, show just that order
  const orders = orderId 
    ? (getActiveOrderById(orderId) ? [getActiveOrderById(orderId)!] : []) 
    : activeOrders
  
  if (orders.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-200">
          <TouchableOpacity onPress={() => router.push('/(tabs)')}>
            <Icons name="ArrowLeft" color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-bold">Aktif Siparişler</Text>
          <View style={{ width: 24 }} />
        </View>
        
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-lg mb-4">Aktif siparişiniz bulunmamaktadır</Text>
          <TouchableOpacity 
            className="bg-ys px-4 py-2 rounded-lg"
            onPress={() => router.push('/(tabs)')}
          >
            <Text className="text-white font-bold">Ana Sayfaya Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.push('/(tabs)')}>
          <Icons name="ArrowLeft" color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Aktif Siparişler</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
            {/* Order Header */}
            <View className="bg-gray-100 p-3 flex-row items-center justify-between">
              <View>
                <Text className="font-bold text-lg">{item.storeName}</Text>
                <Text className="text-gray-500">{formatDate(item.orderDate)}</Text>
              </View>
              <View 
                style={{ 
                  backgroundColor: getStatusColor(item.status),
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16
                }}
              >
                <Text className="text-white font-bold">{getStatusText(item.status)}</Text>
              </View>
            </View>
            
            {/* Order Items */}
            <View className="p-3">
              <Text className="font-bold mb-2">Sipariş Detayları</Text>
              {item.items.map((cartItem, index) => (
                <View key={index} className="flex-row justify-between py-1">
                  <Text>{cartItem.quantity}x {cartItem.name}</Text>
                  <Text>{cartItem.totalPrice.toFixed(2)} ₺</Text>
                </View>
              ))}
              <View className="border-t border-gray-200 mt-2 pt-2 flex-row justify-between">
                <Text className="font-bold">Toplam</Text>
                <Text className="font-bold">{item.totalPrice.toFixed(2)} ₺</Text>
              </View>
            </View>
            
            {/* Delivery Address */}
            <View className="px-3 pb-3">
              <Text className="font-bold mb-1">Teslimat Adresi</Text>
              <Text className="text-gray-700">{item.deliveryAddress}</Text>
              
              {item.courierNote && (
                <View className="mt-2">
                  <Text className="font-bold mb-1">Kurye Notu</Text>
                  <Text className="text-gray-700">{item.courierNote}</Text>
                </View>
              )}
            </View>
            
            {/* Actions */}
            {item.status !== 'delivered' && item.status !== 'cancelled' && (
              <View className="bg-gray-100 p-3 flex-row justify-end">
                <TouchableOpacity
                  className="bg-red-500 px-4 py-2 rounded-lg"
                  onPress={() => {
                    useStore.getState().cancelOrder(item.id)
                    // Force re-render
                    router.setParams({})
                  }}
                >
                  <Text className="text-white font-bold">Siparişi İptal Et</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  )
} 