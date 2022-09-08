<script setup>
    import { checkBorders } from '../utils/arrayUtil';
    import { styleMazeCells } from '../utils/mazeUtil';
    import { mazeArray } from '../lib/mazeArray';
</script>

<script>
export default {
    name: 'Solver',
    props: { page: Number },
    methods: {
        async solveMaze(arr2D, x, y, mazePath) {
            arr2D[x][y].visited = true;
            mazePath.push(JSON.parse(JSON.stringify(arr2D[x][y])));

            // check for end of maze
            if (x === arr2D.length - 1 && y === arr2D[0].length - 1) {
                this.path = [...mazePath];
                // for (let i = 0; i < x + 1; i++) {
                //     for (let j = 0; j < y + 1; j++) {
                //         if (arr2D[i][j].visited === true) {
                //             this.path.push(JSON.parse(JSON.stringify(arr2D[i][j])));
                //         }
                //     }
                // }
                styleMazeCells(arr2D);
                return;
            }

            let opts = checkBorders(arr2D, x, y);
            if (opts.length > 0) {
                for (let i = 0; i < opts.length; ) {
                    let opt = opts[Math.floor(Math.random() * opts.length)];
                    switch (opt) {
                        case 'U':
                            this.solveMaze(arr2D, x - 1, y, mazePath);
                            break;
                        case 'R':
                            this.solveMaze(arr2D, x, y + 1, mazePath);
                            break;
                        case 'D':
                            this.solveMaze(arr2D, x + 1, y, mazePath);
                            break;
                        case 'L':
                            this.solveMaze(arr2D, x, y - 1, mazePath);
                            break;
                    }
                    opts.splice(opts.indexOf(opt), 1);
                }
            }
            arr2D[x][y].visited = false;
            mazePath.pop();
            return;
        },
    },
    data() {
        return {
            pageType: this.page,
            path: [],
        };
    },
};
</script>

<template>
    <div v-if="pageType === 1" class="maze-btn-container">
        <button @click="solveMaze(mazeArray.array, 0, 0, [])">
            Solve Maze
        </button>
    </div>
</template>

<style scoped>
.maze-btn-container {
    display: flex;
    justify-content: space-evenly;
    padding: 0.5em;
}

p {
    text-align: center;
    font-style: italic;
}
</style>