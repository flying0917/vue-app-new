<template>
  <div class="cui-tabbar">
    <div :class="activeName===x.name?'cui-tabbar-tabitem cui-tabbar-tabitem-active':'cui-tabbar-tabitem'" v-for="x in footerTabData" @click="switchTab(x.name)">
      <router-link :to="x.url">
        <img v-if="x.isImg" :src="activeName===x.name?x.iconactive:x.icon">
        <span v-else :class="'cui-iconfont '+x.icon"></span>
        <label>{{ x.name }}</label>
      </router-link>
    </div>
  </div>
</template>

<script>
  import footer from "@/config/footer"
    export default {
        name: "footer-tab",
        data()
        {
          return {
            footerTabData:footer,
            activeName:"首页"
          }
        },
        methods:{
          switchTab(name)
          {
            this.activeName=name
            //this.$goRoute(url);
           /* e.currentTarget.className="cui-active"*/
          }
        }
    }
</script>

<style scoped>
  .cui-tabbar-tabitem-active a
  {
    color:#61d7ff !important;
  }
  a
  {
    color:black;
  }
  .cui-fixed-top
  {
    position:fixed;
    bottom:0;
  }
  .cui-tabbar
  {
    width:100%;
    display:table;
    background-color:white;
    height:2rem;

  }
  .cui-tabbar .cui-tabbar-tabitem
  {
    display:table-cell;
    text-align: center;
    font-size:0;
    width:1%;
    position:relative;
  }
  .cui-tabbar-tabitem .cui-iconfont
  {
    font-size:1rem;
    display:block;
  }
  .cui-tabbar-tabitem img
  {
    width:20px;
    height:20px;
    display:inline-block;
    margin:0.3rem 0;
    vertical-align: top;
  }
  .cui-tabbar-tabitem label
  {
    font-size:.6rem;
    display:inline-block;
    width:100%;
    overflow:hidden;
  }
  .cui-tabbar-tabitem .cui-badge
  {
    position:absolute;
    right:.1rem;
    top:.1rem;
    height:.7rem;
    min-width:.7rem;
    max-width:1.8rem;
    overflow:hidden;
    line-height: .7rem;
    text-overflow: ellipsis;
  }
  .cui-tabbar-theme
  {
    height:50px;
    padding:0 !important;
    position:relative;
  }
  .cui-tabbar-theme img
  {
    width:2.2rem;
    height:2.2rem;
    background-color:white;
    border-radius:50%;
    border:3px solid white;
    position:absolute;
    top:-0.8rem;
    left:0;
    right:0;
    margin:auto;
  }

  .cui-tabbar-theme label
  {
    position:absolute;
    left:0;
    right:0;
    bottom:0;
  }

  /*badge*/
  .cui-badge
  {
    display:inline-block;
    height:.8rem;
    min-width:.8rem;
    border-radius:.4rem;
    padding:0 .2rem;
    font-size:.6rem;
    text-align: center;
    background-color:red;
    color:white;
    white-space: nowrap;
    line-height: .8rem;
  }
  a
  {
    color:#6f6e6e;
  }
</style>
