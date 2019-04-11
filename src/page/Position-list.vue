<template>
  <div class="cui-flex-wrap cui-flex-con cui-flex-vertical position-content">
    <div class="cui-header">
      <span class="cui-header-btn cui-iconfont cui-icon-search"></span>
    </div>
    <cui-filter :data="filterData"></cui-filter>
    <div class="cui-flex-con position-list">
    </div>
  </div>
</template>
<script>
    import CuiFilter from '@/components/cui/CuiFilter'
    export default {
        name: "Position-list",
        components:{
          CuiFilter
        },
        data()
        {
          return {
            filterData:[
              {
                name:"地点",
                type:"place",
                default:""
              },
              {
                name:"类型",
                type:"tree",
                multiple:true,
                data:[
                        {
                          name:"言情",
                          children:[
                                  {
                                    name:"金瓶梅"
                                  },
                                  {
                                    name:"我和僵尸有个约会"
                                  }
                          ]
                        },
                        {
                          name:"武学",
                          children:[
                            {
                              name:"金瓶梅"
                            },
                            {
                              name:"我和僵尸"
                            }
                          ]
                        }
                ]
              },
              {
                name:"多个",
                type:"many",
                default:"",
                data:[
                  {
                    name:"价格",
                    type:"checkbox",
                    options:["1000~5000","5000~10000","10000~20000"]
                  },
                  {
                    name:"性别",
                    type:"radio",
                    options:["男","女"]
                  }
                ]
              }]
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
  .cui-header
  {
    height:2rem;
  }
  .cui-icon-search
  {
    color:#6f6e6e;
  }
  .filter
  {
    height:2rem;
    background-color:white;
  }
  .filter .filter-item
  {
    font-size:12px;
    text-align: center;
    color:#6f6e6e;
    line-height: 2rem;
  }
  .position-content
  {
    height:100%;
    width:100%;
  }
  .position-list
  {
    width:100%;
  }
</style>
