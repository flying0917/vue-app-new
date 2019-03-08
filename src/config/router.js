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

const routes=[{
    path: '/',
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
          keepAlive:false
        }
      },
      {
        path:"Im",
        component:Im,
        meta:{
          keepAlive:false
        }
      },
      {
        path:"UserCenter",
        component:UserCenter,
        meta:{
          keepAlive:false
        }
      },
    ]
  }
]

export default routes
