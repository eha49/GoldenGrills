// Resources already defined in previous module

import { shoppingCart } from "./index.js";
import { displayCartLength } from "./index.js";

// DOM Elements specific to Cart Page

const shoppingCartBody = document.getElementById('shopping-cart-body');
const cartMainSection = document.getElementById('cart-main-section');
const paymentModal = document.getElementById('payment-info-modal');

// Function logic to find how many times a particular item is in the cart...as the app allows an item to be added to cart repeatedly

function countItemsInCart(obj) {
        shoppingCart.forEach((item) => {
            if (obj[item.name]) {         // Looping over the ShoppingCart 
                obj[item.name] += 1;     // array to get an object with 
            }                            // keys as item names and values 
            else { obj[item.name] = 1 }  // equal to the no. of times this
        });                              // item exists in the ShoppingCart
};

// Function logic to strip the Shopping Cart array down to unique item objects

function removeDuplicatesInCart(arr) {       // First creating an object 
    const cartObject = {};                   //with keys as item name and 
    for (let item of shoppingCart) {         //value as the entire item of
        const cartObjectKey = item.name;     //array. Then using for-in 
        cartObject[cartObjectKey] = item;    //loop to weed out the common
    }                                        //keyed values...

    for (let item in cartObject) {
        arr.push(cartObject[item]);
    }
};

// Rendering logic which uses above defined function to display information regarding the purchases

function renderShoppingCart() {
    if (shoppingCart.length) {

        const itemFrequency = {};
        const filteredCart = [];

        countItemsInCart(itemFrequency);
        removeDuplicatesInCart(filteredCart);      //Rendering according to
                                                      //the filtered array
        let htmlString = filteredCart.map(item => {
            return `
            <article class='menu-section-item cart-section-item'>
                 <img src=${item.image} alt='A menu item' class='menu-item-img cart-item-img'>
                 <div class='menu-item-info cart-item-info'>
                    <h2 class='menu-item-name cart-item-name'>${item.name}</h2>
                    <p class='menu-item-price cart-item-price'>$${item.price}
                        <span class='qty-bought'>x ${itemFrequency[item.name]}</span>
                    </p>
                    
                 </div>
                 <div class='qty-info'>
                    <button data-subbtn=${item.id} class='sub-qty-btn btn'>-</button>
                    <button data-addbtn=${item.id} class='add-qty-btn btn'>+</button>
                </div>
                <button data-removebtn=${item.id} class='remove-btn'>Remove</button>
                <span class='total-price-per-item'}'>$${(item.price) * itemFrequency[item.name]}</span>
            </article>
            `
        }).join('');                   // Using the data-* attribute in tags is the key to 
                                        // using minimum event listeners..can branch the logic inside event handler function
          htmlString += `               
            <div class='total-cart-price'>
                <p class='price-title'>Total Price:</p>
                <p class='price-amount'>$${calTotalCartPrice(itemFrequency, filteredCart)}</p>
            </div>
            <button class='submit-order-btn' data-comporder='order'>Complete Order</button>
            `
 
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
        shoppingCart.splice((shoppingCart.indexOf(targetmenuItem)), 0, targetmenuItem);
    }                                                                                      
    else if (e.target.dataset.subbtn) {                
        const targetId = e.target.dataset.subbtn;       
        removeCartItem(targetId, 'subbtn');            //Event handler to update the
    }                                                  //cart using splice()
    else if (e.target.dataset.removebtn) {
        const targetId = e.target.dataset.removebtn;
        removeCartItem(targetId, 'removebtn');
    };
        localStorage.setItem('cartItems', JSON.stringify(shoppingCart));
        renderShoppingCart();                                
        displayCartLength();  
};                                                           
                                                            //Function to remove elements..
function removeCartItem(id, btn) {                         //Using a for loop to completely
    const sameItemsArray = shoppingCart.filter(item => {  //remove the item...again using
        return item.id === id;                             //splice()
    });
    if (sameItemsArray.length) {
        if (btn === 'subbtn') {
            shoppingCart.splice((shoppingCart.indexOf(sameItemsArray[0])), 1);
        }
        else if (btn === 'removebtn') {
            for (let i = 0; i < sameItemsArray.length; i++) {
                  shoppingCart.splice((shoppingCart.indexOf(sameItemsArray[0])), 1);
            };                                   // Have to render everytime cart is
        };                                     //updated
    };
};                                                       

function calTotalCartPrice(obj, arr) {
    let totalPrice = 0;
    arr.forEach(item => {
        totalPrice += (item.price * obj[item.name]);
    })
    return totalPrice;
};

function handleOrder(e) {                                        
    if (e.target.dataset.comporder) {                                
        paymentModal.style.display = 'block';                      
        document.body.removeEventListener('click', handleClick);
    };

    if (e.target.dataset.closemodal) {
        document.getElementById('payment-form').reset();
        paymentModal.style.display = '';
        document.body.addEventListener('click', handleClick);
    };
 
};

function handlePayment(e) {
    e.preventDefault();
    if (e.target.id === 'payment-form') {
        const htmlString = `                          
        <div class='final-modal-msg'>
            <p>Thanks!</p>
            <p>Your order is on its way</p>
       </div>
       `
        paymentModal.innerHTML = htmlString;                      
        localStorage.clear();                                
        shoppingCart.length = 0;                               
        displayCartLength();

        setTimeout(() => {
            paymentModal.style.display = '';
            renderShoppingCart();
            }, 2000); 
    };
};

renderShoppingCart();

document.body.addEventListener('click', handleClick);
cartMainSection.addEventListener('click', handleOrder);
cartMainSection.addEventListener('submit', handlePayment);

