<template>
  <div class="cui-content">
    <cui-tab :data="data" active="0">
        <div class="test-content" slot="0">
            <exam></exam>
        </div>
        <div class="test-content" slot="1">
           <position></position>
        </div>
    </cui-tab>
  </div>
</template>
<script>
    import CuiTab from '@/components/cui-vue/cui-tab/CuiTab'
    import Exam from '@/components/Exam'
    import Position from "@/components/Position"
    import Company from "@/components/Company"
    export default {
        name: "Test-list",
        components:{
          CuiTab,
          Position,
          Company,
          Exam
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
