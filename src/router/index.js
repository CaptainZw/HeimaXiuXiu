import Vue from 'vue'
import VueRouter from 'vue-router'

//如果是使用模块化的方式来开发，必须写下面的代码
Vue.use(VueRouter)

// 在Vue原型上挂在一个属性 $axios
import axios from 'axios'
//设置baseURL之后，发送请求的时候会把baseURL和路径拼接起来
axios.defaults.baseURL = "http://47.106.148.205:8899/"
axios.defaults.withCredentials = true//让ajax携带cookie
Vue.prototype.$axios = axios

//导入组件
// import goodslist from '../components/goods/goodslist.vue'
// import goodsinfo from "../components/goods/goodsInfo.vue"
// import shopcart from "../components/shopcart/shopCart.vue"
// import login from '../components/account/login.vue'
// import order from '../components/order/order.vue'
// import pay from '../components/order/pay.vue'
// import paySuccess from '../components/order/paySuccess.vue'
// import vipcenter from '../components/vip/vipcenter.vue'
// import myOrders from '../components/vip/myOrders.vue'
// import orderInfo from '../components/order/orderInfo.vue'
const goodslist = () => import(/* webpackChunkName: "goodslist" */ '../components/goods/goodslist.vue')
const goodsinfo = () => import(/* webpackChunkName: "goodsinfo" */ '../components/goods/goodsInfo.vue')
const shopcart = () => import(/* webpackChunkName: "shopcart" */ '../components/shopcart/shopCart.vue')
const order = () => import(/* webpackChunkName: "order" */ '../components/order/order.vue')
const login = () => import(/* webpackChunkName: "login" */ '../components/account/login.vue')
const pay = () => import(/* webpackChunkName: "pay" */ '../components/order/pay.vue')
const paySuccess = () => import(/* webpackChunkName: "paySuccess" */ '../components/order/paySuccess.vue')
const vipcenter = () => import(/* webpackChunkName: "vipcenter" */ '../components/vip/vipcenter.vue')
const myOrders = () => import(/* webpackChunkName: "myOrders" */ '../components/vip/myOrders.vue')
const orderInfo = () => import(/* webpackChunkName: "orderInfo" */ '../components/order/orderInfo.vue')

const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/goodslist'},
        {name:'GOODSLIST',path:'/goodslist',component:goodslist},
        {path:'/goodsinfo/:goodsId',component:goodsinfo},
        {path:'/shopcart',component:shopcart},
        {path:'/login',component:login},
        /***下面的路由规则，是需要进行登录校验的 ***/
        {path:'/order',component:order,meta: { checkoutLogin: true }},
        {path:'/pay',component:pay,meta: { checkoutLogin: true }},
        {path:'/paySuccess',component:paySuccess,meta: { checkoutLogin: true }},
        {path:'/vipcenter',component:vipcenter,meta: { checkoutLogin: true }},
        {path:'/myOrders',component:myOrders,meta: { checkoutLogin: true }},
        {path:'/orderInfo',component:orderInfo,meta: { checkoutLogin: true }},
    ]
})

/**
 * 这个方法可以拦截到所有的路由跳转
 * 如果不调用next，就不会跳转
 */
router.beforeEach((to, from, next) => {
    //记录想跳转去的页面
    if(to.path!=='/login'){
        localStorage.setItem('wantVisitPath',to.fullPath)
    }

    if(to.meta.checkoutLogin){// 需要进行登录验证
        // 在这里需要检查一下是否登录，如果登录了，next，
        // 如果没有登录，通过编程式导航 router.push(xxx)
        
        axios.get('site/account/islogin').then(response=>{
            if(response.data.code==='logined'){//登录过
                next()
            }else{//没有登录过
                router.push({path:'/login'})
            }
        })
    }else{ // 来到这里，是代表不需要进行登录验证
        next()
    }
})

//es6中导出一个成员
export default router