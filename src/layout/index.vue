<!-- eslint-disable no-console -->
<script setup lang='ts'>
import { reactive, ref } from 'vue'
import Player from '@/components/MusicPlayer/Player.vue'
import Home from '@/layout/Home/Home.vue'
import MyMusic from '@/layout/MyMusic/index.vue'
</script>

<template>
  <div>
    <Home />
    <MyMusic />
  </div>
</template>

<style scoped lang='less'>

</style>
