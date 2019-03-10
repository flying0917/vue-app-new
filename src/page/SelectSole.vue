<template>
    <div class="cui-content">
        <div class="title">选择身份</div>
        <p>
            请根据提示选择你的声份，选择后可以在设置中 进行切换
        </p>
        <div class="sole-type">
            <div class="sole-type-item sole-type-find"></div>
            <div class="sole-type-item sole-type-get"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SelectSole"
    }
</script>

<style scoped>
    .cui-content
    {
        padding:1.5rem;
        font-family:微软雅黑;

    }
    .cui-content .title
    {
        color:#49CBF6;
        font-size:1.5rem;
    }
    .cui-content p
    {
        margin-top:.5rem;
        color:#999999;
        line-height: 1.4;
    }
    .sole-type
    {
        width:100%;
    }
    .sole-type .sole-type-item
    {
        height:5rem;
        width:5rem;
        margin:1.5rem auto;
        border-radius:50%;
        box-shadow: 1px 3px 4px #c3c3c3;
    }
</style>
