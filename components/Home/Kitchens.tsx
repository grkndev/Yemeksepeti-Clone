import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

export default function Kitchens() {
    return (
        <View className='p-3 gap-2 flex flex-col'>
            <Text className='font-bold text-xl'>Mutfaklar</Text>
            <FlatList
                data={Array(5).fill(0)}
                renderItem={() => <KitchenCard />}
                keyExtractor={(item, index) => "Kitchen-" + index}
                horizontal
                className='w-full'
                contentContainerClassName='flex gap-4'
                showsHorizontalScrollIndicator={false}

            />
        </View>
    )
}

function KitchenCard() {
    return (
        <View className='w-[20vw] aspect-square rounded-xl overflow-hidden'>
            <Image
                className='w-full h-full'
                source={{ uri: "http://placehold.jp/500x500.png" }}
                resizeMethod='scale'
                resizeMode='contain'
            />
        </View>
    )
}