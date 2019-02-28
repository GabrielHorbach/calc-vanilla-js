(function(win, doc){

    'use strict';

    var $visor = doc.querySelector('[data-js=visor]');
    var $buttonsNumbers = doc.querySelectorAll('[data-js=buttonsNumbers]');
    var $buttonsOperations = doc.querySelectorAll('[data-js=buttonsOperations]');
    var $buttonEqual = doc.querySelector('[data-js=buttonEqual]');
    var $buttonCe = doc.querySelector('[data-js=buttonCe]');

    $buttonsNumbers.forEach(function(item) {
        item.addEventListener('click', handleClickNumber, false);
    });
    
    $buttonsOperations.forEach(function(item) {
        item.addEventListener('click', handleClickOperator, false);
    });

    $buttonCe.addEventListener('click', handleClickCe, false);
    $buttonEqual.addEventListener('click', handleClickEqual, false);

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
        var values = $visor.value.match(/\d+[\+x÷-]?/g);

        console.log(values);

        var result = values.reduce(function(accumulator, currentValue){
            console.table(accumulator, currentValue);

            var firstValue = removeOperatorIfLastChar(accumulator);
            var operator = (isLastCharOperator(accumulator)) ? returnLastChar(accumulator) : null;
            var secondValue = removeOperatorIfLastChar(currentValue);
            var lastOperator = (isLastCharOperator(currentValue)) ? returnLastChar(currentValue) : null;
        
            switch (operator) {
                case '+':
                    return (Number(firstValue) + Number(secondValue)) + lastOperator;
                
                case '-':
                    return (Number(firstValue) - Number(secondValue)) + lastOperator;

                case 'x':
                    return (Number(firstValue) * Number(secondValue)) + lastOperator;
                
                case '÷':
                    return (Number(firstValue) / Number(secondValue)) + lastOperator;
                
                default:
                    break;
            }
        });

        $visor.value = result;
    }

    function removeOperatorIfLastChar(value) {
        if (isLastCharOperator(value))
            return value.slice(0, -1);
        
        return value;
    }

    function isLastCharOperator(value) {
        var operators = ['+', '-', 'x', '÷'];

        return operators.includes(returnLastChar(value));
    }

    function returnLastChar(value) {
        return value.toString().split('').pop();
    }
})(window, document);