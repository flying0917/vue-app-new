<template>
    <div class="tip">
        <span>登录即代表您同意“招聘app”的</span><a>服务和隐私条款</a>
    </div>
</template>

<script>

    export default {
        name: "Provision"
    }
</script>

<style scoped>
    .tip
    {
        font-size:.3rem;
        color:#999999;
        position:absolute;
        text-align: center;
        margin:0;
        right:0;
        left:0;
        font-family:Adobe Heiti Std R;
        bottom:.5px;
    }
    .tip a
    {
        color:#5ed2fa;
    }
</style>
