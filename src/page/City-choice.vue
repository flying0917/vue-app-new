<template>
    <div class="cui-content">
        <div class="cui-header back-btn">
            <span class="cui-iconfont cui-icon-return"></span>
            <span class="cui-header-title">选择城市</span>
        </div>
        <div class="container">
            <!-- 左边滚动选择 -->
            <div class="container-left">
                <ul>
                    <li v-for="item in allCity" :key="item.id">{{item.city}}</li>
                </ul>
            </div>
            <!-- 右边常见选项 -->
            <div class="container-right">
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'city-choice',
    data(){
        return {
            allCity:[
                {city:'常用',cityCode:99001},
                {city:'直辖市',cityCode:99002},
                {city:'河北',cityCode:99003},
                {city:'山西',cityCode:99004},
                {city:'广州',cityCode:99005},
            ]
        }
    },
    components:{
        
    }
}
</script>

<style scoped>

</style>
