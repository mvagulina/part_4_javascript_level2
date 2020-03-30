Vue.component('products', {
    data() {
        return {
            
        }
    },
    props: ['products'],
    template: `<div class="products-list">
                   <product :product="product" v-for="product of products" :key="product.id"></product>
               </div>`,
    methods: {
        getProducts() {
            this.products.length = 0;
            this.$parent.getJson(`/products`)
                .then(data => {
                    for(let el of data) {
                        if (this.filter.test(el.name)) {
                            this.products.push(el);
                        }
                    }
                });
        }
    },
    mounted() {}
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