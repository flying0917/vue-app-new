import axios from 'axios'
import Qs from 'qs'
import router from '@/router/index'
import store from '@/store/store'
import * as types from '@/store/types'
axios.defaults.withCredentials=true
// http request 拦截器
axios.interceptors.request.use(
    config => {
      config.headers.Authorization=""
      if (store.state.token&&store.state.token!=="null"&&store.state.token!=="undefined") {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = store.state.token;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    });
// http response 拦截器
axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // 返回 401 清除token信息并跳转到登录页面
            store.commit(types.LOGOUT);
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.fullPath}
            })
        }
      }
      return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });

export default {
  ajax:function(param,cb){

    var options={},
      callback=cb;
    //添加是ajax标识
    if(param.data)
    {
      param.data["isajax"]="1";
    }
    else
    {
      var temParam=param.url.indexOf("?")!==-1?"&isajax=1":"?isajax=1"
      param.url=param.url+temParam;
    }

    options.method=param.type;
    //跨域
    //options.headers={'Content-Type': 'application/x-www-form-urlencoded'};
    options.url=param.url;
    if(options.method==='POST')
    {
      //是否是表单提交

      if(param.isForm)
      {
        let formdata=new FormData();
        for(var x in param.files)
        {
          formdata.append('file',param.files[x],param.files[x].name);
        }
        for(var y in param.data)
        {
          formdata.append(y,param.data[y]);
        }
        options.headers['Content-Type']='multipart/form-data';
        options.data=formdata;

        //进度条回调
        if(param.isPropress)
        {
          //清空头
          //delete options.headers;
          //options.headers['Access-Control-Allow-Origin']='*';
          //options.headers['Content-Type']='mapplication/json';
          options.headers['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';

          var propressCb=param.proCb;
          //上传进度回调
          options.onUploadProgress=function(progressEvent)
          {
            if(progressEvent.lengthComputable){
              //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
              //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
              propressCb(progressEvent);
            }
          }
        }
      }
      else
      {
        options.data=param.data;
        options.transformRequest=[function(data){
          return Qs.stringify(data)
        }]
      }
    }

    axios(options).then(function(res)
    {

      callback(res.data);
    })
      .catch(function(error)
      {
        callback(error)
      });
  },
  get:function(url,cb)
  {
    this.ajax({type:"GET",url:url},cb)
  },
  post:function(url,data,cb)
  {
    this.ajax({type:"POST",url:url,data:data},cb)
  },
  uploadPost:function(url,data,file,cb)
  {
    this.ajax({type:"POST",url:url,data:data,files:file,isForm:true},cb)
  },
  uploadAndPropress:function(url,data,file,propressCb,cb)
  {
    this.ajax({type:"POST",url:url,data:data,files:file,isForm:true,isPropress:true,proCb:propressCb},cb)
  },

}
