import React, { useRef, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import styles from "../../../styles/app/components/kanbanBoard.module.scss";
import SortableItemContainer from "./SortableItemContainer";
import AddTarea from "./AddTarea";

const DroppableLane = ({ id, tareas, name }) => {
  const refDiv = useRef({});

  const { setNodeRef } = useDroppable({ id });
  return (
    <div id={id} ref={refDiv} className={styles.laneWrapper}>
      <h3>{name}</h3>

      <SortableContext
        style={{ border: "1px solid black" }}
        id={id}
        items={tareas}
        strategy={rectSortingStrategy}
      >
        <ul className={styles.droppable} ref={setNodeRef}>
          {tareas.map((item) => {
            const { id } = item;
            return <SortableItemContainer dataTarea={item} key={id} id={id} />;
          })}
        </ul>
      </SortableContext>
      <AddTarea refDiv={refDiv} />
    </div>
  );
};

export default DroppableLane;
