Vue.component('products', {
    props: ['products'],
    template: `<div class="products-list">
                   <product :product="product" v-for="product of products" :key="product.id"></product>
               </div>`
});

Vue.component('product', {
    props: ['product'],
    template: `<div class="product">
                   <img v-bind:src="'img/catalog/product-'+ product.id + '.jpg'">
                   <div>
                       <h3>{{product.name}}</h3>
                        <span>{{product.price}} $</span>
                        <button class="buy-btn" @click="addProduct(product)">Купить</button>
                   </div>
               </div>`
});