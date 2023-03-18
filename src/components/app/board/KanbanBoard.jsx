import { DndContext, DragOverlay } from "@dnd-kit/core";
import DroppableLane from "./DroppableLane";
import Tarea from "./Tarea";
import React, { useState } from "react";

import styles from "../../../styles/app/components/kanbanBoard.module.scss";
import AddList from "./AddList";
import {
  getTarea,
  handleDragCancel,
  handleDragEnd,
  handleDragOver,
  handleDragStart,
} from "./helpers/helpersBoard";

const KanbanBoard = ({ board, setBoard }) => {
  const [activeId, setActiveId] = useState(null);

  return (
    <DndContext
      onDragStart={(e) =>
        handleDragStart({ board, setBoard, setActiveId, ...e })
      }
      onDragCancel={(e) =>
        handleDragCancel({ board, setBoard, setActiveId, ...e })
      }
      onDragOver={(e) => handleDragOver({ board, setBoard, setActiveId, ...e })}
      onDragEnd={(e) => handleDragEnd({ board, setBoard, setActiveId, ...e })}
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

        <AddList />
      </div>

      <DragOverlay>
        {activeId ? (
          <Tarea
            activeId={activeId}
            dataTarea={getTarea({ board, activeId })}
            id={activeId}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
