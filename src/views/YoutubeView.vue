<script setup lang="ts">
  import { useQuasar } from 'quasar';
  import { ref, watch } from 'vue';
  import YoutubeVideo from '../components/youtube/YoutubeVideo.vue';
  const leftDrawerOpen = ref(false);
  const miniOnOff = ref(true);
  const clicked = ref(false);
  const category = ref('all');
  const categoryAll = ref(true);
  const searchBar = ref(false);
  const darkMode = ref(false);
  const selectCategory = (_category: string) => {
    if (_category == 'all') {
      category.value = _category;
      categoryAll.value = true;
    } else {
      category.value = _category;
      categoryAll.value = false;
    }
  };
  const q = useQuasar();
  watch(darkMode,()=>{
    q.dark.toggle();

  })
  const toggleLeftDrawer = () => {
    if (q.screen.gt.xs) {
      leftDrawerOpen.value = true;
      miniOnOff.value = !miniOnOff.value;
    } else {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
  };
  const clickSearch = (bool: boolean) => {
    clicked.value = bool;
  };
  let exSize = q.screen.width;
  // window.addEventListener('resize', () => {
   
  // });
  watch(()=>q.screen.width,()=>{
    console.log("now width : "+q.screen.width);
    console.log("ex width : " + exSize);
    console.log(q.screen.lt.sm);
    if (q.screen.gt.sm && q.screen.width > exSize) {
      miniOnOff.value = false;
      exSize = q.screen.width;
      console.log('minioff');
    }
    if (q.screen.lt.md && q.screen.width < exSize) {
      miniOnOff.value = true;
      exSize = q.screen.width;
      console.log('minion');
    }
    if (q.screen.lt.sm) {
      closeSearchBar();
    }
  })
  const showSearchBar = () => {
    searchBar.value = true;
  };
  const closeSearchBar = () => {
    searchBar.value = false;
  };

  interface videoType {
    group: string;
    title: string;
    profile: string;
    name: string;
    count: number;
    img: string;
  }
  const videoList: videoType[] = [
    {
      group: 'music',
      title: '오늘의 플레이리스트1',
      profile: '../assets/heongmin.jpg',
      name: '100만 유튜버',
      count: 23,
      img: 'https://picsum.photos/500/300?t=0.28063436307045575',
    },
    {
      group: 'music',
      title: '오늘의 플레이리스트2',
      profile: '../assets/heongmin.jpg',
      name: '100만 유튜버',
      count: 42,
      img: 'https://picsum.photos/500/300?t=0.28063436307045575',
    },
    {
      group: 'music',
      title: '오늘의 플레이리스트3',
      profile: '../assets/heongmin.jpg',
      name: '100만 유튜버',
      count: 241,
      img: 'https://picsum.photos/500/300?t=0.28063436307045575',
    },
    {
      group: 'music',
      title: '오늘의 플레이리스트4',
      profile: '../assets/heongmin.jpg',
      name: '100만 유튜버',
      count: 251,
      img: 'https://picsum.photos/500/300?t=0.28063436307045575',
    },
    {
      group: 'game',
      title: '오늘의 게임1',
      profile: '../assets/heongmin.jpg',
      name: '100만 유튜버',
      count: 5416,
      img: 'https://picsum.photos/500/300?t=0.28063436307045575',
    },
    {
      group: 'game',
      title: '오늘의 게임2',
      profile: '../assets/heongmin.jpg',
      name: '100만 유튜버',
      count: 1354,
      img: 'https://picsum.photos/500/300?t=0.28063436307045575',
    },
    {
      group: 'news',
      title: '오늘의 소식1',
      profile: '../assets/heongmin.jpg',
      name: '100만 유튜버',
      count: 134,
      img: 'https://picsum.photos/500/300?t=0.28063436307045575',
    },
    {
      group: 'news',
      title: '오늘의 소식2',
      profile: '../assets/heongmin.jpg',
      name: '100만 유튜버',
      count: 1234,
      img: 'https://picsum.photos/500/300?t=0.28063436307045575',
    },
  ];
</script>
<template>
  <q-layout class="no-shadow youtube">
    <q-header class="bg-white">
      <q-toolbar v-if="searchBar" class="row" :class="{'darkMode'
      :$q.dark.isActive}">
        <div class="voice-button button flex flex-center" @click="closeSearchBar">
          <div class="icon">
            <svg
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
              class=""
              style=""
            >
              <g mirror-in-rtl="" class="style-scope yt-icon">
                <path d="M21,11v1H5.64l6.72,6.72l-0.71,0.71L3.72,11.5l7.92-7.92l0.71,0.71L5.64,11H21z" class="style-scope yt-icon"></path>
              </g>
            </svg>
          </div>
        </div>

        <div class="col row">
          <div class="search-bar col row items-center" :class="{ 'border-blue': clicked, 'border-gray': !clicked }">
            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="button2 translateY" v-if="clicked" style="">
              <g>
                <path
                  d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"
                  class="style-scope yt-icon"
                ></path>
              </g>
            </svg>
            <input @focusin="clickSearch(true)" @focusout="clickSearch(false)" class="search-box" placeholder="검색" />
          </div>

          <div class="search-button row items-center">
            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="q-mr-md icon translateY" style="">
              <g>
                <path
                  d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"
                  class="style-scope yt-icon"
                ></path>
              </g>
            </svg>
          </div>
        </div>
        <div class="voice-button button row items-center justify-center">
          <div class="icon">
            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="">
              <g class="">
                <path
                  d="M12 3C10.34 3 9 4.37 9 6.07V11.93C9 13.63 10.34 15 12 15C13.66 15 15 13.63 15 11.93V6.07C15 4.37 13.66 3 12 3ZM18.5 12H17.5C17.5 15.03 15.03 17.5 12 17.5C8.97 17.5 6.5 15.03 6.5 12H5.5C5.5 15.24 7.89 17.93 11 18.41V21H13V18.41C16.11 17.93 18.5 15.24 18.5 12Z"
                  class="style-scope yt-icon"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </q-toolbar>
      <q-toolbar v-if="!searchBar" class="" :class="{'dark-mode':$q.dark.isActive}">
        <q-btn :class="{'dark-svg':$q.dark.isActive}" dense flat round icon="menu" color="black" @click="toggleLeftDrawer" />

        <q-toolbar-title class="row items-center">
          <q-img v-if="!$q.dark.isActive" src="../assets/youtubelogo.svg" width="90px" />
          <q-img v-if="$q.dark.isActive" src="../assets/youtubelogowhite.svg" width="90px" />

          <div class="col row justify-end" v-if="$q.screen.width <= 670">
            <div class="voice-button button flex flex-center" @click="showSearchBar">
              <div class="icon">
                <svg viewBox="0 0 24 24" :class="{'dark-svg':$q.dark.isActive}" preserveAspectRatio="xMidYMid meet" focusable="false" class="q-mr-md icon translateY" style="">
                  <g>
                    <path
                      d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"
                      class="style-scope yt-icon"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>

            <div class="voice-button button flex flex-center">
              <div class="icon">
                <svg viewBox="0 0 24 24" :class="{'dark-svg':$q.dark.isActive}" preserveAspectRatio="xMidYMid meet" focusable="false" class="">
                  <g class="">
                    <path
                      d="M12 3C10.34 3 9 4.37 9 6.07V11.93C9 13.63 10.34 15 12 15C13.66 15 15 13.63 15 11.93V6.07C15 4.37 13.66 3 12 3ZM18.5 12H17.5C17.5 15.03 15.03 17.5 12 17.5C8.97 17.5 6.5 15.03 6.5 12H5.5C5.5 15.24 7.89 17.93 11 18.41V21H13V18.41C16.11 17.93 18.5 15.24 18.5 12Z"
                      class="style-scope yt-icon"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div class="col-auto row items-center margin-0-auto" v-if="$q.screen.width > 670">
            <div class="search-bar col-auto row items-center" :class="{ 'border-blue': clicked, 'border-gray': !clicked }">
              <svg viewBox="0 0 24 24" :class="{'dark-svg':$q.dark.isActive}" preserveAspectRatio="xMidYMid meet" focusable="false" class="button2 translateY" v-if="clicked" style="">
                <g>
                  <path
                    d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"
                    class="style-scope yt-icon"
                  ></path>
                </g>
              </svg>
              <input @focusin="clickSearch(true)" @focusout="clickSearch(false)" class="search-box" placeholder="검색" />
            </div>

            <div class="search-button row items-center" :class="{'dark-bg':$q.dark.isActive}">
              <svg viewBox="0 0 24 24" :class="{'dark-svg':$q.dark.isActive}" preserveAspectRatio="xMidYMid meet" focusable="false" class="q-mr-md icon translateY" style="">
                <g>
                  <path
                    d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"
                    class="style-scope yt-icon"
                  ></path>
                </g>
              </svg>
            </div>

            <div class="voice-button button row items-center justify-center">
              <div class="icon">
                <svg viewBox="0 0 24 24" :class="{'dark-svg':$q.dark.isActive}" preserveAspectRatio="xMidYMid meet" focusable="false" class="">
                  <g class="">
                    <path
                      d="M12 3C10.34 3 9 4.37 9 6.07V11.93C9 13.63 10.34 15 12 15C13.66 15 15 13.63 15 11.93V6.07C15 4.37 13.66 3 12 3ZM18.5 12H17.5C17.5 15.03 15.03 17.5 12 17.5C8.97 17.5 6.5 15.03 6.5 12H5.5C5.5 15.24 7.89 17.93 11 18.41V21H13V18.41C16.11 17.93 18.5 15.24 18.5 12Z"
                      class="style-scope yt-icon"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <div class="voice-button button flex flex-center">
            <div class="icon">
              <svg viewBox="0 0 24 24" :class="{'dark-svg':$q.dark.isActive}" preserveAspectRatio="xMidYMid meet" focusable="false" style="">
                <g class="style-scope yt-icon">
                  <path
                    d="M12,16.5c0.83,0,1.5,0.67,1.5,1.5s-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5S11.17,16.5,12,16.5z M10.5,12 c0,0.83,0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5s-0.67-1.5-1.5-1.5S10.5,11.17,10.5,12z M10.5,6c0,0.83,0.67,1.5,1.5,1.5 s1.5-0.67,1.5-1.5S12.83,4.5,12,4.5S10.5,5.17,10.5,6z"
                    class="style-scope yt-icon"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
          <div class="login-button row items-center border-gray">
            <svg :class="{'dark-svg':$q.dark.isActive}" viewBox="0 0 24 24" fill="rgb(6,95,212)" preserveAspectRatio="xMidYMid meet" focusable="false" class="icon" style="">
              <g class="style-scope yt-icon">
                <path
                  d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,3c4.96,0,9,4.04,9,9 c0,1.42-0.34,2.76-0.93,3.96c-1.53-1.72-3.98-2.89-7.38-3.03C14.57,12.6,16,10.97,16,9c0-2.21-1.79-4-4-4C9.79,5,8,6.79,8,9 c0,1.97,1.43,3.6,3.31,3.93c-3.4,0.14-5.85,1.31-7.38,3.03C3.34,14.76,3,13.42,3,12C3,7.04,7.04,3,12,3z M9,9c0-1.65,1.35-3,3-3 s3,1.35,3,3c0,1.65-1.35,3-3,3S9,10.65,9,9z M12,21c-3.16,0-5.94-1.64-7.55-4.12C6.01,14.93,8.61,13.9,12,13.9 c3.39,0,5.99,1.03,7.55,2.98C17.94,19.36,15.16,21,12,21z"
                  class="style-scope yt-icon"
                ></path>
              </g>
            </svg>
            로그인
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer :breakpoint="$q.screen.sizes.sm" :overlay="false" class="absolute" show-if-above v-model="leftDrawerOpen" side="left" :width="240" :mini="miniOnOff">
      <div v-if="$q.screen.lt.sm" class="height-50 row items-center">
        <q-btn :class="{'dark-svg':$q.dark.isActive}" flat round icon="menu" class="q-mr-md q-ml-sm" color="black" @click="toggleLeftDrawer" />
        <q-img v-if="!$q.dark.isActive" src="../assets/youtubelogo.svg" width="90px" />
        <q-img v-if="$q.dark.isActive" src="../assets/youtubelogowhite.svg" width="90px" />
      </div>

      <q-list>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <img class="icon self-center" v-if="!$q.dark.isActive" src="../assets/youtubehome.svg" />
            <img class="icon self-center" v-if="$q.dark.isActive" src="../assets/youtubehomewhite.svg" />
            <div class="mini-caption q-mini-drawer-only">홈</div>
          </q-item-section>

          <q-item-section>홈</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <img class="icon self-center" v-if="!$q.dark.isActive" src="../assets/youtubeshorts.svg" />
            <img class="icon self-center" v-if="$q.dark.isActive" src="../assets/youtubeshortswhite.svg" />
            <div class="mini-caption q-mini-drawer-only">shorts</div>
          </q-item-section>

          <q-item-section>Shorts</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <img class="icon self-center" v-if="!$q.dark.isActive" src="../assets/youtubesubscribe.svg" />
            <img class="icon self-center" v-if="$q.dark.isActive" src="../assets/youtubesubscribewhite.svg" />
            <div class="mini-caption q-mini-drawer-only">구독</div>
          </q-item-section>

          <q-item-section>구독</q-item-section>
        </q-item>

        <q-separator v-if="!miniOnOff" />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <img class="icon self-center" v-if="!$q.dark.isActive" src="../assets/youtubedesk.svg" />
            <img class="icon self-center" v-if="$q.dark.isActive" src="../assets/youtubedeskwhite.svg" />
            <div class="mini-caption q-mini-drawer-only">보관함</div>
          </q-item-section>

          <q-item-section>보관함</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <img class="icon self-center" v-if="!$q.dark.isActive" src="../assets/youtubehistory.svg" />
            <img class="icon self-center" v-if="$q.dark.isActive" src="../assets/youtubehistorywhite.svg" />
            <div class="mini-caption q-mini-drawer-only">시청 기록</div>
          </q-item-section>
          <q-item-section>시청 기록</q-item-section>
        </q-item>

        <q-separator v-if="!miniOnOff" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="q-ml-lg q-mt-md">
        <div class="categories row">
          <div class="category" :class="{'dark-bg':$q.dark.isActive, 'selected-category':category=='all', 'dark-selected-category':category=='all'&&$q.dark.isActive}"  @click="selectCategory('all')">전체</div>
          <div class="category" :class="{'dark-bg':$q.dark.isActive, 'selected-category':category=='music', 'dark-selected-category':category=='music'&&$q.dark.isActive}" @click="selectCategory('music')">음악</div>
          <div class="category" :class="{'dark-bg':$q.dark.isActive, 'selected-category':category=='game', 'dark-selected-category':category=='game'&&$q.dark.isActive}" @click="selectCategory('game')">게임</div>
          <div class="category" :class="{'dark-bg':$q.dark.isActive, 'selected-category':category=='news', 'dark-selected-category':category=='news'&&$q.dark.isActive}" @click="selectCategory('news')">뉴스</div>
          <div class="col self-end"><q-toggle v-model="darkMode" label="다크 모드"/></div>
        </div>
        <div class="row q-mt-xs" :class="{ 'q-col-gutter-xs': $q.screen.lt.md, 'q-col-gutter-md': $q.screen.gt.sm }">
          <YoutubeVideo
            class="col-auto"
            v-for="(item, index) in videoList.filter((e) => {
              if (categoryAll) {
                return true;
              } else {
                return e.group == category;
              }
            })"
            :key="index"
            :img="item.img"
            :title="item.title"
            :name="item.name"
            :profile="item.profile"
            :count="item.count"
          ></YoutubeVideo>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>
<style lang="scss">
  .q-drawer-container {
    .fixed {
      position: absolute !important;
    }
    .fullscreen {
      position: absolute !important;
    }
  }
</style>
<style scoped>
.dark-border{
  border-color: #ffffff14 !important;
}
.dark-bg{
  background-color: #303030 !important;
}
.dark-svg{
  color: white !important;
  fill: white !important;
}
.dark-mode{
  background-color: black !important;
}
  .youtube {
    font-family: 'Roboto', 'Arial', sans-serif;
  }
  .mini-caption {
    font-size: 10px;
    margin: 0 auto;
  }
  .category {
    cursor: pointer;
    border-radius: 7px;
    background-color: rgba(0, 0, 0, 0.05);
    padding: 0 12px;
    margin: 5px;
    height: 32px;
    display: flex;
    align-items: center;
  }
  .category:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .selected-category {
    background-color: black;
    color: white;
  }
  .selected-category:hover {
    background-color: black !important;
  }
  .dark-selected-category {
    background-color: white !important;
    color: black;
  }
  .dark-selected-category:hover {
    background-color: white !important;
    color:black;
  }
  .login-button {
    padding: 0 10px;
    font-size: 14px;
    height: 34px;
    border-radius: 50px;
    color: #1c62b9;
  }
  .login-button:hover {
    background-color: #b0daff;
  }
  .margin-0-auto {
    margin: 0 auto;
  }
  .border-blue {
    border: solid 1px #1c62b9;
  }
  .border-gray {
    border: 1px solid #ccc;
  }
  .voice-button {
    border-radius: 100%;
  }
  .voice-button:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .icon {
    width: 24px;
    height: 24px;
  }
  .button {
    width: 40px;
    height: 40px;
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
    width: 30vw;
  }
  .search-box:focus {
    outline: none;
  }
  .search-bar {
    border-radius: 50px 0 0 50px;
    height: 40px;
  }
  .absolute {
    position: absolute;
  }
  q-item-section {
    font-size: 16px;
  }
  .height-50 {
    height: 50px;
  }
  .width-1023-hide {
    display: flex;
  }
  @media (min-width: 1023px) {
    .width-1023-hide {
      display: none;
    }
  }
</style>
