# 安装 mongodb
# mac 
  # 运行 brew update
  # 确定完成之后 brew install mongodb

# window 
  # 下载 exe 或者镜像，双击，该咋咋地

# 下载可视化工具
  http://docs.mongodb.org/ecosystem/tools/administration-interfaces/
  上面列表有多种工具，随便下一种，推荐 Robomongo



# mac 安装2
# 安装
  brew install mongodb --with-openssl

# 异常：98 Unable to create/open lock file: /data/db/mongod.lock errno:13
# 设置 /data 操作权限，data 是 mongodb 存储数据的文件夹  
  sudo chown -R  当前登录的用户名 /data

# 入门指令
# 创建/切换数据库
  use dbname
# 新增表
  db.createCollection("tableName")
  或者直接 db.tableName.insert({ "key": "value" })
# 查看所有表
  show collections

以下以 Account 表为例子
# 参照 http://www.cnblogs.com/libingql/archive/2011/06/09/2076440.html
查询聚集中字段的不同记录

> db.Account.distinct("UserName")
--SELECT DISTINCT("UserName")  FROM Account

 

 查询聚集中UserName包含“keyword”关键字的记录

db.Account.find({"UserName":/keyword/})
 --SELECT * FROM Account WHERE UserName LIKE '%keyword%'

 

查询聚集中UserName以"keyword" 开头的记录

> db.Account.find({"UserName":/^keyword/})
--SELECT * FROM Account WHERE UserName LIKE 'keyword%'

 

查询聚集中UserName以“keyword”结尾的记录

> db.Account.find({"UserName":/keyword$/})
--SELECT * FROM Account WHERE UserName LIKE '%keyword' 

 

查询聚集中指定列

> db.Account.find({},{"UserName":1,"Email":1})    --1:true
--SELECT UserName,Email FROM Account

 

 查询聚集中排除指定列

> db.Account.find({},{"UserName":0})    --0:false
 

查询聚集中指定列，且Age > 20

> db.Account.find({"Age":{"$gt":20}},{"UserName":1,"Email":1})
--SELECT UserName,Email FROM Account WHERE Age > 20 

 

聚集中字段排序 

> db.Account.find().sort({"UserName":1}) -- 升序
> db.Account.find().sort({"UserName":-1}) --降序
--SELECT * FROM Account ORDER BY UserName ASC

--SELECT * FROM Account ORDER BY UserName DESC 

 

统计聚集中记录条数

> db.Account.find().count()
--SELECT COUNT(*) FROM Account 

 

统计聚集中符合条件的记录条数

> db.Account.find({"Age":{"$gt":20}}).count()
-- SELECT COUNT(*) FROM Account WHERE Age > 20

 

统计聚集中字段符合条件的记录条数

> db.Account.find({"UserName":{"$exists":true}}).count()
--SELECT COUNT(UserName) FROM Account 

 

查询聚集中前5条记录 

> db.Account.find().limit(5)
--SELECT TOP 5 * FROM Account 

 

查询聚集中第10条以后的记录

> db.Account.find().skip(10)
--SELECT * FROM Account WHERE AccountID NOT IN (SELECT TOP 10 AccountID FROM Account) 

 

查询聚集中第10条记录以后的5条记录

> db.Account.find().skip(10).limit(5)
--SELECT TOP 5 * FROM Account WHERE AccountID NOT IN (SELECT TOP 10 AccountID FROM Account)

 

or查询

> db.Account.find({"$or":[{"UserName":/keyword/},{"Email":/keyword/}]},{"UserName":true,"Email":true})
--SELECT UserName,Email FROM Account WHERE UserName LIKE '%keyword%' OR Email LIKE '%keyword%' 

 

添加新记录

> db.Account.insert({AccountID:2,UserName:"lb",Password:"1",Age:25,Email:"libing@163.com",RegisterDate:"2011-06-09 16:36:95"})

修改记录

> db.Account.update({"AccountID":1},{"$set":{"Age":27,"Email":"libingql@163.com"}})
> db.Account.find({"AccountID":1})
{ "AccountID" : 1, "Age" : 27, "Email" : "libingql@163.com", "Password" : "1", "RegisterDate" : "2011-06-09 16:31:25", "UserName" : "libing", "_id" : ObjectId("4df08553188e444d001a763a") }
 

> db.Account.update({"AccountID":1},{"$inc":{"Age":1}})
> db.Account.find({"AccountID":1})
{ "AccountID" : 1, "Age" : 28, "Email" : "libingql@163.com", "Password" : "1", "RegisterDate" : "2011-06-09 16:31:25", "UserName" : "libing", "_id" : ObjectId("4df08553188e444d001a763a") }
 

删除记录

> db.Account.remove({"AccountID":1}) --DELETE FROM Account WHERE AccountID = 1
 

> db.Account.remove({"UserName":"libing"}) --DELETE FROM Account WHERE UserName = 'libing'
 

> db.Account.remove({"Age":{$lt:20}}) --DELETE FROM Account WHERE Age < 20
> db.Account.remove({"Age":{$lte:20}}) --DELETE FROM Account WHERE Age <= 20
> db.Account.remove({"Age":{$gt:20}}) --DELETE FROM Account WHERE Age > 20
> db.Account.remove({"Age":{$gte:20}}) --DELETE FROM Account WHERE Age >= 20
> db.Account.remove({"Age":{$ne:20}}) --DELETE FROM Account WHERE Age != 20
 

> db.Account.remove()    --全部删除
> db.Account.remove({})  --全部删除