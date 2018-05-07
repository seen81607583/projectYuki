<template>
<div>
    <pay-ment-nav ActiveNav=0></pay-ment-nav>
    <div class="container">
      <div class="row yuki-orderConfirm" v-if="user!=null">
          <div class="col-xs-12">
              <ul class="unstyled yuki-orderConfirm-msg">
                  <li class="yuki-orderConfirm-recipient">
                      <span>收件人:</span>
                      <span>{{user.uname}}</span>
                  </li>
                  <li class="yuki-orderConfirm-phone">
                      <span>联系电话:</span>
                      <span>{{user.phone}}</span></li>
                  <li class="yuki-orderConfirm-address">
                      <span>收件地址:</span>
                      <span>{{user.address}}</span>
                      <a href="javascript:">更改地址</a>
                      <div class="yuki-orderConfirm-address-change">
                          <input type="text">
                          <a href="javascript:">确定</a>
                          <a href="javascript:">取消</a>
                      </div>
                  </li>
              </ul>
          </div>
      </div>

      <div class="row yuki-orderProduct" v-for="tmp in checkProducts">
          <div class="col-xs-12 col-md-6 yuki-orderProduct-title">
              <div>
                  <div class="yuki-orderProduct-title-img">
                  <img :src="require('../assets/'+tmp.g_pic)" alt="">
                </div>
                <div class="yuki-orderProduct-title-content"> 
                    <span >{{tmp.title}}</span>
                </div>
              </div> 
          </div>
          <div class="col-xs-12 col-md-6">
              <ul class="unstyled yuki-orderProduct-msg">
                  <li class="yuki-orderProduct-price">
                      <div>单价</div>
                      <div>￥{{tmp.f_price}}</div>
                  </li>
                  <li  class="yuki-orderProduct-quantity">
                      <div>数量</div>
                      <div>{{tmp.quantity}}</div>
                  </li>
                  <li  class="yuki-orderProduct-subprice">
                      <div>小计</div>
                      <div>{{tmp.f_price*tmp.quantity}}</div>
                  </li>
              </ul>
          </div>
      </div>
      <div class="row yuki-toPay">
          <div class="col-xs-10">
              <span class="yuki-toPay-totalQuantity">共<span class="yuki-toPay-total-em">{{checkProducts!=null&&checkProducts.length}}</span>件商品,</span>
              <span class="yuki-toPay-totalPrice">总价<span class="yuki-toPay-total-em">{{totalPrice}}</span>元</span>
          </div>
          <div class="col-xs-2 yuki-toPay-pay">
              <a href="javascript:" @click="toStep2()">
                  结算
              </a>
          </div>
      </div>
  </div>
</div>
</template>

<script>
import payMentNav from "./payMentNav";
export default {
  components: {
    payMentNav
  },
  data: function() {
    return { cids: [], checkProducts: [], user:null ,totalPrice:0,checkMsgs:{}};
  },
  created: function() {
    //console.log(this.$route.params)
    this.cids = this.$route.params.cids;

    var cids = "";
    //console.log(this.cids);
    if (this.cids != null) {
      if (this.cids.length > 0) {
        cids = this.cids.join(",");
      }
    }

    this.$http
      .get("http://127.0.0.1/yuki/data/payMent/payMent.php?cids=" + cids, {
        withCredentials: true
      })
      .then(response => {
        if (response.body != null) {
          this.checkProducts = response.body.products;
          this.user = response.body.user;
          this.checkMsgs.user = this.user;
          this.checkMsgs.checkProducts = this.checkProducts;
        }
       // console.log(this.checkProducts, this.user);
        for(var i=0;i<this.checkProducts.length;i++){
            this.totalPrice+= this.checkProducts[i].f_price*this.checkProducts[i].quantity;
        }
      });
  },
  methods:{
      toStep2:function(){
          this.$router.push({path:'/payMent/step2',name:'payMentStep2',params:{checkMsgs:this.checkMsgs}})
      }
  }
};
</script>

<style>
.yuki-orderConfirm-msg {
  margin-top: 15px;
  background: #e3e3e3;
  padding: 15px;
}
.yuki-orderConfirm-msg > li {
  font-size: 14px;
  color: #333;
}
.yuki-orderConfirm-address > a {
  margin-top: 5px;
  display: block;
  color: #333;
}
.yuki-orderConfirm-address > a:hover {
  color: #6699cc !important;
}
.yuki-orderConfirm-address-change {
  display: none;
}
.yuki-orderConfirm-address-change > input {
  margin-top: 5px;
  margin-bottom: 5px;
  height: 24px;
  width: 100%;
  max-width: 360px;
  display: block;
}
.yuki-orderConfirm-address-change > a {
  color: #333;
}
.yuki-orderConfirm-address-change > a:hover {
  color: #6699cc !important;
}
.yuki-orderProduct {
  margin-top: 10px;
}
.yuki-orderProduct-title > div {
  display: flex;
  justify-content: space-between;
  height: 60px;
  border: 1px solid #e3e3e3;
  background: #fff;
  line-height:60px;
}
.yuki-orderProduct-title-img {
  width: 20%;
  border: 1px solid #e3e3e3;
  text-align:center;
  
}
.yuki-orderProduct-title-img > img {
  height:50px;
  margin-top:4px;
}
.yuki-orderProduct-title-content {
  width: 80%;
  border: 1px solid #e3e3e3;
  padding-left: 15px;
  padding-right: 15px;
}
.yuki-orderProduct-title-content > span {
  font-size: 12px;
}
.yuki-orderProduct-msg {
  display: flex;
  justify-content: space-between;
  height: 60px;
  border: 1px solid #e3e3e3;
  background: #fff;
}
.yuki-orderProduct-msg > li {
  width: 33.33333333%;
}
.yuki-orderProduct-price > div,
.yuki-orderProduct-quantity > div,
.yuki-orderProduct-subprice > div {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  text-align: center;
  border: 1px solid #e3e3e3;
  width: 100%;
}
@media (min-width: 992px) {
  .yuki-orderProduct > div:first-child {
    padding-right: 0;
  }
  .yuki-orderProduct-title-content {
    border-right: none;
  }
  .yuki-orderProduct > div:last-child {
    padding-left: 0;
  }
}
.yuki-toPay {
  height: 32px;
  margin-top: 10px;
}
.yuki-toPay > div {
  height: 32px;
  line-height: 32px;
}
.yuki-toPay-totalQuantity,
.yuki-toPay-totalPrice {
  font-size: 14px;
}
.yuki-toPay-pay {
  text-align: right;
}
.yuki-toPay-pay > a {
  height: 32px;
  display: block;
  width: 100%;
  text-align: center;
  background: #6699cc;
  color: #fff;
  font-weight: blod;
  font-size: 18px;
}
.yuki-toPay-total-em {
  color: #6699cc;
  font-size: 16px;
}
</style>

