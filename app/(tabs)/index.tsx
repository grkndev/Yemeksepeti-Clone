import { Animated, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Filters from '@/components/Filters'
import HeaderComponent from '@/components/Home/HeaderComponent'
import SearchComponent from '@/components/Home/SearchComponent'
import ReOrder from '@/components/Home/ReOrder'
import Promotions from '@/components/Home/Promotions'
import Kitchens from '@/components/Home/Kitchens'


export default function HomeScreen() {
  const scrollA = React.useRef(new Animated.Value(0)).current

  const headerHeight = scrollA.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  })

  const headerScale = scrollA.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  })

  const searchBarPosition = scrollA.interpolate({
    inputRange: [0, 100],
    outputRange: [4, -50],
    extrapolate: 'clamp',
  })

  return (
    <View className='flex-1 bg-ys'>
      <Animated.View style={{
        opacity: headerHeight,
        transform: [{ scale: headerScale }]
      }}>
        <HeaderComponent />
      </Animated.View>
      <View className='flex-1'>
        <Animated.View
          className='absolute z-10 w-full bg-ys px-3 pb-2'
          style={{
            top: searchBarPosition,
          }}
        >
          <SearchComponent />
        </Animated.View>
        <View className='flex-1'>
          <Animated.ScrollView
            className='rounded-t-3xl overflow-hidden'
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollA } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingTop: 55 }}
          >
            <View className='rounded-t-3xl bg-white overflow-hidden'>
              <Shortcuts />
              <Filters />
              <ReOrder />
              <Promotions />
              <Kitchens />
              {/* <PopulerBrands /> */}
              {Array(30).fill(0).map((_, i) => {
                return (
                  <View key={i} className='bg-white p-4 mb-3 rounded-lg'>
                    <Text className='text-black'>Index {i + 1}</Text>
                  </View>
                )
              })}
            </View>
          </Animated.ScrollView>
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

