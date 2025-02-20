import { View } from 'react-native'
import React, { useState } from 'react'
import Components from './components'
import Skeleton from '@/components/Skeleton'

export default function StoreScreen() {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <View className='flex-1 bg-white py-2'>
            <Components.Header />
            <Components.StoreInfo />
            <Components.DeliveryTime />
            <Components.Campaigns />
            {isLoading && (
                <View className="flex-1">
                    <Skeleton />
                </View>
            )}
            <View style={{ display: isLoading ? 'none' : 'flex' }} className="flex-1">
                <Components.MenuSection onLoadComplete={() => setIsLoading(false)} />
            </View>
        </View>
    )
}



