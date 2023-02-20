import axios from 'axios'
import { MY_BASEURL } from './config'

// axios.defaults.baseURL = MY_BASEURL

export const getVideo = () => {
  let video = JSON.parse(localStorage.getItem('HomeVideo')!)
  if (video === null) {
    video = axios.post(`${MY_BASEURL}/getVideo`).then(res => res.data.url)
    localStorage.setItem('HomeVideo', JSON.stringify(video))
  }
  return video
}

