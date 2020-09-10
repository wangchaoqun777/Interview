 1. 首先安装docker, 请参照docker安装步骤
 2. Docker搭建Jenkins
  - 查找jenkins的镜像 
    # docker search jenkins

  - 拉取新的镜像 
    # docker pull jenkins/jenkins:lts 

  - 启动jenkins镜像
    sudo docker run -d -u 0 --privileged  --name jenkins_node -p 49003:8080 -v /root/jenkins_node:/var/jenkins_home jenkins:latest
    # -d: 后台运行docker容器
    # -u 0:  指的是传入root账号ID，覆盖容器中内置的账号
    # --privileged  赋予最高权限
    # -name: 容器的名字
    # -p: 将容器的8080端口映射到宿主机的49003中
    # -v: /root/jenkins_node:/var/jenkins_home

  - 在本地浏览器输入localhost:49003查看jenkins的启动页面 
    # cat /root/jenkins_node/secrets/initialAdminPassword

  - 输入密码后安装插件

  - 插件安装完成新建用户

  - 进入管理界面
    # 系统管理 》 管理插件 》 可选插件 》 publish Over ssh 》 安装

  - 配置jenKins服务器
    # manage Jenkins 》 Configure System 》 Publis over SSH 》 Passphrase 》 SSH Serve

  - git源码管理
    # 输入任务名称
    # 源码管理 》 git 》 git仓库地址(Repository URL必须要http请求) + git用户名密码

  - gitlab 设置webhooks
    # Payload URL中http://+jenkins部署的ip和端口号+/github-webhook/
    # Content type中选择application/json
    # Which events would you like to trigger this webhook?选择just the push event
    # 选择Active

  - 构建环境
    sudo docker stop nodeapp || true \
    && sudo docker rm nodeapp || true \
    && cd /root/jenkins_node1/workspace/node  \
    && sudo docker build --rm --no-cache=true  -t node  - < Dockerfile \
    && sudo docker run -d --privileged=true --name nodeapp -p 3000:3000 -v /root/jenkins_node1/workspace/node:/home/project node
    - vue项目的构建
      cd /var/lib/jenkins/workspace/ceres-cms-vue
      npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
      npm install
      npm run build
      npm run pm2
      pm2 list

3. 思考如何落地
   - 是否完全分离
   - 测试服务器
   - 测试项目
   - 源码管理 ssh/账密