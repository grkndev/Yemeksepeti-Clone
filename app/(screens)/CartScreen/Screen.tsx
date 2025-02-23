import { View, Text, ScrollView, TouchableOpacity, Switch, TextInput, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '@/store/useStore'
import Icons from '@/components/Icons'
import { useRouter } from 'expo-router'

const SCREEN_WIDTH = Dimensions.get('window').width;
const RECOMMENDED_ITEM_WIDTH = SCREEN_WIDTH * 0.4;

// Örnek önerilen ürünler (gerçek uygulamada API'den gelecek)
const RECOMMENDED_PRODUCTS = [
  { id: 1, name: 'Tavuk Döner', price: 75.90, image: 'https://placehold.jp/1000x1000.png' },
  { id: 2, name: 'İskender', price: 95.90, image: 'https://placehold.jp/1000x1000.png' },
  { id: 3, name: 'Pilav Üstü Döner', price: 85.90, image: 'https://placehold.jp/1000x1000.png' },
  { id: 4, name: 'Dürüm Döner', price: 65.90, image: 'https://placehold.jp/1000x1000.png' },
  { id: 5, name: 'Ayran', price: 15.90, image: 'https://placehold.jp/1000x1000.png' },
  { id: 6, name: 'Künefe', price: 55.90, image: 'https://placehold.jp/1000x1000.png' },
];

export default function CartScreen() {
  const { cart, totalPrice, updateCartItemQuantity, removeFromCart } = useStore()
  const [deliveryType, setDeliveryType] = useState('standard') // 'standard' or 'planned'
  const [couponCode, setCouponCode] = useState('')
  const [needCutlery, setNeedCutlery] = useState(false)
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const router = useRouter()

  // Minimum sepet tutarı (örnek)
  const MIN_CART_AMOUNT = 150
  const DELIVERY_TIME = {
    standard: '30-45 dk',
    planned: 'Planlı Teslimat'
  }

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId)
    } else {
      updateCartItemQuantity(itemId, newQuantity)
    }
  }

  const toggleItemDetails = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Teslimat Çeşidi */}
        <View className='m-4 rounded-xl flex-row items-center gap-4 justify-start p-4 border border-gray-200'>
          <View className='w-16 h-16 rounded-xl overflow-hidden'>
            <View className='bg-gray-200 w-full h-full'></View>
          </View>
          <View className='flex flex-col items-start gap-0.5'>
            <Text>Tahmini teslimat</Text>
            <Text className='font-bold text-xl'>Standart ({DELIVERY_TIME.standard})</Text>
            <Text>Teslimat Zamanını Değiştir</Text>
          </View>
        </View>

        {/* Sepet İçeriği */}
        <View className="p-4 border-b border-gray-200">
          <Text className="text-lg font-bold mb-2">Sepetim</Text>
          {
            cart.map((item) => (
              <View key={item.id} className="py-2 border-b border-gray-100">
                <View className="flex-row items-start justify-between">
                  <Image
                    source={{ uri: item.image }}
                    className="w-20 h-20 rounded-lg mr-3"
                    resizeMode="cover"
                  />
                  <View className="flex-1 flex flex-col items-center justify-start gap-2">
                    <View className='flex flex-col w-full'>
                      <Text className="font-medium">{item.name}</Text>
                      <Text>

                        {Object.entries(item.selectedOptions).map(([key, value], index) => (
                          <Text key={key} className="text-xs text-gray-600">
                            {key}: <Text className="font-medium">{value.concat(", ")}</Text>
                          </Text>
                        ))}
                      </Text>
                    </View>
                    <View className='flex flex-row w-full items-center justify-between'>
                      <View>
                        <View className="flex-row items-center space-x-2">
                          {item.quantity === 1 ? (
                            <TouchableOpacity
                              className="w-8 h-8 items-center justify-center rounded-full bg-red-50"
                              onPress={() => removeFromCart(item.id)}
                            >
                              <Icons name="Trash2" size={14} color="#FA0250" />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              className="w-8 h-8 items-center justify-center rounded-full bg-gray-100"
                              onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              <Icons name="Minus" size={14} color="#666" />
                            </TouchableOpacity>
                          )}
                          <Text className="font-medium w-6 text-center">{item.quantity}</Text>
                          <TouchableOpacity
                            className="w-8 h-8 items-center justify-center rounded-full bg-gray-100"
                            onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Icons name="Plus" size={14} color="#666" />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View>
                        <Text>{item.totalPrice.toFixed(2)} ₺</Text>
                      </View>
                    </View>


                  </View>
                </View>

                {/* Detaylar - Açılır/Kapanır Kısım */}
                {expandedItems[item.id] && (
                  <View className="mt-2 ml-24 bg-gray-50 p-3 rounded-lg">
                    {Object.entries(item.selectedOptions).length > 0 && (
                      <View className="mb-2">
                        <Text className="text-xs font-medium text-gray-600">Seçilen Opsiyonlar:</Text>
                        {Object.entries(item.selectedOptions).map(([key, value], index) => (
                          <View key={key} className="flex-row items-center mt-1">
                            <View className="w-2 h-2 rounded-full bg-ys mr-2" />
                            <Text className="text-xs text-gray-600">
                              {key}: <Text className="font-medium">{value}</Text>
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                    {item.note && (
                      <View>
                        <Text className="text-xs font-medium text-gray-600">Not:</Text>
                        <Text className="text-xs text-gray-600 mt-1">{item.note}</Text>
                      </View>
                    )}
                  </View>
                )}
              </View>

            ))}
        </View>

        {cart.length > 0 && (
          <>
            {/* Önerilenler */}
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-bold mb-2">Bunları da Ekleyebilirsiniz</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="space-x-3"
                contentContainerClassName='gap-4'
              >
                {RECOMMENDED_PRODUCTS.map((product) => (
                  <TouchableOpacity
                    key={product.id}
                    className="flex flex-col items-start gap-1"
                  >
                    <Image
                      source={{ uri: product.image }}
                      className="aspect-square h-32  rounded-lg"
                      resizeMode="cover"
                    />
                    <View className="flex flex-col">
                      <Text className="font-medium" numberOfLines={1}>{product.name}</Text>
                      <View className=" flex-row items-center justify-between rounded-lg p-2 ">
                        <Text className="text-sm text-ys font-bold">{product.price.toFixed(2)} ₺</Text>
                        <TouchableOpacity
                          className="bg-ys w-6 h-6 rounded-full items-center justify-center"
                        >
                          <Icons name="Plus" size={16} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Sepet Tutarı */}
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-bold mb-2">Sepet Tutarı</Text>
              <View className="space-y-2">
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Ara Toplam</Text>
                  <Text>{totalPrice.toFixed(2)} ₺</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">İndirim</Text>
                  <Text className="text-green-600">-0.00 ₺</Text>
                </View>
                {showCouponInput ? (
                  <View className="flex-row items-center space-x-2 mt-2 gap-2">
                    <TextInput
                      className="flex-1 border border-gray-200 rounded-lg p-2"
                      placeholder="Kupon kodunu girin"
                      value={couponCode}
                      onChangeText={setCouponCode}
                    />
                    <TouchableOpacity
                      className="bg-ys p-2 rounded-lg"
                      onPress={() => setShowCouponInput(false)}
                    >
                      <Text className="text-white">Uygula</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    className="flex-row items-center gap-2 py-1"
                    onPress={() => setShowCouponInput(true)}
                  >
                    <Icons name="Ticket" size={20} color="#000" />
                    <Text className="font-bold text-lg">Kupon Kodu Giriniz / Seçiniz</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Çatal & Bıçak */}
            <View className="p-4 border-b border-gray-200">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-lg font-bold">Çatal & Bıçak</Text>
                  <Text className="text-sm text-gray-500">Siparişinize çatal & bıçak eklensin mi?</Text>
                </View>
                <Switch
                  value={needCutlery}
                  onValueChange={setNeedCutlery}
                  trackColor={{ false: "#767577", true: "#FA0250" }}
                />
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Alt Kısım - Sabit */}
      {cart.length > 0 && (
        <View className="p-4 border-t border-gray-200">
          {totalPrice < MIN_CART_AMOUNT && (
            <View className="bg-red-50 p-3 rounded-lg mb-3">
              <Text className="text-ys text-center">
                Minimum sepet tutarına ulaşmak için {(MIN_CART_AMOUNT - totalPrice).toFixed(2)} ₺ değerinde ürün eklemelisiniz
              </Text>
            </View>
          )}
          <TouchableOpacity
            className={`p-4 rounded-lg ${totalPrice >= MIN_CART_AMOUNT ? 'bg-ys' : 'bg-gray-300'}`}
            disabled={totalPrice < MIN_CART_AMOUNT}
          >
            <Text className="text-white text-center font-bold text-lg">
              Ödemeye Geç ({totalPrice.toFixed(2)} ₺)
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}