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

8. 拉取主分支代码
   git pull origin master

9. 修改分支名，不影响当前开发
   git branch -m <oldbranchname> <newbranchname>

10. 本地工作区文件恢复
    git checkout <filename/diranme>

11. 已将更改提交到本地，需要撤回提交 (撤销了 commit)
    git reset --soft HEAD~1

12. 用新的更改替换撤回的更改 (撤销了 commit 和 add)
    git reset --mixed HEAD~1

13. 本地提交了错误的文件
    git reset --hard HEAD~1

14. 撤销本地分支合并
    git revert <commit-id>


15. 版本回退
    git reset --hard **** 
    git log
    git push -f