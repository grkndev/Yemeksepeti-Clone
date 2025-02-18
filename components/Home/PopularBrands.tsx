import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

export default function PopularBrands() {
    return (
        <View className='p-3 gap-2 flex flex-col'>
            <Text className='font-bold text-xl'>Popüler Markalar</Text>
            <FlatList
                data={Array(5).fill(0)}
                renderItem={() => <PopularBrandsCard />}
                keyExtractor={(item, index) => "PopularBrands-" + index}
                horizontal
                className='w-full'
                contentContainerClassName='flex gap-4'
                showsHorizontalScrollIndicator={false}

            />
        </View>
    )
}

function PopularBrandsCard() {
    return (
        <View className='gap-1 overflow-hidden flex flex-col items-center justify-center'>
            <Image
                className='w-[23vw] aspect-square rounded-xl'
                source={{ uri: "http://placehold.jp/500x500.png" }}
                resizeMethod='scale'
                resizeMode='contain'
            />
            <View className='flex flex-col items-center justify-center'>
                <Text className='font-bold max-w-[20vw] text-center'>Brand</Text>
                <Text className='text-xs'>20-30 dk.</Text>
            </View>
        </View>
    )
}