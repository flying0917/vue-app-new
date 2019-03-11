<template>
  <div class="cui-content">
    <!--带箭头-->
    <div class="cui-header cui-fixed-top back-btn">
      <span class="cui-iconfont cui-icon-return" @click="goback()"></span>

    </div>
    <div class="login-content">
      <img class="logo" src="@/assets/image/JIANMIAN.png">
      <form class="cui-form">
        <a href="javascript:void(0);" class="cui-input">
          <label>
            <img src="@/assets/image/login/login_icon_phone.png">
          </label>
          <input v-model="mobile" placeholder="请输入手机号码">
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
      <provision></provision>
    </div>

  </div>
</template>
<script>
  import userModel from "@/model/user"
  import Provision from '@/components/Provision'
  import * as types from '@/store/types'
    export default {
        name: "Login",
        data()
        {
          return {
            mobile:"",
            code:"",
            code_tip:"获取验证码",
            time:60,
            remaining:60,
            inTime:true,//是否到点
            token:""
          }
        },
        components:{
          Provision,

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
              if(that.remaining==0)
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
            var that=this
            //获取临时token
            if(this.mobile)
            {
              if(!(/^1[34578]\d{9}$/.test(this.mobile)))
              {
                this.$vux.toast.show({
                  text: '手机号码格式错误',
                  type:'text',
                  position:"bottom"
                });
              }
              else
              {
                if(!that.inTime)
                {
                  return false
                }
                if(!localStorage["temp_token"]||localStorage["temp_token"]==="undefined")
                {
                  userModel.getToken(function(ret)
                  {
                    //开始倒计时
                    that.countDown()
                    userModel.getCode(that.mobile,localStorage["temp_token"],function(ret)
                    {
                      if(ret.data&&ret.data.success)
                      {
                        that.$vux.toast.show({
                          text: '获取验证码成功',
                          type:'text',
                          position:"bottom"
                        });
                      }
                    })
                  })
                }
                else
                {
                  //开始倒计时
                  that.countDown()
                  userModel.getCode(that.mobile,localStorage["temp_token"],function(ret)
                  {

                    if(ret.data&&ret.data.success)
                    {
                      that.$vux.toast.show({
                        text: '获取验证码成功',
                        type:'text',
                        position:"bottom"
                      });
                    }
                  })
                }
              }
            }
            else
            {
              this.$vux.toast.show({
                text: '手机号码不能为空',
                type:'text',
                position:"bottom"
              });
            }
          },
          //登陆
           login:function()
           {
             if(!this.mobile)
             {
               this.$vux.toast.show({
                 text: '请输入手机号码',
                 type:'text',
                 position:"bottom"
               });
               return false;
             }
             if(this.mobile&&!(/^1[34578]\d{9}$/.test(this.mobile)))
             {
               this.$vux.toast.show({
                 text: '请输入正确的手机号码',
                 type:'text',
                 position:"bottom"
               });
               return false;
             }
             if(!this.code)
             {
               this.$vux.toast.show({
                 text: '请输入验证码',
                 type:'text',
                 position:"bottom"
               });
               return false;
             }
             if(!/\d{6}/.test(this.code))
             {
               this.$vux.toast.show({
                 text: '请输入6位数的验证码',
                 type:'text',
                 position:"bottom"
               });
               return false;
             }
              var that=this
             //获取临时token
             if(!localStorage["temp_token"]||localStorage["temp_token"]==="undefined")
             {
               that.$vux.loading.show({
                 text: '登录中，请稍等'
               })
               userModel.getToken(function()
               {
                 userModel.login(that.mobile,that.code,function(ret,err)
                 {
                   that.$vux.loading.hide()
                   if (ret.data["access_token"]) {
                     that.$store.commit(types.LOGIN, ret.data["access_token"],ret.data["im_token"]);
                     let redirect = decodeURIComponent(that.$route.query.redirect || '/main');
                     that.$router.push({
                       path: redirect
                     })
                   }

                 },that.$router)
               })
             }
             else
             {
               that.$vux.loading.show({
                 text: '登录中'
               })
               //登录
               userModel.login(that.mobile,that.code,function(ret,err)
               {
                 that.$vux.loading.hide()
                 setTimeout(function(){
                    that.$router.push("/SelectSole")
                 },500)
               },that.$router)
             }


           }
        },
        created()
        {

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
  .weui-toast__content
  {
    color:white !important;
  }
</style>
