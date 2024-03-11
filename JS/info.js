const shareUrl = "https://pomodesh.netlify.app/";

// Share on Twitter
const twitterBtn = document.getElementById("twitter-share");
twitterBtn.addEventListener("click", () => {
  const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=Check out this awesome pomodoro website!`;
  window.open(twitterUrl, "_blank");
});

// Share on Facebook
const facebookBtn = document.getElementById("facebook-share");
facebookBtn.addEventListener("click", () => {
  const facebookUrl = `https://www.facebook.com/sharer.php?u=${shareUrl}`;
  window.open(facebookUrl, "_blank");
});

// Share on LinkedIn
const linkedinBtn = document.getElementById("linkedin-share");
linkedinBtn.addEventListener("click", () => {
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
  window.open(linkedinUrl, "_blank");
});

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

document.addEventListener("keydown", (event) => {
  if (event.code === "KeyF") {
    toggleFullScreen();
  }
});
