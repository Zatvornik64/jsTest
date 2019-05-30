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

resultMathButton.addEventListener('click', function(evt) {
  math();
});
inputMath.addEventListener('keypress', function(evt){
  if(event.keyCode == 13) { math();}
});

var math = function(string) {
  let tempMatch = inputMath.value.replace(/ /g, '');  //убираем пробелы
  let mathItems = inputMath.value.match(/\d+(.\d+)?/g);  //разбираем на массив чисел 
  let result = +mathItems[0];
  let counter = mathItems[0].length - 1;  //счетчик позиции следующего математического оператора
  for (let i=1; i < mathItems.length; i++) {
    if (tempMatch[counter + 1] == '=') break;
    if (tempMatch[counter + 1] == '+') result += +mathItems[i];
    if (tempMatch[counter + 1] == '-') result -= +mathItems[i];
    if (tempMatch[counter + 1] == '*') result *= +mathItems[i];
    if (tempMatch[counter + 1] == '/') result /= +mathItems[i];
    counter += mathItems[i].length + 1;
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

var butterfly = function (leftBlock, centreBlock, rightBlock){ // функция бабочка работающая с любым подобным блоком
  leftBlock.addEventListener('click', function(event){ // выделение блоков слева для переноса
    event.target.classList.toggle('moved');
    alert.style.display = 'none';
  })
  rightBlock.addEventListener('click', function(event){ // выделение блоков справа для переноса
    event.target.classList.toggle('moved');
    alert.style.display = 'none';
  })
  centreBlock.addEventListener('click', function(event){ // выбор действия
    //console.log(event.target);
    let leftBlockLength = leftBlock.children.length;
    let rightBlockLength = rightBlock.children.length;

    if (event.target === butterflyCentreBlocks[0]) { // перенос всего вправо
      alert.style.display = 'none';
      for (let i = 0; i < leftBlockLength; i++) {
        leftBlock.children[0].classList.remove('moved');
        rightBlock.appendChild(leftBlock.children[0]);
      }
    };

    if (event.target === butterflyCentreBlocks[1]) { // перенос выделенных элементов вправо
      let al = 0;
      for (let i = 0; i < leftBlock.children.length; i++) {
        if (leftBlock.children[i].classList.contains('moved')) {
          al++;                                             // счетчик выделенных блоков
          leftBlock.children[i].classList.remove('moved');
          rightBlock.appendChild(leftBlock.children[i]);
          i--;
      }};
      if (al < 1) alert.style.display = 'block'; // предупреждение о необходимости выделения блоков
    }

    if (event.target === butterflyCentreBlocks[2]) { // перенос выделенных элементов влево
      let al = 0;
      for (let i = 0; i < rightBlock.children.length; i++) {
        if (rightBlock.children[i].classList.contains('moved')) {
          al++;
          rightBlock.children[i].classList.remove('moved');
          leftBlock.appendChild(rightBlock.children[i]);
          i--;
    }}
    if (al < 1) alert.style.display = 'block';
  }

    if (event.target === butterflyCentreBlocks[3]) { // перенос всех элементов влево
      alert.style.display = 'none';
      for (let i = 0; i < rightBlockLength; i++) {
        rightBlock.children[0].classList.remove('moved');
        leftBlock.appendChild(rightBlock.children[0]);
      }
    };
  })
}
// вызов функции бабочка с передачей ей аргументов именно этой бабочки
butterflyControl.addEventListener('mousedown', butterfly(butterflyLeftBlock, butterflyCentreBlock, butterflyRightBlock));



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
