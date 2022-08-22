<script setup>
    import Dots from '../components/Dots.vue';
    import Generator from '../components/Generator.vue';
    import SampleMaze from '../components/SampleMaze.vue'
</script>

<template>
    <main class="about">
        <h1 class="page-heading">About</h1>
        <div class="dot-container">
            <Dots />
        </div>
        <p>Pathfinder is a website built to demonstrate pathfinding algorithms! This project was started so the developers could learn more about these algorithms and have a fun project to work on in their spare time. Started in July 2022, this was also the developers first time seeing, learning, and using Vue.js</p>
        <p>This project ended up being a great learning experience for all involved. It not only taught logical and algorithmic thinking, but it also taught skills on collaboration and team software development. Many tools were used to assist in the development. Some key tools include; Git, GitHub, VS Code, Vite, Notion, and Discord.</p>
        <h2>Maze Generation</h2>
        <p>Unbeknownst to the developers at first, the first step in building a really good pathfinding algorithim, is building a really good maze generator. Without lots of automated testing, it is really hard to know how error proof your code is. Additionally, hardcoding mazes gets really tedious after just one or two. This leads to the inevitability of creating a maze generation algorithm!</p>
        <h3>What does a maze look like in code?</h3>
        <p>To represent a maze in code, we start with a two dimentional array. This is nothing more than an array of arrays. Below is an example of a 10 x 10 2D array and how to generate one with nested for loops:</p>
        <div class="code-container">
            <highlightjs language="javascript" class="code" code="
const sampleMaze = [
    ['S', '0', '0', '#', '0', '0', '0', '#', '0', '0'],
    ['#', '0', '#', '0', '0', '#', '0', '#', '#', '0'],
    ['#', '0', '0', '0', '#', '#', '0', '0', '0', '0'],
    ['0', '0', '0', '#', '0', '0', '0', '#', '0', '0'],
    ['0', '0', '0', '#', '0', '0', '#', '#', '0', '#'],
    ['#', '0', '#', '0', '#', '0', '0', '0', '#', '0'],
    ['0', '#', '#', '0', '0', '#', '#', '0', '#', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '#', '0'],
    ['0', '0', '0', '0', '#', '#', '#', '#', '#', '0'],
    ['0', '#', '0', '0', '0', '0', '0', '0', '0', 'F'],
];" 
            />
            <highlightjs language="javascript" class="code" code="
function generateArray() {
    let arr2D = [];
    for (let i = 0; i < length; i++) {
        arr2D.push([]);
    }
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < width; j++) {
            if (arr2D[i]) {
                arr2D[i].push(0))
            } 
        }
    }
    return arr2D
}"
            />
        </div>
        <p>In this example, you can see our first idea for representing the maze. We would simply use characters to represent each state of the maze cells. A <span class="code-snip">#</span> would represent a wall, <span class="code-snip">S</span> and <span class="code-snip">F</span> would be start and finish respectively, and <span class="code-snip">0</span> would represent and empty cell. We could also use <span class="code-snip">@</span> to notate cells we have already traveled to. To access individual cells of the maze we target the vertical and then horizontal positon in the array. So the first cell would be <span class="code-snip">arr2D[0][0]</span></p>
        <p></p>
        <div class="dot-container">
            <Dots />
        </div>
        <h2>Attempt #1</h2>
        <p>For the frist attempt, the thought was that we needed to prioritize having a path to the exit. If we were to just randomly generate walls, there is a change the start would be completely closed off, which we would consider an invalid maze. So, to ensure we always generated a valid maze, the plan was to first generate a random path to the exit. Once that is completed, walls can be filled in.</p>
        <p>The path was to be created by moving a node around a grid and marking each cell as part of the path. The idea was that each new node would touch exactly one other node on the path. This would ensure the path did not loop upon itself. To do this, a function was created to check the current nodes surrounding positions. This involved one function that returned the value of the location being checked, and another function that combined all of the individual values to see where valid moves were:</p>
        <div class="code-container">
            <highlightjs language="javascript" class="code" code="
const checkPosition = (arr2D, x, y) => {
    // return value of (x, y) in 2D array
    if (arr2D[x]) {
        if (arr2D[x][y] === 0) {
            return 0;
        } else if (arr2D[x][y] === '@') {
            return '@';
        }
    } 
    return null;
};"
        />
            <highlightjs language="javascript" class="code" code="
const checkSurroundings = (arr2D, x, y) => {
    // check for available directions to move
    let arr = [];
    if (checkPosition(arr2D, x-1, y)) { arr.push('U') };
    if (checkPosition(arr2D, x+1, y)) { arr.push('D') };
    if (checkPosition(arr2D, x, y-1)) { arr.push('L') };
    if (checkPosition(arr2D, x, y+1)) { arr.push('R') };
    return arr;
};"
        />
        </div>
        <p>The <span class="code-snip">checkSurroundings()'</span> function is actually significantly shortened from the original. Instead of being able to check only 4 locations, as shown here, 12 locations had to be checked. This is because we needed to know the values of every cell touching the current cell, AND every cell touching those cells.</p>
        <p>There was one problem with this method, and it is what makes making and solving mazes so difficult. It is possible for the path to form a loop and block itself off, leaving no moves and not reaching the finish. For this first attempt, we had a very simple solution to this problem. We would keep track of how many cells the path attempted to go to. If we reached a certain number, we would know forsure that we are in an endless loop. If we hit that state, we would simply restart the function and try again. This would repeat until a valid path was made. Not very efficient, but it did work!</p>
        <p>Once the path was created, another simple solution was chosen to complete the maze. THe 2D array was looped through and any cell that was not a part of the path had a 50% chance of turning into a wall. This left us with some interesting, albeit less than desireable maze. Some examples of those mazes can be seen below:</p> 
        <SampleMaze />
        <div class="dot-container">
            <Dots />
        </div>
        <h2>Attempt #2</h2>
        <p></p>        
        <Generator :length="10" :width="10" :mazeArr="mazeArr" :page="2" @set="set" /> <!-- these values determine the size of the maze  -->
    </main>
</template>

<script>
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
    h2, h3 {
        text-align: center;
        margin: 1em;
    }
    p {
        text-indent: 30px;
        text-align:justify;
        font-size: large;
        margin: 0.5em;
    }
    .code {
        width: fit-content;
        margin: auto;
        display: inline;
    }

    .code-container {
        background-color: #f6f6f6;
        display: flex;
        flex-wrap: wrap;
    }
    .code-snip {
        padding: 0 0.1em 0 0.1em;
        color: #b75501;
        background-color: lightgray;
        border-radius: 3px;
    }
    @media screen and (max-width: 600px) {
        .code-container {
            overflow-x: scroll;
        }
    }
</style>