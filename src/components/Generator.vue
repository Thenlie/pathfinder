<script>
    export default {
        props: { length: Number, width: Number },
        methods: {
            generateMaze() {
                let arr2D = []
                let currX = 0;
                let currY = 0;
                let c = 0
                let running = true;

                const clearMaze = () => {
                    // remove current maze styling
                    for (let i = 0; i < this.length; i++) {
                        for (let j = 0; j < this.width; j++) {
                            if (i !== 0 || j !== 0) {
                                if (i !== this.length-1 || j !== this.width-1) {
                                    // style HTML
                                    let el = document.getElementById(i.toString() + j.toString());
                                    el.firstChild.style.backgroundColor = "lightgray";
                                }
                            }
                        }
                    }
                }

                const create2dArray = () => {
                    // create 2D array 
                    for (let i = 0; i < this.length; i++) {
                        arr2D.push([]);
                    }
                    for (let i = 0; i < this.length; i++) {
                        for (let j = 0; j < this.width; j++) {
                            if (arr2D[i]) {
                                arr2D[i].push(0)
                            } 
                        }
                    }
                    // console.table(arr2D);
                }

                const createMazePath = () => {
                    
                    const checkPosition = (x, y) => {
                        if (arr2D[x]) {
                            if (arr2D[x][y] === 0) {
                                return 0;
                            } else if (arr2D[x][y] === '@') {
                                return '@'
                            }
                        } 
                        return null;
                    }

                    const checkSurroundings = () => {
                        let arr = [];
                        let a = checkPosition(currX-1, currY);
                        let b = checkPosition(currX+1, currY);
                        let c = checkPosition(currX, currY-1);
                        let d = checkPosition(currX, currY+1);
                        let e = checkPosition(currX-2, currY);
                        let f = checkPosition(currX+2, currY);
                        let g = checkPosition(currX, currY-2);
                        let h = checkPosition(currX, currY+2);
                        let i = checkPosition(currX-1, currY-1);
                        let j = checkPosition(currX+1, currY-1);
                        let k = checkPosition(currX-1, currY+1);
                        let l = checkPosition(currX+1, currY+1);
                        if ((a === 0) && (e === null || e === 0) && (i === null || i === 0) && (k === null || k === 0)) {
                            arr.push('U');
                        }
                        if ((b === 0) && (j === null || j === 0) && (f === null || f === 0) && (l === null || l === 0)) {
                            arr.push('D');
                        }
                        if ((c === 0) && (i === null || i === 0) && (g === null || g === 0) && (j === null || j === 0)) {
                            arr.push('L');
                        }
                        if ((d === 0) && (k === null || k === 0) && (h === null || h === 0) && (l === null || l === 0)) {
                            arr.push('R');
                        }
                        return arr;
                    }

                    // create initial path
                    while (!(currX == this.length-1 && currY == this.width-1)) {
                        // safety check
                        c++
                        if (c > 50) {
                            arr2D = [];
                            c = 0;
                            currX = 0;
                            currY = 0;
                            break;
                        }
                        let opts = checkSurroundings();
                        let move = Math.floor(Math.random() * opts.length);
                        // fill cell with character
                        if (currX === 0 && currY === 0) {
                            arr2D[currX][currY] = 'S'
                        } else {
                            arr2D[currX][currY] = '@';
                        }
                        switch (opts[move]) {
                            case 'U':
                                currX--
                                break;
                            case 'D':
                                currX++
                                break;
                            case 'L':
                                currY--
                                break;
                            case 'R':
                                currY++
                                break;
                        }
                    }
                    // check for finish position
                    if (currX == this.length-1 && currY == this.width-1) {
                        arr2D[currX][currY] = 'F';
                        // console.table(arr2D);
                        for (let i = 0; i < this.length; i++) {
                            for (let j = 0; j < this.width; j++) {
                                if (arr2D[i][j] === '@') {
                                    // style HTML
                                    let el = document.getElementById(i.toString() + j.toString());
                                    el.firstChild.style.backgroundColor = "rgb(213, 215, 142)";
                                }
                            }
                        }
                        running = false;
                    } 
                }
                // game loop
                while (running) {
                    clearMaze();
                    create2dArray();
                    createMazePath();
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
        <div v-for="(x, i) in lengthArr" class="maze-row">
            <div v-for="(y, j) in widthArr" class="maze-cell-container"  
            :id="i.toString()+j.toString()" 
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
            border: black 1px dashed;
        }
    }

    @media screen and (min-width: 1500px) {
        .maze {
            width: 33%;
        }
    }
</style>
