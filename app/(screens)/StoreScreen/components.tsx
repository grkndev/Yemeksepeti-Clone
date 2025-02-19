import { View, Text, Image, TouchableOpacity, Pressable, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import Icons from '@/components/Icons'
import Animated, { useAnimatedStyle, withSpring, interpolateColor } from 'react-native-reanimated'
import { truncate } from '@/utils/utils'



export function DeliveryTime() {
    return (
        <View className='flex flex-row items-center justify-center gap-3 px-4 border-zinc-200 border-2 p-4 mx-4 rounded-xl'>
            <View>
                <Switch />
            </View>
            <View className='flex flex-col '>
                <Text className='font-bold text-lg'>Teslimat 20-30 dk.</Text>
                <Text className='text-zinc-600 text-sm'>Ücretsiz Teslimat • Min. sepet tutarı 250,00TL</Text>
            </View>
        </View>
    )
}
export function CampaignCard() {
    return (
        <View className='w-[50vw]  border-2 border-zinc-200 rounded-xl p-3'>
            <View className='flex flex-row gap-1 items-center'>
                <Icons name="BadgePercent" size={24} color='#fff' fill={"#FA0250"} />
                <Text className='font-bold text-lg'>23% indirim</Text>
            </View>
            <View>
                <Text className='text-xs'>
                    {truncate("Min. sepet tutarı 0TL Seçili ürünlerde geçerlidir. Otomatik uygulanır.", 57, 57)}
                </Text>
            </View>
        </View>
    )
}

export function Campaigns() {
    return (
        <View className='px-4 py-2'>
            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8]}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (

                    <CampaignCard />

                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-2"
              
            />
        </View>
    )
}

export function Rating({ rating }: {
    rating: number
}) {
    // Ensure rating is between 1 and 5
    const validRating = Math.max(1, Math.min(5, rating));

    // Calculate full and half stars
    const fullStars = Math.floor(validRating);
    const hasHalfStar = validRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <View className='flex flex-row'>
            {/* Full stars */}
            {[...Array(fullStars)].map((_, index) => (
                <Icons key={`full-${index}`} name='Star' size={14} fill={"#FA0250"} color='#FA0250' />
            ))}

            {/* Half star */}
            {hasHalfStar && (
                <Icons name='StarHalf' size={14} fill={"#FA0250"} color='#FA0250' />
            )}

            {/* Empty stars */}
            {[...Array(emptyStars)].map((_, index) => (
                <Icons key={`empty-${index}`} name='Star' size={14} color='#FA0250' />
            ))}
        </View>
    )
}

export function StoreInfo() {
    return (
        <View className='p-4 flex flex-col items-center'>
            <Text className='font-bold text-xl'>Maydonoz Döner</Text>
            <View>
                <View className='flex flex-row items-center gap-2'>
                    <Rating rating={3.6} />
                    <Text className='font-bold'>3.6 (500+ değerlendirme)</Text>
                </View>
            </View>
        </View>
    )
}

export function Header() {
    return (
        <View className='flex flex-row justify-between relative h-16'>
            <View className='z-10 '>
                <TouchableOpacity className='h-full w-16  flex flex-row justify-center items-center '>
                    <Icons name='ArrowLeft' size={24} color='#000' />
                </TouchableOpacity>
            </View>

            {/* Store Brand */}
            <View className='absolute left-1/2 -translate-x-1/2'>
                <Image
                    source={{ uri: 'http://placehold.jp/200x200.png' }}
                    className='w-16 h-16'
                />
            </View>

            <View className='flex flex-row gap-3 items-center z-10 pr-2'>
                <TouchableOpacity className='p-1'>
                    <Icons name='Info' size={20} color='#000' />
                </TouchableOpacity>
                <TouchableOpacity className='p-1'>
                    <Icons name='Heart' size={20} color='#000' />
                </TouchableOpacity>
                <TouchableOpacity className='p-1'>
                    <Icons name='Share' size={20} color='#000' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export function Switch({
    value = false,
    onValueChange,
    disabled = false
}: {
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    disabled?: boolean;
}) {
    const [isEnabled, setIsEnabled] = useState(value);

    const toggleSwitch = () => {
        if (disabled) return;
        const newValue = !isEnabled;
        setIsEnabled(newValue);
        onValueChange?.(newValue);
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withSpring(isEnabled ? 27 : 0, {
                        damping: 20,
                        stiffness: 180,
                        mass: 0.8
                    }),
                },
            ],
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#9CA3AF',
        };
    });

    return (
        <Pressable onPress={toggleSwitch} disabled={disabled}>
            <View
                className="w-[61px] h-[31px] rounded-[15.5px] justify-center px-3.5 py-3 bg-zinc-200 flex-row items-center border border-zinc-300"
            >
                <Animated.View
                    style={[
                        {
                            width: 27,
                            height: 27,
                            borderRadius: 13.5,
                            position: 'absolute',
                            left: 2,
                        },
                        animatedStyle,
                    ]}
                    className="absolute"
                />
                <View className="absolute left-[6.5px] h-full justify-center items-center z-10">
                    <Icons
                        name="Bike"
                        size={16}
                        color="#000"
                        style={{ opacity: !isEnabled ? 1 : 0.8 }}
                    />
                </View>
                <View className="absolute right-[9px] h-full justify-center items-center z-10">
                    <Icons
                        name="Footprints"
                        size={16}
                        color="#000"
                        style={{ opacity: !isEnabled ? 0.8 : 1 }}
                    />
                </View>
            </View>
        </Pressable>
    )
}