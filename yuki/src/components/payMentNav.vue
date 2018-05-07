<template>
  <div class="container">
      <div class="row yuki-payNav">
          <div class="col-xs-4" v-for="(tmp,index) in items">
              <div :class="{'yuki-payNav-list':true,'active':ActiveNav==index} ">{{tmp}}</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data:function(){
      return {items:["订单确认","选择支付方式","支付完成"]}
  },
  props:{
      ActiveNav:String
  }
}
</script>
<style>
.yuki-payNav{
  margin-top:20px;
}
.yuki-payNav-list{
  width:100%;
  height:32px;
  line-height:32px;
  text-align:center;
  font-size:16px;
  font-weight:bold;
  color:#fff;
  background-color:#e3e3e3;
}
.yuki-payNav>div{
  position:relative;
}
.yuki-payNav>div:not(:first-child)>.yuki-payNav-list:before{
  content:"";
  position:absolute;
  display:block;
  border:16px solid transparent;
  border-left-color:#fafafa;
  top:0;
  left:0;
  margin-left:15px;
}
.yuki-payNav>div:not(:last-child)>.yuki-payNav-list:after{
  content:"";
  position:absolute;
  display:block;
  border:16px solid transparent;
  border-left-color:#e3e3e3;
  top:0;
  left:100%;
  margin-left:-15px;
}
.yuki-payNav>div>.yuki-payNav-list.active:after{
  border-left-color:#6699cc;
}
.yuki-payNav-list.active{
  background-color:#6699cc;
}

</style>

