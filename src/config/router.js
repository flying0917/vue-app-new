/**
 * 路由配置
 * **/
import Login from '@/page/Login'
import Main from '@/page/main'
import Register from '@/page/Register'
import UserCenter from '@/page/UserCenter'
import Index from '@/page/Index'
import Im from '@/page/Im'
import Weixin from '@/page/Weixin-login'
import SelectSole from '@/page/SelectSole'
import UserInfo from '@/page/UserInfo-primary'
import UserInfo2 from '@/page/UserInfo-jobintension'
import UserInfo3 from '@/page/UserInfo-work'
import ErrorLoad from '@/page/Error-load'

const routes=[
  //默认入口
  {
    path: '/',
    component: Weixin
  },
  //登录页面
  {
    path: '/login',
    component: Login
  },
  //基本信息
  {
    path: '/userinfo-primary',
    component: UserInfo,
    meta:{
      requireAuth: true//登陆验证
    }
  },
  //加载失败
  {
    path: '/error-load',
    component: ErrorLoad
  },
  //求职意向
  {
    path: '/userinfo-jobintension',
    component: UserInfo2,
    meta:{
      requireAuth: true//登陆验证
    }
  },
  //工作经历
  {
    path: '/userinfo-work',
    component: UserInfo3,
    meta:{
      requireAuth: true//登陆验证
    }
  },
  //注册
  {
    path: '/register',
    component: Register
  },
  //微信登录
  {
    path: '/weixin',
    component: Weixin
  },
  //选择角色
  {
    path: '/SelectSole',
    component: SelectSole,
    meta:{
      requireAuth: true//登陆验证
    }
  },
  //主导航
  {
    path: '/main',
    component: Main,
    meta:{
      keepAlive:true,
    },
    children:[
      {
        path:"index",
        component:Index,
        meta:{
          keepAlive:false,
          index:1
        }
      },
      {
        path:"Im",
        component:Im,
        meta:{
          keepAlive:false,
          index:2
        }
      },
      {
        path:"UserCenter",
        component:UserCenter,
        meta:{
          keepAlive:false,
          index:3
        }
      },
    ]
  }
]

export default routes
