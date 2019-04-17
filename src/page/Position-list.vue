<template>
  <div class="cui-flex-wrap cui-flex-con cui-flex-vertical position-content">
    <div class="cui-header">
      <div class="cui-header-title">职位</div>
      <span class="cui-header-btn cui-iconfont cui-icon-search"></span>
    </div>
    <cui-filter :data="filterOption" @onSuccess="isOk" @onCancel="isCancel" @onChange="isChange"></cui-filter>

    <div class="cui-flex-con position-list">
        <position :p="page" :update="isupdate" :filterData="filterData"></position>
    </div>
  </div>
</template>
<script>
    import CuiFilter from '@/components/cui-vue/cui-filter/CuiFilter';
    import CuiLoading from "@/components/cui-vue/cui-loading/CuiLoading";

    import Position from "@/components/Position";
    export default {
        name: "Position-list",
        components:{
          CuiLoading,
          CuiFilter,
          Position
        },
        data()
        {
          return {

            isShow:false,//是否显示loading
            page:1,//职位分页 当前页数
            isupdate:false,//是否更新开关 取反 this.isupdate=!this.isupdate
            filterData:{},//选中的过滤参数
            //过滤的选项
            filterOption:[
              {
                text:"地点",
                name:"place",
                type:"place",
                multiple:false
              },
              {
                text:"排序",
                name:"order",
                type:"radio",
                data:["时间","职位"],
                multiple:false
              },
              {
                text:"类型",
                name:"type",
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
                text:"要求",
                type:"many",
                data:[
                  {
                    text:"学历",
                    name:"record",
                    type:"checkbox",
                    options:["全部","初中及以下","中专/中技","高中","大专","本科","硕士","博士"]
                  },
                  {
                    text:"经验",
                    name:"experience",
                    type:"checkbox",
                    options:["全部","应届生","1年内","1-3年","2-5年","5-8年","10年以上"]
                  }
                  ,
                  {
                    text:"薪水",
                    name:"prize",
                    type:"radio",
                    options:["全部","3k以下","3-5k","5k-10k","10k-20k","20k-50k","50k以上"]
                  }
                ]
              }],
            //锁
            lock:false
          }
        },
        methods:
        {
          //选择筛选条件完，点击确认
          isOk(ret)
          {
            console.log(ret)
            this.filterData={
              place:ret[0].value[1],
              order:ret[1].value[0],
              type:ret[2].value[1],
              record:ret[3].value[0],
              experience:ret[3].value[1],
              prize:ret[3].value[2]
            }
            this.isupdate=!this.isupdate;
          },
          //取消筛选条件
          isCancel(ret)
          {
            console.log(ret)
          },
          //当筛选条件有一个值改变时，被调用
          isChange(ret)
          {
            console.log("值改变了");
            console.log(ret)
          },

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
    overflow:hidden;
  }
</style>
