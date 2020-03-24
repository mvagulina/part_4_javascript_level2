Vue.component('cart', {
    props: ['cart', 'img', 'visibility'],
    template: `
        <div class="cart" v-show="visibility">
            <cart-item v-for="item of cart" :key="item.id_product" :img="img" :cart-item="item">
            </cart-item>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
        <div class="cart-item">
            <div class="cart-item">
                <img :src="img">
                <div class="product-desc">
                    <div class="product-title">{{ cartItem.name }}</div>
                    <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                    <div class="product-single-price">$ {{ cartItem.price }} each</div>
                </div>
            </div>
            <div class="right-block">
                <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
                <button class="del-btn" @click="$parent.$emit('remove', cartItem)">&times;</button>
            </div>
        </div>
    `
});