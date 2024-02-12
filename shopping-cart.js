import { shoppingCart } from "./index.js";

const itemFrequency = {};
const filteredCart = [];

function renderShoppingCart() {
    if (shoppingCart) {
        shoppingCart.forEach((item) => {
            if (itemFrequency[item.name]) {
                itemFrequency[item.name] += 1;
            }
            else { itemFrequency[item.name] = 1 }
        });
    };
};

function filterCart() {
    const cartObject = {};
    for (let item of shoppingCart) {
        const cartObjectKey = item.name;
        cartObject[cartObjectKey] = item;
    }

    for (let item in cartObject) {
        filteredCart.push(cartObject[item]);
    }
};




