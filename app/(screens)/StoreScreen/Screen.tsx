import { View } from 'react-native'
import React from 'react'
import { Campaigns, DeliveryTime, Header, StoreInfo, MenuSection } from './components'


export default function StoreScreen() {
    return (
        <View className='flex-1 bg-white py-2'>
            <Header />
            <StoreInfo />
            <DeliveryTime />
            <Campaigns />
            <MenuSection />
        </View>
    )
}



