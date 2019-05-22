<template>
  <ul class="list">
    <ScoreItem v-for="(score, index) in scores"
               :key="index"
               :score="score" />
  </ul>
</template>

<script>
import ScoreItem from './ScoreItem'
export default {
  components: { ScoreItem },
  props: ['scores'],
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
.list
  margin 30px auto
ul, li
  list-style none
ul
  border-top 1px solid #F1F1F1
li
  border-bottom 1px solid #F1F1F1
li:after
  content ''
  clear both
  display block
</style>
