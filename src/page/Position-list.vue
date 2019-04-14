<template>
  <div class="cui-flex-wrap cui-flex-con cui-flex-vertical position-content">
    <div class="cui-header">
      <span class="cui-header-btn cui-iconfont cui-icon-search"></span>
    </div>
    <cui-filter :data="filterData" @onsuccess="isOk" @oncancel="isCancel"></cui-filter>
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
                multiple:false
              },
              {
                name:"排序",
                type:"radio",
                data:["时间","123"],
                multiple:false
              },
              {
                name:"等级",
                type:"checkbox",
                data:["0","1","2","3"],
                multiple:false
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
                              name:"少林寺"
                            },
                            {
                              name:"武当山"
                            }
                          ]
                        }
                ]
              },
              {
                name:"要求",
                type:"many",
                data:[
                  {
                    name:"学历",
                    type:"checkbox",
                    options:["全部","初中及以下","中专/中技","高中","大专","本科","硕士","博士"]
                  },
                  {
                    name:"经验",
                    type:"checkbox",
                    options:["全部","应届生","1年内","1-3年","2-5年","5-8年","10年以上"]
                  }
                  ,
                  {
                    name:"薪水",
                    type:"radio",
                    options:["全部","3k以下","3-5k","5k-10k","10k-20k","20k-50k","50k以上"]
                  }
                ]
              }]
          }
        },
        methods:
        {
          isOk(ret)
          {
            console.log(ret)
          },
          isCancel(ret)
          {
            console.log(ret)
          }
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
