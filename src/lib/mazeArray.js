import { reactive } from "vue";
import { create2dArray } from "../utils/arrayUtil";

// Global 2D array
export const mazeArray = reactive({
    array: create2dArray(10, 10),
    set(arr) { this.array = arr },
    get() { return this.array }
})