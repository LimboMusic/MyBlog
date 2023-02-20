import axios from 'axios'

export const MY_BASEURL = 'https://fc-mp-bfa3845e-09c7-418a-b6f5-0177eb90d25e.next.bspapp.com/blog'

export const WYY_BASEURL = 'https://service-lhklafn3-1312239507.sh.apigw.tencentcs.com/release'

axios.defaults.timeout = 8000
axios.defaults.withCredentials = false
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.post['Access-Control-Allow-Origin-Type'] = '*'
axios.defaults.withCredentials = true
