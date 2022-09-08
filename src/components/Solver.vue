<script setup>
    import { checkBorders } from '../utils/arrayUtil';
    import { clearMazePath, animateMazePath } from '../utils/mazeUtil';
    import { mazeArray } from '../lib/mazeArray';
</script>

<script>
export default {
    name: 'Solver',
    props: { page: Number },
    methods: {
        async solveMaze() {
            clearMazePath(this.path);
            const findMazePath = (arr2D, x, y, mazePath) => {
              arr2D[x][y].visited = true; // <-- not sure if this is necessary anymore
              mazePath.push(JSON.parse(JSON.stringify(arr2D[x][y])));

              // check for end of maze
              if (x === arr2D.length - 1 && y === arr2D[0].length - 1) {
                  this.path = [...mazePath];
                  return;
              }

              let opts = checkBorders(arr2D, x, y);
              if (opts.length > 0) {
                  for (let i = 0; i < opts.length; ) {
                      let opt = opts[Math.floor(Math.random() * opts.length)];
                      switch (opt) {
                          case 'U':
                              findMazePath(arr2D, x - 1, y, mazePath);
                              break;
                          case 'R':
                              findMazePath(arr2D, x, y + 1, mazePath);
                              break;
                          case 'D':
                              findMazePath(arr2D, x + 1, y, mazePath);
                              break;
                          case 'L':
                              findMazePath(arr2D, x, y - 1, mazePath);
                              break;
                      }
                      opts.splice(opts.indexOf(opt), 1);
                  }
              }
              arr2D[x][y].visited = false; // <-- not sure if this is necessary anymore
              mazePath.pop();
              return;
            }
            findMazePath(mazeArray.array, 0, 0, []);
            animateMazePath(this.path);
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
        <button @click="solveMaze()">
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