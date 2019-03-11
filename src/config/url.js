/**
 * url配置
 * **/
import GLOBAl from '@/config/global'
//const _HOST_="http://api.jm.com/"
//const _HOST_="http://192.168.2.236/"
const _HOST_="http://www.paishowtong.com/"
const url={

  //登录
 // "login":_HOST_+"Account/User/loginByMobile",
  "login":_HOST_+"?r=item/housinginfo/SearchTwoHouse&page=1&page_length=10&sort_type=&sort_order=",
  //获取token
  "getToken":_HOST_+"Account/User/loginByTemporary",
  //注册
  "register":_HOST_+"",
  //获取验证码
  "getCode":_HOST_+"Helper/Sms/sendMobileCode",

}
export default url
