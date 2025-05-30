var MyScroll = "";
(function (window, document, $, undefined) {
  "use strict";
  // ==========================================================
  // Detect mobile device and add class "is-mobile" to </body>
  // ==========================================================

  // Detect mobile device (Do not remove!!!)
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(navigator.userAgent) ? true : false;
  var Scrollbar = window.Scrollbar;
  // Add class "is-mobile" to </body>

  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.preloader();
      Init.header();
      Init.smoothScrollbar();
      Init.textReveal();
      Init.slick();
      Init.niceSelect();
      Init.formValidation();
      Init.contactForm();
      Init.portfolioSlider();
      Init.imageFlipCards();
      Init.initAccordion();
    },

    w: function (e) {
      if (isMobile) {
        $("body").addClass("is-mobile");
      }
    },

    // Preloader
    preloader: function () {
      //setTimeout(function () {
        //$("#preloader").hide("slow");
      //}, 3000);
   // },

   $(".header-logo").css({
    'opacity': '0',
    'transform': 'translateY(20px)'
});

setTimeout(function () {
    $("#preloader").fadeOut('slow');
    // Animar el logo después de que el preloader desaparezca
    $(".header-logo").css({
        'transition': 'all 0.8s ease',
        'opacity': '1',
        'transform': 'translateY(0)'
    });
}, 2000);
},


    // Header 
    header: function () {
      function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];

        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("current");
          }
        });
        selector.children("li").each(function () {
          if ($(this).find(".current").length) {
            $(this).addClass("current");
          }
        });
        if ("" == FileName) {
          selector.find("li").eq(0).addClass("current");
        }
      }

      if ($(".main-menu__list").length) {
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
      }

      if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu__nav").innerHTML;
        let mobileNavContainer = document.querySelector(".mobile-nav__container");
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".sticky-header__content").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(".sticky-header__content");
        mobileNavContainer.innerHTML = navContent;
      }

      if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
          ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function () {
          let self = $(this);
          let toggleBtn = document.createElement("BUTTON");
          toggleBtn.setAttribute("aria-label", "dropdown toggler");
          toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
          self.append(function () {
            return toggleBtn;
          });
          self.find("button").on("click", function (e) {
            e.preventDefault();
            let self = $(this);
            self.toggleClass("expanded");
            self.parent().toggleClass("expanded");
            self.parent().parent().children("ul").slideToggle();
          });
        });
      }

      if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
          e.preventDefault();
          $(".mobile-nav__wrapper").toggleClass("expanded");
          $("body").toggleClass("locked");
        });
      }

      $(window).on("scroll", function () {
        if ($(".stricked-menu").length) {
          var headerScrollPos = 130;
          var stricky = $(".stricked-menu");
          if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("stricky-fixed");
          } else if ($(this).scrollTop() <= headerScrollPos) {
            stricky.removeClass("stricky-fixed");
          }
        }
      });
    },

  // Portfolio Slider
  portfolioSlider: function() {
    if ($(".swiper-container").length) {
        const swiper = new Swiper('.swiper-container', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 150,
                modifier: 2.5,
                slideShadows: false,
            },
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            on: {
                init: function() {
                    $('.swiper-slide-active').removeClass('blur-effect');
                },
                slideChange: function() {
                    $('.swiper-slide').addClass('blur-effect');
                    $('.swiper-slide-active').removeClass('blur-effect');
                }
            }
        });
    }
},

// Acordeón con cambio de imagen
initAccordion: function() {
  if ($(".accordion-item").length) {
      // Función para actualizar imagen con animación
      function updateFeaturedImage(imageSrc) {
          $("#featured-image").fadeOut(300, function() {
              $(this).attr("src", imageSrc).fadeIn(300);
          });
      }

      // Inicializar acordeón
      const accordionItems = document.querySelectorAll('.accordion-item');
      accordionItems.forEach(item => {
          const header = item.querySelector('.accordion-header');
          const content = item.querySelector('.accordion-content');
          
          header.addEventListener('click', () => {
              const isActive = item.classList.contains('active');
              const imageSrc = header.getAttribute('data-image');
              
              // Cerrar todos los items
              accordionItems.forEach(accItem => {
                  accItem.classList.remove('active');
                  accItem.querySelector('.accordion-content').style.display = 'none';
              });
              
              // Abrir el item actual
              if (!isActive) {
                  item.classList.add('active');
                  content.style.display = 'block';
                  if (imageSrc) {
                      updateFeaturedImage(imageSrc);
                  }
              }
          });
      });

      // Función para mostrar secciones por categoría
      window.mostrarAcordeon = function(id) {
          const secciones = ['educacion', 'dia', 'gobierno', 'juridica'];
          secciones.forEach(function(item) {
              $(`.accordion-section[data-section="${item}"]`).toggle(item === id);
          });
      }

      // Mostrar primera sección por defecto
      mostrarAcordeon('educacion');
  }
},

    // Smooth Scrollbar
    smoothScrollbar: function () {
      if ($("body").hasClass("tt-smooth-scroll")) {
        // Not for mobile devices!
        if (!isMobile) {


          class AnchorPlugin extends Scrollbar.ScrollbarPlugin {
            static pluginName = 'anchor';

            jumpToHash = (hash) => {

              if (!hash) {
                return;
              }
              const { scrollbar } = this;
              scrollbar.containerEl.scrollTop = 0;
              const target = document.querySelector(hash);
              if (target) {
                scrollbar.scrollIntoView(target, {
                  offsetTop: parseFloat(target.getAttribute('data-offset')) || 0 // Change to set default offset
                });
              }
            };

            onInit() {
              this.jumpToHash(window.location.hash);
              window.addEventListener('hashchange', this.onHashChange);
            };

            onDestory() {
              window.removeEventListener('hashchange', this.onHashChange);
            };
          };

          // usage
          Scrollbar.use(AnchorPlugin);

          Scrollbar.init(document.querySelector("#scroll-container"), {
            damping: 0.175,
            renderByPixel: true,
            continuousScrolling: true,
            // alwaysShowTracks: true
          });

          $("input[type=number]").on("focus", function () {
            $(this).on("wheel", function (e) {
              e.stopPropagation();
            });
          });

        }
      }
    },

    // TEXT REVEAL
    textReveal: function () {
      if ($(".text-reveal").length) {
        let i = 0;
        const randomizeText = () => {
          const phrase = document.querySelector('.random-word');
          const compStyles = window.getComputedStyle(phrase);
          const animation = compStyles.getPropertyValue('animation');
          const animationTime = parseFloat(animation.match(/\d*[.]?\d+/)) * 1000;

          const phrases = ['Global CyberGuard:', 'La mejor empresa en:'];

          i = randomNum(i, phrases.length);
          const newPhrase = phrases[i];

          setTimeout(() => {
            phrase.textContent = newPhrase;
          }, 400); // time to allow opacity to hit 0 before changing word
        }

        const randomNum = (num, max) => {
          let j = Math.floor(Math.random() * max);

          // ensure diff num every time
          if (num === j) {
            return randomNum(i, max);
          } else {
            return j;
          }
        }

        const getAnimationTime = () => {
          const phrase = document.querySelector('.random-word');
          const compStyles = window.getComputedStyle(phrase);
          let animation = compStyles.getPropertyValue('animation');

          // firefox support for non-shorthand property
          animation != "" ? animation : animation = compStyles.getPropertyValue('-moz-animation-duration');

          // webkit support for non-shorthand property
          animation != "" ? animation : animation = compStyles.getPropertyValue('-webkit-animation-duration');


          const animationTime = parseFloat(animation.match(/\d*[.]?\d+/)) * 1000;
          return animationTime;
        }

        randomizeText();
        setInterval(randomizeText, getAnimationTime());

      }

    },

    // Slick Slider
    slick: function () {

      if ($(".brand-slider").length) {
        $(".brand-slider").slick({
          infinite: true,
          slidesToShow: 6,
          arrows: false,
          autoplay: true,
          cssEase: 'linear',
          autoplaySpeed: 0,
          speed: 4000,
          pauseOnFocus: false,
          pauseOnHover: false,
          responsive: [
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 2,
              },
            },
          ],
        });
      };
      if ($(".team-slider").length) {
        $(".team-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
          infinite: true,
          autoplay: false,
          dots: false,
          centerMode: true,
          draggable: true,
          arrows: false,
          lazyLoad: 'progressive',
          speed: 800,
          autoplaySpeed: 2000, 
          responsive: [
            {
              breakpoint: 821,
              settings: {
                variableWidth: false,
                centerMode: false,
              },
            },
          ],
        });
      }
      if ($(".testimonials-slider").length) {
        $(".testimonials-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
          speed: 800,
          autoplaySpeed: 2000,
          infinite: true,
          arrows: false,
          dots: false,
        });
      }



      $(".btn-prev").click(function () {
        var $this = $(this).attr("data-slide");
        $('.' + $this).slick("slickPrev");
      });

      $(".btn-next").click(function () {
        var $this = $(this).attr("data-slide");
        $('.' + $this).slick("slickNext");
      });
    },

    // Nice Select
    niceSelect: function () {
      if ($(".has-nice-select").length) {
        $('.has-nice-select, .contact-form select').niceSelect();
      }
    },

    // Form Validation
    formValidation: function () {
      if ($(".contact-form").length) {
        $(".contact-form").validate();
      }
    },

    // Contact Form
    contactForm: function () {
      $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        if ($(".contact-form").valid()) {
          var _self = $(this);
          _self
            .closest("div")
            .find('button[type="submit"]')
            .attr("disabled", "disabled");
          var data = $(this).serialize();
          $.ajax({
            url: "./assets/mail/contact.php",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
              $(".contact-form").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("message").innerHTML =
                  "<h4 class='color-primary mt-5'>Email Sent Successfully</h4>";
              } else {
                document.getElementById("message").innerHTML =
                  "<h4 class='color-primary mt-5'>There is an error</h4>";
              }
              $("#messages").show("slow");
              $("#messages").slideDown("slow");
              setTimeout(function () {
                $("#messages").slideUp("hide");
                $("#messages").hide("slow");
              }, 4000);
            },
          });
        } else {
          return false;
        }
      });
    },

     // Imagen Flip Cards
     imageFlipCards: function() {
      if ($(".vertical-slider").length) {
        const initializeSliders = () => {
          const sliders = document.querySelectorAll('.slide-container');
          
          sliders.forEach(slider => {
            // Añadir indicador de flip
            const indicator = document.createElement('div');
            indicator.className = 'flip-indicator';
            indicator.innerHTML = '↻';
            slider.appendChild(indicator);

            // Evento de click
            slider.addEventListener('click', function() {
              this.classList.toggle('flipped');
            });

            // Efecto hover
            slider.addEventListener('mouseenter', function() {
              this.classList.add('hover');
            });

            slider.addEventListener('mouseleave', function() {
              this.classList.remove('hover');
            });
          });
        };

        // Inicializar cuando el DOM esté listo
        $(document).ready(function() {
          initializeSliders();
        });
      }
    },

    

  };

  Init.i();
})(window, document, jQuery);





