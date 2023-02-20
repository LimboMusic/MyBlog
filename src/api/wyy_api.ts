/* eslint-disable no-console */
import axios from 'axios'
import { WYY_BASEURL } from './config'

// const playlistId = '7880175241'

// axios.defaults.baseURL = WYY_BASEURL

const getProducers = (item: any): string => {
  let producers = ''
  item.ar.map((a: { name: any }) => {
    producers += `${a.name} / `
    return true
  })
  return producers.slice(0, -2)
}

// const getSongUrl = (item: any, songUrls: any) => {
//   const index = songUrls.findIndex((find: any) => {
//     return find.id === item.id
//   })
//   return songUrls[index].url
// }

const wyy_getPlayList = async (playlistId: number) => {
  return await axios.post(`${WYY_BASEURL}/playlist/detail?id=${playlistId}`).then((res) => {
    return res.data.privileges
  })
}

const wyy_getSong = async (playlistId: number) => {
  const list = await wyy_getPlayList(playlistId)
  let urls = ''
  list.map((item: { id: string }) => {
    urls += `${item.id},`
    return true
  })
  urls = urls.slice(0, -1)
  const songUrls = await axios.post(`${WYY_BASEURL}//song/url?id=${urls}`).then(res => res.data.data)
  console.log('songUrls', songUrls)
  return await axios.post(`${WYY_BASEURL}/song/detail?ids=${urls}`).then((res) => {
    console.log(res)
    return res.data.songs.map((item: any, index: number) => {
      return {
        id: item.id,
        index,
        name: item.name,
        url: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
        // url: getSongUrl(item, songUrls),
        producers: getProducers(item),
        duration: item.dt,
        avatar: item.al.picUrl,
      }
    })
  })
}

export const getSongList = async (playlistId: number) => {
  return new Promise((resolve) => {
    const data = JSON.parse(localStorage.getItem('MyPlayList')!)
    if (data !== null && Date.now() - data.time < 1000 * 60 * 60 * 24) {
      // console.log('走的本地缓存')
      resolve(data)
    }
    else if (!data) {
      // console.log('走的网络请求')
      wyy_getSong(playlistId).then((res) => {
        localStorage.setItem('MyPlayList', JSON.stringify({ data: res, time: Date.now() }))
        resolve(JSON.parse(localStorage.getItem('MyPlayList')!))
      })
    }
  })
}

