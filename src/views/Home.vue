<script setup>
    import NewGenerator from '../components/NewGenerator.vue';
</script>

<template>
    <main class="home">
        <h1 class="page-heading">Home</h1>
        <div class="dot-container">
            <span class="dot" style="background-color: #0E79B2;"></span>
            <span class="dot" style="background-color: #F25757;"></span>
            <span class="dot" style="background-color: #F2E863;"></span>
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
    main {
        padding: 2em;    
    }
    .page-heading {
        text-align: center;
        font-size: 48px;
    }
</style>