<script setup>
    import Dots from '../components/Dots.vue';
    import Generator from '../components/Generator.vue';
</script>

<template>
    <main class="about">
        <h1 class="page-heading">About</h1>
        <div class="dot-container">
            <Dots />
        </div>
        <p>🚧 Page Under Construction 🚧</p>
        <Generator :length="10" :width="10" :mazeArr="mazeArr" :page="2" @set="set" /> <!-- these values determine the size of the maze  -->
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
        }
    }
</script>

<style scoped>
    p {
        text-align: center;
        font-size: large;
    }
</style>