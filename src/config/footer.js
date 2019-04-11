/**
 * 首页底部导航配置
 * **/
const footerTabData=[
  {
    name:"职位",
    url:"/main/position-list",
    icon:require("../assets/image/logo-zhang.png"),
    iconactive:require("../assets/image/logo-zhang-active.png"),
    isImg:true
  },
  {
    name:"笔试",
    url:"/main/test-list",
    icon:"cui-icon-editor",
    isImg:false
  },
  {
    name:"公司",
    url:"/main/company-list",
    icon:"cui-icon-tasklist",
    isImg:false
  },
  {
    name:"我的",
    url:"/main/UserCenter",
    icon:"cui-icon-people",
    isImg:false
  },
]
export default footerTabData
