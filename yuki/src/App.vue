<template>
  <div id="app">
    <yuki-header></yuki-header>
    <router-view v-if="!$route.meta.keepAlive"/>
    <yuki-footer></yuki-footer>
  </div>
</template>

<script>
import yukiHeader from '@/components/header'
import yukiFooter from '@/components/footer'
export default {
  name: 'App',
  components:{
    yukiHeader,
    yukiFooter
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
