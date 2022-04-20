
#### fetch 是一种HTTP数据请求的方法 XMLHttpRequest的一种替代方案 fetch不是ajax的进一步封装，而是原生js

首先复习下ajax
步骤：
  1.创建XmlHttpRequest对象
  2.调用open方法设置基本请求信息
  3.设置发送的数据，发送请求
  4.注册监听的回调函数
  5.拿到返回值，对页面进行刷新
  ```js
    if(window.XMLHttpRequest){
      var oAjax = new XMLHttpRequest()
    }else{
      var c = new ActiveXObject('Micosoft.XMLHTTP')
    }

    oAjax.open('GET', url, true)

    oAjax.send()

    oAjax.onreadystatechage = function(){
      if(oAjax.readyState == 4) {
        if(oAjax.status== 200){
          fnSucc(oAjax.responseText)
        }else{
          if(fnFaild){
            fnFaild()
          }
        }
      }
    }
  ```
  jquery ajax
  ```js
    $.ajax({
      type: "POST",
      url:'url',
      data: data,
      dataType: dataType,
      success: function(){},
      error: function(){}
    })
  ```

  fetch 的实现方式 fetch是ajax的替代品，基于promise 旧版本的浏览器不支持Promise，需要使用polyfill es6-promise
  ```js
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then( data => console.log(data))
      .catch(e => console.log('oops', e))
  ```
  通过Request构造器创建一个新的对象
  ```js
  var req = new Request(URL, {method: 'GET', cache: 'reload'})
  fetch(req).then(function(response){
    return resonse.json()
  })
    .then(function(json){
      insetPhtos(json)
    })
  ```

上述两种请求数据的方式的主要区别
1. fetch() 返回的promise将不会拒绝http的错误状态，即使响应一个http 404或者500
2. 在默认情况下fetch 不会接受或者发送cookies
3. 当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），  仅当网络故障时或请求被阻止时，才会标记为 reject。
默认情况下, fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项

fetch和 ajax的分装
```js
export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
    type = type.toUpperCase();
    url = baseUrl + url;

    if (type == 'GET') {
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }

    if (window.fetch && method == 'fetch') {
        let requestConfig = {
            credentials: 'include',//为了在当前域名内自动发送 cookie ， 必须提供这个选项
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",//请求的模式
            cache: "force-cache"
        }

        if (type == 'POST') {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }
        try {
            const response = await fetch(url, requestConfig);
            const responseJson = await response.json();
            return responseJson
        } catch (error) {
            throw new Error(error)
        }
    } else {
        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject;
            }

            let sendData = '';
            if (type == 'POST') {
                sendData = JSON.stringify(data);
            }

            requestObj.open(type, url, true);
            requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            requestObj.send(sendData);

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj)
                    } else {
                        reject(requestObj)
                    }
                }
            }
        })
    }
}
```
最后尤大大推荐的axios （https://juejin.im/post/5b55c118f265da0f6f1aa354）

1. 安装 npm install axios
2. 引入 
  一般我会在项目的src目录中，新建一个request文件夹，然后在里面新建一个http.js和一个api.js文件。
  http.js文件用来封装我们的axios，api.js用来统一管理我们的接口。
```js
  // 在http.js中引入axios
  import axios from 'axios'; // 引入axios
  import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
  // vant的toast提示框组件，大家可根据自己的ui组件更改。
  import { Toast } from 'vant'; 
```
3. 环境的切换 （我们通过node的环境变量来匹配我们的默认的接口url前缀）
```js
  // 环境的切换
  if (process.env.NODE_ENV == 'development') {    
    axios.defaults.baseURL = 'https://www.baidu.com';} 
  else if (process.env.NODE_ENV == 'debug') {    
    axios.defaults.baseURL = 'https://www.ceshi.com';
  } 
  else if (process.env.NODE_ENV == 'production') {    
    axios.defaults.baseURL = 'https://www.production.com';
  }
```
4. 设置请求时间 （通过axios.defaults.timeout设置默认的请求超时时间。例如超过了10s，就会告知用户当前请求超时，请刷新等。）
```js
 axios.defaults.timeout = 10000;os.defaults.baseURL = 'https://www.production.com';
```
5. 请求头设置 （post请求的时候，我们需要加上一个请求头）
```js
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
```
6. 请求拦截 （比如，有些请求是需要用户登录之后才能访问的，或者post请求的时候，我们需要序列化我们提交的数据）
这里说一下token，一般是在登录完成之后，将用户的token通过localStorage或者cookie存在本地，然后用户每次在进入页面的时候（即在main.js中），会首先从本地存储中读取token，如果token存在说明用户已经登陆过，则更新vuex中的token状态。然后，在每次请求接口的时候，都会在请求的header中携带token，后台人员就可以根据你携带的token来判断你的登录是否过期，如果没有携带，则说明没有登录过。这时候或许有些小伙伴会有疑问了，就是每个请求都携带token，那么要是一个页面不需要用户登录就可以访问的怎么办呢？其实，你前端的请求可以携带token，但是后台可以选择不接收啊！
```js
  // 先导入vuex,因为我们要使用到里面的状态对象
  // vuex的路径根据自己的路径去写
  import store from '@/store/index';

  // 请求拦截器axios.interceptors.request.use(    
      config => {        
          // 每次发送请求之前判断vuex中是否存在token        
          // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
          // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
          const token = store.state.token;        
          token && (config.headers.Authorization = token);        
          return config;    
      },    
      error => {        
          return Promise.error(error);    
  })
```
7. 相应的拦截
```js
  // 响应拦截器
axios.interceptors.response.use(    
    response => {   
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        if (response.status === 200) {            
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }    
    },    
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {            
        if (error.response.status) {            
            switch (error.response.status) {                
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case 401:                    
                    router.replace({                        
                        path: '/login',                        
                        query: { 
                            redirect: router.currentRoute.fullPath 
                        }
                    });
                    break;

                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面                
                case 403:
                     Toast({
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });
                    // 清除token
                    localStorage.removeItem('token');
                    store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
                    setTimeout(() => {                        
                        router.replace({                            
                            path: '/login',                            
                            query: { 
                                redirect: router.currentRoute.fullPath 
                            }                        
                        });                    
                    }, 1000);                    
                    break; 

                // 404请求不存在
                case 404:
                    Toast({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Toast({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });
            }
            return Promise.reject(error.response);
        }
    }    
});
```
7. 封装get 和post 方法
get：
```js
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
    })    
});}
```

post (需要对参数序列化)
```js
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
         axios.post(url, QS.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}
```