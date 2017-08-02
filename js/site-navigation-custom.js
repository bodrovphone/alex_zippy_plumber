$.scrollTo = $.fn.scrollTo = function(x, y, options){
    if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);

    options = $.extend({}, {
        gap: {
            x: 0,
            y: 0
        },
        animation: {
            easing: 'easeInOutQuart', // scroll animation type, you can play with it, picking up the options from 'easing.js'
            duration: 950,
            complete: $.noop,
            step: $.noop
        }
    }, options);

    return this.each(function(){
        var elem = $(this);
        elem.stop().animate({
            scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
            scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y - 80
        }, options.animation);
    });
};



/* * ~~~~~~~~~~~ Mobile Navigation starts ~~~~~~~~~~ * */


'use strict';

var zippyNav = zippyNav || {};
    
zippyNav.mobileNavigation = {   
    initNav: function () {
        // Opens the main side nav menu
        $('#open-side-nav').click(function (e) {
            e.preventDefault();
            $('#mobile-navigation, html').addClass('open');
        });

        // Closes the main side nav menu
        $('#close-side-nav').click(function (e) {
            e.preventDefault();
            $('#mobile-navigation, html').removeClass('open');
        });

        /*
         * Finds url, name and sub menu items for the current navigation item clicked if it has a subnav
         * and placed said items into subcontent nav before displaying it
         */
        $('.has-subnav').click(function (e) {
            e.preventDefault();
            
            var thisHash = this.hash,
                parentContainer = $('#mobile-menu-nav-container');
                
            parentContainer.find(thisHash).show();
            parentContainer.addClass('subnav-open');
        });

        // Hides inner subcontent menu
        $('.close-main-subnav').click(function (e) {
            e.preventDefault();
            var parentContainer = $('#mobile-menu-nav-container');
            parentContainer.removeClass('subnav-open').find('ul.mobile-menu-main-subnav').delay(500).hide(0);
            
        });

        // Enables closing of side nav when transparent div on menu clicked
        $('.mobile-menu-transparent').click(function () {
            $('.mobile-navigation-bootstrap3').removeClass('transform-active');
        });
    },

    setCurrentActive: function () {
        // Set current nav link to active
        var path = window.location.pathname.split('/')[1];
        path = '/' + path + '/';

        $('ul#mobile-menu-main-nav li').each(function () {
            var href = $(this).attr('href');
            if (path === href) {
                $(this).addClass('current');
                return false;
            }
        });
    },

    init: function() {
        this.initNav();
        this.setCurrentActive();
    }

};

$(function() {
    zippyNav.mobileNavigation.init();
});

/* * ~~~~~~~~~~~ Mobile Navigation ends ~~~~~~~~~~ * */


$(document).ready(function(){

    /* *~~~~~~~~~ Dropdown menu add 'active' class on hover ~~~~~~~~~* */

    $(".menu_con .main_menu > ul > li.drop-down-tab").hover(function() {
        $(this).addClass("active");
    }, function() {
        $(this).removeClass("active");
    });

    /* *~~~~~~~~~ After scroll - menu functions ~~~~~~~~~* */
    
    $(window).scroll(function(){
        var window_top = $(window).scrollTop() + 110; 
        var div_top = $('#nav-anchor').offset().top;
            if (window_top > div_top) {
                $('aside, #mobile-header').addClass('sticky');
            } else {
                $('aside, #mobile-header').removeClass('sticky');
            }
        if ($(this).scrollTop() >= 100) { // if the user has scrolled the webpage 100px or more from the top
            $('header.header-custom, header.sub-header-custom, aside > ul').removeClass('splash').addClass('sticky');
            $('#call-now').css({'display':'inline'});

        }
        else {
            $('header.header-custom, header.sub-header-custom, #mobile-header, aside > ul').removeClass('sticky').addClass('splash');
            $('#call-now').css({'display':'none'});
        }    
    });

    $("aside a").click(function(evn){
        evn.preventDefault();
        $('html,body').scrollTo(this.hash, this.hash); 
    });
    
    var aChildren = $("aside li").children(); 
    var aArray = []; 
    for (var i=0; i < aChildren.length; i++) {    
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } 

    /* * ~~~~~~ Keep the curent menu item for the section active, on section scroll ~~~~~~ * */
    
    $(window).scroll(function(){
        var windowPos = $(window).scrollTop();
        var windowHeight = $(window).height();
        var docHeight = $(document).height();

        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var nav = $(theID);
            if(nav.length) {
                var divPos = nav.offset().top - 80;
                var divHeight = nav.height();
                if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                    $("a[href='" + theID + "']").addClass("nav-active");
                } else {
                    $("a[href='" + theID + "']").removeClass("nav-active");
                }
            }    
        }
        
        if(windowPos + windowHeight == docHeight) {
            if (!$("aside li:last-child a").hasClass("nav-active")) {
                var navActiveCurrent = $(".nav-active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
                $("aside li:last-child a").addClass("nav-active");
            }
        }
    });

// Hiding topnavbar onscroll
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.header-top').outerHeight();

    $(window).scroll(function(event){
      didScroll = true;
    });

    // run hasScrolled() and reset didScroll status
    setInterval(function() {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);
    function hasScrolled() {
      var st = $(this).scrollTop();
      if (Math.abs(lastScrollTop - st) <= delta)
        return;

      if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $('.header-top').removeClass('nav-down').addClass('nav-up');
        $('header').addClass('header-up');
        $('aside.sticky').removeClass('scrollUp');
        $('.header-bottom').addClass('header-bottom-up');
      } else {
        // Scroll Up
        // If did not scroll past the document (possible on mac)...
      if(st + $(window).height() < $(document).height()) { 
        $('.header-top').removeClass('nav-up').addClass('nav-down');
        $('header').removeClass('header-up');
        $('aside.sticky').addClass('scrollUp');
        $('.header-bottom').removeClass('header-bottom-up');
      } }
      lastScrollTop = st;
}
});