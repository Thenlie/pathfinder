<script setup>
    import TestMaze from './components/TestMaze.vue';
    import Generator from './components/Generator.vue';
</script>

<template>
    <router-view></router-view>
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