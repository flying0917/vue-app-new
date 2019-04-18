/**
 * 路由配置
 * **/
const Login= () => import('@/page/Login'),
      Main= () => import('@/page/main'),
      Register= () => import('@/page/Register'),
      UserCenter=() => import('@/page/UserCenter'),
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
      TestList= () => import('@/page/Test-list'),
      CompanyList= () => import('@/page/Company-list'),
      PositionList= () => import('@/page/position-list'),
      CityChoice= () => import('@/page/City-choice');
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
      keepAlive:true,
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
