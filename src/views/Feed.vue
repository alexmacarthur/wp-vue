<template>
  <div>

    <section>
      <p>
        WP Vue is a simple template built with Vue JS that displays posts from a WordPress REST API endpoint.
        Take what you see here &amp; rip it apart to suit your needs. To improve it for everyone else, <a href="https://www.github.com/alexmacarthur/wp-vue">contribute on Github</a>.
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
import ajax from '../mixins/ajax';
import Card from '../components/Card';
import Pagination from '../components/Pagination';

export default {
  name: 'Feed',

  mixins: [ajax],

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
        response = await this.get(
          `/posts?per_page=${POSTS_PER_PAGE}&page=${this.page}`
        );
        this.totalPages = response.headers['x-wp-totalpages'];
      } catch (error) {
        bus.$emit('showUpdater', 'Are you sure that\'s a valid endpoint?');
        bus.$emit('toggleLoading', false);
        return;
      }

      this.posts = await this.getFeaturedImages(response.data);

      this.getAdjacentPageData();

      bus.$emit('toggleLoading', false);
    },

    getAdjacentPageData: async function (prevPage = false) {

      let page = prevPage === true
              ? parseInt(this.page) - 1
              : parseInt(this.page) + 1;

      let response;

      if(page > 0) {
        try {
          response = await this.get(
            `/posts?per_page=${POSTS_PER_PAGE}&page=${page}`
          );
        } catch (error) {
          console.error(error);
        }

        response.data.forEach((post) => {
          if(post.featured_media <= 0) return;
          this.get(`/media/${post.featured_media}`);
        });
      }

      if(!prevPage) {
        this.getAdjacentPageData(true);
      }
    },

    getFeaturedImages: function (posts) {
      return new Promise((resolve) => {
        let requests = posts.map((post) => {
          return new Promise( async (resolve) => {
            let response;

            try {

              if(post.featured_media <= 0) {
                throw "No featured image.";
              }

              response = await this.get(
                `/media/${post.featured_media}`
              );
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

  ul {
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax( 320px, auto ) );
    grid-gap: 1rem;
  }
</style>

