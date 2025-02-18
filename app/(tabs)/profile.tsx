import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Icons from '@/components/Icons'

export default function Profile() {
  return (
    <ScrollView contentContainerClassName='flex flex-col gap-4'>
      <View className='flex flex-row items-center justify-between p-4 border-b border-zinc-200'>
        <Text className='font-semibold text-lg'>Profile</Text>
        <Icons name='Settings' size={24} color='#000' />
      </View>
      <View className='flex flex-col gap-4 px-4'>
        <View className='flex flex-col'>
          <Text className='font-bold text-3xl'>Gürkan</Text>
          <Text className='font-bold'>Hesabım</Text>
        </View>

        <View className='w-full flex flex-row gap-2 items-center justify-between'>
          <Button />
          <Button />
          <Button />
        </View>
        <View>
          <TouchableOpacity
            className='bg-white flex flex-row gap-2 px-5 py-4 rounded-2xl items-center justify-between border-[1.5px] border-zinc-300'
          >
            <View className='flex flex-row items-center gap-2'>
              <Icons name='Wallet' size={24} color='#52525b' />
              <Text className='text-zinc-700 font-medium'>Cüzdan</Text>
            </View>
            <Text className='font-bold'>0,00 TL</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className='p-4 bg-white gap-4 '>

        <Text className='font-bold text-xl'>Fırsatlar</Text>

        <View className='flex flex-col gap-4'>
          <TouchableOpacity className='flex flex-row justify-between py-3 items-center'>
            <View className='flex flex-row items-center gap-4'>
              <Icons name='PartyPopper' size={24} color='#FA0250' />
              <Text className='text-zinc-700 font-medium'>YeClub</Text>
            </View>
            <Icons name='ChevronRight' size={16} color='#52525b' />
          </TouchableOpacity>

          <TouchableOpacity className='flex flex-row justify-between py-3 items-center'>
            <View className='flex flex-row items-center gap-4'>
              <Icons name='Ticket' size={24} color='#52525b' />
              <Text className='text-zinc-700 font-medium'>Kuponlarım</Text>
            </View>
            <Icons name='ChevronRight' size={16} color='#52525b' />
          </TouchableOpacity>

          <TouchableOpacity className='flex flex-row justify-between py-3 items-center'>
            <View className='flex flex-row items-center gap-4'>
              <Icons name='Gift' size={24} color='#52525b' />
              <Text className='text-zinc-700 font-medium'>Arkadaşını Davet Et</Text>
            </View>
            <Icons name='ChevronRight' size={16} color='#52525b' />
          </TouchableOpacity>

        </View>

        <Text className='font-bold text-xl'>Daha Fazla</Text>

        <View className='flex flex-col gap-4'>

          <TouchableOpacity className='flex flex-row justify-between py-3 items-center'>
            <View className='flex flex-row items-center gap-4'>
              <Icons name='CircleHelp' size={24} color='#52525b' />
              <Text className='text-zinc-700 font-medium'>Yardım Merkezi</Text>
            </View>
            <Icons name='ChevronRight' size={16} color='#52525b' />
          </TouchableOpacity>

          <TouchableOpacity className='flex flex-row justify-between py-3 items-center'>
            <View className='flex flex-row items-center gap-4'>
              <Icons name='ScrollText' size={24} color='#52525b' />
              <Text className='text-zinc-700 font-medium'>Kullanım Koşulları ve Veri Politikası</Text>
            </View>
            <Icons name='ChevronRight' size={16} color='#52525b' />
          </TouchableOpacity>

        </View>


        <TouchableOpacity className='mt-4 border-[1.5px] border-zinc-600 rounded-xl py-3'>
          <Text className='font-bold text-xl text-center text-zinc-600'>Çıkış Yap</Text>
        </TouchableOpacity>
        <Text className='font-meidum text-sm text-center'>Version 1.0.0</Text>
      </View>


    </ScrollView>
  )
}

function Button() {
  return (
    <TouchableOpacity
      className='bg-white flex flex-col gap-2 px-5 py-4 rounded-2xl items-center justify-center border-[1.5px] border-zinc-300'
    >
      <Icons name='ReceiptText' size={24} color='#52525b' />
      <Text className='text-zinc-700 font-medium'>Siparişlerim</Text>
    </TouchableOpacity>
  )
}