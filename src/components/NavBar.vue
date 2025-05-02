<template>
  <b-navbar toggleable="md" type="dark" variant="dark" class="desktop-navbar px-5 py-2" style="background-color: #180342;">
    <div class="navbar-flex w-100">
        <img src="@/assets/NextQuest.png" alt="NextQuest Logo" class="nav-img" />
      <router-link to="/" class="nav-item-flex">
        <img src="@/assets/Accueil.png" alt="Accueil" class="nav-img" />
      </router-link>
      <router-link to="/menu" class="nav-item-flex">
        <img src="@/assets/Menu.png" alt="Menu" class="nav-img" />
      </router-link>
      <router-link to="/recherche" class="nav-item-flex">
        <img src="@/assets/Recherche.png" alt="Recherche" class="nav-img" />
      </router-link>
      <router-link to="/connexion" class="nav-item-flex">
        <img src="@/assets/Connexion.png" alt="Connexion" class="nav-img" />
      </router-link>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: 'NextQuestNavbar'
}
</script>

<style scoped>

.desktop-navbar {
  background: linear-gradient(to bottom, #000000, #180342);
  padding-top: 6px !important;
  padding-bottom: 6px !important;
  min-height: 56px;
}

.nav-img {
  height: 18vh;
  transition: transform 0.2s ease;
  cursor: pointer;
}

.navbar-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav-item-flex {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-img:hover {
  transform: scale(1.05);
}

.b-navbar-nav {
  width: 100%;
}

</style>
