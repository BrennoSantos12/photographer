<script setup lang="ts">
import { ref } from 'vue';

import img1 from '../assets/img/IMG_2047.jpg';
import img2 from '../assets/img/IMG_2308.jpg';
import img3 from '../assets/img/IMG_2074.jpg';
import img4 from '../assets/img/IMG_0900.jpg';
import img5 from '../assets/img/IMG_0947.jpg';
import img6 from '../assets/img/IMG_0954.jpg';
import img7 from '../assets/img/IMG_0959.jpg';
import img8 from '../assets/img/IMG_0960.jpg';

const selectedImage = ref<string | null>(null);

const randomHeights = ['h-[250px]', 'h-[600px]', 'h-[350px]', 'h-[450px]', 'h-[200px]'];

const images = [
  { src: img1, label: 'VIDRAÇAS', height: randomHeights[Math.floor(Math.random() * randomHeights.length)] },
  { src: img2, label: 'GAROTA VOODOO', height: randomHeights[Math.floor(Math.random() * randomHeights.length)] },
  { src: img3, label: 'PSICOSE', height: randomHeights[Math.floor(Math.random() * randomHeights.length)] },
  { src: img4, label: 'RUÍDO', height: randomHeights[Math.floor(Math.random() * randomHeights.length)] },
  { src: img5, label: 'PEDAÇOS DE QUEM JÁ SE FOI', height: randomHeights[Math.floor(Math.random() * randomHeights.length)] },
  { src: img6, label: 'FALSOS PROFETAS', height: randomHeights[Math.floor(Math.random() * randomHeights.length)] },
  { src: img7, label: 'VIDRAÇAS', height: randomHeights[Math.floor(Math.random() * randomHeights.length)] },
  { src: img8, label: 'CAQUINHOS', height: randomHeights[Math.floor(Math.random() * randomHeights.length)] },
];

const openImage = (src: string) => {
  selectedImage.value = src;
};

const closeImage = () => {
  selectedImage.value = null;
};
</script>

<template>
  <main class="background">
    <!-- Galeria -->
    <div class="columns-2 md:columns-2 lg:columns-3 gap-4 w-full max-w-7xl">
      <div 
        v-for="(img, i) in images" 
        :key="i" 
        class="relative overflow-hidden group mb-4 break-inside-avoid cursor-pointer"
        @click="openImage(img.src)"
      >
        <img 
          :src="img.src" 
          :alt="img.label" 
          :class="['w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-125', img.height]"
        >
        <div class="absolute bottom-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center
                    translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-out ">
          <span class="text-red-800 text-2xl font-bold">{{ img.label }}</span>
        </div>
      </div>
    </div>

    <div 
      v-if="selectedImage" 
      class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      @click="closeImage"
    >
      <img 
        :src="selectedImage" 
        alt="Zoomed image" 
        class="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
      >
    </div>
  </main>
</template>

<style scoped>
.background {
  background-image: url('../assets/gifs/vidracasLogo.gif');
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
</style>

