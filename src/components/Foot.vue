<template>
  <footer>
    Made by <a href="https://macarthur.me">Alex MacArthur</a>
    //
    See <a href="https://www.github.com/alexmacarthur/wp-vue">WP Vue on Github</a>.
  </footer>
</template>

<script>
  export default {
    name: 'Foot'
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/_mixins.scss";
  @import "../assets/scss/_variables.scss";

  footer {
    text-align: center;
    padding: 1rem;
    background: $gray--light;
  }

  a {
    font-weight: bold;
  }
</style>
