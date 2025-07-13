<template>
    <div class="fixed top-4 right-4 z-[99999]">
      <button
        @click="isOpen = !isOpen"
        class="flex flex-col justify-center gap-0.5 items-center w-10 h-10 space-y-1 focus:outline-none relative z-[10000]"
        aria-label="Abrir menu"
      >
        <span
          class="w-6 h-0.5 bg-white transition-transform duration-300"
          :class="{ 'rotate-45 translate-y-1.5': isOpen }"
        />
        <span
          class="w-6 h-0.5 bg-white transition-opacity duration-300"
          :class="{ 'opacity-0': isOpen }"
        />
        <span
          class="w-6 h-0.5 bg-white transition-transform duration-300"
          :class="{ '-rotate-45 -translate-y-1.5': isOpen }"
        />
      </button>
    </div>
  
    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
    ></div>
  
    <transition name="slide">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-[9999]"
      >
        <div
          class="absolute top-[-30px] right-[-90px]"
          ref="swingImg"
          @mousedown="startSwing"
          @touchstart="startSwing"
        >
          <img
            src="../assets/img/Caudas Identidade visual.kra~-autosave(1).png"
            alt=""
            class="h-[300px] swing-anchor"
          />
        </div>
        <ul class="text-6xl space-y-6 font-gravitas text-center">
          <li><a href="#" @click="isOpen = false">Início</a></li>
          <li><a href="#" @click="isOpen = false">Sobre mim</a></li>
          <li><a href="#" @click="isOpen = false">Galeria</a></li>
          <li><a href="#" @click="isOpen = false">Sair</a></li>
        </ul>
      </div>
    </transition>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const isOpen = ref(false)
  const swingImg = ref<HTMLElement | null>(null)
  
  function startSwing() {
    const el = swingImg.value
    if (!el) return
  
    el.classList.remove('animate-swing')
    void el.offsetWidth 
    el.classList.add('animate-swing')
  }
  </script>
  
  <style scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.4s ease;
  }
  .slide-enter-from {
    transform: translateX(100%);
  }
  .slide-leave-to {
    transform: translateX(100%);
  }
  
  .swing-anchor {
    transform-origin: top center;
  }
  
  @keyframes swing {
    0% { transform: rotate(0deg); }
    15% { transform: rotate(15deg); }
    30% { transform: rotate(-10deg); }
    45% { transform: rotate(8deg); }
    60% { transform: rotate(-6deg); }
    75% { transform: rotate(4deg); }
    100% { transform: rotate(0deg); }
  }
  
  .animate-swing {
    animation: swing 0.8s ease-in-out;
  }
  </style>
  