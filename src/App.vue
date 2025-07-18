<script setup lang="ts">
import Menu from './components/Menu.vue';
import Home from './views/Home.vue'
import About from './views/About.vue';
import Show from './views/Show.vue';
import Service from './views/Service.vue';
</script>

<template>
<Menu/>
<Home />
<About />
<Show />
<Service />

</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
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
