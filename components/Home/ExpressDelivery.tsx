import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import RestoranCard from '../RestoranCard'
import Icons from '../Icons'
import { RestoranDataType } from '@/utils/types/Restoran.type'

const RestoranData: RestoranDataType = {
    name: 'Burger King',
    rating: 3.8,
    ratingCount: 500,
    price: '₺₺',
    minOrder: 250,
    category: 'Hamburger',
    duration: '20-30 dk.',
    delivery: 25.99,
    image: 'http://placehold.jp/1280x720.png',
    discount: [
        {
            type: "cupon",
            value: "150₺ indirim: sepette150",
        }

    ],
    promoted: true,
    sponsored: true,
    express: true
}

export default function ExpressDelivery() {
    return (
        <View className='p-3 flex flex-col gap-2'>
            <View className='flex flex-row w-full justify-between items-center'>
                <Text className='font-bold text-xl'>Express teslimatlı restoranlar</Text>
                <TouchableOpacity className='p-1.5 border border-zinc-200 rounded-full'>
                    <Icons name='ChevronRight' color='#000' />
                </TouchableOpacity>
            </View>
            <FlatList
                data={Array(3).fill(0)}
                renderItem={() => <RestoranCard data={RestoranData} />}
                keyExtractor={(item, index) => "reorder-" + index}
                horizontal
                className='w-full'
                contentContainerClassName='flex gap-4'
                showsHorizontalScrollIndicator={false}
            />

        </View>
    )
}

