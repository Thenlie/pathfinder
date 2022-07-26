<script setup>
    import Dots from './Dots.vue';
</script>

<script>
    export default {
        name: 'Navigation',
        methods: {
            toggleMenu() {
                let menu = document.querySelector('.mobile-menu');
                let btnC = document.querySelector('.mobile-btn-container');
                if (menu.classList.contains('is-active')) {
                    btnC.style.height = '0px';
                } else {
                    if (window.innerWidth > 400) {
                        btnC.style.height = '6em';
                    } else {
                        btnC.style.height = '15em';
                    }
                }
                    menu.classList.toggle('is-active');
            },
            onResize() {
                if (window.innerWidth > 800) {
                    document.querySelector('.mobile-btn-container').style.height = '0';
                    document.querySelector('.mobile-btn-container').style.display = 'none';
                    document.querySelector('.mobile-menu').classList.remove('is-active');
                } else if (window.innerWidth < 800 && window.innerWidth > 400) {
                    document.querySelector('.mobile-btn-container').style.display = 'flex';
                    if (document.querySelector('.mobile-menu').classList.contains('is-active')) {
                        document.querySelector('.mobile-btn-container').style.height = '6em';
                    }
                } else if (window.innerWidth < 400) {
                    if (document.querySelector('.mobile-menu').classList.contains('is-active')) {
                        document.querySelector('.mobile-btn-container').style.height = '15em';
                    }
                }
            }
        },

        created() {
            window.addEventListener('resize', this.onResize)
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.onResize)
        },
    }
</script>

<template>
    <header class="header">
        <div class="mobile-container">   
            <div class="logo-container">
                <h1>Pathfinder</h1>
                <!-- Inspired by https://codepen.io/avstorm/pen/oqKbLq -->
                <Dots />
            </div>
            <div class="mobile-menu" @click="toggleMenu()">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </div>
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
    <div class="mobile-btn-container">
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
</template>

<style scoped lang="scss">
    header {
        height: 6em;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        box-shadow: 0 0 10px gray;
    }

    .logo-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .logo-container h1 {
        padding: 0 0.1em 0 1em;
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
    .mobile-menu {
        display: none;
    }
    .mobile-btn-container {
        display: none;
    }
    @media screen and (max-width: 800px) {
        .cta span {
            font-size: 14px;
        }
        .btn-container {
            display: none;
        }
        .mobile-container {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        .mobile-btn-container {
            display: flex;
            background-color: white;
            height: 0;
            justify-content: center;
            align-items: center;
            box-shadow: 0 10px 10px -10px gray;
            overflow: hidden;
            transition: all 0.4s ease-in-out;
        }
        .mobile-menu {
            display: block;
            margin: 1em;
        }
        .mobile-menu .line{
            width: 50px;
            height: 5px;
            background-color: black;
            display: block;
            margin: 8px auto;
            -webkit-transition: all 0.3s ease-in-out;
            -o-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
        }

        .mobile-menu:hover{
            cursor: pointer;
        }
        .mobile-menu.is-active .line:nth-child(2){
            opacity: 0;
        }

        .mobile-menu.is-active .line:nth-child(1){
            -webkit-transform: translateY(13px) rotate(45deg);
            -ms-transform: translateY(13px) rotate(45deg);
            -o-transform: translateY(13px) rotate(45deg);
            transform: translateY(13px) rotate(45deg);
        }

        .mobile-menu.is-active .line:nth-child(3){
            -webkit-transform: translateY(-13px) rotate(-45deg);
            -ms-transform: translateY(-13px) rotate(-45deg);
            -o-transform: translateY(-13px) rotate(-45deg);
            transform: translateY(-13px) rotate(-45deg);
        }
    }
    @media screen and (max-width: 400px) {
        .mobile-btn-container {
            flex-direction: column;
            align-items:flex-start;
        }
        .logo-container h1 {
            font-size: 20px;
        }
        .cta {
            margin-left: 1em;
        }
        .mobile-menu .line {
            width: 30px;
        }
    }
</style>