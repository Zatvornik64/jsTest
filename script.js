// Char remover

let inputText = document.querySelector('.input-words');
let resultText = document.querySelector('.result-words');
let resultCharButton = document.querySelector('.char-remover .result');

resultCharButton.addEventListener('click', function(evt) {
  charRemove();
});
inputText.addEventListener('keypress', function(evt){
if(event.keyCode == 13) {
  charRemove();
}});

var charRemove = function(string) {
  let tempText = inputText.value.toLowerCase().split('');
  let originalText = inputText.value.split('');
  let tempCode = [];
  let resultTemp = [];

  for (let i = 0; i < tempText.length; i++) {
    tempCode[i] = tempText[i].charCodeAt();

    if (tempCode[i] > 1071 && tempCode[i] < 1104) {resultTemp = resultTemp + originalText[i]};
    if (tempCode[i] == 32) {resultTemp = resultTemp + ' '};
  }
  let tempText2 = resultTemp.toLowerCase().split(' ');
  let counter = {};

  //счетчик количества букв
  for (let i = 1072; i < 1104; i++) { //цикл по коду букв
    counter[i] = 0;
    for (let k=0; k < tempText2.length; k++) { //цикл по количеству слов

    for (let j = 0; j < tempText2[k].length; j++) { //цикл по буквам в словах
      if (i == tempText2[k][j].toLowerCase().charCodeAt()) {counter[i]++}
    }
      if (counter[i] == 1) counter[i] = 0; //сброс счетчика при одинственной букве в слове
    }}

  //сборка текста из оригинального без букв определенных в счетчике выше
  let resultTemp2 = [];
  for (let i = 0; i < resultTemp.length; i++) {
    if (counter[resultTemp[i].toLowerCase().charCodeAt()] == 0)  {resultTemp2 = resultTemp2 + resultTemp[i]};
    if (tempCode[i] == 32) {resultTemp2 = resultTemp2 + ' '};
  }
  resultText.textContent = resultTemp2;
}



//Math Calculator

let inputMath = document.querySelector('.input-math');
let resultMath = document.querySelector('.result-math');
let resultMathButton = document.querySelector('.math-calculator .result');

resultMathButton.addEventListener('click', function(evt) {math();});

inputMath.addEventListener('keypress', function(evt){
  if(event.keyCode == 13) { math();}
});

let math = function(string) {
  let tempMatch = inputMath.value.replace(/ /g, '');  //убираем пробелы
  let mathItems = inputMath.value.match(/\d+(?:\.\d+)?/g);  //разбираем на массив чисел (/\d+(?:[\.]\d+)?/g)
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
      case '=' : break;
      case '+' : result += +mathItems[itemStartCounter]; break;
      case '-' : result -= +mathItems[itemStartCounter]; break;
      case '*' : result *= +mathItems[itemStartCounter]; break;
      case '/' : result /= +mathItems[itemStartCounter]; break;
    }
    counter += mathItems[itemStartCounter].length + 1;
  }
  resultMath.textContent = result.toFixed(2);
}


// Butterfly Control

let butterflyControl = document.querySelector('.butterfly-control');
let butterflyLeftBlock = document.querySelector('.left-items');
let butterflyRightBlock = document.querySelector('.right-items');
let butterflyCentreBlock = document.querySelector('.centre-unit');
let butterflyCentreBlocks = document.querySelectorAll('.centre-unit .btn');
let butterflyBlocks = document.querySelectorAll('.butterfly-control .block');
let alert = document.querySelector('.alert');
let target = {};




var butterfly = function (leftBlock, centreBlock, rightBlock, target){ // функция бабочка работающая с любым подобным блоком

  let move = function(from, to) {
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

  let moveAll = function(from, to) {
    let fromLength = from.children.length;
    let toLength = to.children.length;
    alert.style.display = 'none';
    for (let i = 0; i < fromLength; i++) {
      from.children[0].classList.remove('moved');
      to.appendChild(from.children[0]);
  }}

  switch (target.parentNode) {
    case leftBlock:
    case rightBlock:
      event.target.classList.toggle('moved');
      alert.style.display = 'none';
      break;
    case centreBlock:
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
  }
// вызов функции бабочка с передачей ей аргументов именно этой бабочки
butterflyControl.addEventListener('mousedown', function(evt){
  butterfly (butterflyLeftBlock, butterflyCentreBlock, butterflyRightBlock, evt.target);
});



//Simple Gallery
let sliderControl = document.querySelectorAll('.menu-unit');
let sliderBlock = document.querySelector('.simple-gallery');
let sliderControlMenu = document.querySelector('.menu');
let sliderItems = document.querySelectorAll('.slider');
let sliderCounter = document.querySelector('.counter');
let question = document.querySelector('.question');
let qiestionItems = document.querySelectorAll('.question div')
let interval = 11;  //Интервал перелистывания, сек
let slideInterval;
let count = interval;
let currentSlide = 0;
sliderItems[0].className = 'slider showing'; // первый слайд
let slideGo = 0; //индикатор идущего слайда
var nextSlide = function() {
    count--;
    let stopPoint; // точка выхода из пролистывания
    sliderCounter.textContent = count; // вывод обратного отсчета
    //console.log(count);
    if (count == 0) {
      count = interval; //обновление счетчика
      sliderItems[currentSlide].className = 'slider'; //скрытие предыдущего слайда
      if (currentSlide == sliderItems.length - 1) { //условие выхода после последнего слайда
        stopPoint = 1 };
      currentSlide = (currentSlide+1)%sliderItems.length; //обновление слайда
      sliderItems[currentSlide].className = 'slider showing'; //вывод следующего слайда
      if (stopPoint) {  //скрытие слайдов и открытие окна запроса дальнейшего действия
          clearInterval(slideInterval);
          sliderItems[currentSlide].className = 'slider';
          question.classList.add('showing2');
      }
}}

sliderBlock.addEventListener('click', function(evt){  // Кнопки управления перелистывание
  if (evt.target === sliderControl[0]) { // действие кнопки Стоп
    clearInterval(slideInterval);
    slideGo = 0;
  }
  if (evt.target === sliderControl[1]) { //действие кнопки Пуск
    if (!slideGo) {
      slideInterval = setInterval(nextSlide,1000);
      slideGo = 1;
    }
  }
  if (evt.target === sliderControl[2]) { //действие кнопки Предыдущий
    sliderItems[currentSlide].className = 'slider';
    if (currentSlide > 0 ) currentSlide--;
    sliderItems[currentSlide].className = 'slider showing';
  }
  if (evt.target === sliderControl[3]) { //действие кнопки Следующий
    sliderItems[currentSlide].className = 'slider';
    if (currentSlide < sliderItems.length - 1) currentSlide++;
    sliderItems[currentSlide].className = 'slider showing';
  }
  if (evt.target === qiestionItems[0]) {  //запуск слайдера заново
    question.classList.remove('showing2');
    sliderItems[0].className = 'slider showing';
    slideInterval = setInterval(nextSlide,1000);
    slideGo = 1;
  }
  if (evt.target === qiestionItems[1]) { //закрытие слайда
    question.classList.remove('showing2');
  }
})
