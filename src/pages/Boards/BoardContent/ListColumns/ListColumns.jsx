import Box from '@mui/material/Box'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Button from '@mui/material/Button'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'

function ListColumns({ columns, createNewColumn, createNewCard }) {
  const [openNewColumn, setOpenNewColumn] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumn(!openNewColumn)
  const [newColTitle, setNewColTitle] = useState('')
  const addNewColumn = () => {
    if (!newColTitle) {
      toast.error('Please enter column title')
      return
    }
    const newColumnData = {
      title: newColTitle
    }
    createNewColumn(newColumnData)
    setNewColTitle('')
    toggleOpenNewColumnForm()
  }

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
        {columns?.map(column => <Column key={column._id} column={column} createNewCard={createNewCard} />)}

        {/* Box add new column */}
        {!openNewColumn
          ? <Box
            onClick={toggleOpenNewColumnForm}
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              marginX: 2,
              borderRadius: '6px',
              height: 'fit-content',
              backgroundColor: '#ffffff3d'
            }}
          >
            <Button sx={{ width: '100%', color: 'white', justifyContent: 'flex-start', paddingLeft: 2.5, paddingY: 1 }} startIcon={<NoteAddIcon/>}>Add new column</Button>
          </Box>
          : <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              marginX: 2,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              backgroundColor: '#ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              label="Enter column title..."
              type="text"
              size='small'
              variant='outlined'
              autoFocus
              value={newColTitle}
              onChange={(e) => setNewColTitle(e.target.value)}
              sx={{
                '& label, & input, & label.Mui-focused' : { color : 'white' },
                '& .MuiOutlinedInput-root' : {
                  '& fieldset, &:hover fieldset, &.Mui-focused fieldset' : { borderColor: 'white' }
                }
              }}
            />
            <Box>
              <Button variant='contained' onClick={addNewColumn} color='success' size='small' sx={{ boxShadow: 'none' }}>Add column</Button>
              <CloseIcon sx={{
                color: 'white',
                cursor: 'pointer'
              }}
              fontSize='small'
              onClick={toggleOpenNewColumnForm} />
            </Box>
          </Box>}
      </Box>
    </SortableContext>
  )
}

export default ListColumns
