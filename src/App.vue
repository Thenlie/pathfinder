<script setup>
    import Maze from './components/Maze.vue';
    import Generator from './components/Generator.vue';
</script>

<template>
  <Generator :length="10" :width="10"/> <!-- these values determine the size of the maze  -->
</template>
