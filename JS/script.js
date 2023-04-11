const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const timerElem = document.getElementById("timer");
const alarm = document.getElementById("alarm");
const body = document.body;

// Dark Mode
const darkModeToggle = document.getElementById("dark-mode-toggle");
let isDarkMode = true;

darkModeToggle.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode", isDarkMode);
  darkModeToggle.innerHTML = isDarkMode
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});

// Add dark mode by default
body.classList.add("dark-mode");

// Full Screen
const fullscreenToggle = document.getElementById("fullscreen-toggle");

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullscreenToggle.innerHTML = '<i class="fa-solid fa-compress"></i>';
  } else {
    document.exitFullscreen();
    fullscreenToggle.innerHTML = '<i class="fa-solid fa-expand"></i>';
  }
}

fullscreenToggle.addEventListener("click", () => {
  toggleFullScreen();
});

// Functional timer
let countdownId;
let remainingTime = 3000;
let isPaused = true;

function formatTime(seconds) {
  let hours = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60);
  let secs = seconds % 60;

  if (mins < 10) {
    mins = "0" + mins;
  }
  if (secs < 10) {
    secs = "0" + secs;
  }

  if (hours >= 1) {
    return `${hours.toString().padStart(2, "0")}:${mins}:${secs}`;
  } else {
    return `${mins}:${secs}`;
  }
}

function updateTimer() {
  remainingTime--;
  timerElem.innerText = formatTime(remainingTime);
  document.title = `${formatTime(remainingTime)} | Pomodesh`;
  if (remainingTime <= 0) {
    clearInterval(countdownId);
    timerElem.innerText = "Time Up!";
    document.title = "Time Up! | Pomodesh";
    alarm.play();
    startBtn.style.display = "none";
    resetBtn.style.display = "inline-block";
  }
}

function startTimer() {
  isPaused = false;
  countdownId = setInterval(updateTimer, 1000);
}

function pauseTimer() {
  isPaused = true;
  clearInterval(countdownId);
}

function resetTimer() {
  isPaused = true;
  clearInterval(countdownId);
  remainingTime = 3000;
  timerElem.innerText = formatTime(remainingTime);
  alarm.pause();
  alarm.currentTime = 0;
  startBtn.innerText = "Start";
  startBtn.style.display = "inline-block";
}

function toggleTimer() {
  if (isPaused) {
    startTimer();
    startBtn.innerText = "Pause";
  } else {
    pauseTimer();
    startBtn.innerText = "Resume";
  }
  resetBtn.style.display = isPaused ? "inline-block" : "none";
}

//Buttons
startBtn.addEventListener("click", () => {
  toggleTimer();
});

resetBtn.addEventListener("click", () => {
  resetTimer();
  startBtn.innerText = "Start";
  resetBtn.style.display = "none";
});

const increaseBtn = document.querySelector(".increase");
const decreaseBtn = document.querySelector(".decrease");

increaseBtn.addEventListener("click", () => {
  remainingTime += 300;
  timerElem.innerText = formatTime(remainingTime);
});

decreaseBtn.addEventListener("click", () => {
  remainingTime = Math.max(0, remainingTime - 300);
  timerElem.innerText = formatTime(remainingTime);
});

//Keyboard Shortcuts
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    toggleTimer();
  } else if ((event.code === "KeyR" && isPaused) || remainingTime <= 0) {
    resetTimer();
    resetBtn.style.display = "none";
  } else if (event.code === "KeyF") {
    toggleFullScreen();
  } else if (event.code === "ArrowUp") {
    remainingTime += 300;
    timerElem.innerText = formatTime(remainingTime);
  } else if (event.code === "ArrowDown") {
    remainingTime = Math.max(0, remainingTime - 300);
    timerElem.innerText = formatTime(remainingTime);
  } else if (event.code === "KeyD") {
    toggleDarkMode();
  }
});

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  body.classList.toggle("dark-mode", isDarkMode);
  darkModeToggle.innerHTML = isDarkMode
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

timerElem.innerText = formatTime(remainingTime);
