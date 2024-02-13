import { rollsArray, drinksArray } from "./data.js";

const allMenuItems = [...rollsArray, ...drinksArray];

function getElement(id) {
    return document.getElementById(id);
}

const menuRolls = getElement('menu-section-rolls');
const menuDrinks = getElement('menu-section-drinks');
const cartQty = getElement('cart-items-qty');
let shoppingCart = [];

if (menuRolls) {
    renderMenu(rollsArray, menuRolls);
};

if (menuDrinks) {
    renderMenu(drinksArray, menuDrinks);
};

const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
if (savedCartItems) {
    shoppingCart = savedCartItems;
};

function displayCartLength() {
    if (shoppingCart.length) {
        cartQty.style.display = 'inline-block';
        cartQty.textContent = shoppingCart.length;
    }
    else { cartQty.style.display = '' };
};
 
displayCartLength();

function renderMenu(arr, element) {
    const htmlString = arr.map(item => {
        return `
        <article class='menu-section-item'>
            <img src=${item.image} alt='A menu item' class='menu-item-img'>
            <div class='menu-item-info'>
                <h2 class='menu-item-name'>${item.name}</h2>
                <p class='menu-item-ingredients'>${item.ingredients.join(', ')}</p>
                <p class='menu-item-price'>$${item.price}</p>
            </div>
            <button class='add-item-btn btn' data-itemid=${item.id}>+</button>
        </article>`
    }).join('');

    element.innerHTML = htmlString;
};

function handleClick(e) {
    if (e.target.dataset.itemid) {
        const targetId = e.target.dataset.itemid;
        const targetmenuItem = allMenuItems.filter(item => {
        return item.id === targetId;
        })[0];

        shoppingCart.push(targetmenuItem);
        localStorage.setItem('cartItems', JSON.stringify(shoppingCart));
        displayCartLength(); 
    };

};


document.body.addEventListener('click', handleClick);


export { shoppingCart, displayCartLength };


