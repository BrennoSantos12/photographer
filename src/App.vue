<script setup lang="ts">
import Menu from './components/Menu.vue';
import Home from './components/Home.vue'
import About from './components/About.vue';
import Service from './components/Service.vue';
</script>

<template>
<Menu/>
<Home />
<About />
<Service />
</template>

<style scoped>

body {
    margin: 0;
    padding: 0;
    background-image: url('../assets/img/caudas.png');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}
</style>
