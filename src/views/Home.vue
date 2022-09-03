<script setup>
    import Generator from '../components/Generator.vue';
    import Solver from '../components/Solver.vue';
    import Dots from '../components/Dots.vue';
    import Maze from '../components/Maze.vue';
    import { mazeArray } from '../lib/mazeArray';
    import { create2dArray } from '../utils/arrayUtil';
</script>

<script>
    export default {
        name: 'Home',
        data() {
            return { key: 0 }
        },
        methods: {
            updateMazeSize() {
                mazeArray.set(create2dArray(document.getElementById('input-1').value, document.getElementById('input-2').value))
                this.key++
                document.getElementById('input-1').value = ''
                document.getElementById('input-2').value = ''
            }
        },
    }
</script>

<template>
    <main class="home">
        <h1 class="page-heading">Home</h1>
        <div class="dot-container">
            <Dots />
        </div>
        <div class="input-container">
            <div>
                <label for="length">Height: </label>
                <input id="input-1" name="length" type="number" />
            </div>
            <div>
                <label for="width">Width: </label>
                <input id="input-2" name="width" type="number" />
            </div>
            <button @click="updateMazeSize">Apply</button>
        </div>
        <div class="btn-container">
            <Generator :page="1" /> <!-- these values determine the size of the maze -->
            <Solver :page="1" />
        </div>
        <Maze :page="1" :key="this.key" />
    </main>
</template>

<style scoped>
    .page-heading {
        text-align: center;
        font-size: 48px;
    }
    .btn-container, .input-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    input {
        margin: 0.5em;
    }
</style>