<template>
    <div class="company-content">
        <cui-pullrefresh @refresh="refresh" @scrollToBottom="down">
            <transition name="fade">
                <div class="company-list" v-if="isShow">
                    <div class="company-list-item" v-for="x in data" >
                        <div class="company-list-video">
                            <div class="company-list-video-img" :key="x.videoimg?x.videoimg:GLOBAL.no_img" v-lazy:background-image = 'x.videoimg?x.videoimg:GLOBAL.no_img'></div>
                            <div class="company-list-video-btn"></div>
                        </div>
                        <div class="link">
                            <div class="company-list-footer">
                                <div class="company-list-avator">
                                    <img v-lazy='x.logo?x.logo:GLOBAL.no_img' :key="x.logo?x.logo:GLOBAL.no_img" alt>
                                </div>
                            </div>
                            <div class="company-list-name">
                                <div>{{x.company}}</div>
                            </div>
                            <div class="company-list-header">
                                <div class="company-list-wanted">在招职位<span class="wanted">{{x.wanted}}</span></div>
                            </div>
                            <div class="company-list-content">
                                <i>{{x.place}}</i>
                                <i>{{x.experience}}</i>
                                <i>{{x.record}}</i>
                            </div>
                        </div>

                    </div>
                </div>
            </transition>
        </cui-pullrefresh>
        <cui-loading :isShow="isLoading"></cui-loading>
    </div>
</template>

<script>
    import companyModel from "@/model/company"

    import CuiPullrefresh from "@/components/cui-vue/cui-pullrefresh/CuiPullrefresh";
    import CuiLoading from "@/components/cui-vue/cui-loading/CuiLoading";
    export default {
        name: "Company",
        components:{
            CuiPullrefresh,
            CuiLoading
        },
        data()
        {
            return {
                data:[],//渲染的数据
                isShow:false,//是否展示（为了过渡动画）
                p:1,
                lock:false,
                isLoading:true
            }
        },
        props:{
            //接收父组件的值
            //是否更新
            update:{
                default()
                {
                    return false;
                }
            },
            //一页的个数
            length:{
                default()
                {
                    return 5;
                }
            },
            //筛选条件
            filterData:{
                default()
                {
                    return {};
                }
            }
        },
        methods:{
            //获取职位数据
            getData(cb=()=>{})
            {
                let that=this,
                    callback=cb,
                    //复制一份 防止引用类型的影响
                    filter=JSON.parse(JSON.stringify(that.filterData));
                Object.assign(filter,{p:this.p,length:this.length})
                //网络请求公司数据（目前先模拟）
                companyModel.getCompany(filter,(ret)=>{
                    if(that.p===1)
                    {
                        that.data=ret;
                    }
                    else
                    {
                        that.data=Array.prototype.concat(that.data,ret);
                    }
                    callback(ret&&ret instanceof Array?ret.length:0)
                })
            },
            //滑动到底部的回调
            down(ret)
            {
                let that=this;
                that.p=that.p+1;
                that.getData((n)=>{
                    if(!n)
                    {
                        ret.nothing();
                    }
                    else
                    {
                        ret.loading();
                    }
                    that.$nextTick(()=>{
                        if(!that.lock)
                        {
                            ret.openLock();
                        }
                    });
                });
            },
            //下拉刷新，被调用 done() 可以收起下拉动画
            refresh(done) {
                let that = this;
                that.isLoading=false;
                //that.isShow=false;
                setTimeout(function () {
                    that.p = 1;

                    that.getData(()=>{
                        that.$nextTick(()=>{
                            that.isShow=true;
                            that.isLoading=false;
                            done();
                        })
                    })
                }, 1000)
            }
        },
        watch:{
            //监听update的开关
            update:function(newVal)
            {
                let that=this;
                //关锁 告诉父组件您要关锁了
                that.lock=true;
                that.isShow=false;
                that.data=[];
                that.isLoading=true;
                that.getData(()=>{
                    //开锁 告诉父组件您可以开锁了
                    that.$nextTick(()=>{
                        that.isShow=true;
                        that.lock=false;
                        that.isLoading=false;
                    })
                });
            }
        },
        created() {
            let that=this;
            that.lock=true;
            that.getData(()=>{
                that.isShow=true;
                //开锁 告诉父组件您可以开锁了
                that.$nextTick(()=>{
                    that.lock=false;
                    that.isLoading=false;
                })
            });
        }
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
    .company-content
    {
        height:100%;
    }
    .company-list
    {

        padding:0;
        margin-top:.1rem;
    }
    .company-list-item
    {
        min-height:2rem;
        margin-bottom:.7rem;
        padding:.75rem;
        background-color:white;
        border-bottom:1px solid #efefef;
        border-radius: 15px;
        margin: .3rem;
        overflow: hidden;
    }
    .company-list-header
    {
        height:1rem;
        line-height: 1rem;
    }
    .company-list-header .title
    {
        width:70%;
        height:100%;
        float:left;
        font-size:.8rem;
        font-weight: bold;
        vertical-align: top;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .company-list-header .remuneration
    {
        width:30%;
        float:left;
        color:#5ed2fa;
        font-size:.6rem;
        vertical-align: top;
        text-align: right;
    }
    .company-list-content
    {
        height:1rem;
        line-height: .8rem;
    }
    .company-list-video
    {
        height:4rem;
        margin:-.75rem -.75rem 0 -.75rem;
        position:relative;

    }
    .company-list-video-btn
    {
        height:100%;
        width:100%;
        background-color: rgba(0, 0, 0, 0.3);
        background-position:center;
        background-size:40px;
        background-repeat: no-repeat;
        background-image:url("../assets/image/play.png");
        position:absolute;
        top:0;
        left:0;
    }
    .company-list-video-img
    {
        height:100%;
        background-size:cover;
        background-position:center;
    }
    .company-list-content i
    {
        font-size:.6rem;
        display:inline-block;
        height:.8rem;
        padding:0 .4rem;
        border-radius:.4rem;
        line-height: .8rem;
        background-color: rgba(38, 167, 212, 0.5);
        color:white;
    }
    .company-list-footer
    {
        display:-webkit-box;
        display:-webkit-flex;
        display:flex;
        line-height: 1;
    }
    .company-list-avator
    {
        width:2rem;
        height:2rem;
        border-radius:50%;
        background-color: white;
        margin-right:10px;
        overflow:hidden;
        margin-top: -1rem;
        position:relative;
        z-index:2;
        border:2px solid #e8e8e8;
    }
    .company-list-avator img
    {
        width:100%;
        height:100%;
    }
    .company-list-name
    {
        height:1.5rem;
        font-size:.8rem;
        font-weight: bold;
        color:#6f6e6e;
        -webkit-box-flex:1;
        -webkit-flex:1;
        flex:1;
    }
    .company-list-name>div
    {
        line-height: .75rem;
        width:50%;
        float:left;
        margin-top:.375rem;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .wanted
    {
        color: #5ed2fa;
        margin-left:10px;
    }
    .company-list-wanted
    {
        font-size:.6rem;
        color:gray;
    }
    .link
    {
        margin:0 -.75rem -.75rem -.75rem;
        padding:0 .75rem .5rem .75rem;
        background-image:url(../assets/image/right.png);
        background-position:95% center;
        background-repeat: no-repeat;
        background-size:20px;
    }
</style>
