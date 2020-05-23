let langBtn = document.querySelector(".lang__btn");
let langList = document.querySelector(".lang__list");

if (langBtn) {
  langBtn.addEventListener("click", function () {
    langList.classList.toggle("lang__list--opened");
  });
}

let searchActiveBtn = document.querySelector(".header__search-activate");
let searchForm = document.querySelector(".header__search-form");
let header = document.querySelector(".header");

header.addEventListener("click", function (e) {
  searchForm.classList.remove("header__search-form--opened");
  e.stopPropagation();
});

if (searchActiveBtn) {
  searchActiveBtn.addEventListener("click", function () {
    searchForm.classList.add("header__search-form--opened");
    event.stopPropagation();
  });
}

let menuToggle = document.querySelector(".main-nav__toggle");
let menuList = document.querySelector(".main-nav__list");

if (menuToggle) {
  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("main-nav__toggle--opened");
    menuList.classList.toggle("main-nav__list--opened");
  });
}

const observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();

$(".marquee__text").marquee({
  //duration in milliseconds of the marquee
  duration: 15000,
  //gap in pixels between the tickers
  gap: 50,
  //time in milliseconds before the marquee will start animating
  delayBeforeStart: 0,
  //'left' or 'right'
  direction: "left",
  //true or false - should the marquee be duplicated to show an effect of continues flow
  duplicated: true,
});

$(".marquee__close-btn").on("click", function () {
  $(".marquee").hide();
});

$(".main-slider__list").slick({
  dots: true,
  arrows: true,
  appendDots: $(".main-slider__dots"),
  prevArrow: $(".main-slider__prev"),
  nextArrow: $(".main-slider__next"),
  speed: 900,
  infinite: true,
  cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
  touchThreshold: 100,
  fade: true,
});
