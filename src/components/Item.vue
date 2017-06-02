<template>
  <div class="item" :class="{'done':value.done}">
    <div class="checkbox" @click="$emit('toggle')">
      <!--todo 8.条件渲染-->
      <span v-if="value.done">✓</span>
    </div>
    {{value.content}}
    <!--todo 7.子组件向父组件通讯-->
    <div class="delete" @click="$emit('delete')">X</div>
  </div>
</template>

<script>
  export default {
    name: 'Item',
    props: ['value']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @require '../global.styl'

  .item {
    $rowStyle()
    word-break break-word
    + .item {
      border-top none
    }
    &.done {
      text-decoration line-through
      color $grey
      .checkbox {
        border-color #53cd7e
        span {
          color #53cd7e
        }
      }
    }
    &:hover {
      .delete {
        display block
      }
    }
  }

  .checkbox {
    transform translate(0, -50%)
    width 26px
    height 26px
    border $border
    border-color #808080
    border-radius 50%
    span {
      position absolute
      left 4px
      top: 3px
      line-height 1
      color $black
    }
  }

  .delete {
    display none
    padding 0 10px
    position absolute
    cursor pointer
    right 0
    top: 50%
    transform translate(0, -50%)
    color #ff6261
  }
</style>
