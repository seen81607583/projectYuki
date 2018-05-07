import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
// import yukiHeader from '@/components/header'
// import yukiFooter from '@/components/footer'
import carouselAside from '@/components/carousel-aside'
import hot from '@/components/hot'
import productBlock from '@/components/product-block'
import login from '@/components/login'
import register from '@/components/register'
import goodList from '@/components/good-list'
import detail from '@/components/detail'
import cart from '@/components/cart'
import index from '@/components/index'
import searchList from '@/components/search-list'
import floor from '@/components/floor'
import payMent from '@/components/payMent'
import payMentStep1 from '@/components/payMentStep1'
import payMentStep2 from '@/components/payMentStep2'
import payMentStep3 from '@/components/payMentStep3'

export default new Router({
  routes: [
    {
      path: '/',
      name:'default',
      component: index
    },
  
    {
      path:'/carouselAside',
      name:'carouselAside',
      component:carouselAside
    },
    {
      path:'/hot',
      name:'hot',
      component:hot
    },
    {
      path:'/productBlock',
      name:'productBlock',
      component:productBlock
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/register',
      name:'register',
      component:register
    },
    {
      path:'/goodList/:fid/:plid',
      name:'goodList',
      component:goodList
    },
    {
      path:'/detail/:fid/:plid/:gfid',
      name:'detail',
      component:detail
    },
    {
      path:'/cart',
      name:'cart',
      component:cart
    },
    {
      path:'/search/:kw',
      name:'search',
      component:searchList
    },
    {
      path:'/floor',
      name:'floor',
      component:floor
    },
    {
      path:'/payMent',
      name:'payMent',
      component:payMent,
      children:[
        {path:'/payMent/step1',name:"payMentStep1",component:payMentStep1},
        {path:'/payMent/step2',name:"payMentStep2",component:payMentStep2},
        {path:'/payMent/step3',name:"payMentStep3",component:payMentStep3}
      ]
    }
  ]
})
