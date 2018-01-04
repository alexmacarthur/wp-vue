<template>
  <nav>

    <h1>
      <router-link
        :to="{
          name: 'home',
        }">
        WP Vue
      </router-link>
    </h1>

    <div>
      <p>
        Currently presenting content from <a :href="sourceURL">{{ splitEndpoint[2] }}</a>.
      </p>

      <button @click="showUpdater">
        Change Endpoint
      </button>
    </div>
  </nav>
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
  nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    margin-bottom: 1rem;
    background: rgba($gray--light, .9);
    padding: 1rem 2rem;
    border-bottom: 2px solid darken($gray--light, 5%);

    @include media($small) {
      flex-direction: row;
    }
  }

  div {
    display: flex;
    align-items: center;
    flex-direction: column;

    @include media($mobile) {
      flex-direction: row;
    }
  }

  button {
    @include media($mobile) {
      margin: 0 0 0 1rem;
    }
  }

  h1 {
    margin: 0;
  }

  a {
    font-weight: bold;
  }

  p {
    text-align: center;
    margin: .5rem 0 1rem;

    @include media($mobile) {
      margin: 0;
      text-align: right;
    }
  }
</style>

