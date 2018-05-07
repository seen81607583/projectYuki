<template>
  <div class="container product-block yuki-floor">
    <div class="row product-bar">
        <div class="col-xs-12 col-sm-5">
            <div class="title" v-for="tmp in block"><a href="">{{tmp.fname}}</a></div>
        </div>
        <div class="col-sm-6 col-xs-hide">
            <ul class="unstyled product-block-guide fn">
                <li v-for="tmp in block_list"><router-link :to="'/goodList/'+tmp.fid+'/'+tmp.plid">{{tmp.plname}}</router-link></li>
            </ul>
        </div>
        <div class="col-sm-1 col-xs-hide more">
            <div class="">
                <router-link class="more" :to="'/goodList/'+Fid+'/'+0">更多&gt;</router-link>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 col-sm-6 product-block-box">
            <router-link :to="'goodList/'+Fid+'/'+Plid">
                <div class="product-block-img" v-for="tmp in block">
                    <img :src="require('../assets/'+tmp.f_pic)" alt="">
                </div>
            </router-link>       
        </div>
        <div class="col-xs-6 col-sm-3 product-box" v-for="(tmp,index) in product">
            <div class="product-card">
                <a @click.prevent="toDetail(index)">
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
</template>

<script>
export default {
  data:function(){
      return {product:[],block:[],block_list:[]}
  },
  props:['Fid','Plid'],
  beforeMount:function(){
      this.$http.get("http://127.0.0.1/yuki/data/index/product_block.php?fid="+this.Fid).then((response)=>{
        //  console.log(response.body)
          this.product = response.body.product;
          this.block = response.body.block;
          this.block_list = response.body.block_list;        
      })
  },
  methods:{
      toDetail:function(index){
          var fid = this.product[index].fid;
          var plid = this.product[index].plid;
          var gfid = this.product[index].gfid;
          this.$router.push("/detail/"+fid+"/"+plid+"/"+gfid);
          document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
  }
}
</script>

<style>

</style>

