<script setup lang="ts">
  import { ref, onMounted, onUpdated } from 'vue';
  import axios from 'axios';
  import Post from '../components/instagram/InstagramPost.vue';
  const tab = ref('posts');
  const file = ref();
  const title = ref('');
  const context = ref('');
  const searchBar = ref(false);
  const clickSearch = () => {
    searchBar.value = !searchBar.value;
  };
  interface dataType {
    title: string;
    context: string;
    img: string;
  }

  //useQuasar

  //임시 로그인 아이디
  const name = ref('angrymusic3');

  const imgList = ref<dataType[]>([]);

  const upload = async () => {
    const data = new FormData();
    data.append('name', name.value);
    data.append('title', title.value);
    data.append('context', context.value);
    data.append('file', file.value);
    await axios
      .post('http://localhost:8090/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    tab.value = 'posts';
  };
  onUpdated(() => {
    getPost();
  });
  const deletePost = async (img: string) => {
    await axios.delete('http://localhost:8090/delete', { data: { img: img } }).then((res) => {
      console.log(res);
    });
    getPost();
  };

  const getPost = async () => {
    // imgList.value = []
    await axios
      .post('http://localhost:8090/', { name: name.value })
      .then((res) => {
        // for (let i = 0; i < res.data.length; i++) {
        //   imgList.value.push(res.data[i])
        // }
        imgList.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onMounted(() => {
    getPost();
  });
</script>
<template>
  <div class="instagram color-fafafa">
    <div class="bar row">
      <div class="logo col-4 row items-center">
        <svg aria-label="Instagram" color="#262626" fill="#262626" height="29" role="img" viewBox="32 4 113 32" width="103">
          <path
            clip-rule="evenodd"
            d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z"
            fill="currentColor"
            fill-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div class="search-bar col-4 row items-center">
        <div v-show="!searchBar" @click="clickSearch" class="before-click col row items-center justify-start">
          <div class="search-icon col-2">
            <svg aria-label="검색" class="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16">
              <path
                d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="16.511"
                x2="22"
                y1="16.511"
                y2="22"
              ></line>
            </svg>
          </div>
        </div>
        <input @focusin="clickSearch" @focusout="clickSearch" class="input-search col-10" placeholder="검색" />
        <div v-show="searchBar" class="after-click col row items-center justify-between">
          <div class="exit-search col row justify-end" @click="clickSearch">⨉</div>
        </div>
      </div>
      <div class="login-buttons row col q-gutter-sm justify-end">
        <div class="login-button row items-center">로그인</div>
        <div class="signup-button row items-center">가입하기</div>
      </div>
    </div>

    <div class="q-pa-lg color-fafafa padding-side-auto separator row">
      <div class="desktop-flex col-12 row margin-bottom-40 justify-center">
        <div class="col-4 row justify-end">
          <q-avatar class="profile-img">
            <q-img src="/src/assets/heongmin.jpg" />
          </q-avatar>
        </div>
        <div class="col-8 column">
          <div class="top-desc col row q-gutter-sm margin-bottom-20">
            <div class="justify-start col-12 col-sm-auto name row">hm_son7 ✔</div>
            <div class="col-12 col-sm-9 row justify-start">
              <div class="button flex flex-center">팔로우</div>
              <div class="button flex flex-center">메세지 보내기</div>
            </div>
          </div>
          <div class="middle-desc desktop-flex col row q-col-gutter-lg margin-bottom-20">
            <div class="count-write more-info">게시물 <strong>189</strong></div>
            <div class="count-follower more-info">팔로워 <strong>1143만</strong></div>
            <div class="count-follow more-info">팔로우 <strong>209</strong></div>
          </div>
          <div class="desktop bottom-desc col">
            <strong>Son HeungMin(손흥민)🇰🇷</strong><br />@spursofficial ⚽️🇰🇷🇬🇧 @adidasfootball <br /><a
              class="powerlink"
              href="https://www.facebook.com/HeungMinSonOfficial"
              >www.facebook.com/HeungMinSonOfficial</a
            >
          </div>
        </div>
      </div>

      <!-- 모바일 화면 -->
      <div class="mobile" style="width: 100%">
        <div class="flex q-ml-md q-mt-md">
          <q-avatar class="profile-img">
            <q-img src="/src/assets/heongmin.jpg" />
          </q-avatar>
          <div class="column q-pl-lg">
            <div class="justify-start name q-mb-sm">hm_son7 ✔</div>
            <div class="row">
              <div class="button flex flex-center">팔로우</div>
              <div class="button flex flex-center">메세지 보내기</div>
            </div>
          </div>
        </div>

        <div class="mobile q-ml-md q-mt-md q-mb-md bottom-desc">
          <strong>Son HeungMin(손흥민)🇰🇷</strong><br />@spursofficial ⚽️🇰🇷🇬🇧 @adidasfootball <br /><a
            class="powerlink"
            href="https://www.facebook.com/HeungMinSonOfficial"
            >www.facebook.com/HeungMinSonOfficial</a
          >
        </div>
        <div class="mobile-flex separator row justify-around q-pt-sm q-pb-sm">
          <div class="col column count-write more-info flex flex-center">
            <div>게시물</div>
            <div><strong>189</strong></div>
          </div>
          <div class="col column count-write more-info flex flex-center">
            <div>팔로워</div>
            <div><strong>1145만</strong></div>
          </div>
          <div class="col column count-write more-info flex flex-center">
            <div>팔로우</div>
            <div><strong>209</strong></div>
          </div>
        </div>
        <q-tabs switch-indicator v-model="tab" class="separator tabs color-fafafa text-black">
          <q-tab class="col-1" name="posts" label="">
            <svg
              aria-label="게시물"
              :class="{ selected: tab == 'posts' ? true : false }"
              color="#8e8e8e"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <rect
                fill="none"
                height="18"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                width="18"
                x="3"
                y="3"
              ></rect>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="9.015"
                x2="9.015"
                y1="3"
                y2="21"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="14.985"
                x2="14.985"
                y1="3"
                y2="21"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="21"
                x2="3"
                y1="9.015"
                y2="9.015"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="21"
                x2="3"
                y1="14.985"
                y2="14.985"
              ></line></svg
          ></q-tab>
          <q-tab class="col-1" name="reels" label=""
            ><svg
              aria-label="릴스"
              :class="{ selected: tab == 'reels' ? true : false }"
              color="#8e8e8e"
              fill="#8e8e8e"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="13.504"
                x2="16.362"
                y1="2.001"
                y2="7.002"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="7.207"
                x2="10.002"
                y1="2.11"
                y2="7.002"
              ></line>
              <path
                d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
              <path
                d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"
                fill-rule="evenodd"
              ></path></svg
          ></q-tab>

          <q-tab class="col-1" name="write" label="">
            <svg
              aria-label="글작성"
              :class="{ selected: tab == 'write' ? true : false }"
              color="#8e8e8e"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
              <path
                d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
              <circle
                cx="12.072"
                cy="11.075"
                fill="none"
                r="3.556"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></circle></svg
          ></q-tab>
        </q-tabs>
      </div>
      <!-- ------------ -->

      <div class="col-12 separator">
        <q-tabs switch-indicator v-model="tab" class="desktop-flex tabs color-fafafa text-black row justify-center" narrow-indicator>
          <q-tab class="col-1" name="posts" label="게시글" />
          <q-tab class="col-1" name="reels" label="릴스" />
          <q-tab class="col-1" name="write" label="글작성" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="color-fafafa text-center">
          <q-tab-panel name="posts" class="row q-col-gutter-md">
            <Post
              v-for="(item, index) in imgList"
              :key="index"
              :title="item.title"
              :context="item.context"
              :img="item.img"
              @deletePost="deletePost"
              class="col-4"
            ></Post>
          </q-tab-panel>

          <q-tab-panel name="reels" class="">
            <div class="text-h6">reels</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="write" class="">
            <div class="text-h6">게시글 작성</div>
            <div class="col column justify-center">
              <div class="col row justify-center">
                <q-input
                  class="col-5"
                  model-value=""
                  @update:model-value="
                (val:any) => {
                  file = val[0]
                }
              "
                  filled
                  type="file"
                />
              </div>
              <div class="col row justify-center">
                <q-input filled v-model="title" class="col-5" placeholder="title" dense />
              </div>
              <div class="col row justify-center">
                <q-input v-model="context" class="col-5" placeholder="context" filled type="textarea" />
              </div>
              <div class="col row justify-center">
                <div class="login-button" @click="upload">게시하기</div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .selected {
    fill: #0095f6;
    color: #0095f6;
  }
  .profile-img {
    margin-top: 20px;
    margin-right: 100px;
    width: 150px;
    height: 150px;
  }
  .desktop-flex {
    display: flex;
  }
  .mobile-flex {
    display: none;
  }
  .mobile {
    display: none;
  }
  .desktop {
    display: block;
  }
  .tabs {
    display: flex;
    justify-content: center;
  }
  .input-search {
    border: none;
    background: transparent;
  }
  .input-search:focus {
    outline: none;
  }
  .exit-search {
    cursor: pointer;
  }
  .search-icon {
    transform: translateY(2px);
  }
  .search-bar {
    padding: 0 16px;
    border-radius: 10px;
    background-color: #efefef;
    position: relative;
  }
  .instagram {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
  .powerlink {
    font-weight: 500;
    text-decoration-line: none;
    color: #053f8b;
  }
  .powerlink:hover {
    text-decoration-line: underline;
  }
  .name {
    font-size: 20px;
  }
  .bar {
    margin: 10px 20px;
  }
  .separator {
    border-top: rgb(219, 219, 219) solid 1px;
  }
  .margin-bottom-20 {
    margin-bottom: 20px;
  }
  .margin-bottom-40 {
    margin-bottom: 40px;
  }
  .padding-side-auto {
    padding: 20px 12vw;
  }
  .button {
    font-size: 14px;
    height: 32px;
    font-weight: bold;
    margin-right: 10px;
    padding: 6px 16px;
    background-color: #efefef;
    border-radius: 10px;
    cursor: pointer;
  }
  .button:hover {
    background-color: #dcdcdc;
  }
  .login-button {
    font-weight: bold;
    padding: 7px 16px;
    background-color: #0095f6;
    color: white;
    border-radius: 10px;
    cursor: pointer;
  }
  .login-button:hover {
    background-color: #1877f2;
  }
  .more-info {
    font-size: 16px;
  }
  .more-info:hover {
    color: rgba(0, 0, 0, 0.514);
  }
  .signup-button {
    font-weight: bold;
    padding: 7px 16px;
    background-color: white;
    color: black;
    border-radius: 10px;
    cursor: pointer;
  }
  .signup-button:hover {
    color: rgba(0, 0, 0, 0.336);
  }
  .color-fafafa {
    background-color: #fafafa;
  }
  @media (max-width: 700px) {
    .more-info {
      font-size: 14px;
    }
    .profile-img {
      margin: 0px;
      width: 77px;
      height: 77px;
    }
    .search-bar {
      display: none;
    }
    .tabs {
      display: flex;
      justify-content: space-between;
    }
    .padding-side-auto {
      padding: 0px;
    }
    .mobile-flex {
      display: flex;
    }
    .desktop-flex {
      display: none;
    }
    .mobile {
      display: block;
    }
    .desktop {
      display: none;
    }
  }
</style>
