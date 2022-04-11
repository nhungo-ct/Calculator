"use strict";
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

const calculate = (firstValue, operator, secondValue) => {
    let result = '';
    if (operator === 'add') {
      result = parseFloat(firstValue) + parseFloat(secondValue)
    } else if (operator === 'subtract') {
      result = parseFloat(nfirstValue1) - parseFloat(secondValue)
    } else if (operator === 'multiply') {
      result = parseFloat(firstValue) * parseFloat(secondValue)
    } else if (operator === 'divide') {
      result = parseFloat(firstValue) / parseFloat(secondValue)
    }
    return result;
};
// refactor
// const calculate = (firstNum, operator, secondNum) => {
//     const firstNum = parseFloat(firstValue)
//     const secondNum = parseFloat(secondValue)
//     if (operator === 'add') return firstNum + secondNum
//     if (operator === 'subtract') return firstNum - secondNum
//     if (operator === 'multiply') return firstNum * secondNum
//     if (operator === 'divide') return firstNum / secondNum
//   };
// const getKeyType = key => {
//     const {action} = key.dataset;
//     if (!action) return 'number';
//     if (
//       action === 'add' ||
//       action === 'subtract' ||
//       action === 'multiply' ||
//       action === 'divide'
//     ) return 'operator';
//     // For everything else, return the action
//     return action;
// };

// const createResultString = () => {
//     const keyContent = key.textContent;
//     const keyType = getKeyType(key);
//     const {
//         firstValue,
//         operator,
//         modValue,
//         previousKeyType
//       } = state;

//     if (keyType === 'number') {
//         return displayedNum === '0' ||
//         previousKeyType === 'operator' ||
//         previousKeyType === 'calculate'
//         ? keyContent
//         : displayedNum + keyContent;
//      };

//     if (keyType === 'decimal') {
//         if (!displayedNum.includes('.')) return displayedNum + '.'
//         if (previousKeyType === 'operator' || previousKeyType === 'calculate') 
//         return '0.';
//         return displayedNum;
//     }

//     if (keyType === 'operator') {
//         return firstValue &&
//           operator &&
//           previousKeyType !== 'operator' &&
//           previousKeyType !== 'calculate'
//           ? calculate(firstValue, operator, displayedNum)
//           : displayedNum;
//       }
//     if (keyType === 'clear') return 0;

//     if (keyType === 'calculate') {
//     return firstValue
//       ? previousKeyType === 'calculate'
//         ? calculate(displayedNum, operator, modValue)
//         : calculate(firstValue, operator, displayedNum)
//         : displayedNum;
//   }
// };

// const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
//     const keyType = getKeyType(key);
//     const {
//       firstValue,
//       operator,
//       modValue,
//       previousKeyType
//     } = calculator.dataset;
  
//     calculator.dataset.previousKeyType = keyType;
  
//     if (keyType === 'operator') {
//       calculator.dataset.operator = key.dataset.action;
//       calculator.dataset.firstValue = 
//         firstValue &&
//         operator &&
//         previousKeyType !== 'operator' &&
//         previousKeyType !== 'calculate'
//         ? calculatedValue
//         : displayedNum;
//     }
  
//     if (keyType === 'calculate') {
//       calculator.dataset.modValue = 
//         firstValue && 
//         previousKeyType === 'calculate'
//         ? modValue
//         : displayedNum;
//     }
  
//     if (keyType === 'clear' && 
//         key.textContent === 'AC'
//         ) {
//             calculator.dataset.firstValue = ''
//             calculator.dataset.modValue = ''
//             calculator.dataset.operator = ''
//             calculator.dataset.previousKeyType = ''
//     }
// }
  
// const updateVisualState = (key, calculator) => {
//     const keyType = getKeyType(key);
//     Array.from(key.parentNode.children)
//     .forEach(k => k.classList.remove('is-depressed'));
  
//     if (keyType === 'operator') key.classList.add('is-depressed');
//     if (keyType === 'clear' && 
//         key.textContent !== 'AC'); 
//     key.textContent = 'AC';
//     if (keyType !== 'clear') {
//       const clearButton = calculator.querySelector('[data-action=clear]');
//       clearButton.textContent = 'CE';
//     }
// }
  
// const calculator = document.querySelector('.calculator');
// const display = calculator.querySelector('.calculator__display');
// const keys = calculator.querySelector('.calculator__keys');
  
// keys.addEventListener('click', e => {
//     if (!e.target.matches('button')) return;
//     const key = e.target;
//     const displayedNum = display.textContent;
//     const resultString = createResultString(key, displayedNum, calculator.dataset);
  
//     display.textContent = resultString;
//     updateCalculatorState(key, calculator, resultString, displayedNum);
//     updateVisualState(key, calculator);
// });
  
keys.addEventListener('click',  (e) => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

// // bo effect khi co phim da dc nhan
        Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'));

// voi man hinh dang = 0 hoac so truoc do la operator thi hien thi so de len man hinh
// nguoc lai se cong chuoi de hien th noi tiep

if (!action) {
    if (displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
        ) {
            display.textContent = keyContent;
        } else {
            display.textContent  = displayedNum + keyContent;
    }
    calculator.dataset.previousKeyType = 'number';
}

// neu man hinh ko co hien dau cham thi show so vua bam
// neu nut truoc do la operator hoac dau bang thi hien thi 0.
// con lai thi hien thi so moi co dau cham noi tiep

if (action === 'decimal') {
    if (!display.textContent.includes('.')) {
        display.textContent = displayedNum + '.';
    } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
    ) {
        display.textContent = '0.';
    } 
    calculate.dataset.previousKeyType = 'decimal';
}

// neu la operator 
if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
) {
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;

    if (firstValue && 
        operator && 
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate'
        ) {
            const calcValue = calculate(firstValue, operator, secondValue);
            display.textContent = calcValue;
            calculator.dataset.firstValue = calcValue;
      } else {
            calculator.dataset.firstValue = displayedNum;
    }
    key.classList.add('is-depressed');
    calculator.dataset.previousKeyType = 'operator';
    calculator.dataset.operator = action;
};

if (action === 'calculate') {
    let firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    let secondValue = displayedNum;
    
    if (firstValue) {
        if (previousKeyType === 'calculate') {
            firstValue = displayedNum;
            secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
    }
    calculator.dataset.modValue = secondValue;
    calculator.dataset.previousKeyType = 'calculate';
}
    

if (action === 'clear') {
    if (key.textContent === 'AC') {
      calculator.dataset.firstValue = ''
      calculator.dataset.modValue = ''
      calculator.dataset.operator = ''
      calculator.dataset.previousKeyType = ''
    } else {
      key.textContent = 'AC'
    }

    display.textContent = 0
    calculator.dataset.previousKeyType = 'clear'
}
if (action !== 'clear') {
    const clearButton = calculator.querySelector('[data-action=clear]');
    clearButton.textContent = 'CE';
}
}
});





// const calculate = (n1, operator, n2) => {
//     const firstNum = parseFloat(n1)
//     const secondNum = parseFloat(n2)
//     if (operator === 'add') return firstNum + secondNum
//     if (operator === 'subtract') return firstNum - secondNum
//     if (operator === 'multiply') return firstNum * secondNum
//     if (operator === 'divide') return firstNum / secondNum
//   }
  
//   const getKeyType = key => {
//     const { action } = key.dataset
//     if (!action) return 'number'
//     if (
//       action === 'add' ||
//       action === 'subtract' ||
//       action === 'multiply' ||
//       action === 'divide'
//     ) return 'operator'
//     // For everything else, return the action
//     return action
//   }
  
//   const createResultString = (key, displayedNum, state) => {
//     const keyContent = key.textContent
//     const keyType = getKeyType(key)
//     const {
//       firstValue,
//       operator,
//       modValue,
//       previousKeyType
//     } = state
  
//     if (keyType === 'number') {
//       return displayedNum === '0' ||
//         previousKeyType === 'operator' ||
//         previousKeyType === 'calculate'
//         ? keyContent
//         : displayedNum + keyContent
//     }
  
//     if (keyType === 'decimal') {
//       if (!displayedNum.includes('.')) return displayedNum + '.'
//       if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'
//       return displayedNum
//     }
  
//     if (keyType === 'operator') {
//       return firstValue &&
//         operator &&
//         previousKeyType !== 'operator' &&
//         previousKeyType !== 'calculate'
//         ? calculate(firstValue, operator, displayedNum)
//         : displayedNum
//     }
  
//     if (keyType === 'clear') return 0
  
//     if (keyType === 'calculate') {
//       return firstValue
//         ? previousKeyType === 'calculate'
//           ? calculate(displayedNum, operator, modValue)
//           : calculate(firstValue, operator, displayedNum)
//         : displayedNum
//     }
//   }
  
//   const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
//     const keyType = getKeyType(key)
//     const {
//       firstValue,
//       operator,
//       modValue,
//       previousKeyType
//     } = calculator.dataset
  
//     calculator.dataset.previousKeyType = keyType
  
//     if (keyType === 'operator') {
//       calculator.dataset.operator = key.dataset.action
//       calculator.dataset.firstValue = firstValue &&
//         operator &&
//         previousKeyType !== 'operator' &&
//         previousKeyType !== 'calculate'
//         ? calculatedValue
//         : displayedNum
//     }
  
//     if (keyType === 'calculate') {
//       calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
//         ? modValue
//         : displayedNum
//     }
  
//     if (keyType === 'clear' && key.textContent === 'AC') {
//       calculator.dataset.firstValue = ''
//       calculator.dataset.modValue = ''
//       calculator.dataset.operator = ''
//       calculator.dataset.previousKeyType = ''
//     }
//   }
  
//   const updateVisualState = (key, calculator) => {
//     const keyType = getKeyType(key)
//     Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
  
//     if (keyType === 'operator') key.classList.add('is-depressed')
//     if (keyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC'
//     if (keyType !== 'clear') {
//       const clearButton = calculator.querySelector('[data-action=clear]')
//       clearButton.textContent = 'CE'
//     }
//   }
  
//   const calculator = document.querySelector('.calculator')
//   const display = calculator.querySelector('.calculator__display')
//   const keys = calculator.querySelector('.calculator__keys')
  
//   keys.addEventListener('click', e => {
//     if (!e.target.matches('button')) return
//     const key = e.target
//     const displayedNum = display.textContent
//     const resultString = createResultString(key, displayedNum, calculator.dataset)
  
//     display.textContent = resultString
//     updateCalculatorState(key, calculator, resultString, displayedNum)
//     updateVisualState(key, calculator)
//   })
  