import { View, Text, FlatList } from 'react-native'
import React from 'react'
import RestoranCard from '../RestoranCard'

export default function ReOrder() {
    return (
        <View className='p-3 flex flex-col gap-2'>
            <Text className='font-bold text-xl'>Yeniden sipariş ver</Text>
            <FlatList
                data={Array(3).fill(0)}
                renderItem={() => <RestoranCard />}
                keyExtractor={(item, index) => "reorder-" + index}
                horizontal
                className='w-full'
                contentContainerClassName='flex gap-4'
                showsHorizontalScrollIndicator={false}
            />

        </View>
    )
}

