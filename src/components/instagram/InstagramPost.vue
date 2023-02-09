<script setup lang="ts">
  import { ref } from 'vue'
  const overPost = ref(false)
  const mouseoverEvent = () => {
    overPost.value = true
  }
  const mouseoutEvent = () => {
    overPost.value = false
  }
</script>
<template>
  <div @mouseover="mouseoverEvent()" @mouseout="mouseoutEvent()" class="container row items-center justify-center">
    <div v-show="overPost" class="blur-screen"></div>
    <div v-show="overPost" class="post-info"><div class="col">❤ 352</div></div>
    <img src="../../images/cat.png" />
  </div>
</template>
<style scoped>
  .container {
    position: relative;
  }
  img {
    width: 100%;
  }
  .blur-screen {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.7;
  }
  .post-info {
    position: absolute;
    color: white;
  }
</style>
