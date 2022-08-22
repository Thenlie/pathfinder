import { createApp } from 'vue'
import './style.css'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import App from './App.vue'
import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/common';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import BackToTop from 'vue-backtotop'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons'

library.add(faArrowAltCircleUp)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/about', name: 'About', component: About },
    ],
})

hljs.registerLanguage('javascript', javascript);

createApp(App)
    .use(router)
    .use(hljsVuePlugin)
    .use(BackToTop)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
