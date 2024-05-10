import { useEffect, useState } from 'react';
import axios, {AxiosRequestConfig} from 'axios';

axios.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('access_token');
  
    if (accessToken) {
        config.headers.authorization = 'Bearer ' + accessToken;
    }

    return config;
})

async function refreshToken() {
    const res = await axios.get(
        'http://localhost:3000/user/refresh',
        {
            params: {
                refresh_token: localStorage.getItem('refresh_token')
            }
        }
    );

    localStorage.setItem('access_token', res.data.access_token || '');
    localStorage.setItem('refresh_token', res.data.refresh_token || '');

    return res;
}

interface PendingTask {
    config: AxiosRequestConfig
    resolve: Function
}

// 加一个 refreshing 的标记，如果在刷新，那就返回一个 promise，并且把它的 resolve 方法还有 config 加到队列里。
let refreshing = false;
const queue: PendingTask[] = [];
  
axios.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        let { data, config } = error.response;

        if (refreshing) {
            return new Promise((resolve) => {
                queue.push({
                    config,
                    resolve
                });
            });
        }
    
        // 如果返回的错误是 401 就刷新 token，这里要排除掉刷新的 url，刷新失败不继续刷新
        if (data.statusCode === 401 && !config.url.includes('/user/refresh')) {
            refreshing = true;

            // 当 refresh 成功之后，修改 refreshing 的值，重新发送队列中的请求，并且把结果通过 resolve 返回。
            const res = await refreshToken();

            refreshing = false;
    
            // 如果刷新接口返回的是 200，就用新 token 调用之前的接口
            if (res.status === 200) {
                queue.forEach(({config, resolve}) => {
                    resolve(axios(config))
                })

                return axios(config);
            }
            // 如果返回的是 401，那就返回这个错误。
            else {
                alert('登录过期，请重新登录');

                return Promise.reject(res.data)
            }  
        }
        else {
            return error.response;
        }
    }
)

export const RefreshTokenTest = () => {
    const [aaa, setAaa] = useState();
    const [bbb, setBbb] = useState();

    useEffect(() => {
        query();
    }, [])

    async function login() {
        const res = await axios.post(
            'http://localhost:3000/user/login',
            {
                username: 'guang',
                password: '123456'
            }
        );

        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('refresh_token', res.data.refresh_token)
    }

    async function query() {
        // 判断下如果没有 access_token 才登录
        if (!localStorage.getItem('access_token')) {
            await login();
        }

        // * 比如当并发多个请求的时候，如果都失效了，是不是要刷新多次?
        await [
            axios.get('http://localhost:3000/bbb'),
            axios.get('http://localhost:3000/bbb'),
            axios.get('http://localhost:3000/bbb')
        ];

        const { data: aaaData } = await axios.get('http://localhost:3000/aaa');
        const { data: bbbData } = await axios.get(
            'http://localhost:3000/bbb',
            // {
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem('access_token')}`
            //     }
            // }
        );

        setAaa(aaaData);
        setBbb(bbbData);
    }
    

    return (
        <div>
            <p>{aaa}</p>
            <p>{bbb}</p>
        </div>
    );
}