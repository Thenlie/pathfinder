<script setup>
    import Maze from './components/Maze.vue';
    import Generator from './components/Generator.vue';
</script>

<template>
  <Generator :length="15" :width="15"/> <!-- these values determine the size of the maze  -->
</template>
