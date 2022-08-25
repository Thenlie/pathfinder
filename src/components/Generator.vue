<script setup>
    import { animateCells, animateCurrentNode, clearMaze, styleMaze, toggleButtons } from '../utils/mazeUtil';
    import { create2dArray, checkSurroundings, breakWalls, resetVisited } from '../utils/arrayUtil';
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
                toggleButtons(page, false);

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
                            breakWalls(arr2D, currX, currY, stack, page);
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
                        breakWalls(arr2D, currX, currY, stack, page);
                        if (page === 2) {
                            document.getElementById('s' + String(currX).padStart(2, '0') + 's' + String(currY).padStart(2, '0')).firstChild.style.backgroundColor = 'rgb(242, 87, 87)';
                        }
                        toggleButtons(page, true)
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
