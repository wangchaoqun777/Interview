1. 右键 Finder 选择前往文件，输入: ~/.ssh,
2. 打开终端：输入 ssh-keygen -t rsa -C xxx@xxx.com 后回车
3. 查看密钥 cat id_rsa

   [参考 https://www.jianshu.com/p/17fa8d34beb2](https://www.jianshu.com/p/17fa8d34beb2)

   mac 每次升级后 xcode-select --install

4. 本地 git 如何关联两个不同的远程仓库

- 本地 git 仓库同时关联多个远程（或在已关联远程的基础上，再关联新的远程）---windows 下

      	- 说明：已关联的git远程：gitLab，需要关联的新远程：zgit

  - 步骤：

  1.  在新远程下（zgit）生成 ssh-key 密钥：
      ssh-keygen -o -t rsa -b 4096 -f ~/.ssh/id_rsa_outer -C 'shiguoying@zgit.zebra-c.com'
      （http://zgit.zebra-c.com中示例生成的密钥文件保存在名称为用户名（shiguoying）的目录下，可复制到.ssh/下）

  2.  id_rsa_outer.pub 中复制内容至 http://zgit.zebra-c.com/profile/keys 中，点击按钮“Add Key”，完成

  由于要关联多个远程，因此需要配置文件 config

  3.  在.ssh/目录下新建 config 文件（可通过命令：touch ~/.ssh/config 创建），写入内容

  # default

      	Host 192.168.11.206
      	HostName 192.168.11.206
      	User shiguoying
      	PreferredAuthentications publickey
      	IdentityFile ~/.ssh/id_rsa

      	# two
      	Host zgit.zebra-c.com
      	HostName zgit.zebra-c.com
      	User shiguoying
      	PreferredAuthentications publickey
      	IdentityFile ~/.ssh/id_rsa_outer

  由于最初只关联一个远程时，配置的用户信息基本都是全局的，因此要做调整

  4.  定位到本地具体项目路径下，运行如下命令：

  # 取消全局 用户名/邮箱 配置

      	git config –-global –-unset user.name
      	git config –-global –-unset user.email

      	# 单独设置每个项目  用户名/邮箱
      	git config user.email “shiguoying@zgit.zebra-c.com”
      	git config user.name “shiguoying”

      	（实际上全局用户信息不用取消，仅在所需项目下额外增加所需的用户信息即可）

5. 在新远程下建立 master 新分支，命令如下：

   # 必须和已经关联的旧远程（origin）做区分，此处采用的 origin_outer

   git remote add origin_outer git@zgit.zebra-c.com:shiguoying/qc.git

6. 把本地 master 分支推送至新远程，命令如下：
   git push -u origin_outer master

若要 clone 新远程的整个项目，全局用户信息必须配置成新远程的

此类情形可采用如下步骤：
在以上步骤 4 的基础上，
<1> 本地建立新目录 qc_new，运行命令 git init 初始化
<2> 关联新远程 master 分支：git branch --set-upstream-to=origin_outer/master master
<3> git pull 拉取该分支下内容

若回公司到岗后，采用内网 gitlab 时，只需运行命令：
git branch --set-upstream-to=origin/master master
把指定项目下分支切换回关联内网 git 即可

若是在本地新见指定项目仓库，不采用原有的，则执行步骤 1，2，4，5 即可

蜂巢神秘客 zgit.zebra-c.com 远程采用的

以上步骤 1~6 是经过实际操作验证的，后续的内容是分析得出的

git clone 报错 Git clone 时出现 Please make sure you have the correct access rights and the repository exists.问题已解决。
看了好多资料终于搞定了 git 中 clone 命令报错这个问题，废话不多说直接上步骤希望对大家有帮助。

1 删除.ssh 文件夹（直接搜索该文件夹）下的 known_hosts(手动删除即可，不需要 git）

2 在下载好的 Git 中的 bin 目录下打开 bash.exe 输入命令 ssh-keygen -t rsa -C "username" (注：username 为你 git 上的用户名)，如果执行成功。返回：

       Generating public/private rsa key pair.
       Enter file in which to save the key (/Users/username/.ssh/id_rsa): //这里的username是电脑上的用户名，这个地址也是文件的存储地址，然后我们按

      回车，如果你以前有存储地址会返回/Users/your username/.ssh/id_rsa already exists.Overwrite (y/n)?直接输入y回车。如果以前没有储存地址就会出现

      Enter passphrase(empty for no passphrase);也直接回车，两种情况回车后都会出现 Enter same passphrase again 然后接着回车会显示一长串内容其中

      还有一些..o.. o oo .oS. 之类的代码，这说明SSH key就已经生成了。文件目录就是：username/.ssh/id_rsa.pub.

3 然后找到系统自动在.ssh 文件夹下生成两个文件，id_rsa 和 id_rsa.pub，用记事本打开 id_rsa.pub 将全部的内容复制

    本地 192.168.12.117

    192.168.11.206 ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEApETCGy0aiKb56DyUvOxVn902tOWgc/mlruo7BdGYjWe+hgw4ACalYDw02P3Wt8rfBaSoJgTwvOIqVoOr3JdNHN5VQKMAJ3bghf4uW49eBEZvdSiE8g5w607IvMtaWzlVqnz1GKndORnBE5QrgEgxwknaVswQafFWCEIjET6UWtV2n35FxWE6EN8d2Dzm9qXHy6IYZI5MrrZyX7H5nY+Gh98dMYsiBJ/eqznBU6HENGie8U/EYbVUcfm6b2xf/yhZV+Vo5TPBz/exlkhwt+kMGUt0JScuXYPcDJbqU1+bIYHHmQYxyF1zBQ8O218YCMJ5F4/0Fc03BT+1F0gDqL3+Mw==


    ssh-copy-id -i ~/.ssh/id_rsa_hub.pub root@115.28.203.232  免密登录
