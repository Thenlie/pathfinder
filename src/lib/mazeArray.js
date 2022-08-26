import { reactive } from "vue";

export const mazeArray = reactive({
    array: [0],
    set(arr) { this.array = arr },
    get() { return this.array }
})