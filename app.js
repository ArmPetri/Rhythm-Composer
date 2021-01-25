window.addEventListener('DOMContentLoaded', (event) => {
  let futureTickTime = audioContext.currentTime,
    counter = 1,
    tempo = 120,
    secondsPerBeat = 60 / tempo,
    counterTimeValue = secondsPerBeat / 4,
    timerID = undefined,
    isPlaying = false,
    volLevel = 5,
    panValue = 0;

  let pans = document.querySelectorAll('.pan'),
    pansArray = Array.from(pans),
    gains = document.querySelectorAll('.gain'),
    gainsArray = Array.from(gains);

  let bassDrum = audioFileLoader('sounds/bassDrum.mp3'),
    snare = audioFileLoader('sounds/snare.mp3'),
    lowTom = audioFileLoader('sounds/lowTom.mp3'),
    highTom = audioFileLoader('sounds/highTom.mp3'),
    closedHat = audioFileLoader('sounds/closedHat.mp3'),
    openHat = audioFileLoader('sounds/openHat.mp3'),
    cymbal = audioFileLoader('sounds/cymbal.mp3');

  let bassDrumTrack = [1, 5, 9, 13],
    snareTrack = [5],
    lowTomTrack = [6],
    highTomTrack = [7],
    closedHatTrack = [8],
    openHatTrack = [9],
    cymbalTrack = [10];

  panAction(bassDrum);
  panAction(snare);
  panAction(lowTom);
  panAction(highTom);
  panAction(closedHat);
  panAction(openHat);
  panAction(cymbal);

  gainAction(bassDrum);
  gainAction(snare);
  gainAction(lowTom);
  gainAction(highTom);
  gainAction(closedHat);
  gainAction(openHat);
  gainAction(cymbal);

  function panAction(whichDrum) {
    let result = JSON.stringify(whichDrum);

    for (let i = 0; i < pansArray.length; i++) {
      if (result.includes(pansArray[i].parentElement.parentElement.id)) {
        pansArray[i].addEventListener('change', (e) => {
          panValue = pansArray[i].value;
          whichDrum.setPanner(panValue);
        });
      }
    }
  }

  function gainAction(whichDrum) {
    let result = JSON.stringify(whichDrum);

    for (let i = 0; i < gainsArray.length; i++) {
      if (result.includes(gainsArray[i].parentElement.parentElement.id)) {
        gainsArray[i].addEventListener('change', (e) => {
          gainValue = gainsArray[i].value;
          whichDrum.setGainer(gainValue / 10);
        });
      }
    }
  }

  function scheduleSound(trackArray, sound, count, time) {
    for (let i = 0; i < trackArray.length; i += 1) {
      if (count === trackArray[i]) {
        sound.play(time);
      }
    }
  }

  function playTick() {
    secondsPerBeat = 60 / tempo;
    counterTimeValue = secondsPerBeat / 4;

    counter += 1;
    checker(counter - 1);
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
      scheduleSound(
        lowTomTrack,
        lowTom,
        counter,
        futureTickTime - audioContext.currentTime
      );
      scheduleSound(
        highTomTrack,
        highTom,
        counter,
        futureTickTime - audioContext.currentTime
      );
      scheduleSound(
        closedHatTrack,
        closedHat,
        counter,
        futureTickTime - audioContext.currentTime
      );
      scheduleSound(
        openHatTrack,
        openHat,
        counter,
        futureTickTime - audioContext.currentTime
      );
      scheduleSound(
        cymbalTrack,
        cymbal,
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

  let select = document.querySelectorAll('.select');

  function selectaa() {
    for (let i = 0; i < select.length; i++) {
      select[i].addEventListener('mousedown', function () {
        let selEl = document.querySelector('.flickering');
        let visible = document.querySelector('.visible');
        let thisTrack = document.getElementById(select[i].value);

        if ((selEl, visible)) {
          selEl.classList.remove('flickering');
          visible.classList.remove('visible');
        }
        select[i].classList.add('flickering');
        thisTrack.classList.add('visible');
      });
    }
  }

  selectaa();

  function checker(counter) {
    let visible = document.querySelector('.visible');
    console.log(visible);
    let containers = visible.querySelectorAll('.pad_light');
    let arro = Array.from(containers);
    console.log(arro);
    if (counter)
      for (let i = 0; i < arro.length; i++) {
        if (counter === arro.indexOf(arro[i]) + 1) {
          arro[i].classList.add('rolling');
          setTimeout(function () {
            arro[i].classList.remove('rolling');
          }, 200);
        }
      }
  }

  function sequenceGridToggler(drum, arr) {
    let eachDrum = document.getElementById(drum);

    let allPads = eachDrum.querySelectorAll('.pad_light');
    let arrayo = Array.from(allPads);

    for (let i = 0; i < arrayo.length; i++) {
      arrayo[i].classList.remove('active');
      if (arr.indexOf(arrayo.indexOf(arrayo[i]) + 1) > -1) {
        arrayo[i].classList.add('active');
      }

      allPads[i].parentElement.addEventListener('mousedown', function () {
        let gridIndexValue = arrayo.indexOf(allPads[i]);
        let offset = gridIndexValue + 1;
        let index = arr.indexOf(offset);

        if (index > -1) {
          arr.splice(index, 1);
          arrayo[i].classList.remove('active');
        } else {
          arr.push(offset);
          arrayo[i].classList.add('active');
        }
      });
    }
  }

  sequenceGridToggler('bassDrumTrack', bassDrumTrack);
  sequenceGridToggler('snareTrack', snareTrack);
  sequenceGridToggler('lowTomTrack', lowTomTrack);
  sequenceGridToggler('highTomTrack', highTomTrack);
  sequenceGridToggler('closedHatTrack', closedHatTrack);
  sequenceGridToggler('openHatTrack', openHatTrack);
  sequenceGridToggler('cymbalTrack', cymbalTrack);

  let tempoId = document.querySelector('#tempo');
  tempoId.addEventListener('change', (e) => {
    tempo = tempoId.value;
    console.log(tempo);
    document.querySelector('#tempoScreen').innerHTML = Number(
      `${tempo}`
    ).toFixed(1);
  });

  let volume = document.querySelector('#volume');
  volume.addEventListener('change', (e) => {
    volLevel = volume.value;
    masterGain.gain.value = volLevel / 10;
  });

  let playButton = document.querySelector('.start_stop');
  playButton.addEventListener('click', function () {
    play();
  });
});
