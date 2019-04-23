<template>
    <div :class='"cui-vue-tab cui-flex-wrap cui-flex-vertical cui-vue-tab-"+type'>
        <div class="cui-vue-tab-header">
            <div :class='{"cui-vue-tab-header-item":true,"active":activeIndex===index}' @click="switchTab(index)" v-for="x,index in data">
                {{x}}
            </div>
            <!--<div class="cui-vue-tab-header-tip"></div>-->
        </div>
        <div class="cui-vue-tab-content cui-flex-con">
            <transition>
                <div v-if="activeIndex===index" class="cui-vue-tab-content-item" v-for="y,index in data">
                    <slot :name="index"></slot>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>

    export default {
        name: "CuiTab",
        data()
        {
            return {
                activeIndex:0
            }
        },
        props:{
            data:{
                default()
                {
                    return ["待笔","职位","待笔1","职位1","待笔2","职位2","待笔3","职位3"]
                }
            },
            type:{
                default()
                {
                    return "button"//其值有scroll(滚动) flex(平分) button(按钮)
                }
            }
        },
        created()
        {

        },
        methods:{
            switchTab(index)
            {
                this.activeIndex=index;
            }
        }
    }
</script>

<style scoped>
    .cui-flex-wrap
    {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
    }
    .cui-flex-con
    {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
    }
    .cui-flex-vertical
    {
        -webkit-box-orient: vertical;
        -webkit-flex-flow: column;
        flex-flow: column;
    }
    .cui-vue-tab
    {
        height:100%;
        color:#6f6e6e;
    }
    .cui-vue-tab-header::-webkit-scrollbar
    {
        display: none;
    }
    .cui-vue-tab-header
    {
        margin:0 auto;
        height:1.5rem;
        width:100%;
        text-align: center;
        overflow-y:hidden;
        background-color:white;
    }
    .cui-vue-tab-header-item
    {
        border-bottom:2px solid white;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;
    }
    .cui-vue-tab-header-item.active
    {
        border-bottom:2px solid #61d7ff;
        color:#616161;
        font-weight: bold;
    }
    /*可滚动*/
    .cui-vue-tab-scroll .cui-vue-tab-header
    {
        white-space: nowrap;
        overflow-x:auto;
        /*解决ios上滑动不流畅*/
        -webkit-overflow-scrolling: touch;
        padding-bottom:30px;
        position:relative;
        line-height: 1.3rem;
        font-size:0;
    }
    .cui-vue-tab-scroll .cui-vue-tab-header-item
    {
        display:inline-block;
        font-size:.6rem;
        margin:0 1rem;
    }
    /*按钮胶囊*/
    .cui-vue-tab-button .cui-vue-tab-header
    {
        white-space: nowrap;
        overflow-x:auto;
        /*解决ios上滑动不流畅*/
        -webkit-overflow-scrolling: touch;
        padding-bottom:30px;
        position:relative;
        font-size:0;
    }
    .cui-vue-tab-button .cui-vue-tab-header-item
    {
        display:inline-block;
        height:1.2rem;
        line-height: 1.2rem;
        font-size:.6rem;
        margin:.15rem auto;
        min-width:3rem;
        border:1px solid #e2e2e2;
        border-right:none;

    }
    .cui-vue-tab-button .cui-vue-tab-header-item:first-child
    {
        border-top-left-radius:.6rem;
        border-bottom-left-radius:.6rem;
        border:1px solid #e2e2e2;
        border-right:none;
    }
    .cui-vue-tab-button .cui-vue-tab-header-item:last-child
    {
        border-top-right-radius:.6rem;
        border-bottom-right-radius:.6rem;
        border:1px solid #e2e2e2;
    }
    .cui-vue-tab-button .cui-vue-tab-header-item.active
    {
        color:white;
        background-color:#61d7ff;
        border:1px solid #61d7ff;
        font-weight: bold;
    }
    /*平分*/
    .cui-vue-tab-flex .cui-vue-tab-header
    {
        width:100%;
        display:-webkit-box;
        display:-webkit-flex;
        display:flex;
        overflow:hidden;
        line-height: 1.5rem;
    }
    .cui-vue-tab-flex .cui-vue-tab-header-item
    {
        font-size:.6rem;
        -webkit-box-flex: 1;
        -webkit-flex:1;
        flex:1;

    }

    .cui-vue-tab-header-tip
    {
        height:2px;
        width:1rem;
        /*background-color:#61d7ff;*/
        position:absolute;
        bottom:0;
    }
    .cui-vue-tab-content-item
    {
        height:100%;
        width:100%;
    }
    .cui-vue-tab-content
    {


    }
</style>
