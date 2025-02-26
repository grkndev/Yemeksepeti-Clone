import React, { useCallback, useMemo, useRef, useState } from 'react'
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
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'

export default function OrderScreen() {
  const router = useRouter()
  const { cart, totalPrice, clearCart, createOrder } = useStore()
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [courierNote, setCourierNote] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'creditCard'>('creditCard')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)


  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["65%"], []);


  // renders
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );
  const handlePlaceOrder = () => {
    if (!deliveryAddress) {
      Alert.alert('Hata', 'Lütfen teslimat adresi giriniz')
      return
    }

    if (!acceptedTerms) {
      Alert.alert('Hata', 'Lütfen sözleşmeyi kabul ediniz')
      return
    }
    bottomSheetModalRef.current?.present();
    try {
      // Sipariş oluştur
      const orderId = createOrder({
        deliveryAddress,
        courierNote,
        paymentMethod
      })
      setOrderId(orderId)


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
        {/* <PaymentMethodSection
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        /> */}

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
          cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
        } onSuccess={()=>{
          handlePlaceOrder()
        }} disabled={!acceptedTerms || deliveryAddress.length < 1} />
        {/* <TouchableOpacity
          className={`py-3 rounded-lg items-center ${acceptedTerms ? 'bg-ys' : 'bg-gray-400'}`}
          disabled={!acceptedTerms}
          onPress={handlePlaceOrder}
        >
          <Text className="text-white font-bold text-lg">Siparişi Tamamla</Text>
        </TouchableOpacity> */}
      </View>



      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
      >
        <BottomSheetView className="flex-1 items-center justify-center p-8">
          <View className="flex-col items-center gap-4 mb-16">
            <Icons strokeWidth={1} name='CircleCheck' size={128} color={"#FA0250"} />
            <Text className="font-bold text-2xl text-center">Ödeme başarılı!{"\n"}Bizi tercih ettiğiniz için teşekkürler. 🎉</Text>
          </View>
          <TouchableOpacity className="bg-ys w-full p-4 rounded-3xl absolute bottom-8" onPress={() => {
           
            bottomSheetModalRef.current?.close()
            router.push({
              pathname: '/(screens)/ActiveOrdersScreen/Screen',
              params: { orderId }
            })
           
           
          }}>
            <Text className="text-center text-white text-lg font-bold">Siparişlerime git</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  )
}