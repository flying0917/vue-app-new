<template>
    <div class="cui-content">
        <div class="choice-content">
            <div class="choice choice-part">
                <ul>
                    <li><button class="choice-button" @click="Part(item.code)" :class="{'button-active':partNum == item.code}" v-for="item in choicePart" :key="item.id">{{item.name}}</button></li>
                </ul>
            </div>
            <div class="choice choice-major">
                <ul >
                    <li><button class="choice-button"  @click="Major(item.childCode)" :class="{'button-active':majorNum == item.childCode}" v-for="item in AciveMajor"  :key="item.id">{{item.name}}</button></li>
                </ul>
            </div>
            <div class="choice choice-concrete">  
                <ul>
                    <li><button class="choice-button"  @click="Concrete(item.parCode)" :class="{'button-active':concrete == item.parCode}" v-for="item in AciveConcrete" :key="item.id">{{item.name}}</button></li>
                </ul>
            </div>  
        </div>
    </div>
</template>
<script>
export default {
    name:'job-choice',
    data(){
        return {
            choicePart:[
                {code:101,name:'产品系列'},
                {code:201,name:'金融系列'},
                {code:301,name:'1金融系列'},
                {code:401,name:'2金融系列'},
            ],
            choiceMajor:[
                {parCode:101,name:'产品经理',childCode:1001},
                {parCode:101,name:'产品经理2',childCode:1002},
                {parCode:201,name:'部门经理',childCode:2001},
                {parCode:301,name:'部门经s理',childCode:3001},
                {parCode:401,name:'部门经d理',childCode:4001},
            ],
            choiceConcrete:[
                {parCode:1001,name:'部门副经理'},
                {parCode:2001,name:'部门经理'},
                {parCode:3001,name:'部门经理'},
            ],
            partNum:0,
            majorNum:0,
            concrete:0,
        }
    },
    methods:
    {
        Part(num){
            this.partNum=num;
        },
        Major(num){
            this.majorNum=num;
        },
        Concrete(num){
            this.concrete=num;
        }
    },
    computed:{
        AciveMajor(){
            let that=this;
            return this.choiceMajor.filter(
                function(item){
                    return (item.parCode===that.partNum);
                });
        },
        AciveConcrete(){
            let that=this;
            return this.choiceConcrete.filter(
                function(item){
                    return (item.parCode===that.majorNum);
                });
        }
    }
}
</script>


<style>
    .choice
    {
        height: 100%;
        overflow-y:auto;
        overflow-x: hidden;
        flex:1;
        text-align: center;
    }
    .choice-content{
        width:100%;
        height: 100%;
        display:flex;
        background-color: #ffffff!important;
    }
    .choice-part
    {
        background-color:white;
    }
    .choice-major
    {
        background-color:#F7F7F7;
    }
    .choice-concrete
    {
        background-color:#EDEDED
    }
    .choice-button{
        margin:0;
        padding:0;
        background-color: rgba(255, 255, 255, 0);
        width: 100%;
        border: none;
        cursor: pointer;
    }
    .button-active{
        color:#74c7ff;
    }

    /* 动画设置 */

</style>