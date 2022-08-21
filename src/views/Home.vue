<script setup>
    import NewGenerator from '../components/NewGenerator.vue';
    import Dots from '../components/Dots.vue';
</script>

<template>
    <main class="home">
        <h1 class="page-heading">Home</h1>
        <div class="dot-container">
            <Dots />
        </div>
        <NewGenerator :length="50" :width="50" :mazeArr="mazeArr" @set="set" /> <!-- these values determine the size of the maze  -->
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
            NewGenerator,
        }
    }
</script>

<style scoped>
    .page-heading {
        text-align: center;
        font-size: 48px;
    }
</style>