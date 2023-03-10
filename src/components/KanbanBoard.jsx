import { DndContext, DragOverlay } from "@dnd-kit/core";
import DroppableLane from "./DroppableLane";
import Tarea from "./Tarea";
import { arrayMove } from "@dnd-kit/sortable";
import React, { useEffect, useState } from "react";

const KanbanBoard = ({ board, setBoard }) => {
  const [activeId, setActiveId] = useState(null);

  const handleDragCancel = () => setActiveId(null);

  // Board logic
  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };

  const handleDragOver = ({ active, over }) => {
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

    return [boardCopy, tareaRemoved];
  };

  const handleDragEnd = ({ active, over }) => {
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

  const getTarea = (id) => {
    let tarea;
    Object.values(board.lists).forEach((list) => {
      const tareaExist = list.tareas.filter((item) => item.id === id);
      if (tareaExist[0]) {
        tarea = tareaExist;
      }
    });
    return tarea[0];
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div
        className="container"
        style={{ display: "flex", margin: "2rem", gap: "2rem" }}
      >
        {Object.keys(board).length > 0 &&
          Object.entries(board?.lists).map(([listId, listData]) => {
            const { tareas, id } = listData;

            return (
              <DroppableLane
                id={id}
                tareas={tareas}
                activeId={activeId}
                key={id}
              />
            );
          })}
      </div>
      <DragOverlay>
        {activeId ? (
          <Tarea
            activeId={activeId}
            dataTarea={getTarea(activeId)}
            id={activeId}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
