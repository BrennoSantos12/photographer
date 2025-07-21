<script setup lang="ts">
import { ref } from 'vue';

const selectedImage = ref<string | null>(null);
const randomHeights = ['h-[250px]', 'h-[300px]', 'h-[350px]', 'h-[400px]', 'h-[450px]'];

const imagensImportadas = import.meta.glob('../assets/img/*.{png,jpg,jpeg,gif,webp}', { eager: true });

interface ImageItem {
  src: string;
  height: string;
}

const images = Object.values(imagensImportadas).map((mod: any) => ({
  src: mod.default,
  height: randomHeights[Math.floor(Math.random() * randomHeights.length)]
})) as ImageItem[];

const openImage = (src: string) => {
  selectedImage.value = src;
};

const closeImage = () => {
  selectedImage.value = null;
};
</script>

<template>
  <main class="">
    <div class="columns-2 md:columns-2 lg:columns-3 gap-4 w-full max-w-7xl">
      <div 
        v-for="(img, i) in images" 
        :key="i" 
        class="relative overflow-hidden group mb-4 break-inside-avoid cursor-pointer"
        @click="openImage(img.src)"
      >
        <img 
          :src="img.src" 
          alt="Imagem da galeria"
          :class="['w-full object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105', img.height]"
        >
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
</style>
