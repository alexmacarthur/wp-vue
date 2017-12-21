import Axios from 'axios';

export default {

  methods: {

    /**
     * Get response from memory, if it exists. Otherwise, AJAX.
     *
     * @param  {string} path The endpoint
     * @return {Promise}
     */
    get: function (path) {
      return new Promise(async (resolve, reject) => {

        if(this.$store.state.cache.requests[path] !== undefined) {
          resolve(this.$store.state.cache.requests[path]);
        }

        try {
          let response = await Axios.get(this.$store.state.endpoint + path);

          this.$store.commit('cache/saveRequest', {
            path,
            data: response
          });

          //-- Generate mock requests for later use on individual posts.
          //-- Mimics structure of response if it were authentic.
          if(path.startsWith('/posts') && !path.includes('slug')) {
            response.data.forEach(post => {
              this.$store.commit('cache/saveRequest', {
                path: `/posts?slug=${post.slug}`,
                data: {
                  data: [post]
                }
              });
            });
          }

          resolve(response);

        } catch (error) {
          reject(error);
        }
      });
    }
  }
}
