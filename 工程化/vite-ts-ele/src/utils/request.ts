import axios from 'axios';
import router from '@/router';
import store from '@/store';

const token = store.getters['token']

const myAxios = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '/proxy-prefix' : '',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': token,
        'X-Requested-With': 'XMLHttpRequest'
    }
});

const beforeSend = ({ url }:any) => {
    if (url === `/token`) return
    if (!token) {
      return store.dispatch('update_token')
    }
}

// request拦截器，请求发送前修改发送内容
myAxios.interceptors.request.use(
    (request) => {
        beforeSend(request)
        const headers = request['headers']
        if (headers) {
            headers['X-CSRF-TOKEN'] = store.getters['token']
        } 
        return request; // 返回请求对象以继续发送请求内容
    },
    (error) => {
        console.error('Error', error)
    }
);

// response拦截器，接收返回值后可在此先对返回值进行操作
myAxios.interceptors.response.use(
    (response ) => {
        return response;
    },
    (error) => {
        console.error('Error', error)
        switch (error.response.status) {
            case 419: // 未登录
                router.replace('/admin/login')
                break;
            case 403: // 无权限
                router.replace('/403')
                break;
            default:
        }
    }
);

export default myAxios;
