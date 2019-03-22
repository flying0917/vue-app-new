<template>
    <div class="cui-content">
        <div :class="['choice-content']">
            <!-- 大范围职业 -->
            <div :class="['choice','choice-part']">
                <!-- <input v-model="" type="text"> -->
                <ul>
                    <li v-for="item in choicePart" :key="item.id">{{item}}</li>
                </ul>
            </div>
            <!-- 小范围职业 -->
            <div :class="['choice','choice-major']">
                <input v-model="choiceMajor" type="text">
            </div>
            <!-- 具体职业 -->
            <div :class="['choice','choice-concrete']">
                <input v-model="choiceConcrete" type="text">
            </div>    
        </div>
    </div>
</template>
<script>
export default {
    name:'job-choice',
    data(){
        return {
            choicePart:[12,23],
            choiceMajor:[],
            choiceConcrete:[]
        }
    },
    methods:
    {
        
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
</style>