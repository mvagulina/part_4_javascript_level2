Vue.component('cart', {
    props: ['cart', 'visibility', 'summary'],
    template: `
        <div class="cart" v-show="visibility">
            <cart-item v-for="item of cart" :key="item.id_product" :cart-item="item">
            </cart-item>
            <div v-if="cart.length == 0" class="cart-empty">Корзина пуста</div>
            <div class="cart-summary">Итого: {{summary}}</div>
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
        <div class="cart-item">
            <div class="cart-item-left-block">
                <img class="cart-item-img" v-bind:src="'img/catalog/product-' + cartItem.id + '.jpg'">
            </div>
            <div class="">
                <h3>{{cartItem.name}}</h3>
                <div class="product-quantity">Количество: {{cartItem.quantity}}</div>
                <div class="product-single-price">Цена: {{cartItem.price}}</div>
            </div>
            <div class="cart-item-right-block">
                <button class="cart-item-delete" @click="$parent.$emit('remove', cartItem)">&times; </button>
                <div class="cart-item-sum">{{cartItem.quantity*cartItem.price}}</div>
            </div>
        </div>
    `
});