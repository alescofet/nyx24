import {Dialog} from './dialog.js'
import {Puzzle} from './puzzle.js'
import {couple1Params} from './couple1.js'
import {year24Params} from './year24Params.js'

//Initialize countdown
const checkLoaded = setInterval(() => {
  if(loader.classList.contains("hidden")){
      yearSelector.classList.remove("hidden")
      clearInterval(checkLoaded)
  } else { 
      yearSelector.classList.add("hidden")
  }
}, 2500);

//Element Queries
const yearSelector = document.getElementById("yearSelector")
const loader = document.getElementById("loader")
const firstYear = document.getElementById("year-24")
const secondYear = document.getElementById("year-25")
const firstCouple = document.getElementById("couple-1")
const years24 = document.getElementById("years24")
const couple1 = document.getElementById("couple1")
const years25 = document.getElementById("years25")

//General Variables
let passcode = false
let horizontalScreen = false

//Dialog Variables
const leftDialogBox = document.querySelector('.left-dialog-box');
const leftTextSelector = leftDialogBox.querySelector('.text');


function checkOrientation(orientation){
  if (orientation === 0 || orientation === 180) {
    horizontalScreen = false
  } else {
    horizontalScreen = true
  }
  if (!horizontalScreen) {
    alert("Pon el movil en horizontal para verlo bien 😘")
    setTimeout(() => {
      checkOrientation(window.orientation)
    }, 2000);
  }
}

checkOrientation(window.orientation)

window.addEventListener('load', function() {
  var preloader = document.getElementById('preloader');
  var images = preloader.getElementsByTagName('img');

  for (var i = 0; i < images.length; i++) {
    var image = new Image();
    image.src = images[i].src;
  }
  
});


let input = prompt("Como me llamas cariñosamente?")

if(input.toLowerCase() === "osi"){
  passcode = true
}

if(passcode === false){
  document.querySelector("body").innerHTML = ""
}

// Add text appearance animation to the text elements

// Show year24
function showYear24() {
  yearSelector.classList.toggle("hidden")
  firstYear.classList.toggle("hidden")
  leftTextSelector.classList.add('typewriter');
  const year24Dialog = new Dialog(year24Params.backgroundArray, year24Params.leftText, 24)
  function leftActive(){
    year24Dialog.leftActive()
  }
  function showCard(){
    year24Dialog.showCard()
  }
  function trigger(event){
    year24Dialog.trigger(event)
  }
  year24Dialog.leftActive()
  year24Dialog.leftDialogBox.addEventListener("click", leftActive)
  year24Dialog.cardButton.addEventListener("click", showCard)
  year24Dialog.cardList.forEach((card) => {
      card.addEventListener("click", trigger)
  })
}
years24.addEventListener("click", showYear24)
// Show year25
function showYear25() {
  const images = [
    {start: "./public/puzzles/puzzle1/foto.jpg", finish:"./public/puzzles/puzzle1/foto-final.jpg"},
    {start: "./public/puzzles/puzzle2/foto.jpg", finish:"./public/puzzles/puzzle2/foto-final.jpg"},
    {start: "./public/puzzles/puzzle3/foto.jpg", finish:"./public/puzzles/puzzle3/foto-final.jpg"}
  ]
  const texts = [
    "🎊Muchas felicidades preciosa!!🎊 Sabes que te quiero mucho y que te lo demostraré siempre que pueda(en este caso con besitos en el ascensor🤗)",
    "Quiero que en el futuro hagamos muchos mas viajecitos para ver mundo y sobretodo, para darnos mimos y comer rico😋(Como en Bolonia🍝)",
    "Y quiero que celebremos muchos más aniversarios juntos, haciendo escapaditas y planes chulis.(Como el del Mooma🍏🍎)"
  ]
  const puzzle = new Puzzle('puzzle-container', images, texts, {
    difficulty: 1, // Dificultad
    pieceSize: 75, // 100x100 px pieces
    showModel: true, // Show model image above puzzle
    modelSize: 225 // Size of the model image
  });

  document.getElementById('shuffle-btn').addEventListener('click', () => {
      puzzle.managePuzzles();
  });

  document.getElementById('solve-btn').addEventListener('click', () => {
      puzzle.solvePuzzle();
  });

  yearSelector.classList.toggle("hidden")
  secondYear.classList.toggle("hidden")
}
years25.addEventListener("click", showYear25)

// Show couple1
function showCouple1() {
  yearSelector.classList.toggle("hidden")
  firstCouple.classList.toggle("hidden")
  leftTextSelector.classList.add('typewriter');
  const couple1Dialog = new Dialog(couple1Params.backgroundArray, couple1Params.leftText, 1)
  function leftActive(){
    couple1Dialog.leftActive()
  }
  function showCard(){
    couple1Dialog.showCard()
  }
  function trigger(event){
    couple1Dialog.trigger(event)
  }
  couple1Dialog.leftActive()
  couple1Dialog.leftDialogBox.addEventListener("click", leftActive)
  couple1Dialog.cardButton.addEventListener("click", showCard)
  couple1Dialog.cardList.forEach((card) => {
      card.addEventListener("click", trigger)
  })
}
couple1.addEventListener("click", showCouple1)

/* 
<<<<<<<<<<<<<<<<<<<< TIMER JS CODE >>>>>>>>>>>>>>>>>>>>>>>>>
*/

const countDownClock = (number) => {
  const d = document;
  const daysElement = d.querySelector('.days');
  const hoursElement = d.querySelector('.hours');
  const minutesElement = d.querySelector('.minutes');
  const secondsElement = d.querySelector('.seconds');
  let countdown;

  // Start the timer with the given format
  timer(number);

  function timer(miliseconds) {
    const now = Date.now();
    const then = now + miliseconds;

    countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
    
      if (secondsLeft <= 0) {
        clearInterval(countdown);
        setTimeout(() => {
          loader.classList.add("hidden")
        }, 1000);
        years25.children[0].classList.add("hidden")
        return;
      };

      displayTimeLeft(secondsLeft);
    }, 1000);
  }

  function displayTimeLeft(secondsLeft) {
    const second = 1;
    const minute = second * 60;
    const hour   = minute * 60;
    const day    = hour * 24;

    const days = Math.floor(secondsLeft / day);
    const hours = Math.floor((secondsLeft % day) / hour);
    const minutes = Math.floor((secondsLeft % hour) / minute);
    const seconds = secondsLeft % minute < 10 ? `0${secondsLeft % minute}` : secondsLeft % minute;

    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
    setTimeout(() => {
      loader.classList.add("hidden")
    }, 1000);
  }

}


let date1 = new Date();
let date2 = new Date("08/28/2024");

// Calculating the time difference
// of two dates
let timeDiff =
    date2.getTime() - date1.getTime();

// Calculating the no. of days between
// two dates
let daysRemaining =
    Math.round
        (timeDiff / (1000 * 3600 * 24));

countDownClock(timeDiff);



