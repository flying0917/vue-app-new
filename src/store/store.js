/**
 * 描述
 * 创建于
 * created by flying0917
 **/
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {},
        token: null,
        title: '',
        im_token:null,
        temp_token:null,

    },
    mutations: {
        //登录更新状态
        [types.TOKEN]: (state, data) => {
            localStorage["token"]= data;
            state.token = data;
        },
        //退出登录更新状态
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            state.token = null
            localStorage.removeItem('im_token');
            state.im_token = null
        },
        //更新token
        [types.TITLE]: (state, data) => {
            state.title = data;
        },
        //更新token
        [types.TMP_TOKEN]:(state,data) => {
          localStorage["temp_token"]= data;
          state.temp_token = data
        },
        //更新im token
        [types.IM_TOKEN]:(state,data) => {
          localStorage["im_token"]= data;
          state.im_token = data
        },

    }
})
