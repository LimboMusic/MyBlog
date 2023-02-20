<!-- eslint-disable no-console -->
<script setup lang='ts'>
import { nextTick, onMounted, reactive, ref } from 'vue'
import { getVideo } from '@/api/my_api'
import { player } from '@/utils/myPlayer'
const videoURL = ref('')
onMounted(async () => {
  videoURL.value = getVideo()
})

const mute = ref<boolean>(true)

const changeVol = () => {
  mute.value = !mute.value
}

const test = async () => {
  mute.value = false
  await nextTick()
}

window.addEventListener('canplay', () => {
  mute.value = false
})
</script>

<template>
  <div class="video">
    <!-- <img class="absolute left-50% top-50% img w-130px h-130px border-rd block" src="../../assets/images/nilu.jpg"> -->
    <video
      ref="video" :src="videoURL" :muted="mute || player.isPlaying" autoplay loop
    />
  </div>

  <button @click="changeVol">
    11
  </button>
</template>

<style scoped lang="less">
.video{
  width: 100%;
  height: 100vh;
  position: relative;

  .img{
    transform: translate(-50%,-50%);
    border-radius: 50%;
  }

}

video{
    width: 100%;
    height: 100vh;
    display: block;
    object-fit: cover;
}
</style>
