<template>
  <div id="app" class="app">
    <div>
      <NavBar @openConnexion="toggleConnexion" />
    </div>
    <router-link to="/"></router-link>
    <div class="content">
      <router-view></router-view>
    </div>
    <FooterComponent></FooterComponent>
    <!-- <router-link to="/"></router-link> -->
    <!--<div class="content">-->
      <!--<router-view></router-view>-->
    <!--</div>-->
    <!--<PageFooter />-->
    <ConnexionPanel :visible="showConnexion" @connected="handleConnexionSuccess" @close="showConnexion = false" />
  </div>
</template>

<script>
import ConnexionPanel from './components/ConnexionPanel.vue'

export default {
  name: 'App',
  components: {
    NavBar: () => import('./components/NavBar.vue'),
    FooterComponent: () => import('./components/FooterComponent.vue'),
    ConnexionPanel
  },
  data: () => ({
    showConnexion: false
  }),
  methods: {
    toggleConnexion () {
      this.showConnexion = !this.showConnexion
    },
    handleConnexionSuccess () {
      this.showConnexion = false
      // log utilisateur, redirection, etc.
    }
  }
}

</script>

<style scoped>
  .app {
    background-color: #180342;
  }
</style>
