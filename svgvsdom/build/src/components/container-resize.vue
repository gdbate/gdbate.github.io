<template><div>
  <div>
    <div class="container-resize" :style="styleContainerResize">
      <slot/>
    </div>
  </div>
  <div style="padding: 10px;"><b>Container Width:</b> {{ width }}</div>
  <div style="padding: 10px;"><b>Interval:</b> {{ interval }}</div>
</div></template>

<script>

// Dependencies ===============

// Core =======================

const component = {
  props: {
    height: { type: Number, default: 500 },
    interval: { type: Number, default: 2500 },
    min: { type: Number, default: 1 },
    max: { type: Number, default: 2500 },
  },
  data: () => ({
    width: 500,
    intervalTimer: null,
  }),
  computed: {
    styleContainerResize() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        transition: `width ${this.interval}ms`,
      };
    },
  },
  watch: {
    interval: {
      handler: 'setIntervalTimer',
      immediate: true,
    },
  },
  methods: {
    setIntervalTimer() {
      clearInterval(this.intervalTimer);
      this.intervalTimer = setInterval(() => {
        this.width = Math.round(Math.random() * (this.max - this.min)) + this.min;
      }, this.interval);
    },
  },
  components: {
  },
  created() {
  },
};

// Export =====================

export default component;

</script>

<style scoped>

.container-resize{
  position: relative;
  transition-timing-function: ease;
  position: relative;
  outline: 1px dotted #aaa;
  overflow: hidden;
}

.container-resize>*{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

</style>
