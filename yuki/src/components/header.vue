<template>
  <div class="global-nav">
    <div class="container nav-base">
        <div class="row">
            <div class="col-md-2 nav-msg col-sm-hide ">
                <a href="" class=nav-msg-hode>超良 心更懂你</a>
            </div>
            <div class="col-sm-4 col-md-4 nav-msg col-xs-hide">
                <img src="../assets/img/header/trumpet.png" alt="" width="16px" height="16px">
                <a href="" class="nav-msg-carousel">泡芙小姐周边开售啦</a>
            </div>
            <div class="col-xs-12 col-sm-6 col-sm-offset-2 col-md-4 col-md-offset-2 nav-user">
                <ul class="nav-list fn unstyled">
                    <li v-if="isLogin==false"><router-link to="/login">登陆</router-link></li>
               
                    <li v-if="isLogin==false"><a href="">工会会员登陆</a></li>
                   
                    <li v-if="isLogin==false"><router-link to="/register">注册</router-link></li>

                    <li v-if="isLogin==true"><a href="">欢迎您<span>{{uname}}</span></a></li>
                     <li v-if="isLogin==true" @click.prevent="logout()"><a href="">注销</a></li>
                    <li><a href="">我的订单</a></li>
                    
                    <li><a href="">我的收藏</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="nav">
        <div class="container">
            <div class="row">
                <div class="col-sm-3 col-xs-hide logo">
                    <div class="logo-box">
                        <a href=""><img src="../assets/img/header/logo.png" alt=""></a>
                    </div>
                </div>
                <div class="col-sm-7 col-xs-10 col-xs-offset-1 col-sm-offset-0 nav-search">
                    <div class="nav-search-box">
                        <div class="nav-search-in">
                            <input type="text" class="nav-search-text" v-model="kw">
                            <div class="nav-search-img" @click="sendKw()">
                                <img src="../assets/img/header/icon_search_white.png" alt="" >
                            </div>
                        </div>
                        <div class="nav-search-re col-xs-hide">
                            <ul class="unstyled">
                                <li><a href="">yuki原创</a></li>
                                <li><a href="">正义联盟</a></li>
                                <li><a href="">雷神</a></li>
                                <li><a href="">Apple</a></li>
                                <li><a href="">泡芙小姐</a></li>
                                <li><a href="">GOC</a></li>
                                <li><a href="">二代妖精</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-sm-2 col-xs-hide">
                    <div class="shopping-cart" @click="toCart()">
                        <span>购物袋</span>
                        <img src="../assets/img/header/icon_cart.png" alt="">
                        <div class="shopping-cart-num"></div>
                    </div>
                </div>
                <!--<div class="col-xs-1 col-xs-show">-->
                    <!--<div class="hamb">-->
                        <!--<a href="">-->
                            <!--<span></span>-->
                            <!--<span></span>-->
                            <!--<span></span>-->
                        <!--</a>-->
                    <!--</div>-->
                <!--</div>-->
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Bus from './bus';
export default {
  name:"yukiHeader",
  data:function(){
      return {kw:null,isLogin:false,uname:""}
  },
  methods:{
      sendKw:function(){
          var reg = /\s+/g,kw;
          if(this.kw){
              this.kw.replace(reg,' ');
          }
          this.$router.push("/search/"+this.kw);
          this.kw = null;
      },
      logout:function(){
          this.$http.get("http://127.0.0.1/yuki/data/user/logout.php",{withCredentials:true}).then(()=>{
              this.isLogin = false;
              this.uname = "";
          })
      },
      toCart:function(){
          if(this.isLogin==false){
              return;
          }else{
              this.$router.push("/cart");
          }
      }
  },
  created:function(){
      this.$http.get("http://127.0.0.1/yuki/data/user/isLogin.php",{withCredentials:true}).then((response)=>{
          if(response.body.code>0){
              this.isLogin = true;
              this.uname = response.body.uname;
          }
      })
  },
  mounted:function(){
      //Bus.$emit("isLogin",this.isLogin);
  }
//   watch:{
//        '$route':function(){
//            this.$http.get("http://127.0.0.1/yuki/data/user/isLogin.php",{withCredentials:true}).then((response)=>{
//            if(response.body.code>0){
//                 this.isLogin = true;
//                 this.uname = response.body.uname;
//             }
//           })
//       }
//   }
}
</script>

<style>

</style>


