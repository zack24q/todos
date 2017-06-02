<template>
  <div class="bar">
    <div class="left">{{sumDone}} items left</div>
    <div class="fill"></div>
    <div class="filter">
      <span :class="filterClass(TYPE.all)" @click="$emit('changeFilter',TYPE.all)">All</span>
      <span :class="filterClass(TYPE.active)" @click="$emit('changeFilter',TYPE.active)">Active</span>
      <span :class="filterClass(TYPE.completed)" @click="$emit('changeFilter',TYPE.completed)">Completed</span>
    </div>
    <div class="fill"></div>
    <div class="right" @click="$emit('clearComputed')">Clear computed</div>
  </div>
</template>

<script>
  import TYPE from '../filterType'
  export default {
    name: 'Item',
    props: ['sumDone', 'filterType'],
    data () {
      return {
        TYPE
      }
    },
    methods: {
      filterClass (type) {
        return {
          'selected': this.filterType === type
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @require '../global.styl'

  .bar {
    display flex
    flex-wrap wrap
    padding 0 10px
    font-size 14px
    background-color #fff
    > div {
      line-height 40px
    }
    .fill {
      flex 1
    }
    .left, .right {
      width 110px
    }
    .right {
      text-align right
      cursor pointer
      &:hover {
        text-decoration underline
      }
    }
  }

  .filter {
    span {
      line-height 30px
      cursor pointer
      border $border
      border-color transparent
      border-radius 3px
      padding 2px 6px
      + span {
        margin-left 5px
      }
      &:hover {
        border-color lighten(#ffab99, 50%)
      }
      &.selected {
        border-color #ffab99
      }
    }
  }
</style>
