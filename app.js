let futureTickTime = audioContext.currentTime,
  counter = 1,
  tempo = 120,
  secondsPerBeat = 60 / tempo,
  counterTimeValue = secondsPerBeat / 4,
  timerID = undefined,
  isPlaying = false;

let bassDrum = audioFileLoader('sounds/bassDrum.mp3');

function scheduler() {
  if (futureTickTime < audioContext.currentTime + 0.1) {
    console.log('This is 16th is: ' + counter);
    bassDrum.play(futureTickTime);
    futureTickTime += counterTimeValue;
    counter += 1;
    if (counter > 16) {
      counter = 1;
    }
  }
  window.setTimeout(scheduler, 0);
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
  console.log('is working');
  // play();
});
