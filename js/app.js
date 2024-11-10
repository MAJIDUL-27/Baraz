
const totalPrice =[];

let baskets = JSON.parse(localStorage.getItem('data'))||[];

function addToCart(product, image){
    const productDetails = document.getElementById(product + "__pera").innerText;
    const count = document.getElementById(product + "__count").value;
    const countValue = parseInt(count);
    const productPrice = document.getElementById(product + "__price").innerText;
    const productObject = {
        product : product,
        productDetails : productDetails,
        productPrice : productPrice,
        countValue:countValue,
        images: image
    }
    const existingProduct = baskets.find(item => item.product === product);

    if (existingProduct) {
        existingProduct.countValue += countValue;
    } else {
        baskets.push(productObject);
    }

    localStorage.setItem('data',JSON.stringify(baskets))
    console.log(baskets);
}




function handleProductChange(product, isIncrease) {
    const productInput = document.getElementById(product + '__count');
    const productInpurValue = productInput.value
    const productCount = parseInt(productInpurValue)
    let newProductCount = productCount

    if (isIncrease == true) {
        newProductCount = productCount + 1
    }
    if (isIncrease == false && productCount > 0) {
        newProductCount = productCount - 1
    }

    productInput.value = newProductCount;



}

let newbasket = JSON.parse(localStorage.getItem('data'))||[];





function displayBasket() {
    let newbasket = JSON.parse(localStorage.getItem('data'))||[];

    const basketContainer = document.getElementById('cheak');

    if (newbasket.length === 0) {
        basketContainer.innerHTML = "<p>Your basket is empty.</p>";
        return;
    }

    basketContainer.innerHTML = "";

    
    const newarr=[];



    newbasket.forEach((item, index) => {

        const itemDiv = document.createElement('div');
        const resultOutput = item.productPrice*item.countValue;
        newarr.push(resultOutput);
        console.log(newarr);
        itemDiv.classList.add('basket-item');
        itemDiv.innerHTML = `
            <p class="text-center mt-4"><strong>Item ${index + 1}</strong></p>
            <div class="cart__page">
            <img src="../images/${item.images}.jpg" class="card-img-top img-fluid card__image" alt="card-image">
            <p class="product__name" id="${item.product}__name">Name : ${item.product}</p>
            <p class="product__price">Price: $${item.productPrice}</p>
            <p class="total__amount" id="product__total--price">${resultOutput}</p>
            <hr>
            </div>
        `;
        const newResult = newarr.reduce((acc,res)=>acc+res,0);
        const showingNumber = document.getElementById("showing__number");
        showingNumber.value = newResult
        basketContainer.appendChild(itemDiv);

        
    });

}

function cheakOut(){
    const chkOut = document.getElementById("cheakOut");
    chkOut.addEventListener("click", ()=>{
        const showingNumber = document.getElementById("showing__number");
        showingNumber.value = 0;
        alert("order SucsessFull");
        location.reload();
        localStorage.clear();
    })
}


displayBasket();
cheakOut()




