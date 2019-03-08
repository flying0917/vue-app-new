<template>
  <div class="cui-content">
    <transition name="slide-fade">
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
        components:{
          FooterTab
        }
    }
</script>

<style scoped>

</style>
