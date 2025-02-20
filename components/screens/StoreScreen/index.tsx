import React, { useState, memo } from 'react'
import { View, Text, Image as RNImage, TouchableOpacity, Pressable, ScrollView, FlatList, NativeScrollEvent } from 'react-native'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'

import Icons from '@/components/Icons'
import { truncate } from '@/utils/utils'
import { CATEGORIES, MENU_ITEMS, Category, MenuItem } from './types'
import Skeleton from '@/components/Skeleton'


function Header() {
    const router = useRouter()
    return (
        <View className='flex flex-row justify-between relative h-16'>
            <View className='z-10 '>
                <TouchableOpacity onPress={() => router.back()} className='h-full w-16  flex flex-row justify-center items-center '>
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
function StoreInfo() {
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
function DeliveryTime() {
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
function Campaigns() {
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
function CampaignCard() {
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
function Rating({ rating }: {
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
function Switch({
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
const MenuSection = memo(({ onLoadComplete }: { onLoadComplete?: () => void }) => {
    const [selectedCategory, setSelectedCategory] = React.useState(CATEGORIES[0].id);
    const menuListRef = React.useRef<FlatList>(null);
    const categoryScrollRef = React.useRef<ScrollView>(null);
    const [menuData, setMenuData] = React.useState(() => {
        return MENU_ITEMS.map(item => ({
            ...item,
            isLoading: true
        }));
    });
    const router = useRouter()

    React.useEffect(() => {
        // Menü yüklendiğinde callback'i çağır
        onLoadComplete?.()
    }, [])

    const getCategoryPositions = React.useCallback(() => {
        let positions: { [key: string]: number } = {};
        let currentPosition = 0;

        // Kategorilere göre grupla
        const groupedItems = CATEGORIES.map(category => ({
            category,
            items: menuData.filter(item => item.categoryId === category.id)
        }));

        groupedItems.forEach(section => {
            positions[section.category.id] = currentPosition;
            currentPosition += 40 + (section.items.length * 100);
        });

        return positions;
    }, [menuData]);

    const handleCategoryPress = (categoryId: string) => {
        setSelectedCategory(categoryId);
        const positions = getCategoryPositions();
        const targetPosition = positions[categoryId];

        menuListRef.current?.scrollToOffset({
            offset: targetPosition + 30,
            animated: true
        });

        const categoryPosition = (parseInt(categoryId) - 1) * 80;
        categoryScrollRef.current?.scrollTo({
            x: categoryPosition,
            animated: true
        });
    };

    const handleScroll = React.useCallback((event: NativeScrollEvent) => {
        const y = event.contentOffset.y;
        const height = event.layoutMeasurement.height;

        // Kategorilere göre grupla
        const groupedItems = CATEGORIES.map(category => ({
            category,
            items: menuData.filter(item => item.categoryId === category.id)
        }));

        // Her bir kategorinin yüksekliğini hesapla
        const categoryHeights = groupedItems.map(section => {
            return section.items.length * 100 + 40;
        });

        // Kümülatif yükseklikleri hesapla
        let accumulatedHeight = 0;
        const categoryPositions = categoryHeights.map(h => {
            const position = accumulatedHeight;
            accumulatedHeight += h;
            return position;
        });

        // Görünür alanın üst ve alt sınırlarını hesapla
        const visibleTop = y;
        const visibleBottom = y + height;

        // Hangi kategorilerin görünür olduğunu bul
        let visibleCategoryId = selectedCategory;
        for (let i = 0; i < groupedItems.length; i++) {
            const categoryTop = categoryPositions[i];
            const categoryBottom = categoryTop + categoryHeights[i];

            if (categoryTop <= visibleBottom && categoryBottom >= visibleTop) {
                visibleCategoryId = groupedItems[i].category.id;
                break;
            }
        }

        if (visibleCategoryId !== selectedCategory) {
            setSelectedCategory(visibleCategoryId);
            const categoryPosition = (parseInt(visibleCategoryId) - 1) * 80;
            categoryScrollRef.current?.scrollTo({
                x: categoryPosition,
                animated: true
            });
        }
    }, [selectedCategory, menuData]);

    const renderSectionHeader = ({ section }: { section: { category: Category } }) => (
        <Text className="px-4 py-2 text-base font-bold text-zinc-800 bg-zinc-50">
            {section.category.name}
        </Text>
    );

    const renderItem = React.useCallback(({ item, index }: { item: MenuItem & { isLoading: boolean }, index: number }) => (
        <TouchableOpacity
            key={`menu-section-product-${index}`}
            onPress={() => router.push("/(screens)/ProductScreen/Screen")}
            className="p-4 border-b border-zinc-100 active:bg-zinc-50 bg-white"
        >
            <View className="flex-row justify-between items-start gap-1">
                <View className="flex-1">
                    <Text className="text-base font-semibold text-zinc-900 mb-1">
                        {item.name}
                    </Text>
                    <Text>
                        {item.price.toFixed(2)} TL
                    </Text>
                    <Text className="text-sm text-zinc-500 my-2">
                        {item.description}
                    </Text>
                </View>
                {item.image && (
                    <View className="relative w-32 h-32">
                        {item.isLoading && (
                            <Skeleton className="absolute inset-0 z-10 rounded-lg" />
                        )}
                        <Image
                            source={{ uri: item.image }}
                            style={{ width: 128, height: 128, borderRadius: 8 }}
                            contentFit="cover"
                            transition={200}
                            onLoadEnd={() => {
                                const newData = [...menuData];
                                const itemIndex = newData.findIndex(i => i.id === item.id);
                                if (itemIndex !== -1) {
                                    newData[itemIndex].isLoading = false;
                                    setMenuData(newData);
                                }
                            }}
                        />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    ), [menuData]);

    const getItemLayout = (data: any, index: number) => ({
        length: 120, // Yaklaşık bir öğe yüksekliği
        offset: 120 * index,
        index,
    });

    return (
        <View className="flex-1">
            {/* Sticky kategori listesi */}
            <View className="bg-white border-b border-zinc-100">
                <ScrollView
                    ref={categoryScrollRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ padding: 8 }}
                >
                    {CATEGORIES.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            onPress={() => handleCategoryPress(category.id)}
                            className={`px-4 py-2 mr-2 rounded-full border ${selectedCategory === category.id
                                    ? 'bg-ys border-ys'
                                    : 'bg-white border-zinc-200'
                                }`}
                        >
                            <Text
                                className={`${selectedCategory === category.id
                                        ? 'text-white font-semibold'
                                        : 'text-zinc-400'
                                    }`}
                            >
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Menü listesi */}
            <FlatList
                ref={menuListRef}
                data={menuData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
                scrollEventThrottle={16}
                getItemLayout={getItemLayout}
                removeClippedSubviews={true}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                windowSize={5}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
});

export {
    Header,
    StoreInfo,
    DeliveryTime,
    Campaigns,
    MenuSection
}