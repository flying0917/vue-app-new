<template>
  <div class="cui-content cui-flex-wrap cui-flex-vertical">
    <div class="cui-flex-con">
      <transition :name="transitionName">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </div>
    <footer>
      <footer-tab></footer-tab>
    </footer>
  </div>
</template>

<script>
  import FooterTab from '@/components/Footer'
  import userModel from '@/model/user'
    export default {
        name: "main",
        data(){
          return {
            transitionName:"slide-left"
          }
        },
        components:{
          FooterTab
        },
        watch:{
          '$route' (to, from) {

            const toIndex = to.meta.index
            const fromIndex = from.meta.index

            this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left'
          }
        },
        mounted() {

          userModel.tokentest(function(ret,err)
          {

          });
        }

    }
</script>

<style scoped>
  .cui-content
  {
    overflow:hidden;
  }
  footer
  {
    width:100%;
    height:2.5rem;
    position:relative;
    z-index:2;
  }
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
  }

  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>
