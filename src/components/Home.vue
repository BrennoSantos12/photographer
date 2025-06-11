<script setup lang="ts">
import { ref, onMounted } from 'vue'

const letters = ref(['C', 'a', 'u', 'd', 'a', 's'])
const showLetters = ref([false, false, false, false, false, false])
const underlineState = ref('start')
const showBackground = ref(false)
const showContent = ref(false)

onMounted(async () => {
  showBackground.value = true
  await new Promise(r => setTimeout(r, 250))
  showContent.value = true
  await new Promise(r => setTimeout(r, 200))
  underlineState.value = 'grow'
  await new Promise(r => setTimeout(r, 800))
  for (let i = 0; i < letters.value.length; i++) {
    showLetters.value[i] = true
    await new Promise(r => setTimeout(r, 50))
  }
  await new Promise(r => setTimeout(r, 800))
  underlineState.value = 'shrink'
})
</script>

<template>
  <main>
    <div v-if="showBackground" class="background">
      <div v-if="showContent" class="content">
        <h1 class="font-gravitas text-[100px] text-[#d8d8d8] h1-animated">
          <span v-for="(l, i) in letters" :key="i" class="letter" :class="{ visible: showLetters[i] }">{{ l }}</span>
        </h1>
        <div class="underline" :class="underlineState"></div>
      </div>
    </div>
      <div>
        
      </div>
  </main>
</template>

<style scoped>
.white-screen.hide {
  opacity: 0;
  pointer-events: none;
}
.background {
  background-image: url('../assets/img/caudas.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 20%;
  min-height: 100vh;
  min-width: 100vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: opacity 0.5s;
}
.background::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
.content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.h1-animated {
  display: flex;
  gap: 0.1em;
  justify-content: center;
}
.letter {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity .5s, transform 0.3s;
}
.letter.visible {
  opacity: 1;
  transform: translateY(0);
}
.underline {
  height: 4px;
  background: #d8d8d8;
  border-radius: 2px;
  margin-top: -80px;
  margin-bottom: 16px;
  width: 0;
  opacity: 0;
  transition:
    width 0.8s cubic-bezier(.77,0,.18,1),
    opacity 0.8s cubic-bezier(.77,0,.18,1);
}
.underline.start {
  width: 60px;
  opacity: 0;
}
.underline.grow {
  width: 40rem;
  opacity: 1;
}
.underline.shrink {
  width: 0;
  opacity: 0;
  transition:
    width .5s,
    opacity 0.5s 0.8s;
}
</style>