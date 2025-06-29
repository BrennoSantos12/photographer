<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const width = ref(60)
const height = ref(100)
const scale = ref(1.1) 
const translateY = ref(60)
const lastSection = ref<HTMLElement | null>(null)


function handleScroll() {
  const maxScroll = 400
  const scrolled = Math.min(window.scrollY, maxScroll)
  width.value = 60 + ((scrolled / maxScroll) * 40)
  height.value = 100 + (scrolled / maxScroll) * 100    

  scale.value = 1 - (scrolled / maxScroll)
  translateY.value = 60 - (scrolled / maxScroll) * 200
  if (lastSection.value) {
    lastSection.value.style.transform = `width(${scrolled / 2}px)`
  }
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
        <h1 class="text-4xl font-bold text-white">Mais conteúdo aqui</h1>
        <h1 class="text-white text-2xl w-[50%]">Lorem ipsum dolor sit amet consectetur, 
          adipisicing elit. Minus ex atque quisquam praesentium dignissimos perferendis
           eveniet, officia necessitatibus officiis vero dolor mollitia soluta temporibus 
           provident, minima, laborum laboriosam animi tempore?</h1>
      </section>
      <section class="flex justify-end p-10">
          <h1 class="text-4xl font-bold text-white">MAIS CONTEUDO AQUI</h1>
       </section>
       <section class="flex justify-end p-10 translate-y-[-5rem] text-right">
        <h1 class="text-white text-2xl w-[50%]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae ut omnis veritatis beatae officiis voluptate suscipit voluptatem tenetur illo! Nihil quae saepe quam similique iure odit unde alias adipisci. Culpa?</h1>
       </section>
       <section class="mt-10 p-10 z-110">
        <h1 class="text-4xl font-bold text-white">Mais conteúdo aqui</h1>
        <h1 class="text-white text-2xl w-[50%]">Lorem ipsum dolor sit amet consectetur, 
          adipisicing elit. Minus ex atque quisquam praesentium dignissimos perferendis
           eveniet, officia necessitatibus officiis vero dolor mollitia soluta temporibus 
           provident, minima, laborum laboriosam animi tempore?</h1>
      </section>
      <section class="flex justify-end p-10">
        <h1 class="text-4xl font-bold text-white">MAIS CONTEUDO AQUI</h1>
     </section>
     <section ref="lastSection" class="flex justify-end p-10 translate-y-[-5rem] text-right">
      <h1 class="text-white text-2xl w-[50%]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae ut omnis veritatis beatae officiis voluptate suscipit voluptatem tenetur illo! Nihil quae saepe quam similique iure odit unde alias adipisci. Culpa?</h1>
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