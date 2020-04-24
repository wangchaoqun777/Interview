1. 退出 merge git merge --abort
2. 回滚 merge git reset --hard commitID
3. git branch -av 查看所有分支
4. commit 信息
   feat 新增一个功能
   fix 修复了一个 bug
   docs 文档变更
   style 代码格式（不影响功能）
   refactor 代码重构
   perf 改善性能
   test 测试
   build 变更项目构建或者外部依赖
   ci 更改持续集成软件的配置文件
   chore 变更构建流程或者辅助工具
   revert 代码回退

5. git chekout - 切换到上一个分支

6. git branch -av 查看所有分支

7. 切换远程仓库
   修改; git remote set-url origin url

先删后加
git remote rm origin
git remote add origin git@**\*\***
