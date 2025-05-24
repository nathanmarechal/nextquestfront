import Vue from 'vue'
import Vuex from 'vuex'
import {
  getGameByNameService,
  getRecommendedGamesService,
  getTendancesService,
  getCategoriesService,
  getFilteredGames
} from '@/services/recommendation'
import { get_review_by_game_name_five_per_five } from '@/services/review.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    clickedGame: null,

  },
  getters: {

    clickedGame: (state) => {
      return state.clickedGame
    }

  },
  mutations: {

    setClickedGame (state, game) {
      state.clickedGame = game
    }
  },
  actions: {
    async getReviewByGameName ({commit}, {game_name, offset, limit}) {
      try {
        const review = await get_review_by_game_name_five_per_five({game_name, offset, limit})
        console.log('Review:', review)
        return review
      } catch (error) {
        console.error('Error fetching commandes:', error)
      }
    },

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
    },

    async getCategoriesStore ({commit}) {
      try {
        const categories = await getCategoriesService()
        console.log('Categories:', categories)
        return categories
      } catch (error) {
        console.error('Error fetching commandes:', error)
      }
    },

    async getFilteredGamesStore ({commit}, {  offset,
      limit,
      order_by_name,
      genre,
      platform,
      developer,
      perspective,
      game_mode,
      theme,
      name
    }) {
      try {
        const filteredGames = await getFilteredGames({ offset,
          limit,
          order_by_name,
          genre,
          platform,
          developer,
          perspective,
          game_mode,
          theme,
          name
        })
        console.log('Filtered Games:', filteredGames)
        return filteredGames
      } catch (error) {
        console.error('Error fetching commandes:', error)
      }
    }
  },
  modules: {
  }
})
