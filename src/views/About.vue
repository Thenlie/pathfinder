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
        <p>Pathfinder is a website built to demonstrate pathfinding algorithms! This project was started so the developers could learn more about these types of algorithms and have a fun project to work on in their spare time. Started in July 2022, this was also the developers first time seeing, learning, and using Vue.js with Vite.</p>
        <p>This project ended up being a great learning experience for everyone involved. It not only taught logical and algorithmic thinking, it also taught skills for collaboration and team software development. Many tools were used to assist in the development. Some key tools include: Git, GitHub, VS Code, Vite, Notion, and Discord. You can find more information about the development of the project on GitHub at <a href="https://github.com/Thenlie/pathfinder">https://github.com/Thenlie/pathfinder</a>. There you can also find information about contributing to the project if you would like to build upon what has already been done!</p>
        <h2>Maze Generation</h2>
        <p>Unbeknownst to the developers at first, the first step in building a pathfinding algorithm, is building a maze generator. This is because without lots of automated testing, it is really hard to know how error proof your code is. Additionally, hardcoding mazes gets really tedious after just one or two as it involves manually populating every cell in the maze. This leads to the inevitability of creating a maze generation algorithm!</p>
        <h3>What does a maze look like in code?</h3>
        <p>To represent a maze in code, we start with a two dimensional array. This is nothing more than an array of arrays. Below is an example of a 10 x 10 2D array and how to generate one with nested for loops:</p>
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
        <p>In this example, you can see our first idea for representing the maze. We would simply use characters to represent each state of the maze cells. A <span class="code-snip">#</span> would represent a wall, <span class="code-snip">S</span> and <span class="code-snip">F</span> would be start and finish respectively, and <span class="code-snip">0</span> would represent an empty cell. We can also use <span class="code-snip">@</span> to notate cells we have already traveled to. To access individual cells of the maze we target the vertical and then horizontal position in the array. So the first couple of cells would be: <span class="code-snip">arr2D[0][0],  arr2D[0][1], arr2D[0][2]...</span>.</p>
        <p></p>
        <div class="dot-container">
            <Dots />
        </div>
        <h2>Attempt #1</h2>
        <p>For the first attempt, the thought was that we needed to prioritize having a path to the exit. If we were to just randomly generate walls, there is a chance the start would be completely closed off, which we would consider an invalid maze. So, to ensure we always generated a valid maze, the plan was to first generate a random path to the exit. Once that is completed, walls can be filled in.</p>
        <p>The path was to be created by moving a node around a grid (or 2D array) and marking each cell as part of the path. The idea was that each new node would touch exactly one other node on the path. This would ensure the path did not loop upon itself. To do this, a function was created to check the current nodes surrounding positions. This involved one function that returned the value of the location being checked, and another function that combined all of the individual values to see which moves are valid:</p>
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
        <p>There was at least one problem with this method, and it is what makes making and solving mazes so difficult. It is possible for the path to form a loop and block itself off, leaving no valid moves and not reaching the finish. For this first attempt, we had a very simple solution to this problem. We would keep track of how many cells the path attempted to go to. If we reached a number higher than the total number of cells, we would know for sure that we are in an endless loop. If we hit that state, we would simply restart the function and try again. This would repeat until a valid path was made. Not very efficient, but it did work!</p>
        <p>Once the path was created, another simple solution was chosen to complete the maze. The 2D array was looped through and any cell that was not a part of the path had a 50% chance of turning into a wall. This left us with some interesting, albeit less than desireable, mazes. Some examples of those mazes can be seen below:</p> 
        <SampleMaze />
        <h3>Problems</h3>
        <p>There are a number of issues with these mazes and the steps taken to create them.</p>
        <p>First, while we do know there is going to be a path to the end, we do not know if there will be any dead ends or complexity in the solution. This means we could end up with a mostly straight line surrounded by walls, not a very fun or challenging maze.</p>
        <p>Second, entire portions of the maze can become cut off by walls. It was very common to see the lower left or upper right corners completely cut off from the rest of the maze (see fig 1.3). This effectively made the maze area smaller since parts were inaccessible. Again, this reduced the fun and complexity of the maze.</p>
        <p>Third, all though it is hard to specifically quantify, these mazes did not really look like true mazes. They would be completely trivial for a human to solve.</p>
        <p>Finally, since we simply re-run the function when an invalid path is created, with some bad luck we could end up running the function several times before a valid path is created. This makes the run time of the program highly variable, which is not a good thing.</p>
        <p>At this point it was determined we had pushed this method as far as we could, and it was time to find a better algorithm all together!</p>
        <div class="dot-container">
            <Dots />
        </div>
        <h2>Attempt #2</h2>
        <p>There were a couple of changes that needed to be made for a new algorithm. To make the entire maze look and feel more like a maze, it was decided to use cell borders for walls, rather than entire cells. This alone would make the maze a bit harder to traverse. Since the walls are not as bold, the path is not highlighted as much.</p>
        <p>To do this effectively, a better method for representing cells was needed. So, a custom class was created to represent each cell. This class can be seen below:</p>
        <div class="code-container">
            <highlightjs language="javascript" class="code" code="
class MazeCell {
    constructor(x, y, visited, top, right, bottom, left) {
        this.x = x; // x coordinate location -- INT
        this.y = y; // y coordinate location -- INT
        this.visited = visited; // checked in search, defaults to False -- BOOL
        this.top = top; // true if wall, false if air --  BOOL
        this.right = right; // ^
        this.bottom = bottom; // ^
        this.left = left; // ^
    }
}"
        />
        </div>
        <p>Now, instead of creating a 2D array filled with zero's, we create a 2D array full of <span class="code-snip">MazeCell</span> objects. Each cell contains information about it's location, walls, and wether or not it has been visited. As we will see later, it is easiest to remove walls rather than add them in. As such, all of these objects were initialized with <span class="code-snip">top, right, bottom, left</span> set to <span class="code-snip">true</span></p>
        <p>The next problem we need to solve is preventing the generator from running into a loop where it has no more valid moves. What is needed is a function that would backtrack when it hit a dead end and then continue on a different path. Enter, recursive backtracking!</p> 
        <p>With this new approach, we keep track of how many available moves there are as well as every location we have been to, in order. When there are no available moves, we return to the previous position and never return to the cell we were just in (unless backtracking). This continues until every cell is visited.</p>
        <p>But wait, if we visit every cell, how do we know there is a path to the end? It has to do with how we draw/remove the walls. Let's dive a bit deeper into how this algorithm works to fully understand.</p>
        <p>When we start our function we create an empty array, called <span class="code-snip">stack</span>. Every time we visit a new cell, we push that location (stored as an object) onto the stack. This keeps track of the path the node takes, in order. When we reach a dead end, we pop the current location off of the stack and return to the previous location. So, how do we know which cells have been visited if they are popped off the stack?</p>
        <p>For this, we can go back to our custom class. We created a property <span class="code-snip">visited</span> that can be used to track this state. As such, we simply need to call <span class="code-snip">MazeCell.visited</span> to check if we are able to go to this square and <span class="code-snip">MazeCell.visited = true;</span> to note that we have been there. Let's see this algorithm in action! Click the button below to see the algorithm work. It will be random every iteration.</p>
        <div class="generator-container">
            <Generator :length="10" :width="10" :mazeArr="mazeArr" :page="2" @set="set" /> <!-- these values determine the size of the maze  -->
        </div>
        <p>Now for the tricky part. To get the actual maze we need to remove some walls. Remember, we are starting with a grid, meaning every wall is in place. So, as our function progresses we are creating links between two cells. These cells can never have more than two links since a node can only go in and out of a cell once (other than backtracking). Additionally, we know the connections hit every single cell in the grid eventually. This means there is not only a path to the end, there is a path to every single cell without a doubt. So, we are guaranteed to get a far more interesting maze with more dead ends and no cut off sections.</p>
        <p>To do this we simply remove the walls where two cells are connected. A simple function was created to accomplish this task. This can be seen below:</p>
        <div class="code-container">
            <highlightjs language="javascript" code="
const breakWalls = () => {
    // remove walls where current node is connected to prev node
    let curr = arr2D[currX][currY];
    let prev = arr2D[stack[stack.length-1].x][stack[stack.length-1].y];
    if (curr.x < prev.x) { // up
        arr2D[currX][currY].bottom = false;
        arr2D[stack[stack.length-1].x][stack[stack.length-1].y].top = false
    } else if (curr.x > prev.x) { // down
        arr2D[currX][currY].top = false;
        arr2D[stack[stack.length-1].x][stack[stack.length-1].y].bottom = false
    } else if (curr.y < prev.y) { // left
        arr2D[currX][currY].right = false;
        arr2D[stack[stack.length-1].x][stack[stack.length-1].y].left = false
    } else if (curr.y > prev.y) { // right
        arr2D[currX][currY].left = false;
        arr2D[stack[stack.length-1].x][stack[stack.length-1].y].right = false
    } 
}"
            />
        </div>
        <p>As you can see, we are altering the wall properties of the <span class="code-snip">MazeCell</span> class on each individual cell. Note that if we remove the top of the current cell, we need to remove the bottom of the previous.</p>
        <p>The last step in generating the maze is to style the HTML. This can be done in the function above however we decided to first generate the entire 2D array and then loop through that and style the maze at the end. This was mostly done to keep code separate and organized. You can see how the HTML was styled below:</p>
        <div class="code-container">
            <highlightjs language="javascript" code="
const styleMaze = (arr2D) => {
    // remove borders according to 2D array
    for (let i = 0; i < arr2D.length; i++) {
        for (let j = 0; j < arr2D[0].length; j++) {
            if (!arr2D[i][j].top) { 
                document.getElementById(String(i).padStart(2, '0') + String(j).padStart(2, '0')).style.borderTop = 'none' 
            }
            if (!arr2D[i][j].bottom) { 
                document.getElementById(String(i).padStart(2, '0') + String(j).padStart(2, '0')).style.borderBottom = 'none' 
            }
            if (!arr2D[i][j].left) { 
                document.getElementById(String(i).padStart(2, '0') + String(j).padStart(2, '0')).style.borderLeft = 'none' 
            }
            if (!arr2D[i][j].right) { 
                document.getElementById(String(i).padStart(2, '0') + String(j).padStart(2, '0')).style.borderRight = 'none' 
            }
        }
    }
}"
            />
        </div>
        <div class="generator-container">
            <Generator :length="10" :width="10" :mazeArr="mazeArr" :page="3" @set="set" /> <!-- these values determine the size of the maze  -->
        </div>
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
        margin: 1em 0.5em;
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
    .generator-container {
        margin: auto;
        width:45%
    }
    @media screen and (max-width: 600px) {
        .code-container {
            overflow-x: scroll;
        }
        .generator-container {
            width:75%
        }
    }
</style>