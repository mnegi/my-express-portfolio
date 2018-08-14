var calc = {
    operator: {
        name: '',
        arguments: ''
    },
    operand1: {
        value: '',
        touched: false
    },
    operand2: {
        value: '',
        touched: false
    },
    apiUrl: 'http://calctest.iesim.biz/',
    operationUrl: '',

    numericKeyPress: function(key){
        if(this.operator.name === ''){
            // first operand
            if(!this.operand1.touched){
                this.operand1.touched = true;
                this.operand1.value = key;
            }else{
                this.operand1.value = this.operand1.value + key;
            }
            this.setDisplayValue(this.operand1.value);
        }else{
            this.setDisplayValue('0');
            // second operand
            if(!this.operand2.touched){
                this.operand2.touched = true;
                this.operand2.value = key;
            }else{
                this.operand2.value = this.operand2.value + key;
            }
            this.setDisplayValue(this.operand2.value);
        }
    },

    operatorKeyPress: function(key, name, args){
        // key.dataset.operator, key.dataset.args
        this.operator.name = name;
        this.operator.arguments = args;
        if(key) {
            this.highlightKey(key, true);
        }
        // also update operand value 1 = display value
        this.operand1.value = display.textContent;

        if(args == 0){
            this.calculate();
            Array.from(keys.children).forEach(k => k.classList.remove('is-depressed'));
        }
    },

    backspaceAction: function(){
        var text = '';
        if(this.operator.name === ''){    
            if (!this.operand1.value.includes('.')) {
                this.operand1.value = 
                    this.operand1.value.substring(0, this.operand1.value.length - 1);
                text = this.operand1.value;
            }
        }else{
            if (!this.operand2.value.includes('.')) {
                this.operand2.value = 
                    this.operand2.value.substring(0, this.operand2.value.length - 1);
                text = this.operand2.value;
            }
        }
        this.setDisplayValue( (text=='') ? '0' : text);
    },

    equalsAction: function(){
        this.calculate();
        this.reset();
        Array.from(keys.children).forEach(k => k.classList.remove('is-depressed'));
    },

    decimalAction: function(){
        if(this.operator.name === ''){
            if (!this.operand1.value.includes('.')) {
                this.operand1.value = this.operand1.value + '.';
                this.setDisplayValue(this.operand1.value);
            }
        }else{
            if (!this.operand2.value.includes('.')) {
                this.operand2.value = this.operand2.value + '.';
                this.setDisplayValue(this.operand2.value);
            }
        }
    },

    clearAction: function(){
        this.reset();
        this.setDisplayValue('0');
    },

    handleButtonClick: function(key){
        if(key && key.dataset && key.dataset.operator){
            // check if operator is clicked
            this.operatorKeyPress(key, key.dataset.operator, key.dataset.args);
        }else if(key && key.dataset && key.dataset.action){
            // check if action buttons clicked
            switch(key.dataset.action){
                case 'decimal':
                    this.decimalAction();
                    break;
                case 'clear':
                    this.clearAction();
                    break;
                case 'calculate':
                    this.equalsAction();
                    break;
                default: break;
            }
        }else{
            // numeric buttons clicked
            this.numericKeyPress(key.textContent);
        }
    },

    handleKeyPress: function(keyCode, key){
        switch(keyCode){
            case 13:
            case 71:
                // enter and =
                this.equalsAction();
                break;
            case 27:
                // esc
                this.reset();
                this.setDisplayValue('0');
                break;
            case 190:
                // . decimal
                this.decimalAction();
                break;
            case 8:
                // backspace
                this.backspaceAction();
                break;
            case 61:
                // add
                this.operatorKeyPress(keyAdd, 'add', '2');
                break;
            case 173:
                // subtract
                this.operatorKeyPress(keySubtract, 'subtract', '2');
                break;
            case 56:
                // multiply
                if(key && key== '*'){
                    this.operatorKeyPress(keyMultiply, 'multiply', '2');
                }else{
                    this.numericKeyPress(String.fromCharCode(keyCode));
                }
                break;
            case 191:
                // divide
                this.operatorKeyPress(keyDivide, 'divide', 2);
                break;
            case 54:
                // power
                if(key && key== '^'){
                    this.operatorKeyPress(keyPower, 'power', 2);
                }else{
                    this.numericKeyPress(String.fromCharCode(keyCode));
                }
                break;
            default:
                if (keyCode >= 48 && keyCode <= 57) {
                    this.numericKeyPress(String.fromCharCode(keyCode));
                }
                break;
        }
    },

    reset: function(){
        this.operator.name= '';
        this.operator.arguments= ''; 
        this.operand1.value= '';
        this.operand1.touched= false;
        this.operand2.value= '';
        this.operand2.touched= false;
        this.operationUrl ='';
        Array.from(keys.children).forEach(k => k.classList.remove('is-depressed'));
    },

    setDisplayValue: function(value){
        if(display){
           display.textContent = value;
        }
    },

    highlightKey: function(key, doHighlight){
        Array.from(keys.children).forEach(k => k.classList.remove('is-depressed'));
        if(doHighlight){
            key.classList.add('is-depressed');
        }
    },
    
    calculate: function(){
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    var data = JSON.parse(xmlhttp.responseText);
                    display.textContent = data.result;
                }
                else {
                    display.textContent = 'Error';
                }
            }
        };
        switch(this.operator.arguments){
            case '2':
                this.operationUrl = this.apiUrl + this.operator.name + '?op1=' + this.operand1.value + '&op2=' + this.operand2.value;
                break;
            case '1':
                this.operationUrl = this.apiUrl + this.operator.name + '?op1=' + this.operand2.value;
                break;
            case '0':
                this.operationUrl = this.apiUrl + this.operator.name;
                break;
            default:
                //do nothing
                break;
        }
        if(this.operationUrl !== this.apiUrl){
            xmlhttp.open("GET", this.operationUrl, true);
            xmlhttp.send();
        }
    }
};

const keys = document.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-display');
/* operator keys */
const keyAdd = document.querySelector('.key-add');
const keySubtract = document.querySelector('.key-subtract');
const keyMultiply = document.querySelector('.key-multiply');
const keyDivide = document.querySelector('.key-divide');
const keyPower = document.querySelector('.key-power');

keys.addEventListener('click', function(e){
    if (e.target.matches('button')) {
        var key = e.target;
        calc.handleButtonClick(key);
    }
});
document.body.addEventListener('keydown', function(e){
    calc.handleKeyPress(e.keyCode, e.key);
});