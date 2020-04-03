Vue.component('cart', {
    data() {
        return {
            cart: [],
            cartSummary: 0
        }
    },
    props: ['visibility'],
    template: `
        <div class="cart" v-show="visibility">
            <cart-item 
                v-for="item of cart" 
                :key="item.id_product" 
                :cart-item="item">
            </cart-item>
            <div v-if="cart.length == 0" class="cart-empty">Корзина пуста</div>
            <div class="cart-summary">Итого: {{cartSummary}}</div>
        </div>`,

    methods: {
        getCart() {
            this.$parent.getJson('/cart')
                .then(data => {
                    this.$data.cart = data.concat();
                    this.getCartSummary();
                });
        },

        getCartSummary() {
            this.$data.cartSummary = 0;
            this.$data.cart.forEach(item => this.$data.cartSummary += (item.price * item.quantity));
        },

        removeProduct(product) {
            this.$parent.deleteJson(`/cart`, product)
                .then(result => {
                    if (result.result == 1) {
                        this.$data.cart.splice(this.$data.cart.indexOf(product), 1);
                        this.getCartSummary();
                    }
                });
        },

        addProduct(product) {
            let find = this.$data.cart.find(el => el.id === product.id);
            if (find) {
                this.$parent.putJson(`/cart/${find.id}`, {quantity: 1})
                    .then(result => {
                        if (result.result == 1) {
                            find.quantity++;
                        }
                    });
            } else {
                const newCartItem = Object.assign({quantity: 1}, product);
                this.$parent.postJson('/cart', newCartItem)
                    .then(result => {
                        if (result.result == 1) {
                            this.$data.cart.push(newCartItem);
                        }
                    });
            }
            this.getCartSummary();
        }
    },

    mounted() {
        this.getCart();
    }
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
                <button class="cart-item-delete" @click="$parent.removeProduct(cartItem)">&times; </button>
                <div class="cart-item-sum">{{cartItem.quantity*cartItem.price}}</div>
            </div>
        </div>
    `
});