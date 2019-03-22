/**
 * url配置
 * **/
import GLOBAl from '@/config/global'
//const _HOST_="http://api.jm.com/"
const _HOST_="http://localhost:3000/"
//const _HOST_="http://www.paishowtong.com/"
const url={

  //登录
   "login":_HOST_+"users/login",
  //"login":_HOST_+"?r=item/housinginfo/SearchTwoHouse&page=1&page_length=10&sort_type=&sort_order=",
  //获取token
  "getToken":_HOST_+"users/getEmailCode",
  //注册
  "register":_HOST_+"users/register",
  //获取验证码
  "getCode":_HOST_+"users/getEmailCode",
    //获取验证码
  "token_test":_HOST_+"users/token_test",

}
export default url
