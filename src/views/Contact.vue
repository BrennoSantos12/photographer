<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

interface TiltStyle {
  transform: string;
  transition?: string;
  [k: string]: any;
}

const tiltStyles = ref<Record<number, TiltStyle>>({});
const lightPositions = ref<Record<number, { x: number; y: number }>>({});
const lastActive = ref<Record<number, number>>({});
const hovering = ref<Record<number, boolean>>({});
const phases = ref<Record<number, number>>({}); 

const MAX_ROT = 30;          
const HOVER_SCALE = 1.05;
const IDLE_AFTER = 1200;     
const IDLE_ROT = 4;         
const IDLE_SPEED = 0.0008;  

function ensureDefaults(id: number) {
  if (!tiltStyles.value[id]) {
    tiltStyles.value[id] = {
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      '--lx': '50%',
      '--ly': '50%',
      transition: 'transform 0.25s ease-out'
    };
  }
  if (!lightPositions.value[id]) lightPositions.value[id] = { x: 50, y: 50 };
  if (!lastActive.value[id]) lastActive.value[id] = performance.now();
  if (!phases.value[id]) phases.value[id] = Math.random() * Math.PI * 2;
  if (hovering.value[id] === undefined) hovering.value[id] = false;
}

function handleMouseMove(e: MouseEvent, id: number) {
  ensureDefaults(id);
  hovering.value[id] = true;
  lastActive.value[id] = performance.now();

  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * MAX_ROT;
  const rotateY = ((x - centerX) / centerX) * MAX_ROT;

  const lx = (x / rect.width) * 100;
  const ly = (y / rect.height) * 100;

  tiltStyles.value[id] = {
    ...tiltStyles.value[id],
    transform: `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(${HOVER_SCALE})`,
    transition: 'transform 0.06s ease-out',
    '--lx': `${lx}%`,
    '--ly': `${ly}%`
  };
  lightPositions.value[id] = { x: lx, y: ly };
}

function handleMouseLeave(id: number) {
  ensureDefaults(id);
  hovering.value[id] = false;
  lastActive.value[id] = performance.now(); 
  tiltStyles.value[id] = {
    ...tiltStyles.value[id],
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: 'transform 0.4s cubic-bezier(.22,.74,.28,1)'
  };
  lightPositions.value[id] = { x: 50, y: 50 };
  tiltStyles.value[id]['--lx'] = '50%';
  tiltStyles.value[id]['--ly'] = '50%';
}

let rafId: number;

function idleLoop(t: number) {
  const now = performance.now();

  Object.keys(tiltStyles.value).forEach(key => {
    const id = Number(key);
    ensureDefaults(id);

    if (hovering.value[id]) return; 

    const inactiveFor = now - lastActive.value[id];
    if (inactiveFor < IDLE_AFTER) return;

    const phase = phases.value[id] + t * IDLE_SPEED;
    const rX = Math.sin(phase) * IDLE_ROT;
    const rY = Math.cos(phase * 0.9) * IDLE_ROT;

    tiltStyles.value[id] = {
      ...tiltStyles.value[id],
      transform: `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale(1)`,
      transition: 'transform 0.5s ease-in-out'
    };

    const lx = 50 + Math.sin(phase * 1.3) * 8;
    const ly = 50 + Math.cos(phase * 1.1) * 8;
    tiltStyles.value[id]['--lx'] = `${lx}%`;
    tiltStyles.value[id]['--ly'] = `${ly}%`;
  });

  rafId = requestAnimationFrame(idleLoop);
}

onMounted(() => {
  [1, 2, 3].forEach(ensureDefaults);
  rafId = requestAnimationFrame(idleLoop);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId);
});

</script>
<template>
    <main class="background text-white min-h-screen bg-black px-4">
      <div class="flex flex-col">
        <div class="fle itens-center justify-center text-center mb-8">
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-gravitas">Vamos conversar!</h1>

        </div>
  
        <div class="flex">
          <div>
            <div class="flex flex-col w-80 gap-4 text-center">
  
              <h1 class="text-2xl font-semibold">Entre em contato!</h1>
  
              <div
                class="tilt-wrapper"
                :style="tiltStyles[1]"
                @mousemove="e => handleMouseMove(e,1)"
                @mouseleave="() => handleMouseLeave(1)"
              >
                <input
                  type="text"
                  placeholder="Seu nome"
                  class="tilt-elem bg-gray-200 text-black hover:text-white hover:bg-gray-900  p-2 rounded w-full max-w-md focus:outline-none"
                />
              </div>
  
              <div
                class="tilt-wrapper"
                :style="tiltStyles[2]"
                @mousemove="e => handleMouseMove(e,2)"
                @mouseleave="() => handleMouseLeave(2)"
              >
                <textarea
                  placeholder="Sua mensagem"
                  rows="5"
                  class="tilt-elem bg-gray-200 text-black hover:text-white hover:bg-gray-900 p-2 rounded w-full max-w-md resize-none focus:outline-none"
                ></textarea>
              </div>
  
              <div
              :style="tiltStyles[3]"
                @mousemove="e => handleMouseMove(e,3)"
                @mouseleave="() => handleMouseLeave(3)"
                class="tilt-wrapper inline-block"
              >
                <button
                  class="tilt-elem bg-red-600 text-white p-2  font-medium hover:bg-gray-900 hover:text-red-600 active:scale-[0.98] transition-colors duration-150"
                >
                  Enviar
                </button>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </main>
    <div class="bg-black w-screen h-20 flex justify-center items-center text-gray-500"><h1>desenvolvido por: @techinov</h1></div>
</template>
  
<style>

.background {
    background-image: url('../assets/img/image 1.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    min-height: 88vh;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 2rem;
  }
  
  .tilt-wrapper {
    perspective: 1000px;
    will-change: transform;
    transition: transform 0.3s ease;
    --lx: 50%;
    --ly: 50%;
    position: relative;
    display: inline-block;
  }
  
  .tilt-elem {
    position: relative;
    display: block;
    width: 100%;
    transform-style: preserve-3d;
    box-shadow:
      0 6px 16px -4px rgba(0,0,0,0.4),
      0 2px 4px -1px rgba(0,0,0,0.3);
    transition: background 0.3s ease;
    z-index: 1;
    background-clip: padding-box;
    overflow: hidden;
  }
  
  .tilt-wrapper::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at var(--lx) var(--ly),
        rgba(255,255,255,0.55),
        rgba(255,255,255,0.15) 28%,
        rgba(255,255,255,0.0) 60%);
    mix-blend-mode: overlay;
    transition: background 0.2s ease;
  }
  
  .tilt-wrapper::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(115deg,
        rgba(255,255,255,0.15),
        rgba(255,255,255,0) 30%);
    mix-blend-mode: screen;
    opacity: 0.5;
  }
  
  .tilt-elem:focus {
    outline: 2px solid rgba(255,255,255,0.4);
    outline-offset: 2px;
  }
  
</style>