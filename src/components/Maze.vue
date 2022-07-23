<script>
    const length = 10;
    const width = 10;
export default {
    data() {
        return {
            length: Array(length).fill(' '),
            width: Array(width).fill(' ')
        }
    }
}
</script>

<template>
    <h1 class="maze-heading">Maze</h1>
    <section class="maze">
        <div v-for="(x, i) in length" class="maze-row">
            <div v-for="(y, j) in width" :id="i.toString()+j.toString()" class="maze-container">
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
    margin: 1em;
    text-align: center;
}

.maze-row {
    display: flex;
    min-height: 10px;
}

.maze-container {
    width: 5%;
    background-color: lightgray;
    border: black 1px solid;
}

.maze-cell {
    text-align: center;
    font-size: larger;
    font-weight: bold;
}

.maze-row:first-child .maze-container:first-child .maze-cell {
    background-color: #8CDBC8;
}

.maze-row:last-child  .maze-container:last-child .maze-cell {
    background-color: #E7A7A7;
}
</style>