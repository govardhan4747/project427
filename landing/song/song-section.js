document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Select All Elements ---
  const video = document.getElementById("songVideo");
  const playPauseBtn = document.getElementById("playPause");
  const backwardBtn = document.getElementById("backward");
  const forwardBtn = document.getElementById("forward");
  
  const canvas = document.getElementById("waveform");
  const ctx = canvas.getContext("2d");

  // --- 2. State & Setup ---
  let waveformAnimationId;
  const bars = 120; // Number of bars in the waveform
  
  // Create a state object for GSAP to animate for smoother transitions
  const animationState = {
    opacity: 0,
    amplitude: 0.05 // Start with a slight "hum"
  };

  // --- 3. Waveform Canvas Logic ---
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  
  function drawWaveform() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const midY = canvas.height / 2;
    const barWidth = canvas.width / bars;
    const time = Date.now() / 250; // Slow down the wave movement slightly

    for (let i = 0; i < bars; i++) {
      const sin1 = Math.sin(time + i * 0.2);
      const sin2 = Math.sin(time + i * 0.3 + 5);
      // Use the animated amplitude from our state object
      const height = (sin1 + sin2) * (midY * animationState.amplitude);

      // Use the animated opacity from our state object
      ctx.fillStyle = `rgba(248, 208, 111, ${animationState.opacity})`; // Match gold button color
      ctx.fillRect(i * barWidth, midY - height / 2, barWidth - 2, height);
    }
    waveformAnimationId = requestAnimationFrame(drawWaveform);
  }

  function startWaveform() {
    if (!waveformAnimationId) {
      drawWaveform();
    }
    // Animate the waveform to be visible and active
    gsap.to(animationState, { opacity: 0.6, amplitude: 0.4, duration: 0.8, ease: "power2.out" });
  }

  function stopWaveform() {
    // Animate the waveform to fade out and quiet down
    gsap.to(animationState, { opacity: 0, amplitude: 0.05, duration: 1.5, ease: "power2.out" });
  }
  
  // --- 4. Event Listeners ---
  playPauseBtn.addEventListener("click", () => {
    video.paused ? video.play() : video.pause();
  });

  backwardBtn.addEventListener("click", () => {
    video.currentTime = Math.max(0, video.currentTime - 10); // Rewind 10s
  });

  forwardBtn.addEventListener("click", () => {
    video.currentTime += 10; // Forward 10s
  });

  video.addEventListener("play", () => {
    playPauseBtn.innerHTML = "⏸";
    playPauseBtn.setAttribute("aria-label", "Pause");
    video.classList.add("glow");
    startWaveform();
  });

  video.addEventListener("pause", () => {
    playPauseBtn.innerHTML = "▶";
    playPauseBtn.setAttribute("aria-label", "Play");
    video.classList.remove("glow");
    stopWaveform();
  });
  
  // --- 5. Initialization ---
  function initialize() {
    // Hide the default controls if custom JS loads successfully
    video.controls = false; 
    
    // Set initial canvas size
    resizeCanvas();
    
    // Listen for window resize to adjust canvas
    window.addEventListener('resize', resizeCanvas);
    
    // Start with a faint, idle waveform
    drawWaveform();
    gsap.to(animationState, { opacity: 0.2, duration: 1 });
  }

  initialize();
});