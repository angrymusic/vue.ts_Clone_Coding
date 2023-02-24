<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import axios from 'axios';
  import { useQuasar } from 'quasar';
  const q = useQuasar();
  const hoverProfile = ref(false);
  const typingEnd = ref(false);
  const todayInfo = ref('');
  const headline = ref('');
  const weather = ref('');
  const visits = ref(0);
  const drawOn = ref(false);
  const drawAlert = ref(false);

  //profile 사진 마우스 hover
  const mouseProfile = (bool: boolean) => {
    hoverProfile.value = bool;
  };

  //typing animation
  const typing = (counter = 0) => {
    const txt = '[속보] 프론트엔드 개발자 이민재 인터뷰 화제';
    setInterval(() => {
      if (txt.length === counter) {
        typingEnd.value = true;
        return;
      }
      headline.value += txt[counter];

      counter++;
    }, 80);
  };

  const drawToggle = () => {
    drawOn.value = true;
    drawAlert.value = true;
  };

  //오늘 날짜 계산
  const getDay = () => {
    const today = new Date();
    const week = ['일', '월', '화', '수', '목', '금', '토'];

    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDate = today.getDate();
    const todayWeek = week[today.getDay()];

    todayInfo.value = todayYear + '년 ' + todayMonth + '월 ' + todayDate + '일 ' + todayWeek + '요일';
  };

  //count api 로 방문자 수 체크
  const countVisit = async () => {
    //https://api.countapi.xyz/set/angrymusic/visits?value=0
    await axios.get('https://api.countapi.xyz/hit/angrymusic/visits').then((res) => {
      visits.value = res.data.value;
    });
  };

  //날씨 open weather api
  const getWeather = async () => {
    weather.value = '☀ 맑음';
    // 요청 횟수 제한으로 인해 임시 주석 처리
    // let weatherCode: number;
    // await axios
    //   .get('http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=259e58e12fe92e7d35db8c432d0f58c9&units=metric')
    //   .then((res) => {
    //     weatherCode = res.data.weather[0].id;
    //     if (weatherCode < 600) weather.value = '🌧 비';
    //     else if (weatherCode < 700) weather.value = '🌨 눈';
    //     else if (weatherCode < 800) weather.value = '🌫 안개';
    //     else if (weatherCode === 800) weather.value = '☀ 맑음';
    //     else weather.value = '☁ 흐림';
    //   })
    //   .catch((err) => {
    //     console.log("can't get weather");
    //     weather.value = '☀ 맑음'
    //   });
  };
  let canvas: HTMLCanvasElement;
  watch(
    () => q.screen.width * q.screen.height,
    () => {
      canvas.width = document.body.clientWidth;
      canvas.height = document.body.clientHeight;
    }
  );
  watch(drawOn, () => {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
  });
  let pos = {
    drawable: false,
    x: -1,
    y: -1,
  };
  const setCanvas = () => {
    canvas = <HTMLCanvasElement>document.getElementById('canvas');
    if (canvas) {
      canvas.width = document.body.clientWidth;
      canvas.height = document.body.clientHeight;
    }
    const ctx = canvas?.getContext('2d');

    const rect = canvas?.getBoundingClientRect(); // 터치 스크린
    const drawStart = (e: any) => {
      if (ctx) {
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
      pos.drawable = true;
      ctx?.beginPath();
      pos.x = e.offsetX;
      pos.y = e.offsetY;
      ctx?.moveTo(pos.x, pos.y);
    };
    const touchStart = (e: any) => {
      pos.drawable = true;
      ctx?.beginPath();
      pos.x = e.touches[0].pageX - rect.left;
      pos.y = e.touches[0].pageY - rect.top;
      ctx?.moveTo(pos.x, pos.y);
    };
    const draw = (e: any) => {
      if (!pos.drawable) return;
      ctx?.lineTo(e.offsetX, e.offsetY);
      pos.x = e.offsetX;
      pos.y = e.offsetY;
      ctx?.stroke();
    };
    const touch = (e: any) => {
      ctx?.lineTo(e.touches[0].pageX - rect.left, e.touches[0].pageY - rect.top);
      pos.x = e.touches[0].pageX - rect.left;
      pos.y = e.touches[0].pageY - rect.top;
      ctx?.stroke();
    };
    const drawEnd = () => {
      pos.drawable = false;
      pos.x = -1;
      pos.y = -1;
    };

    const exitCanvas = (e: any) => {
      drawOn.value = false;
    };

    canvas.addEventListener('mousedown', drawStart);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', drawEnd);
    canvas.addEventListener('mouseout', drawEnd);
    document.addEventListener('keydown', exitCanvas);

    /// 터치 스크린
    canvas.addEventListener('touchstart', touchStart);
    canvas.addEventListener('touchmove', touch);
    canvas.addEventListener('touchend', drawEnd);
  };

  onMounted(() => {
    countVisit();
    getWeather();
    getDay();
    typing();
    setCanvas();
  });
</script>

<template>
  <div id="container">
    <q-dialog v-model="drawAlert">
      <q-card>
        <q-card-section>
          <div class="text-h6">낙서를 그만두시려면 ESC를 눌러주세요!</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <canvas v-show="drawOn" id="canvas"></canvas>
    <div id="pencil" v-if="!drawOn && typingEnd" @click="drawToggle"><img src="../assets/home/pencil.svg" width="150" alt="" /></div>
    <div id="bg">
      <div id="header" class="row" :class="{ 'q-py-sm': !$q.screen.lt.md }">
        <div id="header-left" class="col-xs-12 col-sm-12 col-md-3 row" :class="{ 'q-pt-xs': $q.screen.lt.md }">
          <div class="col-12 row justify-center" v-if="!$q.screen.lt.md">
            <img src="../assets/testlogo.jpg" height="70" alt="" />
          </div>
          <div class="col-12 today row self-end justify-center">{{ todayInfo }} {{ weather }}</div>
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
        <div id="body-left" v-if="!$q.screen.lt.md" class="col-2 q-mt-md">
          <div @mouseover="mouseProfile(true)" @mouseout="mouseProfile(false)" class="row justify-center self-start">
            <div class="col-12 q-px-sm">
              <q-img width="100%" ratio="1" src="/src/assets/heongmin.jpg" alt="" class="">
                <div v-show="hoverProfile" class="absolute-full row items-center font-size-12 opacity-animation">
                  <div class="">👨‍💻 이민재</div>
                  <div class="col-12">👶 99.05.12</div>
                  <div class="col-12">😍 노래, 풋살, 고기</div>
                  <div>😫 미세먼지</div>
                </div>
              </q-img>
              <div class="row flex flex-center">More Infomation? ↑</div>
            </div>
          </div>
          <div class="">
            <span class="font-bold"><br />{{ visits }}</span> 번째로 민재일보를 읽어주셨네요! 방문에 감사드리며 좋은 하루 보내세요~😃
          </div>
        </div>

        <div id="body-center" class="col-xs-12 col-sm-12 col-md q-pt-lg q-px-md">
          <div class="headline font-bold">
            <span id="typing-text" v-html="headline"></span>
            <span id="cursor" :class="{ 'blink-animation': typingEnd }">|</span>
          </div>
          <q-spinner-comment v-if="!typingEnd" color="black" size="100px" class="q-mt-sm q-ml-lg q-pl-lg" />
          <div v-if="typingEnd" id="body-center-content">
            <div class="font-bold subtitle">본인 소개 먼저 해주실까요?</div>
            <p>안녕하세요 저는 프론트엔드 직군으로 시작한 신입 개발자 이민재라고 합니다.</p>
            <div class="font-bold subtitle">프론트엔드 직군 선택의 이유가 무엇인가요?</div>
            <p>
              우선 제가 개발자를 꿈꾸게 된 이유는 새로운 무언가를 창조할 수 있기 때문입니다.<br />
              나만의 무언가를 만들어낸다는 것 만큼 재밌고 자극적인 것은 없다고 생각합니다. 그리고 만든 것을 바로 눈으로 볼 수 있다면 더 재밌어질
              것입니다.<br />
              그래서 저는 웹 프론트엔드 개발자가 되기로 결심했습니다. 결과를 바로 볼 수도 있고 많은 사람들에게 쉽게 노출될 수 있습니다. 그만큼 중요한
              역할이 될 것이고 돌아오는 보람과 성취감도 크다고 생각하기 때문입니다.
            </p>
            <div class="font-bold subtitle">현재는 어떤 일을 하고 계신가요?</div>
            <p>학교에서 하는 일학습병행에 참가하여 회사 실무자분께 좋은 팁들을 전수 받으며 vue.js를 중점으로 배우고 있습니다.</p>
            <div class="font-bold subtitle">이때까지 경험해보신 기술들은 어떤게 있을까요?</div>
            <p>제가 사용해본 기술들은!</p>
            <div class="box font-bold row text-white q-py-md" :class="{ 'q-col-gutter-xs': $q.screen.lt.md, 'q-col-gutter-md': $q.screen.gt.sm }">
              <div class="col-xs-4 col-md-3 column flex-center"><img src="../assets/home/html5logo.svg" width="80" />HTML</div>
              <div class="col-xs-4 col-md-3 column flex-center"><img src="../assets/home/css3logo.svg" width="80" />CSS</div>
              <div class="col-xs-4 col-md-3 column flex-center"><img src="../assets/home/javascriptlogo.svg" width="80" />JS</div>
              <div class="col-xs-4 col-md-3 column flex-center"><img src="../assets/home/typescriptlogo.svg" width="80" />TS</div>
              <div class="col-xs-4 col-md-3 column flex-center"><img src="../assets/home/vuelogo.svg" width="80" />Vue.js</div>
              <div class="col-xs-4 col-md-3 column flex-center"><img src="../assets/home/reactlogo.svg" width="80" />React.js</div>
              <div class="col-xs-4 col-md-3 column flex-center"><img src="../assets/home/quasarlogo.svg" width="80" />quasar</div>
              <div class="col-xs-4 col-md-3 column flex-center"><img src="../assets/home/expresslogo.svg" width="80" />express.js</div>
              <div class="col-xs-4 col-md-3 column flex-center"><img src="../assets/home/githublogo.svg" width="80" />Github</div>
              <div class="col-xs-4 col-md-3 column flex-center"><img src="../assets/home/dockerlogo.svg" width="80" />Docker</div>
              <div class="col-xs-4 col-md-3 column flex-center"><img src="../assets/home/mysqllogo.svg" width="80" />Mysql</div>
              <div class="col-xs-4 col-md-3 column flex-center"><img src="../assets/home/clogo.svg" width="80" />C</div>
            </div>
            <p><br />가 되겠습니다. 아직 모든 것을 통달했다고 말할 순 없으나 열심히 채워나가는 중입니다!</p>
            <div class="font-bold subtitle">그럼 이 기술들로 무엇을 해보았나요?</div>
            <p>제가 해본 프로젝트들은 아래와 같습니다.</p>
          </div>
        </div>

        <div id="body-right" v-if="!$q.screen.lt.md" class="col-2 q-mt-md q-pl-md">
          <q-timeline color="#2d2c25">
            <q-timeline-entry subtitle="1999년 5월 12일 탄생"> 👶 세상에 등장 </q-timeline-entry>
            <q-timeline-entry subtitle="2006년 ~ 2011년 초등"> 🤩 레고 사랑꾼 </q-timeline-entry>
            <q-timeline-entry subtitle="2012년 ~ 2014년 중등"> 👨‍👦‍👦 친구 좋아 </q-timeline-entry>
            <q-timeline-entry subtitle="2015년 ~ 2017년 고등"> ✍ 대학 가자 </q-timeline-entry>
            <q-timeline-entry subtitle="2019년 ~ 2021년 군대"> 👨‍🦲 내 머리.. </q-timeline-entry>
            <q-timeline-entry subtitle="2018년 ~ 대학"> 👨‍💻 내가 바로 개발자 </q-timeline-entry>
          </q-timeline>
        </div>
      </div>
      <div v-if="typingEnd" id="footer" class="flex flex-center q-mt-md">projects</div>
    </div>
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
  @keyframes blink {
    0% {
      opacity: 0;
    }
    49% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes smooth {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  @keyframes opacity-animation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes right-to-left-animation {
    0% {
      transform: translateX(40px);
    }
    100% {
      transform: translateX(0px);
    }
  }
  #pencil {
    cursor: pointer;
    position: absolute;
    transform: rotate(-30deg);
    top: 150px;
    right: -10px;
    animation: right-to-left-animation 2s;
  }
  #canvas {
    z-index: 2;
    position: absolute;
  }
  #container {
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: #e2e0d7;
    position: relative;

    font-family: 'Chosun-light', serif;
    font-size: 14px;
  }
  #bg {
    width: 100%;
    max-width: 1440px;
    min-height: 100vh;
    padding: 10px 5vw;
    margin: 0 auto;
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
  #body-center-content {
    animation: smooth 1.5s;
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
  a {
    text-decoration: none;
    color: black;
  }
  .opacity-animation {
    animation: opacity-animation 0.5s;
  }
  .box {
    background-color: #2d2c25;
    border-radius: 15px;
    margin: 0 !important;
  }
  .blink-animation {
    animation-name: blink;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
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
</style>
