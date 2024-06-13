import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'
import GroupIcon from '@mui/icons-material/Group'
import { Button } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import mybg from '~/assets/manhinh10.png'

function TrelloCard({ temporaryHideMedia }) {
  if(temporaryHideMedia) {
    return (
      <Card
        sx={{
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
          overflow: 'unset'
        }}>
        <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5} }}>
          <Typography>Nishykata</Typography>
        </CardContent>
      </Card>
    )
  }
  return (
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
  )
}

export default TrelloCard
