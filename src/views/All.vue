<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Show from '../components/Show.vue';
import Show2 from '../components/Show2.vue';
import Show3 from '../components/Show3.vue';
import Service from '../components/Service.vue';
import Contact from '../components/Contact.vue';

const homeRef = ref<HTMLElement | null>(null);

onMounted(() => {
  nextTick(() => {
    if (homeRef.value) {
      homeRef.value.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
</script>

<template>
  <div>
    <div ref="homeRef">
      <Home />
    </div>
    <Show3 />
    <About />
    <Show />
    <Service />
    <Show2 />
    <Contact />
  </div>
</template>
