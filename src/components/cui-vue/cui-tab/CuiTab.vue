<template>
    <div :class='"cui-vue-tab cui-flex-wrap cui-flex-vertical cui-vue-tab-"+type'>
        <div class="cui-vue-tab-header" :style='{paddingTop:paddingTop}'>
            <div :class='{"cui-vue-tab-header-item":true,"active":parseInt(activeIndex)===index}' @click="switchTab(index)" v-for="x,index in data">
                {{x}}
            </div>
        </div>
        <div class="cui-vue-tab-content cui-flex-con" @touchstart="start($event)"  @touchend="end($event)">
            <transition :name="transitionName" :key="dataindex"  v-for="y,dataindex in data">
                <div :key="dataindex" v-show="parseInt(activeIndex)===dataindex" class="cui-vue-tab-content-item">
                    <slot :name="dataindex"></slot>
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
                startX:0,//手指开始x点
                startY:0,//手指开始y点
                endX:0,
                endY:0,

                lock:false,//锁
                activeIndex:this.active,//目前选中的索引
                transitionName:this.animate?"slides-right":""
            }
        },
        props:{
            //初始化激活的
            active:{
                default()
                {
                    return 0
                }
            },
            //是否开启动画
            animate:{
                default()
                {
                    return true
                }
            },
            data:{
                default()
                {
                    return []//接收数组
                }
            },
            paddingTop:{
                default(){
                    return "0"
                }
            },
            //类型
            type:{
                default()
                {
                    return "scroll"//其值有scroll(滚动) flex(平分) button(按钮)
                }
            }
        },
        created()
        {

        },
        methods:{
            start(e)
            {
                let target=e.changedTouches[0];
                this.startX=target.clientX;
                this.startY=target.clientY;
                this.lock=true;
            },
            end(e)
            {
                if(this.lock)
                {
                    let target=e.changedTouches[0],
                        mX=0;
                    this.lock=false;
                    this.endX=target.clientX;
                    this.endY=target.clientY;
                    mX=this.endX-this.startX;
                    let moveX =(this.endX>this.startX)&&(Math.abs((this.endY-this.startY)/(this.endX-this.startX))<1);
                    if(Math.abs(mX)>100)
                    {
                        if(!moveX)
                        {
                            this.activeIndex=(this.activeIndex+1)<=(this.data.length-1)?this.activeIndex+1:(this.data.length-1);
                        }
                        else
                        {
                            this.activeIndex=(this.activeIndex-1)>=0?this.activeIndex-1:0;
                        }
                        if(this.animate)
                        {
                            this.transitionName = moveX ? 'slides-right' : 'slides-left'
                        }
                    }
                }
            },
            switchTab(index)
            {
                const toIndex =index;
                const fromIndex = this.activeIndex;
                if(this.animate)
                {

                    this.transitionName = toIndex < fromIndex ? 'slides-right' : 'slides-left'
                }
                this.activeIndex=index;
                this.$emit("onchange",this.activeIndex);//当切换时调用
            }
        }
    }
</script>

<style scoped>
    /*动画*/
    .slides-right-enter-active,
    .slides-right-leave-active,
    .slides-left-enter-active,
    .slides-left-leave-active {
        will-change: transform;
        transition: all 500ms;
        position: absolute;

        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden;

        -webkit-perspective: 1000;
        -moz-perspective: 1000;
        -ms-perspective: 1000;
        perspective: 1000;
    }

    .slides-right-enter {

        transform: translate3d(-100%, 0, 0);
    }

    .slides-right-leave-active {

        transform: translate3d(100%, 0, 0);
    }

    .slides-left-enter {

        transform: translate3d(100%, 0, 0);
    }

    .slides-left-leave-active {

        transform: translate3d(-100%, 0, 0);
    }
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

        -webkit-transform: translateZ(0);
        -moz-transform: translateZ(0);
        -ms-transform: translateZ(0);
        -o-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden;

        -webkit-perspective: 1000;
        -moz-perspective: 1000;
        -ms-perspective: 1000;
        perspective: 1000;
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
        display:inline-block;
    }
    .cui-vue-tab-content
    {
        white-space: nowrap;
    }
</style>
