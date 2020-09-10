#### why?

- Docker 容器的启动可以在秒级实现，Docker 对系统资源的利用率很高，一台主机上可以同时运行数千个 Docker 容器。
- 安装
  1、安装依赖

  docker 依赖于系统的一些必要的工具，可以提前安装。

  yum install -y yum-utils device-mapper-persistent-data lvm2

  2、添加软件源

  yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

  3、安装 docker-ce

  sudo yum install docker-ce docker-ce-cli containerd.io
  (containerd.io 报错时)手动下载并安装，下载地址：https://centos.pkgs.org/7/docker-ce-stable-x86_64/containerd.io-1.2.13-3.1.el7.x86_64.rpm.html

  4、启动服务

  service docker start

  5、查看安装版本

  这样子就安装成功了，启动服务以后可以使用 docker version 查看一下当前的版本。

  docker version

  6、查看 docker 是否启动
  systemctl status docker

7. 安装 docker-compose 命令行工具
   sudo wget -O /usr/local/bin/docker-compose https://github.com/docker/compose/releases/download/1.23.1/docker-compose-`uname -s`-`uname -m`

8. 增加权限
   sudo chmod +x /usr/local/bin/docker-compose

9. 测试安装成功
   docker-compose version




- 步骤
# 1. 更新软件库
yum update -y
# 2. 安装docker
yum install docker -y
# 3. 启动docker
service docker start
# 4. 停止docker服务
service docker stop
# 5. 重启docker
service docker restart 