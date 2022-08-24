<script setup>
import { checkBorders } from '../utils/arrayUtil';
</script>

<script>
export default {
  name: 'Solver',
  props: { mazeArr: Array },
  methods: {
    solveMaze() {
      let path = [];
      arr2D[x][y].visited = true;
      path.push(arr2D[x][y]);

      // check for end of maze
      if (x === 9 && y === 9) {
        console.log(path);
        return;
      }

      let opts = checkWalls(arr2D, x, y);
      if (opts.length > 0) {
        for (let i = 0; i < opts.length; ) {
          let opt = opts[Math.floor(Math.random() * opts.length)];
          switch (opt) {
            case 'U':
              solveMaze(arr2D, x - 1, y);
              break;
            case 'R':
              solveMaze(arr2D, x, y + 1);
              break;
            case 'D':
              solveMaze(arr2D, x + 1, y);
              break;
            case 'L':
              solveMaze(arr2D, x, y - 1);
              break;
            default:
              break;
          }
          opts.splice(opts.indexOf(opt), 1);
        }
      }
      arr2D[x][y].visited = false;
      path.pop();
      return;
    },
  },
};
</script>

<template>
  <main>
    <h1>Solver</h1>
  </main>
</template>