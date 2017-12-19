<template>
  <div>

    <section>
      <h1>WP Vue</h1>

      <p>
        A simple Vue template that displays posts from a WordPress REST API endpoint.
        Take what you see here &amp; rip it apart as needed. To improve the base for everyone else, <a href="https://www.github.com/alexmacarthur/wp-vue">contribute on Github</a>.
      </p>
    </section>

    <ul>
      <Card
        v-for="post in posts"
        :post="post"
        :key="post.id"
      />
    </ul>

    <Pagination
      :currentPage="parseInt(page)"
      :totalPages="parseInt(totalPages)"
    ></Pagination>

  </div>
</template>

<script>
import bus from '../bus';
import Axios from 'axios';
import Card from '../components/Card';
import Pagination from '../components/Pagination';

export default {
  name: 'Feed',

  data () {
    return {
      posts: [],
      page: 1,
      totalPages: null
    }
  },

  mounted: function () {
    this.getPosts();
  },

  created: function () {
    if(this.$route.name === 'page') {
      this.page = this.$route.params.page;
    }
  },

  methods: {
    getPosts: async function () {
      let response;

      try {
        response = await Axios.get(`${bus.REST_ENDPOINT}/posts?per_page=${POSTS_PER_PAGE}&page=${this.page}`);
        this.totalPages = response.headers['x-wp-totalpages'];
      } catch (error) {
        bus.$emit('showUpdater', 'Are you sure that\'s a valid endpoint?');
        bus.$emit('toggleLoading', false);
        return;
      }

      this.posts = await this.getFeaturedImages(response.data);

      bus.$emit('toggleLoading', false);
    },

    getFeaturedImages: function (posts) {
      return new Promise((resolve) => {
        let requests = posts.map((post) => {
          return new Promise( async (resolve) => {
            let response;

            try {
              response = await Axios.get(`${bus.REST_ENDPOINT}/media/${post.featured_media}`);
              post.featured_image = response.data.media_details.sizes['medium'].source_url;
            } catch (error) {
              post.featured_image = null;
            }

            resolve(post);
          });
        });

        Promise.all(requests).then((posts) => resolve(posts));
      });
    }
  },

  components: {
    Card,
    Pagination
  }
}

</script>

<style scoped lang="scss">

  section {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 3rem;
  }

  h1 {
    font-weight: bold;
    margin: .5rem 0;
  }

  ul {
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax( 320px, auto ) );
    grid-gap: 1rem;
  }
</style>

