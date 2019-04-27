<template>
    <div class="cui-vue-refresh-content" :style='{backgroundColor:bgColor}' @scroll="scroll($event)" ref="content">
        <div class="cui-vue-refresh-wrap" :style="cssStyle" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
            <div class="cui-vue-refresh-header" :style='{height:refreshHeaderHeight+"px","line-height":refreshHeaderHeight+"px",top:"-"+refreshHeaderHeight+"px"}'>
                <img :src="img">
                <span>{{tipText}}</span>
            </div>
            <slot></slot>
            <div v-if="hasScrollToBottom" class="cui-vue-refresh-scroll-text"><img v-if="bottomImg!==''" :src="bottomImg"><span>{{bottomTip}}</span></div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "CuiPullrefresh",
        data()
        {
            return {
                start:false,//是否开始
                startPageX:0,//从手指触到屏幕时的Y坐标
                startPageY:0,//从手指触到屏幕时的Y坐标
                refreshHeaderHeight:50,//刷新头的高度
                isRefreshing:false,//是否在刷新
                offsetTop:0,//手指滑动的Y长度
                offsetLeft:0,//手指滑动的X长度
                tipText:"",//提示
                img:require("./loading.gif"),
                scrolltimeout:null,
                hasScrollToBottom:this.$listeners&&this.$listeners.scrollToBottom?true:false,
                contentDom:null,//容器（要监听其的滚动Y距离）
                bottomTip:"",
                bottomImg:"",
                isloaded:false,
                //底部加载更多锁
                bottomLock:true,
                cssStyle:{
                    webkitTransform:"translateY(0)",
                    transform:"translateY(0)",
                    webkitTransition:"",
                    transition:""
                }
            }
        },
        props:{
            //下拉的距离的触发点
            triggerDistance:{
                default(){
                    return 200;
                }
            },

            bottomNoLoadImg:{
                default(){
                    return "";
                }
            },

            bottomNoLoadTip:{
                default(){
                    return "加载更多";
                }
            },
            //滚动到底部显现的加载图标
            bottomLoadingImg:{
                default(){
                   return require("./loading-bottom.gif");
                }
            },
            //底部加载中的提示
            bottomLoadingTip:{
               default(){
                   return "加载中";
               }
            },
            //滚动到底部显现的加载图标
            bottomDoneImg:{
                default(){
                    return require("./null.png");
                }
            },
            //底部加载中的提示
            bottomDoneTip:{
                default(){
                    return "没有内容了";
                }
            },
            //底部加载更多是否都加载完毕
            isScrollBottomFinish:{
                default(){
                    return false;
                }
            },
            //背景颜色
            bgColor:{
                default()
                {
                    return "#ececec";
                }
            },
            //下拉时
            contentdownIcon:{
                default(){
                    return require("./loading.gif");
                }
            },
            contentdown:{
                default(){
                    return "下拉刷新";
                }
            },
            //放开时
            contentoverIcon:{
                default(){
                    return require("./loading.gif");
                }
            },
            contentover:{
                default(){
                    return "松开刷新"
                }
            },
            //刷新时
            contentrefreshIcon:{
                default(){
                    return require("./loading.gif");
                }
            },
            contentrefresh:{

                default(){
                    return "刷新中";
                }
            },
            //完成刷新时

            contentdoneIcon:{
                default(){
                    return require("./loading.gif");
                }
            },
            contentdone:{
                default()
                {
                    return "完成刷新";
                }
            }

        },
        mounted()
        {
            //获取容器
            this.contentDom=this.$refs.content;
            console.log("---------"+this.hasScrollToBottom)
        },
        methods:{
            touchStart(e)
            {
                let target=this.contentDom;
                if(!this.isRefreshing&&target.scrollTop===0)
                {
                    this.start=true;//开始
                    this.startPageY=e.changedTouches[0].pageY;//从手指触到屏幕时的Y坐标的赋值
                    this.startPageX=e.changedTouches[0].pageX;//从手指触到屏幕时的X坐标的赋值
                }
            },
            touchMove(e)
            {
                let target=this.contentDom;
                if(!this.isRefreshing&&target.scrollTop===0)
                {
                    //手指滑动的Y长度
                    this.offsetTop=e.changedTouches[0].pageY-this.startPageY;
                    //手指滑动的X长度
                    this.offsetLeft=e.changedTouches[0].pageX-this.startPageX;

                    if(this.start&&this.offsetTop>0&&Math.abs(this.offsetTop/this.offsetLeft)>1.5)//下划角度超过45度时不干活
                    {
                        e.preventDefault();//去掉ios的橡皮筋效果
                        //下拉的动画
                        this.cssStyle.webkitTransform=this.cssStyle.transform="translateY("+this.offsetTop+"px)";
                        //wrapContentDom.style.transform=wrapContentDom.style.webkitTransform="translateY("+offsetTop+"px)";
                        //是否大于下拉的距离的触发点
                        if(this.offsetTop>this.triggerDistance)
                        {
                            //显示刷新中的动画
                            this.cssStyle.webkitTransform=this.cssStyle.transform="translateY("+this.triggerDistance+"px)";
                            this.tipText=this.contentover;
                            this.img=this.contentoverIcon;
                        }
                        else
                        {
                            this.tipText=this.contentdown;
                            this.img=this.contentdownIcon;
                        }
                    }
                }
            },
            touchEnd(e)
            {
                let that=this;
                if(!this.isRefreshing&&this.start&&this.offsetTop>-this.refreshHeaderHeight)
                {
                    this.start=false;
                    this.cssStyle.webkitTransition=this.cssStyle.transition="all .5s";
                    //是否大于下拉的距离的触发点
                    if(this.offsetTop>=this.triggerDistance)
                    {
                        //显示刷新中的动画
                        this.cssStyle.webkitTransform=this.cssStyle.transform="translateY("+this.refreshHeaderHeight+"px)";
                        this.noloading();
                        setTimeout(function(){
                            that.cssStyle.webkitTransition=that.cssStyle.transition="";
                            //改变状态（正在刷新）
                            that.isRefreshing=true;
                            that.tipText=that.contentrefresh;
                            that.img=that.contentrefreshIcon;
                            //开始回调

                            that.$emit("refresh",that.refreshDone);
                        },500)

                    }
                    else
                    {
                        //还有到触发点，收起刷新动画
                        this.closeRefresh();
                    }
                }
            },
            //关闭
            closeRefresh()
            {
                let that=this;
                //改变状态（不在刷新）
                this.isRefreshing=false;
                this.cssStyle.webkitTransition=this.cssStyle.transition="all .5s";
                this.cssStyle.webkitTransform=this.cssStyle.transform="translateY(0px)";
                setTimeout(function(){
                    //清除动画
                    that.cssStyle.webkitTransition=that.cssStyle.transition="";
                    that.offsetTop=0;
                },500)
            },
            //刷新完毕
            refreshDone()
            {
                var that=this;
                this.tipText=this.contentdone;
                this.img=this.contentdoneIcon;
                setTimeout(function(){
                    that.closeRefresh();
                },500);
            },
            //滚动监听
            scroll(e)
            {
                if(this.hasScrollToBottom&&this.bottomLock)
                {
                    let target=e.target,
                        that=this;
                    if (this.scrolltimeout) {
                        clearTimeout(this.scrolltimeout);
                    }
                    //节流
                    this.scrolltimeout=setTimeout(function(){
                        var scrollTop=target.scrollTop;
                        var scrollHeight=target.scrollHeight;
                        var windowHeight=target.offsetHeight;
                        if(windowHeight+scrollTop>=scrollHeight)
                        {
                            that.loading();
                            that.bottomLock=false;
                            //回调
                            that.$emit("scrollToBottom",{openLock:that.openLock,nothing:that.nothing,loading:that.loading,noloading:that.noloading});
                        }
                    },100);
                }
            },
            //开锁(防止ajax加载过程中的延时而出现的多次触发滚动到底部监听事件 )
            openLock()
            {
                this.bottomLock=true;
            },
            //没有加载
            noloading()
            {
                this.bottomTip=this.bottomNoLoadTip;
                this.bottomImg=this.bottomNoLoadImg;
            },
            //（加载更多）没有更多了
            nothing()
            {
                this.bottomTip=this.bottomDoneTip;
                this.bottomImg=this.bottomDoneImg;
            },
            //（加载更多）加载中
            loading()
            {
                this.bottomTip=this.bottomLoadingTip;
                this.bottomImg=this.bottomLoadingImg;
            }

        }
    }
</script>

<style scoped>
    .cui-vue-refresh-content
    {
        height:100%;
        min-height:100%;
        width:100%;
        position:absolute;
        left:0;
        top:0;
        background-color: #ececec;
        overflow-x:hidden;
        overflow-y:auto;
        -webkit-overflow-scrolling:touch;
    }
    .cui-vue-refresh-content .cui-vue-refresh-header
    {
        position:absolute;
        width:100%;
        text-align: center;
    }
    .cui-vue-refresh-header img
    {
        height:25px;
        vertical-align: middle;
        margin-right:5px;
    }
    .cui-vue-refresh-header span
    {
        font-size:.6rem;
        display:inline-block;
        width:3rem;
        color:gray;
    }
    .cui-vue-refresh-wrap
    {
        min-height:100%;

    }
    .cui-vue-refresh-scroll-text
    {
        font-size:.6rem;
        text-align: center;
        line-height: 1.5rem;
        width:100%;
        background-color:white;
        color:#5a5858;
    }
    .cui-vue-refresh-scroll-text img
    {
        height:.6rem;
        vertical-align: middle;
        margin-right:.5rem;
    }
    /*下拉刷新插件end*/

</style>
