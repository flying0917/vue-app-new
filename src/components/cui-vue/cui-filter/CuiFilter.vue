<template>
    <div class="cui-filter-content">
        <div class="cui-filter cui-flex-wrap">
            <div :class='activeIndex===index?"cui-filter-item cui-flex-con cui-filter-item-active":"cui-filter-item cui-flex-con"' @click="showFilterContent(index,item.type)" v-for="(item,index) in data">
                {{item.value&&item.value[1]&&item.value[1][0]&&typeof item.value[1][0] ==="string"&&!item.multiple?item.value[1][0]:item.text}}
            </div>
        </div>
        <transition name="fade">
            <div class="cui-filter-item-content" v-if="activeIndex!==-1" @click.stop="close()">
                <div @click.stop v-for="(item,index) in data" v-if="activeIndex===index" :class='"cui-flex-wrap cui-filter-wrap cui-filter-item-"+item.type'>
                    <!---地点-->
                    <template v-if="item.type==='place'||item.type==='tree'">
                        <div class="cui-fitler-item-p">
                            <div :class='(item.value&&item.value[0]?item.value[0]:"")===y.name?"cui-filter-item-p-item active":"cui-filter-item-p-item"' @click.stop="showSub(index,y.name,y.city?y.city:y.children)" v-for="y,index in renderData">{{y.name}}</div>
                        </div>
                        <div class="cui-filter-item-c cui-flex-con">
                            <div :class='value.indexOf(i.name)!==-1?"cui-filter-item-c-item active":"cui-filter-item-c-item"' @click.stop="select((item.multiple),i.name,-1)" v-for="i in subData">{{i.name}}</div>
                        </div>
                    </template>
                    <!---地点end-->

                    <!--多类型-->
                    <template v-if="item.type==='many'">
                        <div class="cui-filter-item-c cui-flex-con">
                            <div class="cui-filter-item-option" v-for="subOptionItem,subOptionItemIndex in item.data">
                                <label>{{subOptionItem.text}}</label>
                                <div class="cui-filter-item-sub">
                                    <div  :class='value[subOptionItemIndex].indexOf(subOption)!==-1?"cui-option cui-option-active":"cui-option"' @click.stop="select((subOptionItem.type==='checkbox'?true:false),subOption,subOptionItemIndex)" v-for="subOption in subOptionItem.options">{{subOption}}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!--多类型end-->

                    <!--单选-->
                    <template v-if="item.type==='radio'">
                        <div class="cui-filter-item-c cui-flex-con">
                            <div :class='value&&value[0]&&value[0].indexOf(radioItem)!==-1?"cui-filter-item-option cui-filter-item-option-active":"cui-filter-item-option"' v-for="radioItem,radioIndex in item.data" @click="select(item.multiple,radioItem,0)">
                                {{radioItem}}
                            </div>
                        </div>
                    </template>
                    <!--单选end-->

                    <!--多选-->
                    <template v-if="item.type==='checkbox'">
                        <div class="cui-filter-item-c cui-flex-con">
                            <div class="cui-filter-item-option">
                                <div class="cui-filter-item-sub">
                                    <div v-for="checkboxItem in item.data" :class='value.indexOf(checkboxItem)!==-1?"cui-option cui-option-active":"cui-option "' @click="select(item.multiple,checkboxItem,0)">{{checkboxItem}}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!--多选end-->
                </div>
                <div class="cui-filter-btn cui-flex-wrap">
                    <div class="cui-filter-btn-item" @click.stop="close()">取消</div>
                    <div class="cui-filter-btn-item" @click.stop="confirm()">确定</div>
                </div>

            </div>
        </transition>

    </div>

</template>

<script>
    export default {
        name: "CuiFilter",
        data()
        {
            return {
                activeIndex:-1,//目前打开的筛选类型
                renderData:[],//要渲染的数据
                subData:[],//子数据 for (place,tree类型)

                type:"",//有 place(地点),tree(树),many(各种类型),checkbox(多选),radio(单选)等类型
                parentValue:"",//父节点目前的值 for (place,tree类型)
                value:[],//目前选中的值
            }
        },
        props:
         {
             data:{
                 required:true,
                 default()
                 {
                     return [];
                 }
             }
         },
        created()
        {
            this.data.forEach((item,index)=>{
                if(item.type==="place"||item.type==="tree")
                {
                    item.value=["",[]];
                    item.parentIndex=-1;
                }
                else if(item.type==="many")
                {
                    item.value=[];
                    item.data.forEach((x,i)=>{
                        item.value.push([])
                    })
                }
                else
                {
                    item.value=[[]];
                }
                if(item.multiple!==false)
                {
                    item.multiple=true;
                }
                if(item.type==="radio")
                {
                    item.multiple=false;
                }
                if(item.type==="checkbox")
                {
                    item.multiple=true;
                }

            })

        },
        methods:{
            //展示筛选层试图
            showFilterContent(index,type)
            {
                this.activeIndex=index;
                this.type=type;
                this.subData=[];
                if(this.type==='place')
                {
                    var that=this;
                    import("@/components/cui-vue/place").then(function(place){
                        that.renderData=place.default;
                    });
                    // this.renderData=place;
                    this.value=this.data[this.activeIndex].value[1]?this.data[this.activeIndex].value[1]:[];
                    this.subData=this.data[this.activeIndex].parentIndex!==-1?this.renderData[this.data[this.activeIndex].parentIndex].city:[];
                }
                else if(this.type==='tree')
                {
                    this.renderData=this.data[this.activeIndex].data;
                    this.value=this.data[this.activeIndex].value[1]?this.data[this.activeIndex].value[1]:[];
                    this.subData=this.data[this.activeIndex].parentIndex!==-1?this.renderData[this.data[this.activeIndex].parentIndex].children:[];
                }
                else if(this.type==="many")
                {
                    this.value=this.data[this.activeIndex].value?this.data[this.activeIndex].value:[];
                }
                else
                {
                    this.renderData=this.data[this.activeIndex].data;
                    this.value=this.data[this.activeIndex].value[0]?this.data[this.activeIndex].value[0]:[];

                }

            },
            //展示子数据
            showSub(index,p,data)
            {
                this.subData=data;
                this.data[this.activeIndex].parentIndex=index;
                this.$set(this.data[this.activeIndex].value, 0, p);
                //this.data.value[0]=p;
            },
            //选择值
            select(multiple,selectValue,index)
            {

                let nowItemValue=this.data[this.activeIndex],
                    i=index!==-1?index:1;
                if(multiple)//多选
                {
                    if(nowItemValue.value[i].indexOf(selectValue)===-1)
                    {
                        nowItemValue.value[i].push(selectValue);
                    }
                    else
                    {
                        nowItemValue.value[i].splice(nowItemValue.value[i].indexOf(selectValue),1);

                    }
                }
                else//单选
                {
                    if(nowItemValue.value[i].indexOf(selectValue)===-1)
                    {
                        nowItemValue.value[i]=[selectValue];
                    }
                    else
                    {
                        nowItemValue.value[i]=[];
                    }
                }
                if(this.type==="many")//混合类型的数据处理
                {
                    this.$set(this.value,index,nowItemValue.value[index]);
                }
                else
                {
                    this.value=nowItemValue.value[i];
                }

                this.$emit("onChange",{value:this.value,name:nowItemValue.name});//当值有变动时调用 返回当前改变的值

            },
            //确认选择事件
            confirm()
            {
                this.activeIndex=-1;
                this.$emit("onSuccess",this.data);
            },
            //关闭
            close()
            {
                this.activeIndex=-1;
                this.$emit("onCancel",this.data);
            }

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
    /*筛选*/
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
    .cui-filter-content
    {

        color:#6f6e6e;

    }
    .cui-filter
    {
        height:2rem;
        background-color:white;
        border-bottom:1px solid #f7f7f7;
    }
    .cui-filter .cui-filter-item
    {
        font-size:12px;
        text-align: center;
        color:#6f6e6e;
        line-height: 2rem;
        overflow:hidden;
    }
    .cui-filter-item span
    {
        font-size:10px;
        margin-left:2px;
    }
    .cui-filter-wrap
    {
        background-color:white;
    }
    .cui-filter-item-content
    {
        width:100%;
        position:absolute;
        top:2rem;
        z-index: 3;
        background-color: rgba(0, 0, 0, 0.47);
        height:100%;
        -webkit-transform: translateY(2rem);
        -moz-transform: translateY(2rem);
        -ms-transform: translateY(2rem);
        -o-transform: translateY(2rem);
        transform: translateY(2rem);
        -webkit-transition: all .4s;
        -moz-transition: all .4s;
        -ms-transition: all .4s;
        -o-transition: all .4s;
        transition: all .4s;
    }
    .cui-filter-item-content.active
    {
        opacity:1;
    }
    .cui-filter-item:after{
        content:"";
        width:15px;
        height:15px;
        margin-left:5px;
        display:inline-block;
        vertical-align:middle;
        position:relative;
        background-size:cover;
        background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABMUlEQVRYR+2UvUrEQBSFz3WjqyD4LDYKeQ0rwWKrCAFHUthKwFZwc2e6rfwpfIgFRfRZrBZ8gE2ujBCQsJtMxsBaTNrkzvdx5twQNvzQhvkIAiGBkEBI4H8noJSKt6qKpsZ89P1jZlm2Vy2Xd0L0xMzv6+ZbE7hU6lFETkF0xszPrhIWXpblnIBYgAkz33sJpGm6vx1FcxE5ImBSaP3QJfEbDpFZoXXSNtPZgYbEeaH1bN2BfeH2nE4B+1EtAeAYIheF1qYp4QN3FmhKCHDFzLe1hC+8l8AKiWtmvvkLvLdALRGNRm9EdCiATSG2bXcp3KruOHWgOZgkycHuePxiJX7eObTdaw3b1ifP852vxeIEIp9TY1671nNwAV9gc87rCoaCe5VwSHgQCAmEBEICNoFvZAaPIZPR+GAAAAAASUVORK5CYII=")
    }
    .cui-filter-item-active
    {
        color:#61d7ff !important;
    }
    .cui-filter-item-active:after{
        content:"";
        width:15px;
        height:15px;
        margin-left:5px;
        display:inline-block;
        vertical-align:middle;
        position:relative;
        background-size:cover;
        background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABA0lEQVRYR+2UvQ4BQRRGv0tC7R3ExvIWGgkKjYQobKlQKL2BUqWUKb2AikKynmFJFKLTiqhIriiI3zVzm41ktr475+yZmyVE/FDEfFgBW8AWsAX+t0BnzcnDCbVYHJuRQwvpH1VUoLHlVOIInwi5K5gZA+VSVyJhLHCHAxkGSgRUQWhLJYwEXuHKpen1q72Ah1IJbYGH7GlmVG7wW3aphJbAExwoqizNP933XQLoqyz1dHbip4Au/K2EpkSogClcIhEq0Ap4QoQCh2T/lvlhJ+rKpfG3uVABb8lljmGvHPJ17vN1xltxk8+YqTztRAISqOk7P5fQ9EDTeStgC9gCtkDkBS7eAXchNXyaTQAAAABJRU5ErkJggg==")
    }
    /**/
    .cui-filter-item-tree
    {
        height:60%;
    }
    /*多类型*/
    .cui-filter-item-many
    {
        height:50%;
    }
    .cui-filter-item-option
    {
        font-size:.6rem;
        padding:0 0 10px 0;
    }
    .cui-filter-item-option>label
    {
        font-weight: bold;
        margin-top:.5rem;
        padding-left:10px;
    }
    .cui-filter-item-option>.cui-filter-item-sub
    {
        margin-top:.5rem;
    }
    .cui-filter-item-sub .cui-option
    {

        width:calc(33% - 10px);
        margin:0 0 10px 10px;
        display:inline-block;
        height:1.5rem;
        line-height: 1.5rem;
        border:1px solid #efefef;
        text-align: center;
    }
    .cui-filter-item-sub .cui-option-active
    {
        background-color:#61d7ff;
        color:white;
        border:1px solid #61d7ff;
    }




    /*地点*/
    .cui-filter-item-place
    {
        height:60%;
    }
    .cui-fitler-item-p
    {
        width:5rem;
        background-color:#f9f9f9;
        height:100%;
        overflow-y:auto;

    }
    .cui-fitler-item-p .cui-filter-item-p-item
    {
        min-height:2rem;
        font-size:.6rem;
        padding:.5rem 0;
        text-align: center;
    }
    .cui-fitler-item-p .active
    {
        background-color:white;
        color:#61d7ff;
    }
    .cui-filter-item-c
    {
        height:100%;
        overflow-y:auto;
        padding:.5rem 10px 10px 0;
        font-size:0;
        background-color:white;
    }
    .cui-filter-item-c .active
    {
        background-color:#61d7ff;
        color:white;
        border:1px solid #61d7ff;
    }
    .cui-filter-item-c-item
    {
        width:calc(33% - 10px);
        display:inline-block;
        vertical-align: top;
        margin-left:10px;
        margin-bottom:10px;
        text-align: center;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
        font-size:.4rem;
        height:1.5rem;
        line-height: 1.5rem;
        border:1px solid #efefef;
    }


    /*按钮*/
    .cui-filter-btn
    {
        background-color:white;
        -webkit-box-shadow:0 -3px 3px #f7f5f5;
        -moz-box-shadow:0 -3px 3px #f7f5f5;
        box-shadow:0 -3px 3px #f7f5f5;
        position:relative;
        z-index:1;
    }
    .cui-filter-btn-item
    {
        height:2rem;
        text-align: center;
        font-size:.7rem;
        line-height: 2rem;
    }
    .cui-filter-btn-item:first-child
    {
        width:5rem;
    }
    .cui-filter-btn-item:last-child
    {
        -webkit-box-flex:1;
        -webkit-flex:1;
        flex:1;
        background-color:#61d7ff;
        color:white;
    }
    /*单选*/
    .cui-filter-item-radio .cui-filter-item-c
    {
        padding:0 .5rem;
    }
    .cui-filter-item-radio .cui-filter-item-option
    {
        height:2rem;
        line-height: 2rem;
        padding:0 0 0 .5rem;
        border-bottom:1px solid #efefef;
    }

    .cui-filter-item-radio .cui-filter-item-option-active
    {
        color:#61d7ff;
    }
</style>
