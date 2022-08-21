<template>
    <header>
        <div class="logo-container">
            <h1>Pathfinder</h1>
            <!-- Inspired by https://codepen.io/avstorm/pen/oqKbLq -->
            <span class="dot" style="background-color: #2A6EDB;"></span>
            <span class="dot" style="background-color: #F25757;"></span>
            <span class="dot" style="background-color: #F2E863;"></span>
        </div>
        <div class="btn-container">
            <router-link to="/" class="cta cta1">
                <span>Home</span>
            </router-link>
            <router-link to="/about" class="cta cta2">
                <span>About</span>
            </router-link>
            <a href="https://github.com/Thenlie/pathfinder" class="cta cta3">
                <span>Code</span>
            </a>
        </div>
    </header>
</template>

<style scoped lang="scss">
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

    a {
        text-decoration: none;
        color: inherit;
    }

    .cta {
        position: relative;
        margin: 0.25em;
        padding: 19px 22px;
        transition: all 0.2s ease;
    }
    .cta:before {
        content: "";
        position: absolute;
        top: 8px;
        left: 0;
        display: block;
        border-radius: 28px;
        width: 40px;
        height: 40px;
        transition: all 0.3s ease;
    }
    .cta1:before {
        background: rgba(157, 169, 255, 0.5);
    }
    .cta2:before {
        background: rgba(255, 171, 157, 0.5);
    }    
    .cta3:before {
        background: rgba(243, 240, 116, 0.5);
    }  
    .cta span {
        position: relative;
        font-size: 16px;
        line-height: 18px;
        font-weight: 900;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        vertical-align: middle;
    }
    .cta:hover:before {
        width: 100%;
    }
    .cta1:hover:before {
        background: #2A6EDB;
    }
    .cta2:hover:before {
        background: #F25757;
    }
    .cta3:hover:before {
        background: #F2E863;
    }
    .cta:active {
        transform: scale(0.96);
    }
</style>