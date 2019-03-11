/**
 * 用户的数据
 * **/
import quickos from "@/assets/quickos"
import url from "@/config/url"
const userModel={
  //登录
  "login":function(username,yzm,cb)
  {
    var callback=cb
    quickos.api.post(url.login,{"mobile":username,"mobile_code":yzm},function(ret,err)
    {
      localStorage["access_token"]=ret.data["access_token"]
      localStorage["im_token"]=ret.data["im_token"]
      callback(ret,err)
    },arguments[arguments.length-1])
  },
  //获取验证码
  'getCode':function(mobile,token,cb)
  {
    var callback=cb,
        urls=url.getCode+"?mobile="+mobile+"&jwt="+token
    quickos.api.get(urls,function(ret,err)
    {
      callback(ret,err)
    })
  },
  //注册
  "register":function(param,cb)
  {
    var callback=cb
    quickos.api.post(url.login,param,function(ret,err)
    {
      callback(ret,err)
    },arguments[arguments.length-1])
  },
  //获取token
  "getToken":function(cb)
  {
    var callback=cb;
     quickos.api.post(url.getToken,{},function(ret,err)
     {
        localStorage["temp_token"]=ret.data.data["access_token"];
        callback(ret,err)
     },arguments[arguments.length-1])
  }
}
export default userModel
