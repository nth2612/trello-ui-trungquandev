import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// Khong su dung try catch cho tat ca cac function vi du thua code bat loi, thay vao do clean code bang cach tap trung catch ve mot noi
// bang cach su dung interceptors cua axios

// Boards
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  // Luu y: Axios tra ve qua cai property la data
  return response.data
}
export const moveCardToDiffColumnAPI = async (updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  return response
}

// Update
export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response
}
export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response
}
// Columns
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}
export const deleteColumnDetailAPI = async (columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}

// Cards
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}
