<script setup>
import { checkBorders } from '../utils/arrayUtil';
</script>

<script>
export default {
  name: 'Solver',
  props: { length: Number, width: Number, mazeArr: Array, page: Number },
  methods: {
    solveMaze(arr2D, x, y, length, width) {
      arr2D[x][y].visited = true;
      path.push(arr2D[x][y]);

      // check for end of maze
      if (x === length - 1 && y === width - 1) {
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
            default:
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
    };
  },
};
</script>

<template>
  <div v-if="pageType === 1" class="maze-btn-container">
    <button @click="solveMaze(this.mazeArr, 0, 0, this.length, this.width)">
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