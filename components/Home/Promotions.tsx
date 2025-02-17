import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
// import { Image } from 'expo-image'
import React from 'react'


export default function Promotions() {
    return (
        <View className='w-full px-3 py-6'>

            <FlatList
                data={Array(5).fill(0)}
                renderItem={() => <View className='w-[33vw] aspect-[.8] rounded-xl overflow-hidden'>
                    <Image
                        className='w-full h-full'
                        source={{ uri: "http://placehold.jp/400x500.png" }}
                        resizeMethod='scale'
                        resizeMode='contain'
                    />


                </View>}
                keyExtractor={(item, index) => "Promotion-" + index}
                horizontal
                className=''
                contentContainerClassName='flex gap-4'
                showsHorizontalScrollIndicator={false}
            />


        </View >
    )
}