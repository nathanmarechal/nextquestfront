import Vue from 'vue'
import Vuex from 'vuex'
import { getGameByNameService, getRecommendedGamesService, getTendancesService } from '@/services/recommendation'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    // eslint-disable-next-line camelcase
    async getRecommendedGames ({commit},{user_id, top_n}) {
      try {
        const recommandations = await getRecommendedGamesService({user_id, top_n})
        console.log('Recommandations:', recommandations)
        return recommandations
      } catch (error) {
        console.error('Error fetching commandes:', error)
      }
    },

    // eslint-disable-next-line camelcase
    async getTendanceStore ({commit}) {
      try {
        const tendances = await getTendancesService()
        console.log('Tendances:', tendances)
        return tendances
      } catch (error) {
        console.error('Error fetching commandes:', error)
      }
    },

    // eslint-disable-next-line camelcase
    async getGameByName ({commit}, name) {
      try {
        const game = await getGameByNameService(name)
        console.log('Jeu:', game)
        return game
      } catch (error) {
        console.error('Error fetching commandes:', error)
      }
    }
  },
  modules: {
  }
})
