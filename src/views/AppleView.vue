<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';

  onMounted(() => {
    const main = document.querySelector<HTMLElement>('.main');
    if (main) {
      main.style.height = `${window.innerHeight * 5}px`;
    }
  });

  const preOffsetY = window.scrollY;
  //   window.addEventListener('scroll', () => {
  //     console.log(window.scrollY);
  //   });
  watch(
    () => window.scrollY,
    () => {
      console.log('hi');
    }
  );
  const scrollHandler = () => {
    console.log(window.scrollY);
  };
</script>

<template>
  <div class="column apple" @scroll="scrollHandler">
    <div class="row top-bar items-center" :class="{ 'width-980': $q.screen.width > 980 }">
      <svg class="bar-item q-ml-none" height="44" fill="white" viewBox="0 0 14 44" width="14" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.5615 3.5615 0 0 0 .8469-2.22 1.5353 1.5353 0 0 0 -.031-.32 3.5686 3.5686 0 0 0 -2.3445 1.2084 3.4629 3.4629 0 0 0 -.8779 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0935 3.0935 0 0 0 2.1586-1.1368z"
        ></path>
      </svg>
      <div class="bar-item">스토어</div>
      <div class="bar-item">Mac</div>
      <div class="bar-item">iPad</div>
      <div class="bar-item">iPhone</div>
      <div class="bar-item">AirPods</div>
      <div class="bar-item">고객지원</div>
      <svg class="bar-item" xmlns="http://www.w3.org/2000/svg" fill="white" width="15px" height="44px" viewBox="0 0 15 44">
        <path
          d="M14.298,27.202l-3.87-3.87c0.701-0.929,1.122-2.081,1.122-3.332c0-3.06-2.489-5.55-5.55-5.55c-3.06,0-5.55,2.49-5.55,5.55 c0,3.061,2.49,5.55,5.55,5.55c1.251,0,2.403-0.421,3.332-1.122l3.87,3.87c0.151,0.151,0.35,0.228,0.548,0.228 s0.396-0.076,0.548-0.228C14.601,27.995,14.601,27.505,14.298,27.202z M1.55,20c0-2.454,1.997-4.45,4.45-4.45 c2.454,0,4.45,1.997,4.45,4.45S8.454,24.45,6,24.45C3.546,24.45,1.55,22.454,1.55,20z"
        ></path>
      </svg>
      <svg class="bar-item" fill="white" height="44" viewBox="0 0 14 44" width="14" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z"
        ></path>
      </svg>
    </div>

    <div class="row sticky-bar items-center" :class="{ 'width-980': $q.screen.width > 980 }">
      <div class="name">AirPods Pro(2세대)</div>
      <div class="col"></div>
      <div class="sticky-bar-item">개요</div>
      <div class="sticky-bar-item">제품사양</div>
      <div class="sticky-bar-item">비교하기</div>
      <div class="buy-button">구입하기</div>
    </div>
    <div class="main">
      <div class="section">
        <!-- 0~64 -->
        <q-img
          src="https://www.apple.com/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/large/0000.png"
          class="flex self-center"
          :class="{ 'width-980': $q.screen.width > 980 }"
        ></q-img>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .apple {
    background-color: black;
    color: white;
    font-family: SF Pro KR, SF Pro Text, SF Pro Icons, Apple Gothic, HY Gulim, MalgunGothic, HY Dotum, Lexi Gulim, Helvetica Neue, Helvetica, Arial,
      sans-serif;
  }
  .top-bar {
    height: 44px;
    justify-content: space-between;
  }
  .width-980 {
    width: 980px;
    margin: 0 auto;
  }
  .sticky-bar {
    position: sticky;
    height: 52px;
    border-bottom: solid 1px #ffffff3d;
  }
  .bar-item {
    text-align: center;
    font-size: 12px;
  }
  .sticky-bar-item {
    margin-right: 24px;
    font-size: 11px;
  }
  .name {
    font-size: 20px;
    font-weight: 600;
  }
  .buy-button {
    font-size: 11px;
    border-radius: 100px;
    background-color: #0071e3;
    padding: 4px 11px;
  }
</style>
