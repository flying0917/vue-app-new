// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import routes from '@/config/router'
import Global from '@/config/global'
import './assets/css/cui.css'


Vue.use(VueRouter)

Vue.prototype.GLOBAL = Global
const router = new VueRouter({
  routes
})

router.beforeEach(function(to,from,next){

  console.log(to)
  /*to["isback"]=false
  from["isback"]=true*/
  next();
});


FastClick.attach(document.body)

Vue.config.productionTip = false
//跳页
Vue.prototype.$goRoute=function(index)
{
  this.$router.push(index)
}

/* eslint-disable no-new */
if(Global.isApp)
{
  window.apiready=function()
  {
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app-box')
  }
}
else
{
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app-box')
}
