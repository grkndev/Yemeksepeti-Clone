import { View, Text } from 'react-native'
import React from 'react'
import HeaderComponent from '@/components/Home/HeaderComponent'
import SearchComponent from '@/components/Home/SearchComponent'
import Icons from '@/components/Icons'

export default function Mahalle() {
  return (
    <View className='flex-1 bg-white'>
      <View className='flex flex-col gap-1'>
        <HeaderComponent textColor='text-black' iconColor='#000' />
        <View className='px-3'>
          <SearchComponent bgColor='bg-zinc-200' placeholderText={"Mağaza, kategori veya ürün arayın"} />
        </View>
        <View className='bg-zinc-200 w-full h-[1px] mt-3' />
      </View>
      <View className='flex flex-col items-center justify-center flex-1 px-4 gap-4'>
        <View className='bg-zinc-100 p-8 rounded-2xl'>
          <Icons name={"MapPinX"} color='#FA0250' size={96} />
        </View>
        <Text className='font-bold text-3xl text-start'>Adresinize hizmet veremediğimiz için üzgünüz</Text>
        <Text>Mahallenize gelmek için çalışmalarımızı sürdürüyoruz.{"\n"}Bu esnada yakınlarınızdaki restoranlara göz atabilirsiniz.</Text>
      </View>
    </View>
  )
}