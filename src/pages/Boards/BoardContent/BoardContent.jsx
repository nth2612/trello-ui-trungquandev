import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects, closestCorners, pointerWithin, rectIntersection, getFirstCollision, closestCenter } from '@dnd-kit/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import TrelloCard from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'
import { MouseSensor, TouchSensor } from '~/customlib/dndkitSensor'

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
  const [oldColumnWhenDragCard, setOldColumnWhenDragCard] = useState(null)
  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumn(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumn.find(col => col?.cards?.map(card => card._id)?.includes(cardId))
  }

  const moveCardBetweenDiffCol = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDragingCardId,
    activeDragingCardData
  ) => {
    setOrderedColumn(prev => {
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const isModifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + isModifier : overColumn.length + 1
      const nextColumn = cloneDeep(prev)
      const nextActiveColumn = nextColumn.find(col => col._id === activeColumn._id)
      const nextOverColumn = nextColumn.find(col => col._id === overColumn._id)
      if (nextActiveColumn) {
        //
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDragingCardId)
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }
      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDragingCardId)
        const rebuild = {
          ...activeDragingCardData,
          columnId : nextOverColumn._id
        }
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild)
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      return nextColumn
    })
  }

  const handleDragStart = (event) => {
    console.log(event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
    // Nếu là kéo card, thực hiện set oldcolumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDragCard(findColumnByCardId(event?.active?.id))
    }
  }
  const handleDragOver = (event) => {
    // Không làm gì nếu kéo card
    if (activeDragType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    const { active, over } = event
    //Nếu không có điểm cuối thì return tránh lỗi
    if (!active || !over) return

    const { id: activeDragingCardId, data: { current : activeDragingCardData } } = active
    const { id: overCardId } = over
    const activeColumn = findColumnByCardId(activeDragingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!overColumn || !activeColumn) return

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDiffCol(overColumn, overCardId, active, over, activeColumn, activeDragingCardId, activeDragingCardData)
    }
  }
  const handleDragEnd = (event) => {

    const { active, over } = event
    //Nếu over là null thì thoát luôn không log lỗi
    if (!active || !over) return

    // Xử lý kéo thả card
    if (activeDragType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log('keo tha')
      const { id: activeDragingCardId, data: { current : activeDragingCardData } } = active
      const { id: overCardId } = over
      const activeColumn = findColumnByCardId(activeDragingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!overColumn || !activeColumn) return

      if (oldColumnWhenDragCard._id !== overColumn._id) {
        moveCardBetweenDiffCol(overColumn, overCardId, active, over, activeColumn, activeDragingCardId, activeDragingCardData)
      } else {
        console.log('keo tha cung column')
        const oldCardIndex = oldColumnWhenDragCard?.cards.findIndex(c => c._id === activeDragItemId)
        const newCardIndex = oldColumnWhenDragCard?.cards.findIndex(c => c._id === overCardId)
        const dndOrderedCard = arrayMove(oldColumnWhenDragCard?.cards, oldCardIndex, newCardIndex)
        setOrderedColumn(prev => {
          const nextColumn = cloneDeep(prev)
          const targetColumn = nextColumn.find(c => c._id === overColumn._id)
          targetColumn.cards = dndOrderedCard
          targetColumn.cardOrderIds = dndOrderedCard.map(c => c._id)
          return nextColumn
        })
      }
    }
    // Xử lý kéo thả column
    if (activeDragType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // Nếu vị trí đầu cuối khác nhau thì thực thi kéo thả
      if (active.id !== over.id) {
        // Lấy vị trí cũ từ thằng active
        const oldColumnIndex = orderedColumn.findIndex(c => c._id === active.id)
        const newColumnIndex = orderedColumn.findIndex(c => c._id === over.id)
        const dndOrderedColumn = arrayMove(orderedColumn, oldColumnIndex, newColumnIndex)
        // Dùng dòng dưới để lấy ra list muốn sort, lưu vào db để call api
        // const dndOrderedColumnIds = dndOrderedColumn.map(c => c._id)
        setOrderedColumn(dndOrderedColumn)
      }
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDragCard(null)
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

  const collisionDetectionStrategy = useCallback((args) => {
    if (activeDragType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }
    const pointerIntersections = pointerWithin(args)
    const intersections = pointerIntersections?.length > 0 ? pointerIntersections : rectIntersection(args)
    // Tìm overid đầu trong list intersection
    let overId = getFirstCollision(intersections, 'id')
    if (overId) {
      const checkCol = orderedColumn.find(c => c._id === overId)
      if (checkCol) {
        overId = closestCenter({
          ...args,
          droppableContainers : args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkCol?.cardOrderIds?.includes(container.id)) 
          })[0]?.id
        })
      }
      lastOverId.current = overId
      return [{ id : overId }]
    }
    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragType, orderedColumn])

  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
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
