### ssh 免密登录

- 配置别名
  在`~/.ssh/config`里面追加以下内容
  ```vi
  HOST name
    HostName ip
    User root
    Port 22
  ```
  这样，在 ssh 连接远程服务的时候直接输入`ssh name`即可
- 免密登录
  - 配置公钥
    - 执行`ssh-keygen`,一路回车即可
  - 上传公钥到服务器
    - 执行`ssh-copy-id -p port user@remote`，可以让远程服务器记住公钥
    - 执行`ssh-copy-id -i .ssh/id_rsa.pub user@remote`，可以让远程服务器记住公钥




scp -P 9777 -r root@121.42.232.105:/data/www/lighttpd/bmwcodingweb_humanupdaterule_online/resources /Users/wangchaoqun/project/bmwcoding