<template>
  <div class="home-page">
    <FrontTitleComponent
      :title="gameName"
      :imageUrl="imageUrl"
    />
    <GameDetailComponent :game="game"></GameDetailComponent>
    <AvisEtRecoComponent
      :title="gameName"
      ></AvisEtRecoComponent>
    <ScrollComponent
      :games="gameList"
      :logo="require('@/assets/Suggestions.png')"
      :arrowImage="require('@/assets/arrow.svg')"
    />
  </div>
</template>

<script>
import FrontTitleComponent from '@/components/FrontTitleComponent.vue'
import ScrollComponent from '@/components/ScrollComponent.vue'
import AvisEtRecoComponent from '@/components/AvisEtRecoComponent.vue'
import GameDetailComponent from '@/components/GameDetailComponent.vue'
import { mapActions } from 'vuex'

export default {
  name: 'GamePage',
  components: { GameDetailComponent, AvisEtRecoComponent, ScrollComponent, FrontTitleComponent },
  props: ['gameName'],
  data () {
    return {
      gameDetails: null,
      gameStreams: null,
      error: null,
      game: {
        name: 'Legends of Terra',
        game_summary: 'Un jeu de rôle épique dans un monde fantastique où vous devez restaurer l’équilibre perdu.',
        storyline: 'Après la destruction du cristal sacré, les royaumes sombrent dans le chaos. Un héros inattendu se lève pour restaurer l’ordre.',
        website: 'https://legendsofterra.example.com',
        developer: 'TerraSoft Studios',
        genres: ['RPG', 'Aventure'],
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X'],
        game_modes: ['Solo', 'Multijoueur en ligne'],
        themes: ['Fantaisie', 'Héroïque'],
        perspectives: ['Troisième personne', 'Vue isométrique']
      },
      gameList:null,
    }
  },
  computed: {
    imageUrl () {
      if (this.game.artwork_url) {
        return this.ensureHttps(this.game.artwork_url)
      } else if (this.game.cover_url) {
        return this.ensureHttps(this.game.cover_url)
      } else {
        return require('@/assets/default_game.jpg') // ton image locale de secours
      }
    }  },
  created () {
    this.getGamebyNameMethod(this.gameName)
    this.getRecommendedGamesMethod()
  },
  methods: {
    ...mapActions(['getGameByName', 'getRecommendedGames']),

    ensureHttps (url) {
      // Au cas où l'URL commence par //
      if (url.startsWith('//')) {
        return 'https:' + url
      }
      return url
    },


    async getGamebyNameMethod (name) {
      this.game = await this.getGameByName(name)
      console.log('Dans le created')
      console.log(JSON.stringify(this.game))
      console.log(this.game.name)
      console.log(this.game.cover_url)
    },

    async getRecommendedGamesMethod () {
      this.gameList = await this.getRecommendedGames({user_id:2, top_n:30})
      console.log('Dans le created')
      console.log(JSON.stringify(this.gameList))
      console.log(this.gameList.name)
      console.log(this.gameList[0].cover_url)
    },



  }
}
</script>

<style scoped>

</style>
