# Git 
git是分布式版本控制系统。

gitHub是代码开源社区。

gitLab是可以做自己的代码平台的二次开发。

Mac上可以通过homebrew安装，也可以通过[git官网](https://git-scm.com)下载安装包安装

Windows可以通过下载官网安装包。

## Git 基础

### 初始化用户信息

当前用户所有仓库配置方式：
```shell
git config --global user.name 'your_name'
git config --global user.email 'your_email'
```

仅对某仓库用户信息配置方式：
```shell
git config --local user.name 'your_name'
git config --local user.email 'your_email'
```

对系统所有登录的用户配置：
```shell
git config --system user.name 'your_name'
git config --system user.email 'your_email'
```

优先级是local 大于 global，即如果当前设置了local，则优先使用local配置信息。



显示config的方式：

```shell
#获取相应作用域的全部配置信息
git config --global --list <--global>
#获取当个配置
git config --get user.name

#获取当前仓库的信息
git config --local --list
```



### 获取Git仓库

方式一：将未进行版本控制的本地目录转为Git仓库

> 通过进入当前目录文件夹，通过git初始化命令，创建本地Git仓库
>
> ```shell
> git init
> ```

方式二：从其他服务器clone一个仓库到本地

> 通过获取远程仓库的地址，将远程仓库clone到本地
>
> ```shell
> git clone <url>
> ```



### git常用操作命令

在git目录下的文件一共有两种状态：**已跟踪**或**未跟踪**。

已跟踪的文件是指被纳入版本控制管理的文件，即git已经知道的文件，这个文件的状态有:

- 未修改
- 已修改
- 暂存区

已跟踪文件以外的所有文件都属于未跟踪文件。

> 实际工作中，可以将修改过的文件存入**暂存区**，然后提交所有暂存的修改。

 

```shell
#查看当前仓库状态的命令:
git status

#简化当前仓库状态信息：
git status -s

#跟踪一个文件：
git add <文件或目录>

#重命名文件：
git mv <filename> <filename>

#查看修改文件前后对比
git diff <--staged/--cached>

#提交更新
git commit -m '说明提交内容'

#跳过暂存区直接提交
git commit -a 
git commit -a -m '说明内容'

#修改最近一次提交的commit描述内容
git commit --amend 

#修改commit历史内容,通过变基
git rebase -i xxxx(被修改commit信息的父级)

#整理过去commit，合并commit 选择策略
git rebase -i xxx(被修改最前面commit的父级)

#合并间隔的commit 调整commit顺序，将要合并的放在连续位置
git reabse -i xxxx

#上传内容到master 分支
git push origin master

#从git跟踪清单中移除某个文件(从暂存区中移除)
git rm <filename> #这样以后的修改不会出现在未跟踪的清单中

#只从暂存区中移除，文件扔保留在当前目录
git rm --cached <filename> #也不会跟踪修改内容

#删除之前修改或者已经存入暂存区的文件
git rm <filename> -f

#查看提交历史
git log -2
git log -p #显示提交变更内容
git log --stat #显示简略信息
git log --pretty=<online/short/full/fuller> #不同方式显示
git log --pretty=format:"%h %s" --graph #图形化显示

git log --oneline -n4 --graph

#取消暂存文件
git restore --staged <文件或路径>
git reset HARD <文件或路径>

git reset --hard HEAD或commitId #回复到头指针状态

#撤销文件修改（危险）
git checkout -- <file>

#查看所有远程仓库
git remote -v

#添加远程仓库
git remote add <shortname> <url>
git remote add weiloong git://git.xxxx.

#拉取数据但不合并
git fetch <remote>

#查看某个远程仓库信息
git remote show origin

#远程仓库重命名
git remote rename <oldname> <newname>

#移除远程仓库
git remote remove 

#暂存区与HEAD比较
git diff --cached

#暂存区与工作区比较
git diff

#分支之间比较
git diff 分支名或分支commit  分支名或分支commit

#删除文件
git rm filename

#临时存储分支上修改的内容
git stash
git stash pop
git stash apply
git stash list

```



对于仓库中需要忽略的文件，可以通过文件设置.gitignore，文件忽略的格式规则：

- 空行或以#开头的都会被Git忽略
- 可以使用glob模式匹配
- 匹配模式可以以/开头和结尾
- 要忽略指定模式以外的文件或目录，可以在模式前加！取反

```shell
# 忽略所以有 .a文件
*.a
#但跟踪所有lib.a，即使设了忽略.a文件
！lib.a
#只忽略当前目录下的的todo文件
/todo
#忽略任何目录下build的文件夹
build/
#忽略doc/note.txt 但不忽略doc/server/note.txt
doc/*.txt
#忽略doc目录下的所有以.pdf结尾的文件
doc/**/*.pdf
```



### 标签

**标签**用来表示重要节点或里程碑

标签分为轻标签和附注标签

```shell
#轻标签
git tag v1.4-lw
#附注标签
git tag -a v1.4 -m '说明内容'
#查看标签信息
git show v1.4

#对提交历史打标签
git tag -a v1.0 <记录hash值>

#删除标签
git tag -d <tagname>
```



默认情况下不会将本地的标签同步到远程仓库上，需要显示推送标签

```shell
#单标签推送
git push origin <tagname>
#多个标签同时推送
git push origin --tags

#删除远程标签
git push <remote>:refs/tags/<tagname>
git push origin --delete <tagname>
```



**检出标签**是查看标签所指向的文件版本。

```shell
git checkout <tagname> #有副作用，导致分离头指针的状态下，提交不属于任何分支并将无法访问
```

一般情况下，通过创建新分支

```shell
git checkout -b <branchname> <tagname>
```



可以通过alias设置git 命令的别名



## Git 分支

Git分支，本质上仅仅是指向提交对象的可变指针。默认分支为master.

git有特殊指针HEAD，用于**指向当前所在的本地分支**。

```shell
#创建分支
git branch <branch_name>

#切换分支
git checkout <branch_name>

#创建并切换分支
git checkout -b <branch_name>

#查看提交历史、各个项目的分支情况
git log --oneline --decorate --graph --all

#查看每个分支最后一次提交
git branch -v

#过滤列表中已经合并或尚未合并到当前分支的分支
git branch --merged/--no-merged

#删除分支
git branch -d <branch_name>
```



### 远程分支

远程引用是对远程仓库的引用（指针），包括分支、标签等。

```shell
#显示查看远程引用的列表
git ls-remote <remote>
git ls-remote origin

#获取远程分支的更多信息
git remote show <remote>
git remote show origin

#与远程仓库同步数据，
git fetch <remote>
git fetch origin #查找origin是哪个服务器，抓取本地没有的数据，并更新本地数据，移动指针到更新后的位置

#更新远程分支到本地
git remote update origin --prune

#创建分支并跟踪远程的分支
git checkout -b <branch_name> <remote>/<branch>
git checkout --track origin/serverfix

#设置已有的本地分支跟踪一个远程拉下来的分支，或修改正在跟踪的上游分支
git branch -u origin/master
git branch --set-upstream-to origin/master

#查看设置的所有跟踪分支
git branch -vv

#删除远程分支
git push origin --delete <remote>

#备份仓库
git clone --bare file://xxxx目录/.git  zhineng.git #bare不带工作区

git remote add 本地仓库 远端仓库

git push --set-upstream xxxx  xxxx

```

> origin 是当运行git clone时默认的远程仓库的名字。
>
> 若git clone -o weiloong，那默认远程分支的名字将是weiloong/master



### 变基

git中整合来自不同分支的方法：merge和rebase

可以使用 rebase 命令将提交到某一分支上的所有修改都移至另一分支上

```shell
#变基到master上
git checkout experiment
git rebase master

#取出 client 分支，找出它从 server 分支分歧之后的补丁， 然后把这些补丁在 master 分支上重放一遍，让 client 看起来像直接基于 master 修改一样
git rebase --onto master server client
git checkout master
git merge client

#决定将 server 分支中的修改也整合进来
git rebase master server
git checkout master
git merge server
```

变基准则：**如果提交存在于你的仓库之外，而别人可能基于这些提交进行开发，那么不要执行变基**

变基操作的实质是丢弃一些现有的提交，然后相应地新建一些内容一样但实际上不同的提交



**查看网页版命令文档**

```shell
git help --web git
```



命令查看git 类型、内容

```shell
git cat-file -t bcd972fd4
git cat-file -p bcd972fd4
```



git 三大类型 commit、tree、blob之间关系

commit -> tree -> blob



### 分离头指针

```shell
git checkout xxxxx; #此时头指针指向此commit， 如果现在直接切换到其他分支，将导致修改不会保存
git checkout master;#现在要找回前面的修改，可以新建分支 git checkout <new-branch> xxxxx

#HEAD指针不执行分支或tag，修改内容在将来是不会纳入管理保存的。
```


