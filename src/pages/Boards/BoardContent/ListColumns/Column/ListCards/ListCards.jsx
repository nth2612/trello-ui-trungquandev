import Box from '@mui/material/Box'
import TrelloCard from './Card/Card'

function ListCards() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      padding: '0 5px',
      margin: '0 5px',
      overflowX : 'hidden',
      overflowY : 'auto',
      maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${theme.trello.columnHeaderHeight} - ${theme.trello.columnFooterHeight})`,
      '::-webkit-scrollbar-thumb' : {
        backgroundColor: '#ced0da',
        borderRadius: '8px'
      },
      '::-webkit-scrollbar-thumb:hover' : {
        backgroundColor: '#bfc2cf',
        borderRadius: '8px'
      }
    }}
    >
      <TrelloCard temporaryHideMedia />
      <TrelloCard/>
    </Box>
  )
}

export default ListCards
