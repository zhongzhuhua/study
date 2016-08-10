====================================

apache 配置多端口项目

# 打开 httpd.conf[mac 使用指令 open /etc 打开 apache 安装目录 ， 在 apache2 中可以找到 httpd.conf]

# 找到 Include /private/etc/apache2/extra/httpd-vhosts.conf
  打开 vhosts.conf ,去掉注释就是打开

# 配置监听端口配置，找到 Listen 80，然后添加你要监听的端口
  如下，便是监听了 80 8010 8020 一共3个端口
  Listen 80
  Listen 8010
  Listen 8020

# 找到 <Directory "apache安装时自动填写的路径"> ，注意，各个系统配置的路径不一样
  添加一个配置项
  <Directory “改成你要监听的总目录，其他的所有要发布的项目，都在这个总目录之下">
    .. 这里是 apache 自带的东东
    
    # 我们添加的配置如下
    # 允许 vhosts.conf 覆盖 httpd.conf 的配置
    Allow from All
  </Directory>

# 此时，允许监听多端口的已经配置完毕
# 但是由于我们的多端口配置是 apache 安装完毕自动生成的，所以和我们想要的一般都是不一样的
# 打开 apache 下的 extra 目录，找到 http-vhosts.conf 文件，用来配置我们的监听项目

# 如下配置，则是配置了端口 80 和 8010 两个项目
# 其中，我们指定 serverName 是 localhost ，DocumentRoot 是对于的文件夹[windows 使用 *:/**** 即可]
  那么当我们在浏览器输入 lacalhost:80/*** 的时候，就会自动定位到配置好的 DocumentRoot 下的对应文件去

	<VirtualHost *:80>
    ServerAdmin 672986035@qq.com
    DocumentRoot "/Users/zhongzhuhua/ice/projs/webVue"
    ServerName localhost
    #ServerAlias www.dummy-host.example.com
    ErrorLog "/Users/zhongzhuhua/weblogs/80-error_log"
    CustomLog "/Users/zhongzhuhua/weblogs/80-access_log" common
	</VirtualHost>

	<VirtualHost *:8010>
    ServerAdmin 672986035@qq.com
    DocumentRoot "/Users/zhongzhuhua/ice/projs/webHtml"
    ServerName localhost
    #ServerAlias www.dummy-host.example.com
    ErrorLog "/Users/zhongzhuhua/weblogs/8010-error_log"
    CustomLog "/Users/zhongzhuhua/weblogs/8010-access_log" common
	</VirtualHost>


# 怎么修改 apache 服务器默认配置，进行网站优化
# 修改 httpd.conf  或者 为发布的网站添加 .htaccess 都可以

################# gzip 网站内容压缩

## 使用修改 httpd.conf 进行全站开启 gzip 压缩
## 找到 LoadModule deflate_module modules/mod_deflate.so 开启 mod_deflate
## 添加配置如下
## 校验开启是否成功，修改完成之后，重启 apache ，调试查看输出的脚本文件
   在 Response Headers 中找到 Content-Encoding 如果是 Content-Encoding: gzip 就是开启成功了

   <IfModule mod_deflate.c>
		# 是否所有文件都开启 gzip，默认不开启
		#SetOutputFilter DEFLATE

		# 配置 gzip 压缩比例，通常来讲，3-5 左右的压缩比例足够了，1-9 9压缩最多，压缩大了，会耗服务器cpu
		DeflateCompressionLevel 5

		# 配置需要 gzip 压缩的类型
		# 注意：由于图片一般都使用其他压缩的方式，这个时候如果使用 gzip ，压缩不大，且耗服务器处理速度，因此不建议压缩图片
		# 通常网站需要压缩的内容为 页面[html/php/asp之类]，脚本，文本，样式
		#AddOutputFilterByType DEFLATE text application/*javascript

		# 这个也是配置开启 gzip 的，通常推荐使用这个配置
		AddOutputFilter DEFLATE html xml php js css png gif jpg jpeg ico json

		# 配置不需要 gzip 压缩的类型，如果没有开启 setoutputfilter 则不用配置
		# 如下配置所有后缀 gif,jpe,jpeg,png 的都不要用 gzip
    #SetEnvIfNoCase Request_URI .(?:gif|jpe?g|png)$ no-gzip dont-vary

	</IfModule>

## 发布的网站文件夹下添加 .htaccess 文件，用户独立 apache 配置
## 使用修改 httpd.conf 进行全站开启 gzip 压缩
## 找到 LoadModule deflate_module modules/mod_deflate.so 开启 mod_deflate
## 添加配置如下，和前面的配置一样即可

	<ifmodule mod_deflate.c>
  	AddOutputFilter DEFLATE html xml php js css png gif jpg jpeg ico json
	</ifmodule>



################# 文件缓存

## 使用修改 httpd.conf 进行全站开启 gzip 压缩
## 找到 LoadModule headers_module libexec/apache2/mod_headers.so 开启 mod_headers

## 同样的，可以在 httpd.conf 和 .htaccess 中配置
## 配置文件如下

	<ifmodule mod_headers.c>
	  # html,php 页面不要缓存
	  <filesmatch "\.(html|php)$">
	  header set cache-control "max-age=0"
	  </filesmatch>

	  # css, js, swf类的文件缓存一个星期
	  <filesmatch "\.(css|js|swf)$">
	  header set cache-control "max-age=604800"
	  </filesmatch>

	  # jpg,gif,jpeg,png,ico,flv,pdf等文件缓存一年
	  <filesmatch "\.(ico|gif|jpg|jpeg|png|flv|pdf)$">
	  header set cache-control "max-age=604800"
	  </filesmatch>
	</ifmodule>
















