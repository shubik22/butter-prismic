$(document).ready(function() {
  Weather.setApiKey("186a4121f9d2a98d277362cd4add0547");
  Weather.getCurrent("Queens", function(current) {
    var w = Weather.kelvinToFahrenheit(current.temperature());
    $("#weather").html(Math.round(w) + "&#176; F");
  });

  $(".popup-slider").on('beforeChange', scrollToTop);

  $(".popup-slider").slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    adaptiveHeight: true,
    draggable: false,
    swipe: false
  });

  $(".dot").mouseenter(function() {
    $(this).addClass("dot-hovered");
  });

  const $upArrow = $(".up-arrow");
  $(window).on("scroll", function() {
      var scrollPos = $(window).scrollTop();
      if (scrollPos <= 0) {
          $upArrow.addClass("hidden");
      } else {
          $upArrow.removeClass("hidden");
      }
  });

  $upArrow.each(function() {
    $(this).click(function() {
        $('html,body').animate({ scrollTop: 0 }, 400);
        return false;
    });
  });
});

document.addEventListener("touchstart", function(){}, true);

function scrollToTop() {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function openPopup(element) {
  $(".dots").addClass("hidden");
  $(element).removeClass("hidden");
  window.location.hash = element.id;
  scrollToTop();
}

function closePopup() {
  $(".dots").removeClass("hidden");
  $(".popup").addClass("hidden");
  window.location.hash = "";
}
