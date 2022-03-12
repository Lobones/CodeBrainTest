import { API_URL, get, post, del } from '../request'

const url = `${API_URL}/operators`

const getAllOperators = async () => {
  return await get(`${url}/getAll`)
}

const getOperatorById = async id => {
  return await get(`${url}/${id}`)
}

const getTopSaleOperator = async () => {
  return await get(`${url}/getTopSale/BY_AMOUNT`)
}

const createOperator = async operator => {
  return await (await post(`${url}/new`, operator)).text()
}

const deleteOperator = async id => {
  return await del(`${url}/${id}`)
}

export {
  getAllOperators,
  getOperatorById,
  getTopSaleOperator,
  createOperator,
  deleteOperator
}
