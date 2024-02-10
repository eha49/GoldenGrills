import { rollsArray, drinksArray } from "./data.js";

const menuRolls = document.getElementById('menu-section-rolls');
const menuDrinks = document.getElementById('menu-section-drinks');

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
            <button id='add-item-btn' class='hover'>+</button>
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

