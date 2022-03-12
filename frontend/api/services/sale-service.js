import { API_URL, get, post } from '../request'

const url = `${API_URL}/sales`

const getAllSales = async () => {
  return await get(`${url}/getAll`)
}

const getSaleById = async id => {
  return await get(`${url}/${id}`)
}

const getTopSaleByPrice = async () => {
  return await get(`${url}/getTopSaleByPrice`)
}

const createSale = async product => {
  return await (await post(`${url}/new`, product)).text()
}

export { getAllSales, getSaleById, createSale, getTopSaleByPrice }
