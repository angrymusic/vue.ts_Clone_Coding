<script setup lang="ts">
  import { ref } from 'vue';
  const hoverProfile = ref(false);
  const mouseProfile = (bool: boolean) => {
    hoverProfile.value = bool;
  };
</script>

<template>
  <div id="bg">
    <div id="header" class="row" :class="{ 'q-py-sm': !$q.screen.lt.md }">
      <div id="header-left" class="col-xs-12 col-sm-12 col-md-3 row" :class="{ 'q-pt-xs': $q.screen.lt.md }">
        <div class="col-12 row justify-center" v-if="!$q.screen.lt.md">
          <img src="../assets/testlogo.jpg" height="70" alt="" />
        </div>
        <div class="col-12 today row self-end justify-center">2023년 02월 22일 수요일</div>
      </div>

      <div
        id="header-center"
        class="col-xs-12 col-sm-12 col-md-grow flex flex-center"
        :class="{ 'no-border': $q.screen.lt.md, 'font-size-40': $q.screen.lt.md }"
      >
        민재일보
      </div>

      <div
        id="header-right"
        class="col-xs-12 col-sm-12 col-md-3 row self-center justify-end q-px-md"
        :class="{ 'q-pa-sm': !$q.screen.lt.md, 'justify-center': !$q.screen.lt.md }"
      >
        <div class="col-auto q-mr-sm row items-center font-bold" :class="{ 'col-12 ': !$q.screen.lt.md }">
          <img class="icon q-mr-xs" src="../assets/github.svg" /><a target="_blank" href="https://github.com/angrymusic">GitHub</a>
        </div>
        <div class="col-auto q-mr-sm row items-center font-bold" :class="{ 'col-12 ': !$q.screen.lt.md }">
          <img class="icon q-mr-xs" src="../assets/notion.svg" /><a target="_blank" href="https://angrymusic.notion.site/">Notion</a>
        </div>
        <div class="col-auto q-mr-sm row items-center" :class="{ 'col-12 ': !$q.screen.lt.md }">📧 angrymusic@naver.com</div>
        <div class="col-12 q-mr-sm row items-center font-size-13" v-if="!$q.screen.lt.md">💎 어제보다 더 채워져가는 중입니다.</div>
      </div>
    </div>
    <div id="body" class="row">
      <div id="body-left" v-if="!$q.screen.lt.md" class="col-2 q-mt-md row">
        <div @mouseover="mouseProfile(true)" @mouseout="mouseProfile(false)" class="col-12 row justify-center">
          <div class="col-12 q-pa-sm">
            <q-img width="100%" ratio="1" src="/src/assets/heongmin.jpg" alt="" class="">
              <div v-show="hoverProfile" class="absolute-full row items-center font-size-12">
                <div class="">👨‍💻 이민재</div>
                <div class="col-12">👶 99.05.12</div>
                <div class="col-12">😍 노래, 풋살, 고기</div>
                <div>😫 미세먼지</div>
              </div>
            </q-img>
          </div>
        </div>

        <div class="col-12 q-mt-sm"></div>
      </div>

      <div id="body-center" class="col-xs-12 col-sm-12 col-md-8 q-pt-lg q-px-md">
        <div class="font-bold headline">안녕하세요. 😁<br />프론트엔드 개발자 이민재입니다.</div>
        <div class="font-bold subtitle">제가 이 길을 선택한 이유는요...</div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam tempore perspiciatis fugit suscipit explicabo omnis debitis odio eligendi!
          Nostrum, repudiandae!
        </p>
      </div>

      <div id="body-right" v-if="!$q.screen.lt.md" class="col-2 q-mt-md"></div>
    </div>
    <div id="footer" class="flex flex-center q-mt-md">projects</div>
  </div>
</template>

<style scoped lang="scss">
  @font-face {
    font-family: 'ChosunLo';
    src: url(../font/ChosunLo.TTF);
  }
  @font-face {
    font-family: 'Chosun-light';
    src: url(../font/ChosunSg.TTF);
  }
  @font-face {
    font-family: 'Chosun-bold';
    src: url(../font/ChosunBg.TTF);
  }
  a {
    text-decoration: none;
    color: black;
  }

  .font-bold {
    font-family: 'Chosun-bold', serif;
  }
  .headline {
    font-size: 36px;
  }
  .font-size-40 {
    font-size: 40px !important;
  }
  .subtitle {
    font-size: 18px !important;
  }
  .font-size-12 {
    font-size: 12px !important;
  }
  .font-size-13 {
    font-size: 13px !important;
  }
  .icon {
    width: 14px;
    height: 14px;
  }
  #bg {
    background-color: #e2e0d7;
    width: 100%;
    min-height: 100vh;
    padding: 10px 50px;
    font-family: 'Chosun-light', serif;
    font-size: 14px;
  }
  #header {
    border-bottom: double 3px;
  }
  #header-center {
    font-family: 'ChosunLo', serif;
    font-size: 60px;
    border-left: solid 1px;
    border-right: solid 1px;
  }
  #header-left {
  }
  #header-right {
  }
  #body-left {
    border-right: solid 1px;
  }
  #body-right {
    border-left: solid 1px;
  }
  #footer {
    border: 1px solid black;
  }
</style>
