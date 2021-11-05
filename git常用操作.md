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

    git push -f 强推

14. 撤销本地分支合并
    git revert <commit-id>


15. 版本回退
    git reset --hard **** 
    git log
    git push -f

16. 设置当前git仓库 对文件名大小写敏感
    git仓库根目录执行命令：
    git config core.ignorecase

17. git rebase 
    特别注意，只能在自己使用的 feature 分支上进行 rebase 操作，不允许在集成分支上进行 rebase，因为这种操作会修改集成分支的历史记录

18. git alias

    $ git config --global alias.co checkout
    $ git config --global alias.ci commit
    $ git config --global alias.br branch

    或者以下配置替换到 .gitconfig 文件里的 [alias] 所属的区域，然后就可以愉快的使用了~
    [alias]
    st = status -sb
    co = checkout
    br = branch
    mg = merge
    ci = commit
    ds = diff --staged
    dt = difftool
    mt = mergetool
    last = log -1 HEAD
    latest = for-each-ref --sort=-committerdate --format=\"%(committername)@%(refname:short) [%(committerdate:short)] %(contents)\"
    ls = log --pretty=format:\"%C(yellow)%h %C(blue)%ad %C(red)%d %C(reset)%s %C(green)[%cn]\" --decorate --date=short
    hist = log --pretty=format:\"%C(yellow)%h %C(red)%d %C(reset)%s %C(green)[%an] %C(blue)%ad\" --topo-order --graph --date=short
    type = cat-file -t
    dump = cat-file -p
    lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit

19. 打标签
    git tag -a v0.1.0 -m '完成了demo版本的开发'
    git push origin v0.1.0
