<script setup>
    import { clearMaze } from '../utils/mazeUtil';
    import { createNew2dArray, checkNewPosition } from '../utils/arrayUtil';
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
                let arr2D = [];
                let stack = [];
                let c = 1;
                let currX = 0;
                let currY = 0;
                let running = true;

                const checkSurroundings = (x, y) => {
                    // check for available directions to move
                    let arr = [];
                    if (checkNewPosition(arr2D, x-1, y)) { arr.push('U') };
                    if (checkNewPosition(arr2D, x+1, y)) { arr.push('D') };
                    if (checkNewPosition(arr2D, x, y-1)) { arr.push('L') };
                    if (checkNewPosition(arr2D, x, y+1)) { arr.push('R') };
                    return arr;
                };

                const breakWalls = () => {
                    let curr = arr2D[currX][currY];
                    let prev = arr2D[stack[stack.length-1].x][stack[stack.length-1].y];
                    if (curr.x < prev.x) { // up
                        arr2D[currX][currY].bottom = false;
                        arr2D[stack[stack.length-1].x][stack[stack.length-1].y].top = false
                    } 
                    if (curr.x > prev.x) { // down
                        arr2D[currX][currY].top = false;
                        arr2D[stack[stack.length-1].x][stack[stack.length-1].y].bottom = false
                    } 
                    if (curr.y < prev.y) { // left
                        arr2D[currX][currY].right = false;
                        arr2D[stack[stack.length-1].x][stack[stack.length-1].y].left = false
                    } 
                    if (curr.y > prev.y) { // right
                        arr2D[currX][currY].left = false;
                        arr2D[stack[stack.length-1].x][stack[stack.length-1].y].right = false
                    } 
                }

                const createMazePath = () => {

                    while (c < this.length * this.width) {
                        console.log("Current Position: " + currX + " " + currY + " Iteration: " + c);
                        console.log(arr2D[currX][currY])
                        arr2D[currX][currY].visited = true;
                        c++;
                        if (stack.length > 0) {
                            breakWalls();
                            if (!(stack[stack.length-1].x == currX && stack[stack.length-1].y == currY)) {
                                stack.push({x: currX, y: currY}); 
                            }
                        } else {
                            stack.push({x: currX, y: currY}); 
                        }
                        let opts = checkSurroundings(currX, currY);
                        if (opts.length > 0) {
                            let move = opts[Math.floor(Math.random() * opts.length)];
                            console.log(opts, move)
                            // move current position
                            switch (move) {
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
                        } else {
                            // backtrack
                            console.log("Backtrack!");
                            stack.pop();
                            c--
                            currX = stack[stack.length-1].x
                            currY = stack[stack.length-1].y
                            console.log(currX, currY, stack[stack.length-1])
                        }
                    }
                    // check for complete stack
                    if (c === this.length * this.width) {
                        arr2D[currX][currY].visited = true;
                        breakWalls();
                        running = false;
                    } 
                };

                const resetMazeStyle = () => {
                    for (let i = 0; i < this.length; i++) {
                        for (let j = 0; j < this.width; j++) {
                           document.getElementById(String(i).padStart(2, '0') + String(j).padStart(2, '0')).style.border = "2px solid black";
                        }
                    }
                }

                const styleMaze = () => {
                    for (let i = 0; i < this.length; i++) {
                        for (let j = 0; j < this.width; j++) {
                            if (!arr2D[i][j].top) { 
                                document.getElementById(String(i).padStart(2, '0') + String(j).padStart(2, '0')).style.borderTop = "none"; 
                            }
                            if (!arr2D[i][j].bottom) {
                                document.getElementById(String(i).padStart(2, '0') + String(j).padStart(2, '0')).style.borderBottom = "none"; 
                            }
                            if (!arr2D[i][j].left) {
                                document.getElementById(String(i).padStart(2, '0') + String(j).padStart(2, '0')).style.borderLeft = "none"; 
                            }
                            if (!arr2D[i][j].right) {
                                document.getElementById(String(i).padStart(2, '0') + String(j).padStart(2, '0')).style.borderRight = "none"; 
                            }
                        }
                    }
                }

                while (running) {
                    clearMaze(this.length, this.width);
                    arr2D = createNew2dArray(this.length, this.width);
                    createMazePath();
                    styleMaze();
                }
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
