import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icons from '../Icons'
import { useStore } from '@/store/useStore';
import { useRouter } from 'expo-router'
export default function HeaderComponent({
    textColor = 'text-white',
    iconColor = '#fff',
}) {
    const router = useRouter()
    const { cart } = useStore()
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
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
                <TouchableOpacity onPress={() => {
                    router.push('/(screens)/CartScreen/Screen')
                }} className='p-2'>
                    <Icons name='ShoppingCart' size={20} color={iconColor} />
                    {
                        totalItems > 0 && <View className='absolute -right-1 -bottom-1 aspect-square p-1 w-6'>
                            <Text className=' text-xs bg-white rounded-full   text-center'>{totalItems}</Text>
                        </View>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}