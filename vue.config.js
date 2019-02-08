const webpack = require('webpack');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

const CONSTANTS = {
  REST_ENDPOINT: JSON.stringify('https://wptavern.com/wp-json/wp/v2'),
  POSTS_PER_PAGE: JSON.stringify(9),
  GA_TRACKING_ID: JSON.stringify(isProd ? 'UA-111438908-1' : 'XXX'),
  REQUEST_CACHE_MAX: JSON.stringify(150)
};

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/assets/scss/_variables.scss'),
        path.resolve(__dirname, './src/assets/scss/_mixins.scss')
      ]
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin(CONSTANTS),
    ]
  }
}
