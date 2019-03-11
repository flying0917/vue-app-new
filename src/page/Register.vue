<template>
  <div class="cui-content">
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
        <div class="label">电话号码</div>
        <input placeholder="请输入电话号码">
      </a>
      <a href="javascript:void(0);" class="cui-input cui-input-btn">
        <label>验证码</label>
        <input placeholder="验证码" maxlength="6">
        <span class="cui-btn cui-btn-sm cui-btn-radius cui-btn-primary">获取验证码</span>
      </a>
      <div class="cui-btn cui-btn-primary cui-btn-block cui-btn-radius" @click="register()">注册</div>
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
            repassword:""
          }
        },
        methods:
        {

          //注册
          register:function()
           {
              var that=this,
              param={};
              userModel.register(param,function(ret,err)
              {
                 console.log(ret)
              })
           }
        },
        created()
        {

        }
    }
</script>

<style scoped>

</style>
