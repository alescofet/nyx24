// Get the dialog boxes
const leftDialogBox = document.querySelector('.left-dialog-box');
const rightDialogBox = document.querySelector('.right-dialog-box');
let initial = true
let active = 'left'
// Add animation classes to the dialog boxes

// Get the text elements
const leftTextSelector = leftDialogBox.querySelector('.text');
const rightTextSelector = rightDialogBox.querySelector('.text');

const leftText = "¡Hola! Espero que estés bien. Quería contarte cómo ha ido mi día. Por la mañana, tuve una reunión muy productiva en el trabajo. Luego, almorcé con un viejo amigo y disfrutamos de una agradable conversación. Después, pasé un rato en el parque, disfrutando del buen clima. Por la tarde, terminé algunos pendientes y luego fui al gimnasio para hacer ejercicio. Ahora estoy en casa, relajándome y pensando en qué hacer esta noche. ¿Cómo ha sido tu día? Me encantaría escuchar tus experiencias. ¡Hasta luego!";

const rightText = "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const context = new AudioContext();

const playSound = () => {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
  
    oscillator.type = 'square'; // Set oscillator type to square wave
    oscillator.frequency.setValueAtTime(800, context.currentTime); // Set frequency for the desired "blip" sound
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
  
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.1); // Fade out the sound quickly
  };

const animateText = (textElement, text) => {
  const initialText = text;
  textElement.innerHTML = '';

  let currentCharIndex = 0;
  const type = () => {
    if (currentCharIndex < initialText.length) {
      textElement.innerHTML += initialText.charAt(currentCharIndex);
      currentCharIndex++;
      playSound(); // Play the sound effect for each letter
      setTimeout(type, 60); // Adjust the delay between each letter appearance
    }
  };

  type();
};

const rightActive = () => {
    if(leftTextSelector.innerHTML.length != leftText.length || (active !== 'left' && !initial)){
        return
    }
    active = "right"
    rightDialogBox.classList.add('grow');
    leftDialogBox.classList.remove('grow');
    rightDialogBox.classList.remove('shrink');
    leftDialogBox.classList.add('shrink');
    animateText(rightTextSelector, rightText)
}

const leftActive = () => {
    if(rightTextSelector.innerHTML.length != rightText.length && !initial || (active !== 'right' && !initial)){
        return
    }
    initial = false
    active = "left"
    leftDialogBox.classList.add('grow');
    rightDialogBox.classList.remove('grow');
    leftDialogBox.classList.remove('shrink');
    rightDialogBox.classList.add('shrink');
    animateText(leftTextSelector, leftText)
}

// Add text appearance animation to the text elements
leftTextSelector.classList.add('typewriter');
rightTextSelector.classList.add('typewriter');
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
  console.log(event.target.offsetParent);
  const cardNum = event.target.offsetParent.id.split("-")[1]
	if(!animationOngoing){
		animationOngoing = true	
		side = side*-1
		loop(cardNum-1)
	}
}

cardList.forEach((card)=>{
  card.addEventListener("click",trigger)
})

