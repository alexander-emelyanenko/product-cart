// Извлекаем данные из источника
export const loadData = async (url) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const response = await fetch(url, {headers});
    const data = await response.json();
    return data.Value.Goods;
}
