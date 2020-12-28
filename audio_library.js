let audioContext = new AudioContext();

function audioFileLoader(fileDirectory) {
  let soundObj = {};
  let playSound = undefined;
  let getSound = new XMLHttpRequest();

  soundObj.fileDirectory = fileDirectory;
  getSound.open('GET', soundObj.fileDirectory, true);
  getSound.responseType = 'arraybuffer';

  getSound.onload = function () {
    audioContext.decodeAudioData(getSound.response, function (buffer) {
      soundObj.soundToPlay = buffer;
    });
  };

  getSound.send();

  soundObj.play = function () {
    playSound = audioContext.createBufferSource();
    playSound.buffer = soundObj.soundToPlay;
    playSound.connect(audioContext.destination);
    playSound.start(audioContext.currentTime);
  };

  return soundObj;
}
