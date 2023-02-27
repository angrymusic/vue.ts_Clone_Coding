<script setup lang="ts">
  const props = defineProps({
    index: Number,
    title: String,
    language: String,
    context: String,
    img: String,
  });
  console.log('homeproject')
</script>
<template>
  <q-carousel-slide :name="props.index">
    <div class="row">
      <q-img class="col-5" :src="props.img"></q-img>
      <div class="col row">
        <div class="col-12">{{ props.title }}</div>
        <div class="col-12">{{ props.language }}</div>
        <div class="col-12">{{ props.context }}</div>
      </div>
    </div>
  </q-carousel-slide>
</template>
