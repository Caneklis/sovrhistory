let langBtn = document.querySelector(".lang__btn");
let langList = document.querySelector(".lang__list");

if (langBtn) {
  langBtn.addEventListener("click", function () {
    langList.classList.toggle("lang__list--opened");
  });
}

let searchActiveBtn = document.querySelector(".header__search-activate");
let searchForm = document.querySelector(".header__search");
let header = document.querySelector(".header");
let nav = document.querySelector(".main-nav");
let logo = document.querySelector(".logo");
let topOfNav = header.offsetTop;

if (searchActiveBtn) {
  searchActiveBtn.addEventListener("click", function () {
    this.classList.toggle("header__search-activate--active");
    searchForm.classList.toggle("header__search--opened");
  });
}

playVideoInMainSlider = () => {
  var sources = document.querySelectorAll(".main-slider__video video source");
  // Define the video object this source is contained inside
  var videos = document.querySelectorAll(".main-slider__video video");
  var video = document.querySelector(".main-slider__video video");
  // If for some reason we do want to load the video after, for desktop as opposed to mobile (I'd imagine), use videojs API to load
  video.load();
  videos.muted = "muted";

  if (window.innerWidth < 767) {
    console.log("is mobile");
    // it is mobile browser
    for (var i = 0; i < sources.length; i++) {
      sources[i].setAttribute(
        "src",
        sources[i].getAttribute("data-src-mobile")
      );
    }
    //video.load();
    for (var i = 0; i < videos.length; i++) {
      videos[i].setAttribute(
        "poster",
        videos[i].getAttribute("data-poster-mobile")
      );
    }
  } else if (window.innerWidth >= 768 && window.innerWidth < 1439) {
    console.log("is tablet");
    for (var i = 0; i < sources.length; i++) {
      sources[i].setAttribute(
        "src",
        sources[i].getAttribute("data-src-tablet")
      );
    }
    //video.load();
    for (var i = 0; i < videos.length; i++) {
      videos[i].setAttribute(
        "poster",
        videos[i].getAttribute("data-poster-tablet")
      );
    }
  } else {
    console.log("is desktop");
    for (var i = 0; i < sources.length; i++) {
      sources[i].setAttribute("src", sources[i].getAttribute("data-src"));
    }
    //video.load();
    for (var i = 0; i < videos.length; i++) {
      videos[i].setAttribute("poster", videos[i].getAttribute("data-poster"));
    }
  }
};

if (document.querySelector(".main-slider__video video")) {
  playVideoInMainSlider();

  window.onresize = function (event) {
    playVideoInMainSlider(event);
    //$(".main-slider__list").slick("setPosition");
  };

  $(".main-slider__list").on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      $("video").each(function () {
        this.pause();
        this.currentTime = 0;
      });
    }
  );

  $(".main-slider__list").on(
    "afterChange",
    function (event, slick, currentSlide, nextSlide) {
      $("video").each(function () {
        setTimeout(() => {
          this.play();
        }, 200);
      });
    }
  );
}

function fixHeader() {
  if (window.scrollY >= topOfNav) {
    header.classList.add("header--fixed");
    nav.classList.add("main-nav--fixed");
    logo.classList.add("logo--fixed");
    document.body.style.paddingTop = header.offsetHeight + "px";
  } else {
    header.classList.remove("header--fixed");
    nav.classList.remove("main-nav--fixed");
    logo.classList.remove("logo--fixed");
    document.body.style.paddingTop = 0;
  }
}

window.addEventListener("scroll", fixHeader);

let menuToggle = document.querySelector(".main-nav__toggle");
let menuList = document.querySelector(".main-nav__list");
let body = document.querySelector("body");

if (menuToggle) {
  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("main-nav__toggle--opened");
    menuList.classList.toggle("main-nav__list--opened");
    searchForm.classList.toggle("header__search--opened");
    body.classList.toggle("page--fixed");
    nav.classList.toggle("main-nav--active");
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

$(".cookie__close-btn").on("click", function () {
  $(".cookie").hide();
  var wuc_date = new Date();
  wuc_date.setDate(wuc_date.getDate() + 30);
  document.cookie = "weusecookie=1;expires=" + wuc_date.toGMTString();
});

$(".main-slider__list")
  .slick({
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
    rows: 0,
    mobileFirst: true,
    // autoplay: true,
    // autoplaySpeed: 3000,
  })
  .on("setPosition", function (event, slick) {
    slick.$slides.css("height", slick.$slideTrack.height() + "px");
  });

$(window).on("resize orientationchange", function () {
  $(".main-slider__list").slick("setPosition");
});

var $carousel;
var $slickCache;
var previousFilter = "";
var currentFilter = "all";
var filtered = "false";

filterBuildingsEventsAfterLoad = function () {
  var num1 = $(".buildings__list--filter .buildings__list-item button").get(0);
  console.log(num1);
  // filterHandler(num1);
  // var num1 = $(".buildings__list--filter .buildings__list-item button").get(0);
  if (num1) {
    num1.click();
  }
};

setTimeout(() => {
  filterBuildingsEventsAfterLoad();
}, 100);

$(".buildings__list--filter").on("click", "button", function (event) {
  console.log(this, event.currentTarget.value);
  filterHandler(event.currentTarget.value);
  $(".buildings__list button").not(this).parent().removeClass("active");
  $(this).parent().addClass("active");

  $(".buildings__branch-link").hide();
  $(
    ".buildings__branch-link[data-tags=" + event.currentTarget.value + "]"
  ).show();
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

// setTimeout(() => {
//   $(".buildings__list--filter buildings__list-item:first-child button").click();
//   console.log("bla");
// }, 2000);

function createSlick() {
  jQuery(".buildings__list")
    .not(".slick-initialized")
    .slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 2000,
      mobileFirst: true,
      arrows: true,
      infinite: false,
      responsive: [
        {
          breakpoint: 767,
          settings: "unslick",
        },
      ],
    });
}
createSlick();

//Now it will not throw error
$(window).on("resize", createSlick);

$carousel = $(".buildings__events-list").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
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
// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
  var matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// устанавливает cookie с именем name и значением value
// options - объект с свойствами cookie (expires, path, domain, secure)
function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

// удаляет cookie с именем name
function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1,
  });
}

// function blindVersion() {
//   var html = $("html"),
//     body = $("body"),
//     img = $("img"),
//     contrast = $(".js-contrast-version"),
//     normal = $(".js-normal-version"),
//     font = $(".js-font"),
//     contrastCookie = getCookie("contrast"),
//     imgCookie = getCookie("img"),
//     fontCookie = getCookie("font");

//   function show() {
//     $("img").show();
//     $("svg").show();
//     $(".video-container").show();
//     $(".video-preview").show();
//   }
//   function hide() {
//     $("svg").hide();
//     $("img").hide();
//     $(".video-container").hide();
//     $(".video-preview").hide();
//   }

//   contrast.on("click", function () {
//     html.addClass("contrast");
//     $(this).addClass("active");
//     normal.addClass("active");
//     hide();
//     setCookie("contrast", "on");

//     //$grid.masonry();
//   });
//   normal.on("click", function () {
//     html.removeClass("contrast");
//     $(this).removeClass("active");
//     contrast.addClass("active");
//     show();
//     setCookie("contrast", "off");

//     //$grid.masonry();
//   });

//   if (contrastCookie == "on") {
//     contrast.addClass("active");
//     normal.removeClass("active");
//     html.addClass("contrast");
//     // img.hide();
//     hide();
//     //$grid.masonry();
//   } else {
//     contrast.removeClass("active");
//     normal.removeClass("active");
//     html.removeClass("contrast");
//     show();
//     //$grid.masonry();
//   }
// }
// blindVersion();

$.bvi({
  bvi_target: ".bvi-open", // Класс ссылки включения плагина
  bvi_theme: "white", // Цвет сайта
  bvi_font: "arial", // Шрифт
  bvi_font_size: 16, // Размер шрифта
  bvi_letter_spacing: "normal", // Межбуквенный интервал
  bvi_line_height: "normal", // Междустрочный интервал
  bvi_images: true, // Изображения
  bvi_reload: false, // Перезагрузка страницы при выключении плагина
  bvi_fixed: true, // Фиксирование панели для слабовидящих вверху страницы
  bvi_tts: true, // Синтез речи
  bvi_flash_iframe: true, // Встроенные элементы (видео, карты и тд.)
  bvi_hide: false, // Скрывает панель для слабовидящих и показывает иконку панели.
});

$(".js-example-tokenizer").select2({
  tags: false,
  tokenSeparators: [","],
});

$(function () {
  $(".preview__slider-list").slick({
    slidesToShow: 1,
    centerMode: false,
    centerPadding: "0px",
    speed: 300,
    focusOnSelect: true,
    infinite: false,
    arrows: true,
    dots: false,
    variableWidth: true,
    adaptiveHeight: false,
    draggable: true,
    initialSlide: 0,
    cssEase: "ease-in-out",
    // infinite: true,
    // adaptiveHeight: true,
    prevArrow: $(".preview__slider-prev"),
    nextArrow: $(".preview__slider-next"),

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  });
  // .on("afterChange", function (event, slick, currentSlide, nextSlide) {
  //   console.log(nextSlide);
  // });

  // When the filter values are changed,
  // apply the filter to slick.
  $("form.filter select").on("change", function () {
    var filterClass = getFilterValue();
    $(".filter-class").text(filterClass);
    $(".slick").slick("slickUnfilter");
    $(".slick").slick("slickFilter", filterClass);
  });

  /**
   * This just reads the inputs from the
   * selects and creates the filter.
   */
  function getFilterValue() {
    // Grab all the values from the filters.
    var values = $(".filter-group")
      .map(function () {
        // For each group, get the select values.
        var groupVal = $(this)
          .find("select")
          .map(function () {
            return $(this).val();
          })
          .get();
        // join the values together.
        return groupVal.join("");
      })
      .get();
    // Remove empty strings from the filter array.
    // and join together with a comma. this way you
    // can use multiple filters.
    return values
      .filter(function (n) {
        return n !== "";
      })
      .join(",");
  }

  /**
   * Add a delete button to the filter group.
   */
  $(".filter-group .delete").on("click", function (event) {
    event.preventDefault();
    $(this).closest(".filter-group").remove();
  });

  /**
   * Add a filter group row.
   */
  $(".add-filter").on("click", function (event) {
    event.preventDefault();
    $("form.filter .filter-group")
      .first()
      .clone(true)
      .insertBefore($("form.filter .add-filter"));
  });
});

$(".text__article-slider-list").slick({
  slidesToShow: 1,
  centerMode: false,
  centerPadding: "0px",
  speed: 300,
  focusOnSelect: true,
  infinite: false,
  arrows: true,
  dots: false,
  variableWidth: false,
  initialSlide: 1,
  prevArrow: $(".text__article-slider--prev"),
  nextArrow: $(".text__article-slider--next"),

  responsive: [
    {
      breakpoint: 1439,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "40px",
        arrows: true,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "40px",
      },
    },
  ],
});

$(".shop__slider-list").slick({
  dots: true,
  arrows: true,
  infinite: false,
  prevArrow: $(".shop__slider-arrow--prev"),
  nextArrow: $(".shop__slider-arrow--next"),
  appendDots: $(".shop__slider-dots"),
  dotsClass: "shop__slider-dots",
});

$(function () {
  var $startDate = $(".start-date");
  var $endDate = $(".end-date");

  $startDate.datepicker({
    autoHide: true,
    language: "ru-RU",
  });
  $endDate.datepicker({
    autoHide: true,
    language: "ru-RU",
    startDate: $startDate.datepicker("getDate"),
  });

  $startDate.on("change", function () {
    $endDate.datepicker("setStartDate", $startDate.datepicker("getDate"));
    console.log($startDate.datepicker("getDate", true));
  });

  $endDate.on("change", function () {
    console.log($endDate.datepicker("getDate", true));
  });
});

$(".js-example-basic-multiple").select2({
  tags: true,
  tokenSeparators: [",", " "],
  scrollAfterSelect: true,
  dropdownCssClass: "preview__select-dropdown",
  minimumResultsForSearch: -1,
  placeholder: function () {
    $(this).data("placeholder");
  },
});

$(".js-example-basic-multiple").on("change", function () {
  console.log($(this).val());
});

// $(".js-example-basic-multiple")
//   .select2()
//   .select2("val", $(".select2 option:eq(1)").val());

$(".filter__select-option a").click(function (event) {
  event.preventDefault();
  var par = $(this).parents(".filter__custom-select");
  $(".filter__select-value", par).text($.trim($(this).text()));
});

// var buttonsMultiple = document.querySelectorAll(
//   ".filter__buttons--multiple button.filter__button"
// );
// for (var i = 0; i < buttonsMultiple.length; i++) {
//   var self = buttonsMultiple[i];

//   self.addEventListener(
//     "click",
//     function (event) {
//       // prevent browser's default action
//       event.preventDefault();
//       this.classList.toggle("filter__button--active");

//       // call your awesome function here
//       //MyAwesomeFunction(this); // 'this' refers to the current button on for loop
//     },
//     false
//   );
// }

var buttons = document.querySelectorAll("button.filter__button");
for (var i = 0; i < buttons.length; i++) {
  var self = buttons[i];

  self.addEventListener(
    "click",
    function (event) {
      // prevent browser's default action
      event.preventDefault();
      this.classList.toggle("filter__button--active-no-cross");

      // call your awesome function here
      //MyAwesomeFunction(this); // 'this' refers to the current button on for loop
    },
    false
  );
}

// var buttons = $(".filter__buttons--not-multiple button.filter__button");
// buttons.on("click", function () {
//   buttons.removeClass("filter__button--active-no-cross");
//   this.classList.toggle("filter__button--active-no-cross");
// });

// Hide the extra content initially, using JS so that if JS is disabled, no problemo:
$(".read-more-content").addClass("hide");
$(".read-more-show, .read-more-hide").removeClass("hide");

// Set up the toggle effect:
$(".read-more-show").on("click", function (e) {
  $(this).next(".read-more-content").removeClass("hide");
  $(this)
    .next(".read-more-content")
    .next(".excursions__prices-btn")
    .addClass("hide");

  $(this).addClass("hide");
  e.preventDefault();
});

$(".read-more-hide").on("click", function (e) {
  var p = $(this).parent(".read-more-content");
  p.addClass("hide");
  p.next(".excursions__prices-btn").removeClass("hide");
  p.prev(".read-more-show").removeClass("hide"); // Hide only the preceding "Read More"
  e.preventDefault();
});

if (document.querySelector(".video__link")) {
  function findVideos() {
    let videos = document.querySelectorAll(".video");

    for (let i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
    }
  }
}

function setupVideo(video) {
  let link = video.querySelector(".video__link");
  let media = video.querySelector(".video__media");
  let button = video.querySelector(".video__button");
  let id = parseMediaURL(media);

  video.addEventListener("click", () => {
    let iframe = createIframe(id);

    link.remove();
    button.remove();
    video.appendChild(iframe);
  });

  link.removeAttribute("href");
  video.classList.add("video--enabled");
}

function parseMediaURL(media) {
  let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
  let url = media.src;
  let match = url.match(regexp);

  return match[1];
}

function createIframe(id) {
  let iframe = document.createElement("iframe");

  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("allow", "autoplay");
  iframe.setAttribute("src", generateURL(id));
  iframe.classList.add("video__media");

  return iframe;
}

function generateURL(id) {
  let query = "?rel=0&showinfo=0&autoplay=1";

  return "https://www.youtube.com/embed/" + id + query;
}

// findVideos();

$(document).ready(function () {
  $(".popup__slider-list").each(function (index) {
    $(this).attr("data-slider", index);

    $(this).slick({
      // slidesToShow: 4,
      slidesToScroll: 1,
      infinite: false,
      dots: false,
      arrows: true,
      adaptiveHeight: true,
      variableWidth: true,
      prevArrow: `<button type="button" class="popup-slider__arrow  popup-slider__arrow--prev"><img src="/img/icons/popup/arrow_left_white.svg" alt="Back"></button>`,
      nextArrow: `<button type="button" class="popup-slider__arrow  popup-slider__arrow--next"><img src="/img/icons/popup/arrow_right_white.svg" alt="Next"></button>`,

      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 580,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    });
  });

  $("#lightgallery").lightGallery({
    pager: false,
    selector: "a",
    thumbnail: false,
    subHtmlSelectorRelative: true,
    share: false,
    zoom: false,
    autoplay: false,
    autoplayControls: false,
    download: false,
    fullScreen: false,
    counter: false,
    enableDrag: false,
  });
});

$(".excursions__list-filter-pin").on("click", function () {
  $(".map-popup").addClass("map-popup--hide");
  $(this).next(".map-popup").removeClass("map-popup--hide");
});

$(".map-popup__close-btn").on("click", function () {
  $(this).parent(".map-popup").addClass("map-popup--hide");
  console.log("bla");
});

$(".tabs__item-slider").each(function (index) {
  $(this).attr("data-slider", index);

  $(this).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: false,
    arrows: true,
    adaptiveHeight: true,
    variableWidth: false,
    prevArrow: `<button type="button" class="tabs__item-slider__arrow  tabs__item-slider__arrow--prev"><img src="/img/icons/popup/arrow_left_white.svg" alt="Back"></button>`,
    nextArrow: `<button type="button" class="tabs__item-slider__arrow  tabs__item-slider__arrow--next"><img src="/img/icons/popup/arrow_right_white.svg" alt="Next"></button>`,
  });
});

const slider = document.querySelector(".timeline__list");
let isDown = false;
let startX;
let scrollLeft;

if (slider) {
  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("touchmove", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("touchmove", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("touchcancel", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return; // stop the fn from running
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
  });

  slider.addEventListener("touchstart", (e) => {
    if (!isDown) return; // stop the fn from running
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
  });
}

// $(".timeline__list").slick({
//   variableWidth: true,
//   slidesToShow: 2,
//   infinite: false,
// });

function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollLeft();
  var docViewBottom = docViewTop + $(window).width();

  var elemTop = $(elem).offset().left;
  var elemBottom = elemTop + $(elem).width();

  return elemBottom <= docViewBottom && elemTop >= docViewTop;
}

$(".timeline__list").scroll(function () {
  $(".timeline__item").each(function () {
    if (isScrolledIntoView(this) === true) {
      $(this).addClass("timeline__item--visible");
    } else {
      $(this).removeClass("timeline__item--visible");
    }
  });
});

let baron;

if (baron) {
  baron(".timeline__wrapper");
}

//$(".timeline__wrapper").each(element, new SimpleBar());

// const accordions = document.querySelectorAll(".accordion");
// for (const accordion of accordions) {
//   const panels = accordion.querySelectorAll(".accordion__panel");
//   //const panelsInner = accordion.querySelectorAll(".accordion__panel-inner");

//   for (const panel of panels) {
//     const head = panel.querySelector(".accordion__header");
//     head.addEventListener("click", () => {
//       for (const otherPanel of panels) {
//         if (otherPanel !== panel) {
//           otherPanel.classList.remove("accordion__panel--expanded");
//         }
//       }
//       panel.classList.toggle("accordion__panel--expanded");
//       //panel.nextElementSibling.classList.toggle("active");
//     });
//   }

//   // for (const panelInner of panelsInner) {
//   //   const head = accordion.querySelector(".accordion__header-inner");
//   //   head.addEventListener("click", () => {
//   //     for (const otherPanelInner of panelsInner) {
//   //       if (otherPanelInner !== panelsInner) {
//   //         otherPanelInner.classList.remove("accordion__panel-inner--expanded");
//   //       }
//   //     }
//   //     panelInner.classList.toggle("accordion__panel-inner--expanded");
//   //   });
//   // }
// }

$(".accordion__panel .accordion__header").click(function (e) {
  //e.preventDefault();
  var $this = $(this);
  // $this.parent().next().removeClass("accordion__panel--expanded");
  // $this.parent().prev().removeClass("accordion__panel--expanded");

  //$this.parent().toggleClass("accordion__panel--expanded");
  // $(".accordion__header").removeClass("accordion__header--expanded");
  $this.toggleClass("accordion__header--expanded");

  if ($this.children().find(".accordion__panel") != true) {
    console.log("blaaa");
    $(".accordion__header").removeClass("accordion__header--expanded");
    $this.prev().addClass("accordion__header--expanded");

    $this.toggleClass("accordion__header--expanded");
  }

  if ($this.next().hasClass("show")) {
    $this.next().removeClass("show");
    $this.next().slideUp(350);
  } else {
    $this.parent().parent().find(".accordion__body").removeClass("show");
    $this.parent().parent().find(".accordion__body").slideUp(350);
    $this.next().toggleClass("show");
    $this.next().slideToggle(350);
  }
});

//получаем случайное число от min до max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//выбираем случайный фон для страницы 404, сам объект pageNotFoundObj находится на странице
function setRandomBackground() {
  if (typeof pageNotFoundObj != "undefined") {
    var randomNum = getRandomInt(0, pageNotFoundObj.length - 1);
    //console.log(pageNotFoundObj[randomNum].pic);
    $(".error-page").css(
      "background-image",
      "url(" + pageNotFoundObj[randomNum].pic + ")"
    );
    $(".error-page__text").html(pageNotFoundObj[randomNum].desc);
  }
}
setRandomBackground();

const tabsBtn = document.querySelectorAll(".tabs__nav-btn");
const tabsItems = document.querySelectorAll(".tabs__item");

tabsBtn.forEach(onTabClick);

function onTabClick(item) {
  item.addEventListener("click", function () {
    let currentBtn = item;
    let tabId = currentBtn.getAttribute("data-tab");
    let currentTab = document.querySelector(tabId);

    if (!currentBtn.classList.contains("active")) {
      tabsBtn.forEach(function (item) {
        item.parentNode.classList.remove("active");
      });

      tabsItems.forEach(function (item) {
        item.classList.remove("active");
      });

      currentBtn.parentNode.classList.add("active");
      currentTab.classList.add("active");
    }

    $(".tabs__item-slider").slick("refresh");
  });
}

if (document.querySelector(".tabs__nav-btn")) {
  document.querySelector(".tabs__nav-btn").click();
  $(".tabs__item-slider").slick("refresh");
}

$(".events__custom-select").click(function () {
  $(this).toggleClass("events__custom-select--active");
});

// $(".events__filter-item a").click(function (event) {
//   event.preventDefault();
//   var par = $(this).parents(".events__custom-select");
//   $(".events__select-value", par).text($.trim($(this).text()));
// });

var nonLinearStepSlider = document.getElementById("filter-range");

if (nonLinearStepSlider) {
  noUiSlider.create(nonLinearStepSlider, {
    start: [0, 500],
    snap: true,
    connect: true,
    range: {
      min: 0,
      "20%": 6,
      "40%": 12,
      "60%": 18,
      "80%": 30,
      max: 65,
    },
    pips: {
      mode: "steps",
      values: [0, 6, 12, 18, 30, 65],
      density: 20,
    },
  });
}

$(".lightgallery").lightGallery({
  share: false,
  pager: false,
  subHtmlSelectorRelative: false,
  share: false,
  zoom: false,
  autoplay: false,
  autoplayControls: false,
  download: false,
  fullScreen: false,
  counter: false,
  enableDrag: false,
});

$(".gallery__btn").click(function () {
  $(this).next().find("a").trigger("click");
});

$(function () {
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: "onLeave",
      duration: "200%", // this works just fine with duration 0 as well
      // However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
      // Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
      offset: 50, // start this scene after scrolling for 50px
    },
  });

  if (window.innerWidth > 1440) {
    // get all slides
    var slides = document.querySelectorAll(".main-slider");

    if (slides) {
      // create scene for every slide
      for (var i = 0; i < slides.length; i++) {
        new ScrollMagic.Scene({
          triggerElement: slides[i],
        })
          .setPin(slides[i], { pushFollowers: false })
          //.addIndicators() // add indicators (requires plugin)
          .addTo(controller);
      }
    }
  }
});

AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 200, // offset (in px) from the original trigger point
  delay: 200, // values from 0 to 3000, with step 50ms
  duration: 500, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

$(".excursions__list-filter-link a").on("click", function (e) {
  e.preventDefault();
  const copyText = $(this).prop("href");
  console.log(copyText);
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(copyText).select();
  document.execCommand("copy");
  $temp.remove();
  document.execCommand("copy");
  $(this)
    .find(".excursions__list-filter-link-success")
    .addClass("excursions__list-filter-link-success--visible");
  setTimeout(() => {
    $(this)
      .find(".excursions__list-filter-link-success")
      .removeClass("excursions__list-filter-link-success--visible");
  }, 800);
});
