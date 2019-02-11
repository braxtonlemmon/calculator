//VARIABLES
const numButtons = document.querySelectorAll('.num-button');
const opButtons = document.querySelectorAll('.op-button');
const clrButton = document.querySelector('#clear');
const equalButton = document.querySelector('#equals');
const delButton = document.querySelector('#del');
const decButton = document.querySelector('#decimal');
const display = document.querySelector('.display-container');

let tempDisplay = [];
let displayValue = [];
let operationMemory = [];
let solutionsArray = [];

//FUNCTIONS
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(operator, aNum, bNum) {
    switch (true) {
        case (operator == '+'):
            return add(aNum, bNum);
            break;
        case (operator == '_'):
            return subtract(aNum, bNum);
            break;
        case (operator == '*'):
            return multiply(aNum, bNum);
            break;
        case (operator == '/'):
            return divide(aNum, bNum);
            break;

        default:
            alert('Something has gone wrong. Please refresh.');
            clearCalc();
    };
};


function addToDisplay(input) {
    if (displayValue.length < 26) {
        displayValue.push(input);
        display.textContent = displayValue.join('');
    };
};

function pressButton(e) {
    const theButton = document.querySelector(`#${e.target.id}`);
    theButton.classList.add('pressed');
};

function removeTransition(e) {
    e.target.classList.remove('pressed');
};



function numClick(number) {
    if (solutionsArray.length === 1 && operationMemory.length === 1) {
        clearCalc();
    }
    addToDisplay(number);
    operationMemory.push(number);
    tempDisplay = operationMemory.join('').split(/[_+\*/]/g);
    console.table(operationMemory);
    console.table(tempDisplay);
};

function opClick(oper) {

    if (oper === '_') {
        addToDisplay('-');
    } else {
        addToDisplay(oper);
    };

    operationMemory.push(oper);
    evalInput();
    tempDisplay = operationMemory.join('').split(/[_+\*/]/g);
    console.table(operationMemory);
    console.table(tempDisplay);
};

function decClick(e) {
    if (solutionsArray.length === 1 && operationMemory.length === 1) {
        clearCalc();
    }
    
    if (tempDisplay.length === 0) {
        addToDisplay('.');
        operationMemory.push('.');
        tempDisplay = operationMemory.join('').split(/[_+\*/]/g);
    } else if (tempDisplay[tempDisplay.length - 1].toString().match(/[.]/g) != null) {
        console.table(operationMemory);
        console.table(tempDisplay);
        return;
    } else {
        addToDisplay('.');
        operationMemory.push('.');
        tempDisplay = operationMemory.join('').split(/[_+\*/]/g);
    };
    console.table(operationMemory);
    console.table(tempDisplay);
};

function clearCalc() {
    tempDisplay = [];
    displayValue = [];
    operationMemory = [];
    solutionsArray = [];
    display.textContent = '';
    console.table(operationMemory);
};

function erase() {
    // if ((solutionsArray[0] == display.textContent) || (solutionsArray.length === 0)) {
    //     clearCalc();
    // }
    console.log(displayValue);
    console.log(operationMemory);
    displayValue.pop();
    operationMemory.pop();
    display.textContent = displayValue.join('');
    tempDisplay = operationMemory.join('').split(/[_+\*/]/g);
    console.table(operationMemory);
    console.table(tempDisplay);
};

function evalInput() {
    if (operationMemory.length === 0) {
        alert('Sorry, you cannot begin an equation with an operator!');
        clearCalc();
    } else if (isNaN(operationMemory[(operationMemory.length) - 2])) {
        erase();
        console.table(operationMemory);  
    }
};
function divideByZero() {
    const screen = document.querySelector('.display-container');
    
}


function calculate() {
    let foundOper; 
    let holdResult;   
    solutionsArray = operationMemory.join('').split(/([_+\*/])/g);
    console.table(solutionsArray);
    if ((operationMemory.length === 0) || (isNaN(parseFloat(solutionsArray[solutionsArray.length - 1])))) {
        return;
    };
    
    let i = solutionsArray.length;
    while (i > 1) {
        if (solutionsArray.findIndex((item) => item.toString().match(/[\*/]/)) != -1) {
            foundOper = solutionsArray.findIndex((item) => item.toString().match(/[\*/]/));
            if ((solutionsArray[foundOper] === '/') && (solutionsArray[foundOper + 1] == 0)) {
                alert('Ce n\'est pas possible! You can\'t divide by zero, bucko! Fix your mistake...');
                return;
            }
            holdResult = operate(solutionsArray[foundOper], parseFloat(solutionsArray[foundOper - 1]), parseFloat  (solutionsArray[foundOper + 1]));
            console.log(holdResult);
            solutionsArray.splice(foundOper - 1, 3, holdResult);
            console.table(solutionsArray);
        } else if (solutionsArray.findIndex((item) => item.toString().match(/[_+]/)) != -1) {
            foundOper = solutionsArray.findIndex((item) => item.toString().match(/[_+]/));
            holdResult = operate(solutionsArray[foundOper], parseFloat(solutionsArray[foundOper - 1]), parseFloat(solutionsArray[foundOper + 1]));
            console.log(holdResult);
            solutionsArray.splice(foundOper - 1, 3, holdResult);
            console.table(solutionsArray);
        }
        i = solutionsArray.length;
    };
    solutionsArray[0] = +(parseFloat(solutionsArray[0])).toFixed(4);
    operationMemory.splice(0, operationMemory.length + 1, solutionsArray[0]);
    console.table(operationMemory);
    displayValue.splice(0, displayValue.length + 1, solutionsArray[0]);
    tempDisplay.splice(0, tempDisplay.length + 1, solutionsArray[0]);
    display.textContent = displayValue.join('');
};

//TO RUN
numButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        pressButton(e);
        return numClick(e.target.textContent);
    });
});
numButtons.forEach(button => button.addEventListener('transitionend', removeTransition));

opButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        pressButton(e);
        return opClick(e.target.innerText);
    });
});
opButtons.forEach(button => button.addEventListener('transitionend', removeTransition));

clrButton.addEventListener('click', (e) => {
    const restart = document.querySelector('.display-container');
    restart.classList.add('pressed-big');
    restart.addEventListener('transitionend', () => {
        restart.classList.remove('pressed-big')
    });
    pressButton(e);
    clearCalc();
});
clrButton.addEventListener('transitionend', removeTransition);

equalButton.addEventListener('click', (e) => {
    pressButton(e);
    calculate();
});
equalButton.addEventListener('transitionend', removeTransition);

delButton.addEventListener('click', (e) => {
    pressButton(e);
    erase();
});
delButton.addEventListener('transitionend', removeTransition);

decButton.addEventListener('click', (e) => {
    pressButton(e);
    decClick();
});
decButton.addEventListener('transitionend', removeTransition);


function useKeys(e) {
    const theButton = document.querySelector(`div[data-key="${e.key}"]`);
    theButton.classList.add('pressed');
}

window.addEventListener('keyup', function(e) {
    let key = e.keyCode;
    (e.key != "Shift") ? useKeys(e) : false;
    switch(true) {
        case ((e.key).match(/[0-9]/) !== null): 
            //useKeys(e);
            return numClick(e.key);    
            break;
        case (e.key === '/'): 
            //useKeys(e);
            return opClick(e.key);   
            break;
        case (e.key === '-'):
            //useKeys(e);
            return opClick('_');
            break;
        case (e.shiftKey && (key === 56 || key === 187)):
            return opClick(e.key);
            break;
        case (key === 190):
            return decClick();
            break;
        case (key === 8):
            //useKeys(e);
            return erase();
            break;
        case (key === 13):
            //useKeys(e);
            return calculate();
            break;
        case (key === 46):
            //useKeys(e);
            return clearCalc();
            break;
        default:
            return;
    };
    
    
});