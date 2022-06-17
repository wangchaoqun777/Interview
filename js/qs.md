#### qs是一个npm仓库所管理的包,可通过npm install qs命令进行安装.
- qs.parse()将URL解析成对象的形式 
```js
const Qs = require('qs');
let url = 'method=query_sql_dataset_data&projectId=85&appToken=7d22e38e-5717-11e7-907b-a6006ad3dba0';
Qs.parse(url);
console.log(Qs.parse(url));
```
- qs.stringify()将对象 序列化成URL的形式，以&进行拼接
```js
const Qs = require('qs');
let obj= {
     method: "query_sql_dataset_data",
     projectId: "85",
     appToken: "7d22e38e-5717-11e7-907b-a6006ad3dba0",
     datasetId: " 12564701"
   };
Qs.stringify(obj);
```
- 在这里需要注意的是，JSON中同样存在stringify方法，但是两者之间的区别是很明显的，如下所示
```js
{"uid":"cs11","pwd":"000000als","username":"cs11","password":"000000als"}
uid=cs11&pwd=000000als&username=cs11&password=000000als
```