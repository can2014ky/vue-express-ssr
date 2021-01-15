<template>
  <div class="home">
    <div>首页</div>
    <div>{{ item }} {{ name }}</div>
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
  metaInfo: {
    title: 'Home',
    meta: [{
      name: 'keyWords',
      content: 'My Example App'
    }],
    link: [{
      rel: 'asstes',
      href: 'https://assets-cdn.github.com/'
    }]
  },
  data () {
    return {
      name: '哈哈哈~'
    }
  },
  computed: {
    item () {
      return this.$store.state.items
    }
  },
  mounted () {
    this.name = 'hehehe~'
  },
  methods: {
    onChange () {
      this.$store.dispatch('home/fetchItem', 'hello Vue and SSR')
    }
  }
}
</script>
