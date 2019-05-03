<template>
    <div class="cui-vue-picker cui-vue-picker-active">
        <div class="cui-vue-picker-shelter">
            <div class="cui-vue-picker-content">
                <div class="cui-vue-picker-header">
                    <div class="cui-vue-picker-header-left">{{cancelText}}</div>
                    <div class="cui-vue-picker-header-title">{{title}}</div>
                    <div class="cui-vue-picker-header-right">{{confirmText}}</div>
                </div>
                <div class="cui-vue-picker-item">
                    <div class="cui-vue-picker-item-content">
                        <div class="cui-vue-picker-item-list" v-if='type==="place"' v-for="(x,xIndex) in data" @touchstart="_touchStart(x)" @touchmove="_touchMove(xIndex)" @touchend="_touchEnd(xIndex)">
                            <div class="cui-vue-picker-item-selected">
                                <div class="cui-vue-picker-item-select">
                                    <div :class='{"cui-vue-picker-item-option":true,"cui-picker-item-option-active":valueArr[xIndex]===y.name}' :style='{height:optionHeight+"px"}' v-for="y in x" :data-value='y.name'>{{y.name}}</div>
                                </div>
                            </div>
                        </div>

                        <div class="cui-vue-picker-item-list" v-else-if='typeof x ==="string"' v-for="(x,xIndex) in data" @touchstart="_touchStart(x)" @touchmove="_touchMove(xIndex)" @touchend="_touchEnd(xIndex)">
                            <div class="cui-vue-picker-item-selected">
                                <div class="cui-vue-picker-item-select">
                                    <div :class='{"cui-vue-picker-item-option":true,"cui-picker-item-option-active":valueArr[xIndex]===y}' :style='{height:optionHeight+"px"}' v-for="y in x" :data-value='y'>{{y}}</div>
                                </div>
                            </div>
                        </div>

                        <div class="cui-vue-picker-item-list" v-else-if='typeof x ==="object"' v-for="(x,xIndex) in data" @touchstart="_touchStart(x)" @touchmove="_touchMove(xIndex)" @touchend="_touchEnd(xIndex)">
                            <div class="cui-vue-picker-item-selected">
                                <div class="cui-vue-picker-item-select">
                                    <div :class='{"cui-vue-picker-item-option":true,"cui-picker-item-option-active":valueArr[xIndex]===1}' :style='{height:optionHeight+"px"}' v-for="y in x" :data-value='y.value?y.value:y.name'>{{y.name}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "CuiPicker",
        data()
        {
            return {
                itemsDomArr:[],
                valueArr:null,//默认值数组
                valueIndexArr:[],//默认值的索引
                selectedValueArr:[],//已经选择的值
                nowDayCount:31
            }
        },
        props:{
            type:"place",
            data:{
                default()
                {
                    return [["1","2","3"],["4","5","6"]];
                }
            },
            cancelText:{
                default()
                {
                    return "取消";
                }
            },
            confirmText:{
                default()
                {
                    return "确认";
                }
            },
            title:{
                default()
                {
                    return "请选择";
                }
            },
            optionHeight:{
                default()
                {
                    return 50;
                }
            }
        },
        created()
        {
            console.log(this.data)
        },
        methods:{
            _touchStart(index)
            {

            },
            _touchMove(index)
            {

            },
            _touchEnd(index)
            {

            },
            handleData()
            {
                let that=this;
                that.data.forEach((item,index)=>{

                    that.itemsDomArr.push({
                        startY:0,
                        moveY:0,
                        nowY:0,
                        selectedTop:0,
                        speed:0,
                        time:0,
                        timeInterval:null,
                        direction:0,
                        nowHelpY:that.valueIndexArr[index]!==-1?parseInt("-"+that.valueIndexArr[index])*50:0,
                        index:0,
                        value:value
                    })
                });
            }
        }
    }
</script>

<style scoped>
    /*picker插件*/
    .cui-vue-picker
    {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:9999;
        overflow:hidden;
        font-size:.7rem;
        -webkit-transition: all 0.6s;
        -moz-transition: all 0.6s;
        -ms-transition: all 0.6s;
        -o-transition: all 0.6s;
        transition: all 0.6s;

    }


    .cui-vue-picker .cui-vue-picker-shelter
    {
        width:100%;
        height:100%;
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.48);
        -webkit-transition: opacity .6s;
        -moz-transition: opacity .6s;
        -ms-transition: opacity .6s;
        -o-transition: opacity .6s;
        transition: opacity .6s;
    }
    .cui-vue-picker-active .cui-vue-picker-shelter
    {
        opacity: 1;
    }

    .cui-vue-picker .cui-vue-picker-content
    {
        height:50%;
        width:100%;
        background-color:white;
        position:absolute;
        bottom:-50%;
        display:-webkit-box;
        display:-webkit-flex;
        display:flex;
        -webkit-box-orient: vertical;
        -webkit-flex-flow: column;
        flex-flow: column;
        -webkit-transition: bottom .6s;
        -moz-transition: bottom .6s;
        -ms-transition: bottom .6s;
        -o-transition: bottom .6s;
        transition: bottom .6s;
    }
    .cui-vue-picker-active .cui-vue-picker-content
    {
        bottom:0;
    }
    .cui-vue-picker-item
    {
        -webkit-box-flex:1;
        -webkit-flex:1;
        flex:1;
        position:relative;
    }
    .cui-vue-picker-item-content
    {
        position:absolute;
        width:100%;
        height:100%;
        display:-webkit-box;
        display:-webkit-flex;
        display:flex;
        top:0;
        left:0;
    }
    .cui-vue-picker .cui-vue-picker-header
    {
        height:2rem;
        position:relative;
        color:#696666;
    }

    .cui-vue-picker-header .cui-vue-picker-header-left
    {
        height:100%;
        min-width:3rem;
        text-align: left;
        padding-left:.5rem;
        line-height: 2rem;
        position:absolute;
        left:0;
        top:0;
        z-index:2;
    }
    .cui-vue-picker-header .cui-vue-picker-header-title
    {
        width:60%;
        height:100%;
        margin:0 auto;
        text-align: center;
        line-height: 2rem;
    }
    .cui-vue-picker-header .cui-vue-picker-header-right
    {
        height:100%;
        min-width:3rem;
        text-align: right;
        padding-right:.5rem;
        line-height: 2rem;
        position:absolute;
        right:0;
        top:0;
        z-index:2;

    }
    .cui-vue-picker-item
    {
        display:-webkit-box;
        display:-webkit-flex;
        display:flex;
    }
    .cui-vue-picker-item .cui-vue-picker-item-list
    {
        height:100%;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex:1;
        position:relative;
        overflow:hidden;
    }

    .cui-vue-picker-item-list .cui-vue-picker-item-selected
    {
        width:80%;
        height:50px;
        position:absolute;
        left:0;
        right:0;
        bottom:0;
        top:0;
        margin:auto;
        border-bottom:1px solid #61d8ff;
    }
    .cui-vue-picker-item-select
    {
        width:100%;
        position:absolute;
        left:0;

    }
    .cui-vue-picker-item-select .cui-vue-picker-item-option
    {
        height:50px;
        text-align: center;
        line-height: 50px;
        color:gray;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .cui-vue-picker-item-select .cui-picker-item-option-active
    {
        color:#2a70d0;
    }
</style>
