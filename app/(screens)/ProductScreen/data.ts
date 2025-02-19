const data = {
    id: "pizza-001",
    image: "http://placehold.jp/1280x720.png",
    name: "Karışık Pizza",
    price: 180,
    discount: 15,
    description: "İtalyan hamuru üzerine domates sosu, mozarella peyniri, sucuk, sosis, mantar, yeşil biber, mısır ve zeytin",
    options: [
        {
            name: "Hamur Seçimi",
            required: true,
            multiple: false,
            max_choices: 1,
            choices: [
                {
                    name: "İnce Hamur",
                    price: 0
                },
                {
                    name: "Kalın Hamur",
                    price: 0
                },
                {
                    name: "Tam Buğday",
                    price: 10
                }
            ]
        },
        {
            name: "Ekstra Malzemeler",
            required: false,
            multiple: true,
            max_choices: 5,
            choices: [
                {
                    name: "Ekstra Peynir",
                    price: 15
                },
                {
                    name: "Ekstra Sucuk",
                    price: 20
                },
                {
                    name: "Ekstra Mantar",
                    price: 10
                },
                {
                    name: "Jalapeno Biber",
                    price: 8
                },
                {
                    name: "Ananas",
                    price: 12
                }
            ]
        },
        {
            name: "Kenar Seçimi",
            required: true,
            multiple: false,
            max_choices: 1,
            choices: [
                {
                    name: "Normal Kenar",
                    price: 0
                },
                {
                    name: "Peynirli Kenar",
                    price: 25
                },
                {
                    name: "Sosisli Kenar",
                    price: 30
                }
            ]
        }
    ]
}

export default data