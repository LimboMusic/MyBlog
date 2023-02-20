<!-- eslint-disable no-console -->
<script setup lang='ts'>
import { reactive, ref } from 'vue'
import '@/assets/css/font1/iconfont.css'
import * as Tone from 'tone'
import music from '@/assets/music/PrettyLittleWords.flac'

interface Icon {
  name: string
  class: string[]
  pos: number
  event: any[]
}

const imgURL = ref<string>('/src/assets/images/nilu.gif')
const songName = ref<string>('_(:з」∠)_')
const time = ref<string>('00:00/00:00')
const player = new Tone.Player(music).toDestination()
const appear = ref<boolean>(true)

const playMusic = () => {
  Tone.loaded().then(() => {
    player.start()
  })
}

const stopMusic = () => {
  player.stop()
}

const iconfont = ref<Icon[]>([
  {
    name: 'volume',
    class: ['icon-yinliang', 'icon-jingyin'],
    pos: 0,
    event: [],
  },
  {
    name: 'last',
    class: ['icon-24gf-previousCircle'],
    pos: 0,
    event: [],
  },
  {
    name: 'play',
    class: ['icon-bofang1', 'icon-zanting'],
    pos: 0,
    event: [playMusic, stopMusic],
  },
  {
    name: 'next',
    class: ['icon-24gf-nextCircle'],
    pos: 0,
    event: [],
  },
  {
    name: 'mode',
    class: ['icon-a-youjiantouzhixiangyoujiantou', 'icon-suijibofang', 'icon-danquxunhuan', 'icon-bofang-xunhuanbofang'],
    pos: 0,
    event: [],
  },
])

const handleVolClick = (item: Icon) => {

}

const handleClick = (item: Icon) => {
  if (item.event[item.pos])
    item.event[item.pos]()

  if (item.pos + 1 >= item.class.length)
    item.pos = 0
  else
    item.pos++
}
</script>

<template>
  <div class="player-wrapper w-400px h-120px flex justify-between fixed bottom-0 cursor-pointer" :class="appear ? 'right-0' : '-right-380px'">
    <div class="left-arrow bg-black w-30px h-100% " @click="appear = !appear" />
    <div class="content h-100% w-100% p-20px flex align-center justify-between color-white">
      <img :src="imgURL" class="w-85px h-85px">
      <div class="content-right  h-100% w-100% pl-10px justify-between flex flex-col">
        <div class="header flex justify-between">
          <div class="name h-20px fw-700">
            {{ songName }}
          </div>
          <div class="time h-20px fw-700">
            {{ time }}
          </div>
        </div>
        <div class="body flex justify-between align-center ">
          <i
            v-for="item in iconfont"
            :key="item.name"
            class="iconfont cursor-pointer"
            :class="item.class[item.pos]"
            style="font-size: 25px;"
            @click="handleClick(item)"
          />
        </div>
        <input type="range" disabled value="0">
      </div>
    </div>
    <div class="right-arrow bg-black w-30px h-100%">
      1
    </div>
  </div>
</template>

<style scoped lang="less">
.player-wrapper{
    transition: 1s;

    .left-arrow{
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    .content{
        background-color: rgb(102,102,102);

        .content-right{
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 13px;
        }
    }
    .right-arrow{
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
}
</style>
