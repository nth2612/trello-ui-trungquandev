/**
 * YouTube: TrungQuanDev - Một Lập Trình Viên
 * Created by trungquandev.com's author on Jun 28, 2023
 */
/**
 * Capitalize the first letter of a string
 */
export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}
export const generatePlaceholderCard = (col) => {
  return {
    _id: `${col._id}-placeholder-card`,
    boardId: col.boardId,
    columnId: col.columnId,
    FE_PlaceholderCard: true
  }
}