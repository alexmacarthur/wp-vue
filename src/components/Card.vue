<template>
  <li>
    <router-link
      v-if="post.featured_image"
      :to="{ name: 'post', params: { slug: post.slug } }">
      <img :src="post.featured_image" alt="Blog Post Featured Image"/>
    </router-link>
    <span>
      <i>&mdash;</i>
        {{ getFormattedDate(post.date) }}
      <i>&mdash;</i>
    </span>
    <h3>
      <router-link
        :to="{
          name: 'post',
          params: {
            slug: post.slug
          }
        }"
        v-html="post.title.rendered">
      </router-link>
    </h3>
  </li>
</template>

<script>
export default {
  name: 'Card',

  props: {
    post: {
      type: Object
    }
  }
}

</script>

<style scoped lang="scss">
  li {
    display: flex;
    flex-direction: column;
    background: $gray--light;
    border: 2px solid darken($gray--light, 5%);
    padding: 2rem 1rem;
    text-align: center;

    a {
      display: block;
    }
  }

  img {
    transition: box-shadow .15s ease-in-out;
    box-shadow: 0 0 0 2px $gray--light;

    &:hover {
      box-shadow: 0 0 0 3px $gray--light;
    }
  }

  span {
    font-size: $small-font-size;
    color: $gray--medium;
    margin: 1rem 0 .5rem;
  }

  h3 {
    margin: 0 .25rem 0 1rem;

    a {
      color: inherit;

      &:hover {
        color: $salmon;
      }

      &:focus {
        outline: none;
      }
    }
  }
</style>

