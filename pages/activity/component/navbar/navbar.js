import grace from "../../../../lib/js/grace/grace.js"

grace.component({
  properties: {
    tags: {
      type: Array,
      value: ["推荐"]
    },
    tagOn: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal) {
        if (newVal != -1) {
          this.triggerEvent("tagTaped", {});
        } else if (newVal == oldVal) {
          var tmp = this.$data.tagOn;
          this.$data.tagOn = -1;
          this.$data.tagOn = newVal;
        }
      }
    }
  },
  ready: function() {
    var tmp = this.$data.tagOn;
    this.$data.tagOn = -1;
    this.$data.tagOn = tmp;
  },
  methods: {
    _navbarTagTaped: function(e) {      
      this.$data.tagOn = e.currentTarget.dataset.tagOn;
    }
  }
})