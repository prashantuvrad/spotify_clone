let songIndex = 0;
let audioElement = new Audio("1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myUpdateBar = document.getElementById("my-update-bar");
let gif = document.getElementById("gif");
let mastersongName = document.getElementById("mastersongName");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songs = [
  {
    songName: "One Dance - Drake",
    filePath: "Music/1.mp3",
    coverPath: "cover1.jpg",
  },
  {
    songName: "Unstoppable - Sia",
    filePath: "Music/2.mp3",
    coverPath: "cover2.jpg",
  },
  {
    songName: "Paris - Willy William",
    filePath: "Music/3.mp3",
    coverPath: "cover3.jpg",
  },
];
songItem.forEach((element, i) => {
  console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// audioElement.play();
// Handling play /stop music
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.add("fa-play-circle");
    masterPlay.classList.remove("fa-pause-circle");
    gif.style.opacity = 0;
  }
});
// Listen to events
audioElement.addEventListener("timeupdate", () => {
  // Updating seek bar
  update = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myUpdateBar.value = update;
});

myUpdateBar.addEventListener("change", () => {
  audioElement.currentTime = (myUpdateBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("song-item-play")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("song-item-play")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      mastersongName.innerText = songs[songIndex].songName;
      audioElement.src = `${songIndex + 1}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 3) {
    songIndex = 0;
  }
  else{
    songIndex += 1;
  }
  audioElement.src = `${songIndex + 1}.mp3`;
  mastersongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0 ) {
    songIndex = 0;
  }
  else{
    songIndex -= 1;
  }
  audioElement.src = `${songIndex + 1}.mp3`;
  mastersongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
