export class Puzzle {
    constructor(containerId, imagePath, options = {}) {
        this.container = document.getElementById(containerId);
        this.imagePath = imagePath;
        this.gridSize = options.gridSize || 4; // Default 4x4 grid
        this.pieceSize = options.pieceSize || 100; // Default 100x100 px pieces
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
        if (!piece || !targetPiece) return; // Avoid errors if pieces are undefined

        // Get the current position of the pieces
        const pieceX = parseInt(piece.dataset.currentX);
        const pieceY = parseInt(piece.dataset.currentY);
        const targetX = parseInt(targetPiece.dataset.currentX);
        const targetY = parseInt(targetPiece.dataset.currentY);

        // Swap positions
        piece.style.left = `${targetX * this.pieceSize}px`;
        piece.style.top = `${targetY * this.pieceSize}px`;

        targetPiece.style.left = `${pieceX * this.pieceSize}px`;
        targetPiece.style.top = `${pieceY * this.pieceSize}px`;

        // Update dataset values
        piece.dataset.currentX = targetX;
        piece.dataset.currentY = targetY;

        targetPiece.dataset.currentX = pieceX;
        targetPiece.dataset.currentY = pieceY;
    }

    dragStart(event) {
        const piece = event.target;
        event.dataTransfer.setData('text/plain', JSON.stringify({
            piece: {
                x: parseInt(piece.dataset.currentX),
                y: parseInt(piece.dataset.currentY)
            }
        }));
        // Maintain brightness of pieces
        piece.style.opacity = '1'; // No change in opacity during drag
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
            const targetPiece = event.target;
            if (targetPiece && targetPiece.classList.contains('puzzle-piece')) {
                this.swapPositions(piece, targetPiece);
                setTimeout(() => {
                    if (this.checkSolution()) {
                        alert('Congratulations, you have completed the puzzle!');
                    }
                }, 200);
            }
        }
    }

    checkSolution() {
        const isSolved = this.pieces.every(piece => {
            const correctX = piece.dataset.correctX * this.pieceSize;
            const correctY = piece.dataset.correctY * this.pieceSize;
            return parseInt(piece.style.left) === correctX && parseInt(piece.style.top) === correctY;
        });

        return isSolved;
    }

    solvePuzzle() {
        this.pieces.forEach(piece => {
            piece.style.left = `${piece.dataset.correctX * this.pieceSize}px`;
            piece.style.top = `${piece.dataset.correctY * this.pieceSize}px`;
        });
    }
}
