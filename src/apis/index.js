import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// Khong su dung try catch cho tat ca cac function vi du thua code bat loi, thay vao do clean code bang cach tap trung catch ve mot noi
// bang cach su dung interceptors cua axios

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  // Luu y: Axios tra ve qua cai property la data
  return response.data
}