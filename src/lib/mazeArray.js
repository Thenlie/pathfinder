import { reactive } from "vue";

// Global 2D array
export const mazeArray = reactive({
    array: [0],
    set(arr) { this.array = arr },
    get() { return this.array }
})