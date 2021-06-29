$(document).ready(function () {

	// поменять на ссылку сервера, на гите так не работат
	var link = 'https://julianeustroeva.github.io/azbuka';

    // прокрутк в галереии
    var sticky = new Sticky(".sticky");
    sticky.update();

    // меню
    $(".hamburger").on("click", function () {
        $("html, body").addClass("--active");
        $(".menu").fadeIn(0);
    });
    $(".menu__close, .menu__panel, .menu__link").on("click", function () {
        $("html, body").removeClass("--active");
        $(".menu").fadeOut(0);
    });

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
            }
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
            }
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
                700
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
        }
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

    // ajax запрос
    $(".letter").on("click", function () {
        var page = $(this).data("page");
        requestPage(page);
    });

    const removePopup = () => {
        $("html, body").removeClass("--active");
        $(".ajax-modal").hide();
    };

    $(document).on("click", ".back-link", function () {
        history.pushState(
            "",
            document.title,
            window.location.pathname + window.location.search
        );
        removePopup();
    });

    const processLocationHash = () => {
        location.hash && requestPage(location.hash.split(`/`)[1]);
    };

    window.addEventListener("hashchange", () => {
        !location.hash && removePopup();
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
	function color_each(s) {
		var new_s = '<z class="letter">' + s + '</z>';
		return new_s;
	}

	// собираем массив букв
	string = $('.string-color').text();
	str = string.split('');

	// строим массив из букв с тегами для перекраски
	var new_text = '';

	$.each( str ,function(index,value){
		new_text = new_text + color_each(value);
	});

	// заменяем текст на текст с буквами для перекраски
	$('.string-color').html( new_text );

	// перекрашивание фона по наведению на букву
	$('.string-color z').hover(function () {

		// если не пробел, не знаки препинания
		if( $(this).text().replace(/\s+/g, '') != '' && $(this).text() != '.' && $(this).text() != ',' && $(this).text() != '—'  ) {
			$(this).css('color', '#fff');

		   var bg_col = a_azbuka[ $(this).text().toLowerCase() ]['color'];
		   var az_name = a_azbuka[ $(this).text().toLowerCase() ]['nick'];

		   $('.azbuka-namer span').text(az_name);

		   var z_w =  $('.azbuka-namer').outerWidth() / 2 ;

		   // положение ника
		   $('.azbuka-namer').css({
			   'top': $(this).offset().top - 92,
			   'left': $(this).offset().left - z_w + ( $(this).outerWidth() / 2 ),
			   'display': 'flex'
		   });

		   $('body').css('background', '#' + bg_col);
		}
	},

	// возвращаем стандартный фон и цвет буквы при уходе курсора с буквы
	function () {
		$('body').css('background', '');
		$(this).css('color', '');

		$('.azbuka-namer').css({
			'display': 'none'
		});
	});

	// нажатие на букву
	$('.string-color z').click( function () {
		var az_link = a_azbuka[ $(this).text().toLowerCase() ]['link'];
		var az_name = a_azbuka[ $(this).text().toLowerCase() ]['nick'];

		// если ссылка не пустая
		if( az_link != '' ) {

			console.log('ссылка - ' + az_link );

		} else {
			console.log('нет ссылки - /#/' + az_name.toLowerCase() + '.html' );
			console.log(link + '/#/' + az_name.toLowerCase() + '.html');

			window.location.href = link + '/#/' + az_name.toLowerCase() + '.html';

		}
	});

	// массив имен и цветов
	a_azbuka = {

		'а' : {
			'nick' : 'Aske',
			'color' : 'E74330',
			'link' : '',
		},

		'б' : {
			'nick' : 'Roof 169',
			'color' : 'BE3F28',
			'link' : '',
		},

		'в' : {
			'nick' : 'Revansh',
			'color' : '22686C',
			'link' : '',
		},

		'г' : {
			'nick' : 'Luka',
			'color' : 'CAACA4',
			'link' : '',
		},

		'д' : {
			'nick' : 'Slak',
			'color' : 'E11E1A',
			'link' : '',
		},

		'е' : {
			'nick' : 'Kamar',
			'color' : '86CFEB',
			'link' : '',
		},

		'ё' : {
			'nick' : 'Pacer',
			'color' : 'DF6768',
			'link' : '',
		},

		'ж' : {
			'nick' : 'Rtue',
			'color' : 'E68914',
			'link' : '',
		},

		'з' : {
			'nick' : 'Super',
			'color' : '16698E',
			'link' : '',
		},

		'и' : {
			'nick' : 'Sugar 18',
			'color' : '9E524A',
			'link' : '',
		},

		'й' : {
			'nick' : 'Pokras',
			'color' : 'BA332A',
			'link' : '',
		},

		'к' : {
			'nick' : 'Квадрат',
			'color' : '8BDAAB',
			'link' : '',
		},

		'л' : {
			'nick' : 'Sneksy',
			'color' : 'F15A2A',
			'link' : '',
		},

		'м' : {
			'nick' : 'Taur',
			'color' : '00AEAC',
			'link' : '',
		},

		'н' : {
			'nick' : 'Issue',
			'color' : '999999',
			'link' : '',
		},

		'о' : {
			'nick' : 'Baks',
			'color' : 'D09EDF',
			'link' : '',
		},

		'п' : {
			'nick' : 'Kreemos',
			'color' : 'B1B1B1',
			'link' : '',
		},

		'р' : {
			'nick' : 'Persh',
			'color' : '1f248c',
			'link' : '',
		},

// Р - Brosk / 1f248c - ДОБВИЛА САМА - в их файле уже такого нет


		'с' : {
			'nick' : 'Aber',
			'color' : '636363',
			'link' : '',
		},

// С - Aber / 636363 - добвила сама

		'т' : {
			'nick' : 'Keno',
			'color' : 'e09d49',
			'link' : '',
		},

// Т - Keno / Кено FFE6B3 ИСПРАВИЛА НА e09d49

		'у' : {
			'nick' : 'Jekie Dugn',
			'color' : '848120',
			'link' : '',
		},

		'ф' : {
			'nick' : 'Petro',
			'color' : '740f1c',
			'link' : '',
		},

// Ф - Petro / 740f1c САМА ДОБАВИЛА

		'х' : {
			'nick' : 'Zmogk',
			'color' : '541B38',
			'link' : '',
		},

		'ц' : {
			'nick' : 'Nootk!',
			'color' : 'F1AB89',
			'link' : '',
		},

		'ч' : {
			'nick' : 'Dickey',
			'color' : '74A2C6',
			'link' : '',
		},

		'ш' : {
			'nick' : 'Znag',
			'color' : 'DAA8B8',
			'link' : '',
		},

		'щ' : {
			'nick' : 'Biggie K',
			'color' : '00ADD9',
			'link' : '',
		},

		'ъ' : {
			'nick' : 'Wais',
			'color' : '72716C',
			'link' : '',
		},

		'ы' : {
			'nick' : 'Letme',
			'color' : '726B5E',
			'link' : '',
		},

		'ь' : {
			'nick' : 'Akue',
			'color' : 'FB0000',
			'link' : '',
		},

		'э' : {
			'nick' : 'Truba',
			'color' : '4BA5EE',
			'link' : '',
		},

		'ю' : {
			'nick' : 'Shozy',
			'color' : '585F69',
			'link' : '',
		},

		'я' : {
			'nick' : 'nick',
			'color' : 'ffc000', // должен быть 000, но текст не будет читаться, сделал золотой
			'link' : '',
		},

	}


});
