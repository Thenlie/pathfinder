<script>
    export default {
        name: 'Generator',
        props: { length: Number, width: Number, mazeArr: Array, page: Number },
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
