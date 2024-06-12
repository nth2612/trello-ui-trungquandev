import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import myavt from '~/assets/myavt5.png'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'primary.main',
  backgroundColor: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root' : {
    color: 'primary.main'
  },
  '&:hover' : {
    backgroundColor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: 2,
        gap: 2,
        overflowX: 'auto',
        borderTop: '1px solid #00bfa5'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="Nishykata"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Button variant='outlined' startIcon={<PersonAddIcon/>} >Invite</Button>
        <AvatarGroup max={4} sx={{ '& .MuiAvatar-root' :{ width: '34px', height: '34px', fontSize: '16px' } }}>
          <Tooltip title="Nishykata">
            <Avatar alt="Nishykata" src={myavt} />
          </Tooltip>
          <Tooltip title="Nishykata">
            <Avatar alt="Nishykata" src={myavt} />
          </Tooltip>
          <Tooltip title="Nishykata">
            <Avatar alt="Nishykata" src={myavt} />
          </Tooltip>
          <Tooltip title="Nishykata">
            <Avatar alt="Nishykata" src={myavt} />
          </Tooltip>
          <Tooltip title="Nishykata">
            <Avatar alt="Nishykata" src={myavt} />
          </Tooltip>
          <Tooltip title="Nishykata">
            <Avatar alt="Nishykata" src={myavt} />
          </Tooltip>
          <Tooltip title="Nishykata">
            <Avatar alt="Nishykata" src={myavt} />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
