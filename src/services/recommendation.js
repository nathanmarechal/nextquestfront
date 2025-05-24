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
}
