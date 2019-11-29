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



    所有待完成项

    在线复核详情 （对应跳转到哪个详情）添加作废弹框(接口对接)
    执行进度 超时文字颜色
    经销商一览  输入时需要验证是否存在
    路线上传 列表按钮是否展示 执行日期是否为必选条件

    路线列表  发送和样本状态筛选条件

    


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

## 2019-11-04
本周工作：
- 蜂巢1.8开发PC端
  - 用户一览  (对接完成)
  - 区域管理 （对接完成）
  - 逻辑设置 （等待对接）
  - 复核校验 （等待对接）


1. 后台权限去除详情页 
    1.1. 将详情路由移除权限设置
2. 两个作废列表分别放在相应权限以作区分
3. 去除掉冗余代码
4. UI样式遵从设计稿
5. 项目配额增加 - 减号


蜂巢 v1.8 开发
用户一览+ 用户详情 0.5
区域管理 0.5
问卷编辑 0.5
常规设置 0.5
逻辑设置 4
在线复核 5
微信调查问卷工时 5
微信端 

在线复核页面
  1）涉及的 "题目跳转" 的逻辑为 “跳转” ,前端交互是否为直接滚动到相应题目
  2）涉及的 "题目跳转" 的逻辑为 “隐藏” ,前端交互是否为全部展示
  3）涉及的 "题目跳转" 的逻辑为 “显示” ,前端交互是否为全部展示, 如果为展示，那么这个显示的跳转关系有何意义
  4）涉及的 "填空题限制"  原型 "填空题限制：某一个题目或某几个题目选中某个选项时，某个填空题填写的数字有限制", 而下图确是 某一个题目选中某个选项时，某一个题目或某几个题目填空题填写的数字有限制, 请再次确认清楚
在线复核时 如果逻辑关系更新, 复核页面逻辑设置是否更新, 假如需要更新的话，此时复核员已复核了很多题目,是否需要全部重新复核。
定时保存 如果逻辑关系更新, 复核页面逻辑设置是否更新。

切换选项  
  获取相应题的id

用户一览导出接口
官网后台相关页面

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



上线时检查  所有接口加projectID


## 2019-11-21
本周工作：
1. 蜂巢PC端答题逻辑对接

下周工作计划
1. 蜂巢复核问卷对接

去掉忘记密码功能 
cookie


o_is_disabled 是否禁用  true 禁用 false可选
填空题提示
选项显示  
    单选题   
    多选题


  