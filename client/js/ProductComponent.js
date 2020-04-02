Vue.component('products', {
    data() {
        return {
            products: [],
            filter: new RegExp('', 'i')
        }
    },
    props: ['searchId'],
    template: `<div class="products-list">
                   <product :product="product" v-for="product of products" :key="product.id"></product>
               </div>`,

    methods: {
        getProducts() {
            this.$parent.getJson(`/products`)
                .then(data => {
                    this.$data.products = data.filter(el => this.filter.test(el.name));
                });
        },

        searchProducts() {
            console.log('search');
            let searchField = document.getElementById(this.searchId);
            this.filter = new RegExp(searchField.value, 'i');
            this.getProducts();
        }
    },

    mounted() {
        this.getProducts();
    }
});

Vue.component('product', {
    props: ['product'],
    template: `<div class="product">
                 <img v-bind:src="'img/catalog/product-'+ product.id + '.jpg'">
                 <div>
                   <h3>{{product.name}}</h3>
                   <span>{{product.price}} $</span>
                   <button class="buy-btn" @click="$parent.$emit('add-product', product)">Купить</button>
                 </div>
               </div>`
});