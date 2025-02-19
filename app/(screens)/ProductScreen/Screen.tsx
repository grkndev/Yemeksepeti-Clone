import { View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as Crypto from 'expo-crypto'
import data from './data'
import { ProductHeader, OptionGroup, AddToCartButton, ProductNote } from './components'
import { SelectedOptions } from './types'
import { useStore } from '../../../store/useStore'
import { useRouter } from 'expo-router'

export default function ProductScreen() {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [totalPrice, setTotalPrice] = useState(data.price);
  const [note, setNote] = useState('');
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { addToCart } = useStore();

  // Zorunlu seçimlerin otomatik seçilmesi
  useEffect(() => {
    const defaultSelections: SelectedOptions = {};
    data.options.forEach(option => {
      if (option.required && option.choices.length > 0) {
        defaultSelections[option.name] = option.choices[0].name;
      }
    });
    setSelectedOptions(defaultSelections);
  }, []);

  const handleOptionSelect = (optionName: string, choice: string, isMultiple: boolean) => {
    setSelectedOptions(prev => {
      const newOptions = { ...prev };
      if (isMultiple) {
        const currentChoices = (prev[optionName] as string[]) || [];
        if (currentChoices.includes(choice)) {
          newOptions[optionName] = currentChoices.filter(c => c !== choice);
        } else {
          const option = data.options.find(opt => opt.name === optionName);
          if (option && currentChoices.length < option.max_choices) {
            newOptions[optionName] = [...currentChoices, choice];
          }
        }
      } else {
        newOptions[optionName] = choice;
      }
      return newOptions;
    });
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedOptions, quantity]);

  const calculateTotalPrice = () => {
    let total = data.price;

    Object.entries(selectedOptions).forEach(([optionName, selectedChoice]) => {
      const option = data.options.find(opt => opt.name === optionName);
      if (!option) return;

      if (Array.isArray(selectedChoice)) {
        selectedChoice.forEach(choice => {
          const choiceObj = option.choices.find(c => c.name === choice);
          if (choiceObj) total += choiceObj.price;
        });
      } else {
        const choiceObj = option.choices.find(c => c.name === selectedChoice);
        if (choiceObj) total += choiceObj.price;
      }
    });

    if (data.discount) {
      total = total * (1 - data.discount / 100);
    }

    total = total * quantity;
    setTotalPrice(total);
  };

  const isOptionSelected = (optionName: string, choice: string) => {
    const selected = selectedOptions[optionName];
    if (Array.isArray(selected)) {
      return selected.includes(choice);
    }
    return selected === choice;
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: Crypto.randomUUID(),
      name: data.name,
      price: data.price,
      quantity: quantity,
      totalPrice: totalPrice,
      image: data.image,
      selectedOptions: selectedOptions,
      note: note
    };
    addToCart(cartItem);
    router.back();
  };

  // Zorunlu seçimlerin kontrolü
  const areRequiredOptionsSelected = () => {
    return data.options
      .filter(option => option.required)
      .every(option => selectedOptions[option.name]);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <ProductHeader
          name={data.name}
          description={data.description}
          image={data.image}
          price={data.price}
          totalPrice={totalPrice}
          discount={data.discount}
        />

        <View className="p-4">
          {data.options.map((option, index) => (
            <OptionGroup
              key={index}
              name={option.name}
              required={option.required}
              choices={option.choices}
              onSelect={(choice) => handleOptionSelect(option.name, choice, option.multiple)}
              isSelected={(choice) => isOptionSelected(option.name, choice)}
            />
          ))}
        </View>

        <ProductNote
          note={note}
          onChangeNote={setNote}
        />
      </ScrollView>

      <AddToCartButton
        onPress={handleAddToCart}
        disabled={!areRequiredOptionsSelected()}
        quantity={quantity}
        onQuantityChange={setQuantity}
      />
    </View>
  )
}