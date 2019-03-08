<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import FooterTab from '@/components/Footer'
export default {
  name: 'app',
  components:{
    FooterTab
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
body {
  background-color: #fbf9fe;
}
</style>
