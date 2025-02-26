import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import Icons from '@/components/Icons'

interface PaymentMethodSectionProps {
  paymentMethod: 'creditCard'
  setPaymentMethod: (method: 'creditCard') => void
}

export default function PaymentMethodSection({ 
  paymentMethod, 
  setPaymentMethod 
}: PaymentMethodSectionProps) {
  const [cardNumber, setCardNumber] = useState('')
  const [cardholderName, setCardholderName] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  
  // Kart numarası formatlaması (4 rakamlık gruplar halinde)
  const formatCardNumber = (text: string) => {
    // Sadece rakamları al
    const cleaned = text.replace(/\D/g, '')
    // 4'er gruplar halinde ayır ve araya boşluk ekle
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned
    // Maksimum 19 karakter (16 rakam + 3 boşluk)
    return formatted.slice(0, 19)
  }
  
  // Son kullanma tarihi formatlaması (MM/YY)
  const formatExpiryDate = (text: string) => {
    // Sadece rakamları al
    const cleaned = text.replace(/\D/g, '')
    // 2 rakamdan sonra / ekle
    if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
    }
    return cleaned
  }
  
  return (
    <View className="p-4 border-b border-gray-200">
      <View className="flex-row items-center mb-2">
        <Icons name="CreditCard" color="#000" size={18} />
        <Text className="text-lg font-bold ml-2">Ödeme Yöntemi</Text>
      </View>
      
      <View className="bg-gray-100 rounded-lg p-3">
        <Text className="font-medium mb-3">Kart Bilgileri</Text>
        
        {/* Kart Numarası */}
        <View className="mb-3">
          <Text className="text-sm text-gray-600 mb-1">Kart Numarası</Text>
          <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3 py-2">
            <Icons name="CreditCard" color="#777" size={16} />
            <TextInput
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChangeText={(text) => setCardNumber(formatCardNumber(text))}
              keyboardType="numeric"
              maxLength={19}
              className="flex-1 ml-2 h-8"
            />
          </View>
        </View>
        
        {/* Kart Sahibi */}
        <View className="mb-3">
          <Text className="text-sm text-gray-600 mb-1">Kart Sahibi</Text>
          <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3 py-2">
            <Icons name="User" color="#777" size={16} />
            <TextInput
              placeholder="Ad Soyad"
              value={cardholderName}
              onChangeText={setCardholderName}
              autoCapitalize="words"
              className="flex-1 ml-2 h-8"
            />
          </View>
        </View>
        
        {/* Son Kullanma Tarihi ve CVV */}
        <View className="flex-row space-x-3">
          {/* Son Kullanma Tarihi */}
          <View className="flex-1">
            <Text className="text-sm text-gray-600 mb-1">Son Kullanma</Text>
            <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3 py-2">
              <Icons name="Calendar" color="#777" size={16} />
              <TextInput
                placeholder="AA/YY"
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                keyboardType="numeric"
                maxLength={5}
                className="flex-1 ml-2 h-8"
              />
            </View>
          </View>
          
          {/* CVV */}
          <View className="flex-1">
            <Text className="text-sm text-gray-600 mb-1">CVV</Text>
            <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3 py-2">
              <Icons name="Shield" color="#777" size={16} />
              <TextInput
                placeholder="000"
                value={cvv}
                onChangeText={(text) => setCvv(text.replace(/\D/g, '').slice(0, 3))}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
                className="flex-1 ml-2 h-8"
              />
            </View>
          </View>
        </View>
        
        {/* Güvenli Ödeme Bilgisi */}
        <View className="flex-row items-center mt-4 bg-blue-50 p-2 rounded-lg">
          <Icons name="ShieldCheck" color="#0066cc" size={16} />
          <Text className="text-xs text-blue-700 ml-2">Kart bilgileriniz 3D Secure ile güvenle korunmaktadır</Text>
        </View>
      </View>
    </View>
  )
}