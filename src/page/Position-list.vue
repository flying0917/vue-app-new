<template>
  <div class="cui-flex-wrap cui-flex-con cui-flex-vertical position-content">
    <div class="cui-header">
      <div class="cui-header-title">职位</div>
      <span class="cui-header-btn cui-iconfont cui-icon-search"></span>
    </div>
    <cui-filter :data="filterData" @onSuccess="isOk" @onCancel="isCancel" @onChange="isChange"></cui-filter>

    <div class="cui-flex-con position-list" @click="show()">
      <cui-pullrefresh @refresh="refresh" @scrollToBottom="down">
        <position></position>
      </cui-pullrefresh>
    </div>
    <cui-loading :isShow="isShow" @onShow="onShow()" @onHide="onHide()"></cui-loading>
  </div>
</template>
<script>
    import CuiFilter from '@/components/cui-vue/cui-filter/CuiFilter';
    import CuiLoading from "@/components/cui-vue/cui-loading/CuiLoading";
    import CuiPullrefresh from "@/components/cui-vue/cui-pullrefresh/CuiPullrefresh";


    import Position from "@/components/Position";
    export default {
        name: "Position-list",
        components:{
          CuiLoading,
          CuiFilter,
          CuiPullrefresh,
          Position
        },
        data()
        {
          return {
            list:["0"],
            isShow:false,
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
          },
          show()
          {
            var that=this;
            that.isShow=true;
            setTimeout(function(){
              that.isShow=false;
            },5000)
          },
          onShow()
          {
            console.log(1)
          },
          onHide()
          {
            console.log(2)
          },
          down(openLock)
          {
            let list=["底部加载","底部加载","底部加载","底部加载"],
                    that=this;
            that.list=that.list.concat(list);
            setTimeout(function()
            {
              openLock();
            },3000)
          },
          isChange(ret)
          {
            console.log("值改变了");
            console.log(ret)
          },
          refresh(done) {
            let that=this;
            setTimeout(function(){
              let list=[];
              for(var x=0;x<4;x++)
              {
                list.push(x+'')
              }
              //Array.prototype.call.concat(that.list,list)
              that.list=that.list.concat(list);
              done();
            },3000)
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
    overflow:hidden;
  }
</style>
