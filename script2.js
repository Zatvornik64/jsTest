//Simple Gallery
const pagesControl = document.querySelectorAll('.menu-unit');
const [stopBtn, playBtn, prevBtn, nextBtn] = pagesControl;
const pagesBlock = document.querySelector('.simple-gallery');
const pagesControlMenu = document.querySelector('.menu');
const urls = ['index1.html', 'index2.html', 'index3.html', 'index4.html'];
const pagesCounter = document.querySelector('.counter');
const question = document.querySelector('.question');
const qiestionItems = document.querySelectorAll('.question div')
const [again, end] = qiestionItems;
const interval = 11;  //Интервал перелистывания, сек
let pageInterval;
let count = interval;
let currentPage = (+window.location.href.replace('.html', '').split('').slice(-1) - 1);
let pageGo = true;

const nextpage = function() {
    count--;
    pagesCounter.textContent = count; // вывод обратного отсчета
      if (count == 0) {
        count = interval; //обновление счетчика

      if (currentPage == urls.length - 1) {  //скрытие слайдов и открытие окна запроса дальнейшего действия
          clearInterval(pageInterval);
          question.classList.add('showing2');
      } else {
        currentPage = (currentPage+1)%urls.length; //обновление слайда
        location.href = urls[currentPage];
      }
    }}
pageInterval = setInterval(nextpage,1000);

pagesBlock.addEventListener('click', function(evt){  // Кнопки управления перелистывание

  switch (event.target) {
  case stopBtn: { // действие кнопки Стоп
    clearInterval(pageInterval);
    pageGo = false;
    break;
    }
  case playBtn: {
    if (!pageGo) {
      pageInterval = setInterval(nextpage,1000);
      pageGo = true;
    }
    break;
    }
  case prevBtn: {
    if (currentPage > 0 ) currentPage--;
      location.href = urls[currentPage];
    break;
    }
  case nextBtn: {
    if (currentPage < urls.length - 1) {
        currentPage++;
        location.href = urls[currentPage];
        }
    else {  //скрытие слайдов и открытие окна запроса дальнейшего действия
        clearInterval(pageInterval);
        question.classList.add('showing2');
        }
    break;
    }
  case again: {  //запуск слайдера заново
    location.href = urls[0];
    break;
    }
  case end: { //закрытие слайда
    window.close();
    break;
  }
  }
})
