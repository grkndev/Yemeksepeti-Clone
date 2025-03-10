import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React, { memo, useState, useCallback } from 'react'
import Icons from './Icons'
import Badge from './Badge'
import { cn } from '@/utils/utils'
import { RestoranDataType } from '@/utils/types/Restoran.type'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
import Skeleton from './Skeleton'

const RestoranData: RestoranDataType = {
    name: 'Domino\'s Pizza',
    rating: 4.5,
    ratingCount: 500,
    price: '₺₺',
    minOrder: 250,
    category: 'Döner',
    duration: '20-35 dk.',
    delivery: 0,
    image: 'http://placehold.jp/1280x720.png',
    discount: [
        {
            type: "cupon",
            value: "75₺ indirim: sepette",
        },
        {
            type: 'discount',
            value: "%23 indirim",
        }

    ],
    promoted: true,
    sponsored: true,
    express: false
}

const RestoranCard = memo(({ data = RestoranData }: { data?: RestoranDataType }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    const handlePress = useCallback(() => {
        router.push("/(screens)/StoreScreen/Screen")
    }, [])

    return (
        <TouchableOpacity 
            onPress={handlePress}
            activeOpacity={0.7}
            className='border border-zinc-300 w-[66vw] rounded-lg flex flex-col overflow-hidden'
        >
            <View className='aspect-video w-full relative'>
                {isLoading && (
                    <Skeleton className='absolute inset-0 z-10' />
                )}
                <ImageBackground
                    source={{ uri: data.image }}
                    className='w-full h-full'
                    resizeMode='cover'
                    onLoadEnd={() => setIsLoading(false)}
                >
                    <View className='w-full p-2 flex flex-col items-center justify-between h-full'>
                        <View className='w-full flex flex-row justify-between items-start'>
                            <View className='flex flex-col items-start gap-2'>
                                {
                                    data.discount.map((item, index) => (
                                        <Badge key={"Bage-" + item.type + "#" + index}>{item.value}</Badge>
                                    ))
                                }
                            </View>
                            <TouchableOpacity
                                className='bg-white p-2 rounded-full'
                                onPress={() => { }}
                            >
                                <Icons name='Heart' color='#FA0250' size={16} />
                            </TouchableOpacity>
                        </View>
                        <View className='w-full flex flex-row justify-between items-center'>
                            {
                                data.sponsored && <Badge varriant='sponsored'><Icons name='BadgeCheck' color='#FA0250' size={16} /></Badge>
                            }
                            {
                                data.promoted && <Badge varriant='promoted'>Öne Çıkan</Badge>
                            }
                        </View>
                    </View>
                </ImageBackground>
            </View>

            <View className='p-2'>
                <View className='w-full items-center flex flex-row justify-between'>
                    <Text className='font-bold'>{data.name}</Text>
                    <View className='flex flex-row items-center gap-1'>
                        <Icons name='Star' size={14} fill={"#FA0250"} color='#FA0250' />
                        <Text className='text-black'>{data.rating}</Text>
                        <Text className='text-zinc-400 text-sm'>({data.ratingCount}+)</Text>
                    </View>
                </View>
                <View className='flex flex-row items-center'>
                    <Text className='text-sm text-zinc-400'>{data.price}</Text>
                    <Text className='text-sm text-zinc-400'>•</Text>
                    <Text className='text-sm text-zinc-400'>Min. sepet tutarı {data.minOrder}TL</Text>
                    <Text className='text-sm text-zinc-400'>•</Text>
                    <Text className='text-sm text-zinc-400'>{data.category}</Text>
                </View>
                <View className='flex flex-row items-center gap-1'>
                    <View className='flex flex-row items-center gap-1'>
                        <Icons name='Clock5' color='#a1a1aa' size={14} />
                        <Text className='text-sm text-zinc-400'>{data.duration}</Text>
                    </View>
                    <Text className='text-sm text-zinc-400'>•</Text>
                    <View className='flex flex-row items-center gap-1'>
                        <Icons name='Bike' size={14} color={
                            data.delivery === 0 ? '#22c55e' : '#a1a1aa'
                        } />
                        <Text className={
                            cn('text-sm', data.delivery === 0 ? 'text-green-500  font-bold ' : 'text-zinc-400')
                        }>{data.delivery === 0 ? `Ücretsiz` : data.delivery}{data.delivery > 0 && `TL`}</Text>
                    </View>
                    {
                        data.express && (
                            <View className='flex flex-row items-center gap-1'>
                                <Text className='text-sm text-zinc-400'>•</Text>
                                <View className='flex flex-row items-center gap-1'>
                                    <Icons name='Rocket' color='#a1a1aa' size={14} strokeWidth={2.5} />
                                    <Text className='text-sm text-zinc-400 font-medium'>Express</Text>
                                </View>
                            </View>
                        )
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
})

export default RestoranCard