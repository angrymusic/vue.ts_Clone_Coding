<script setup lang="ts">
  import { ref } from 'vue';
  const leftDrawerOpen = ref(false);
  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  };
</script>
<template>
  <q-layout class="no-shadow">
    <q-header class="bg-white">
      <q-toolbar class="no-shadow">
        <q-btn dense flat round icon="menu" color="black" @click="toggleLeftDrawer" />

        <q-toolbar-title class="row items-center">
          <q-img src="../assets/youtubelogo.svg" width="90px" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer class="absolute" show-if-above v-model="leftDrawerOpen" side="left" :width="240">
      <div class="width-1023-hide height-50 row items-center">
        <q-btn flat round icon="menu" class="q-mr-md q-ml-sm" color="black" @click="toggleLeftDrawer" />
        <q-img src="../assets/youtubelogo.svg" width="90px" />
      </div>

      <q-list>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <img class="icon" src="../assets/youtubehome.svg" />
          </q-item-section>

          <q-item-section>홈</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <img class="icon" src="../assets/youtubeshorts.svg" />
          </q-item-section>

          <q-item-section>Shorts</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <img class="icon" src="../assets/youtubesubscribe.svg" />
          </q-item-section>

          <q-item-section>구독</q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <img class="icon" src="../assets/youtubedesk.svg" />
          </q-item-section>
          <q-item-section>보관함</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <img class="icon" src="../assets/youtubehistory.svg" />
          </q-item-section>
          <q-item-section>시청 기록</q-item-section>
        </q-item>

        <q-separator />
      </q-list>
    </q-drawer>
  </q-layout>
</template>

<style>
  .absolute {
    position: absolute;
  }
  q-item-section {
    font-size: 16px;
  }
  .icon {
    width: 24px;
    height: 24px;
  }
  .height-50 {
    height: 50px;
  }
  .width-1023-hide {
    display: flex;
  }
  @media (min-width: 1263px) {
    .width-1023-hide {
      display: none;
    }
  }
</style>
