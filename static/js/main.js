var menu_selector = "nav ul"; // Переменная должна содержать название класса или идентификатора, обертки нашего меню. 
function onScroll(){
    var scroll_top = $(document).scrollTop();
    $('.nav-header').each(function(){
        var headerHeight = $('.header').outerHeight();
        if (scroll_top >= headerHeight) {
            $(".what_i_do").addClass("active");
            $(".nav-header").addClass("active");
        } else {
            $(".what_i_do").removeClass("active");
            $(".nav-header").removeClass("active");
        }
    });

	$(menu_selector + " a").each(function(){
		var hash = $(this).attr("href");
        var target = $(hash);
        var id = hash.substring(1, hash.length);
        var copytar = $('.' + id + 'tt');

        var select = this;

        target.each( function() {
            if ($(this).position().top <= scroll_top + 65 && $(this).position().top + $(this).outerHeight() > scroll_top) {
                $(menu_selector + " a.active").removeClass("active");
                $(select).addClass("active");
            } else {
                $(select).removeClass("active");
            }
        });

        copytar.each( function() {
            if ($(this).position().top <= scroll_top + 65 && $(this).position().top + $(this).outerHeight() > scroll_top) {
                $(menu_selector + " a.active").removeClass("active");
                $(select).addClass("active");
            } else {
                //$(select).removeClass("active");
            }
        });   
	});
}

$(document).ready(function () {
    svg4everybody({});

    $('.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        autoplay:true,
        autoplayTimeout: 5000,
        autoplayHoverPause:true
    });

    $(window).scroll( function() {
        onScroll();
        $('.chart').each(function () {
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
    
            if (imagePos < topOfWindow + $(window).height() - 50) {
                $(this).easyPieChart({
                    // The color of the curcular bar. You can pass either a css valid color string like rgb, rgba hex or string colors. But you can also pass a function that accepts the current percentage as a value to return a dynamically generated color.
                    barColor: '#ef1e25',
                    // The color of the track for the bar, false to disable rendering.
                    trackColor: '#f2f2f2',
                    // The color of the scale lines, false to disable rendering.
                    scaleColor: '#dfe0e0',
                    // Defines how the ending of the bar line looks like. Possible values are: butt, round and square.
                    lineCap: 'butt',
                    // Width of the bar line in px.
                    lineWidth: 10,
                    // Size of the pie chart in px. It will always be a square.
                    size: 140,
                    // Time in milliseconds for a eased animation of the bar growing, or false to deactivate.
                    animate: 1500,
            
                    // Callback function that is called at the start of any animation (only if animate is not false).
                    onStart: $.noop,
                    // Callback function that is called at the end of any animation (only if animate is not false).
                    onStop: $.noop
                });
            }
        });

        $('.mov').each(function (){
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
    
            if (imagePos < topOfWindow + $(window).height() - 50) {
                $(this).prop('Counter', 0).animate({  // начальное значение
                    Counter: $(this).data('number')  // в data хранится число конечное
                }, {
                    duration: 2000,  // время 
                    easing: 'swing', // вид анимации
                    step: function (now) { 
                        $(this).text(Math.ceil(now))
                    }
                }) 
                $(this).removeClass('mov');
            }
        });
    });
    // menu mobile
    var link = $('.menu-icon');
    var menu_tranform = $('.menu');

    // paralaxx

    $('.parallax-window-1').parallax({imageSrc: 'static/img/general/bg-header.jpg'});
    $('.parallax-window-2').parallax({imageSrc: 'static/img/content/whatdo5.jpg'});
    $('.parallax-window-3').parallax({imageSrc: 'static/img/content/portfolio.jpg'});
    $('.parallax-window-4').parallax({imageSrc: 'static/img/content/skills.jpg'});
    $('.parallax-window-5').parallax({imageSrc: 'static/img/content/statistic.jpg'});
    $('.parallax-window-6').parallax({imageSrc: 'static/img/content/bg-contact.jpg'});


    link.click(function() {
        link.toggleClass('menu_active');

        var scroll_top = $(document).scrollTop();
        var scroll_top_header = $('.nav-header').position().top;
        menu_tranform.toggleClass('menu_tranform');
        
        if (scroll_top < scroll_top_header) {
            $("html").animate({
                scrollTop: scroll_top_header  + "px"
            }, {
                duration: 700
            }, 
                function(){
                    window.location.hash = hash;
                    jQuery(document).on("scroll", onScroll);
                }
            );
        }


        
        $('body').toggleClass('active');
    })

    $('.grid figcaption a').click( function(e) {
        e.preventDefault();
    });

    $('.grid figure').click( function() {
        $(this).parent().find('.modal-window').addClass('display-plis');
        $('body').toggleClass('active');
    });

    $('.overflow-modal, .out-modal').click( function() {
        $('.modal-window').removeClass('display-plis');
        $('body').toggleClass('active');
    });

    // top header menu click animation

    $(".nav-header a, .header a").click(function(e){
        $(document).off("scroll");
        $(menu_selector + " a.active").removeClass("active");
        $(this).addClass("active");
        var scroll_top = $(document).scrollTop();
        var headerHeight = $('.header').outerHeight();
        var hash = $(this).attr("href");
        var id = hash.substring(1, hash.length);
        var del = 60;
        if (id == "services") {
            if(scroll_top >= headerHeight) {
                del = 0;
            }
            else {
                del = 60
            }        
        }
        $("html").animate({
            scrollTop: $($(this).attr("href")).position().top - del + "px"
        }, {
            duration: 700
        }, 
            function(){
                window.location.hash = hash;
                jQuery(document).on("scroll", onScroll);
            }
        );
        return false;
    });
});