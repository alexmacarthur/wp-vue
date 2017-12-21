export default {
  namespaced: true,

  state: {
    requests: {}
  },

  mutations: {
    saveRequest (state, payload) {

      //-- If the request max has been hit, remove the first one.
      if(Object.keys(state.requests).length >= REQUEST_CACHE_MAX) {
        delete state.requests[Object.keys(state.requests)[0]];
      }

      state.requests[payload.path] = payload.data;
    },

    wipe (state) {
      state.requests = {};
    }
  }
}
