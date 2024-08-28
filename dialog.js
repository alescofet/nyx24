export class Dialog {
    constructor(backgroundArray, leftText, year) {
        this.celebration = year > 20 ? "year-" : "couple-"
        this.yearDiv = document.getElementById(this.celebration+year)
        this.year = year
        this.backgroundArray = backgroundArray;
        this.leftText = leftText;
        this.leftDialogBox = this.yearDiv.querySelector('.left-dialog-box');
        this.dialogScene = this.yearDiv.querySelector('.dialog-scene');
        this.ring = this.yearDiv.querySelector('.circle');
        this.initial = true
        this.active = 'left'
        this.index = 0
        this.textAnimationActive = false
        this.leftTextSelector = this.leftDialogBox.querySelector('.text');
        this.cardContainer = this.yearDiv.querySelector('.card-container')
        this.cardButton = this.yearDiv.querySelector("#card-button");
        this.cardList = this.yearDiv.querySelectorAll('.card');
        this.cardMiddleList = this.yearDiv.querySelectorAll('.card-middle');
        this.cardBottomList = this.yearDiv.querySelectorAll('.card-bottom');
        this.r = 10;
        this.x = 0
        this.y = 0
        this.angle = 0, this.x, this.y;
        this.side = -1
        this.animationOngoing = false
        this.localStorage = window.localStorage
        this.alreadySeen = localStorage.getItem("alreadySeen"+year)
        this.checkIfSeen()
    }

    animateText(textElement, text) {
        if (this.textAnimationActive) { return }
        const initialText = text;
        textElement.innerHTML = '';

        let currentCharIndex = 0;
        const type = () => {
            this.textAnimationActive = true
            if (currentCharIndex < initialText.length) {
                textElement.innerHTML += initialText.charAt(currentCharIndex);
                currentCharIndex++;
                setTimeout(type, 50); // Adjust the delay between each letter appearance
                /* setTimeout(type, 1); */ // Uncomment for debugging
            } else { this.textAnimationActive = false }
        };

        type();
    };

    checkBlackScreens() {
        const indexArr = []
        this.backgroundArray.forEach((bg, index) => {
            if (bg === "black-background") {
                indexArr.push(index);
            }
        });
        return indexArr
    }

    leftActive() {
        const blackScreens = this.checkBlackScreens()
        if (!this.textAnimationActive) {
            if (this.index === this.leftText.length - 1) {
                this.dialogScene.classList.remove(this.backgroundArray[this.index])
                this.dialogScene.classList.add("black-background")
                this.ring.classList.remove("hidden")
                this.showCard()
                localStorage.setItem("alreadySeen"+this.year, true)
            }
            /* if(this.index === 12){
              showCard()
            } */
            if(this.initial && !this.dialogScene.classList.contains("black-background")){
                this.ring.classList.add("hidden")
            }
            
            if (!this.initial && this.index < this.leftText.length - 1) {
                this.dialogScene.classList.remove(this.backgroundArray[this.index])
                this.index++
                if (blackScreens.includes(this.index)) {
                    this.ring.classList.remove("hidden")
                } else {
                    this.ring.classList.add("hidden")
                }
                this.dialogScene.classList.add(this.backgroundArray[this.index])
            }
            this.initial = false
            this.active = "left"
            this.leftDialogBox.classList.add('grow');
            this.leftDialogBox.classList.remove('shrink');
            this.animateText(this.leftTextSelector, this.leftText[this.index])
        }
    }

    showCard() {
        this.cardContainer.classList.toggle('hidden')
        this.leftDialogBox.classList.toggle('hidden')
    }

    checkIfSeen(){
    // Check if already seen
    if(this.alreadySeen){
        const questionReSee = prompt("¿Quieres volver a leer la carta desde el principio?").toLowerCase() === "si"
        if(questionReSee){
          this.index = 0
        }else {
          this.index = this.leftText.length - 1
        }
      }
    }


    //Card Scripts

    loop(cardNum) {
        this.angle += 0.2 * this.side;
        if (this.angle * this.r === 90 && this.side === 1) {
            if(this.year === 25){
                this.cardList[cardNum].classList.toggle('card-back-couple-1')
            }else {
                this.cardList[cardNum].classList.toggle('card-back')
            }
            this.cardMiddleList[cardNum].classList.toggle('hidden')
            this.cardBottomList[cardNum].classList.toggle('hidden')
        }
        if (this.angle * this.r === 90 && this.side === -1) {
            if(this.year === 25){
                this.cardList[cardNum].classList.toggle('card-back-couple-1')
            }else {
                this.cardList[cardNum].classList.toggle('card-back')
            }
            this.cardMiddleList[cardNum].classList.toggle('hidden')
            this.cardBottomList[cardNum].classList.toggle('hidden')
        }
        if (this.angle * this.r > 180 || this.angle * this.r < 0) {
            this.animationOngoing = false
            return
        }

        this.x = Math.cos(this.angle) * this.r;
        this.y = this.angle * this.r;

        this.cardList[cardNum].style.transform = `rotateX(${0}deg) rotateY(${this.y}deg)`;

        requestAnimationFrame(() => this.loop(cardNum));

    }

    trigger(event) {
        let cardNum = null
        if ([1, 2, 3].includes(+event.target.offsetParent.id.split("-")[1])) {
            cardNum = +event.target.offsetParent.id.split("-")[1]
        }
        if (!this.animationOngoing && cardNum !== null) {
            this.animationOngoing = true
            this.side = this.side * -1
            this.loop(cardNum - 1)
        }
    }




}