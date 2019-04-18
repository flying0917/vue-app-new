<template>
  <div class="cui-content">
      <div class="cui-header">
        <div class="cui-header-btn">
          <span class="cui-iconfont cui-icon-setup"></span>
        </div>
      </div>
      <cui-pullfresh @refresh="isOk">
        <div class="usercenter-content">
          <div class="usercenter-header cui-flex-wrap">
            <div class="avator">
              <img v-lazy="headerImg">
            </div>
            <div class="detail cui-flex-con">
              <div class="username">flying0917</div>
              <div class="sex man"></div>
            </div>
          </div>
          <div class="usercenter-type cui-flex-wrap">
            <div class="cui-flex-con">
              <div class="cui-iconfont cui-icon-task"></div>
              <div class="title">笔试</div>
            </div>
            <div class="cui-flex-con">
              <div class="cui-iconfont cui-icon-like"></div>
              <div class="title">收藏</div>
            </div>
            <div class="cui-flex-con">
              <div class="cui-iconfont cui-icon-stealth"></div>
              <div class="title">投递</div>
            </div>
            <div class="cui-flex-con">
              <div class="cui-iconfont cui-icon-camera"></div>
              <div class="title">视频</div>
            </div>
          </div>
          <div class="usercenter-setting">
            <div class="cui-list cui-list-setting cui-list-link" >
              <div class="cui-list-item">
                <div class="cui-list-center">
                  <span class="cui-iconfont cui-icon-document"></span>我的简历
                </div>
                <div class="cui-list-right">
                </div>
              </div>
              <div class="cui-list-item">
                <div class="cui-list-center">
                  <span class="cui-iconfont cui-icon-emoji"></span>求职意向
                </div>
                <div class="cui-list-right">
                </div>
              </div>
              <div class="cui-list-item">
                <div class="cui-list-center">
                  <span class="cui-iconfont cui-icon-setup"></span>设置
                </div>
                <div class="cui-list-right">
                </div>
              </div>
            </div>
          </div>
        </div>
      </cui-pullfresh>
  </div>
</template>
<script>
    import CuiPullfresh from '@/components/cui-vue/cui-pullrefresh/CuiPullrefresh'
    export default {
        name: "UserCenter",
        components:{
          CuiPullfresh
        },
        data()
        {
          return {
            headerImg:"https://hbimg.huabanimg.com/d52b235b5f34f0e68d174a3349486b3df043adc313362-ALqwez_fw658"
          }
        },
        methods:
        {
          isOk(done)
          {
            setTimeout(function(){
              done()
            },2000)
          }
        },
        created()
        {

        }
    }
</script>

<style scoped>
  .cui-header
  {
    background-color:#5ed2fa;
    overflow:hidden;
  }
  .cui-content
  {
    background-color:#5ed2fa;
  }
  .cui-header .cui-iconfont
  {
    color:white;
  }
  .usercenter-header
  {
    height:6rem;
    width:100%;
    background-color:#5ed2fa;
    color:white;
  }
  .avator
  {
    width:3rem;
    height:3rem;

    background-color:white;
    border-radius:50%;
    margin:.75rem .5rem 0 .75rem;
    overflow:hidden;
  }
  .avator img
  {
    width:100%;
    height:100%;
  }
  .detail
  {
    height:3rem;
    margin-top:.75rem;
  }
  .username
  {
    font-size:.8rem;
    font-weight: bold;
    line-height: 1.5rem;
  }
  .sex
  {
    width:.8rem;
    height:.8rem;
    line-height: .8rem;
    font-size:.6rem;
    background-color:white;
    text-align: center;
    border-radius:50%;
    border:1px solid white;
  }
  .man
  {
    background-color:dodgerblue;
  }
  .man:after
   {
     content:"♂";
   }
  .woman
  {
    background-color:hotpink;
  }
  .woman:after
  {
    content:"♀";
  }
  .usercenter-type
  {
    min-height:5rem;
    border-top-left-radius:20px;
    border-top-right-radius:20px;
    background-color:white;
    margin-top:-1rem;
    padding:.75rem;
    color:gray;
  }
  .usercenter-type>div
  {
    margin-top:10px;
  }
  .usercenter-type .title
  {
    font-size:.6rem;
    text-align: center;
  }
  .usercenter-type .cui-iconfont
  {
    font-size:1.5rem !important;
    line-height: 1.8rem;
    text-align: center;
  }
  .cui-list-center
  {
    font-weight: normal;
    font-size:.6rem;
    padding:0;
    color:gray;
  }
  .cui-list-center .cui-iconfont
  {
    line-height: 1.1rem;
    font-size:1rem;
    display:inline-block;
    margin-right:5px;
  }
</style>
