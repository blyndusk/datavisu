const data = [];

function rdmInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export const generateData = () => {
    const years = rdmInt(1, 5)
    for (let i = 0; i < years; i++) {
        data.push({
            "year": rdmInt(1950, 2019),
            "prizeList": []
        })
    }
    for (let i = 0; i < data.length; i++) {
        const prizeListInt = rdmInt(0, 6);
        for (let k = 0; k < prizeListInt; k++) {
            data[i].prizeList.push([])
        }
    }
    for (let i = 0; i < data.length; i++) {
        const item = data[i].prizeList
        for (let j = 0; j < item.length; j++) {
            const item2 = item[j];
            for (let k = 0; k < rdmInt(0, 5); k++) {
                item2.push({
                    "name":"jan",
                    "bio":"i'm a bio",
                    "data": {
                        "field": j,
                        "country": "FR",
                        "gender": Math.round(Math.random()),
                        "age": rdmInt(22, 70)
                    }
                })
            }
        }
    }
    return JSON.stringify(data)
}