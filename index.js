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
    cartQty.textContent = shoppingCart.length;
};

displayCartLength();

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
            <div class='qty-info'>
                <button data-subbtn=${item.id} class='sub-qty-btn btn'>-</button>
                <span id='qty-field-${item.id}' class='item-qty'>${item.orderQty}</span>
                <button data-addbtn=${item.id} class='add-qty-btn btn'>+</button>
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

    if (e.target.dataset.addbtn) {
        const targetId = e.target.dataset.addbtn;
        const targetmenuItem = allMenuItems.filter(item => {
        return item.id === targetId;
        })[0];

        getElement(`qty-field-${targetId}`).textContent = `${++targetmenuItem.orderQty}`;
    }
};

document.body.addEventListener('click', handleClick);


