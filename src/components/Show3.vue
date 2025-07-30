<script setup lang="ts">
import { ref } from 'vue';

import img1 from '../assets/img/IMG_2011.jpg';
import img2 from '../assets/img/IMG_1005.jpg';
import img3 from '../assets/img/IMG_0927.jpg';
import img4 from '../assets/img/DSC03007.jpg';
import img5 from '../assets/img/DSC02999.jpg';
import img6 from '../assets/img/IMG_1089.jpg';
import img7 from '../assets/img/20250322_214701.jpg';
import img8 from '../assets/img/20250322_214655.jpg';

const selectedImage = ref<string | null>(null);

const randomHeights = ['h-[250px]', 'h-[600px]', 'h-[350px]', 'h-[450px]', 'h-[200px]'];

const images = [
  { src: img1, label: 'MUSH', height: randomHeights[Math.floor(Math.random() * randomHeights.length)] },
  { src: img2, label: 'GRITARIA', height: randomHeights[Math.floor(Math.random() * randomHeights.length)] },
  { src: img3, label: 'EMOÇÃO', height: randomHeights[Math.floor(Math.random() * randomHeights.length)] },
  { src: img4, label: 'RESISTÊNCIA', height: randomHeights[Math.floor(Math.random() * randomHeights.length)] },
  { src: img5, label: 'MÚSICA', height: randomHeights[Math.floor(Math.random() * randomHeights.length)] },
  { src: img6, label: 'ARTE', height: randomHeights[Math.floor(Math.random() * randomHeights.length)] },
  { src: img7, label: 'REVOLUÇÃO', height: randomHeights[Math.floor(Math.random() * randomHeights.length)] },
  { src: img8, label: 'PERTENCIMENTO', height: randomHeights[Math.floor(Math.random() * randomHeights.length)] },
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
          <span class="text-red-800 text-2xl font-bold font-gravitas text-center p-2">{{ img.label }}</span>
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
  background-image: url('../assets/img/IMG_2567.jpg');
  background-size: 100%;
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

