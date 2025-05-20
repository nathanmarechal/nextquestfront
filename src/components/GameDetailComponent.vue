<template>
  <div class="game-details">
    <div class="section">
      <h3 class="label">Résumé</h3>
      <p>{{ game.summary }}</p>
    </div>

    <div class="section">
      <h3 class="label">Histoire</h3>
      <p>{{ game.storyline }}</p>
    </div>

    <div class="section horizontal">
      <div class="column">
        <h4 class="label">Site web</h4>
        <a :href="game.website" target="_blank">{{ game.website }}</a>
      </div>
      <div class="column">
        <h4 class="label">Développeur</h4>
        <p>{{ game.developer }}</p>
      </div>
    </div>

    <div class="section horizontal">
      <div class="column">
        <h4 class="label">Genres</h4>
        <p>{{ formatList(game.genres) }}</p>
      </div>
      <div class="column">
        <h4 class="label">Plateformes</h4>
        <p>{{ formatList(game.platforms) }}</p>
      </div>
      <div class="column">
        <h4 class="label">Modes de jeu</h4>
        <p>{{ formatList(game.game_modes) }}</p>
      </div>
    </div>

    <div class="section horizontal">
      <div class="column">
        <h4 class="label">Thèmes</h4>
        <p>{{ formatList(game.themes) }}</p>
      </div>
      <div class="column">
        <h4 class="label">Perspectives</h4>
        <p>{{ formatList(game.perspectives) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameDetails',
  props: {
    game: Object
  },
  methods: {
    formatList (list) {
      return Array.isArray(list) ? list.join(', ') : 'Non spécifié'
    }
  }
}
</script>

<style scoped>
.game-details {
  padding: 40px 30px;
  color: #f5f5f5;
  font-family: 'Orbitron', 'Segoe UI', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-size: 2.8em;
  text-align: center;
  margin-bottom: 40px;
  color: #ffffff;
  text-shadow: 0 0 10px #a555ff;
}

.section {
  margin-bottom: 40px;
}

.horizontal {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

.column {
  flex: 1;
  min-width: 250px;
}

.label {
  color: #00ffe5;
  font-size: 1.2em;
  margin-bottom: 10px;
  border-left: 4px solid #5e17eb;
  padding-left: 12px;
}

a {
  color: #00ffe5;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
