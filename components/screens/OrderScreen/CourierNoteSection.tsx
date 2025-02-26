import React from 'react'
import { View, Text, TextInput } from 'react-native'
import Icons from '@/components/Icons'

interface CourierNoteSectionProps {
  courierNote: string
  setCourierNote: (note: string) => void
}

export default function CourierNoteSection({ 
  courierNote, 
  setCourierNote 
}: CourierNoteSectionProps) {
  return (
    <View className="p-4 border-b border-gray-200">
      <View className="flex-row items-center mb-2">
        <Icons name="MessageCircle" color="#000" size={18} />
        <Text className="text-lg font-bold ml-2">Kuryeye Not</Text>
      </View>
      
      <View className="bg-gray-100 p-3 rounded-lg">
        <TextInput
          placeholder="Kurye için notunuz (isteğe bağlı)"
          multiline
          numberOfLines={2}
          value={courierNote}
          onChangeText={setCourierNote}
          className="min-h-12"
        />
      </View>
    </View>
  )
}