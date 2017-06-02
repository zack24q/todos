<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  // todo 2.单文件组件
  export default {
    name: 'app'
  }
</script>

<style lang="stylus">
  @require './global.styl'

  * {
    box-sizing border-box
  }

  html, body, #app {
    margin 0
    height 100%
  }

  #app {
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    background-color #f5f5f5
    overflow auto
    color $black
  }
</style>
