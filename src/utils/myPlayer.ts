import { ref } from 'vue'
import type { Song } from '@/interface'
class Player {
  audioContext: AudioContext
  sourceNode: AudioBufferSourceNode | undefined
  gainNode: GainNode | undefined
  analyser: AnalyserNode | undefined
  isPlaying = false
  currentSong: Song | undefined
  audio = document.createElement('audio') as HTMLAudioElement
  ended = true

  constructor() {
    this.audioContext = new AudioContext({ latencyHint: 'balanced' })
    this.currentSong = {
      index: 0,
      id: 0,
      duration: 0,
      name: 'My Favorite',
      producers: [],
      url: '',
      avatar: '',
    }
  }

  appendAudio() {
    // this.audio.controls = true
    this.audio.style.display = 'none'
    this.audio.addEventListener('ended', () => {
      this.ended = true
    })
    this.audio.addEventListener('canplay', () => {
      // console.log('canplay')
      this.audio.play()
      this.isPlaying = true
    })
    document.getElementById('app')!.appendChild(this.audio)
  }

  // async start(song: Song) {
  //   this.initPlayer()
  //   // console.log(song)
  //   // axios.post(`${song.url}&timestamp=${Date.now()}`, { responseType: 'arraybuffer' }).then((res) => {
  //   //   console.log(res)
  //   //   return res
  //   // }).then(async (r) => {
  //   //   decodedAudioData = await this.audioContext.decodeAudioData(r.data)
  //   // })
  //   // const musicArrayBuffer = await fetch(`${song.url}&timestamp=${Date.now()}`).then(r => r.arrayBuffer())
  //   // const decodedAudioData = await this.audioContext.decodeAudioData(musicArrayBuffer)
  //   // this.layIn(decodedAudioData)
  // }

  // restart(song: Song) {
  //   // this.stopTime = 0
  //   // this.duration = 0
  //   // this.breakTime = 0
  //   // this.startTime = 0
  //   this.currentSong = song
  //   this.start(song)
  // }

  // initPlayer() {
  //   // this.gainNode = this.audioContext.createGain()
  //   // this.sourceNode = this.audioContext.createBufferSource()
  //   // this.analyser = this.audioContext.createAnalyser()
  //   // this.sourceNode.connect(this.analyser)
  //   // this.analyser.connect(this.gainNode)
  //   // this.gainNode.connect(this.audioContext.destination)
  // }

  // play(decodedAudioData: AudioBuffer | null) {
  //   this.sourceNode!.buffer = decodedAudioData
  //   // this.duration = Math.floor(<number> this.sourceNode?.buffer?.duration)
  //   const currentTime = this.audioContext.currentTime
  //   // this.breakTime = this.breakTime + currentTime - this.stopTime
  //   // this.startTime = currentTime - this.breakTime
  //   this.isPlaying = true
  //   // this.sourceNode!.start(0, this.startTime)
  //   return currentTime
  // }

  // async layIn(decodedAudioData: AudioBuffer | null) {
  //   this.gainNode!.gain.value = 0
  //   this.sourceNode!.buffer = null
  //   const currentTime = this.play(decodedAudioData)
  //   // this.startTime = currentTime
  //   this.gainNode!.gain.linearRampToValueAtTime(1, currentTime + 0.8)
  // }

  // stop() {
  //   this.isPlaying = false
  //   this.sourceNode?.stop()
  //   // this.stopTime = this.audioContext.currentTime
  // }

  get playTime() {
    return this.audio.currentTime
  }
}

export const player = ref(new Player())
