1. 添加链接  
[超链接名](超链接地址 "超链接title")
title可加可不加

例如：

> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。

#### 表格

**Markdown　Extra**　表格语法：

项目 | 价格
-------- | ---
iPhone | $560
iPad | $780
iMac | $1000

可以使用冒号来定义对齐方式：

| 项目 | 价格 | 数量 |
| :-------- | --------:| :--: |
| iPhone | 6000 元 | 5 |
| iPad | 3800 元 | 12 |
| iMac | 10000 元 | 234 |

pc端：
项目设置:
  经销商列表 0.5
  两个批量导入 1
  经销商配额 0.5
  项目配额+ 路线提醒 0.5
项目管理：
  ❌执行进度 + 复核进度 0.5
  ❌作废列表 0.5
  ❌消息列表 0.5
路线管理:
  路线上传 0.5
评估员：
  任务列表 + 掉线列表 0.5
执行管理
  ❌掉线管理 0.5
智能复核：
  在线复核 0.5
  ❌作废列表 0.5
❌消息提醒 1
❌各种详情 1
app端：
我的任务、问卷作答、出店完成 ：1天; 
出店信息、掉线填写：1天
总计 10.5

开发新增路由设置
 项目设置 /setting
    经销商列表 /setting/dealerList
    批量导入 /setting/dealerUpload
    经销商配额 /setting/dealerQuota
    项目配额 /setting/projectQuota
    项目规则 /setting/rules
 项目管理 /manage
    执行进度 /manage/perform
    复核进度 /manage/check
    作废列表 /manage/invalid
 路线管理 /line
    路线上传 line/list
    批量导入 line/upload
 执行管理（已经存在）
    掉线列表 /perform/dropsList
    掉线管理 /perform/dropsManage
 智能复核 （已经存在）
    作废列表 /check/invalidList
 消息列表 /message

    样本详情 /check/detailCheck  --> /manage/perform ； /manage/check ；/perform/informationList； /perform/schedule；  /check/superSchedule； chekck/schedule
    掉线详情 /check/detailError --> /manage/perform ； /manage/check； /perform/schedule； /check/superSchedule
    作废详情 /perform/informationDetail --> /manage/perform ； /manage/check； /perform/schedule； /check/superSchedule； chekck/schedule

学习计划

react
typeScript
fullter
vue
基础知识
算法

    ‘home/execmanager/execsupervisor/detail’ 'home/execmanager/rechecksupervisor/detail' /home/assessor/task/detail        /home/execsupervisor/task/detail  'home/rechecksupervisor/task/detail'  /home/auditor/task/detail`
正常  项目管理执行进度 ；                       项目管理复核进度 ；                             执行管理任务列表；                   执行管理执行进度；                   分配复核                               在线复核


掉线  项目管理执行进度 ；                       项目管理复核进度 ；                                                               执行管理执行进度；                   分配复核


作废 项目管理执行进度 ；                        项目管理复核进度 ；                                                               执行管理执行进度；                   分配复核                               在线复核

'home/${}/detail'



添加一个作废 url


exception_type字段对应值（1:正常 2:掉线 3:作废）


蜂巢任务总结
❓
Q1: 修改左侧菜单
```js
computed: {
  parentPath () {
    const { matched } = this.$route
    // console.log(this.$route, this.$store.state.currentRoute)
    // const auths = this.$store.state.routeAuth
    // const { parent_id } = auths.find(item => item.front_uri === path) || {}
    // if (parent_id) {
    //   const parent = auths.find(item => item.id === parent_id) || {}
    //   return parent.front_uri
    // }
    return matched[1].path
  }
}
```
R: 时间允许且自己主观意愿可以不断优化代码，极简主义适用于编程

Q2: 页面权限问题
   因为旧版本中某一个页面存在详情,因此路由写在某个模块下,项目改版后多个页面引用详情的路由，和后台控制路由权限产生冲突
R: 对项目代码不清晰,只是针对部分功能,不了解各模块之间的耦合,导致问题出现

Q3: ele组件
    1） 省市级联（后台不给传id进行匹配）只能自己拼;
    2） select传值不稳定，一会是label一会是id, 因为获取详情时后台返回的是label字符串

Q4: 在线复核页面 可能是缓存出现问题，
    1）列表页面如果设置keepalive 那么它的子页面也需要设置缓存，否则上个页面失效
    2）同时为了避免
  ```js
  beforeRouteLeave (to, from, next) {
    if (to.name === 'schedule') {
      if (!to.meta.keepAlive) {
        to.meta.keepAlive = true
      }
      this.$destroy()
      next()
    }
  },
  ```
  R: 熟悉生命周期

Q5: 由于第四个问题，那么详情页面会出现缓存, 另一种解决办法就是
```js
import cloneDeep from 'lodash/cloneDeep'
this.informationInfo[index].inputValue = cloneDeep(item)
```
R: 了解克隆相关问题

Q6: 对接接口重复/错误
    1） 前期后台不急 后期时间紧张导致未写文档 直接微信发接口
    2） 没有数据可以测试
    3） 测试流程不清楚
    4） 请后台都没有认真测试
    5） 看图说话
    
Q7: 分支命名不清晰，li il，单词习惯性写错看不出来（这条和眼神挂钩）

Q8: 好书分享《指数基金投资指南》



show:
logicMap: [
        {
          reason: [
            {
              question_id: '',
              queston_option_id: '',
              question_selected_id: 0,
              logic_id: 0
            }
          ],
          result: [
            {
              question_id: '',
              queston_option_id: '',
              question_selected_id: 0,
              logic_id: 0
            }
          ]
        }
      ],

jump:
 reason: [
            {
              question_id: '',
              queston_option_id: '',
              question_selected_id: 0,
              logic_id: 0
            }
          ],
          result: [
            {
              question_id: '',
              queston_option_id: '',
              question_selected_id: 0,
              logic_id: 0
            }
          ]
num: 

reason: [
            {
              question_id: '0',
              queston_option_id: 0,
              condition_id: 0,
              number_id: 0,
              logic_id: 0
            }
          ],
          result: [
            {
              question_id: '0',
              queston_option_id: 0,
              question_selected_id: 0,
              logic_id: 0
            }
          ]
          
          
blank:           
          
          reason: [
            {
              question_id: '',
              queston_option_id: '',
              question_selected_id: 0,
              logic_id: 0
            }
          ],
          result: [
            {
              question_id: '',
              condition_id: 0,
              number: 50,
              logic_id: 0
            }
          ]


总 ： 

logicMap: [
        {
          reason: [ // 条件
            {
              question_id: '', // 题目id
              queston_option_id: '', // 选项id
              question_selected_id: 0, // 是否选中id
              logic_id: 0, // 逻辑id（且或）
              condition_id: 0, // 条件id（<= != >= == > <）
              number_id: 0, // 数量id (一个 两个 ...)
            }
          ],
          result: [ // 结果
            {
              question_id: '', // 题目id
              queston_option_id: '', // 选项id
              question_selected_id: 0, // 是否选中id
              logic_id: 0, // 逻辑id（且/或/跳转/显示/隐藏）
              number: 50, // 填空题字数限制
            }
          ]
        }
      ],





## 2019-11-21
本周工作：
1. 蜂巢PC端答题逻辑对接

下周工作计划
1. 蜂巢复核问卷对接



o_is_disabled 是否禁用  true 禁用 false可选

    相关函数线要捋清楚， 因为添加一个新的功能，可能会对以前的产生影响，对于新的业务比较复杂的功能尝试思维导图



  不能将前期规划省略且直接投入到开发过程中去（不要算入工时）
  针对复杂的一些逻辑设置规则，提前应该有一个穷举的过程， 初始需求应该在理论上是对的
  产品要有开发思想不能只看到结果忽略到细节以为很简单（你以为改了一块其实全改了），可以自己在脑海里按照数学逻辑思考流程；同时开发也应该有产品的思想（你以为很简单其实只有你想不到），在开发过程中辩证的看待产品的业务逻辑不合理的地方及时提出来。避免留坑
  前期工作松散后期紧张时间分配不合理（这过程中后台要处理好多其他项目的业务）
  所有东西要形成文档，不是说改就改的，
  不明确的需求应该及时求证，然后前后端敲死，（这个过程要深入讨论集思广益避免之后有漏洞再改）
  代码方面牵一发动全身（以为上一点的坑影响了其他的）
  信息不通畅小组间更改环节要共享，不要做重复性的工作，实现共同富裕不加班
  虽然有总的测试，但是很难保证自己的理解和业务逻辑是否有出入，每周的会议应该show一下自己写完的部分，和产品捋一遍，不要把问题留到最后早发现早解决


  蜂巢v1.9
  项目代码----项目编号；项目名称----项目代号；项目归属----执行方 ；区域----属地（代理：代理商）
  用户一览（根据账号权限不同，创建账号不同，批量导入呢？ 增加为权限下的，那查看的是否也有全部）
   去掉 邮箱
   增加 业务类型 角色

  项目管理
    项目一览 + 业务模式（业务类型）项目归属（执行方）
            - 创建时间去掉
            
    项目详情
          + 项目编号（项目代码）
            项目名称 （项目代号）
          任务管理（重置答题改哪里）
            经销商简称加粗 ？
    新增项目--》 项目成员全改？

 角色设置 展示形式？

（大家来找茬）
项目+ 礼金管理员
 项目一览  启动/结束
出发中心
  项目一览  查看进度
复核管理员
  项目一览  复核进度
部门+项目总监
  项目一览  复核进度 + 执行进度？ 

代理管理员 和 触发中心管理员 属地管理写成一样的了
且上述两者 项目详情不可修改？

在线申诉
仲裁列表点进来是和 在线复核一样是整套问卷？ 如何触发仲裁动作

在线复核 销售顾问触发什么
        是否修改 触发什么逻辑
        添加图片影响加载速度 整体需要优化

76000
78000
57000

V1.9 开发进度手册  仔细 认真梳理流程 今日事今日毕

一阶段：
1）后台 （用户一览 + 项目一览）
      问卷一览
      用户一览接口参数修改
      用户详情接口

2）整理前台管理员权限区别  qc-icon-project qc-icon-home

用户一览关于新增的修改的操作 仅限于 以下几种写死的权限

项目一览

   角色                           功能菜单

  项目(1) + 礼金管理员(2)   111         项目管理（全） 
   
  出发中心管理员(3)  112                用户管理（全）
                                  项目一览 去掉新增；操作改成查看进度
                                  项目详情 基本信息不可更改 ； 项目成员（全）； 去掉任务管理

  代理管理员(4)  113                   用户管理 （全）
                                  <!-- 属地管理 -->
                                  项目一览 去掉新增 操作改成查看执行进度
                                  项目详情 基本信息不可更改 ； 项目成员（全）； 去掉任务管理

  复核管理员(5) 114                    用户管理（全）
                                  项目一览 去掉新增；操作改成复核进度；复核进度去掉 分配 解锁 锁定 加入导入图片
                                  项目详情 基本信息不可更改 ； 项目成员（全）； 去掉任务管理
                                  
  
  部门项目总监(6)   101 102                项目一览 去掉新增；操作跳转到执行进度和复核进度（去掉 分配 解锁 锁定 加入导入图片）
                                  项目详情 基本信息不可更改 ； 项目成员去掉新增和修改； 去掉任务管理
                                  


  将整个后台两部分对接好，
  移植到前台 
  换接口 
  加路由
  针对每个页面通过权限参数 穷举会有哪些功能

二阶段：
  将原有题型文件复制一份 （用来写，明检相关工作）
  各种类型的 添加查看图片功能
    整合到明检的在线复核 + 在线申诉
    以下所有都用 chekcItemDetail 通过参数判断是否为详情
    整合到仲裁页面 + 特殊案例审核页面
    整合到 仲裁详情 + 特殊案例详情 + 申诉详情

  问卷配额列表
  问卷异常
  项目黑名单

sgy: 
我用的qctest2域名配好了  http://qctest2.zebra-c.com/    目录：/data/www/lighttpd/qc_sgy
qctest4 /data/www/lighttpd/qc_xjm
OUTPUT_DIR=../../../public/static
VIEWS_PATH=../../views
VUE_APP_NAME=蜂巢智能平台
VUE_APP_PROXY_SIGN=/api
VUE_APP_PROXY_RUL=http://qctest.zebra-c.com

VUE_APP_PROXY_API_URL=http://qctest.zebra-c.com
VUE_APP_PROXY_API_SIGN=/api

VUE_APP_PROXY_MOCK_URL=http://127.0.0.1:300
VUE_APP_PROXY_MOCK_SIGN=/mock


新添加路由
    项目管理 --》 项目进度
    问卷配额 /manage/qoutaList
    问卷异常 /manage/unusual
    仲裁列表 /manage/arbitrationList
    特殊案例列表 /manage/specialList

    仲裁/详情/manage/arbitration todo 根据路由和type区分
    特殊案例/详情/manage/special  todo 根据路由和type区分

    在线复核 /check/lightonline
    在线申诉 /perform/complaintList
    申诉列表 /perform/complaint
    申诉详情页 /perform/complaint/detail todo 根据路由


    添加项目一览进入的标示，type = project project = 2
    梳理项目一览点进去的路由
      导出执行进度 
      执行进度一览
      样本详情

      导出复核进度
      导出复核结果
      导出图片
      复核进度一览
      审核状态和相关审核员 列表
      样本详情


2 3.5 4 1.5 0.5  1   12.5



新建项目 添加项目人员
前台上产经销商列表

路线排华员 13155555555 上传路线 点击发送
移动端登陆相关 评估员进行答题 13030087555
创建问卷 发布问卷




新建项目提交按钮突出

可以搜索角色

新建项目问卷的时候 也要添加type

照片不是该评估员拍的


zebra_admin_test
1234567
git@zgit.zebra-c.com:frontend/php/datastone.git

