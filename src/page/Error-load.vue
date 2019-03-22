<template>
  <div class="cui-content">
    <!--带箭头-->
    <div class="cui-header cui-fixed-top back-btn">
      <div class="cui-header-title">加载失败</div>
      <span class="cui-iconfont cui-icon-return" @click="this.$router.back(-1)"></span>
    </div>
    <div class="error-content">
      <div class="error-middle">
        <img src="@/assets/image/error/no-network.png">
        <img src="@/assets/image/error/no-network-text.png">
        <div class="error-refresh-btn">刷新</div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: "ErrorLoad",
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
.error-content
{
  width:100%;
  height:100%;
  padding-top:2rem;
  position:relative;
  background-color:white;

}
.error-middle
{
  position:absolute;
  text-align: center;
  width:70%;
  height:50%;
  top:0;
  bottom:0;
  left:0;
  right:0;
  margin:auto;
}
.error-content img
{
  width:100%;
}
.error-content img:nth-child(1)
{
  width:80%;
  margin-bottom:1rem;
}
  .error-refresh-btn
  {
    width:6rem;
    height:1.4rem;
    border-radius:.7rem;
    background-color:#53CFF8;
    text-align: center;
    line-height: 1.4rem;
    color:white;
    margin:1rem auto;
  }
</style>
