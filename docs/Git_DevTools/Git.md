# Git 

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
git config --list <--global>
#获取当个配置
git config --get user.name
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

#查看修改文件前后对比
git diff <--staged/--cached>

#提交更新
git commit -m '说明提交内容'

#跳过暂存区直接提交
git commit -a 
git commit -a -m '说明内容'

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

#取消暂存文件
git restore --staged <文件或路径>
git reset HARD <文件或路径>

#撤销文件修改（危险）
git checkout -- <file>

#查看所有远程仓库
git remote -v

#添加远程仓库(关联到远程仓库)
git remote add <shortname> <url>

#拉取数据但不合并
git fetch <remote>

#查看某个远程仓库信息
git remote show origin

#远程仓库重命名
git remote rename <oldname> <newname>

#移除远程仓库
git remote remove 
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



