<template>
    <div>
        <pay-ment-nav ActiveNav=2></pay-ment-nav>
        <h2 style="text-align:center">{{second}}秒后返回首页</h2>
    </div>
  
</template>

<script>
import payMentNav from "./payMentNav";
export default {
  data: function() {
    return { second: 5, timer: null };
  },
  components: {
    payMentNav
  },
  created: function() {
    //console.log(this.$route.params);
    this.timer = setInterval(() => {
        if(this.second>0){
            this.second--;
        }else{
            this.$router.push("/");
        }
      }, 1000);
  },
  destroyed:function(){
      clearInterval(this.timer);
      this.timer=null;
  }
};
</script>
