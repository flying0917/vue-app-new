<template>
  <div class="cui-content">
    <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <footer-tab></footer-tab>
  </div>
</template>

<script>
  import FooterTab from '@/components/Footer'
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
            this.transitionName="slide-rights"
          }
        }

    }
</script>

<style scoped>
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
  }
</style>
