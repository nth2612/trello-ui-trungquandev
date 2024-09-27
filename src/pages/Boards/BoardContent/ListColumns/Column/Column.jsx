import AddCardIcon from '@mui/icons-material/AddCard'
import Cloud from '@mui/icons-material/Cloud'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentPaste from '@mui/icons-material/ContentPaste'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import ListCards from './ListCards/ListCards'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'

function Column({ column, createNewCard, deleteColumnDetails }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })
  const dndkitColumnStyle = {
    // touchAction: 'none',
    // Nếu dùng CSS.Transform thì bị lỗi liên quan đến stretch
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }


  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const orderedCards = column?.cards

  const [openNewCard, setOpenNewCard] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCard(!openNewCard)
  const [newCardTitle, setNewCardTitle] = useState('')
  const addNewCard = () => {
    if (!newCardTitle) {
      toast.error('Please enter card title', {
        position: 'bottom-right'
      })
      return
    }
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }
    createNewCard(newCardData)
    setNewCardTitle('')
    toggleOpenNewCardForm()
  }
  const confirmDeleteColumn = useConfirm()
  //Xoa column
  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      description: 'Do you want to delete your column and the whole cards in that ?',
      title: 'Warning delete',
      dialogProps: { maxWidth: 'xs' }
    }).then(() => {
      deleteColumnDetails(column._id)
    }).catch(() => {})
  }
  return (
    <div ref={setNodeRef} style={dndkitColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}
      >
        {/* Box Header */}
        <Box sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography sx={{
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          >{column?.title}</Typography>
          <Box>
            <Tooltip title="More options">
              <ExpandMoreIcon
                sx={{ color: 'text.primary', cursor: 'pointer' }}
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem>
                <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleDeleteColumn}>
                <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* List Cards*/}
        <ListCards cards={orderedCards} />
        {/* Box Footer */}
        <Box sx={{
          height: (theme) => theme.trello.columnFooterHeight,
          padding: 2
        }}>
          {!openNewCard
            ? <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between' }} >
              <Button startIcon={<AddCardIcon />} onClick={toggleOpenNewCardForm}>Add new card</Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
            : <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                label="Enter card title..."
                type="text"
                size='small'
                variant='outlined'
                data-no-dnd='true'
                autoFocus
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{
                  '& label, & input, & label.Mui-focused' : { color : 'white' },
                  '& .MuiOutlinedInput-root' : {
                    '& fieldset, &:hover fieldset, &.Mui-focused fieldset' : { borderColor: 'white' }
                  }
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button variant='contained' onClick={addNewCard} data-no-dnd='true' color='success' size='small' sx={{ boxShadow: 'none' }}>Add</Button>
                <CloseIcon sx={{
                  color: 'white',
                  cursor: 'pointer'
                }}
                fontSize='small'
                onClick={toggleOpenNewCardForm} />
              </Box>
            </Box>
          }
        </Box>
      </Box>
    </div>
  )
}

export default Column
