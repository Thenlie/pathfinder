<script>
    import { testMaze } from '../utils/testMaze';
    export default {
        data() {
            return {
                testMaze,
                lengthArr: testMaze.length,
                widthArr: testMaze[0].length,
                lengthP: testMaze.length,
            }
        },
        mounted() {
            const cells = document.getElementsByClassName('maze-cell');
            for (let i = 0; i < cells.length; i++) {
                if (cells[i].innerHTML === '#') {
                  cells[i].style.backgroundColor = 'black';
                }
                if (cells[i].innerHTML === '0') {
                  cells[i].style.color = 'transparent';
                }
            }
        }
    }
</script>

<template>
    <h1>Test Maze</h1>
    <div class="button-container">
        <button>GENERATE MAZE</button>
        <button>SOLVE MAZE</button>
    </div>
    <section class="maze">
        <div v-for="(x, i) in lengthArr" :key="i" class="maze-row">
            <div v-for="(y, j) in widthArr" :key="i + j" class="maze-cell-container"  
            :style="{ width: lengthP + '%', 'padding-top': lengthP + '%'}">
                <div class="maze-cell">
                    {{ testMaze[i][j] }}
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