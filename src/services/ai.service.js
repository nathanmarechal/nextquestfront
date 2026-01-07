import { postRequest} from '@/services/axios.service'

async function conversewithAI({ message }) {
  let answer = await conversewithAIFromAPI({ message })
  return answer
}

async function conversewithAIFromAPI({ message }) {
  return postRequest('/assistant/chat', { message }, 'CONVERSE')
}

export { conversewithAI }
