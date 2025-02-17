import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import Icons from './Icons'
import Badge from './Badge'
import { cn } from '@/utils/utils'

const RestoranData = {
    name: 'Maydonoz Döner',
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
    sponsored: true
}

export default function RestoranCard() {
    return (
        <TouchableOpacity className='border border-zinc-300 w-[66vw] rounded-lg flex flex-col overflow-hidden'>
            <ImageBackground
                source={{ uri: RestoranData.image }}
                resizeMethod='scale'
                resizeMode='contain'
                className='aspect-video w-full '
            >
                <View className='w-full p-2 flex flex-col items-center justify-between h-full'>
                    <View className='w-full flex flex-row justify-between items-start'>
                        <View className='flex flex-col items-start  gap-2'>
                            {
                                RestoranData.discount.map((item, index) => (
                                    <Badge key={"Bage-" + item.type + "#" + index}>{item.value}</Badge>
                                ))
                            }
                        </View>
                        <TouchableOpacity
                            className=' bg-white p-2 rounded-full'
                            onPress={() => { }}
                        >
                            <Icons name='Heart' color='#FA0250' size={16} />
                        </TouchableOpacity>
                    </View>
                    <View className='w-full flex flex-row justify-between items-center'>
                        {
                            RestoranData.sponsored && <Badge varriant='sponsored'><Icons name='BadgeCheck' color='#FA0250' size={16} /></Badge>
                        }
                        {
                            RestoranData.promoted && <Badge varriant='promoted'>Öne Çıkan</Badge>
                        }
                    </View>
                </View>

            </ImageBackground>

            <View className='p-2'>
                <View className='w-full items-center flex flex-row justify-between'>
                    <Text className='font-bold'>{RestoranData.name}</Text>
                    <View className='flex flex-row items-center gap-1'>
                        <Icons name='Star' size={14} fill={"#FA0250"} color='#FA0250' />
                        <Text className='text-black'>{RestoranData.rating}</Text>
                        <Text className='text-zinc-400 text-sm'>({RestoranData.ratingCount}+)</Text>
                    </View>
                </View>
                <View className='flex flex-row items-center'>
                    <Text className='text-sm text-zinc-400'>{RestoranData.price}</Text>
                    <Text className='text-sm text-zinc-400'>•</Text>
                    <Text className='text-sm text-zinc-400'>Min. sepet tutarı {RestoranData.minOrder}TL</Text>
                    <Text className='text-sm text-zinc-400'>•</Text>
                    <Text className='text-sm text-zinc-400'>{RestoranData.category}</Text>
                </View>
                <View className='flex flex-row items-center gap-1'>
                    <View className='flex flex-row items-center gap-1'>
                        <Icons name='Clock5' color='#a1a1aa' size={14} />
                        <Text className='text-sm text-zinc-400'>{RestoranData.duration}</Text>
                    </View>
                    <Text className='text-sm text-zinc-400'>•</Text>
                    <View className='flex flex-row items-center gap-1'>
                        <Icons name='Bike' size={14} color={
                            RestoranData.delivery === 0 ? '#22c55e' : '#a1a1aa'
                        } />
                        <Text className={
                            cn('text-sm', RestoranData.delivery === 0 ? 'text-green-500  font-bold ' : 'text-zinc-400')
                        }>{RestoranData.delivery === 0 ? `Ücretsiz` : RestoranData.delivery}{RestoranData.delivery > 0 && `TL`}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}