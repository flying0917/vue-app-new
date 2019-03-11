    import axios from "axios"
    import GLOBAL from "@/config/global"
    import url from "@/config/url"
    var http_api = {};
    var app = {};
    var quickos = {};
    var retdebug =1;
    var errdebug =1;



    http_api.ajax = function (params, cb, router, allowGuest) {
        allowGuest = allowGuest || false;
        params.returnAll = true;
        params.headers = {
          'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
        };

        params.cache = false;
        var that = this,
            callback=cb;
        params.data.values = params.data.values&&typeof params.data.values==="object"?params.data.values:{};
        if(GLOBAL.isApp&&false)
        {
          let temp_token=localStorage["temp_token"],
            access_token=localStorage["access_token"];
          if(temp_token)
          {
            params.headers['Authorization']=temp_token
          }
          if(access_token)
          {
            params.headers['Authorization']=access_token
          }
          api.ajax(params, function (ret, err) {

            if ('' !== err && undefined !== err) {

              if ( errdebug ) {
                console.log("-----【AJAX ERR】-----" +
                  "\nURL: " + params.url +
                  "\nDATA" + JSON.stringify(params.data) +
                  "\nERR: " + JSON.stringify(err));
              }
              else {
                if(err.statusCode===0)
                {

                }
                else
                {

                }
              }
              return false;
            }
            if ( retdebug ) {
              console.log(JSON.stringify(ret));
            }
            if ('' != ret) {

              if (ret.body.error_code) {
                switch (ret.body.error_code) {
                  case 403:
                    if (!allowGuest) {
                      setTimeout(function () {
                        api.removePrefs({
                          key: 'cookie'
                        });
                        $api.rmStorage("userinfo");
                        $api.send_removePushListener();
                        api.removePrefs({
                          key: 'logininfo'
                        });
                        if(api.winName!=="login")
                        {

                        }
                      }, 1000);
                    } else {
                      api.toast({
                        msg: '登录超时',
                        duration: 10000,
                        location: 'bottom'
                      });
                    }
                    break;
                  default:
                    api.toast({
                      msg: '未知错误',
                      duration: 10000,
                      location: 'bottom'
                    });
                }
                return false;
              }
            }
            callback(ret.body, err);
          });
        }
        else
        {
               params.data=params.data.values;
               let temp_token=localStorage["temp_token"],
                   access_token=localStorage["access_token"];
              if(temp_token)
              {
                axios.defaults.headers['Authorization']=temp_token
              }
              if(access_token)
              {
                axios.defaults.headers.common['Authorization']=access_token
              }
              axios(params).then(function(ret)
              {
                 callback(ret.data);
              }).catch(function(err)
              {
                //console.log(JSON.stringify(err))
              });
        }

    };

    /**
     * GET Ajax
     * @param url
     * @param callback
     * @param allowGuest 允许登录超时时不跳转
     */
    http_api.get = function (url, callback, allowGuest) {
        allowGuest = allowGuest || false;
        var params = {
            url: url,
            method: 'get',
            dataType: 'json',
            data : {}
        };

        this.ajax(params, callback, allowGuest);
    };

    /**
     * POST Ajax
     * @param url
     * @param datas
     * @param callback
     * @param allowGuest 允许登录超时时不跳转
     */
    http_api.post = function (url, datas, callback, allowGuest) {
        allowGuest = allowGuest || false;
        var params = {
            url: url,
            method: 'post',
            dataType: 'json',
            data: {
                values: datas
            }
        };
        this.ajax(params, callback, allowGuest,arguments[arguments.length-1]);
    };

    /**
     * 生成API URL
     * @param route
     * @param param
     * @returns {string}
     */
    /*http_api.url = function (route, param,isEncode) {
        var encode=isEncode?isEncode:false,
            urlResult="";
        route += "";
        if ((route).split("/").length !== 3) {
// $.error("app.url: 参数route错误");
        } else {

            param = param ? '&' + $.param(param,false) : '';
            //是否解码
            if(encode)
            {
                urlResult=decodeURIComponent(_API_SITE_ + "?r=" + route + param);

            }
            else
            {
                urlResult=_API_SITE_ + "?r=" + route + param;
            }
            return urlResult
        }
    };*/

    app.logout = function () {
        Quickos.api.get(Quickos.api.url('mobile/default/logout'), function (ret, err) {
            if(ret)
            {
                $api.setCookie("PHPSESSIONID", "", -1);
                if(ret.isSuccess)
                {
                    api.removePrefs({
                        key: 'cookie'
                    });
                    $api.rmStorage("userinfo");
                    //$api.clearStorage();
                    api.removePrefs({
                        key: 'logininfo'
                    });
                    $api.send_removePushListener();
                    api.openWin({
                        name: 'login',
                        url: api.wgtRootDir + '/html/login.html',
                        slidBackEnabled: false,
                        pageParam: {}
                    });
                }
                else
                {
                    api.toast({
                        msg:ret.msg,
                        duration:1000
                    });
                }
            }

        });
    };

    http_api.attachUpload = function (file_path, module) {
        var url = this.url('main/attach/upload');//user/info/uploadavatar
        this.ajax({
            data: {
                files: {
                    Filedata: file_path
                },
                values: {
                    module: module
                }
            },
            dataType: 'json',
            method: 'post',
            url: url
        }, function (ret, err) {
            if (ret) {
                //ret : icon,url,name,aid
                return ret;

            } else {
                return err;
            }


        });
    };
    quickos.app = app;
    quickos.api = http_api;

    export default quickos;

