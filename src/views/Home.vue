<script setup>
    import Generator from '../components/Generator.vue';
    import Solver from '../components/Solver.vue';
    import Dots from '../components/Dots.vue';
    import Maze from '../components/Maze.vue';
    import { mazeArray } from '../lib/mazeArray';
</script>

<template>
    <main class="home">
        <h1 class="page-heading">Home</h1>
        <div class="dot-container">
            <Dots />
        </div>
        <div class="input-container">
            <label for="length">Length: </label>
            <input name="length" />
            <label for="width">Width: </label>
            <input name="width" />
            <button>Apply</button>
        </div>
        <div class="btn-container">
            <Generator :length="25" :width="25" :mazeArr="mazeArray.array" :page="1" /> <!-- these values determine the size of the maze -->
            <Solver :page="1" />
        </div>
        <Maze :length="25" :width="25" :mazeArr="mazeArray.array" :page="1"  />
    </main>
</template>

<style scoped>
    .page-heading {
        text-align: center;
        font-size: 48px;
    }
    .btn-container, .input-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    input {
        margin: 0.5em;
    }
</style>