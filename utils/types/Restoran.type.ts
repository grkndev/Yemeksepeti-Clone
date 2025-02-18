export type RestoranDataType = {
    name: string
    rating: number
    ratingCount: number
    price: string
    minOrder: number
    category: string
    duration: string
    delivery: number
    image: string
    discount: {
        type: string
        value: string
    }[]
    promoted: boolean
    sponsored: boolean
    express: boolean
}