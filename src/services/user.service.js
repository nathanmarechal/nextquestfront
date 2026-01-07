import { postRequest} from '@/services/axios.service'

async function createAccountService({ email, username, password, birthdate }){
  let answer = await createAccountFromAPI({ email, username, password, birthdate })
  return answer
}

async function createAccountFromAPI({ email, username, password, birthdate }) {
  return postRequest('/users/', { email, username, password, birthdate }, 'CREATE')
}


async function loginService({ email, password }) {
  let answer = await loginFromAPI({ email, password })
  return answer
}

async function loginFromAPI({ email, password }) {
  return postRequest('/users/login', { email, password }, 'LOGIN')
}

export { createAccountService, loginService }
