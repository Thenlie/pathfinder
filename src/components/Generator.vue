<script setup>
    import { animateCells, animateWalls, clearMaze, styleMaze } from '../utils/mazeUtil';
    import { create2dArray, resetVisited, checkSurroundings } from '../utils/arrayUtil';
</script>

<script>
    export default {
        name: 'Generator',
        props: { length: Number, width: Number, mazeArr: Array, page: Number },
        emits: ['set'],
        methods: {
            async set(arr) {
                this.$emit('set', arr);
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
                    if (page === 3 && stack.length > 0) {
                        animateWalls(currX, currY, stack, curr, prev)
                    }
                    if (curr.x < prev.x) { // up
                        arr2D[currX][currY].bottom = false;
                        arr2D[stack[stack.length-1].x][stack[stack.length-1].y].top = false
                    } else if (curr.x > prev.x) { // down
                        arr2D[currX][currY].top = false;
                        arr2D[stack[stack.length-1].x][stack[stack.length-1].y].bottom = false
                    } else if (curr.y < prev.y) { // left
                        arr2D[currX][currY].right = false;
                        arr2D[stack[stack.length-1].x][stack[stack.length-1].y].left = false
                    } else if (curr.y > prev.y) { // right
                        arr2D[currX][currY].left = false;
                        arr2D[stack[stack.length-1].x][stack[stack.length-1].y].right = false
                    } 
                }

                const createMazePath = async () => {
                    while (c < this.length * this.width) {
                        if (page === 2) {
                            animateCells(currX, currY);
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
                resetVisited(arr2D);
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
    </div>
    <p v-if="pageType === 2">fig 2.1</p>
    <p v-if="pageType === 3">fig 2.2</p>
    <div v-if="pageType === 2" class="maze-btn-container maze-btn-container-one">
        <button @click="generateMaze(2)">Start</button>
        <button @click="clearCurrentMaze(2)">Clear</button>
    </div>
    <div v-if="pageType === 3" class="maze-btn-container maze-btn-container-two">
        <button @click="generateMaze(3)">Start</button>
        <button @click="clearCurrentMaze(3)">Clear</button>
    </div>
</template>

<style scoped>
    .maze-btn-container {
        display: flex;
        justify-content: space-evenly;
        padding: 0.5em;
    }

    p {
        text-align: center;
        font-style: italic;
    }
</style>
