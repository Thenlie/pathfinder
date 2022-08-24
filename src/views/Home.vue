<script setup>
    import Generator from '../components/Generator.vue';
    import Dots from '../components/Dots.vue';
    import Maze from '../components/Maze.vue';
</script>

<template>
    <main class="home">
        <h1 class="page-heading">Home</h1>
        <div class="dot-container">
            <Dots />
        </div>
        <Generator :length="25" :width="25" :mazeArr="mazeArr" :page="1" @set="set" /> <!-- these values determine the size of the maze -->
        <Maze :length="25" :width="25" :mazeArr="mazeArr" :page="1"  />
    </main>
</template>

<script>
    export default {
        name: 'App',
        // state
        data() {
            return {
                mazeArr: [0]
            }
        },
        methods: {
            set(arr) {
                this.mazeArr = arr;
            },
        },
        components: {
            Generator,
            Maze,
        }
    }
</script>

<style scoped>
    .page-heading {
        text-align: center;
        font-size: 48px;
    }
</style>