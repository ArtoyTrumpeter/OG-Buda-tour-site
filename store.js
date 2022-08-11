// The code bellow checks if all HTML content has already loaded
//In this small project it is not so important but when you have really
//great amount of content it will be useful
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

//Main function that define Events for main buttons and input counters on the page "Store"
function ready() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')

    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName("cart-quantity-input")

    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addToCartButtons = document.getElementsByClassName("shop-item-button")

    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addCartClicked)
    }

    document.getElementsByClassName("btn-purchase")[0].addEventListener('click', purchaseClicked)
}


//This function get out all items from the cart and gives a short message to user
function purchaseClicked() {
    alert("Thank you for your purchase")
    let cartItems = document.getElementsByClassName("cart-items")[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

//It is main logic for the button "remove" in cart that removes chosen item
function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

//Checks if the value of quantity input more than zero
function quantityChanged(event) {
    let input = event.target
    if ((isNaN(input.value)) || (input.value <= 0)) {
        input.value = 1
    }
    updateCartTotal()
}

//Takes atributes of the shop item when corresponding "add to cart" button clicked
function addCartClicked(event) {
    let button = event.target
    shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText
    let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText
    let imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

//Creates new HTML cart row and adds it to the page with earlier taken title, price and image 
function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName("cart-items")[0]
    let cartItemNames = cartItems.getElementsByClassName("cart-item-title")
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            alert("This item is already added to the cart")
            return
        }
    } 
    let cartRowContent = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContent
    cartItems.append(cartRow)
    //It is important to add eventListeners here cause in func Ready() events
    //are applying to only existing content
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', quantityChanged)
}

//This function is used almost all other funtions
//It updates the total price of the cart by multiplying item price and quantity of each row
function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName("cart-items")[0]
    let cartRows = cartItemContainer.getElementsByClassName("cart-row")
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName("cart-price")[0]
        let quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        let price = parseFloat(priceElement.innerText.replace("$", ""))
        let quantity = quantityElement.value
        total += price * quantity
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total
}