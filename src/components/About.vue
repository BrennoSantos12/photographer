<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const width = ref(60)
const height = ref(100)
const scale = ref(1.1) 
const translateY = ref(60)

function handleScroll() {
  const maxScroll = 400
  const scrolled = Math.min(window.scrollY, maxScroll)
  width.value = 60 + ((scrolled / maxScroll) * 40)
  height.value = 100 + (scrolled / maxScroll) * 100    

  scale.value = 1 - (scrolled / maxScroll)
  translateY.value = 60 - (scrolled / maxScroll) * 200
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <main class="background relative">
    <div
      class="absolute bg-[#4D4D4D] left-1/2 "
      :style="{
        top: 0,
        transform: 'translateX(-50%) translateY(-10%)',
        width: width + '%',
        height: height + 'vh',
        zIndex: 20,
      }"
    >
      <div
        class="p-20 animation-img grid grid-cols-4 gap-10"
        :style="{ 
          transform: `scale(${scale}) translateY(-${translateY}px)`, 
        }"
      >
        <img src="../assets/img/image01.png" alt="" class="flex img" />
        <img src="../assets/img/image01.png" alt="" class="flex img" />
        <img src="../assets/img/image01.png" alt="" class="flex img" />
        <img src="../assets/img/image01.png" alt="" class="flex img" />
      </div>
      <section class="mt-10 p-10 z-110">
        <h2 class="text-2xl font-bold text-white">Mais conteúdo aqui</h2>
        <p class="text-white">Adicione seus textos, imagens e outros elementos normalmente.</p>
      </section>
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
  min-height: 100vh;
  min-width: 100vw;
  display: block;
}
</style>