"use strict";

const audio = document.querySelector("audio");
const inputSlider = document.querySelector(".input-slider");
const inputVolume = document.querySelector(".input-volume");

const playBtn = document.querySelector(".fa-circle-play");
const pauseBtn = document.querySelector(".fa-circle-pause");
const backwardBtn = document.querySelector(".fa-backward-step");
const forwardBtn = document.querySelector(".fa-forward-step");

const musics = [
  {
    name: "Душа моя",
    artist: "Gvozdini",
    path: "Gvozdini - Душа моя.mp3",
    cover: "Gvozdini - Душа моя.jpg",
  },
  {
    name: "Поцілуй",
    artist: "Gvozdini",
    path: "Gvozdini - Поцілуй.mp3",
    cover: "Gvozdini - Поцілуй.jpg",
  },
  {
    name: "We are strong",
    artist: "Gvozdini",
    path: "Gvozdini - We are strong.mp3",
    cover: "Gvozdini - We are strong.jpg",
  },
  {
    name: "Біля тополі",
    artist: "Gvozdini",
    path: "Gvozdini - Там біля тополі.mp3",
    cover: "Gvozdini - Там біля тополі.jpg",
  },
];
const time = function (t) {
  let min = Math.floor(t / 60);
  if (min < 10) {
    min = "0" + min;
  }
  let sec = Math.floor(t % 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  return `${min} : ${sec}`;
};
const setMusic = function (key) {
  const music = musics[key];
  audio.src = music.path;
  document.querySelector(".img img").src = music.cover;
  document.querySelector(".name h1").innerHTML = music.name;
  document.querySelector(".name p").innerHTML = music.artist;
  setTimeout(() => {
    inputSlider.max = audio.duration;
    document.querySelector(".time-two").innerHTML = time(audio.duration);
  }, 1000);
  audio.volume = inputVolume.value / 100;
};
setMusic(0);
playBtn.addEventListener("click", function () {
  audio.play();
  playBtn.classList.add("button-hide");
  pauseBtn.classList.remove("button-hide");
});
pauseBtn.addEventListener("click", function () {
  audio.pause();
  playBtn.classList.remove("button-hide");
  pauseBtn.classList.add("button-hide");
});
inputVolume.addEventListener("input", function () {
  audio.volume = inputVolume.value / 100;
});
let currentMusic = 0;
backwardBtn.addEventListener("click", function () {
  if (currentMusic === 0) {
    currentMusic = musics.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playBtn.click();
});
forwardBtn.addEventListener("click", function () {
  if (currentMusic === musics.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  setMusic(currentMusic);
  playBtn.click();
});
setInterval(() => {
  inputSlider.value = audio.currentTime;
  document.querySelector(".time-one").innerHTML = time(audio.currentTime);
  if (audio.currentTime === inputSlider.max) {
    forwardBtn.click();
  }
}, 1000);
inputSlider.addEventListener("change", function () {
  audio.currentTime = inputSlider.value;
});
