/**
 * 用户的数据
 * **/
import quickos from "@/assets/quickos"
import url from "@/config/url"
const userModel={
  //登录
  "login":function(username,password,cb)
  {
    var callback=cb,
        router=arguments&&arguments[arguments.length-1]&&arguments[arguments.length-1].constructor.name==="VueRouter"?arguments[arguments.length-1]:null;
    quickos.api.post(url.login,{username:username,password:password},function(ret,err)
    {
      callback(ret,err)
    },router)
  },
  //注册
  "register":function(param,cb)
  {
    var callback=cb
    quickos.api.post(url.login,param,function(ret,err)
    {
      callback(ret,err)
    })
  },
  //获取token
  "getToken":function(cb)
  {
    var callback=cb;
     quickos.api.post(url.getToken,{},function(ret,err)
     {
        localStorage["token"]=ret.data.data["access_token"];
        callback(ret,err)
     })
  }
}
export default userModel
