<template>
  <div>

    <article>

      <a @click="goBack">Back to All Posts</a>

      <header>
        <img
          v-if="featured_image"
          :src="featured_image"
        >
        <h1 v-html="title"></h1>
      </header>

      <PostBody :content="content"></PostBody>

    </article>

  </div>
</template>

<script>
  import bus from '../bus';
  import utils from '../mixins/utils';
  import ajax from '../mixins/ajax';
  import PostBody from '../components/PostBody';

  export default {
    name: 'Post',

    mixins: [utils, ajax],

    data () {
      return {
        post: {},
        title: '',
        content: '',
        featured_image: ''
      }
    },

    created: async function () {
      this.post = await this.setPost();
      this.title = this.post.title.rendered;
      this.content = this.post.content.rendered;
      this.featured_image = await this.getFeaturedImage(this.post.featured_media);

      bus.$emit('toggleLoading', false);
    },

    methods: {
      setPost: function () {
        return new Promise(async (resolve, reject) => {
          let response;

          try {
            response = await this.get(`/posts?slug=${this.$route.params.slug}`);
          } catch (error) {
            this.$router.push({name: 'four-o-four'});
            return;
          }

          resolve(response.data[0]);

        });
      },

      getFeaturedImage: async function (id) {
        let response;
        try {

          if(post.featured_media <= 0) {
            throw "No featured image.";
          }

          response = await this.get(`/media/${id}`);
        } catch (error) {
          return null;
        }

        return response.data.media_details.sizes['medium'].source_url;
      }
    },

    components: {
      PostBody
    }
  }
</script>

<style scoped lang="scss">
  article {
    max-width: 900px;
    margin: 0 auto;
    background: $gray--light;
    border: 2px solid darken($gray--light, 5%);
    padding: 1rem;

    @include media($small) {
      padding: 3rem;
    }
  }

  header {
    text-align: center;
  }

  h1 {
    margin: 2rem 0;
  }

  a {
    display: block;
    margin-bottom: 1rem;
  }
</style>
