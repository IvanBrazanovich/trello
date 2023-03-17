import { DndContext, DragOverlay } from "@dnd-kit/core";
import DroppableLane from "./DroppableLane";
import Tarea from "./Tarea";
import { arrayMove } from "@dnd-kit/sortable";
import React, { useEffect, useRef, useState } from "react";
import { Plus, X } from "@phosphor-icons/react";

import styles from "../../../styles/app/components/kanbanBoard.module.scss";
import { useDispatch } from "react-redux";
import { addListToBoard } from "../../../features/app/boardSlice";

const KanbanBoard = ({ board, setBoard }) => {
  const [activeId, setActiveId] = useState(null);
  const [activeAddList, setActiveAddList] = useState(false);
  const [listName, setListName] = useState("");
  const dispatch = useDispatch();
  const handleDragCancel = () => setActiveId(null);
  const handleAddList = () => {
    if (listName.trim().length > 0) {
      dispatch(addListToBoard({ listName, boardId: board.id }));
    }
  };

  // Board logic
  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };

  const handleDragOver = ({ active, over }) => {
    console.log(active);
    console.log(over);
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
  const AddComponentList = () => {
    return (
      <div className={styles.addFunction}>
        <div
          className={`${styles.buttonAdd} ${
            activeAddList ? styles.buttonAdd__active : ""
          }`}
        >
          <button onClick={(e) => setActiveAddList(!activeAddList)}>
            Añada una Lista <Plus size={20} />
          </button>
        </div>

        <div
          className={` ${styles.action} ${
            activeAddList ? styles.action__active : ""
          }
      }`}
        >
          <input
            type="text"
            placeholder="Introduzca Título de Lista"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />

          <div className={styles.action__wrapper}>
            <button onClick={handleAddList}>
              <Plus size={16} />
              Añada una Tarjeta
            </button>

            <div>
              <X onClick={(e) => setActiveAddList(false)} />
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.kanbanContainer}>
        {Object.keys(board).length > 0 &&
          Object.entries(board?.lists).map(([listId, listData]) => {
            const { tareas, name, id } = listData;

            return (
              <DroppableLane
                key={id}
                id={id}
                tareas={tareas}
                name={name}
                boardId={board.id}
                activeId={activeId}
              />
            );
          })}

        {AddComponentList()}
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
