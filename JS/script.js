const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const timerElem = document.getElementById("timer");
const alarm = document.getElementById("alarm");
const body = document.body;

const fullscreenToggle = document.getElementById("fullscreen-toggle");
const increaseBtn = document.querySelector(".increase");
const decreaseBtn = document.querySelector(".decrease");
const countdownSound = document.getElementById("countdownSound");

let countdownSoundPlayed = false;
let countdownId;
let remainingTime = 1500;
let isPaused = true;

let mouseTimer;

document.addEventListener("mousemove", () => {
  clearTimeout(mouseTimer);
  // Remove hide-elements class from all elements
  document.querySelectorAll(':not(.container)').forEach(element => {
    element.classList.remove("hide-elements");
  });

  // Set a timer to hide elements after 5 seconds of inactivity
  mouseTimer = setTimeout(() => {
    // Add hide-elements class to all elements except those with class container
    document.querySelectorAll(':not(.container)').forEach(element => {
      element.classList.add("hide-elements");
    });
  }, 5000);
});

fullscreenToggle.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullscreenToggle.innerHTML = '<i class="fa-solid fa-compress"></i>';
  } else {
    document.exitFullscreen();
    fullscreenToggle.innerHTML = '<i class="fa-solid fa-expand"></i>';
  }
});

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullscreenToggle.innerHTML = '<i class="fa-solid fa-compress"></i>';
  } else {
    document.exitFullscreen();
    fullscreenToggle.innerHTML = '<i class="fa-solid fa-expand"></i>';
  }
}

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
    timerElem.classList.add("time-up");
    timerElem.style.fontSize = "19rem";
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
  remainingTime = 1500;
  timerElem.innerText = formatTime(remainingTime);
  timerElem.style.fontSize = "";
  alarm.pause();
  alarm.currentTime = 0;
  startBtn.innerText = "Start";
  startBtn.style.display = "inline-block";
  document.title = "Pomodesh";
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

startBtn.addEventListener("click", () => {
  toggleTimer();
});

resetBtn.addEventListener("click", () => {
  resetTimer();
  startBtn.innerText = "Start";
  resetBtn.style.display = "none";
});

increaseBtn.addEventListener("click", () => {
  remainingTime += 300;
  timerElem.innerText = formatTime(remainingTime);
});

decreaseBtn.addEventListener("click", () => {
  remainingTime = Math.max(0, remainingTime - 300);
  timerElem.innerText = formatTime(remainingTime);
});

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
  }
});

timerElem.innerText = formatTime(remainingTime);

body.classList.add("dark-mode");

timerElem.innerText = formatTime(remainingTime);