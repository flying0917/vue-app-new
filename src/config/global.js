var token=localStorage["token"];
console.log(JSON.stringify(token))
export default {
   isApp:false,//是否是app (apicloud模式)
   token:token?token:""//全局token
}
