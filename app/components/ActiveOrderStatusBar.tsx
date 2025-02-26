import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { useStore } from '@/store/useStore'
import Icons from '@/components/Icons'

export default function ActiveOrderStatusBar() {
  const router = useRouter()
  const { activeOrders, cancelOrder } = useStore()
  
  // Eğer aktif sipariş yoksa gösterme
  if (activeOrders.length === 0) return null
  
  // En son siparişi al
  const latestOrder = activeOrders[activeOrders.length - 1]
  
  const handleCancelOrder = () => {
    Alert.alert(
      'Sipariş İptali',
      'Siparişinizi iptal etmek istediğinize emin misiniz?',
      [
        {
          text: 'Hayır',
          style: 'cancel'
        },
        {
          text: 'Evet',
          style: 'destructive',
          onPress: () => {
            cancelOrder(latestOrder.id)
            Alert.alert('Bilgi', 'Siparişiniz iptal edildi')
          }
        }
      ]
    )
  }
  
  // Duruma göre renk ve icon belirle
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing':
        return '#FFA500'
      case 'onTheWay':
        return '#1E90FF'
      case 'delivered':
        return '#32CD32'
      default:
        return '#808080'
    }
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'Clock'
      case 'onTheWay':
        return 'Truck'
      case 'delivered':
        return 'Check'
      default:
        return 'Clock'
    }
  }
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'Hazırlanıyor'
      case 'onTheWay':
        return 'Yolda'
      case 'delivered':
        return 'Teslim Edildi'
      default:
        return 'Bilinmiyor'
    }
  }
  
  return (
    <View style={[styles.container, { backgroundColor: getStatusColor(latestOrder.status) }]}>
      <TouchableOpacity
        style={styles.content}
        onPress={() => router.push({
          pathname: '/(screens)/ActiveOrdersScreen/Screen',
          params: { orderId: latestOrder.id }
        })}
      >
        <View style={styles.leftContent}>
          <Icons name={getStatusIcon(latestOrder.status)} color="#FFF" size={24} />
          <View style={styles.textContainer}>
            <Text style={styles.statusText}>{getStatusText(latestOrder.status)}</Text>
            <Text style={styles.restaurantText}>{latestOrder.storeName}</Text>
          </View>
        </View>
        <View style={styles.rightContent}>
          {latestOrder.status === 'preparing' && (
            <TouchableOpacity
              onPress={handleCancelOrder}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>İptal</Text>
            </TouchableOpacity>
          )}
          <Icons name="ChevronRight" color="#FFF" size={24} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 1000,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textContainer: {
    marginLeft: 12,
  },
  statusText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  restaurantText: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 2,
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  cancelText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
}) 