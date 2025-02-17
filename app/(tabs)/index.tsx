import { Animated, View, Text, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native'
import React from 'react'
import Icons from '@/components/Icons'

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
            <View className='p-3 rounded-t-3xl bg-white overflow-hidden'>
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

function SearchComponent() {
  const [search, setSearch] = React.useState('')
  return (
    <View className='bg-white flex flex-row gap-2 items-center rounded-full px-3'>
      <Icons name='Search' color='#8d8b8e' />
      <TextInput value={
        search
      } onChangeText={
        setSearch
      } placeholder='Restoran veya mağaza arayın' placeholderTextColor={"#8d8b8e"} className='text-black h-12 w-full' />
    </View>
  )
}

function HeaderComponent() {
  return (<View className=' flex flex-row items-center  justify-between p-3'>
    <View className='flex flex-row items-center gap-3'>
      <Icons name='MapPin' size={24} />
      <View className='flex flex-col justify-center items-start'>
        <Text className='text-white font-semibold text-lg'>Ev</Text>
        <Text className='text-white text-xs'>Yirmiikigün 91041</Text>
      </View>
    </View>
    <View className='flex flex-row items-center gap-4'>
      <TouchableOpacity className='p-2'>
        <Icons name='Heart' size={20} />
      </TouchableOpacity>
      <TouchableOpacity className='p-2'>
        <Icons name='ShoppingCart' size={20} />
      </TouchableOpacity>
    </View>
  </View>)
}