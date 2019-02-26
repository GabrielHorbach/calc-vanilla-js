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
        var values = $visor.value.match(/\d+[\+x÷-]?/g);

        values.reduce(function(accumulator, currentValue){
            var firstValue = removeOperatorIfLastChar(accumulator);
            var operator = (isLastCharOperator(accumulator)) ? returnLastChar(accumulator) : null;
            var secondValue = currentValue;

            switch (operator) {
                case '+':
                    $visor.value = (Number(firstValue) + Number(secondValue));
                    break;
                
                case '-':
                    $visor.value = (Number(firstValue) - Number(secondValue));
                    break;

                case 'x':
                    $visor.value = (Number(firstValue) * Number(secondValue));
                    break;
                
                case '÷':
                    $visor.value = (Number(firstValue) / Number(secondValue));
                    break;
                
                default:
                    break;
            }
        });
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
        return value.split('').pop();
    }
})(window, document);