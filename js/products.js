const API = 'https://raw.githubusercontent.com/mvagulina/part_4_javascript_level2/master/json';

const app = new Vue({
    el: '#container',
    data: {
        catalogUrl: '/catalog.json',
        products: [],
        filter: new RegExp('', 'i')
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
            let searchField = document.getElementById('search');
            this.filter = new RegExp(searchField.value, 'i');
            this.getProducts();
        }
    },
    
    mounted() {
        this.getProducts();
    }
});