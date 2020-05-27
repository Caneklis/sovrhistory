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

// $(document).ready(function () {
//   slickBuildingsSlider();
// });
$(window).on("load", function () {
  $(".buildings__list .buildings__list-item:first-child button").click();
});
var $carousel;
var $slickCache;
var previousFilter = "";
var currentFilter = "all";
var filtered = "false";

$(".buildings__list").on("click", "button", function (event) {
  console.log(this, event.currentTarget.value);
  filterHandler(event.currentTarget.value);
  $(".buildings__list button").not(this).parent().removeClass("active");
  $(this).parent().addClass("active");
});

/**
 * Filter function for carousel
 * @param  {String} [tag=''] filter string to be applied
 */
filterHandler = function (tag) {
  var query = '[data-tags*="' + tag + '"]';
  var slick = $carousel[0].slick;

  // Removes filter state if cache is active ( indicates a filter is applied).
  // Work around for https://github.com/kenwheeler/slick/issues/3161
  if (slick.$slidesCache !== null) {
    slick.unload();
    slick.$slideTrack.children(slick.options.slide).remove();
    $slickCache.appendTo(slick.$slideTrack);
    slick.reinit();
    slick.goTo(0);
  }

  // Store a deep copy of the original carousel
  $slickCache = slick.$slides.clone(true, true);

  // Store the previous filter for reference
  previousFilter = currentFilter;

  // If the filter is being removed
  if (tag === "" || tag === "all") {
    // Store useful properties. Log
    filtered = false;
    currentFilter = "";

    // A filter is being applied
  } else {
    // Pass custom function to slick to query UI for our target
    slick.filterSlides(function (index, element) {
      return $(element).find(query).length > 0;
    });

    // Reset slider position
    slick.goTo(0);

    // Store useful properties.
    filtered = true;
    currentFilter = tag;
  }

  return currentFilter;
};

$(".buildings__list").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  mobileFirst: true,
  arrows: true,
  responsive: [
    {
      breakpoint: 767,
      settings: "unslick",
    },
  ],
});

$carousel = $(".buildings__events-list").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  infinite: false,
  dots: true,
  arrows: true,
  appendDots: $(".buildings__slider-dots"),
  prevArrow: $(".buildings__slider-prev"),
  nextArrow: $(".buildings__slider-next"),
});

$(".attention__btn").on("click", function () {
  $(this).parent().hide();
});

function resizeGridItem(item) {
  grid = document.getElementsByClassName("grid")[0];
  rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
  );
  rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
  );
  rowSpan = Math.ceil(
    (item.querySelector(".content").getBoundingClientRect().height + rowGap) /
      (rowHeight + rowGap)
  );
  item.style.gridRowEnd = "span " + rowSpan;
}

function resizeAllGridItems() {
  allItems = document.getElementsByClassName("item");
  for (x = 0; x < allItems.length; x++) {
    resizeGridItem(allItems[x]);
  }
}

function resizeInstance(instance) {
  item = instance.elements[0];
  resizeGridItem(item);
}

window.onload = resizeAllGridItems();
window.addEventListener("resize", resizeAllGridItems);

allItems = document.getElementsByClassName("item");
for (x = 0; x < allItems.length; x++) {
  imagesLoaded(allItems[x], resizeInstance);
}
