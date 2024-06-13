import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

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

  useEffect(() => {
    setOrderedColumn(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    const { active, over } = event

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

  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors} >
      <Box
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          padding: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumn} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
