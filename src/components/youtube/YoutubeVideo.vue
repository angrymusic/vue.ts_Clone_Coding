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
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <q-img class="img q-mb-sm" :ratio="16 / 9" :src="props.img" alt="" />

    <div class="row">
      <q-avatar class="q-mr-sm" size="36px">
        <img src="/src/assets/heongmin.jpg" alt="" />
      </q-avatar>
      <div class="column">
        <div class="q-mb-xs">{{ props.title }}</div>
        <div class="font-size-12">{{ props.name }}</div>
        <div class="font-size-12">์กฐํ์ {{ props.count }}ํ</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .img {
    border-radius: 10px;
  }
  .profile {
    width: 36px;
    height: 36px;
  }
  .font-size-12 {
    font-size: 12px;
  }
</style>
