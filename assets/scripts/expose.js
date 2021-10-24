// expose.js

window.addEventListener('DOMContentLoaded', init);
import './js-confetti.browser.js';

function init() {
  var image = document.querySelector("img");
  var sound = document.querySelector('audio');
  var horn = document.querySelector("#horn-select");
  var volume = document.getElementById("volume-controls");
  var vimg = volume.querySelector('img');
  var vinput = volume.querySelector('input');
  var button = document.querySelector('button');

  horn.addEventListener('change', function() {
    image.src = "assets/images/" + horn.value + ".svg";
    sound.src = "assets/audio/" + horn.value + ".mp3";
  });

  volume.addEventListener('change', function() {
    vinput.addEventListener('input', function() {
      var level = parseInt(vinput.value);

      if (level == 0) { 
        vimg.src ="assets/icons/volume-level-0.svg";
      }

      else if (level < 33) {
        vimg.src ="assets/icons/volume-level-1.svg";
      }

      else if (level < 67) {
        vimg.src ="assets/icons/volume-level-2.svg";
      }

      else {
        vimg.src ="assets/icons/volume-level-3.svg";
      }
      
      sound.volume = level / 100;
    }
  );});

  button.addEventListener('click', function() {
    sound.play();

    if (horn.value == "party-horn") {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
    }
  });
}