<template>
    <div class="exam-content">
        <cui-pullrefresh @refresh="refresh" @scrollToBottom="down" bgColor="white">
            <transition name="fade">
                <div class="exam-list" v-if="isShow">
                    <div class="cui-column cui-column-count-2 exam-list">
                        <div class="cui-column-item exam-list-item" v-for="x in data">
                            <img v-lazy="x.examimg" :key="x.examimg">
                            <div class="exam-list-item-detail">
                                <div class="title">{{x.title}}</div>
                                <div class="exam-company">
                                    <div class="avator" :style='{backgroundImage:"url("+x.companyLogo+")"}'></div>
                                    <div class="name">{{x.company}}</div>
                                    <div class="time">{{x.time}}</div>
                                </div>
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
    import examModel from "@/model/exam"

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
                examModel.getExam(filter,(ret)=>{
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
    .exam-content
    {
        height:100%;
    }
    .exam-list
    {
        padding:0;
        margin:.5rem .2rem;

    }
    .exam-list-item
    {
        margin-bottom:1rem;
    }
    .exam-list-item img
    {
        border-radius:8px;
    }
    .exam-list-item-detail
    {
        min-height:2rem;
        font-size:.6rem;
    }
    .exam-list-item-detail>.title
    {
        color: #2c2c2c;
        font-size:.7rem;
        width:100%;
        overflow:hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
    }
    .exam-company
    {
        padding:.2rem 0;
        display:-webkit-box;
        display:-webkit-flex;
        display:flex;
        width:100%;
    }
    .exam-company .avator
    {
        height:18px;
        width:18px;
        border-radius:50%;
        background-color:gray;
        background-size:cover;
        background-position:center;
    }
    .exam-company .name
    {
        -webkit-box-flex:1;
        -webkit-flex:1;
        flex:1;
        color: #a3a3a3;
        padding-left:5px;
        font-size:.6rem;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    .exam-company .time
    {
        width:3rem;
        color: #a3a3a3;
        padding-left:5px;
        font-size:.6rem;
        overflow:hidden;
        text-overflow:ellipsis;
        text-align:right;
    }

</style>
