import Box from '@mui/material/Box'
import TrelloCard from './Card/Card'

function ListCards({cards}) {
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
      {cards?.map(card => <TrelloCard key={card._id} card={card} />)}
    </Box>
  )
}

export default ListCards
