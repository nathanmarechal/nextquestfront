import { postRequest, getRequest } from '@/services/axios.service'

// eslint-disable-next-line camelcase
async function  getRecommendedGamesService ({user_id, top_n}) {
  let answer = await getRecommendedGamesFromApi({user_id, top_n})
  return answer
}

// eslint-disable-next-line camelcase
async function getRecommendedGamesFromApi ({user_id, top_n}) {
  console.log('user_id:', user_id)
  console.log('top_n:', top_n)
  return postRequest('/recommendation/', { user_id, top_n }, 'RECOMMENDEDGAMES')
}

async function isLikedService({user_id, app_id}){
  let answer = await isLikedFromAPI({user_id, app_id})
  return answer
}

async function isLikedFromAPI({user_id, app_id}){
  return getRequest('review/check_like/' + user_id +'/' + app_id , 'ISLIKED')
}

async function likeGameService({user_id, app_id, liked}){
  let answer = await likeGameFromAPI({user_id, app_id, liked})
  return answer
}

async function likeGameFromAPI({user_id, app_id, liked}){
  return postRequest('/review/like_game', { user_id, app_id, liked }, 'LIKEGAME')
}

async function getTendancesService () {
  let answer = await getTendancesFromApi()
  return answer
}

async function getTendancesFromApi () {
  return getRequest('/recommendation/top-liked-last-7-days/', 'TENDANCES')
}

async function getGameByNameService (name) {
  let answer = await getGameByNameFromAPI(name)
  return answer
}

async function getGameByNameFromAPI (name) {
  return getRequest('/game/getByName/'+ name, 'BYNAME')
}

async function getCategoriesService () {
  let answer = await getCategoriesFromAPI()
  return answer
}

async function getCategoriesFromAPI () {
  return getRequest('/game/filters', 'CATEGORIES')
}

async function getLiveTwitchStreamsService (game_name) {
  let streams = await getLiveTwitchStreamsFromAPI(game_name)

  if (!Array.isArray(streams) || streams.length === 0) {
    return [] // ou null selon ton UI
  }

  const top = streams[0]
  return top
}

async function getLiveTwitchStreamsFromAPI (game_name) {
  return getRequest('/twitch/live/' + encodeURIComponent(game_name), 'LIVETWITCHSTREAMS')
}

async function getFilteredGames ({  offset,
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
  let answer = await getFilteredGamesFromAPI({ offset,
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
  return answer
}

async function getFilteredGamesFromAPI ({ offset,
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
  return postRequest('/game/', { offset,
    limit,
    order_by_name,
    genre,
    platform,
    developer,
    perspective,
    game_mode,
    theme,
    name
  }, 'FILTEREDGAMES')
}
export {
  getRecommendedGamesService
  , getTendancesService
  , getGameByNameService
  , getCategoriesService
  , getFilteredGames
  , isLikedService
  , likeGameService
  , getLiveTwitchStreamsService
}
