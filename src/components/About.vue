<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const width = ref(60)
const height = ref(5)
const showCaudas = ref(false)

function handleScroll() {
  const maxScroll = 400
  const scrolled = Math.min(window.scrollY, maxScroll)
  width.value = 60 + ((scrolled / maxScroll) * 40)
  height.value = 5 + (scrolled / maxScroll) * 100    
  showCaudas.value = scrolled >= maxScroll
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <main 
    class="background h-screen w-screen flex items-center justify-center"
  >
    <div
      class="fixed bg-white flex items-center justify-center "
      :style="{
        left: '50%',
        bottom: '0%',
        transform: 'translate(-50%)',
        width: width + '%',
        height: height + 'vh',
        zIndex: 20
      }"
    >
      <h1 v-if="height > 10" class="text-4xl">OLA MUNDO</h1>
    </div>
    <div
      v-if="showCaudas"
      class="fixed top-4 left-4 text-3xl text-black font-bold text-white z-30 "
      
    >
      Caudas
    </div>
  </main>
</template>

<style scoped>
.background {
  background-image: url('../assets/img/caudas.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 40%;
  background-attachment: fixed;
  height: 100vh;
  min-width: 100vw;
  position: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: opacity 0.5s;
}
</style>