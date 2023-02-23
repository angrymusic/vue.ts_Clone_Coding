<script setup lang="ts">
  import { ref } from 'vue';
  const leftDrawerOpen = ref(false);
  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  };
</script>

<template>
  <q-layout view="hHh LpR fff" class="no-shadow">
    <q-header elevated class="text-white my-bg-color-0 z-index-999">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Vue로 클론코딩하기
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" :width="240" :breakpoint="$q.screen.sizes.lg">
      <!-- drawer content -->
      <q-list bordered separator>
        <q-item clickable v-ripple to="/">
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/instagram">
          <q-item-section>Instagram</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/youtube">
          <q-item-section>Youtube</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/apple">
          <q-item-section>Apple</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="z-index-999">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
  @use 'sass:color';
  @for $i from 1 through 10 {
    .my-bg-color-#{$i} {
      background-color: color.scale($mygrey, $lightness: $i * -5%);
    }
  }
  .z-index-999 {
    position: relative;
    padding-top: 0px !important;
    z-index: 1;
  }
  .z-index-9 {
    position: relative;
    z-index: 1;
  }
</style>
