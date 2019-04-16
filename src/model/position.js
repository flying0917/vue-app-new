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
          }
        ]
    console.log(filter)
    callback(data)
    /*$http.get(url.token_test,{},function(ret,err)
    {
      callback(ret,err)
    })*/
  }
}
export default positionModel
