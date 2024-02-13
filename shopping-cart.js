import { shoppingCart } from "./index.js";
import { displayCartLength } from "./index.js";

const shoppingCartBody = document.getElementById('shopping-cart-body');
const cartMainSection = document.getElementById('cart-main-section');
const paymentModal = document.getElementById('payment-info-modal');

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
        }).join('');

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
            <p class='cart-subheading'>Let's go munching</p          >
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
        localStorage.setItem('cartItems', JSON.stringify(shoppingCart));
        renderShoppingCart();
        displayCartLength();
    }
    else if (e.target.dataset.subbtn) {
        const targetId = e.target.dataset.subbtn;
        removeCartItem(targetId, 'subbtn');
    }
    else if (e.target.dataset.removebtn) {
        const targetId = e.target.dataset.removebtn;
        removeCartItem(targetId, 'removebtn');
    }
};

function removeCartItem(id, btn) {
    const sameItemsArray = shoppingCart.filter(item => {
        return item.id === id;
    });
    if (sameItemsArray.length) {
        if (btn === 'subbtn') {
            shoppingCart.splice((shoppingCart.indexOf(sameItemsArray[0])), 1);
        }
        else if (btn === 'removebtn') {
            for (let i = 0; i < sameItemsArray.length; i++) {
                  shoppingCart.splice((shoppingCart.indexOf(sameItemsArray[0])), 1);
            };
        };   
    };
    localStorage.setItem('cartItems', JSON.stringify(shoppingCart));
    renderShoppingCart();
    displayCartLength();
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
        paymentModal.style.display = '';
        document.body.addEventListener('click', handleClick);
    };
 
};

function handlePayment(e) {
    if (e.target.dataset.paybtn) {
        e.preventDefault();
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

