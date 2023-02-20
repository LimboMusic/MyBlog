// 转换时间格式
export const toTime = (sec: number) => {
  const min = Math.floor(sec / 60)
  sec = Math.floor(sec % 60)
  return `${min > 10 ? min : `0${min}`}:${sec >= 10 ? sec : `0${sec}`}`
}

// 本地储存playList

