<template>
    <div class="cui-vue-refresh-content" ref="content">
        <div class="cui-vue-refresh-wrap" :style="cssStyle" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
            <div class="cui-vue-refresh-header" :style='{height:refreshHeaderHeight+"px","line-height":refreshHeaderHeight+"px",top:"-"+refreshHeaderHeight+"px"}'>
                <img :src="img">
                <span>{{tipText}}</span>
            </div>
            <slot></slot>
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
                tipText:"",
                img:require("./loading.gif"),
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
                default:200
            },
            //下拉时
            contentdownIcon:{
                default: require("./loading.gif")
            },
            contentdown:{
                default:"下拉刷新"
            },
            //放开时
            contentoverIcon:{
                default: require("./loading.gif")
            },
            contentover:{
                default:"松开刷新"
            },
            //刷新时
            contentrefreshIcon:{
                default: require("./loading.gif")
            },
            contentrefresh:{
                default:"刷新中"
            },
            //完成刷新时

            contentdoneIcon:{
                default: require("./loading.gif")
            },
            contentdone:{
                default:"完成刷新"
            }

        },
        created()
        {

        },
        methods:{
            touchStart(e)
            {
                let target=this.$refs.content;
                if(!this.isRefreshing&&target.scrollTop===0)
                {
                    this.start=true;//开始
                    this.startPageY=e.changedTouches[0].pageY;//从手指触到屏幕时的Y坐标的赋值
                    this.startPageX=e.changedTouches[0].pageX;//从手指触到屏幕时的X坐标的赋值
                }
            },
            touchMove(e)
            {
                let target=this.$refs.content;
                console.log(target.scrollTop)
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
                },500)
            },
            refreshDone()
            {
                var that=this;
                this.tipText=this.contentdone;
                this.img=this.contentdoneIcon;
                setTimeout(function(){
                    that.closeRefresh();
                },500);
            }
        }
    }
</script>

<style scoped>
    .cui-vue-refresh-content
    {
        height:100%;
        width:100%;
        position:relative;
        background-color: #f9f9f9;
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
    .cui-vue-refresh-wrap
    {
        min-height:100%;
    }
    /*下拉刷新插件end*/

</style>
