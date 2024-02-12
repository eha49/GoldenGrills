import { shoppingCart } from "./index.js";

const shoppingCartBody = document.getElementById('shopping-cart-body');
const itemFrequency = {};
const filteredCart = [];

function countItemsInCart() {
        shoppingCart.forEach((item) => {
            if (itemFrequency[item.name]) {
                itemFrequency[item.name] += 1;
            }
            else { itemFrequency[item.name] = 1 }
        });
};

function removeDuplicatesInCart() {
    const cartObject = {};
    for (let item of shoppingCart) {
        const cartObjectKey = item.name;
        cartObject[cartObjectKey] = item;
    }

    for (let item in cartObject) {
        filteredCart.push(cartObject[item]);
    }
};


function renderShoppingCart() {
    if (shoppingCart.length) {

        countItemsInCart();
        removeDuplicatesInCart();

        const htmlString = filteredCart.map(item => {
            return `
            <article class='menu-section-item'>
                 <img src=${item.image} alt='A menu item' class='menu-item-img'>
                 <div class='menu-item-info'>
                    <h2 class='menu-item-name'>${item.name}</h2>
                    <p class='menu-item-price'>$${item.price}</p>
                 </div>
                 <div class='qty-info'>
                    <button data-subbtn=${item.id} class='sub-qty-btn btn'>-</button>
                    <span id='qty-field-${item.id}' class='item-qty'>${itemFrequency[item.name]}</span>
                    <button data-addbtn=${item.id} class='add-qty-btn btn'>+</button>
                </div>
                <button id='rmv-${item.id}' class='remove-btn'>Remove</button>
                <span class='total-price-per-item'>$${(item.price) * itemFrequency[item.name]}</span>
            </article>
            `
        }).join('');

        shoppingCartBody.innerHTML = htmlString;
    }
    else {
        const htmlString = `
        <section class='empty-cart-msg'>
            <h2 class='cart-heading'>Cart is empty!</h2>
            <p class='cart-subheading'>Let's go munching</p>
        </section>
        `
        shoppingCartBody.innerHTML = htmlString;
    };
};

renderShoppingCart();
