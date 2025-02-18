import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icons from '../Icons'

export default function HeaderComponent({
    textColor = 'text-white',
    iconColor = '#fff',
}) {
    return (
        <View className=' flex flex-row items-center  justify-between p-3'>
            <View className='flex flex-row items-center gap-3'>
                <Icons name='MapPin' size={24} color={iconColor} />
                <View className='flex flex-col justify-center items-start'>
                    <Text className={`${textColor} font-semibold text-lg`}>Ev</Text>
                    <Text className={`${textColor} text-xs`}>Yirmiikigün 91041</Text>
                </View>
            </View>
            <View className='flex flex-row items-center gap-4'>
                <TouchableOpacity className='p-2'>
                    <Icons name='Heart' size={20} color={iconColor} />
                </TouchableOpacity>
                <TouchableOpacity className='p-2'>
                    <Icons name='ShoppingCart' size={20} color={iconColor} />
                </TouchableOpacity>
            </View>
        </View>
    )
}