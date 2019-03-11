<template>
    <div class="cui-content">
        <div class="title">选择身份</div>
        <p>
            请根据提示选择你的声份，选择后可以在设置中 进行切换
        </p>
        <div class="sole-type">
            <div class="sole-type-item sole-type-find">
              <div class="sole-type-circle">
                <img src="@/assets/image/selectsole/find-people.png">
              </div>
              <div class="sole-type-title">我要找工作</div>
            </div>
            <div class="sole-type-item sole-type-get">
              <div class="sole-type-circle">
                <img src="@/assets/image/selectsole/get-people.png">
              </div>
              <div class="sole-type-title">我要招人</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SelectSole"
    }
</script>

<style scoped>
    .cui-content
    {
        padding:1.5rem;
        font-family:微软雅黑;

    }
    .cui-content .title
    {
        color:#49CBF6;
        font-size:1.5rem;
    }
    .cui-content p
    {
        margin-top:.5rem;
        color:#999999;
        line-height: 1.4;
    }
    .sole-type
    {
        width:100%;
    }
    .sole-type .sole-type-item,.sole-type .sole-type-title
    {
      text-align: center;
      width:100%;
      font-size:1rem;
      font-weight: bold;
      color:#4D4D4D;
    }
    .sole-type .sole-type-circle
    {
        margin:3rem auto .5rem auto;
        height:5rem;
        width:5rem;
        border-radius:50%;
        box-shadow: 0 0 11px #d8d8d8;

    }
    .sole-type .sole-type-circle img
    {
      height:110%;
      margin-top:-10%;
    }
</style>
