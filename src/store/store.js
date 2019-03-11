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
        im_token:null
    },
    mutations: {
        [types.LOGIN]: (state, data,im_token) => {
            localStorage["asscess_token"]= data;
            localStorage["im_token"]= data;
            state.token = data;
            state.im_token=im_token
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('asscess_token');
            state.token = null
        },
        [types.TITLE]: (state, data) => {
            state.title = data;
        }
    }
})
