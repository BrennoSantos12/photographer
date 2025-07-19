<script setup lang="ts">
import Menu from './components/Menu.vue';
import Home from './views/Home.vue'
import About from './views/About.vue';
import Show from './views/Show.vue';
import Service from './views/Service.vue';
import Contact from './views/Contact.vue';
</script>

<template>
<Menu/>
<Home />
<About />
<Show />
<Service />
<Contact />
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    background-color: black;
}
body {
    margin: 0;
    padding: 0;
    background-image: url('../assets/img/caudas.png');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}
</style>
