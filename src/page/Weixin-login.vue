<template>
  <div class="cui-content">
      <div class="weixin-content">
        <img src="@/assets/image/JIANMIAN.png">
        <div class="btn weixin-btn"><img src="@/assets/image/login_icon_wechat.png">微信登录</div>
        <div class="btn mobile-btn"><img src="@/assets/image/login_icon_phone.png">手机登录</div>
        <div class="tip">
          <span>登录即代表您同意“招聘app”的</span><a>服务和隐私条款</a>
        </div>
      </div>

  </div>
</template>
<script>

    export default {
        name: "weixin",
        data()
        {
          return {

          }
        },
        methods:
        {

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
  .tip
  {
    font-size:.4rem;
    color:#999999;
    position:absolute;
    margin:0;
    right:0;
    left:0;
    font-family:Adobe Heiti Std R;
    bottom:.5px;
  }
  .tip a
  {
    color:#5ed2fa;
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
