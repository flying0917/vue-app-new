<template>
  <div class="cui-content">
    <!--带箭头-->
    <div class="cui-header cui-fixed-top back-btn">
      <span class="cui-iconfont cui-icon-return" @click="this.$router.back(-1)"></span>
    </div>
    <form class="cui-form cui-heade-margin">
      <div class="userinfo-title">基本信息</div>
      <div class="userinfo-headimg" @click="showSelectPicture()">
        <img src="@/assets/image/userinfo/carma.png">
      </div>
      <div class="userinfo-sex">
        <span :class="sex==='boy'?'sex-active':''" @click="selectSex('boy')">男</span>
        <span :class="sex==='girl'?'sex-active':''" @click="selectSex('girl')">女</span>
      </div>
      <div class="userinfo-form">
        <a href="javascript:void(0);" class="cui-input">
          <label>姓名</label>
          <input v-model="username" placeholder="请输入姓名">
        </a>
        <a  href="javascript:void(0);" class="cui-input cui-input-link">
          <label>出生年月</label>
          <input @click="setBirth()" readonly v-model="birth" type="text" placeholder="请选择">
        </a>
        <a  href="javascript:void(0);" class="cui-input">
          <label>手机号码</label>
          <input  type="text" placeholder="请输入手机号码">
        </a>
        <a  href="javascript:void(0);" class="cui-input">
          <div class="label">邮箱</div>
          <input placeholder="邮箱用于接收面试通知">
        </a>
      </div>
      <div class="cui-btn cui-btn-primary cui-btn-block cui-btn-radius next-btn">下一步</div>
    </form>
    <div v-transfer-dom>
      <actionsheet v-model="headimgActionSheet" :menus="headimgSettingMenu" @on-click-menu="selectFileType" :close-on-clicking-mask="false" :close-on-clicking-menu="true">
      </actionsheet>
    </div>
  </div>
</template>
<script>
  import userModel from "@/model/user"
  import { Actionsheet } from 'vux'
    export default {
        name: "UserInfo",
        data()
        {
          return {
            birth:null,
            username:"",
            sex:"boy",
            headimgActionSheet:false,
            headimgSettingMenu:{
              file: '文件',
              photo: '图片',
              carma: '摄像'
            }
          }
        },
        components:{
          Actionsheet
        },
        methods:
        {
            selectFileType:function(key)
            {
                console.log(key)
            },
            //选择性别
            selectSex:function(sex)
            {
               this.sex=sex
            },
            //弹出选头像类型框
            showSelectPicture:function(){
              this.headimgActionSheet=true
            },
            //设置生日
            setBirth:function()
            {
              let that=this,
                  date=new Date()
              this.$vux.datetime.show({
                cancelText: '取消',
                confirmText: '确定',
                maxYear:date.getFullYear(),
                minYear:"1959",
                format:"YYYY-MM",
                value: that.birth, // 其他参数同 props
                onHide () {
                  const _this = this
                  that.birth=_this.value
                },
                onShow () {
                  const _this = this
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
  .userinfo-headimg
  {
    width:4rem;
    height:4rem;
    background-color:#F9F9F9;
    border-radius:50%;
    margin:.5rem auto;
    text-align: center;
    position:relative;
    line-height: 4rem;
  }
  .userinfo-headimg img
  {
    width:50%;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
  }
  .userinfo-sex
  {
    text-align: center;
  }

  .userinfo-form
  {
    padding:.5rem;
    color:#565656;
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
    \padding:0 0 .8rem 0;
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
