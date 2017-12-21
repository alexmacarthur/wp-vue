export default {

  data () {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    }
  },

  methods: {
    getFormattedDate: function (time) {
      let date = new Date(time);
      return `${this.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    },

    goBack: function() {
      this.$router.go(-1);
    },

    getQueryString: function( name ) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      let results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
  }
}
