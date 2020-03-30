class Validator {
    constructor(formName) {
        this.form = document.getElementById(formName);
        this.patterns = {
            name: /^[a-zа-яё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
        };
        this.errorMessages = {
            name: 'Имя должно содержать только буквы',
            phone: 'Телефон должен иметь вид +7(000)000-0000',
            email: 'E-mail должен иметь вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
        };
        this.valid = true;
        this.errorClass = 'invalid-field';
        this._validate();
    }
    
    _validate() {
        let errors = this.form.querySelectorAll('.error');
        for (let error of errors) {
            error.remove();
        }
        
        let fields = [...this.form.getElementsByTagName('input')];
        for (let field of fields) {
            this._validateField(field);
        }
        this.valid = this.form.getElementsByClassName(this.errorClass).length == 0;
    }
    
    _isFieldValid(field) {
        if (this.patterns[field.name] && field.value) {
            return this.patterns[field.name].test(field.value);
        } else {
            return true;
        }
    }
    
    _validateField(field) {
        if (!this._isFieldValid(field)) {
            field.classList.add(this.errorClass);
            let errorMsg = `<div class="error">${this.errorMessages[field.name]}</div>`;
            field.insertAdjacentHTML('afterend', errorMsg);
        } else {
            field.classList.remove(this.errorClass);
        }
    }
}