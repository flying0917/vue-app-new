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

const routes=[
  {
    path: '/',
    component: Weixin
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },

  {
    path: '/weixin',
    component: Weixin
  },
  {
    path: '/SelectSole',
    component: SelectSole,
    meta:{
      requireAuth: true//登陆验证
    }
  },
  {
    path: '/main',
    component: Main,
    meta:{
      keepAlive:true,
      title:"洞洞都有奖"
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
