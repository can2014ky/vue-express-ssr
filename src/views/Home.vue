<template>
  <div class="home">
    <div>首页</div>
    <div>{{ item }}</div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  asyncData ({ store, route }) {
    return store.dispatch('fetchItem', 'hello ssr')
  },
  computed: {
    item () {
      return this.$store.state.items
    }
  }
}
</script>
