import { rollsArray, drinksArray } from "./data.js";

const allMenuItems = [...rollsArray, ...drinksArray];
const menuRolls = document.getElementById('menu-section-rolls');
const menuDrinks = document.getElementById('menu-section-drinks');
let shoppingCart = [];

const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
if (savedCartItems) {
    shoppingCart = savedCartItems;
}

function renderMenu(arr, element) {
    const htmlString = arr.map(item => {
        return `
        <article class='menu-section-item'>
            <img src=${item.image} alt='A menu item' class='menu-item-img'>
            <div>
                <h2 class='menu-item-name'>${item.name}</h2>
                <p class='menu-item-ingredients'>${item.ingredients.join(', ')}</p>
                <p class='menu-item-price'>$${item.price}</p>
            </div>
            <button id='add-item-btn' data-itemid=${item.id}>+</button>
        </article>`
    }).join('');

    element.innerHTML = htmlString;
}

if (menuRolls) {
    renderMenu(rollsArray, menuRolls);
};

if (menuDrinks) {
    renderMenu(drinksArray, menuDrinks)
};

function handleClick(e) {
    if (e.target.dataset.itemid) {
        const targetId = e.target.dataset.itemid;
        const targetmenuItem = allMenuItems.filter(item => {
            return item.id === targetId;
        })[0];
        
        shoppingCart.push(targetmenuItem);
        localStorage.setItem('cartItems', JSON.stringify(shoppingCart));
    }
}

document.body.addEventListener('click', handleClick);


