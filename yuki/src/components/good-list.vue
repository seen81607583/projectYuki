<template>
  <div class="goodlist">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div class="goodlist-crumbs">
                    <a href="">{{fname}}</a>
                    <span>></span>
                    <a href="">{{plname}}</a>
                </div>
            </div>
        </div>
        <div class="box-classify">
                <div class="row">
                        <div class="col-xs-12 col-sm-2 col-md-1">
                            <div class="goodlist-classify goodlist-classify-left">
                                <span>分类</span>    
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-10 col-md-11">
                            <div class="goodlist-classify-right goodlist-classify">
                                    <span :class="{'goodlist-classify-item':true,'active':plid==tmp.plid}" v-for="(tmp,index) in pl_in_family"
                                    @click="toList(tmp.fid,tmp.plid)">{{tmp.plname}}</span>
                            </div>
                        </div>
                    </div>
        </div>
       <div class="box-sort">
            <div class="row">
                    <div class="col-xs-12 col-sm-2 col-md-1">
                        <div class="goodlist-sort goodlist-sort-left">
                            <span>排序</span>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-10 col-md-11">
                        <div class="goodlist-sort goodlist-sort-right">
                            <div class="goodlist-sort-item goodlist-sort-hot col-xs-hide">人气</div>
                            <div class="goodlist-sort-item goodlist-sort-price col-xs-hide">
                                <span >价格</span>
                                <img src="" alt="">
                            </div>
                            <div class="goodlist-sort-item goodlist-sort-pricepoints">
                                <div class="goodlist-sort-pricepoints-item">价格区间</div>
                                <div class="goodlist-sort-pricepoints-item">
                                    <div class="goodlist-sort-price-input">
                                        <input type="text">
                                        <div>￥</div>
                                    </div>
                                    <span></span>
                                    <div  class="goodlist-sort-price-input">
                                        <input type="text">
                                        <div>￥</div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="goodlist-sort-item goodlist-sort-ensure">确定</div>
                        </div>
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
export default {
    directives:{
        // drag(el,binding){
        //     var element = el;
        //     element.onmouseenter=function(){
        //         console.log(11);
        //     }
        // }
    },
    watch:{
        "$route":function(){
            this.$router.go(0);
        }
    },
    data:function(){
        return {fid:1,plid:1,product:[],fname:"",plname:"全部",pl_in_family:[],active_plid:0};
    },
    created:function(){
        this.fid = this.$route.params.fid;
        this.plid = this.$route.params.plid;
        this.pl_in_family[0] = {fid:this.fid,plid:0,plname:"全部"};
        if(this.plid!=0){
            this.$http.get("http://127.0.0.1/yuki/data/product/product_list.php?fid="+this.fid+"&plid="+this.plid).then((response)=>{

                this.fname =  response.body.fname;
                this.plname = response.body.plname;
                for(var i=0;i<response.body.pl_in_family.length;i++){
                    this.pl_in_family.push(response.body.pl_in_family[i]);
                }
                for(var i=0;i<response.body.data.length;i++){
                   this.product.push(response.body.data[i]);
                }

                
               // console.log(this.fname,this.plname,this.pl_in_family,this.product);
            }).then(()=>{
                this.active_plid = this.plid;
            })
        }else if(this.plid==0){
            this.$http.get("http://127.0.0.1/yuki/data/product/product_list.php?fid="+this.fid).then((response)=>{
                //  console.log(response.body)
                this.fname =  response.body.fname;
                
                for(var i=0;i<response.body.pl_in_family.length;i++){
                    this.pl_in_family.push(response.body.pl_in_family[i]);
                }
                for(var i=0;i<response.body.data.length;i++){
                   this.product.push(response.body.data[i]);
                }

                //this.active_pl = this.pl_in_family[this.plid];
                // console.log(this.fname,this.plname,this.pl_in_family,this.product);
            }).then(()=>{
                this.active_plid = this.plid;
                //console.log(this.pl_in_family[0])
            })
         }
        //  else{
        //     this.$http.get("http://127.0.0.1/yuki/data/product/product_list.php").then((response)=>{
        //         console.log(typeof(response.body));
        //         console.log(response.body);
        //     })
        // }    
    },
    methods:{
        // handleChange:function(index,fid,plid){
        //     //this.$router.push("/goodList/"+fid+"/"+plid);
        //     this.active_pl = this.pl_in_family[index];
        //     //console.log(this.active_pl);
        //     this.plname = this.active_pl.plname;
        //     //console.log(fid,plid);
        //     if(plid!=0&&fid){
        //         this.product = [];
                
        //         this.$http.get("http://127.0.0.1/yuki/data/product/product_list.php?fid="+fid+"&plid="+plid).then((response)=>{
        //             for(var i=0;i<response.body.data.length;i++){
        //                 this.product.push(response.body.data[i]);
        //             }
        //         // console.log(this.fname,this.plname,this.pl_in_family,this.product);
        //          })
        //     }else if(plid==0&&fid){
        //         this.product = [];

        //         this.$http.get("http://127.0.0.1/yuki/data/product/product_list.php?fid="+fid).then((response)=>{
        //          //console.log(response.body)
                
        //             for(var i=0;i<response.body.data.length;i++){
        //                 this.product.push(response.body.data[i]);
        //             }
        //             //console.log(this.fname,this.plname,this.pl_in_family,this.product);
        //         })
        //     }
        // },
        toList:function(fid,plid){
            console.log(fid,plid)
           if(plid==undefined||plid==null){
               plid=0;
           }
           this.$router.push("/goodList/"+fid+"/"+plid);
        },
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


