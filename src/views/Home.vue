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
            return { componentKey: 0 }
        },
        methods: {
            updateMazeSize(e) {
                e.preventDefault()
                mazeArray.set(create2dArray(document.getElementById('input-1').value, document.getElementById('input-2').value))
                this.componentKey++
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
            <form  @submit="updateMazeSize">
                <label for="length">Height: </label>
                <input id="input-1" name="length" type="number" min="5" max="50" />
                <label for="width">Width: </label>
                <input id="input-2" name="width" type="number" min="5" max="50"/>
                <button type="submit">Apply</button>
            </form>
        </div>
        <div class="btn-container">
            <Generator :page="1" /> <!-- these values determine the size of the maze -->
            <Solver :page="1" />
        </div>
        <Maze :page="1" :key="componentKey" />
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