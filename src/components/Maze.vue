<script>
export default {
    data() {
        return {
            length: [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            width: [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
        }
    }
}
</script>

<template>
    <main>
        <h1 class="maze-heading">Maze</h1>
        <table class="maze-table">
            <tbody>
                <tr v-for="(x, i) in length">
                    <td v-for="(y, j) in width" :id="i.toString()+j.toString()">
                        {{ i === 0 && j === 0 ? 'S' : ' '}}
                        {{ i === length.length-1 && j === width.length-1 ? 'F' : ' '}}
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>
