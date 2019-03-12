/**
 * 用户的数据
 * **/
import $http from "@/util/axios-ajax"
import url from "@/config/url"
const userModel={
  //登录
  "login":function(username,yzm,cb)
  {
    var callback=cb
    $http.post(url.login,{"mobile":username,"mobile_code":yzm},function(ret,err)
    {
      callback(ret,err)
    })
  },
  //获取验证码
  'getCode':function(mobile,token,cb)
  {
    var callback=cb,
        urls=url.getCode+"?mobile="+mobile+"&jwt="+token
    $http.get(urls,function(ret,err)
    {
      callback(ret,err)
    })
  },
  //注册
  "register":function(param,cb)
  {
    var callback=cb
    $http.post(url.login,param,function(ret,err)
    {
      callback(ret,err)
    })
  },
  //获取token
  "getToken":function(cb)
  {
    var callback=cb;
    $http.post(url.getToken,{},function(ret,err)
     {
        callback(ret,err)
     })
  }
}
export default userModel
