<template><div>

  <container-resize :min="1" :max="2500" :height="totalHeight" :interval="2000">

    <div class="lanes"><div class="lane">
      <div
        class="project"
        :style="`
          left: ${(project.start / 365) * 100}%;
          width: ${(project.duration / 365) * 100}%;
          background-color: ${project.color}
        `">
        <div
          class="label"
          v-text="project.label"
          :style="`
            width: ${labelWidth}px;
            height: ${labelHeight}px;
            line-height: ${labelHeight}px;
            font-size: 11.75px;
            font-weight: bold;
            letter-spacing: -0.25px;
            border-color: ${project.color};
          `"/>
       </div>
    </div></div>

  </container-resize>

</div></template>

<script>

// Dependencies ===============

import containerResize from '@/components/container-resize.vue';

// Core =======================

const component = {
  data: () => ({
    days: 365,
    laneHeight: 80,
    laneMargin: 20,
    labelWidth: 22,
    labelHeight: 15,
    project: {
      start: 61, // March 1st
      duration: 90, // May 31st
      color: '#9C27B0',
      label: 'LG',
    },
  }),
  computed: {
    totalHeight() {
      return this.laneMargin * 2 + this.laneHeight;
    },
  },
  methods: {
  },
  components: {
    containerResize,
  },
  created() {
  },
};

// Export =====================

export default component;

</script>

<style scoped>

div.lanes {
  background-color: #ddd;
  width: 100%;
}

div.lane {
  background-color: #EEEEEE;
  width: 100%;
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  bottom: 20px;
}

div.project {
  background-color: black;
  position: absolute;
  top: 0px;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

div.project>div.label {
  border: 1px solid black;
  background-color: white;
  color: #54595f;
  border-radius: 5px;
  border: 1px solid #54595f;
  z-index: 72;
  text-align: center;
}

</style>
