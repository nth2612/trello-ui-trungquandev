import Box from '@mui/material/Box'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Button from '@mui/material/Button'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumns({ columns }) {
  // Bọn này cần nhận biến nguyên thủy mới có animation, columns ở đây là list các object nên không có
  return (
    <SortableContext items={columns?.map(column => column._id)} strategy={horizontalListSortingStrategy} >
      <Box sx={{
        backgroundColor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track' : {
          margin : 2
        }
      }}>
        {columns?.map(column => <Column key={column._id} column={column} />)}

        {/* Box add new column */}
        <Box
          sx={{
            minWidth: '200px',
            maxWidth: '200px',
            marginX: 2,
            borderRadius: '6px',
            height: 'fit-content',
            backgroundColor: '#ffffff3d'
          }}
        >
          <Button sx={{ width: '100%', color: 'white', justifyContent: 'flex-start', paddingLeft: 2.5, paddingY: 1 }} startIcon={<NoteAddIcon/>}>Add new column</Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns
