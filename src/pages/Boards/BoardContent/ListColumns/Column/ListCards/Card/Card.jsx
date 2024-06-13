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

function TrelloCard({ card }) {
  const shouldShowCardAction = () => {
    return !!card?.memberIds.length || !!card?.comments.length || !!card?.attachments.length
  }
  return (
    <Card
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}>
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover}/>}
      <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5} }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardAction() && <CardActions sx={{ padding: '0 4px 8px 4px'}}>
        {!!card?.memberIds.length && <Button size="small" startIcon={<GroupIcon/>}>{card?.memberIds.length}</Button>}
        {!!card?.comments.length && <Button size="small" startIcon={<GroupIcon/>}>{card?.comments.length}</Button>}
        {!!card?.attachments.length && <Button size="small" startIcon={<AttachmentIcon/>}>{card?.attachments.length}</Button>}
      </CardActions>}
    </Card>
  )
}

export default TrelloCard
