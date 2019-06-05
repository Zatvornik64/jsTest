//Simple Gallery
let pagesControl = document.querySelectorAll('.menu-unit');
let pagesBlock = document.querySelector('.simple-gallery');
let pagesControlMenu = document.querySelector('.menu');
let urls = ['index1.html', 'index2.html', 'index3.html', 'index4.html'];
let pagesCounter = document.querySelector('.counter');
let question = document.querySelector('.question');
let qiestionItems = document.querySelectorAll('.question div')
let interval = 11;  //Интервал перелистывания, сек
let pageInterval;
let count = interval;
let currentPage = (+window.location.href.replace('.html', '').split('').slice(-1) - 1);
let pageGo = 1;

let nextpage = function() {
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
