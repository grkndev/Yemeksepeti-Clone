import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import { useStore } from '@/store/useStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import Icons from '@/components/Icons'
import DeliveryAddressSection from '@/components/screens/OrderScreen/DeliveryAddressSection'
import CourierNoteSection from '@/components/screens/OrderScreen/CourierNoteSection'
import PaymentMethodSection from '@/components/screens/OrderScreen/PaymentMethodSection'
import OrderSummarySection from '@/components/screens/OrderScreen/OrderSummarySection'
import AcceptTermsSection from '@/components/screens/OrderScreen/AcceptTermsSection'
import CheckoutForm from '@/components/Checkout/CheckoutForm.native'

export default function OrderScreen() {
  const router = useRouter()
  const { cart, totalPrice, clearCart, createOrder } = useStore()
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [courierNote, setCourierNote] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'creditCard'>('creditCard')
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const handlePlaceOrder = async () => {
    if (!deliveryAddress) {
      Alert.alert('Hata', 'Lütfen teslimat adresi giriniz')
      return
    }

    if (!acceptedTerms) {
      Alert.alert('Hata', 'Lütfen sözleşmeyi kabul ediniz')
      return
    }

    try {
      // Sipariş oluştur
      const newOrderId = createOrder({
        deliveryAddress,
        courierNote,
        paymentMethod
      })

      // Ana sayfaya yönlendir
      router.push({
        pathname: '/(tabs)',
        params: { 
          orderId: newOrderId
        }
      })
      
    } catch (error) {
      Alert.alert('Hata', 'Siparişiniz oluşturulurken bir hata oluştu')
    }
  }

  // Sepet boşsa ana sayfaya yönlendir
  if (cart.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-lg mb-4">Sepetinizde ürün bulunmamaktadır</Text>
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
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Icons name="ArrowLeft" color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Sipariş Onayı</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView className="flex-1">
        {/* Teslimat Adresi */}
        <DeliveryAddressSection
          deliveryAddress={deliveryAddress}
          setDeliveryAddress={setDeliveryAddress}
        />

        {/* Kuryeye Not */}
        <CourierNoteSection
          courierNote={courierNote}
          setCourierNote={setCourierNote}
        />

        {/* Ödeme Yöntemi */}
        <View className="p-4 border-b border-gray-200">
          <View className="flex-row items-center mb-2">
            <Icons name="CreditCard" color="#000" size={18} />
            <Text className="text-lg font-bold ml-2">Ödeme Yöntemi</Text>
          </View>
          <Text className="text-lg font-bold">Online ödeme</Text>
          <Text className='text-xs'>(kart bilgileriniz ödeme sayfasında sorulacaktır)</Text>
        </View>

        {/* Sipariş Özeti */}
        <OrderSummarySection
          cart={cart}
          totalPrice={totalPrice}
        />

        {/* Sözleşme Kabul */}
        <AcceptTermsSection
          acceptedTerms={acceptedTerms}
          setAcceptedTerms={setAcceptedTerms}
        />
      </ScrollView>

      {/* Alt Buton */}
      <View className="p-4 border-t border-gray-200">
        <CheckoutForm amount={
          totalPrice
        } onSuccess={handlePlaceOrder} disabled={!acceptedTerms || deliveryAddress.length < 1} />
      </View>
    </SafeAreaView>
  )
}