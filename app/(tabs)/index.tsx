import { Animated, View, Text, TouchableOpacity, ScrollView, ViewStyle, Dimensions } from 'react-native'
import React, { useMemo } from 'react'
import Filters from '@/components/Filters'
import HeaderComponent from '@/components/Home/HeaderComponent'
import SearchComponent from '@/components/Home/SearchComponent'
import ReOrder from '@/components/Home/ReOrder'
import Promotions from '@/components/Home/Promotions'
import Kitchens from '@/components/Home/Kitchens'
import PopularBrands from '@/components/Home/PopularBrands'
import ExpressDelivery from '@/components/Home/ExpressDelivery'
import ActiveOrderStatusBar from '@/components/ActiveOrderStatusBar'

export default function HomeScreen() {
  const scrollA = React.useRef(new Animated.Value(0)).current
  const windowWidth = Dimensions.get('window').width;

  // Memoize animations for better performance
  const animations = useMemo(() => ({
    headerHeight: scrollA.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
    headerScale: scrollA.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0.8],
      extrapolate: 'clamp',
    }),
    searchBarPosition: scrollA.interpolate({
      inputRange: [0, 100],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    })
  }), [scrollA]);

  // Memoize header animation style (only transform and opacity)
  const headerAnimStyle = useMemo(() => ({
    opacity: animations.headerHeight,
    transform: [{ scale: animations.headerScale }]
  }), [animations.headerHeight, animations.headerScale]);


  const searchBarAnimStyle = useMemo(() => ({
    transform: [
      { translateY: animations.searchBarPosition }
    ]
  }), [animations.searchBarPosition]);

  // Use native driver for better performance, but only for non-layout properties
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
    { useNativeDriver: true }
  );

  return (
    <View className='flex-1 bg-ys'>
      <Animated.View style={headerAnimStyle}>
        <HeaderComponent />
      </Animated.View>
      <View className='flex-1'>
        <Animated.View className='absolute z-10 w-full bg-ys px-3 pb-2' style={[searchBarAnimStyle]}>
          <SearchComponent />
        </Animated.View>
        <View className='flex-1'>
          <Animated.ScrollView
            className='rounded-t-3xl overflow-hidden'
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingTop: 50 }}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
          >
            <View className='rounded-t-3xl bg-white overflow-hidden'>
              <Shortcuts />
              <Filters />
              <ReOrder />
              <Promotions />
              <Kitchens />
              <PopularBrands />
              <ExpressDelivery />
            </View>
          </Animated.ScrollView>
          <ActiveOrderStatusBar />
        </View>
      </View>
    </View>
  )
}

function Shortcuts() {
  return (
    <ScrollView contentContainerClassName='gap-2' horizontal showsHorizontalScrollIndicator={false} className='flex flex-row py-4 border-b border-zinc-100'>
      {Array(7).fill(0).map((_, i) => {
        return (
          <TouchableOpacity
            key={i}
            className='p-4 flex flex-col gap-2 items-center justify-center'>
            <View className='bg-zinc-300 h-16 aspect-square rounded-full' />
            <Text className='text-black text-sm font-bold'>Index {i + 1}</Text>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

