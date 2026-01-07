import { postRequest } from '@/services/axios.service'

async function get_review_by_game_name_five_per_five ({game_name, offset, limit}) {
  let answer = await get_review_by_game_name_five_per_five_from_api({game_name, offset, limit})
  return answer
}

async function get_review_by_game_name_five_per_five_from_api ({game_name, offset, limit}) {
  return postRequest('/review/get_review_by_game_name_five_per_five/', { game_name, offset, limit }, 'REVIEWBYNAME')
}

async function postReviewService({id_user, app_id, review, review_score, date_review, name_user }){
  console.log('postReviewService called with:', {id_user, app_id, review, review_score, date_review, name_user})
  let answer = postReviewFromAPI({id_user, app_id, review, review_score, date_review, name_user })
  return answer
}

async function postReviewFromAPI({id_user, app_id, review, review_score, date_review, name_user }) {
  return postRequest('/review/post_review', {
    id_user,
    app_id,
    review,
    review_score,
    date_review,
    name_user
  }, "POSTREVIEW")
}

export {
  get_review_by_game_name_five_per_five
  , postReviewService
}
