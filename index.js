// Data for the app

import { rollsArray, drinksArray } from "./data.js";
const allMenuItems = [...rollsArray, ...drinksArray];

// Utility function

function getElement(id) {
    return document.getElementById(id);
}

// DOM Elements

const menuRolls = getElement('menu-section-rolls');
const menuDrinks = getElement('menu-section-drinks');
const cartQty = getElement('cart-items-qty'); // UI to display the no. of cart items

let shoppingCart = [];

// Page Rendering function Calls - first checks the page which is currently active

if (menuRolls) {
    renderMenu(rollsArray, menuRolls);
};

if (menuDrinks) {
    renderMenu(drinksArray, menuDrinks);
};

// Logic to fetch data from localStorage, if it exists...

const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
if (savedCartItems) {
    shoppingCart = savedCartItems;
};

// Function to display the number of items in cart

function displayCartLength() {
    if (shoppingCart.length) {
        cartQty.style.display = 'inline-block';
        cartQty.textContent = shoppingCart.length;
    }
    else { cartQty.style.display = '' };
};
 
displayCartLength();

// Page Rendering function Logic

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

// Event-handler function which only works if a particular element is clicked

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


export { shoppingCart, displayCartLength, getElement };


