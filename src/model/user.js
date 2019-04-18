/**
 * 用户的数据
 * **/
import $http from "@/util/axios-ajax"
import url from "@/config/url"
const userModel={
  //token test
  "tokentest":function(cb)
  {
    var callback=cb
    $http.post(url.token_test,{},function(ret,err)
    {
      callback(ret,err)
    })
  },
  //登录
  "login":function(username,yzm,cb)
  {
    var callback=cb
    $http.post(url.login,{"email":username,"code":yzm,"type":1},function(ret,err)
    {
      callback(ret,err)
    })
  },
  //获取验证码
  'getCode':function(email,cb)
  {
    var callback=cb,
        urls=url.getCode+"?email="+email
    $http.get(urls,function(ret,err)
    {
      callback(ret,err)
    })
  },
  //注册
  "register":function(param,cb)
  {
    var callback=cb
    $http.post(url.register,param,function(ret,err)
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
  },
  //获取用户信息
  "getUserInfo":function(cb)
  {
    let data={
      username:"flying0917",
      headerImg:"https://hbimg.huabanimg.com/d52b235b5f34f0e68d174a3349486b3df043adc313362-ALqwez_fw658",
      sex:"man"
    };
    cb(data)
  }
}
export default userModel
