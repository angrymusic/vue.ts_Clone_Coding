<script setup lang="ts">
  import { ref } from 'vue';
  const leftDrawerOpen = ref(false);
  const clicked = ref(false);
  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  };
  const clickSearch = (bool: boolean) => {
    clicked.value = bool;
  };
</script>
<template>
  <q-layout class="no-shadow">
    <q-header class="bg-white">
      <q-toolbar class="no-shadow">
        <q-btn dense flat round icon="menu" color="black" @click="toggleLeftDrawer" />

        <q-toolbar-title class="row items-center">
          <q-img src="../assets/youtubelogo.svg" width="90px" />

          <div class="col-auto row">
            <div class="search-bar col-auto row items-center" :class="{ 'border-blue': clicked, 'border-gray': !clicked }">
              <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="button2 translateY" v-if="clicked" style="">
                <g>
                  <path
                    d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"
                    class="style-scope yt-icon"
                  ></path>
                </g>
              </svg>
              <input @focusin="clickSearch(true)" @focusout="clickSearch(false)" class="search-box col" placeholder="검색" />
            </div>

            <div class="search-button row items-center">
              <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="button translateY" style="">
                <g>
                  <path
                    d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"
                    class="style-scope yt-icon"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer :overlay="false" style="position: absolute" class="absolute" show-if-above v-model="leftDrawerOpen" side="left" :width="240">
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
  .border-blue {
    border: solid 1px #1c62b9;
  }
  .border-gray {
    border: 1px solid #ccc;
  }
  .button {
    width: 24px;
    height: 24px;
    margin-right: 15px;
  }
  .button2 {
    width: 24px;
    height: 24px;
    margin-left: 15px;
  }
  .search-button {
    cursor: pointer;
    border-right: solid 1px #ccc;
    border-top: solid 1px #ccc;
    border-bottom: solid 1px #ccc;
    padding-left: 10px;
    height: 40px;
    border-radius: 0px 50px 50px 0;
    background-color: #f8f8f8;
  }
  .search-box {
    background: transparent;
    font-size: 16px;
    margin-left: 12px;
    border: none;
  }
  .search-box:focus {
    outline: none;
  }
  .search-bar {
    margin-left: 40px;
    border-radius: 50px 0 0 50px;
    height: 40px;
  }
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
