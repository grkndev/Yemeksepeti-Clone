import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import SearchComponent from '@/components/Home/SearchComponent'
import Icons from '@/components/Icons'

const historyData = ["pidem", "burger king", "döner"]
const recommenedData = ["pidem", "burger king", "döner", "dominos", "kfc", "mcdonalds", "popeyes", "tavuk dünyası", "simit sarayı", "starbucks"]
export default function Explore() {
  return (
    <View className='p-4 flex flex-col gap-4'>
      <View >
        <SearchComponent bgColor='bg-zinc-200' />
      </View>
      <View className='flex flex-col gap-3'>
        <Text className='text-lg font-bold'>En son aramalar</Text>
        <FlatList
          data={historyData}
          renderItem={({ item, index }) => <HistoryItem content={item} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerClassName='gap-2'
        />

      </View>
      <View className='flex flex-col gap-2 '>
        <Text className='font-bold text-lg'>İlginizi Çekebilecek Ürünler restoranlarda</Text>
        <View className='flex flex-row gap-2 flex-wrap'>
          {
            recommenedData.map((item, index) => <RecommendBadge key={index} title={
              item
            } />)
          }
        </View>
      </View>
    </View>
  )
}

function RecommendBadge({ title }: { title: string }) {
  return (
    <TouchableOpacity className='flex flex-row gap-4'>
      <View className='border border-zinc-300 rounded-full py-2 px-3'>
        <Text className='font-semibold text-sm'>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}
function HistoryItem({ content }: { content: string }) {
  return (
    <TouchableOpacity className='flex flex-row justify-between items-center py-2'>
      <View className='flex flex-row items-center gap-2'>
        <Icons name='History' size={20} color='#71717a' />
        <Text>{content}</Text>
      </View>
      <Icons name='X' size={20} color='#000' />
    </TouchableOpacity>
  )
}