<script setup>
    import { clearMaze, styleMaze } from '../utils/mazeUtil';
    import { create2dArray, checkSurroundings } from '../utils/arrayUtil';
</script>

<script>
    export default {
        name: 'Generator',
        props: { length: Number, width: Number, mazeArr: Array, page: Number },
        emits: ['set'],
        methods: {
            async set(arr) {
                this.$emit('set', arr);
                // console.log(this.mazeArr); // <-- the 'proxy' this logs acts just like an array, must await line 13
            },
            generateMaze(page) {
                if (page === 2) {
                    document.querySelector('.maze-btn-container-one').style.display = 'none';       
                } else if (page === 3) {
                    document.querySelector('.maze-btn-container-two').style.display = 'none';       
                }
                let arr2D = [], stack = [], c = 1, currX = 0, currY = 0, running = true;

                const breakWalls = () => {
                    // remove walls where current node is connected to prev node
                    let curr = arr2D[currX][currY];
                    let prev = arr2D[stack[stack.length-1].x][stack[stack.length-1].y];
                    let currEl, prevEl;
                    if (page === 3 && stack.length > 0) {
                        currEl = document.getElementById('d' + String(currX).padStart(2, '0') + 'd' + String(currY).padStart(2, '0'));
                        prevEl = document.getElementById('d' + String(stack[stack.length-1].x).padStart(2, '0') + 'd' + String(stack[stack.length-1].y).padStart(2, '0'));
                    }
                    if (curr.x < prev.x) { // up
                        arr2D[currX][currY].bottom = false;
                        arr2D[stack[stack.length-1].x][stack[stack.length-1].y].top = false
                        if (page === 3) {
                            currEl.style.borderBottom = "none" 
                            prevEl.style.borderTop = "none" 
                        }
                    } else if (curr.x > prev.x) { // down
                        arr2D[currX][currY].top = false;
                        arr2D[stack[stack.length-1].x][stack[stack.length-1].y].bottom = false
                        if (page === 3) {
                            currEl.style.borderTop = "none" 
                            prevEl.style.borderBottom = "none" 
                        }
                    } else if (curr.y < prev.y) { // left
                        arr2D[currX][currY].right = false;
                        arr2D[stack[stack.length-1].x][stack[stack.length-1].y].left = false
                        if (page === 3) {
                            currEl.style.borderRight = "none" 
                            prevEl.style.borderLeft = "none" 
                        }
                    } else if (curr.y > prev.y) { // right
                        arr2D[currX][currY].left = false;
                        arr2D[stack[stack.length-1].x][stack[stack.length-1].y].right = false
                        if (page === 3) {
                            currEl.style.borderLeft = "none" 
                            prevEl.style.borderRight = "none" 
                        }
                    } 
                }

                const createMazePath = async () => {
                    while (c < this.length * this.width) {
                        if (page === 2) {
                            let el = document.getElementById('s' + String(currX).padStart(2, '0') + 's' + String(currY).padStart(2, '0')).firstChild
                            if (el.style.backgroundColor === "rgb(211, 211, 211)") {
                                el.style.backgroundColor = "rgb(242, 87, 87)";
                            } else if (el.style.backgroundColor === "rgb(242, 87, 87)") {
                                el.style.backgroundColor = "rgb(42, 110, 219)"
                            } else if (el.style.backgroundColor === "rgb(42, 110, 219)") {
                                el.style.backgroundColor = "#F2E863"
                            }
                            await new Promise(resolve => setTimeout(resolve, 75));
                        } else if (page === 3) {
                            let el = document.getElementById('d' + String(currX).padStart(2, '0') + 'd' + String(currY).padStart(2, '0')).firstChild
                            el.style.backgroundColor = '#F2E863'
                            await new Promise(resolve => setTimeout(resolve, 75));
                            el.style.backgroundColor = 'lightgray'
                        }
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
                        let opts = checkSurroundings(arr2D, currX, currY);
                        if (opts.length > 0) {
                            let move = opts[Math.floor(Math.random() * opts.length)];
                            switch (move) { // move current position
                                case 'U': currX--; break;
                                case 'D': currX++; break;
                                case 'L': currY--; break;
                                case 'R': currY++; break;
                            }
                        } else { // backtrack
                            stack.pop();
                            c--
                            currX = stack[stack.length-1].x
                            currY = stack[stack.length-1].y
                        }
                    }
                    // check for complete stack
                    if (c === this.length * this.width) { 
                        arr2D[currX][currY].visited = true;
                        breakWalls();
                        running = false;
                        if (page === 2) {
                            document.getElementById('s' + String(currX).padStart(2, '0') + 's' + String(currY).padStart(2, '0')).firstChild.style.backgroundColor = 'rgb(242, 87, 87)';
                            document.querySelector('.maze-btn-container-one').style.display = 'flex';       
                        } else if (page === 3) {
                            document.querySelector('.maze-btn-container-two').style.display = 'flex';       
                        }
                    }
                };
                clearMaze(this.length, this.width, page);
                arr2D = create2dArray(this.length, this.width);
                createMazePath();
                if (page < 3) {
                    styleMaze(arr2D);
                }
                this.set(arr2D);

            },
            clearCurrentMaze(page) {
                clearMaze(this.length, this.width, page)
            }
        },
        data() {
            return {
                lengthArr: Array(this.length).fill(''),
                widthArr: Array(this.width).fill(''),
                lengthP: (1 / this.length) * 100,
                widthP: (1 / this.width) * 100,
                pageType: this.page
            }
        }
    }
</script>

<template>
    <div v-if="pageType === 1" class="maze-btn-container">
        <button @click="generateMaze(1)">Generate Maze</button>
        <button>Solve Maze</button>
    </div>
    <section class="maze">
        <div v-for="(x, i) in lengthArr" :key="i" class="maze-row">
            <div v-for="(y, j) in widthArr" :key="i + j" class="maze-cell-container"  
            :id="pageType === 1 ? String(i).padStart(2, '0') + String(j).padStart(2, '0') : pageType === 2 ? 's' + String(i).padStart(2, '0') + 's' + String(j).padStart(2, '0') : 'd' + String(i).padStart(2, '0') + 'd' + String(j).padStart(2, '0')"
            :style="{ width: lengthP + '%', 'padding-top': lengthP + '%'}">
                <div class="maze-cell">
                    {{ i === 0 && j === 0 && pageType == 1 ? 'S' : ' '}}
                    {{ i === lengthArr.length-1 && j === widthArr.length-1 && pageType == 1 ? 'F' : ' '}}
                </div>
            </div>
        </div>
    </section>
    <p v-if="pageType === 2">fig 2.1</p>
    <p v-if="pageType === 3">fig 2.2</p>
    <div v-if="pageType === 2" class="maze-btn-container maze-btn-container-one">
        <button @click="generateMaze(2)">Show Animation</button>
        <button @click="clearCurrentMaze(2)">Clear</button>
    </div>
    <div v-if="pageType === 3" class="maze-btn-container maze-btn-container-two">
        <button @click="generateMaze(3)">Show Animation</button>
        <button @click="clearCurrentMaze(3)">Clear</button>
    </div>
</template>

<style scoped>
    .maze-btn-container {
        display: flex;
        justify-content: space-evenly;
        padding: 0.5em;
    }

    .maze {
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
        background-color: rgb(211, 211, 211);
    }

    p {
        text-align: center;
        font-style: italic;
    }

    @media screen and (min-width: 900px) {
        .maze {
            width: 50%;
        }
        .maze-cell-container {
            border: black 1px solid;
        }
    }

    @media screen and (min-width: 1800px) {
        .maze {
            width: 40%;
        }
    }
</style>
