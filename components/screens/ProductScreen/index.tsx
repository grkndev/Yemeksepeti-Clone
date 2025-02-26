import { View, Text, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import React from 'react'
import { ProductHeaderProps, OptionChoiceProps, OptionGroupProps, AddToCartButtonProps, ProductNoteProps } from './types'
import Icons from '@/components/Icons'
import { useRouter } from 'expo-router'

const ProductHeader = ({ name, description, image, price, totalPrice, discount }: ProductHeaderProps) => {
    const router = useRouter()
    return (
        <>
            <TouchableOpacity onPress={() => router.back()} className='absolute top-4 left-4 z-10 bg-black/25 rounded-full p-2'>
                <Icons name="X" size={24} color="#fff" />
            </TouchableOpacity>
            <Image source={{ uri: image }} className="w-full aspect-video" />
            <View className="p-4">
                <Text className="text-2xl font-bold">{name}</Text>
                <View className="flex-row items-center mt-2">
                    <Text className="text-xl font-bold text-green-600">
                        {totalPrice.toFixed(2)} ₺
                    </Text>
                    {discount > 0 && (
                        <Text className="ml-2 text-sm line-through text-gray-500">
                            {price.toFixed(2)} ₺
                        </Text>
                    )}
                </View>
                <Text className="text-gray-600 mt-2">{description}</Text>
            </View>
        </>
    )
}

const ProductNote = ({ note, onChangeNote }: ProductNoteProps) => {
    const maxLength = 500;

    const handleChangeText = (text: string) => {
        if (text.length <= maxLength) {
            onChangeNote(text);
        }
    };

    return (
        <View className="p-4 bg-white">
            <Text className="text-lg font-bold mb-2">Sipariş Notu</Text>
            <View className="border border-zinc-200 rounded-lg overflow-hidden">
                <TextInput
                    value={note}
                    onChangeText={handleChangeText}
                    placeholder="Örn: Acılı olmasın, kapıyı çalmayın vb."
                    multiline
                    maxLength={maxLength}
                    numberOfLines={Platform.OS === 'ios' ? 0 : 6}
                    className="p-4 text-base"
                    style={{
                        height: 150,
                        textAlignVertical: 'top'
                    }}
                />
                <View className="px-4 pb-2 flex-row justify-end">
                    <Text className="text-xs text-zinc-500">
                        {note.length}/{maxLength}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const OptionChoice = ({ name, price, isSelected, onSelect }: OptionChoiceProps) => {
    return (
        <TouchableOpacity
            onPress={onSelect}
            className={`flex-row justify-between items-center p-3 rounded-lg mt-2
        ${isSelected && ' bg-zinc-100'}`}
        >
            <View className='flex flex-row items-center gap-2'>
                {isSelected ? (
                    <View className='h-6 w-6 p-1.5 flex-row items-center bg-zinc-800 rounded-full'>
                        <View className='w-full h-full rounded-full bg-white' />
                    </View>
                ) : (
                    <View className='h-6 w-6 p-1.5 flex-row items-center bg-white border-[1.5px] border-zinc-500 rounded-full' />
                )}
                <Text className={`text-black ${isSelected && 'font-bold'}`}>
                    {name}
                </Text>
            </View>
            {price > 0 && (
                <Text className="text-green-600">+{price.toFixed(2)} ₺</Text>
            )}
        </TouchableOpacity>
    )
}

const OptionGroup = ({ name, required, choices, onSelect, isSelected }: OptionGroupProps) => {
    return (
        <View className="mb-6">
            <View className="flex-row items-center flex justify-between">
                <Text className="text-lg font-bold">{name}</Text>
                {required && (
                    <View className='bg-zinc-100 rounded-full px-2 py-1 border border-zinc-300'>
                        <Text className="text-zinc-800 font-semibold text-xs">1 Zorunlu</Text>
                    </View>
                )}
            </View>

            <View className="mt-2">
                {choices.map((choice, index) => (
                    <OptionChoice
                        key={index}
                        name={choice.name}
                        price={choice.price}
                        isSelected={isSelected(choice.name)}
                        onSelect={() => onSelect(choice.name)}
                    />
                ))}
            </View>
        </View>
    )
}

const AddToCartButton = ({
    onPress,
    disabled,
    quantity,
    onQuantityChange,
    minQuantity = 1,
    maxQuantity = 10
}: AddToCartButtonProps) => {
    const handleDecrement = () => {
        if (quantity > minQuantity) {
            onQuantityChange(quantity - 1);
        }
    };

    const handleIncrement = () => {
        if (quantity < maxQuantity) {
            onQuantityChange(quantity + 1);
        }
    };

    return (
        <View className="flex flex-row p-4 gap-4 border-t border-gray-200 w-full justify-between">

            <View className="flex-row items-center">
                <TouchableOpacity
                    onPress={handleDecrement}
                    disabled={quantity <= minQuantity}
                    className={`w-9 h-9 rounded-full items-center justify-center border border-zinc-200
              ${quantity <= minQuantity ? 'bg-zinc-100' : 'bg-white'}`}
                >
                    <Icons name="Minus" size={20} color={quantity <= minQuantity ? '#a1a1aa' : '#27272a'} />
                </TouchableOpacity>

                <Text className="mx-4 text-xl font-semibold min-w-[20px] text-center">
                    {quantity}
                </Text>

                <TouchableOpacity
                    onPress={handleIncrement}
                    disabled={quantity >= maxQuantity}
                    className={`w-9 h-9 rounded-full items-center justify-center border border-zinc-200
              ${quantity >= maxQuantity ? 'bg-zinc-100' : 'bg-white'}`}
                >
                    <Icons name="Plus" size={20} color={quantity >= maxQuantity ? '#a1a1aa' : '#27272a'} />
                </TouchableOpacity>

            </View>

            <TouchableOpacity
                className={`flex-1  p-4 rounded-lg items-center ${disabled ? 'bg-zinc-300' : 'bg-ys'}`}
                onPress={onPress}
                disabled={disabled}
            >
                <Text className="text-white font-bold text-lg">Sepete Ekle</Text>
            </TouchableOpacity>
        </View>
    )
}

export { ProductHeader, OptionChoice, OptionGroup, AddToCartButton, ProductNote }