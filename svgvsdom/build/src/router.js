
// Dependencies ===============

import Vue from 'vue';
import Router from 'vue-router';

// Pages ======================

import index from './pages/index.vue';
import dom from './pages/dom.vue';
import svg from './pages/svg.vue';
import tester from './pages/tester.vue';

// Export Router ==============

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: index,
    },
    {
      path: '/dom',
      name: 'DOM Example',
      component: dom,
    },
    {
      path: '/svg',
      name: 'SVG Example',
      component: svg,
    },
    {
      path: '/tester',
      name: 'Tester',
      component: tester,
    },
  ],
});
