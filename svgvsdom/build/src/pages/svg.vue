<template><div>

  <container-resize :min="1" :max="2500" :height="totalHeight" :interval="2000">


    <svg
      width="100%" height="100%"
      preserveAspectRatio="none"
      version="1.1" xmlns="http://www.w3.org/2000/svg"
    >
      <svg
        width="100%" height="100%"
        viewBox="0 0 365 120"
        preserveAspectRatio="none"
        version="1.1" xmlns="http://www.w3.org/2000/svg"
      >
        <!-- background color -->
        <rect x="0" width="365" y="0" height="120" style="fill: #ddd;"/>
        <!-- blue lane color -->
        <rect x="0" width="365" y="20" height="80" style="fill: #EEEEEE;"/>
        <!-- project block -->
        <rect :x="project.start" :width="project.duration" y="20" height="80" :fill="project.color"/>
      </svg>

      <svg
        width="100%" height="120"
        preserveAspectRatio="none"
        version="1.1" xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          :x="`${((project.start + (project.duration / 2)) / 365) * 100}%`"
          :y="20 + (80 / 2) - 0.5"
          rx="5"
          :width="labelWidth"
          :height="labelHeight"
          :transform="`translate(-${labelWidth / 2} -${labelHeight / 2})`"
          stroke-width="1"
          :stroke="project.color"
          fill="white"/>

        <text
          :x="`${((61 + (90 / 2)) / 365) * 100}%`"
          :y="20 + (80 / 2)"
          :width="labelWidth"
          :height="labelHeight"
          alignment-baseline="middle"
          text-anchor="middle"
          fill="#54595F"
          style="font-size: 11.75px; font-weight: bold; letter-spacing: -0.25px;"
          v-text="project.label"/>

      </svg>
    </svg>

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

</style>
