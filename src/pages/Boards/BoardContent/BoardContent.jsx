import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import TrelloCard from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN : 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD : 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {

  // Cái này phải kết hợp với touchAction none cơ mà vẫn còn bug của mobile
  // const pointerSensor = useSensor(PointerSensor, {
  //   // Di chuyển 10px mới thực hiện hàm handleDrag, tránh click
  //   activationConstraint : {
  //     distance: 10
  //   }
  // })
  const mouseSensor = useSensor(MouseSensor, {
    // Di chuyển 10px mới thực hiện hàm handleDrag, tránh click
    activationConstraint : {
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    // Nhấn giữ trong vòng 250ms và di chuyển khoảng 5px thì mới gọi hàm handleDrag
    activationConstraint : {
      delay: 250,
      tolerance: 500
    }
  })

  //Nên dùng mouseSensor kết hợp touchSensor để tránh bug trên mobile
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumn, setOrderedColumn] = useState([])
  // Trong lúc kéo, chỉ được kéo card hoặc column
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragType, setActiveDragItemType] = useState(null)
  const [activeDragData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumn(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragStart = (event) => {
    console.log(event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    console.log(event)
    console.log(activeDragItemId)
    console.log(activeDragType)
    console.log(activeDragData)
    //Nếu over là null thì thoát luôn không log lỗi
    if (!over) return

    // Nếu vị trí đầu cuối khác nhau thì thực thi kéo thả
    if (active.id !== over.id) {
      // Lấy vị trí cũ từ thằng active
      const oldIndex = orderedColumn.findIndex(c => c._id === active.id)
      const newIndex = orderedColumn.findIndex(c => c._id === over.id)
      const dndOrderedColumn = arrayMove(orderedColumn, oldIndex, newIndex)
      // Dùng dòng dưới để lấy ra list muốn sort, lưu vào db để call api
      // const dndOrderedColumnIds = dndOrderedColumn.map(c => c._id)
      setOrderedColumn(dndOrderedColumn)
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active : {
          opacity : 0.5
        }
      }
    })
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <Box
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          padding: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumn} />
        <DragOverlay dropAnimation={dropAnimation} >
          {!activeDragData && null}
          {(activeDragType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragData} />}
          {(activeDragType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <TrelloCard card={activeDragData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
