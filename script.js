// Char remover
//У ПОпа! !! быЛА соБАка
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
    if (tempCode[i] == 32 && resultTemp.substr(-1) !== ' ') {resultTemp = resultTemp + ' '};
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
    tempCode[i] = resultTemp[i].charCodeAt();
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
let pagesControl = document.querySelectorAll('.menu-unit');
let pagesBlock = document.querySelector('.simple-gallery');
let pagesControlMenu = document.querySelector('.menu');
let urls = ['index1.html', 'http://google.com', 'http:/bing.com', 'http://aol.com'];
let pagesCounter = document.querySelector('.counter');
let question = document.querySelector('.question');
let qiestionItems = document.querySelectorAll('.question div')
let interval = 11;  //Интервал перелистывания, сек
let pageInterval;
let count = interval;
let currentPage = 0;
let pageGo = 0;


pagesBlock.addEventListener('click', function(evt){  // Кнопки управления перелистывание
  let win = window.open(urls[currentPage], 'win', 'width=1000, height=400, left=50, top=80');
  //let div = pagesBlock.cloneNode(true);
  console.log(win.document);
  win.document.body.appendChild(pagesBlock);
  //win.document.body.appendChild(div);
  //div.className = "alert alert-success";
  //div.innerHTML = "<strong>Ура!</strong>";
  switch (event.target) {

  case pagesControl[0]: { // действие кнопки Стоп
    clearInterval(pageInterval);
    pageGo = 0;
    win.focus();
    break;
    }
  case pagesControl[1]: { //действие кнопки Пуск
    if (!pageGo) {
      pageInterval = setInterval(nextpage,1000);
      pageGo = 1;
    }
    break;
    }
  case pagesControl[2]: { //действие кнопки Предыдущий
    if (currentPage > 0 ) currentPage--;
    win.location.href = urls[currentPage];
    break;
    }
  case pagesControl[3]: { //действие кнопки Следующий
    if (currentPage < urls.length - 1) currentPage++;
    win.location.href = urls[currentPage];
    break;
    }
  case qiestionItems[0]: {  //запуск слайдера заново
    question.classList.remove('showing2');
    win.location.href = urls[currentPage];
    pageInterval = setInterval(nextpage,1000);
    pageGo = 1;
    break;
    }
  case qiestionItems[1]: { //закрытие слайда
    win.close();
    pageGo = 0;
    question.classList.remove('showing2');
    break;
  }
  }

  function nextpage() {
      count--;
      let stopPoint; // точка выхода из пролистывания
      pagesCounter.textContent = count; // вывод обратного отсчета
        if (count == 0) {
          count = interval; //обновление счетчика
        if (currentPage == urls.length - 1) { //условие выхода после последнего слайда
          stopPoint = 1 };
          currentPage = (currentPage+1)%urls.length; //обновление слайда
          win.location.href = urls[currentPage];
        if (stopPoint) {  //скрытие слайдов и открытие окна запроса дальнейшего действия
            clearInterval(pageInterval);
            question.classList.add('showing2');
        }
  }}


})
