const data = [];
const rdmInt = (min, max) => Math.floor(Math.random() * (max - min) + min)

export const generateData = () => {
    const years = rdmInt(5, 10);
    let year = 1934
    // years generation
    for (let i = 0; i < years; i++) data.push({
        "year": year++,
        "prizeList": []
    });
    // categories generation
    data.map(x => {
        for (let k = 0; k < rdmInt(0, 6); k++) x.prizeList.push([]);
        return console.clear();
    })
    // price winners generation
    data.map(x => x.prizeList.map((y, j) => {
        for (let k = 0; k < rdmInt(0, 5); k++) y.push({
            "name":"jan",
            "bio":"i'm a bio",
            "data": {
                "field": j,
                "country": "FR",
                "gender": Math.round(Math.random()),
                "age": rdmInt(22, 70)
            }
        });
        return console.clear();
    }));
    return data
}