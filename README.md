# WP Vue

[![Build Status](https://travis-ci.org/alexmacarthur/wp-vue.svg?branch=master)](https://travis-ci.org/alexmacarthur/wp-vue) [![Netlify Status](https://api.netlify.com/api/v1/badges/87ff7587-b7b2-4828-965c-97e606b81013/deploy-status)](https://app.netlify.com/sites/wp/deploys)

This is just a simple Vue application (scaffolded using the [Vue CLI](https://cli.vuejs.org/)) that pulls posts from a WordPress REST API endpoint. Clone or fork this sucka & rip it apart to suit your own needs. If you have ideas to make it better for everyone else, contribute!

## Install

In the root of the project, run `npm install`.

## Usage

### Set Your Constants

Set your specific constants in the `vue.config.js` file.

- `REST_ENDPOINT` - The WordPress REST API endpoint from which data will be pulled. Leave off the trailing slash. Example: `https://blah-blah-blah.com/wp-json/wp/v2`
- `POSTS_PER_PAGE` - The default number of posts per page that will be displayed.
- `GA_TRACKING_ID` - A Google Analytics tracking ID.
- `REQUEST_CACHE_MAX` - The maximum number of AJAX requests that will be cached in memory.

### Spin Up Locally

Run `npm run serve` to spin up a running version from localhost.

### Build for Production

Run `npm run build`.

### Deploy to Netlify

Netlify is amazing, so if you're in need of somewhere to host your own version of this project, I highly recommend it.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/alexmacarthur/wp-vue)

## Caching

Out of the box, WP Vue will locally cache AJAX requests in memory, and then load them as needed. This first happens on page load, when all queried posts on the current and adjacent pages are cached for quick access later.

To keep things from getting out of control, a maximum request cache value is set. Once your cache reaches this max (regardless of how large each request is), the first request in memory will deleted as a new one is added. So, you shouldn't have to worry too much about an insane amount of data being locally stored as you move through posts.

Manually reloading the page will kill this cache. It will not persist.

## Set Endpoint via URL Parameter

If you'd like to share link to a version of WP Vue that uses a different endpoint than what's set via the code, you can pass that endpoint in as a URL parameter:

Example: `https://wp.netlify.com?endpoint=https://css-tricks.com/wp-json/wp/v2`

Instead of using the default, this will use whatever endpoint you provide in the URL.

## Contribute

Please do! See the <CONTRIBUTING.md> for details.

## License

MIT © [Alex MacArthur](https://macarthur.me)
