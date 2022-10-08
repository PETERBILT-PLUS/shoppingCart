let itemsSection = document.getElementById("selecting-items")
let shopInCart = JSON.parse(localStorage.getItem("data")) || []
function creat() {
    if (shopInCart.length !== 0) {
        return (itemsSection.innerHTML = shopInCart.map((obj) => {
            let { id, item, price } = obj
            return `
                <div class="item">
                    <h1>${id}</h1>
                    <button onclick="decrement(${id})">minud</button>
                    <h1 id="${id}">${item}</h1>
                    <button onclick="increment(${id})">add</button>  
                    <span id="total" class="total"><span>
                </div>
                `
        }).join(""))
    } else {
        itemsSection.innerHTML = ""
        itemsSection.innerHTML = `
        <h1 class="empty-header">Your Shopping Cart Is Empty</h1>
        <a href="index.html"><button class="empty-button">Back To Home</button></a>
        `
    }
}





let increment = (id) => {
    let cover = id
    let search = shopInCart.find((x) => x.id === cover.id)
    if (search === undefined) {
        shopInCart.push({
            id: cover.id,
            item: 1,
        })
    } else {
        search.item += 1;
    }
    upload(cover.id)
}

let decrement = (id) => {
    let cover = id
    let search = shopInCart.find((x) => x.id === cover.id)
    if (search === undefined)
        return
    else if (search.item === 0)
        return
    else {
        search.item -= 1;
    }
    shopInCart = shopInCart.filter((x) => x.item !== 0)
    if (search.item === 0) {
        creat()
    }
    else if (search.item === undefined) {
        creat()
    }
    console.log(shopInCart);
    if (shopInCart.length === 0) {
        localStorage.setItem("data", "no data")
    }
    if (shopInCart.length === 0) {
        upload()
    }
    upload(cover.id)
}
let upload = (id) => {
    let cover = id
    let search = shopInCart.find((x) => x.id === cover)
    if (search === undefined) return
    else if (shopInCart.lenghth === 0) {
        creat()
    }
    //localStorage.clear()
    localStorage.setItem("data", JSON.stringify(shopInCart))
    let b = localStorage.getItem("data")
    console.log(b);
    document.getElementById(cover).textContent = search.item
    let a = shopInCart.map((x) => x.item).reduce((x,y) => x + y, 0)
    document.getElementById("sum").textContent = a
}
window.onload = () => {
    let a = shopInCart.map((x) => x.item).reduce((x,y) => x + y, 0)
    document.getElementById("sum").textContent = a
}

creat()