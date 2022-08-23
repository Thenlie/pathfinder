<script setup>
    import Navigation from './components/Navigation.vue';
    import Footer from './components/Footer.vue';
</script>

<template>
    <Navigation/>
    <router-view></router-view>
    <Footer />
</template>
