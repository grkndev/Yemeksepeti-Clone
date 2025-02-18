import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useCallback, useRef } from 'react'
import Icons from './Icons'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import CustomBackdrop from './CutomBackdrop';


const FiltersData = ['Sıralama', 'Mutfak', 'Min. Sepet Tutarı', 'Süper restoran', 'Ödeme Şekli']
export default function Filters() {

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);



    return (
        <View className='px-4'>
            <ScrollView
                horizontal
                contentContainerClassName='gap-2'
                showsHorizontalScrollIndicator={false}
                className='flex flex-row py-4 '>

                <TouchableOpacity
                    className='border border-zinc-300 rounded-full py-1.5 px-4 flex flex-row gap-1 items-center justify-center'>
                    <Icons name='SlidersHorizontal' size={20} color='#000' />
                </TouchableOpacity>

                {
                    FiltersData.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={`item#${index}`}
                                onPress={handlePresentModalPress}
                                className='border border-zinc-300 rounded-full py-1.5 px-4 flex flex-row gap-1 items-center justify-center'>
                                <Text className='font-bold text-sm'>{item}</Text>
                                <Icons name='ChevronDown' size={20} color='#000' />
                            </TouchableOpacity>
                        )
                    })
                }


                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    backdropComponent={props => (<BottomSheetBackdrop {...props}
                        opacity={0.5}
                        enableTouchThrough={false}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                        style={[{ backgroundColor: 'rgba(0, 0, 0, 1)' }, StyleSheet.absoluteFillObject]} />)}


                >
                    <BottomSheetView className='flex flex-col gap-4'>
                        <Text className='font-bold text-xl mx-4'>Sıralama</Text>
                        <View className='flex flex-col gap-4 p-4 border-b border-zinc-300 pb-4'>
                            <TouchableOpacity className='py-2 flex flex-row gap-2 items-center justify-between'>
                                <Text className='font-bold text-lg'>Önerilen (Varsayılan)</Text>
                                <View className='bg-zinc-900 w-6 h-6 rounded-full flex items-center justify-center'>
                                    <View className='bg-white w-2 h-2 rounded-full' />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity className='py-2 flex flex-row gap-2 items-center justify-between'>
                                <Text className=' text-lg'>Teslimat Süresi</Text>
                                <View className='bg-white border border-zinc-500 w-6 h-6 rounded-full flex items-center justify-center'>
                                    {/* <View className='bg-white w-2 h-2 rounded-full' /> */}
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity className='py-2 flex flex-row gap-2 items-center justify-between'>
                                <Text className=' text-lg'>Restoran Puanı</Text>
                                <View className='bg-wihte border border-zinc-500 w-6 h-6 rounded-full flex items-center justify-center'>
                                    {/* <View className='bg-white w-2 h-2 rounded-full' /> */}
                                </View>
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity className='bg-ys py-4 rounded-lg flex items-center justify-center m-4'>
                            <Text className='text-white font-bold'>Uygula</Text>
                        </TouchableOpacity>
                    </BottomSheetView>
                </BottomSheetModal>

            </ScrollView>


        </View>
    )
}