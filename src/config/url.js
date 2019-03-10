/**
 * url配置
 * **/
import GLOBAl from '@/config/global'
const _HOST_="/apis"
const url={
  //登录
  "login":_HOST_+"/mobile-user-sessions",
  //获取token
  "getToken":_HOST_+"/temporary-user-sessions",
  //注册
  "register":_HOST_+""
}
export default url
