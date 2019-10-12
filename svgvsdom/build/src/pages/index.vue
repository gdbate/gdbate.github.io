<template><div>

  <v-list>
    <v-list-item v-for="route in $router.options.routes" :key="`route-${route.name}`" :to="route.path">
      <v-list-item-title>{{ route.name }}</v-list-item-title>
    </v-list-item>
  </v-list>

</div></template>

<script>

// Dependencies ===============

// Core =======================

const component = {
  props: {
  },
  data: () => ({
  }),
  computed: {
  },
  methods: {
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

</style>
