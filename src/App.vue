
<script setup lang="ts">
import Menu from './components/Menu.vue';
</script>

<template>
  <Menu />

    <router-view />
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
  