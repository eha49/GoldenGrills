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
            <div>
                <h2 class='menu-item-name'>${item.name}</h2>
                <p class='menu-item-ingredients'>${item.ingredients.join(', ')}</p>
                <p class='menu-item-price'>$${item.price}</p>
            </div>
            <div class='qty-info'>
                <button data-subbtn=${item.id} class='sub-qty-btn btn'>-</button>
                <span id='qty-field-${item.id}' class='item-qty'>1</span>
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
        const qtyEl = getElement(`qty-field-${targetId}`);
        const count = +qtyEl.textContent;
        const targetmenuItem = allMenuItems.filter(item => {
        return item.id === targetId;
        })[0];

        for (let i = 0; i < count; i++) {
            shoppingCart.push(targetmenuItem);
        };
        
        localStorage.setItem('cartItems', JSON.stringify(shoppingCart));
        displayCartLength(); 
    };

    if (e.target.dataset.addbtn) {
        const targetId = e.target.dataset.addbtn;
        handleQtyUpdation(targetId, 'add');
    };
    
    if (e.target.dataset.subbtn) {
        const targetId = e.target.dataset.subbtn;
        handleQtyUpdation(targetId, 'sub');
    };
};

function handleQtyUpdation(id, operation) {
        const qtyEl = getElement(`qty-field-${id}`);
        let count = +qtyEl.textContent;
    if (operation === 'add') {
           qtyEl.textContent = ++count; 
    }
    else if (operation === 'sub') {
         (count > 1) && (qtyEl.textContent = --count); 
    }      
};

document.body.addEventListener('click', handleClick);


// const attemp = {
//     attempt1: 'Who',
//     attempt2: 'What',
//     attempt1: 'Who',
//     attempt3: 'How'
// }

// let newArr = [];

// for (let i in attemp) {
//     newArr.push(attemp[i]);

// }
// console.log(newArr)