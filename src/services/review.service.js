import { postRequest } from '@/services/axios.service'

async function get_review_by_game_name_five_per_five ({game_name, offset, limit}) {
  let answer = await get_review_by_game_name_five_per_five_from_api({game_name, offset, limit})
  return answer
}

async function get_review_by_game_name_five_per_five_from_api ({game_name, offset, limit}) {
  return postRequest('/review/get_review_by_game_name_five_per_five/', { game_name, offset, limit }, 'REVIEWBYNAME')
}

export {
  get_review_by_game_name_five_per_five
}
