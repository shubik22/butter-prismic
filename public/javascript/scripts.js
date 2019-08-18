// Docs at http://simpleweatherjs.com
$(document).ready(function() {

  Weather.setApiKey("186a4121f9d2a98d277362cd4add0547");

  Weather.getCurrent("Queens", function(current) {

    var w = Weather.kelvinToFahrenheit(current.temperature());
    $("#weather").html(Math.round(w) + "&#176; F");
    // console.log(w);

  });

  // Weather.getForecast("Kansas City", function(forecast) {
  //   console.log("forecast high: " + forecast.high());
  //   console.log("forecast low: " + forecast.low());
  // });


  // $('.popup-slider').on('init', function(event, slick){
  //     $("#news").hide();
  // });

  $(".popup-slider").on('beforeChange', scrollToTop);

  $(".dot").mouseenter(function() {
    $(this).addClass("dot-hovered");
  });

  const dest = window.location.hash;
  switch (dest) {
    case "#work":
      openPopup(work);
      break;
    case "#contact":
      openPopup(contact);
      break;
    case "#news":
      openPopup(news);
      break;
    case "#services":
      openPopup(services);
      break;
    case '#workSubpages':
      openPopup(workSubpages);
      break;
    case '#otherhalf':
    case '#kettner':
    case '#alma':
    case '#flex':
    case '#arkfoods':
    case '#hifi':
    case '#buddish':
    case '#dego':
      const workItem = dest.substring(1);
      goToWorkItem(workItem);
      break;
    default:
      break;
  }

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

function goToWorkItem(name) {
  openPopup(workSubpages);
  switch (name) {
    case 'otherhalf':
      $('#work-slide').slick('slickGoTo', 0);
      break;
    case 'kettner':
      $('#work-slide').slick('slickGoTo', 1);
      break;
    case 'alma':
      $('#work-slide').slick('slickGoTo', 2);
      break;
    case 'flex':
      $('#work-slide').slick('slickGoTo', 3);
      break;
    case 'arkfoods':
      $('#work-slide').slick('slickGoTo', 4);
      break;
    case 'hifi':
      $('#work-slide').slick('slickGoTo', 5);
      break;
    case 'buddish':
      $('#work-slide').slick('slickGoTo', 6);
      break;
    case 'dego':
      $('#work-slide').slick('slickGoTo', 7);
      break;
    default:
      break;
  }
}
