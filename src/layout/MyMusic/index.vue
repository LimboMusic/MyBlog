<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue'
import Player from '@/components/Player/index.vue'
</script>

<template>
  <div class="MyMusic-wrapper">
    <header class="title">
      <img ref="video" src="@/assets/images/Music.png" class="img">
    </header>
    <div class="content">
      <Player />
    </div>
  </div>
</template>

<style scoped lang="less">
.MyMusic-wrapper{
    background-color: rgb(20, 54, 95);
    min-height: 100vh;

    .title{
        text-align: center;

        .img{
            height: 25px;
            margin: 2em 0;
        }
    }
}
</style>
