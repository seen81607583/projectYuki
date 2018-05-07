<template>
    <div class="bg_l_r">
        <div class="login">
            <div class="container">
                <div class="row">
                    <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-6 col-md-4 col-md-offset-8">
                        <form action="">
                            <div class="login-box">
                                <ul class="unstyled">
                                    <li>Yuki账号登录</li>
                                    <li class="err" v-show="isErr==true"><i><img src="../assets/img/register_login/error.png" alt=""></i><span>{{errMsg}}</span></li>
                                    <li class="text-input">
                                        <span><img src="../assets/img/register_login/icon_user.png" alt=""></span>
                                        <input type="text" name="uname" placeholder="用户帐号" v-model="uname">
                                    </li>
                                    <li class="text-input">
                                        <span><img src="../assets/img/register_login/icon_password1.png" alt=""></span>
                                        <input type="password" name="upwd" placeholder="登录密码" v-model="upwd">
                                    </li>
                                    <li>
                                        <button @click.prevent="myLogin()">登录</button>
                                    </li>
                                    <li class="toRegister">
                                        <span><a href="">忘记密码?</a></span>
                                        <span><router-link to="/register" >去注册</router-link></span>
                                    </li>
                                    <li>
                                        <fieldset disabled="disabled">
                                            <legend>其他登录方式</legend>
                                            <div class="logweibo">
                                                <a href="">
                                                    <div></div>
                                                    <span>微博</span>
                                                </a>
                                            </div>
                                            <div class="logqq">
                                                <a href="">
                                                    <div></div>
                                                    <span>QQ</span>
                                                </a>
                                            </div>
                                        </fieldset>
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data:function(){
      return {isErr:false,errMsg:"",uname:"",upwd:""}
  },
  methods:{
      myLogin:function(){
          //this.$http.post("",{uname:uname,upwd:upwd},{emulateJSON:true})
          var uname = this.uname;
          var upwd =this.upwd;
          this.$http.jsonp('http://127.0.0.1/yuki/data/user/login.php?uname='+uname+'&upwd='+upwd,{withCredentials:true})   
          .then((response)=>{
              var res = response.body;
              //console.log(response);
              if(res.code<0){
                  this.isErr = true;
                  this.errMsg = response.body.msg;
              }else if(res.code>0){
                  this.isErr = false;
                  this.errMsg = "";
                  //alert(res.msg);
                  this.$router.go(0);
                  this.$router.push("/");
              }
          })
      }
  },
  destroyed:function(){
      
  }
}
</script>

<style>

</style>


