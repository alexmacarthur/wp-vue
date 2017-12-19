<template>
  <div v-html="content"></div>
</template>

<script>
export default {
  name: 'PostBody',

  props: {
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/_core-alignment-classes.scss';

  img {
    height: auto;
  }
</style>
