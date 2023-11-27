let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');

let listProducts = [];
let carts = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">
                    Add To Cart
                </button>
            `;
        listProductHTML.appendChild(newProduct);
        })
    }
}
listProductHTML.addEventListener('click', (event) =>{
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0){
        carts = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('carts', JSON.stringify(carts));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity - totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
            <div class="image">
                <img src="${info.image}" alt="">
            </div>
            <div class="name">
                ${info.name}
            </div>
            <div class="totalPrice">
                $${info.price * cart.quantity}
            </div>
            <div class="quantity">
                <span class="minus"></span>
                <span>${cart.quantity}</span>
                <span class="plus"></span>
            </div>
            `;
        listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity;
}
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = carts[positionItemInCart];
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;
        
            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange;
                }else{
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    // get dat a from json
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        addDataToHTML();

        // get cart from memory
        if (localStorage.getItem('cart')) {
            carts = JSON.parse(localStorage.getItem('carts'));
            addCartToHTML();
        }
    })
}
initApp();















// let listProductHTML = document.querySelector('.listProduct');
// let listCartHTML = document.querySelector('.listCart');
// let iconCart = document.querySelector('.icon-cart');
// let iconCartSpan = document.querySelector('.icon-cart span');
// let body = document.querySelector('body');
// let closeCart = document.querySelector('.close');
// let products = [];
// let cart = [];


// iconCart.addEventListener('click', () => {
//     body.classList.toggle('showCart');
// })
// closeCart.addEventListener('click', () => {
//     body.classList.toggle('showCart');
// })

//     const addDataToHTML = () => {
//     // remove datas default from HTML

//         // add new datas
//         if(products.length > 0) // if has data
//         {
//             products.forEach(product => {
//                 let newProduct = document.createElement('div');
//                 newProduct.dataset.id = product.id;
//                 newProduct.classList.add('item');
//                 newProduct.innerHTML = 
//                 `<img src="${product.image}" alt="">
//                 <h2>${product.name}</h2>
//                 <div class="price">$${product.price}</div>
//                 <button class="addCart">Add To Cart</button>`;
//                 listProductHTML.appendChild(newProduct);
//             });
//         }
//     }
//     listProductHTML.addEventListener('click', (event) => {
//         let positionClick = event.target;
//         if(positionClick.classList.contains('addCart')){
//             let id_product = positionClick.parentElement.dataset.id;
//             addToCart(id_product);
//         }
//     })
// const addToCart = (product_id) => {
//     let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
//     if(cart.length <= 0){
//         cart = [{
//             product_id: product_id,
//             quantity: 1
//         }];
//     }else if(positionThisProductInCart < 0){
//         cart.push({
//             product_id: product_id,
//             quantity: 1
//         });
//     }else{
//         cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
//     }
//     addCartToHTML();
//     addCartToMemory();
// }
// const addCartToMemory = () => {
//     localStorage.setItem('cart', JSON.stringify(cart));
// }
// const addCartToHTML = () => {
//     listCartHTML.innerHTML = '';
//     let totalQuantity = 0;
//     if(cart.length > 0){
//         cart.forEach(item => {
//             totalQuantity = totalQuantity +  item.quantity;
//             let newItem = document.createElement('div');
//             newItem.classList.add('item');
//             newItem.dataset.id = item.product_id;

//             let positionProduct = products.findIndex((value) => value.id == item.product_id);
//             let info = products[positionProduct];
//             listCartHTML.appendChild(newItem);
//             newItem.innerHTML = `
//                 <div class="image">
//                     <img src="${info.image}">
//                 </div>
//                 <div class="name">
//                     ${info.name}
//                 </div>
//                 <div class="totalPrice">
//                     $${info.price * item.quantity}
//                 </div>
//                 <div class="quantity">
//                     <span class="minus"><</span>
//                     <span>${item.quantity}</span>
//                     <span class="plus">></span>
//                 </div>
//             `;
//         })
//     }
//     iconCartSpan.innerText = totalQuantity;
// }

// listCartHTML.addEventListener('click', (event) => {
//     let positionClick = event.target;
//     if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
//         let product_id = positionClick.parentElement.parentElement.dataset.id;
//         let type = 'minus';
//         if(positionClick.classList.contains('plus')){
//             type = 'plus';
//         }
//         changeQuantityCart(product_id, type);
//     }
// })
// const changeQuantityCart = (product_id, type) => {
//     let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
//     if(positionItemInCart >= 0){
//         let info = cart[positionItemInCart];
//         switch (type) {
//             case 'plus':
//                 cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
//                 break;
        
//             default:
//                 let changeQuantity = cart[positionItemInCart].quantity - 1;
//                 if (changeQuantity > 0) {
//                     cart[positionItemInCart].quantity = changeQuantity;
//                 }else{
//                     cart.splice(positionItemInCart, 1);
//                 }
//                 break;
//         }
//     }
//     addCartToHTML();
//     addCartToMemory();
// }

// const initApp = () => {
//     // get data product
//     fetch('products.json')
//     .then(response => response.json())
//     .then(data => {
//         products = data;
//         addDataToHTML();

//         // get data cart from memory
//         if(localStorage.getItem('cart')){
//             cart = JSON.parse(localStorage.getItem('cart'));
//             addCartToHTML();
//         }
//     })
// }
// initApp();