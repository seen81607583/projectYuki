<template>
  <div class="yuki-floor-box">
      <ul class="unstyled">
          <li class="yuki-floor-list" v-for="(tmp,index) in floorName"><a href="javascript:" @click="toBlock(index)">{{tmp.name}}</a></li>
          <li class="yuki-floor-toTop yuki-floor-list"><a href="javascript:" @click.prevent="toTop()">返回顶部&nbsp;↑</a></li>
      </ul>
  </div>
</template>

<script>
export default {
  data:function(){
     return {}
  },
  props:{
      floorName:Array
  },
  mounted:function(){
     // console.log(this.floorName);
     function hasClass(obj, cls) {  
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
     }  
       
     function addClass(obj, cls) {  
         if (!hasClass(obj, cls)) obj.className += " " + cls;  
     }  

    window.onscroll=()=>{
        var yukiFloor = document.getElementsByClassName("yuki-floor");      
        var Height = window.screen.height;
        var nowHeight = document.body.scrollTop = document.documentElement.scrollTop;
        var floorList = document.getElementsByClassName("yuki-floor-list");
        var floorBox = document.getElementsByClassName("yuki-floor-box")[0];
        if(nowHeight+Height/2>yukiFloor[0].offsetTop){
            floorBox.style.display = "block";
        }else{
            floorBox.style.display = "none";
        }
        for(var i=0;i<yukiFloor.length;i++){
            if(nowHeight+Height/2>yukiFloor[i].offsetTop){
                for(var j=0;j<floorList.length;j++){
                   floorList[j].className = "yuki-floor-list";
                }
                addClass(floorList[i],"active");
            }
        }
    }
  },
  methods:{
      toTop:function(){
          document.body.scrollTop = document.documentElement.scrollTop = 0
      },
      toBlock:function(index){
          var floor = document.getElementsByClassName("yuki-floor")[index];
          var Height = window.screen.height;
          var top = floor.offsetTop;
          document.body.scrollTop = document.documentElement.scrollTop = top;
      }
  }
}
</script>

<style>
    .yuki-floor-box{
        width:84px;
        background:#e8e8e8;
        position:fixed;
        left:0;
        top:50%;
        display:none;
    }

    .yuki-floor-list>a{
        display:block;
        width:84px;
        height:24px;
        line-height:24px;
        font-size:12px;
        text-align:center;
        color:#333;
    }

    .yuki-floor-list:hover>a{
        background:#c1c1c1;
    }

    .yuki-floor-list.active>a{
        background:#c1c1c1;
    }
</style>
