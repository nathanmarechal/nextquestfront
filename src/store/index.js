import Vue from 'vue'
import Vuex from 'vuex'
import {
  getGameByNameService,
  getRecommendedGamesService,
  getTendancesService,
  getCategoriesService,
  getFilteredGames, isLikedService, likeGameService, getLiveTwitchStreamsService
} from '@/services/recommendation'
import { get_review_by_game_name_five_per_five, postReviewService } from '@/services/review.service'
import { createAccountService, loginService } from '@/services/user.service'
import Cookies from 'js-cookie'
import { conversewithAI } from '@/services/ai.service'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    clickedGame: null,

    userToken: Cookies.get('userToken') || null,
    userId: Cookies.get('userId') || null,
    userEmail: Cookies.get('userEmail') || null


  },
  getters: {

    clickedGame: (state) => {
      return state.clickedGame
    },

    isAuthenticated: (state) => !!state.userToken,
    userId: (state) => state.userId,
    userEmail: (state) => state.userEmail



  },
  mutations: {

    setClickedGame(state, game) {
      state.clickedGame = game
    },
    setUserToken(state, token) {
      state.userToken = token
      Cookies.set('userToken', token, { secure: true, sameSite: 'Strict' })
    },
    setUserId(state, userId) {
      state.userId = userId
      Cookies.set('userId', userId, { secure: true, sameSite: 'Strict' })
    },
    setUserEmail(state, email) {
      state.userEmail = email
      Cookies.set('userEmail', email, { secure: true, sameSite: 'Strict' })
    },
    clearAuthData(state) {
      state.userToken = null
      state.userId = null
      state.userEmail = null
      Cookies.remove('userToken')
      Cookies.remove('userId')
      Cookies.remove('userEmail')
    }



  },
  actions: {

    async converseWithAiStore ({commit}, message) {
      try {
        const answer = await conversewithAI({ message })
        console.log('Live Twitch Streams:', answer)
        return answer
      } catch (error) {
        console.error('Error fetching live Twitch streams:', error)
      }
    },

    async getLiveTwitchStreams ({commit}, game_name) {
      try {
        const streams = await getLiveTwitchStreamsService(game_name)
        console.log('Live Twitch Streams:', streams)
        return streams
      } catch (error) {
        console.error('Error fetching live Twitch streams:', error)
      }
    },

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
    },

    async createAccountStore ({commit}, { email, username, password, birthdate }) {
      try {
        const answer = await createAccountService({ email, username, password, birthdate });
        console.log('Account created:', answer);
        return answer;
      } catch (error) {
        console.error('Error creating account:', error);
        throw error;
      }
    },

    async loginStore({ commit }, { email, password }) {
      try {
        const response = await loginService({ email, password });

        if (response.access_token && response.user_id) {
          commit('setUserToken', response.access_token);
          commit('setUserId', response.user_id);
          commit('setUserEmail', email);
        } else {
          console.error('Les données retournées par l\'API sont invalides :', response);
          throw new Error('Données de connexion invalides.');
        }

        return response;
      } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        throw error;
      }
    },

    async postReviewStore({commit}, {id_user, app_id, review, review_score, date_review, name_user }){
      try {
        const response = await postReviewService({id_user, app_id, review, review_score, date_review, name_user })
        return response
      }catch (error){
        console.error('Erreur lors de la connexion :', error)
        throw error
      }
    },

    async isLikedStore({commit}, {user_id, app_id}){
      try {
        const response = await isLikedService({user_id, app_id})
        return response
      }catch (error){
        console.error('Erreur lors de la connexion :', error)
        throw error
      }
    },

    async likeGameStore({commit}, {user_id, app_id, liked}){
      try {
        const response = await likeGameService({user_id, app_id, liked})
        return response
      }catch (error){
        console.error('Erreur lors de la connexion :', error)
        throw error
      }
    },

    logoutStore({ commit }) {
      commit('clearAuthData')
    }


  },
  modules: {
  }
})
