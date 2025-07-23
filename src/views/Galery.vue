<script setup lang="ts">
import { ref } from 'vue';

// Importa todas as imagens automaticamente
const imgFiles = import.meta.glob('../assets/img/*.{jpg,jpeg,png,webp}', { eager: true });

// Alturas aleatórias
const randomHeights = ['h-[250px]', 'h-[300px]', 'h-[350px]', 'h-[400px]', 'h-[450px]'];

// Lista de todas as imagens
const allImages = Object.values(imgFiles).map((mod: any) => ({
  src: mod.default,
  height: randomHeights[Math.floor(Math.random() * randomHeights.length)]
}));

const selectedImage = ref<string | null>(null);

const openImage = (src: string) => {
  selectedImage.value = src;
};

const closeImage = () => {
  selectedImage.value = null;
};
</script>

<template>
  <main>
    <div class="columns-2 md:columns-2 lg:columns-4 gap-4 w-full p-4">
      <div
        v-for="(img, i) in allImages"
        :key="i"
        class="relative overflow-hidden group mb-4 break-inside-avoid cursor-pointer"
        @click="openImage(img.src)"
      >
        <img
          :src="img.src"
          loading="lazy"
          alt="Imagem da galeria"
          :class="['w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110', img.height]"
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
