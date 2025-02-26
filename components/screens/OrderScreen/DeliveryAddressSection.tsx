import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import Icons from '@/components/Icons'

interface DeliveryAddressSectionProps {
  deliveryAddress: string
  setDeliveryAddress: (address: string) => void
}

export default function DeliveryAddressSection({ 
  deliveryAddress, 
  setDeliveryAddress 
}: DeliveryAddressSectionProps) {
  return (
    <View className="p-4 border-b border-gray-200">
      <View className="flex-row items-center mb-2">
        <Icons name="MapPin" color="#000" size={18} />
        <Text className="text-lg font-bold ml-2">Teslimat Adresi</Text>
      </View>
      
      {deliveryAddress ? (
        <View className="bg-gray-100 p-3 rounded-lg">
          <View className="flex-row justify-between">
            <Text className="flex-1">{deliveryAddress}</Text>
            <TouchableOpacity onPress={() => setDeliveryAddress('')}>
              <Icons name="Pencil" color="#FA0250" size={16} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="bg-gray-100 p-3 rounded-lg">
          <TextInput
            placeholder="Adres girin"
            multiline
            numberOfLines={3}
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
            className="min-h-12"
          />
        </View>
      )}
      
      {!deliveryAddress && (
        <TouchableOpacity className="flex-row items-center mt-2">
          <Icons name="Navigation" color="#FA0250" size={16} />
          <Text className="text-ys ml-1">Konumumu Kullan</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}