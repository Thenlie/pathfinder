<script setup>
    import { clearMaze } from '../utils/mazeUtil';
    import { create2dArray } from '../utils/arrayUtil';
</script>

<script>
    export default {
        name: 'Generator',
        props: { length: Number, width: Number, mazeArr: Array },
        emits: ['set'],
        methods: {
            async set(arr) {
                await this.$emit('set', arr);
                // console.log(this.mazeArr); // <-- the 'proxy' this logs acts just like an array
            },
            generateMaze() {
                let arr2D = []
                let currX = 0;
                let currY = 0;
                let c = 0
                let running = true;

                const createMazePath = () => {
                    
                    const checkPosition = (x, y) => {
                        if (arr2D[x]) {
                            if (arr2D[x][y] === 0) {
                                return 0;
                            } else if (arr2D[x][y] === '@') {
                                return '@';
                            }
                        } 
                        return null;
                    };

                    const checkSurroundings = (x, y) => {
                        // check for available directions to move
                        let arr = [];
                        if ((checkPosition(x-1, y) === 0) && (checkPosition(x-2, y) === null || checkPosition(x-2, y) === 0) && (checkPosition(x-1, y-1) === null || checkPosition(x-1, y-1) === 0) && (checkPosition(x-1, y+1) === null || checkPosition(x-1, y+1) === 0)) { arr.push('U') };
                        if ((checkPosition(x+1, y) === 0) && (checkPosition(x+1, y-1) === null || checkPosition(x+1, y-1) === 0) && (checkPosition(x+2, y) === null || checkPosition(x+2, y) === 0) && (checkPosition(x+1, y+1) === null || checkPosition(x+1, y+1) === 0)) { arr.push('D') };
                        if ((checkPosition(x, y-1) === 0) && (checkPosition(x-1, y-1) === null || checkPosition(x-1, y-1) === 0) && (checkPosition(x, y-2) === null || checkPosition(x, y-2) === 0) && (checkPosition(x+1, y-1) === null || checkPosition(x+1, y-1) === 0)) { arr.push('L') };
                        if ((checkPosition(x, y+1) === 0) && (checkPosition(x-1, y+1) === null || checkPosition(x-1, y+1) === 0) && (checkPosition(x, y+2) === null || checkPosition(x, y+2) === 0) && (checkPosition(x+1, y+1) === null || checkPosition(x+1, y+1) === 0)) { arr.push('R') };
                        return arr;
                    };

                    // create initial path
                    while (!(currX == this.length-1 && currY == this.width-1)) {
                        c++
                        // safety check
                        if (c > this.length * this.width) {
                            arr2D = [];
                            c = currX = currY = 0;
                            break;
                        }
                        let opts = checkSurroundings(currX, currY);
                        let move = Math.floor(Math.random() * opts.length);
                        // fill cell with character
                        currX === 0 && currY === 0 ? arr2D[currX][currY] = 'S' : arr2D[currX][currY] = '@';
                        // move current position
                        switch (opts[move]) {
                            case 'U':
                                currX--;
                                break;
                            case 'D':
                                currX++;
                                break;
                            case 'L':
                                currY--;
                                break;
                            case 'R':
                                currY++;
                                break;
                        }
                    }
                    // check for finish position
                    if (currX == this.length-1 && currY == this.width-1) {
                        arr2D[currX][currY] = 'F';
                        // console.table(arr2D); // <-- completed array with path
                        running = false;
                    } 
                };

                const createMazeWalls = () => {
                    for (let i = 0; i < this.length; i++) {
                        for (let j = 0; j < this.width; j++) {
                            if ((i !== 0 || j !== 0) && (i !== this.length-1 || j !== this.width-1)) { // not start or finish cell
                                if (arr2D[i][j] === 0) { // ensure cell is not part of path
                                    let n = Math.floor(Math.random() * 100);
                                    if (n < 50) { // random selection 65%
                                        arr2D[i][j] = '#';
                                        // style HTML
                                        let el = document.getElementById(String(i).padStart(2, '0') + String(j).padStart(2, '0'));
                                        el.firstChild.style.backgroundColor = "black";
                                    }
                                } else {
                                    arr2D[i][j] = 0;
                                }
                            }
                        }
                    }
                    // console.table(arr2D); // <-- completed array without path
                    this.set(arr2D);
                };

                while (running) {
                    // game loop
                    clearMaze(this.length, this.width);
                    arr2D = create2dArray(this.length, this.width);
                    createMazePath();
                }

                createMazeWalls();
            }
        },
        data() {
            return {
                lengthArr: Array(this.length).fill(''),
                widthArr: Array(this.width).fill(''),
                lengthP: (1 / this.length) * 100,
                widthP: (1 / this.width) * 100,
            }
        }
    }
</script>

<template>
    <h1>Generated Maze</h1>
    <div class="button-container">
        <button @click="generateMaze()">GENERATE MAZE</button>
        <button>SOLVE MAZE</button>
    </div>
    <section class="maze">
        <div v-for="(x, i) in lengthArr" :key="i" class="maze-row">
            <div v-for="(y, j) in widthArr" :key="i + j" class="maze-cell-container"  
            :id="String(i).padStart(2, '0') + String(j).padStart(2, '0')" 
            :style="{ width: lengthP + '%', 'padding-top': lengthP + '%'}">
                <div class="maze-cell">
                    {{ i === 0 && j === 0 ? 'S' : ' '}}
                    {{ i === lengthArr.length-1 && j === widthArr.length-1 ? 'F' : ' '}}
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
    h1 {
        text-align: center;
        padding-top: 0.5em;
    }

    .button-container {
        display: flex;
        justify-content: space-evenly;
        padding: 0.5em;
    }

    .maze {
        width: 75%;
        margin: 1em auto;
        text-align: center;
        border: 2px solid black;
    }

    .maze-row {
        display: flex;
    }

    .maze-cell-container {
        border: black 1px solid;
        position: relative;
    }

    .maze-cell {
        text-align: center;
        font-size: larger;
        font-weight: bold;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: lightgray;
    }

    .maze-row:first-child .maze-cell-container:first-child .maze-cell {
        background-color: #8CDBC8;
    }

    .maze-row:last-child  .maze-cell-container:last-child .maze-cell {
        background-color: #E7A7A7;
    }

    @media screen and (min-width: 900px) {
        .maze {
            width: 50%;
        }
        .maze-cell-container {
            border: black 1px solid;
        }
    }

    @media screen and (min-width: 1500px) {
        .maze {
            width: 33%;
        }
    }
</style>
