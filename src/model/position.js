/**
 * 职位的数据
 * **/
import $http from "@/util/axios-ajax"
import url from "@/config/url"
const positionModel={
  //token test
  "getPosition":function(filter,cb)
  {
    var callback=cb,
        data=[
          {
            title:"web前端",
            experience:"1-3年",
            place:"广州天河",
            prize:"1.1k-2k",
            company:"预备科技",
            id:1,
            record:"大专",
            time:"2010-10-10"
          },
          {
            title:"PHP后台工程师",
            experience:"1-3年",
            place:"广州天河",
            prize:"2k-3k",
            company:"预备科技",
            id:2,
            record:"大专",
            time:"2010-10-10"
          },
          {
            title:"java权杖",
            experience:"1-3年",
            place:"广州天河",
            prize:"1.1k-2k",
            company:"预备科技",
            id:3,
            record:"大专",
            time:"2010-10-10"
          },
          {
            title:"web前端",
            experience:"1-3年",
            place:"广州天河",
            prize:"1.1k-2k",
            company:"预备科技",
            id:4,
            record:"大专",
            time:"2010-10-10"
          },
          {
            title:"web前端",
            experience:"1-3年",
            place:"广州天河",
            prize:"1.1k-2k",
            company:"预备科技",
            id:5,
            record:"大专",
            time:"2010-10-10"
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
export default positionModel
