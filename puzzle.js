export class Puzzle {
    constructor(containerId, imagePath, options = {}) {
        this.container = document.getElementById(containerId);
        this.imagePath = imagePath;
        this.gridSize = options.gridSize || 4; // Default 4x4 grid
        this.pieceSize = options.pieceSize || 100; // Default 100x100 px pieces
        this.showModel = options.showModel || false; // Display model image
        this.modelSize = options.modelSize || 200; // Default size of model image

        this.pieces = [];
        this.emptySlot = { x: this.gridSize - 1, y: this.gridSize - 1 }; // Última posición será el hueco vacío
        this.createPuzzle();
        if (this.showModel) {
            this.displayModelImage();
        }
    }

    createPuzzle() {
        this.container.style.position = 'relative';
        this.container.style.width = `${this.gridSize * this.pieceSize}px`;
        this.container.style.height = `${this.gridSize * this.pieceSize}px`;
        this.container.innerHTML = '';

        // Crear todas las piezas
        for (let y = 0; y <= this.gridSize; y++) {
            for (let x = 0; x <= this.gridSize; x++) {
                if (x === this.gridSize - 1 && y === this.gridSize - 1) {
                    // No crear pieza para el hueco vacío
                    continue;
                }

                const piece = document.createElement('div');
                piece.classList.add('puzzle-piece');
                piece.style.width = `${this.pieceSize}px`;
                piece.style.height = `${this.pieceSize}px`;
                piece.style.left = `${x * this.pieceSize}px`;
                piece.style.top = `${y * this.pieceSize}px`;
                piece.style.backgroundImage = `url(${this.imagePath})`;
                piece.style.backgroundPosition = `-${x * this.pieceSize}px -${y * this.pieceSize}px`;
                piece.style.backgroundSize = `${this.gridSize * this.pieceSize}px ${this.gridSize * this.pieceSize}px`;
                piece.style.position = 'absolute';
                piece.style.border = '1px solid #000';
                piece.style.cursor = 'pointer';
                piece.draggable = true; // Habilitar el arrastre
                piece.dataset.correctX = x;
                piece.dataset.correctY = y;
                piece.dataset.currentX = x;
                piece.dataset.currentY = y;

                // Eventos de drag and drop
                piece.addEventListener('dragstart', this.dragStart.bind(this));
                piece.addEventListener('dragover', this.dragOver.bind(this));
                piece.addEventListener('drop', this.drop.bind(this));

                this.pieces.push(piece);
                this.container.appendChild(piece);
            }
        }

        // Mezclar piezas al iniciar
        this.shufflePieces();
    }

    displayModelImage() {
        const modelImage = document.createElement('img');
        modelImage.src = this.imagePath;
        modelImage.alt = 'Modelo de Puzzle';
        modelImage.style.width = `${this.modelSize}px`;
        modelImage.style.height = 'auto';
        modelImage.style.marginBottom = '20px';
        this.container.insertAdjacentElement('beforebegin', modelImage);
    }

    shufflePieces() {
        // Mezclar piezas
        const numShuffles = 1000;
        const emptyPiece = document.createElement('div');
        emptyPiece.style.position = 'absolute';
        emptyPiece.style.width = `${this.pieceSize}px`;
        emptyPiece.style.height = `${this.pieceSize}px`;
        emptyPiece.style.left = `${this.emptySlot.x * this.pieceSize}px`;
        emptyPiece.style.top = `${this.emptySlot.y * this.pieceSize}px`;
        this.container.appendChild(emptyPiece);

        for (let i = 0; i < numShuffles; i++) {
            const randomPiece = this.pieces[Math.floor(Math.random() * this.pieces.length)];
            this.swapPositions(randomPiece, emptyPiece);
        }
        
        this.container.removeChild(emptyPiece);
    }

    swapPositions(piece, emptyPiece) {
        if (!piece) return; // Evitar errores si la pieza no existe

        const pieceX = parseInt(piece.dataset.currentX);
        const pieceY = parseInt(piece.dataset.currentY);
        const emptyX = parseInt(emptyPiece.style.left) / this.pieceSize;
        const emptyY = parseInt(emptyPiece.style.top) / this.pieceSize;

        piece.style.left = `${emptyX * this.pieceSize}px`;
        piece.style.top = `${emptyY * this.pieceSize}px`;

        emptyPiece.style.left = `${pieceX * this.pieceSize}px`;
        emptyPiece.style.top = `${pieceY * this.pieceSize}px`;

        // Actualizar datos de posición
        piece.dataset.currentX = emptyX;
        piece.dataset.currentY = emptyY;

        emptyPiece.dataset.currentX = pieceX;
        emptyPiece.dataset.currentY = pieceY;
    }

    dragStart(event) {
        const piece = event.target;
        event.dataTransfer.setData('text/plain', JSON.stringify({
            left: piece.style.left,
            top: piece.style.top,
            currentX: piece.dataset.currentX,
            currentY: piece.dataset.currentY
        }));
        setTimeout(() => {
            piece.style.opacity = '0.5'; // Visual feedback when dragging
        }, 0);
    }

    dragOver(event) {
        event.preventDefault(); // Permitir el drop
    }

    drop(event) {
        event.preventDefault();

        const piece = event.target;
        const draggedPieceData = JSON.parse(event.dataTransfer.getData('text/plain'));

        // Intercambiar posiciones si no se está arrastrando la pieza sobre sí misma
        if (piece !== event.target) {
            const emptyPiece = this.pieces.find(p => parseInt(p.dataset.currentX) === this.emptySlot.x && parseInt(p.dataset.currentY) === this.emptySlot.y);
            if (emptyPiece) {
                this.swapPositions(piece, emptyPiece);
                this.emptySlot.x = parseInt(piece.dataset.currentX);
                this.emptySlot.y = parseInt(piece.dataset.currentY);
                if (this.checkSolution()) {
                    alert('¡Felicidades, has completado el puzzle!');
                }
            }
        }

        piece.style.opacity = '1';
    }

    checkSolution() {
        return this.pieces.every(piece => {
            const correctX = piece.dataset.correctX * this.pieceSize;
            const correctY = piece.dataset.correctY * this.pieceSize;
            return parseInt(piece.style.left) === correctX && parseInt(piece.style.top) === correctY;
        });
    }

    solvePuzzle() {
        this.pieces.forEach(piece => {
            piece.style.left = `${piece.dataset.correctX * this.pieceSize}px`;
            piece.style.top = `${piece.dataset.correctY * this.pieceSize}px`;
        });
        this.emptySlot.x = this.gridSize - 1;
        this.emptySlot.y = this.gridSize - 1;
    }
}