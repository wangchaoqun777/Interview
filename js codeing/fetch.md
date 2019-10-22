
#### fetch 是一种HTTP数据请求的方法 XMLHttpRequest的一种替代方案 etch不是ajax的进一步封装，而是原生js

首先复习下ajax 
步骤：
  1.创建XmlHttpRequest对象
  2.调用open方法设置基本请求信息
  3.设置发送的数据，发送求情
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

  fetch 的实现方式
  ```js
    fetch(url).then(response => response.json())
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