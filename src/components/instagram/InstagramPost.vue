<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  const emit = defineEmits(['deletePost']);
  const overPost = ref(false);
  const serverAddr = ref('http://localhost:8090/upload/');
  const props = defineProps({
    title: String,
    context: String,
    img: String,
  });
  const router = useRouter();

  const mouseoverEvent = () => {
    overPost.value = true;
  };
  const mouseoutEvent = () => {
    overPost.value = false;
  };

  const deletePost = async () => {
    emit('deletePost', props.img);
  };

  const onClick = async () => {
    await router.push('/instagram/post/' + props.img);
  };

  onMounted(() => {
    serverAddr.value += props.img;
  });
</script>
<template>
  <div @mouseover="mouseoverEvent()" @mouseout="mouseoutEvent()" class="container row items-center justify-center">
    <q-img :src="serverAddr"
      ><div
        @click="onClick"
        :class="{ 'absolute-full': overPost, flex: overPost, 'flex-center': overPost }"
        class="cursor-pointer"
        :style="{ display: overPost ? 'flex' : 'none' }"
      >
        ❤ 333 💬 25
      </div>
      <div class="delete-button cursor-pointer" @click="deletePost">⨉</div>
    </q-img>
  </div>
</template>
<style scoped>
  .delete-button {
    padding: 0;
  }
  .container {
    position: relative;
  }
  q-img {
    width: 100%;
  }
  .blur-screen {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.7;
  }
  .post-info {
    position: absolute;
    color: white;
  }
</style>
