<template>
  <div class="cui-content">
      <div class="weixin-content">
        <img src="@/assets/image/logo-long-theme.png">
        <div class="btn weixin-btn" @click="goWeixin()"><img src="@/assets/image/login_icon_wechat.png">微信登录</div>
        <div class="btn mobile-btn" @click="goMobileLogin()"><img src="@/assets/image/login_icon_phone.png">手机登录</div>
        <provision></provision>
      </div>

  </div>
</template>
<script>
    import Provision from '@/components/Provision'
    export default {
        name: "weixin",
        components:{
            Provision
        },
        data()
        {
          return {

          }
        },
        methods:
        {
          goMobileLogin:function()
          {
            this.$router.push("/login")
          },
          goWeixin()
          {
              this.$router.replace("/main/position-list");
          }
        },
        created()
        {

        }
    }
</script>

<style scoped>
  .cui-content
  {
    background-color:white;
  }
  .weixin-content
  {
    margin:4rem 2rem 1rem 2rem;
    text-align: center;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
  }
  .weixin-content img
  {
    width:50%;
  }

  .weixin-content .btn
  {
    width:100%;
    height:2.5rem;
    border-radius:1.25rem;
    text-align: center;
    line-height: 2.5rem;
    margin-top:1rem;
  }

  .weixin-content .btn img
  {
    height:15px;
    vertical-align:middle;
    width:auto;
    margin-right:.3rem;
    display:inline-block;
    margin-bottom:4px;
  }

  .weixin-content .weixin-btn
  {
    background-color:#61d8ff;
    margin-top:3rem;
    color:white;
  }
  .mobile-btn
  {
    background-color:#adadad;
    color:white;
  }

</style>
