<script setup>
    import { mazeArray } from '../lib/mazeArray';
</script>

<script>
    export default {
        name: 'Maze',
        props: { page: Number },
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
    <section class="maze">
        <div v-for="(x, i) in lengthArr" :key="i" class="maze-row">
            <div v-for="(y, j) in widthArr" :key="i + j" class="maze-cell-container"  
            :id="pageType === 1 ? String(i).padStart(2, '0') + String(j).padStart(2, '0') : pageType === 2 ? 's' + String(i).padStart(2, '0') + 's' + String(j).padStart(2, '0') : 'd' + String(i).padStart(2, '0') + 'd' + String(j).padStart(2, '0')"
            :style="{ width: widthP + '%', 'padding-top': widthP + '%'}">
                <div class="maze-cell">
                    {{ i === 0 && j === 0 && pageType == 1 ? 'S' : ' '}}
                    {{ i === lengthArr.length-1 && j === widthArr.length-1 && pageType == 1 ? 'F' : ' '}}
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .maze {
        margin: 0.5rem auto;
        text-align: center;
        width: 90%;
        margin-bottom: 2rem;
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

    @media screen and (min-width: 900px) {
        .maze {
            width: 75%;
        }
    }
    /*
    @media screen and (min-width: 1100px) {
        .maze {
            width: 50%;
        }
    }

    @media screen and (min-width: 1600px) {
        .maze {
            width: 40%;
        }
    } */
</style>
