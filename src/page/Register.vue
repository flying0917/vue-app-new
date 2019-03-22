<template>
  <div class="cui-content">
    <!--带箭头-->
    <div class="cui-header back-btn">
      <span class="cui-iconfont cui-icon-return" @click="goback()"></span>
      <span class="cui-header-title">注册</span>
    </div>
    <form class="cui-form">
      <a href="javascript:void(0);" class="cui-input">
        <label>姓名</label>
        <input v-model="username" placeholder="请输入姓名">
      </a>
      <a  href="javascript:void(0);" class="cui-input">
        <label>密码</label>
        <input v-model="password" type="password" placeholder="请输入密码">
      </a>
      <a  href="javascript:void(0);" class="cui-input">
        <label>确认密码</label>
        <input v-model="repassword" type="password" placeholder="请输入密码">
      </a>
      <a  href="javascript:void(0);" class="cui-input">
        <div class="label">邮箱</div>
        <input v-model="email" placeholder="请输入邮箱">
      </a>
      <a href="javascript:void(0);" class="cui-input cui-input-btn">
        <label>验证码</label>
        <input v-model="code" placeholder="验证码" maxlength="6">
        <span class="cui-btn cui-btn-sm cui-btn-radius cui-btn-primary code-btn" @click="getCode()">{{code_tip}}</span>
      </a>
      <div class="cui-btn cui-btn-primary cui-btn-block cui-btn-radius register-btn" @click="register()" >注册</div>
    </form>
  </div>
</template>
<script>
  import userModel from "@/model/user"
    export default {
        name: "Login",
        data()
        {
          return {
            username:"",
            password:"",
            repassword:"",
            code:"",
            email:"",
            time:3,
            remaining:3,
            code_tip:"获取验证码",
            inTime:true,//是否到点
          }
        },
        methods:
        {
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
                {
                  that.$vux.toast.show({
                    text: ret.message,
                    type:'text',
                    position:"bottom"
                  });
                }

              });
            }
          },
          //注册
          register:function()
           {

              var that=this,
              param={
                username:this.username,
                password:this.password,
                password2:this.repassword,
                code:this.code,
                email:this.email
              };
             if(!that.username)
             {
               that.$vux.toast.show({
                 text: '请输入用户名',
                 type:'text',
                 position:"bottom"
               });
               return;
             }
             if(!that.password)
             {
               that.$vux.toast.show({
                 text: '请输入密码',
                 type:'text',
                 position:"bottom"
               });
               return;
             }

             if(!that.repassword)
             {
               that.$vux.toast.show({
                 text: '请输入确认密码',
                 type:'text',
                 position:"bottom"
               });
               return;
             }
             if(that.password!==that.repassword)
             {
               that.$vux.toast.show({
                 text: '两次密码不一致',
                 type:'text',
                 position:"bottom"
               });
               return;
             }
             if(!that.code)
             {
               that.$vux.toast.show({
                 text: '请输入验证码',
                 type:'text',
                 position:"bottom"
               });
               return;
             }
             if(!that.email)
             {
               that.$vux.toast.show({
                 text: '请输入邮箱',
                 type:'text',
                 position:"bottom"
               });
               return;
             }
             if(!(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(that.email)))
             {
               that.$vux.toast.show({
                 text: '请输入正确的邮箱',
                 type:'text',
                 position:"bottom"
               });
               return;
             }
             that.$vux.loading.show({
               text: '注册中，请稍等'
             })
              userModel.register(param,function(ret,err)
              {
                that.$vux.loading.hide()
                 if(ret&&ret.message)
                 {
                   that.$vux.toast.show({
                     text: ret.message,
                     type:'text',
                     position:"bottom"
                   });
                 }
                if(ret&&ret.isSuccess)
                {
                  setTimeout(function(){
                    that.$router.push("/login")
                  },500)
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
.cui-form
{
  padding:.75rem 1rem;
}
  .code-btn
  {
    background-color:transparent;
    color:#61D8FF;
    border:none;
  }
  .register-btn
  {
    margin-top:2rem;
    background-color:#61D8FF;
    border:none;
  }
</style>
