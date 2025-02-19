export interface SelectedOptions {
  [key: string]: string[] | string;
}

export interface ProductHeaderProps {
  name: string
  description: string
  image: string
  price: number
  totalPrice: number
  discount: number
}

export interface ProductNoteProps {
  note: string
  onChangeNote: (text: string) => void
}

export interface OptionChoiceProps {
  name: string
  price: number
  isSelected: boolean
  onSelect: () => void
}

export interface Choice {
  name: string
  price: number
}

export interface OptionGroupProps {
  name: string
  required: boolean
  choices: Choice[]
  onSelect: (choice: string) => void
  isSelected: (choice: string) => boolean
}

export interface AddToCartButtonProps {
  onPress: () => void
  disabled?: boolean
  quantity: number
  onQuantityChange: (quantity: number) => void
  minQuantity?: number
  maxQuantity?: number
} 