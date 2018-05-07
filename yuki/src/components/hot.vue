<template>
  <div class="container hot-list product-block yuki-floor">
        <div class="row">
            <div class="col-xs-12">
                <div class="title"><a href="">热卖推荐</a></div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-6 col-sm-3" v-for="(tmp,index) in hot">
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
        return {hot:[]};
    },
    beforeMount:function(){
        this.$http.get("http://127.0.0.1/yuki/data/index/hot.php").then((response)=>{ 
            this.hot = response.body;
        })
    },
    methods:{
        toDetail:function(index){
            var fid = this.hot[index].fid;
            var plid = this.hot[index].plid;
            var gfid = this.hot[index].gfid;
            this.$router.push("/detail/"+fid+"/"+plid+"/"+gfid);
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    }
}
</script>

<style>

</style>


