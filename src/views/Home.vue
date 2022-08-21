<script setup>
    import NewGenerator from '../components/NewGenerator.vue';
</script>

<template>
    <main class="home">
        <h1 class="page-heading">Home</h1>
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
        text-decoration: underline;
    }
</style>