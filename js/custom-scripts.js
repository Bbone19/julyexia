(function($) {
    
  'use strict';


  /**
   * =====================================
   * Function for windows height and width      
   * =====================================
   */
  function windowSize( el ) {
    var result = 0;
      if("height" == el)
        result = window.innerHeight ? window.innerHeight : $(window).height();
      if("width" == el)
        result = window.innerWidth ? window.innerWidth : $(window).width();

      return result; 
  }


  /**
   * =====================================
   * Function for windows height and width      
   * =====================================
   */
  function deviceControll() {
    if( windowSize( 'width' ) < 768 ) {
      $('body').removeClass('desktop').removeClass('tablet').addClass('mobile');
    }
    else if( windowSize( 'width' ) < 992 ){
      $('body').removeClass('mobile').removeClass('desktop').addClass('tablet');
    }
    else {
      $('body').removeClass('mobile').removeClass('tablet').addClass('desktop');
    }
  }



  /**
   * =====================================
   * Function for email address validation         
   * =====================================
   */
  function isValidEmail(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
  };



  /**
   * =======================================
   * Function: Home Section Fullscreen View.
   * =======================================
   */
  var fullscreen_home = function() {
    $('.section-separator').each(function() {
      
      var top = Math.max($(window).height() / 2 - $(this)[0].offsetHeight / 2, 0);

      if( top > 60 ) {
        $(this).css({
          'padding-top':      top + "px", 
          'padding-bottom':   top + "px",
          'position':         'relative'
        })
      }else {
        $(this).css({
          'padding-top':      60 + "px", 
          'padding-bottom':   60 + "px",
          'position':         'relative'
        })
      }
    });
    
  }


  var asideHeight = function() {
    
    if( windowSize( 'width' ) > 991 ) {
      // ASide height 
      $('.aside').height( windowSize( 'height' ) );
    }
    else {
      // ASide height 
      $('.aside').height( 'initial' );
    }

  }


  $(window).on('resize', function() {

    asideHeight();
    deviceControll();

  });


  $(document).on('ready', function() {

    asideHeight();
    deviceControll();



    if( windowSize( 'width' ) > 991 ) var scrollOverflow = true;
    else var scrollOverflow = false;

    $('#content-js').fullpage({
      scrollOverflow: scrollOverflow,
      css3: true,
      controlArrows: true,
      keyboardScrolling: true,
      scrollingSpeed: 700,
      autoScrolling: true,
      fitToSection: true,
      fitToSectionDelay: 1000,
      scrollBar: false,
      easing: 'easeInOutCubic',
      easingcss3: 'ease',
      navigation: true,
      navigationPosition: 'right',
      navigationTooltips: ['HOME PAGE', 'PROFESSIONAL SKILLS', 'EXPERIENCE', 'LATEST WORKS', 'TEXT SECTION', 'CONTACT US'],
      responsiveWidth: 992
    });




    /**
     * ===============================
     * Button Innet HTML code Import
     * ===============================
     */
    $('.btn-js').each( function() {
      var btnText = $(this).html(),
          dataText = $(this).attr('data-text'),
          innerText = '',
          animationDelay = 0;

      for (var i = 0; i < dataText.length; i++) {
        if( dataText[i] == ' ' )
          innerText += "<span>&nbsp;</span>";
        else 
          innerText += "<span>" + dataText[i] + "</span>";
      }
      $(this).append( innerText );
    });



    /**
     * =======================================
     * Top Fixed Navbar
     * =======================================
     */
    $(document).on('scroll', function() {
      var scrollPos = $(this).scrollTop();

      if( scrollPos > 10 ) {
        $('.navbar-fixed-top').addClass('navbar-home');
      } 
      else {
        $('.navbar-fixed-top').removeClass('navbar-home');
      }
    });



    /**
     * ==================================
     * Instragram Image
     * ==================================
     */
    if( $('.instragramFeed').length ) {
      jQuery.fn.spectragram.accessData={
        accessToken:'2136707.4dd19c1.d077b227b0474d80a5665236d2e90fcf',
        clientID:'4dd19c1f5c7745a2bca7b4b3524124d0'
      };
      $('.instragramFeed').spectragram('getUserFeed', {
        query: 'adrianengine', //this gets the recent photo feed tagged with the word: converse
        size: 'small',
        max: 9
      });
    }



    /**
     * ============================
     * CONTACT FORM
     * ============================
    */
    $("#contact-form").on('submit', function(e) {
      e.preventDefault();
      var success = $(this).find('.email-success'),
        failed = $(this).find('.email-failed'),
        loader = $(this).find('.email-loading'),
        postUrl = $(this).attr('action');

      var data = {
        name: $(this).find('.contact-name').val(),
        email: $(this).find('.contact-email').val(),
        budgetRange: $(this).find('.contact-budget-range').val(),
        message: $(this).find('.contact-message').val()
      };

      console.log(data);

      if ( isValidEmail(data['email']) && (data['message'].length > 1) && (data['name'].length > 1) ) {
        $.ajax({
          type: "POST",
          url: postUrl,
          data: data,
          beforeSend: function() {
            loader.fadeIn(1000);
          },
          success: function(data) {
            loader.fadeOut(1000);
            success.delay(500).fadeIn(1000);
            failed.fadeOut(500);
          },
          error: function(xhr) { // if error occured
            loader.fadeOut(1000);
            failed.delay(500).fadeIn(1000);
            success.fadeOut(500);
          },
          complete: function() {
            loader.fadeOut(1000);
          }
        });
      } else {
        loader.fadeOut(1000);
        failed.delay(500).fadeIn(1000);
        success.fadeOut(500);
      }

      return false;
    });



    
    /**
     * ==============================
     * Navigation Icon          
     * ==============================
     */
    var navigationTrigger = $('.nav-trigger');

    navigationTrigger.on('click', function(e){
      e.preventDefault();
      navigationClick( e );
    });
    $('#navbar-nav li a').on('click', function(e){
      navigationClick( e );
    });

    var navigationClick = function( action ) {

      var navigation = $( navigationTrigger.attr('href') ),
          outerArea  = navigationTrigger.closest('.navbar-header');
    
      if( navigationTrigger.hasClass('nav-visible') ) {
        navigationTrigger.removeClass('nav-visible');
        navigation.removeClass('nav-clickable nav-visible');
        navigation.find('.btn').removeClass( 'noDelay' );
        setTimeout(function() {
          outerArea.delay(600).addClass('background-color');
        }, 600);
      } else {
        navigationTrigger.addClass('nav-visible');
        navigation.addClass('nav-visible');
        outerArea.removeClass('background-color');
        setTimeout(function() {
          navigation.find('.btn').addClass( 'noDelay' );
        }, 1000);
      }
    }
  });

  /** 
   * ===============================
   * Flex Slider
   * ===============================
   */
  // var $ = jQuery.noConflict();
  $(window).load(function() {
    $('.flexslider').flexslider({
          animation: "fade"
    });

    // $('.prev').html("<span class='icon-wrap'></span>");
    // $('.next').html("<span class='icon-wrap'></span>");;
  });


} (jQuery) );

