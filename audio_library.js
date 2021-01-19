let audioContext = new AudioContext();
let masterGain = audioContext.createGain();
masterGain.gain.value = 0.5;

function audioFileLoader(fileDirectory) {
  let soundObj = {},
    playSound = undefined,
    getSound = new XMLHttpRequest(),
    panner = audioContext.createStereoPanner(),
    gainer = audioContext.createGain();

  soundObj.fileDirectory = fileDirectory;
  getSound.open('GET', soundObj.fileDirectory, true);
  getSound.responseType = 'arraybuffer';

  getSound.onload = function () {
    audioContext.decodeAudioData(getSound.response, function (buffer) {
      soundObj.soundToPlay = buffer;
    });
  };

  getSound.send();

  soundObj.setPanner = function (panz) {
    panner.pan.value = panz;
  };

  soundObj.setGainer = function (gainz) {
    gainer.gain.value = gainz;
  };

  soundObj.play = function (time) {
    playSound = audioContext.createBufferSource();
    playSound.buffer = soundObj.soundToPlay;

    connecter(playSound);

    playSound.start(
      audioContext.currentTime + time || audioContext.currentTime
    );
  };

  function connecter(theSound) {
    theSound.connect(panner);
    panner.connect(gainer);
    gainer.connect(masterGain);
    masterGain.connect(audioContext.destination);
  }

  soundObj.stop = function (time) {
    playSound.stop(audioContext.currentTime + time || audioContext.currentTime);
  };

  return soundObj;
}
