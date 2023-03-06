import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Alert from "../../components/Alert";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import DroppableLane from "../../components/DroppableLane";
import Tarea from "../../components/Tarea";
import { arrayMove } from "@dnd-kit/sortable";

const Board = () => {
  // State
  const [board, setBoard] = useState({});
  const [activeId, setActiveId] = useState(null);

  // React redux
  const dispatch = useDispatch();

  // React redux
  const params = useParams();
  const navigateFunction = useNavigate();

  const handleDragCancel = () => setActiveId(null);

  useEffect(() => {
    const boards = JSON.parse(localStorage.getItem("boards"));
    const currentBoard = boards.filter((item) => item.id === params.token);

    if (!currentBoard[0]) {
      dispatch(
        setAlertAsyncWithRedirect({ msg: "Something went wrong", error: true })
      );
    } else {
      setBoard(currentBoard[0]);
    }
  }, []);

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

    const tarea = getTarea(active.id);

    // Remove from active container
    let newLists = { ...board }.lists.map((list) => {
      if (list.id === activeContainer) {
        list.tareas = list.tareas.filter((item) => item.id !== active.id);
      }

      return list;
    });

    // Check if need to push to the end of the list
    let indexEndContainer;
    const endContainer = { ...board }.lists.filter((list, index) => {
      if (list.id === over.id) {
        indexEndContainer = index;
        return true;
      } else {
        return false;
      }
    });
    console.log(endContainer);

    if (endContainer[0]) {
      newLists[indexEndContainer].tareas.push(tarea);
    } else {
      // If need to push to middle of array
      const parentListOverId = over.data.current.sortable.containerId;
      let indexOfList;
      const parentListOver = board.lists.filter((list, index) => {
        if (list.id === parentListOverId) {
          indexOfList = index;
          return true;
        } else {
          return false;
        }
      });
      newLists[indexOfList].tareas = [
        ...newLists[indexOfList].tareas.slice(0, over.id),
        tarea,
        ...newLists[indexOfList].tareas.slice(over.id),
      ];
    }

    setBoard({ ...board, lists: newLists });
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);

    if (!over?.id) return;

    if (active.id === over.id) return;

    const activeIndex = active.data.current.sortable.index;
    const overIndex = over.data.current.sortable.index;

    const parentListId = active.data.current.sortable.containerId;
    let indexOfList = null;
    const parentList = board.lists.filter((list, index) => {
      if (list.id === parentListId) {
        indexOfList = index;
        return true;
      } else {
        return false;
      }
    });

    const tareasSwapped = arrayMove(
      parentList[0].tareas,
      activeIndex,
      overIndex
    );

    const parentListChanged = { ...parentList[0], tareas: tareasSwapped };
    const listsChanged = board.lists.map((list) =>
      list.id === parentListChanged.id ? parentListChanged : list
    );

    setBoard({ ...board, lists: listsChanged });
  };

  const getTarea = (id) => {
    const boardCopy = { ...board };
    let tarea;

    board.lists.forEach((list) => {
      list.tareas.forEach((item) => {
        if (item.id === id) tarea = item;
      });
    });
    return tarea;
  };

  return (
    <>
      <div>
        <Alert />
      </div>

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
            board?.lists.map((list) => {
              const { name, tareas, id } = list;
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
            <Tarea dataTarea={{ name: "Moviendo tarea" }} id={activeId} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default Board;
