# title
#
######  这里兼容低版本不存在 localStorage，用 cookie 代替
#
##  set
###### 设置storage
##  get
###### 获取storage
##  del
###### 删除某一个storage
##  clear
###### 清除所有storage
#
##  var storage = new Storage(module)
######  创建一个 storage 模块，用于在该模块上面做一些操作，例如：
######  storage.set     设置 storage 上面的本地缓存
######  storage.clear       清除在 storage 上的缓存
