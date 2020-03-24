Vue.component('search', {
    props: ['searchId'],
    template: `
        <div>
            <input class="contact-us-input" :id="searchId" type="text"><a href="#" @click="click"><img src="img/search.png" alt="search" class="menu-search"></a>
        </div>
    `,
    methods: {
        click() {
            this.$emit('search');
        }
    }
});