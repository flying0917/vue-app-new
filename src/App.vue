<template>
  <div id="app">
      <transition :name="transitionName">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data()
  {
    return {
      transitionName:""
    }
  },
  watch:{
    '$route' (to, from) {

      const toIndex = to.fullPath.split("/")
      const fromIndex = from.fullPath.split("/")
      this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/reset.less';
body {
  background-color: #fbf9fe;
}
#app{
    height:100%;
    overflow:hidden;
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
