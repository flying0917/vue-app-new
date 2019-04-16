<template>
    <div class="position-list">
        <div class="position-list-item" >
            <div class="position-list-header">
                <div class="title">Web前端</div>
                <div class="remuneration">1万-2万</div>
            </div>
            <div class="position-list-content">
                <i>广州天河</i>
                <i>1-3年</i>
                <i>大专</i>
            </div>
            <div class="position-list-footer">
                <div class="position-list-avator">
                    <img src="http://img95.699pic.com/photo/50055/5642.jpg_wh300.jpg">
                </div>
                <div class="position-list-name">
                    <div>育贝科技</div>
                    <div class="time">2018-10-19</div>
                </div>
            </div>
        </div>

        <div class="position-list-item" >
            <div class="position-list-header">
                <div class="title">php后台开发</div>
                <div class="remuneration">1万-2万</div>
            </div>
            <div class="position-list-content">
                <i>深圳</i>
                <i>1-3年</i>
                <i>大专</i>
            </div>
            <div class="position-list-footer">
                <div class="position-list-avator">
                    <img src="http://img95.699pic.com/photo/50055/5642.jpg_wh300.jpg">
                </div>
                <div class="position-list-name">
                    <div>小米科技</div>
                    <div class="time">2018-10-19</div>
                </div>
            </div>
        </div>


        <div class="position-list-item" >
            <div class="position-list-header">
                <div class="title">Web前端</div>
                <div class="remuneration">1万-2万</div>
            </div>
            <div class="position-list-content">
                <i>广州天河</i>
                <i>1-3年</i>
                <i>大专</i>
            </div>
            <div class="position-list-footer">
                <div class="position-list-avator">
                    <img src="http://img95.699pic.com/photo/50055/5642.jpg_wh300.jpg">
                </div>
                <div class="position-list-name">
                    <div>育贝科技</div>
                    <div class="time">2018-10-19</div>
                </div>
            </div>
        </div>


        <div class="position-list-item" >
            <div class="position-list-header">
                <div class="title">Web前端</div>
                <div class="remuneration">1万-2万</div>
            </div>
            <div class="position-list-content">
                <i>广州天河</i>
                <i>1-3年</i>
                <i>大专</i>
            </div>
            <div class="position-list-footer">
                <div class="position-list-avator">
                    <img src="http://img95.699pic.com/photo/50055/5642.jpg_wh300.jpg">
                </div>
                <div class="position-list-name">
                    <div>育贝科技</div>
                    <div class="time">2018-10-19</div>
                </div>
            </div>
        </div>

        <div class="position-list-item" >
            <div class="position-list-header">
                <div class="title">Web前端</div>
                <div class="remuneration">1万-2万</div>
            </div>
            <div class="position-list-content">
                <i>广州天河</i>
                <i>1-3年</i>
                <i>大专</i>
            </div>
            <div class="position-list-footer">
                <div class="position-list-avator">
                    <img src="http://img95.699pic.com/photo/50055/5642.jpg_wh300.jpg">
                </div>
                <div class="position-list-name">
                    <div>育贝科技</div>
                    <div class="time">2018-10-19</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Position",
        props:{
            data:{
                default()
                {
                    return []
                }
            },
            filterData:{
                default()
                {
                    return {}
                }
            }
        }
    }
</script>

<style scoped>
    .position-list
    {

        padding:0;
        margin-top:.1rem;
    }
    .position-list-item
    {
        min-height:2rem;
        margin-bottom:.3rem;
        padding:.75rem;
        background-color:white;
    }
    .position-list-header
    {
        height:1rem;
        line-height: 1rem;
    }
    .position-list-header .title
    {
        width:70%;
        height:100%;
        float:left;
        font-size:.8rem;
        font-weight: bold;
        vertical-align: top;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .position-list-header .remuneration
    {
        width:30%;
        float:left;
        color:#5ed2fa;
        font-size:.6rem;
        vertical-align: top;
        text-align: right;
    }
    .position-list-content
    {
        height:1rem;
        line-height: .8rem;
        margin:.5rem 0;
    }
    .position-list-content i
    {
        font-size:.6rem;
        display:inline-block;
        height:.8rem;
        padding:0 .4rem;
        border-radius:.4rem;
        line-height: .8rem;
        background-color: rgba(94, 210, 250, 0.5);
        color:white;
    }
    .position-list-footer
    {
        display:-webkit-box;
        display:-webkit-flex;
        display:flex;
        line-height: 1;
    }
    .position-list-avator
    {
        width:1.5rem;
        height:1.5rem;
        border-radius:50%;
        background-color: rgba(206, 206, 206, 0.53);
        margin-right:10px;
        overflow:hidden;
        border:2px solid #e8e8e8;
    }
    .position-list-avator img
    {
        width:100%;
        height:100%;
    }
    .position-list-name
    {
        height:1.5rem;
        font-size:.6rem;
        color:#6f6e6e;
        -webkit-box-flex:1;
        -webkit-flex:1;
        flex:1;
    }
    .position-list-name>div
    {
        line-height: .75rem;
        width:50%;
        float:left;
        margin-top:.375rem;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .time
    {
        text-align: right;
    }
</style>
