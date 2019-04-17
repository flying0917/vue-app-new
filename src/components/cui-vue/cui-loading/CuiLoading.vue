<template>
    <transition name="fade">
        <div class="cui-loading-theme" v-if="isShow" :style='bgColor?"background-color:"+bgColor:""'>
            <div class="cui-loading-theme-logo">
                <img :src="img">
                <div class="cui-loading-theme-tip">{{msg}}</div>
            </div>
        </div>
    </transition>
</template>

<script>

    export default {
        name: "CuiLoading",
        data()
        {
            return {

            }
        },
        props:{
            //背景颜色
            bgColor:[],
            //加载的图片
            img:{
                default()
                {
                    return require("./loading.gif");

                }
            },
            //是否显示
            isShow:{
                default(){
                    return false;
                }
            },
            //提示文本
            msg:{
                default(){
                   return "";
                }
            }
        },
        watch:{
          isShow:function(newval)
          {
              if(newval)
              {
                  this.$emit("onShow");//当loading被展示时被调用
              }
              else
              {
                  this.$emit("onHide");//当loading被隐藏时被调用
              }
          }
        },
        created()
        {

        },
        methods:{}
    }
</script>

<style scoped>
    /*动画*/
    .fade-enter-active,.fade-leave-active
    {
        transition: all 500ms;
    }
    .fade-enter-active {
        opacity:1;
    }
    .fade-enter
    {
        opacity:0;
    }
    .fade-leave-active {
        opacity:0;
    }
    /*加载*/
    .cui-loading-theme
    {
        width:100%;
        height:100%;
        background-color: rgba(0, 0, 0, .1);
        position:fixed;
        top:0;
        left:0;
        z-index:99999;
    }
    .cui-loading-theme-logo
    {
        width:4rem;
        min-height:4rem;
        padding:.5rem;
        background-color:white;
        position:absolute;
        font-size:0;
        top:50%;
        left:50%;
        border-radius:5px;
        transform:translate(-50%,-50%);
    }
    .cui-loading-theme-logo img
    {
        width:100%;
        height:100%;
    }
    .cui-loading-theme-tip
    {
        font-size:.6rem;
        text-align: center;
    }
</style>
