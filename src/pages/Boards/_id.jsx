import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
import BoardContent from '~/pages/Boards/BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { createNewCardAPI, createNewColumnAPI, fetchBoardDetailsAPI, updateBoardDetailsAPI } from '~/apis'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/fomatters'

function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    // Tam thoi fix cung, khoa nang cao moi co, goi y dung react-router-dom de lay ra id tu url
    const boardId = '66e25df363f83f9f1b48fdc1'
    // Call api
    fetchBoardDetailsAPI(boardId).then(boardd => {
      boardd.columns.forEach(col => {
        if (isEmpty(col.cards)) {
          col.cards = [generatePlaceholderCard(col)]
          col.cardOrderIds = [generatePlaceholderCard(col)._id]
        }
      })
      setBoard(boardd)
    })
  }, [])
  // Call API tao moi du lieu va lam lai du lieu board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(col => col._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
      columnToUpdate.cards = columnToUpdate.cards.filter(card => !card.FE_PlaceholderCard)
    }
    setBoard(newBoard)
  }
  // Call api sau khi keo tha xong column
  const moveColumns = async (dndOrderedColumn) => {
    const dndOrderedColumnIds = dndOrderedColumn.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumn
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }
  const moveCards = async () => {
    
  }
  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{ height: '100vh' }}
    >
      <AppBar/>
      <BoardBar board={board} />
      <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard} moveColumns={moveColumns} />
    </Container>
  )
}

export default Board
