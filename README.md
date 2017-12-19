# WP Vue

This is just a simple Vue blog that displays posts from a WordPress REST API endpoint. Clone or fork this sucka & rip it apart to suit your own needs. If you have ideas to make it better for everyone else, contribute!

## Install

1. Make sure you have `yarn` installed on your machine, and run `yarn install`.
 
## Usage

### Set Your Constants
Set your specific constants in the `config.js` file.

* `REST_ENDPOINT` - The WordPress REST API endpoint from which data will be pulled. Leave off the trailing slash. Example: `https://blah-blah-blah.com/wp-json/wp/v2`
* `POSTS_PER_PAGE` - The default number of posts per page that will be displayed.
* `GA_TRACKING_ID` - A Google Analytics tracking ID.

### Spin Up Locally
Run `yarn run dev` to spin up a running version from localhost.

### Build for Production
Run `yarn run build`.

### Deploy to Netlify
Netlify is amazing, so if you're in need of somewhere to host your own version of this project, I highly recommend it. 

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/alexmacarthur/wp-vue)

## Contribute

Please do! See the [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT © [Alex MacArthur](https://macarthur.me)
