import { arrayMove } from "@dnd-kit/sortable";

// Board logic
const handleDragStart = ({ board, setBoard, setActiveId, active }) => {
  setActiveId(active.id);
};

const handleDragOver = ({ board, setBoard, setActiveId, active, over }) => {
  const overId = over?.id;

  if (!overId) {
    return;
  }

  const activeContainer = active.data.current.sortable.containerId;
  const overContainer = over.data.current?.sortable.containerId || over.id;

  if (activeContainer === overContainer) return;

  const activeParentListId = active.data.current.sortable.containerId;

  // Remove from active container
  const [boardCopy, tareaRemoved] = removeTarea(
    { ...board },
    activeParentListId,
    active.id
  );
  // Check if need to push to the end of the list

  if (boardCopy.lists[over.id]) {
    boardCopy.lists[over.id].tareas.push(tareaRemoved);
  } else {
    // If need to push to middle of array
    const listToChange = boardCopy.lists[overContainer].tareas;
    const indexOfChange = over.data.current.sortable.index;
    boardCopy.lists[overContainer].tareas = [
      ...listToChange.slice(0, indexOfChange),
      tareaRemoved,
      ...listToChange.slice(indexOfChange),
    ];
  }

  setBoard({ ...boardCopy });
};

const removeTarea = (boardCopy, activeParentListId, tareaActiveId) => {
  let tareaRemoved;
  boardCopy.lists[activeParentListId].tareas = boardCopy.lists[
    activeParentListId
  ].tareas.filter((item) => {
    if (item.id !== tareaActiveId) {
      return true;
    } else {
      tareaRemoved = item;
      return false;
    }
  });

  const sendBoardCopy = structuredClone(boardCopy);

  return [sendBoardCopy, tareaRemoved];
};

const handleDragEnd = ({ board, setBoard, setActiveId, active, over }) => {
  setActiveId(null);

  if (!over?.id) return;

  if (active.id === over.id) return;

  const activeIndex = active.data.current.sortable.index;
  const overIndex = over.data.current?.sortable.index;

  const activeParentListId = active.data.current.sortable.containerId;

  const activeParentList = board.lists[activeParentListId];

  const tareasSwapped = arrayMove(
    activeParentList.tareas,
    activeIndex,
    overIndex
  );

  const boardCopy = { ...board };

  boardCopy.lists[activeParentListId].tareas = tareasSwapped;

  setBoard(boardCopy);
};

const getTarea = ({ board, activeId: id }) => {
  let tarea;
  Object.values(board.lists).forEach((list) => {
    const tareaExist = list.tareas.filter((item) => item.id === id);
    if (tareaExist[0]) {
      tarea = tareaExist;
    }
  });
  return tarea[0];
};
const handleDragCancel = () => setActiveId(null);

export {
  getTarea,
  handleDragEnd,
  handleDragOver,
  handleDragStart,
  removeTarea,
  handleDragCancel,
};
