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
        <h2>🚧 Page Under Construction 🚧</h2>
        <p>Pathfinder is a website built to demonstrate pathfinding algorithms! This project was started so the developers could learn more about these algorithms and have a fun project to work on in their spare time. Started in July 2022, this was also the developers first time seeing, learning and using Vue.js</p>
        <h2>Maze Generation</h2>
        <p>Unbeknownst to the developers at first, the first step in building a really good pathfinding algorithim, is building a really good maze generator. Without lots of automated testing, it is really hard to know how error proof your code is. Additionally, hardcoding mazes gets really tedious after just one or two. This leads to the inevitability of creating a maze generation algorithm!</p>
        <h3>Attempt #1</h3>
        <p>For the frist attempt, the thought was that we needed to prioritize having a path to the exit. If we were to just randomly generate walls, there is a change the start would be completely closed off, which we would consider an invalid maze. So, to ensure we always generated a valid maze, the plan was to first generate a random path to the exit. </p>
        <h3>Attempt #2</h3>
        <p></p>        <Generator :length="10" :width="10" :mazeArr="mazeArr" :page="2" @set="set" /> <!-- these values determine the size of the maze  -->
    </main>
</template>

<script>
    import hljs from 'highlight.js/lib/common';
    import hljsVuePlugin from "@highlightjs/vue-plugin";

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
            highlightjs: hljsVuePlugin.component
        }
    }
</script>

<style scoped>
    h2 {
        text-align: center;
        margin: 1em;
    }
    p {
        text-align: center;
        font-size: large;
        margin: 0.5em;
    }
</style>