<template>
    <div class="cui-scroll-content" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
        <slot></slot>
    </div>
</template>

<script>

    export default {
        name: "CuiScroll",
        data()
        {
            return {

            }
        },
        props:{

        },
        created()
        {

        },
        methods:{
            touchStart(e)
            {

            },
            touchMove(e)
            {

            },
            touchEnd(e)
            {

            }
        }
    }
</script>

<style scoped>
    .cui-scroll-content
    {
        height:100%;
        width:100%;
    }

</style>
