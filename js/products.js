const API = 'https://raw.githubusercontent.com/mvagulina/part_4_javascript_level2/master/json';

const app = new Vue({
    el: '#container',
    data: {
        catalogUrl: '/catalog.json',
        products: [],
        cartUrl: '/cart.json',
        cart: [],
        showCart: false,
        imgCart: 'https://placehold.it/50x100',
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
            console.log(product.id);
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
            });
        }
        
    },
    
    mounted() {
        this.getProducts();
        this.getCart();
    }
});