<template>
    <!-- 父组件 -->
    <div class="cui-content">
        <div class="choice-part">
            <!-- <input v-model="choicePart" type="text"> -->
            <span>{{choicePart}}</span>
        </div>

    </div>
</template>
<script>
export default {
    name:'job-choice',
    data(){
        return {
            choicePart:12
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

</style>