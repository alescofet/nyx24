//Initialize Variables
const checkLoaded = setInterval(() => {
  if(document.getElementById("yearSelector").classList.contains("hidden")){
      document.getElementById("loader").classList.remove("hidden")
  } else { 
      document.getElementById("loader").classList.add("hidden")
      clearInterval(checkLoaded)
  }
}, 2500);
//General Variables
let passcode = false
let horizontalScreen = false
const localStorage = window.localStorage
const alreadySeen = localStorage.getItem("alreadySeen")

//Card Variables
var cardContainer = document.querySelector('.card-container')
var cardButton = document.getElementById("card-button");
var cardList = document.querySelectorAll('.card');
var cardMiddleList = document.querySelectorAll('.card-middle');
var cardBottomList = document.querySelectorAll('.card-bottom');
var r = 10;
var angle = 0, x, y;
var side = -1
var animationOngoing = false

//Dialog Variables
const leftDialogBox = document.querySelector('.left-dialog-box');
const dialogScene = document.querySelector('.dialog-scene');
const ring = document.querySelector('.circle');
let initial = true
let active = 'left'
let index = 0
let textAnimationActive = false
let backgroundArray = [
  "black-background",
  "coffee-background",
  "terrace-background",
  "corean-background",
  "rooftop-background",
  "restroom-background",
  "dormitory-background",
  "black-background",
  "garden-background",
  "garden-background",
  "black-background",
  "black-background",
  "black-background",
]

const leftTextSelector = leftDialogBox.querySelector('.text');

const leftText = [
  "¡Felicidades, Nicol! Como ya te he comentado algunas veces, no suelo escribir textos muy largos, pero como es tu cumple y sé que te gustará recibirlo, aquí lo tienes.",

"Cuando nos conocimos, pensé que eras muy mona, incluso demasiado, y que igual no salía bien. Luego dijimos de quedar y, para variar, llegué tarde (otro punto que me hizo pensar que no saldría bien 😅), pero todo fluyó super bien, y cuando me despedí de ti y cogí el tren para volver a casa, me encontré pensando dónde podríamos quedar el próximo día.",

"Al día siguiente, quedamos para ir al Somewhere, esta vez en Sancu para que no llegara tarde (casi llego antes que tú, imagínate). Otra tarde que se me pasó volando, tanto que te dije de llevarte en coche para estar juntos un rato más 😅.",

"Un par de semanas después (por lo visto, es a lo que la gente normal llama quedar MUY seguido 😜), tocó coreano y también me lo pasé muy bien, el tiempo volaba casi tan rápido como el dinero (ese coreano me ha marcado para toda la vida, aunque el hecho de que cambiaras tus planes por mí me hizo mucha ilusión 🥰). Después de perdernos por Sarrià, llegué a casa y seguía pensando en quedar contigo otra vez, así que te pregunté por tu ocupada agenda y tachán, hasta dentro de 2 semanas nada 😓.",

"Pero de repente me llegó un mensaje tuyo un viernes por la mañana diciéndome si quería quedar para comer. Esta vez quedamos en mi casa y comimos en la terraza, al solete. Otra tarde más que se me pasó volando, y al ir a despedirme para llevarte a casa, hubo un momento en el que estábamos muy cerca mirándonos a los ojos, y pensé que nos íbamos a besar, pero nos separamos y no pasó nada. (Aunque esa misma tarde me llegó el primer \"textaco\", así que valió la pena 😜).",

"Después te fuiste a Burdeos y llegó Semana Santa, así que adivina qué... 3 semanas más sin verte 😓. Aunque la espera valió la pena, tocó tarde de chill en casa, jugando a la Switch y viendo un par de pelis, y por fin al acabar nos besamos (después de estar mandándote señales que tú no viste durante toda la tarde... 😜).",

"Aunque después me dijiste que hasta 3 semanas después no había hueco en tu apretada agenda... Así que me armé de paciencia para aguantar, y fuimos hablando por Whats e Insta, hasta que un día que ibas al Alienzone y en teoría no podías pasarte antes, cambiaste de opinión y pudimos estar un rato juntos. Fue el primer día que quedábamos y que podía darte mimos sin miedo, y a día de hoy aún no sé cuánto rato estuvimos, solo sé que se me pasó como si solo hubieran sido segundos...",

"A partir de ese día, empezamos a quedar más seguido, ya fuera para descubrir nuevos restaurantes o para ver series o jugar al ordenador, y cada día que pasaba me iba dando cuenta de que, pese a que dijimos que estábamos de rollo, no tenía ganas de quedar con nadie que no fueras tú.",

"Y así fueron pasando las semanas hasta aquel día en el jardín de casa de mis abuelos, cuando con esa carita que pones cuando algo te da vergüenza, me dijiste que tenías un texto para mí, pero que tenía que leerlo por dentro y sin mirarte, y te pusiste detrás de mí abrazándome y escondiendo tu cara en mi espalda.",

"No te negaré que a medida que iba leyendo, me subía un escalofrío por la espalda (a mí también me da un poco de vergu que me digas lo que sientes 😅, aunque me encanta 🥰), y cuando llegué al final, no podía aguantar las ganas de decirte lo mucho que quería estar contigo desde hacía tiempo.",

"Desde entonces, todo han sido alegrías, y cada vez me doy cuenta de lo mucho que me aportas y lo bien que estoy contigo, así que espero poder celebrar muchos cumpleaños más contigo. ¡Te quiero mucho, Nicol! 😘",

"Aunque espero que te haya gustado, este no es el único regalo que tengo para tí, dale la vuelta a la siguiente carta y tendrás tu otro regalito 😜"
]; //INSTAGRAM abril-mayo
/* "¿No eres demasiado curiosa tu?🤔 Aquí tienes el regalito de esta semana, igual la semana que viene tienes otro 😜" */

const context = new AudioContext();

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


// Check if already seen

if(alreadySeen){
  const questionReSee = prompt("¿Quieres volver a leer la carta desde el principio?").toLowerCase() === "si"
  if(questionReSee){
    index = 0
  }else {
    index = 11
    //index = 12
  }
}


function animateText (textElement, text){
  if(textAnimationActive){return}
  console.log(text);
  const initialText = text;
  textElement.innerHTML = '';
  
  let currentCharIndex = 0;
  const type = () => {
    textAnimationActive = true
    if (currentCharIndex < initialText.length) {
      textElement.innerHTML += initialText.charAt(currentCharIndex);
      currentCharIndex++;
      setTimeout(type, 50); // Adjust the delay between each letter appearance
      /* setTimeout(type, 1); */ // Uncomment for debugging
    }else{textAnimationActive = false}
  };

  type();
};

function leftActive(){
  if(!textAnimationActive){
    if(index === 11){
      showCard()
      localStorage.setItem("alreadySeen", true)
    }
    /* if(index === 12){
      showCard()
    } */
    if(!initial && index < leftText.length-1){
      dialogScene.classList.remove(backgroundArray[index])
      index++
      if(index === 0 || index === 7 || index >= 10){
        ring.classList.remove("hidden")
      }else{
        ring.classList.add("hidden")
      }
      dialogScene.classList.add(backgroundArray[index])
    }
    initial = false
    active = "left"
    leftDialogBox.classList.add('grow');
    leftDialogBox.classList.remove('shrink');
    animateText(leftTextSelector, leftText[index])
  }
}

// Add text appearance animation to the text elements


// Show card
function showYear24() {
  console.log("toggle year 24");
  document.getElementById("yearSelector").classList.toggle("hidden")
  document.getElementById("firstYear").classList.toggle("hidden")
  leftTextSelector.classList.add('typewriter');
  leftActive()
}
document.getElementById("years24").addEventListener("click", showYear24)

function showCard() {
    cardContainer.classList.toggle('hidden')
    leftDialogBox.classList.toggle('hidden')
}


cardButton.addEventListener("click",showCard)

//Card Scripts

function loop(cardNum) {
    angle+= 0.2*side;
    if(angle*r === 90 && side === 1){
      cardList[cardNum].classList.toggle('card-back')
      cardMiddleList[cardNum].classList.toggle('hidden')
      cardBottomList[cardNum].classList.toggle('hidden')
    }
    if(angle*r === 90 && side === -1){
		cardList[cardNum].classList.toggle('card-back')
		cardMiddleList[cardNum].classList.toggle('hidden')
		cardBottomList[cardNum].classList.toggle('hidden')
	}
	if(angle*r > 180 || angle*r < 0) {
    animationOngoing = false
		return
	}
  
  x = Math.cos(angle) * r;
  y = angle * r;
	
  cardList[cardNum].style.transform = `rotateX(${0}deg) rotateY(${y}deg)`;
  
  requestAnimationFrame(()=> loop(cardNum));

}

function trigger(event) {
  let cardNum = null
  if([1,2,3].includes(+event.target.offsetParent.id.split("-")[1])){
    cardNum = +event.target.offsetParent.id.split("-")[1]
  }
	if(!animationOngoing && cardNum !== null){
		animationOngoing = true	
		side = side*-1
		loop(cardNum-1)
	}
}

cardList.forEach((card)=>{
  console.log("cardTouched");
  card.addEventListener("click",trigger)
})

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
    document.getElementById("yearSelector").classList.remove("hidden")
  }

}


let date1 = new Date();
let date2 = new Date("09/28/2024");

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



