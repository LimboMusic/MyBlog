<script setup lang='ts'>
import { reactive, ref, toRef, watch } from 'vue'
import { player } from '@/utils/myPlayer'
import { toTime } from '@/utils/index'
const emit = defineEmits(['next', 'previous'])
let timer = 0
const line = ref<HTMLDivElement>()
const playTime = ref<number>(0)
watch(() => player.value.isPlaying, (value, oldvalue) => {
  if (value === true) {
    line.value!.style.transform = `translateX(${playTime.value / (player.value.currentSong!.duration / 1000) || 0}%)`
    playTime.value = player.value.playTime
    timer = setInterval(() => {
      requestAnimationFrame(() => {
        playTime.value = player.value.playTime
        line.value!.style.transform = `translateX(${(playTime.value / (player.value.currentSong!.duration / 1000) * 100).toFixed(2)}%)`
      })
      if (player.value.audio.ended)
        emit('next')
    }, 1000)
  }
  else {
    clearInterval(timer)
  }
}, { immediate: true })

watch(() => player.value.currentSong?.id, (value, oldValue) => {
  line.value!.style.transform = 'translateX(0)'
  playTime.value = 0
})

const emitPlayNext = () => {
  emit('next')
}

const emitPlayPrevious = () => {
  emit('previous')
}
</script>

<template>
  <div class="progress-wrapper flex justify-between items-center">
    <div class="left   iconfont icon-step-backward flex justify-center items-center" @click="emitPlayPrevious" />
    <div class="middle flex-1 h-4px m-auto ">
      <div ref="line" class="line" />
    </div>
    <div class="right  iconfont icon-step-forward flex justify-center items-center" @click="emitPlayNext" />
    <div class="playTime color-white ml-20px ">
      {{ toTime(playTime) }} / {{ toTime(player.currentSong?.duration! / 1000) }}
    </div>
  </div>
</template>

<style scoped lang="less">
.progress-wrapper {
  .left {
    color: rgb(223, 212, 203);
    font-size: 30px;
    cursor: pointer;
    transition: 0.5s;
  }

  .left:hover {
    color: white;
    transform: scale(1.05);
  }

  .right:hover {
    color: white;
    transform: scale(1.05);
  }

  .right {
    color: rgb(223, 212, 203);
    font-size: 30px;
    cursor: pointer;
    transition: 0.5s;
  }

  .middle {
    background-color: hsla(0, 0%, 100%, .3);
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;

    .line {
      position: absolute;
      width: 100%;
      background-color: white;
      height: 4px;
      top: 0;
      right: 100%;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      border-radius: 8px;
      // transition: 2s;
    }
  }

  .playTime {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
