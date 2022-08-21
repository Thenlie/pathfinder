<template>
    <header>
        <div class="logo-container">
            <h1>Pathfinder</h1>
            <span class="dot" style="background-color: #0E79B2;"></span>
            <span class="dot" style="background-color: #F25757;"></span>
            <span class="dot" style="background-color: #F2E863;"></span>
        </div>
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
        background-color: white;
        box-shadow: 0 0 10px gray;
    }

    .logo-container {
        display: flex;
        align-items: center;
    }

    .logo-container h1 {
        padding: 1em 0.1em 1em 1em;
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