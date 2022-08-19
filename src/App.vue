<script setup>
    import TestMaze from './components/TestMaze.vue';
    import Generator from './components/Generator.vue';
    import NewGenerator from './components/NewGenerator.vue';
</script>

<template>
    <TestMaze />
    <!-- <Generator :length="15" :width="15" :mazeArr="mazeArr" @set="set" /> -->
    <NewGenerator :length="5" :width="5" :mazeArr="mazeArr" @set="set" /> <!-- these values determine the size of the maze  -->
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
        // actions
        methods: {
            set(arr) {
                this.mazeArr = arr;
            },
        },
        components: {
            Generator,
            TestMaze
        }
    }
</script>