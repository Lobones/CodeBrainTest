import { API_URL, get, post } from '../request'

const url = `${API_URL}/products`

const getAllProducts = async () => {
  return await get(`${url}/getAll`)
}

const getProductById = async id => {
  return await get(`${url}/${id}`)
}

const getTopAverageTicketProduct = async () => {
  return await get(`${url}/getTopAverageTicket`)
}

const getLowStockProducts = async () => {
  return await get(`${url}/getLowStock`)
}

const createProduct = async product => {
  return await (await post(`${url}/new`, product)).text()
}

export {
  getAllProducts,
  getProductById,
  createProduct,
  getTopAverageTicketProduct,
  getLowStockProducts
}
