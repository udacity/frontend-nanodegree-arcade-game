// sounds.js preloads all critical sound files to prevent
// sound delays. For more info check out this stack overflow site:
/*
 * http://stackoverflow.com/questions/31060642/preload-multiple-audio-files
 */
var audioFiles = [
    "sounds/class_switch.wav",
    "sounds/cloth.wav",
    "sounds/chainmail.wav",
    "sounds/bubbles.wav",
    "sounds/bite.wav",
    "sounds/beast.wav",
    "sounds/ogre.wav",
    "sounds/undead.wav",
    "sounds/magic.wav",
    "sounds/extra_life.wav",
    "sounds/game_over.wav"
];

function preloadAudio(url) {
    var audio = new Audio();
    // once this file loads, it will call loadedAudio()
    // the file will be kept by the browser as cache
    audio.addEventListener('canplaythrough', loadedAudio, false);
    audio.src = url;
}

var loaded = 0;
function loadedAudio() {
    // this will be called every time an audio file is loaded
    // we keep track of the loaded files vs the requested files
    loaded++;
    if (loaded == audioFiles.length){
    	// all have loaded
    	init();
    }
}

var audioPlayer = document.getElementById('player');
function play(index) {
    audioPlayer.src = audioFiles[index];
    audioPlayer.play();
}

function init() {
    // do your stuff here, audio has been loaded
    // for example, play all files one after the other
    var i = 0;
    // once the player ends, play the next one
    audioPlayer.onended = function() {
    	i++;
        if (i >= audioFiles.length) {
            // end
            return;
        }
    	play(i);
    };
    // play the first file
    play(i);
}

// we start preloading all the audio files
for (var i in audioFiles) {
    preloadAudio(audioFiles[i]);
}
