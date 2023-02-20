<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue'
import { player } from '@/utils/myPlayer'
onMounted(() => {
  player.value.appendAudio()
})
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style lang='less'>
@import url('@/assets/css/font1/iconfont.css');
@import url('@/assets/css/font2/iconfont.css');
</style>
