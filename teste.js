const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const likeButton = document.getElementById('like');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

const Timeless = {
    songName: "Timeless",
    artist: "The Weeknd, PlayboiCarti",
    File: "timeless",
    liked: false,
};

const Astrothunder = {
    songName: "Astrothunder",
    artist: "Travis Scott",
    File: "astrothunder",
    liked: false,
};

const Congratulations = {
    songName: "Congratulations",
    artist: "Post Malone",
    File: "congratulations",
    liked: false,
};

const AllTheStars = {
    songName: "All The Stars",
    artist: "Kendrick lamar",
    File: "AllTheStars",
    liked: false,
};

const Father = {
    songName: "Father",
    artist: "Kenye",
    File: "Father",
    liked: false,
};

const interlude = {
    songName: "Interlude",
    artist: "Travis scott",
    File: "interlude",
    liked: false,
};

const Swimming = {
    songName: "Swimming Pool",
    artist: "Kendrick Lamar",
    File: "Swimming",
    liked: false,
};

const SeeYouAgain = {
    songName: "See You Again",
    artist: "Tyler",
    File: "SeeYouAgain",
    liked: false,
};

const MyEyes = {
    songName: "My Eyes",
    artist: "Travis scott",
    File: "MyEyes",
    liked: false,
};

const LoveMe = {
    songName: "Love Me",
    artist: "Jmsn",
    File: "LoveMe",
    liked: false,
};

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [Timeless, Astrothunder, Congratulations, AllTheStars, Father,interlude,Swimming,SeeYouAgain,MyEyes,LoveMe];
let sortedPlaylist = [...originalPlaylist];
let index = 0;

function playSong() { 
    play.querySelector('.bi').classList.remove('bi-play-circle');
    play.querySelector('.bi').classList.add('bi-pause-circle');
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector('.bi').classList.add('bi-play-circle');
    play.querySelector('.bi').classList.remove('bi-pause-circle');
    song.pause();
    isPlaying = false;
}

function playPauseDecider() {
    if (isPlaying === true) {
        pauseSong();
    } else {
        playSong();
    }
}

function initializeSong() {
    cover.src = `imagens/${sortedPlaylist[index].File}.jpeg`;
    song.src = `songs/${sortedPlaylist[index].File}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    likeButtonRender();
}

function previousSong() {
    if (index === 0) {
        index = sortedPlaylist.length - 1;
    } else {
        index -= 1;
    }
    initializeSong();
    playSong();
}

function nextSong() {
    if (index === sortedPlaylist.length - 1) {
        index = 0;
    } else {
        index += 1;
    }
    initializeSong();
    playSong();
}

function updateProgressBar() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
}

function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime;
}

function shuffleButtonClicked() {
    if (isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
        initializeSong();
    } else {
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active');
        initializeSong();
    }
}

function repeatButtonClicked() {
    if (repeatOn === false) {
        repeatOn = true;
        repeatButton.classList.add('button-active');
    } else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }
}

function nextOrRepeat() {
    if (repeatOn === false) {
        nextSong();
    } else {
        playSong();
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function updateCurrentTime() {
    songTime.innerText = formatTime(song.currentTime);
}

function updateTotalTime() {
    totalTime.innerText = formatTime(song.duration);
}

function likeButtonRender(){
    if (sortedPlaylist[index].liked === true){
        likeButton.querySelector('.bi').classList.remove('bi-arrow-through-heart');
        likeButton.querySelector('.bi').classList.add('bi-arrow-through-heart-fill');
        likeButton.classList.add('button-likes');
    }
    else {
        likeButton.querySelector('.bi').classList.add('bi-arrow-through-heart');
        likeButton.querySelector('.bi').classList.remove('bi-arrow-through-heart-fill');
        likeButton.classList.remove('button-likes');
    }
}

function likeButtonClicked() {
    if(sortedPlaylist[index].liked === false) {
        sortedPlaylist[index].liked = true;
    } else {
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist', JSON.stringify(originalPlaylist));
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
song.addEventListener('timeupdate', updateCurrentTime);
song.addEventListener('loadedmetadata', updateTotalTime);
song.addEventListener('ended', nextOrRepeat);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);

