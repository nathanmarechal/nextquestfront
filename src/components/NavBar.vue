<template>
  <b-navbar toggleable="md" type="dark" variant="dark" class="desktop-navbar px-4 py-2" style="background-color: #180342;">
    <b-container class="w-100">
      <b-navbar-brand>
        <img src="@/assets/NextQuest.png" alt="NextQuest Logo" class="nav-img" />
      </b-navbar-brand>

      <!-- Burger Button -->
      <b-navbar-toggle target="nav-collapse" />

      <!-- Collapsible Menu -->
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="w-100 justify-content-around align-items-center nav-links">
          <router-link to="/" class="nav-item-flex">
            <img src="@/assets/Accueil.png" alt="Accueil" class="nav-img" />
          </router-link>

          <router-link to="/userInfo" class="nav-item-flex">
            <img src="@/assets/Menu.png" alt="Menu" class="nav-img" />
          </router-link>

          <router-link to="/recherche" class="nav-item-flex">
            <img src="@/assets/Recherche.png" alt="Recherche" class="nav-img" />
          </router-link>

          <router-link to="/connexion" class="nav-item-flex">
            <template v-if="isAuthenticated">
              <span class="nav-email">
                {{ userEmail }}
                <button @click="logout" class="logout-btn">Déconnexion</button>
              </span>
            </template>
            <img
              v-else
              src="@/assets/Connexion.png"
              alt="Connexion"
              class="nav-img"
              @click.prevent="$emit('openConnexion')"
            />
          </router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NextQuestNavbar',
  computed: {
    ...mapGetters(['isAuthenticated', 'userEmail'])
  },
  methods: {
    ...mapActions(['logoutStore']),
    logout() {
      this.logoutStore()
      this.$router.push('/connexion')
    }
  },
}
</script>

<style scoped>
.desktop-navbar {
  background: linear-gradient(to bottom, #000000, #180342);
  min-height: 56px;
}

.nav-img {
  transition: transform 0.2s ease;
  cursor: pointer;
  max-height: 60px;
  height: auto;
}

/* ↪ Agrandir les icônes en desktop uniquement */
@media (min-width: 768px) {
  .nav-img {
    max-height: 130px;
  }
}

.navbar-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav-email {
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.logout-btn {
  margin-left: 10px;
  background: none;
  border: none;
  color: #FFD700;
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: underline;
}

.nav-item-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 1rem;
}

.nav-img:hover {
  transform: scale(1.08);
  filter: drop-shadow(0 0 8px #00ffffaa);
}

.nav-links {
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
