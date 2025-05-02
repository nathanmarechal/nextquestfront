<template>
  <div class="game-details">
    <h1 class="game-title">{{ title }}</h1>
    <div class="media-row">
      <img :src="imageUrl" alt="Game Image" class="game-image" />
      <iframe
        v-if="twitchEmbedUrl"
        :src="twitchEmbedUrl"
        class="twitch-iframe"
        frameborder="0"
        allowfullscreen="true"
        scrolling="no"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameDetailsComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      twitchEmbedUrl: null
    }
  },
  async mounted () {
    const clientId = '348xisw17vsxtq23qsp7rsov21pdfh' // Remplacez par votre client_id
    const accessToken = 'gkwqbxls8d8e90cp3f2arfwe43ecnp' // Remplacez par votre access_token
    const gameName = this.title

    try {
      // Récupérer l'ID du jeu
      const gameResponse = await fetch(`https://api.twitch.tv/helix/games?name=${encodeURIComponent(gameName)}`, {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${accessToken}`
        }
      })
      const gameData = await gameResponse.json()
      if (!gameData.data || gameData.data.length === 0) {
        console.error('Jeu non trouvé sur Twitch')
        return
      }
      const gameId = gameData.data[0].id

      // Récupérer le streamer le plus regardé
      const streamsResponse = await fetch(`https://api.twitch.tv/helix/streams?game_id=${gameId}&first=1`, {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${accessToken}`
        }
      })
      const streamsData = await streamsResponse.json()
      if (!streamsData.data || streamsData.data.length === 0) {
        console.error('Aucun stream trouvé pour ce jeu')
        return
      }
      const topStreamer = streamsData.data[0].user_name

      this.twitchEmbedUrl = `https://player.twitch.tv/?channel=${topStreamer}&parent=localhost&parent=127.0.0.1`
    } catch (error) {
      console.error('Erreur lors de la récupération des données Twitch :', error)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap');

.game-details {
  margin: 20px;
  text-align: center;
  color: white;
  padding: 20px;
}

.game-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #ffd700;
}

.media-row {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 20px;
}

.game-image,
.twitch-iframe {
  width: 600px;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 0 10px #000;
}
</style>
