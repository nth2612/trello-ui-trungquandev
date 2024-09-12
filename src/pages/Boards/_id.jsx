import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
import BoardContent from '~/pages/Boards/BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'

function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    // Tam thoi fix cung, khoa nang cao moi co, goi y dung react-router-dom de lay ra id tu url
    const boardId = '66e25df363f83f9f1b48fdc1'
    // Call api
    fetchBoardDetailsAPI(boardId).then(boardd => {
      console.log('hihi', boardd)
      setBoard(boardd)
    })
  }, [])
  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{ height: '100vh' }}
    >
      <AppBar/>
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
