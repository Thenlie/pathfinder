<script setup>
    import Maze from './components/Maze.vue';
    import TestMaze from './components/TestMaze.vue';
    import Generator from './components/Generator.vue';
</script>

<script>
    export default {
        // state
        data() {
            return {
                mazeArr: []
            }
        },
        // actions
        methods: {
            fill(arr) {
                this.mazeArr = arr;
            },
            isEmpty() {
                this.mazeArr.length > 0 ? false : true;
            }
        }
    }
</script>

<template>
    <!-- <Maze :length="15" :width="15"/> these values determine the size of the maze  -->
    <TestMaze/>
    <Generator :length="15" :width="15"/> <!-- these values determine the size of the maze  -->
</template>

