<script setup lang="ts">
</script>

<template>
  <main class="background">
    <div class="grid grid-cols-3 p-4 gap-4">
      <div class="relative overflow-hidden group h-[400px]">
        <img 
          src="../assets/img/20250322_213951.jpg" 
          alt="sestro" 
          class="w-full h-full object-cover rounded-lg"
        >
        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full 
        h-full w-full bg-black bg-opacity-90 flex items-center justify-center
        group-hover:translate-y-[-0%] transition-all duration-300 ease-out rounded-lg
       ">
          <span class="text-red-800 text-2xl font-bold">SESTRO</span>
        </div>
      </div>

      <div class="relative overflow-hidden group h-[300px]">
        <img 
          src="../assets/img/20250322_213620(0).jpg" 
          alt="sestro" 
          class="w-full h-full object-cover rounded-lg"
        >
        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full 
                   h-full w-full bg-black bg-opacity-90 flex items-center justify-center
                   group-hover:translate-y-[-0%] transition-all duration-300 ease-out rounded-lg
                  ">
          <span class="text-red-800 text-2xl font-bold">HATE</span>
        </div>
      </div>

      <div class="relative overflow-hidden group h-[400px]">
        <img 
          src="../assets/img/20250322_213317.jpg" 
          alt="sestro" 
          class="w-full h-full object-cover rounded-lg"
        >
        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full 
        h-full w-full bg-black bg-opacity-90 flex items-center justify-center
        group-hover:translate-y-[-0%] transition-all duration-300 ease-out rounded-lg
       ">
          <span class="text-red-800 text-2xl font-bold">SESTRO</span>
        </div>
      </div>

      <div class="relative overflow-hidden group h-[300px]">
        <img 
          src="../assets/img/20250322_213445(0).jpg" 
          alt="sestro" 
          class="w-full h-full object-cover rounded-lg"
        >
        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full 
        h-full w-full bg-black bg-opacity-90 flex items-center justify-center
        group-hover:translate-y-[-0%] transition-all duration-300 ease-out rounded-lg
       ">
          <span class="text-red-800 text-2xl font-bold">HATE</span>
        </div>
      </div>

      <div class="relative overflow-hidden group h-[500px] -translate-y-20">
        <img 
          src="../assets/img/20250322_214549.jpg" 
          alt="sestro" 
          class="w-full h-full object-cover rounded-lg"
        >
        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full 
        h-full w-full bg-black bg-opacity-90 flex items-center justify-center
        group-hover:translate-y-[-0%] transition-all duration-300 ease-out rounded-lg
       ">
          <span class="text-red-800 text-2xl font-bold">SESTRO</span>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.background {
  background-image: url('../assets/img/01 desenho.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  min-height: 200vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  padding: 2rem;
}
</style>