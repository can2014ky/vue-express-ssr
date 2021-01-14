<template>
  <div class="home">
    <div>首页</div>
    <div>{{ item }}</div>
    <div>
      <span @click="onChange">切换</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  asyncData ({ store, route }) {
    return store.dispatch('home/fetchItem', 'hello ssr')
  },
  computed: {
    item () {
      return this.$store.state.items
    }
  },
  methods: {
    onChange () {
      this.$store.dispatch('home/fetchItem', 'hello Vue and SSR')
    }
  }
}
</script>
