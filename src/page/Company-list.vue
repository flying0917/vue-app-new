<template>
  <div class="cui-flex-wrap cui-flex-con cui-flex-vertical company-content">
    <div class="cui-header">
      <div class="cui-header-title">公司</div>
      <span class="cui-header-btn cui-iconfont cui-icon-search"></span>
    </div>
    <cui-filter :data="filterOption" @onSuccess="isOk" @onCancel="isCancel" @onChange="isChange"></cui-filter>

    <div class="cui-flex-con company-list">
      <company :p="page" :update="isupdate" :filterData="filterData"></company>
    </div>
  </div>
</template>
<script>
  import CuiFilter from '@/components/cui-vue/cui-filter/CuiFilter';
  import CuiLoading from "@/components/cui-vue/cui-loading/CuiLoading";

  import Company from "@/components/Company";
  export default {
    name: "Company-list",
    components:{
      CuiLoading,
      CuiFilter,
      Company
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
            data:["时间"]
          }
        ],
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
                  order:ret[1].value[0]
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
  .company-content
  {
    height:100%;
    width:100%;
  }
  .company-list
  {
    width:100%;
    overflow:hidden;
  }
</style>
