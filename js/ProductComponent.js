Vue.component('products', {
    props: ['products'],
    template: `<div class="products-list">
               <div class="product" v-for="product of products" :key="product.id">
                   <img v-bind:src="'img/catalog/product-'+ product.id + '.jpg'">
                   <div>
                       <h3>{{product.name}}</h3>
                        <span>{{product.price}} $</span>
                        <button class="buy-btn" @click="addProduct(product)">Купить</button>
                   </div>
               </div>
    `
});

Vue.component('product', {
    
});