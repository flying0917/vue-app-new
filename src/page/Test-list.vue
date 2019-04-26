<template>
  <div class="cui-content">
    <cui-tab :data="data" active="0" paddingTop="25px">
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
    const CuiTab = () => import('@/components/cui-vue/cui-tab/CuiTab'),
          Exam = () => import('@/components/Exam'),
          Position = () => import("@/components/Position"),
          Company = () => import("@/components/Company");
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
