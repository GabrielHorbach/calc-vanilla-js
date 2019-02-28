(function(win, doc){

    'use strict';

    var $visor = doc.querySelector('[data-js=visor]');
    var $buttonsNumbers = doc.querySelectorAll('[data-js=buttonsNumbers]');
    var $buttonsOperations = doc.querySelectorAll('[data-js=buttonsOperations]');
    var $buttonEqual = doc.querySelector('[data-js=buttonEqual]');
    var $buttonCe = doc.querySelector('[data-js=buttonCe]');

    function initialize() {
        initEvents();
    }

    function initEvents() {
        $buttonsNumbers.forEach(function(item) {
            item.addEventListener('click', handleClickNumber, false);
        });
        
        $buttonsOperations.forEach(function(item) {
            item.addEventListener('click', handleClickOperator, false);
        });
    
        $buttonCe.addEventListener('click', handleClickCe, false);
        $buttonEqual.addEventListener('click', handleClickEqual, false);
    }    

    function reducer(accumulator, currentValue){
        var firstValue = removeOperatorIfLastChar(accumulator);
        var operator = (isLastCharOperator(accumulator)) ? returnLastChar(accumulator) : null;
        var secondValue = removeOperatorIfLastChar(currentValue);
        var lastOperator = (isLastCharOperator(currentValue)) ? returnLastChar(currentValue) : null;
    
        return checkOperatorAndCalculate(operator, firstValue, secondValue) + lastOperator;
    }

    function checkOperatorAndCalculate(operator, firstValue, secondValue) {
        switch (operator) {
            case '+':
                return (Number(firstValue) + Number(secondValue));
            
            case '-':
                return (Number(firstValue) - Number(secondValue));

            case 'x':
                return (Number(firstValue) * Number(secondValue));
            
            case '÷':
                return (Number(firstValue) / Number(secondValue));
            
            default:
                break;
        }
    }

    function removeOperatorIfLastChar(value) {
        if (isLastCharOperator(value))
            return value.slice(0, -1);
        
        return value;
    }

    function isLastCharOperator(value) {
        var operators = getOperations();

        return operators.includes(returnLastChar(value));
    }

    function returnLastChar(value) {
        return value.toString().split('').pop();
    }

    function getOperations() {
        return Array.prototype.map.call($buttonsOperations, function(button){
            return button.value;
        });
    }

    function handleClickNumber() {
        $visor.value += this.value;
    }

    function handleClickOperator() {
        $visor.value = removeOperatorIfLastChar($visor.value);
        $visor.value += this.value;
    }

    function handleClickCe() {
        $visor.value = '';
    }

    function handleClickEqual() {
        $visor.value = removeOperatorIfLastChar($visor.value);
        var regex = new RegExp('\\d+[' + getOperations().join('') + ']?', 'g');
        var values = $visor.value.match(regex);
        var result = values.reduce(reducer);

        $visor.value = result;
    }

    initialize();

})(window, document);