<template>
    <div class="position-content">
        <cui-pullrefresh @refresh="refresh" @scrollToBottom="down">
            <transition name="fade">
                <div class="position-list" v-if="isShow">
                    <div class="position-list-item" v-for="x in data" :key="x.id">
                        <div class="position-list-header">
                            <div class="title">{{x.title}}</div>
                            <div class="remuneration">{{x.prize}}</div>
                        </div>
                        <div class="position-list-content">
                            <i>{{x.place}}</i>
                            <i>{{x.experience}}</i>
                            <i>{{x.record}}</i>
                        </div>
                        <div class="position-list-footer">
                            <div class="position-list-avator">
                                <img v-lazy='x.companyImg?x.companyImg:GLOBAL.no_img' :key="x.companyImg?x.companyImg:GLOBAL.no_img">
                            </div>
                            <div class="position-list-name">
                                <div>{{x.company}}</div>
                                <div class="time">{{x.time}}</div>
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
    import positionModel from "@/model/position"
    import CuiPullrefresh from "@/components/cui-vue/cui-pullrefresh/CuiPullrefresh";
    import CuiLoading from "@/components/cui-vue/cui-loading/CuiLoading";
    export default {
        name: "Position",
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
                //网络请求职位数据（目前先模拟）
                positionModel.getPosition(filter,(ret)=>{
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
                ret.loading();
                that.getData((n)=>{
                    if(!n)
                    {
                        ret.nothing();
                    }
                    else
                    {
                        ret.noloading();
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
    .position-content
    {
        height:100%;
    }
    .position-list
    {
        padding:0;
        min-height:100%;
    }
    .position-list-item
    {
        min-height:2rem;
        padding:.75rem;
        background-color:white;
        border-radius: 10px;
        margin: .3rem;
    }
    .position-list-header
    {
        height:1rem;
        line-height: 1rem;
    }
    .position-list-header .title
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
    .position-list-header .remuneration
    {
        width:30%;
        float:left;
        color:#5ed2fa;
        font-size:.6rem;
        vertical-align: top;
        text-align: right;
    }
    .position-list-content
    {
        height:1rem;
        line-height: .8rem;
        margin:.5rem 0;
    }
    .position-list-content i
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
    .position-list-footer
    {
        display:-webkit-box;
        display:-webkit-flex;
        display:flex;
        line-height: 1;
    }
    .position-list-avator
    {
        width:1.5rem;
        height:1.5rem;
        border-radius:50%;
        background-color: white;
        margin-right:10px;
        overflow:hidden;
        border:2px solid #e8e8e8;
    }
    .position-list-avator img
    {
        width:100%;
        height:100%;
    }
    .position-list-name
    {
        height:1.5rem;
        font-size:.6rem;
        color:#6f6e6e;
        -webkit-box-flex:1;
        -webkit-flex:1;
        flex:1;
    }
    .position-list-name>div
    {
        line-height: .75rem;
        width:50%;
        float:left;
        margin-top:.375rem;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .time
    {
        text-align: right;
    }
</style>
