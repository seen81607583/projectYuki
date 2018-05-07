<template>
  <div class="carousel-aside col-sm-hide" >
    <div class="carousel" @mouseover="intervalClear()" @mouseout="intervalStart()" >
        <div class="carousel-box">
            <div v-for="tmp in carousel">
                <a href="" >
                    <img :src="require('../assets/'+tmp.src)" alt="">
                </a>
            </div>          
        </div>
        <div class="carousel-btn">
            <ul>
                <li v-for="(tmp,index) in carousel" :class="{'active':active_btn==index}" @click="setActiveBtn(index)"></li>
            </ul>
        </div>
    </div>
    <div class="carousel-up">
        <div class="aside">
            <div class="aside-box">
                <ul class="unstyled">
                    <li  v-for="(tmp,index) in productFamily" class="aside-hover" @click.stop="toList(tmp.fid)">
                        <img :src="require('../assets/'+tmp.f_ico)" alt="">
                        <span>{{tmp.fname}}</span>
                        <div class="aside-hover-list">
                            <ul class="unstyled">
                                <li v-for="p in productList[index]" @click.stop="toList(p.fid,p.plid)">
                                    <a>
                                        <img :src="require('../assets/'+p.pl_ico)" alt="">
                                        <span>{{p.plname}}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>                   
                    </li>
                    
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    watch:{
        // 'active_btn':function(){
        // }
    },
    directives:{
        // myAdd:{
        //     inserted:function(el,binding){
        //         el.onclick=function(){
        //             binding.value.fn();
        //         }
        //     }
        // }
    },
    data:function(){
        return {productList:[],productFamily:[],carousel:[],timer:null,active_btn:0};
    }, 
    created:function(){
        this.$http.get("http://127.0.0.1/yuki/data/index/aside.php").then((response)=>{
            this.productFamily = response.body.pf;
            for(var i=0;i<response.body.pf.length;i++){
                this.productList[i] = [];
                for(var j=0;j<response.body.pl.length;j++){
                    if(response.body.pl[j].fid==i+1){
                        this.productList[i].push(response.body.pl[j]);
                    } 
                }
            }
        });

        this.$http.get("http://127.0.0.1/yuki/data/index/carousel.php").then((response)=>{
            this.carousel = response.body;

            $(".carousel-box").css("width",this.carousel.length*1920);
            $(".carousel-box").css("position","relative");
        })   
    },
    mounted:function(){
        if(this.carousel.length>0){
            this.carouselAnimate();
        }else{
            setTimeout(()=>{
                this.carouselAnimate();
            },5000);
        }
        
        //this.sendProductFamily();
    },
    destroyed:function(){
        clearInterval(this.timer);
        this.timer = null;
    },
    methods:{
        toList:function(fid,plid){
           if(plid==undefined||plid==null){
               plid=0;
           }
           this.$router.push("/goodList/"+fid+"/"+plid);
        },
        setActiveBtn:function(index){
            this.active_btn = index;
            $(".carousel-box").stop(true).animate({
                left:-1920*this.active_btn
            },500);
        },
        intervalClear:function(){
            clearInterval(this.timer);
            this.timer = null;
        },
        intervalStart:function(){
            this.carouselAnimate();
        },
        carouselAnimate:function(){
            this.timer = setInterval(()=>{
                 this.active_btn ++;
                 if(this.active_btn==this.carousel.length){
                     this.active_btn = 0;
                 }
                 $(".carousel-box").stop(true,true).animate({
                     left:-1920*this.active_btn
                 },500);
              },3500)
        },
        // fn:function(){
        //     this.test +=1;
        //     console.log(this.test);
        // }
        // sendProductFamily(){
        //     this.$emit("getProductFamily",123);
        // }
    }
}
</script>

<style>
.carousel-btn{
    position:absolute;
    /* background:blue; */
    top:400px;
    left:50%;
    margin-left:-90px;
}
.carousel-btn>ul{
    list-style: none;
}
.carousel-btn>ul>li{
    display:block;
    height:4px;
    width:24px;
    float:left;
    margin-left:2px;
    background:#fff;
}
.carousel-btn>ul>li:first-child{
    margin-left:0;
}
.carousel-btn>ul>li:hover{
    border:1px solid #333;
}
.carousel-btn>ul>li.active{
    background:#6699cc;
}
</style>

