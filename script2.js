//Simple Gallery
const pagesControl = document.querySelectorAll('.menu-unit');
const pagesBlock = document.querySelector('.simple-gallery');
const pagesControlMenu = document.querySelector('.menu');
const urls = ['index1.html', 'index2.html', 'index3.html', 'index4.html'];
const pagesCounter = document.querySelector('.counter');
const question = document.querySelector('.question');
const qiestionItems = document.querySelectorAll('.question div')
const interval = 11;  //Интервал перелистывания, сек
let pageInterval;
let count = interval;
let currentPage = (+window.location.href.replace('.html', '').split('').slice(-1) - 1);
let pageGo = 1;

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
  case pagesControl[0]: { // действие кнопки Стоп
    clearInterval(pageInterval);
    pageGo = 0;
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
    location.href = urls[currentPage];
    break;
    }
  case pagesControl[3]: { //действие кнопки Следующий
    if (currentPage < urls.length - 1) currentPage++;
    location.href = urls[currentPage];
    break;
    }
  case qiestionItems[0]: {  //запуск слайдера заново
    location.href = urls[0];
    break;
    }
  case qiestionItems[1]: { //закрытие слайда
    window.close();
    break;
  }
  }
})
