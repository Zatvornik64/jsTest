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
  const originalText = inputText.value.split('');
  const punctuationMark = [' ', ',', '.', '!', '?', ';', ':'];
  const words = inputText.value.toLowerCase().split(' ');

  let result = [];
  let exception = inputText.value.toLowerCase().split('');

  for (let i = 0; i < words.length; i++) {  //Находим массив символов исключений
    let tempWord = words[i].split('').sort();
    for (let j = 1; j < tempWord.length; j++) {
      if (tempWord[j] == tempWord[j-1]) {
        exception = exception.join('').split(tempWord[j]).join('').split(''); //вырезаем из массива исключений повторяющиеся символы 
      }}};

  for (let i = 0; i < originalText.length; i++) { //собираем результирующий массив используя массивы знаков препинания и исключений
    if (punctuationMark.indexOf(originalText[i].toLowerCase()) != -1) {
      result.push(originalText[i]);
    }
    else {
      if (exception.indexOf(originalText[i].toLowerCase()) != -1) {
        result.push(originalText[i]);
    }}};

  resultText.textContent = result.join('');
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
  const mathItems = inputMath.value.match(/\d+(?:\.\d+)?/g);  //разбираем на массив чисел
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
const butterflycenterBlock = document.querySelector('.center-unit');
const butterflycenterBlocks = document.querySelectorAll('.center-unit .btn');
const [allToRight, selectedToRight, selectedToLeft, allToLeft] = butterflycenterBlocks;
const butterflyBlocks = document.querySelectorAll('.butterfly-control .block');
const alert = document.querySelector('.alert');
const target = {};

const butterfly = function (leftBlock, centerBlock, rightBlock, target){ // функция бабочка работающая с любым подобным блоком

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
        case allToRight:
          moveAll(leftBlock, rightBlock);
          break;
        case selectedToRight:
          move(leftBlock, rightBlock);
          break;
        case selectedToLeft:
          move(rightBlock, leftBlock);
          break;
        case allToLeft:
          moveAll(rightBlock, leftBlock);
          break;
  }
  }
// вызов функции бабочка с передачей ей аргументов именно этой бабочки
butterflyControl.addEventListener('mousedown', function(evt){
  butterfly (butterflyLeftBlock, butterflycenterBlock, butterflyRightBlock, evt.target);
});



//Simple Gallery

const startBlock = document.querySelector('.slider-start');
startBlock.addEventListener('click', function(evt){  // Кнопки управления перелистывание
  const win = window.open('index1.html', 'win');
})
