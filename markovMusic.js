class MarkovMusic {
    constructor(playFn, library) {
        this.playFn = playFn;
        this.library = library;
        this.matrix = [];
        this.end = false;
        this.generatedSequence = [];
    }

    useMatrix(matrix) {
        if (matrix.length === this.library.length && matrix[0].length === this.library.length) {
            this.matrix = matrix;
        }
    }

    generateMatrix() {
        //Create square matrix with equal probabilities
        for (let i = 0; i < this.library.length; i++) {
            this.matrix.push([]);
            for (let j = 0; j < this.library.length; j++) {
                this.matrix[i].push(0);
            }

            const p = parseFloat((1 / this.library.length).toFixed(3));
            for (let j = 0; j < this.matrix[i].length; j++) {
                this.matrix[i][j] = p;
            }
        }
    }

    play() {
        if (this.matrix.length <= 0) {
            this.generateMatrix();
        }
        this.end = false;
        this.generatedSequence = [];

        this.moveFromState(0);
    }

    stop() {
        this.end = true;
        return this.generatedSequence;
    }

    moveFromState(row) {
        if (this.end) {
            return;
        }

        let found = false;
        let curCol = 0;
        while (!found) {
            let diceRoll = Math.random() * 1;
            if (diceRoll <= this.matrix[row][curCol]) {
                found = true;
            } else {
                curCol++;
                curCol = curCol % this.matrix.length;
            }
        }
        this.playFn(this.library[curCol]);
        this.generatedSequence.push(this.library[curCol]);
        setTimeout(() => {
            this.moveFromState(curCol);
        }, 500);
    }
}
