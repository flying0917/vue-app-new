<template>
    <transition name="slide">
        <div v-if="isShow" class="cui-vue-picker cui-vue-picker-active">
            <div class="cui-vue-picker-shelter">
                <div class="cui-vue-picker-content">
                    <div class="cui-vue-picker-header">
                        <div class="cui-vue-picker-header-left" @click="cancel">{{cancelText}}</div>
                        <div class="cui-vue-picker-header-title">{{title}}</div>
                        <div class="cui-vue-picker-header-right" @click="confirm">{{confirmText}}</div>
                    </div>
                    <div class="cui-vue-picker-item">
                        <div class="cui-vue-picker-item-content">
                            <div class="cui-vue-picker-item-list" v-for="(x,xIndex) in data" @touchstart="_touchStart(xIndex,$event)" @touchmove="_touchMove(xIndex,$event)" @touchend="_touchEnd(xIndex,$event)">
                                <div class="cui-vue-picker-item-selected">
                                    <div class="cui-vue-picker-item-select" :style='itemsDomArr[xIndex]?itemsDomArr[xIndex].style:{}'>
                                        <template v-for="y,sIndex in x">
                                            <div v-if='typeof y==="object"' :class='{"cui-vue-picker-item-option":true,"cui-picker-item-option-active":itemsDomArr[xIndex].index===sIndex}' :style='{height:optionHeight+"px"}' :data-value='y.value?y.value:y.name'>
                                                {{y.name}}
                                            </div>
                                            <div v-else :class='{"cui-vue-picker-item-option":true,"cui-picker-item-option-active":itemsDomArr[xIndex].index===sIndex}' :style='{height:optionHeight+"px"}' :data-value='y'>
                                                {{y}}
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

    export default {
        name: "CuiPicker",
        data()
        {
            return {
                itemsDomArr:[],
                nowDayCount:31,
                changeCol:(cb)=>{
                    cb();
                },
                data:this.datas
            }
        },
        props:{
            //是否展示
            isShow:{
                default()
                {
                    return false;
                }
            },
            //类型
            type:{
                default()
                {
                    return "place";
                }
            },
            //选项数据
            datas:{
                default()
                {
                    return [["1","2","3","5","10","11"],["4","5","6"]];
                }
            },
            //取消文本
            cancelText:{
                default()
                {
                    return "取消";
                }
            },
            //确认文本
            confirmText:{
                default()
                {
                    return "确认";
                }
            },
            //标题
            title:{
                default()
                {
                    return "请选择";
                }
            },
            //选项的高度
            optionHeight:{
                default()
                {
                    return 50;
                }
            },
            //默认值
            values:{
                default()
                {
                    return ["1990","05","02"];
                }
            },
            //分隔符
            separate:{
                default()
                {
                    return [];
                }
            },
            maxYear:{
                default()
                {
                    return 2019
                }
            },
            minYear: {
                default() {
                    return 1989
                }
            }
        },
        created()
        {
            this.handleData();
        },
        methods:{
            //计算动画
            calcOffseTop(contentHeight,itemHeight,Y)
            {

                var count=0,
                    resultY=0;
                count=Math.floor(Y/itemHeight);
                resultY=count*itemHeight;
                if(resultY<=-(contentHeight-itemHeight))
                {
                    resultY=-(contentHeight-itemHeight);
                }
                if(resultY>=0)
                {
                    resultY=0;
                }
                return resultY
            },
            _touchStart(index,e)
            {
                let that=this;
                that.itemsDomArr[index].style.transition="";
                that.itemsDomArr[index].startY=e.changedTouches[0].pageY;
                that.itemsDomArr[index].nowY=that.itemsDomArr[index].nowHelpY
                that.itemsDomArr[index].timeInterval=setInterval(function(){
                    that.itemsDomArr[index].time++
                },10)
            },
            _touchMove(index,e)
            {
                let that=this;
                e.preventDefault();//去掉ios的橡皮筋效果
                that.itemsDomArr[index].moveY=e.changedTouches[0].pageY-that.itemsDomArr[index].startY;

                that.itemsDomArr[index].style.webkitTransform="translateY("+parseInt(that.itemsDomArr[index].nowY+that.itemsDomArr[index].moveY)+"px)"
                that.itemsDomArr[index].nowHelpY=parseInt(that.itemsDomArr[index].nowY+that.itemsDomArr[index].moveY)
            },
            _touchEnd(index,e)
            {
                let that=this,
                    target=e.currentTarget.children[0].children[0];
                clearInterval(that.itemsDomArr[index].timeInterval);
                that.itemsDomArr[index].direction=that.itemsDomArr[index].moveY;
                that.itemsDomArr[index].speed=that.itemsDomArr[index].direction/that.itemsDomArr[index].time;

                var continueMoveY=0;


                that.itemsDomArr[index].startY=0;
                that.itemsDomArr[index].time=0;
                that.itemsDomArr[index].nowY=that.itemsDomArr[index].nowHelpY;


                that.itemsDomArr[index].style.transition="all .5s";
                if(that.itemsDomArr[index].moveY)
                {
                    //根据速度 添加缓冲
                    continueMoveY=+(parseInt(that.itemsDomArr[index].speed)*10);

                    //缓冲移动距离
                    var shouldY=that.calcOffseTop(target.offsetHeight,that.optionHeight,that.itemsDomArr[index].nowY+continueMoveY);
                    //目前选择索引
                    that.itemsDomArr[index].index=Math.abs(shouldY/that.optionHeight);
                    //动起来

                    that.itemsDomArr[index].style.webkitTransform="translateY("+parseInt(shouldY)+"px)";
                    //选择的高亮
                    //that.removeClass(that.itemsDomArr[index].dom.children,"cui-picker-item-option-active");
                    //that.addClass(that.itemsDomArr[index].dom.children[that.itemsDomArr[index].index],"cui-picker-item-option-active");
                    that.itemsDomArr[index].nowHelpY=shouldY;
                    //valueIndexArr[index]=that.itemsDomArr[index].index;
                    //给要返回的结果数组赋值（已经选中的值）
                    that.itemsDomArr[index].value=that.data[index][that.itemsDomArr[index].index];

                    that.changeCol(index,that.data[index][that.itemsDomArr[index].index],()=>{
                        //调用列改变时api
                        that.$emit("changeCol",index,that.data[index][that.itemsDomArr[index].index]);
                    })

                }
                that.itemsDomArr[index].moveY=0;

            },
            //（从字符串里面）处理默认值的格式
            handleFormat(v)
            {
                let separateArr=this.separate,
                    value=v;
                if(separateArr&&separateArr instanceof Array&&separateArr.length)
                {
                    separateArr.map(function(item){
                        value=value.replace(item," ")
                    })
                }
                return value;
            },

            //选择月份时更新对应的日
            handleUpdateDayForMonth()
            {
                let that=this;
                that.changeCol=function(colIndex,data,cb)
                {
                    let callback=cb;
                    if(colIndex===1)
                    {
                        let d=new Date(that.itemsDomArr[0].value,data,0).getDate(),
                            dayArr=[];
                        for(let x=1;x<=d;x++)
                        {
                            dayArr.push(x<=9?"0"+x:x+"");

                        }
                        //更新日

                        that.data[2]=dayArr;
                        that.itemsDomArr[2].style.webkitTransform="translateY(0)";
                    }
                    callback();
                }
            },
            //处理日期的数据(2018-3-5)
            handleDateData()
            {
                var datedata=[],
                    that=this;
                for(var dateItem=0;dateItem<3;dateItem++)
                {
                    //年
                    if(dateItem===0)
                    {
                        var yearItemData=[],
                            maxyear=parseInt(that.maxYear),
                            minyear=parseInt(that.minYear);
                        for(var yearItem=minyear;yearItem<=maxyear;yearItem++)
                        {
                            yearItemData.push(yearItem+"");
                        }
                    }
                    //月
                    if(dateItem===1)
                    {
                        var monthItemData=[];
                        for(var monthItem=1;monthItem<13;monthItem++)
                        {
                            monthItem=monthItem<10?"0"+monthItem:monthItem+"";
                            monthItemData.push(monthItem)
                        }
                    }
                    //日
                    if(dateItem===2)
                    {
                        var dayItemData=[];
                        for(var dayItem=1;dayItem<=that.nowDayCount;dayItem++)
                        {
                            dayItem=dayItem<10?"0"+dayItem:dayItem;
                            dayItemData.push(dayItem)
                        }
                    }
                }
                datedata.push(yearItemData)
                datedata.push(monthItemData)
                datedata.push(dayItemData)
                that.handleUpdateDayForMonth();
                return datedata;
            },

            //处理时间的数据（19:39）
            handleTimeData()
            {
                var timeData=[];
                for(var timeItem=0;timeItem<2;timeItem++)
                {
                    //时
                    var houseItemData=[];
                    for(var houseItem=0;houseItem<=23;houseItem++)
                    {
                        houseItem=houseItem<10?"0"+houseItem:houseItem;
                        houseItemData.push(houseItem);
                    }
                    //分
                    var mintuesItemData=[];
                    for(var mintuesItem=0;mintuesItem<=59;mintuesItem++)
                    {
                        mintuesItem=mintuesItem<10?"0"+mintuesItem:mintuesItem;
                        mintuesItemData.push(mintuesItem);
                    }

                }
                timeData.push(houseItemData);
                timeData.push(mintuesItemData);
                return timeData;
            },
            //处理三级联动（地点）
            handlePlaceData()
            {
                let that=this;

                import("@/components/cui-vue/place").then(function(place){
                    let cuiPlace=place.default;

                    console.log(cuiPlace)

                    that.changeCol=(colIndex,data,cb)=>
                    {
                        let callback=cb;
                        console.log(that.itemsDomArr)
                        if(colIndex===0)
                        {
                            var city=that.itemsDomArr[colIndex].value.city;

                            if(city)
                            {
                                that.data[colIndex+1]=city;
                                that.itemsDomArr[colIndex+1].nowHelpY=0;
                                that.itemsDomArr[colIndex+1].style.webkitTransform='translateY('+that.itemsDomArr[colIndex+1].nowHelpY+'px)'
                            }

                            that.data[colIndex+2]=city[0].area;
                            //that.itemsDomArr[colIndex+1].value="";
                            that.itemsDomArr[colIndex+1].index=0;
                            //that.itemsDomArr[colIndex+2].value="";
                            that.itemsDomArr[colIndex+2].index=0;
                        }

                        if(colIndex===1)
                        {

                            var area=that.itemsDomArr[colIndex].value.area;
                            area=area?area:[];

                            that.data[colIndex+1]=area;
                            that.itemsDomArr[colIndex+1].nowHelpY=0;
                            that.itemsDomArr[colIndex+1].style.webkitTransform='translateY('+that.itemsDomArr[colIndex+1].nowHelpY+'px)'
                            that.itemsDomArr[colIndex+1].value="";
                            that.itemsDomArr[colIndex+1].index=0;
                        }
                        callback();

                    }
                    //市
                    var defaultCityData=[],//根据已经选中的省 更新市
                        defaultAreaData=[];//根据已经选中的市 更新县


                    if(that.itemsDomArr[0].index!==-1)
                    {
                        //defaultCityData=that.datas[0][that.itemsDomArr[0].index].city
                    }
                    if(that.itemsDomArr[0].index!==-1&&that.itemsDomArr[1].index!==-1)
                    {
                        //defaultAreaData=that.datas[0][that.itemsDomArr[0]].city[that.itemsDomArr[1]].area
                    }

                    console.log(that.itemsDomArr)

                    that.data= [cuiPlace,defaultCityData,defaultAreaData]

                });
            },
            //处理日期时间的数据（2018-3-5 19:39）
            handleDateTimeData()
            {
                this.handleUpdateDayForMonth()
                return this.handleDateData().concat(this.handleTimeData())
            },

            //根据type给data赋对应的数组
            switchType()
            {
                //特定的类型
                if(this.type)
                {
                    switch(this.type)
                    {
                        case 'date':this.data=this.handleDateData();break;
                        case 'datetime':this.data=this.handleDateTimeData();break;
                        case 'time':this.data=this.handleTimeData();break;
                    }
                }
            },
            //处理数据
            handleData()
            {
                let that=this;

                if(that.type!=="place")
                {
                    that.switchType();

                    that.data.forEach((item,index)=>{

                        let activeindex=0;
                        item.forEach((sitem,sindex)=>{


                            if(typeof sitem ==="object")
                            {
                                if(that.values&&that.values[index]&&that.values[index]===(sitem.value?sitem.value:sitem.name))
                                {
                                    activeindex=sindex;
                                }
                            }
                            else if(typeof sitem ==="string")
                            {
                                if(that.values&&that.values[index]&&that.values[index]===sitem)
                                {
                                    activeindex=sindex;
                                }
                            }

                        });
                        that.itemsDomArr.push({
                            style:{
                                webkitTransition:"",
                                transition:"",
                                webkitTransform:"translateY(-"+(activeindex*50)+"px)",
                                transform:"translateY(-"+(activeindex*50)+"px)",
                            },
                            startY:0,
                            moveY:0,
                            nowY:0,
                            selectedTop:0,
                            speed:0,
                            time:0,
                            timeInterval:null,
                            direction:0,
                            nowHelpY:parseInt("-"+activeindex)*50,
                            index:activeindex,
                            value:that.values&&that.values[index]?that.values[index]:""
                        })
                    });
                }
                else
                {
                    that.data=[[],[],[]];
                    that.data.forEach((item,index)=>{

                        let activeindex=0;
                        item.forEach((sitem,sindex)=>{


                            if(typeof sitem ==="object")
                            {
                                if(that.values&&that.values[index]&&that.values[index]===(sitem.value?sitem.value:sitem.name))
                                {
                                    activeindex=sindex;
                                }
                            }
                            else if(typeof sitem ==="string")
                            {
                                if(that.values&&that.values[index]&&that.values[index]===sitem)
                                {
                                    activeindex=sindex;
                                }
                            }

                        });
                        that.itemsDomArr.push({
                            style:{
                                webkitTransition:"",
                                transition:"",
                                webkitTransform:"translateY(-"+(activeindex*50)+"px)",
                                transform:"translateY(-"+(activeindex*50)+"px)",
                            },
                            startY:0,
                            moveY:0,
                            nowY:0,
                            selectedTop:0,
                            speed:0,
                            time:0,
                            timeInterval:null,
                            direction:0,
                            nowHelpY:parseInt("-"+activeindex)*50,
                            index:activeindex,
                            value:that.values&&that.values[index]?that.values[index]:""
                        })
                    });
                    that.handlePlaceData();
                }
            },
            //确认
            confirm()
            {
                this.$emit("onSuccess")
            },
            //取消
            cancel()
            {
                this.$emit("onCancel")
            }
        }
    }
</script>

<style scoped>


    .slide-enter-active,
    .slide-leave-active {
        will-change: transform;
        transition: all 500ms;
        position: absolute;
    }

    .slide-enter {
        opacity: 0;
    }

    .slide-leave-active {
        opacity: 0;

    }

    .slide-enter-active
    {

    }
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
