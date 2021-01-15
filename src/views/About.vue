<template>
  <div class="about">关于
    <div>{{book.name}}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  asyncData ({ store, route }) {
    return store.dispatch('about/fetchItem', route.params.id || 1)
  },
  metaInfo () {
    return {
      title: this.title
    }
  },
  data () {
    return {
      title: 'about'
    }
  },
  computed: {
    book () {
      return this.$store.state.about.items[this.$route.params.id || 1]
    }
  },
  created () {
    axios.get('/js/test.json').then((res) => {
      this.title = res.data.title
    })
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
