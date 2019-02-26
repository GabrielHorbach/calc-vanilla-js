(function(win, doc){

    'use strict';

    var $visor = doc.querySelector('[data-js=visor]');
    var $buttonsNumbers = doc.querySelectorAll('[data-js=buttonsNumbers]');
    var $buttonsOperations = doc.querySelectorAll('[data-js=buttonsOperations]');
    var $buttonEqual = doc.querySelector('[data-js=buttonEqual]');
    var $buttonCe = doc.querySelector('[data-js=buttonCe]');

    Array.prototype.forEach.call($buttonsNumbers, function(item) {
        item.addEventListener('click', handleClickNumber, false);
    });
    
    Array.prototype.forEach.call($buttonsOperations, function(item) {
        item.addEventListener('click', handleClickOperator, false);
    });

    $buttonCe.addEventListener('click', handleClickCe, false);

    $buttonEqual.addEventListener('click', handleClickEqual, false);

    function handleClickNumber() {
        $visor.value += this.value;
    }

    function handleClickOperator() {
        var operators = ['+', '-', 'x', '÷'];

        if (operators.includes($visor.value.split('').pop()))
            $visor.value = $visor.value.slice(0, -1);

        $visor.value += this.value;
    }

    function handleClickCe() {
        $visor.value = '';
    }

    function handleClickEqual() {
        
    }
})(window, document);