export default {
  data() {
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
    };
  },

  methods: {
    getFormattedDate: function(time) {
      let date = new Date(time);
      return `${
        this.months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;
    },

    goBack: function() {
      this.$router.go(-1);
    },

    getQueryString: function(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    }
  }
};
