import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

//刷新token
const refreshToken = () => {
    const token = localStorage.getItem('refresh_token')
    return axios.post('token/refresh/', { refresh: token })
}

// 请求拦截器
axios.interceptors.request.use((config) => {
    //访问的不是获取token的页面,则添加token
    if (['token/', 'token/refresh/'].indexOf(config.url) === -1) {
        const token = localStorage.getItem('access_token')
        config.headers.Authorization = 'Bearer ' + token
        return config
    } else {
        return config
    }
})

// 响应拦截器
axios.interceptors.response.use(res => {
    // console.log(res)
    return res
}, err => {
    // console.log(error)
    console.log('refresh token')
    const config = err.config
    // 当fresh_token过期时也返回401状态码
    // 如果不排除这种情况，会导致重复响应401
    if (err.response.status === 401 && !err.response.config.url.includes('token/refresh/')) {
        return refreshToken().then(res => {
            const token = res.data.access
            localStorage.setItem('access_token', token)
            config.headers.Authorization = 'Bearer ' + token
            return axios(config)
        }).catch(err => {
            console.log('登录已失效，请重新登录')
            return Promise.reject(err)
        })
    } else {
        return Promise.reject(err)
    }
})

export default axios