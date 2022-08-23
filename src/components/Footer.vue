<script setup>
    import Dots from './Dots.vue';
</script>

<template>
    <footer>
        <div>
            <Dots />
            <p>&copy; Thenlie 2022</p>
        </div>
        <a href="https://github.com/Thenlie/pathfinder"><font-awesome-icon icon="fa-brands fa-github" size="3x"></font-awesome-icon></a>
    </footer>
</template>

<style scoped>
    footer {
        height: 6em;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 0 10px gray;
    }
    footer div {
        padding: 0.5em;
        display: flex;
    }
    p {
        margin: auto;
        padding-left: 0.5em;
    }
    svg {
        padding: 0.5em;
        color: rgba(0, 0, 0, 0.5);
        margin-left: auto;
    }
    svg:hover {
        color: rgba(0, 0, 0, 1)
    }

</style>