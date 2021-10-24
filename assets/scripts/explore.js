// explore.js

window.addEventListener('DOMContentLoaded', init);
var synth = window.speechSynthesis;
var button= document.querySelector('button');
var inputTxt = document.getElementById("text-to-speak");
var voiceSelect = document.getElementById("voice-select");
var image = document.querySelector("img");
var voices = [];


function init() {
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
   speechSynthesis.onvoiceschanged = populateVoiceList();
  }
}

speechSynthesis.addEventListener("voiceschanged", () => {
  populateVoiceList();
})

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
    if ( aname < bname ) return -1;
    else if ( aname == bname ) return 0;
    else return +1;
  });

  var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  for(var i = 0; i < voices.length; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
      console.log('default');
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

function speak(){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputTxt.value !== '') {
      var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
      utterThis.onend = function(event) {
      console.log('SpeechSynthesisUtterance.onend');
      image.src ="assets/images/smiling.png";
      console.log('face-close');
    }
    utterThis.onerror = function(event) {
      console.error('SpeechSynthesisUtterance.onerror');
    }
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for(var i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    synth.speak(utterThis);
  }
}

button.onclick = function(event) {
  event.preventDefault();
  speak();
  if (synth.speaking) {
    image.src ="assets/images/smiling-open.png";
    console.log('face-open');
  }
  inputTxt.blur();
}

voiceSelect.onchange = function(){
  speak();
  if (synth.speaking) {
    image.src ="assets/images/smiling-open.png";
    console.log('face-open');
  }
}