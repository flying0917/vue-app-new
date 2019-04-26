/**
 * 路由配置
 * **/
/*预加载 这里只能放导航的组件*/
import Main from '@/page/main'
import UserCenter from '@/page/UserCenter'
import TestList from '@/page/Test-list'
import CompanyList from '@/page/Company-list'
import PositionList from '@/page/position-list'
/*懒加载*/
const Login= () => import('@/page/Login'),
      Register= () => import('@/page/Register'),
      Index=() => import('@/page/Index'),
      Im= () => import('@/page/Im'),
      Weixin=() => import('@/page/Weixin-login'),
      SelectSole= () => import('@/page/SelectSole'),
      UserInfo= () => import('@/page/UserInfo-primary'),
      UserInfo2= () => import('@/page/UserInfo-jobintension'),
      UserInfo3= () => import('@/page/UserInfo-work'),
      ErrorLoad= () => import('@/page/Error-load'),
      JobChoice= () => import('@/page/Job-choice'),
      WorkList= () => import('@/page/Work-list'),
      PlayVideo= () => import('@/components/cui-vue/cui-video/CuiVideo'),
      CityChoice= () => import('@/page/City-choice');
const routes=[
  //默认入口
  {
    path: '/',
    component: Weixin
    //component: Main
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
  //视频播放器
  {
    path: '/playvideo',
    component: PlayVideo,
    meta:{
      requireAuth: false//登陆验证
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
  //求职意向-选择职业
  {
    path: '/Job-choice',
    component: JobChoice
  },
  // 选择城市
  {
    path: '/City-choice',
    component: CityChoice
  },
  //选择角色
  {
    path: '/SelectSole',
    component: SelectSole,
    meta:{
      requireAuth: true//登陆验证
    }
  },
  //工作列表
  {
      path:"/page/work/list",
      component:WorkList,
      meta:{
          keepAlive:true,
          index:1
      }
  },
  //主导航
  {
    path: '/main',
    component: Main,
    meta:{
      keepAlive:false,
      requireAuth: false
    },
    children:[
      {
        path:"position-list",
        component:PositionList,
        meta:{
          keepAlive:true,
          index:1
        }
      },
      {
        path:"test-list",
        component:TestList,
        meta:{
          keepAlive:true,
          index:2
        }
      },
      {
        path:"company-list",
        component:CompanyList,
        meta:{
          keepAlive:true,
          index:3
        }
      },
      {
        path:"UserCenter",
        component:UserCenter,
        meta:{
          keepAlive:true,
          index:4
        }
      },
    ]
  }
]

export default routes
