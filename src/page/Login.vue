<template>
  <form class="cui-form">
    <a href="javascript:void(0);" class="cui-input">
      <label>姓名</label>
      <input v-model="username" placeholder="请输入姓名">
    </a>
    <a  href="javascript:void(0);" class="cui-input">
      <label>密码</label>
      <input v-model="password" type="password" placeholder="请输入密码">
    </a>
    <div class="cui-btn cui-btn-primary cui-btn-block cui-btn-radius" @click="login()">登录</div>
  </form>
</template>
<script>
  import userModel from "@/model/user"
    export default {
        name: "Login",
        data()
        {
          return {
            username:"",
            password:""
          }
        },
        methods:
        {
           //获取token
           getToken:function()
           {
             var that=this;
              userModel.getToken(function(ret,err)
              {
              })
           },
          //登陆
           login:function()
           {
              var that=this
              userModel.login(that.username,that.password,function(ret,err)
              {
                 console.logt(ret)
              })
           }
        },
        created()
        {
          this.getToken();
        }
    }
</script>

<style scoped>

</style>
