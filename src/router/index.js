import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import * as types from '@/store/types'
import routerconfig from '@/config/router'

Vue.use(Router)

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.TOKEN, window.localStorage.getItem('asscess_token'))//access_token
  store.commit(types.TMP_TOKEN, window.localStorage.getItem('temp_token'))//临时token
  store.commit(types.IM_TOKEN, window.localStorage.getItem('im_token'))//im_token
  console.log(store.state)
}
const router= new Router({
  routes: routerconfig
})

//判断登陆钩子
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.token&&store.state.token!=="null"&&store.state.token!=="undefined") {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})


export default router
