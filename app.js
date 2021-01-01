window.addEventListener('DOMContentLoaded', (event) => {
  let futureTickTime = audioContext.currentTime,
    counter = 1,
    tempo = 120,
    secondsPerBeat = 60 / tempo,
    counterTimeValue = secondsPerBeat / 4,
    timerID = undefined,
    isPlaying = false;

  let bassDrum = audioFileLoader('sounds/bassDrum.mp3'),
    snare = audioFileLoader('sounds/snare.mp3'),
    lowTom = audioFileLoader('sounds/lowTom.mp3'),
    highTom = audioFileLoader('sounds/highTom.mp3'),
    closedHat = audioFileLoader('sounds/closedHat.mp3'),
    openHat = audioFileLoader('sounds/openHat.mp3'),
    cymbal = audioFileLoader('sounds/cymbal.mp3');

  let bassDrumTrack = [1, 5, 9, 13],
    snareTrack = [5, 13],
    lowTomTrack = [],
    highTomTrack = [],
    closedHatTrack = [],
    openHatTrack = [],
    cymbalTrack = [];

  function scheduleSound(trackArray, sound, count, time) {
    for (let i = 0; i < trackArray.length; i += 1) {
      if (count === trackArray[i]) {
        sound.play(time);
      }
    }
  }

  function playTick() {
    counter += 1;
    futureTickTime += counterTimeValue;
    if (counter > 16) {
      counter = 1;
    }
  }

  function scheduler() {
    if (futureTickTime < audioContext.currentTime + 0.1) {
      scheduleSound(
        bassDrumTrack,
        bassDrum,
        counter,
        futureTickTime - audioContext.currentTime
      );
      scheduleSound(
        snareTrack,
        snare,
        counter,
        futureTickTime - audioContext.currentTime
      );

      playTick();
    }
    timerID = window.setTimeout(scheduler, 0);
  }

  function play() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      counter = 1;
      futureTickTime = audioContext.currentTime;
      scheduler();
    } else {
      window.clearTimeout(timerID);
    }
  }

  let playButton = document.querySelector('.start_stop');
  playButton.addEventListener('click', function () {
    play();
  });
});
