import { View, Text, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import Icons from '../Icons'
import { cn } from '@/utils/utils'

const TabBarComponent = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        // Cleanup
        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    }, []);

    const currentRoute = state.routes[state.index].name
    return (
        <>
            {!isKeyboardVisible && (<View className='border-zinc-100 border-t bg-white flex flex-row items-center justify-center w-full h-24'>

                {/* HOME */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("index")}
                    className={`flex h-full w-1/4 items-center justify-center $`}>

                    <Icons name={"House"} color={currentRoute === 'index' ? '#FA0250' : '#a1a1aa'} />
                    <Text
                        className={
                            cn(
                                'text-xs ',
                                currentRoute === 'index' ? ' font-bold text-[#FA0250]' : 'text-zinc-400'
                            )

                        }>Yemek</Text>
                </TouchableOpacity>

                {/* MAHALLE */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("mahalle")}
                    className={`flex h-full w-1/4 items-center justify-center`}>

                    <Icons name={"Store"} color={currentRoute === 'mahalle' ? '#FA0250' : '#a1a1aa'} />
                    <Text
                        className={

                            cn(
                                'text-xs',
                                currentRoute === 'mahalle' ? ' font-bold text-[#FA0250]' : 'text-zinc-400'
                            )
                        }>Mahalle</Text>
                </TouchableOpacity>

                {/* EXPLORE */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("explore")}
                    className={
                        `flex h-full w-1/4 items-center justify-center`
                    }>
                    <Icons name={"Search"} color={currentRoute === 'explore' ? '#FA0250' : '#a1a1aa'} />

                    <Text className={
                        cn(
                            'text-xs',
                            currentRoute === 'explore' ? 'font-bold text-[#FA0250]' : 'text-zinc-400'
                        )
                    }>Arama</Text>
                </TouchableOpacity>

                {/* PROFILE */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("profile")}
                    className={` flex h-full w-1/4 items-center justify-center`}>
                    <Icons name={"UserRound"} color={currentRoute === 'profile' ? '#FA0250' : '#a1a1aa'} />
                    <Text className={
                        cn(
                            'text-xs',
                            currentRoute === 'profile' ? ' font-bold text-[#FA0250]' : 'text-zinc-400'
                        )
                    }>Hesabım</Text>
                </TouchableOpacity>

            </View>)}</>
    )
}

export default TabBarComponent