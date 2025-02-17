import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Icons from './Icons'


const FiltersData = ['Sıralama', 'Mutfak', 'Min. Sepet Tutarı', 'Süper restoran', 'Ödeme Şekli']
export default function Filters() {
    return (
        <View className='px-4'>
            <ScrollView
                horizontal
                contentContainerClassName='gap-2'
                showsHorizontalScrollIndicator={false}
                className='flex flex-row py-4 '>

                <TouchableOpacity
                    className='border border-zinc-300 rounded-full py-1.5 px-4 flex flex-row gap-1 items-center justify-center'>
                    <Icons name='SlidersHorizontal' size={20} color='#000' />
                </TouchableOpacity>

                {
                    FiltersData.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={`item#${index}`}
                                className='border border-zinc-300 rounded-full py-1.5 px-4 flex flex-row gap-1 items-center justify-center'>
                                <Text className='font-bold text-sm'>{item}</Text>
                                <Icons name='ChevronDown' size={20} color='#000' />
                            </TouchableOpacity>
                        )
                    })
                }




            </ScrollView>
        </View>
    )
}