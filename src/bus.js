import Vue from 'vue';

/**
 * A pretty barren Vue component resonsible for holding the endpoint
 * as well as carrying events between components.
 */
export default new Vue({
  data() {
    return {
      REST_ENDPOINT
    }
  },

  methods: {
    updateEndpoint: function(endpoint) {
      this.REST_ENDPOINT = endpoint;
      this.$emit('clearErrors');
      this.$emit('bumpViewKey', 'Updating content...');
    }
  }
});
