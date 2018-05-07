<template>
  <div class="detail">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div class="goodlist-crumbs" v-if="current_good!=null&&pf!=null&&pl!=null">
                    <a href="" >{{pf.fname}}</a>
                    <span>></span>
                    <a href="" >{{pl.plname}}</a>
                    <span>></span>
                    <a href="">{{current_good.title}}</a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-2 col-sm-2 col-md-1 detail-showbox">
                <div class="detail-showList" @scroll="scrollPic()">
                        <div class="detail-goTop"></div>
                        <div class="detail-showArea">
                            <a href="javascript:" v-for="(tmp,index) in good_pic" @click="changeCurrentPic(index)">
                                <img :src="require('../assets/'+tmp.src)" alt="">
                            </a>
                        </div>
                        <div class="detail-goBottom"></div>
                </div>
            </div>
            <div class="col-xs-10 col-sm-10 col-md-5">
                <div class="detail-showImage">
                    <div class="detail-showImage-md">
                        <img  :src="current_pic!=null&&require('../assets/'+current_pic)" alt="">
                    </div>
                    <div class="detail-showImage-glass col-sm-hide" @mousemove="showPicMagnifier()" @mouseleave="hidePicMagnifier()"></div>
                    <div class="detail-showImage-magnify col-sm-hide"></div>
                    <div class="detail-showImage-lg col-sm-hide">
                        <img :src="current_pic!=null&&require('../assets/'+current_pic)" alt="">
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <div class="row">
                    <div class="col-xs-12">
                        <h1 class="detail-title">{{current_good.title}}</h1>
                        <h3 class="detail-description">{{current_good.intro}}</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <div class="detail-priceElse">
                            <ul class="unstyled detail-priceElse-1">
                                <li class="detail-priceElse-item">售价:</li>
                                <li class="detail-priceElse-price">￥<span>{{current_good.f_price}}</span></li>
                            </ul>
                            <ul class="unstyled detail-priceElse-2">
                                <li class="detail-priceElse-item">促销:</li>
                                <li>{{current_good.salse}}</li>
                            </ul>
                            <ul class="unstyled detail-priceElse-3">
                                <li class="detail-priceElse-item">服务:</li>
                                <li v-for="tmp in current_good.promise"><span></span>{{tmp}}</li>
        
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12" v-if="current_good.g_spec1">
                        <div class="detail-type">
                            <ul class="unstyled">
                                <li>风格:</li>
                                <li class="detail-type-box">
                                    <ul class="unstyled">
                                        <li data-typeUrl="wwww.123.com" :class="{'detail-type-item':true,'active':tmp.gid==current_good.gid,
                                        'no-stock':tmp.stock==0}" v-for="(tmp,index) in goods" @click="changeProductType(index)">{{tmp.g_spec1}}</li>     
                                    </ul>
                                </li>                
                            </ul>
                        </div>     
                    </div>
                    <div class="col-xs-12" v-if="current_good.g_spec2!=''">
                        <div class="detail-type">
                            <ul class="unstyled">
                                <li>款式:</li>
                                <li class="detail-type-box">
                                    <ul class="unstyled">
                                        <li data-typeUrl="wwww.123.com" :class="{'detail-type-item':true,'active':index==spec2_active&&tmp.stock!=0,'no-stock':tmp.stock==0}" 
                                        v-for="(tmp,index) in current_good.g_spec2" @click="changeProductStyle(index)">{{tmp.name}}</li>     
                                    </ul>
                                </li>                
                            </ul>
                        </div>     
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <div class="detail-quantity">
                            <ul class="unstyled">
                                <li>数量:</li>
                                <li >
                                    <div class="detail-quantity-input">
                                        <span class="detail-quantity-reduce quantity-reduce" v-my-reduce="{quantity:quantity,fn:reduceQuantity}">-</span>
                                        <input type="text" readonly class="quantity-input" v-model="quantity">
                                        <span class="detail-quantity-add quantity-add" v-my-add="{stock:current_good.stock,quantity:quantity,fn:addQuantity}">+</span>
                                    </div>    
                                </li>
                                <li>
                                    (剩余{{current_good.stock}}件)
                                </li>
                            </ul>
                        </div>              
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <div class="detail-buyElse">
                            <ul class="unstyled">
                                <li class="detail-buy" @click="toBuy()">立即购买</li>
                                <li class="detail-toShoppingCart" @click="addCart()">加入购物袋</li>
                                <li class="detail-share">
                                    <a href="">
                                        <img src="../assets/img/detail/detail_collection_icon_s.png" alt="">
                                        <span>收藏</span>
                                    </a>
                                    <a href="">
                                        <img src="../assets/img/detail/detail_share_icon_n.png" alt="">
                                        <span>分享</span>
                                    </a>
                                </li>
                            </ul>
                        </div>            
                    </div>
                </div>
            </div>
        </div>
        <div class="row detail-bottom">
            <div class="col-xs-hide col-sm-8">
                <div class="detail-bottom-left">
                    <div class="detail-shop">
                        <div class="detail-shop-msg active">商品详情</div>
                        <div class="detail-shop-msg detail-shop-eval">评价<span>(0)</span></div>
                    </div>
                    <div class="detail-exploded-view">
                        <div v-for="tmp in current_good.detail">
                            <img :src="current_good.detail!=''&&require('../assets/'+tmp)" alt="">
                        </div>
                    </div>
                </div>     
            </div>
            <div class="col-xs-12 col-sm-4">
                <div class="detail-bottom-right" v-if="youLike.length>0">
                    <div class="detail-youlike">猜你喜欢</div>
                    <div class="detail-showYoulike">
                        <div class="detail-showYoulike-card" v-for="tmp in youLike">
                            <div v-if="youLike.length==0" style="text-align:center">wait..</div>
                            <router-link :to="'/detail/'+tmp.fid+'/'+tmp.plid+'/'+tmp.gfid">
                                <div class="detail-showYoulike-card-img">
                                    <img :src="tmp.g_pic!=''&&require('../assets/'+tmp.g_pic)" alt="">
                                </div>
                                <div class="detail-showYoulike-card-detail">
                                    <span class="detail-showYouLike-card-title">{{tmp!=null&&tmp.title.slice(0,30)+'...'}}</span>
                                    <div class="detail-showYouLike-card-price">
                                        <span>
                                            ￥{{parseInt(tmp.f_price).toFixed(2)}}
                                        </span>
                                        <span>
                                            已售{{tmp.sold}}
                                        </span>
                                    </div>
                                </div>
                            </router-link>
                        </div>
        
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Bus from './bus';
export default {
    //自定义指令绑定事件
  directives:{
      myAdd:{
        update:function(el,binding){
          //var stock = binding.value.current_good;
         // var quantity = binding.value.quantity;
          var element = el;
          var stock = binding.value.stock;
          var quantity = binding.value.quantity;
          //console.log(binding.value,el);
          //console.log(cg);
          //var input = document.querySelector(".quantity-input");
          element.onclick=(e)=>{
              e.preventDefault();
              e.stopPropagation();  
              if(quantity<stock){
                binding.value.fn();
              }
             
          }
        }
      },
      myReduce:{
          update:(el,binding)=>{
          var element = el;
          var quantity = binding.value.quantity;
          element.onclick=(e)=>{
              e.preventDefault();
              e.stopPropagation();
              //console.log(quantity);
              if(quantity>1){
                  binding.value.fn();
              }        
          }
        }
      }
  },
  watch:{
      '$route':function(){
          this.$router.go(0);
      }
  },
  data:function(){
      return {quantity:1,isLogin:false,timer:null,pl:null,pf:null,goods:[],current_good:{},good_pic:[],current_pic:null,spec2_active:0,youLike:[]};
  },
  created:function(){   
      var fid = this.$route.params.fid;
      var plid = this.$route.params.plid;
      var gfid = this.$route.params.gfid;
      //加载猜你喜欢
      this.$http.get("http://127.0.0.1/yuki/data/product/product_recommended.php?fid="+fid+"&gfid="+gfid).then((response)=>{
      var res = response.body;
          for(var i=0;i<res.length;i++){
              this.youLike[i] = res[i];
          }
          //console.log(this.youLike)
      })
 
      
      //加载详情页对应商品数据
      var search = "?fid="+fid+"&plid="+plid+"&gfid="+gfid;
      this.$http.get("http://127.0.0.1/yuki/data/product/product_detail.php"+search).then((response)=>{
          this.pl = response.body.pl;
          this.pf = response.body.pf;
          //console.log(this.pl,this.pf);
          this.goods = response.body.data;
          for(var i=0;i<this.goods.length;i++){
              this.goods[i].d_price = parseFloat(this.goods[i].d_price).toFixed(2);
              this.goods[i].f_price = parseFloat(this.goods[i].f_price).toFixed(2);
              this.goods[i].promise = this.goods[i].promise.split("|");
              this.goods[i].g_spec2 = this.goods[i].g_spec2.split("|");
              for(var j=0;j<this.goods[i].g_spec2.length;j++){
                  if(this.goods[i].g_spec2!=""){
                        var start = this.goods[i].g_spec2[j].indexOf("(");
                        var end = this.goods[i].g_spec2[j].indexOf(")");
                        var name = this.goods[i].g_spec2[j].slice(0,start);
        
                        var spec2_stock = parseInt(this.goods[i].g_spec2[j].slice(start+1,end))
                        this.goods[i].g_spec2[j] = {name:name,stock:spec2_stock};
                  }
                  
                  //this.goods[i].g_spec2[j].splice(this.goods[i].g_spec2[j].indexOf("("));
              }
              this.goods[i].detail = this.goods[i].detail.split("|");
            
          }
          this.current_good = this.goods[0]; 
          this.good_pic = response.body.pic;
          this.current_pic = this.current_good.g_pic;
          //this.sendCurrent_good();
         // console.log(this.current_good.g_spec2,this.current_good.detail)
        //   console.log(this.goods[0],this.current_good,this.good_pic[0])
        //console.log(this.current_good);
      })
      
  },
  mounted:function(){
        this.$http.get("http://127.0.0.1/yuki/data/user/isLogin.php",{withCredentials:true}).then((response)=>{
            var res = response.body;
            if(res.code>0){
                this.isLogin = true;
            }
        })
        // Bus.$on("isLogin",function(msg){
        //     console.log(msg);
        // })
        
  },
  methods:{
      addCart:function(){
          var quantity = this.quantity;
          //console.log(this.current_good);
          var gid = this.current_good.gid;
          var spec1 = this.current_good.g_spec1;
          if(this.current_good.g_spec2!=""){
              var spec2 = this.current_good.g_spec2[this.spec2_active].name;
          }else{
              var spec2 = "";
          }
          this.$http.post("http://127.0.0.1/yuki/data/cart/insertCart.php",{gid,quantity,spec1,spec2},{withCredentials:true,emulateJSON:true}).then((response)=>{
              var res = response.body;
              if(res.code<0){
                  alert(res.msg);
                  return;
              }else if(res.code>0){
                  alert(res.msg);
              }
          })
      },
      toBuy:function(){
         // console.log(22);
      },
      addQuantity:function(){    
          this.quantity += 1; 
          //console.log(this.quantity);
      },
      reduceQuantity:function(){
          this.quantity -= 1;
      },
      changeProductType:function(index){
          this.current_good = this.goods[index];
          this.current_pic = this.current_good.g_pic;
        //   console.log(this.current_pic)
      },
      changeProductStyle:function(index){
          var target = event.target;
          if(target.className.indexOf("no-stock")!=-1){
               return;
          }else{
               this.spec2_active = index;
          };  
      },
      changeCurrentPic:function(index){
          this.current_pic = this.good_pic[index].src;
      },
      showPicMagnifier:function(){
          
          var $magnify = $(".detail-showImage-magnify");
          var $pic_lg = $(".detail-showImage-lg");
          var $pic_md = $(".detail-showImage-md>img");
          var pic_width = event.target.offsetWidth;
          var pic_height = event.target.offsetHeight;
          var width = $magnify[0].offsetWidth;
          var height = $magnify[0].offsetHeight;
          var md_width = $pic_md[0].offsetWidth;
          var md_height = $pic_md[0].offsetHeight;
          var lg_width = ($pic_lg.children("img"))[0].offsetWidth;
          var lg_height =  ($pic_lg.children("img"))[0].offsetHeight;
          $pic_lg.show();
          var x = event.offsetX-width/2;
          var y = event.offsetY-height/2;
          if(x<0){
              x=0;
          }
          if(y<0){
              y=0;
          }
          if(x>pic_width-width){
              x=pic_width-width;
          }
          if(y>pic_height-height){
              y=pic_height-height;
          }
 
          $magnify.css({"left":x,"top":y});
          $pic_lg.children("img").css({"left":-x*lg_width/md_width,"top":-y*lg_height/md_height});  
      }, 
      hidePicMagnifier:function(){
          $(".detail-showImage-lg").hide();
      },
      scrollPic(){

      }
  },
  computed:{
      
  }
}
</script>

<style>
    .no-stock{
        color:#e5e5e5 !important;
        cursor:not-allowed !important;
    }
</style>


