//////////////////////////////////////////////////////////////////////
// Props to "Audio Play Pause Mute Buttons Tutorial" for helping me
// create the functionality behind the music/on off button
// Source: http://tinyurl.com/pauseplaysource
var audio, playbtn;

function initAudioPlayer(){
  audio = new Audio();
  // soundtrack source: Edward Shallow
  // url= http://freemusicarchive.org/music/Edward_Shallow/
  audio.src = "sounds/Edward_Shallow_The_Infinite_Railroad.mp3";
  audio.loop = true;
  audio.pause();
  // Set object references
  playbtn = document.getElementById("music-btn");

  playbtn.addEventListener("click", playPause);

  function playPause(){
    if(audio.paused){
        audio.play();
      } else {
        audio.pause();
      }
  }
}
