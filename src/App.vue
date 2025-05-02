<template>
  <div id="app" class="app">
    <div>
      <NavBar/>
    </div>
    <router-link to="/"></router-link>
    <div class="content">
      <router-view></router-view>
    </div>
    <!-- <router-link to="/"></router-link> -->
    <!--<div class="content">-->
      <!--<router-view></router-view>-->
    <!--</div>-->
    <!--<PageFooter />-->
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    NavBar: () => import('./components/NavBar.vue')
  },

  data: () => ({
    //
  })
}
</script>

<style scoped>
  .app {
    background-color: #180342;
  }
</style>
