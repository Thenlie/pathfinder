<script setup>
    import Maze from './components/Maze.vue';
    import TestMaze from './components/TestMaze.vue';
    import Generator from './components/Generator.vue';
</script>

<template>
    <!-- <Maze :length="15" :width="15"/> these values determine the size of the maze  -->
    <TestMaze :length="10" :width="10" />
    <Generator :length="15" :width="15"/> <!-- these values determine the size of the maze  -->
</template>

