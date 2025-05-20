<template>
  <div class="home-page">
    <FrontTitleComponent
      :title="gameListTendances[1].name"
      :image-url="gameListTendances[1].artwork_url"
    />
    <ScrollComponent
      :games="gameList"
      :logo="require('@/assets/Suggestions.png')"
      :arrowImage="require('@/assets/arrow.svg')"
    />
    <ScrollComponent
      :games="gameListTendances"
      :logo="require('@/assets/Tendances.png')"
      :arrowImage="require('@/assets/arrow.svg')"
      scrollDirection="left"
    />
  </div>
</template>

<script>
import FrontTitleComponent from '@/components/FrontTitleComponent.vue'
import ScrollComponent from '@/components/ScrollComponent.vue'
import { mapActions } from 'vuex'

export default {
  name: 'HomePage',
  components: {
    ScrollComponent,
    FrontTitleComponent
  },
  data () {
    return {
      gameList: null,
      gameListTendances: null
    }
  },
  created() {
    this.getGames()
    this.getTendances()
  },
  methods: {
    ...mapActions(['getRecommendedGames', 'getTendanceStore']),
    async getGames () {
      this.gameList = await this.getRecommendedGames({user_id:2, top_n:30})
      console.log('Dans le created')
      console.log(JSON.stringify(this.gameList))
      console.log(this.gameList.name)
      console.log(this.gameList[0].cover_url)
    },

    async getTendances () {
      this.gameListTendances = await this.getTendanceStore()
      console.log('Dans le created')
      console.log(JSON.stringify(this.gameListTendances))
      console.log(this.gameListTendances.name)
      console.log(this.gameListTendances[0].cover_url)
    }

  }
}
</script>

<style scoped>

</style>
