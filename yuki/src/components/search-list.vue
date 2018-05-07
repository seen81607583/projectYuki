<template>
    <div class="productlist">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div class="goodlist-crumbs">
                    <router-link to="/">yuki动漫</router-link>
                    <span>></span>
                    <a>搜索结果{{product.length}}条</a>
                </div>
            </div>
        </div>         
        <div class="goodList-productlist">
            <div class="row">
                <div class="col-xs-6 col-md-3" v-for="(tmp,index) in product">
                    <div class="product-card">
                        <a @click.stop="toDetail(index)">
                            <div class="product-img">
                                <img :src="require('../assets/'+tmp.g_pic)" alt="">
                            </div>
                            <div class="product-title">{{tmp.title}}</div>
                            <div class="product-price">￥<span>{{tmp.f_price}}</span></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
//import bus from './bus'
export default {
    watch:{
        '$route':function(){
            this.$router.go(0);
        }
    },
  data:function(){
      return {product:[],kw:null}
  },
  created:function(){
      this.kw = this.$route.params.kw;
      if(this.kw==null||this.kw=="null"){
          this.getData();
      }else{
          this.getData(this.kw);
      }
  },
  methods:{
        toDetail:function(index){
          var fid = this.product[index].fid;
          var plid = this.product[index].plid;
          var gfid = this.product[index].gfid;
          this.$router.push("/detail/"+fid+"/"+plid+"/"+gfid);
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        },
        getData:function(kw){
            console.log(kw);
            if(kw!=null){
                this.$http.get("http://127.0.0.1/yuki/data/product/product_search.php?kw="+kw).then((response)=>{
                    for(var i=0;i<response.body.length;i++){
                        this.product.push(response.body[i]);
                    }
                })
            }else{
                this.$http.get("http://127.0.0.1/yuki/data/product/product_search.php").then((response)=>{
                    for(var i=0;i<response.body.length;i++){
                        this.product.push(response.body[i]);
                    }
                })
            }    
        }
  }
}
</script>

<style>
@media(min-width:768px){
    .product-img{
        height:260px;
        overflow:hidden;
    }
}
</style>
