<template>
  <div class="cui-content">
    <!--带箭头-->
    <div class="cui-header cui-fixed-top back-btn">
      <span class="cui-iconfont cui-icon-return" @click="this.$router.back(-1)"></span>
    </div>
    <form class="cui-form cui-heade-margin">
      <div class="userinfo-title">工作经历</div>
      <div class="userinfo-detail">
        完善最近一份工作经历，让机遇找到你
      </div>
      <div class="userinfo-form">
        <a  href="javascript:void(0);" class="cui-input">
          <label>公司名称</label>
          <input  type="text" placeholder="请选择">
        </a>
        <a  href="javascript:void(0);" class="cui-input cui-input-link">
          <label>时间段</label>
          <div class="userinfo-job-time">
            <input  type="text" placeholder="开始时间">
            <div class="job-time-to">至</div>
            <input  type="text" placeholder="结束时间">
          </div>
        </a>
        <a  href="javascript:void(0);" class="cui-input cui-input-link">
          <label>职位类型</label>
          <input  type="text" placeholder="请选择">
        </a>
        <a  href="javascript:void(0);" class="cui-input">
          <label>用一句话描述自己</label>
          <input  type="text" placeholder="30字以内">
        </a>
      </div>
      <div class="cui-btn cui-btn-primary cui-btn-block cui-btn-radius next-btn">完成</div>
    </form>
  </div>
</template>
<script>
  import userModel from "@/model/user"
    export default {
        name: "UserInfo2",
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
  .cui-input-link:after
  {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-bottom:.8rem;
    line-height: inherit;
  }
  input::-webkit-input-placeholder
  {
    color:#B3B3B3;
  }

  .userinfo-job-status,.userinfo-job-time
  {
    height:2.1rem;
    width:100%;
    line-height: 2.1rem;
    text-align: center;
    border-bottom:1px solid  #E6E6E6;
    font-size:1rem !important;
  }
  .userinfo-job-status span
  {
    font-size:.8rem;
  }
  .userinfo-job-status .cui-radio
  {
    vertical-align: top;
  }
  .userinfo-job-status input
  {
    height:15px !important
  }

  .job-time-to
  {
    width:3rem;
    text-align: center;
    font-size:.8rem;
    padding: 0 0 .8rem 0;
    height:2rem;
    line-height: 1.5;
  }

  .userinfo-job-time
  {
    display:flex;
    display:-webkit-box;
    display:-webkit-flex;
    font-size:.8rem;
    border-bottom:none;
  }
  .userinfo-job-time input
  {
    flex:1;
    -webkit-box-flex:1;
    -webkit-flex: 1;
    font-size:.8rem;
  }
  .cui-content
  {
    font-family:微软雅黑;
  }
  .userinfo-title
  {
    font-size:1rem;
    text-align: center;
    color:#464646;
    font-weight: bold;
  }
  .userinfo-detail
  {
    text-align: center;
    color:#666666;
    font-size:.6rem;
    margin-top:.3rem;
  }
  .userinfo-sex
  {
    text-align: center;
  }

  .userinfo-form
  {
    padding:.5rem;
    color:#565656;
    margin-top:1rem;
  }
  .userinfo-form .cui-input
  {
    height:auto;
    margin-bottom:.8rem;
  }
  .cui-input label,.cui-input .label
  {
    height:1rem;
    line-height: 1rem;
    font-size:.6rem ;

  }
  .cui-input input
  {
    height:2rem;
    padding:0 0 .8rem 0;
  }
  .userinfo-form .cui-input input
  {
    display:block;
    position:relative;
    padding-left:0;

  }
  .userinfo-sex span
  {
    display:inline-block;
    height:1.2rem;
    min-width:4rem;
    line-height: 1.2rem;
    background-color:white;
    border-radius:0.6rem;
    text-align: center;
    margin:.8rem;
    -webkit-box-shadow: 0 0 3px #d0d0d0;
    -moz-box-shadow: 0 0 3px #d0d0d0;
    box-shadow: 0 0 3px #d0d0d0;
    color:#808080;
    font-size:.8rem;
  }
  .userinfo-sex .sex-active
  {
    background-color:#61d8ff;
    color:white;
  }

  .next-btn
  {
    background-color:#61d8ff !important;
    border:none;
    margin:.5rem;
  }
</style>
