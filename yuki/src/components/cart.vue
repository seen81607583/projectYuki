<template>
  <div class="cart">
    <div class="container">
        <div class="row cart-listTitle">
            <div class="col-xs-2 col-md-1  cart-checkAll">
                <a href="javascript:" @click="selectAll()">全选</a>
            </div>
            <div class="col-xs-2 col-md-1 cart-deleteChecked">
                <a href="javascript:">删除</a>
            </div>
            <div class="col-xs-8 col-md-10 cart-total">
                <div>已经选定<span class="cart-total-quantity">{{totalSelected}}</span>件商品，共计<span class="cart-totalPrice">{{totalPrice}}</span>元</div>
            </div>
        </div>
    </div>

    <div class="container cart-productCard-box" v-for="(tmp,index) in cartList">
        <!-- 单个商品 -->
        <div class="row cart-productCard">
            <div class="col-xs-2 col-md-1 cart-productCart-item">
                <div class="cart-check">
                    <div>
                        <input type="checkbox" v-model="checkProducts[index]" @change="myChecked(index)">
                    </div>
                </div>
            </div>
            <div class="col-xs-10 col-md-5 cart-productCart-item">
                <div class="cart-productCard-title" style="cursor:pointer" @click="toDetail(index)">
                    <div class="cart-productCard-title-img">
                        <img :src="require('../assets/'+tmp.g_pic)" alt="">
                    </div>
                    <div class="cart-productCard-title-content">
                        <span>{{tmp.title+' '+tmp.spec1+' '+tmp.spec2}}</span>
                    </div>
                </div>
            </div>
            <div class="col-xs-8 col-md-4 cart-productCart-item">
                <div class="cart-productCard-priceBlock">
                    <ul class="unstyled">
                        <li class="cart-productCard-price">
                            <div>单价</div>
                            <div>￥{{parseFloat(tmp.f_price).toFixed(2)}}</div>
                        </li>
                        <li class="cart-productCard-quantity">
                            <div>数量</div>
                            <div>{{tmp.quantity}}</div>
                        </li>
                        <li>
                            <div class="cart-productCard-subtotal">小计</div>
                            <div>￥{{(tmp.quantity*tmp.f_price).toFixed(2)}}</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-xs-4 col-md-2 cart-productCart-item">
                <div class="cart-productCard-manipulate">
                    <ul class="unstyled">
                        <li>
                            <a href="javascript:">结算</a>
                        </li>
                        <li>
                            <a href="javascript:" @click.prevent="cancelOrder(index)">取消订单</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>       
    </div>
    <div class="container">
        <div class="row cart-listTitle">
            <div class="col-xs-2 col-md-1  cart-checkAll">
                <a href="javascript:" @click="selectAll()">全选</a>
            </div>
            <div class="col-xs-2 col-md-1 cart-deleteChecked">
                <a href="javascript:">删除</a>
            </div>
            <div class="col-xs-8 col-md-10 cart-total">
                <div>已经选定<span class="cart-total-quantity">{{totalSelected}}</span>件商品，共计<span class="cart-totalPrice">{{totalPrice}}</span>元</div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 yuki-toPayMent">
                <a href="javascript:" @click="toPayMent()">去结算</a>
            </div>
        </div>
    </div>
</div>

</template>

<script>
export default {
    data:function(){
        return {cartList:[],checkProducts:[],totalPrice:0,totalSelected:0,checkCid:[]};
    },
    created:function(){
        this.$http.get("http://127.0.0.1/yuki/data/cart/showCart.php",{withCredentials:true}).then((response)=>{     
            this.cartList = this.cartList.concat(response.body);
            for(var i=0;i<this.cartList.length;i++){
                this.checkProducts[i] = false;
            }
           // console.log(this.cartList);
        })
    },
    mounted:function(){
    },
    updated:function(){
        var res = 0;
        var cCids = [];
        for(var i=0;i<this.cartList.length;i++){
            if(this.checkProducts[i]===true){
                res+=this.cartList[i].f_price*this.cartList[i].quantity;
                cCids.push(this.cartList[i].cid);
            }
        }
        this.totalPrice = res;
        this.checkCid = cCids;
    },
    methods:{
        myChecked:function(index){
            this.totalSelected = this.checkProducts.filter((value,index,array)=>{
                return value==true;
            }).length;
        },
        selectAll:function(){
            if(this.checkProducts.indexOf(false)!=-1){
                this.checkProducts = this.checkProducts.map((value,index,array)=>{
                    return value = true;
                })
            }else{
                this.checkProducts = this.checkProducts.map((value)=>{
                    return value = false;
                })
            }
            this.totalSelected = this.checkProducts.filter((value)=>{
                return value == true;
            }).length;
        },
        cancelOrder:function(index){
            var cid = this.cartList[index].cid;
            if(window.confirm("确定要取消订单吗?")==true){
                this.$http.get("http://127.0.0.1/yuki/data/cart/delOrder.php?cid="+cid).then((response)=>{
                    var res = response.body;
                    if(res.code>0){
                        alert(res.msg);
                        this.cartList.splice(index,1);
                    }else{
                        alert(res.msg);
                    }
                    
                })
            }else{
                return;
            }
        },
        toDetail:function(index){
            var tmp = this.cartList[index];
            this.$router.push("/detail/"+tmp.fid+'/'+tmp.plid+'/'+tmp.gfid);
        },
        toPayMent:function(){
            this.$router.push({path:"/payMent/step1",name:"payMentStep1",params:{cids:this.checkCid}});
        }
    }
}
</script>

<style>
    .yuki-toPayMent{
        text-align:right;
        margin-top:10px;
        padding-right:0;
        padding-left:0;
    }
    .yuki-toPayMent>a{
        display:inline-block;
        height:32px;
        width:96px;
        line-height:32px;
        text-align:center;
        font-size:18px;
        font-weight:bold;
        color:#fff;
        background:-o-linear-gradient(180deg,#4499cc 0%,#6699cc 100%);
        background:-moz-linear-gradient(180deg,#4499cc 0%,#6699cc 100%);
        background:-webkit-linear-gradient(180deg,#4499cc 0%,#6699cc 100%);
        background:linear-gradient(180deg,#4499cc 0%,#6699cc 100%);
    }
</style>


