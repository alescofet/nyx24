// Get the dialog boxes
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
  "black-background"
]
// Add animation classes to the dialog boxes

// Get the text elements
const leftTextSelector = leftDialogBox.querySelector('.text');

const leftText = ["¡Felicidades, Nicol! Como ya te he comentado algunas veces, no suelo escribir textos muy largos, pero como es tu cumple y sé que te gustará recibirlo, aquí lo tienes.",

"Cuando nos conocimos, pensé que eras muy mona, incluso demasiado, y que igual no salía bien. Luego dijimos de quedar y, para variar, llegué tarde (otro punto que me hizo pensar que no saldría bien 😅), pero todo fluyó super bien, y cuando me despedí de ti y cogí el tren para volver a casa, me encontré pensando dónde podríamos quedar el próximo día.",

"Al día siguiente, quedamos para ir a algún lugar, esta vez en Sancu para que no llegara tarde (casi llego antes que tú, imagínate). Otra tarde que se me pasó volando, tanto que te dije de llevarte en coche para estar un rato más juntos 😅.",

"Un par de semanas después (por lo visto, es a lo que la gente normal llama quedar MUY seguido 😜), tocó coreano y también me lo pasé muy bien, el tiempo volaba casi tan rápido como el dinero (ese coreano me ha marcado para toda la vida, aunque el hecho de que cambiaras tus planes por mí me hizo mucha ilusión 🥰). Después de perdernos por Sarrià, llegué a casa y seguía pensando en quedar contigo otra vez, así que te pregunté por tu ocupada agenda y tachán, hasta dentro de 2 semanas nada 😓.",

"Pero de repente me llegó un mensaje tuyo un viernes por la mañana diciéndome si quería quedar para comer. Esta vez quedamos en mi casa y comimos en la terraza, al solete. Otra tarde más que se me pasó volando, y al ir a despedirme para llevarte a casa, hubo un momento en el que estábamos muy cerca mirándonos a los ojos, y pensé que nos íbamos a besar, pero nos separamos y no pasó nada. (Aunque esa misma tarde me llegó el primer \"textaco\", así que valió la pena 😜).",

"Después te fuiste a Burdeos y llegó Semana Santa, así que adivina qué... 3 semanas más sin verte 😓. Aunque la espera valió la pena, tocó tarde de chill en casa, jugando a la Switch y viendo un par de pelis, y por fin al acabar nos besamos (después de estar mandándote señales que tú no viste durante toda la tarde... 😜).",

"Aunque después me dijiste que hasta 3 semanas después no había hueco en tu apretada agenda... Así que me armé de paciencia para aguantar, y fuimos hablando por Whats e Insta, hasta que un día que ibas al Alienzone y en teoría no podías pasarte antes, cambiaste de opinión y pudimos estar un rato juntos. Fue el primer día que quedábamos y que podía darte mimos sin miedo, y a día de hoy aún no sé cuánto rato estuvimos, solo sé que se me pasó como si solo hubieran sido segundos...",

"A partir de ese día, empezamos a quedar más seguido, ya fuera para descubrir nuevos restaurantes o para ver series o jugar al ordenador, y cada día que pasaba me iba dando cuenta de que, pese a que dijimos que estábamos de rollo, no tenía ganas de quedar con nadie que no fueras tú.",

"Y así fueron pasando las semanas hasta aquel día en el jardín de casa de mis abuelos, cuando con esa carita que pones cuando algo te da vergüenza, me dijiste que tenías un texto para mí, pero que tenía que leerlo por dentro y sin mirarte, y te pusiste detrás de mí abrazándome y escondiendo tu cara en mi espalda.",

"No te negaré que a medida que iba leyendo, me subía un escalofrío por la espalda (a mí también me da un poco de vergu que me digas lo que sientes 😅, aunque me encanta 🥰), y cuando llegué al final, no podía aguantar las ganas de decirte lo mucho que quería estar contigo desde hacía tiempo.",

"Desde entonces, todo han sido alegrías, y cada vez me doy cuenta de lo mucho que me aportas y lo bien que estoy contigo, así que espero poder celebrar muchos cumpleaños más contigo. ¡Te quiero, Nicol! 😘"]; //INSTAGRAM abril-mayo

const rightText = "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const context = new AudioContext();

const playSound = () => {
/*     const oscillator = context.createOscillator();
    const gainNode = context.createGain();
  
    oscillator.type = 'sine'; // Set oscillator type to square wave
    oscillator.frequency.setValueAtTime(800, context.currentTime); // Set frequency for the desired "blip" sound
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
  
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.2); // Fade out the sound quickly */
  };

const animateText = (textElement, text) => {
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
      playSound(); // Play the sound effect for each letter
      setTimeout(type, 50); // Adjust the delay between each letter appearance
    }else{textAnimationActive = false}
  };

  type();
};


const leftActive = () => {
  if(!textAnimationActive){
    if(!initial && index < leftText.length-1){
      dialogScene.classList.remove(backgroundArray[index])
      index++
      if(index === 0 || index === 7 || index === 10){
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
leftTextSelector.classList.add('typewriter');
leftActive()

// Show card

const cardContainer = document.querySelector('.card-container')
const showCard = ()=>{
    cardContainer.classList.toggle('hidden')
}
let cardButton = document.getElementById("card-button");
cardButton.addEventListener("click",showCard)

//Card Scripts

const cardList = document.querySelectorAll('.card');
const cardMiddleList = document.querySelectorAll('.card-middle');
const cardBottomList = document.querySelectorAll('.card-bottom');
const r = 10;


let angle = 0, x, y;
let side = -1
let animationOngoing = false

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
  card.addEventListener("click",trigger)
})

window.addEventListener('load', function() {
  var preloader = document.getElementById('preloader');
  var images = preloader.getElementsByTagName('img');

  for (var i = 0; i < images.length; i++) {
    var image = new Image();
    image.src = images[i].src;
  }
});

