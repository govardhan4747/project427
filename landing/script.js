const birthDate = new Date("2004-08-03T00:00:00");

const el = {
  years: document.querySelector(".years"),
  days: document.querySelector(".days"),
  hours: document.querySelector(".hours"),
  minutes: document.querySelector(".minutes"),
  seconds: document.querySelector(".seconds")
};

setInterval(() => {
  const now = new Date();
  let diff = now - birthDate;

  const msInSec = 1000;
  const msInMin = msInSec * 60;
  const msInHour = msInMin * 60;
  const msInDay = msInHour * 24;
  const msInYear = msInDay * 365.25;

  const years = Math.floor(diff / msInYear);
  diff %= msInYear;

  const days = Math.floor(diff / msInDay);
  diff %= msInDay;

  const hours = Math.floor(diff / msInHour);
  diff %= msInHour;

  const minutes = Math.floor(diff / msInMin);
  diff %= msInMin;

  const seconds = Math.floor(diff / msInSec);

  el.years.innerText = years;
  el.days.innerText = days;
  el.hours.innerText = hours < 10 ? "0" + hours : hours;
  el.minutes.innerText = minutes < 10 ? "0" + minutes : minutes;
  el.seconds.innerText = seconds < 10 ? "0" + seconds : seconds;
}, 1000);

// Add this simple code in its place
window.addEventListener('load', () => {
  document.querySelector('.wishes').classList.add('is-visible');
});

// buttons
$(document).ready(function () {
  $(".custom-carousel").owlCarousel({
    autoWidth: true,
    loop: true,
    margin: 20,
    mouseDrag: true,
    touchDrag: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  });

  // Toggle active card on click
  $(".custom-carousel .item").click(function () {
    $(".custom-carousel .item").not($(this)).removeClass("active");
    $(this).toggleClass("active");
  });
});


