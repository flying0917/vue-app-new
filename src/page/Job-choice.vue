<template>
    <div class="cui-content">
        <div class="choice-content">
            <!-- 大范围职业 -->
            <div class="choice choice-part">
                <ul>
                    <li><button class="choice-button" @click="Part(item.code)" v-for="item in choicePart" :key="item.id">{{item}}</button></li>
                </ul>
            </div>
            <!-- 小范围职业 -->
            <div class="choice choice-major">
                <ul>
                    <li><button class="choice-button" v-for="item in choiceMajor" :key="item.id">{{item}}</button></li>
                </ul>
            </div>
            <!-- 具体职业 -->
            <div class="choice choice-concrete">
                <ul>
                    <li><button class="choice-button" v-for="item in choiceConcrete" :key="item.id">{{item}}</button></li>
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
                {code:1,name:'产品系列'},
                {code:2,name:'金融系列'}
            ],
            choiceMajor:[
                {parCode:1,name:'产品经理',childcode:1001},
                {parCode:2,name:'部门经理',childcode:2001},
            ],
            choiceConcrete:[
                {parCode:1001,name:'部门副经理'},
                {parCode:2001,name:'部门经理'},
            ],
            
            partNum:0,
            majorNum:0,
            concrete:0
        }
    },
    methods:
    {
        // Part(num){
        //     partNum=this.num;
        // }
    },
    created()
    {

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
</style>