export interface Category {
    id: string;
    name: string;
}
export interface MenuItem {
    id: string;
    categoryId: string;
    name: string;
    description: string;
    price: number;
    image?: string;
}
export const CATEGORIES: Category[] = [
    { id: '1', name: 'Başlangıçlar' },
    { id: '3', name: 'Pizzalar' },
    { id: '4', name: 'Burgerler' },
    { id: '5', name: 'İçecekler' },
    { id: '6', name: 'Tatlılar' },
];
export const MENU_ITEMS: MenuItem[] = [
    { id: '1', categoryId: '1', name: 'Mercimek Çorbası', description: 'Geleneksel lezzet', price: 45, image: 'http://placehold.jp/200x200.png' },
    { id: '2', categoryId: '1', name: 'Karışık Salata', description: 'Mevsim yeşillikleri', price: 55, image: 'http://placehold.jp/200x200.png' },
    { id: '5', categoryId: '3', name: 'Margarita', description: 'Mozarella peyniri', price: 95, image: 'http://placehold.jp/200x200.png' },
    { id: '6', categoryId: '3', name: 'Karışık Pizza', description: 'Özel malzemeler', price: 125, image: 'http://placehold.jp/200x200.png' },
    { id: '7', categoryId: '4', name: 'Klasik Burger', description: 'Dana eti', price: 110, image: 'http://placehold.jp/200x200.png' },
    { id: '8', categoryId: '4', name: 'Cheese Burger', description: 'Cheddar peynirli', price: 120, image: 'http://placehold.jp/200x200.png' },
    { id: '9', categoryId: '5', name: 'Kola', description: '330ml', price: 25, image: 'http://placehold.jp/200x200.png' },
    { id: '10', categoryId: '5', name: 'Ayran', description: '250ml', price: 20, image: 'http://placehold.jp/200x200.png' },
    { id: '11', categoryId: '6', name: 'Künefe', description: 'Antep fıstıklı', price: 75, image: 'http://placehold.jp/200x200.png' },
    { id: '12', categoryId: '6', name: 'Sütlaç', description: 'Ev yapımı', price: 45, image: 'http://placehold.jp/200x200.png' },
];