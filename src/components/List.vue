<template>
  <div class="todo-list">
    <h1 class="title">Todos</h1>
    <div class="content">
      <div class="input-box">
        <div class="checkbox" @click="toggleAll">
          <span class="arrow" :class="{'enable':allDone}">❯</span>
        </div>
        <input type="text" placeholder="What needs to be done?" v-model.trim="inputContent"
               @keyup.enter="addItem(inputContent)">
      </div>
      <div>
        <item v-for="(item, i) in filterList" :key="item" :value="item"
              @toggle="toggleItem(item)" @delete="deleteItem(item)"></item>
      </div>
      <bar :sumDone="sumDone" :filterType="filterType" @changeFilter="changeFilter"
           @clearComputed="clearComputed"></bar>
    </div>
  </div>
</template>

<script>
  import TYPE from '../filterType'
  import Item from '../components/Item.vue'
  import Bar from '../components/bar.vue'
  export default {
    name: 'List',
    components: {Item, Bar},
    data () {
      let storage = localStorage.getItem('todolist')
      return {
        TYPE,
        inputContent: '',
        filterType: TYPE.all,
        list: storage && JSON.parse(storage) || []
      }
    },
    watch: {
      list: {
        deep: true,
        handler (val) {
          console.log('localStorage.setItem')
          localStorage.setItem('todolist', JSON.stringify(val))
        }
      }
    },
    computed: {
      filterList () {
        switch (this.filterType) {
          case TYPE.all:
            return this.list
          case TYPE.active:
            return this.list.filter(item => !item.done)
          case TYPE.completed:
            return this.list.filter(item => item.done)
        }
      },
      allDone () {
        let flag = true
        for (let item of this.list) {
          if (!item.done) {
            flag = false
            break
          }
        }
        return flag
      },
      sumDone () {
        let count = 0
        for (let item of this.list) {
          if (!item.done) {
            count++
          }
        }
        return count
      }
    },
    methods: {
      addItem (content) {
        if (content === '') return
        this.list.push({content, done: false})
        this.inputContent = ''
      },
      toggleItem (item) {
        item.done = !item.done
      },
      deleteItem (item) {
        let i = this.list.findIndex(temp => temp === item)
        this.list.splice(i, 1)
      },
      toggleAll () {
        let temp = !this.allDone
        for (let item of this.list) {
          item.done = temp
        }
      },
      clearComputed () {
        for (let item of this.list.filter(item => item.done)) {
          this.deleteItem(item)
        }
      },
      changeFilter (type) {
        this.filterType = type
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @require '../global.styl'

  .todo-list {
    width 80%
    margin auto
    padding-bottom 50px
  }

  .title {
    margin 0
    line-height 80px
    text-align center
  }

  .content {
    box-shadow 0 1px 2px 0 #505050
  }

  .input-box {
    $rowStyle()
    input {
      border none
      display block
      width 100%
      font-size 20px
      outline none
      line-height 30px
    }
    .arrow {
      position absolute
      left 6px
      top: -9px
      line-height 1
      transform: rotate(90deg)
      z-index 1
      color $grey
    }

    .arrow.enable {
      color inherit
    }
  }
</style>
