class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
    } 
    
    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }
    
    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render())
        }
    }
    
    getProductsSum() {
        let sum = 0;
        this.goods.forEach(item => sum += item.price);
        return sum;
    }
    
}


class ProductItem {
	constructor(product, img = 'https://placehold.it/200x150') {
		this.title = product.title;
		this.price = product.price;
		this.id = product.id;
		this.img = img;
		
	}
	
	render() {
		 return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
	}
}

// класс "Корзина"
class Bag {
    constructor() {
        this.items = [];
    }
    
    // добавить товар
    addItem(bagItem) {}
    // удалить товар
    deleteItem(bagItem) {}
    // очистить корзину
    clear() {}
    // купить содержимое
    buy() {}
}

// класс "Элемент корзины"
class BagItem {
    constructor(productId, amount) {
        this.productId = productId;
        this.amount = amount;
    }
    // увеличить количество на amount
    increase(amount = 1) {}
    // уменьшить количество 
    decrease() {}
    // установить количество на amount
    setAmount(amount = 1) {}
    
    render() {}
    // посмотреть описание
    view() {}
}

let list = new ProductsList();
list.render();
console.log(`sum = ${list.getProductsSum()}`);
