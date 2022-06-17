### 背景
- 前段时间公司做项目，该项目涉及到的敏感数据比较多，经过的一波讨论之后，决定前后端进行接口加密处理，采用的是 AES + BASE64 算法加密~
### 具体实现
- 要用 AES 算法加密，首先我们要引入 crypto-js ，crypto-js 是一个纯 javascript 写的加密算法类库 ，可以非常方便地在 javascript 进行 MD5、SHA1、SHA2、SHA3、RIPEMD-160 哈希散列，进行 AES、DES、Rabbit、RC4、Triple DES 加解密，我们可以采用 npm install crypto-js --save 进行下载安装，也可以直接去 GitHub下载源码~
- 其次我们需要定义两个方法 ，分别是用于加密和解密，这里我将它放在了 utils 文件夹下，命名为 secret.js ，其具体代码如下：
```js
const CryptoJS = require('crypto-js');  //引用AES源码js
    
    const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
    const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量
    
    //解密方法
    function Decrypt(word) {
        let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
    
    //加密方法
    function Encrypt(word) {
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.ciphertext.toString().toUpperCase();
    }
    
    export default {
        Decrypt ,
        Encrypt
    }
```
- 上面的代码中的 key 是密钥 ，iv 是密钥偏移量，这个一般是接口返回的，为了方便，我们这里就直接在这里定义了。