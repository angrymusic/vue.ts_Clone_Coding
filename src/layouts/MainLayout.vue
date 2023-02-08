<script setup lang="ts">
  import { ref } from 'vue'
  const leftDrawerOpen = ref(false)
  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }
</script>

<template>
  <q-layout view="hHh LpR fff">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <q-list bordered separator>
        <q-item clickable v-ripple to="/">
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/instagram">
          <q-item-section>Instagram</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/">
          <q-item-section>Youtube</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/">
          <q-item-section>Apple</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
