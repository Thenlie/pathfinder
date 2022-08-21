<template>
    <header>
        <h1>Pathfinder</h1>
        <div class="btn-container">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
        </div>
    </header>
</template>

<style scoped>
    header {
        height: 5em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;;
    }

    header h1 {
        padding: 1em;
    }

    .btn-container {
        display: flex;
        justify-content: space-around;
    }
    
    .btn-container a {
        padding: 1em;
        font-size: x-large;
        text-decoration: none;
        color: black;
    }

    .btn-container a:hover {
        text-decoration: underline;
    }
</style>