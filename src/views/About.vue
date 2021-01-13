<template>
  <div class="about">关于
    <div>{{book.name}}</div>
  </div>
</template>

<script>
export default {
  asyncData ({ store, route }) {
    return store.dispatch('about/fetchItem', route.params.id || 1)
  },
  computed: {
    book () {
      return this.$store.state.about.items[this.$route.params.id || 1]
    }
  },
  mounted () {
    this.fetchBookItem()
  },
  methods: {
    fetchBookItem () {
      return this.$store.dispatch('about/fetchItem', this.$route.params.id || 1)
    }
  }
}
</script>
