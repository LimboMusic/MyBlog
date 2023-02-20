<script setup lang='ts'>
import { defineEmits, reactive, ref } from 'vue'
import type { Song } from '@/interface/index'
import { toTime } from '@/utils/index'
interface Props {
  playlist: Song[]
}
const props = defineProps<Props>()
const emit = defineEmits(['click'])
const handleClick = (item: any, index: number) => {
  emit('click', {
    data: item,
    index,
  })
}
</script>

<template>
  <div class="playlist-wrapper">
    <div class="content">
      <div v-for="item, index in props.playlist" :key="item.name" @click="handleClick(item, index)">
        <div class="song h-52px mt-8px mb-8px flex justify-between pr-8px">
          <div class="left flex flex-1">
            <div class="index flex m-auto w-32px h-32px justify-center items-center">
              <span class="num w-32px h-32px justify-center items-center flex">
                {{ index + 1 }}
              </span>
              <span class="iconfont icon-caret-right hidden w-32px h-32px" />
            </div>
            <div class="desc flex-1 ml-5px">
              <div class="songName color-white font-548">
                {{ item.name }}
              </div>
              <div class="singer">
                {{ item.producers }}
              </div>
            </div>
          </div>
          <div class="right font-548 justify-center items-center flex">
            {{ toTime(item.duration / 1000) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.playlist-wrapper {
    background: rgb(134, 99, 73);
    flex: 1;
    border-radius: 0 0 20px 20px;
    padding: 10px 10px 30px 10px;
    overflow: hidden;

    .content {
        overflow-y: auto;
        height: 160px;

        .song:hover {
            background: rgb(107, 79, 58);
        }

        .song:hover .index .iconfont {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 25px;
            cursor: pointer;
        }

        .song:hover .index .num {
            display: none;
        }

        .song {
            margin: 0;
            margin-right: 10px;
            padding: 10px;
            height: 60px;

            .left {
                .index {
                    color: rgb(207, 193, 182);
                }

                .desc {
                    .songName {
                        word-break: keep-all;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .singer {
                        font-weight: 400;
                        color: rgb(207, 193, 182);
                        word-break: keep-all;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }

            .right {
                color: rgb(207, 193, 182);
            }
        }
    }

    .content::-webkit-scrollbar {
        width: 0.4em;
        left: 10px;
    }

    .content::-webkit-scrollbar-thumb {
        border-radius: 0.25em;
        background-color: rgb(94, 69, 51);
        left: 10px;
    }
}
</style>
