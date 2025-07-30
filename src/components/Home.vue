<script setup lang="ts">
import { ref, onMounted } from 'vue'

const letters = ref(['C', 'a', 'u', 'd', 'a', 's'])
const showLetters = ref(Array(letters.value.length).fill(false))
const underlineState = ref('start')
const showBackground = ref(false)
const showContent = ref(false)
const floatLetters = ref(false)
const floatDelays = ref<number[] | null>(null)
const floatAmplitudes = ref<number[] | null>(null)
const floatXAmplitudes = ref<number[] | null>(null) 
const floatRotations = ref<number[] | null>(null) // Nova ref para rotação

function getRandomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

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
  await new Promise(r => setTimeout(r, 200))

  underlineState.value = 'shrink'
  await new Promise(r => setTimeout(r, 500))

  floatDelays.value = letters.value.map(() => getRandomFloat(0, 1));
  floatAmplitudes.value = letters.value.map(() => getRandomFloat(5, 5));
  floatXAmplitudes.value = letters.value.map(() => getRandomFloat(-1, 3)); 
  floatRotations.value = letters.value.map(() => getRandomFloat(-3, 3)); 

  floatLetters.value = true
})
</script>

<template>
  <main class="background">
    <div v-if="showContent" class="content">
      <h1 class="font-gravitas text-[10vw] sm:text-[80px] text-[#d8d8d8] h1-animated">
        <span
          v-for="(l, i) in letters"
          :key="i"
          class="letter"
          :style="{
            '--float-delay': floatDelays ? `${floatDelays[i]}s` : '10s',
            '--float-amplitude': floatAmplitudes ? `${floatAmplitudes[i]}px` : '0px',
            '--float-x-amplitude': floatXAmplitudes ? `${floatXAmplitudes[i]}px` : '0px',
            '--float-rotation': floatRotations ? `${floatRotations[i]}deg` : '0deg'
          }"
          :class="{ visible: showLetters[i], floating: floatLetters }"
        >
          {{ l }}
        </span>
      </h1>
      <div class="underline" :class="underlineState"></div>
    </div>
    <div>
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

.background::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 100;
}

.content {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.h1-animated {
  display: flex;
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

@keyframes float {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
  25% {
    transform: translateY(calc(var(--float-amplitude) * -1)) translateX(var(--float-x-amplitude)) rotate(var(--float-rotation));
  }
  50% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
  75% {
    transform: translateY(calc(var(--float-amplitude) * 0.5)) translateX(calc(var(--float-x-amplitude) * -1)) rotate(calc(var(--float-rotation) * -0.5));
  }
  100% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
}

.letter.floating {
  animation: float 10s ease-in-out infinite; 
  animation-delay: var(--float-delay);
}

.underline {
  height: 4px;
  background: #d8d8d8;
  border-radius: 2px;
  margin-top: -30px;
  margin-bottom: 16px;
  width: 0;
  opacity: 0;
  transition:
    width 0.8s cubic-bezier(.77,0,.18,1),
    opacity 0.8s cubic-bezier(.77,0,.18,1);
}

.underline.start {
  width: 30px;
  opacity: 0;
}

.underline.grow {
  width: 30rem;
  opacity: 1;
}

.underline.shrink {
  width: 0;
  opacity: 0;
  transition:
    width .5s,
    opacity 0.5s 0.1s;
}

@media (max-width: 600px) {
  .h1-animated {
    font-size: 12vw;
  }
  .letter {
    font-size: 14vw;
  }
  .underline.grow {
    width: 80vw;
    max-width: 90vw;
  }
  .underline {
    margin-top: -10px;
  }
  .content {
    padding: 0 4vw;
  }
}
</style>