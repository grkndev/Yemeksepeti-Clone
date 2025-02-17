import { View, Text } from 'react-native'
import React from 'react'

export default function Badge({ children, varriant = "default" }: { children: React.ReactNode, varriant?: "default" | "promoted" | "sponsored" }) {

    const bgColor = varriant === "promoted" ? "bg-black/25 text-black" : varriant === "sponsored" ? "bg-white" : "bg-red-500";

    return (
        <View className={` text-white px-2 py-1 rounded-full ${bgColor}`}>
            <Text className='text-white text-xs'>{children}</Text>
        </View>
    )
}
