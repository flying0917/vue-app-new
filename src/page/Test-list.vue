<template>
  <div class="cui-content">
    <cui-tab :data="data">
      <div class="test-content" :slot="index" v-for="x,index in data">
        <div :slot="index" v-if='x==="笔试"'>
          <position></position>
        </div>
        <div :slot="index" v-else-if='x==="职位"'>
          <company></company>
        </div>
      </div>
    </cui-tab>
  </div>
</template>
<script>
    import CuiTab from '@/components/cui-vue/cui-tab/CuiTab'

    import Position from "@/components/Position";
    import Company from "@/components/Company";
    export default {
        name: "Test-list",
        components:{
          CuiTab,
          Position,
          Company
        },
        data()
        {
          return {
            data:["笔试","职位"]
          }
        },
        methods:
        {

        },
        created()
        {

        }
    }
</script>

<style scoped>
 .test-content
 {
   height:100%;
 }
 .test-content>div
 {
   height:100%;
 }
</style>
