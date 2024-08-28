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
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {

                const piece = document.createElement('div');
                piece.classList.add('puzzle-piece');
                piece.style.width = `${this.pieceSize}px`;
                piece.style.height = `${this.pieceSize}px`;
                piece.style.position = 'absolute';
                piece.style.left = `${x * this.pieceSize}px`;
                piece.style.top = `${y * this.pieceSize}px`;
                piece.style.backgroundImage = `url(${this.imagePath})`;
                piece.style.backgroundPosition = `-${x * this.pieceSize}px -${y * this.pieceSize}px`;
                piece.style.backgroundSize = `${this.gridSize * this.pieceSize}px ${this.gridSize * this.pieceSize}px`;
                piece.style.border = '1px solid #000';
                piece.style.cursor = 'pointer';
                piece.draggable = true;

                piece.dataset.correctX = x;
                piece.dataset.correctY = y;
                piece.dataset.currentX = x;
                piece.dataset.currentY = y;

                // Drag and drop events
                piece.addEventListener('dragstart', this.dragStart.bind(this));
                piece.addEventListener('dragover', this.dragOver.bind(this));
                piece.addEventListener('drop', this.drop.bind(this));

                this.pieces.push(piece);
                this.container.appendChild(piece);
            }
        }

        // Shuffle pieces at startup
        this.shufflePieces();
    }

    displayModelImage() {
        const modelImage = document.createElement('img');
        modelImage.src = this.imagePath;
        modelImage.alt = 'Puzzle Model';
        modelImage.style.width = `${this.modelSize}px`;
        modelImage.style.height = 'auto';
        modelImage.style.marginBottom = '20px';
        this.container.insertAdjacentElement('beforebegin', modelImage);
    }

    shufflePieces() {
        // Shuffle pieces
        const numShuffles = 1000;
        for (let i = 0; i < numShuffles; i++) {
            const randomPiece = this.pieces[Math.floor(Math.random() * this.pieces.length)];
            const emptyPiece = this.pieces.find(p => 
                parseInt(p.dataset.currentX) === this.emptySlot.x && 
                parseInt(p.dataset.currentY) === this.emptySlot.y
            );

            if (emptyPiece) {
                this.swapPositions(randomPiece, emptyPiece);
            }
        }
    }

    swapPositions(piece, emptyPiece) {
        if (!piece || !emptyPiece) return; // Avoid errors if pieces are undefined

        // Get the current position of the piece
        const pieceX = parseInt(piece.dataset.currentX);
        const pieceY = parseInt(piece.dataset.currentY);

        // Get the position of the empty slot
        const emptyX = parseInt(emptyPiece.dataset.currentX);
        const emptyY = parseInt(emptyPiece.dataset.currentY);

        // Swap positions
        piece.style.left = `${emptyX * this.pieceSize}px`;
        piece.style.top = `${emptyY * this.pieceSize}px`;

        emptyPiece.style.left = `${pieceX * this.pieceSize}px`;
        emptyPiece.style.top = `${pieceY * this.pieceSize}px`;

        // Update dataset values
        piece.dataset.currentX = emptyX;
        piece.dataset.currentY = emptyY;

        emptyPiece.dataset.currentX = pieceX;
        emptyPiece.dataset.currentY = pieceY;
    }

    dragStart(event) {
        const piece = event.target;
        event.dataTransfer.setData('text/plain', JSON.stringify({
            piece: {
                x: parseInt(piece.dataset.currentX),
                y: parseInt(piece.dataset.currentY)
            }
        }));
        piece.style.opacity = '0.5'; // Visual feedback when dragging
    }

    dragOver(event) {
        event.preventDefault(); // Allow dropping
    }

    drop(event) {
        event.preventDefault();
        const pieceData = JSON.parse(event.dataTransfer.getData('text/plain'));
        const piece = this.pieces.find(p => 
            parseInt(p.dataset.currentX) === pieceData.piece.x &&
            parseInt(p.dataset.currentY) === pieceData.piece.y
        );

        if (piece) {
            const emptyPiece = this.pieces.find(p => 
                parseInt(p.dataset.currentX) === this.emptySlot.x && 
                parseInt(p.dataset.currentY) === this.emptySlot.y
            );

            if (emptyPiece) {
                this.swapPositions(piece, emptyPiece);
                this.emptySlot.x = parseInt(piece.dataset.currentX);
                this.emptySlot.y = parseInt(piece.dataset.currentY);
                
                if (this.checkSolution()) {
                    alert('Congratulations, you have completed the puzzle!');
                }
            }
        }

        event.target.style.opacity = '1';
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