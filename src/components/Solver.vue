<script setup>
    import { checkBorders } from '../utils/arrayUtil';
    import { styleMazeCells } from '../utils/mazeUtil';
    import { mazeArray } from '../lib/mazeArray';
</script>

<script>
export default {
    name: 'Solver',
    props: { length: Number, width: Number, mazeArr: Array, page: Number },
    methods: {
        async solveMaze(arr2D, x, y, length, width) {
            arr2D[x][y].visited = true;

            // check for end of maze
            if (x === length - 1 && y === width - 1) {
                this.path = []
                for (let i = 0; i < x + 1; i++) {
                    for (let j = 0; j < y + 1; j++) {
                        if (arr2D[i][j].visited === true) {
                            this.path.push(JSON.parse(JSON.stringify(arr2D[i][j])));
                        }
                    }
                }
                styleMazeCells(arr2D);
                return;
            }

            let opts = checkBorders(arr2D, x, y);
            if (opts.length > 0) {
                for (let i = 0; i < opts.length; ) {
                    let opt = opts[Math.floor(Math.random() * opts.length)];
                    switch (opt) {
                        case 'U':
                            this.solveMaze(arr2D, x - 1, y, this.length, this.width);
                            break;
                        case 'R':
                            this.solveMaze(arr2D, x, y + 1, this.length, this.width);
                            break;
                        case 'D':
                            this.solveMaze(arr2D, x + 1, y, this.length, this.width);
                            break;
                        case 'L':
                            this.solveMaze(arr2D, x, y - 1, this.length, this.width);
                            break;
                    }
                    opts.splice(opts.indexOf(opt), 1);
                }
            }
            arr2D[x][y].visited = false;
            return;
        },
    },
    data() {
        return {
            pageType: this.page,
            path: [],
            l: this.length,
            w: this.width
        };
    },
};
</script>

<template>
    <div v-if="pageType === 1" class="maze-btn-container">
        <button @click="solveMaze(mazeArray.array, 0, 0, l, w)">
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