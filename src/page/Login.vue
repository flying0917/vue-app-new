<template>
  <div class="cui-content">
    <!--带箭头-->
    <div class="cui-header cui-fixed-top back-btn">
      <span class="cui-iconfont cui-icon-return" @click="goback()"></span>
      <span class="register-btn" @click="$router.push('/register')">注册</span>
    </div>
    <div class="login-content">
      <img class="logo" src="@/assets/image/JIANMIAN.png">
      <form class="cui-form">
        <a href="javascript:void(0);" class="cui-input">
          <label>
            <img src="@/assets/image/login/login_icon_phone.png">
          </label>
          <input v-model="email" placeholder="请输入邮箱">
        </a>
        <a  href="javascript:void(0);" class="cui-input cui-input-btn">
          <label>
            <img src="@/assets/image/login/reg_icon_code.png">
          </label>
          <input v-model="code" type="text" placeholder="验证码">
          <span class="cui-btn cui-btn-sm cui-btn-radius cui-btn-primary yzm" @click="getCode()">{{ code_tip }}</span>
        </a>
      </form>
      <div class="login-btn" @click="login()">登录</div>
      <!--<div class="login-btn" @click="loginout()">退出登录</div>-->
      <provision></provision>
    </div>

  </div>
</template>
<script>
  import userModel from "@/model/user"
  import Provision from '@/components/Provision'
  import store from '@/store/store'
  import * as types from '@/store/types'
    export default {
        name: "Login",
        data()
        {
          return {
            email:"",
            code:"",
            code_tip:"获取验证码",
            time:60,
            remaining:60,
            inTime:true,//是否到点
            token:"",
          }
        },
        components:{
          Provision,

        },
        methods:
        {
          loginout:function()
          {
            store.commit(types.LOGOUT);
          },
          //返回
          goback:function()
          {
            this.$router.back(-1)
          },
          //倒计时
          countDown:function()
          {
            var that=this
            this.inTime=false
            var coutDownTimeStamp=setInterval(function()
            {
              that.code_tip="剩余"+that.remaining+"秒"
              if(that.remaining===0)
              {
                clearInterval(coutDownTimeStamp)
                that.code_tip="获取验证码"
                that.remaining=that.time+1
                that.inTime=true
              }
              that.remaining--
            },1000)
          },
          //获取验证码
          getCode:function()
          {
            if(this.inTime)
            {

              if(!this.email)
              {
                this.$vux.toast.show({
                  text: '请输入邮箱',
                  type:'text',
                  position:"bottom"
                });
                return;
              }
              if(!(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.email)))
              {
                this.$vux.toast.show({
                  text: '邮箱格式错误',
                  type:'text',
                  position:"bottom"
                });
                return;
              }
              var that=this;
              userModel.getCode(this.email,function(ret)
              {
                if(ret&&ret.isSuccess)
                {
                  //倒数开始
                  that.countDown();
                }
                if(ret&&ret.message)
                  that.$vux.toast.show({
                    text: ret.message,
                    type:'text',
                    position:"bottom"
                  });

              });
            }
          },
          //登陆
           login:function() {
             console.log(store.state)
             if (!this.email) {
               this.$vux.toast.show({
                 text: '请输入邮箱',
                 type: 'text',
                 position: "bottom"
               });
               return false;
             }
             if (this.email && !(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.email))) {
               this.$vux.toast.show({
                 text: '请输入正确的邮箱',
                 type: 'text',
                 position: "bottom"
               });
               return false;
             }
             if (!this.code) {
               this.$vux.toast.show({
                 text: '请输入验证码',
                 type: 'text',
                 position: "bottom"
               });
               return false;
             }
             if (!/\d{6}/.test(this.code)) {
               this.$vux.toast.show({
                 text: '请输入6位数的验证码',
                 type: 'text',
                 position: "bottom"
               });
               return false;
             }
             var that = this


             that.$vux.loading.show({
               text: '登录中'
             })
             //登录
             userModel.login(that.email, that.code, function (ret, err) {
               that.$vux.loading.hide()
               if (ret.data && ret.data["token"]) {
                 //保存token
                 store.commit(types.TOKEN, ret.data["token"]);

                 let redirect = decodeURIComponent(that.$route.query.redirect || '/main');

                 that.$router.push({
                   path: redirect
                 })
               }
               if(ret&&ret.message)
               {
                 that.$vux.toast.show({
                   text: ret.message,
                   type:'text',
                   position:"bottom"
                 });
               }
             })
           }


        },
        created()
        {

        }
    }
</script>

<style scoped>
  .register-btn
  {
    color:#61D8FF;
    float:right;
    font-size:.7rem;
  }
  .back-btn
  {
    color:#444444 !important;
  }
  .cui-content
  {
    background-color:white;
  }
  .login-content
  {
    padding:0 .75rem;
  }
  .login-content
  {
    margin:4rem 1rem 1rem 1rem;
    text-align:left;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
  }
  .logo
  {
    width:4.5rem;
    margin-left:.75rem;
  }
  .login-btn
  {
    margin-top:2rem;
    background-color:#61D8FF;
    width:100%;
    height:2rem;
    line-height: 2rem;
    text-align: center;
    color:white;
    border-radius: 1rem;
  }
  .cui-input
  {
    margin-bottom:0;
    min-height:3rem;
  }
  .cui-input label
  {
    width:1.5rem;
    height:3rem;
    line-height: 3rem;
  }
  .cui-input input
  {
    padding-left:1.5rem;
  }
  .cui-input:last-child input
  {
    border-bottom:none;
  }
  .cui-input img
  {
    height:1rem;
    vertical-align: middle;
  }
  input::-webkit-input-placeholder
  {
    color:#B3B3B3;
    font-size:.7rem;
  }
  .yzm
  {
    background-color:transparent;
    border:none;
    color:#61D8FF;
    font-size:.7rem;
  }
  .weui-toast__content
  {
    color:white !important;
  }
</style>
