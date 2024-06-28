<script setup></script>

<template>
  <div
    class="bgGradient backdrop-contrast-200 text-white min-h-[100vh] scroll-smooth"
  >
    <header
      class="sticky top-0 z-10 h-[100px] flex justify-between items-center gap-2 px-10 text-white border-white border-b-2 border-opacity-5 backdrop-blur-sm backdrop-filter"
    >
      <NuxtLink to="/">
        <h1 class="text-center text-4xl font-black tracking-widest uppercase">
          Nice
          <br />
          Resume
        </h1>
      </NuxtLink>
    </header>
    <slot />
  </div>
</template>
