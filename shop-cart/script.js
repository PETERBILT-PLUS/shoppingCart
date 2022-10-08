let shopInCart = JSON.parse(localStorage.getItem("data")) || []
let itemsCart = document.getElementById("items")
function creatObjects() {
    return (itemsCart.innerHTML = objects.map((obj) => {
        let { name, price, id, img } = obj
        let inStock = shopInCart.find((x) => x.id === id) || []
        return `
            <div class="product" id="">
            <img src="${img}" width="200px" height="180px" class="img-product"/>
                <h1>${name}</h1>
                <span>${price}</span>
                <input type="button" onclick="decrement(${id}, ${price})" value="-">
                <span id="${id}" class="quantity">${inStock.item === undefined ? 0 : inStock.item}</span>
                <input type="button" onclick="increment(${id}, ${price})" value="+">
            </div>
                `
                
            }).join(""))
        }
        
        creatObjects()
        
function onLoadPage() {
    localStorage.clear();
    document.querySelectorAll(".quantity").forEach((element) => {
        element.textContent = 0
        document.getElementById("sum").textContent = 0
    })
}
let increment = (id, price) => {
    let cover = id
    let pr = price
    let search = shopInCart.find((x) => x.id === cover.id)
    if (search === undefined) {
        shopInCart.push({
            id: cover.id,
            item: 1,
            price: pr 
        })
    } else {
        search.item += 1;
    }
    //localStorage
    localStorage.setItem("data", JSON.stringify(shopInCart))
    upload(cover.id)
    shopInCart = shopInCart.filter((x) => x.item !== 0)
    console.log(shopInCart);
}

let decrement = (id) => {
    let cover = id
    let search = shopInCart.find((x) => x.id === cover.id)
    if (search === undefined) return
    else if (search.item === 0)
    return
    else {
        search.item -= 1;
    }
    upload(cover.id)
    shopInCart = shopInCart.filter((x) => x.item !== 0)
    console.log(shopInCart);
}

let upload = (idspan) => {
    let search = shopInCart.find((x) => x.id === idspan)
    document.getElementById(idspan).innerHTML = search.item
    let total = shopInCart.map((x) => x.item).reduce((x, y) => x + y, 0)
    document.getElementById("sum").textContent = total
}
window.onload = () => document.getElementById("sum").textContent = shopInCart.map((x) => x.item).reduce((x, y) => x + y, 0)
console.log(shopInCart);
console.log(JSON.parse(localStorage.getItem("data")));