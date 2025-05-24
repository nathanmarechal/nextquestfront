<template>
  <div class="research-page">
    <div class="left-column">
      <h2>Recherche</h2>
      <div class="filter-group">
        <label for="search">Nom du jeu :</label>
        <input
          id="search"
          type="text"
          v-model="filters.search"
          @input="onSearchInput"
          placeholder="Rechercher un jeu..."
        />
      </div>

      <div
        v-for="(options, category) in sortedCategories"
        :key="category"
        class="filter-group"
      >
        <h3 @click="toggleCategory(category)" class="category-title">
          {{ category }}
          <span>{{ expandedCategories[category] ? '-' : '+' }}</span>
        </h3>
        <div v-if="expandedCategories[category]">
          <div
            v-for="option in options.sort((a, b) => a.localeCompare(b))"
            :key="option"
            class="checkbox-group"
          >
            <input
              type="checkbox"
              :id="option"
              :value="option"
              v-model="filters[category]"
            />
            <label :for="option">{{ option }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="flame-divider"></div>

    <div class="right-column">
      <h2>Liste des jeux</h2>

      <div class="poster-grid">
        <div
          v-for="game in filteredGames"
          :key="game.app_id"
          class="poster-card"
        >
          <router-link :to="`/game/${encodeURIComponent(game.name)}`" tabindex="-1">
            <img
              class="poster-img"
              :src="normalizeUrl(game.cover_url, game.artwork_url)"
              :alt="game.name"
            />
          </router-link>
          <div class="poster-overlay">
            <span class="poster-title">{{ game.name }}</span>
          </div>
        </div>
      </div>

      <button class="load-more-btn" @click="loadNextPage" :disabled="loading">
        {{ loading ? 'Chargement...' : 'Charger plus' }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ResearchPage',
  data() {
    return {
      filters: {
        search: '',
        platforms: [],
        genres: [],
        perspectives: [],
        developers: [],
        game_modes: [],
        themes: []
      },
      categories: {
        platforms: [],
        genres: [],
        perspectives: [],
        developers: [],
        game_modes: [],
        themes: []
      },
      expandedCategories: {
        platforms: false,
        genres: false,
        perspectives: false,
        developers: false,
        game_modes: false,
        themes: false
      },
      filteredGames: [],
      offset: 0,
      limit: 30,
      loading: false
    };
  },
  computed: {
    sortedCategories() {
      return Object.keys(this.categories)
        .sort((a, b) => a.localeCompare(b))
        .reduce((obj, key) => {
          obj[key] = [...this.categories[key]].sort((a, b) => a.localeCompare(b));
          return obj;
        }, {});
    }
  },
  created() {
    this.fetchCategories();
    this.fetchFilteredGames(true);
  },
  watch: {
    'filters.search'(val) {
      this.resetAndFetch();
    },
    filters: {
      handler() {
        this.resetAndFetch();
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['getCategoriesStore', 'getFilteredGamesStore']),

    async fetchCategories() {
      try {
        const categories = await this.getCategoriesStore();
        this.categories = categories;
        Object.keys(this.categories).forEach((category) => {
          if (!this.filters[category]) {
            this.$set(this.filters, category, []);
          }
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    },

    async fetchFilteredGames(reset = false) {
      if (this.loading) {
        console.log('Chargement déjà en cours...');
        return; // Empêche les requêtes multiples
      }
      this.loading = true;
      console.log('Début du chargement des jeux...');

      try {
        if (reset) {
          this.offset = 0;
          this.filteredGames = [];
          console.log('Réinitialisation des jeux...');
        }

        const params = {
          offset: this.offset,
          limit: this.limit,
          order_by_name: true,
          genre: this.filters.genres.length ? this.filters.genres : null,
          platform: this.filters.platforms.length ? this.filters.platforms : null,
          developer: this.filters.developers.length ? this.filters.developers : null,
          perspective: this.filters.perspectives.length ? this.filters.perspectives : null,
          game_mode: this.filters.game_modes.length ? this.filters.game_modes : null,
          theme: this.filters.themes.length ? this.filters.themes : null,
          name: this.filters.search || null
        };

        console.log('Paramètres de la requête :', params);

        const response = await this.getFilteredGamesStore(params);
        const newGames = Array.isArray(response) ? response : response?.data || [];

        console.log('Jeux récupérés :', newGames);

        if (reset) {
          this.filteredGames = newGames;
        } else {
          this.filteredGames = [...this.filteredGames, ...newGames];
        }

        if (newGames.length > 0) {
          this.offset += this.limit;
          console.log('Offset mis à jour :', this.offset);
        } else {
          console.log('Aucun nouveau jeu récupéré.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des jeux filtrés :', error);
      } finally {
        this.loading = false;
        console.log('Chargement terminé.');
      }
    },

    resetAndFetch() {
      this.offset = 0;
      this.filteredGames = [];
      this.fetchFilteredGames(true);
    },

    onSearchInput() {
      this.resetAndFetch();
    },

    toggleCategory(category) {
      this.$set(
        this.expandedCategories,
        category,
        !this.expandedCategories[category]
      );
    },

    normalizeUrl(coverUrl, artworkUrl) {
      if (coverUrl) {
        return coverUrl.startsWith('//') ? 'https:' + coverUrl : coverUrl;
      } else if (artworkUrl) {
        return artworkUrl.startsWith('//') ? 'https:' + artworkUrl : artworkUrl;
      } else {
        return require('@/assets/default_game.jpg'); // Image par défaut
      }
    },

    loadNextPage() {
      this.fetchFilteredGames(false);
    }
  }
};
</script>

<style scoped>
.research-page {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  min-height: 100vh;
}

.left-column {
  flex: 1;
  padding: 20px;
}

.right-column {
  flex: 3;
  padding: 20px;
}

.flame-divider {
  width: 6px;
  min-height: 100%;
  border-radius: 3px;
  background: linear-gradient(to bottom, #d400ff, #7300ff, #330066);
  background-size: 100% 300%;
  animation: neonGlow 3s infinite ease-in-out;
  box-shadow: 0 0 14px #ff00ff, 0 0 28px #a500ff;
  align-self: stretch;
}

@keyframes neonGlow {
  0% {
    background-position: 0% 0%;
    box-shadow: 0 0 10px #ff00ff, 0 0 20px #a500ff;
  }
  50% {
    background-position: 0% 100%;
    box-shadow: 0 0 20px #ff66ff, 0 0 40px #cc00ff;
  }
  100% {
    background-position: 0% 0%;
    box-shadow: 0 0 10px #ff00ff, 0 0 20px #a500ff;
  }
}

h2,
h3 {
  font-family: 'Orbitron', sans-serif;
  color: #ffd700;
}

label {
  font-family: 'Orbitron', sans-serif;
  color: #00ffe5;
}

input[type='text'],
input[type='checkbox'] {
  border: 2px solid #00ffe5;
  background-color: transparent;
  color: #ffd700;
  padding: 5px;
  border-radius: 4px;
}

input[type='text']::placeholder {
  color: #00ffe5;
}

input[type='checkbox']:checked {
  accent-color: #ffd700;
}

.filter-group {
  margin-bottom: 20px;
}

/* Posters stylés */
.poster-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.poster-card {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.poster-card:hover {
  transform: scale(1.05);
  z-index: 2;
}

.poster-img {
  width: 100%;
  height: 270px;
  object-fit: cover;
  border-radius: 12px;
  display: block;
}

.poster-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.poster-card:hover .poster-overlay {
  opacity: 1;
}

.poster-title {
  display: inline-block;
  padding: 0 5px;
  word-break: break-word;
}

.load-more-btn {
  margin-top: 20px;
  padding: 12px 24px;
  font-family: 'Orbitron', sans-serif;
  font-size: 16px;
  background-color: #7300ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  width: 100%;
}

.load-more-btn:hover:not(:disabled) {
  background-color: #a500ff;
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
