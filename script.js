// Char remover
const inputText = document.querySelector('.input-words');
const resultText = document.querySelector('.result-words');
const resultCharButton = document.querySelector('.char-remover .result');

resultCharButton.addEventListener('click', function(evt) {
  charRemove();
});
inputText.addEventListener('keypress', function(evt){
if(event.keyCode == 13) {
  charRemove();
}});

const charRemove = function(string) {
  const tempText = inputText.value.toLowerCase().split('');
  const originalText = inputText.value.split('');
  let tempCode = [];
  let resultTemp = [];

  for (let i = 0; i < tempText.length; i++) {
    tempCode[i] = tempText[i].charCodeAt();

    if (tempCode[i] > 1071 && tempCode[i] < 1104) {resultTemp = resultTemp + originalText[i]};
    if (tempCode[i] == 32 && resultTemp.substr(-1) !== ' ') {resultTemp = resultTemp + ' '};
  }
  const tempText2 = resultTemp.toLowerCase().split(' ');
  const counter = {};

  //счетчик количества букв
  for (let i = 1072; i < 1104; i++) { //цикл по коду букв
    counter[i - 1072] = 0;
    for (let k=0; k < tempText2.length; k++) { //цикл по количеству слов

    for (let j = 0; j < tempText2[k].length; j++) { //цикл по буквам в словах
      if (i == tempText2[k][j].toLowerCase().charCodeAt()) {counter[i - 1072]++}
    }
      if (counter[i - 1072] == 1) counter[i - 1072] = 0; //сброс счетчика при одинственной букве в слове
    }}

  //сборка текста из оригинального без букв определенных в счетчике выше
  let resultTemp2 = [];
  for (let i = 0; i < resultTemp.length; i++) {
    tempCode[i] = resultTemp[i].charCodeAt();
    if (counter[resultTemp[i].toLowerCase().charCodeAt() - 1072] == 0)  {resultTemp2 = resultTemp2 + resultTemp[i]};
    if (tempCode[i] == 32) {resultTemp2 = resultTemp2 + ' '};
  }
  resultText.textContent = resultTemp2;
}



//Math Calculator

const inputMath = document.querySelector('.input-math');
const resultMath = document.querySelector('.result-math');
const resultMathButton = document.querySelector('.math-calculator .result');

resultMathButton.addEventListener('click', function(evt) {math();});

inputMath.addEventListener('keypress', function(evt){
  if(event.keyCode == 13) { math();}
});

const math = function(string) {
  const tempMatch = inputMath.value.replace(/ /g, '');  //убираем пробелы
  const mathItems = inputMath.value.match(/\d+(?:\.\d+)?/g);  //разбираем на массив чисел (/\d+(?:[\.]\d+)?/g)
  let result = 0;
  let itemStartCounter;
  let counter;

  if (tempMatch.indexOf('=') < 0) {
    resultMath.textContent = 'вы забыли ввести символ =';
    return;
  }
  for (let i = 0; i < tempMatch.length - 1; i++) {
  if (tempMatch.charCodeAt(i) < 48 && tempMatch.charCodeAt(i + 1) < 48){
    resultMath.textContent = 'вы забыли ввести числа между операторами';
    return;
    }
  }

  if (mathItems === null) {
    resultMath.textContent = 'введите хоть что нибудь';
    return;
  }
    else {
      if (tempMatch.charCodeAt(0) < 48){
        counter = -1;
        itemStartCounter = 0;
      }
        else {
          result = +mathItems[0];
          counter = mathItems[0].length - 1;
          itemStartCounter = 1;
        }
    }

    //счетчик позиции следующего математического оператора
  for (itemStartCounter; itemStartCounter < mathItems.length; itemStartCounter++) {

    switch (tempMatch[counter + 1]) {
      case '=' :
        break;
      case '+' :
        result += +mathItems[itemStartCounter]; break;
      case '-' :
        result -= +mathItems[itemStartCounter]; break;
      case '*' :
        result *= +mathItems[itemStartCounter]; break;
      case '/' :
        result /= +mathItems[itemStartCounter]; break;
    }
    counter += mathItems[itemStartCounter].length + 1;
  }
  resultMath.textContent = result.toFixed(2);
}


// Butterfly Control

const butterflyControl = document.querySelector('.butterfly-control');
const butterflyLeftBlock = document.querySelector('.left-items');
const butterflyRightBlock = document.querySelector('.right-items');
const butterflyCentreBlock = document.querySelector('.centre-unit');
const butterflyCentreBlocks = document.querySelectorAll('.centre-unit .btn');
const butterflyBlocks = document.querySelectorAll('.butterfly-control .block');
const alert = document.querySelector('.alert');
const target = {};

const butterfly = function (leftBlock, centreBlock, rightBlock, target){ // функция бабочка работающая с любым подобным блоком

  const move = function(from, to) {
    let al = 0;
    for (let i = 0; i < from.children.length; i++) {
      if (from.children[i].classList.contains('moved')) {
        al++;                                             // счетчик выделенных блоков
        from.children[i].classList.remove('moved');
        to.appendChild(from.children[i]);
        i--;
    }};
    if (al < 1) alert.style.display = 'block'; // предупреждение о необходимости выделения блоков
  }

  const moveAll = function(from, to) {
    const fromLength = from.children.length;
    const toLength = to.children.length;
    alert.style.display = 'none';
    for (let i = 0; i < fromLength; i++) {
      from.children[0].classList.remove('moved');
      to.appendChild(from.children[0]);
  }}

  if (event.target.classList.contains('block')) {
    event.target.classList.toggle('moved');
    alert.style.display = 'none';
  }
  switch (event.target) {
        case butterflyCentreBlocks[0]:
          moveAll(leftBlock, rightBlock);
          break;
        case butterflyCentreBlocks[1]:
          move(leftBlock, rightBlock);
          break;
        case butterflyCentreBlocks[2]:
          move(rightBlock, leftBlock);
          break;
        case butterflyCentreBlocks[3]:
          moveAll(rightBlock, leftBlock);
          break;
  }
  }
// вызов функции бабочка с передачей ей аргументов именно этой бабочки
butterflyControl.addEventListener('mousedown', function(evt){
  butterfly (butterflyLeftBlock, butterflyCentreBlock, butterflyRightBlock, evt.target);
});



//Simple Gallery

const startBlock = document.querySelector('.slider-start');
startBlock.addEventListener('click', function(evt){  // Кнопки управления перелистывание
  const win = window.open('index1.html', 'win');
})
