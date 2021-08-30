$(document).ready(function () {
  const ORIGIN = `${location.origin}/azbuka/`;

  // прокрутк в галереии
  var sticky = new Sticky(".sticky");
  sticky.update();

  // меню
  $(".hamburger").on("click", function () {
    $("html, body").addClass("--active");
    $(".menu").fadeIn(0);
  });
  $(".menu__close, .menu__panel, .menu__link").on(
    "click",
    function () {
      $("html, body").removeClass("--active");
      $(".menu").fadeOut(0);
    },
  );

  // бегущая строка
  $(".marquee").simplemarquee({
    speed: 50,
    direction: "left",
    handleHover: false,
    space: 0,
    cycles: "Infinity",
    delayBetweenCycles: 100,
  });

  // подсказки
  $(".tooltip").tooltipster({
    theme: "my-custom-theme",
    delay: 0,
    animationDuration: 0,
    animation: "fade",
  });
  $(".tooltip").each(function () {
    const bg = $(this).data("bg");
    const logoHover = "../images/ico/logo-active.svg";
    const logo = "../images/ico/logo.svg";

    $(this).hover(
      function () {
        $(".manifest").css({
          background: "#" + bg,
        });
        $(".logo").css({
          backgroundImage: "url(" + logoHover + ")",
        });
      },

      function () {
        $(".manifest").css({
          background: "white",
        });
        $(".logo").css({
          backgroundImage: "url(" + logo + ")",
        });
      },
    );
  });

  // показать скрытый текст
  $(document).on("click", ".hidden-btn", function () {
    $(this)
      .parents(".hidden-parent")
      .find(".hidden-text")
      .toggleClass("--active");

    if ($(this).text() === "Читать дальше ↓") {
      $(this).text("Свернуть");
    } else {
      $(this).text("Читать дальше ↓");
    }
  });

  // первая буква художника
  $(".painter__link").each(function () {
    const ru = $(this).data("ru");
    const en = $(this).data("en");
    const myLetter = $(this).data("letter");
    const color = $(this).data("color");
    const letter = $(".painter__letter");

    $(this).hover(
      function () {
        $(this).text(ru);
        letter.html(myLetter).css({
          color: color,
        });
      },
      function () {
        $(this).text(en);
        letter.text("");
      },
    );
  });

  // наедение на буквув артиста на внутренней
  $(document)
    .on("mouseenter", ".artist__letter", function () {
      var color = $(this).data("color");
      $(this).css({
        background: color,
      });
    })
    .on("mouseleave", ".artist__letter", function () {
      $(this).css({
        background: "none",
      });
    });

  // якоря
  $("[data-href]").on("click", function (t) {
    var anchor = $(this).data("href");
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $("[data-anchor=" + anchor + "]").offset().top,
        },
        700,
      );
    t.preventDefault();
  });

  // открыть галерею
  $(".gallery__action").on("click", function () {
    $(".popup").addClass("--active");
    $("html, body").addClass("--active");
  });
  $(".popup__close").on("click", function () {
    $(".popup").removeClass("--active");
    $("html, body").removeClass("--active");
  });

  // instagram
  $(".slider").each(function (idx, item) {
    $(this)
      .attr("id", "NAME_" + idx)
      .slick({
        slidesToScroll: 1,
        slidesToShow: 1,
        swipe: false,
        pauseOnFocus: false,
        arrows: false,
        speed: 0,
        fade: true,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              dots: true,
              appendDots: $(".events-slider__dots"),
            },
          },
        ],
      });
  });
  $(".about__inst-inner").hover(
    function () {
      $(".slider").each(function () {
        $(this).slick("slickNext");
      });
    },
    function () {
      // тут ничего
    },
  );

  const requestPage = (url) => {
    $("html, body").addClass("--active");
    $(".ajax-modal").show();

    $.ajax({
      url,
      type: "GET",
      beforeSend: function () {
        $(".ajax-modal").empty();
      },
      success: function (responce) {
        $(".ajax-modal").append(responce);

        // слайдер на внутренней
        if ($(window).width() < 767) {
          $(".artist__right").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            appendDots: $(".artist__dots"),
          });
        }
      },
      error: function () {
        // выводим ошибку в консоль
        console.log("Error!");
      },
    });
  };

  const removePopup = () => {
    $("html, body").removeClass("--active");
    $(".ajax-modal").hide();
  };

  $(document).on("click", ".back-link", function () {
    history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search,
    );
    removePopup();
  });

  const processLocationHash = () => {
    if (location.hash.split(`/`)[1]) {
      requestPage(location.hash.split(`/`)[1]);
    }
  };

  window.addEventListener("hashchange", () => {
    processLocationHash();
  });

  processLocationHash();

  // слайдре о нас пишут
  $(".slider-about").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $(""),
    speed: 0,
    nextArrow: $(".about__next"),
    dots: true,
    appendDots: $(".about__dots"),
  });
  // галерея
  if ($(window).width() > 1279) {
    $(".popup__slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: $(".popup__prev"),
      nextArrow: $(".popup__next"),
      speed: 0,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            arrows: false,
            centerMode: true,
            centerPadding: "",
          },
        },
      ],
    });
  }

  // возвращаем букву в теге для захвата объекта
  var tag_z = $("#tag-z");

  tag_z.attr("id", "").addClass("letter");

  // собираем массив букв
  string = $(".string-color").text().trim();
  str = string.split("");

  $(".string-color").text("");

  // строим массив из букв с тегами для перекраски
  var new_text = "";

  $(".string-color").append(
    $(".string-color").parent().find(".manifest__title"),
  );

  $.each(str, function (index, value) {
    // new_text = new_text + color_each(value);

    var new_s = tag_z.clone(true).text(value);

	if( value != '') {
		$(".string-color").append(new_s);
	}

  });

  // перекрашивание фона по наведению на букву
  $(".string-color z").hover(
    function () {
      // если не пробел, не знаки препинания
      if (
        $(this).text().replace(/\s+/g, "") != "" &&
        $(this).text() != "." &&
        $(this).text() != "," &&
        $(this).text() != "—" &&
        $(this).text() != "-"
      ) {
        $(this).css("color", "#fff");

        var bg_col = a_azbuka[$(this).text().toLowerCase()]["color"];
        var az_name = a_azbuka[$(this).text().toLowerCase()]["nick"];

        $(".azbuka-namer span").text(az_name);

        var z_w = $(".azbuka-namer").outerWidth() / 2;

        // положение ника
        $(".azbuka-namer").css({
          top:
            $(this).offset().top - $(".azbuka-namer").height() - 13,
          left:
            $(this).position().left - z_w + $(this).outerWidth() / 2,
          display: "flex",
        });

        $("body").css("background", "#" + bg_col);

		// заменяем лого
		$('.logo').addClass('logo-invert');
      }
    },

    // возвращаем стандартный фон и цвет буквы при уходе курсора с буквы
    function () {
      $("body").css("background", "");
      $(this).css("color", "");

      $(".azbuka-namer").css({
        display: "none",
      });

	  // возвращаем лого
	  $('.logo').removeClass('logo-invert');
    },
  );

  // нажатие на букву
  $(".string-color z").on("click", function () {
    const page = $(this).data("page");
    window.location.href = ORIGIN + "#/" + page;
  });

  // массив имен и цветов
  a_azbuka = {
    а: {
      nick: "Aske",
      color: "E74330",
      link: "aske.html",
    },

    б: {
      nick: "Roof 169",
      color: "BE3F28",
      link: "roof-169.html",
    },

    в: {
      nick: "Revansh",
      color: "22686C",
      link: "revansh.html",
    },

    г: {
      nick: "Luka",
      color: "CAACA4",
      link: "luka.html",
    },

    д: {
      nick: "Slak",
      color: "E11E1A",
      link: "slak.html",
    },

    е: {
      nick: "Kamar",
      color: "86CFEB",
      link: "kamar.html",
    },

    ё: {
      nick: "Pacer",
      color: "DF6768",
      link: "pacer.html",
    },

    ж: {
      nick: "Rtue",
      color: "E68914",
      link: "rtue.html",
    },

    з: {
      nick: "Super",
      color: "16698E",
      link: "super.html",
    },

    и: {
      nick: "Sugar 18",
      color: "9E524A",
      link: "sugar-18.html",
    },

    й: {
      nick: "Pokras",
      color: "BA332A",
      link: "pokras-lampas.html",
    },

    к: {
      nick: "Квадрат",
      color: "8BDAAB",
      link: "kvadrat.html",
    },

    л: {
      nick: "Sneksy",
      color: "F15A2A",
      link: "sneksy.html",
    },

    м: {
      nick: "Taur",
      color: "00AEAC",
      link: "taur.html",
    },

    н: {
      nick: "Issue",
      color: "999999",
      link: "issue.html",
    },

    о: {
      nick: "Baks",
      color: "D09EDF",
      link: "baks.html",
    },

    п: {
      nick: "Kreemos",
      color: "B1B1B1",
      link: "kreemos.html",
    },

    р: {
      nick: "Persh",
      color: "1f248c",
      link: "persh.html",
    },

    с: {
      nick: "Aber",
      color: "636363",
      link: "aber.html",
    },

    т: {
      nick: "Keno",
      color: "e09d49",
      link: "keno.html",
    },

    у: {
      nick: "Jekie Dugn",
      color: "848120",
      link: "jekie-dugn.html",
    },

    ф: {
      nick: "Petro",
      color: "740f1c",
      link: "petro.html",
    },

    х: {
      nick: "Zmogk",
      color: "541B38",
      link: "zmogk.html",
    },

    ц: {
      nick: "Nootk!",
      color: "F1AB89",
      link: "nootk.html",
    },

    ч: {
      nick: "Dikey",
      color: "74A2C6",
      link: "dikey.html",
    },

    ш: {
      nick: "Znag",
      color: "DAA8B8",
      link: "znag.html",
    },

    щ: {
      nick: "Biggie K",
      color: "00ADD9",
      link: "biggie-k.html",
    },

    ъ: {
      nick: "Wais",
      color: "72716C",
      link: "wais.html",
    },

    ы: {
      nick: "Letme",
      color: "726B5E",
      link: "letme.html",
    },

    ь: {
      nick: "Akue",
      color: "FB0000",
      link: "akue.html",
    },

    э: {
      nick: "Truba",
      color: "4BA5EE",
      link: "truba.html",
    },

    ю: {
      nick: "Shozy",
      color: "585F69",
      link: "shozy.html",
    },

    я: {
      nick: "nick",
      color: "ffc000", // должен быть 000, но текст не будет читаться, сделал золотой
      link: "name.html",
    },
  };

  $(".string-color z").each(function () {
    var value = $(this).text();

    if (
      value.replace(/\s+/g, "") != "" &&
      value != "." &&
      value != "," &&
      value != "—" &&
      value != "-"
    ) {
      $(this).attr(
        "data-page",
        a_azbuka[value.toLowerCase()]["link"],
      );
    }
  });
});
