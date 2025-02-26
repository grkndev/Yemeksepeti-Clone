import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icons from '@/components/Icons'

interface AcceptTermsSectionProps {
  acceptedTerms: boolean
  setAcceptedTerms: (accepted: boolean) => void
}

export default function AcceptTermsSection({ 
  acceptedTerms, 
  setAcceptedTerms 
}: AcceptTermsSectionProps) {
  return (
    <View className="p-4">
      <TouchableOpacity 
        className="flex-row items-start"
        onPress={() => setAcceptedTerms(!acceptedTerms)}
      >
        <View className={`w-6 h-6 rounded-md border items-center justify-center mr-2 ${acceptedTerms ? 'bg-ys border-ys' : 'border-gray-400'}`}>
          {acceptedTerms && <Icons name="Check" color="#fff" size={16} />}
        </View>
        
        <Text className="flex-1 text-sm text-gray-700">
          Ön bilgilendirme koşullarını ve mesafeli satış sözleşmesini okudum, onaylıyorum. Kişisel verilerimin işlenmesine ilişkin aydınlatma metnini okudum.
        </Text>
      </TouchableOpacity>
    </View>
  )
}