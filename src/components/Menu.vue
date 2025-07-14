<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'

const isOpen = ref(false)
const swingImg = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const blocks = ref<Block[]>([])
const gravity = 0.5
const friction = 0.98
const bounce = 0.3

const blockSize = 40

type Block = {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  img: HTMLImageElement | null
  link: string
}

const instagramImg = new Image()
instagramImg.src = '/src/assets/img/instagram.jpg'

const twitterImg = new Image()
twitterImg.src = '/src/assets/img/x.webp'

function startSwing() {
  const el = swingImg.value
  if (!el) return

  el.classList.remove('animate-swing')
  void el.offsetWidth
  el.classList.add('animate-swing')

  addBlock()
}

function addBlock() {
  const canvas = canvasRef.value
  if (!canvas) return

  const cores = ['#8e44ad', '#3498db', '#e67e22', '#2ecc71']
  const color = cores[Math.floor(Math.random() * cores.length)]

  const x = canvas.width - blockSize - 10
  const y = -blockSize
  const vx = -Math.random() * 2
  const vy = 0

  // Decide aleatoriamente qual bloco criar: Instagram ou Twitter
  const isInstagram = Math.random() < 0.5

  let img: HTMLImageElement | null = null
  let link = ''

  if (isInstagram) {
    img = new Image()
    img.src = instagramImg.src
    link = 'https://www.instagram.com/_caudas_/'
  } else {
    img = new Image()
    img.src = twitterImg.src
    link = 'https://x.com/Sr_Caudas'
  }

  blocks.value.push({ x, y, vx, vy, color, img, link })
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
  ctx.fill()
}

function resolveCollision(a: Block, b: Block) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  if (distance < blockSize) {
    const overlap = blockSize - distance
    const angle = Math.atan2(dy, dx)

    const moveX = Math.cos(angle) * overlap / 2
    const moveY = Math.sin(angle) * overlap / 2

    a.x -= moveX
    a.y -= moveY
    b.x += moveX
    b.y += moveY

    const nx = dx / distance
    const ny = dy / distance

    const aNormal = a.vx * nx + a.vy * ny
    const bNormal = b.vx * nx + b.vy * ny

    const aTangent = a.vx - aNormal * nx
    const bTangent = b.vx - bNormal * nx

    const aTangentY = a.vy - aNormal * ny
    const bTangentY = b.vy - bNormal * ny

    const aNormalAfter = bNormal * bounce
    const bNormalAfter = aNormal * bounce

    a.vx = aTangent + aNormalAfter * nx
    a.vy = aTangentY + aNormalAfter * ny

    b.vx = bTangent + bNormalAfter * nx
    b.vy = bTangentY + bNormalAfter * ny
  }
}

function animate() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (const block of blocks.value) {
    block.vy += gravity
    block.x += block.vx
    block.y += block.vy

    if (block.y + blockSize > canvas.height) {
      block.y = canvas.height - blockSize
      block.vy *= -bounce
    }

    if (block.x < 0) {
      block.x = 0
      block.vx *= -bounce
    } else if (block.x + blockSize > canvas.width) {
      block.x = canvas.width - blockSize
      block.vx *= -bounce
    }

    for (const other of blocks.value) {
      if (other === block) continue
      resolveCollision(block, other)
    }

    block.vx *= friction
    block.vy *= friction

    if (block.img && block.img.complete) {
      ctx.drawImage(block.img, Math.round(block.x), Math.round(block.y), blockSize, blockSize)
    } else {
      ctx.fillStyle = block.color
      roundRect(ctx, Math.round(block.x), Math.round(block.y), blockSize, blockSize, 10)
    }
  }

  requestAnimationFrame(animate)
}

function onCanvasClick(event: MouseEvent) {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const clickY = event.clientY - rect.top

  for (const block of blocks.value) {
    if (
      clickX >= block.x &&
      clickX <= block.x + blockSize &&
      clickY >= block.y &&
      clickY <= block.y + blockSize
    ) {
      if (block.link) {
        window.open(block.link, '_blank')
        break
      }
    }
  }
}

watch(isOpen, async (novoValor) => {
  if (novoValor) {
    await nextTick()
    animate()
  }
})

onMounted(() => {
  if (isOpen.value) animate()
})
</script>



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

  <transition name="slide">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-[9999]"
    >
      <canvas
        ref="canvasRef"
        class="absolute inset-0 w-full h-full z-0"
        @click="onCanvasClick"
      />

      <div
        class="absolute top-[-30px] right-[-90px]"
        ref="swingImg"
        @mousedown="startSwing"
        @touchstart="startSwing"
      >
        <img
          src="../assets/img/CaudasIdentidade.png"
          alt=""
          class="h-[300px] swing-anchor"
        />
      </div>

      <ul class="text-6xl space-y-6 font-gravitas text-center z-10">
        <li><a href="#" @click="isOpen = false">Início</a></li>
        <li><a href="#" @click="isOpen = false">Sobre mim</a></li>
        <li><a href="#" @click="isOpen = false">Galeria</a></li>
        <li><a href="#" @click="isOpen = false">Sair</a></li>
      </ul>
    </div>
  </transition>
</template>

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
