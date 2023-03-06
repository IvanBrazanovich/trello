import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import SortableItemContainer from "./SortableItemContainer";

const DroppableLane = ({ id, tareas }) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <SortableContext
      style={{ border: "1px solid black" }}
      id={id}
      items={tareas}
      strategy={rectSortingStrategy}
    >
      <ul
        style={{ border: "1px solid black", padding: "2rem" }}
        className="droppable"
        ref={setNodeRef}
      >
        {tareas.map((item) => {
          const { name, id } = item;

          return <SortableItemContainer dataTarea={item} key={id} id={id} />;
        })}
      </ul>
    </SortableContext>
  );
};

export default DroppableLane;
