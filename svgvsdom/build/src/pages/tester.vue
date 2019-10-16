<template><div>

  <div id="option-bar">
    <div id="options">
      <div class="section"><div>
        <div class="title pa-1">Render Method</div>
        <div class="pa-1">
          <v-radio-group v-model="render" hide-details class="mt-0">
            <v-radio label="SVG" value="svg"></v-radio>
            <v-radio label="HTML" value="dom"></v-radio>
          </v-radio-group>
        </div>
      </div></div>
      <div class="section"><div>
        <div class="title pa-1">Timeline</div>
        <div class="pa-1">
          <v-slider v-model="lanes" :min="1" :max="25" label="Lanes" hide-details></v-slider>
          <v-slider v-model="years" :min="1" :max="10" label="Years" hide-details></v-slider>
        </div>
      </div></div>
      <div class="section"><div>
        <div class="title pa-1">Project Density</div>
        <div class="pa-1">
          <v-range-slider v-model="projectGap" :min="1" :max="300" label="Gap Between" hide-details></v-range-slider>
          <v-range-slider v-model="projectDuration" :min="1" :max="300" label="Duration" hide-details></v-range-slider>
        </div>
      </div></div>
      <div class="section"><div>
        <div class="title pa-1">Lane Sizing</div>
        <div class="pa-1">
          <v-slider v-model="laneHeight" :min="10" :max="150" label="Lane Height" hide-details></v-slider>
          <v-slider v-model="laneMargin" :min="0" :max="50" label="Lane Margin" hide-details></v-slider>
        </div>
      </div></div>
      <div class="section"><div>
        <div class="title pa-1">Width Sizing</div>
        <div class="pa-1">
          <v-range-slider v-model="widthSizing" :min="1" :max="20000" label="Width Range" hide-details></v-range-slider>
          <v-slider v-model="interval" :min="250" :max="10000" label="Interval" hide-details></v-slider>
        </div>
      </div></div>
    </div>
    <div id="projects">
      <container-resize :min="widthSizing[0]" :max="widthSizing[1]" :height="totalHeight" :interval="interval">

<!-- SVG Method -->
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          v-if="render === 'svg'"
        >
          <defs>
            <svg:style>
              rect.lane {
                fill: #E1F5FE;
              }
              rect.label {
                stroke-width: 1;
                fill: #fff;
                color: #54595F;
              }
            </svg:style>
          </defs>

          <!-- ViewBox Placement -->
          <svg
            :viewBox="`0 0 ${days} ${(lanes * (laneHeight + laneMargin)) + laneMargin}`"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            >
              <!-- add grey lanes -->
              <template v-for="i in lanes">
                <rect :key="`lane-${i}`" class="lane" x="0" :y="laneY[i - 1]" width="100%" :height="laneHeight"/>
              </template>
              <!-- placing project rectangles viewbox coordinates -->
              <template v-for="(project, p) of projects">
                <rect :key="`project-${p}-box`" class="project" :x="project.start" :y="laneY[project.lane]" :width="project.duration" :height="laneHeight" :style="`fill: ${project.color}`" @click="onclick('rect')"/>
              </template>
          </svg>
          <!-- Percentage Placement -->
          <template v-for="(project, p) of projects">
            <!-- Label Outline -->
            <rect
              :key="`project-${p}-label-box`"
              class="label"
              :x="`${(project.startPercent + (project.durationPercent / 2)) * 100}%`"
              :y="`${(laneYPercent[project.lane] + ((laneHeight / 2) / totalHeight)) * 100}%`"
              :width="project.labelWidth"
              :height="labelHeight"
              rx="5"
              :transform="`translate(-${project.labelWidth / 2} -${labelHeight / 2 + .5})`"
              :style="`stroke: ${project.color}; width: ${project.labelWidth}px;`"
              @click="onclick('label box')"/>
            <!-- Label Text -->
            <text
            :key="`project-${p}-label-text`"
              :x="`${(project.startPercent + (project.durationPercent / 2)) * 100}%`"
              :y="`${(laneYPercent[project.lane] + ((laneHeight / 2) / totalHeight)) * 100}%`"
              :width="project.labelWidth"
              :height="labelHeight"
              transform="translate(0 4)"
              text-anchor="middle"
              fill="#54595F"
              :style="`font-size: 11.75px; font-weight: bold; letter-spacing: -0.25px;`"
              v-text="project.label"/>
          </template>
        </svg>

<!-- DOM Method -->

        <div id="lanes" v-if="render == 'dom'">
          <!-- add grey lanes -->
          <template v-for="i in lanes">
            <div :key="`dom-lane-${i}`" class="lane" :style="{top: `${laneY[i - 1]}px`, height: `${laneHeight}px`}"/>
          </template>
          <!-- add projects -->
          <template v-for="(project, p) of projects">
            <div
              :key="`dom-${p}-project`"
              class="project"
              :style="{left: `${(project.start / days) * 100}%`, width: `${(project.duration / days) * 100}%`, top: `${laneY[project.lane]}px`, height: `${laneHeight}px`, backgroundColor: project.color}"
              @click="onclick('rect')">
              <div class="label" v-text="project.label" :style="`width: ${project.labelWidth}px; height: ${labelHeight}px; line-height: ${labelHeight}px; font-size: 11.75px; font-weight: bold; letter-spacing: -0.25px; border-color: ${project.color};`"/>
            </div>
          </template>
        </div>

      </container-resize>
      <div style="padding: 10px;"><b>Total Projects:</b> {{ projects.length }}</div>
      <div class="code" v-if="false">
        <b>generated projects:</b> {{ projects }}
      </div>

    </div>
  </div>


</div></template>

<script>

// Dependencies ===============

import containerResize from '@/components/container-resize.vue';

// Core =======================

const component = {
  data: () => ({
    activeProject: 4,
    colors: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#00BCD4', '#4CAF50', '#CDDC39', '#FFC107', '#FF9800', '#FF9800', '#795548', '#607D8B'],
    labels: ['TI', 'XS', 'SM', 'MD', 'LG', 'XL', 'HU', 'MA'],
    labelHeight: 15,
    lanes: 5,
    years: 1,
    render: 'svg',
    projectGap: [10, 30],
    projectDuration: [5, 35],
    laneHeight: 80,
    laneMargin: 20,
    interval: 1000,
    widthSizing: [400, 1600],
  }),
  computed: {
    days() {
      return this.years * 365;
    },
    // generate a lot of projects
    projects() {
      const projects = [];
      // min and max values
      // running values
      let id = 1;
      let lane = 0;
      let lastDay = Math.round(Math.random() * this.projectGap[0]);
      while (lane < this.lanes) {
        // calculate project settings
        const gap = Math.round(Math.random() * (this.projectGap[1] - this.projectGap[0])) + this.projectGap[0];
        const duration = Math.round(Math.random() * (this.projectDuration[1] - this.projectDuration[0])) + this.projectDuration[0];
        // add project
        projects.push({
          id,
          lane,
          start: lastDay,
          startPercent: lastDay / this.days,
          duration,
          durationPercent: duration / this.days,
          label: this.labels[Math.round((this.labels.length - 1) * Math.random())],
          color: this.colors[Math.round((this.colors.length - 1) * Math.random())],
          labelWidth: 22,
        });
        id += 1;
        // progress down the lane
        lastDay += (gap + duration);
        // move to next lane if current full
        if (lastDay >= this.days) {
          lane += 1;
          lastDay = Math.round(Math.random() * this.projectGap[0]);
        }
      }
      return projects;
    },
    // total height of the SVG image
    totalHeight() {
      return (this.lanes * (this.laneHeight + this.laneMargin)) + this.laneMargin;
    },
    // define the Y positioning for each lane
    laneY() {
      const laneY = [];
      for (let l = 0; l < this.lanes; l += 1) laneY.push(l * (this.laneHeight + this.laneMargin) + this.laneMargin);
      return laneY;
    },
    // define the Y positioning for each lane in percentage
    laneYPercent() {
      const laneY = [];
      for (let l = 0; l < this.lanes; l += 1) laneY.push((l * (this.laneHeight + this.laneMargin) + this.laneMargin) / this.totalHeight);
      return laneY;
    },
  },
  methods: {
    onclick(from) {
      alert(`Project Clicked From ${from}`);
    },
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

#option-bar {
  overflow-x: scroll;
  display: flex;
}

#option-bar>#options {
  background-color: #eee;
  border-right: 1px solid #aaa;
  width: 320px;
  padding: 5px;
}

#option-bar .section {
  background-color: #fafafa;
  border: 1px outset;
  width: 300px;
  margin: 5px;
}
#option-bar .section>div {
  padding: 5px;
}
#option-bar .title {
}


<style scoped>

div#lanes {
  overflow: hidden;
}

div.lane {
  background-color: #E1F5FE;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
}

div.project {
  background-color: black;
  position: absolute;
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

div.code {
  max-height: 150px;
  overflow-y: auto;
  background: #f4f4f4;
  border: 1px solid #ddd;
  border-left: 3px solid #f36d33;
  color: #666;
  page-break-inside: avoid;
  font-family: monospace;
  font-size: 13px;
  line-height: 1.5;
  margin: .5em;
  margin-bottom: 1.6em;
  overflow: auto;
  padding: 1em 1.5em;
  display: block;
  word-wrap: break-word;
}

</style>
