// Shopping Cart JavaScript
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.fas.fa-shopping-cart');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let checkoutButton = document.querySelector('.checkOut');
let cart = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
    addCartToHTML();
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

checkoutButton.addEventListener('click', () => {
    calculateTotal();
});

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity = totalQuantity + item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            
            let productInfo = {
                name: 'Product Name',
                image: 'product_image.jpg',
                price: 50, 
            };

            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
                <div class="image">
                    <img src="${productInfo.image}">
                </div>
                <div class="name">
                    ${productInfo.name}
                </div>
                <div class="totalPrice">$${productInfo.price * item.quantity}</div>
                <div class="quantity">
                    <span>${item.quantity}</span>
                </div>
            `;
        });
    }
    
    iconCart.nextElementSibling.innerText = totalQuantity;
};

const calculateTotal = () => {
    let totalPrice = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            
            let productInfo = {
                price: 50, 
            };
            totalPrice += productInfo.price * item.quantity;
        });
    }
    alert(`Total Price: $${totalPrice}`);
};



const addToCart = (product_id, action) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);

    if (action === 'add') {
        if (positionThisProductInCart < 0) {
            cart.push({
                product_id: product_id,
                quantity: 1
            });
        } else {
            cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
        }
    } else if (action === 'remove') {
        if (positionThisProductInCart >= 0) {
            cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity - 1;

            if (cart[positionThisProductInCart].quantity <= 0) {
                
                cart.splice(positionThisProductInCart, 1);
            }
        }
    }

    addCartToHTML();
    
};
