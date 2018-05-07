<template>
    <div>
        <carousel-aside></carousel-aside>  
        <yuki-hot></yuki-hot>
        <product-block Fid=2 Plid=0></product-block>
        <product-block Fid=3 Plid=0></product-block>
        <product-block Fid=4 Plid=0></product-block>
        <product-block Fid=5 Plid=0></product-block>
        <product-block Fid=6 Plid=0></product-block>
        <product-block Fid=7 Plid=0></product-block>
        <yuki-floor :floorName="productFamily"></yuki-floor>
    </div>
</template>


<script>
import carouselAside from '@/components/carousel-aside';
import productBlock from '@/components/product-block';
import yukiHot from '@/components/hot';
import yukiFloor from '@/components/floor';
export default {
    components:{
        carouselAside,
        productBlock,
        yukiHot,
        yukiFloor
    },
    data:function(){
        return {productFamily:[{name:"热卖推荐"}]}
    },
    created:function(){
        
    },
    mounted:function(){
        this.$http.get("http://127.0.0.1/yuki/data/index/aside.php").then((response)=>{
            var res = response.body.pf;
            for(var i=0;i<res.length;i++){
                if(i>0){
                    this.productFamily.push({name:res[i].fname});
                }
            }
        })
    },
    methods:{

    }
}
</script>


<style>

</style>
