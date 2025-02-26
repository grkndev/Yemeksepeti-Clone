import React, { useState, memo } from 'react'
import { View, Text, Image as RNImage, TouchableOpacity, Pressable, ScrollView, FlatList, NativeScrollEvent } from 'react-native'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'

import Icons from '@/components/Icons'
import { truncate } from '@/utils/utils'
import { CATEGORIES, MENU_ITEMS, Category, MenuItem } from './types'
import Skeleton from '@/components/Skeleton'
import { FlashList } from '@shopify/flash-list'


function Header() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    
    React.useEffect(() => {
        // Simulate loading the store brand image
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timeout);
    }, []);
    
    const storeLogo = React.useMemo(() => {
        if (isLoading) {
            return (
                <Skeleton 
                    width={64} 
                    height={64} 
                    className="rounded-sm" 
                    disableAnimation={true} 
                />
            );
        }
        return (
            <Image
                source={{ uri: 'http://placehold.jp/200x200.png' }}
                className='w-16 h-16'
                transition={300}
                cachePolicy="memory-disk"
            />
        );
    }, [isLoading]);
    
    return (
        <View className='flex flex-row justify-between relative h-16'>
            <View className='z-10 '>
                <TouchableOpacity onPress={() => router.back()} className='h-full w-16  flex flex-row justify-center items-center '>
                    <Icons name='ArrowLeft' size={24} color='#000' />
                </TouchableOpacity>
            </View>

            {/* Store Brand */}
            <View className='absolute left-1/2 -translate-x-1/2'>
                {storeLogo}
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
    const [isLoading, setIsLoading] = useState(true);
    
    React.useEffect(() => {
        // Simulate loading store information
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 700);
        return () => clearTimeout(timeout);
    }, []);
    
    return (
        <View className='p-4 flex flex-col items-center'>
            {isLoading ? (
                <>
                    <Skeleton width={180} height={24} className="mb-2" lowPerformanceMode={true} />
                    <View>
                        <View className='flex flex-row items-center gap-2'>
                            <Skeleton width={80} height={16} disableAnimation={true} />
                            <Skeleton width={140} height={16} disableAnimation={true} />
                        </View>
                    </View>
                </>
            ) : (
                <>
                    <Text className='font-bold text-xl'>Domino's Pizza</Text>
                    <View>
                        <View className='flex flex-row items-center gap-2'>
                            <Rating rating={3.6} />
                            <Text className='font-bold'>3.6 (500+ değerlendirme)</Text>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}
function DeliveryTime() {
    const [isLoading, setIsLoading] = useState(true);
    
    React.useEffect(() => {
        // Simulate loading delivery time information
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timeout);
    }, []);
    
    return (
        <View className='mx-4 rounded-xl'>
            {isLoading ? (
                <Skeleton height={80} className="rounded-xl" lowPerformanceMode={true} />
            ) : (
                <View className='flex flex-row items-center justify-center gap-3 px-4 border-zinc-200 border-2 p-4 rounded-xl'>
                    <View>
                        <Switch />
                    </View>
                    <View className='flex flex-col '>
                        <Text className='font-bold text-lg'>Teslimat 20-30 dk.</Text>
                        <Text className='text-zinc-600 text-sm'>Ücretsiz Teslimat • Min. sepet tutarı 250,00TL</Text>
                    </View>
                </View>
            )}
        </View>
    );
}
function Campaigns() {
    const [isLoading, setIsLoading] = useState(true);
    
    React.useEffect(() => {
        // Simulate loading campaigns
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 900);
        return () => clearTimeout(timeout);
    }, []);
    
    const skeletonItems = React.useMemo(() => (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {[1, 2, 3].map((item) => (
                <Skeleton 
                    key={item} 
                    width={180} 
                    height={80} 
                    className="rounded-xl" 
                    lowPerformanceMode={true}
                />
            ))}
        </ScrollView>
    ), []);
    
    return (
        <View className='px-4 py-2'>
            {isLoading ? (
                skeletonItems
            ) : (
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
            )}
        </View>
    );
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
const MenuSection = memo(() => {
    const [isLoading, setIsLoading] = useState(true);
    const [imagesLoading, setImagesLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = React.useState(CATEGORIES[0].id);
    const menuListRef = React.useRef<FlashList<any>>(null);
    const categoryScrollRef = React.useRef<ScrollView>(null);
    const [menuData, setMenuData] = React.useState(() => {
        return MENU_ITEMS.map(item => ({
            ...item,
            isLoading: true
        }));
    });
    const router = useRouter();

    // Define our data types more clearly for type safety
    type MenuItemWithLoading = MenuItem & { isLoading: boolean };
    type CategoryHeader = { isCategoryHeader: true, name: string, id: string };
    type ListItem = MenuItemWithLoading | CategoryHeader;

    // Organize menu items with category headers
    const organizedMenuData = React.useMemo(() => {
        const result: ListItem[] = [];
        
        // Group items by category
        const groupedItems = CATEGORIES.map(category => ({
            category,
            items: menuData.filter(item => item.categoryId === category.id)
        }));

        // Create a flat list with category headers
        groupedItems.forEach(group => {
            // Add category header
            result.push({
                isCategoryHeader: true,
                name: group.category.name,
                id: `header-${group.category.id}`
            });
            
            // Add items
            result.push(...group.items);
        });
        
        return result;
    }, [menuData]);

    // Add useEffect to simulate initial data loading
    React.useEffect(() => {
        // Simulate fetching data from an API - reduce timeout duration for faster load
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Reduced from 1000ms to 500ms
        
        return () => clearTimeout(loadingTimeout);
    }, []);

    // Optimize image loading to improve performance
    const handleImageLoad = React.useCallback((itemId: string) => {
        setMenuData(prev => {
            const newData = [...prev];
            const itemIndex = newData.findIndex(i => i.id === itemId);
            if (itemIndex !== -1) {
                newData[itemIndex].isLoading = false;
            }
            return newData;
        });
    }, []);

    // Track overall image loading progress, with debouncing to avoid unnecessary updates
    React.useEffect(() => {
        // Reduce checks for image loading status to improve performance
        if (!isLoading) {
            const checkImagesTimer = setTimeout(() => {
                const allImagesLoaded = menuData.every(item => !item.isLoading);
                if (allImagesLoaded) {
                    setImagesLoading(false);
                }
            }, 200);
            
            return () => clearTimeout(checkImagesTimer);
        }
    }, [isLoading, menuData]);

    // Memoize the category positions calculation to avoid recalculating on each render
    const getCategoryPositions = React.useCallback(() => {
        let positions: { [key: string]: number } = {};
        let currentPosition = 0;

        // Iterate through organized data to find header positions
        organizedMenuData.forEach((item) => {
            if ('isCategoryHeader' in item) {
                const categoryId = item.id.replace('header-', '');
                positions[categoryId] = currentPosition;
            }
            // Estimate position based on item height (different for headers and items)
            currentPosition += 'isCategoryHeader' in item ? 45 : 120;
        });

        return positions;
    }, [organizedMenuData]);

    // Optimize category press handler
    const handleCategoryPress = React.useCallback((categoryId: string) => {
        setSelectedCategory(categoryId);
        
        // Find the exact index of the category header in the organized data
        let headerIndex = -1;
        organizedMenuData.forEach((item, index) => {
            if ('isCategoryHeader' in item && item.id === `header-${categoryId}`) {
                headerIndex = index;
            }
        });
        
        if (headerIndex === -1) return; // Header not found
        
        // Calculate exact position with more precise measurements
        let exactPosition = 0;
        for (let i = 0; i < headerIndex; i++) {
            const item = organizedMenuData[i];
            // Use exact heights: header height is 45px, item height varies by content but averages 120px
            exactPosition += 'isCategoryHeader' in item ? 45 : 120;
        }
        
        // No offset adjustment - we want exactly at the top
        const adjustedPosition = Math.max(0, exactPosition);
        
        // Immediate scroll without animation for precise positioning
        menuListRef.current?.scrollToOffset({
            offset: adjustedPosition,
            animated: false // Disable animation for immediate positioning
        });

        // Center the category tab in the horizontal scroll view
        const categoryWidth = 80; // Approximate width of each category tab
        const categoryIndex = parseInt(categoryId) - 1; // Convert to zero-based index
        const categoryPosition = categoryIndex * categoryWidth;
        
        categoryScrollRef.current?.scrollTo({
            x: Math.max(0, categoryPosition - 40), // Center it with some padding
            animated: true // Keep animation for category tabs as it's not as critical
        });
    }, [organizedMenuData]);

    // Optimize scroll handler with throttling
    const handleScroll = React.useCallback((event: NativeScrollEvent) => {
        const y = event.contentOffset.y;
        
        // Optimize category calculations - avoid unnecessary work
        if (y < 0) return; // Skip calculations if scrolled to the top
        
        // Calculate positions based on organized data
        let headerPositions: { pos: number, id: string }[] = [];
        let currentPosition = 0;
        
        organizedMenuData.forEach(item => {
            if ('isCategoryHeader' in item) {
                const categoryId = item.id.replace('header-', '');
                headerPositions.push({ pos: currentPosition, id: categoryId });
            }
            currentPosition += 'isCategoryHeader' in item ? 45 : 120;
        });
        
        // Find the visible category header - only consider headers within the visible area
        // or just above it with a small tolerance to account for the sticky header itself
        const headerHeight = 45; // Height of our sticky header
        
        // Find the header that should be active based on the current scroll position
        let activeHeaderIndex = -1;
        
        // Consider the area just slightly above the top of the screen to account for sticky headers
        const effectiveScrollTop = Math.max(0, y - headerHeight/2);
        
        // Find the last header whose position is less than or equal to the effective scroll top
        for (let i = 0; i < headerPositions.length; i++) {
            if (headerPositions[i].pos <= effectiveScrollTop) {
                activeHeaderIndex = i;
            } else {
                // Exit loop once we find a header below our current scroll position
                break;
            }
        }
        
        // If there's no header below us, maybe we're at the very end of the list
        // In that case, the last category should be active
        if (activeHeaderIndex === -1 && headerPositions.length > 0) {
            // Get the highest index that's above the current scroll position
            for (let i = headerPositions.length - 1; i >= 0; i--) {
                if (headerPositions[i].pos <= y) {
                    activeHeaderIndex = i;
                    break;
                }
            }
        }
        
        if (activeHeaderIndex >= 0) {
            const newCategory = headerPositions[activeHeaderIndex].id;
            
            if (newCategory !== selectedCategory) {
                setSelectedCategory(newCategory);
                
                // Scroll the category tabs to center the selected category
                const categoryPosition = (parseInt(newCategory) - 1) * 80;
                
                // Only scroll the category tabs when the user has actually scrolled the content
                // not when the initial category selection happens
                requestAnimationFrame(() => {
                    categoryScrollRef.current?.scrollTo({
                        x: categoryPosition,
                        animated: true
                    });
                });
            }
        }
    }, [selectedCategory, organizedMenuData]);

    const renderSectionHeader = React.useCallback(({ section }: { section: { category: Category } }) => (
        <Text className="px-4 py-2 text-base font-bold text-zinc-800 bg-zinc-50">
            {section.category.name}
        </Text>
    ), []);

    // Render item with enhanced category header styling
    const renderItem = React.useCallback(({ item }: { item: ListItem }) => {
        // Render category header with sticky behavior implemented via View styles
        if ('isCategoryHeader' in item) {
            return (
                <View 
                    className="bg-zinc-50 py-3 px-4 border-b border-zinc-200 z-10"
                    style={{ 
                        position: 'sticky', 
                        top: 0,
                        zIndex: 999
                    }}
                >
                    <Text className="font-bold text-zinc-800 text-lg">
                        {item.name}
                    </Text>
                </View>
            );
        }
        
        // Render menu item
        return (
            <TouchableOpacity
                key={`menu-section-product-${item.id}`}
                onPress={() => router.push("/(screens)/ProductScreen/Screen")}
                className="p-4 border-b border-zinc-100 active:bg-zinc-50"
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
                                <Skeleton className="absolute inset-0 z-10 rounded-lg" disableAnimation={true} />
                            )}
                            <Image
                                source={{ uri: item.image }}
                                style={{ width: 128, height: 128, borderRadius: 8 }}
                                contentFit="cover"
                                transition={200}
                                cachePolicy="memory-disk"
                                priority="high"
                                onLoadEnd={() => handleImageLoad(item.id)}
                            />
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    }, [handleImageLoad, router]);

    // Optimize the skeleton rendering with memoization
    const renderSkeletonItem = React.useCallback(() => (
        <View className="p-4 border-b border-zinc-100">
            <View className="flex-row justify-between items-start gap-1">
                <View className="flex-1">
                    <Skeleton height={20} width="70%" className="mb-2" disableAnimation={true} />
                    <Skeleton height={16} width="30%" className="mb-2" disableAnimation={true} />
                    <Skeleton height={16} width="90%" className="mb-1" disableAnimation={true} />
                    <Skeleton height={16} width="60%" disableAnimation={true} />
                </View>
                <Skeleton width={128} height={128} className="rounded-lg" lowPerformanceMode={true} />
            </View>
        </View>
    ), []);

    // Create a memoized array of skeleton items to avoid recreating on each render
    const skeletonItems = React.useMemo(() => {
        return Array(4).fill(0).map((_, index) => (
            <React.Fragment key={index}>
                {index % 2 === 0 && (
                    <Skeleton height={40} className="mx-4 my-2" disableAnimation={true} />
                )}
                {renderSkeletonItem()}
            </React.Fragment>
        ));
    }, [renderSkeletonItem]);

    // Memoize skeleton categories to prevent recreation
    const skeletonCategories = React.useMemo(() => (
        <>
            {[1, 2, 3, 4].map((_, index) => (
                <Skeleton 
                    key={index} 
                    height={36} 
                    width={80} 
                    className="mr-2 rounded-full" 
                    disableAnimation={true}
                />
            ))}
        </>
    ), []);

    // Get sticky header indices for FlashList
    const stickyHeaderIndices = React.useMemo(() => {
        const indices: number[] = [];
        organizedMenuData.forEach((item, index) => {
            if ('isCategoryHeader' in item) {
                indices.push(index);
            }
        });
        return indices;
    }, [organizedMenuData]);

    return (
        <View className="flex-1">
            {isLoading ? (
                <View className="flex-1">
                    {/* Skeleton for category list - simplified and memoized */}
                    <View className="bg-white border-b border-zinc-100 p-2">
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {skeletonCategories}
                        </ScrollView>
                    </View>
                    
                    {/* Reduced number of skeleton items */}
                    <ScrollView>
                        {skeletonItems}
                    </ScrollView>
                </View>
            ) : (
                <>
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

                    <FlashList
                        ref={menuListRef}
                        data={organizedMenuData}
                        renderItem={renderItem}
                        keyExtractor={(item) => 'id' in item ? item.id : ''}
                        onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
                        scrollEventThrottle={32} // Reduced from 16 to 32 for better performance
                        estimatedItemSize={120}
                        onLoad={() => { setIsLoading(false) }}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                </>
            )}
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