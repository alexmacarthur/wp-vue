<template>
  <div id="app">

    <TopBar
      @showUpdater="showUpdater = true"
    />

    <div id="wrapper">

      <transition name="fade">
        <Updater
          v-if="showUpdater"
          @close="showUpdater = false"
        />
      </transition>

      <transition name="fade">
        <Loading
          v-if="loadingOn"
          :message="loadingMessage"
          :showWheel="loadingWheel"
        />
      </transition>

      <router-view :key="this.viewKey"></router-view>

    </div>

    <Foot />
  </div>
</template>

<script>
  import bus from './bus';
  import Foot from './components/Foot';
  import Loading from './components/Loading';
  import Updater from './components/Updater';
  import TopBar from './components/TopBar';

  export default {
    name: 'App',

    data () {
      return {
        loadingOn: true,
        loadingMessage: 'Loading WP Vue',
        loadingWheel: true,
        showUpdater: false,
        viewKey: 0
      }
    },

    created: function () {
      bus.$on('toggleLoading', (status = true) => {

        if(typeof status === 'string') {
          this.loadingOn = true;
          this.showWheel = false;
          this.loadingMessage = status;
          return;
        }

        this.loadingMessage = 'Loading...';
        this.loadingWheel = true;
        this.loadingOn = status;
      });

      bus.$on('bumpViewKey', (loadingMessage) => {
        bus.$emit('toggleLoading', loadingMessage);
        this.viewKey = this.viewKey + 1;
      });
    },

    components: {
      Foot,
      Loading,
      Updater,
      TopBar
    }
  }
</script>

<style lang="scss">
  @import "assets/scss/_base.scss";

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;

    @include media($small) {
      padding: 2rem;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
