<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  const props = defineProps({
    group: String,
    title: String,
    profile: String,
    name: String,
    count: Number,
    img: String,
  });
</script>
<template>
  <div class="column">
    <div class="col-auto img q-mb-sm">
      <q-img :ratio="16 / 9" :src="props.img" alt="" />
    </div>
    <div class="row">
      <q-avatar class="q-mr-sm" size="36px">
        <img src="/src/assets/heongmin.jpg" alt="" />
      </q-avatar>
      <div class="column">
        <div class="q-mb-xs">{{ props.title }}</div>
        <div class="font-size-12">{{ props.name }}</div>
        <div class="font-size-12">조회수 {{ props.count }}회</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .img {
    border-radius: 10px;
    width: 25vw;
    min-width: 250px;
    overflow: hidden;
  }
  .profile {
    width: 36px;
    height: 36px;
  }
  .font-size-12 {
    font-size: 12px;
  }
</style>
