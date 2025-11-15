export const getIngredientRus = (ingredient: string)  => {
    switch (ingredient) {
        case "ONION":
            return "Лук"
        case "MEAT":
            return "Мясо"
        case "BIRD":
            return "Птица"
        case "FISH":
            return "Рыба"
        case "EGGS":
            return "Яйца"
        case "NUTS":
            return "Орехи"
        case "MILKY_PRODUCTS":
            return "Молочные продукты"
        case "BERRIES":
            return "Ягоды"
        case "GRASS":
            return "Зелень"
        case "SPICY":
            return "Острое"
    }
}