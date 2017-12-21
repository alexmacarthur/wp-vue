<template>
  <div>
    <button @click="showUpdater">
      Change Endpoint
    </button>

    <p>
      Currently presenting content from <a :href="sourceURL">{{ splitEndpoint[2] }}</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'TopBar',

  data () {
    return {}
  },

  computed: {
    splitEndpoint: function () {
      return this.$store.state.endpoint.split('/')
    },

    sourceURL: function () {
      return this.splitEndpoint[0] + this.splitEndpoint[1] + this.splitEndpoint[2];
    }
  },

  methods: {
    showUpdater: function () {
      this.$emit('showUpdater');
    }
  }
}

</script>

<style scoped lang="scss">
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    margin-bottom: 1rem;
    background: rgba($gray--light, .9);
    padding: 1rem 2rem;
    border-bottom: 2px solid darken($gray--light, 5%);

    @include media($mobile) {
      flex-direction: row;
    }
  }

  button {
    margin-bottom: 1rem;

    @include media($mobile) {
      margin: 0 1rem 0 0;
    }
  }

  a {
    font-weight: bold;
  }

  p {
    margin: 0;
  }
</style>

