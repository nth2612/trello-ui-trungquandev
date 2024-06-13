import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import AddCardIcon from '@mui/icons-material/AddCard'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Button } from '@mui/material'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import mybg from '~/assets/manhinh10.png'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'


const COLUMN_HEIGHT_HEADER = '50px'
const COLUMN_HEIGHT_FOOTER = '56px'

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <Box
      sx={{
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        padding: '10px 0'
      }}
    >
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
        {/* Column */}
        <Box sx={{
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
            height: COLUMN_HEIGHT_HEADER,
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography sx={{
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            >Column Title</Typography>
            <Box>
              <Tooltip title="More options">
                <ExpandMoreIcon
                  sx={{ color: 'text.primary', cursor: 'pointer'}}
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
                <MenuItem>
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
          {/* Box List */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            padding: '0 5px',
            margin: '0 5px',
            overflowX : 'hidden',
            overflowY : 'auto',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEIGHT_HEADER} - ${COLUMN_HEIGHT_FOOTER})`,
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
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
              <CardMedia
                sx={{ height: 140 }}
                image={mybg}
                title="green iguana"
              />
              <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5} }}>
                <Typography>Nishykata Front-end Developer</Typography>
              </CardContent>
              <CardActions sx={{ padding: '0 4px 8px 4px'}}>
                <Button size="small" startIcon={<GroupIcon/>}>20</Button>
                <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon/>}>10</Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
              <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5} }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
              <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5} }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
              <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5} }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
              <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5} }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
              <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5} }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
              <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5} }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
              <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5} }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
              <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5} }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
              <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5} }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>

          </Box>
          {/* Box Footer */}
          <Box sx={{
            height: COLUMN_HEIGHT_FOOTER,
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon/>}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
        {/* Column 02 */}
        <Box sx={{
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
            height: COLUMN_HEIGHT_HEADER,
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography sx={{
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            >Column Title</Typography>
            <Box>
              <Tooltip title="More options">
                <ExpandMoreIcon
                  sx={{ color: 'text.primary', cursor: 'pointer'}}
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
                <MenuItem>
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
          {/* Box List */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            padding: '0 5px',
            margin: '0 5px',
            overflowX : 'hidden',
            overflowY : 'auto',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEIGHT_HEADER} - ${COLUMN_HEIGHT_FOOTER})`,
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
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
              <CardMedia
                sx={{ height: 140 }}
                image={mybg}
                title="green iguana"
              />
              <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5} }}>
                <Typography>Nishykata Front-end Developer</Typography>
              </CardContent>
              <CardActions sx={{ padding: '0 4px 8px 4px'}}>
                <Button size="small" startIcon={<GroupIcon/>}>20</Button>
                <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon/>}>10</Button>
              </CardActions>
            </Card>

          </Box>
          {/* Box Footer */}
          <Box sx={{
            height: COLUMN_HEIGHT_FOOTER,
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon/>}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>

        <Box sx={{
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
            height: COLUMN_HEIGHT_HEADER,
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography sx={{
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            >Column Title</Typography>
            <Box>
              <Tooltip title="More options">
                <ExpandMoreIcon
                  sx={{ color: 'text.primary', cursor: 'pointer'}}
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
                <MenuItem>
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
          {/* Box List */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            padding: '0 5px',
            margin: '0 5px',
            overflowX : 'hidden',
            overflowY : 'auto',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEIGHT_HEADER} - ${COLUMN_HEIGHT_FOOTER})`,
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
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
              <CardMedia
                sx={{ height: 140 }}
                image={mybg}
                title="green iguana"
              />
              <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5} }}>
                <Typography>Nishykata Front-end Developer</Typography>
              </CardContent>
              <CardActions sx={{ padding: '0 4px 8px 4px'}}>
                <Button size="small" startIcon={<GroupIcon/>}>20</Button>
                <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon/>}>10</Button>
              </CardActions>
            </Card>

          </Box>
          {/* Box Footer */}
          <Box sx={{
            height: COLUMN_HEIGHT_FOOTER,
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon/>}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>

        <Box sx={{
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
            height: COLUMN_HEIGHT_HEADER,
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography sx={{
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            >Column Title</Typography>
            <Box>
              <Tooltip title="More options">
                <ExpandMoreIcon
                  sx={{ color: 'text.primary', cursor: 'pointer'}}
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
                <MenuItem>
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
          {/* Box List */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            padding: '0 5px',
            margin: '0 5px',
            overflowX : 'hidden',
            overflowY : 'auto',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEIGHT_HEADER} - ${COLUMN_HEIGHT_FOOTER})`,
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
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
              <CardMedia
                sx={{ height: 140 }}
                image={mybg}
                title="green iguana"
              />
              <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5} }}>
                <Typography>Nishykata Front-end Developer</Typography>
              </CardContent>
              <CardActions sx={{ padding: '0 4px 8px 4px'}}>
                <Button size="small" startIcon={<GroupIcon/>}>20</Button>
                <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon/>}>10</Button>
              </CardActions>
            </Card>

          </Box>
          {/* Box Footer */}
          <Box sx={{
            height: COLUMN_HEIGHT_FOOTER,
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon/>}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>

        <Box sx={{
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
            height: COLUMN_HEIGHT_HEADER,
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography sx={{
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            >Column Title</Typography>
            <Box>
              <Tooltip title="More options">
                <ExpandMoreIcon
                  sx={{ color: 'text.primary', cursor: 'pointer'}}
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
                <MenuItem>
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
          {/* Box List */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            padding: '0 5px',
            margin: '0 5px',
            overflowX : 'hidden',
            overflowY : 'auto',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEIGHT_HEADER} - ${COLUMN_HEIGHT_FOOTER})`,
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
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
              <CardMedia
                sx={{ height: 140 }}
                image={mybg}
                title="green iguana"
              />
              <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5} }}>
                <Typography>Nishykata Front-end Developer</Typography>
              </CardContent>
              <CardActions sx={{ padding: '0 4px 8px 4px'}}>
                <Button size="small" startIcon={<GroupIcon/>}>20</Button>
                <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon/>}>10</Button>
              </CardActions>
            </Card>

          </Box>
          {/* Box Footer */}
          <Box sx={{
            height: COLUMN_HEIGHT_FOOTER,
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon/>}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>

        <Box sx={{
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
            height: COLUMN_HEIGHT_HEADER,
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography sx={{
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            >Column Title</Typography>
            <Box>
              <Tooltip title="More options">
                <ExpandMoreIcon
                  sx={{ color: 'text.primary', cursor: 'pointer'}}
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
                <MenuItem>
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
          {/* Box List */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            padding: '0 5px',
            margin: '0 5px',
            overflowX : 'hidden',
            overflowY : 'auto',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEIGHT_HEADER} - ${COLUMN_HEIGHT_FOOTER})`,
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
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
              <CardMedia
                sx={{ height: 140 }}
                image={mybg}
                title="green iguana"
              />
              <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5} }}>
                <Typography>Nishykata Front-end Developer</Typography>
              </CardContent>
              <CardActions sx={{ padding: '0 4px 8px 4px'}}>
                <Button size="small" startIcon={<GroupIcon/>}>20</Button>
                <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon/>}>10</Button>
              </CardActions>
            </Card>

          </Box>
          {/* Box Footer */}
          <Box sx={{
            height: COLUMN_HEIGHT_FOOTER,
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon/>}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>

        <Box sx={{
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
            height: COLUMN_HEIGHT_HEADER,
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography sx={{
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            >Column Title</Typography>
            <Box>
              <Tooltip title="More options">
                <ExpandMoreIcon
                  sx={{ color: 'text.primary', cursor: 'pointer'}}
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
                <MenuItem>
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
          {/* Box List */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            padding: '0 5px',
            margin: '0 5px',
            overflowX : 'hidden',
            overflowY : 'auto',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEIGHT_HEADER} - ${COLUMN_HEIGHT_FOOTER})`,
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
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}>
              <CardMedia
                sx={{ height: 140 }}
                image={mybg}
                title="green iguana"
              />
              <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5} }}>
                <Typography>Nishykata Front-end Developer</Typography>
              </CardContent>
              <CardActions sx={{ padding: '0 4px 8px 4px'}}>
                <Button size="small" startIcon={<GroupIcon/>}>20</Button>
                <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon/>}>10</Button>
              </CardActions>
            </Card>

          </Box>
          {/* Box Footer */}
          <Box sx={{
            height: COLUMN_HEIGHT_FOOTER,
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon/>}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
      </Box>

    </Box>
  )
}

export default BoardContent
