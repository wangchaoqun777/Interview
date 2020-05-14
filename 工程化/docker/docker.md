#### why? 
  - Docker 容器的启动可以在秒级实现，Docker 对系统资源的利用率很高，一台主机上可以同时运行数千个 Docker 容器。
  - 安装 
    1、安装依赖

      docker依赖于系统的一些必要的工具，可以提前安装。

      yum install -y yum-utils device-mapper-persistent-data lvm2

    2、添加软件源

      yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

    3、安装docker-ce

      yum clean all
      yum makecache fast
      yum -y install docker-ce

    4、启动服务

      通过systemctl启动服务

      systemctl start docker

    5、查看安装版本

      这样子就安装成功了，启动服务以后可以使用docker version查看一下当前的版本。

      docker version