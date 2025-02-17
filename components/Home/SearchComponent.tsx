import { View, TextInput } from 'react-native'
import React from 'react'
import Icons from '../Icons'

export default function SearchComponent() {
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

