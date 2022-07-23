<script>
    const length = 20;
    const width = 20;
    export default {
        data() {
            return {
                length: Array(length).fill(' '),
                width: Array(width).fill(' '),
                lengthP: (1 / length) * 100,
                widthP: (1 / width) * 100,
            }
        }
    }
</script>

<template>
    <h1 class="maze-heading">Maze</h1>
    <section class="maze">
        <div v-for="(x, i) in length" class="maze-row">
            <div v-for="(y, j) in width" :id="i.toString()+j.toString()" class="maze-container"  :style="{ width: lengthP + '%', 'padding-top': lengthP + '%'}">
                <div class="maze-cell">
                    {{ i === 0 && j === 0 ? 'S' : ' '}}
                    {{ i === length.length-1 && j === width.length-1 ? 'F' : ' '}}
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.maze-heading {
    text-align: center;
    padding: 0.5em;
}

.maze {
    margin: 2em 8em;
    text-align: center;
}

.maze-row {
    display: flex;
}

.maze-container {
    background-color: lightgray;
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
}

.maze-row:first-child .maze-container:first-child .maze-cell {
    background-color: #8CDBC8;
}

.maze-row:last-child  .maze-container:last-child .maze-cell {
    background-color: #E7A7A7;
}
</style>