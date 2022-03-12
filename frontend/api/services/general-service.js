import { API_URL, get } from '../request'

const url = `${API_URL}/general`

const generateData = async () => {
  return await get(`${url}/generateData`)
}

export { generateData }
