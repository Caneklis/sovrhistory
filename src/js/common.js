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
  autoplay: false,
  autoplaySpeed: 2000,
  infinite: false,
  dots: true,
  arrows: true,
  appendDots: $(".buildings__slider-dots"),
  prevArrow: $(".buildings__slider-prev"),
  nextArrow: $(".buildings__slider-next"),
});

// setTimeout(function () {
//   $(".bla").trigger("click");
// }, 10);

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

function blindVersion() {
  var html = $("html"),
    body = $("body"),
    img = $("img"),
    contrast = $(".js-contrast-version"),
    normal = $(".js-normal-version"),
    font = $(".js-font"),
    contrastCookie = getCookie("contrast"),
    imgCookie = getCookie("img"),
    fontCookie = getCookie("font");

  function show() {
    $("img").show();
    $("svg").show();
    $(".video-container").show();
    $(".video-preview").show();
  }
  function hide() {
    $("svg").hide();
    $("img").hide();
    $(".video-container").hide();
    $(".video-preview").hide();
  }

  contrast.on("click", function () {
    html.addClass("contrast");
    $(this).addClass("active");
    normal.addClass("active");
    hide();
    setCookie("contrast", "on");

    //$grid.masonry();
  });
  normal.on("click", function () {
    html.removeClass("contrast");
    $(this).removeClass("active");
    contrast.addClass("active");
    show();
    setCookie("contrast", "off");

    //$grid.masonry();
  });

  if (contrastCookie == "on") {
    contrast.addClass("active");
    normal.removeClass("active");
    html.addClass("contrast");
    // img.hide();
    hide();
    //$grid.masonry();
  } else {
    contrast.removeClass("active");
    normal.removeClass("active");
    html.removeClass("contrast");
    show();
    //$grid.masonry();
  }
}
blindVersion();

$(".js-example-tokenizer").select2({
  tags: false,
  tokenSeparators: [","],
});

$(function () {
  $(".slick").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
  });

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
