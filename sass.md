# sass 安装需要 ruby

#========== win 安装 sass ==========
# 官网下载 ruby 
  http://rubyinstaller.org/downloads/
# 安装 sass 
  gem install sass
# 如果直接安装不行，也可以切换 source[参考 mac 安装 sass]


#========== mac 安装 sass ==========
# 先安装 rvm
  curl -L https://get.rvm.io | bash -s stable

# 检查 rvm 版本
# 使用 source 指令，初始化环境变量，然后使用 rvm -v检查安装版本，如果不用 source 的话，直接关闭重启 cmd[终端] 也可以
  source ~/.rvm/scripts/rvm
  rvm -v

# 安装 ruby，若不写 2.1.1 版本，则是默认安装最新版本，需要一定时间
  sudo rvm install [2.1.1]
# 安装完成之后，如果是多版本，使用下面指令，设置默认的 ruby 版本
  rvm 2.1.1 --default
# 使用 gem -v 查询 ruby 版本
  gem -v

# 查询当前所有版本 rvm list known
# 查询当前安装的版本 rvm list
# 删除某一个版本 rvm remove 2.1.1

# 使用下面的语句，把 ruby 数据源从 rubygems 切换成淘宝的，防止被墙
  gem source -a https://ruby.taobao.org
  gem source --remove https://rubygems.org/

# gem source -l 查询数据源

# 安装 sass
  [sudo] gem install sass
# sass -v 查看 sass 版本