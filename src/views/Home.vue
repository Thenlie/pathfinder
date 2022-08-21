<script setup>
    import NewGenerator from '../components/NewGenerator.vue';
</script>

<template>
    <div class="home">
        <h1>Home</h1>
        <NewGenerator :length="50" :width="50" :mazeArr="mazeArr" @set="set" /> <!-- these values determine the size of the maze  -->
    </div>
</template>