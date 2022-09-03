<script setup>
    import { animateCells, animateCurrentNode, clearMaze, styleMaze, toggleButtons } from '../utils/mazeUtil';
    import { create2dArray, checkSurroundings, breakWalls, resetVisited } from '../utils/arrayUtil';
    import { mazeArray } from '../lib/mazeArray';
</script>

<script>
    export default {
        name: 'Generator',
        props: { page: Number },
        methods: {
            generateMaze(page) {
                let arr2D = [], stack = [], currX = 0, currY = 0;
                toggleButtons(page, false);

                const createMazePath = async () => {
                    let c = 1;
                    while (c < mazeArray.array.length * mazeArray.array[0].length) {
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
                    if (c === mazeArray.array.length * mazeArray.array[0].length) { 
                        arr2D[currX][currY].visited = true;
                        breakWalls(arr2D, currX, currY, stack, page);
                        if (page === 2) {
                            document.getElementById('s' + String(currX).padStart(2, '0') + 's' + String(currY).padStart(2, '0')).firstChild.style.backgroundColor = 'rgb(242, 87, 87)';
                        }
                        toggleButtons(page, true)
                    }
                };
                clearMaze(mazeArray.array.length, mazeArray.array[0].length, page);
                arr2D = create2dArray(mazeArray.array.length, mazeArray.array[0].length);
                createMazePath();
                if (page < 3) {
                    styleMaze(arr2D);
                }
                resetVisited(arr2D);
                mazeArray.set(arr2D);
            },
            clearCurrentMaze(page) {
                clearMaze(mazeArray.array.length, mazeArray.array[0].length, page)
            }
        },
        data() {
            return {
                lengthArr: Array(mazeArray.array.length).fill(''),
                widthArr: Array(mazeArray.array[0].length).fill(''),
                lengthP: (1 / mazeArray.array.length) * 100,
                widthP: (1 / mazeArray.array[0].length) * 100,
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
