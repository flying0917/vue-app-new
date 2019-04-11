<template>
    <div class="cui-filter-content">
        <div class="cui-filter cui-flex-wrap">
            <div :class='activeIndex===index?"cui-filter-item cui-flex-con cui-filter-item-active":"cui-filter-item cui-flex-con"' @click="showFilterContent(index,item.type)" v-for="(item,index) in data">
                {{item.name}}
            </div>
        </div>
        <div class="cui-filter-item-content" v-if="activeIndex!==-1">
            <div v-for="(item,index) in data" v-if="activeIndex===index" :class='"cui-flex-wrap cui-filter-wrap cui-filter-item-"+item.type'>
                <template v-if="item.type==='place'||item.type==='tree'">
                    <div class="cui-fitler-item-p">
                        <div :class='(item.value&&item.value[0]?item.value[0]:"")===y.name?"cui-filter-item-p-item active":"cui-filter-item-p-item"' @click="showSub(index,y.name,y.city?y.city:y.children)" v-for="y,index in renderData">{{y.name}}</div>
                    </div>
                    <div class="cui-filter-item-c cui-flex-con">
                        <div :class='value.indexOf(i.name)!==-1?"cui-filter-item-c-item active":"cui-filter-item-c-item"' @click="select((item.multiple?item.multiple:multiple),i.name)" v-for="i in subData">{{i.name}}</div>
                    </div>
                </template>
            </div>
            <div class="cui-filter-btn cui-flex-wrap">
                <div class="cui-filter-btn-item">重置</div>
                <div class="cui-filter-btn-item" @click="confirm()">确定</div>
            </div>

        </div>
    </div>

</template>

<script>
    import place from '@/components/cui/place'
    export default {
        name: "CuiFilter",
        data()
        {
            return {
                activeIndex:-1,
                renderData:[],
                subData:[],
                cityData:[],
                city:[],
                type:"",
                parentValue:"",
                value:[],
                multiple:false
            }
        },
        props:
            {
                data:{
                    required:true,
                    default:function()
                    {
                        return [
                            {
                                name:"地点",
                                type:"place",
                                default:"",
                                multiple:false
                            },
                            {
                                name:"公司",
                                type:"checkbox",
                                default:""
                            },
                            {
                                name:"公司",
                                type:"radio",
                                default:""
                            }]
                    }
                }
            },
        computed:{
            "datalist":function()
            {

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
                else
                {
                    item.value=[];
                }

            })
        },
        methods:{
            showFilterContent(index,type)
            {
                this.activeIndex=index;
                this.type=type;
                this.subData=[];
                if(this.type==='place')
                {
                    this.renderData=place;
                    this.value=this.data[this.activeIndex].value[1]?this.data[this.activeIndex].value[1]:[];
                    this.subData=this.renderData[this.data[this.activeIndex].parentIndex].city;
                }
                else if(this.type==='tree')
                {
                    this.renderData=this.data[this.activeIndex].data;
                    this.value=this.data[this.activeIndex].value[1]?this.data[this.activeIndex].value[1]:[];
                    this.subData=this.renderData[this.data[this.activeIndex].parentIndex].children;
                }
                else
                {
                    this.renderData=this.data[this.activeIndex].data;
                    this.value=this.data[this.activeIndex].value[0]?this.data[this.activeIndex].value[0]:[];

                }

            },
            showSub(index,p,data)
            {
                this.subData=data;
                this.data[this.activeIndex].parentIndex=index;
                this.$set(this.data[this.activeIndex].value, 0, p);
                //this.data.value[0]=p;
            },
            select(multiple,selectValue)
            {
                let nowItemValue=this.data[this.activeIndex]
                if(multiple)
                {
                    if(nowItemValue.value[1].indexOf(selectValue)===-1)
                    {
                        nowItemValue.value[1].push(selectValue);
                    }
                    else
                    {
                        nowItemValue.value[1].splice(nowItemValue.value[1].indexOf(selectValue),1);

                    }

                }
                else
                {
                    if(nowItemValue.value[1].indexOf(selectValue)===-1)
                    {
                        nowItemValue.value[1]=[selectValue];
                    }
                    else
                    {
                        nowItemValue.value[1]=[];
                    }
                }
                this.value=nowItemValue.value[1];
            },
            confirm()
            {
                let nowItem=this.data[this.activeIndex];
                if (!nowItem.value)
                {
                    nowItem.value=[];
                }

                if(nowItem&&nowItem.value&&nowItem instanceof Array)
                {
                    if(this.type==="place"||this.type==="tree")
                    {
                        nowItem.value[0]=this.parentValue;
                        nowItem.value[1]=this.value;
                    }
                    else
                    {

                    }
                }

                this.activeIndex=-1;
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
    .cui-filter-content
    {

        color:#6f6e6e;


    }
    .cui-filter
    {
        height:2rem;
        background-color:white;
    }
    .cui-filter .cui-filter-item
    {
        font-size:12px;
        text-align: center;
        color:#6f6e6e;
        line-height: 2rem;
    }
    .cui-filter-item span
    {
        font-size:10px;
        margin-left:5px;
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
        padding:.5rem;
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
        display:inline-block;
        width:30%;
        text-align: center;
        font-size:.5rem;
        padding:.2rem 0;
        margin:.2rem;
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
</style>
