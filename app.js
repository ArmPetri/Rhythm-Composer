let bassDrum = audioFileLoader('sounds/bassDrum.mp3');

let playButton = document.querySelector('.start_stop');
playButton.addEventListener('click', function () {
  console.log('is working');
  bassDrum.play();
});
