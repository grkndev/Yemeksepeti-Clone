import { View } from 'react-native'
import React, { useState } from 'react'
import Components from './components'

export default function StoreScreen() {

    return (
        <View className='flex-1 bg-white py-2'>
            <Components.Header />
            <Components.StoreInfo />
            <Components.DeliveryTime />
            <Components.Campaigns />
            
            <View className="flex-1">
                <Components.MenuSection />
            </View>
        </View>
    )
}



