<template>
  <div class="bg_r">
    <div class="register">
        <div class="container">
            <div class="row">
                <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-6 col-md-4 col-md-offset-8">
                    <form action="">
                        <div class="register-box">
                            <ul class="unstyled">
                                <li>新用户注册<span><router-link to="/login">已有帐号</router-link></span></li>
                                <li class="err" v-show="isErr==true"><i><img src="../assets/img/register_login/error.png" alt=""></i><span>{{errMsg}}</span></li>
                                <li class="text-input">
                                    <span><img src="../assets/img/register_login/icon_user.png" alt=""></span>
                                    <input type="text" name="uname" placeholder="用户帐号" v-model="uname" @blur="verifyUname">
                                </li>
                                <li class="text-input">
                                    <span><img src="../assets/img/register_login/icon_password1.png" alt=""></span>
                                    <input type="password" name="upwd" placeholder="设置密码" v-model="upwd" @blur="verifyUpwd">
                                </li>
                                <li class="text-input">
                                    <span><img src="../assets/img/register_login/icon_password2.png" alt=""></span>
                                    <input type="password" name="cpwd" placeholder="重复密码" v-model="cpwd" @blur="verifyCpwd">
                                </li>
                                <li class="text-input">
                                    <span><img src="../assets/img/register_login/icon_phon e.png" alt=""></span>
                                    <input type="text" name="phone" placeholder="手机号码" v-model="phone" @blur="verifyPhone">
                                </li>
                                <li>
                                    <button @click.prevent="myRegister()">立即注册</button>
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
        return {uname:"",upwd:"",cpwd:"",phone:"",isErr:false,errMsg:""}
    },
    methods:{
        myRegister:function(){
            var uname = this.uname;
            var upwd = this.upwd;
            var cpwd  = this.cpwd;
            var phone = this.phone;

            if(uname==""){
                this.isErr = true;
                this.errMsg = "请输入6-18位用户名";
                return;
            }else if(upwd==""){
                this.isErr = true;
                this.errMsg = "请输入6-18位密码";
                return;
            }else if(cpwd==""){
                this.isErr = true;
                this.errMsg = "请再次输入密码";
                return;
            }else if(phone==""){
                this.isErr = true;
                this.errMsg = "请输入手机号码";
                return;
            }else if(this.isErr==true){
                return;
            }else{
                this.$http.post("http://127.0.0.1/yuki/data/user/register.php",{uname,upwd,phone},{emulateJSON:true}).then((response)=>{
                    var res = response.body;
                    if(res.code>0){
                        alert(res.msg);
                        this.$router.push("/login");
                    }else{
                        this.isErr = true;
                        this.errMsg = res.msg;
                        return;
                    }
                })
            }
        },
        verifyUname:function(){
            var reg = /^[a-zA-Z0-9_]{6,18}$/;
            var uname = this.uname;
            if(reg.test(uname)==false){
                this.isErr = true;
                this.errMsg = "用户帐号应为6-18位英文或数字";
                return;
            }
           
            this.$http.get("http://127.0.0.1/yuki/data/user/checkUname.php?uname="+uname).then((response)=>{
                var res = response.body;
                if(res.code>0){
                    this.isErr = false;
                    this.errMsg = "";
                }else{
                    this.isErr = true;
                    this.errMsg = res.msg;
                }
            })
        },
        verifyUpwd:function(){
            var reg = /^[a-zA-Z0-9_]{6,18}$/;
            var upwd = this.upwd;
            if(reg.test(upwd)==false){
                this.isErr = true;
                this.errMsg = "用户密码应为6-18位英文或数字";
                return;
            }else{
                this.isErr = false;
                this.errMsg = "";
            }
        },
        verifyCpwd:function(){
            var upwd = this.upwd;
            var cpwd = this.cpwd;
            if(upwd==""||cpwd==""){
                this.isErr = true;
                this.errMsg = "密码不能为空";
                return;
            }else if(upwd!==cpwd){
                this.isErr = true;
                this.errMsg = "两次输入的密码不一致";
                return
            }else{
                this.isErr = false;
                this.errMsg = "";
            }
        },
        verifyPhone:function(){
            var phone = this.phone;
            var reg = /^1[34578]\d{9}$/;
            if(reg.test(phone)==false){
                this.isErr = true;
                this.errMsg = "手机号码方式格式不正确";
                return;
            }else{
                this.isErr = false;
                this.errMsg = "";
            }
        }
    }
}
</script>
<style>

</style>


