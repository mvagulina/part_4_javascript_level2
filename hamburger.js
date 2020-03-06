class Hamburger {
    constructor(size=0, stuffing=0) {
        this.size = size;
        this.stuffing = stuffing;
        this.toppings = [];
        this.mayonnaise = false;
        this.fetchProperties();
    }
    
    fetchProperties() {
        this.properties = {
            small: [50, 20], 
            big: [100, 40],
            cheezeStuff: [10, 20],
            saladStuff: [20, 5],
            potatoStuff: [15, 10],
            topping: [15, 0],
            mayonnaise: [20, 5]
        };
    }
    
    addTopping(topping) { // Добавить добавку 
        this.toppings.push(topping);
    }
    
    removeTopping(toppingId) { // Убрать добавку 
        this.toppings.splice(toppingId, 1);
    }
    
    getToppings() { // Получить список добавок 
        return this.toppings;
    }
    
    addMayonnaise() {
        this.mayonnaise = true;
    }
    
    removeMayonnaise() {
        this.mayonnaise = false;
    }
    
    hasMayonnaise() {
        return this.mayonnaise;
    }
    
    getSize() { // Узнать размер гамбургера 
        return this.size;
    }
    
    getStuffing() { // Узнать начинку гамбургера 
        return this.stuffing;
    }
    
    calculateProperty(property) { // Узнать 0 - цену, 1 - калорийность
        let result = 0;
        result = (this.getSize() == 0) ? this.properties.small[property] : this.properties.big[property];
        switch (this.getStuffing()) {
            case 0:
                result += this.properties.cheezeStuff[property];
                break;
            case 1:
                result += this.properties.saladStuff[property];
                break;
            case 2:
                result += this.properties.potatoStuff[property];
                break;
        }
        result += this.getToppings().length * this.properties.topping[property];
        result += this.hasMayonnaise() ? this.properties.mayonnaise[property] : 0;
        
        return result;
    }
    
    calculatePrice() { // Узнать цену
        return this.calculateProperty(0);
    }
    
    calculateCalories() { // Узнать калорийность 
        return this.calculateProperty(1);
    }
}

let ham = new Hamburger(0, 2);
ham.addTopping('cheese');
ham.addMayonnaise();
console.log(`price = ${ham.calculatePrice()} cal = ${ham.calculateCalories()}`)