<template>
  <div>
    <form @submit.prevent="submit">
      <h2>Endpoint</h2>
      <p>Enter a valid WordPress REST endpoint.</p>
      <input v-model="updatedEndpoint" type="text">
      <span v-if="error">{{ error }}</span>
      <input type="submit" value="Save" />
    </form>
    <a
      v-if="!error"
      @click="close">Nevermind.</a>
  </div>
</template>

<script>
import bus from '../bus';

export default {
  name: 'Updater',

  props: {
    error: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      updatedEndpoint: ''
    }
  },

  computed: {
    endpoint: function () {
      return bus.REST_ENDPOINT;
    }
  },

  created: function () {
    this.updatedEndpoint = this.endpoint;
  },

  methods: {
    close: function () {
      this.$emit('close');
    },

    submit: function () {

      this.$ga.event({
        eventCategory: 'form',
        eventAction: 'updateEndpoint',
        eventLabel: `Update to ${this.updatedEndpoint}`
      });

      bus.updateEndpoint(this.updatedEndpoint);
      this.$router.push('/posts');
      this.$emit('close');
    }
  }
}

</script>

<style scoped lang="scss">
  div {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: rgba($white, .99);
    z-index: 1;
  }

  form {
    text-align: center;
    width: 350px;
    max-width: calc(100% - 2rem);
  }

  a {
    color: $gray--medium;

    &:hover {
      color: $gray;
    }
  }

  span {
    color: $salmon;
    display: inline-block;
    margin-bottom: 1rem;
  }
</style>

