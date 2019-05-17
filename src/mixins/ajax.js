export default {
  methods: {
    /**
     * Get response from memory, if it exists. Otherwise, AJAX.
     *
     * @param  {string} path The endpoint
     * @return {Promise}
     */
    get: function(path) {
      return new Promise(async (resolve, reject) => {
        let response, data;

        if (this.$store.state.cache.requests[path] !== undefined) {
          return resolve(this.$store.state.cache.requests[path]);
        }

        try {
          response = await fetch(this.$store.state.endpoint + path, {
            method: "GET"
          });

          data = {
            data: await response.json(),
            headers: {
              "x-wp-total": response.headers.get("x-wp-total"),
              "x-wp-totalpages": response.headers.get("x-wp-totalpages")
            }
          };
        } catch (error) {
          return reject(error);
        }

        this.$store.commit("cache/saveRequest", {
          path,
          data: data
        });

        //-- Generate mock requests for later use on individual posts.
        //-- Mimics structure of response if it were authentic.
        if (path.startsWith("/posts") && !path.includes("slug")) {
          data.data.forEach(post => {
            this.$store.commit("cache/saveRequest", {
              path: `/posts?slug=${post.slug}`,
              data: {
                data: [post]
              }
            });
          });
        }

        return resolve(data);
      });
    }
  }
};
