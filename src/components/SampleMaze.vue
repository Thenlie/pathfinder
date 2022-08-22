<script>
    import { testMaze, testMaze2, testMaze3 } from '../utils/testMaze';
    export default {
        data() {
            return {
                testMaze,
                testMaze2,
                testMaze3,
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
    <div class="container">
            <section class="maze">
                <div v-for="(x, i) in lengthArr" :key="i" class="maze-row">
                    <div v-for="(y, j) in widthArr" :key="i + j" class="maze-cell-container"  
                    :style="{ width: lengthP + '%', 'padding-top': lengthP + '%'}">
                        <div class="maze-cell">
                            {{ testMaze[i][j] }}
                        </div>
                    </div>
                </div>
                <p>fig 1.1</p>
            </section>
            <section class="maze">
                <div v-for="(x, i) in lengthArr" :key="i" class="maze-row">
                    <div v-for="(y, j) in widthArr" :key="i + j" class="maze-cell-container"  
                    :style="{ width: lengthP + '%', 'padding-top': lengthP + '%'}">
                        <div class="maze-cell">
                            {{ testMaze2[i][j] }}
                        </div>
                    </div>
                </div>
                <p>fig 1.2</p>
            </section>
            <section class="maze">
                <div v-for="(x, i) in lengthArr" :key="i" class="maze-row">
                    <div v-for="(y, j) in widthArr" :key="i + j" class="maze-cell-container"  
                    :style="{ width: lengthP + '%', 'padding-top': lengthP + '%'}">
                        <div class="maze-cell">
                            {{ testMaze3[i][j] }}
                        </div>
                    </div>
                </div>
                <p>fig 1.3</p>
            </section>
    </div>
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
    .container {
        display: flex;
    }
    
    .maze {
        width: 15%;
        margin: 1em auto;
        text-align: center;
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
    .maze p {
        text-align: center;
        margin-top: 0.5em;
        font-style: italic;
    }

    .maze-row:first-child .maze-cell-container:first-child .maze-cell {
        background-color: #8CDBC8;
    }

    .maze-row:nth-child(10)  .maze-cell-container:nth-child(10) .maze-cell {
        background-color: #E7A7A7;
    }

    @media screen and (max-width: 1200px) {
        .maze {
            width: 25%;
        }
    }
    @media screen and (max-width: 800px) {
        .maze {
            width: 33%;
        }
    }
    @media screen and (max-width: 600px) {
                .maze {
            width: 50%;
        }
        .container {
            flex-direction: column;
        }
    }
</style>