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
  执行进度 + 复核进度 0.5
  作废列表 0.5
  消息列表 0.5
路线管理:
  路线上传 0.5
评估员：
  任务列表 + 掉线列表 0.5
执行管理
  掉线管理 0.5
智能复核：
  在线复核 0.5
  作废列表 0.5
消息提醒 1
各种详情 1
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


