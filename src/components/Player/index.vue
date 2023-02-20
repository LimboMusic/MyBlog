<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import ProgressBar from './ProgressBar.vue'
import Playlist from './Playlist.vue'
import { player } from '@/utils/myPlayer'
import { getSongList } from '@/api/wyy_api'
import type { Song } from '@/interface/index'
import defaultAvatar from '@/assets/images/nilu.jpg'

const playList = ref<Song[]>([])
const playState = ref<boolean>(false)

onMounted(() => {
  getSongList(7880175241).then((res: any) => {
    playList.value = res.data
    const index = Math.floor(Math.random() * playList.value.length)
    player.value.currentSong = playList.value[index]
    player.value.audio.src = playList.value[index].url
  })
})

const playMusic = async () => {
  if (!player.value.isPlaying)
    player.value.audio.play()
  else
    player.value.audio.pause()
  player.value.isPlaying = !player.value.isPlaying
  playState.value = !playState.value
}

const handlePlay = (item: any) => {
  playState.value = true
  player.value.currentSong = item.data
  player.value.audio.src = item.data.url
}

const playNext = () => {
  if (player.value.currentSong!.index < playList.value.length - 1) {
    player.value.audio.src = playList.value[player.value.currentSong!.index + 1].url
    player.value.currentSong = playList.value[player.value.currentSong!.index + 1]
  }
  else {
    player.value.audio.src = playList.value[0].url
    player.value.currentSong = playList.value[0]
  }
}

const playPrevious = () => {
  if (player.value.currentSong!.index > 0) {
    player.value.audio.src = playList.value[player.value.currentSong!.index - 1].url
    player.value.currentSong = playList.value[player.value.currentSong!.index - 1]
  }
  else {
    player.value.audio.src = playList.value[0].url
    player.value.currentSong = playList.value[0]
  }
}

const clickAvatar = () => {
  window.open(`https://music.163.com/#/song?id=${player.value.currentSong?.id}`, '_blank')
}
</script>

<template>
  <div class="player-wrapper flex flex-col">
    <div class="info flex ">
      <img
        class="avatar w-152px h-152px m-24px border-rd-8px" :src="player.currentSong!.avatar || defaultAvatar"
        @click="clickAvatar"
      >
      <div class="detail flex-1 flex flex-col-reverse mb-24px">
        <ProgressBar class="mr-30px" @next="playNext" @previous="playPrevious" />
        <a
          class="name color-white font-900 decoration-none mb-15px ml-5px"
          :href="`https://music.163.com/#/song?id=${player.currentSong?.id}`" target="_blank"
        >
          {{ player.currentSong?.name }}
        </a>
      </div>
      <div
        class="playbtn  w-70px h-70px mr-24px flex mb-20px  iconfont color-white flex justify-center items-center"
        :class="player.isPlaying ? 'icon-poweroff-circle-fill' : 'icon-play-circle-fill'" @click="playMusic"
      />
    </div>
    <Playlist :playlist="playList" @click="handlePlay" />
  </div>
</template>

<style scoped lang="less">
.player-wrapper {
  background: rgb(149, 110, 81);
  margin: 0 250px;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;

  .info {
    align-items: flex-end;
    position: relative;

    .avatar {
      display: block;
      box-shadow: 0 9px 9px 0 rgb(0 0 0 / 10%), 0 0 29px 0 rgb(0 0 0 / 10%);
      // transition: opacity 1s linear;
      cursor: pointer;
    }

    .detail {
      flex-direction: column-reverse;

      .name {
        font-size: 1.5rem;
      }
    }

    .playbtn {
      font-size: 70px;
      cursor: pointer;
      transition: 0.5s;
    }

    .playbtn:hover {
      transform: scale(1.1);
    }
  }

}
</style>
