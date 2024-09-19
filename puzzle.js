export class Puzzle {
    constructor(containerId, images,texts, options = {}) {
        this.container = document.getElementById(containerId);
        this.images = images;
        this.texts = texts
        this.puzzleNum = 0;
        this.startImagePath = this.images[this.puzzleNum].start;
        this.finalImagePath = this.images[this.puzzleNum].finish;
        this.gridSize = { rows: 4*options.difficulty, columns: 3*options.difficulty }; // 4x3 grid
        this.pieceSize = options.pieceSize/options.difficulty || 100/options.difficulty; // Default 100x100 px pieces
        this.showModel = options.showModel || false; // Display model image
        this.modelSize = options.modelSize || 200; // Default size of model image

        this.pieces = [];
        
        this.createPuzzle();
        if (this.showModel) {
            this.displayModelImage();
        }
    }

    createPuzzle() {
        
        this.container.style.position = 'relative';
        this.container.style.width = `${this.gridSize.columns * this.pieceSize}px`;
        this.container.style.height = `${this.gridSize.rows * this.pieceSize}px`;
        this.container.innerHTML = '';

        for (let row = 0; row < this.gridSize.rows; row++) {
            for (let col = 0; col < this.gridSize.columns; col++) {
                const piece = document.createElement('div');
                piece.classList.add('puzzle-piece');
                piece.style.width = `${this.pieceSize}px`;
                piece.style.height = `${this.pieceSize}px`;
                piece.style.position = 'absolute';
                piece.style.left = `${col * this.pieceSize}px`;
                piece.style.top = `${row * this.pieceSize}px`;
                piece.style.backgroundImage = `url(${this.startImagePath})`;
                piece.style.backgroundPosition = `-${col * this.pieceSize}px -${row * this.pieceSize}px`;
                piece.style.backgroundSize = `${this.gridSize.columns * this.pieceSize}px ${this.gridSize.rows * this.pieceSize}px`;
                piece.style.cursor = 'pointer';
                piece.draggable = true;

                piece.dataset.correctX = col;
                piece.dataset.correctY = row;
                piece.dataset.currentX = col;
                piece.dataset.currentY = row;

                // Eventos para escritorio
                piece.addEventListener('dragstart', this.dragStart.bind(this));
                piece.addEventListener('dragover', this.dragOver.bind(this));
                piece.addEventListener('drop', this.drop.bind(this));

                // Eventos para dispositivos móviles
                piece.addEventListener('touchstart', this.touchStart.bind(this), { passive: false });
                piece.addEventListener('touchmove', this.touchMove.bind(this), { passive: false });
                piece.addEventListener('touchend', this.touchEnd.bind(this));

                this.pieces.push(piece);
                this.container.appendChild(piece);
            }
        }

        // Mezclar las piezas al iniciar
        this.shufflePieces();
    }

    displayModelImage() {
        const modelImage = document.createElement('img');
        modelImage.classList.add("modelPhoto")
        modelImage.src = this.startImagePath;
        modelImage.alt = 'Puzzle Model';
        modelImage.style.width = `${this.modelSize}px`;
        modelImage.style.height = 'auto';
        modelImage.style.marginBottom = '20px';
        this.container.insertAdjacentElement('afterend', modelImage);
    }

    displayText(text) {
        const existantText = document.querySelector('.completion-text');
        if (existantText) {
            existantText.remove();
        }
        const textDiv = document.createElement('div');
        textDiv.classList.add("completion-text")
        textDiv.innerText = text;
        this.container.insertAdjacentElement('afterend', textDiv);
    }

    shufflePieces() {
        const numShuffles = 1000;
        for (let i = 0; i < numShuffles; i++) {
            const randomPiece = this.pieces[Math.floor(Math.random() * this.pieces.length)];
            const targetPiece = this.pieces[Math.floor(Math.random() * this.pieces.length)];

            if (randomPiece !== targetPiece) {
                this.swapPositions(randomPiece, targetPiece);
            }
        }
    }

    swapPositions(piece, targetPiece) {
        const pieceX = parseInt(piece.dataset.currentX);
        const pieceY = parseInt(piece.dataset.currentY);
        const targetX = parseInt(targetPiece.dataset.currentX);
        const targetY = parseInt(targetPiece.dataset.currentY);

        piece.style.left = `${targetX * this.pieceSize}px`;
        piece.style.top = `${targetY * this.pieceSize}px`;

        targetPiece.style.left = `${pieceX * this.pieceSize}px`;
        targetPiece.style.top = `${pieceY * this.pieceSize}px`;

        piece.dataset.currentX = targetX;
        piece.dataset.currentY = targetY;

        targetPiece.dataset.currentX = pieceX;
        targetPiece.dataset.currentY = pieceY;
    }

    touchStart(event) {
        event.preventDefault();
        const touch = event.touches[0];
        const piece = event.target;
        this.dragStartPiece = piece;
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        this.initialLeft = parseFloat(piece.style.left);
        this.initialTop = parseFloat(piece.style.top);
    }

    touchMove(event) {
        event.preventDefault();
        const touch = event.touches[0];
        const dx = touch.clientX - this.touchStartX;
        const dy = touch.clientY - this.touchStartY;
        this.dragStartPiece.style.left = `${this.initialLeft + dx}px`;
        this.dragStartPiece.style.top = `${this.initialTop + dy}px`;
    }

    touchEnd(event) {
        event.preventDefault();
        const piece = this.dragStartPiece;
        const targetX = Math.round(parseFloat(piece.style.left) / this.pieceSize);
        const targetY = Math.round(parseFloat(piece.style.top) / this.pieceSize);

        if (targetX >= 0 && targetX < this.gridSize.columns && targetY >= 0 && targetY < this.gridSize.rows) {
            const targetPiece = this.pieces.find(p => parseInt(p.dataset.currentX) === targetX && parseInt(p.dataset.currentY) === targetY);
            if (targetPiece) {
                this.swapPositions(piece, targetPiece);
            } else {
                piece.style.left = `${piece.dataset.currentX * this.pieceSize}px`;
                piece.style.top = `${piece.dataset.currentY * this.pieceSize}px`;
            }
        } else {
            piece.style.left = `${piece.dataset.currentX * this.pieceSize}px`;
            piece.style.top = `${piece.dataset.currentY * this.pieceSize}px`;
        }
        this.dragStartPiece = null;

        if (this.checkSolution()) {
            alert('¡Felicidades, has completado el rompecabezas!');
        }
    }

    dragStart(event) {
        const piece = event.target;
        event.dataTransfer.setData('text/plain', JSON.stringify({
            piece: {
                x: parseInt(piece.dataset.currentX),
                y: parseInt(piece.dataset.currentY)
            }
        }));
    }

    dragOver(event) {
        event.preventDefault();
    }

    drop(event) {
        console.log(event);
        event.preventDefault();
        const pieceData = JSON.parse(event.dataTransfer.getData('text/plain'));
        const piece = this.pieces.find(p =>
            parseInt(p.dataset.currentX) === pieceData.piece.x &&
            parseInt(p.dataset.currentY) === pieceData.piece.y
        );

        if (piece) {
            const targetPiece = event.target;
            if (targetPiece && targetPiece.classList.contains('puzzle-piece')) {
                this.swapPositions(piece, targetPiece);
            }
        }

        if (this.checkSolution()) {
            alert('¡Felicidades, has completado el rompecabezas!');
        }
    }

    checkSolution() {
        const isSolved = this.pieces.every(piece => {
            const correctX = piece.dataset.correctX * this.pieceSize;
            const correctY = piece.dataset.correctY * this.pieceSize;
            return parseInt(piece.style.left) === correctX && parseInt(piece.style.top) === correctY;
        });
    
        if (isSolved) {
            document.getElementsByClassName("modelPhoto")[0].setAttribute("src", this.finalImagePath);
            this.displayText(this.texts[this.puzzleNum])
            
            let solveBtn = document.getElementById('solve-btn');
            solveBtn.textContent = 'Next'; // Cambiar el texto del botón
            solveBtn.parentNode.replaceChild(solveBtn.cloneNode(true),solveBtn) // Eliminar evento "resolver"
            solveBtn = document.getElementById('solve-btn');
            solveBtn.addEventListener('click',() => {
                this.nextPuzzle()
            }); // Añadir evento "next"
        }
        if(isSolved && this.puzzleNum === 2){
            const solveBtn = document.getElementById('solve-btn');
            const shuffleBtn = document.getElementById('shuffle-btn')
            solveBtn.classList.add("hidden")
            shuffleBtn.classList.add("hidden")
        }
        return isSolved;
    }

    nextPuzzle() {
        // Incrementa el número de puzzle si se ha resuelto el actual
        this.puzzleNum++;
        
        if (this.puzzleNum >= this.images.length) {
            this.puzzleNum = 0; // Reinicia si se alcanzó el final de la lista
            return
        }
        
        // Esconde el texto al cambiar de puzle
        document.getElementsByClassName("completion-text")[0].style.display = 'none';
        
        // Restablece el botón a "Resolver"
        let solveBtn = document.getElementById('solve-btn');
        solveBtn.textContent = 'Resolver'; // Cambia el texto del botón a "Resolver"
        solveBtn.parentNode.replaceChild(solveBtn.cloneNode(true),solveBtn); // Elimina el evento "Next"
        solveBtn = document.getElementById('solve-btn');
        solveBtn.addEventListener('click', () => {
            this.solvePuzzle()
        }); // Añade el evento "Resolver"
        
        // Actualiza las rutas de imágenes
        this.startImagePath = this.images[this.puzzleNum].start;
        this.finalImagePath = this.images[this.puzzleNum].finish;
        
        // Limpiar el contenedor de las piezas anteriores
        this.container.innerHTML = '';
        this.pieces = []; // Reinicia la lista de piezas
        
        // Actualiza la imagen del modelo (la que se muestra como referencia)
        const modelPhoto = document.getElementsByClassName("modelPhoto")[0];
        if (modelPhoto) {
            modelPhoto.setAttribute("src", this.startImagePath);
        }

        // Crear el nuevo puzzle
        this.createPuzzle();
    }

    managePuzzles() {
        if (this.checkSolution()) {
            this.nextPuzzle(); // Pasa al siguiente puzzle si se resolvió el actual
        } else {
            this.shufflePieces(); // Mezcla las piezas si no se resolvió correctamente
        }
    }

    solvePuzzle() {
        this.pieces.forEach(piece => {
            piece.style.left = `${piece.dataset.correctX * this.pieceSize}px`;
            piece.style.top = `${piece.dataset.correctY * this.pieceSize}px`;
        });
        setTimeout(() => {
            if (this.checkSolution()) {
                alert('Felicidades!! Has completado el puzzle (Además de preciosa, lista😍)');
            }
        }, 200);
    }
}
