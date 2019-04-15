/**
 * 描述 CuiFilter 全局注册
 * 创建于
 * created by flying0917
 **/
// 引入组件
import CuiFilterComponent from './CuiFilter.vue'
// 定义 Loading 对象
const CuiFilter={
    // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
    install:function(Vue){
        Vue.component('CuiFilter',CuiFilterComponent)
    }
}
// 导出
export default CuiFilter
