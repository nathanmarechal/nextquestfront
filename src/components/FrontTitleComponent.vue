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
import { mapActions } from 'vuex'

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
      twitchEmbedUrl: null,
      twitchStream: null,
      twitchLoading: false,
      twitchError: null,
    }
  },
  watch: {
    title: {
      immediate: true, // Exécute la méthode dès le montage
      handler: 'fetchTwitchData'

    }
  },
  methods: {
    ...mapActions(['getLiveTwitchStreams']),
    async fetchTwitchData(gameName) {
      this.twitchLoading = true
      this.twitchError = null
      this.twitchStream = null

      try {
        const response = await this.$store.dispatch('getLiveTwitchStreams', gameName)
        console.log("Réponse API Twitch :", response)

        const stream = Array.isArray(response) ? response[0] : response
        this.twitchEmbedUrl = null
        if (!stream) return

        // ✅ réactif + pas de surprise
        this.twitchStream = {
          user_login: stream.user_login,
          user_name: stream.user_name,
          title: stream.title,
          viewer_count: stream.viewer_count,
          started_at: stream.started_at,
          thumbnail_url: stream.thumbnail_url,
        }
        const parent = window.location.hostname // "localhost" ou ton domaine
        this.twitchEmbedUrl =
          `https://player.twitch.tv/?channel=${encodeURIComponent(stream.user_login)}&parent=${encodeURIComponent(parent)}&autoplay=true`
      } catch (e) {
        console.error("Erreur Twitch:", e)
        this.twitchError = "Impossible de récupérer Twitch"
      } finally {
        this.twitchLoading = false
      }
    },
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
