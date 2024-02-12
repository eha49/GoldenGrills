import { shoppingCart } from "./index.js";
import { displayCartLength } from "./index.js";

const shoppingCartBody = document.getElementById('shopping-cart-body');


function countItemsInCart(obj) {
        shoppingCart.forEach((item) => {
            if (obj[item.name]) {
                obj[item.name] += 1;
            }
            else { obj[item.name] = 1 }
        });
};

function removeDuplicatesInCart(arr) {
    const cartObject = {};
    for (let item of shoppingCart) {
        const cartObjectKey = item.name;
        cartObject[cartObjectKey] = item;
    }

    for (let item in cartObject) {
        arr.push(cartObject[item]);
    }
};


function renderShoppingCart() {
    if (shoppingCart.length) {

        const itemFrequency = {};
        const filteredCart = [];

        countItemsInCart(itemFrequency);
        removeDuplicatesInCart(filteredCart);

        const htmlString = filteredCart.map(item => {
            return `

            <article class='menu-section-item'>
                 <img src=${item.image} alt='A menu item' class='menu-item-img'>
                 <div class='menu-item-info'>
                    <h2 class='menu-item-name'>${item.name}</h2>
                    <p class='menu-item-price'>$${item.price}
                        <span class='qty-bought'>x ${itemFrequency[item.name]}</span>
                    </p>
                    
                 </div>
                 <div class='qty-info'>
                    <button data-subbtn=${item.id} class='sub-qty-btn btn'>-</button>
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

function handleClick(e) {
    if (e.target.dataset.addbtn) {
        const targetId = e.target.dataset.addbtn;
        const targetmenuItem = shoppingCart.filter(item => {
        return item.id === targetId;
        })[0];
        shoppingCart.push(targetmenuItem);
        localStorage.setItem('cartItems', JSON.stringify(shoppingCart));
        renderShoppingCart();
        displayCartLength();
    }
}

renderShoppingCart();

document.body.addEventListener('click', handleClick);
