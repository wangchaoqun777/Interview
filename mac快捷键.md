1. 打开相关文件夹 open .
2. 搜索 com + 空格
3. /private/etc/hosts
4. 查看相关目录 ls
5. 查看文件的内容 cat
6. clear 清空命令
7. cd ~ 回到根目录
8. mkdir
9. pwd 查看当前目录
10. sudo lsof -i :8080 查看端口占用
11. kill pid 关掉进程
12. 解压 rar unrar x \*\*.rar
13. com + shif + G 搜索文件
14. DNS刷新缓存 dscacheutil -flushcache

升级node 

1、sudo npm cache clean -f //清除nodejs的cache
2、sudo npm install -g n //使用npm安装n模块
3、npm view node versions // node所有版本
4、sudo n latest // 升级到最新版本

  sudo n stable // 升级到稳定版本

  sudo n xx.xx // 升级到具体版本号