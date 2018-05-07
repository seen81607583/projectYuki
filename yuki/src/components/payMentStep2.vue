<template>
    <div>
        <pay-ment-nav ActiveNav=1></pay-ment-nav>
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <ul class="unstyled yuki-bankSelect">
                        <li>
                            <input type="radio" id="yuki-payBank-1" name="yuki-payBank">
                            <label for="yuki-payBank-1">
                                <img src="../assets/img/pay/pay_img1.jpg" alt="">
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="yuki-payBank-2" name="yuki-payBank">
                            <label for="yuki-payBank-2">
                                <img src="../assets/img/pay/pay_img2.jpg" alt="">
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="yuki-payBank-3" name="yuki-payBank">
                            <label for="yuki-payBank-3">
                                <img src="../assets/img/pay/pay_img3.jpg" alt="">
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="yuki-payBank-4" name="yuki-payBank">
                            <label for="yuki-payBank-4">
                                <img src="../assets/img/pay/pay_img4.jpg" alt="">
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="yuki-payBank-5" name="yuki-payBank">
                            <label for="yuki-payBank-5">
                                <img src="../assets/img/pay/pay_img5.jpg" alt="">
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 yuki-payConfirm">
                    <a href="javascript:" @click="toStep3()">确认支付</a>
                </div>
            </div>
        </div>
    </div>
  
</template>

<script>
import payMentNav from "./payMentNav";
export default {
  data: function() {
    return { isSelectBank: false };
  },
  components: {
    payMentNav
  },
  created: function() {
    //console.log(this.$route.params)
  },
  methods: {
    toStep3: function() {
      var checkBanks = document.querySelectorAll("input");
      for (var i = 0; i < checkBanks.length; i++) {
        if (checkBanks[i].checked == true) {
          this.isSelectBank = true;
          break;
        }
      }
      if (this.isSelectBank === true) {
        this.$router.push({
          path: "/payMent/step3",
          name: "payMentStep3",
          params: { checkMsgs: this.$route.params.checkMsgs }
        });
      }else{
           alert("清选择支付方式");
      }
    }
  }
};
</script>

<style>
.yuki-bankSelect {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  background: #fff;
  margin-top: 10px;
  line-height: 0;
}
.yuki-bankSelect > li {
  margin-left: 10px;
  margin-right: 10px;
}
.yuki-bankSelect > li > input {
  display: inline-block;
  position: relative;
  bottom: 20px;
}
.yuki-bankSelect > li > img {
  display: inline-block;
}
.yuki-payConfirm {
  text-align: right;
  margin-top: 10px;
}
.yuki-payConfirm > a {
  display: inline-block;
  height: 32px;
  width: 96px;
  line-height: 32px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background: -o-linear-gradient(180deg, #4499cc 0%, #6699cc 100%);
  background: -moz-linear-gradient(180deg, #4499cc 0%, #6699cc 100%);
  background: -webkit-linear-gradient(180deg, #4499cc 0%, #6699cc 100%);
  background: linear-gradient(180deg, #4499cc 0%, #6699cc 100%);
}
</style>

