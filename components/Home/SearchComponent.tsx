import { View, TextInput } from 'react-native'
import React from 'react'
import Icons from '../Icons'

export default function SearchComponent({
    textColor = 'text-white',
    iconColor = '#8d8b8e',
    bgColor = 'bg-white',
    placeholderText = 'Restoran veya mağaza arayın'
}) {
    const [search, setSearch] = React.useState('')
    return (
        <View className={`${bgColor} flex flex-row gap-2 items-center rounded-full px-3`}>
            <Icons name='Search' color={iconColor} />
            <TextInput value={
                search
            } onChangeText={
                setSearch
            } placeholder={placeholderText} placeholderTextColor={"#8d8b8e"} className='text-black h-12 w-full' />
        </View>
    )
}

