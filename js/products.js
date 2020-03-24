const API = 'https://raw.githubusercontent.com/mvagulina/part_4_javascript_level2/master/json';

const app = new Vue({
    el: '#container',
    data: {
        catalogUrl: '/catalog.json',
        products: [],
        cartUrl: '/cart.json',
        cart: [],
        showCart: false,
        cartSummary: 0,
        filter: new RegExp('', 'i'),
        searchId: 'search'
    },
    
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },
        
        getProducts() {
            this.products.length = 0;
            this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data) {
                    if (this.filter.test(el.name)) {
                        this.products.push(el);
                    }
                } 
            });
        },
        
        addProduct(product) {
            console.log(product);
            let find = this.cart.find(el => el.id === product.id);
            if (find) {
                find.quantity++;
            } else {
                const newCartItem = Object.assign({quantity: 1}, product);
                this.cart.push(newCartItem);
            }
            this.getCartSummary();
        },
        
        searchProducts() {
            let searchField = document.getElementById(this.searchId);
            this.filter = new RegExp(searchField.value, 'i');
            this.getProducts();
        },
        
        getCart() {
            this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let item of data) {
                    this.$data.cart.push(item);
                }
                this.getCartSummary();
            });
        },
        
        getCartSummary() {
            this.cartSummary = 0;
            this.cart.forEach(item => this.cartSummary += (item.price * item.quantity));
        },
        
        removeCartItem(product) {
            this.cart.splice(this.cart.indexOf(product), 1);
            this.getCartSummary();
        }
        
    },
    
    mounted() {
        this.getProducts();
        this.getCart();
    }
});