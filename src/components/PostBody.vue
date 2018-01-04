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

  .wp-block-embed {
    margin: 2rem 0;
  }

  .embed-youtube,
  .embed-wrap {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 25px;
    height: 0;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
