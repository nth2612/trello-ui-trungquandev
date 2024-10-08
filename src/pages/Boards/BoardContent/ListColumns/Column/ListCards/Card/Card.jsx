import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'
import GroupIcon from '@mui/icons-material/Group'
import { Button } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function TrelloCard({ card }) {

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  })

  const dndkitCardStyle = {
    // touchAction: 'none',
    // Nếu dùng CSS.Transform thì bị lỗi liên quan đến stretch
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined
  }

  const shouldShowCardAction = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  return (
    <Card
      ref={setNodeRef} style={dndkitCardStyle} {...listeners} {...attributes}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset',
        // display: card?.FE_PlaceholderCard ? 'none' : 'block',
        height: card?.FE_PlaceholderCard ? '10px' : undefined,
        visibility: card?.FE_PlaceholderCard ? 'hidden' : undefined,
        border: '1px solid transparent',
        '&:hover' : { borderColor: (theme) => theme.palette.primary.main }
      }}>
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover}/>}
      <CardContent sx={{ padding: 1.5, '&:last-child' : { paddingBottom: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardAction() && <CardActions sx={{ padding: '0 4px 8px 4px' }}>
        {!!card?.memberIds.length && <Button size="small" startIcon={<GroupIcon/>}>{card?.memberIds.length}</Button>}
        {!!card?.comments.length && <Button size="small" startIcon={<CommentIcon/>}>{card?.comments.length}</Button>}
        {!!card?.attachments.length && <Button size="small" startIcon={<AttachmentIcon/>}>{card?.attachments.length}</Button>}
      </CardActions>}
    </Card>
  )
}

export default TrelloCard
