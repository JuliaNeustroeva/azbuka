$(document).ready(function () {
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
                alert("Error!");
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
});
