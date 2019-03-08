/**
 * 用户的数据
 * **/
import quickos from "@/assets/quickos"
import url from "@/config/url"
const userModel={
  //登录
  "login":function(username,password,cb)
  {
    var callback=cb
    quickos.api.post(url.login,{username:username,password:password},function(ret,err)
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
       if(ret.data&&ret.data.access_token)
        localStorage.setItem("token",ret.data.access_token);
        callback(ret,err)
     })
  }
}
export default userModel
