<template>
  <div class="cui-content">
    <!--带箭头-->
    <div class="cui-header cui-fixed-top back-btn">
      <span class="cui-iconfont cui-icon-return"></span>

    </div>
    <div class="login-content">
      <img class="logo" src="@/assets/image/JIANMIAN.png">
      <form class="cui-form">
        <a href="javascript:void(0);" class="cui-input">
          <label>
            <img src="@/assets/image/login/login_icon_phone.png">
          </label>
          <input v-model="username" placeholder="请输入手机号码">
        </a>
        <a  href="javascript:void(0);" class="cui-input cui-input-btn">
          <label>
            <img src="@/assets/image/login/reg_icon_code.png">
          </label>
          <input v-model="password" type="password" placeholder="验证码">
          <span class="cui-btn cui-btn-sm cui-btn-radius cui-btn-primary yzm">获取验证码</span>
        </a>
      </form>
      <div class="login-btn" @click="login()">登录</div>
      <provision></provision>
    </div>

  </div>
</template>
<script>
  import userModel from "@/model/user"
  import Provision from '@/components/Provision'
    export default {
        name: "Login",
        data()
        {
          return {
            username:"",
            password:""
          }
        },
        components:{
          Provision
        },
        methods:
        {
           //获取token
           getToken:function()
           {
             var that=this;
              userModel.getToken(function(ret,err)
              {

              },that.$router)
           },
          //登陆
           login:function()
           {
              var that=this
              userModel.login(that.username,that.password,function(ret,err)
              {

              },that.$router)
           }
        },
        created()
        {
          //this.getToken();
        }
    }
</script>

<style scoped>
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
</style>
