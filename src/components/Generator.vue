<script setup>
    import { animateCells, animateWalls, animateCurrentNode, clearMaze, styleMaze, hideButtons } from '../utils/mazeUtil';
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
            },
            generateMaze(page) {
                let arr2D = [], stack = [], currX = 0, currY = 0;
                hideButtons(page)

                const breakWalls = () => {
                    // remove walls where current node is connected to prev node
                    let curr = arr2D[currX][currY];
                    let prev = arr2D[stack[stack.length-1].x][stack[stack.length-1].y];
                    if (page === 3 && stack.length > 0) {
                        animateWalls(currX, currY, stack, curr, prev)
                    }
                    if (curr.x < prev.x) { // up
                        curr.bottom = false;
                        prev.top = false
                    } else if (curr.x > prev.x) { // down
                        curr.top = false;
                        prev.bottom = false
                    } else if (curr.y < prev.y) { // left
                        curr.right = false;
                        prev.left = false
                    } else if (curr.y > prev.y) { // right
                        curr.left = false;
                        prev.right = false
                    } 
                }

                const createMazePath = async () => {
                    let c = 1;
                    while (c < this.length * this.width) {
                        c++;
                        if (page === 2) {
                            await animateCells(currX, currY);
                        } else if (page === 3) {
                            await animateCurrentNode(currX, currY)
                        }
                        arr2D[currX][currY].visited = true;
                        if (stack.length > 0) {
                            breakWalls();
                            if (!(stack[stack.length-1].x == currX && stack[stack.length-1].y == currY)) {
                                stack.push({x: currX, y: currY}); 
                            }
                        } else {
                            stack.push({x: currX, y: currY}); 
                        }
                        let opts = checkSurroundings(arr2D, currX, currY);
                        if (opts.length > 0) { // move to new position
                            switch (opts[Math.floor(Math.random() * opts.length)]) { 
                                case 'U': currX--; break;
                                case 'D': currX++; break;
                                case 'L': currY--; break;
                                case 'R': currY++; break;
                            }
                        } else { // backtrack
                            c--
                            stack.pop();
                            currX = stack[stack.length-1].x
                            currY = stack[stack.length-1].y
                        }
                    }
                    // check for complete stack
                    if (c === this.length * this.width) { 
                        arr2D[currX][currY].visited = true;
                        breakWalls();
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
