import names from './names';

// Возвращает значение курса 20 между 80
const getExchangeRate = () => Math.random() * 60 + 20;

// Сравненивает две цены
// Возвращает 1, если продукт подешевел, -1 - если подорожал, 0 - не изменился в цене 
const priceComparison = (firstPrice, secondPrice) => {
    if (firstPrice - secondPrice > 0) {
        return 1
    } else if (firstPrice - secondPrice < 0) {
        return -1;
    } else {
        return 0;
    }
}


// Создает массив товаров - соотносятся названия товаров и категорий из names.js и загружаемого json
export const createProducts = (previousProducts, payload) => {
    // Получаем случайный курс
    const exchangeRate = getExchangeRate();
    const products = [];
    
    payload.forEach(element => {
        let id = element["T"];
        let categoryId = element["G"];
        let name = names[categoryId]["B"][id]["N"];
        let categoryName = names[categoryId]["G"];
        // Конвертируем доллары в рубли
        let price = (element["C"] * exchangeRate).toFixed(2);
        let quantity = element["P"];
        let priceChange;

        // Если продукт уже существует, сравниваем цены
        const previousProduct = previousProducts.find(p => p.id === id);

        if (previousProduct) {
            priceChange = priceComparison(previousProduct.price, price);
        } else {
            priceChange = 0;
        }

        const product = {
            id,
            name,
            category: {
                id: categoryId,
                name: categoryName
            },
            price,
            quantity,
            priceChange
        }

        products.push(product);
        
    });

    return products;

}