/**
 * 职位的数据
 * **/
import $http from "@/util/axios-ajax"
import url from "@/config/url"
const examModel={
  //token test
  "getExam":function(filter,cb)
  {
    var callback=cb,
        data=[
          {
            title:"web前端",
            company:"预备科技",
            companyLogo:"https://hbimg.huabanimg.com/e220cc1c1ddb915ac99ddcbe8b855e997b9300ced2fe-Tqn8oH_fw658",
            id:filter.p+"1",
            examimg:"https://hbimg.huabanimg.com/e220cc1c1ddb915ac99ddcbe8b855e997b9300ced2fe-Tqn8oH_fw658",
            time:"10-10"
          },
          {
            title:"web前端",
            company:"预备科技",
            companyLogo:"https://hbimg.huabanimg.com/e220cc1c1ddb915ac99ddcbe8b855e997b9300ced2fe-Tqn8oH_fw658",
            id:filter.p+"2",
            examimg:"http://img.hb.aicdn.com/eb1c9e642227d99616455958a0c359303bb252bb1159fd-EHYjg4_/fw/480",
            time:"10-10"
          },
          {
            title:"web前端",
            company:"预备科技",
            companyLogo:"https://hbimg.huabanimg.com/e220cc1c1ddb915ac99ddcbe8b855e997b9300ced2fe-Tqn8oH_fw658",
            id:filter.p+"3",
            examimg:"http://img.hb.aicdn.com/2f59742ba0ef57ed1e1c6a5e21a7d7fbd87de56f41916-14Hv3B_/fw/480",
            time:"10-10"
          },
          {
            title:"web前端",
            company:"预备科技",
            companyLogo:"https://hbimg.huabanimg.com/e220cc1c1ddb915ac99ddcbe8b855e997b9300ced2fe-Tqn8oH_fw658",
            id:filter.p+"4",
            examimg:"https://hbimg.huabanimg.com/e220cc1c1ddb915ac99ddcbe8b855e997b9300ced2fe-Tqn8oH_fw658",
            time:"10-10"
          },
          {
            title:"web前端",
            company:"预备科技",
            companyLogo:"https://hbimg.huabanimg.com/e220cc1c1ddb915ac99ddcbe8b855e997b9300ced2fe-Tqn8oH_fw658",
            id:filter.p+"5",
            examimg:"http://img.hb.aicdn.com/2f59742ba0ef57ed1e1c6a5e21a7d7fbd87de56f41916-14Hv3B_/fw/480",
            time:"10-10"
          }
        ]
    if(filter.p===5)
    {
      data=[];
    }
    console.log(filter)
    setTimeout(function()
    {
      callback(data)
    },1000)
    /*$http.get(url.token_test,{},function(ret,err)
    {
      callback(ret,err)
    })*/
  }
}
export default examModel
