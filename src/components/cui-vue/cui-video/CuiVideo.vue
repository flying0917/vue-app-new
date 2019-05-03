<template>
    <transition name="fade">
        <div class="cui-vue-video" v-if="show">
            <div class="cui-header" style="background-color:transparent;color:white;">
                <span class="cui-iconfont cui-icon-return" @click="$router.go(-1)"></span>
                <div class="cui-header-btn">
                    <div class="cui-horizontal-screen-btn" @click="changeH()"></div>
                </div>
            </div>
            <video :style='styleCss' width="100%" height="100%" ref="video" @playing="playing($event)" @ended="done" :src="url" @click="play()"></video>
            <transition name="fade">
                <div v-if="isPaused" class="cui-play-btn" @click="play()" :style='{backgroundImage:"url("+playImg+")"}'></div>
            </transition>

        </div>
    </transition>
</template>

<script>

    export default {
        name: "CuiVideo",
        data()
        {
            return {
                playImg:require("../../../assets/image/play.png"),
                isPaused:true,
                show:true,
                styleCss:{},
                url:this.$route.query.url,
                isH:false,//是否横屏
            }
        },
        created()
        {
            console.log(999999)
        },
        beforeRouteLeave(to,from,next)
        {
            //from.meta.keepAlive=false;
            to.meta.keepAlive=true;
            console.log(11111111)
            console.log(to)
            console.log(from)
            next();
        },
        methods:{
            play()
            {
                let myVideo=this.$refs["video"];
                if (myVideo.paused)
                {
                    myVideo.play();
                    this.isPaused=false;
                }
                else
                {
                    myVideo.pause();
                    this.isPaused=true;
                }
            },
            done()
            {
                this.isPaused=true;
            },
            closeVideo()
            {

                this.isPaused=true;
                this.styleCss={};
                this.$emit("close");
            },
            playing(e)
            {
            },
            changeH()
            {
                if(!this.isH)
                {
                    this.isH=true;
                    let myVideo=this.$refs["video"],
                        width=document.documentElement.clientWidth,
                        height=document.documentElement.clientHeight;
                    this.styleCss={
                        width:height+"px",
                        height:width+"px",
                        transform:"rotate(90deg)",
                        marginLeft:"-"+(height-width)/2+"px"
                    }
                }
                else
                {
                    this.isH=false;
                    this.styleCss={};
                }
            }
        }
    }
</script>

<style scoped>
.fade-enter-active,.fade-leave-active
{
    transition: all 500ms;
}
.fade-enter-active {
    opacity:1;
}
.fade-enter
{
    opacity:0;
}
.fade-leave-active {
    opacity:0;
}

.cui-header .cui-iconfont,.cui-header .cui-header-title
{
    color:white;
}
.cui-vue-video
{
    background-color: black;
    width:100%;
    height:100%;
    position:fixed;
    z-index:9999999;
    top:0;
    left:0;
}
.cui-vue-video video
{
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    -webkit-transform-origin: center;
    -moz-transform-origin: center;
    -ms-transform-origin: center;
    -o-transform-origin: center;
    transform-origin: center;
    -webkit-transform: rotate(0);
    -moz-transform: rotate(0);
    -ms-transform: rotate(0);
    -o-transform: rotate(0);
    transform: rotate(0);
}

.cui-play-btn
{
    width:2rem;
    height:2rem;
    border-radius:10px;
    background-color: rgba(0, 0, 0, 0.71);
    background-repeat: no-repeat;
    background-position:center;
    background-size:1rem;
    position:absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    margin:auto;
}
    .cui-back-btn
    {
        position:relative;
        z-index:2;
        height:1rem;
        width:1rem;
        margin:.75rem;
        background-size:cover;
        background-repeat: no-repeat;
        background-position:center;
        background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgCAYAAABgrToAAAABbklEQVRYR+3Xv0rEQBDH8e8PfAwfQV9CBEU48R82doKFnYKvoZ6N1VmpjY2FWtlY2fgMos8goojKyEIOlpCExGTPQS5lIJPPzu7szgrnj5z7GAPbzlDrDJrZCjANnEl6bAvKf98KaGbbwHEW9ErSohtgDhdcfUm7LoAFuAdgVtLLnwPNbBM4iSD3wJyk165xIV6jNZjhBtF3d8CCpPcUuEbAEty8pI9UuNpAM9sATqPM3QK91LhawALcDbAs6TNl5oaxK9dgAe4SWJf0NQpcZQbNbA24iKY1VGkf+E6ACwM+kPRW6yQxs0ngCZhIgCkLuS9p738AwyhKpvgISLH+noHzosJrWiShgpdcFMlwLbjeZiqQfjbqCBmahPw57OOoyyHjTsZPsxAh4y46vPbTblUgQ8M6k6InbNQPxrt8QVc9kLTV9cnza2C2me8AhxnqWlLPFTBDrgJTLq+dXWerKF6rKR4Dm97qRpGx/D9+AJMwjiH68ucNAAAAAElFTkSuQmCC)
    }
    .cui-horizontal-screen-btn
    {

        z-index:2;
        height:1rem;
        width:1rem;
        display:inline-block;
        background-size:cover;
        background-repeat: no-repeat;
        background-position:center;
        background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAgCAYAAACcuBHKAAABFElEQVRYR+2XoUqEQRSFv6NgsKjBhzAYNiiizyAG3aTFvtgMFtu+gFkEgwZhVzBrU0EUDFazoMkn2CNX2PKzbPtnJsw8wJxv7pw5nBEFLBXAQIUY30IZk7C9ABwBs4n9MQKuJX3K9gVwmBhgLDeQtBcQj8BWA+Ie6LcIdgssAq+S1gPiCdhsCF5JOmgLwvYPsAy8SVqrEHUS0zzxDKwAS0AWYz5IOrU9B5wDMzleR0/SezxJ2ztANwdEBNaJpJHty4jwHBARVl/AN9DJ5YmamDW2i4vtSX0ieWLeAduN7vABDNvqE8AxMA+8SNoIY3aBmxYFp20dHXP/v23b3gVWE4NE0T2T9FtG5U98+olydRJFfQP/ANLi1CFSwFoJAAAAAElFTkSuQmCC)
    }
</style>
