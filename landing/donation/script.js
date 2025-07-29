var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 3,
    slideShadows: true
  },
  keyboard: {
    enabled: true
  },
  mousewheel: {
    thresholdDelta: 70
  },
  loop: true,
  autoplay: {
    delay: 3000, // 3 seconds
    disableOnInteraction: false // keeps autoplay running after interaction
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  breakpoints: {
    640: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 1
    },
    1024: {
      slidesPerView: 2
    },
    1560: {
      slidesPerView: 3
    }
  }
});
// --- Inactivity Timeout Logic ---
let inactivityTimer;

function resetInactivityTimer() {
 // Clear the previous timer
 clearTimeout(inactivityTimer);

 // Set a new timer for 10 minutes (600,000 milliseconds)
 inactivityTimer = setTimeout(() => {
 // After 10 minutes, redirect back to the login page
 window.location.href = '../../index.html'; // <-- CHANGE THIS
 }, 300000);
}

// --- Event Listeners to Reset the Timer ---
// Any of these actions will reset the 10-minute timer.
window.addEventListener('mousemove', resetInactivityTimer);
window.addEventListener('mousedown', resetInactivityTimer);
window.addEventListener('touchstart', resetInactivityTimer);
window.addEventListener('keydown', resetInactivityTimer);
window.addEventListener('scroll', resetInactivityTimer, true);

// --- Initial Start ---
// Start the timer as soon as the page loads.
window.onload = function() {
resetInactivityTimer();
 // You can also add any other onload functions for your cake page here.
};