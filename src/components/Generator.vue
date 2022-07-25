<script>
    export default {
        props: { length: Number, width: Number },
        methods: {
            generateMaze() {
                let arr2D = []
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
                    console.table(arr2D)
                }
                const createMazePath = () => {
                    const checkSurroundings = () => {
                        let arr = [];
                        if (arr2D[currX-1]) {
                            if (arr2D[currX-1][currY] === 0) {
                                arr.push('U');
                            }
                        }
                        if (arr2D[currX+1]) {
                            if (arr2D[currX+1][currY] === 0) {
                                arr.push('D');
                            }
                        }
                        if (arr2D[currX][currY-1] === 0) {
                            arr.push('L');
                        }
                        if (arr2D[currX][currY+1] === 0) {
                            arr.push('R');
                        }
                        return arr;
                    }
                    // create initial path
                    let currX = 0;
                    let currY = 0;
                    while (currX !== this.length-1 && currY !== this.width-1) {
                        let opts = checkSurroundings();
                        console.log(opts)
                        arr2D[currX][currY] = '@';
                        currX++
                        currY++
                    }
                    console.table(arr2D)
                }
                create2dArray();
                createMazePath();
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
