// Login / SignUp Functions
function loginValidation() {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(username && password){
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", username)
        window.location.href = "/homepage.html";
    }
    else{
        alert("Please enter valid credentials.");
    }
}


function signUpValidation() {
    event.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(fullname && email && password){
        localStorage.setItem("loggedIn", "true");
        window.location.href = "login.html";
    }
    else{
        alert("Please enter valid credentials.");
    }
}

//User Greeting
window.addEventListener("DOMContentLoaded", () => {
    const userLoggedIn = localStorage.getItem("loggedIn") === "true";
    const loggedUsername = localStorage.getItem("username");

    const profileIcon = document.getElementById("profileIcon");
    const userGreeting = document.getElementById("userGreeting");

    if (userLoggedIn && loggedUsername) {
        profileIcon.style.display = "none";
        userGreeting.innerText = `Welcome, ${userLoggedIn}`;
        userGreeting.style.display = "inline-block";
    }
});

//Profile Dropdown Fuctions
function toggleProfileDropdown(){
    document.querySelector('.profileContent').classList.toggle('show')
}

//Cart Dropdown
function toggleCartDropdown(){
    document.querySelector('.cartContent').classList.toggle('show')
}

const cartItems = {};
const cartItemsContainer = document.querySelector('.cartItems');
const cartCount = document.querySelector('.cartCount');
const cartTotal = document.querySelector('.cartTotalPrice');

document.querySelectorAll('.cardSidebar .cardAction').forEach((button, index) => {
    if (index == 0) {
        button.addEventListener('click', () => {
            const itemCard = button.closest('.catalogItem');
            const itemName = itemCard.querySelector('.productTitle').innerText;;
            const itemPrice = parseFloat(itemCard.querySelector('.productPrice').innerText.replace('$', ''));
            const itemImage = itemCard.querySelector('.productImage').src;

            if (cartItems[itemName]) {
                cartItems[itemName].quantity += 1;
            } else {
                cartItems[itemName] = {
                    image: itemImage,
                    price: itemPrice,
                    quantity: 1
                };
            }

            renderCart();
            showCartAlert();
        });
    }
});

function renderCart(){
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;
    let totalCount = 0;

    Object.entries(cartItems).forEach(([title, info]) => {
        const itemElement = document.createElement('li');
        itemElement.className = 'cartItem';
        itemElement.innerHTML = `
            <div class="cartItemImage">
                <img src="${info.image}" alt="${title}">
            </div>
            <div class="cartItemDetails">
                <h4>${title}</h4>
                <p>$${info.price.toFixed(2)}</p>
            </div>
            <div class="cartItemControls">
                <input type="number" min="1" value="${info.quantity}" data-title="${title}" class="cartQuantityInput"/>
                <button class="removeItem data-title="${title}"> X </button>
            </div>
        `;

        cartItemsContainer.appendChild(itemElement);
        totalPrice += info.price * info.quantity;
        totalCount += info.quantity;
    });

    cartTotal.innerText = totalPrice.toFixed(2);
    cartCount.innerText = totalCount;

    //Quantity Updates and Removals
    document.querySelectorAll('.cartQuantityInput').forEach(input => input.addEventListener('change', (e) => {
            const title = e.target.dataset.title;
            const newQuantity = parseInt(e.target.value);

            if (newQuantity > 0) {
                cartItems[title].quantity = newQuantity;
                renderCart();
            }
        })
    );

    document.querySelectorAll('.removeItem').forEach(button => 
        button.addEventListener('click', (e) => {
            const title = e.target.dataset.title;
            delete cartItems[title];
            renderCart();
        })
    );
}

// let cart = [];

// document.querySelectorAll('.addToCartButton').forEach(button => {
//     button.addEventListener('click', () => {
//         const itemCard = button.closest('.catalogItem');
//         const name = itemCard.querySelector('.productTitle')?.textContent || 'Unnamed Product';
//         const rawPrice = itemCard.querySelector('.productPrice')?.textContent || '$0';
//         const price = parseFloat(rawPrice.replace(/[^0-9.]/g, '')) || 0;
//         const image = itemCard.querySelector('.productImage')?.src || '';

//         addToCart(name, price, image);
//     });
// });

// function addToCart(name, price, image){
//     const exists = cart.find(item => item.name == name);
//     if(exists){exists.quantity++;}
//     else{cart.push({name, price, image, quantity: 1});}

//     updateCart();
//     showCartAlert(`${name} added to cart!`);

//     console.log('Adding to cart:', name, price);
// }

// function updateCart(){
//     const cartItems = document.querySelector('.cartItems');
//     const cartTotal = document.querySelector('.cartTotalPrice');
//     const cartCount = document.querySelector('.cartCount');

//     cartItems.innerHTML = '';
//     let total = 0;
//     let count = 0;

//     cart.forEach((item, index) => {
//         total += item.price * item.quantity;
//         count += item.quantity;

//         const li = document.createElement('li');
//         li.innerHTML = `
//             <div class="cartItem">
//                 <img src="${item.image}" alt="${item.name}" class="cartItemImage" />
//                 <div class="cartItemDetails">
//                     <span class="cartItemTitle">${item.name}</span>
//                     <span class="cartItemPrice">$${item.price.toFixed(2)}</span>
//                     <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)" />
//                     <button onclick="removeItem(${index})" class="removeItemBtn">✕</button>
//                 </div>
//             </div>
//             `;

//         cartItems.appendChild(li);
//     });

//     cartTotal.textContent = total.toFixed(2);
//     cartCount.textContent = count;
// }

// function updateQuantity(index, value){
//     cart[index].quantity = parseInt(value);
//     updateCart();
// }

// function removeItem(index){
//     cart.splice(index, 1);
//     updateCart();
// }

function checkout(){
    alert('Proceeding to checkout...');
}

function clearCart(){
    cart = [];
    updateCart();
}

function showCartAlert(message = 'Added To Cart!'){
    const alert = document.getElementById('cartAlert');
    alert.textContent = message;
    alert.classList.add('show');
    setTimeout(() => {
        alert.classList.remove('show');
    }, 2500);
}

//Shop Now -> Catalog
function toCatalog(){
    window.location.href = "/catalog.html";
}

//Catalog
const filterButtons = document.querySelectorAll('.filterButton');
const catalogItems = document.querySelectorAll('.catalogItem');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Updates active state
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.dataset.category;

    // Filter items by category
    catalogItems.forEach(item => {
      const match = category === 'all' || item.dataset.category === category;
      item.classList.toggle('hidden', !match);
    });
  });
});

//Catalog Item Star Rating Interactivity
document.querySelectorAll('.catalogItem').forEach(item => {
  const stars = item.querySelectorAll('.star');
  let selected = 0;

  stars.forEach((star, index) => {
    star.addEventListener('mouseover', () => {
      stars.forEach((s, j) => s.classList.toggle('hovered', j <= index));
    });

    star.addEventListener('mouseout', () => {
      stars.forEach((s, j) => {
        s.classList.remove('hovered');
        s.classList.toggle('selected', j < selected);
      });
    });

    star.addEventListener('click', () => {
      selected = index + 1;
      stars.forEach((s, j) => s.classList.toggle('selected', j < selected));
      console.log(`Rated ${selected} stars`);
    });
  });
});


//Add Item to Cart from Product Card
document.querySelectorAll('.addToCartButton').forEach(button => {
    button.addEventListener('click', () => {
        const itemCard = button.closest('.catalogItem');
        const product = {
            name: itemCard.querySelector('.productTitle').textContent, 
            price: parseFloat(itemCard.querySelector('.productPrice').textContent.replace('$', '')),
            image: itemCard.querySelector('.productImage').src
        };
        addToCart(product);
    });
});